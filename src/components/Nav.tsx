import React from 'react';
import Link from 'next/link';
import config from '@/config';

export default function Nav() {
    return (
        <nav
            className="fixed top-0 left-0 right-0 h-14 bg-bg-body border-b border-border flex justify-center z-40"
            role="navigation"
            aria-label="主导航"
        >
            <div className="w-full max-w-2xl px-4 flex items-center justify-between h-full">
                {/* 站点标题 */}
                <Link
                    href="/"
                    className="text-sm font-normal text-text-primary no-underline hover:text-text-dark hover:underline"
                    aria-label="返回首页"
                >
                    {config.BLOG_NAME}
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
                                className="text-text-secondary hover:text-text-dark hover:underline no-underline"
                            >
                                {item.name}
                            </Link>
                        </React.Fragment>
                    ))}
                </div>
            </div>
        </nav>
    );
}