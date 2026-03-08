import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import AddCompanyForm from './AddCompanyForm';
import './Marketplace.css';

// Mock Data for the Marketplace listings
const mockListings = [
    {
        id: '1',
        industry: 'B2B SaaS',
        region: 'Western Europe',
        revenue: '€4.2M',
        ebitda: '€1.1M',
        employees: '15',
        recurringRev: '85%',
        ownerInvolvement: 'Medium',
        matchScore: 92,
        highlights: ['High Growth', 'Low Churn', 'Proprietary Tech'],
        status: 'Active'
    },
    {
        id: '2',
        industry: 'Healthcare Services',
        region: 'UK',
        revenue: '€8.5M',
        ebitda: '€2.3M',
        employees: '45',
        recurringRev: '60%',
        ownerInvolvement: 'High',
        matchScore: 78,
        highlights: ['Established Brand', 'High Margins', 'Retiring Owner'],
        status: 'Active'
    },
    {
        id: '3',
        industry: 'FinTech',
        region: 'Nordics',
        revenue: '€3.1M',
        ebitda: '€850k',
        employees: '12',
        recurringRev: '95%',
        ownerInvolvement: 'Low',
        matchScore: 88,
        highlights: ['Fully Delegated Ops', 'Scalable Platform'],
        status: 'New'
    }
];

const Marketplace: React.FC = () => {
    const [selectedListing, setSelectedListing] = useState<string | null>(null);
    const [ndaRequested, setNdaRequested] = useState<string[]>([]);

    // Supabase States
    const [companies, setCompanies] = useState<any[]>(mockListings);
    const [userRole, setUserRole] = useState<string | null>(null);
    const [userId, setUserId] = useState<string | null>(null);
    const [isAddOpen, setIsAddOpen] = useState(false);

    useEffect(() => {
        fetchCompanies();
        checkUser();

        // Listen for auth changes to re-check user
        const { data: { subscription } } = supabase.auth.onAuthStateChange(() => {
            checkUser();
        });
        return () => subscription.unsubscribe();
    }, []);

    const checkUser = async () => {
        const { data: { session } } = await supabase.auth.getSession();
        if (session?.user) {
            setUserId(session.user.id);
            const { data } = await supabase.from('profiles').select('role').eq('id', session.user.id).single();
            if (data) setUserRole(data.role);
        } else {
            setUserId(null);
            setUserRole(null);
        }
    };

    const fetchCompanies = async () => {
        const { data, error } = await supabase.from('companies').select('*').order('created_at', { ascending: false });
        if (!error && data && data.length > 0) {
            const formattedData = data.map((dbItem: any) => ({
                id: dbItem.id,
                industry: dbItem.industry,
                region: 'Global',
                revenue: 'Confidential',
                ebitda: dbItem.asking_price ? `€${(dbItem.asking_price / 1000000).toFixed(1)}M` : 'N/A',
                employees: '10+',
                recurringRev: 'TBD',
                ownerInvolvement: 'Transition',
                matchScore: Math.floor(Math.random() * 20) + 80,
                highlights: [dbItem.description?.substring(0, 50) + '...', 'Verified Listing'],
                status: 'New',
                name: dbItem.name
            }));
            // Merge live data with mock placeholders
            setCompanies([...formattedData, ...mockListings]);
        } else {
            setCompanies(mockListings);
        }
    };

    // Detailed View Mode
    if (selectedListing) {
        const listing = companies.find((l: any) => l.id === selectedListing)!;
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
                            <h2>{listing.name || `Project ${listing.industry.split(' ')[0]} Alpha`}</h2>
                            <span className="industry-tag">{listing.industry}</span>
                            <span className="region-tag">📍 {listing.region}</span>
                        </div>
                        <div className="match-score-large">
                            {listing.matchScore}% Match
                        </div>
                    </div>

                    <div className="metrics-grid">
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
                        <p className="blur-text">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="marketplace-container animate-fade-in">
            <div className="marketplace-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap' }}>
                <div>
                    <h2>Deal Marketplace</h2>
                    <p className="subtitle">Discover verified, off-market opportunities fitted to your criteria.</p>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '8px' }}>
                    <div className="investor-profile-toggle">
                        <span className="status-indicator online"></span>
                        {userRole === 'seller' ? 'Seller Profile Active' : 'Search Fund Profile Active'}
                    </div>
                    {userRole === 'seller' && (
                        <button className="btn-primary" onClick={() => setIsAddOpen(true)}>
                            + List New Company
                        </button>
                    )}
                </div>
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
                    {companies.map(listing => (
                        <div key={listing.id} className="glass-panel listing-card">
                            <div className="listing-card-header">
                                <span className="status-badge">{listing.status}</span>
                                <div className="match-score">
                                    <span className="score-value">{listing.matchScore}%</span> Fit
                                </div>
                            </div>

                            <h3 className="listing-title">{listing.name ? `Project ${listing.name}` : `Confidential ${listing.industry}`}</h3>
                            <p className="listing-region">📍 {listing.region}</p>

                            <div className="listing-stats">
                                <div className="stat">
                                    <span className="stat-label">Rev</span>
                                    <span className="stat-val">{listing.revenue}</span>
                                </div>
                                <div className="stat">
                                    <span className="stat-label">EBITDA</span>
                                    <span className="stat-val">{listing.ebitda}</span>
                                </div>
                            </div>

                            <div className="listing-attributes">
                                <span className="attr-tag">{listing.recurringRev} Rec. Rev</span>
                                <span className="attr-tag">{listing.ownerInvolvement} Owner Inv.</span>
                            </div>

                            <button className="btn-secondary w-full mt-auto" onClick={() => setSelectedListing(listing.id)}>
                                View Details
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            {userId && (
                <AddCompanyForm
                    isOpen={isAddOpen}
                    onClose={() => setIsAddOpen(false)}
                    onSuccess={fetchCompanies}
                    userId={userId}
                />
            )}
        </div>
    );
};

export default Marketplace;
