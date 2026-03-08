import React, { useState } from 'react';
import './ValuationCalculator.css';

const ValuationCalculator: React.FC = () => {
    const [revenue, setRevenue] = useState(5000000);
    const [revenueGrowth, setRevenueGrowth] = useState(25);
    const [grossMargin, setGrossMargin] = useState(65);
    const [netIncome, setNetIncome] = useState(800000);
    const [highConcentration, setHighConcentration] = useState(false);

    // CapEx Normalization
    const [oneTimeExpenses, setOneTimeExpenses] = useState(150000);
    const [ownerComp, setOwnerComp] = useState(250000);
    const [marketComp, setMarketComp] = useState(150000); // What a replacement CEO would cost
    const [personalExpenses, setPersonalExpenses] = useState(50000);

    // Market Multiples (Private market discount applied per PRD)
    const defaultMultiple = 4.5;
    const [multiple, setMultiple] = useState(defaultMultiple);

    // Calculations
    const growthPremium = revenueGrowth > 20 ? (revenueGrowth - 20) * 0.05 : 0;
    const marginPremium = grossMargin > 60 ? (grossMargin - 60) * 0.02 : 0;
    const concentrationPenalty = highConcentration ? -0.5 : 0; // Reduce multiple by 0.5x if high risk

    const adjustedMultiple = multiple + growthPremium + marginPremium + concentrationPenalty;

    const ownerCompAdjustment = ownerComp - marketComp; // Add back excess compensation
    const totalAddBacks = oneTimeExpenses + ownerCompAdjustment + personalExpenses;
    const normalizedEbitda = netIncome + totalAddBacks;

    const estimatedValue = normalizedEbitda * adjustedMultiple;

    const formatCurrency = (val: number) => {
        return new Intl.NumberFormat('en-EU', {
            style: 'currency',
            currency: 'EUR',
            maximumFractionDigits: 0
        }).format(val);
    };

    return (
        <div className="valuation-container">
            <div className="valuation-header text-center">
                <h2>Valuation Engine</h2>
                <p className="subtitle">Instant, institutional-grade valuation with CapEx normalization.</p>
            </div>

            <div className="valuation-grid">
                {/* Input Section */}
                <div className="glass-panel input-panel">
                    <h3>Financial Data</h3>

                    <div className="input-group">
                        <label>Annual Revenue</label>
                        <div className="range-slider-wrapper">
                            <input
                                type="range"
                                min="2000000" max="15000000" step="100000"
                                value={revenue}
                                onChange={(e) => setRevenue(Number(e.target.value))}
                            />
                            <span className="value-display">{formatCurrency(revenue)}</span>
                        </div>
                    </div>

                    <div className="input-group">
                        <label>Revenue Growth (YoY %)</label>
                        <div className="range-slider-wrapper">
                            <input
                                type="range"
                                min="0" max="200" step="1"
                                value={revenueGrowth}
                                onChange={(e) => setRevenueGrowth(Number(e.target.value))}
                            />
                            <span className="value-display">{revenueGrowth}%</span>
                        </div>
                    </div>

                    <div className="input-group">
                        <label>Gross Margin (%)</label>
                        <div className="range-slider-wrapper">
                            <input
                                type="range"
                                min="0" max="100" step="1"
                                value={grossMargin}
                                onChange={(e) => setGrossMargin(Number(e.target.value))}
                            />
                            <span className="value-display">{grossMargin}%</span>
                        </div>
                    </div>

                    <div className="input-group">
                        <label>Reported Net Income</label>
                        <div className="range-slider-wrapper">
                            <input
                                type="range"
                                min="0" max="5000000" step="50000"
                                value={netIncome}
                                onChange={(e) => setNetIncome(Number(e.target.value))}
                            />
                            <span className="value-display">{formatCurrency(netIncome)}</span>
                        </div>
                    </div>

                    <div className="input-group" style={{ marginTop: '1rem', background: 'rgba(239, 68, 68, 0.05)', padding: '1rem', borderRadius: '8px', border: '1px solid rgba(239, 68, 68, 0.2)' }}>
                        <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', color: 'var(--text)', margin: 0, textTransform: 'none', fontSize: '0.95rem' }}>
                            <input
                                type="checkbox"
                                checked={highConcentration}
                                onChange={(e) => setHighConcentration(e.target.checked)}
                                style={{ width: '18px', height: '18px', accentColor: 'var(--error)' }}
                            />
                            <strong>High Customer Concentration Flag</strong>
                        </label>
                        <p style={{ margin: '0.5rem 0 0 1.5rem', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                            Does a single client account for &gt; 20% of your total revenue? (Applies a 0.5x multiple penalty).
                        </p>
                    </div>

                    <h4 className="section-divider">Normalizations (Add-backs)</h4>

                    <div className="input-group">
                        <label>One-Time/Non-Recurring CapEx</label>
                        <input
                            type="number"
                            className="number-input"
                            value={oneTimeExpenses}
                            onChange={(e) => setOneTimeExpenses(Number(e.target.value))}
                        />
                        <small>e.g. Lawsuits, major one-off equipment</small>
                    </div>

                    <div className="input-group">
                        <label>Unnecessary/Personal Expenses</label>
                        <input
                            type="number"
                            className="number-input"
                            value={personalExpenses}
                            onChange={(e) => setPersonalExpenses(Number(e.target.value))}
                        />
                        <small>e.g. Family on payroll, club memberships</small>
                    </div>

                    <div className="input-group owner-comp-group">
                        <div>
                            <label>Current Owner Comp</label>
                            <input
                                type="number"
                                className="number-input"
                                value={ownerComp}
                                onChange={(e) => setOwnerComp(Number(e.target.value))}
                            />
                        </div>
                        <div>
                            <label>Market Replacement Cost</label>
                            <input
                                type="number"
                                className="number-input"
                                value={marketComp}
                                onChange={(e) => setMarketComp(Number(e.target.value))}
                            />
                        </div>
                    </div>

                    <div className="input-group">
                        <label>Base Market Multiple (Industry Avg: 4.5x)</label>
                        <div className="range-slider-wrapper">
                            <input
                                type="range"
                                min="2" max="8" step="0.1"
                                value={multiple}
                                onChange={(e) => setMultiple(Number(e.target.value))}
                            />
                            <span className="value-display">{multiple.toFixed(1)}x</span>
                        </div>
                        {adjustedMultiple !== multiple && (
                            <small className="premium-notice" style={{ color: adjustedMultiple > multiple ? 'var(--success)' : 'var(--error)', marginTop: '0.5rem', display: 'block' }}>
                                {(adjustedMultiple - multiple) > 0 ? '+' : ''}  {(adjustedMultiple - multiple).toFixed(2)}x Dynamic Adjustment (Growth, Margin, Risk)
                            </small>
                        )}
                    </div>
                </div>

                {/* Results Section */}
                <div className="glass-panel results-panel">
                    <h3>Your Valuation Dashboard</h3>

                    <div className="results-metrics">
                        <div className="metric-card">
                            <span className="metric-label">Reported Net Income</span>
                            <span className="metric-value">{formatCurrency(netIncome)}</span>
                        </div>

                        <div className="metric-card highlight-addback">
                            <span className="metric-label">Total Normalization Add-backs</span>
                            <span className="metric-value positive">+{formatCurrency(totalAddBacks)}</span>
                        </div>

                        <div className="metric-card primary-metric">
                            <span className="metric-label">True Normalized EBITDA</span>
                            <span className="metric-value giant">{formatCurrency(normalizedEbitda)}</span>
                        </div>
                    </div>

                    <div className="valuation-final">
                        <h4>Estimated Enterprise Value</h4>
                        <div className="valuation-range">
                            <span className="value-min">{formatCurrency(estimatedValue * 0.9)}</span>
                            <span className="value-separator">-</span>
                            <span className="value-max">{formatCurrency(estimatedValue * 1.1)}</span>
                        </div>
                        <p className="disclaimer">*Includes 25% private company illiquidity discount</p>
                    </div>

                    <button className="btn-primary w-full mt-lg call-to-action">
                        Verify with Legal Shield →
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ValuationCalculator;
