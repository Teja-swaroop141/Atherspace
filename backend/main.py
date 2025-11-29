from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from kubernetes import client, config
import time
import random
import socket

# --- 1. SETUP & CONFIGURATION ---
app = FastAPI()

# Allow Frontend to connect from anywhere (CORS)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# HELPER: Automatically find your laptop's WiFi IP address
def get_local_ip():
    try:
        # Connect to Google DNS to determine local IP (no data sent)
        s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
        s.connect(("8.8.8.8", 80))
        ip = s.getsockname()[0]
        s.close()
        return ip
    except:
        return "localhost" # Fallback

HOST_IP = "localhost"
print(f"🌍 Server running on IP: {HOST_IP}")

# Connect to Kubernetes
try:
    config.load_kube_config()
    print("✅ Connected to Kubernetes Cluster")
except Exception as e:
    print(f"❌ K8s Connection Failed: {e}")

# --- 2. SHARED LAUNCH LOGIC (The Brain) ---
def launch_lab(api, student_id, pod_manifest, service_manifest):
    try:
        print(f"🚀 Spawning Lab: {student_id}...")
        
        # 1. Create Pod
        api.create_namespaced_pod(namespace="default", body=pod_manifest)
        
        # 2. Create Service
        api.create_namespaced_service(namespace="default", body=service_manifest)
        
        # 3. CRITICAL: Wait for Container to Wake Up
        # I increased this to 10 seconds to fix the "Blank Page" error.
        print("⏳ Waiting 10s for container to boot...")
        time.sleep(10) 
        
        # 4. Find the Port Number
        svc = api.read_namespaced_service(name=f"{student_id}-svc", namespace="default")
        node_port = svc.spec.ports[0].node_port
        
        # 5. Generate the Link
        final_url = f"http://{HOST_IP}:{node_port}"
        
        print(f"✅ Ready at: {final_url}")
        
        return {
            "status": "success",
            "message": "Lab Deployed",
            "url": final_url
        }

    except Exception as e:
        print(f"🔥 Error: {e}")
        return {"status": "error", "message": str(e)}

# --- 3. ENDPOINT: PYTHON LAB ---
@app.post("/start-python-lab")
def start_python_lab():
    api = client.CoreV1Api()
    student_id = f"python-student-{random.randint(100, 999)}"
    
    pod_manifest = {
        "apiVersion": "v1",
        "kind": "Pod",
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
        "apiVersion": "v1",
        "kind": "Service",
        "metadata": {"name": f"{student_id}-svc"},
        "spec": {
            "selector": {"app": student_id},
            "type": "NodePort",
            "ports": [{"port": 8080, "targetPort": 8080}]
        }
    }

    return launch_lab(api, student_id, pod_manifest, service_manifest)

# --- 4. ENDPOINT: SQL LAB ---
@app.post("/start-sql-lab")
def start_sql_lab():
    api = client.CoreV1Api()
    student_id = f"sql-student-{random.randint(100, 999)}"
    
    pod_manifest = {
        "apiVersion": "v1",
        "kind": "Pod",
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
        "apiVersion": "v1",
        "kind": "Service",
        "metadata": {"name": f"{student_id}-svc"},
        "spec": {
            "selector": {"app": student_id},
            "type": "NodePort",
            "ports": [{"port": 8080, "targetPort": 8080}]
        }
    }

# --- 5. ENDPOINT: CYBER LAB ---
@app.post("/start-cyber-lab")
def start_cyber_lab():
    api = client.CoreV1Api()
    student_id = f"cyber-student-{random.randint(100, 999)}"
    
    pod_manifest = {
        "apiVersion": "v1",
        "kind": "Pod",
        "metadata": {"name": student_id, "labels": {"app": student_id}},
        "spec": {
            "containers": [{
                "name": "lab-container",
                "image": "my-cyber-lab:v1",
                "imagePullPolicy": "Never",
                "ports": [{"containerPort": 6080}] # <--- CHANGED TO 6080
            }]
        }
    }
    
    service_manifest = {
        "apiVersion": "v1",
        "kind": "Service",
        "metadata": {"name": f"{student_id}-svc"},
        "spec": {
            "selector": {"app": student_id},
            "type": "NodePort",
            "ports": [{"port": 6080, "targetPort": 6080}] ,# <--- CHANGED TO 6080
            "securityContext": {
                    "privileged": True,
                    "capabilities": {
                        "add": ["NET_ADMIN", "NET_RAW"]
                    }
                }
        }
    }

    return launch_lab(api, student_id, pod_manifest, service_manifest)