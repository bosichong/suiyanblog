

interface LinkCardProps {
    site_name: string;
    site_url: string;
    site_description: string;
    is_active?: boolean;
}

const LinkCard = ({ site_name, site_url, site_description, is_active = true }: LinkCardProps) => {
    return (
        <li>
            <a
                href={site_url}
                target='_blank'
                rel="noopener noreferrer"
            >
                {site_name}
                {is_active === false && (
                    <span>链接失效</span>
                )}
                {is_active !== false && (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                        <polyline points="15 3 21 3 21 9" />
                        <line x1="10" y1="14" x2="21" y2="3" />
                    </svg>
                )}
            </a>
            <p>
                {site_description}
            </p>
        </li>
    );
};

export default LinkCard;