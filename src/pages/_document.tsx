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
        <script
            dangerouslySetInnerHTML={{
                __html: `
                    console.log('%c🌟 欢迎来到碎言博客！', 'color: #ff6b6b; font-size: 24px; font-weight: bold;');
                    console.log('%c网站: https://www.suiyan.cc', 'color: #4ecdc4; font-size: 16px;');
                    console.log('%c这是一个记录碎言碎语、技术思考和人生感悟的个人博客。', 'color: #95e1d3; font-size: 14px;');
                    console.log('%c------------------------', 'color: #f38181; font-size: 12px;');
                    console.log('%c✨ 哇！你居然打开了控制台！', 'color: #ffd93d; font-size: 20px; font-weight: bold;');
                    console.log('%c你真是个奇才！', 'color: #6bcb77; font-size: 18px; font-weight: bold;');
                    console.log('%c像你这样善于探索的人，注定会成大器、发大财！💰🚀', 'color: #4d96ff; font-size: 16px;');
                `
            }}
        />
        </body>
    </Html>
  );
}