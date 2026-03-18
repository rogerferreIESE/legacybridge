import React from 'react';
import './SkeletonLoader.css';

interface SkeletonProps {
    type: 'card' | 'text' | 'title' | 'avatar';
    count?: number;
}

const SkeletonLoader: React.FC<SkeletonProps> = ({ type, count = 1 }) => {
    const elements = Array.from({ length: count }, (_, i) => i);

    return (
        <>
            {elements.map((i) => (
                <div key={i} className={`skeleton-wrapper skeleton-${type} animate-fade-in`}>
                    {type === 'card' && (
                        <div className="skeleton-card glass-panel" style={{ width: '100%', marginBottom: '1.5rem' }}>
                            <div className="skeleton-title shimmer"></div>
                            <div className="skeleton-subtitle shimmer"></div>
                            <div className="skeleton-text shimmer"></div>
                            <div className="skeleton-text shimmer" style={{ width: '80%' }}></div>
                            <div className="skeleton-button shimmer"></div>
                        </div>
                    )}
                    {type === 'text' && <div className="skeleton-text shimmer" style={{ width: Math.random() > 0.5 ? '100%' : '80%' }}></div>}
                    {type === 'title' && <div className="skeleton-title shimmer"></div>}
                </div>
            ))}
        </>
    );
};

export default SkeletonLoader;
