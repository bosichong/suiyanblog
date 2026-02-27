import React from 'react';
import Link from 'next/link';
import config from '@/config';
import Image from 'next/image';
import SearchIcon from './icons/SearchIcon';
import ArchiveIcon from './icons/ArchiveIcon';
import TagsIcon from './icons/TagsIcon';
import FriendsIcon from './icons/FriendsIcon';
import AboutIcon from './icons/AboutIcon';

const iconComponents: Record<string, React.FC<{ className?: string }>> = {
    SearchIcon,
    ArchiveIcon,
    TagsIcon,
    FriendsIcon,
    AboutIcon,
};

export default function Nav() {
    return (
        <nav
            className="w-full max-w-2xl bg-bg-body/80 flex justify-between items-center px-4 pt-12"
            role="navigation"
            aria-label="主导航"
        >
            <Link href="/" aria-label="返回首页" title={config.ABOUT_ME} className="group">
                <h1 className="text-3xl font-bold text-text-primary hover:text-text-dark transition-colors">
                            {config.BLOG_NAME}
                </h1>
            </Link>

            <div className="flex items-end gap-0.5" role="navigation" aria-label="主导航菜单">
                {config.menuItems.map((item) => {
                    const IconComponent = iconComponents[item.iconComponent || ''];
                    if (!IconComponent) return null;

                    return (
                        <div key={item.name} className="relative group">
                            <Link
                                href={item.href}
                                className="flex items-center justify-center w-8 h-8 text-text-secondary hover:text-text-dark transition-colors rounded hover:bg-gray-100"
                                aria-label={item.name}
                            >
                                <IconComponent />
                            </Link>
                            <span className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 text-xs bg-black text-white rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                                {item.name}
                            </span>
                        </div>
                    );
                })}
            </div>
        </nav>
    );
}
