# IoT Lab HTTPS Error - Fix Applied

## Problem
When accessing the IoT lab, you got this error:
```
Error: This application requires a secure connection (HTTPS). Please check the URL.
```

## Root Cause
The IoT lab uses the LinuxServer Webtop base image with KasmVNC technology. By default, KasmVNC requires HTTPS connections for security, but your ZeroSetup system uses HTTP.

## Solution Applied
Added environment variable to disable HTTPS requirement:

```dockerfile
ENV DISABLE_HTTPS=true
```

This was added to `labs/iot/Dockerfile` at line 9.

## Next Steps
1. **Wait for rebuild to complete** - The IoT lab image is currently rebuilding
2. **Stop any running IoT lab containers** - If you have an IoT lab running, stop it
3. **Launch a new IoT lab** - After rebuild completes, launch a fresh IoT lab instance
4. **Test** - The HTTPS error should be gone, and you should see the desktop environment

## Rebuild Command
```powershell
cd "c:\Users\SUMAN. S\Desktop\ENGINERING\edukube\ZeroSetup\labs\iot"
docker build -t zero-iot-lab:latest .
```

## Status
🔄 **Currently rebuilding** - This may take 5-10 minutes depending on network speed.
