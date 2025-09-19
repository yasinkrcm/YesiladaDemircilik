import Image from "next/image";
import { motion } from "framer-motion";

export async function getStaticProps() {
  const fs = await import("fs");
  const path = await import("path");

  const publicDir = path.join(process.cwd(), "public");
  const preferredExts = [".jpg", ".jpeg", ".png", ".webp"]; // prefer photo-like
  const allowedImageExts = new Set([".jpg", ".jpeg", ".png", ".webp", ".gif", ".svg"]);

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
  const images = allFiles
    .filter((fullPath) => allowedImageExts.has(path.extname(fullPath).toLowerCase()))
    .map((fullPath) => ({
      fullPath,
      rel: "/" + path.relative(publicDir, fullPath).replace(/\\\\/g, "/"),
      ext: path.extname(fullPath).toLowerCase(),
      name: path.basename(fullPath),
    }));

  // Prefer a specific storefront image named Dükkan.jpg/dukkan.jpg
  const preferredByName = images.find((img) => /d[uü]kkan\.(jpg|jpeg|png|webp)$/i.test(img.name));

  // Prefer typical photo formats and names that look like phone photos
  const scored = images
    .map((img) => {
      let score = 0;
      if (preferredExts.includes(img.ext)) score += 2;
      if (/IMG|WA|front|store|dukkan|dükkan|yesil|ada/i.test(img.name)) score += 3;
      return { ...img, score };
    })
    .sort((a, b) => b.score - a.score);

  const coverImage = preferredByName?.rel || scored[0]?.rel || "/window.svg";

  return { props: { coverImage } };
}

export default function About({ coverImage }) {
  const mapsUrl = "https://maps.google.com/maps?hl=tr&gl=tr&um=1&ie=UTF-8&fb=1&sa=X&ftid=0x14b5270003e3fd49:0x78af6a698e885299";
  return (
    <div>
      <section className="relative isolate">
        <div className="absolute inset-0 -z-10">
          <Image src={coverImage} alt="Yeşil Ada dış cephe" fill priority className="object-cover opacity-20" />
          <div className="absolute inset-0 bg-gradient-to-b from-white/60 via-white/70 to-white" />
        </div>
        <div className="container-px mx-auto py-20 sm:py-28">
          <motion.div className="max-w-3xl" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: "easeOut" }}>
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-gray-900">Hakkımızda</h1>
            <p className="mt-4 text-lg text-gray-700">
              Yeşil Ada Demircilik; çatı ve çelik kaplama, çelik konstrüksiyon, kesim ve kaynak
              işlerinde güvenilir çözüm ortağınızdır. Deneyimli ekibimizle dayanıklı ve estetik
              uygulamalar sunuyoruz.
            </p>
            <div className="mt-6">
              <a href={mapsUrl} target="_blank" rel="noopener noreferrer" className="btn-primary inline-flex">
                Google Haritalar’da görüntüle
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="container-px mx-auto py-10 sm:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl bg-gray-200">
            <Image src={coverImage} alt="Atölye / Dükkan görüntüsü" fill className="object-cover" />
          </div>
          <div>
            <h2 className="text-2xl font-semibold text-white">Neden Yeşil Ada?</h2>
            <ul className="mt-4 space-y-2 text-white list-disc pl-5">
              <li>Uzman kadro ve titiz işçilik</li>
              <li>Zamanında teslim ve şeffaf süreç</li>
              <li>Endüstriyel ve mimari ihtiyaçlara uygun çözümler</li>
            </ul>
            <div className="mt-6">
              <a href={mapsUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center rounded-md border border-gray-700 px-5 py-2.5 font-semibold text-white hover:bg-gray-900">
                Haritada Aç
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}


