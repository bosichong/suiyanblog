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
            className={`font-normal text-neutral-700 hover:text-cyan-400 hover:underline hover:animate-pulse ${underlineClass} ${className}`}
            target={target || (isExternal ? '_blank' : undefined)}
            rel={rel || (isExternal ? 'noopener noreferrer' : undefined)}
        >
            {children}
        </Link>
    );
};

export default CustomLink;