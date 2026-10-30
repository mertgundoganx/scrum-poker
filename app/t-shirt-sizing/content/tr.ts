import type { LandingContent } from '@/app/landingTypes';

const tr: LandingContent = {
  breadcrumb: "T-Shirt boyutlandırma",
  title: "Çevik ekiplerde T-Shirt boyutlandırma: pratik bir tahmin rehberi",
  subtitle: "Sayılar yerine XS, S, M, L ve XL ile tahmin et: ne zaman işe yarar, ne zaman yaramaz ve bir oturum nasıl yürütülür?",
  sections: [
    {
      blocks: [
        { p: "**T-Shirt boyutlandırma**, ekibin işlere sayı vermek yerine çok küçük, küçük, orta, büyük ya da çok büyük etiketi verdiği göreli bir tahmin tekniğidir. Hız ve rahatlık uğruna kesinlikten feragat eder: story point'ler üzerine bir ders dinlemeden neredeyse herkes “bu bir orta gibi duruyor” diyebilir. Çevik ekipler bu yöntemi erken aşama yol haritası planlamasında, epic'leri boyutlandırırken ve sayıların değdiğinden fazla tartışma doğuracağı her durumda kullanır. Bu rehber bedenleri, T-Shirt boyutlandırmanın sayısal destelerden ne zaman daha iyi olduğunu, gerekirse bedenleri puana nasıl çevireceğini ve ekibinle bir oturumu nasıl yürüteceğini anlatıyor." },
      ],
    },
    {
      title: "T-Shirt boyutlandırma nedir?",
      blocks: [
        { p: "Yöntem, herkesin bildiği giysi beden ölçeğini ödünç alır. Backlog'daki her öğeye bir beden verilir ve ekip öğeleri saatle ölçmek yerine birbiriyle karşılaştırır. “Büyük” belirli bir saat miktarı değildir; yalnızca “orta”dan büyük, “çok büyük”ten küçüktür. Etiketler kaba olduğu için ekip küçük farklar üzerine daha az, asıl önemli soru üzerine daha çok zaman harcar: Bu öğe bir öncekiyle kabaca aynı boyutta mı, yoksa açıkça daha mı büyük?" },
        { p: "T-Shirt boyutlandırma genellikle [planning poker](/blog/what-is-planning-poker) biçiminde yürütülür: gizli oylar, aynı anda açılış, uç değerlerin tartışılması; tek fark, sayısal kartların yerini beden kartlarının almasıdır. İşleyiş aynıdır; yalnızca kullanılan dil değişir." },
      ],
    },
    {
      title: "Bedenler: XS'ten XXL'e ve genişletilmiş deste",
      blocks: [
        { p: "Standart set beş ya da altı bedenden oluşur:" },
        {
          sizes: [
            { size: 'XS', desc: "Önemsiz. Bir metin değişikliği, bir ayar değişikliği, tek satırlık bir düzeltme." },
            { size: 'S', desc: "Küçük ve iyi anlaşılmış. Tek kişi için bir gün ya da daha az; sürpriz beklenmez." },
            { size: 'M', desc: "Tipik bir hikaye. Kapsamı net, birkaç hareketli parçası var, bir sprinte rahatça sığar." },
            { size: 'L', desc: "Büyük bir hikaye. Bir sprintte teslim edilebilir, ama muhtemelen birden fazla kişi ya da sprintin büyük kısmını gerektirir." },
            { size: 'XL', desc: "Çok büyük. Büyük ihtimalle kılık değiştirmiş bir epic; taahhüt vermeden önce bölmeye değer." },
            { size: 'XXL', desc: "Planlanamayacak kadar büyük. Kimsenin onu sorumlu bir şekilde boyutlandırabilmesi için önce keşif çalışması gerekir." },
          ],
        },
        { p: "Scrum Poker Online'daki T-Shirt destesi bunu `Z, T, XXS, XS, S, M, L, XL, XXL, XXXL` olarak genişletir; yanında ? ve ☕ kartları da bulunur. Z (zero, yani sıfır) zaten yapılmış ya da hiç iş gerektirmeyen öğeleri kapsar, T (tiny, yani minik) akla gelebilecek en küçük değişiklik için XXS'in altında yer alır, XXXL ise parçalara ayrılmadan tahmin etmenin anlamsız olduğu kadar büyük işleri işaretler. Çoğu ekip destenin yalnızca ortasını kullanır; uç değerler, kimse uymayan bir etiketi zorla seçmek zorunda kalmasın diye vardır. Daha kısa ya da farklı bir set istiyorsan, 20 karta kadar (her biri en fazla 4 karakter) bir özel deste bu işi görür. Tüm desteler [planning poker kartları](/planning-poker-cards) sayfasında karşılaştırılıyor." },
      ],
    },
    {
      title: "Göreli boyutlandırma sayılardan ne zaman daha iyidir?",
      blocks: [
        { p: "[Fibonacci](/fibonacci-planning-poker) gibi sayısal desteler sprint düzeyindeki işler için mükemmeldir. T-Shirt bedenleri ise üç durumda öne çıkar:" },
        {
          ul: [
            "**Erken aşama yol haritası planlaması.** Elinde elli aday özellik varsa ve hangisinin hangi çeyreğe denk gelebileceğini bilmen gerekiyorsa, onları bir öğleden sonrada S, M ya da L diye boyutlandırmak, zaten yanlış çıkacak story point'leri vermek için bir hafta harcamaktan çok daha faydalıdır.",
            "**Epic'ler ve büyük girişimler.** Büyük öğelerde, bir sayının anlam taşıyamayacağı kadar çok bilinmeyen vardır. “Bu epic bir XL” demek dürüsttür; “bu epic 89 puan” demek ise kimsenin sahip olmadığı bir kesinliğe sahipmiş gibi yapmaktır.",
            "**Mühendislik dışı ekipler.** Pazarlama, tasarım, operasyon ve içerik ekipleri story point'leri çoğu zaman yabancı bulur. Bedenler sezgiseldir, eğitim gerektirmez ve aynı faydayı sağlar: efora dair ortak ve göreli bir his.",
          ],
        },
        { p: "Bedenler tartışmaların ateşini de düşürür. Kimse bir hikayenin L değil M olduğu konusunda, 5 ile 8 arasında tartışırken olduğu kadar ısrarcı olmaz; bu yüzden uzlaşı genellikle daha hızlı gelir. Daha ayrıntılı bir karşılaştırma için [Fibonacci mi, T-Shirt boyutlandırma mı?](/blog/fibonacci-vs-tshirt) yazısına göz at." },
      ],
    },
    {
      title: "Bedenleri story point'e çevirmek (isteğe bağlı)",
      blocks: [
        { p: "Bazı ekipler T-Shirt bedenlerini velocity'ye ya da bir kapasite modeline dahil etmek ister ve bunun için sayılara ihtiyaç duyar. Yaygın bir eşleme, Fibonacci dağılımını yansıtan `XS=1, S=2, M=3, L=5, XL=8, XXL=13` eşlemesidir. Başka bir yaklaşım, her bedeni bir aralık olarak tanımlamaktır: S 1 ile 3 puan, M 5 ile 8, L 13 ile 21 arasıdır; daha büyük her şey tahminsiz bırakılır." },
        { p: "İki uyarı. Birincisi, bu adım isteğe bağlıdır. Birçok ekip hiç çevirme yapmaz ve bundan kazançlı çıkar, çünkü bedenler sayıya dönüştüğü anda insanlar onları taahhüt gibi görmeye başlar. İkincisi, hangi eşlemeyi seçersen seç, üzerinde oturumdan sonra değil önce anlaşılmalıdır; yoksa tahminler, planı en iyi gösteren eşlemeye doğru kayar. Her hikayede çevirme yapıyorsan, muhtemelen en baştan sayısal bir deste istiyorsundur. Çevirme aslında saate ulaşma çabasıysa, daha ileri gitmeden [story point mi, saat mi?](/blog/story-points-vs-hours) yazısını oku." },
      ],
    },
    {
      title: "T-Shirt boyutlandırma oturumu nasıl yürütülür?",
      blocks: [
        {
          ol: [
            "**Referans öğeleri belirle.** Ekibin S olduğunda hemfikir olduğu bir hikaye ve L olduğunda hemfikir olduğu bir hikaye seç. Diğer her şey bu ikisine göre boyutlandırılır.",
            "**Listeyi kısa tut.** Boyutlandırma, her biri tek cümlelik bir açıklamaya sahip on ila otuz öğelik gruplarla en iyi sonucu verir. Öğeleri hikaye kuyruğuna yapıştır ya da bir CSV veya Jira dışa aktarımını içe aktar; böylece kolaylaştırıcı bir tabloda kaydırıp durmadan öğeler arasında ilerleyebilir.",
            "**Gizlice oy ver, oyları birlikte aç.** Her katılımcı bir beden kartı seçer; kartlar tur açılana kadar gizli kalır. Bu, odadaki en kıdemli sesin herkes adına bedeni belirlemesini önler.",
            "**Yalnızca gerçek anlaşmazlıkları tartış.** Bir S'nin yanındaki M tartışmaya değmez. Bir S'nin yanındaki XL ise değer: bu iki kişiden biri, diğerinin bilmediği bir şeyi biliyor.",
            "**Kaydet ve devam et.** Her öğe için nihai bedeni kaydet; tur geçmişi CSV olarak indirilebilir ya da Markdown olarak kopyalanabilir. Böylece bedenler, kimse elle aktarmak zorunda kalmadan backlog aracına ulaşır.",
          ],
        },
        { p: "Otuz öğelik bir oturum genellikle bir saatten kısa sürer. Daha uzun sürüyorsa sorun büyük ihtimalle ekibin yavaşlığı değil, öğelerin belirsizliğidir." },
      ],
    },
    {
      title: "Sık yapılan hatalar",
      blocks: [
        {
          ul: [
            "**Bedenleri süre gibi görmek.** “M üç gün demektir” demek, göreli boyutlandırmayı sessizce fazladan adımları olan bir saat tahminine dönüştürür. Bedenler takvim değil, karşılaştırmadır.",
            "**Çok fazla beden kullanmak.** Ekip her öğede XS mi S mi diye kıvranıyorsa XS'i hiç kullanmamayı kararlaştır. Daha az seçenek, daha hızlı karar demektir.",
            "**Referans öğeleri atlamak.** Üzerinde anlaşılmış bir S ve L olmadan “orta” herkes için başka bir anlama gelir ve sonuçlar gürültüden ibaret kalır.",
            "**Tek başına boyutlandırmak.** Bir backlog'u tek bir kişinin boyutlandırması, yalnızca o kişinin varsayımlarını üretir. Asıl değer, birkaç kişi arasındaki anlaşmazlıktan doğar.",
            "**Hiç yeniden ele almamak.** Yol haritası planlaması sırasında verilen bir beden, o anın fotoğrafıdır. Öğe gerçekten bir sprinte girmeden önce, daha çok şey bilindiğinde onu yeniden boyutlandır.",
          ],
        },
      ],
    },
    {
      title: "Örnek oturum",
      blocks: [
        { example: "Bir ürün ekibi gelecek çeyreği planlıyor ve on iki aday özelliği var. Hikaye kuyruğu üzerinden çalışarak hepsini kırk dakikada boyutlandırıyorlar. Dokuzunda hemen uzlaşıya varılıyor. “Self-servis faturalandırma” L ile XXL arasında bölünüyor; XXL veren kişi, bunun kimsenin kapsamını çıkarmadığı bir vergi hesaplama entegrasyonu gerektirdiğine dikkat çekiyor. Ekip öğeyi XL olarak kaydediyor ve bir keşif görevi ekliyor. “Koyu tema” S ile L arasında bölünüyor; L veren kişi, grafik kütüphanesinin renkleri koda gömülü tuttuğunu hatırlıyor. Öğe sonunda M oluyor. Ekip toplantıdan boyutlandırılmış bir liste ve yeni fark edilmiş iki riskle çıkıyor; bir şeyin 5 mi 8 mi olduğuna dair tek bir tartışma bile yaşanmadan." },
      ],
    },
  ],
  faqTitle: "Sıkça sorulan sorular",
  faq: [
    {
      q: "T-Shirt boyutlandırma ile story point aynı şey mi?",
      a: "Hayır. Story point'ler sayısaldır ve velocity'yi besler; bedenler ise sıralı etiketlerdir. Bedenleri puanlarla eşleyebilirsin, ama bu eşleme bir ölçüm değil, ekibin üzerinde anlaştığı bir kuraldır.",
    },
    {
      q: "Kaç beden kullanmalıyız?",
      a: "Beş, iyi bir varsayılandır (XS'ten XL'e). Planlanamayacak kadar büyük öğelerle sık karşılaşıyorsan XXL ekle; ekip XS'i nadiren kullanıyorsa onu çıkar. Genişletilmiş deste, bu kararı en baştan vermek zorunda kalmaman için var.",
    },
    {
      q: "T-Shirt boyutlandırmayı sprint planlamasında kullanabilir miyiz?",
      a: "Evet, ama çoğu ekip sprint düzeyindeki hikayeler için sayısal bir desteye geçer, çünkü bu velocity'yi izlemeyi kolaylaştırır. Yol haritası ve epic'ler için bedenleri, hikayeler netleştirildikten sonra da Fibonacci'yi kullan.",
    },
    {
      q: "Ekip bir beden üzerinde anlaşamazsa ne olur?",
      a: "İki uç değeri konuş, ardından bir kez yeniden oyla. Oylar hâlâ bölünmüşse büyük olan bedeni al, çünkü eksik tahmin genellikle fazla tahminden daha çok can yakar; belirsizliği de öğenin yanına not et.",
    },
  ],
  ctaText: "Backlog'unu T-Shirt destesiyle boyutlandır. Ücretsiz, kayıt gerekmez, oda başına 50 katılımcıya kadar.",
  ctaLabel: "Ücretsiz oda oluştur",
  relatedTitle: "Okumaya devam et",
  related: [
    { href: '/fibonacci-planning-poker', label: "Fibonacci ile Planning Poker" },
    { href: '/planning-poker-cards', label: "Planning Poker kartları ve desteleri" },
    { href: '/guide', label: "Adım adım Scrum Poker oturumu nasıl yürütülür?" },
    { href: '/blog/estimation-consensus', label: "Planning Poker'da tahminde uzlaşı" },
    { href: '/blog/story-points-vs-hours', label: "Story point mi, saat mi?" },
    { href: '/blog', label: "Blogdaki tüm yazılar" },
  ],
};

export default tr;
