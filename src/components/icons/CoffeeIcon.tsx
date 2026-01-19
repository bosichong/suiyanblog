"use client";

import type { Variants } from "motion/react";
import { motion, useAnimation } from "motion/react";
import type { HTMLAttributes } from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";

export interface CoffeeIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface CoffeeIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

const CUP_VARIANTS: Variants = {
  normal: { rotate: 0 },
  animate: {
    rotate: [0, 5, -5, 0],
    transition: {
      duration: 0.5,
    },
  },
};

const STEAM_VARIANTS: Variants = {
  normal: { opacity: 0.5, translateY: 0 },
  animate: {
    opacity: [0.5, 0.8, 0.5],
    translateY: [0, -3, 0],
    transition: {
      duration: 0.6,
    },
  },
};

const CoffeeIcon = forwardRef<CoffeeIconHandle, CoffeeIconProps>(
  ({ onMouseEnter, onMouseLeave, className, size = 24, ...props }, ref) => {
    const controls = useAnimation();
    const isControlledRef = useRef(false);

    useImperativeHandle(ref, () => {
      isControlledRef.current = true;

      return {
        startAnimation: () => controls.start("animate"),
        stopAnimation: () => controls.start("normal"),
      };
    });

    const handleMouseEnter = useCallback(
      (e: React.MouseEvent<HTMLDivElement>) => {
        if (isControlledRef.current) {
          onMouseEnter?.(e);
        } else {
          controls.start("animate");
        }
      },
      [controls, onMouseEnter]
    );

    const handleMouseLeave = useCallback(
      (e: React.MouseEvent<HTMLDivElement>) => {
        if (isControlledRef.current) {
          onMouseLeave?.(e);
        } else {
          controls.start("normal");
        }
      },
      [controls, onMouseLeave]
    );

    return (
      <div
        className={`inline-flex ${className || ''}`}
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
            animate={controls}
            d="M17 8h1a4 4 0 1 1 0 8h-1"
            variants={CUP_VARIANTS}
          />
          <motion.path
            animate={controls}
            d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z"
            variants={CUP_VARIANTS}
          />
          <motion.line
            animate={controls}
            x1="6"
            x2="6"
            y1="1"
            y2="4"
            variants={STEAM_VARIANTS}
          />
          <motion.line
            animate={controls}
            x1="10"
            x2="10"
            y1="1"
            y2="4"
            variants={STEAM_VARIANTS}
          />
          <motion.line
            animate={controls}
            x1="14"
            x2="14"
            y1="1"
            y2="4"
            variants={STEAM_VARIANTS}
          />
        </svg>
      </div>
    );
  }
);

CoffeeIcon.displayName = "CoffeeIcon";

export { CoffeeIcon };