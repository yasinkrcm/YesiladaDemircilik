import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

export async function getStaticProps() {
  const fs = await import("fs");
  const path = await import("path");

  const publicDir = path.join(process.cwd(), "public");
  const allowedImageExts = new Set([".jpg", ".jpeg", ".png", ".webp", ".gif", ".svg"]);
  const allowedVideoExts = new Set([".mp4", ".webm", ".ogg"]);

  function walk(dir) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    const files = [];
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        files.push(...walk(fullPath));
      } else {
        files.push(fullPath);
      }
    }
    return files;
  }

  const allFiles = walk(publicDir);
  const media = allFiles
    .map((fullPath) => {
      const ext = path.extname(fullPath).toLowerCase();
      const isImage = allowedImageExts.has(ext);
      const isVideo = allowedVideoExts.has(ext);
      if (!isImage && !isVideo) return null;
      const rel = "/" + path.relative(publicDir, fullPath).replace(/\\\\/g, "/");
      return {
        src: rel,
        type: isImage ? "image" : "video",
        alt: isImage ? `Görsel: ${path.basename(fullPath)}` : `Video: ${path.basename(fullPath)}`,
      };
    })
    .filter(Boolean)
    // Prefer images first for nicer grids
    .sort((a, b) => (a.type === b.type ? 0 : a.type === "image" ? -1 : 1));

  return { props: { media } };
}

export default function Gallery({ media = [] }) {
  const [active, setActive] = useState(null);

  return (
    <div className="container-px mx-auto py-16 sm:py-24">
      <h1 className="section-title text-white">Galeri</h1>
      <p className="section-subtitle text-white">Projelerimizden seçkiler</p>

      <div className="mt-10 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-4">
        {media.map((img, idx) => (
          <motion.button
            key={(img.src || "") + idx}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="group relative aspect-[4/3] overflow-hidden rounded-lg border border-gray-800 bg-gray-900"
            onClick={() => setActive(img)}
          >
            {img.type === "image" ? (
              <Image src={img.src} alt={img.alt} fill className="object-cover opacity-80 transition duration-300 group-hover:scale-105" />
            ) : (
              <video
                src={img.src}
                className="h-full w-full object-cover opacity-90"
                muted
                loop
                playsInline
                autoPlay
                preload="metadata"
              />
            )}
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
              {active.type === "image" ? (
                <Image src={active.src} alt={active.alt} fill className="object-contain" />
              ) : (
                <video src={active.src} className="h-full w-full object-contain" controls autoPlay playsInline />
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}



