import type { Localized } from '../articleTypes';

const tr: Localized = {
  title: 'Daha İyi Tahminler İçin Scrum Poker\'de 10 En İyi Uygulama',
  subtitle: 'Planning poker oturumlarını daha hızlı, daha tutarlı ve sprint planlama için daha faydalı hale getiren pratik teknikler — gerçekçi örnekler ve sık sorulan sorularla.',
  sections: [
    {
      title: 'Scrum Poker Nedir ve En İyi Uygulamalar Neden Önemlidir?',
      content: 'Scrum poker — planning poker olarak da bilinir — uzlaşıya dayalı bir tahmin tekniğidir. Her ekip üyesinin elinde bir kart destesi bulunur (genellikle değiştirilmiş Fibonacci dizisi: 0, 1, 2, 3, 5, 8, 13, 20, 40, 100). Product Owner bir kullanıcı hikayesini sunar, herkes gizlice bir kart seçer ve tüm kartlar aynı anda açılır. Tahminler uyuşuyorsa bir sonrakine geçilir. Farklıysa ekip nedenini tartışır ve yeniden oylar.',
      paragraphs: [
        'İşleyişi basittir, ancak çıktının kalitesi neredeyse tamamen [oturumun nasıl yürütüldüğüne](/guide) bağlıdır. Kartları tek tek açan, saatler üzerinden tartışan ve sayıyı en yüksek sesle konuşan mühendise bırakan bir ekip, planning poker\'i hiç kullanmamış bir ekipten daha kötü tahminler üretir — üstelik daha uzun sürede. Aşağıdaki uygulamalar, ekip ister aynı odada otursun ister tarayıcı üzerinden oy versin, gerçek sprint planlama oturumlarında tutarlı biçimde işe yarayan yöntemlerden derlenmiştir.',
        'Bu yazıyı bir kontrol listesi olarak kullan. Ekibinin henüz uygulamadığı iki üç yöntemi seç, birkaç sprint boyunca dene ve neyin değiştiğini gözlemle.',
      ],
    },
    {
      title: '1. Saati Değil, Karmaşıklığı ve Çabayı Tahmin Et',
      content: 'Story point göreli büyüklüğü ifade eder: bir hikayenin diğer hikayelere kıyasla ne kadar iş, karmaşıklık ve belirsizlik taşıdığını. 5, "beş saat" değil, kabaca "3\'ün iki katından biraz az" demektir. Bu ayrım geri kalan her şeyin temelidir; çünkü göreli tahmin, ekibin her hikayenin tam olarak ne kadar süreceğini biliyormuş gibi yapmadan hikayeleri hızla karşılaştırmasını sağlar.',
      paragraphs: [
        'Biri "Bu yaklaşık iki gün, o yüzden 5" dediğinde nazikçe yönlendir: "Geçen sprintte yaptığımız dışa aktarma özelliğiyle kıyaslarsak bu daha mı büyük, daha mı küçük?" Takvim süresini referans almak; kişisel hız, toplantılar ve kesintiler gibi hikayenin kendisiyle hiç ilgisi olmayan etkenleri işin içine katar. Üstelik ekibin yapısı değiştiğinde puanlar sabit kalır; saatler kalmaz.',
        'Pratik bir test: farklı deneyim seviyelerindeki iki geliştirici bir hikayeye aynı puanı verip saat tahminlerinde ayrışıyorsa, ekip puan mantığını doğru kavramış demektir.',
      ],
    },
    {
      title: '2. Bir Referans Hikaye Listesi Tut',
      content: 'Göreli tahmin ancak herkes aynı temele göre kıyaslarsa işe yarar. Tamamlanmış ve iyi anlaşılmış birkaç hikaye seçip bir ölçeğe sabitle: "Şifre sıfırlama e-postası 2\'ydi. Filtreli CSV dışa aktarma 5\'ti. Ödeme sağlayıcısı geçişi 13\'tü." Bu listeyi her oturumda görünür tut.',
      paragraphs: [
        'Referans hikayeler iki yaygın sorunu çözer. Yeni ekip üyeleri, bu ekipte 3\'ün ne anlama geldiğini tahmin etmeye çalışmak yerine hızla kalibre olur. Puan enflasyonu — yani 3\'ün zamanla eskiden 5 olan şeye dönüşmesi — daha kolay fark edilir, çünkü ekip sürekli aynı örneklere göre kontrol eder.',
        'Referans listesini birkaç ayda bir yenile. Kod tabanı ya da ekip ciddi biçimde değiştiyse, bir yıl önce 5 olan bir hikaye artık iyi bir örnek olmayabilir.',
      ],
    },
    {
      title: '3. Hikayeleri Tahmin Etmeden Önce Netleştir',
      content: 'Planning poker belirsizliği açığa çıkarır, ancak bir hikayenin ilk kez okunduğu yer olmamalıdır. Backlog refinement — sprint planlamadan birkaç gün önce yapılan kısa bir oturum — Product Owner\'ın hedefi, kabul kriterlerini ve bilinen kısıtları netleştirdiği yerdir. Hikaye poker masasına geldiğinde ekip bir başlığın ne anlama geldiğini çözmeye değil, bir çözümü tahmin etmeye odaklanmalıdır.',
      items: [
        'Her hikayenin net bir "kim, ne, neden" tanımı ve en az birkaç kabul kriteri vardır.',
        'Açık sorular oylamanın ortasında keşfedilmez, hikayenin üzerinde listelenir.',
        'Diğer ekiplere veya sistemlere olan bağımlılıklar açıkça belirtilir.',
        'Product Owner ilk oylamadan önce bir iki dakikalık bir özet verir ve kimse kart seçmeden soruları yanıtlar.',
      ],
    },
    {
      title: '4. Gizlice Oy Ver, Aynı Anda Aç',
      content: 'Planning poker\'in en önemli kuralı şudur: herkes seçimini yapana kadar kimse başkasının kartını görmez. Kartları tek tek açmak ya da kıdemli bir mühendisten ilk oyu söylemesini istemek çapa etkisi yaratır — ilk sayı referans noktasına dönüşür ve sonraki tahminler, olması gerekmese bile, onun etrafında kümelenir.',
      paragraphs: [
        'Aynı odadayken bu, kartları kapalı tutup birlikte çevirmek demektir. Çevrim içi ortamda ise tur açılana kadar oyları gizleyen bir araç kullanmak demektir. Örneğin Scrum Poker Online, odadaki biri oyları açana kadar tüm oyları gizli tutar; ücretsizdir ve kayıt gerektirmez, böylece tüm ekip bir oda koduyla saniyeler içinde katılabilir.',
        'Aynı kural beden dili ve yan yorumlar için de geçerlidir. Oylamadan önce söylenen "Aa, bu kolaymış" da bir çapadır. Ekipten görüşlerini açılıştan sonraki tartışmaya saklamalarını iste.',
      ],
    },
    {
      title: '5. Önce Aykırı Oy Verenler Konuşsun',
      content: 'Oylar açıldığında bir dağılım görürsen — diyelim 3, 3, 5, 5 ve 13 — sayıların ortalamasını alma ve çoğunluğun aykırı oyu bastırmasına izin verme. Önce en yüksek ve en düşük oyu verenlerden gerekçelerini açıklamalarını iste. 13 veren kişi, üçüncü taraf API\'nin belgelenmemiş bir istek sınırı (rate limit) olduğunu biliyor olabilir; 3 veren kişi ise işin yarısı için zaten bir yardımcı fonksiyon bulunduğunu biliyor olabilir.',
      paragraphs: [
        'Bu konuşma, planning poker\'in asıl ürünüdür. Sayı yalnızca bir yan üründür. Bu adımı atlayıp doğrudan medyanı alan ekipler, sprintin sorunsuz geçmesini sağlayan ortak anlayışı kaybeder.',
        'Tartışmayı olgulara dayalı tut: iş nedir, riskler nelerdir, daha önce ne yapıldı? Tartışma "Bunu nasıl uygularız?" sorusuna dönüşürse tasarım sorusunu not edip devam et — şu anda amaç tasarım değil, tahmin.',
      ],
    },
    {
      title: '6. Yeniden Oyla, Sonra Karar Ver — Sonsuz Döngüye Girme',
      content: 'Aykırı oy verenler konuştuktan sonra yeniden oyla. Dağılıma yol açan bilgi boşluğu artık kapandığı için çoğu hikayede oylar ikinci turda birbirine yaklaşır ve [tahminde uzlaşıya varılır](/blog/estimation-consensus). İkinci tur hâlâ geniş bir dağılım gösteriyorsa sorun büyük olasılıkla hikayenin kendisindedir: hikaye belirsizdir ya da fazla büyüktür ve daha fazla oylama bunu düzeltmez.',
      items: [
        'İlk turda dağılım: aykırı oyları tartış, yeniden oyla.',
        'İkinci turda küçük dağılım (komşu kartlar, örn. 5 ve 8): bir değerde anlaşılır — dağılımın nedeni belirsizlikse birçok ekip yüksek kartı seçer.',
        'İkinci turda büyük dağılım (örn. 3 ve 13): hikayeyi beklemeye al, açık soruyu kaydet; ardından ya böl ya da refinement\'a geri gönder.',
        'Sprint planlamada tek bir hikaye için asla üç turu aşma.',
      ],
    },
    {
      title: '7. Büyük Hikayeleri Böl',
      content: '13 veya üzerinde bir değer alan hikaye bir sonuç değil, bir uyarıdır. Büyük tahminler büyük belirsizlikleri gizler: "13" tahmininin sekiz gün mü yoksa on sekiz gün mü demek olduğunu kimse gerçekten söyleyemez. Hikayeyi daha küçük ve tek başına değer üreten dilimlere bölmek daha isabetli tahminler sağlar ve ekibe sprint içinde daha erken geri bildirim verir.',
      paragraphs: [
        'İşe yarayan bölme kalıpları: iş akışı adımına göre (önce yükleme, sonra işleme, sonra bildirimler), veri çeşidine göre (üç dosya formatından önce birini desteklemek), her şeyin yolunda gittiği senaryo (happy path) ve uç durumlara göre ya da platforma göre (mobilden önce web). Dilimler tek başına yayına alınamıyorsa teknik katmana göre bölmekten ("backend hikayesi" ve "frontend hikayesi") kaçın.',
        'Örnek: "Kullanıcılar raporlarını dışa aktarabilir" hikayesi 20 olarak tahmin ediliyor. Bunu şöyle böl: "Tek bir raporu PDF olarak dışa aktarma" (5), "Bir tarih aralığını PDF\'lerden oluşan bir ZIP olarak dışa aktarma" (5) ve "Dışa aktarma hazır olduğunda e-posta gönderme" (3). Toplam daha küçüktür ve her parça tek başına gösterilebilir.',
      ],
    },
    {
      title: '8. ? ve Kahve Kartlarını Dürüstçe Kullan',
      content: 'Çoğu [planning poker destesinde](/planning-poker-cards) iki özel kart bulunur. Soru işareti "Bu hikayeyi tahmin edecek kadar iyi anlamadım" demektir. Kahve fincanı ise "Molaya ihtiyacım var" demektir. İkisi de geçerli birer oydur ve ikisi de faydalı bilgi taşır.',
      paragraphs: [
        'Bir turda tek bir "?" bile soru yanıtlanana kadar oylamayı durdurmalıdır. Birden fazla "?" kartı, hikayenin hazır olmadığını ve zorla bir sayıya bağlanmak yerine refinement\'a geri dönmesi gerektiğini gösterir. Doksan dakikanın ardından birkaç kişinin kahve kartı açması, kalan tahminlerin öncekilerden daha kötü olacağının güvenilir bir işaretidir — molayı ver.',
        'Bu kartları kullanmayı sosyal açıdan güvenli hale getir. Ekip "?" kartını bir zayıflık itirafı gibi görürse insanlar bunun yerine rastgele tahmin yürütür; oysa tam da ortadan kaldırmaya çalıştığın şey bu tür tahminlerdir.',
      ],
    },
    {
      title: '9. Her Hikayeye Süre Sınırı Koy',
      content: 'Tek bir hikaye yirmi dakika sürdüğünde planning poker oturumları rayından çıkar. Hikaye başına herkesin görebileceği bir zamanlayıcı kullan — tartışma dahil üç ila beş dakika iyi bir varsayılandır — ve süre dolduğunda ne yapılacağını önceden kararlaştır: hikayeyi beklemeye al, açık soruyu not et ve devam et.',
      paragraphs: [
        'Ortak bir zamanlayıcı, kolaylaştırıcının saati takip etmesinden daha iyi işler; çünkü herkes ne kadar zaman kaldığını görür ve kendini buna göre ayarlar. Yerleşik zamanlayıcısı olan çevrim içi araçlar, dağıtık ekipler için bunu zahmetsiz hale getirir.',
        'Oturumun tamamına da süre sınırı koy. Bir sprintlik işi tahmin etmek için düzenli olarak iki saatten fazlasına ihtiyaç duyuyorsan sorun poker oturumunda değil, refinement\'tadır.',
      ],
    },
    {
      title: '10. Tahminleri Gerçekleşenle Karşılaştır',
      content: 'Tahmin becerisi geri bildirimle gelişir. Her sprintin sonunda ya da retrospektifte, puanlarının öngördüğünden çok daha uzun veya çok daha kısa süren hikayelere bak. Ekibin tahmin anında neyi bildiğini, sonradan neyi öğrendiğini sorgula.',
      items: [
        'Belirli iş türleri (entegrasyonlar, veri taşımaları, arayüz cilası) sürekli tahmini aşıyor mu? O kategori için referans hikayeleri güncelle.',
        'Sonradan ekibi şaşırtan hikayelerde ilk turdaki dağılım geniş miydi? Bu, zayıf tahmine değil, zayıf refinement\'a işaret eder.',
        'Oturum sırasında beklemeye alınan hikayeler sprint başlamadan önce netleşti mi?',
        'Yalnızca üzerinde anlaşılan sayıyı değil, her hikayenin son oylarını da görebilmek için poker aracının tur geçmişini sakla; bir hikaye yeniden oylandıysa ilk turdaki dağılımı ayrıca kendin not et.',
      ],
    },
    {
      title: 'Yaygın Planning Poker Hataları',
      content: 'Kuralları bilen ekipler bile tekrar tekrar aynı birkaç tuzağa düşer. Şunlara dikkat et:',
      items: [
        'Oyların ortalamasını almak. 3 ile 13\'ün ortalaması bir tahmin değil, yazı turadır. Ortalama almak yerine tartışmayı aç.',
        'Product Owner\'ın ya da yöneticinin oy vermesine izin vermek. Onlar önceliğin ve kapsamın sahibidir, çabanın değil. İzleyici modu tam da bu yüzden vardır.',
        'Hikayeyi oylamadan önce değil, oylama sırasında anlamaya çalışmak. Oylama, hikayenin ne olduğuna dair kısa bir tartışmanın ardından gelmelidir.',
        'Puanları bir taahhüt ya da performans metriği olarak görmek. Puanlar insanları değerlendirmek için kullanılmaya başlandığı anda şişer.',
        'Velocity\'yi "düzeltmek" için tamamlanmış işi yeniden tahmin etmek. Velocity bir planlama aracıdır, bir skor değil.',
        'Uzaktan oturumlarda açılış adımını atlayıp sayıları sohbete yazmak; bu, çapa etkisini geri getirir.',
      ],
    },
    {
      title: 'Gerçekçi Bir Örnek Tur',
      content: 'Hikaye: "Bir müşteri olarak, ödeme adımı daha hızlı olsun diye profilime bir teslimat adresi kaydedebilirim." Kabul kriterleri: doğrulamalı adres formu, kayıtlı adreslerin ödeme adımında görünmesi, kullanıcı başına en fazla beş adres.',
      paragraphs: [
        'İlk turda 3, 3, 5, 8, 8 açılıyor. 8 veren iki kişi gerekçesini anlatıyor: uluslararası formatlar için adres doğrulaması zahmetli ve mevcut ödeme akışında kayıtlı veri kavramı yok. 3 verenlerden biri, profil sayfasında doğrulamalı genel bir form bileşeninin zaten bulunduğunu söylüyor; ekip de uluslararası doğrulamanın bu sprintin kapsamı dışında olduğunda anlaşıyor — Product Owner hikayeye "yalnızca yurt içi adresler" notunu ekliyor.',
        'İkinci turda 5, 5, 5, 5, 8 açılıyor. Ekip 5\'te anlaşıyor; 8 veren kişi de buna razı, çünkü uluslararası formatlar artık ayrı bir backlog öğesi. Toplam süre: dört dakika. Hikaye ilk geldiği halinden daha net ve herkes neden 5 olduğunu biliyor.',
      ],
    },
    {
      title: 'Başlarken',
      content: 'İlk günden on uygulamanın hepsine ihtiyacın yok. Aynı anda açılış, aykırı oyların tartışılması ve süre sınırıyla başla; bir iki sprint sonra referans hikayeleri ekle; biraz geçmiş biriktiğinde de tahminleri gerçekleşenle karşılaştırmaya başla. Ekibin uzaktan ya da hibrit çalışıyorsa Scrum Poker Online gibi tarayıcı tabanlı [ücretsiz bir scrum poker aracı](/blog/free-scrum-poker-tools), kimsenin hesap açmasına gerek kalmadan gizli oylama, ortak zamanlayıcı ve tur geçmişi sunar.',
    },
  ],
  faq: [
    {
      q: 'Scrum poker ile planning poker arasındaki fark nedir?',
      a: 'İkisi aynı tekniktir. Özgün adı "planning poker"dır; "scrum poker" adı ise uygulama en çok Scrum ekipleri tarafından sprint planlama ve backlog refinement sırasında kullanıldığı için yaygınlaşmıştır.',
    },
    {
      q: 'Bir hikaye için kaç tur oylama yapmalıyız?',
      a: 'Olağan olan iki turdur: ilk oylama, aykırı oyların tartışılması ve ikinci oylama. İkinci turda da oylar büyük ölçüde ayrışıyorsa hikaye belirsizdir ya da fazla büyüktür. Üçüncü kez oylamak yerine hikayeyi beklemeye al; ardından böl ya da refinement\'ta netleştir.',
    },
    {
      q: 'Product Owner veya Scrum Master planning poker\'de oy vermeli mi?',
      a: 'Genellikle hayır. İşi, onu yapacak kişiler tahmin eder. Product Owner hikayeyi anlatır ve soruları yanıtlar; Scrum Master ise oturumu kolaylaştırır. İkisi de oyları etkilemeden görebilmek için izleyici olarak katılabilir.',
    },
    {
      q: 'Tahminler bir türlü yakınlaşmıyorsa ne yapmalıyız?',
      a: 'Süregelen anlaşmazlık neredeyse her zaman hikayenin çözülmemiş bir soru barındırdığı anlamına gelir — bilinmeyen bir bağımlılık, muğlak bir gereksinim ya da çözüme dair iki farklı zihinsel model. Soruyu yaz, hikayeyi refinement\'a geri gönder ve soru yanıtlandıktan sonra tahmin et.',
    },
    {
      q: 'Planning poker\'i bug\'lar ve teknik görevler için kullanabilir miyiz?',
      a: 'Evet, öğe tahmin edilebilecek kadar iyi anlaşıldığı sürece. Birçok ekip bug\'ları yalnızca nedeni bilindiğinde tahmin eder; nedeni araştırmayı ise puan verilmiş bir hikaye yerine süre sınırlı bir spike olarak ele alır.',
    },
  ],
};

export default tr;
