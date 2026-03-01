

import React from 'react';

interface PrimaryButtonProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

export default function PrimaryButton({ href, children, className = '' }: PrimaryButtonProps) {
  return (
    <a className={`border-2 border-black bg-white px-5 py-3 text-black shadow-[4px_4px_0_0] hover:translate-1 hover:shadow-none focus:ring-2 focus:ring-yellow-300 focus:outline-0 ${className}`} href={href}>
      {children}
    </a>
  );
}