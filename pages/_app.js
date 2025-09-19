import "../styles/globals.css";
import Navbar from "../src/components/Navbar";
import Footer from "../src/components/Footer";
import Head from "next/head";

export default function MyApp({ Component, pageProps }) {
  const siteTitle = "Yeşil Ada Demircilik";
  const siteDescription = "Çelik konstrüksiyon, demir kesim ve kaynak çözümleri";
  const siteImageEncoded = "/images/D%C3%BCkkan.jpg"; // URL-encoded ü (public/images/Dükkan.jpg)
  const siteUrl = "https://www.yesiladademircilik.com";

  return (
    <div className="min-h-full flex flex-col bg-black">
      <Head>
        <title>{siteTitle}</title>
        <meta name="description" content={siteDescription} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content={siteTitle} />
        <meta property="og:description" content={siteDescription} />
        <meta property="og:image" content={siteImageEncoded} />
        <meta property="og:url" content={siteUrl} />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={siteTitle} />
        <meta name="twitter:description" content={siteDescription} />
        <meta name="twitter:image" content={siteImageEncoded} />

        {/* Icons - use the encoded path only */}
        <link rel="icon" href={siteImageEncoded} />
        <link rel="shortcut icon" href={siteImageEncoded} />
        <link rel="apple-touch-icon" href={siteImageEncoded} />
      </Head>
      <Navbar />
      <main className="flex-1"> 
        <Component {...pageProps} />
      </main>
      <Footer />
    </div>
  );
}


