import "../styles/globals.css";
import {NextUIProvider} from "@nextui-org/react";
import {ThemeProvider as NextThemesProvider} from "next-themes";
import {Analytics} from "@vercel/analytics/next";
export default function App({ Component, pageProps }) {
  return (
      <NextUIProvider>
          <NextThemesProvider attribute="class" defaultTheme="dark">
              <Component {...pageProps} />
              <Analytics />
          </NextThemesProvider>
      </NextUIProvider>
);
}

