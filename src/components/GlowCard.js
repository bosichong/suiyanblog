import React from 'react';
import { useTheme } from 'next-themes';

const GlowCard = ({ children, className = '', borderWidth = 3, borderRadius = '6px', ...props }) => {
  const { theme } = useTheme();
  const isDark = theme !== 'light';

  return (
    <div className={`glow-card ${className}`} style={{ padding: `${borderWidth}px`, borderRadius }} {...props}>
      <div className="glow-card-inner" style={{ background: isDark ? '#1a1a1a' : '#ffffff', borderRadius }}>
        {children}
      </div>
      <style jsx>{`
        @property --rotate {
          syntax: "<angle>";
          initial-value: 132deg";
          inherits: false;
        }

        .glow-card {
          position: relative;
          overflow: hidden;
        }

        .glow-card::before {
          content: "";
          width: 104%;
          height: 102%;
          background-image: linear-gradient(
            var(--rotate),
            #5ddcff,
            #3c67e3 43%,
            #4e00c2
          );
          position: absolute;
          z-index: -1;
          top: -1%;
          left: -2%;
          opacity: 0;
          transition: opacity 0.3s ease;
          animation: spin 2.5s linear infinite;
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
            --rotate: 0deg;
          }
          100% {
            --rotate: 360deg;
          }
        }
      `}</style>
    </div>
  );
};

export default GlowCard;