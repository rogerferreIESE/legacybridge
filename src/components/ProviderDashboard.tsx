import React, { useState } from 'react';

const ProviderDashboard: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'clients' | 'services'>('clients');

    const mockClients = [
        { id: 1, name: 'Apex Manufacturing Co.', industry: 'Manufacturing', stage: 'Data Room Prep', revenue: '$4.2M' },
        { id: 2, name: 'Precision Logistics', industry: 'Logistics', stage: 'Active Listing', revenue: '$8.5M' },
        { id: 3, name: 'Main Street Retailers', industry: 'Retail', stage: 'NDA Phase', revenue: '$1.8M' }
    ];

    return (
        <div className="provider-dashboard">
            <div className="dashboard-header" style={{ marginBottom: '2rem' }}>
                <h2 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Service Provider Dashboard</h2>
                <p className="subtitle" style={{ color: 'var(--text-muted)' }}>Manage your client portfolio and actively market your services to retiring business owners.</p>
            </div>

            <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', borderBottom: '1px solid var(--border)', paddingBottom: '1rem' }}>
                <button
                    className={`btn-secondary ${activeTab === 'clients' ? 'active' : ''}`}
                    onClick={() => setActiveTab('clients')}
                    style={activeTab === 'clients' ? { background: 'rgba(0, 240, 255, 0.15)', borderColor: 'var(--primary)' } : {}}
                >
                    👤 Client Roster
                </button>
                <button
                    className={`btn-secondary ${activeTab === 'services' ? 'active' : ''}`}
                    onClick={() => setActiveTab('services')}
                    style={activeTab === 'services' ? { background: 'rgba(0, 240, 255, 0.15)', borderColor: 'var(--primary)' } : {}}
                >
                    🛠️ My Services
                </button>
            </div>

            {activeTab === 'clients' && (
                <div className="clients-list">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                        <h3 style={{ margin: 0 }}>Active Seller Engagements</h3>
                        <button className="btn-primary small">Invite New Client</button>
                    </div>
                    <div className="glass-panel" style={{ padding: '0' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                            <thead>
                                <tr style={{ borderBottom: '1px solid var(--border)', color: 'var(--text-muted)' }}>
                                    <th style={{ padding: '1rem' }}>SME Client</th>
                                    <th style={{ padding: '1rem' }}>Industry</th>
                                    <th style={{ padding: '1rem' }}>Revenue</th>
                                    <th style={{ padding: '1rem' }}>Current Stage</th>
                                    <th style={{ padding: '1rem', textAlign: 'right' }}>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {mockClients.map(client => (
                                    <tr key={client.id} style={{ borderBottom: '1px solid var(--border)' }}>
                                        <td style={{ padding: '1rem', fontWeight: 'bold' }}>{client.name}</td>
                                        <td style={{ padding: '1rem' }}>{client.industry}</td>
                                        <td style={{ padding: '1rem' }}>{client.revenue}</td>
                                        <td style={{ padding: '1rem' }}>
                                            <span style={{
                                                background: 'rgba(111, 66, 193, 0.2)',
                                                color: '#c084fc',
                                                padding: '4px 8px',
                                                borderRadius: '12px',
                                                fontSize: '0.8rem'
                                            }}>
                                                {client.stage}
                                            </span>
                                        </td>
                                        <td style={{ padding: '1rem', textAlign: 'right' }}>
                                            <button className="btn-secondary small" onClick={() => alert(`Entering workspace for ${client.name}`)}>View Vault</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {activeTab === 'services' && (
                <div className="services-config animate-fade-in">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                        <h3 style={{ margin: 0 }}>Marketplace Offerings</h3>
                        <button className="btn-primary small">+ Add Service Tier</button>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                        <div className="glass-panel" style={{ border: '1px solid var(--primary)', background: 'rgba(0, 240, 255, 0.05)' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                                <h4>QofE & Financial Prep</h4>
                                <span style={{ color: 'var(--accent-gold)', fontWeight: 'bold' }}>$15,000</span>
                            </div>
                            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>Comprehensive Quality of Earnings report and data room preparation for manufacturing and retail companies.</p>
                            <button className="btn-secondary" style={{ width: '100%' }}>Edit Listing</button>
                        </div>

                        <div className="glass-panel">
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                                <h4>Legal Diagnostic Review</h4>
                                <span style={{ color: 'var(--accent-gold)', fontWeight: 'bold' }}>$5,000</span>
                            </div>
                            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>Review of commercial leases, supply chain contracts, and environmental liabilities prior to listing.</p>
                            <button className="btn-secondary" style={{ width: '100%' }}>Edit Listing</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProviderDashboard;
