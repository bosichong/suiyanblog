
import Image from 'next/image';
import config from '../config';

export const metadata = {
    title: `404 - 页面走丢了 | ${config.BLOG_NAME}`,
    description: '抱歉，您访问的页面不存在',
    robots: 'noindex, follow',
};

export default function NotFound() {
    return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '2rem', padding: '2rem', textAlign: 'center' }}>
                <div>
                    <Image 
                        src="/assets/images/404.avif" 
                        alt="404" 
                        width={600} 
                        height={400}
                       
                    />
                </div>
                <div>
                    <p>错误 404</p>
                    <h1>页面未找到</h1>

                    <p>抱歉，您访问的页面不存在。</p>

                    <a href="/">返回首页</a>
                </div>
            </div>
        </div>
    );
}