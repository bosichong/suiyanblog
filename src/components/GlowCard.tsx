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

  // 浅色模式：浅灰色背景 + 灰色系渐变
  // 深色模式：深色背景 + 暖色调渐变
  const lightBg = '#ffffff';
  const lightGradient1 = '#a0aec0';
  const lightGradient2 = '#718096';
  const lightGradient3 = '#4a5568';

  const darkBg = '#1a1a1a';
  const darkGradient1 = '#F7B750';
  const darkGradient2 = '#ff9f43';
  const darkGradient3 = '#ee5a24';

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
            ${isDark ? darkGradient1 : lightGradient1},
            ${isDark ? darkGradient2 : lightGradient2} 33%,
            ${isDark ? darkGradient3 : lightGradient3} 66%,
            ${isDark ? darkGradient1 : lightGradient1}
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
          transition: all 0.3s ease;
        }

        .glow-card:hover .glow-card-inner {
          padding: 4px;
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