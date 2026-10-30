import type { Localized } from '../articleTypes';

const tr: Localized = {
  title: 'En İyi Ücretsiz Scrum Poker Araçları: Nelere Bakmalı?',
  subtitle: 'Ücretsiz planning poker araçları için pratik bir seçim rehberi: önemli kriterler, mevcut araç kategorileri, seçmeden önce sorulacak sorular ve Scrum Poker Online\'ın bu kriterleri ne ölçüde karşıladığı.',
  sections: [
    {
      title: '"Ücretsiz" Neden Daha Yakından İncelenmeli?',
      content: 'Ücretsiz bir scrum poker aracı aradığında onlarca seçenekle karşılaşırsın ve çoğu kendini ücretsiz olarak tanıtır. Oysa "ücretsiz" geniş bir yelpazeyi kapsar: tamamen ücretsiz ürünler, katılımcı ya da oda sayısını sınırlayan ücretsiz planlar, süresi dolan denemeler ve kendi sunucunda barındırdığın açık kaynak projeler. Bunların hiçbiri kötü değildir; ancak on kişilik bir ekip perşembe sabahı tahmine oturduğunda onuncu kişinin yerinin, zamanlayıcının ya da dışa aktarmanın ücretli plana bağlı olduğunu fark ederse bu farklar önem kazanır.',
      paragraphs: [
        'Bu rehber, ürünleri her çeyrek değişen — ve bizim bağımsız olarak doğrulayamadığımız — özellik listelerine göre sıralamak yerine sana kalıcı bir kriter seti sunar. Bu kriterlerle, bu yazı yayımlandıktan sonra çıkacak olanlar da dahil, herhangi bir planning poker aracını yaklaşık on beş dakikada değerlendirebilirsin.',
        'Kısacası: tüm ekibinin hemen açabildiği, oyları açılışa kadar gizleyen, gerçekten kullandığın desteyi destekleyen ve sonuçları saklamana olanak tanıyan bir araç seç. Gerisi bonustur.',
      ],
    },
    {
      title: 'Scrum Poker Aracı Nedir, Gerçekten Gerekli mi?',
      content: 'Scrum poker (planning poker) aracı, tahmin oturumlarında kullanılan fiziksel kart destesinin yerini alır. Herkes ortak bir odaya katılır, kolaylaştırıcı bir kullanıcı hikayesi sunar, her katılımcı gizlice bir kart seçer ve tüm kartlar aynı anda açılır. Ardından araç dağılımı, çoğu zaman bir ortalama ya da önerilen tahminle birlikte gösterir; ekip tartışır ve gerekirse yeniden oylar.',
      paragraphs: [
        'Aynı ofiste çalışan ekipler fiziksel kartlarla idare edebilir. Uzaktan ve hibrit ekipler edemez: sohbete yazarak ya da sırayla mikrofonu açarak oy vermek, [planning poker tekniğinin](/blog/what-is-planning-poker) tam da ortadan kaldırmak için tasarlandığı sorunu, yani çapa etkisini geri getirir. Ekibinden biri bile sprint planlamaya video görüşmesiyle katılıyorsa, kurulumu birkaç dakika süren özel bir araç buna fazlasıyla değer.',
      ],
    },
    {
      title: 'Kriter Kontrol Listesi: Ücretsiz Bir Planning Poker Aracında Nelere Bakmalı?',
      content: 'Her aday aracı bu listeden geçir. İlk dört madde olmazsa olmazdır; gerisi ekibinin çalışma biçimine bağlıdır.',
      items: [
        'Katılımcılar için kayıt gerekmemesi. Misafirler bir bağlantı ya da oda koduyla ve bir görünen adla katılabilmelidir. Her geliştiricinin hesap açması gerekiyorsa ekibin aracı benimsemesi zorlaşır ve ilk oturum kurulumla geçer.',
        'Katılımcı sınırı. Ücretsiz planda bir odaya kaç kişinin girebildiğini ve bu sayının, Product Owner ve paydaşlar gibi izleyiciler dahil en kalabalık oturumuna yetip yetmediğini kontrol et.',
        'Deste türleri. Değiştirilmiş Fibonacci, varsayılan [planning poker kart değerleri](/planning-poker-cards) setidir, ancak birçok ekip T-shirt bedenleri, 2\'nin kuvvetleri ya da özel bir dizi kullanır. Yalnızca tek bir desteyi destekleyen bir araç, aracı ekibe uydurmak yerine ekibi araca uymaya zorlar.',
        'Gizli oylar ve eş zamanlı açılış. Bu, pazarlığa açık değildir. Tur açılana kadar oylar kimseye görünmemelidir.',
        'Uzlaşı ve önerilen tahmin. Açılıştan sonra araç dağılımı net biçimde göstermeli, ideal olarak uzlaşıyı vurgulamalı ya da bir değer önermelidir; böylece kolaylaştırıcı kafadan hesap yapmak zorunda kalmaz.',
        'Ekip sohbeti. Yan notlar ve görev bağlantıları için kullanışlıdır; böylece ses kanalı tartışmaya ayrılır.',
        'Hikaye kuyruğu. Bir hikaye listesi yükleyip sırayla ilerleyebilmek oturumun temposunu korur ve herkesin ne kadar iş kaldığını görmesini sağlar.',
        'Paylaşılan zamanlayıcı. Herkesin görebildiği, hikaye başına bir süre sınırı, oturumun uzamasını önlemenin en basit yollarından biridir.',
        'Tur geçmişi ve dışa aktarma. Önceki turları görebilmeli ve sonuçları CSV ya da benzeri bir biçimde backlog aracına veya sprint notlarına aktarabilmelisin.',
        'İzleyici modu. Product Owner\'ların, Scrum Master\'ların ve paydaşların kart tutmadan izleyebilmesi gerekir.',
        'Gizlilik ve veri işleme. Neyin, ne kadar süreyle ve nerede saklandığı. Süresi dolan ve kişisel veri gerektirmeyen odalar, regülasyona tabi ortamlarda daha kolay onay alır.',
        'Mobil destek. Bazı katılımcılar telefondan oy verecektir. Kart seçimi ve açılış, telefon ekranında yakınlaştırma gerektirmeden çalışmalıdır.',
        'Dil desteği. Uluslararası ekiplerde her üyenin kendi dilinde kullanabildiği bir arayüz, küçük ama gerçek bir sürtünmeyi ortadan kaldırır.',
        'Kendi sunucunda barındırma ve açık kaynak. Kuruluşun harici SaaS kullanamıyorsa, şirket içinde kurabileceğin açık kaynaklı bir araç tek uygulanabilir seçenek olabilir. Ayrıca aracın verilerinle tam olarak ne yaptığını incelemeni sağlar.',
        'Yükseltme baskısı ve bölünmeler. Tahmin sürecini açılır pencerelerle ya da tekrar tekrar çıkan yükseltme uyarılarıyla bölen ücretsiz bir araç, oturumu yavaşlatır ve ekibi bezdirir.',
      ],
    },
    {
      title: 'Planning Poker Aracı Kategorileri',
      content: 'Ücretsiz scrum poker araçları birkaç ana kategoriye ayrılır. Ekibine hangi kategorinin uyduğunu bilmek, aramayı hızla daraltır.',
      paragraphs: [
        'Tarayıcı tabanlı bağımsız araçlar en yaygın olanlardır. Bir web sitesinde çalışırlar, kurulum gerektirmezler ve genellikle misafirlerin bir bağlantıyla katılmasına izin verirler. Hemen tahmine başlamak isteyen ve tahminlerin bir iş takip sistemine otomatik olarak yazılmasına ihtiyaç duymayan ekiplere uygundurlar. Başlıca dezavantajları, tahminlerin backlog\'a elle aktarılması gerektiğidir; dışa aktarma ya da kopyalama özelliği bu yüzden önemlidir.',
        'Backlog aracı eklentileri ve entegrasyonları Jira, Azure DevOps veya benzeri sistemlerin içinde çalışır. Güçlü yanları, hikaye ile tahminin aynı yerde durmasıdır. Dezavantajları ise genellikle herkesin ana sistem için lisansa ve kullanıcı hesabına ihtiyaç duyması, kuruluş dışından izleyicileri dahil etmenin zorlaşması ve pazar yeri uygulamalarının ücretsiz planlarının sınırlı ya da süreli olabilmesidir. Karar vermeden önce kendi platformundaki koşulları kontrol et.',
        'Fiziksel kart desteleri, tamamen aynı ofiste çalışan ekipler için hâlâ işe yarar. Ucuzdur, kurulum gerektirmez ve gizlilikle ilgili hiçbir soru doğurmaz. Ancak hibrit ekiplerde işe yaramaz, geride geçmiş bırakmaz ve "açılış" kimsenin önceden bakmamasına dayanır.',
        'Kendi sunucunda barındırılan açık kaynaklı araçlar, verinin şirket ağında kalması gerektiğinde ya da ekip aracı özelleştirmek istediğinde iyi bir seçenektir. Bedeli operasyoneldir: birinin aracı kurması, güncellemesi ve çalışır durumda tutması gerekir.',
      ],
    },
    {
      title: 'Scrum Poker Online Kontrol Listesine Nasıl Uyuyor?',
      content: 'Scrum Poker Online (scrumpokerplay.com), ücretsiz ve tarayıcı tabanlı bir planning poker aracıdır. Yukarıdaki kriterler açısından sunduklarını, değerlendirdiğin diğer araçlarla karşılaştırabilmen için aşağıda açıkça sıraladık.',
      items: [
        'Ücretsiz ve kayıtsız: kolaylaştırıcı bir oda oluşturur, kodu ya da QR davetini paylaşır; katılımcılar bir görünen adla katılır. Hesap diye bir şey yoktur, ödenecek bir ücret de yoktur.',
        'Katılımcılar: izleyiciler dahil bir odada 50 kişiye kadar.',
        'Desteler: Scrum (0, ½, 1, 2, 3, 5, 8, 13, 20, 40, 100), Fibonacci, T-Shirt bedenleri, 2\'nin kuvvetleri ve özel desteler.',
        'Açılış: odadaki herhangi biri (ya da "Turu yalnızca oda sahibi yönetsin" ayarı açıksa yalnızca oda sahibi) turu açana kadar oylar gizli kalır; oylar 3 saniyelik bir geri sayımın ardından açılır. Sonuç ekranı dağılımı bir uzlaşı göstergesi ve önerilen tahminle birlikte gösterir.',
        'Oturum araçları: yerleşik ekip sohbeti, yapıştırarak ya da CSV dosyası içe aktararak doldurabileceğin bir hikaye kuyruğu (Jira veya tablo dışa aktarımları da olur), ileri ya da geri sayan paylaşılan zamanlayıcı, izleyici modu, emoji tepkileri ve henüz oy vermemiş bir ekip arkadaşını dürtme özelliği.',
        'Oda sahibi araçları: desteyi değiştirme, herkes oy verince otomatik açma, anonim oylama, turu yalnızca oda sahibinin yönetmesi, odayı yeni katılımcılara kapatma, kişileri çıkarma, oda sahipliğini devretme ve odayı saklama; böylece bağlantı, ayarlar ve hikaye kuyruğu bir sonraki sprintte de çalışır.',
        'Görev bağlantıları: oda sahibi iş takip aracının adresini girdiğinde PROJ-123 gibi görev anahtarları o araca bağlantı olur.',
        'Geçmiş: her hikayenin nihai tahminiyle birlikte tur geçmişi; görev anahtarı ve story point sütunlarıyla CSV dosyası olarak indirilebilir ya da Markdown olarak sprint notlarına kopyalanabilir.',
        'Mobil ve diller: telefon ekranında rahatça çalışır ve 7 dilde kullanılabilir.',
        'Gizlilik: hesap ya da e-posta adresi yoktur; oda içeriği son kişi ayrıldıktan yaklaşık bir saat sonra silinir, saklanan bir oda ise yalnızca kodunu, adını, destesini, ayarlarını, hikaye kuyruğunu ve nihai tahminleri tutar.',
      ],
      paragraphs: [
        'Yapmadıkları: tahminleri bir iş takip sistemine otomatik olarak geri yazmaz. Ekibin bu entegrasyona ihtiyaç duyuyorsa backlog aracına yönelik bir eklenti daha uygun olabilir; ya da ikisini birlikte kullanabilirsin: tahmini tarayıcıda yapar, CSV dosyasını indirip takip aracına aktarırsın. Ayrıca yalnızca canlı oturumlar için tasarlanmıştır: odalar gerçek zamanlı çalıştığından güne yayılan oylamalara uygun değildir.',
      ],
    },
    {
      title: 'Seçmeden Önce Sorulacak Sorular',
      content: 'Bu sorular, özellik listelerinin genellikle gizlediği kısıtları ortaya çıkarır. Deneme oturumuna geçmeden önce ekibinle birlikte yanıtla.',
      items: [
        '1. Oturumlarımıza kimler katılıyor? Geliştiricileri, Product Owner\'ı, Scrum Master\'ı ve düzenli katılan paydaşları say. Bu, ihtiyacın olan en düşük katılımcı sayısıdır.',
        '2. Hangi desteyi kullanıyoruz ve birinin farklı bir deste isteme ihtimali var mı? Hem hikayeleri hem hataları tahmin eden ekipler çoğu zaman iki deste kullanır.',
        '3. Herkes zaten bir sisteme giriş yapıyor mu? Ekip bütün gün tek bir backlog aracında çalışıyorsa eklenti doğal bir seçim olabilir; dışarıdan çalışanlar ya da iş ortağı ekipler de katılıyorsa kayıt gerektirmeyen bir araç daha kolaydır.',
        '4. Tahminlerin nereye kaydedilmesi gerekiyor? Yanıt "görev kayıtlarına" ise onları oraya aktarmanın ne kadar kolay olduğunu kontrol et.',
        '5. Veri ve gizlilik kurallarımız neler? Oda içeriğinin saklanıp saklanmadığını, ne kadar süre saklandığını ve sağlayıcının bunu sana gösterip gösteremeyeceğini sor.',
        '6. Asenkron yürüttüğümüz oturumlar var mı? Varsa odaların, farklı zaman dilimlerindeki kişilerin oy verebileceği kadar uzun süre açık kalması gerekir.',
        '7. Araç sorun çıkardığında ne olur? Oturumu kaybetmeden basit bir alternatife geçebildiğinden emin ol.',
      ],
    },
    {
      title: '15 Dakikalık Değerlendirme Oturumu',
      content: 'Araçları karşılaştırmanın en hızlı yolu, her birinde aynı şekilde [kısa bir scrum poker oturumu yürütmektir](/guide). Tanıtım sayfasına güvenme.',
      items: [
        'Bir oda oluştur ve biri telefondan olmak üzere üç kişinin bağlantıyla katılmasının ne kadar sürdüğünü ölç.',
        'Biri bilerek belirsiz bırakılmış üç hikayeyi kuyruğa yükle.',
        'İlk hikayeyi oyla, oyları aç ve açılıştan önce oyların hiçbirinin görünmediğini kontrol et.',
        'İkinci hikayede zamanlayıcıyı başlat ve herkesin aynı süreyi gördüğünü kontrol et.',
        'Belirsiz hikayede bir kişi "?" kartını seçsin; aracın bunu nasıl gösterdiğine bak.',
        'Bir izleyici ekle ve oy veremediğini doğrula.',
        'Sonuçları dışa aktar ya da kopyala ve backlog aracına yapıştır.',
        'Tarayıcıyı kapat, oda bağlantısını yeniden aç ve oturumun bıraktığın yerde durduğunu doğrula.',
      ],
    },
    {
      title: 'Ücretsiz Araç Seçerken Yapılan Yaygın Hatalar',
      content: 'Ekipler tahmin aracı seçerken hep aynı birkaç hatayı yapar. Adını koyduğunda bunlardan kaçınmak kolaydır.',
      items: [
        'Özellik sayısına göre seçmek. Kimsenin anlamadığı otuz özellikli bir araç, herkesin kullandığı sekiz özellikli bir araca kaybeder.',
        'Katılım deneyimini göz ardı etmek. Odaya katılmak bir dakikadan uzun sürüyorsa biri mutlaka sohbete sayı yazmaya döner.',
        'Telefonda test etmemek. Her oturumda en az bir katılımcı er ya da geç telefondan bağlanacaktır.',
        'Geçmişi unutmak. Dışa aktarma yoksa her oturum, birinin tahminleri elle yeniden yazmasıyla biter ve araya hatalar karışır.',
        'Ücretsiz planın kalıcı olduğunu varsaymak. Sağlayıcının iş modeli seni ücretli plana geçirmeye dayanıyorsa bu konuşmaya önceden hazırlan.',
        'Aracın süreci belirlemesine izin vermek. Araç, ekibinin tahmin yöntemini — gizli oy, tartışma, yeniden oylama — desteklemeli; onu farklı bir iş akışıyla değiştirmemelidir.',
      ],
    },
    {
      title: 'Sonuç',
      content: 'Her ekip için geçerli tek bir en iyi ücretsiz scrum poker aracı yoktur; ama senin ekibin için en iyi araç vardır: temel kriterleri karşılayan, gerçek çalışma biçimine uyan ve tüm ekibin hatırlatmaya gerek kalmadan açtığı araç. Kontrol listesini kullan, iki üç adayla 15 dakikalık değerlendirmeyi yap ve kararı ekibinle birlikte ver. Nereden başlayacağını bilmiyorsan: Scrum Poker Online ücretsizdir, kayıt gerektirmez ve yukarıdaki temel kriterleri karşılar. Ekibinle [ücretsiz bir oda aç](/) ve sana uyup uymadığını gör.',
    },
  ],
  faq: [
    {
      q: 'Kayıt gerektirmeyen, tamamen ücretsiz bir planning poker aracı var mı?',
      a: 'Evet. Tarayıcı tabanlı birçok araçta kolaylaştırıcı bir oda oluşturup bağlantıyı paylaşır, katılımcılar da yalnızca bir görünen adla katılır. Scrum Poker Online bunlardan biridir: ücretsizdir, hiç hesap sistemi yoktur ve tüm özellikler dahildir.',
    },
    {
      q: 'Scrum poker araçları ile planning poker araçları arasında ne fark var?',
      a: 'Pratikte hiçbir fark yoktur. "Planning poker" bu tahmin tekniğinin özgün adıdır; "scrum poker" ise birçok Scrum ekibinin kullandığı addır. Hangi adı kullanırsa kullansın bu araçlar aynı işi yapar: hikaye büyüklüğü için gizli oylama ve oyların aynı anda açılması.',
    },
    {
      q: 'Planning poker için Jira veya Azure DevOps entegrasyonu gerekli mi?',
      a: 'Yalnızca tahminlerin görev kayıtlarına otomatik olarak yazılması senin için önemliyse ve oturumdaki herkesin o sisteme zaten erişimi varsa. Birçok ekip bağımsız bir tarayıcı aracında tahmin yapar ve sonuçları sonradan backlog\'a kopyalar; bu bir dakika sürer ve oturumu misafirlere açık tutar.',
    },
    {
      q: 'Ücretsiz bir scrum poker odasına kaç kişi katılabilir?',
      a: 'Araca göre değişir; bu yüzden ücretsiz planın sınırlarını en kalabalık oturumunla karşılaştır. Scrum Poker Online, tek bir odada ücretsiz olarak 50 katılımcıya kadar izin verir; bu, izleyicilere de yer bırakarak çoğu Scrum ekibine yeter. Oda sahibi odayı saklayabilir; böylece aynı bağlantı ve ayarlar bir sonraki sprintte de çalışır.',
    },
    {
      q: 'Planning poker araçlarını farklı zaman dilimlerinde asenkron olarak kullanabilir miyiz?',
      a: 'Bazı araçlar bunu destekler; yeter ki odalar herkesin oy vermesine yetecek kadar açık kalsın ve kimse oyları erken açmasın. Scrum Poker Online ise canlı oturumlar için tasarlanmıştır: bağlantısı kopan kişiler yaklaşık 90 saniye sonra odadan çıkar, boş kalan oda da yaklaşık bir saat sonra silinir. Ekibin farklı zaman dilimlerine dağılmışsa kısa da olsa ortak bir zaman aralığı belirle ve hikayeleri önceden yazılı olarak hazırla.',
    },
  ],
};

export default tr;
