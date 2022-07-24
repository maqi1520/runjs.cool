import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#ffffff" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
                try {
                  if (!('theme' in localStorage)) {
                    localStorage.theme = window.matchMedia('(prefers-color-scheme: dark)').matches
                      ? 'dark'
                      : 'light'
                  }
                  if (localStorage.theme === 'dark') {
                    document.querySelector('html').classList.add('dark')
                  }
                } catch (_) {}
              `
              .replace(/\s+/g, "")
              .replace("'inlocal", "' in local"),
          }}
        />
        {/* Global Site Tag (gtag.js) - Google Analytics */}
        {process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS && (
          <script
            async
            src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`}
          />
        )}
        {process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS && (
          <script
            dangerouslySetInnerHTML={{
              __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}', {
              page_path: window.location.pathname,
            });
          `,
            }}
          />
        )}
      </Head>
      <body className="text-neutral-900 dark:text-white bg-white dark:bg-neutral-900">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
