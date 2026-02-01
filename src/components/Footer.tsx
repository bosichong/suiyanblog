import CustomLink from './Link';
import config from '@/config';
import SnsIcons from './SnsIcons';

export default function Footer() {
    return (
        <footer className="mt-8 mb-8">
            <div className="flex flex-col items-center gap-4 text-text-secondary">
                {/* SNS 图标 */}
                <SnsIcons />

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
            <script data-goatcounter="https://suiyan.goatcounter.com/count" async src="//gc.zgo.at/count.js"></script>
        </footer>
    );
}