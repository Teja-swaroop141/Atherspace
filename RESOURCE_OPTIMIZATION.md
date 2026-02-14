# Resource Optimization Guide

## 🔴 Current Problem
You have **641% CPU usage** from running multiple lab containers simultaneously. This is causing:
- High CPU usage
- System slowdown
- Docker Desktop instability
- Potential crashes

## 🎯 Solution: Resource Limits

### Quick Fix: Stop Unused Labs

**Only run ONE lab at a time!** Stop all labs you're not currently using:

```powershell
# See all running pods
kubectl get pods

# Delete all pods (stops all labs)
kubectl delete pods --all

# Or delete specific pods
kubectl delete pod <pod-name>
```

### Permanent Fix: Add Resource Limits

I'll add CPU and memory limits to your backend so each lab has restricted resources.

## 📊 Recommended Resource Limits Per Lab

| Lab | CPU Limit | Memory Limit | Notes |
|-----|-----------|--------------|-------|
| Python | 1 core | 2GB | Light IDE |
| SQL | 0.5 core | 1GB | Database + GUI |
| Cyber | 1 core | 2GB | VNC + tools |
| Data Science | 2 cores | 4GB | Heavy ML work |
| Web | 1 core | 2GB | Node + MongoDB |
| CN | 1 core | 2GB | VNC + NS2 |
| IoT | 1.5 cores | 3GB | Desktop environment |
| DevOps | 2 cores | 4GB | Docker-in-Docker |

## 🚀 Best Practices

### 1. **Run Only One Lab at a Time**
- Close labs when done
- Don't keep multiple labs open
- Your system will thank you!

### 2. **Stop All Labs When Not in Use**
```powershell
kubectl delete pods --all
```

### 3. **Monitor Resource Usage**
- Check Docker Desktop regularly
- Keep CPU usage under 100%
- Watch memory usage

### 4. **Increase Docker Desktop Resources** (Optional)
If you need to run multiple labs:
1. Open Docker Desktop → Settings
2. Go to **Resources**
3. Increase:
   - **CPUs**: 6-8 cores (if available)
   - **Memory**: 8-12 GB (if available)
4. Click **Apply & Restart**

## ⚡ Quick Commands

```powershell
# Stop all labs
kubectl delete pods --all

# See what's running
kubectl get pods

# See resource usage
kubectl top pods

# Delete specific lab
kubectl delete pod <pod-name>
```

## 🎯 Will Labs Still Run?

**Yes!** Labs will run fine with resource limits. The limits just prevent them from consuming too much CPU/memory. Benefits:
- ✅ Prevents system overload
- ✅ More stable performance
- ✅ Multiple labs can coexist (if needed)
- ✅ Docker Desktop won't crash
- ✅ Your computer stays responsive

## 📝 Current Running Labs (from screenshot)

I can see you have these running:
- `k8s_lab-container_python` - 21.29% CPU
- `k8s_lab-container_cn-stud` - 63.96% CPU (HIGH!)
- `k8s_lab-container_web-st` - 0.44%, 0.56% CPU
- `k8s_lab-container_aiml-st` - 0% CPU
- `k8s_lab-container_devops` - 0.22%, 0.12% CPU
- `k8s_lab-container_iot-stud` - 0% CPU (this is the one with HTTPS error)

**Total: 10+ containers running = 641% CPU!**

**Recommendation:** Delete all pods and only launch the lab you're currently using.
