import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
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

    // Operations
    recurringRevenue: string; // percentage
    businessModel: string; // B2B/B2C
    supplierConcentration: string;
    ownerInvolvement: string; // high/medium/low

    // Exit Strategy
    exitMotivation: string;
    exitTimeline: string;
    transactionType: string;
    willingnessToStay: string;
}

const BusinessOverview: React.FC = () => {
    // Mode can be: 'list' (viewing owned companies), 'edit' (creating/editing a company), 'view' (viewing summary of a company)
    const [mode, setMode] = useState<'list' | 'edit' | 'view'>('list');

    const [myCompanies, setMyCompanies] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [userId, setUserId] = useState<string | null>(null);
    const [userRole, setUserRole] = useState<string | null>(null);

    const [isSaving, setIsSaving] = useState(false);

    // The current profile being edited or viewed
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
        recurringRevenue: '0',
        businessModel: '',
        supplierConcentration: '',
        ownerInvolvement: '',
        exitMotivation: '',
        exitTimeline: '',
        transactionType: '',
        willingnessToStay: ''
    });

    useEffect(() => {
        checkUserAndFetchCompanies();
    }, []);

    const checkUserAndFetchCompanies = async () => {
        setLoading(true);
        const { data: { session } } = await supabase.auth.getSession();

        if (session?.user) {
            setUserId(session.user.id);
            const { data: profileData } = await supabase.from('profiles').select('role').eq('id', session.user.id).single();
            if (profileData) setUserRole(profileData.role);

            // Fetch companies owned by this user
            const { data: companiesData, error } = await supabase
                .from('companies')
                .select('*')
                .eq('user_id', session.user.id)
                .order('created_at', { ascending: false });

            if (!error && companiesData) {
                setMyCompanies(companiesData);
                // If they have companies, show the list. If not, go straight to edit (if seller)
                if (companiesData.length === 0 && profileData?.role === 'seller') {
                    setMode('edit');
                } else {
                    setMode('list');
                }
            }
        }
        setLoading(false);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setProfile(prev => ({ ...prev, [name]: value }));
    };

    const handleSave = async () => {
        if (!userId) {
            alert("You must be logged in to save a profile.");
            return;
        }

        if (!profile.name || !profile.industry || !profile.description) {
            alert('Please fill out the critical fields: Name, Industry, and Description.');
            return;
        }

        setIsSaving(true);
        try {
            // Re-map asking price if provided in details later, but for now we leave it null 
            // since we don't have a direct "askingPrice" in BusinessProfile
            const { error } = await supabase.from('companies').insert({
                user_id: userId,
                name: profile.name,
                industry: profile.industry,
                description: profile.description,
                details: profile // Save the entire rich profile as JSON
            });

            if (error) throw error;

            await checkUserAndFetchCompanies(); // Refresh list
            setMode('list'); // Go back to list

            // Reset form
            resetProfile();

        } catch (err) {
            console.error("Error saving profile:", err);
            alert("There was an error saving your profile.");
        } finally {
            setIsSaving(false);
        }
    };

    const handleViewCompany = (company: any) => {
        // Hydrate the profile state with the stored JSON details OR map flat fields
        if (company.details) {
            setProfile(company.details);
        } else {
            // Fallback for companies created via the other minimal form
            const newProfile = { ...profile, name: company.name, industry: company.industry, description: company.description };
            // Reset other fields
            setProfile(newProfile);
        }
        setMode('view');
    };

    const resetProfile = () => {
        setProfile({
            name: '', industry: '', foundedYear: '', description: '', locations: '', employees: '',
            ownershipStructure: '', mainCustomers: '', keyProducts: '', competitiveAdvantage: '',
            recurringRevenue: '0', businessModel: '', supplierConcentration: '', ownerInvolvement: '',
            exitMotivation: '', exitTimeline: '', transactionType: '', willingnessToStay: ''
        });
    }

    if (loading) {
        return <div className="overview-container" style={{ textAlign: 'center', marginTop: '4rem' }}>Loading profiles...</div>;
    }

    if (mode === 'list') {
        return (
            <div className="overview-container animate-fade-in">
                <div className="overview-header text-center">
                    <h2>Your Listed Businesses</h2>
                    <p className="subtitle">Manage the profiles you have created for the Legacy Bridge platform.</p>
                </div>

                <div className="listings-grid" style={{ marginTop: '2rem' }}>
                    {myCompanies.length === 0 ? (
                        <div className="glass-panel" style={{ padding: '2rem', textAlign: 'center', gridColumn: '1 / -1' }}>
                            <p style={{ color: 'var(--text-muted)', marginBottom: '1rem' }}>You have not listed any businesses yet.</p>
                            {userRole === 'seller' && (
                                <button className="btn-primary" onClick={() => { resetProfile(); setMode('edit'); }}>
                                    + Create Business Profile
                                </button>
                            )}
                        </div>
                    ) : (
                        myCompanies.map((company) => (
                            <div key={company.id} className="glass-panel listing-card" style={{ cursor: 'pointer' }} onClick={() => handleViewCompany(company)}>
                                <h3 className="listing-title">{company.name}</h3>
                                <p className="listing-region" style={{ marginBottom: '1rem' }}>{company.industry}</p>
                                <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                                    {company.description}
                                </p>
                                <button className="btn-secondary w-full" style={{ marginTop: '1rem' }}>View Full Profile</button>
                            </div>
                        ))
                    )}
                </div>

                {myCompanies.length > 0 && userRole === 'seller' && (
                    <div style={{ textAlign: 'center', marginTop: '3rem' }}>
                        <button className="btn-primary" onClick={() => { resetProfile(); setMode('edit'); }}>
                            + Add Another Business
                        </button>
                    </div>
                )}
            </div>
        );
    }

    if (mode === 'view') {
        // Mock AI Confidence Indicators based on profile data
        const indicators = [
            profile.recurringRevenue && parseInt(profile.recurringRevenue) > 50 ? { text: "+50% Recurring Revenue", icon: "🔄" } : null,
            profile.ownerInvolvement === 'low' ? { text: "Low Owner Dependence", icon: "👤" } : null,
            profile.businessModel === 'B2B' ? { text: "B2B Market Stability", icon: "🏢" } : null,
            profile.foundedYear && (new Date().getFullYear() - parseInt(profile.foundedYear)) > 10 ? { text: "10+ Years Operating History", icon: "📅" } : null,
            { text: "Stable Cash Flows", icon: "📈" } // Default mock indicator
        ].filter(Boolean) as { text: string; icon: string }[];

        return (
            <div className="overview-container animate-fade-in">
                <button className="btn-secondary back-btn" onClick={() => setMode('list')} style={{ marginBottom: '1rem' }}>
                    ← Back to Listings
                </button>
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
                        {/* <button className="btn-secondary edit-btn" onClick={() => setMode('edit')}>Edit Profile</button> */}
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
                        <div className="summary-item">
                            <label>Model</label>
                            <p>{profile.businessModel || 'N/A'}</p>
                        </div>
                        <div className="summary-item">
                            <label>Recurring Rev</label>
                            <p>{profile.recurringRevenue}%</p>
                        </div>
                        <div className="summary-item">
                            <label>Owner Role</label>
                            <p style={{ textTransform: 'capitalize' }}>{profile.ownerInvolvement || 'N/A'}</p>
                        </div>
                    </div>

                    <div className="summary-description">
                        <label>Business Description</label>
                        <p>{profile.description}</p>

                        <div style={{ marginTop: '1.5rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                            <div>
                                <label style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Key Products</label>
                                <p style={{ color: 'var(--text-muted)' }}>{profile.keyProducts || 'N/A'}</p>
                            </div>
                            <div>
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
            {myCompanies.length > 0 && (
                <button className="btn-secondary back-btn" onClick={() => setMode('list')} style={{ marginBottom: '1rem' }}>
                    ← Back to Listings
                </button>
            )}
            <div className="overview-header text-center">
                <h2>Business Overview</h2>
                <p className="subtitle">Define your fundamental enterprise structure to begin the M&A prep process.</p>
            </div>

            <div className="glass-panel overview-form">
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

                    <div className="form-group">
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
                            <option value="Venture/PE Backed">Venture/PE Backed</option>
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
                        <label>Competitive Advantage (The Moat)</label>
                        <textarea
                            name="competitiveAdvantage"
                            placeholder="What makes the business successful against competitors?"
                            value={profile.competitiveAdvantage}
                            onChange={handleChange}
                            className="textarea-input"
                            rows={2}
                        />
                    </div>

                    {/* Operations Section */}
                    <div className="form-group full-width" style={{ marginTop: '1.5rem', borderTop: '1px solid var(--border)', paddingTop: '1.5rem' }}>
                        <h3 style={{ fontSize: '1.2rem', margin: 0 }}>Operations & Model</h3>
                    </div>

                    <div className="form-group">
                        <label>Business Model</label>
                        <select name="businessModel" value={profile.businessModel} onChange={handleChange} className="select-input">
                            <option value="">Select...</option>
                            <option value="B2B">B2B (Business to Business)</option>
                            <option value="B2C">B2C (Business to Consumer)</option>
                            <option value="B2B2C">B2B2C</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Recurring Revenue (%)</label>
                        <div className="range-slider-wrapper" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            <input
                                type="range"
                                name="recurringRevenue"
                                min="0" max="100" step="5"
                                value={profile.recurringRevenue}
                                onChange={handleChange}
                                style={{ flex: 1 }}
                            />
                            <span className="value-display">{profile.recurringRevenue}%</span>
                        </div>
                    </div>

                    <div className="form-group">
                        <label>Supplier Concentration</label>
                        <select name="supplierConcentration" value={profile.supplierConcentration} onChange={handleChange} className="select-input">
                            <option value="">Select Risk Level...</option>
                            <option value="Low">Low - Multiple alternatives available</option>
                            <option value="Medium">Medium - Top 3 suppliers = 50% spend</option>
                            <option value="High">High - Single critical supplier dependency</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Owner Involvement in Operations</label>
                        <select name="ownerInvolvement" value={profile.ownerInvolvement} onChange={handleChange} className="select-input">
                            <option value="">Select Level...</option>
                            <option value="high">High - Handles daily ops & sales</option>
                            <option value="medium">Medium - Strategic decisions & key accounts</option>
                            <option value="low">Low - Fully delegated management team</option>
                        </select>
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

                <div className="form-actions">
                    <button className="btn-primary w-full mt-lg" onClick={handleSave} disabled={isSaving}>
                        {isSaving ? 'Saving Profile...' : 'Save Profile & Lock Details'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default BusinessOverview;
