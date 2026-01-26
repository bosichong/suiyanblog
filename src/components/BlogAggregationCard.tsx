import React from 'react';
import Link from 'next/link';
import { ExternalLink } from 'lucide-react';
import { BlogAggregation } from '../types';
import RainbowLink from './RainbowLink';

const BlogAggregationCard = ({ aggregation }: { aggregation: BlogAggregation }) => {
  return (
    <Link
      href={aggregation.site_url}
      target='_blank'
      rel="noopener noreferrer"
      className="group block p-4 border-b border-border hover:bg-primary-light/50 transition-all duration-200"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <RainbowLink href={aggregation.site_url} className="font-medium">
              {aggregation.site_name}
            </RainbowLink>
            <ExternalLink size={14} className="text-default-500 opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
          <p className="text-sm text-default-600 line-clamp-2 leading-relaxed">
            {aggregation.site_description}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default BlogAggregationCard;