export const dynamic = 'force-static';

export default function SitemapPage() {
  return (
    <html>
      <head>
        <meta httpEquiv="refresh" content="0; url=/sitemap.xml" />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.location.href = '/sitemap.xml';`,
          }}
        />
      </head>
      <body>
        <p>Redirecting to sitemap...</p>
      </body>
    </html>
  );
}