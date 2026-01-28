import React from 'react';
import Link from 'next/link';

interface LinkProps {
    href: string;
    children: React.ReactNode;
    className?: string;
    target?: string;
    rel?: string;
}

const CustomLink = ({ href, children, className = '', target, rel }: LinkProps) => {
    const isExternal = href.startsWith('http');

    return (
        <Link
            href={href}
            className={`text-text-link hover:text-text-dark hover:underline no-underline ${className}`}
            target={target || (isExternal ? '_blank' : undefined)}
            rel={rel || (isExternal ? 'noopener noreferrer' : undefined)}
        >
            {children}
        </Link>
    );
};

export default CustomLink;