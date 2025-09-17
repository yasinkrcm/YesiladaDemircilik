import Link from "next/link";
import { Bars3Icon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`sticky top-0 z-40 border-b border-gray-200 bg-white/80 backdrop-blur ${
        scrolled ? "shadow-lg shadow-gray-200/60" : ""
      }`}
    >
      <div className="container-px mx-auto">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="text-gray-900 font-extrabold text-lg">
            Yeşilada Demircilik
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            <Link href="/" className="nav-link">Ana Sayfa</Link>
            <Link href="/about" className="nav-link">Hakkımızda</Link>
            <Link href="/services" className="nav-link">Hizmetler</Link>
            <Link href="/gallery" className="nav-link">Galeri</Link>
            <Link href="/contact" className="nav-link">İletişim</Link>
          </nav>

          <button
            className="md:hidden inline-flex items-center justify-center rounded-md p-2 text-gray-700 hover:text-gray-900 hover:bg-gray-100"
            aria-label="Menüyü Aç"
            onClick={() => setOpen((v) => !v)}
          >
            <Bars3Icon className="h-6 w-6" />
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden border-t border-gray-200 bg-white">
          <div className="container-px mx-auto py-3 flex flex-col gap-3">
            <Link href="/" className="nav-link" onClick={() => setOpen(false)}>Ana Sayfa</Link>
            <Link href="/about" className="nav-link" onClick={() => setOpen(false)}>Hakkımızda</Link>
            <Link href="/services" className="nav-link" onClick={() => setOpen(false)}>Hizmetler</Link>
            <Link href="/contact" className="nav-link" onClick={() => setOpen(false)}>İletişim</Link>
            <Link href="/gallery" className="nav-link" onClick={() => setOpen(false)}>Galeri</Link>
          </div>
        </div>
      )}
    </motion.header>
  );
}


