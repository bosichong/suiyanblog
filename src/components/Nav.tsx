import React from 'react';
import Link from 'next/link';
import config from '@/config';
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function Nav() {
    return (
        <nav
            className="w-full max-w-2xl bg-bg-body/80 backdrop-blur-md border-b border-border/50 flex justify-between items-center px-4 py-2"
            role="navigation"
            aria-label="主导航"
        >
            {/* Logo 动画 */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
            >
                <Link href="/" aria-label="返回首页" title={config.BLOG_NAME}>
                    <Image
                        src={`/${config.PROFILE_IMAGE}`}
                        alt={config.BLOG_NAME}
                        width={48}
                        height={48}
                        className="rounded-full my-2"
                    />
                </Link>
            </motion.div>

            {/* 导航菜单 */}
            <div className="flex items-center text-sm text-text-secondary">
                {config.menuItems.map((item, index) => (
                    <React.Fragment key={item.name}>
                        {index > 0 && (
                            <span className="mx-2 text-border" aria-hidden="true">
                                /
                            </span>
                        )}
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, ease: "easeOut", delay: index * 0.05 }}
                        >
                            <Link
                                href={item.href}
                                className="text-lg text-text-secondary hover:text-text-dark hover:underline no-underline"
                            >
                                {item.name}
                            </Link>
                        </motion.div>
                    </React.Fragment>
                ))}
            </div>
        </nav>
    );
}