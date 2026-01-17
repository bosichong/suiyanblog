"use client";

import type { Variants } from "motion/react";
import { motion, useAnimation } from "motion/react";
import type { HTMLAttributes } from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";

export interface RssIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface RssIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

const WAVE_VARIANTS: Variants = {
  normal: {
    pathLength: 1,
    opacity: 1,
    transition: {
      duration: 0.3,
    },
  },
  animate: {
    pathLength: [0, 1],
    opacity: [0, 1],
    transition: {
      pathLength: { duration: 0.5, ease: "easeInOut" },
      opacity: { duration: 0.5, ease: "easeInOut" },
    },
  },
};

const DOT_VARIANTS: Variants = {
  normal: {
    scale: 1,
    opacity: 1,
    transition: {
      duration: 0.3,
    },
  },
  animate: {
    scale: [0, 1],
    opacity: [0, 1],
    transition: {
      duration: 0.3,
      ease: "easeInOut",
    },
  },
};

const RssIcon = forwardRef<RssIconHandle, RssIconProps>(
  ({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
    const wave1Controls = useAnimation();
    const wave2Controls = useAnimation();
    const wave3Controls = useAnimation();
    const dotControls = useAnimation();
    const isControlledRef = useRef(false);

    useImperativeHandle(ref, () => {
      isControlledRef.current = true;

      return {
        startAnimation: () => {
          wave1Controls.start("animate");
          wave2Controls.start("animate");
          wave3Controls.start("animate");
          dotControls.start("animate");
        },
        stopAnimation: () => {
          wave1Controls.start("normal");
          wave2Controls.start("normal");
          wave3Controls.start("normal");
          dotControls.start("normal");
        },
      };
    });

    const handleMouseEnter = useCallback(
      (e: React.MouseEvent<HTMLDivElement>) => {
        if (isControlledRef.current) {
          onMouseEnter?.(e);
        } else {
          wave1Controls.start("animate");
          wave2Controls.start("animate");
          wave3Controls.start("animate");
          dotControls.start("animate");
        }
      },
      [wave1Controls, wave2Controls, wave3Controls, dotControls, onMouseEnter]
    );

    const handleMouseLeave = useCallback(
      (e: React.MouseEvent<HTMLDivElement>) => {
        if (isControlledRef.current) {
          onMouseLeave?.(e);
        } else {
          wave1Controls.start("normal");
          wave2Controls.start("normal");
          wave3Controls.start("normal");
          dotControls.start("normal");
        }
      },
      [wave1Controls, wave2Controls, wave3Controls, dotControls]
    );

    return (
      <div
        className={className}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        {...props}
      >
        <svg
          fill="none"
          height={size}
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          width={size}
          xmlns="http://www.w3.org/2000/svg"
        >
          <motion.path
            animate={wave1Controls}
            d="M4 11a9 9 0 0 1 9 9"
            initial="normal"
            variants={WAVE_VARIANTS}
          />
          <motion.path
            animate={wave2Controls}
            d="M4 4a16 16 0 0 1 16 16"
            initial="normal"
            variants={WAVE_VARIANTS}
          />
          <motion.circle
            animate={dotControls}
            cx="5"
            cy="19"
            initial="normal"
            r="1"
            variants={DOT_VARIANTS}
          />
        </svg>
      </div>
    );
  }
);

RssIcon.displayName = "RssIcon";

export { RssIcon };