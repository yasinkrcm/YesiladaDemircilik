import { motion } from "framer-motion";
import { FaIndustry, FaGears, FaWrench, FaHammer } from "react-icons/fa6";

export default function Services() {
  const items = [
    { title: "Demir Kesim", desc: "CNC, lazer ve plazma ile hassas kesim", Icon: FaIndustry },
    { title: "Çelik Konstrüksiyon", desc: "Sanayi tesisleri, platformlar, çatı sistemleri", Icon: FaGears },
    { title: "Kaynak İşleri", desc: "MIG/TIG/Elektrod kaynak ve montaj", Icon: FaWrench },
    { title: "Özel Demir Tasarımları", desc: "Korkuluk, kapı, ferforje, mimari uygulamalar", Icon: FaHammer },
  ];

  return (
    <div className="container-px mx-auto py-16 sm:py-24">
      <h1 className="section-title">Hizmetler</h1>
      <p className="section-subtitle">İhtiyaçlarınıza özel profesyonel çözümler</p>
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map(({ title, desc, Icon }, idx) => (
          <motion.div
            key={title}
            className="card"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: idx * 0.05 }}
            whileHover={{ y: -4 }}
          >
            <div className="flex items-center gap-3">
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-lg bg-red-600/10 text-red-500 border border-red-700/30">
                <Icon className="h-5 w-5" />
              </span>
              <h3 className="text-white font-semibold text-lg">{title}</h3>
            </div>
            <p className="mt-3 text-gray-400">{desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}


