

import React from 'react';

interface PrimaryButtonProps {
  href: string;
  children: React.ReactNode;
}

export default function PrimaryButton({ href, children }: PrimaryButtonProps) {
  return (
    <a href={href} role="button">
      {children}
    </a>
  );
}