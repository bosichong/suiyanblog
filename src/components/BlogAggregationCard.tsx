import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ExternalLink } from 'lucide-react';
import { BlogAggregation } from '../types';

const BlogAggregationCard = ({ aggregation }: { aggregation: BlogAggregation }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [showEffect, setShowEffect] = useState(false);

  useEffect(() => {
    if (isHovered) {
      setShowEffect(true);
      const timer = setTimeout(() => {
        setShowEffect(false);
      }, 500);
      return () => clearTimeout(timer);
    } else if (showEffect) {
      const timer = setTimeout(() => {
        setShowEffect(false);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [isHovered, showEffect]);

  return (
    <Link
      href={aggregation.site_url}
      target='_blank'
      rel="noopener noreferrer"
      className="group block p-4 border-b border-border hover:bg-primary-light/50 transition-all duration-200"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="relative inline-block font-medium">
              <span className={`bg-gradient-to-r from-current via-current to-current ${
                showEffect ? 'from-red-500 via-yellow-500 to-blue-500 text-transparent' : ''
              } bg-clip-text transition-all`} style={{ transitionDuration: '300ms' }}>
                {aggregation.site_name}
              </span>
              <span
                className={`absolute bottom-0 left-0 h-[1px] bg-gradient-to-r from-red-500 via-yellow-500 to-blue-500 transition-all ease-out ${
                  showEffect ? 'w-full' : 'w-0'
                }`}
                style={{
                  backgroundImage: 'linear-gradient(to right, #ef4444, #eab308, #3b82f6)',
                  backgroundSize: '100% 100%',
                  backgroundRepeat: 'no-repeat',
                  transitionDuration: '300ms'
                }}
              ></span>
            </span>
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