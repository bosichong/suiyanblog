'use client'

import config from '@/config';
import SnsIcons from './SnsIcons';
import ThemeSwitcher from './ThemeSwitcher';

export default function Footer() {
    return (
        <footer>
            <div>
                <SnsIcons />
            </div>
            <small>
                <p>
                    &copy; 2017 - 2026 {config.BLOG_NAME_EN} |&nbsp;
                    <a style={{ textDecoration: 'underline' }}
                        href="https://creativecommons.org/licenses/by-nc-sa/4.0/?ref=chooser-v1"
                        target="_blank"
                        rel="license noopener noreferrer"
                      >CC BY-NC-SA 4.0
                    </a>
                </p>
            </small>
            <ThemeSwitcher />
            <script data-goatcounter="https://suiyan.goatcounter.com/count"
        async src="//gc.zgo.at/count.js"></script>
        </footer>
    );
}