export default function Contact() {
  return (
    <div className="container-px mx-auto py-16 sm:py-24">
      <h1 className="section-title text-white">İletişim</h1>
      <p className="section-subtitle text-white">Bizimle iletişime geçin</p>
      {/* İletişim Bilgileri + Harita */}
      <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="card lg:col-span-1">
          <h2 className="text-black font-semibold text-lg">İletişim Bilgileri</h2>
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
              <p className="mt-1">
              Kızılpınar Atatürk, 69. Sk No:6, 59500 
                <br /> Çerkezköy / Tekirdağ
              </p>
            </div>
          </div>
        </div>
        <div className="lg:col-span-2">
          <div className="relative aspect-[16/9] overflow-hidden rounded-xl border border-gray-800 bg-gray-900">
            <iframe
              title="Harita"
              src="https://www.google.com/maps?q=Cerkezkoy YeşilAda Demircilik&output=embed"
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


