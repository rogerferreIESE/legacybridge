import React, { useState } from 'react';
import { supabase } from '../lib/supabase';
import './AuthModal.css';

interface AuthModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
}

export default function AuthModal({ isOpen, onClose, onSuccess }: AuthModalProps) {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState<'buyer' | 'seller'>('buyer');

    // New Extended Profile Fields
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phone, setPhone] = useState('');
    const [country, setCountry] = useState('');

    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');

    if (!isOpen) return null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setErrorMsg('');

        try {
            if (isLogin) {
                const { error } = await supabase.auth.signInWithPassword({ email, password });
                if (error) throw error;
            } else {
                // Sign up flow
                const { data, error: signUpError } = await supabase.auth.signUp({
                    email,
                    password
                });

                if (signUpError) throw signUpError;

                // If Supabase has email confirmations disabled, the user is immediately returned
                if (data.user) {
                    // Add the role and extended profile info to our custom profiles table
                    const { error: profileError } = await supabase.from('profiles').insert({
                        id: data.user.id,
                        role: role,
                        first_name: firstName,
                        last_name: lastName,
                        phone: phone,
                        country: country
                    });

                    if (profileError) throw profileError;
                }
            }

            onSuccess();
            onClose();
        } catch (err: any) {
            setErrorMsg(err.message || 'An error occurred during authentication.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-modal-overlay">
            <div className="auth-modal glass-panel">
                <button className="auth-close-btn" onClick={onClose}>✕</button>

                <h2 className="auth-title">
                    <span className="brand-icon" style={{ marginRight: '8px' }}>🌉</span>
                    {isLogin ? 'Welcome Back' : 'Create an Account'}
                </h2>

                {errorMsg && <div className="auth-error">{errorMsg}</div>}

                <form onSubmit={handleSubmit} className="auth-form">
                    <div className="form-group">
                        <label>Email Address</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="auth-input"
                            placeholder="you@example.com"
                        />
                    </div>

                    <div className="form-group">
                        <label>Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="auth-input"
                            placeholder="••••••••"
                        />
                    </div>

                    {!isLogin && (
                        <>
                            <div className="form-group" style={{ display: 'flex', gap: '8px', flexDirection: 'row' }}>
                                <div style={{ flex: 1 }}>
                                    <label>First Name</label>
                                    <input
                                        type="text"
                                        value={firstName}
                                        onChange={(e) => setFirstName(e.target.value)}
                                        required
                                        className="auth-input"
                                        style={{ width: '100%', marginTop: '4px' }}
                                    />
                                </div>
                                <div style={{ flex: 1 }}>
                                    <label>Last Name</label>
                                    <input
                                        type="text"
                                        value={lastName}
                                        onChange={(e) => setLastName(e.target.value)}
                                        required
                                        className="auth-input"
                                        style={{ width: '100%', marginTop: '4px' }}
                                    />
                                </div>
                            </div>
                            <div className="form-group" style={{ display: 'flex', gap: '8px', flexDirection: 'row' }}>
                                <div style={{ flex: 1 }}>
                                    <label>Phone Number</label>
                                    <input
                                        type="tel"
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                        required
                                        className="auth-input"
                                        style={{ width: '100%', marginTop: '4px' }}
                                    />
                                </div>
                                <div style={{ flex: 1 }}>
                                    <label>Country of Residence</label>
                                    <input
                                        type="text"
                                        value={country}
                                        onChange={(e) => setCountry(e.target.value)}
                                        required
                                        className="auth-input"
                                        style={{ width: '100%', marginTop: '4px' }}
                                    />
                                </div>
                            </div>

                            <div className="form-group">
                                <label>I want to use Legacy Bridge as a:</label>
                                <div className="auth-role-selector">
                                    <button
                                        type="button"
                                        className={`role-btn ${role === 'buyer' ? 'active' : ''}`}
                                        onClick={() => setRole('buyer')}
                                    >
                                        Buyer
                                    </button>
                                    <button
                                        type="button"
                                        className={`role-btn ${role === 'seller' ? 'active' : ''}`}
                                        onClick={() => setRole('seller')}
                                    >
                                        Seller
                                    </button>
                                </div>
                            </div>
                        </>
                    )}

                    <button type="submit" className="btn-primary auth-submit" disabled={loading}>
                        {loading ? 'Processing...' : (isLogin ? 'Sign In' : 'Sign Up')}
                    </button>
                </form>

                <div className="auth-toggle">
                    <p>
                        {isLogin ? "Don't have an account?" : "Already have an account?"}
                        <button
                            type="button"
                            className="auth-toggle-btn"
                            onClick={() => {
                                setIsLogin(!isLogin);
                                setErrorMsg('');
                            }}
                        >
                            {isLogin ? 'Sign Up' : 'Log In'}
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
}
