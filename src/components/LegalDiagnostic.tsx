import React, { useState } from 'react';
import './LegalDiagnostic.css';

interface Question {
    id: string;
    category: string;
    text: string;
    type: 'boolean' | 'multiple';
    options?: string[];
    riskWeight: number;
}

const questions: Question[] = [
    {
        id: 'q1',
        category: 'Corporate Structure',
        text: 'Are all shares fully paid up and formally registered without any outstanding options, warrants, or unvested equity?',
        type: 'boolean',
        riskWeight: 3
    },
    {
        id: 'q2',
        category: 'Commercial Contracts',
        text: 'Do any of your top 5 customer contracts contain a "Change of Control" termination clause?',
        type: 'boolean',
        riskWeight: 5
    },
    {
        id: 'q3',
        category: 'Employment & Litigation',
        text: 'Are there any pending, threatened, or ongoing employment disputes, or have there been any material settlements in the last 24 months?',
        type: 'boolean',
        riskWeight: 4
    },
    {
        id: 'q4',
        category: 'IP & Tech (Chain of Title)',
        text: 'Do 100% of employees and contractors have signed agreements explicitly assigning IP to the company?',
        type: 'multiple',
        options: ['Yes, 100%', 'Mostly (>80%)', 'No / Unsure'],
        riskWeight: 5
    },
    {
        id: 'q5',
        category: 'Regulatory',
        text: 'Does your software process protected data (e.g., PHI, PCI, or heavy PII) requiring specific compliance certifications (SOC2, HIPAA, GDPR)?',
        type: 'boolean',
        riskWeight: 3
    },
    {
        id: 'q6',
        category: 'Open Source',
        text: 'Are you aware of any "Copyleft" (e.g., GPL) open-source licenses integrated directly into your proprietary, distributed codebase?',
        type: 'multiple',
        options: ['No Copyleft Code', 'Yes, but strictly isolated', 'Unsure / Not Audited'],
        riskWeight: 4
    },
    {
        id: 'q7',
        category: 'Data Privacy',
        text: 'Have you experienced any material data breaches or cybersecurity incidents in the past 36 months?',
        type: 'boolean',
        riskWeight: 5
    },
    {
        id: 'q8',
        category: 'Tax & Compliance',
        text: 'Are you fully compliant with sales tax (economic nexus) in all regions where you have significant customers?',
        type: 'multiple',
        options: ['Yes, fully compliant', 'Mostly/Working on it', 'No / Unsure'],
        riskWeight: 4
    },
    {
        id: 'q9',
        category: 'Equity Compensation',
        text: 'Have all equity grants and stock options been issued in compliance with a formal 409A valuation or local equivalent?',
        type: 'boolean',
        riskWeight: 4
    },
    {
        id: 'q10',
        category: 'AI & Data Rights',
        text: 'Does your product train core AI models on proprietary customer data without explicit, documented opt-in consent?',
        type: 'boolean',
        riskWeight: 5
    }
];

