import React from 'react';
import Link from 'next/link';
import config from '@/config';

export default function Nav() {
    return (
        <nav
            className="fixed top-0 left-0 right-0 h-14 bg-bg-body/80 backdrop-blur-md border-b border-border/50 flex justify-center z-40"
            role="navigation"
            aria-label="主导航"
        >
            <div className="w-full  px-4 flex items-center justify-between h-full">
                {/* 站点标题 */}
                <Link
                    href="/"
                    className="text-base font-normal text-text-primary no-underline hover:text-text-dark hover:underline"
                    aria-label="返回首页"
                >
                    {config.BLOG_NAME_EN}
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