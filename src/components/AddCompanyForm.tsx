import React, { useState } from 'react';
import { supabase } from '../lib/supabase';
import './AuthModal.css'; // We can reuse the modal styles

interface AddCompanyFormProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
    userId: string;
}

export default function AddCompanyForm({ isOpen, onClose, onSuccess, userId }: AddCompanyFormProps) {
    const [name, setName] = useState('');
    const [industry, setIndustry] = useState('B2B SaaS');
    const [description, setDescription] = useState('');
    const [askingPrice, setAskingPrice] = useState('');

    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');

    if (!isOpen) return null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setErrorMsg('');

        try {
            const { error } = await supabase.from('companies').insert({
                user_id: userId,
                name,
                industry,
                description,
                asking_price: askingPrice ? parseFloat(askingPrice) : null,
            });

            if (error) throw error;

            onSuccess();
            onClose();
            // Reset form
            setName('');
            setDescription('');
            setAskingPrice('');
        } catch (err: any) {
            setErrorMsg(err.message || 'An error occurred adding the company.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-modal-overlay">
            <div className="auth-modal glass-panel" style={{ maxWidth: '500px' }}>
                <button className="auth-close-btn" onClick={onClose}>✕</button>

                <h2 className="auth-title">Add Your Company</h2>
                <p style={{ textAlign: 'center', color: 'var(--text-subtle)', marginBottom: '1rem' }}>
                    List your business on the Legacy Bridge marketplace.
                </p>

                {errorMsg && <div className="auth-error">{errorMsg}</div>}

                <form onSubmit={handleSubmit} className="auth-form">
                    <div className="form-group">
                        <label>Company Name (Kept confidential)</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            className="auth-input"
                            placeholder="e.g. Project Alpha"
                        />
                    </div>

                    <div className="form-group">
                        <label>Industry</label>
                        <select
                            value={industry}
                            onChange={(e) => setIndustry(e.target.value)}
                            className="auth-input"
                            style={{ backgroundColor: 'rgba(0,0,0,0.6)' }}
                        >
                            <option value="B2B SaaS">B2B SaaS</option>
                            <option value="Healthcare">Healthcare</option>
                            <option value="FinTech">FinTech</option>
                            <option value="E-Commerce">E-Commerce</option>
                            <option value="Manufacturing">Manufacturing</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Asking Price (€)</label>
                        <input
                            type="number"
                            value={askingPrice}
                            onChange={(e) => setAskingPrice(e.target.value)}
                            className="auth-input"
                            placeholder="e.g. 1500000"
                        />
                    </div>

                    <div className="form-group">
                        <label>Description & Highlights</label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                            className="auth-input"
                            placeholder="What makes your company a great acquisition?"
                            rows={4}
                            style={{ resize: 'vertical' }}
                        />
                    </div>

                    <button type="submit" className="btn-primary auth-submit" disabled={loading}>
                        {loading ? 'Publishing...' : 'List Company'}
                    </button>
                </form>
            </div>
        </div>
    );
}
