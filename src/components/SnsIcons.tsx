import React from 'react';
import config from '@/config';
import BilibiliIcon from './icons/BilibiliIcon';
import GithubIcon from './icons/GithubIcon';
import EmailIcon from './icons/EmailIcon';
import RssIcon from './icons/RssIcon';
import { SnsLink } from '@/types';

// 图标组件映射
const iconComponents: Record<string, React.FC<{ className?: string }>> = {
    BilibiliIcon,
    GithubIcon,
    EmailIcon,
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
                    <a
                        key={sns.name}
                        href={sns.url}
                        target={isExternal ? '_blank' : undefined}
                        rel={isExternal ? 'noopener noreferrer' : undefined}
                        className="text-text-secondary hover:text-text-dark"
                        aria-label={sns.name}
                    >
                        <IconComponent />
                    </a>
                );
            })}
        </div>
    );
};

export default SnsIcons;