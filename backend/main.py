from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from kubernetes import client, config
import time
import random
import string
import socket
import urllib3

# --- 1. SETUP & CONFIGURATION ---
app = FastAPI()

# Disable SSL Warnings
urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)

# Load Kube Config
try:
    config.load_kube_config()
    # Force Python to trust the local Docker cluster
    configuration = client.Configuration.get_default_copy()
    configuration.verify_ssl = False
    client.Configuration.set_default(configuration)
    print("✅ Connected to Kubernetes Cluster")
except Exception as e:
    print(f"⚠️ Warning: Could not load Kube Config. Is Docker running? {e}")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

def get_real_network_ip():
    """
    Connects to an external server (Google DNS) to find the interface 
    used for the internet. This returns your actual Wi-Fi/Hotspot IP.
    """
    try:
        s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
        # We don't actually send data, just tell the OS to figure out the route
        s.connect(("8.8.8.8", 80))
        ip = s.getsockname()[0]
        s.close()
        return ip
    except Exception:
        # If no internet, fall back to localhost
        return "127.0.0.1"

# Automatically set the Host IP
# HOST_IP = get_real_network_ip()
def get_real_ip():
    try:
        s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
        s.connect(("8.8.8.8", 80))
        ip = s.getsockname()[0]
        s.close()
        return ip
    except:
        return "127.0.0.1"

HOST_IP = "172.30.16.1"
print(f"🌍 Server running on Real Network IP: {HOST_IP}")

# --- 2. THE UNIVERSAL LAB ENGINE ---
def create_lab_session(lab_prefix, image_name, container_port=8080, extra_args=None, privileged=False, url_path=""):
    """
    Creates a Pod and a Service for a specific student lab.
    """
    # 1. Generate unique ID
    random_id = ''.join(random.choices(string.digits, k=4))
    pod_name = f"{lab_prefix}-{random_id}"
    
    # 2. Connect to Kubernetes
    v1 = client.CoreV1Api()
    
    # 3. Security Context
    security_context = {}
    if privileged:
        security_context = {
            "privileged": True,
            "capabilities": {"add": ["NET_ADMIN", "NET_RAW"]}
        }

    # 4. Define the Pod
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
                "imagePullPolicy": "Never",
                "ports": [{"containerPort": container_port}],
                "securityContext": security_context,
                "args": extra_args if extra_args else []
            }]
        }
    }

    # 5. Define the Service
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
        
        # Wait a moment for K8s to assign the port
        time.sleep(2)
        
        # Get the assigned NodePort
        svc = v1.read_namespaced_service(name=f"{pod_name}-svc", namespace="default")
        node_port = svc.spec.ports[0].node_port
        
        # Use the detected HOST_IP for the URL
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


# --- 3. LAB ENDPOINTS ---

@app.post("/start-web-lab")
def start_web_lab():
    return create_lab_session("web-student", "zero-web-lab:latest", container_port=8080, extra_args=None)

@app.post("/start-python-lab")
def start_python_lab():
    return create_lab_session("python-student", "zero-simpleputhon-lab:latest", container_port=8080, extra_args=["--auth", "none"])

@app.post("/start-sql-lab")
def start_sql_lab():
    return create_lab_session("sql-student", "zero-sql-lab:latest", container_port=8080)

@app.post("/start-aiml-lab")
def start_aiml_lab():
    return create_lab_session("aiml-student", "zero-python-lab:latest", container_port=8888, extra_args=[
        "start-notebook.sh", "--NotebookApp.token=''", "--NotebookApp.password=''"
    ])

@app.post("/start-iot-lab")
def start_iot_lab():
    return create_lab_session(
        "iot-student", 
        "zero-iot-lab:latest", 
        container_port=3000,   # <--- MUST BE 3000
        privileged=True,
        url_path=""            # <--- MUST BE EMPTY
    )
@app.post("/start-cyber-lab")
def start_cyber_lab():
    return create_lab_session("cyber-student", "zero-cyber-lab:latest", container_port=6080, privileged=True, url_path="/vnc.html?autoconnect=true")

@app.post("/start-cn-lab")
def start_cn_lab():
    return create_lab_session("cn-student", "zero-cn-lab:latest", container_port=6080, privileged=True, url_path="/vnc.html?autoconnect=true")

# Run command: uvicorn main:app --host 0.0.0.0 --port 8000 --reload