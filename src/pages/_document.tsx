import { Html, Head, Main, NextScript } from 'next/document';
import config from '@/config';

export default function Document() {
    return (
        <Html lang="zh-CN">
            <Head>
                <meta charSet="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta name="description" content={config.META_DESCRIPTION} />
                <meta name="keywords" content={config.META_KEYWORDS} />
                <meta name="author" content={config.BLOG_AUTHOR} />
                <meta name="robots" content="index, follow" />
                <meta name="googlebot" content="index, follow" />
                <meta property="og:title" content={config.BLOG_NAME} />
                <meta property="og:description" content={config.META_DESCRIPTION} />
                <meta property="og:type" content="website" />
                <meta property="og:locale" content="zh_CN" />
                <meta name="twitter:card" content="summary" />
                <meta name="twitter:title" content={config.BLOG_NAME} />
                <meta name="twitter:description" content={config.META_DESCRIPTION} />
                <link rel="icon" href="/favicon.ico" />
                <link rel="canonical" href="https://www.suiyan.cc" />
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    );
}