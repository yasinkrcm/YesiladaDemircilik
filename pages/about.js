import Image from "next/image";
import { motion } from "framer-motion";

export default function About() {
  return (
    <section className="py-20 px-6 md:px-20 bg-gray-900">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-4">Hakkımızda</h1>
        <p className="text-lg text-gray-200 leading-relaxed max-w-3xl">
          Yeşilada Demircilik, demir kesim, kaynak ve çelik konstrüksiyon alanlarında
          uzman ekibiyle müşterilerine yüksek kalite ve güven sunar. Her proje için
          mühendislik prensiplerine uygun, güvenli ve estetik çözümler üretir.
        </p>

        <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <motion.div initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <h2 className="text-2xl font-bold text-white">Deneyim ve Vizyon</h2>
            <p className="mt-3 text-gray-200 leading-relaxed">
              Yılların getirdiği tecrübe ile endüstriyel yapılardan mimari detaylara kadar geniş bir yelpazede
              çözümler üretiyoruz. Güvenlik, dayanıklılık ve estetik; tüm süreçlerimizin merkezindedir.
            </p>
            <p className="mt-3 text-gray-200 leading-relaxed">
              Projelerinizi zamanında ve standartların üzerinde teslim etmeyi hedefler, uzun vadeli ortaklıklar kurarız.
            </p>
          </motion.div>
          <motion.div className="relative aspect-[4/3] rounded-xl overflow-hidden border border-gray-800 bg-gray-800"
            initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <Image src="/window.svg" alt="Atölye" fill className="object-cover opacity-70" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}


