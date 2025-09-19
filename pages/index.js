import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

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
        name: path.basename(fullPath),
      };
    })
    .filter(Boolean);

  const heroImage = media.find((m) => m.type === "image") || { src: "/window.svg", type: "image" };
  const projectMedia = media.filter((m) => m.type === "image").slice(0, 6);

  return { props: { heroImage, projectMedia } };
}

export default function Home({ heroImage, projectMedia }) {
  const mapsUrl = "https://maps.google.com/maps?hl=tr&gl=tr&um=1&ie=UTF-8&fb=1&sa=X&ftid=0x14b5270003e3fd49:0x78af6a698e885299";
  return (
    <div>
      {/* Hero Section */}
      <section className="relative isolate">
        <div className="absolute inset-0 -z-10">
          {heroImage?.type === "image" ? (
            <Image
              src={heroImage.src}
              alt="Steel background"
              fill
              priority
              className="object-cover opacity-20"
            />
          ) : null}
          <div className="absolute inset-0 bg-gradient-to-b from-white/60 via-white/70 to-white" />
        </div>
        <div className="container-px mx-auto py-24 sm:py-32">
          <motion.div className="max-w-3xl" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: "easeOut" }}>
            <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-gray-900">
              Yeşilada Demircilik
            </h1>
            <p className="mt-4 text-xl text-gray-700">
              Güçlü Yapılar, Sağlam Çözümler
            </p>
            <div className="mt-8 flex gap-4">
              <Link href="/contact" className="btn-primary text-black">Bizimle İletişime Geçin</Link>
              <Link href="/services" className="inline-flex items-center justify-center rounded-md border border-gray-700 px-6 py-3 font-semibold text-black hover:bg-gray-200">
                Hizmetlerimiz
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 px-6 md:px-20 bg-gray-900">
        <h2 className="text-3xl font-bold text-white mb-4">Hakkımızda</h2>
        <p className="text-lg text-gray-200 leading-relaxed max-w-3xl">
          Demir kesim, kaynak, çelik konstrüksiyon ve demircilik alanlarında tecrübeli
          ekibimizle endüstriyel ve mimari projelerinize profesyonel çözümler sunuyoruz.
          Dayanıklılık, hassas işçilik ve zamanında teslimat temel değerlerimizdir.
        </p>
      </section>

      {/* Services Section */}
      <section className="container-px mx-auto py-16 sm:py-24" id="hizmetler">
        <h2 className="section-title text-white">Hizmetler</h2>
        <p className="section-subtitle text-white">İhtiyaçlarınıza özel profesyonel çözümler</p>
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { title: "Demir Kesim", desc: "CNC, lazer ve plazma ile hassas kesim" },
            { title: "Çelik Konstrüksiyon", desc: "Sanayi tesisleri, platformlar, çatı sistemleri" },
            { title: "Kaynak İşleri", desc: "MIG/TIG/Elektrod kaynak ve montaj" },
            { title: "Özel Demir Tasarımları", desc: "Korkuluk, kapı, ferforje, mimari uygulamalar" },
          ].map((s, idx) => (
            <motion.div
              key={s.title}
              className="card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: idx * 0.05 }}
              whileHover={{ y: -4 }}
            >
              <h3 className="text-black font-semibold text-lg">{s.title}</h3>
              <p className="mt-2 text-black">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Projects Section */}
      <section className="container-px mx-auto py-16 sm:py-24">
        <h2 className="section-title text-white">Referanslar / Projeler</h2>
        <p className="section-subtitle text-white">Tamamladığımız bazı çalışmalar</p>
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {(projectMedia.length ? projectMedia : Array.from({ length: 6 }).map(() => ({ src: "/window.svg" }))).map((item, i) => (
            <motion.div key={(item.src || "fallback") + i} className="card" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }}>
              <div className="aspect-video relative overflow-hidden rounded-lg bg-gray-800">
                <Image src={item.src} alt="Proje görseli" fill className="object-cover opacity-50 transition duration-300 hover:scale-105" />
              </div>
              <h3 className="mt-4 text-white font-semibold">Proje #{i + 1}</h3>
              <p className="mt-1 text-black">Endüstriyel çelik konstrüksiyon uygulaması</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section id="iletisim" className="container-px mx-auto py-16 sm:py-24">
        <h2 className="section-title text-white">İletişim</h2>
        <p className="section-subtitle text-white">Bizimle iletişime geçin</p>

        <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="card lg:col-span-1">
            <h3 className="text-black font-semibold text-lg">İletişim Bilgileri</h3>
            <div className="mt-4 space-y-3 text-black">
              <div>
                <div className="text-sm text-black">Telefon</div>
                <p className="mt-1">
                  <a className="hover:underline text-black" href="tel:+905418692080">+90 541 869 2080</a>
                </p>
              </div>
              <div>
                <div className="text-sm text-black">E-posta</div>
                <p className="mt-1">
                  <a className="hover:underline text-black" href="mailto:bakikuluz@gmail.com">bakikuluz@gmail.com</a>
                </p>
              </div>
              <div>
                <div className="text-sm text-black">Adres</div>
                <p className="mt-1">Kızılpınar Atatürk, 69. Sk No:6, 59500 Çerkezköy/Tekirdağ</p>
                <p className="mt-1">
                  <a className="hover:underline text-black" href={mapsUrl} target="_blank" rel="noopener noreferrer">
                    Google Haritalar’da görüntüle
                  </a>
                </p>
              </div>
            </div>
          </div>
          <div className="lg:col-span-2" />
        </div>
      </section>
    </div>
  );
}


