import React, { useState } from 'react';
import './BusinessOverview.css';

interface BusinessProfile {
    // Basic Info
    name: string;
    industry: string;
    foundedYear: string;
    description: string;
    locations: string;
    employees: string;
    ownershipStructure: string;

    // Detailed Business Description
    mainCustomers: string;
    keyProducts: string;
    competitiveAdvantage: string;

    // Exit Strategy
    exitMotivation: string;
    exitTimeline: string;
    transactionType: string;
    willingnessToStay: string;

    // Seller Quality Verification (Batch 6)
    legalCompanyName: string;
    founderLinkedIn: string;
    financialsPreparedBy: string;
    entityType: string;

    // SMB.co Required Fields (Batch 6)
    askingPrice: string;
}

const BusinessOverview: React.FC = () => {
    const [isEditing, setIsEditing] = useState(true);
    const [profile, setProfile] = useState<BusinessProfile>({
        name: '',
        industry: '',
        foundedYear: '',
        description: '',
        locations: '',
        employees: '',
        ownershipStructure: '',
        mainCustomers: '',
        keyProducts: '',
        competitiveAdvantage: '',
        exitMotivation: '',
        exitTimeline: '',
        transactionType: '',
        willingnessToStay: '',

        legalCompanyName: '',
        founderLinkedIn: '',
        financialsPreparedBy: '',
        entityType: '',

        askingPrice: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setProfile(prev => ({ ...prev, [name]: value }));
    };

    const handleSave = () => {
        if (!profile.name || !profile.industry || !profile.description) {
            alert('Please fill out the critical fields: Name, Industry, and Description.');
            return;
        }

        if (!profile.founderLinkedIn || !profile.legalCompanyName || !profile.financialsPreparedBy) {
            alert('To maintain marketplace quality, please complete all Verification & Readiness fields including your LinkedIn profile and entity details.');
            return;
        }

        setIsEditing(false);
    };

    if (!isEditing) {
        // Mock AI Confidence Indicators based on profile data
        const indicators = [
            profile.foundedYear && (new Date().getFullYear() - parseInt(profile.foundedYear)) > 10 ? { text: "10+ Years Operating History", icon: "📅" } : null,
            { text: "Stable Cash Flows", icon: "📈" } // Default mock indicator
        ].filter(Boolean) as { text: string; icon: string }[];

        return (
            <div className="overview-container animate-fade-in">
                <div className="overview-header text-center">
                    <h2>Legacy Bridge Profile</h2>
                    <p className="subtitle">Verified Institutional Data Record</p>
                </div>

                <div className="glass-panel profile-summary">
                    <div className="summary-header">
                        <div className="company-badge">{profile.name.charAt(0).toUpperCase()}</div>
                        <div>
                            <h3 className="company-name">{profile.name}</h3>
                            <span className="industry-tag">{profile.industry}</span>
                        </div>
                        <button className="btn-secondary edit-btn" onClick={() => setIsEditing(true)}>Edit Profile</button>
                    </div>

                    <div className="summary-grid">
                        <div className="summary-item">
                            <label>Founded</label>
                            <p>{profile.foundedYear || 'N/A'}</p>
                        </div>
                        <div className="summary-item">
                            <label>Headcount</label>
                            <p>{profile.employees || 'N/A'}</p>
                        </div>
                        <div className="summary-item">
                            <label>Structure</label>
                            <p>{profile.ownershipStructure || 'N/A'}</p>
                        </div>
                    </div>

                    <div className="summary-description">
                        <label>Business Description</label>
                        <p>{profile.description}</p>

                        <div style={{ marginTop: '1.5rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                            <div>
                                <label style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Revenue</label>
                                <p style={{ color: 'var(--text-muted)' }}>See Calculator Tab</p>
                            </div>
                            <div>
                                <label style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Asking Price</label>
                                <p style={{ color: 'var(--text-muted)' }}>{profile.askingPrice || 'TBD'}</p>
                            </div>
                            <div>
                                <label style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Financial Quality</label>
                                <p style={{ color: 'var(--text-muted)' }}>{profile.financialsPreparedBy || 'Unverified'}</p>
                            </div>
                            <div>
                                <label style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Key Products</label>
                                <p style={{ color: 'var(--text-muted)' }}>{profile.keyProducts || 'N/A'}</p>
                            </div>
                            <div style={{ gridColumn: '1 / -1' }}>
                                <label style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Competitive Advantage</label>
                                <p style={{ color: 'var(--text-muted)' }}>{profile.competitiveAdvantage || 'N/A'}</p>
                            </div>
                        </div>
                    </div>

                    <div style={{ marginTop: '3rem', borderTop: '1px solid var(--border)', paddingTop: '2rem' }}>
                        <h4 style={{ marginBottom: '1rem', color: 'var(--text)' }}>AI Confidence Indicators</h4>
                        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                            {indicators.map((ind, idx) => (
                                <div key={idx} style={{ background: 'rgba(111, 66, 193, 0.1)', border: '1px solid var(--primary)', borderRadius: '20px', padding: '0.5rem 1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem' }}>
                                    <span>{ind.icon}</span>
                                    <span>{ind.text}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="profile-status">
                        <span className="status-icon">✓</span>
                        <span>Profile successfully prepared for The Marketplace</span>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="overview-container animate-fade-in">
            <div className="overview-header text-center">
                <h2>Business Overview</h2>
                <p className="subtitle">Define your fundamental enterprise structure to begin the M&A prep process.</p>
            </div>

            <div className="glass-panel overview-form">

                {/* NEW OPTIONAL AUTOL-FILL UPLOAD SECTION */}
                <div className="form-group full-width" style={{ marginBottom: '2rem', padding: '1.5rem', border: '2px dashed var(--primary)', borderRadius: '12px', background: 'rgba(111, 66, 193, 0.05)', textAlign: 'center' }}>
                    <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>📄</div>
                    <h3 style={{ margin: '0 0 0.5rem 0', color: 'var(--text)' }}>Auto-fill with Financial Documents</h3>
                    <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', margin: '0 0 1rem 0' }}>
                        Drag and drop your P&L statement, Balance Sheet, or existing Teaser here.<br />
                        Our AI will seamlessly extract the data to populate your profile and valuation metrics.
                    </p>
                    <button className="btn-secondary small">Browse Files</button>
                    <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '1rem' }}>Supports PDF, XLS, CSV (Max 50MB)</p>
                </div>

                <h3 style={{ fontSize: '1.2rem', margin: '0 0 1rem 0' }}>Manual Entry</h3>

                <div className="form-grid">
                    <div className="form-group full-width">
                        <label>Legal Business Name *</label>
                        <input
                            type="text"
                            name="name"
                            placeholder="e.g. Acme Corp Inc."
                            value={profile.name}
                            onChange={handleChange}
                            className="text-input"
                        />
                    </div>

                    <div className="form-group">
                        <label>Primary Industry/Sector *</label>
                        <select
                            name="industry"
                            value={profile.industry}
                            onChange={handleChange}
                            className="select-input"
                        >
                            <option value="">Select Industry...</option>
                            <option value="B2B SaaS">B2B SaaS</option>
                            <option value="FinTech">FinTech</option>
                            <option value="HealthTech">HealthTech</option>
                            <option value="E-Commerce">E-Commerce</option>
                            <option value="Marketplace">Marketplace</option>
                            <option value="Enterprise Software">Enterprise Software</option>
                            <option value="Other">Other Category</option>
                        </select>
                    </div>

                    <div className="form-group owner-comp-group full-width">
                        <div>
                            <label>Year Founded</label>
                            <input
                                type="number"
                                name="foundedYear"
                                placeholder="e.g. 2018"
                                value={profile.foundedYear}
                                onChange={handleChange}
                                className="text-input"
                            />
                        </div>
                        <div>
                            <label>Target Asking Price (Optional)</label>
                            <input
                                type="text"
                                name="askingPrice"
                                placeholder="e.g. $1,200,000 or TBD"
                                value={profile.askingPrice}
                                onChange={handleChange}
                                className="text-input"
                            />
                        </div>
                    </div>

                    <div className="form-group full-width">
                        <label>Executive Summary / What the Company Does *</label>
                        <textarea
                            name="description"
                            placeholder="Short paragraph explaining core business activities..."
                            value={profile.description}
                            onChange={handleChange}
                            className="textarea-input"
                            rows={3}
                        />
                    </div>

                    <div className="form-group">
                        <label>Ownership Structure</label>
                        <select
                            name="ownershipStructure"
                            value={profile.ownershipStructure}
                            onChange={handleChange}
                            className="select-input"
                        >
                            <option value="">Select Structure...</option>
                            <option value="Single Owner / Founder">Single Owner / Founder</option>
                            <option value="Family Owned">Family Owned</option>
                            <option value="Partnership (2-4 owners)">Partnership (2-4 owners)</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Total Employees (FTEs)</label>
                        <select
                            name="employees"
                            value={profile.employees}
                            onChange={handleChange}
                            className="select-input"
                        >
                            <option value="">Select Size...</option>
                            <option value="1-10">1 - 10</option>
                            <option value="11-50">11 - 50</option>
                            <option value="51-200">51 - 200</option>
                            <option value="201-500">201 - 500</option>
                            <option value="500+">500+</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Main Customers / Target Market</label>
                        <input
                            type="text"
                            name="mainCustomers"
                            placeholder="e.g. Mid-market retail chains"
                            value={profile.mainCustomers}
                            onChange={handleChange}
                            className="text-input"
                        />
                    </div>

                    <div className="form-group">
                        <label>Key Products & Services</label>
                        <input
                            type="text"
                            name="keyProducts"
                            placeholder="e.g. Inventory management SaaS"
                            value={profile.keyProducts}
                            onChange={handleChange}
                            className="text-input"
                        />
                    </div>

                    <div className="form-group full-width">
                        <label>Competitive Advantage</label>
                        <textarea
                            name="competitiveAdvantage"
                            placeholder="Why do customers choose you over alternatives? (e.g. proprietary IP, exclusive location, 20-year reputation)"
                            value={profile.competitiveAdvantage}
                            onChange={handleChange}
                            className="textarea-input"
                            rows={2}
                        />
                    </div>

                    {/* Exit Strategy Section */}
                    <div className="form-group full-width" style={{ marginTop: '1.5rem', borderTop: '1px solid var(--border)', paddingTop: '1.5rem' }}>
                        <h3 style={{ fontSize: '1.2rem', margin: 0 }}>Exit Motivations & Deal Expectations</h3>
                    </div>

                    <div className="form-group">
                        <label>Primary Reason for Selling</label>
                        <select name="exitMotivation" value={profile.exitMotivation} onChange={handleChange} className="select-input">
                            <option value="">Select Reason...</option>
                            <option value="Retirement">Retirement</option>
                            <option value="No Succession Plan">No Succession Plan</option>
                            <option value="Partial Liquidity">Partial Liquidity (De-risking)</option>
                            <option value="Seeking Strategic Partner">Seeking Strategic Partner for Growth</option>
                            <option value="Burnout / New Venture">Burnout / New Venture</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Desired Exit Timeline</label>
                        <select name="exitTimeline" value={profile.exitTimeline} onChange={handleChange} className="select-input">
                            <option value="">Select Timeline...</option>
                            <option value="Immediate">Immediate (&lt; 3 months)</option>
                            <option value="6 months">~6 Months</option>
                            <option value="12 months">12+ Months</option>
                            <option value="Flexible">Flexible / Opportunistic</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Desired Transaction Type</label>
                        <select name="transactionType" value={profile.transactionType} onChange={handleChange} className="select-input">
                            <option value="">Select Type...</option>
                            <option value="100% Full Sale">100% Full Sale</option>
                            <option value="Majority Stake (51%+)">Majority Stake (51%+)</option>
                            <option value="Minority Stake Investment">Minority Stake Investment</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Willingness to Stay Post-Sale</label>
                        <select name="willingnessToStay" value={profile.willingnessToStay} onChange={handleChange} className="select-input">
                            <option value="">Select Stance...</option>
                            <option value="Yes - Long Term">Yes - Long Term (Re-investing/Operating)</option>
                            <option value="Yes - Transition Only">Yes - Transition Only (6-12 months)</option>
                            <option value="No - Immediate Exit">No - Immediate Exit</option>
                            <option value="Flexible">Flexible (Depends on terms)</option>
                        </select>
                    </div>
                </div>

                <div className="form-group full-width" style={{ marginTop: '1.5rem', borderTop: '1px solid var(--border)', paddingTop: '1.5rem' }}>
                    <h3 style={{ fontSize: '1.2rem', margin: 0 }}>Verification & Institutional Readiness</h3>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', margin: '0.5rem 0 1rem 0' }}>Legacy Bridge requires verified sellers to ensure high trust for our institutional buyers. This data remains confidential until NDA execution.</p>
                </div>

                <div className="form-grid">
                    <div className="form-group">
                        <label>Legal Entity Name *</label>
                        <input
                            type="text"
                            name="legalCompanyName"
                            placeholder="e.g. Acme Services LLC"
                            value={profile.legalCompanyName}
                            onChange={handleChange}
                            className="text-input"
                        />
                    </div>

                    <div className="form-group">
                        <label>Founder/Owner LinkedIn URL *</label>
                        <input
                            type="url"
                            name="founderLinkedIn"
                            placeholder="https://linkedin.com/in/owner"
                            value={profile.founderLinkedIn}
                            onChange={handleChange}
                            className="text-input"
                        />
                    </div>

                    <div className="form-group">
                        <label>Entity Structure *</label>
                        <select
                            name="entityType"
                            value={profile.entityType}
                            onChange={handleChange}
                            className="select-input"
                        >
                            <option value="">Select Structure...</option>
                            <option value="LLC">LLC</option>
                            <option value="S-Corp">S-Corp</option>
                            <option value="C-Corp">C-Corp</option>
                            <option value="Sole Proprietorship">Sole Proprietorship / Partnership</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Current Financial Preparation *</label>
                        <select
                            name="financialsPreparedBy"
                            value={profile.financialsPreparedBy}
                            onChange={handleChange}
                            className="select-input"
                        >
                            <option value="">Select Reporting Quality...</option>
                            <option value="Audited Financials (Third Party)">Audited Financials (Third Party)</option>
                            <option value="Quality of Earnings (QoE) Complete">Quality of Earnings (QoE) Complete</option>
                            <option value="Outsourced CPA / Fractional CFO">Outsourced CPA / Fractional CFO</option>
                            <option value="Internal Bookkeeper / Quickbooks">Internal Bookkeeper / Quickbooks</option>
                            <option value="Tax Returns Only">Tax Returns Only</option>
                        </select>
                    </div>

                </div>

                <div className="form-actions" style={{ marginTop: '2rem' }}>
                    <div style={{ padding: '1rem', background: 'rgba(111, 66, 193, 0.05)', border: '1px dashed var(--primary)', borderRadius: '8px', marginBottom: '1.5rem', fontSize: '0.85rem', color: 'var(--text-muted)', textAlign: 'center' }}>
                        🔒 Your identity and full business details are protected. Investors only see an anonymized summary until both parties sign an NDA.
                    </div>
                    <button className="btn-primary w-full mt-lg" onClick={handleSave}>
                        Verify & Create Data Room
                    </button>
                </div>
            </div>
        </div>
    );
};

export default BusinessOverview;
