import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="zh-CN">
        <Head>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
          <meta name="theme-color" content="#000000" />
          <link rel="icon" href="/favicon.ico" />
          <meta name="robots" content="index, follow" />
          <meta name="googlebot" content="index, follow" />
          <meta name="google" content="notranslate" />
          <meta name="format-detection" content="telephone=no" />
          <meta name="renderer" content="webkit" />
          <meta name="force-rendering" content="webkit" />
          <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />

          {/* 预连接到第三方域名 */}
          <link rel="preconnect" href="https://www.suiyan.cc" crossOrigin="anonymous" />
          <link rel="preconnect" href="https://giscus.app" crossOrigin="anonymous" />
          <link rel="preconnect" href="https://analytics.google.com" crossOrigin="anonymous" />
          <link rel="preconnect" href="https://www.googletagmanager.com" crossOrigin="anonymous" />
          <link rel="preconnect" href="https://vitals.vercel-analytics.com" crossOrigin="anonymous" />

          {/* DNS 预取 */}
          <link rel="dns-prefetch" href="https://www.suiyan.cc" />
          <link rel="dns-prefetch" href="https://giscus.app" />
          <link rel="dns-prefetch" href="https://analytics.google.com" />
          <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
          <link rel="dns-prefetch" href="https://vitals.vercel-analytics.com" />

          {/* 预加载关键资源 */}
          <link rel="preload" href="/favicon.ico" as="image" type="image/x-icon" />
        </Head>
        <body className="antialiased dark:text-orange-100">
        <Main/>
        <NextScript/>
        </body>
    </Html>
  );
}