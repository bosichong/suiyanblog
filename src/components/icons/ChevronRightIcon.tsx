import React from 'react';

interface ChevronRightIconProps {
    size?: number;
    className?: string;
}

/**
 * 右箭头图标组件
 */
const ChevronRightIcon: React.FC<ChevronRightIconProps> = ({ size = 16, className = '' }) => {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
            xmlns="http://www.w3.org/2000/svg"
        >
            <polyline points="9 18 15 12 9 6"></polyline>
        </svg>
    );
};

export default ChevronRightIcon;