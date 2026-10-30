import type { LandingContent } from '@/app/landingTypes';

const tr: LandingContent = {
  breadcrumb: "Fibonacci ile Planning Poker",
  title: "Fibonacci ile Planning Poker: kartlar, dizi ve kullanım rehberi",
  subtitle: "En popüler planning poker destesi tüm yönleriyle: sayılar ne anlama gelir, aralıklar neden büyür ve ekibinle bir turu nasıl yürütürsün?",
  sections: [
    {
      blocks: [
        { p: "**Fibonacci ile planning poker**, çevik ekiplerin kullanıcı hikayelerini tahmin etmek için en sık başvurduğu yöntemdir. Saat tahmin etmek yerine herkes kısa ve sabit bir diziden (0, 1, 2, 3, 5, 8, 13, 21 diye devam eden) bir kart seçer ve kartlar aynı anda açılır. Sonuç, tüm ekibin üzerinde anlaştığı, story point cinsinden göreli bir tahmindir. Bu rehberde dizinin kendisini, neden işe yaradığını, bir turun nasıl yürütüldüğünü ve bir hikaye büyük kartlara düştüğünde ne yapman gerektiğini bulacaksın. Tekniğe yeniysen önce [Planning Poker nedir?](/blog/what-is-planning-poker) yazısını oku, sonra buraya dön." },
      ],
    },
    {
      title: "Planning poker'da Fibonacci dizisi",
      blocks: [
        { p: "Matematikteki Fibonacci dizisi 0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55 diye ilerler; her sayı kendinden önceki iki sayının toplamıdır. Planning poker desteleri bu dizinin aritmetiğini değil, biçimini ödünç alır: tekrar eden 1 çıkarılır ve 13'ten sonra desteler birbirinden ayrılır:" },
        {
          ul: [
            "**Klasik Fibonacci:** `0, 1, 2, 3, 5, 8, 13, 21, 34, 55`. Scrum Poker Online'daki Fibonacci destesi budur; yanında ? ve ☕ kartları da bulunur.",
            "**Değiştirilmiş Fibonacci:** `0, ½, 1, 2, 3, 5, 8, 13, 20, 40, 100`. Büyük sayılar, kesin değerler değil kaba kümeler olduklarını vurgulamak için yuvarlanmıştır. Scrum Poker Online'daki Scrum destesi budur; yine ? ve ☕ kartlarıyla birlikte.",
            "**Kısa sürümler:** bazı ekipler 13'te ya da 21'de durur ve daha büyük her şeyi tahmin edilemeyecek kadar büyük sayar.",
          ],
        },
        { p: "Hangi sürümü kullandığın, onu tutarlı biçimde kullanmaktan çok daha az önemlidir. Bir yıldır 21, 34 ve 55 ile tahmin yapan bir ekip, bu sayıların ne anlama geldiğine dair ortak bir sezgi geliştirmiştir; 20, 40 ve 100'e geçmek bu kalibrasyonu sıfırlar. Farklı bir değer setine ihtiyacın varsa, 20 karta kadar (her biri en fazla 4 karakter) bir özel desteyle kendi değerlerini tanımlayabilirsin. Diğer standart desteler [planning poker kartları](/planning-poker-cards) sayfasında karşılaştırılıyor." },
      ],
    },
    {
      title: "Aralıklar neden büyür: belirsizlik büyüklükle artar",
      blocks: [
        { p: "Dizinin belirleyici özelliği, komşu kartlar arasındaki mesafenin sayılar büyüdükçe artmasıdır. 1 ile 2 arasındaki fark bir puan, 13 ile 21 arasındaki sekiz, 34 ile 55 arasındaki ise yirmi birdir. Bu bilinçli bir tercihtir ve tahminde Fibonacci'nin 1'den 10'a uzanan düz bir ölçeğe üstün gelmesinin başlıca nedenidir." },
        { p: "İnsanlar çok küçük bir işi küçük bir işten ayırt etmekte oldukça iyidir; büyük bir işi biraz daha büyük olandan ayırt etmekteyse çok daha kötüdür. Desten 20, 21, 22 ve 23'ü sunsaydı ekip, aslında kimsenin algılayamadığı farklar üzerine tartışır ve ortaya çıkan sayı hak etmediği bir kesinlik taşırdı. Deste yalnızca 13 ve 21'i sunarak daha kaba ama daha dürüst bir soru sorar: Bu iş 13'e mi daha yakın, 21'e mi? Bu sorunun cevabı verilebilir. “Bu 17 mi, 18 mi?” sorusununki ise verilemez. Küçük ve iyi anlaşılmış hikayeler için ince ayrımlı kartlar vardır; büyük hikayeler bilinmeyenler barındırdığı için onlara geniş aralıklı kartlar düşer." },
      ],
    },
    {
      title: "Fibonacci ile bir planning poker turu nasıl yürütülür?",
      blocks: [
        {
          ol: [
            "**Bir referans hikaye seç.** Ekibin 2 ya da 3 olduğunda hemfikir olduğu, teslim edilmiş bir hikaye seç. Diğer bütün tahminler buna göre yapılır.",
            "**Hikayeyi sun.** Product Owner hikayeyi ve kabul kriterlerini okur; ekip, kapsam netleşene kadar soru sorar.",
            "**Gizlice oy ver.** Her tahminci bir kart seçer. Online ortamda kartlar tur açılana kadar gizli kalır; böylece kimse ilk söylenen sayının çapa etkisine kapılmaz.",
            "**Oyları birlikte aç.** Tüm kartlar aynı anda çevrilir. Scrum Poker Online oy dağılımını, en düşük, medyan, ortalama ve en yüksek değeri, uzlaşı sağlanıp sağlanmadığını ve önerilen bir tahmini gösterir.",
            "**Uç değerleri konuş.** Biri 3, diğeri 13 verdiyse ikisi de nedenini açıklar. Bu fark neredeyse her zaman bir varsayımı ortaya çıkarır: eksik bir API, gözden kaçmış bir veri taşıma adımı ya da zaten var olan bir test altyapısı.",
            "**Gerekirse yeniden oyla.** Çoğu hikayede tahminler iki turda bir noktada buluşur. Buluşmazsa yüksek olan değeri al ya da hikayeyi böl. Ekip anlaştığında nihai tahmini kaydet ve sıradaki hikayeye geç.",
          ],
        },
        { p: "Her hikayeyi birkaç dakikayla sınırla; odadaki ortak zamanlayıcı (ileri ya da geri sayabilir) tartışmanın dağılmaması için var. Bölünmüş bir ekibi uzlaştırmak için [tahminde uzlaşı sağlama](/blog/estimation-consensus) yazısını oku." },
      ],
    },
    {
      title: "Fibonacci kartlarını story point'lere eşlemek",
      blocks: [
        { p: "Birim story point'tir; Fibonacci kartları ise izin verilen değerlerdir. 5 kartı “bir 1'in yaklaşık beş katı, bir 3'ün iki katından biraz az efor” anlamına gelir. Mutlak sayı tek başına bir şey ifade etmez: bir ekipte 5 olan iş başka bir ekipte 8 olabilir; puanların saate düzgünce çevrilememesinin nedeni de budur. Çevirme fikri aklına geliyorsa önce [story point mi, saat mi?](/blog/story-points-vs-hours) yazısını oku." },
        { p: "Kartların genellikle işaret ettiği anlamlar:" },
        {
          ul: [
            "**0**: önemsiz, zaten yapılmış ya da risksiz bir ayar değişikliği.",
            "**1 ile 2 arası**: küçük, iyi anlaşılmış, bilinmeyeni yok.",
            "**3 ile 5 arası**: kapsamı net, birkaç hareketli parçası olan tipik bir sprint hikayesi.",
            "**8**: büyük ama bir ya da iki kişi tarafından tek sprintte teslim edilebilir.",
            "**13**: çoğu ekibin tek bir sprint hikayesi olarak kabul ettiği üst sınır.",
            "**21 ve üzeri**: bir epic ya da büyük bilinmeyenleri olan bir hikaye. Genellikle bölme zamanının geldiğine işarettir.",
          ],
        },
      ],
    },
    {
      title: "? ve ☕ kartları",
      blocks: [
        { p: "Scrum Poker Online'daki her hazır deste sayısal olmayan iki kart içerir (özel deste yalnızca senin eklediğin kartları barındırır) ve bu kartlar göründüklerinden daha kullanışlıdır." },
        { p: "**?** kartı “Bunu henüz tahmin edemiyorum” demektir. Bu bir kaçamak değil, bir veridir. İki kişi ? oynarsa, ekip yeniden oylamadan önce hikayenin kapsamı konuşulmalıdır. ? oynamak, 8 deyip iyi bir sonuç ummaktan iyidir." },
        { p: "**☕** kartı “Molaya ihtiyacım var” demektir. İnsanlar yoruldukça tahminlerin kalitesi düşer; arka arkaya gelen birkaç kahve kartı, oturumun fazla uzadığının güvenilir bir işaretidir. Beş dakika ara ver, sonra devam et." },
      ],
    },
    {
      title: "Ne zaman 13'te ya da 21'de sınır koyup hikayeyi bölmeli?",
      blocks: [
        { p: "Birçok ekip, 13 veya üzeri tahmin edilen her şeyin sprinte girmeden önce bölünmesini kural haline getirir. Tahmin büyüdükçe belirsizlik aralığı genişler ve sonunda 34 çıkan bir 21, bütün bir sprinti batırabilir. Bölmek, bulanık tek bir sayıyı daha net birkaç sayıya dönüştürür." },
        { p: "Hikaye bölmenin pratik yolları:" },
        {
          ul: [
            "**İş akışı adımına göre:** “formu gönder” ile “incele ve onayla” ayrı hikayeler olur.",
            "**Veri çeşitliliğine göre:** önce yaygın durum, uç durumlar sonra.",
            "**Katmana göre:** önce API, sonra kullanıcı arayüzü.",
            "**Kabul kriterine göre:** her kriter ayrı bir hikaye olur.",
          ],
        },
        { p: "Sınırı 13'te mi 21'de mi koyacağın sprint uzunluğuna ve ekip büyüklüğüne bağlıdır; iki haftalık sprintlerle çalışan beş kişilik ekipler genellikle 13'te karar kılar. Bir kez karar ver, yazıya dök ve tutarlı biçimde uygula." },
      ],
    },
    {
      title: "Örnek tur",
      blocks: [
        { example: "Beş kişilik bir ekip “Kullanıcılar tur geçmişini CSV olarak dışa aktarabilsin” hikayesini tahmin ediyor. Açılan oylar 3, 5, 5, 8 ve 13: uzlaşı yok, oylar 3 ile 13 arasına dağılmış ve 6,8 ortalamaya en yakın kart olan 8 öneriliyor. 13 veren kişi, geçmiş tablosunda sayfalama olmadığını ve binlerce satırı dışa aktarmanın zaman aşımına uğrayacağını açıklıyor. 3 veren kişi ise dışa aktarmanın izleyiciler için de çalışması gerektiğini bilmiyormuş. Ekip, temel dışa aktarmanın 5 olduğunda anlaşıyor ve sayfalama için ayrı bir hikaye ekliyor. İkinci oylama 5, 5, 5, 5, 8: 5'i kabul edip devam etmeye yetecek kadar yakın." },
        { p: "Tekniğin bütünü bu: sayılar, başlattıkları konuşmadan daha az önemlidir." },
      ],
    },
  ],
  faqTitle: "Sıkça sorulan sorular",
  faq: [
    {
      q: "Neden doğrudan 1'den 10'a bir ölçek kullanılmıyor?",
      a: "Doğrusal bir ölçek, 7 ile 8'i birbirinden ayırt edebileceğini ima eder. Küçük bir görevden büyük her şey için bunu yapamazsın; bu yüzden ekip sahte bir kesinlik uğruna zaman kaybeder. Fibonacci'de aralıklar tahminle birlikte büyür ve belirsizliğin davranışıyla örtüşür.",
    },
    {
      q: "21 gerçek bir Fibonacci sayısı mı, yoksa 20 mi kullanmalıyım?",
      a: "İkisi de yaygın. 21 gerçek Fibonacci değeridir; 20, 40 ve 100 ise değiştirilmiş desteden (Scrum Poker Online'daki Scrum destesi) gelir ve kaba kümeler olduklarını vurgulamak için yuvarlanmıştır. Birini seç ve tutarlı kal.",
    },
    {
      q: "Oyların ortalamasını almalı mıyım?",
      a: "Otomatik olarak değil. 3 ile 13'ün ortalaması 8'dir, ama bu ortalama asıl önemli olan anlaşmazlığı gizler. Önce uç değerleri konuş; yeniden oylamadan sonra da ekip bölünmüş durumdaysa yüksek değeri tercih et ya da hikayeyi böl.",
    },
    {
      q: "Fibonacci kartlarını hatalar ve teknik borç için de kullanabilir miyim?",
      a: "Evet, diğer her şeyle aynı referans hikayeye göre tahmin edildikleri sürece. Birçok ekip 0'ı önemsiz hatalara ayırır, geri kalanını normal şekilde tahmin eder.",
    },
  ],
  ctaText: "Fibonacci kartlarıyla tahmine hazır mısın? Ücretsiz, oda başına 50 kişiye kadar, kayıt gerekmez.",
  ctaLabel: "Ücretsiz oda oluştur",
  relatedTitle: "Okumaya devam et",
  related: [
    { href: '/t-shirt-sizing', label: "Çevik ekiplerde T-Shirt boyutlandırma" },
    { href: '/planning-poker-cards', label: "Planning Poker kartları ve desteleri" },
    { href: '/guide', label: "Adım adım Scrum Poker oturumu nasıl yürütülür?" },
    { href: '/blog/fibonacci-vs-tshirt', label: "Fibonacci mi, T-Shirt boyutlandırma mı?" },
    { href: '/blog/story-points-vs-hours', label: "Story point mi, saat mi?" },
    { href: '/blog', label: "Blogdaki tüm yazılar" },
  ],
};

export default tr;
