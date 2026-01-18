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
        <div className="glow-card-inner" style={{ background: 'transparent', borderRadius }}>
          {children}
        </div>
      </div>
    );
  }

  const isDark = resolvedTheme === 'dark';

  // 统一使用彩虹色渐变，不分主题
  const lightBg = '#e6e1d2';
  const darkBg = '#1a1a1a';
  const rainbowGradient = 'linear-gradient(-90deg, #602ce5 0%, #2ce597 30%, #e7bb18 50%, #ff7657 70%, #45c1ee 90%, #2ce597 100%)';

  return (
    <div className={`glow-card ${className}`} style={{ padding: `${borderWidth}px`, borderRadius }} {...props}>
      <div className="glow-card-inner" style={{ background: isDark ? darkBg : lightBg, borderRadius }}>
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
            #602ce5,
            #2ce597 33%,
            #e7bb18 66%,
            #ff7657,
            #45c1ee,
            #602ce5
          );
          position: absolute;
          z-index: 0;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
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
          transition: margin 0.3s ease;
        }

        .glow-card:hover .glow-card-inner {
          margin: 1px;
        }

        @keyframes spin {
          0% {
            transform: translate(-50%, -50%) rotate(0deg);
          }
          100% {
            transform: translate(-50%, -50%) rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
};

export default GlowCard;