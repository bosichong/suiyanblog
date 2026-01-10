import React, { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';

interface GlowCardProps {
    children: React.ReactNode;
    className?: string;
    borderWidth?: number;
    borderRadius?: string;
    [key: string]: any;
}

const GlowCard = ({ children, className = '', borderWidth = 3, borderRadius = '6px', ...props }: GlowCardProps) => {
  const { theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className={`glow-card ${className}`} style={{ padding: `${borderWidth}px`, borderRadius }} {...props}>
        <div className="glow-card-inner" style={{ background: '#ffffff', borderRadius }}>
          {children}
        </div>
      </div>
    );
  }

  const isDark = resolvedTheme === 'dark';

  return (
    <div className={`glow-card ${className}`} style={{ padding: `${borderWidth}px`, borderRadius }} {...props}>
      <div className="glow-card-inner" style={{ background: isDark ? '#1a1a1a' : '#ffffff', borderRadius }}>
        {children}
      </div>
      <style jsx>{`
        .glow-card {
          position: relative;
          overflow: hidden;
        }

        .glow-card::before {
          content: "";
          width: 150%;
          height: 150%;
          background: conic-gradient(
            ${isDark ? '#F7B750' : '#5ddcff'},
            ${isDark ? '#ff9f43' : '#3c67e3'} 33%,
            ${isDark ? '#ee5a24' : '#4e00c2'} 66%,
            ${isDark ? '#F7B750' : '#5ddcff'}
          );
          position: absolute;
          z-index: -1;
          top: -25%;
          left: -25%;
          opacity: 0;
          transition: opacity 0.3s ease;
          animation: spin 3s linear infinite;
          animation-play-state: paused;
        }

        .glow-card:hover::before {
          opacity: 1;
          animation-play-state: running;
        }

        .glow-card-inner {
          position: relative;
          z-index: 1;
          transition: background 0.3s ease;
        }

        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
};

export default GlowCard;