import type { LandingContent } from '@/app/landingTypes';

const tr: LandingContent = {
  breadcrumb: "Planning Poker kartları",
  title: "Planning Poker kartları: değerler, desteler, basılı ve online kartlar",
  subtitle: "Kartların üzerinde ne yazar, ekiplerin kullandığı standart desteler hangileridir, ? ve ☕ gibi kartlar ne anlama gelir ve fiziksel kartlar online bir desteyle nasıl karşılaştırılır?",
  sections: [
    {
      blocks: [
        { p: "**Planning poker kartları** aracın ta kendisidir: her tahmincinin elinde tuttuğu, içinden gizlice seçim yaptığı ve herkesle aynı anda açtığı küçük bir değer destesi. Değerler, ekibin sahip olmadığı bir kesinliğe sahipmiş gibi yapmadan göreli eforu ifade edebileceği şekilde seçilmiştir. Bu sayfa kartların üzerinde ne olduğunu, standart desteleri, ? ve ☕ gibi kartların anlamını, fiziksel ve online kartlar arasındaki farkları ve ekibin için nasıl deste seçeceğini anlatıyor." },
      ],
    },
    {
      title: "Bir planning poker kartında ne yazar?",
      blocks: [
        { p: "Her kartta tek bir değer bulunur. Sayısal bir destede bu bir story point sayısıdır; T-Shirt destesinde ise bir beden etiketi. Fiziksel bir destede herkesin bağımsız oy verebilmesi için her katılımcıya eksiksiz bir kart takımı verilir; yani sekiz kişilik bir ekibe sekiz takım gerekir. Online bir odada deste ekranda gösterilir ve her katılımcı bir karta dokunur; kartları gizleme ve açma işini oda halleder." },
        { p: "Kartın üzerinde olmayan şey ise birimdir. 5 beş saat ya da beş gün değildir; bir 1'in beş katıdır ve 1, ekibin en küçük referans hikaye olarak kullanmaya karar verdiği iş neyse odur. Göreli tahminin bütün amacı budur ve aynı destenin, velocity'leri birbirinden çok farklı ekiplerde de işe yaramasının nedeni de budur. Bu ayrım sana yeni geliyorsa [Planning Poker nedir?](/blog/what-is-planning-poker) ve [story point mi, saat mi?](/blog/story-points-vs-hours) yazıları konuyu ayrıntılı ele alıyor." },
      ],
    },
    {
      title: "Standart planning poker desteleri",
      blocks: [
        { p: "Birkaç deste neredeyse her ekibin ihtiyacını karşılar. Scrum Poker Online; Scrum, Fibonacci, T-Shirt ve 2'nin kuvvetleri destelerini hazır sunar ve kendi desteni oluşturmana da izin verir." },
        {
          decks: [
            {
              title: "Scrum (değiştirilmiş Fibonacci)",
              cards: '0, ½, 1, 2, 3, 5, 8, 13, 20, 40, 100, ?, ☕',
              desc: "13'e kadar Fibonacci, sonrasında büyük tahminlerin ölçüm değil kaba kümeler olduğunu vurgulayan yuvarlanmış değerler; ayrıca önemsiz işler için yarım puanlık bir kart. Çoğu basılı kart setinde bu değerler bulunur.",
            },
            {
              title: "Fibonacci",
              cards: '0, 1, 2, 3, 5, 8, 13, 21, 34, 55, ?, ☕',
              desc: "Klasik dizi. Aralıklar sayılarla birlikte büyür; böylece büyük hikayeler kaba, küçük hikayeler ince ayrımla tahmin edilir. [Fibonacci ile Planning Poker rehberinin](/fibonacci-planning-poker) tamamını oku.",
            },
            {
              title: "T-Shirt bedenleri",
              cards: 'Z, T, XXS, XS, S, M, L, XL, XXL, XXXL, ?, ☕',
              desc: "Sayılar yerine göreli etiketler. Klasik set XS'ten XXL'e uzanır; bizim destemiz uçlara Z (sıfır), T (minik), XXS ve XXXL ekler. Yol haritaları, epic'ler ve mühendislik dışı ekipler için idealdir. [T-Shirt boyutlandırma rehberine](/t-shirt-sizing) göz at.",
            },
            {
              title: "2'nin kuvvetleri",
              cards: '0, 1, 2, 4, 8, 16, 32, 64, 128, ?, ☕',
              desc: "Her kart bir öncekinin iki katıdır. Aralıklar Fibonacci'dekinden geniştir; bu da ekipleri hikayeleri daha erken bölmeye iter ve belirsizliği yüksek işlere uyar.",
            },
            {
              title: "Özel deste",
              cards: "2 ila 20 kart, her biri en fazla 4 karakter",
              desc: "1'den 5'e bir ölçek, küçük / orta / büyük şeklinde üç kartlık bir set, kurumun ısrar ediyorsa saat temelli bir deste ya da sürecinin ihtiyaç duyduğu başka her şey için kullan.",
            },
          ],
        },
      ],
    },
    {
      title: "Özel anlamlı kartlar",
      blocks: [
        { p: "Scrum Poker Online'daki her hazır deste sayısal olmayan iki kart içerir (özel deste yalnızca senin eklediğin kartları barındırır); birçok fiziksel destede de üçüncü bir kart bulunur." },
        {
          ul: [
            "**?** “Bunu tahmin edemiyorum” demektir. Ya bilgi yetersizdir ya da hikaye belirsizdir. Birkaç kişi bu kartı oynarsa oylamayı durdur ve kapsamı netleştir. Destedeki en değerli kart budur: sessiz kafa karışıklığını görünür bir sinyale dönüştürür.",
            "**☕** “Molaya ihtiyacım var” demektir. İnsanlar yorulduğunda tahminlerin kalitesi hızla düşer. Kahve kartı, oturumun yeterince uzadığını söylemenin kibar bir yoludur.",
            "**∞ ya da “çok büyük”** kartı birçok basılı destede yer alır ve hikayenin ölçeğin tepesini aştığını, bölünmesi gerektiğini anlatır. Online ortamda aynı mesaj en yüksek kartı oynayarak ya da ? oynayıp nedenini söyleyerek verilir.",
          ],
        },
        { p: "Scrum destesi gibi bazı destelerde ayrıca 0 ve ½ kartları da bulunur. Sıfır “iş yok” ya da “zaten yapıldı” anlamına gelir; yarım kart ise 1'in bile fazla kaçacağı kadar küçük görevler içindir. Bunları kullanıp kullanmamak ekibin kendi tercihidir." },
      ],
    },
    {
      title: "Fiziksel kartlar ve online kartlar",
      blocks: [
        { p: "Basılı desteler ilk çıkan biçimdir ve aynı odayı paylaşan ekipler için hâlâ iyi çalışır. Karşılaştırma çoğunlukla lojistikle ilgilidir." },
        {
          compare: [
            {
              title: "Fiziksel kartlar",
              items: [
                "Herkesin bir desteye ihtiyacı vardır ve desteler kaybolur. On kişilik bir ekip masada on eksiksiz takım ister.",
                "Açılış disiplini elle sağlanır. Biri geri sayar ve insanlar arada bir göz ucuyla bakar.",
                "Hiçbir şey kaydedilmez. Sonuçlar sonradan bir beyaz tahtaya yazılır ya da bir takip aracına girilir.",
                "Uzaktan katılım yoktur. Hibrit bir ekipte bir kişi sonunda sohbet mesajıyla oy verir.",
              ],
            },
            {
              title: "Online kartlar",
              items: [
                "Açılana kadar gizli. Oylar, tur açılana kadar kolaylaştırıcı dahil herkese görünmezdir.",
                "Uzaktan ve hibrit ekipler için uygundur. Bir bağlantı paylaşman ya da QR kodu okutman yeterli; bütün ekip aynı odada buluşur.",
                "Otomatik analiz: kartlar çevrildiği anda oy dağılımı, en düşük, medyan, ortalama ve en yüksek değer, uzlaşı tespiti ve önerilen bir tahmin.",
                "Geçmiş. Biten her tur nihai tahminiyle birlikte saklanır; geçmiş CSV olarak indirilebilir ya da backlog aracın için Markdown olarak kopyalanabilir.",
                "Kağıdın yapamadığı ekstralar: CSV ya da Jira dışa aktarımını içe aktaran bir hikaye kuyruğu, ortak zamanlayıcı, izleyici modu, ekip sohbeti ve henüz oy vermemiş birini dürtme.",
              ],
            },
          ],
        },
        { p: "Basılabilir kartlar istiyorsan yukarıdaki değerler ihtiyacın olan her şey: her değeri kart boyutunda bir kağıda bas, kişi başına bir takım. Arada bir yapılan yüz yüze oturumların ötesindeki her durumda online bir deste angarya işleri ortadan kaldırır ve odağı tekniğin asıl değerinin bulunduğu yerde, yani tartışmada tutar. [Scrum Poker rehberimiz](/guide) eksiksiz bir online oturumu adım adım anlatıyor." },
      ],
    },
    {
      title: "Deste nasıl seçilir?",
      blocks: [
        { p: "Kendine üç soru sor:" },
        {
          ol: [
            "**Neyi tahmin ediyorsun?** Sprint hikayeleri: Scrum ya da Fibonacci. Epic'ler, yol haritası öğeleri ya da bir sprintten daha uzaktaki her şey: T-Shirt bedenleri. Erken bölmeyi teşvik etmek istediğin, belirsizliği yüksek işler: 2'nin kuvvetleri.",
            "**Kim oy veriyor?** Story point'lere alışkın mühendisler sayılarla rahattır. Karma ya da teknik olmayan gruplar genellikle bedenleri tercih eder.",
            "**Takip aracın ne bekliyor?** Velocity puan olarak izleniyorsa sayısal bir deste kullan ya da oturumdan önce bedenlerin puanlara nasıl eşleneceği üzerinde anlaş.",
          ],
        },
        { p: "Ne seçersen seç, nadiren değiştir. Bir tahmin ölçeğinin değeri, ekibin zamanla onun hakkında edindiği sezgiden gelir ve her değişiklik bu sezgiyi sıfırlar. Scrum Poker Online'da bir oda oluştururken destesini seçersin; oda sahibi desteyi turlar arasında değiştirebilir, her katılımcının ekranında her zaman aynı deste görünür ve odayı saklayan ve gizli sahip bağlantısını elinde tutan oda sahibi bir sonraki sefer aynı desteyi ve ayarları bulur. Ekibin oylar açıldıktan sonra sık sık anlaşamıyorsa sorun nadiren destededir; çoğu zaman işe yarayan yöntemler için [tahminde uzlaşı sağlama](/blog/estimation-consensus) yazısına göz at." },
      ],
    },
  ],
  faqTitle: "Sıkça sorulan sorular",
  faq: [
    {
      q: "Bir planning poker destesinde kaç kart vardır?",
      a: "Genellikle on bir ile on üç arası. Fibonacci destesinde on iki kart vardır: on sayısal değer, artı ? ve ☕. Scrum destesinde on üç, T-Shirt destesinde on iki, 2'nin kuvvetleri destesinde on bir kart bulunur. Scrum Poker Online'daki özel desteler 20 karta kadar kart içerebilir.",
    },
    {
      q: "Kendi planning poker kartlarımı basabilir miyim?",
      a: "Evet. Bu sayfadaki değer setlerinden herhangi biri işini görür; her katılımcı için kart boyutunda kağıda eksiksiz bir takım bas. Uzaktan ya da hibrit ekipler için online bir oda kurmak daha hızlıdır ve tur geçmişini senin yerine saklar.",
    },
    {
      q: "Kahve kartı ne anlama gelir?",
      a: "“Molaya ihtiyacım var” demektir. Konuşan kişinin sözünü kesmeden yorgunluğu belirtmenin zahmetsiz bir yoludur; arka arkaya gelen birkaç kahve kartı, oturuma ara vermek için iyi bir işarettir.",
    },
    {
      q: "Yeni bir Scrum ekibi hangi desteyle başlamalı?",
      a: "Scrum ya da Fibonacci. İkisi de geniş çapta belgelenmiştir, doğrudan story point'lere karşılık gelir ve çoğu eğitim içeriği bunlardan birini varsayar. T-Shirt bedenlerine ancak sayılar çözdüğünden fazla tartışmaya yol açıyorsa geç.",
    },
  ],
  ctaText: "Baskıyla uğraşma. Bir deste seç, bağlantıyı paylaş ve ekibin saniyeler içinde tahmine başlasın. Ücretsiz, kayıt gerekmez.",
  ctaLabel: "Ücretsiz oda oluştur",
  relatedTitle: "Okumaya devam et",
  related: [
    { href: '/fibonacci-planning-poker', label: "Fibonacci ile Planning Poker" },
    { href: '/t-shirt-sizing', label: "Çevik ekiplerde T-Shirt boyutlandırma" },
    { href: '/guide', label: "Adım adım Scrum Poker oturumu nasıl yürütülür?" },
    { href: '/blog/fibonacci-vs-tshirt', label: "Fibonacci mi, T-Shirt boyutlandırma mı?" },
    { href: '/blog/what-is-planning-poker', label: "Planning Poker nedir?" },
    { href: '/blog', label: "Blogdaki tüm yazılar" },
  ],
};

export default tr;