const LegalDiagnostic: React.FC = () => {
    const [currentStep, setCurrentStep] = useState(0);
    const [answers, setAnswers] = useState<Record<string, string | boolean>>({});
    const [isComplete, setIsComplete] = useState(false);
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [riskScore, setRiskScore] = useState<number | null>(null);

    const handleAnswer = (answer: string | boolean) => {
        setAnswers({ ...answers, [questions[currentStep].id]: answer });

        if (currentStep < questions.length - 1) {
            setCurrentStep(curr => curr + 1);
        } else {
            finishDiagnostic();
        }
    };

    const finishDiagnostic = () => {
        setIsAnalyzing(true);
        // Simulate complex AI/Logic processing
        setTimeout(() => {
            // Calculate a mock risk score based on answers
            let risk = 0;
            if (answers['q1'] === false) risk += 10;
            if (answers['q2'] === true) risk += 30; // High risk: Deal breaker potential
            if (answers['q3'] === true) risk += 15;
            if (answers['q4'] === 'No / Unsure') risk += 35; // Very high risk: IP issues
            if (answers['q4'] === 'Mostly (>80%)') risk += 15;
            if (answers['q5'] === true) risk += 5; // Moderate: Just requires more DD
            if (answers['q6'] === 'Unsure / Not Audited') risk += 20;
            if (answers['q7'] === true) risk += 25; // High risk: Data breach
            if (answers['q8'] === 'No / Unsure') risk += 15; // Moderate: Sales tax exposure
            if (answers['q8'] === 'Mostly/Working on it') risk += 5;
            if (answers['q9'] === false) risk += 20; // High risk: 409A violation
            if (answers['q10'] === true) risk += 30; // High risk: AI data rights poisoning

            setRiskScore(Math.min(risk, 100)); // Max score is 100
            setIsAnalyzing(false);
            setIsComplete(true);
        }, 3000); // Slightly longer processing for added tension
    };

    const getRiskLevel = (score: number) => {
        if (score < 15) return { label: 'Low Risk', color: 'var(--success)' };
        if (score < 40) return { label: 'Medium Risk', color: 'var(--warning)' };
        return { label: 'High Risk (Red Flags Detected)', color: 'var(--error)' };
    };

    if (isAnalyzing) {
        return (
            <div className="diagnostic-container processing-state">
                <div className="loader-ring"></div>
                <h3>AI Agent Analyzing Responses...</h3>
                <p className="subtitle">Cross-referencing liability markers and generating Red Flag report.</p>

                <div className="processing-steps">
                    <div className="step active">Scanning Corporate Structure...</div>
                    <div className="step active">Evaluating Contractual Obligations...</div>
                    <div className="step pulse">Assessing IP Chains & Open Source...</div>
                </div>
            </div>
        );
    }

    if (isComplete && riskScore !== null) {
        const risk = getRiskLevel(riskScore);
        return (
            <div className="diagnostic-container results-state animate-fade-in">
                <div className="glass-panel report-panel">
                    <div className="report-header">
                        <span className="shield-icon">🛡️</span>
                        <h2>Diagnostic Report Complete</h2>
                        <p>Your responses have been verified against institutional standards.</p>
                    </div>

                    <div className="risk-meter-container">
                        <div className="risk-score" style={{ color: risk.color }}>
                            {100 - riskScore} / 100
                        </div>
                        <div className="risk-label" style={{ color: risk.color }}>
                            Clean Score ({risk.label})
                        </div>

                        <div className="progress-bar-bg">
                            <div
                                className="progress-bar-fill"
                                style={{
                                    width: `${100 - riskScore}%`,
                                    backgroundColor: risk.color,
                                    boxShadow: `0 0 15px ${risk.color}`
                                }}
                            ></div>
                        </div>
                    </div>

                    <div className="findings-section">
                        <h3>Key Institutional Findings</h3>
                        <ul className="findings-list">
                            {answers['q4'] === 'Yes, 100%' && <li className="finding-good">✓ Perfect IP Assignment chain validated.</li>}
                            {answers['q1'] === true && <li className="finding-good">✓ Clean capitalization table structure.</li>}
                            {answers['q9'] === true && <li className="finding-good">✓ Approved 409A valuation protects against equity penalties.</li>}

                            {riskScore > 0 && <li className="finding-flag">⚠️ Missing documentation for legacy contractor agreements.</li>}
                            {answers['q2'] === true && <li className="finding-flag">⚠️ Change of Control clauses identified in top contracts. Require preemptive waivers before LOI.</li>}
                            {answers['q6'] === 'Unsure / Not Audited' && <li className="finding-flag">⚠️ Open Source audit highly recommended before proceeding.</li>}
                            {answers['q7'] === true && <li className="finding-flag">⚠️ Historical data breach flagged. Prepare detailed incident response documentation.</li>}
                            {answers['q9'] === false && <li className="finding-flag">⚠️ Potential Section 409A equity valuation issues. Remedy immediately before diligence.</li>}
                            {answers['q10'] === true && <li className="finding-flag">⚠️ Unauthorized AI training data usage is a critical IP risk for buyers.</li>}
                        </ul>
                    </div>

                    <div className="action-buttons">
                        <button className="btn-secondary" onClick={() => {
                            setCurrentStep(0);
                            setAnswers({});
                            setIsComplete(false);
                        }}>Retake Diagnostic</button>
                        <button className="btn-primary">Generate Teaser & Enter Vault</button>
                    </div>
                </div>
            </div>
        );
    }

    const question = questions[currentStep];

    return (
        <div className="diagnostic-container animate-fade-in">
            <div className="diagnostic-header text-center">
                <h2>The Shield</h2>
                <p className="subtitle">Pre-empt buyer due diligence. Verify your legal readiness anonymously before entering the market.</p>
            </div>

            <div className="glass-panel questionnaire-panel">
                <div className="progress-indicator">
                    <div className="progress-text">Step {currentStep + 1} of {questions.length}</div>
                    <div className="mini-progress-bg">
                        <div
                            className="mini-progress-fill"
                            style={{ width: `${((currentStep + 1) / questions.length) * 100}%` }}
                        ></div>
                    </div>
                </div>

                <div className="question-content animate-fade-in" key={question.id}>
                    <span className="category-badge">{question.category}</span>
                    <h3 className="question-text">{question.text}</h3>

                    <div className="answer-options">
                        {question.type === 'boolean' ? (
                            <>
                                <button className="btn-answer" onClick={() => handleAnswer(true)}>Yes</button>
                                <button className="btn-answer" onClick={() => handleAnswer(false)}>No</button>
                            </>
                        ) : (
                            question.options?.map(opt => (
                                <button key={opt} className="btn-answer" onClick={() => handleAnswer(opt)}>
                                    {opt}
                                </button>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LegalDiagnostic;
