import type { Localized } from '../articleTypes';

const tr: Localized = {
  title: "Sprint Planlama Kontrol Listesi: Başarılı Bir Planlama Toplantısı İçin 12 Adım",
  subtitle: "Toplantıdan önce neler hazırlanmalı, toplantıda nelere karar verilmeli, sonrasında neler yazıya dökülmeli? Scrum ekipleri için adım adım bir sprint planlama kontrol listesi ve örnek bir oturum.",
  sections: [
    {
      title: "Sprint planlama nedir?",
      content: "Sprint planlama, her sprinti başlatan toplantıdır. Scrum ekibi önceliklendirilmiş product backlog'u inceler, bir sprint hedefi üzerinde anlaşır, bitirebileceğine inandığı backlog öğelerini seçer ve bunları nasıl teslim edeceğini planlar. Toplantının çıktısı sprint backlog'udur: hedef, seçilen öğeler ve işe dair ilk plan.",
      paragraphs: [
        "Scrum Guide, bir aylık sprint için sprint planlamaya en fazla sekiz saat süre tanır ve daha kısa sprintlerde bu etkinliğin genellikle daha kısa sürdüğünü belirtir. İki haftalık sprintlerle çalışan ekiplerin çoğu iki ila dört saatte bitirir. Toplantı üç soruyu yanıtlar: Bu sprint neden değerli? Ne yapılabilir? İş nasıl yapılacak? Aşağıdaki kontrol listesindeki her adım bu üç sorudan birine hizmet eder.",
      ],
    },
    {
      title: "Toplantı öncesi: 1–4. adımlar",
      content: "Hazırlık, planlama toplantısının kendisinde değil, önceki sprint boyunca yapılan backlog refinement çalışmalarında gerçekleşir. Aşağıdaki dört adım tamamlanmışsa planlama, bir keşif oturumu olmaktan çıkar ve bir karar oturumuna dönüşür.",
      items: [
        "1. Backlog'un en üstünü olgunlaştır. Product Owner ve geliştiriciler en yüksek öncelikli öğeleri konuşmuş olmalı; her öğenin net bir açıklaması ve test edilebilir kabul kriterleri bulunmalı, tek sprinte sığmayacak kadar büyük öğeler de bölünmüş olmalıdır.",
        "2. Aday öğeleri tahmin et. Sprinte girebilecek her öğenin, ekipçe üzerinde anlaşılmış bir story point tahmini olmalıdır. Hâlâ tahmin edilmemiş birkaç öğe varsa, bunları toplantının ortasında gelişigüzel tahmin etmek yerine planlamanın başına kısa bir tahmin turu koy.",
        "3. Velocity'ni ve kapasiteni bil. Son üç ila beş sprintin ortalamasını hesapla ve önümüzdeki sprintte kimlerin müsait olduğunu derle — izinler, eğitimler, nöbetler, yarı zamanlı çalışılan günler.",
        "4. Taslak bir sprint hedefi hazırla. Product Owner, bir iş sonucuna bağlı bir hedef önerisiyle gelir. Hedef toplantıda yeniden şekillenecektir, ancak bir taslakla başlamak tartışmayı odaklı tutar.",
      ],
    },
    {
      title: "5. adım: sprint hedefinde anlaş",
      content: "Toplantıya bir iş listesiyle değil, hedefle başla. Sprint hedefi, sprintin neyi başarması gerektiğini anlatan tek cümlelik bir ifadedir: “231–244 numaralı görevleri bitirmek” değil, “müşteriler kayıtlı kartla ödeme yapabilsin”. Hedef, ekibe birlikte çalışmak için bir neden ve ödünleşimler için bir dayanak verir: bir şeyler aksadığında ilk çıkarılacak öğeler, hedefe hizmet etmeyenlerdir.",
      paragraphs: [
        "İyi bir hedef, ulaşıp ulaşmadığını anlayabileceğin kadar somut, ekibin ona nasıl ulaşacağını seçebileceği kadar da geniştir. Önerilen öğeler birbiriyle ilgisiz üç hedefe hizmet ediyorsa ya birini seç ya da sprintin tek bir hedefi olmadığını kabul et ve bunun getirdiği odak kaybını göze al.",
      ],
    },
    {
      title: "6. adım: bu sprintin kapasitesini teyit et",
      content: "[Ekibinin velocity'si](/blog/agile-velocity), geçmişteki tipik bir sprintte ekibin ne teslim ettiğini gösterir. Kapasite ise önümüzdeki sprintin tipik olup olmadığını söyler. Tek bir öğe seçmeden önce ikisini karşılaştır.",
      paragraphs: [
        "Ortalama velocity'nin 30 puan, ekipteki geliştirici sayısının altı olduğunu varsayalım. Önümüzdeki sprintte bir geliştirici sprintin tamamında izinli, bir diğeri de sprintin yarısında yok. Kısacası ekip altı kişilik kapasitesinin bir buçuk kişilik kısmından, yani olağan kapasitesinin dörtte birinden yoksun. Bu durumda 30 yerine 22 ya da 23 puan civarında planlamak dürüst bir başlangıç noktasıdır. Sürüm günü, şirket etkinliği ya da yoğun bir nöbet dönemi gibi bilinen sprint dışı yükümlülükleri de kapasiteden düşmeyi unutma.",
      ],
    },
    {
      title: "7. ve 8. adımlar: backlog öğelerini seç ve doğrula",
      content: "Hedef ve kapasite netleştikten sonra, toplam puan kapasiteye yaklaşana kadar backlog'un en üstünden öğe çek. Sprint hafif görünse bile orada dur; sprint ortasında fazladan bir öğe almak, üç öğeyi sonraki sprinte devretmekten çok daha iyidir.",
      items: [
        "7. Hedefe hizmet eden öğeleri öncelik sırasıyla seç. Yüksek öncelikli bir öğeyi zahmetli diye atlamak varsayılan bir davranış olmamalıdır; bu, Product Owner'ın açıkça vermesi gereken bir karardır.",
        "8. Her öğeyi kabul etmeden önce doğrula: tek sprinte sığıyor mu, kabul kriterleri test edilebilir mi, diğer ekiplere ya da sistemlere bağımlılıkları çözülmüş ya da açıkça risk olarak kabul edilmiş mi, ekipte bu işi yapabilecek beceriye sahip biri var mı ve ihtiyaç duyduğu tasarım ya da mimari girdi hazır mı?",
      ],
      paragraphs: [
        "Kontrollerden herhangi birini geçemeyen öğe refinement'a geri döner. Onu “nasılsa çözeriz” diyerek sprinte almak, sprintlerin yarım kalmış işlerle bitmesinin en kestirme yoludur.",
      ],
    },
    {
      title: "9. adım: tahmini olmayan öğeleri tahmin et",
      content: "Bazı aday öğelerin tahmini yoksa, onlar için hemen kısa bir Planning Poker turu yap. Turu sıkı tut: öğeyi oku, netleştirici soruları sor, herkes kartını gizlice seçsin, kartlar aynı anda açılsın ve dağılım genişse en yüksek ve en düşük oyu verenler gerekçelerini anlatsın; [bir scrum poker oturumu nasıl yürütülür](/guide) rehberi her adımı tek tek gösterir. Her öğeye birkaç dakika ayır; o sürede tahmin edilemiyorsa öğe hazır değildir ve sprinte girmemelidir.",
      paragraphs: [
        "Kartların aynı anda açılması temel [scrum poker en iyi uygulamalarından](/blog/scrum-poker-best-practices) biridir, çünkü yüksek sesle söylenen ilk sayı herkesi kendine doğru çeker. Scrum Poker Online'da [ücretsiz bir planning poker odası açarak](/) bu turları kayıt gerektirmeden yürütebilirsin: tur açılana kadar oylar gizli kalır ve tur geçmişi her öğenin son oylarını saklar; bunları CSV olarak indirebilir ya da Markdown olarak kopyalayabilirsin. Hangi öğelerin ikinci bir oylama gerektirdiğini ise kendin not et; bu, bir sonraki refinement oturumu için faydalı bir sinyaldir.",
      ],
    },
    {
      title: "10. ve 11. adımlar: işi böl ve taahhüt ver",
      content: "Öğeler seçildikten sonra geliştiriciler bunları nasıl teslim edeceklerini planlar. Toplantının bu bölümü geliştiricilere aittir; Product Owner sorular için hazırda bekler ama teknik planı yönlendirmez.",
      items: [
        "10. En azından ilk birkaç öğeyi, bir günde ya da daha kısa sürede bitirilebilecek görevlere böl. Görevlere bölme, bir öğeyi değiştirmek için hâlâ zaman varken gizli karmaşıklıkları — bir veri taşıma (migration) işi, eksik bir API, belirsiz bir uç durum — sıklıkla ortaya çıkarır.",
        "11. Taahhüdü açıkça dile getir. Ekibe, seçilen öğeler ve bilinen kapasiteyle sprint hedefine ulaşılabileceğine inanıp inanmadığını doğrudan sor. Tereddütlü bir evet, aslında hayırdır; bir öğe çıkar.",
      ],
    },
    {
      title: "12. adım: toplantıdan sonra",
      content: "Toplantı kararlar üretir; sprint backlog'u bu kararları somutlaştırır. Toplantı bittikten sonraki bir saat içinde aşağıdakilerin tamamlanmış olması gerekir.",
      items: [
        "12. Sprint backlog'u yazıya dökülmüştür: sprint hedefi araçta ve ekibin kullandığı panoda görünür, seçilen öğeler tahminleriyle birlikte sprinte taşınmış, görevler kaydedilmiş, kapasite varsayımları not edilmiş ve toplantıda dile getirilen her risk ya da bağımlılık için bir sorumlu belirlenmiştir.",
        "Ekip ilk hangi öğeye başlayacağını bilir ve ideal olarak aynı gün işe başlamıştır.",
        "Refinement'a geri gönderilen her şey, bir sonraki sefere hazır olması için Product Owner'a bildirilmiştir.",
      ],
    },
    {
      title: "Örnek: iki saatlik bir planlama oturumu",
      content: "İki haftalık sprintlerle çalışan, ortalama velocity'si 28 puan olan, beş geliştiricili varsayımsal bir ekipte on iki adım pratikte şöyle görünür. Sayılar yalnızca örnek olsun diye seçilmiştir.",
      items: [
        "0:00–0:10 — Scrum Master kapasiteyi teyit eder. İki günlük bir konferansa katılacak bir geliştirici dışında herkes müsait; bu yüzden ekip 28 yerine yaklaşık 26 puan planlar.",
        "0:10–0:25 — Product Owner taslak hedefi (“yeni kullanıcılar destek talebi açmadan ilk kullanım adımlarını (onboarding) tamamlayabilsin”) ve olgunlaştırılmış ilk on iki öğeyi sunar. Ekip sorular sorar ve hedefin ifadesini netleştirir.",
        "0:25–0:40 — Üç öğenin tahmini yok. Hızlı bir Planning Poker turuyla bu öğeler 3, 5 ve 8 olarak boyutlandırılır; 8 için bir kez yeniden oylama yapılır.",
        "0:40–1:10 — Ekip öğeleri öncelik sırasıyla çeker: 5, 3, 8, 5 ve 3; toplam 24 puan. Sıradaki öğe 8 puanlıktır ve toplamı 32'ye çıkaracağı için backlog'da kalır; onun yerine daha aşağıdaki 1 puanlık bir öğe alınır ve sprint 25 puana ulaşır.",
        "1:10–1:50 — Geliştiriciler ilk dört öğeyi görevlere böler. 5 puanlık öğelerden birinin, başka bir ekibin henüz yayımlanmamış bir API'sine bağlı olduğu ortaya çıkar; bu öğe, backlog'un daha aşağısındaki başka bir 5 puanlık öğeyle değiştirilir ve sprint 25 puanda kalır.",
        "1:50–2:00 — Ekip taahhüdü teyit eder, sprint backlog'u araçta güncellenir ve hedef ekip kanalında paylaşılır.",
      ],
      paragraphs: [
        "Bu oturumda olağanüstü hiçbir şey yok; asıl mesele de bu. Refinement önceden yapıldığı için iki saat, tüm ekip bir aradayken her kararı vermeye yetti.",
      ],
    },
    {
      title: "Yaygın sprint planlama hataları",
      content: "Bu kalıplar, planlama toplantıları uzayan ya da sprintleri yarım kalmış işlerle biten ekiplerde tekrar tekrar görülür.",
      items: [
        "Toplantıda refinement yapmak. Ekip planlama sırasında kabul kriterleri yazıyorsa toplantı iki kat uzar ve tahminler el yordamıyla yapılır.",
        "Kapasiteye bakmadan velocity'ye göre planlamak. İki kişinin izinli olduğu bir sprint için otuz puan, plan değildir.",
        "Sprinti doldurmak. Velocity'yi bir tavan değil de tutturulması gereken bir kota olarak görmek, işlerin sürekli sonraki sprinte devredilmesine yol açar.",
        "Sprint hedefinin olmaması. Her öğe eşit derecede önemliyse, işler plandan saptığında ekip neyi çıkaracağına karar veremez.",
        "Tahminleri tek kişinin vermesi. Büyüklükleri kendisi ilan eden bir lider, çapa etkisiyle herkesi yönlendirir ve riski ortaya çıkaracak görüş ayrılıklarını gizler.",
        "Product Owner'ın bulunmaması ya da hazırlıksız gelmesi. Odada öncelikler ve yanıtlar yoksa ekip ya tahmin yürütür ya da bekler.",
        "Açık taahhüdü atlamak. Kimsenin onaylamadığı bir sprinti kimse sahiplenmez.",
      ],
    },
    {
      title: "Bu kontrol listesi ne zaman işe yarar, ne zaman ayak bağı olur?",
      content: "Kontrol listesi en çok, sprintleri düzenli olarak yarım kalmış işle biten, planlama toplantıları zaman sınırını aşan ya da kısa süre önce ekip üyeleri veya araçları değişen ekiplere fayda sağlar. Planlamayı, deneyimli tek bir kişinin hafızasına bağlı bir sohbet olmaktan çıkarıp tekrarlanabilir bir rutine dönüştürür.",
      paragraphs: [
        "Sürekli refinement yapan ve planlamayı otuz dakikada bitiren çok olgun ekipler için daha az yararlıdır; onlar için on iki adımı bir tören gibi uygulamak, yeni bir şey kazandırmadan yalnızca yük getirir. Adımları bir teşhis aracı olarak kullan: bir adım zaten karşılanıyorsa atla. Ve unutma: bir kontrol listesi kabul kriterlerinin var olduğunu doğrulayabilir, ama iyi olduklarını doğrulayamaz.",
      ],
    },
    {
      title: "Sprint planlama kontrol listesi: 12 adım tek sayfada",
      content: "On iki adım, ekip wiki'ne yapıştırabileceğin biçimde.",
      items: [
        "1. Backlog'un en üstündeki öğeler kabul kriterleriyle birlikte olgunlaştırılmış",
        "2. Aday öğeler tahmin edilmiş",
        "3. Velocity ve kapasite biliniyor",
        "4. Taslak sprint hedefi hazırlanmış",
        "5. Sprint hedefi üzerinde anlaşılmış",
        "6. Kapasite bu sprinte göre ayarlanmış",
        "7. Öğeler öncelik sırasıyla ve kapasite sınırları içinde seçilmiş",
        "8. Her öğe doğrulanmış: sprinte sığıyor, test edilebilir, bağımlılıklar ele alınmış, gerekli beceriler ekipte var",
        "9. Tahmini olmayan öğeler, kartların aynı anda açıldığı Planning Poker ile boyutlandırılmış",
        "10. İş, en fazla bir günlük görevlere bölünmüş",
        "11. Ekip hedefe açıkça taahhüt vermiş",
        "12. Sprint backlog'u yazıya dökülmüş ve paylaşılmış",
      ],
    },
  ],
  faq: [
    {
      q: "Sprint planlama ne kadar sürmeli?",
      a: "Scrum Guide, bir aylık sprint için en fazla sekiz saat öngörür; daha kısa sprintlerde bu etkinlik genellikle daha kısa sürer. İki haftalık sprintlerle çalışan ekipler genellikle iki ila dört saate ihtiyaç duyar. Toplantıların bundan uzun sürüyorsa nedeni neredeyse her zaman refinement'ın toplantıdan önce değil, toplantı sırasında yapılmasıdır.",
    },
    {
      q: "Sprint planlamaya kimler katılmalı?",
      a: "Tüm Scrum ekibi: Product Owner, geliştiriciler ve Scrum Master. Paydaşlar ya da konu uzmanları bağlam sağlamak için toplantının açılış bölümüne katılabilir, ancak öğe seçimi ve plan ekibe aittir. Product Owner mutlaka bulunmalıdır; odada öncelikler ve yanıtlar yoksa planlama tahmin yürütmekten öteye geçmez.",
    },
    {
      q: "Backlog refinement ile sprint planlama arasındaki fark nedir?",
      a: "Refinement, backlog öğelerini üzerinde çalışılmaya hazır hale getirmek için netleştirme, bölme ve tahmin etmeden oluşan sürekli bir çalışmadır. Sprint planlama ise ekibin önümüzdeki sprint için hazır öğeleri seçtiği ve bunları nasıl teslim edeceğini planladığı etkinliktir. Refinement menüyü hazırlar; planlama siparişi verir.",
    },
    {
      q: "Velocity'ye göre mi, kapasiteye göre mi planlamalıyız?",
      a: "İkisine göre de. Velocity sana temel değeri, yani ekibin genellikle ne kadar iş tamamladığını verir. Kapasite ise bu temeli izinleri, nöbetleri ve diğer devamsızlıkları hesaba katarak önümüzdeki sprinte göre ayarlar. Yalnızca velocity'ye göre planlamak önümüzdeki sprintin gerçeklerini, yalnızca kapasiteye göre planlamak ise ekibin geçmişini yok sayar.",
    },
    {
      q: "Ekip sprint hedefi üzerinde anlaşamazsa ne yapmalı?",
      a: "Bu genellikle backlog'un en üst kısmının odaklı olmadığını gösterir: birbiriyle ilgisiz birkaç sonuca hizmet eden öğeler içerir. Hangi sonucun öncelikli olduğuna Product Owner karar verir; hedef de bundan çıkar. Sprint gerçekten iki sonuca birden hizmet etmek zorundaysa birincil bir hedef belirle, ikincisini ise ek hedef olarak ele al; böylece ekip, zaman daraldığında neyi koruması gerektiğini bilir.",
    },
  ],
};

export default tr;
