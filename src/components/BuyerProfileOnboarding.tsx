import React, { useState } from 'react';
import './BusinessOverview.css'; // Reusing form styles

interface BuyerProfile {
    // Basic Info
    name: string;
    firmType: string;
    location: string;

    // Identity & Verification
    linkedInUrl: string;
    firmWebsite: string;

    // Capital
    committedCapital: string;
    capitalSource: string;
    financingStatus: string;
    targetDealSizeMin: string;
    targetDealSizeMax: string;

    // Preferences
    targetIndustries: string[];
    targetGeographies: string[];
    ebitdaMin: string;

    // Experience & Track Record
    pastAcquisitions: string;
    operatingExperience: string;
    timeHorizon: string;
}

const BuyerProfileOnboarding: React.FC = () => {
    const [isEditing, setIsEditing] = useState(true);
    const [profile, setProfile] = useState<BuyerProfile>({
        name: '',
        firmType: '',
        location: '',
        linkedInUrl: '',
        firmWebsite: '',
        committedCapital: '',
        capitalSource: '',
        financingStatus: '',
        targetDealSizeMin: '',
        targetDealSizeMax: '',
        targetIndustries: [],
        targetGeographies: [],
        ebitdaMin: '',
        pastAcquisitions: '',
        operatingExperience: '',
        timeHorizon: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setProfile(prev => ({ ...prev, [name]: value }));
    };

    const handleSave = () => {
        if (!profile.name || !profile.firmType || !profile.committedCapital || !profile.linkedInUrl || !profile.capitalSource) {
            alert('Please fill out all critical verification fields, including your LinkedIn URL and Capital Source.');
            return;
        }
        setIsEditing(false);
    };

    if (!isEditing) {
        return (
            <div className="overview-container animate-fade-in">
                <div className="overview-header text-center">
                    <h2>Buyer Verification Complete</h2>
                    <p className="subtitle">Your identity and institutional credentials have been locked. Accessing the Marketplace...</p>
                </div>

                <div className="glass-panel profile-summary text-center" style={{ padding: '3rem' }}>
                    <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>✅</div>
                    <h3 style={{ marginBottom: '1rem', color: 'var(--text)' }}>Profile Verified</h3>
                    <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>You will now be notified when matching deals enter the Marketplace.</p>
                    <button className="btn-primary" onClick={() => window.location.reload()}>Browse Marketplace</button>
                    <button className="btn-secondary" style={{ marginLeft: '1rem' }} onClick={() => setIsEditing(true)}>Edit Parameters</button>
                </div>
            </div>
        );
    }

    return (
        <div className="overview-container animate-fade-in">
            <div className="overview-header text-center">
                <h2>Buyer Registration</h2>
                <p className="subtitle">Define your search parameters to access verified acquisition opportunities.</p>
            </div>

            <div className="glass-panel overview-form">
                <div className="form-grid">
                    <div className="form-group full-width">
                        <label>Firm / Searcher Name *</label>
                        <input
                            type="text"
                            name="name"
                            placeholder="e.g. Apex Equity Partners"
                            value={profile.name}
                            onChange={handleChange}
                            className="text-input"
                        />
                    </div>

                    <div className="form-group">
                        <label>Investor Type *</label>
                        <select
                            name="firmType"
                            value={profile.firmType}
                            onChange={handleChange}
                            className="select-input"
                        >
                            <option value="">Select Type...</option>
                            <option value="Traditional Search Fund">Traditional Search Fund</option>
                            <option value="Self-Funded Searcher">Self-Funded Searcher</option>
                            <option value="Independent Sponsor">Independent Sponsor</option>
                            <option value="Private Equity">Private Equity / Family Office</option>
                            <option value="Strategic Acquirer">Strategic Acquirer</option>
                        </select>
                    </div>

                    <div className="form-group full-width" style={{ marginTop: '1.5rem', borderTop: '1px solid var(--border)', paddingTop: '1.5rem' }}>
                        <h3 style={{ fontSize: '1.2rem', margin: 0 }}>Verification & Identity</h3>
                        <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', margin: '0.5rem 0 1rem 0' }}>Sellers prioritize transparency. A verified professional identity is required to view confidential listings.</p>
                    </div>

                    <div className="form-group">
                        <label>LinkedIn Profile URL *</label>
                        <input
                            type="url"
                            name="linkedInUrl"
                            placeholder="https://linkedin.com/in/yourprofile"
                            value={profile.linkedInUrl}
                            onChange={handleChange}
                            className="text-input"
                        />
                    </div>

                    <div className="form-group">
                        <label>Firm / Personal Website (Optional)</label>
                        <input
                            type="url"
                            name="firmWebsite"
                            placeholder="https://yourfirm.com"
                            value={profile.firmWebsite}
                            onChange={handleChange}
                            className="text-input"
                        />
                    </div>

                    <div className="form-group full-width" style={{ marginTop: '1.5rem', borderTop: '1px solid var(--border)', paddingTop: '1.5rem' }}>
                        <h3 style={{ fontSize: '1.2rem', margin: 0 }}>Capital Structure & Financing</h3>
                    </div>

                    <div className="form-group">
                        <label>Primary Source of Capital *</label>
                        <select
                            name="capitalSource"
                            value={profile.capitalSource}
                            onChange={handleChange}
                            className="select-input"
                        >
                            <option value="">Select Capital Source...</option>
                            <option value="Committed LP Fund">Committed LP Fund</option>
                            <option value="Self-Funded (Personal Capital)">Self-Funded (Personal Capital)</option>
                            <option value="SBA Pre-Approved">SBA Pre-Approved / Bank Debt</option>
                            <option value="Independent Sponsor (Pledging)">Independent Sponsor (Pledging Capital)</option>
                            <option value="Strategic Balance Sheet">Strategic (Balance Sheet / Corporate Cash)</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Current Financing Status</label>
                        <select
                            name="financingStatus"
                            value={profile.financingStatus}
                            onChange={handleChange}
                            className="select-input"
                        >
                            <option value="">Select Status...</option>
                            <option value="Dry Powder Ready">Dry Powder Ready (&gt;75% Liquid)</option>
                            <option value="Committed Capital Call needed">Committed Fund (Capital Call Required)</option>
                            <option value="Raising Capital per Deal">Raising Capital on a per-deal basis</option>
                            <option value="SBA Underwriting Ongoing">SBA / Bank Underwriting Ongoing</option>
                        </select>
                    </div>

                    <div className="form-group full-width">
                        <label>Committed Capital Available (Liquid) *</label>
                        <select
                            name="committedCapital"
                            value={profile.committedCapital}
                            onChange={handleChange}
                            className="select-input"
                        >
                            <option value="">Select Range...</option>
                            <option value="<$1M">&lt; $1M</option>
                            <option value="$1M - $5M">$1M - $5M</option>
                            <option value="$5M - $20M">$5M - $20M</option>
                            <option value="$20M+">$20M+</option>
                        </select>
                    </div>

                    <div className="form-group full-width" style={{ marginTop: '1.5rem', borderTop: '1px solid var(--border)', paddingTop: '1.5rem' }}>
                        <h3 style={{ fontSize: '1.2rem', margin: 0 }}>Target Parameters</h3>
                    </div>

                    <div className="form-group owner-comp-group full-width">
                        <div>
                            <label>Min Target Deal Size (EV)</label>
                            <input
                                type="number"
                                name="targetDealSizeMin"
                                placeholder="$"
                                value={profile.targetDealSizeMin}
                                onChange={handleChange}
                                className="text-input"
                            />
                        </div>
                        <div>
                            <label>Max Target Deal Size (EV)</label>
                            <input
                                type="number"
                                name="targetDealSizeMax"
                                placeholder="$"
                                value={profile.targetDealSizeMax}
                                onChange={handleChange}
                                className="text-input"
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label>Minimum Target EBITDA</label>
                        <input
                            type="number"
                            name="ebitdaMin"
                            placeholder="$"
                            value={profile.ebitdaMin}
                            onChange={handleChange}
                            className="text-input"
                        />
                    </div>

                    <div className="form-group">
                        <label>Desired Time Horizon to Close</label>
                        <select
                            name="timeHorizon"
                            value={profile.timeHorizon}
                            onChange={handleChange}
                            className="select-input"
                        >
                            <option value="">Select Horizon...</option>
                            <option value="< 6 Months">Active (&lt; 6 Months)</option>
                            <option value="6-12 Months">Monitoring (6-12 Months)</option>
                            <option value="Opportunistic">Opportunistic (12+ Months)</option>
                        </select>
                    </div>

                    <div className="form-group full-width" style={{ marginTop: '1.5rem', borderTop: '1px solid var(--border)', paddingTop: '1.5rem' }}>
                        <h3 style={{ fontSize: '1.2rem', margin: 0 }}>Experience & Track Record</h3>
                        <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', margin: '0.5rem 0 1rem 0' }}>Showcase your operational and M&A experience to build trust directly with owners.</p>
                    </div>

                    <div className="form-group">
                        <label>Past Acquisitions Completed</label>
                        <select
                            name="pastAcquisitions"
                            value={profile.pastAcquisitions}
                            onChange={handleChange}
                            className="select-input"
                        >
                            <option value="">Select Experience Level...</option>
                            <option value="0 (First Time Searcher)">0 (First Time Searcher)</option>
                            <option value="1-2 Deals">1 - 2 Deals</option>
                            <option value="3-5 Deals">3 - 5 Deals</option>
                            <option value="6+ Deals (Serial Acquirer)">6+ Deals (Serial / Institutional)</option>
                        </select>
                    </div>

                    <div className="form-group full-width">
                        <label>Prior Operating Experience</label>
                        <textarea
                            name="operatingExperience"
                            placeholder="Briefly describe your operational background, domains of expertise, and what value you bring to a business post-acquisition..."
                            value={profile.operatingExperience}
                            onChange={handleChange}
                            className="textarea-input"
                            rows={3}
                        />
                    </div>
                </div>

                <div className="form-actions" style={{ marginTop: '2rem' }}>
                    <div style={{ padding: '1rem', background: 'rgba(111, 66, 193, 0.05)', border: '1px dashed var(--primary)', borderRadius: '8px', marginBottom: '1.5rem', fontSize: '0.85rem', color: 'var(--text-muted)', textAlign: 'center' }}>
                        🔒 By submitting this profile, you agree to the Legacy Bridge strict confidentiality and NDA terms for all reviewed listings.
                    </div>
                    <button className="btn-primary w-full mt-lg" onClick={handleSave}>
                        Verify Institutional Identity & Access Deals
                    </button>
                </div>
            </div>
        </div>
    );
};

export default BuyerProfileOnboarding;
