export default function Contact() {
  return (
    <div className="container-px mx-auto py-16 sm:py-24">
      <h1 className="section-title">İletişim</h1>
      <p className="section-subtitle">Bizimle iletişime geçin</p>
      {/* İletişim Bilgileri + Harita */}
      <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="card lg:col-span-1">
          <h2 className="text-white font-semibold text-lg">İletişim Bilgileri</h2>
          <div className="mt-4 space-y-3 text-gray-300">
            <div>
              <div className="text-sm text-gray-400">Telefon</div>
              <p className="mt-1">
                <a className="hover:underline" href="tel:+905555555555">+90 555 555 55 55</a>
              </p>
            </div>
            <div>
              <div className="text-sm text-gray-400">E-posta</div>
              <p className="mt-1">
                <a className="hover:underline" href="mailto:info@yesilada.com">info@yesilada.com</a>
              </p>
            </div>
            <div>
              <div className="text-sm text-gray-400">Adres</div>
              <p className="mt-1">
                Organize Sanayi Bölgesi, 12. Cadde No:34
                <br /> Çerkezköy / Tekirdağ
              </p>
            </div>
          </div>
        </div>
        <div className="lg:col-span-2">
          <div className="relative aspect-[16/9] overflow-hidden rounded-xl border border-gray-800 bg-gray-900">
            <iframe
              title="Harita"
              src="https://www.google.com/maps?q=Cerkezkoy%20OSB&output=embed"
              className="absolute inset-0 h-full w-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
        </div>
      </div>
    </div>
  );
}


