import Link from './Link';

interface LinkCardProps {
    site_name: string;
    site_url: string;
    site_description: string;
    is_active?: boolean;
}

const LinkCard = ({ site_name, site_url, site_description, is_active = true }: LinkCardProps) => {
    return (
        <div className="flex-1 my-4 min-w-0">
            <Link
                href={site_url}
                target='_blank'
                rel="noopener noreferrer"
                className={`text-lg block font-medium flex items-center gap-2 mb-1 ${
                    is_active === false
                        ? 'text-neutral-500'
                        : 'text-neutral-700 hover:text-orange-500 hover:underline hover:underline-offset-2'
                }`}
            >
                {site_name}
                {is_active === false && (
                    <span className="ml-2 text-xs text-neutral-500">链接失效</span>
                )}
                {is_active !== false && (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-neutral-500">
                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                        <polyline points="15 3 21 3 21 9" />
                        <line x1="10" y1="14" x2="21" y2="3" />
                    </svg>
                )}
            </Link>
            <p className={`text-sm line-clamp-2 leading-relaxed ${
                is_active === false ? 'text-neutral-500 line-through' : 'text-neutral-600'
            }`}>
                {site_description}
            </p>
        </div>
    );
};

export default LinkCard;