import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
        <Head>
            <script charSet="UTF-8" id="LA_COLLECT"
                    src="//sdk.51.la/js-sdk-pro.min.js?id=3FsLlPZR8s5Rn9BW&ck=3FsLlPZR8s5Rn9BW"></script>
        </Head>
        <body className="antialiased dark:text-orange-100">
        <Main/>
        <NextScript/>
        </body>
    </Html>
  );
}
