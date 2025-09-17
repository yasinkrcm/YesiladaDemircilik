import "../styles/globals.css";
import Navbar from "../src/components/Navbar";
import Footer from "../src/components/Footer";

export default function MyApp({ Component, pageProps }) {
  return (
    <div className="min-h-full flex flex-col bg-black">
      <Navbar />
      <main className="flex-1"> 
        <Component {...pageProps} />
      </main>
      <Footer />
    </div>
  );
}


