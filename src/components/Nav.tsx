import React from 'react';
import Link from 'next/link';
import config from '@/config';
import Image from 'next/image';
import CustomLink from './Link';

export default function Nav() {
    return (
        <nav
            className="w-full max-w-2xl bg-bg-body/80 backdrop-blur-md border-b border-border/50 flex justify-between items-center px-4 py-4"
            role="navigation"
            aria-label="主导航"
        >
            {/* Logo */}
            <Link href="/" aria-label="返回首页" title={config.BLOG_NAME} className="group">
                <Image
                    src={`/${config.PROFILE_IMAGE}`}
                    alt={config.BLOG_NAME}
                    width={40}
                    height={40}
                    className="rounded-full m-0 transition-transform duration-300 group-hover:rotate-180"
                    suppressHydrationWarning
                />
            </Link>

            {/* 导航菜单 */}
            <div className="inline-flex" role="navigation" aria-label="主导航菜单">
                {config.menuItems.map((item, index) => (
                    <CustomLink
                        key={item.name}
                        href={item.href}
                        className={`
                            border border-gray-200 px-3 py-2 font-medium text-text-secondary transition-colors
                            hover:bg-gray-100
                            focus:z-10 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-white focus:outline-none
                            ${index === 0 ? 'rounded-l-sm' : ''}
                            ${index === config.menuItems.length - 1 ? 'rounded-r-sm' : ''}
                            ${index > 0 ? '-ml-px' : ''}
                        `}
                        aria-label={`跳转到${item.name}`}
                        underline={false}
                    >
                        {item.name}
                    </CustomLink>
                ))}
            </div>
        </nav>
    );
}