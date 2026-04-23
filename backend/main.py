from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from kubernetes import client, config
import time
import random
import string
import subprocess
import urllib3
import json
import os
import threading

app = FastAPI()
urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)

# ── Kubernetes connect ──────────────────────────────────────────────
try:
    config.load_kube_config(config_file="/home/ubuntu/.kube/config")
    configuration = client.Configuration.get_default_copy()
    configuration.verify_ssl = False
    client.Configuration.set_default(configuration)
    print("✅ Connected to Kubernetes Cluster")
except Exception as e:
    print(f"⚠️ Warning: Could not load Kube Config: {e}")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# ── Get EC2 public IP (for NodePort URLs) ───────────────────────────
def get_host_ip():
    try:
        import urllib.request
        token_req = urllib.request.Request(
            "http://169.254.169.254/latest/api/token",
            headers={"X-aws-ec2-metadata-token-ttl-seconds": "21600"},
            method="PUT"
        )
        token = urllib.request.urlopen(token_req, timeout=2).read().decode()
        ip_req = urllib.request.Request(
            "http://169.254.169.254/latest/meta-data/public-ipv4",
            headers={"X-aws-ec2-metadata-token": token}
        )
        public_ip = urllib.request.urlopen(ip_req, timeout=2).read().decode()
        print(f"✅ EC2 Public IP: {public_ip}")
        return public_ip
    except Exception as e:
        print(f"⚠️ Metadata failed: {e}, trying minikube ip")
        try:
            return subprocess.check_output(["minikube", "ip"], text=True).strip()
        except:
            return "127.0.0.1"

HOST_IP = get_host_ip()
print(f"🌍 Host IP: {HOST_IP}")

# ── Pod resource limits (safe for 2 vCPU / 8GB) ────────────────────
MAX_TOTAL_PODS = 3

def get_total_running_pods():
    v1 = client.CoreV1Api()
    pods = v1.list_namespaced_pod(namespace="default")
    return len([
        p for p in pods.items
        if p.status.phase in ["Running", "Pending"]
    ])

# ── Auto cleanup pods older than 30 mins ───────────────────────────
def cleanup_old_pods():
    while True:
        try:
            from datetime import datetime, timezone
            v1 = client.CoreV1Api()
            pods = v1.list_namespaced_pod(namespace="default")
            now = datetime.now(timezone.utc)
            for pod in pods.items:
                age_minutes = (now - pod.metadata.creation_timestamp).total_seconds() / 60
                if age_minutes > 30:
                    name = pod.metadata.name
                    print(f"🧹 Cleaning up: {name}")
                    try:
                        v1.delete_namespaced_pod(name=name, namespace="default")
                        v1.delete_namespaced_service(name=f"{name}-svc", namespace="default")
                    except Exception as e:
                        print(f"Cleanup error: {e}")
        except Exception as e:
            print(f"Cleanup loop error: {e}")
        time.sleep(300)

threading.Thread(target=cleanup_old_pods, daemon=True).start()

