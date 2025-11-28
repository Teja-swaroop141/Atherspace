from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from kubernetes import client, config
import time
import random

app = FastAPI()

# Allow the frontend to talk to this backend (CORS)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# 1. Connect to Kubernetes (It looks for config in your computer)
try:
    config.load_kube_config()
    print("✅ Connected to Kubernetes")
except:
    print("❌ Could not connect to K8s. Is Docker Desktop running?")

@app.post("/start-python-lab")
def start_lab():
    api = client.CoreV1Api()
    
    # Generate a random ID for the student (e.g., student-492)
    student_id = f"student-{random.randint(100, 999)}"
    
    # --- STEP A: Define the Pod (The Container) ---
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
                # 👇 ADD THIS LINE HERE:
                "args": ["--auth", "none"] 
            }]
        }
    }
    
    # --- STEP B: Define the Service (The Network Door) ---
    # We use NodePort to expose it to your localhost on a random port (30000-32767)
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

    try:
        # Create them in Kubernetes
        print(f"🚀 Launching Lab for {student_id}...")
        api.create_namespaced_pod(namespace="default", body=pod_manifest)
        api.create_namespaced_service(namespace="default", body=service_manifest)
        
        # Wait 2 seconds for K8s to assign the port
        time.sleep(2)
        
        # Find out which Port number was assigned
        svc = api.read_namespaced_service(name=f"{student_id}-svc", namespace="default")
        node_port = svc.spec.ports[0].node_port
        
        # Return the URL to the Frontend
        return {
            "status": "success",
            "message": "Lab Ready!",
            "url": f"http://localhost:{node_port}" 
        }

    except Exception as e:
        return {"status": "error", "message": str(e)}