import React from 'react';
import config from '@/config';
import NavIcons from './NavIcons';

export default function Nav() {
    return (
        <nav>
            <div>
                <a href="/" className="site-title">
                    <h3>
                        {config.BLOG_NAME}
                    </h3>
                </a>
            </div>

            <NavIcons />
        </nav>
    );
}
