import React, { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';

interface GlowCardProps {
    children: React.ReactNode;
    className?: string;
    borderWidth?: number;
    blurRadius?: number;
    borderRadius?: string;
    displayDuration?: number;
    fadeDuration?: number;
    alwaysShowGlow?: boolean;
    glowOpacity?: number;
    [key: string]: any;
}

const GlowCard = ({ children, className = '', borderWidth = 2, blurRadius = 5, borderRadius = '6px', displayDuration = 500, fadeDuration = 400, alwaysShowGlow = false, glowOpacity = 0.6, ...props }: GlowCardProps) => {
  const { theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [showGlow, setShowGlow] = useState(alwaysShowGlow);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (alwaysShowGlow) {
      setShowGlow(true);
      return;
    }
    if (isHovered) {
      setShowGlow(true);
      const timer = setTimeout(() => {
        setShowGlow(false);
      }, displayDuration);
      return () => clearTimeout(timer);
    }
  }, [isHovered, displayDuration, alwaysShowGlow]);

  useEffect(() => {
    if (alwaysShowGlow) return;
    if (!isHovered && showGlow) {
      const timer = setTimeout(() => {
        setShowGlow(false);
      }, displayDuration);
      return () => clearTimeout(timer);
    }
  }, [isHovered, showGlow, displayDuration, alwaysShowGlow]);

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
  const lightBg = '#e5e5e5';
  const darkBg = '#1a1a1a';
  const rainbowGradient = 'linear-gradient(-90deg, #602ce5 0%, #2ce597 30%, #e7bb18 50%, #ff7657 70%, #45c1ee 90%, #2ce597 100%)';

  return (
    <div 
      className={`glow-card ${className}`} 
      style={{ padding: `${borderWidth}px`, borderRadius }} 
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      {...props}
    >
      <div className="glow-card-inner" style={{ background: isDark ? darkBg : lightBg, borderRadius }}>
        {children}
      </div>
      <style jsx>{`
        .glow-card {
          position: relative;
        }

        .glow-card::before {
          content: "";
          position: absolute;
          top: calc(-1 * ${borderWidth}px);
          left: calc(-1 * ${borderWidth}px);
          right: calc(-1 * ${borderWidth}px);
          bottom: calc(-1 * ${borderWidth}px);
          background: linear-gradient(45deg, #ff0000, #ff7300, #fffb00, #48ff00, #00ffd5, #002bff, #7a00ff, #ff00c8, #ff0000);
          background-size: 400%;
          z-index: 0;
          filter: blur(${blurRadius}px);
          border-radius: ${typeof borderRadius === 'number' ? `${borderRadius + blurRadius}px` : borderRadius};
          animation: move-gradient 8s linear infinite;
          opacity: ${showGlow ? glowOpacity : 0};
          transition: opacity ${fadeDuration}ms ease-in-out;
        }

        .glow-card-inner {
          position: relative;
          z-index: 1;
        }

        @keyframes move-gradient {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
      `}</style>
    </div>
  );
};

export default GlowCard;