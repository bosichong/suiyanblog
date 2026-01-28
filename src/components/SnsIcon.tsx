import React from 'react';

export interface SnsIcon {
    name: string;
    url: string;
    icon: React.ReactNode;
}

interface SnsIconProps {
    icon: SnsIcon;
}

const SnsIcon: React.FC<SnsIconProps> = ({ icon }) => {
    const isExternal = icon.url.startsWith('http');

    return (
        <a
            href={icon.url}
            target={isExternal ? '_blank' : undefined}
            rel={isExternal ? 'noopener noreferrer' : undefined}
            className="text-text-secondary hover:text-text-dark"
            aria-label={icon.name}
        >
            {icon.icon}
        </a>
    );
};

export default SnsIcon;