# 🚀 ZeroSetup
### *Stop Installing. Start Coding. Instant Cloud Labs for Universities.*

**ZeroSetup** is an Internal Developer Platform (IDP) that uses Kubernetes to provide students with instant, pre-configured development environments in their browser. No installation required.

---

## 📂 Project Structure

```
zerosetup/
├── backend/
│   ├── main.py              # FastAPI Controller (Orchestrates Kubernetes)
│   └── requirements.txt     # Python dependencies (fastapi, uvicorn, kubernetes)
├── frontend/
│   ├── src/                 # React.js + Tailwind Sci-Fi Dashboard
│   ├── public/              # Static Assets (Logos, Icons)
│   └── index.html           # Entry point
└── labs/                    # The "Gold Images" for students
    ├── python/
    │   ├── Dockerfile       # VS Code + Pandas + Streamlit
    │   ├── welcome.py       # CLI Demo Script
    │   └── dashboard.py     # GUI Demo Script
    ├── sql/
    │   ├── Dockerfile       # MariaDB + Adminer GUI + Auto-Login Script
    │   └── init.sql         # Pre-loaded "College" Database Data
    └── cyber/
        ├── Dockerfile       # Kali-style Tools + NoVNC Desktop + XFCE
        └── secret.txt       # Hidden Flag for CTF Challenge
```



⚡ Quick Start Guide (Run Locally)
1. Prerequisites
Docker Desktop (With Kubernetes Enabled in Settings).

Python 3.x & Node.js installed.

2. Build the Lab Images 🐳
You must build the Docker images so Kubernetes can find them. Run these commands one by one:

Bash

# 1. Build Python Lab
cd labs/python
docker build -t my-python-lab:v1 .

# 2. Build SQL Lab
cd ../sql
docker build -t my-sql-lab:v1 .

# 3. Build Cyber Lab (This takes a few minutes)
cd ../cyber
docker build -t my-cyber-lab:v1 .
3. Start the Backend (The Brain) 🧠
This server listens for API calls and commands Kubernetes to spawn pods.

Bash

cd ../../backend

# Install Dependencies
pip install fastapi uvicorn kubernetes

# Run Server (Network Accessible)
# Note: Allows access from other devices on the same WiFi
python -m uvicorn main:app --reload --host 0.0.0.0 --port 8000
4. Start the Frontend (The Dashboard) 🎨
This launches the React User Interface.

Bash

cd ../frontend

# Install Dependencies
npm install

# Run React App
npm run dev -- --host
🛠 Tech Stack
Orchestration: Kubernetes (K3s / Docker Desktop K8s)

Backend: Python (FastAPI) + Kubernetes Python Client

Frontend: React (Vite) + CSS Modules (Neon/Space Theme)

Container Runtime: Docker

Remote Access: NoVNC (Desktop), Code-Server (IDE), Pgweb/Adminer (DB GUI)
