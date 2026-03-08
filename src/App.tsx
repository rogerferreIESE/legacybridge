import { useState } from 'react';
import './App.css';

// Feature Views
import ValuationCalculator from './components/ValuationCalculator';
import LegalDiagnostic from './components/LegalDiagnostic';
import BusinessOverview from './components/BusinessOverview';
import Marketplace from './components/Marketplace';
import TheVault from './components/TheVault';

import { TestConnection } from './components/TestConnection';

function App() {
  const [activeTab, setActiveTab] = useState<'hook' | 'overview' | 'shield' | 'market' | 'vault'>('overview');

  return (
    <div className="app-container">
      {/* Navigation */}
      <nav className="navbar glass-panel">
        <div className="nav-brand">
          <span className="brand-icon">🌉</span>
          <span className="brand-text">Legacy Bridge</span>
        </div>
        <div className="nav-links">
          <TestConnection />
          <button
            className={`nav-btn ${activeTab === 'hook' ? 'active' : ''}`}
            onClick={() => setActiveTab('hook')}
          >
            Calculator
          </button>
          <button
            className={`nav-btn ${activeTab === 'overview' ? 'active' : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            Business Overview
          </button>
          <button
            className={`nav-btn ${activeTab === 'shield' ? 'active' : ''}`}
            onClick={() => setActiveTab('shield')}
          >
            Diagnostic
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
        </div>
        <div className="nav-actions">
          <button className="btn-primary">Connect Wallet / Login</button>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="main-content">
        <div className="content-wrapper animate-fade-in">
          {activeTab === 'overview' && <BusinessOverview />}
          {activeTab === 'hook' && <ValuationCalculator />}
          {activeTab === 'shield' && <LegalDiagnostic />}
          {activeTab === 'market' && <Marketplace />}
          {activeTab === 'vault' && <TheVault />}
        </div>
      </main>
    </div>
  );
}

export default App;
