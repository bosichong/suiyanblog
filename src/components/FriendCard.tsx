import React from 'react';
import Link from 'next/link';
import { ExternalLink } from 'lucide-react';
import { Link as LinkType } from '../types';

const FriendCard = ({ link }: { link: LinkType }) => {
  return (
    <Link
      href={link.site_url}
      target='_blank'
      rel="noopener noreferrer"
      className="group block p-4 border-b border-border hover:bg-primary-light/50 transition-all duration-200"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-medium text-primary group-hover:text-primary-hover transition-colors">
              {link.site_name}
            </h3>
            <ExternalLink size={14} className="text-default-500 opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
          <p className="text-sm text-default-600 line-clamp-2 leading-relaxed">
            {link.site_description}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default FriendCard;