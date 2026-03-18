import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import './Marketplace.css';
import toast from 'react-hot-toast';
import SkeletonLoader from './ui/SkeletonLoader';

const Marketplace: React.FC = () => {
    const [listings, setListings] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchListings = async () => {
            const { data, error } = await supabase.from('companies').select('*').order('created_at', { ascending: false });
            if (data && !error) {
                const mapped = data.map((c) => {
                    const details = c.details || {};
                    return {
                        id: c.id,
                        name: c.name,
                        industry: c.industry || 'Unknown Sector',
                        region: details.locations || 'Global',
                        revenue: details.recurringRevenue ? 'Verified' : 'TBD',
                        ebitda: 'TBD',
                        employees: details.employees || 'N/A',
                        recurringRev: details.recurringRevenue ? details.recurringRevenue + '%' : 'N/A',
                        ownerInvolvement: details.ownerInvolvement || 'Unknown',
                        matchScore: Math.floor(Math.random() * 20) + 75,
                        highlights: [details.competitiveAdvantage || 'Strong Position', 'Verified'],
                        status: 'Active',
                        views: Math.floor(Math.random() * 200),
                        ndas: Math.floor(Math.random() * 10),
                        foundingYear: details.foundedYear || 'Unknown',
                        askingPrice: 'Upon Request',
                        description: c.description || 'Confidential details.'
                    };
                });
                setListings(mapped);
            }
            setLoading(false);
        };
        fetchListings();
    }, []);

    const [selectedListing, setSelectedListing] = useState<string | null>(null);
    const [ndaRequested, setNdaRequested] = useState<string[]>([]);
    const [savedListings, setSavedListings] = useState<string[]>([]);
    const [activeTab, setActiveTab] = useState<'all' | 'saved' | 'notifs'>('all');
    const [isConfiguringMatch, setIsConfiguringMatch] = useState(false);

    const toggleSave = (id: string, e: React.MouseEvent) => {
        e.stopPropagation();
        setSavedListings(prev => prev.includes(id) ? prev.filter(l => l !== id) : [...prev, id]);
    };

    // Detailed View Mode
    if (selectedListing) {
        const listing = listings.find(l => l.id === selectedListing)!;
        const hasRequested = ndaRequested.includes(listing.id);

        return (
            <div className="marketplace-container animate-fade-in">
                <button className="btn-secondary back-btn" onClick={() => setSelectedListing(null)}>
                    ← Back to Deals
                </button>

                <div className="glass-panel detail-panel">
                    <div className="detail-header">
                        <div className="company-badge secret-badge">?</div>
                        <div className="detail-title">
                            <h2>Project {listing.industry.split(' ')[0]} Alpha</h2>
                            <span className="industry-tag">{listing.industry}</span>
                            <span className="region-tag" style={{ marginLeft: '0.5rem' }}>📍 {listing.region} • Est. {listing.foundingYear}</span>
                        </div>
                        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                            <div className="match-score-large">
                                {listing.matchScore}% Match
                            </div>
                            <button
                                onClick={(e) => toggleSave(listing.id, e)}
                                style={{ background: 'none', border: 'none', fontSize: '1.5rem', cursor: 'pointer', padding: '0.5rem' }}
                            >
                                {savedListings.includes(listing.id) ? '⭐' : '☆'}
                            </button>
                        </div>
                    </div>

                    <div className="metrics-grid">
                        <div className="metric-box" style={{ background: 'rgba(255, 255, 255, 0.02)', border: '1px solid var(--primary)' }}>
                            <label style={{ color: 'var(--primary)' }}>Asking Price</label>
                            <p style={{ color: 'var(--text)', fontWeight: 700 }}>{listing.askingPrice}</p>
                        </div>
                        <div className="metric-box">
                            <label>Revenue</label>
                            <p>{listing.revenue}</p>
                        </div>
                        <div className="metric-box">
                            <label>EBITDA</label>
                            <p>{listing.ebitda}</p>
                        </div>
                        <div className="metric-box">
                            <label>Recurring Rev</label>
                            <p>{listing.recurringRev}</p>
                        </div>
                        <div className="metric-box">
                            <label>Employees</label>
                            <p>{listing.employees}</p>
                        </div>
                    </div>

                    <div className="detail-section">
                        <h3>Investment Highlights</h3>
                        <ul className="highlight-list">
                            {listing.highlights.map((h: string, i: number) => (
                                <li key={i}>✓ {h}</li>
                            ))}
                        </ul>
                    </div>

                    <div className="detail-section blur-text-container">
                        <h3>Business Overview</h3>
                        <div className="blur-text-overlay">
                            <p>This section contains detailed information about products, customers, and operations. Access is restricted under the Legacy Bridge confidentiality protocol.</p>
                            {!hasRequested ? (
                                <button className="btn-primary w-full" onClick={() => setNdaRequested([...ndaRequested, listing.id])}>
                                    Request NDA to Unlock
                                </button>
                            ) : (
                                <button className="btn-secondary w-full" disabled>
                                    NDA Request Pending Approval...
                                </button>
                            )}
                        </div>
                    </div>

                    <div className="detail-section" style={{ marginTop: '2rem', borderTop: '1px solid var(--border)', paddingTop: '2rem', textAlign: 'center' }}>
                        <h3>Ready to Proceed?</h3>
                        <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>Once NDA is signed and diligence complete, request a direct introduction to the seller or their advisor.</p>
                        <button className="btn-primary" style={{ width: '100%', maxWidth: '300px', margin: '0 auto' }}>
                            Request Introduction
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    if (loading) return (
        <div className="marketplace-container animate-fade-in">
            <div className="marketplace-layout" style={{ marginTop: '2rem' }}>
                <div className="marketplace-feed">
                    <SkeletonLoader type="card" count={3} />
                </div>
            </div>
        </div>
    );

    const displayListings = activeTab === 'all' ? listings : listings.filter(l => savedListings.includes(l.id));

    return (
        <div className="marketplace-container animate-fade-in">
            <div className="marketplace-header">
                <div>
                    <h2>Deal Marketplace</h2>
                    <p className="subtitle">Discover verified, off-market opportunities fitted to your criteria.</p>
                </div>
                <div className="investor-profile-toggle" style={{ cursor: 'pointer' }} onClick={() => setIsConfiguringMatch(!isConfiguringMatch)}>
                    <span className="status-indicator online"></span>
                    AI Match Engine Active (Configure)
                </div>
            </div>

            {isConfiguringMatch && (
                <div className="glass-panel animate-fade-in" style={{ marginBottom: '2rem', border: '1px solid var(--primary)', background: 'rgba(255, 255, 255, 0.02)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                        <h3 style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <span style={{ fontSize: '1.5rem' }}>🎯</span> Edit Target Acquisition Criteria
                        </h3>
                        <button className="btn-secondary small" onClick={() => setIsConfiguringMatch(false)}>Close List</button>
                    </div>

                    <div className="form-grid">
                        <div className="form-group">
                            <label>Target Industries</label>
                            <input type="text" className="text-input" defaultValue="B2B SaaS, Managed IT, Healthcare" />
                        </div>
                        <div className="form-group">
                            <label>EBITDA Range</label>
                            <select className="select-input" defaultValue="1M-5M">
                                <option value="0-500K">&lt; $500K</option>
                                <option value="500K-1M">$500K - $1M</option>
                                <option value="1M-5M">$1M - $5M</option>
                                <option value="5M+">$5M+</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Geographic Preference</label>
                            <input type="text" className="text-input" defaultValue="North America, Western Europe" />
                        </div>
                        <div className="form-group">
                            <label>Min Operator Reliance</label>
                            <select className="select-input" defaultValue="Moderate">
                                <option value="Low">Low - Fully Managed</option>
                                <option value="Moderate">Moderate - Owner active</option>
                                <option value="High">High - Owner is the business</option>
                            </select>
                        </div>
                    </div>
                    <div style={{ marginTop: '1.5rem', textAlign: 'right' }}>
                        <button className="btn-primary" onClick={() => { toast.success('AI Matching algorithm updated!'); setIsConfiguringMatch(false); }}>Update AI Model</button>
                    </div>
                </div>
            )}

            <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', borderBottom: '1px solid var(--border)', paddingBottom: '1rem' }}>
                <button
                    onClick={() => setActiveTab('all')}
                    style={{ background: 'none', border: 'none', color: activeTab === 'all' ? 'var(--primary)' : 'var(--text-muted)', fontSize: '1.1rem', cursor: 'pointer', fontWeight: activeTab === 'all' ? 600 : 400, borderBottom: activeTab === 'all' ? '2px solid var(--primary)' : 'none', paddingBottom: '0.5rem' }}
                >
                    All Opportunities
                </button>
                <button
                    onClick={() => setActiveTab('saved')}
                    style={{ background: 'none', border: 'none', color: activeTab === 'saved' ? 'var(--primary)' : 'var(--text-muted)', fontSize: '1.1rem', cursor: 'pointer', fontWeight: activeTab === 'saved' ? 600 : 400, borderBottom: activeTab === 'saved' ? '2px solid var(--primary)' : 'none', paddingBottom: '0.5rem' }}
                >
                    Saved / Watchlist ({savedListings.length})
                </button>
                <button
                    onClick={() => setActiveTab('notifs')}
                    style={{ background: 'none', border: 'none', color: activeTab === 'notifs' ? 'var(--primary)' : 'var(--text-muted)', fontSize: '1.1rem', cursor: 'pointer', fontWeight: activeTab === 'notifs' ? 600 : 400, borderBottom: activeTab === 'notifs' ? '2px solid var(--primary)' : 'none', paddingBottom: '0.5rem' }}
                >
                    Notifications (2)
                </button>
            </div>

            <div className="marketplace-layout">
                {/* Filters Sidebar */}
                <div className="glass-panel filters-sidebar">
                    <h3>Search Filters</h3>

                    <div className="filter-group">
                        <label>Industry</label>
                        <select className="select-input">
                            <option>All Industries</option>
                            <option>B2B SaaS</option>
                            <option>Healthcare</option>
                            <option>FinTech</option>
                        </select>
                    </div>

                    <div className="filter-group">
                        <label>Min EBITDA (€)</label>
                        <input type="number" className="text-input" placeholder="e.g. 500000" />
                    </div>

                    <div className="filter-group">
                        <label>Max Owner Involvement</label>
                        <select className="select-input">
                            <option>Any Level</option>
                            <option>Low Only</option>
                            <option>Medium / Low</option>
                        </select>
                    </div>

                    <button className="btn-secondary w-full" style={{ marginTop: '1rem' }}>
                        Apply Filters
                    </button>
                </div>

                {/* Listings Grid */}
                <div className="listings-grid">
                    {displayListings.map(listing => (
                        <div key={listing.id} className="glass-panel listing-card">
                            <div className="listing-card-header">
                                <span className="status-badge">{listing.status}</span>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <div className="match-score" style={{ background: 'rgba(255, 255, 255, 0.05)', border: '1px solid var(--accent)', padding: '4px 12px', borderRadius: '12px' }}>
                                        <span className="score-value" style={{ color: 'var(--accent)', fontWeight: 'bold' }}>{listing.matchScore}%</span> AI Match
                                    </div>
                                    <button
                                        onClick={(e) => toggleSave(listing.id, e)}
                                        style={{ background: 'none', border: 'none', fontSize: '1.2rem', cursor: 'pointer' }}
                                        title={savedListings.includes(listing.id) ? "Remove from Watchlist" : "Save to Watchlist"}
                                    >
                                        {savedListings.includes(listing.id) ? '⭐' : '☆'}
                                    </button>
                                </div>
                            </div>

                            <h3 className="listing-title">Confidential {listing.industry}</h3>
                            <p className="listing-region">📍 {listing.region} • Est. {listing.foundingYear}</p>

                            <div className="listing-stats" style={{ gridTemplateColumns: '1fr 1fr 1fr', gap: '0.5rem' }}>
                                <div className="stat" style={{ background: 'rgba(255, 255, 255, 0.02)', borderRadius: '4px', padding: '0.5rem' }}>
                                    <span className="stat-label" style={{ color: 'var(--primary)' }}>Asking Price</span>
                                    <span className="stat-val" style={{ color: 'var(--text)', fontSize: '0.9rem' }}>{listing.askingPrice}</span>
                                </div>
                                <div className="stat">
                                    <span className="stat-label">Rev</span>
                                    <span className="stat-val" style={{ fontSize: '0.9rem' }}>{listing.revenue}</span>
                                </div>
                                <div className="stat">
                                    <span className="stat-label">EBITDA</span>
                                    <span className="stat-val" style={{ fontSize: '0.9rem' }}>{listing.ebitda}</span>
                                </div>
                            </div>

                            <div className="listing-attributes">
                                <span className="attr-tag">{listing.recurringRev} Rec. Rev</span>
                                <span className="attr-tag">{listing.ownerInvolvement} Owner Inv.</span>
                            </div>

                            <div style={{ margin: '1rem 0', padding: '0.75rem', background: 'rgba(255, 255, 255, 0.02)', borderLeft: '3px solid var(--primary)', borderRadius: '4px', fontSize: '0.85rem' }}>
                                <strong style={{ color: 'var(--text)' }}>Why it matches:</strong> Hit your EBITDA target & Industry pref.
                            </div>

                            <div style={{ marginTop: 'auto', display: 'flex', gap: '1rem', fontSize: '0.8rem', color: 'var(--text-muted)', borderTop: '1px solid var(--border)', paddingTop: '0.8rem' }}>
                                <span title="Profile Views">👁️ {listing.views} Views</span>
                                <span title="NDAs Requested">📝 {listing.ndas} NDAs Requested</span>
                            </div>

                            <button className="btn-secondary w-full mt-auto" style={{ marginTop: '1rem' }} onClick={() => setSelectedListing(listing.id)}>
                                View Details
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Marketplace;
