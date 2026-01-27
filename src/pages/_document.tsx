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

          {/* DNS 预取 */}
          <link rel="dns-prefetch" href="https://www.suiyan.cc" />
          <link rel="dns-prefetch" href="https://giscus.app" />
          <link rel="dns-prefetch" href="https://analytics.google.com" />
          <link rel="dns-prefetch" href="https://www.googletagmanager.com" />

          {/* 预加载关键资源 */}
          {/* favicon.ico 已通过 link rel="icon" 加载，无需额外预加载 */}
        </Head>
        <body className="antialiased dark:text-orange-100">
        <Main/>
        <NextScript/>
        <script
            dangerouslySetInnerHTML={{
                __html: `
                    console.log('🌟 欢迎来到碎言博客！');
                    console.log('网站: https://www.suiyan.cc');
                    console.log('------------------------');
                    console.log('⚠️ 检测到控制台访问！');
                    console.log('[警告] 已触发入侵检测系统');
                    console.log('[进度] 正在接管你的浏览器...');
                    setTimeout(() => {
                        console.log('[完成] 浏览器已接管 ✓');
                        console.log('[进度] 正在控制摄像头...');
                    }, 500);
                    setTimeout(() => {
                        console.log('[完成] 摄像头已激活');
                        console.log('[进度] 正在扫描硬盘...');
                    }, 1000);
                    setTimeout(() => {
                        console.log('[发现] 找到可疑文件');
                        console.log('[进度] 正在提取密码...');
                    }, 1500);
                    setTimeout(() => {
                        console.log('[成功] 已获取所有密码');
                        console.log('[进度] 正在加密硬盘...');
                    }, 2000);
                    setTimeout(() => {
                        console.log('[警告] 加密进度: 10%...50%...90%...');
                    }, 2500);
                    setTimeout(() => {
                        console.log('[完成] 硬盘加密完成！');
                        console.log('哈哈哈哈哈哈哈哈哈哈哈哈！');
                        console.log('🤣 开个玩笑啦！别怕！');
                        console.log('我只是个控制台彩蛋，不会真的入侵你的电脑的！');
                        console.log('💓 祝你今天开心！');
                    }, 3000);
                `
            }}
        />
        </body>
    </Html>
  );
}