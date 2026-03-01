import config from '@/config';
import GithubIcon from './icons/GithubIcon';
import EmailIcon from './icons/EmailIcon';
import RssIcon from './icons/RssIcon';
import MastodonIcon from './icons/MastodonIcon';
import { SnsLink } from '@/types';

// 图标组件映射
const iconComponents: Record<string, React.FC> = {
    GithubIcon,
    EmailIcon,
    MastodonIcon,
    RssIcon,
};

const SnsIcons: React.FC = () => {
    return (
        <div>
            {config.snsLinks.map((sns: SnsLink) => {
                const IconComponent = iconComponents[sns.iconComponent];
                const isExternal = sns.url.startsWith('http');

                if (!IconComponent) {
                    return null;
                }

                return (
                    <a
                        key={sns.name}
                        href={sns.url}
                        target={isExternal ? '_blank' : undefined}
                        rel={sns.name === 'Mastodon' || sns.name === 'GitHub' ? 'me' : (isExternal ? 'noopener noreferrer' : undefined)}
                        aria-label={sns.name}
                        data-tooltip={sns.name}
                    >
                        <IconComponent />
                    </a>
                );
            })}
        </div>
    );
};

export default SnsIcons;