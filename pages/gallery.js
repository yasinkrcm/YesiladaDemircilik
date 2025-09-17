import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const images = Array.from({ length: 9 }).map((_, i) => ({
  id: i + 1,
  src: "/window.svg",
  alt: `Proje ${i + 1}`,
}));

export default function Gallery() {
  const [active, setActive] = useState(null);

  return (
    <div className="container-px mx-auto py-16 sm:py-24">
      <h1 className="section-title">Galeri</h1>
      <p className="section-subtitle">Projelerimizden seçkiler</p>

      <div className="mt-10 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-4">
        {images.map((img) => (
          <motion.button
            key={img.id}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="group relative aspect-[4/3] overflow-hidden rounded-lg border border-gray-800 bg-gray-900"
            onClick={() => setActive(img)}
          >
            <Image src={img.src} alt={img.alt} fill className="object-cover opacity-70 transition duration-300 group-hover:scale-105" />
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {active && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActive(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: "spring", stiffness: 200, damping: 24 }}
              className="relative w-full max-w-5xl aspect-video"
              onClick={(e) => e.stopPropagation()}
            >
              <Image src={active.src} alt={active.alt} fill className="object-contain" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}