# ── Core lab session creator ────────────────────────────────────────
def create_lab_session(lab_prefix, image_name, container_port=8080,
                       extra_args=None, privileged=False, url_path=""):

    # Capacity check
    current_pods = get_total_running_pods()
    if current_pods >= MAX_TOTAL_PODS:
        return {
            "status": "Failure",
            "message": f"🚫 Lab is at full capacity ({MAX_TOTAL_PODS} pods running). Please wait for a slot."
        }

    random_id = ''.join(random.choices(string.digits, k=4))
    pod_name = f"{lab_prefix}-{random_id}"
    v1 = client.CoreV1Api()

    security_context = {}
    if privileged:
        security_context = {
            "privileged": True,
            "capabilities": {"add": ["NET_ADMIN", "NET_RAW"]}
        }

    pod_manifest = {
        "apiVersion": "v1",
        "kind": "Pod",
        "metadata": {
            "name": pod_name,
            "labels": {"app": pod_name}
        },
        "spec": {
            "containers": [{
                "name": "lab-container",
                "image": image_name,
                "imagePullPolicy": "IfNotPresent",
                "ports": [{"containerPort": container_port}],
                "securityContext": security_context,
                "args": extra_args if extra_args else [],
                "resources": {
                    "requests": {"memory": "256Mi", "cpu": "100m"},
                    "limits":   {"memory": "1Gi",   "cpu": "400m"}
                }
            }]
        }
    }

    service_manifest = {
        "apiVersion": "v1",
        "kind": "Service",
        "metadata": {"name": f"{pod_name}-svc"},
        "spec": {
            "type": "NodePort",
            "selector": {"app": pod_name},
            "ports": [{
                "protocol": "TCP",
                "port": 80,
                "targetPort": container_port
            }]
        }
    }

    try:
        print(f"🚀 Spawning Lab: {pod_name}...")
        v1.create_namespaced_pod(body=pod_manifest, namespace="default")
        v1.create_namespaced_service(body=service_manifest, namespace="default")

        time.sleep(2)

        svc = v1.read_namespaced_service(name=f"{pod_name}-svc", namespace="default")
        node_port = svc.spec.ports[0].node_port

        # ⚠️ NodePort URLs are HTTP — student opens directly in browser
        # This is fine because the lab URL opens in a NEW tab
        # It's not an API call from Vercel, so mixed content doesn't apply
        final_url = f"http://{HOST_IP}:{node_port}{url_path}"
        print(f"✅ Lab Ready: {final_url}")

        return {
            "status": "Success",
            "message": f"Lab started at {final_url}",
            "port": node_port,
            "url": final_url,
            "pod_name": pod_name
        }

    except Exception as e:
        print(f"🔥 Error: {e}")
        return {"status": "Failure", "message": str(e)}


# ── Endpoints ───────────────────────────────────────────────────────

@app.get("/health")
def health():
    return {"status": "ok", "host_ip": HOST_IP}

@app.get("/config")
def get_config():
    return {"ip": HOST_IP}

@app.get("/status")
def get_status():
    try:
        running = get_total_running_pods()
        return {
            "pods_running": running,
            "pods_max": MAX_TOTAL_PODS,
            "slots_available": MAX_TOTAL_PODS - running
        }
    except Exception as e:
        return {"error": str(e)}

@app.delete("/stop-lab/{pod_name}")
def stop_lab(pod_name: str):
    v1 = client.CoreV1Api()
    try:
        v1.delete_namespaced_pod(name=pod_name, namespace="default")
        v1.delete_namespaced_service(name=f"{pod_name}-svc", namespace="default")
        return {"status": "Success", "message": f"{pod_name} terminated"}
    except Exception as e:
        return {"status": "Failure", "message": str(e)}

@app.post("/start-python-lab")
def start_python_lab():
    return create_lab_session("python-student", "zerosetup/lab-python:v1",
                              container_port=8080, extra_args=["--auth", "none"])

@app.post("/start-sql-lab")
def start_sql_lab():
    return create_lab_session("sql-student", "zerosetup/lab-sql:v1",
                              container_port=8080)

@app.post("/start-ds-lab")
def start_ds_lab():
    return create_lab_session("ds-student", "zerosetup/lab-ds:v1",
                              container_port=8888,
                              extra_args=["start-notebook.sh",
                                          "--NotebookApp.token=''",
                                          "--NotebookApp.password=''"])

@app.post("/start-cyber-lab")
def start_cyber_lab():
    return create_lab_session("cyber-student", "zerosetup/lab-cyber:v1",
                              container_port=6080, privileged=True,
                              url_path="/vnc.html?autoconnect=true")

@app.post("/start-cn-lab")
def start_cn_lab():
    return create_lab_session("cn-student", "zerosetup/lab-cn:v1",
                              container_port=6080, privileged=True,
                              url_path="/vnc.html?autoconnect=true")