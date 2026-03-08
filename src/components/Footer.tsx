import React from 'react';
import './Footer.css';

const Footer: React.FC = () => {
    return (
        <footer className="global-footer glass-panel">
            <div className="footer-content">
                <div className="footer-brand">
                    <div className="brand-icon-text">
                        <span className="brand-icon">🌉</span>
                        <span className="brand-text">Legacy Bridge</span>
                    </div>
                    <p className="footer-tagline">
                        Secure, confidential M&A matchmaking for premium businesses.
                    </p>
                </div>

                <div className="footer-links-grid">
                    <div className="footer-column">
                        <h4>Platform</h4>
                        <a href="#">Deal Marketplace</a>
                        <a href="#">Valuation Hook</a>
                        <a href="#">Legal Shield</a>
                        <a href="#">The Vault</a>
                    </div>

                    <div className="footer-column">
                        <h4>Company</h4>
                        <a href="#">About Us</a>
                        <a href="#">How it Works</a>
                        <a href="#">Pricing</a>
                        <a href="#">Contact Support</a>
                    </div>

                    <div className="footer-column">
                        <h4>Legal</h4>
                        <a href="#">Terms of Service</a>
                        <a href="#">Privacy Policy</a>
                        <a href="#">Confidentiality Protocol</a>
                        <a href="#">Cookie Settings</a>
                    </div>
                </div>
            </div>

            <div className="footer-bottom">
                <p>&copy; {new Date().getFullYear()} Legacy Bridge. All rights reserved.</p>
                <div className="social-links">
                    <a href="#" aria-label="LinkedIn">IN</a>
                    <a href="#" aria-label="Twitter">X</a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
