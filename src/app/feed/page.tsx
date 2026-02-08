export const dynamic = 'force-static';

export default function FeedPage() {
  return (
    <html>
      <head>
        <meta httpEquiv="refresh" content="0; url=/feed.xml" />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.location.href = '/feed.xml';`,
          }}
        />
      </head>
      <body>
        <p>Redirecting to RSS feed...</p>
      </body>
    </html>
  );
}