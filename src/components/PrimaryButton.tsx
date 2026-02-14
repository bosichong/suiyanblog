

import React from 'react';

interface PrimaryButtonProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

export default function PrimaryButton({ href, children, className = '' }: PrimaryButtonProps) {
  return (
    <a className="custom-btn btn-16" href={href}>{children}</a>
  );
}