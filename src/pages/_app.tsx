import "../styles/globals.css";
import {ThemeProvider as NextThemesProvider} from "next-themes";
import {Analytics} from "@vercel/analytics/next";
import { SpeedInsights } from '@vercel/speed-insights/next';
import type { AppProps } from 'next/app';

function AnalyticsWrapper() {
  return <Analytics />;
}

function SpeedInsightsWrapper() {
  return <SpeedInsights />;
}

export default function App({ Component, pageProps }: AppProps) {
  return (
      <NextThemesProvider attribute="class" defaultTheme="dark">
          <Component {...pageProps} />
          <AnalyticsWrapper />
          <SpeedInsightsWrapper />
      </NextThemesProvider>
);
}