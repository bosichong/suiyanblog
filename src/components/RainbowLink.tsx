import React from 'react';
import Link from 'next/link';
import { useState, useEffect } from 'react';

interface RainbowLinkProps {
    href: string;
    children: React.ReactNode;
    className?: string;
    displayDuration?: number;
    fadeDuration?: number;
    target?: string;
    onClick?: () => void;
}

const RainbowLink = ({ href, children, className = '', displayDuration = 500, fadeDuration = 300, target, onClick }: RainbowLinkProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [showEffect, setShowEffect] = useState(false);

  useEffect(() => {
    if (isHovered) {
      setShowEffect(true);
      const timer = setTimeout(() => {
        setShowEffect(false);
      }, displayDuration);
      return () => clearTimeout(timer);
    } else if (showEffect) {
      const timer = setTimeout(() => {
        setShowEffect(false);
      }, displayDuration);
      return () => clearTimeout(timer);
    }
  }, [isHovered, showEffect, displayDuration]);

  return (
    <Link
      href={href}
      target={target}
      onClick={onClick}
      className={`group ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <span className="relative inline-block">
        <span className={`bg-gradient-to-r from-current via-current to-current ${showEffect ? 'from-red-500 via-yellow-500 to-blue-500 text-transparent' : ''} bg-clip-text transition-all`} style={{ transitionDuration: `${fadeDuration}ms` }}>
          {children}
        </span>
        <span 
          className={`absolute bottom-0 left-0 h-[1px] bg-gradient-to-r from-red-500 via-yellow-500 to-blue-500 transition-all ease-out ${showEffect ? 'w-full' : 'w-0'}`}
          style={{
            backgroundImage: 'linear-gradient(to right, #ef4444, #eab308, #3b82f6)',
            backgroundSize: '100% 100%',
            backgroundRepeat: 'no-repeat',
            transitionDuration: `${fadeDuration}ms`
          }}
        ></span>
      </span>
    </Link>
  );
};

export default RainbowLink;