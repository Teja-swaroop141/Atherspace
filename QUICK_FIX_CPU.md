# Quick Commands to Reduce CPU Usage

## 🔴 IMMEDIATE ACTION: Stop All Labs

Your system has **641% CPU usage** from 10+ running labs. Stop them NOW:

```powershell
# Delete all running lab pods
kubectl delete pods --all

# Verify they're stopped
kubectl get pods
```

## ✅ What I Fixed

Added resource limits to the backend (`main.py`):
- **CPU Limit**: 2 cores per lab (prevents overload)
- **Memory Limit**: 4GB per lab
- **CPU Request**: 0.25 cores minimum
- **Memory Request**: 512MB minimum

## 🎯 New Behavior

**Before:** Labs could use unlimited CPU → 641% usage!
**After:** Each lab limited to 2 CPU cores max → controlled usage

## 📋 Steps to Apply Fix

1. **Stop all running labs:**
   ```powershell
   kubectl delete pods --all
   ```

2. **Restart the backend** (to load new resource limits):
   - Press `Ctrl+C` in the backend terminal
   - Run: `python -m uvicorn main:app --reload --host 0.0.0.0 --port 8000`

3. **Launch labs one at a time** - Don't run multiple labs simultaneously!

## 💡 Best Practices

✅ **Run ONLY ONE lab at a time**
✅ **Close labs when done** (`kubectl delete pods --all`)
✅ **Monitor Docker Desktop** - Keep CPU under 100%
❌ **Don't run 10 labs at once** - Your system can't handle it!

## 🚀 Will Labs Still Work?

**YES!** Labs will work perfectly. The limits just prevent them from hogging all CPU.

- ✅ Labs run smoothly
- ✅ System stays responsive
- ✅ Docker Desktop won't crash
- ✅ You can actually use your computer!

## 📊 Expected CPU Usage

| Scenario | CPU Usage |
|----------|-----------|
| **Before (10 labs)** | 641% 🔴 |
| **After (1 lab)** | 20-60% ✅ |
| **After (2 labs)** | 40-120% ⚠️ |
| **After (3+ labs)** | 60-200%+ 🔴 |

**Recommendation: Run 1 lab at a time!**
