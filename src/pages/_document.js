import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="zh-CN">
        <Head>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta name="theme-color" content="#000000" />
          <link rel="icon" href="/favicon.ico" />
          <meta name="robots" content="index, follow" />
          <meta name="googlebot" content="index, follow" />
          <meta name="google" content="notranslate" />
          <meta name="format-detection" content="telephone=no" />
          <meta name="renderer" content="webkit" />
          <meta name="force-rendering" content="webkit" />
          <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
        </Head>
        <body className="antialiased dark:text-orange-100">
        <Main/>
        <NextScript/>
        </body>
    </Html>
  );
}
