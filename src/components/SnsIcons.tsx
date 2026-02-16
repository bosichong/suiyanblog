import config from '@/config';
import GithubIcon from './icons/GithubIcon';
import EmailIcon from './icons/EmailIcon';
import RssIcon from './icons/RssIcon';
import MastodonIcon from './icons/MastodonIcon';
import { SnsLink } from '@/types';

// 图标组件映射
const iconComponents: Record<string, React.FC<{ className?: string }>> = {
    GithubIcon,
    EmailIcon,
    MastodonIcon,
    RssIcon,
};

const SnsIcons: React.FC = () => {
    return (
        <div className="flex items-center gap-4">
            {config.snsLinks.map((sns: SnsLink) => {
                const IconComponent = iconComponents[sns.iconComponent];
                const isExternal = sns.url.startsWith('http');

                if (!IconComponent) {
                    return null;
                }

                return (
                    <div key={sns.name} className="relative group">
                        <a
                            href={sns.url}
                            target={isExternal ? '_blank' : undefined}
                            rel={sns.name === 'Mastodon' || sns.name === 'GitHub' ? 'me' : (isExternal ? 'noopener noreferrer' : undefined)}
                            className="text-text-secondary hover:text-text-dark"
                            aria-label={sns.name}
                        >
                            <IconComponent />
                        </a>
                        <span className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 text-xs bg-black text-white rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                            {sns.name}
                        </span>
                    </div>
                );
            })}
        </div>
    );
};

export default SnsIcons;