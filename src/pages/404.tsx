import Head from 'next/head';
import Link from 'next/link';
import styles from './404.module.css';
import config from '../config';

export default function Custom404() {
    return (
        <>
            <Head>
                <title>404 - 页面走丢了 | {config.BLOG_NAME}</title>
                <meta name="description" content="抱歉，您访问的页面不存在" />
                <meta name="robots" content="noindex, follow" />
            </Head>
            <div className={styles.container}>
                <div className={styles.illustration}>
                    <svg width="200" height="200" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="100" cy="100" r="90" stroke="currentColor" strokeWidth="2" className={styles.circle} />
                        <circle cx="70" cy="85" r="8" fill="currentColor" className={styles.eye} />
                        <circle cx="130" cy="85" r="8" fill="currentColor" className={styles.eye} />
                        <path d="M60 120 Q100 150 140 120" stroke="currentColor" strokeWidth="3" fill="none" className={styles.mouth} />
                        <text x="100" y="180" textAnchor="middle" fontSize="24" fill="currentColor" className={styles.text404}>404</text>
                    </svg>
                </div>
                <h1 className={styles.title}>页面走丢了</h1>
                <p className={styles.message}>
                    就像人生一样，有时候你也会走到死胡同。<br />
                    别担心，这只是个页面，不是你的人生。
                </p>
                <Link href="/" className={styles.homeButton}>
                    回到首页
                </Link>
            </div>
        </>
    );
}