Instant, Ephemeral Developer Environments on Kubernetes.

📂 Folder Structure
Plaintext

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

# Run Server (Visible to WiFi network)
python -m uvicorn main:app --reload --host 0.0.0.0 --port 8000
4. Run the Frontend (UI)
Launches the Dashboard.

Bash

cd ../frontend
# Install Dependencies
npm install

# Run React App (Visible to WiFi network)
npm run dev -- --host
