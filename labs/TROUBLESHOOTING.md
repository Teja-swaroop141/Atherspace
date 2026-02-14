# Docker Build Troubleshooting Guide

## Issue: Network Connectivity Error

You're seeing errors like:
```
ERROR: failed to solve: ubuntu:22.04: failed to resolve source metadata for docker.io/library/ubuntu:22.04: 
failed to do request: Head "https://registry-1.docker.io/v2/library/ubuntu/manifests/22.04": 
dialing registry-1.docker.io:443 container via direct connection because Docker Desktop has no HTTPS proxy: 
connecting to registry-1.docker.io:443: dial tcp: lookup registry-1.docker.io: no such host
```

This means Docker cannot connect to Docker Hub to download base images.

## Solutions (Try in Order)

### 1. Check Internet Connection
- Verify you have an active internet connection
- Try opening https://hub.docker.com in your browser
- Try pinging: `ping registry-1.docker.io`

### 2. Restart Docker Desktop
1. Right-click Docker Desktop icon in system tray
2. Select "Quit Docker Desktop"
3. Wait 10 seconds
4. Start Docker Desktop again
5. Wait for it to fully start (whale icon should be steady)

### 3. Check Docker Desktop Network Settings
1. Open Docker Desktop
2. Go to Settings (gear icon)
3. Go to "Resources" → "Network"
4. Try toggling "Enable host networking" if available
5. Click "Apply & Restart"

### 4. Configure DNS in Docker Desktop
1. Open Docker Desktop Settings
2. Go to "Docker Engine"
3. Add DNS configuration to the JSON:
```json
{
  "dns": ["8.8.8.8", "8.8.4.4"]
}
```
4. Click "Apply & Restart"

### 5. Check Windows Firewall/Antivirus
- Temporarily disable firewall/antivirus to test
- If it works, add Docker Desktop to allowed apps

### 6. Check Proxy Settings (If Behind Corporate Network)
If you're behind a corporate proxy:
1. Docker Desktop Settings → Resources → Proxies
2. Enable "Manual proxy configuration"
3. Enter your proxy details
4. Click "Apply & Restart"

### 7. Use Mobile Hotspot (Quick Test)
- Connect your PC to mobile hotspot
- Try building again
- This helps determine if it's a network restriction issue

## After Fixing Network Issue

Once Docker can connect to the internet, run the build script:

```powershell
cd "c:\Users\SUMAN. S\Desktop\ENGINERING\edukube\ZeroSetup\labs"
.\build-all-labs.ps1
```

Or build labs individually:
```powershell
# CN Lab (this one worked!)
cd "c:\Users\SUMAN. S\Desktop\ENGINERING\edukube\ZeroSetup\labs\cn"
docker build -t zero-cn-lab:latest .

# SQL Lab
cd "c:\Users\SUMAN. S\Desktop\ENGINERING\edukube\ZeroSetup\labs\sql"
docker build -t zero-sql-lab:latest .

# Web Lab
cd "c:\Users\SUMAN. S\Desktop\ENGINERING\edukube\ZeroSetup\labs\web"
docker build -t zero-web-lab:latest .

# Cyber Lab
cd "c:\Users\SUMAN. S\Desktop\ENGINERING\edukube\ZeroSetup\labs\cyber"
docker build -t zero-cyber-lab:latest .

# Python Lab
cd "c:\Users\SUMAN. S\Desktop\ENGINERING\edukube\ZeroSetup\labs\python"
docker build -t zero-simpleputhon-lab:latest .

# Data Science Lab
cd "c:\Users\SUMAN. S\Desktop\ENGINERING\edukube\ZeroSetup\labs\Data Science"
docker build -t zero-python-lab:latest .

# IoT Lab
cd "c:\Users\SUMAN. S\Desktop\ENGINERING\edukube\ZeroSetup\labs\iot"
docker build -t zero-iot-lab:latest .
```

## Note
The CN Lab build succeeded because it was using cached layers from a previous build. 
The other labs failed because they need to download new base images from Docker Hub.
