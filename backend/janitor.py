import time
from kubernetes import client, config
from datetime import datetime, timezone

# 1. Connect to Kubernetes
try:
    config.load_kube_config()
    v1 = client.CoreV1Api()
    print("✅ Janitor Connected to Cluster. Monitoring for idle labs...")
except:
    print("❌ Could not connect to K8s.")

# CONFIG: Kill labs older than this (in seconds)
# Set to 60 seconds for the Demo so judges see it happen fast!
MAX_AGE_SECONDS = 60 

def janitor_loop():
    print(f"\n🔍 [Scanning] Checking for labs older than {MAX_AGE_SECONDS}s...")
    
    # Get all pods with the label 'app' (our student labs)
    try:
        pods = v1.list_namespaced_pod("default", label_selector="app")
    except:
        return

    if not pods.items:
        print("   Thinking... (No active labs found)")

    for pod in pods.items:
        # Only check running pods
        if pod.status.phase == "Running":
            start_time = pod.status.start_time
            if start_time:
                # Calculate Age
                now = datetime.now(timezone.utc)
                age = (now - start_time).total_seconds()
                
                pod_name = pod.metadata.name
                
                if age > MAX_AGE_SECONDS:
                    print(f"💀 [VIOLATION] {pod_name} is {int(age)}s old. TERMINATING...")
                    v1.delete_namespaced_pod(pod_name, "default")
                    print(f"💥 {pod_name} deleted successfully.")
                else:
                    time_left = MAX_AGE_SECONDS - int(age)
                    print(f"✅ [OK] {pod_name} is {int(age)}s old. (Lives for {time_left}s more)")

while True:
    janitor_loop()
    time.sleep(5) # Run check every 5 seconds