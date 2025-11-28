#$ ZeroSetup
**Instant, Ephemeral Developer Environments on Kubernetes.**

## 📂 Folder Structure

```text
zerosetup/
├── backend/
│   ├── main.py              # FastAPI Server (Manages K8s)
│   └── requirements.txt     # Python dependencies
├── frontend/
│   ├── src/                 # React Dashboard Code
│   ├── public/              # Assets (logo.svg)
│   └── index.html           # Entry file
└── labs/
    └── python/
        ├── Dockerfile       # VS Code + Python + Tools Image
        ├── welcome.py       # "Hacker Mode" CLI script
        ├── dashboard.py     # Streamlit GUI script
        └── marks.csv        # Sample Data
⚡ Quick Start Guide
1. Prerequisites
Docker Desktop (With Kubernetes Enabled).

Python 3.x & Node.js installed.

2. Build the Lab Image (Run Once)
You must build the Docker image before launching the app.

Bash

cd labs/python
docker build -t my-python-lab:v1 .
3. Run the Backend (Server)
Opens the connection to Kubernetes.

Bash

cd ../../backend

# Install Dependencies
pip install fastapi uvicorn kubernetes

# Run Server (Localhost)
python -m uvicorn main:app --reload
4. Run the Frontend (UI)
Launches the Dashboard.

Bash

cd ../frontend

# Install Dependencies
npm install

# Run React App (Localhost)
npm run dev
🎮 How to Demo
Open Browser: Go to http://localhost:5173.

Launch: Click "INITIATE LAUNCH" on the Python Card.

Access: When the button turns green, click "ACCESS TERMINAL".

Show Off:

Terminal: Type python3 welcome.py (Cool CLI visual).

GUI: Type streamlit run dashboard.py (Launches a website inside the lab).
