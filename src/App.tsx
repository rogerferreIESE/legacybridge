import { useState } from 'react';
import './App.css';

// Feature Views
import ValuationCalculator from './components/ValuationCalculator';
import LegalDiagnostic from './components/LegalDiagnostic';
import BusinessOverview from './components/BusinessOverview';
import Marketplace from './components/Marketplace';
import TheVault from './components/TheVault';
import BuyerProfileOnboarding from './components/BuyerProfileOnboarding';

function App() {
  const [persona, setPersona] = useState<'seller' | 'buyer' | null>(null);
  const [activeTab, setActiveTab] = useState<'hook' | 'overview' | 'shield' | 'market' | 'vault'>('overview');
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    document.body.className = `${newTheme}-theme`; // Apply to body to override global css vars
  };

  if (!persona) {
    return (
      <div className={`app-container ${theme}-theme`} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', background: 'var(--bg-dark)' }}>
        <div className="logo-container" style={{ marginBottom: '4rem', transform: 'scale(1.5)' }}>
          <div className="logo-mark">LB</div>
          <h1 className="logo-text">LEGACY BRIDGE</h1>
        </div>

        <h2 style={{ color: 'var(--text)', marginBottom: '2rem' }}>Welcome to Legacy Bridge</h2>
        <p style={{ color: 'var(--text-muted)', marginBottom: '3rem' }}>Select your path to continue.</p>

        <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap', justifyContent: 'center' }}>
          <div
            className="glass-panel"
            style={{ padding: '3rem 2rem', width: '300px', textAlign: 'center', cursor: 'pointer', transition: 'transform 0.2s', border: '1px solid var(--border)' }}
            onClick={() => setPersona('seller')}
            onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
            onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
          >
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🏢</div>
            <h3>I am a Business Owner</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Prepare my business for an eventual exit or verify my valuation.</p>
          </div>

          <div
            className="glass-panel"
            style={{ padding: '3rem 2rem', width: '300px', textAlign: 'center', cursor: 'pointer', transition: 'transform 0.2s', border: '1px solid var(--border)' }}
            onClick={() => {
              setPersona('buyer');
              setActiveTab('overview'); // Use overview slot for buyer profile initially
            }}
            onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
            onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
          >
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>💼</div>
            <h3>I am an Investor / Buyer</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Source verified transition opportunities and specify my investment criteria.</p>
          </div>
        </div>

        <button
          onClick={toggleTheme}
          style={{ position: 'absolute', top: '2rem', right: '2rem', background: 'transparent', border: '1px solid var(--border)', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer', color: 'var(--text)' }}
        >
          {theme === 'dark' ? '☀️ Light Mode' : '🌙 Dark Mode'}
        </button>
      </div>
    );
  }

  return (
    <div className={`app-container ${theme}-theme`}>
      {/* Navigation */}
      <nav className="navbar glass-panel">
        <div className="nav-brand">
          <span className="brand-icon">🌉</span>
          <span className="brand-text">Legacy Bridge</span>
        </div>
        <div className="nav-links">
          {persona === 'seller' ? (
            <>
              <button
                className={`nav-btn ${activeTab === 'overview' ? 'active' : ''}`}
                onClick={() => setActiveTab('overview')}
              >
                Business Overview
              </button>
              <button
                className={`nav-btn ${activeTab === 'hook' ? 'active' : ''}`}
                onClick={() => setActiveTab('hook')}
              >
                Calculator
              </button>
              <button
                className={`nav-btn ${activeTab === 'shield' ? 'active' : ''}`}
                onClick={() => setActiveTab('shield')}
              >
                Diagnostic
              </button>
            </>
          ) : (
            <>
              <button
                className={`nav-btn ${activeTab === 'overview' ? 'active' : ''}`}
                onClick={() => setActiveTab('overview')}
              >
                Investor Profile
              </button>
              <button
                className={`nav-btn ${activeTab === 'market' ? 'active' : ''}`}
                onClick={() => setActiveTab('market')}
              >
                Marketplace
              </button>
              <button
                className={`nav-btn ${activeTab === 'vault' ? 'active' : ''}`}
                onClick={() => setActiveTab('vault')}
              >
                The Vault
              </button>
            </>
          )}

          {persona === 'seller' && (
            <button
              className={`nav-btn ${activeTab === 'market' ? 'active' : ''}`}
              onClick={() => setActiveTab('market')}
            >
              Marketplace
            </button>
          )}
        </div>
        <div className="nav-actions" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <button
            onClick={toggleTheme}
            style={{ background: 'transparent', border: '1px solid var(--border)', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer', color: 'var(--text)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
          >
            {theme === 'dark' ? '☀️ Light Mode' : '🌙 Dark Mode'}
          </button>
          <button className="btn-primary" onClick={() => setPersona(null)}>Switch Role</button>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="main-content">
        <div className="content-wrapper animate-fade-in">
          {activeTab === 'overview' && (persona === 'seller' ? <BusinessOverview /> : <BuyerProfileOnboarding />)}
          {activeTab === 'hook' && persona === 'seller' && <ValuationCalculator />}
          {activeTab === 'shield' && persona === 'seller' && <LegalDiagnostic />}
          {activeTab === 'market' && <Marketplace />}
          {activeTab === 'vault' && <TheVault />}
        </div>
      </main>
    </div>
  );
}

export default App;
