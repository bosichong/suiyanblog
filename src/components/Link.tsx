import React from 'react';
import Link from 'next/link';

interface LinkProps {
    href: string;
    children: React.ReactNode;
    className?: string;
    target?: string;
    rel?: string;
    underline?: boolean;
}

const CustomLink = ({ href, children, className = '', target, rel, underline = false }: LinkProps) => {
    const isExternal = href.startsWith('http');
    const underlineClass = underline ? 'underline' : '';

    return (
        <Link
            href={href}
            className={`font-normal text-neutral-700 hover:text-orange-500 hover:underline ${underlineClass} ${className}`}
            target={target || (isExternal ? '_blank' : undefined)}
            rel={rel || (isExternal ? 'noopener noreferrer' : undefined)}
        >
            {children}
        </Link>
    );
};

export default CustomLink;