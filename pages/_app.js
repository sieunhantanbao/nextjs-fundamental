import Head from "next/head";
import "@/styles/globals.css";
import "@/styles/vendor.css";
import "@/styles/main.css";
import "@/styles/masonry-fixes.css";
import "@/styles/video-post-fixes.css";
import "@/styles/modal-video-custom.css";
import "@/styles/map-fixes.css";
import "@/styles/scroll-to-top.css";
import "@/styles/featured-post.css";
import "@/styles/flexslider.css";
import "@/styles/superfish.css";
import "@/styles/leaflet-custom.css";
import 'mediaelement/build/mediaelementplayer.min.css';

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>News - a CMS</title>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}
