import { useState, useEffect } from 'react';
import { supabase } from './lib/supabase';
import './App.css';
import AuthModal from './components/AuthModal';

// Feature Views
import ValuationCalculator from './components/ValuationCalculator';
import LegalDiagnostic from './components/LegalDiagnostic';
import BusinessOverview from './components/BusinessOverview';
import Marketplace from './components/Marketplace';
import TheVault from './components/TheVault';
import BuyerProfileOnboarding from './components/BuyerProfileOnboarding';

function App() {
  const [persona, setPersona] = useState<'seller' | 'buyer' | null>(null);
  const [session, setSession] = useState<any>(null);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authRolePending, setAuthRolePending] = useState<'seller' | 'buyer'>('seller');

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session) fetchAndSetPersona(session.user.id);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session) {
        fetchAndSetPersona(session.user.id);
      } else {
        setPersona(null);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchAndSetPersona = async (userId: string) => {
    const { data } = await supabase.from('profiles').select('role').eq('id', userId).single();
    if (data && (data.role === 'seller' || data.role === 'buyer')) {
      setPersona(data.role);
    }
  };
  const [activeTab, setActiveTab] = useState<'hook' | 'overview' | 'shield' | 'market' | 'vault'>('overview');
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    document.body.className = `${newTheme}-theme`; // Apply to body to override global css vars
  };

  if (!persona) {
    return (
      <div className={`app-container ${theme}-theme`} style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', background: 'var(--bg-dark)' }}>

        {/* Top Nav for Landing */}
        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '2rem 4rem', alignItems: 'center' }}>
          <div className="logo-container">
            <svg width="48" height="24" viewBox="0 0 48 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginRight: '8px' }}>
              <path d="M6 24 C 6 12, 22 12, 22 24 L 16 24 C 16 16, 12 16, 12 24 Z" fill="#FFFFFF" />
              <path d="M22 24 C 22 12, 38 12, 38 24 L 32 24 C 32 16, 28 16, 28 24 Z" fill="#A0A0A0" opacity="0.9" />
            </svg>
            <h1 className="logo-text">LEGACY BRIDGE</h1>
          </div>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <button
              onClick={toggleTheme}
              style={{ background: 'transparent', border: '1px solid var(--border)', padding: '8px 16px', borderRadius: '4px', cursor: 'pointer', color: 'var(--text)' }}
            >
              {theme === 'dark' ? '☀️ Light Mode' : '🌙 Dark Mode'}
            </button>
            {session ? (
              <button
                onClick={() => supabase.auth.signOut()}
                style={{ background: 'transparent', border: '1px solid var(--border)', padding: '8px 16px', borderRadius: '4px', cursor: 'pointer', color: 'var(--text)' }}>
                Sign Out
              </button>
            ) : (
              <button
                onClick={() => { setAuthRolePending('buyer'); setIsAuthOpen(true); }}
                className="btn-primary" style={{ padding: '8px 24px' }}>
                Login
              </button>
            )}
          </div>
        </div>

        {/* Hero Section */}
        <div style={{ textAlign: 'center', marginTop: '4rem', marginBottom: '4rem', padding: '0 2rem' }}>
          <h2 style={{ color: 'var(--text)', fontSize: '3.5rem', marginBottom: '1rem', letterSpacing: '-0.02em', fontWeight: 600 }}>Your legacy. Their future.<br />Our mission.</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto', lineHeight: '1.6' }}>
            The premier small business marketplace. AI-matched opportunities, human-driven outcomes. Connect with verified buyers, sellers, and advisors nationwide.
          </p>
        </div>

        {/* Trust Badges Mock */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '3rem', opacity: 0.6, marginBottom: '5rem', filter: 'grayscale(100%)' }}>
          <span style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>Forbes</span>
          <span style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>Bloomberg</span>
          <span style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>WSJ</span>
          <span style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>TechCrunch</span>
        </div>

        {/* Action Cards */}
        <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap', justifyContent: 'center', paddingBottom: '6rem' }}>
          <div
            className="glass-panel"
            style={{ padding: '3rem 2rem', width: '320px', textAlign: 'center', cursor: 'pointer', transition: 'all 0.3s', border: '1px solid var(--border)' }}
            onClick={() => {
              if (session) {
                setPersona('seller');
                setActiveTab('overview');
              } else {
                setAuthRolePending('seller');
                setIsAuthOpen(true);
              }
            }}
            onMouseOver={(e) => { e.currentTarget.style.transform = 'translateY(-8px)'; e.currentTarget.style.borderColor = 'var(--primary)'; }}
            onMouseOut={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.borderColor = 'var(--border)'; }}
          >
            <div style={{ fontSize: '3.5rem', marginBottom: '1.5rem' }}>🏢</div>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Business Owner</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: '1.5' }}>Know your worth and protect your legacy. Get a data-backed valuation and find the right buyer.</p>
          </div>

          <div
            className="glass-panel"
            style={{ padding: '3rem 2rem', width: '320px', textAlign: 'center', cursor: 'pointer', transition: 'all 0.3s', border: '1px solid var(--border)' }}
            onClick={() => {
              if (session) {
                setPersona('buyer');
                setActiveTab('overview');
              } else {
                setAuthRolePending('buyer');
                setIsAuthOpen(true);
              }
            }}
            onMouseOver={(e) => { e.currentTarget.style.transform = 'translateY(-8px)'; e.currentTarget.style.borderColor = 'var(--primary)'; }}
            onMouseOut={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.borderColor = 'var(--border)'; }}
          >
            <div style={{ fontSize: '3.5rem', marginBottom: '1.5rem' }}>💼</div>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Investor / Buyer</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: '1.5' }}>A modern way to buy. Discover AI-matched, off-market opportunities before they list publicly.</p>
          </div>
        </div>

        <AuthModal
          isOpen={isAuthOpen}
          onClose={() => setIsAuthOpen(false)}
          onSuccess={() => {
            setIsAuthOpen(false);
          }}
          defaultRole={authRolePending}
        />
      </div>
    );
  }

  return (
    <div className={`app-container ${theme}-theme`}>
      {/* Navigation */}
      <nav className="navbar glass-panel">
        <div className="nav-logo-container" onClick={() => setPersona(null)} style={{ cursor: 'pointer' }}>
          <div className="nav-logo-mark">LB</div>
          <h1 className="nav-logo-text">LEGACY BRIDGE</h1>
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
                Legal Diagnostic
              </button>
            </>
          ) : persona === 'buyer' ? (
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
          ) : null}

          {persona === 'seller' ? (
            <button
              className={`nav-btn ${activeTab === 'market' ? 'active' : ''}`}
              onClick={() => setActiveTab('market')}
            >
              Marketplace
            </button>
          ) : null}
        </div>
        <div className="nav-actions" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginRight: '1rem' }}>Logged in as: <strong>{persona === 'seller' ? 'Seller' : 'Buyer'}</strong></span>
          <button
            onClick={toggleTheme}
            style={{ background: 'transparent', border: '1px solid var(--border)', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer', color: 'var(--text)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
          >
            {theme === 'dark' ? '☀️ Light Mode' : '🌙 Dark Mode'}
          </button>
          <button className="btn-primary" onClick={() => setPersona(null)} style={{ background: 'transparent', border: '1px solid var(--primary)', color: 'var(--primary)' }}>Home</button>
          {session ? (
            <button className="btn-secondary" onClick={() => supabase.auth.signOut()}>Sign Out</button>
          ) : null}
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="main-content">
        <div className="content-wrapper animate-fade-in">
          {activeTab === 'overview' && persona === 'seller' && <BusinessOverview />}
          {activeTab === 'overview' && persona === 'buyer' && <BuyerProfileOnboarding />}
          {activeTab === 'hook' && persona === 'seller' && <ValuationCalculator />}
          {activeTab === 'shield' && persona === 'seller' && <LegalDiagnostic />}
          {activeTab === 'market' && (persona === 'seller' || persona === 'buyer') && <Marketplace />}
          {activeTab === 'vault' && persona === 'buyer' && <TheVault />}
        </div>
      </main>

      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onSuccess={(role) => {
          setIsAuthOpen(false);
          if (role) {
            setPersona(role);
            setActiveTab('overview');
          }
        }}
        defaultRole={authRolePending}
      />
    </div>
  );
}

export default App;
