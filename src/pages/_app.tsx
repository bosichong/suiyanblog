import "../styles/globals.css";
import {NextUIProvider} from "@nextui-org/react";
import {ThemeProvider as NextThemesProvider} from "next-themes";
import {Analytics} from "@vercel/analytics/next";
import { SpeedInsights } from '@vercel/speed-insights/next';
import type { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
  return (
      <NextUIProvider>
          <NextThemesProvider attribute="class" defaultTheme="dark">
              <Component {...pageProps} />
              <Analytics />
              <SpeedInsights />
          </NextThemesProvider>
      </NextUIProvider>
);
}