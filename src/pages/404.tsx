import Head from 'next/head';
import Link from 'next/link';
import config from '../config';

export default function Custom404() {
    return (
        <>
            <Head>
                <title>{`404 - 页面走丢了 | ${config.BLOG_NAME}`}</title>
                <meta name="description" content="抱歉，您访问的页面不存在" />
                <meta name="robots" content="noindex, follow" />
            </Head>
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '100vh',
                textAlign: 'center',
                padding: '20px'
            }}>
                <div>
                    <svg width="200" height="200" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="100" cy="100" r="90" stroke="currentColor" strokeWidth="2" />
                        <circle cx="70" cy="85" r="8" fill="currentColor" />
                        <circle cx="130" cy="85" r="8" fill="currentColor" />
                        <path d="M60 120 Q100 150 140 120" stroke="currentColor" strokeWidth="3" fill="none" />
                        <text x="100" y="180" textAnchor="middle" fontSize="24" fill="currentColor">404</text>
                    </svg>
                </div>
                <h1 style={{ marginTop: '20px' }}>页面走丢了</h1>
                <p style={{ marginTop: '15px' }}>
                    就像人生一样，有时候你也会走到死胡同。<br />
                    别担心，这只是个页面，不是你的人生。
                </p>
                <Link href="/" style={{ marginTop: '20px' }}>
                    回到首页
                </Link>
            </div>
        </>
    );
}