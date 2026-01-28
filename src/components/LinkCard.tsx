import React from 'react';
import Link from 'next/link';

interface LinkCardProps {
    site_name: string;
    site_url: string;
    site_description: string;
    is_active?: boolean;
}

const LinkCard = ({ site_name, site_url, site_description, is_active = true }: LinkCardProps) => {
    return (
        <Link
            href={site_url}
            target='_blank'
            rel="noopener noreferrer"
            className={`block p-4 border-b border-border ${
                is_active === false
                    ? 'text-text-tertiary'
                    : 'group hover:bg-bg-body'
            }`}
        >
            <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                        {is_active === false ? (
                            <span className="font-medium text-text-tertiary">
                                {site_name}
                            </span>
                        ) : (
                            <span className="font-medium text-text-link hover:text-text-dark hover:underline no-underline">
                                {site_name}
                            </span>
                        )}
                        {is_active === false && (
                            <span className="ml-2 text-xs text-text-tertiary">链接失效</span>
                        )}
                        {is_active !== false && (
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-text-tertiary">
                                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                                <polyline points="15 3 21 3 21 9" />
                                <line x1="10" y1="14" x2="21" y2="3" />
                            </svg>
                        )}
                    </div>
                    <p className={`text-sm line-clamp-2 leading-relaxed ${
                        is_active === false ? 'text-text-tertiary line-through' : 'text-text-secondary'
                    }`}>
                        {site_description}
                    </p>
                </div>
            </div>
        </Link>
    );
};

export default LinkCard;