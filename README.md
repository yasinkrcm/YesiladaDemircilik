# 🔨 Yeşilada Demircilik

> **Güçlü Yapılar, Sağlam Çözümler**

Modern ve profesyonel bir demircilik şirketi web sitesi. Next.js, React ve Tailwind CSS kullanılarak geliştirilmiş, responsive tasarım ve interaktif özelliklerle donatılmış.

![Website Preview](https://img.shields.io/badge/Status-Live-brightgreen)
![Next.js](https://img.shields.io/badge/Next.js-15.5.3-black)
![React](https://img.shields.io/badge/React-19.1.0-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-4.0-38B2AC)

## 📋 İçindekiler

- [Özellikler](#-özellikler)
- [Teknolojiler](#-teknolojiler)
- [Kurulum](#-kurulum)
- [Proje Yapısı](#-proje-yapısı)
- [Sayfalar](#-sayfalar)
- [Bileşenler](#-bileşenler)
- [Stil Sistemi](#-stil-sistemi)
- [Geliştirme](#-geliştirme)
- [Deployment](#-deployment)
- [İletişim](#-iletişim)

## ✨ Özellikler

### 🎨 Modern Tasarım
- **Responsive Design**: Tüm cihazlarda mükemmel görünüm
- **Dark/Light Theme**: Kullanıcı dostu renk paleti
- **Smooth Animations**: Framer Motion ile akıcı geçişler
- **Professional UI**: Temiz ve modern arayüz

### 🚀 Performans
- **Next.js 15**: En son Next.js özellikleri
- **Static Generation**: Hızlı yükleme süreleri
- **Image Optimization**: Otomatik görsel optimizasyonu
- **SEO Optimized**: Arama motoru dostu yapı

### 📱 Kullanıcı Deneyimi
- **Interactive Gallery**: Zoom, swipe ve keyboard navigasyonu
- **Mobile-First**: Mobil cihazlar için optimize edilmiş
- **Fast Loading**: Hızlı sayfa yükleme
- **Accessibility**: Erişilebilirlik standartlarına uygun

### 🛠️ İş Özellikleri
- **Hizmet Kataloğu**: Detaylı hizmet açıklamaları
- **Proje Galerisi**: Çalışma örnekleri
- **İletişim Bilgileri**: Kolay erişilebilir iletişim
- **Google Maps Entegrasyonu**: Konum gösterimi

## 🛠️ Teknolojiler

### Frontend
- **[Next.js 15.5.3](https://nextjs.org/)** - React framework
- **[React 19.1.0](https://reactjs.org/)** - UI kütüphanesi
- **[Tailwind CSS 4.0](https://tailwindcss.com/)** - CSS framework
- **[Framer Motion](https://www.framer.com/motion/)** - Animasyon kütüphanesi

### Icons & UI
- **[Heroicons](https://heroicons.com/)** - SVG icon set
- **[React Icons](https://react-icons.github.io/react-icons/)** - Icon kütüphanesi

### Development Tools
- **[ESLint](https://eslint.org/)** - Code linting
- **[PostCSS](https://postcss.org/)** - CSS processing

## 🚀 Kurulum

### Gereksinimler
- Node.js 18.0 veya üzeri
- npm veya yarn

### Adımlar

1. **Projeyi klonlayın**
   ```bash
   git clone https://github.com/your-username/yesilada-demircilik.git
   cd yesilada-demircilik
   ```

2. **Bağımlılıkları yükleyin**
   ```bash
   npm install
   # veya
   yarn install
   ```

3. **Geliştirme sunucusunu başlatın**
   ```bash
   npm run dev
   # veya
   yarn dev
   ```

4. **Tarayıcıda açın**
   ```
   http://localhost:3000
   ```

## 📁 Proje Yapısı

```
yesilada-demircilik/
├── 📁 app/                    # Next.js App Router (favicon)
├── 📁 pages/                  # Sayfa bileşenleri
│   ├── _app.js               # Ana uygulama wrapper
│   ├── index.js              # Ana sayfa
│   ├── about.js              # Hakkımızda
│   ├── services.js           # Hizmetler
│   ├── gallery.js            # Galeri
│   └── contact.js            # İletişim
├── 📁 src/
│   └── 📁 components/        # Yeniden kullanılabilir bileşenler
│       ├── Navbar.js         # Navigasyon
│       └── Footer.js         # Alt bilgi
├── 📁 styles/
│   └── globals.css           # Global stiller
├── 📁 public/                # Statik dosyalar
│   ├── 📁 images/            # Görseller
│   └── 📁 videos/            # Videolar
├── package.json              # Proje bağımlılıkları
├── next.config.mjs           # Next.js konfigürasyonu
├── tailwind.config.js        # Tailwind CSS konfigürasyonu
└── README.md                 # Bu dosya
```

## 📄 Sayfalar

### 🏠 Ana Sayfa (`/`)
- **Hero Section**: Etkileyici giriş bölümü
- **Hakkımızda**: Şirket tanıtımı
- **Hizmetler**: 4 ana hizmet kategorisi
- **Projeler**: Referans çalışmalar
- **İletişim**: Temel iletişim bilgileri

### ℹ️ Hakkımızda (`/about`)
- **Şirket Hikayesi**: Detaylı tanıtım
- **Neden Yeşil Ada?**: Avantajlar
- **Görsel Galeri**: Atölye fotoğrafları
- **Konum Bilgisi**: Google Maps entegrasyonu

### 🛠️ Hizmetler (`/services`)
- **Demir Kesim**: CNC, lazer ve plazma kesim
- **Çelik Konstrüksiyon**: Sanayi tesisleri ve platformlar
- **Kaynak İşleri**: MIG/TIG/Elektrod kaynak
- **Özel Tasarımlar**: Korkuluk, kapı, ferforje

### 🖼️ Galeri (`/gallery`)
- **Interactive Gallery**: Zoom ve navigasyon
- **Touch Support**: Mobil dokunmatik destek
- **Keyboard Navigation**: Klavye ile gezinme
- **Video Support**: Video dosya desteği

### 📞 İletişim (`/contact`)
- **İletişim Bilgileri**: Telefon, e-posta, adres
- **Google Maps**: Entegre harita
- **Responsive Layout**: Mobil uyumlu tasarım

## 🧩 Bileşenler

### 🧭 Navbar
- **Responsive Navigation**: Mobil hamburger menü
- **Scroll Effect**: Kaydırma efekti
- **Smooth Animations**: Framer Motion animasyonları

### 🦶 Footer
- **Company Info**: Şirket bilgileri
- **Quick Links**: Hızlı bağlantılar
- **Contact Info**: İletişim bilgileri
- **Copyright**: Telif hakkı bilgisi

## 🎨 Stil Sistemi

### Renk Paleti
```css
--color-brand: #dc2626;        /* Ana kırmızı */
--color-brand-dark: #b91c1c;   /* Koyu kırmızı */
```

### CSS Sınıfları
- `.btn-primary`: Ana buton stili
- `.section-title`: Bölüm başlıkları
- `.section-subtitle`: Alt başlıklar
- `.card`: Kart bileşenleri
- `.nav-link`: Navigasyon linkleri
- `.container-px`: Responsive container

## 🔧 Geliştirme

### Mevcut Scripts
```bash
npm run dev      # Geliştirme sunucusu
npm run build    # Production build
npm run start    # Production sunucusu
npm run lint     # ESLint kontrolü
```

### Yeni Özellik Ekleme
1. İlgili sayfa dosyasını düzenleyin
2. Gerekirse yeni bileşen oluşturun
3. Stilleri `globals.css`'e ekleyin
4. Responsive tasarımı test edin

### Görsel Ekleme
1. Görselleri `public/images/` klasörüne ekleyin
2. `getStaticProps` fonksiyonunu güncelleyin
3. Next.js Image bileşenini kullanın

## 🚀 Deployment

### Vercel (Önerilen)
```bash
npm install -g vercel
vercel
```

### Netlify
```bash
npm run build
# dist/ klasörünü Netlify'a yükleyin
```

### Docker
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

## 📱 Responsive Breakpoints

- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px

## 🔍 SEO Özellikleri

- **Meta Tags**: Open Graph ve Twitter Card
- **Structured Data**: Schema.org markup
- **Sitemap**: Otomatik sitemap oluşturma
- **Performance**: Core Web Vitals optimizasyonu

## 🛡️ Güvenlik

- **Content Security Policy**: XSS koruması
- **HTTPS**: SSL sertifikası
- **Input Validation**: Form doğrulama
- **Dependencies**: Güvenlik güncellemeleri

## 📊 Performans

- **Lighthouse Score**: 90+ puan
- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **Cumulative Layout Shift**: < 0.1

## 🤝 Katkıda Bulunma

1. Fork yapın
2. Feature branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Commit yapın (`git commit -m 'Add amazing feature'`)
4. Push yapın (`git push origin feature/amazing-feature`)
5. Pull Request oluşturun

## 📄 Lisans

Bu proje MIT lisansı altında lisanslanmıştır. Detaylar için [LICENSE](LICENSE) dosyasına bakın.

## 📞 İletişim

**Yeşilada Demircilik**
- 📧 E-posta: [bakikuluz@gmail.com](mailto:bakikuluz@gmail.com)
- 📱 Telefon: [+90 541 869 2080](tel:+905418692080)
- 📍 Adres: Kızılpınar Atatürk, 69. Sk No:6, 59500 Çerkezköy/Tekirdağ
- 🌐 Website: [www.yesiladademircilik.com](https://www.yesiladademircilik.com)

---

<div align="center">

**⭐ Bu projeyi beğendiyseniz yıldız vermeyi unutmayın!**

Made with ❤️ by [Yeşilada Demircilik](https://www.yesiladademircilik.com)

</div>