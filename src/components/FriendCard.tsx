import React from 'react';
import Link from 'next/link';
import { Link as LinkType } from '../types';

const FriendCard = ({ link }: { link: LinkType }) => {
    return (
        <Link
            href={link.site_url}
            target='_blank'
            rel="noopener noreferrer"
            className={`block p-4 border-b border-border ${
                link.is_active === false
                    ? 'text-text-tertiary'
                    : 'group hover:bg-bg-body'
            }`}
        >
            <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                        {link.is_active === false ? (
                            <span className="font-medium text-text-tertiary">
                                {link.site_name}
                            </span>
                        ) : (
                            <span className="font-medium text-text-primary hover:text-text-dark">
                                {link.site_name}
                            </span>
                        )}
                        {link.is_active === false && (
                            <span className="ml-2 text-xs text-text-tertiary">链接失效</span>
                        )}
                        {link.is_active !== false && (
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-text-tertiary">
                                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                                <polyline points="15 3 21 3 21 9" />
                                <line x1="10" y1="14" x2="21" y2="3" />
                            </svg>
                        )}
                    </div>
                    <p className={`text-sm line-clamp-2 leading-relaxed ${
                        link.is_active === false ? 'text-text-tertiary line-through' : 'text-text-secondary'
                    }`}>
                        {link.site_description}
                    </p>
                </div>
            </div>
        </Link>
    );
};

export default FriendCard;