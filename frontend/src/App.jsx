import { useState } from 'react';
import axios from 'axios';
import './App.css';

// Automatically use the IP that the website is loaded from for the API connection
const API_BASE = `http://${window.location.hostname}:8000`;

// --- ICONS ---
const Icons = {
  Python: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="40" height="40">
      <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
    </svg>
  ),
  Database: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="40" height="40">
      <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
      <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
      <ellipse cx="12" cy="5" rx="9" ry="3" />
    </svg>
  ),
  Security: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="40" height="40">
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  ),
  Brain: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="40" height="40">
      <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 1.98-3A2.5 2.5 0 0 1 9.5 2Z" />
      <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-1.98-3A2.5 2.5 0 0 0 14.5 2Z" />
    </svg>
  ),
  Globe: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="40" height="40">
      <circle cx="12" cy="12" r="10" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  ),
  Network: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="40" height="40">
      <circle cx="12" cy="12" r="10" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  ),
  Chip: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="40" height="40">
      <rect x="4" y="4" width="16" height="16" rx="2" ry="2"></rect>
      <rect x="9" y="9" width="6" height="6"></rect>
      <line x1="9" y1="1" x2="9" y2="4"></line>
      <line x1="15" y1="1" x2="15" y2="4"></line>
      <line x1="9" y1="20" x2="9" y2="23"></line>
      <line x1="15" y1="20" x2="15" y2="23"></line>
      <line x1="20" y1="9" x2="23" y2="9"></line>
      <line x1="20" y1="14" x2="23" y2="14"></line>
      <line x1="1" y1="9" x2="4" y2="9"></line>
      <line x1="1" y1="14" x2="4" y2="14"></line>
    </svg>
  ),
  Rocket: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="20" height="20">
      <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
      <path d="M12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
      <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
      <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
    </svg>
  ),
  Terminal: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="20" height="20">
      <polyline points="4 17 10 11 4 5"></polyline>
      <line x1="12" y1="19" x2="20" y2="19"></line>
    </svg>
  ),
  Container: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="40" height="40">
      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
      <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
      <line x1="12" y1="22.08" x2="12" y2="12" />
    </svg>
  )
};

