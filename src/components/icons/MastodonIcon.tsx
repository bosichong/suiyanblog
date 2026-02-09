const MastodonIcon = ({ className = '' }: { className?: string }) => {
    return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
            <path d="M21.5 13.5c0 3-2.5 5.5-5.5 5.5h-8c-3 0-5.5-2.5-5.5-5.5v-5c0-3 2.5-5.5 5.5-5.5h8c3 0 5.5 2.5 5.5 5.5v5z" />
            <path d="M16.5 13.5c0 1.5-1.5 2.5-3 2.5h-3c-1.5 0-3-1-3-2.5v-2.5" />
            <path d="M16.5 11v2.5" />
        </svg>
    );
};

export default MastodonIcon;