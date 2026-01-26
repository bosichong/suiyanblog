import React from 'react';
import Link from 'next/link';

interface RainbowLinkProps {
    href: string;
    children: React.ReactNode;
    className?: string;
}

const RainbowLink = ({ href, children, className = '' }: RainbowLinkProps) => {
  return (
    <Link href={href} className={`group ${className}`}>
      <span className="relative inline-block">
        <span className="bg-gradient-to-r from-current via-current to-current group-hover:from-red-500 group-hover:via-yellow-500 group-hover:to-blue-500 bg-clip-text group-hover:text-transparent transition-all duration-300">
          {children}
        </span>
        <span className="absolute bottom-0 left-0 w-0 h-[1px] group-hover:w-full group-hover:bg-gradient-to-r group-hover:from-red-500 group-hover:via-yellow-500 group-hover:to-blue-500 transition-all duration-300 ease-out" style={{
          backgroundImage: 'linear-gradient(to right, #ef4444, #eab308, #3b82f6)',
          backgroundSize: '100% 100%',
          backgroundRepeat: 'no-repeat'
        }}></span>
      </span>
    </Link>
  );
};

export default RainbowLink;