function App() {
  const [loadingPy, setLoadingPy] = useState(false);
  const [pythonUrl, setPythonUrl] = useState(null);

  const [loadingSql, setLoadingSql] = useState(false);
  const [sqlUrl, setSqlUrl] = useState(null);

  const [loadingCyber, setLoadingCyber] = useState(false);
  const [cyberUrl, setCyberUrl] = useState(null);

  const [loadingJupyter, setLoadingJupyter] = useState(false);
  const [jupyterUrl, setJupyterUrl] = useState(null);

  const [loadingMern, setLoadingMern] = useState(false);
  const [mernUrl, setMernUrl] = useState(null);

  const [loadingCn, setLoadingCn] = useState(false);
  const [cnUrl, setCnUrl] = useState(null);

  const [loadingIot, setLoadingIot] = useState(false);
  const [iotUrl, setIotUrl] = useState(null);

  const [loadingDevops, setLoadingDevops] = useState(false);
  const [devopsUrl, setDevopsUrl] = useState(null);

  // --- LAUNCH FUNCTIONS USING API_BASE ---

  const launchPython = async () => {
    setLoadingPy(true);
    try {
      // Use API_BASE, not hardcoded IP
      const response = await axios.post(`${API_BASE}/start-python-lab`);
      if (response.data.status === "error") {
        alert("❌ Error: " + response.data.message);
      } else if (response.data.url) {
        setPythonUrl(response.data.url);
      }
    } catch (error) {
      alert("⚠️ Connection Error");
    }
    setLoadingPy(false);
  };

  const launchIot = async () => {
    setLoadingIot(true);
    try {
      const response = await axios.post(`${API_BASE}/start-iot-lab`);
      if (response.data.status === "error") {
        alert("❌ Error: " + response.data.message);
      } else if (response.data.url) {
        setIotUrl(response.data.url);
      }
    } catch (error) {
      alert("⚠️ Connection Error");
    }
    setLoadingIot(false);
  };

  const launchSQL = async () => {
    setLoadingSql(true);
    try {
      const response = await axios.post(`${API_BASE}/start-sql-lab`);
      if (response.data.status === "error") {
        alert("❌ Error: " + response.data.message);
      } else if (response.data.url) {
        setSqlUrl(response.data.url);
      }
    } catch (error) {
      alert("⚠️ Connection Error");
    }
    setLoadingSql(false);
  };

  const launchCyber = async () => {
    setLoadingCyber(true);
    try {
      const response = await axios.post(`${API_BASE}/start-cyber-lab`);
      if (response.data.status === "error") {
        alert("❌ Error: " + response.data.message);
      } else if (response.data.url) {
        setCyberUrl(response.data.url);
      }
    } catch (error) {
      alert("⚠️ Connection Error");
    }
    setLoadingCyber(false);
  };

  const launchJupyter = async () => {
    setLoadingJupyter(true);
    try {
      const response = await axios.post(`${API_BASE}/start-aiml-lab`);
      if (response.data.status === "error") {
        alert("❌ Error: " + response.data.message);
      } else if (response.data.url) {
        setJupyterUrl(response.data.url);
      }
    } catch (error) {
      alert("⚠️ Connection Error");
    }
    setLoadingJupyter(false);
  };

  const launchMern = async () => {
    setLoadingMern(true);
    try {
      const response = await axios.post(`${API_BASE}/start-web-lab`);
      if (response.data.status === "error") {
        alert("❌ Error: " + response.data.message);
      } else if (response.data.url) {
        setMernUrl(response.data.url);
      }
    } catch (error) {
      console.error(error);
      alert("⚠️ Connection Error: Is the backend running?");
    }
    setLoadingMern(false);
  };

  const launchCn = async () => {
    setLoadingCn(true);
    try {
      const response = await axios.post(`${API_BASE}/start-cn-lab`);
      if (response.data.status === "error") {
        alert("❌ Error: " + response.data.message);
      } else if (response.data.url) {
        setCnUrl(response.data.url);
      }
    } catch (error) {
      alert("⚠️ Connection Error");
    }
    setLoadingCn(false);
  };

  const launchDevops = async () => {
    setLoadingDevops(true);
    try {
      const response = await axios.post(`${API_BASE}/start-devops-lab`);
      if (response.data.status === "error") {
        alert("❌ Error: " + response.data.message);
      } else if (response.data.url) {
        setDevopsUrl(response.data.url);
      }
    } catch (error) {
      alert("⚠️ Connection Error");
    }
    setLoadingDevops(false);
  };

  return (
    <div className="app-container">

      {/* HEADER */}
      <header className="top-bar">
        <div className="logo">
          <h1>
            ZEROSETUP <small>OS // V.1.0</small>
          </h1>
        </div>
        <div className="status-indicators">
          <span style={{ color: '#33ff33', textShadow: '0 0 10px #33ff33' }}>
            ● SYSTEM ONLINE
          </span>
          <span>NET: SECURE</span>
          <span className="user-badge">STUDENT_1</span>
        </div>
      </header>

      {/* DASHBOARD */}
      <main className="dashboard">
        <div className="intro-text">
          <h2>Command Deck</h2>
          <p>
            Initialize a specialized neural environment to begin your mission.
            All systems are pre-calibrated and ready for deployment.
          </p>
        </div>

        <div className="grid-layout">

          {/* CARD 1: PYTHON CORE */}
          <div className="card active-card">
            <div className="scan-line"></div>
            <div className="card-header">
              <div className="icon-box python-icon"><Icons.Python /></div>
              <span className="status-pill online">ONLINE</span>
            </div>
            <h3>Python Virtual Lab</h3>
            <p className="desc">
              High-performance environment optimized for Data Science & AI tasks.
              Comes pre-installed with Pandas for data analysis, Rich for terminal
              aesthetics, and Streamlit for dashboards.
            </p>
            <div className="specs">
              <span>RAM: 4GB</span><span>STORAGE: PERSISTENT</span>
            </div>
            {!pythonUrl ? (
              <button onClick={launchPython} disabled={loadingPy} className="action-btn launch-btn">
                {loadingPy ? "INITIALIZING..." : <><Icons.Rocket /> DEPLOY PYTHON</>}
              </button>
            ) : (
              <a href={pythonUrl} target="_blank" rel="noopener noreferrer" className="action-btn access-btn">
                <Icons.Terminal /> ACCESS TERMINAL
              </a>
            )}
          </div>

          {/* CARD 2: SQL PLAYGROUND */}
          <div className="card active-card">
            <div className="scan-line"></div>
            <div className="card-header">
              <div className="icon-box sql-icon"><Icons.Database /></div>
              <span className="status-pill online">ONLINE</span>
            </div>
            <h3>SQL & DB Virtual Lab</h3>
            <p className="desc">
              Production-ready MySQL database instance paired with the Adminer Web GUI.
              Includes pre-loaded complex college datasets to allow for immediate SQL
              querying and relational analysis.
            </p>
            <div className="specs">
              <span>DB: MARIADB</span><span>GUI: ADMINER</span>
            </div>
            {!sqlUrl ? (
              <button onClick={launchSQL} disabled={loadingSql} className="action-btn launch-btn">
                {loadingSql ? "PROVISIONING..." : <><Icons.Rocket /> DEPLOY DB</>}
              </button>
            ) : (
              <a href={sqlUrl} target="_blank" rel="noopener noreferrer" className="action-btn access-btn">
                <Icons.Terminal /> OPEN DATABASE
              </a>
            )}
          </div>

          {/* CARD 3: BLACK OPS (CYBER LAB) */}
          <div className="card active-card cyber-card">
            <div className="scan-line cyber-scan"></div>
            <div className="card-header">
              <div className="icon-box cyber-icon"><Icons.Security /></div>
              <span className="status-pill restricted">RESTRICTED</span>
            </div>
            <h3>Cyber Virtual Lab</h3>
            <p className="desc">
              Ubuntu Security Box equipped with Nmap, Netcat, and a hidden vulnerability
              target. Advanced penetration testing environment. Authorized personnel only.
            </p>
            <div className="specs cyber-specs">
              <span>TOOLS: NMAP/NC</span><span>TARGET: ACTIVE</span>
            </div>
            {!cyberUrl ? (
              <button onClick={launchCyber} disabled={loadingCyber} className="action-btn cyber-launch-btn">
                {loadingCyber ? "BREACHING..." : <><Icons.Rocket /> DEPLOY OPS</>}
              </button>
            ) : (
              <a href={cyberUrl} target="_blank" rel="noopener noreferrer" className="action-btn cyber-access-btn">
                <Icons.Terminal /> ENTER TERMINAL
              </a>
            )}
          </div>

          {/* CARD 4: DATA SCIENCE & AI LAB */}
          <div className="card active-card">
            <div className="scan-line"></div>
            <div className="card-header">
              <div className="icon-box jupyter-icon"><Icons.Brain /></div>
              <span className="status-pill online">ONLINE</span>
            </div>
            <h3>Data Science & AI Lab</h3>
            <p className="desc">
              JupyterLab environment optimized for machine learning workflows.
              Pre-loaded with Pandas, NumPy, Matplotlib, and Scikit-learn. Includes
              Titanic dataset and sample visualization.
            </p>
            <div className="specs">
              <span>ENV: JUPYTER</span><span>DATASETS: LOADED</span>
            </div>
            {!jupyterUrl ? (
              <button onClick={launchJupyter} disabled={loadingJupyter} className="action-btn launch-btn">
                {loadingJupyter ? "INITIALIZING..." : <><Icons.Rocket /> DEPLOY LAB</>}
              </button>
            ) : (
              <a href={jupyterUrl} target="_blank" rel="noopener noreferrer" className="action-btn access-btn">
                <Icons.Terminal /> OPEN JUPYTER
              </a>
            )}
          </div>

          {/* CARD 5: FULL-STACK WEB LAB */}
          <div className="card active-card web-card">
            <div className="scan-line web-scan"></div>
            <div className="card-header">
              <div className="icon-box mern-icon"><Icons.Globe /></div>
              <span className="status-pill online">ONLINE</span>
            </div>
            <h3>Full-Stack Web Lab</h3>
            <p className="desc">
              Complete MERN stack development environment with Node.js, React, and
              MongoDB pre-configured. Features live preview functionality that automatically
              exposes your React app.
            </p>
            <div className="specs">
              <span>STACK: MERN</span><span>PREVIEW: LIVE</span>
            </div>
            {!mernUrl ? (
              <button onClick={launchMern} disabled={loadingMern} className="action-btn launch-btn">
                {loadingMern ? "PROVISIONING..." : <><Icons.Rocket /> DEPLOY STACK</>}
              </button>
            ) : (
              <a href={mernUrl} target="_blank" rel="noopener noreferrer" className="action-btn access-btn">
                <Icons.Terminal /> OPEN IDE
              </a>
            )}
          </div>

          {/* CARD 6: NETWORKS LAB */}
          <div className="card active-card network-card">
            <div className="scan-line network-scan"></div>
            <div className="card-header">
              <div className="icon-box network-icon"><Icons.Network /></div>
              <span className="status-pill online">ONLINE</span>
            </div>
            <h3>Networks Lab</h3>
            <p className="desc">
              NS-2 Network Simulator with NAM (Network Animator) for protocol visualization.
              Execute TCL scripts to simulate network topologies, analyze packet flow, and
              visualize protocols.
            </p>
            <div className="specs network-specs">
              <span>SIM: NS-2</span><span>VISUAL: NAM</span>
            </div>
            {!cnUrl ? (
              <button onClick={launchCn} disabled={loadingCn} className="action-btn network-launch-btn">
                {loadingCn ? "SIMULATING..." : <><Icons.Rocket /> DEPLOY NS2 & CN</>}
              </button>
            ) : (
              <a href={cnUrl} target="_blank" rel="noopener noreferrer" className="action-btn network-access-btn">
                <Icons.Terminal /> ENTER LAB
              </a>
            )}
          </div>

          {/* CARD 7: IOT & ROBOTICS LAB */}
          <div className="card active-card">
            <div className="scan-line"></div>
            <div className="card-header">
              <div className="icon-box" style={{ color: '#FF9900', borderColor: '#FF9900' }}>
                <Icons.Chip />
              </div>
              <span className="status-pill online">ONLINE</span>
            </div>
            <h3>IoT & Robotics Lab</h3>
            <p className="desc">
              Virtual Electronics workbench. Write code in Arduino IDE and simulate
              hardware in real-time using SimulIDE. Test circuits with virtual LEDs,
              Motors, and LCDs.
            </p>
            <div className="specs">
              <span>IDE: ARDUINO</span><span>SIM: SIMULIDE</span>
            </div>
            {!iotUrl ? (
              <button onClick={launchIot} disabled={loadingIot} className="action-btn launch-btn" style={{ borderColor: '#FF9900', color: '#FF9900', boxShadow: '0 0 15px rgba(255, 153, 0, 0.25)' }}>
                {loadingIot ? "ASSEMBLING..." : <><Icons.Rocket /> DEPLOY LAB</>}
              </button>
            ) : (
              <a href={iotUrl} target="_blank" rel="noopener noreferrer" className="action-btn access-btn" style={{ borderColor: '#FF9900', color: '#FF9900' }}>
                <Icons.Terminal /> ENTER LAB
              </a>
            )}
          </div>

          {/* CARD 8: DEVOPS LAB */}
          <div className="card active-card" style={{ borderColor: '#00D9FF' }}>
            <div className="scan-line" style={{ background: 'linear-gradient(90deg, transparent, #00D9FF, transparent)' }}></div>
            <div className="card-header">
              <div className="icon-box" style={{ color: '#00D9FF', borderColor: '#00D9FF' }}>
                <Icons.Container />
              </div>
              <span className="status-pill online">ONLINE</span>
            </div>
            <h3>DevOps & Container Lab</h3>
            <p className="desc">
              Docker-in-Docker environment with Portainer UI for container management.
              Includes kubectl for Kubernetes orchestration. Build, deploy, and manage
              containerized applications.
            </p>
            <div className="specs">
              <span>DOCKER: DinD</span><span>UI: PORTAINER</span>
            </div>
            {!devopsUrl ? (
              <button onClick={launchDevops} disabled={loadingDevops} className="action-btn launch-btn" style={{ borderColor: '#00D9FF', color: '#00D9FF', boxShadow: '0 0 15px rgba(0, 217, 255, 0.25)' }}>
                {loadingDevops ? "ORCHESTRATING..." : <><Icons.Rocket /> DEPLOY LAB</>}
              </button>
            ) : (
              <a href={devopsUrl} target="_blank" rel="noopener noreferrer" className="action-btn access-btn" style={{ borderColor: '#00D9FF', color: '#00D9FF' }}>
                <Icons.Terminal /> OPEN PORTAINER
              </a>
            )}
          </div>

        </div>
      </main>
    </div>
  );
}

export default App;