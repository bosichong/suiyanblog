import React, { forwardRef } from 'react';

interface GlowInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    borderWidth?: number;
    blurRadius?: number;
    borderRadius?: string;
}

const GlowInput = forwardRef<HTMLInputElement, GlowInputProps>(
    (
        {
            className = '',
            borderWidth = 3,
            blurRadius = 5,
            borderRadius = '25px',
            ...props
        },
        ref
    ) => {
        return (
            <div className="search-container">
                <input
                    ref={ref}
                    className={`search-input ${className}`}
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
                        opacity: 0;
                        transition: opacity 0.3s ease-in-out;
                    }

                    .search-container:focus-within::before,
                    .search-container:hover::before {
                        opacity: 1;
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