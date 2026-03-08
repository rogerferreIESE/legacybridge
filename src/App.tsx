import { useState, useEffect } from 'react';
import './App.css';

// Feature Views
import ValuationCalculator from './components/ValuationCalculator';
import LegalDiagnostic from './components/LegalDiagnostic';
import BusinessOverview from './components/BusinessOverview';
import Marketplace from './components/Marketplace';
import TheVault from './components/TheVault';
import LandingPage from './components/LandingPage';
import AuthModal from './components/AuthModal';
import Footer from './components/Footer';
import { supabase } from './lib/supabase';

function App() {
  const [activeTab, setActiveTab] = useState<'hook' | 'overview' | 'shield' | 'market' | 'vault'>('overview');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [session, setSession] = useState<any>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleTabChange = (tab: 'hook' | 'overview' | 'shield' | 'market' | 'vault') => {
    setActiveTab(tab);
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="app-container">
      {/* Navigation */}
      {session && (
        <nav className="navbar glass-panel">
          <div className="nav-brand">
            <span className="brand-icon">🌉</span>
            <span className="brand-text">Legacy Bridge</span>
          </div>

          <button
            className="mobile-menu-btn"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? '✕' : '☰'}
          </button>

          <div className={`nav-links ${isMobileMenuOpen ? 'open' : ''}`}>
            <button
              className={`nav-btn ${activeTab === 'hook' ? 'active' : ''}`}
              onClick={() => handleTabChange('hook')}
            >
              Calculator
            </button>
            <button
              className={`nav-btn ${activeTab === 'overview' ? 'active' : ''}`}
              onClick={() => handleTabChange('overview')}
            >
              Business Overview
            </button>
            <button
              className={`nav-btn ${activeTab === 'shield' ? 'active' : ''}`}
              onClick={() => handleTabChange('shield')}
            >
              Diagnostic
            </button>
            <button
              className={`nav-btn ${activeTab === 'market' ? 'active' : ''}`}
              onClick={() => handleTabChange('market')}
            >
              Marketplace
            </button>
            <button
              className={`nav-btn ${activeTab === 'vault' ? 'active' : ''}`}
              onClick={() => handleTabChange('vault')}
            >
              The Vault
            </button>
          </div>

          <div className="nav-actions">
            <button className="btn-secondary" onClick={() => supabase.auth.signOut()}>
              Sign Out
            </button>
          </div>
        </nav>
      )}

      {/* Main Content Area */}
      <main className="main-content">
        {session ? (
          <div className="content-wrapper animate-fade-in">
            {activeTab === 'overview' && <BusinessOverview />}
            {activeTab === 'hook' && <ValuationCalculator />}
            {activeTab === 'shield' && <LegalDiagnostic />}
            {activeTab === 'market' && <Marketplace />}
            {activeTab === 'vault' && <TheVault />}
          </div>
        ) : (
          <LandingPage onGetStarted={() => setIsAuthOpen(true)} />
        )}
      </main>

      {/* Global Footer */}
      <Footer />

      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onSuccess={() => setIsAuthOpen(false)}
      />
    </div>
  );
}

export default App;
