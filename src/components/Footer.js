import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-gray-800 bg-black">
      <div className="container-px mx-auto py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-white font-bold text-lg">Yeşilada Demircilik</h3>
            <p className="mt-2 text-gray-400">
              Güçlü Yapılar, Sağlam Çözümler
            </p>
          </div>
          <div>
            <h4 className="text-white font-semibold">Bağlantılar</h4>
            <ul className="mt-3 space-y-2 text-gray-400">
              <li><Link className="hover:text-white" href="/">Ana Sayfa</Link></li>
              <li><Link className="hover:text-white" href="/about">Hakkımızda</Link></li>
              <li><Link className="hover:text-white" href="/services">Hizmetler</Link></li>
              <li><Link className="hover:text-white" href="/contact">İletişim</Link></li>
            </ul>
          </div>
          <div className="text-gray-400">
            <h4 className="text-white font-semibold">İletişim</h4>
            <p className="mt-3">E-posta: bakikuluz@gmail.com</p>
            <p>Telefon: +90 541 869 2080</p>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-800 pt-6 text-gray-500 text-sm">
          © {new Date().getFullYear()} Yeşilada Demircilik. Tüm hakları saklıdır.
        </div>
      </div>
    </footer>
  );
}


