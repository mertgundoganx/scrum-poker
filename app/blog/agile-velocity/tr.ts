import type { Localized } from '../articleTypes';

const tr: Localized = {
  title: "Çevik Ekiplerde Velocity: Hesaplama, Takip ve Sprint Planlaması",
  subtitle: "Velocity aslında neyi ölçer ve nasıl doğru hesaplanır? Gerçek hesaplarla adım adım bir örnek ve faydalı bir planlama sayısını zararlı bir sayıya dönüştüren hatalar.",
  sections: [
    {
      title: "Çevik ekiplerde velocity nedir?",
      content: "Velocity, bir Scrum ekibinin tek bir sprintte bitirdiği iş miktarıdır ve ekibin tahmin için kullandığı birimle — genellikle [saat yerine story point](/blog/story-points-vs-hours) ile — ölçülür. Bir ekip iki haftalık bir sprintte toplam 30 puanlık kullanıcı hikayesini tamamlıyorsa, o sprintteki velocity'si 30'dur. Birkaç sprint üzerinden ortalaması alındığında velocity, ekibin en pratik planlama sayısı haline gelir: bir sonraki sprinte backlog'dan kabaca ne kadar iş çekilebileceğini ve bir sürümün muhtemelen kaç sprint süreceğini söyler.",
      paragraphs: [
        "Velocity'yi çoğu yöneticinin alışık olduğu verimlilik metriklerinden ayıran iki şey vardır. Birincisi, ekip düzeyindedir, asla bireysel değildir: story point bir hikayeye verilir ve o hikayeyi ekip teslim eder. İkincisi, görelidir. Bir puanın onu tahmin eden ekibin dışında sabit bir anlamı yoktur; dolayısıyla velocity yalnızca o ekibin kendi geçmişi bağlamında anlamlıdır.",
        "Velocity ampirik bir ölçümdür, hedef değildir. Ne olduğunu anlatır ve işe yaradığı tek şey, koşullar benzer kaldığında bir sonraki adımda muhtemelen ne olacağını öngörmektir. Bir ekip “velocity'yi artırmaya” zorlandığı anda sayı gerçeği anlatmayı bırakır ve baskıyı anlatmaya başlar.",
      ],
    },
    {
      title: "Velocity adım adım nasıl hesaplanır?",
      content: "Hesaplamanın kendisi basittir. Disiplin, neyi saydığındadır.",
      items: [
        "1. Sprint sonunda ekibin sprinte çektiği her backlog öğesini listele.",
        "2. Yalnızca Tamamlanma Tanımı'nı (Definition of Done) tam olarak karşılayan öğeleri tut — gözden geçirilmiş, test edilmiş, birleştirilmiş, dağıtılabilir ya da ekibin üzerinde anlaştığı ölçüt neyse. %90'ı bitmiş bir öğe bu sprint için sıfır sayılır; puanları gerçekten bittiği sprinte taşınır.",
        "3. Tamamlanan öğelerin story point'lerini topla. Bu toplam, sprintin velocity'sidir.",
        "4. Her sprint için tekrarla ve sayıları tüm ekibin görebileceği bir yere kaydet.",
        "5. Üç ila beş sprint sonra ortalamayı ya da son sprintlerin hareketli ortalamasını hesapla. Planlamada kullanacağın velocity budur.",
      ],
      paragraphs: [
        "Sayı daha iyi görünsün diye biten hikayeleri yeniden tahmin etme ve kısmi puan verme. Her iki uygulama da o an zararsız görünür, ancak geçmiş sayıları güvenilmez hale getirir ve velocity'nin tek amacını boşa çıkarır.",
      ],
    },
    {
      title: "Örnek: altı sprintlik velocity",
      content: "Yeni kurulmuş bir ekibin iki haftalık sprintler yürüttüğünü ve ilk altı sprintinde aşağıdaki sonuçları kaydettiğini varsayalım. Sayılar yalnızca örnek olsun diye seçilmiştir.",
      items: [
        "Sprint 1: 30 puan taahhüt edildi, 22 tamamlandı (iki hikaye sonraki sprinte devredildi)",
        "Sprint 2: 30 puan taahhüt edildi, 31 tamamlandı (devreden işler erken bitti)",
        "Sprint 3: 32 puan taahhüt edildi, 28 tamamlandı",
        "Sprint 4: 30 puan taahhüt edildi, 35 tamamlandı",
        "Sprint 5: 34 puan taahhüt edildi, 26 tamamlandı (bir geliştirici bir hafta izindeydi)",
        "Sprint 6: 30 puan taahhüt edildi, 32 tamamlandı",
      ],
      paragraphs: [
        "Altı sprintin ortalaması (22 + 31 + 28 + 35 + 26 + 32) / 6 = 174 / 6 = 29 puandır. Son üç sprintin hareketli ortalaması ise (35 + 26 + 32) / 3 = 93 / 3 = 31 puandır. İkisi de makul planlama sayılarıdır. Daha önemli gözlem şudur: ekip normal bir sprintte yaklaşık 26 ile 35 puan arasında iş tamamlıyor. Planlamayı tek bir sprinte değil, gerçeği yansıtan bu aralığa göre yapmalısın.",
        "Şimdi Product Owner'ın sürüm backlog'unda kalan 180 puanın ne kadar süreceğini sorduğunu varsayalım. Altı sprintlik 29 puan ortalamasıyla 180 / 29 yaklaşık 6,2 eder, yani kabaca yedi sprint. Aralığın alt ucuyla (26 puan) 180 / 26 yaklaşık 6,9 eder, yani yedi sprint. Üst ucuyla (35 puan) 180 / 35 yaklaşık 5,1 eder, yani altı sprint. Sorumlu bir öngörü bu nedenle “altı ila yedi sprint, büyük olasılıkla yedi” şeklinde, bir tarih yerine bir aralık olarak iletilir.",
      ],
    },
    {
      title: "Sprint planlaması ve sürüm öngörüsünde velocity kullanımı",
      content: "[Sprint planlaması](/blog/sprint-planning-checklist) sırasında velocity, ekibin çekmesi gereken iş miktarının tavanıdır; doldurulması gereken bir kota değildir. Yaklaşık 30 puanlık bir planlama velocity'siyle ekip, refinement'tan geçmiş backlog'dan en yüksek öncelikli hikayeleri toplam 30'a yaklaşana kadar seçer ve sonra durur — sprint hafif görünse bile.",
      paragraphs: [
        "Hikayeleri seçmeden önce bilinen kapasite değişikliklerini hesaba kat. Altı geliştiriciden ikisi sprintin yarısı boyunca tatildeyse ekip kapasitesinin kabaca altıda birini kaybediyor demektir ve 30 yerine yaklaşık 25 puan planlamalıdır. Velocity sana temeli verir; kapasite planlaması onu önündeki sprinte göre ayarlar.",
        "Velocity sürüm planlamasını da besler. Kalan backlog puanını ortalama velocity'ye bölmek beklenen sprint sayısını verir; son sprintlerdeki en düşük ve en yüksek velocity'ye bölmek ise kötümser ve iyimser sınırları verir. Üçünü birden sunmak tek bir tarih sunmaktan çok daha dürüsttür ve paydaşlarla kapsam pazarlığını somutlaştırır: tarih sabitse aralık, backlog'dan kaç puanın çıkması gerektiğini söyler.",
      ],
    },
    {
      title: "Velocity zamanla neden değişir?",
      content: "Velocity hiçbir zaman düz bir çizgi değildir ve olmamalıdır da. Sprintten sprinte birkaç puanlık değişim gürültüdür. Daha büyük ya da kalıcı kaymaların ise genellikle retrospektifte konuşulmaya değer, tespit edilebilir bir nedeni vardır.",
      items: [
        "Ekip yapısı: yeni bir üye kod tabanını öğrenirken velocity'yi birkaç sprint boyunca düşürür; kıdemli bir mühendisin ayrılması daha uzun süre düşürebilir.",
        "Sprint uzunluğu: iki haftalık sprintten üç haftalığa geçmek sayının kendisini değiştirir. Velocity'yi yalnızca aynı uzunluktaki sprintler arasında karşılaştır.",
        "Tahmin kayması: ekip 5 puanlık hikayelere zamanla 8 demeye başlarsa çıktı değişmeden velocity yükselir. Referans hikayeler ölçeği sabit tutmaya yardımcı olur.",
        "İş karışımı: tahmin edilmemiş bug, olay ya da destek işinin ağırlıkta olduğu bir sprint, ekip aynı ölçüde sıkı çalışmış olsa bile daha düşük bir velocity gösterir.",
        "Teknik değişim: yeni bir framework'e geçmek, altyapı taşımak ya da büyük bir teknik borç parçasını ödemek teslim edilen puanı geçici olarak düşürür.",
        "Kesintiler: sürüm çıkışları, şirket geneli toplantı haftaları, resmi tatiller ve işe alıştırma, planlı işe ayrılan zamanı azaltır.",
      ],
      paragraphs: [
        "Bu etkenler nedeniyle çoğu ekip planlamada yalnızca son sprinti değil, son üç ila beş sprintin hareketli ortalamasını kullanır. Hareketli ortalama gerçek değişime tepki verirken tek bir olağan dışı sprintin gürültüsünü bastırır.",
      ],
    },
    {
      title: "Yaygın velocity hataları ve anti-pattern'ler",
      content: "Velocity, iyi kullanıldığından çok daha sık kötüye kullanılır. Aşağıdaki kalıplar, ne ölçtüğünü anlamadan velocity'yi benimseyen neredeyse her organizasyonda ortaya çıkar.",
      items: [
        "Velocity'yi ekipler arasında karşılaştırmak. Farklı ölçeklerle tahmin yapan iki ekip farklı şeyleri ölçüyordur; velocity'si 60 olan ekip, velocity'si 30 olandan iki kat etkili değildir. Karşılaştırma anlamsızdır ve ekipler karşılaştırıldıklarını öğrendiği anda puanlar şişer.",
        "Velocity'yi performans metriği olarak kullanmak. Yüksek velocity'yi ödüllendirmek onu yok etmenin en hızlı yoludur. Tahminler büyür, Tamamlanma Tanımı küçülür ve sayı hiçbir şeyi öngöremez hale gelir.",
        "Velocity hedefi koymak. “Bu çeyrek 40'a ulaşmalıyız” bir ölçümü hedefe dönüştürür; tahminler değiştirilerek tutturulabilen bir hedef, er geç tahminler değiştirilerek tutturulur.",
        "Kısmen biten işi saymak. “Neredeyse bitmiş” bir hikayeye 8 puanın 5'ini vermek devreden işi gizler ve trendi şişirir.",
        "En iyi sprinte göre planlamak. Ekibin ulaştığı en yüksek velocity'ye taahhüt vermek düzenli sprint başarısızlığını garanti eder.",
        "Bireysel velocity'yi takip etmek. Story point ekibe aittir. Bireysel velocity, insanları eşli çalışmaktan, kod incelemekten ve yardım etmekten kaçınmaya iter; oysa ekipleri hızlandıran tam da bu davranışlardır.",
      ],
    },
    {
      title: "Velocity ne zaman yardımcı olur, ne zaman yanıltır?",
      content: "Velocity en çok, istikrarlı bir ekip en az birkaç sprinttir aynı şekilde tahmin yapıyorsa ve “ne kadar iş alabiliriz?” sorusuna gerçekçi bir yanıt arıyorsa işe yarar. Bu ortamda basit ve zahmetsizdir, üstelik içgüdüye dayalı tahminden çok daha dürüsttür.",
      paragraphs: [
        "Bağlı olduğu koşullar eksik olduğunda yanıltır. Yepyeni bir ekibin ortalaması alınacak geçmişi yoktur. Üyeleri her sprint değişen bir ekibin sabit bir ölçü birimi yoktur. Her sprinte tahmin edilmemiş operasyonel iş karıştıran bir ekip, planlama kalitesiyle ilgisi olmayan sert dalgalanmalar görür. İyileşme göstermek için baskı altındaki bir ekip ise, bilinçli ya da değil, grafik yönetimin istediği gibi görünene kadar tahminlerini kaydırır.",
        "Velocity değer hakkında da hiçbir şey söylemez. Düşük öncelikli özelliklerden 35 puan teslim eden bir sprint, büyük bir müşterinin önünü açan 20 puan teslim eden sprintten daha iyi değildir. Velocity'yi sonuç ölçümleriyle — ulaşılan hedefler, çözülen müşteri sorunları, azalan olaylar — birlikte kullan ve onu yalnızca bir kapasite göstergesi olarak ele al.",
      ],
    },
    {
      title: "Tutarlı tahmin velocity'yi anlamlı tutar",
      content: "Velocity ancak arkasındaki tahminler kadar iyidir. Bir hikaye bir hafta 3, benzer bir hikaye ertesi hafta 8 olarak tahmin ediliyorsa ortaya çıkan velocity dalgalanmaları sana hiçbir şey söylemez. Burada Planning Poker'in amacı hassasiyet değil, tutarlılıktır. Her ekip üyesi aynı referans hikayelere göre bağımsız tahmin yapıp ardından farkları tartıştığında, ekibin [Fibonacci puan ölçeği](/fibonacci-planning-poker) sprintten sprinte sabit kalır.",
      paragraphs: [
        "İşleyiş önemlidir. İlk söylenen sayı çapa etkisiyle diğerlerini etkilemesin diye tahminler herkes seçimini yapana kadar gizli kalmalıdır. Scrum Poker Online bunun için ücretsiz bir araçtır: kayıt gerektirmez, oylar açılana kadar gizli kalır, sonra hepsi aynı anda açılır ve tur geçmişi her hikayenin son oylarını saklar; bu geçmişi CSV olarak indirebilir ya da Markdown olarak kopyalayabilirsin. Bu kayıt, retrospektifte velocity'nin neden değiştiği sorulduğunda da faydalı bir girdidir.",
      ],
    },
    {
      title: "Velocity kontrol listesi",
      content: "Velocity'nin planlamaya değer olduğunu doğrulamak için bu listeyi kullan.",
      items: [
        "Ekip, büyük ölçüde sabit bir kadroyla aynı uzunlukta en az üç sprint tamamlamış.",
        "Yalnızca Tamamlanma Tanımı'nı karşılayan öğeler sayılıyor; kısmi puan yok, geriye dönük yeniden tahmin yok.",
        "Plansız iş her sprintte aynı şekilde ele alınıyor — ya hep tahmin ediliyor ya hiç.",
        "Sprint başına velocity, taahhüt edilen ile tamamlanan arasındaki fark dahil, kaydediliyor ve görünür.",
        "Planlama, bilinen kapasite değişikliklerine göre ayarlanmış son üç ila beş sprintin hareketli ortalamasını kullanıyor.",
        "Öngörüler tek bir tarih olarak değil, sprint aralığı olarak iletiliyor.",
        "Ekip dışından hiç kimse bu sayıyı ekipleri karşılaştırmak, kişileri sıralamak ya da hedef koymak için kullanmıyor.",
        "Ekip, tahmin kaymasını yakalamak için birkaç referans hikayeyi düzenli olarak yeniden kontrol ediyor.",
      ],
    },
  ],
  faq: [
    {
      q: "Bir Scrum ekibi için iyi velocity nedir?",
      a: "Evrensel bir iyi velocity yoktur. Sayı, ekibin puanları nasıl verdiğine, sprintlerinin uzunluğuna ve kaç kişi olduğuna bağlıdır; 20 bir ekip için mükemmel, 80 başka bir ekip için sıradan olabilir. İyi velocity, planlama yapılabilecek kadar istikrarlı olandır: son beş sprint dar bir aralığa düşüyorsa mutlak sayı ne olursa olsun ekip güvenle öngörü yapabilir.",
    },
    {
      q: "Velocity'nin güvenilir hale gelmesi için kaç sprint gerekir?",
      a: "Ekip kadrosu ve sprint uzunluğu aynı kaldığı sürece çoğu ekip üç sprint sonra kullanılabilir, beş ya da altı sprint sonra oldukça istikrarlı bir ortalama elde eder. O zamana kadar temkinli planla, sayıyı geçici kabul et ve onu ileride ayarlamaya hazır ol.",
    },
    {
      q: "Bug'lar ve teknik borç velocity'ye dahil edilmeli mi?",
      a: "Tutarlı olduğu sürece iki seçenek de uygundur. Bug ve teknik borç öğelerini tahmin edip sayarsan velocity toplam teslim edilen işi yansıtır. Tahmin etmezsen velocity yalnızca özellik işini yansıtır ve bug ağırlıklı sprintlerde daha düşük görünür. Hata, iki yaklaşım arasında gidip gelmektir; bu sprintleri karşılaştırılamaz hale getirir.",
    },
    {
      q: "Daha yüksek velocity ekibin geliştiği anlamına mı gelir?",
      a: "Her zaman değil. Ekip gerçekten daha fazla teslim ettiğinde velocity yükselir, ama tahminler şiştiğinde, Tamamlanma Tanımı gevşetildiğinde ya da sprintler uzadığında da yükselir. Yükselen bir çizgiyi gelişme olarak okumadan önce tahmin tutarlılığını ve teslim edilenin kalitesini kontrol et.",
    },
    {
      q: "Velocity ile kapasite arasındaki fark nedir?",
      a: "Velocity geçmişe dönük bir ölçümdür: ekibin sprint başına gerçekten tamamladığı puan. Kapasite ileriye dönük bir ölçümdür: yaklaşan belirli bir sprint için ayrılabilecek kişi ve gün sayısı. Velocity'yi temel olarak al; tatiller, nöbet (on-call) görevi ya da başka yokluklar önümüzdeki sprinti tipik bir sprintten farklı kılıyorsa kapasiteye göre ayarla.",
    },
  ],
};

export default tr;
