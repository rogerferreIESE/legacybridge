import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

export function TestConnection() {
    const [status, setStatus] = useState<'testing' | 'success' | 'error'>('testing');
    const [message, setMessage] = useState('Testing connection to Supabase...');

    useEffect(() => {
        async function testConnection() {
            try {
                // A simple query to test connection. This doesn't need a table to exist.
                const { error } = await supabase.from('_nonexistent_table_').select('*').limit(1);

                // Supabase returns an error for nonexistent tables, but the connection itself SUCCEEDS.
                // If we get an error about the relation not existing, or if it's empty, it means we connected!
                if (error && error.code !== '42P01') {
                    throw error;
                }

                setStatus('success');
                setMessage('✅ Successfully connected to Supabase!');
            } catch (err: any) {
                setStatus('error');
                setMessage(`❌ Connection failed: ${err.message || 'Unknown error'}`);
            }
        }

        testConnection();
    }, []);

    return (
        <div style={{ padding: '1rem', margin: '1rem 0', borderRadius: '8px', backgroundColor: '#f3f4f6', color: '#111827' }}>
            <h3 style={{ margin: '0 0 0.5rem 0' }}>Database Connection Status</h3>
            <p style={{ margin: 0, fontWeight: 'bold', color: status === 'error' ? 'red' : status === 'success' ? 'green' : 'blue' }}>
                {message}
            </p>
        </div>
    );
}
