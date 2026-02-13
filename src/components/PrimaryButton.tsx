

import React from 'react';

interface PrimaryButtonProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

export default function PrimaryButton({ href, children, className = '' }: PrimaryButtonProps) {
  return (
    <a className={`group relative inline-block overflow-hidden border border-rose-700 px-6 py-3 ${className}`} href={href}>
      <span className="absolute inset-x-0 bottom-0 h-0.5 bg-rose-700 transition-all group-hover:h-full"></span>
      <span className="relative text-base  text-rose-700 transition-colors group-hover:text-white">
        {children}
      </span>
    </a>
  );
}