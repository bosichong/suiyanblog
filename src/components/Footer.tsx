import CustomLink from './Link';
import config from '@/config';
import SnsIcons from './SnsIcons';

export default function Footer() {
    return (
        <footer className="mt-8 mb-8">
            <div className="flex flex-col items-center gap-4">
                {/* 版权信息 */}
                <p className="m-0 text-center text-sm">
                    &copy; 2017 - 2026{'   '}{config.BLOG_NAME_EN}

                </p>

                {/* SNS 图标 */}
                <SnsIcons />
            </div>
        </footer>
    );
}