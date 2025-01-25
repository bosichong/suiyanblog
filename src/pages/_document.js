import { Html, Head, Main, NextScript } from "next/document";
import { SpeedInsights } from "@vercel/speed-insights/next"

export default function Document() {
  return (
    <Html lang="en">
        <Head />
        <body className="antialiased dark:text-orange-100">
        <Main/>
        <NextScript/>
        <SpeedInsights />
        </body>
    </Html>
  );
}
