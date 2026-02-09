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
                <meta name="fediverse:creator" content="@J_sky@mastodon.social" />
                <link rel="icon" href="/favicon.ico" />
                <link rel="alternate" type="application/rss+xml" title="碎言 - SuiYan Blog" href="/feed.xml" />
            </Head>
            <body className='bg-zinc-50'>
                <Main />
                <NextScript />
            </body>
        </Html>
    );
}