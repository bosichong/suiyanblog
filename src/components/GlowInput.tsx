import React, { forwardRef, useState, useEffect } from 'react';

interface GlowInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    borderWidth?: number;
    blurRadius?: number;
    borderRadius?: string;
    displayDuration?: number;
    fadeDuration?: number;
}

const GlowInput = forwardRef<HTMLInputElement, GlowInputProps>(
    (
        {
            className = '',
            borderWidth = 3,
            blurRadius = 5,
            borderRadius = '25px',
            displayDuration = 1000,
            fadeDuration = 500,
            ...props
        },
        ref
    ) => {
        const [isFocused, setIsFocused] = useState(false);
        const [showGlow, setShowGlow] = useState(false);

        useEffect(() => {
            if (isFocused) {
                setShowGlow(true);
                const timer = setTimeout(() => {
                    setShowGlow(false);
                }, displayDuration);
                return () => clearTimeout(timer);
            }
        }, [isFocused, displayDuration]);
        return (
            <div className="search-container">
                <input
                    ref={ref}
                    className={`search-input ${className}`}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => {
                        setIsFocused(false);
                        setShowGlow(false);
                    }}
                    {...props}
                />
                <style jsx global>{`
                    .search-container {
                        position: relative;
                        display: flex;
                        align-items: center;
                        width: 100%;
                    }

                    .search-input {
                        width: 100%;
                        color: inherit;
                        outline: none;
                        z-index: 2;
                    }

                    .search-container::before {
                        content: "";
                        position: absolute;
                        top: calc(-1 * ${borderWidth}px);
                        left: calc(-1 * ${borderWidth}px);
                        right: calc(-1 * ${borderWidth}px);
                        bottom: calc(-1 * ${borderWidth}px);
                        background: linear-gradient(45deg, #ff0000, #ff7300, #fffb00, #48ff00, #00ffd5, #002bff, #7a00ff, #ff00c8, #ff0000);
                        background-size: 400%;
                        z-index: 1;
                        filter: blur(${blurRadius}px);
                        border-radius: 0.5rem;
                        animation: move-gradient 8s linear infinite;
                        opacity: ${showGlow ? 1 : 0};
                        transition: opacity ${fadeDuration}ms ease-in-out;
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
    }
);

GlowInput.displayName = 'GlowInput';

export default GlowInput;