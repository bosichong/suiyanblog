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
          <link rel="preload" href="/favicon.ico" />
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
                    console.log('%c⚠️ 检测到控制台访问！', 'color: #ff0000; font-size: 24px; font-weight: bold; background: #000; padding: 10px;');
                    console.log('%c[警告] 已触发入侵检测系统', 'color: #ff4444; font-size: 18px; font-weight: bold;');
                    console.log('%c[进度] 正在接管你的浏览器...', 'color: #ff6b6b; font-size: 16px;');
                    setTimeout(() => {
                        console.log('%c[完成] 浏览器已接管 ✓', 'color: #51cf66; font-size: 16px;');
                        console.log('%c[进度] 正在控制摄像头...', 'color: #ff6b6b; font-size: 16px;');
                    }, 500);
                    setTimeout(() => {
                        console.log('%c[完成] 摄像头已激活 (正在看你的一举一动👀)', 'color: #51cf66; font-size: 16px;');
                        console.log('%c[进度] 正在扫描C盘、D盘、E盘...', 'color: #ff6b6b; font-size: 16px;');
                    }, 1000);
                    setTimeout(() => {
                        console.log('%c[发现] 找到 1,234,567 个文件，包括: 📁 我的日记.txt、📸 奇怪的照片、💳 银行卡密码.xlsx', 'color: #ffd43b; font-size: 16px;');
                        console.log('%c[进度] 正在提取所有密码...', 'color: #ff6b6b; font-size: 16px;');
                    }, 1500);
                    setTimeout(() => {
                        console.log('%c[成功] 已获取: QQ密码、微信密码、银行卡密码、WiFi密码、还有那个不想让人知道的网站密码🤫', 'color: #51cf66; font-size: 16px;');
                        console.log('%c[进度] 正在加密你的硬盘...', 'color: #ff6b6b; font-size: 16px;');
                    }, 2000);
                    setTimeout(() => {
                        console.log('%c[警告] 加密进度: 10%...50%...90%...', 'color: #ff6b6b; font-size: 16px;');
                    }, 2500);
                    setTimeout(() => {
                        console.log('%c[完成] 硬盘加密完成！💀', 'color: #ff0000; font-size: 20px; font-weight: bold;');
                        console.log('%c', 'background: linear-gradient(90deg, #ff0000, #ff7f00, #ffff00, #00ff00, #0000ff, #4b0082, #9400d3); font-size: 100px; line-height: 100px;');
                        console.log('%c哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈！', 'color: #ff0000; font-size: 20px; font-weight: bold;');
                        console.log('%c🤣🤣🤣🤣 开个玩笑啦！别怕！别怕！🤣🤣🤣🤣', 'color: #00ff00; font-size: 22px; font-weight: bold; background: #000; padding: 10px;');
                        console.log('%c我只是个控制台彩蛋，不会真的入侵你的电脑的！😂', 'color: #00d4ff; font-size: 18px;');
                        console.log('%c不过话说回来，网络安全真的很重要哦！', 'color: #ffd93d; font-size: 16px;');
                        console.log('%c✅ 建议：使用强密码、开启双重验证、不要随便点击不明链接、定期更新系统和软件', 'color: #6bcb77; font-size: 16px;');
                        console.log('%c💓 祝你今天开心！注意网络安全！💓', 'color: #ff6b6b; font-size: 20px; font-weight: bold;');
                    }, 3000);
                `
            }}
        />
        </body>
    </Html>
  );
}