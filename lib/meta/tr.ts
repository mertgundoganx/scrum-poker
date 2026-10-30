import type { SiteMeta } from './types';

// Addresses the reader with "sen", like the interface (lib/locales/tr.ts).
const tr: SiteMeta = {
  pages: {
    home: {
      title: 'Scrum Poker Online — Ücretsiz Online Planning Poker',
      description: 'Çevik ekipler için ücretsiz online Planning Poker: Scrum, Fibonacci, T-Shirt ve özel destelerle gerçek zamanlı tahmin. Kayıt yok, saniyeler içinde başla.',
    },
    guide: {
      title: 'Scrum Poker Oturumu Nasıl Yürütülür?',
      description: 'Adım adım: ücretsiz bir oda aç, bağlantıyı paylaş, gizlice oy ver, oyları birlikte aç ve tahminde uzlaş. Desteler, ? ve ☕ kartları ve oturum ipuçları da burada.',
    },
    blog: {
      title: 'Blog ve Rehberler',
      description: 'Çevik tahminleme, Planning Poker ve sprint planlama üzerine yazılar: en iyi uygulamalar ve Scrum Poker’i ekibinle verimli kullanmanın yolları.',
    },
    pricing: {
      title: 'Tamamen Ücretsiz Planning Poker',
      description: 'Scrum Poker Online tamamen ücretsiz: oda başına 50 kişiye kadar, özel desteler, ortak zamanlayıcı, tur geçmişi ve CSV dışa aktarma. Kayıt yok, kredi kartı yok.',
    },
    demo: {
      title: 'Demo: Oyları Açılmış Bir Tur',
      description: 'Oyları açılmış bir Planning Poker turunun önizlemesi: oylar, dağılımları ve otomatik istatistikler. Oda oluşturmadan önce Scrum Poker Online’ı gör.',
    },
    privacy: {
      title: 'Gizlilik Politikası',
      description: 'Scrum Poker Online kişisel verileri nasıl işler: hesap yok, veri satışı yok, ödeme bilgisi yok. Oda verileri kendiliğinden silinir.',
    },
    terms: {
      title: 'Kullanım Koşulları',
      description: 'Scrum Poker Online kullanım koşulları: çevik ekipler için tamamen ücretsiz bir Planning Poker aracı.',
    },
    fibonacci: {
      title: 'Fibonacci ile Planning Poker',
      description: 'Planning Poker’da Fibonacci dizisi: 0, 1, 2, 3, 5, 8, 13, 21 ve ötesi; aralıklar neden büyür, bir tur nasıl işler ve hikayeler ne zaman bölünmeli.',
    },
    tshirt: {
      title: 'Çevik Tahminde T-Shirt Boyutlandırma',
      description: 'T-Shirt boyutlandırma: XS’ten XXL’e ölçek, göreli tahminin story point’ten daha iyi olduğu durumlar, boyutları puana çevirme ve bir oturumu yürütme.',
    },
    cards: {
      title: 'Planning Poker Kartları ve Desteler',
      description: 'Planning Poker kartlarında neler var: Scrum, Fibonacci, T-Shirt, 2’nin kuvvetleri ve özel desteler, ? ve kahve kartları, basılı ve online kartlar.',
    },
  },
  articles: {
    'agile-velocity': { title: 'Velocity ve Sprint Kapasitesi' },
    'estimation-consensus': { title: 'Planning Poker’da Tahminde Uzlaşı' },
    'fibonacci-vs-tshirt': { title: 'Fibonacci mi, T-Shirt Boyutları mı?' },
    'free-scrum-poker-tools': { title: 'En İyi Ücretsiz Scrum Poker Araçları' },
    'remote-sprint-planning': { title: 'Uzaktan Sprint Planlama Nasıl Yapılır?' },
    'scrum-poker-best-practices': { title: 'Scrum Poker İçin 10 En İyi Uygulama' },
    'sprint-planning-checklist': { title: 'Sprint Planlama Kontrol Listesi' },
    'story-points-vs-hours': { title: 'Story Point mi, Saat mi?' },
    'what-is-planning-poker': { title: 'Planning Poker Nedir? Kapsamlı Rehber' },
  },
  notFound: 'Sayfa bulunamadı',
  imageAlt: {
    site: 'Scrum Poker Online — çevik ekipler için ücretsiz planning poker',
    blog: 'Scrum Poker Online — Blog ve Rehberler',
  },
};

export default tr;
