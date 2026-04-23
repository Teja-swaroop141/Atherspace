from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from kubernetes import client, config
import time
import random
import string
import socket
import subprocess
import urllib3
import json
import os

app = FastAPI()
urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)

# --- CHANGE 1: Load kubeconfig for Minikube on EC2 ---
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

# --- CHANGE 2: Get Minikube's IP instead of your WSL gateway ---
def get_host_ip():
    try:
        # On EC2 with minikube, we need the EC2 public IP for the frontend
        # but NodePort traffic routes through minikube's internal IP
        result = subprocess.check_output(["minikube", "ip"], text=True).strip()
        return result
    except Exception:
        # Fallback: EC2 instance metadata
        try:
            import urllib.request
            url = "http://169.254.169.254/latest/meta-data/public-ipv4"
            return urllib.request.urlopen(url, timeout=2).read().decode()
        except Exception:
            return "127.0.0.1"

HOST_IP = get_host_ip()
print(f"🌍 Minikube Node IP: {HOST_IP}")

# --- CHANGE 3: Your image names point to Docker Hub (already correct if you push there) ---
# Just make sure these match your Docker Hub repo exactly:
# zerosetup/lab-python:v1  ✅
# zerosetup/lab-sql:v1     ✅
# zerosetup/lab-ds:v1      ✅
# zerosetup/lab-cyber:v1   ✅
# zerosetup/lab-cn:v1      ✅

def create_lab_session(lab_prefix, image_name, container_port=8080, extra_args=None, privileged=False, url_path=""):
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
                "imagePullPolicy": "Always",   # pulls from Docker Hub automatically
                "ports": [{"containerPort": container_port}],
                "securityContext": security_context,
                "args": extra_args if extra_args else [],
                "resources": {
                    "requests": {"memory": "512Mi", "cpu": "250m"},
                    "limits":   {"memory": "4Gi",   "cpu": "2000m"}
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


# --- ENDPOINTS (unchanged from your original) ---
@app.get("/config")
def get_config():
    """Returns current server IP - called by frontend on load"""
    try:
        with open("/home/ubuntu/zerosetup-backend/ip_config.json") as f:
            return json.load(f)
    except:
        return {"ip": HOST_IP}

@app.post("/start-python-lab")
def start_python_lab():
    return create_lab_session("python-student", "zerosetup/lab-python:v1", container_port=8080, extra_args=["--auth", "none"])

@app.post("/start-sql-lab")
def start_sql_lab():
    return create_lab_session("sql-student", "zerosetup/lab-sql:v1", container_port=8080)

@app.post("/start-ds-lab")
def start_ds_lab():
    return create_lab_session("ds-student", "zerosetup/lab-ds:v1", container_port=8888, extra_args=[
        "start-notebook.sh", "--NotebookApp.token=''", "--NotebookApp.password=''"
    ])

@app.post("/start-cyber-lab")
def start_cyber_lab():
    return create_lab_session("cyber-student", "zerosetup/lab-cyber:v1", container_port=6080, privileged=True, url_path="/vnc.html?autoconnect=true")

@app.post("/start-cn-lab")
def start_cn_lab():
    return create_lab_session("cn-student", "zerosetup/lab-cn:v1", container_port=6080, privileged=True, url_path="/vnc.html?autoconnect=true")