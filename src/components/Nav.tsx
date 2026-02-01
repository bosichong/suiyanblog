import React from 'react';
import Link from 'next/link';
import config from '@/config';
import Image from 'next/image';

export default function Nav() {
    return (
        <nav
            className="w-full max-w-2xl bg-bg-body/80 backdrop-blur-md border-b border-border/50 flex justify-between items-center px-4 py-2"
            role="navigation"
            aria-label="主导航"
        >
            {/* Logo */}
            <Link href="/" aria-label="返回首页" title={config.BLOG_NAME}>
                <Image
                    src={`/${config.PROFILE_IMAGE}`}
                    alt={config.BLOG_NAME}
                    width={48}
                    height={48}
                    className="rounded-full"
                />
            </Link>

            {/* 导航菜单 */}
            <div className="flex items-center text-sm text-text-secondary">
                {config.menuItems.map((item, index) => (
                    <React.Fragment key={`${item.name}-${index}`}>
                        {index > 0 && (
                            <span className="mx-2 text-border" aria-hidden="true">
                                /
                            </span>
                        )}
                        <Link
                            href={item.href}
                            className="text-lg text-text-secondary hover:text-text-dark hover:underline no-underline"
                        >
                            {item.name}
                        </Link>
                    </React.Fragment>
                ))}
            </div>
        </nav>
    );
}