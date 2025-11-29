import { useState } from 'react';
import axios from 'axios';
import './App.css';

// --- ICONS ---
const Icons = {
  Python: () => (
    <svg 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      width="40" 
      height="40"
    >
      <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
    </svg>
  ),
  Database: () => (
    <svg 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      width="40" 
      height="40"
    >
      <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/>
      <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/>
      <ellipse cx="12" cy="5" rx="9" ry="3"/>
    </svg>
  ),
  Security: () => (
    <svg 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      width="40" 
      height="40"
    >
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
      <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
    </svg>
  ),
  Brain: () => (
    <svg 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      width="40" 
      height="40"
    >
      <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 1.98-3A2.5 2.5 0 0 1 9.5 2Z"/>
      <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-1.98-3A2.5 2.5 0 0 0 14.5 2Z"/>
    </svg>
  ),
  Globe: () => (
    <svg 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      width="40" 
      height="40"
    >
      <circle cx="12" cy="12" r="10"/>
      <line x1="2" y1="12" x2="22" y2="12"/>
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
    </svg>
  ),
  Code: () => (
    <svg 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      width="40" 
      height="40"
    >
      <polyline points="16 18 22 12 16 6"/>
      <polyline points="8 6 2 12 8 18"/>
    </svg>
  ),
  Rocket: () => (
    <svg 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      width="20" 
      height="20"
    >
      <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/>
      <path d="M12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/>
      <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/>
      <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/>
    </svg>
  ),
  Terminal: () => (
    <svg 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      width="20" 
      height="20"
    >
      <polyline points="4 17 10 11 4 5"></polyline>
      <line x1="12" y1="19" x2="20" y2="19"></line>
    </svg>
  )
};

