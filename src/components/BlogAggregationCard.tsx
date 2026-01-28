import React from 'react';
import Link from 'next/link';
import { BlogAggregation } from '../types';

const BlogAggregationCard = ({ aggregation }: { aggregation: BlogAggregation }) => {
    return (
        <Link
            href={aggregation.site_url}
            target='_blank'
            rel="noopener noreferrer"
            className="group block p-4 border-b border-border hover:bg-bg-body"
        >
            <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium text-text-primary hover:text-text-dark">
                            {aggregation.site_name}
                        </span>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-text-tertiary">
                            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                            <polyline points="15 3 21 3 21 9" />
                            <line x1="10" y1="14" x2="21" y2="3" />
                        </svg>
                    </div>
                    <p className="text-sm text-text-secondary line-clamp-2 leading-relaxed">
                        {aggregation.site_description}
                    </p>
                </div>
            </div>
        </Link>
    );
};

export default BlogAggregationCard;