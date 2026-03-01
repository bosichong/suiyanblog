import '../styles/globals.css';

export const metadata = {
  viewport: 'width=device-width, initial-scale=1',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN">
      <head>
        <meta charSet="utf-8" />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}