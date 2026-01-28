import React from 'react';

const BilibiliIcon: React.FC<{ className?: string }> = ({ className = '' }) => {
    return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
            <path d="M2 10h20" />
            <path d="M12 2v20" />
            <rect x="2" y="2" width="20" height="20" rx="2" />
        </svg>
    );
};

export default BilibiliIcon;