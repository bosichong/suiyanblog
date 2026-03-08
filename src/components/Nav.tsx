import React from 'react';
import config from '@/config';
import NavIcons from './NavIcons';

export default function Nav() {
    return (
        <nav className="grid">
            <div className="grid">
                <a href="/">
                    <h3>
                        {config.BLOG_NAME}
                    </h3>
                </a>
            </div>

            <NavIcons />
        </nav>
    );
}
