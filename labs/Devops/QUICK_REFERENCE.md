# DevOps Lab - Quick Reference

## 🚀 Build Command

```powershell
cd "c:\Users\SUMAN. S\Desktop\ENGINERING\edukube\ZeroSetup\labs\Devops"
docker build -t zero-devops-lab:latest .
```

## 📋 Lab Configuration

| Setting | Value |
|---------|-------|
| **Image Name** | `zero-devops-lab:latest` |
| **Endpoint** | `POST /start-devops-lab` |
| **Port** | 9000 |
| **Privileged** | Yes |
| **Startup Delay** | 10 seconds |

## 🔐 Login Credentials

**No password required** - Portainer runs without authentication in this setup.

## 🎨 Frontend Card Details

- **Color**: Cyan (#00D9FF)
- **Icon**: Container (3D box icon)
- **Loading Text**: "ORCHESTRATING..."
- **Access Button**: "OPEN PORTAINER"

## 📝 Files Modified

1. `labs/Devops/start.sh` - Added 10-second delay
2. `backend/main.py` - Added `/start-devops-lab` endpoint
3. `frontend/src/App.jsx` - Added DevOps card and launch function

## ✅ Integration Complete

The DevOps lab is now fully integrated into the ZeroSetup system!
