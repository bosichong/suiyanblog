import CustomLink from './Link';
import config from '@/config';

export default function Footer() {
    return (
        <footer className="mt-16 mb-8">
            <div className="flex flex-col items-center gap-4 text-sm text-text-secondary">
                {/* SNS 图标 */}
                <div className="flex items-center gap-4">
                    <a
                        href="https://space.bilibili.com/275991552"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-text-secondary hover:text-text-dark"
                        aria-label="Bilibili"
                    >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M2 10h20" />
                            <path d="M12 2v20" />
                            <rect x="2" y="2" width="20" height="20" rx="2" />
                        </svg>
                    </a>
                    <a
                        href="https://github.com/bosichong/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-text-secondary hover:text-text-dark"
                        aria-label="GitHub"
                    >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                        </svg>
                    </a>
                    <a
                        href="mailto:285911@gmail.com"
                        className="text-text-secondary hover:text-text-dark"
                        aria-label="Email"
                    >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                            <polyline points="22,6 12,13 2,6" />
                        </svg>
                    </a>
                    <a
                        href="https://www.suiyan.cc/feed"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-text-secondary hover:text-text-dark"
                        aria-label="RSS"
                    >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M4 11a9 9 0 0 1 9 9" />
                            <path d="M4 4a16 16 0 0 1 16 16" />
                            <circle cx="5" cy="19" r="1" />
                        </svg>
                    </a>
                </div>

                {/* 版权信息 */}
                <p className="m-0 text-center text-xs text-text-tertiary">
                    &copy; 2017 - 2026{' '}
                    <CustomLink href="https://www.suiyan.cc">
                        {config.BLOG_NAME}
                    </CustomLink>
                    {' '}· Built with{' '}
                    <CustomLink href="https://nextjs.org/" target="_blank">
                        Next.js
                    </CustomLink>
                </p>
            </div>
        </footer>
    );
}