function App() {
  // Python Lab State
  const [loadingPy, setLoadingPy] = useState(false);
  const [pythonUrl, setPythonUrl] = useState(null);

  // SQL Lab State
  const [loadingSql, setLoadingSql] = useState(false);
  const [sqlUrl, setSqlUrl] = useState(null);

  // Cyber Lab State
  const [loadingCyber, setLoadingCyber] = useState(false);
  const [cyberUrl, setCyberUrl] = useState(null);

  // Jupyter Lab State
  const [loadingJupyter, setLoadingJupyter] = useState(false);
  const [jupyterUrl, setJupyterUrl] = useState(null);

  // MERN Lab State
  const [loadingMern, setLoadingMern] = useState(false);
  const [mernUrl, setMernUrl] = useState(null);

  // C++ Lab State
  const [loadingCpp, setLoadingCpp] = useState(false);
  const [cppUrl, setCppUrl] = useState(null);

  // Launch Python Lab
  const launchPython = async () => {
    setLoadingPy(true);
    try {
      const response = await axios.post('http://localhost:8000/start-python-lab');
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

  // Launch SQL Lab
  const launchSQL = async () => {
    setLoadingSql(true);
    try {
      const response = await axios.post('http://localhost:8000/start-sql-lab');
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

  // Launch Cyber Lab
  const launchCyber = async () => {
    setLoadingCyber(true);
    try {
      const response = await axios.post('http://localhost:8000/start-cyber-lab');
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

  // Launch Jupyter Lab
  const launchJupyter = async () => {
    setLoadingJupyter(true);
    try {
      const response = await axios.post('http://localhost:8000/start-jupyter-lab');
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

  // Launch MERN Lab
  const launchMern = async () => {
    setLoadingMern(true);
    try {
      const response = await axios.post('http://localhost:8000/start-mern-lab');
      if (response.data.status === "error") {
        alert("❌ Error: " + response.data.message);
      } else if (response.data.url) {
        setMernUrl(response.data.url);
      }
    } catch (error) {
      alert("⚠️ Connection Error");
    }
    setLoadingMern(false);
  };

  // Launch C++ Lab
  const launchCpp = async () => {
    setLoadingCpp(true);
    try {
      const response = await axios.post('http://localhost:8000/start-cpp-lab');
      if (response.data.status === "error") {
        alert("❌ Error: " + response.data.message);
      } else if (response.data.url) {
        setCppUrl(response.data.url);
      }
    } catch (error) {
      alert("⚠️ Connection Error");
    }
    setLoadingCpp(false);
  };

  return (
    <div className="app-container">
      
      {/* HEADER */}
      <header className="top-bar">
        <div className="logo">
          <img 
            src="/logo.svg" 
            alt="ZeroSetup" 
            style={{ height: '32px', marginRight: '15px' }} 
          />
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
              <div className="icon-box python-icon">
                <Icons.Python />
              </div>
              <span className="status-pill online">ONLINE</span>
            </div>
            
            <h3>Python Virtual Lab</h3>
            
            <p className="desc">
              High-performance environment optimized for Data Science & AI tasks. 
              Comes pre-installed with Pandas for data analysis, Rich for terminal 
              aesthetics, and Streamlit for dashboards.
            </p>

            <div className="specs">
              <span>RAM: 4GB</span>
              <span>STORAGE: PERSISTENT</span>
            </div>

            {!pythonUrl ? (
              <button 
                onClick={launchPython} 
                disabled={loadingPy} 
                className="action-btn launch-btn"
              >
                {loadingPy ? (
                  "INITIALIZING..."
                ) : (
                  <>
                    <Icons.Rocket /> DEPLOY PYTHON
                  </>
                )}
              </button>
            ) : (
              <a 
                href={pythonUrl} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="action-btn access-btn"
              >
                <Icons.Terminal /> ACCESS TERMINAL
              </a>
            )}
          </div>

          {/* CARD 2: SQL PLAYGROUND */}
          <div className="card active-card">
            <div className="scan-line"></div>
            
            <div className="card-header">
              <div className="icon-box sql-icon">
                <Icons.Database />
              </div>
              <span className="status-pill online">ONLINE</span>
            </div>
            
            <h3>SQL & DB Virtual Lab</h3>
            
            <p className="desc">
              Production-ready MySQL database instance paired with the Adminer Web GUI. 
              Includes pre-loaded complex college datasets to allow for immediate SQL 
              querying and relational analysis.
            </p>

            <div className="specs">
              <span>DB: MARIADB</span>
              <span>GUI: ADMINER</span>
            </div>

            {!sqlUrl ? (
              <button 
                onClick={launchSQL} 
                disabled={loadingSql} 
                className="action-btn launch-btn"
              >
                {loadingSql ? (
                  "PROVISIONING..."
                ) : (
                  <>
                    <Icons.Rocket /> DEPLOY DB
                  </>
                )}
              </button>
            ) : (
              <a 
                href={sqlUrl} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="action-btn access-btn"
              >
                <Icons.Terminal /> OPEN DATABASE
              </a>
            )}
          </div>

          {/* CARD 3: BLACK OPS (CYBER LAB) */}
          <div className="card active-card cyber-card">
            <div className="scan-line cyber-scan"></div>
            
            <div className="card-header">
              <div className="icon-box cyber-icon">
                <Icons.Security />
              </div>
              <span className="status-pill restricted">RESTRICTED</span>
            </div>
            
            <h3>Cyber Virtual Lab</h3>
            
            <p className="desc">
              Ubuntu Security Box equipped with Nmap, Netcat, and a hidden vulnerability 
              target. Advanced penetration testing environment. Authorized personnel only.
            </p>
            
            <div className="specs cyber-specs">
              <span>TOOLS: NMAP/NC</span>
              <span>TARGET: ACTIVE</span>
            </div>

            {!cyberUrl ? (
              <button 
                onClick={launchCyber} 
                disabled={loadingCyber} 
                className="action-btn cyber-launch-btn"
              >
                {loadingCyber ? (
                  "BREACHING..."
                ) : (
                  <>
                    <Icons.Rocket /> DEPLOY OPS
                  </>
                )}
              </button>
            ) : (
              <a 
                href={cyberUrl} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="action-btn cyber-access-btn"
              >
                <Icons.Terminal /> ENTER TERMINAL
              </a>
            )}
          </div>

          {/* CARD 4: DATA SCIENCE & AI LAB */}
          <div className="card active-card">
            <div className="scan-line"></div>
            
            <div className="card-header">
              <div className="icon-box jupyter-icon">
                <Icons.Brain />
              </div>
              <span className="status-pill online">ONLINE</span>
            </div>
            
            <h3>Data Science & AI Lab</h3>
            
            <p className="desc">
              JupyterLab environment optimized for machine learning workflows. 
              Pre-loaded with Pandas, NumPy, Matplotlib, and Scikit-learn. Includes 
              Titanic dataset and sample visualization script for immediate experimentation.
            </p>

            <div className="specs">
              <span>ENV: JUPYTER</span>
              <span>DATASETS: LOADED</span>
            </div>

            {!jupyterUrl ? (
              <button 
                onClick={launchJupyter} 
                disabled={loadingJupyter} 
                className="action-btn launch-btn"
              >
                {loadingJupyter ? (
                  "INITIALIZING..."
                ) : (
                  <>
                    <Icons.Rocket /> DEPLOY LAB
                  </>
                )}
              </button>
            ) : (
              <a 
                href={jupyterUrl} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="action-btn access-btn"
              >
                <Icons.Terminal /> OPEN JUPYTER
              </a>
            )}
          </div>

          {/* CARD 5: FULL-STACK WEB LAB */}
          <div className="card active-card">
            <div className="scan-line"></div>
            
            <div className="card-header">
              <div className="icon-box mern-icon">
                <Icons.Globe />
              </div>
              <span className="status-pill online">ONLINE</span>
            </div>
            
            <h3>Full-Stack Web Lab</h3>
            
            <p className="desc">
              Complete MERN stack development environment with Node.js, React, and 
              MongoDB pre-configured. Features live preview functionality that automatically 
              exposes your React app for real-time testing alongside your code.
            </p>

            <div className="specs">
              <span>STACK: MERN</span>
              <span>PREVIEW: LIVE</span>
            </div>

            {!mernUrl ? (
              <button 
                onClick={launchMern} 
                disabled={loadingMern} 
                className="action-btn launch-btn"
              >
                {loadingMern ? (
                  "PROVISIONING..."
                ) : (
                  <>
                    <Icons.Rocket /> DEPLOY STACK
                  </>
                )}
              </button>
            ) : (
              <a 
                href={mernUrl} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="action-btn access-btn"
              >
                <Icons.Terminal /> OPEN IDE
              </a>
            )}
          </div>

          {/* CARD 6: C/C++ DSA LAB */}
          <div className="card active-card">
            <div className="scan-line"></div>
            
            <div className="card-header">
              <div className="icon-box cpp-icon">
                <Icons.Code />
              </div>
              <span className="status-pill online">ONLINE</span>
            </div>
            
            <h3>Legacy C/C++ Lab</h3>
            
            <p className="desc">
              Optimized environment for Data Structures & Algorithms with GCC, G++, and 
              GDB debugger pre-installed. Features one-click compile and run with F5. 
              No command-line compilation required—just write code and execute.
            </p>

            <div className="specs">
              <span>COMPILER: GCC</span>
              <span>DEBUG: GDB</span>
            </div>

            {!cppUrl ? (
              <button 
                onClick={launchCpp} 
                disabled={loadingCpp} 
                className="action-btn launch-btn"
              >
                {loadingCpp ? (
                  "INITIALIZING..."
                ) : (
                  <>
                    <Icons.Rocket /> DEPLOY ENV
                  </>
                )}
              </button>
            ) : (
              <a 
                href={cppUrl} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="action-btn access-btn"
              >
                <Icons.Terminal /> OPEN EDITOR
              </a>
            )}
          </div>

        </div>
      </main>
    </div>
  );
}

export default App;