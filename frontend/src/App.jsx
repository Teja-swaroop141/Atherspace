import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

// ── This is set via Vercel environment variable ──────────────────────
// REACT_APP_API_URL = https://abc123.trycloudflare.com
const API_BASE = import.meta.env.VITE_API_URL;
console.log(API_BASE)
// ── Icons (unchanged) ────────────────────────────────────────────────
const Icons = {
  Python: () => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="40" height="40"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" /></svg>),
  Database: () => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="40" height="40"><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" /><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" /><ellipse cx="12" cy="5" rx="9" ry="3" /></svg>),
  Security: () => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="40" height="40"><rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>),
  Brain: () => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="40" height="40"><path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 1.98-3A2.5 2.5 0 0 1 9.5 2Z" /><path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-1.98-3A2.5 2.5 0 0 0 14.5 2Z" /></svg>),
  Network: () => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="40" height="40"><circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" /></svg>),
  Rocket: () => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="20" height="20"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" /><path d="M12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" /><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" /><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" /></svg>),
  Terminal: () => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="20" height="20"><polyline points="4 17 10 11 4 5"></polyline><line x1="12" y1="19" x2="20" y2="19"></line></svg>),
};

function App() {
  const [backendOnline, setBackendOnline] = useState(false);
  const [slotsAvailable, setSlotsAvailable] = useState(null);

  const [loadingPy, setLoadingPy]       = useState(false);
  const [pythonUrl, setPythonUrl]       = useState(null);
  const [pythonPod, setPythonPod]       = useState(null);

  const [loadingSql, setLoadingSql]     = useState(false);
  const [sqlUrl, setSqlUrl]             = useState(null);
  const [sqlPod, setSqlPod]             = useState(null);

  const [loadingCyber, setLoadingCyber] = useState(false);
  const [cyberUrl, setCyberUrl]         = useState(null);
  const [cyberPod, setCyberPod]         = useState(null);

  const [loadingJupyter, setLoadingJupyter] = useState(false);
  const [jupyterUrl, setJupyterUrl]         = useState(null);
  const [jupyterPod, setJupyterPod]         = useState(null);

  const [loadingCn, setLoadingCn]       = useState(false);
  const [cnUrl, setCnUrl]               = useState(null);
  const [cnPod, setCnPod]               = useState(null);

  // ── Check backend health + slots on load ──────────────────────────
  useEffect(() => {
    const checkBackend = async () => {
      try {
        const res = await axios.get(`${API_BASE}/status`, { timeout: 5000 });
        setBackendOnline(true);
        setSlotsAvailable(res.data.slots_available);
      } catch {
        setBackendOnline(false);
      }
    };
    checkBackend();
    const interval = setInterval(checkBackend, 30000); // refresh every 30s
    return () => clearInterval(interval);
  }, []);

  // ── Generic launch handler ────────────────────────────────────────
  const launchLab = async (endpoint, setLoading, setUrl, setPod) => {
    setLoading(true);
    try {
      const response = await axios.post(`${API_BASE}/${endpoint}`, {}, { timeout: 30000 });
      if (response.data.status === "Failure") {
        alert("❌ " + response.data.message);
      } else if (response.data.url) {
        setUrl(response.data.url);
        setPod(response.data.pod_name);
        setSlotsAvailable(prev => prev - 1);
      }
    } catch (error) {
      if (error.code === 'ECONNABORTED') {
        alert("⏱️ Request timed out. Backend may be starting up, try again.");
      } else {
        alert("⚠️ Cannot reach backend. Is the EC2 instance running?");
      }
    }
    setLoading(false);
  };

  // ── Generic stop handler ──────────────────────────────────────────
  const stopLab = async (podName, setUrl, setPod) => {
    try {
      await axios.delete(`${API_BASE}/stop-lab/${podName}`);
      setUrl(null);
      setPod(null);
      setSlotsAvailable(prev => prev + 1);
    } catch {
      alert("⚠️ Could not stop lab.");
    }
  };

  return (
    <div className="app-container">

      {/* HEADER */}
      <header className="top-bar">
        <div className="logo">
          <h1>ZEROSETUP <small>OS // V.1.0</small></h1>
        </div>
        <div className="status-indicators">
          <span style={{ color: backendOnline ? '#33ff33' : '#ff3333',
                         textShadow: `0 0 10px ${backendOnline ? '#33ff33' : '#ff3333'}` }}>
            ● {backendOnline ? 'SYSTEM ONLINE' : 'BACKEND OFFLINE'}
          </span>
          <span>SLOTS: {slotsAvailable !== null ? `${slotsAvailable}/3` : '...'}</span>
          <span className="user-badge">STUDENT_1</span>
        </div>
      </header>

      {/* DASHBOARD */}
      <main className="dashboard">
        <div className="intro-text">
          <h2>Command Deck</h2>
          <p>Initialize a specialized neural environment to begin your mission.
             All systems are pre-calibrated and ready for deployment.</p>
        </div>

        <div className="grid-layout">

          {/* PYTHON LAB */}
          <div className="card active-card">
            <div className="scan-line"></div>
            <div className="card-header">
              <div className="icon-box python-icon"><Icons.Python /></div>
              <span className="status-pill online">ONLINE</span>
            </div>
            <h3>Python Virtual Lab</h3>
            <p className="desc">High-performance environment with Pandas, Rich, and Streamlit pre-installed.</p>
            <div className="specs"><span>RAM: 1GB</span><span>CPU: 0.4 CORE</span></div>
            {!pythonUrl ? (
              <button onClick={() => launchLab('start-python-lab', setLoadingPy, setPythonUrl, setPythonPod)}
                      disabled={loadingPy || !backendOnline} className="action-btn launch-btn">
                {loadingPy ? "INITIALIZING..." : <><Icons.Rocket /> DEPLOY PYTHON</>}
              </button>
            ) : (
              <div style={{display:'flex', gap:'8px', flexDirection:'column'}}>
                <a href={pythonUrl} target="_blank" rel="noopener noreferrer" className="action-btn access-btn">
                  <Icons.Terminal /> ACCESS TERMINAL
                </a>
                <button onClick={() => stopLab(pythonPod, setPythonUrl, setPythonPod)}
                        className="action-btn" style={{background:'#ff4444', color:'white', border:'none', padding:'8px', cursor:'pointer', borderRadius:'4px'}}>
                  ✕ STOP LAB
                </button>
              </div>
            )}
          </div>

          {/* SQL LAB */}
          <div className="card active-card">
            <div className="scan-line"></div>
            <div className="card-header">
              <div className="icon-box sql-icon"><Icons.Database /></div>
              <span className="status-pill online">ONLINE</span>
            </div>
            <h3>SQL & DB Virtual Lab</h3>
            <p className="desc">MariaDB with Adminer GUI. Pre-loaded college datasets for immediate querying.</p>
            <div className="specs"><span>DB: MARIADB</span><span>GUI: ADMINER</span></div>
            {!sqlUrl ? (
              <button onClick={() => launchLab('start-sql-lab', setLoadingSql, setSqlUrl, setSqlPod)}
                      disabled={loadingSql || !backendOnline} className="action-btn launch-btn">
                {loadingSql ? "PROVISIONING..." : <><Icons.Rocket /> DEPLOY DB</>}
              </button>
            ) : (
              <div style={{display:'flex', gap:'8px', flexDirection:'column'}}>
                <a href={sqlUrl} target="_blank" rel="noopener noreferrer" className="action-btn access-btn">
                  <Icons.Terminal /> OPEN DATABASE
                </a>
                <button onClick={() => stopLab(sqlPod, setSqlUrl, setSqlPod)}
                        className="action-btn" style={{background:'#ff4444', color:'white', border:'none', padding:'8px', cursor:'pointer', borderRadius:'4px'}}>
                  ✕ STOP LAB
                </button>
              </div>
            )}
          </div>

          {/* CYBER LAB */}
          <div className="card active-card cyber-card">
            <div className="scan-line cyber-scan"></div>
            <div className="card-header">
              <div className="icon-box cyber-icon"><Icons.Security /></div>
              <span className="status-pill restricted">RESTRICTED</span>
            </div>
            <h3>Cyber Virtual Lab</h3>
            <p className="desc">Ubuntu Security Box with Nmap, Netcat and a hidden vulnerability target.</p>
            <div className="specs cyber-specs"><span>TOOLS: NMAP/NC</span><span>TARGET: ACTIVE</span></div>
            {!cyberUrl ? (
              <button onClick={() => launchLab('start-cyber-lab', setLoadingCyber, setCyberUrl, setCyberPod)}
                      disabled={loadingCyber || !backendOnline} className="action-btn cyber-launch-btn">
                {loadingCyber ? "BREACHING..." : <><Icons.Rocket /> DEPLOY OPS</>}
              </button>
            ) : (
              <div style={{display:'flex', gap:'8px', flexDirection:'column'}}>
                <a href={cyberUrl} target="_blank" rel="noopener noreferrer" className="action-btn cyber-access-btn">
                  <Icons.Terminal /> ENTER TERMINAL
                </a>
                <button onClick={() => stopLab(cyberPod, setCyberUrl, setCyberPod)}
                        className="action-btn" style={{background:'#ff4444', color:'white', border:'none', padding:'8px', cursor:'pointer', borderRadius:'4px'}}>
                  ✕ STOP LAB
                </button>
              </div>
            )}
          </div>

          {/* DS LAB */}
          <div className="card active-card">
            <div className="scan-line"></div>
            <div className="card-header">
              <div className="icon-box jupyter-icon"><Icons.Brain /></div>
              <span className="status-pill online">ONLINE</span>
            </div>
            <h3>Data Science & AI Lab</h3>
            <p className="desc">JupyterLab with Pandas, NumPy, Matplotlib, Scikit-learn and Titanic dataset.</p>
            <div className="specs"><span>ENV: JUPYTER</span><span>DATASETS: LOADED</span></div>
            {!jupyterUrl ? (
              <button onClick={() => launchLab('start-ds-lab', setLoadingJupyter, setJupyterUrl, setJupyterPod)}
                      disabled={loadingJupyter || !backendOnline} className="action-btn launch-btn">
                {loadingJupyter ? "INITIALIZING..." : <><Icons.Rocket /> DEPLOY LAB</>}
              </button>
            ) : (
              <div style={{display:'flex', gap:'8px', flexDirection:'column'}}>
                <a href={jupyterUrl} target="_blank" rel="noopener noreferrer" className="action-btn access-btn">
                  <Icons.Terminal /> OPEN JUPYTER
                </a>
                <button onClick={() => stopLab(jupyterPod, setJupyterUrl, setJupyterPod)}
                        className="action-btn" style={{background:'#ff4444', color:'white', border:'none', padding:'8px', cursor:'pointer', borderRadius:'4px'}}>
                  ✕ STOP LAB
                </button>
              </div>
            )}
          </div>

          {/* CN LAB */}
          <div className="card active-card network-card">
            <div className="scan-line network-scan"></div>
            <div className="card-header">
              <div className="icon-box network-icon"><Icons.Network /></div>
              <span className="status-pill online">ONLINE</span>
            </div>
            <h3>Networks Lab</h3>
            <p className="desc">NS-2 Network Simulator with NAM for protocol visualization and TCL scripts.</p>
            <div className="specs network-specs"><span>SIM: NS-2</span><span>VISUAL: NAM</span></div>
            {!cnUrl ? (
              <button onClick={() => launchLab('start-cn-lab', setLoadingCn, setCnUrl, setCnPod)}
                      disabled={loadingCn || !backendOnline} className="action-btn network-launch-btn">
                {loadingCn ? "SIMULATING..." : <><Icons.Rocket /> DEPLOY NS2 & CN</>}
              </button>
            ) : (
              <div style={{display:'flex', gap:'8px', flexDirection:'column'}}>
                <a href={cnUrl} target="_blank" rel="noopener noreferrer" className="action-btn network-access-btn">
                  <Icons.Terminal /> ENTER LAB
                </a>
                <button onClick={() => stopLab(cnPod, setCnUrl, setCnPod)}
                        className="action-btn" style={{background:'#ff4444', color:'white', border:'none', padding:'8px', cursor:'pointer', borderRadius:'4px'}}>
                  ✕ STOP LAB
                </button>
              </div>
            )}
          </div>

        </div>
      </main>
    </div>
  );
}

export default App;