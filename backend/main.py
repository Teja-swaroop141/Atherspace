from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from kubernetes import client, config
import time
import random
import socket

# --- 1. SETUP & CONFIGURATION ---
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

def get_local_ip():
    try:
        s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
        s.connect(("8.8.8.8", 80))
        ip = s.getsockname()[0]
        s.close()
        return ip
    except:
        return "localhost" 

HOST_IP = get_local_ip()
print(f"🌍 Server running on IP: {HOST_IP}")

try:
    config.load_kube_config()
    print("✅ Connected to Kubernetes Cluster")
except Exception as e:
    print(f"❌ K8s Connection Failed: {e}")

# --- 2. SHARED LAUNCH LOGIC ---
def launch_lab(api, student_id, pod_manifest, service_manifest):
    try:
        print(f"🚀 Spawning Lab: {student_id}...")
        api.create_namespaced_pod(namespace="default", body=pod_manifest)
        api.create_namespaced_service(namespace="default", body=service_manifest)
        
        print("⏳ Waiting 10s for container to boot...")
        time.sleep(10) 
        
        svc = api.read_namespaced_service(name=f"{student_id}-svc", namespace="default")
        node_port = svc.spec.ports[0].node_port
        final_url = f"http://{HOST_IP}:{node_port}"
        
        print(f"✅ Ready at: {final_url}")
        return {"status": "success", "message": "Lab Deployed", "url": final_url}

    except Exception as e:
        print(f"🔥 Error: {e}")
        return {"status": "error", "message": str(e)}

# --- 3. ENDPOINT: PYTHON LAB ---
@app.post("/start-python-lab")
def start_python_lab():
    api = client.CoreV1Api()
    student_id = f"python-student-{random.randint(100, 999)}"
    
    pod_manifest = {
        "apiVersion": "v1", "kind": "Pod",
        "metadata": {"name": student_id, "labels": {"app": student_id}},
        "spec": {
            "containers": [{
                "name": "lab-container",
                "image": "my-python-lab:v1",
                "imagePullPolicy": "Never",
                "ports": [{"containerPort": 8080}], 
                "args": ["--auth", "none"]
            }]
        }
    }
    
    service_manifest = {
        "apiVersion": "v1", "kind": "Service",
        "metadata": {"name": f"{student_id}-svc"},
        "spec": {"selector": {"app": student_id}, "type": "NodePort", "ports": [{"port": 8080, "targetPort": 8080}]}
    }
    return launch_lab(api, student_id, pod_manifest, service_manifest)

# --- 4. ENDPOINT: SQL LAB ---
@app.post("/start-sql-lab")
def start_sql_lab():
    api = client.CoreV1Api()
    student_id = f"sql-student-{random.randint(100, 999)}"
    
    pod_manifest = {
        "apiVersion": "v1", "kind": "Pod",
        "metadata": {"name": student_id, "labels": {"app": student_id}},
        "spec": {
            "containers": [{
                "name": "lab-container",
                "image": "my-sql-lab:v1",
                "imagePullPolicy": "Never",
                "ports": [{"containerPort": 8080}]
            }]
        }
    }
    
    service_manifest = {
        "apiVersion": "v1", "kind": "Service",
        "metadata": {"name": f"{student_id}-svc"},
        "spec": {"selector": {"app": student_id}, "type": "NodePort", "ports": [{"port": 8080, "targetPort": 8080}]}
    }
    # FIXED: Added the return statement here!
    return launch_lab(api, student_id, pod_manifest, service_manifest)

# --- 5. ENDPOINT: CYBER LAB ---
@app.post("/start-cyber-lab")
def start_cyber_lab():
    api = client.CoreV1Api()
    student_id = f"cyber-student-{random.randint(100, 999)}"
    
    pod_manifest = {
        "apiVersion": "v1", "kind": "Pod",
        "metadata": {"name": student_id, "labels": {"app": student_id}},
        "spec": {
            "containers": [{
                "name": "lab-container",
                "image": "my-cyber-lab:v1",
                "imagePullPolicy": "Never",
                "ports": [{"containerPort": 6080}],
                # FIXED: Moved securityContext HERE (Inside Container, NOT Service)
                "securityContext": {
                    "privileged": True,
                    "capabilities": {"add": ["NET_ADMIN", "NET_RAW"]}
                }
            }]
        }
    }
    
    service_manifest = {
        "apiVersion": "v1", "kind": "Service",
        "metadata": {"name": f"{student_id}-svc"},
        "spec": {"selector": {"app": student_id}, "type": "NodePort", "ports": [{"port": 6080, "targetPort": 6080}]}
    }

    return launch_lab(api, student_id, pod_manifest, service_manifest)