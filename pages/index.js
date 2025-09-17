import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative isolate">
        <div className="absolute inset-0 -z-10">
          <Image
            src="/window.svg"
            alt="Steel background"
            fill
            priority
            className="object-cover opacity-20"
          />
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
              <Link href="/contact" className="btn-primary">Bizimle İletişime Geçin</Link>
              <Link href="/services" className="inline-flex items-center justify-center rounded-md border border-gray-700 px-6 py-3 font-semibold text-white hover:bg-gray-900">
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
        <h2 className="section-title">Hizmetler</h2>
        <p className="section-subtitle">İhtiyaçlarınıza uygun çözümler</p>
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { title: "Demir Kesim", desc: "Hassas CNC ve plazma kesim" },
            { title: "Çelik Konstrüksiyon", desc: "Endüstriyel yapılar, platformlar" },
            { title: "Kaynak İşleri", desc: "MIG/TIG/Elektrod kaynak uygulamaları" },
            { title: "Özel Demir Tasarımları", desc: "Korkuluk, kapı, dekoratif çözümler" },
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
              <h3 className="text-white font-semibold text-lg">{s.title}</h3>
              <p className="mt-2 text-gray-400">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Projects Section */}
      <section className="container-px mx-auto py-16 sm:py-24">
        <h2 className="section-title">Referanslar / Projeler</h2>
        <p className="section-subtitle">Tamamladığımız bazı çalışmalar</p>
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <motion.div key={i} className="card" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }}>
              <div className="aspect-video relative overflow-hidden rounded-lg bg-gray-800">
                <Image src="/window.svg" alt="Proje görseli" fill className="object-cover opacity-50 transition duration-300 hover:scale-105" />
              </div>
              <h3 className="mt-4 text-white font-semibold">Proje #{i + 1}</h3>
              <p className="mt-1 text-gray-400">Endüstriyel çelik konstrüksiyon uygulaması</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section id="iletisim" className="container-px mx-auto py-16 sm:py-24">
        <h2 className="section-title">İletişim</h2>
        <p className="section-subtitle">Hızlıca bize ulaşın</p>

        <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="card lg:col-span-1">
            <h3 className="text-white font-semibold text-lg">Dükkan Bilgileri</h3>
            <div className="mt-4 space-y-3 text-gray-300">
              <div>
                <div className="text-sm text-gray-400">Adres</div>
                <p className="mt-1">
                  Organize Sanayi Bölgesi, 12. Cadde No:34
                  <br /> Çerkezköy / Tekirdağ
                </p>
              </div>
              <div>
                <div className="text-sm text-gray-400">Telefon</div>
                <p className="mt-1">
                  <a className="hover:underline" href="tel:+905555555555">+90 555 555 55 55</a>
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


