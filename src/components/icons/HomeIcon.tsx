import React from 'react';

interface HomeIconProps {
    size?: number;
    className?: string;
}

/**
 * 首页图标组件
 */
const HomeIcon: React.FC<HomeIconProps> = ({ size = 16, className = '' }) => {
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
            <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
            <polyline points="9 22 9 12 15 12 15 22"></polyline>
        </svg>
    );
};

export default HomeIcon;