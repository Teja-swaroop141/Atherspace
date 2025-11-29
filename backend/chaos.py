import time
from kubernetes import client, config

# 1. Connect to Kubernetes
config.load_kube_config()
apps_api = client.AppsV1Api()
core_api = client.CoreV1Api()

DEPLOYMENT_NAME = "critical-server"

def start_chaos():
    print(f"💀 [Chaos Monkey] Ready to destroy {DEPLOYMENT_NAME}...")
    
    # 1. Check if Deployment exists, if not create it
    try:
        apps_api.read_namespaced_deployment(DEPLOYMENT_NAME, "default")
        print(f"✅ Target Found: {DEPLOYMENT_NAME} is running.")
    except:
        print("⚙️ Creating demo deployment...")
        # Create a simple Nginx server to kill
        container = client.V1Container(name="nginx", image="nginx:alpine")
        template = client.V1PodTemplateSpec(
            metadata=client.V1ObjectMeta(labels={"app": "chaos-demo"}),
            spec=client.V1PodSpec(containers=[container]))
        spec = client.V1DeploymentSpec(
            replicas=1,
            selector=client.V1LabelSelector(match_labels={"app": "chaos-demo"}),
            template=template)
        deployment = client.V1Deployment(
            metadata=client.V1ObjectMeta(name=DEPLOYMENT_NAME),
            spec=spec)
        apps_api.create_namespaced_deployment(namespace="default", body=deployment)
        print("✅ Demo Server Started. Waiting 5s...")
        time.sleep(5)

    # 2. Find the Pod Name
    pods = core_api.list_namespaced_pod("default", label_selector="app=chaos-demo")
    if not pods.items:
        print("❌ No pods found.")
        return
    
    victim_pod = pods.items[0].metadata.name
    print(f"🎯 Locked on target: {victim_pod}")
    
    # 3. THE KILL
    input(f"👉 Press ENTER to CRASH the server '{victim_pod}'...")
    print(f"🔥 KILLING {victim_pod}...")
    core_api.delete_namespaced_pod(victim_pod, "default")
    
    # 4. Watch the Resurrection
    print("🚑 Detecting failure... Waiting for Auto-Healing...")
    start = time.time()
    
    while True:
        pods = core_api.list_namespaced_pod("default", label_selector="app=chaos-demo")
        for p in pods.items:
            # Look for a NEW pod (different name)
            if p.metadata.name != victim_pod and p.status.phase == "Running":
                print(f"\n✨ RECOVERY SUCCESSFUL!")
                print(f"🆕 New Pod Started: {p.metadata.name}")
                print(f"⏱️ Downtime: {round(time.time() - start, 2)} seconds")
                return
        print(".", end="", flush=True)
        time.sleep(1)

if __name__ == "__main__":
    start_chaos()