import React from 'react';
import config from '@/config';
import NavIcons from './NavIcons';

export default function Nav() {
    return (
        <nav className="grid">
            <div className="grid">
                <a href="/" aria-label="返回首页" data-tooltip={config.ABOUT_ME}>
                    <h1>
                        {config.BLOG_NAME}
                    </h1>
                </a>
            </div>

            <NavIcons />
        </nav>
    );
}
