import { useState } from 'react';
import axios from 'axios';

// --- ICONS (SVG) ---
const Icons = {
  Python: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
    </svg>
  ),
  Rocket: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/>
      <path d="M12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/>
      <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/>
      <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/>
    </svg>
  ),
  Lock: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
      <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
    </svg>
  )
};

function App() {
  const [loading, setLoading] = useState(false);
  const [labUrl, setLabUrl] = useState(null);

  const launchLab = async () => {
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:8000/start-python-lab');
      if (response.data.status === "error") {
        alert("❌ Error: " + response.data.message);
      } else if (response.data.url) {
        setLabUrl(response.data.url);
      }
    } catch (error) {
      alert("⚠️ Connection Error");
    }
    setLoading(false);
  };

  return (
    <div className="app-container">
      
      {/* HEADER */}
      <header className="top-bar">
        <div className="logo">
          <span className="logo-icon"></span>
          <h1>ZeroSetup <small>V.1.0</small></h1>
        </div>
        <div className="status-indicators">
          <span>CPU: OPTIMAL</span>
          <span>NET: SECURE</span>
          <span className="user-badge">USER: STUDENT_1</span>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main className="dashboard">
        <div className="intro-text">
          <h2>Command Deck</h2>
          <p>Select a specialized neural environment to begin your mission. All systems are pre-calibrated.</p>
        </div>

        <div className="grid-layout">
          
          {/* CARD 1: PYTHON (ACTIVE) */}
          <div className="card active-card">
            <div className="scan-line"></div>
            <div className="card-content">
              <div className="card-header">
                <div className="icon-box python-icon"><Icons.Python /></div>
                <span className="status-pill online">ONLINE</span>
              </div>
              
              <h3>Python Core</h3>
              <p className="desc">High-performance environment for Data Science & AI. Includes Pandas, Rich CLI, and Streamlit visualization engines.</p>

              <div className="specs">
                <span>▪ RAM: 4GB DEDICATED</span>
                <span>▪ STORAGE: PERSISTENT</span>
              </div>

              {!labUrl ? (
                <button onClick={launchLab} disabled={loading} className="action-btn launch-btn">
                  {loading ? "INITIALIZING..." : <><Icons.Rocket /> DEPLOY ENVIRONMENT</>}
                </button>
              ) : (
                <a href={labUrl} target="_blank" className="action-btn access-btn">
                  ✅ ACCESS TERMINAL
                </a>
              )}
            </div>
          </div>

          {/* CARD 2: WEB (LOCKED) */}
          <div className="card locked-card">
            <div className="lock-label">LOCKED</div>
            <div className="icon-box locked-icon"><Icons.Lock /></div>
            <h3>Full Stack</h3>
            <p className="desc">React, Node, Mongo cluster.</p>
            <div className="progress-bar"><div className="fill" style={{width: '75%'}}></div></div>
          </div>

          {/* CARD 3: SECURITY (LOCKED) */}
          <div className="card locked-card">
            <div className="lock-label">LOCKED</div>
            <div className="icon-box locked-icon"><Icons.Lock /></div>
            <h3>Black Ops</h3>
            <p className="desc">Kali Linux, Nmap, Wireshark.</p>
            <div className="progress-bar"><div className="fill" style={{width: '25%'}}></div></div>
          </div>

        </div>
      </main>

      <footer>SYSTEM_ID: E-KUBE-99 // SECURE CONNECTION ESTABLISHED</footer>
    </div>
  );
}

export default App;