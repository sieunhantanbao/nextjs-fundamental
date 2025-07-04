import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta charSet="utf-8" />
        <meta name="description" content="News CMS application" />
        <meta name="author" content="Developer" />
        {/* Preload critical scripts */}
        <script src="https://code.jquery.com/jquery-3.6.0.min.js" integrity="sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4=" crossOrigin="anonymous" />
        <script src="https://unpkg.com/imagesloaded@5/imagesloaded.pkgd.min.js" />
        <script src="https://unpkg.com/masonry-layout@4/dist/masonry.pkgd.min.js" />
      </Head>
      <body id="top">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
