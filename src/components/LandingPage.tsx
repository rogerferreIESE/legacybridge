import React from 'react';
import './LandingPage.css';

interface LandingPageProps {
    onGetStarted: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onGetStarted }) => {
    return (
        <div className="landing-container animate-fade-in">
            <div className="hero-section">
                <h1 className="hero-title">
                    Bridge Your <span className="highlight-gradient">Legacy</span>
                </h1>
                <p className="hero-subtitle">
                    The premium marketplace connecting visionary sellers with search funds and strategic buyers.
                    Confidential, direct, and data-driven.
                </p>
                <button className="btn-primary hero-cta" onClick={onGetStarted}>
                    Get Started
                </button>
            </div>

            <div className="features-grid">
                <div className="feature-card glass-panel">
                    <div className="feature-icon">🛡️</div>
                    <h3>Strict Confidentiality</h3>
                    <p>Your data is protected by our proprietary NDA protocol, revealing details only to verified matches.</p>
                </div>
                <div className="feature-card glass-panel">
                    <div className="feature-icon">🤝</div>
                    <h3>Direct Connections</h3>
                    <p>No brokers. No intermediaries. Connect directly with serious search funds and pre-vetted buyers.</p>
                </div>
                <div className="feature-card glass-panel">
                    <div className="feature-icon">⚡</div>
                    <h3>Data-Driven Matching</h3>
                    <p>Our algorithm instantly scores compatibility based on EBITDA, industry, region, and owner involvement.</p>
                </div>
            </div>
        </div>
    );
};

export default LandingPage;
