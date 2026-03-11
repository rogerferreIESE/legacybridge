import React, { useState } from 'react';
import './TheVault.css';

const TheVault: React.FC = () => {
    const [ndaStatus, setNdaStatus] = useState<'locked' | 'signing' | 'unlocked'>('locked');
    const [qnaText, setQnaText] = useState('');
    const [loiGenerated, setLoiGenerated] = useState(false);

    const handleSignNDA = () => {
        setNdaStatus('signing');
        setTimeout(() => {
            setNdaStatus('unlocked');
        }, 2000);
    };

    return (
        <div className="vault-container">
            <div className="vault-header text-center animate-fade-in">
                <h2>The Vault</h2>
                <p className="subtitle">High-security seller profiles. Zero identity disclosure without a signed institutional NDA.</p>
            </div>

            <div className="profile-card glass-panel animate-fade-in">
                {/* Public Teaser Info (Always Visible) */}
                <div className="teaser-info">
                    <div className="teaser-header">
                        <div>
                            <h3>Project Phoenix</h3>
                            <p className="teaser-meta">Teaser ID: PX-10442 • Listed 2 days ago</p>
                        </div>
                        <span className="badge-verified">✓ Shield Verified</span>
                    </div>

                    <div className="teaser-metrics">
                        <div className="metric">
                            <span className="label">Industry</span>
                            <span className="value">B2B FinTech SaaS</span>
                        </div>
                        <div className="metric">
                            <span className="label">HQ Region</span>
                            <span className="value">Europe (Remote)</span>
                        </div>
                        <div className="metric">
                            <span className="label">Normalized EBITDA</span>
                            <span className="value">€1.2M</span>
                        </div>
                        <div className="metric">
                            <span className="label">EBITDA Margin</span>
                            <span className="value">34%</span>
                        </div>
                    </div>

                    <p className="description">
                        A leading provider of specialized compliance infrastructure for mid-market financial firms.
                        Strong recurring revenue (92% ARR) with net negative churn over the last 24 months.
                        Bootstrapped, single founder seeking majority buyout or full exit to a strategic PE/Search Fund buyer.
                    </p>
                </div>

                {/* The Gate (Protected Content) */}
                <div className={`protected-content ${ndaStatus}`}>
                    {ndaStatus === 'locked' && (
                        <div className="gate-overlay">
                            <div className="lock-icon">🔒</div>
                            <h3>Identity Protected</h3>
                            <p>Execute the jurisdiction-specific Non-Disclosure Agreement to reveal the company identity, historical financials, and data room.</p>
                            <button className="btn-gold mt-lg" onClick={handleSignNDA}>
                                Sign NDA to Unlock Vault
                            </button>
                        </div>
                    )}

                    {ndaStatus === 'signing' && (
                        <div className="gate-overlay signing">
                            <div className="loader-ring"></div>
                            <h3>Generating Smart NDA...</h3>
                            <p>Preparing jurisdiction (UK/EU) specific mutual agreement...</p>
                        </div>
                    )}

                    {ndaStatus === 'unlocked' && (
                        <div className="unlocked-info animate-fade-in">
                            {/* Revealed Identity Base */}
                            <div className="identity-reveal-section">
                                <div className="company-identity">
                                    <div className="mock-logo">CX</div>
                                    <div>
                                        <h3>ComplianceX Ltd.</h3>
                                        <a href="#" className="company-url">www.compliancex-mock.example.com</a>
                                        <p className="company-legal">Registered in England & Wales (No. 11223344)</p>
                                    </div>
                                </div>
                                <div className="founder-info">
                                    <div className="avatar">JS</div>
                                    <div>
                                        <span className="founder-name">John Smith</span>
                                        <span className="founder-title">Founder & CEO (100% Equity)</span>
                                    </div>
                                </div>
                            </div>

                            {/* Deal Process Roadmap */}
                            <div className="process-roadmap mt-xl">
                                <h4>Deal Process Roadmap</h4>
                                <div className="roadmap-steps">
                                    <div className="roadmap-step completed">
                                        <div className="step-circle">✓</div>
                                        <span>Profile Created</span>
                                    </div>
                                    <div className="roadmap-line completed"></div>
                                    <div className="roadmap-step completed">
                                        <div className="step-circle">✓</div>
                                        <span>NDA Signed</span>
                                    </div>
                                    <div className="roadmap-line active"></div>
                                    <div className="roadmap-step active">
                                        <div className="step-circle">3</div>
                                        <span>Diligence & Q&A</span>
                                    </div>
                                    <div className="roadmap-line"></div>
                                    <div className="roadmap-step">
                                        <div className="step-circle">4</div>
                                        <span>LOI Issued</span>
                                    </div>
                                    <div className="roadmap-line"></div>
                                    <div className="roadmap-step">
                                        <div className="step-circle">5</div>
                                        <span>Closing</span>
                                    </div>
                                </div>
                            </div>

                            {/* Rich Mock Data Dashboard */}
                            <div className="data-dashboard mt-xl">
                                {/* Historical Financials */}
                                <div className="dashboard-widget">
                                    <div className="widget-header">
                                        <h4>Historical Revenue & EBITDA</h4>
                                        <span className="badge-audited">Unaudited</span>
                                    </div>

                                    <div className="mock-chart">
                                        <div className="chart-column">
                                            <div className="bar rev-bar h-40"></div>
                                            <div className="bar ebitda-bar h-10"></div>
                                            <span className="year-label">2022</span>
                                        </div>
                                        <div className="chart-column">
                                            <div className="bar rev-bar h-60"></div>
                                            <div className="bar ebitda-bar h-20"></div>
                                            <span className="year-label">2023</span>
                                        </div>
                                        <div className="chart-column">
                                            <div className="bar rev-bar h-90"></div>
                                            <div className="bar ebitda-bar h-35"></div>
                                            <span className="year-label">2024 (LTM)</span>
                                        </div>

                                        <div className="chart-legend">
                                            <div className="legend-item"><span className="dot rev-color"></span> Revenue</div>
                                            <div className="legend-item"><span className="dot ebitda-color"></span> EBITDA</div>
                                        </div>
                                    </div>
                                </div>

                                {/* Cap Table & Team */}
                                <div className="dashboard-grid">
                                    <div className="dashboard-widget">
                                        <h4>Current Capitalization</h4>
                                        <table className="mini-table">
                                            <tbody>
                                                <tr><td>John Smith (Founder)</td><td className="text-right">92.5%</td></tr>
                                                <tr><td>Employee Option Pool</td><td className="text-right">7.5%</td></tr>
                                                <tr><td>External Investors</td><td className="text-right">0.0%</td></tr>
                                                <tr className="total-row"><td>Fully Diluted</td><td className="text-right">100%</td></tr>
                                            </tbody>
                                        </table>
                                    </div>

                                    <div className="dashboard-widget">
                                        <h4>Organization Overview</h4>
                                        <ul className="org-list">
                                            <li><strong>FTEs:</strong> 14 (Fully Remote)</li>
                                            <li><strong>Key Hires:</strong> CTO (2020), VP Sales (2022)</li>
                                            <li><strong>Tech Stack:</strong> React, Node.js, AWS, Postgres</li>
                                            <li><strong>Customer Conc:</strong> Top 5 = 18% of Total ARR</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            <div className="data-room-access mt-xl">
                                <div className="widget-header">
                                    <h4>Smart Data Room</h4>
                                    <span className="meta-text">AI Categorized Structure</span>
                                </div>
                                <div className="data-room-folders">
                                    <div className="folder">
                                        <span className="folder-icon">📂</span>
                                        <strong>1. Financial Info</strong>
                                        <span className="file-count">4 files</span>
                                    </div>
                                    <div className="folder">
                                        <span className="folder-icon">📂</span>
                                        <strong>2. Legal & Contracts</strong>
                                        <span className="file-count">12 files</span>
                                    </div>
                                    <div className="folder">
                                        <span className="folder-icon">📂</span>
                                        <strong>3. Product IP</strong>
                                        <span className="file-count">3 files</span>
                                    </div>
                                    <div className="folder">
                                        <span className="folder-icon">📂</span>
                                        <strong>4. HR & Employees</strong>
                                        <span className="file-count">5 files</span>
                                    </div>
                                </div>
                            </div>

                            {/* Automated Q&A Section */}
                            <div className="buyer-qna mt-xl">
                                <h4>Buyer Q&A Automation</h4>
                                <div className="qna-thread">
                                    <div className="qna-message buyer">
                                        <strong>Buyer:</strong> "Can you provide a breakdown of the 18% customer concentration?"
                                    </div>
                                    <div className="qna-message ai-draft">
                                        <strong>AI Draft Answer (Pending Seller Approval):</strong><br />
                                        "The 18% represents our top 5 clients in the enterprise tier. They are on 3-year locked contracts with auto-renewal clauses, mitigating immediate churn risk."
                                        <br /><br />
                                        <button className="btn-secondary small" style={{ marginRight: '0.5rem' }}>Approve</button>
                                        <button className="btn-secondary small">Edit</button>
                                    </div>
                                </div>
                                <div className="qna-input-area mt-md">
                                    <input
                                        type="text"
                                        className="text-input"
                                        placeholder="Ask a question about operations, financials, etc..."
                                        value={qnaText}
                                        onChange={(e) => setQnaText(e.target.value)}
                                    />
                                    <button className="btn-secondary" onClick={() => setQnaText('')}>Send</button>
                                </div>
                            </div>

                            {/* Smart LOI Generator */}
                            <div className="buyer-action mt-xl border-top pt-lg text-center">
                                <h4>Ready to proceed to negotiations?</h4>
                                <p className="mb-md">Leverage our AI tools to draft standardized legal templates instantly.</p>
                                <div className="flex-center gap-md">
                                    <button className="btn-secondary">Request Mgmt Presentation</button>
                                    <button className="btn-primary" onClick={() => setLoiGenerated(true)}>
                                        {loiGenerated ? '✓ Smart LOI Drafted' : 'Generate Smart LOI Template'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default TheVault;
