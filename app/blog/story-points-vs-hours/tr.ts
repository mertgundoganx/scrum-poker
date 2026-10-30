import type { Localized } from '../articleTypes';

const tr: Localized = {
  title: 'Story Point mi, Saat mi? Çevik Ekibin Hangisini Kullanmalı?',
  subtitle: 'Story point\'lerin neyi ölçtüğü, saat tahminlerinin sprintlerde neden tutmadığı, "ama yönetim tarih istiyor" itirazına nasıl cevap verileceği ve saatin hâlâ doğru tercih olduğu durumlar.',
  sections: [
    {
      title: 'Story Point mi, Saat mi? Kısa Cevap',
      content: 'Backlog öğelerini story point ile tahmin et, tarihleri ise velocity\'den çıkar. Saati yalnızca kapsamı sabit ve iyi bilinen işler için, faturalandırma için ya da ekibin faydalı buluyorsa sprint içindeki gün düzeyinde görev dökümü için kullan. Story point\'ler bir işin diğer işlere göre ne kadar büyük olduğunu anlatır; saatler ise belirli bir kişinin o işe ne kadar zaman harcamayı beklediğini. Sprint planlarken ve sürüm öngörürken sağlam kalan soru ilkidir.',
    },
    {
      title: 'Story Point Nedir?',
      content: 'Story point, göreli büyüklük birimidir. Bir ekip bir kullanıcı hikayesine 5 dediğinde, hikayenin ekibin daha önce yaptığı diğer 5\'ler kadar büyük, 3\'lerinden büyük ve 8\'lerinden küçük olduğunu söyler. Bu sayı, bir işi zahmetli kılan her şeyi bir araya toplar: işin miktarını, karmaşıklığını, çevresindeki belirsizliği ve sürpriz riskini.',
      paragraphs: [
        'Story point\'ler bilinçli olarak zamandan bağımsız tasarlanmıştır. Aynı 5 puanlık hikaye kıdemli bir mühendisin bir gününü, yeni katılan birinin ise üç gününü alabilir; ama yine de 5\'tir, çünkü işin büyüklüğü değişmemiştir. Puanları kullanışlı kılan da tam olarak budur: ekibin hızı değiştiğinde sabit kalırlar, hız ise ayrıca [ekibin velocity değeri](/blog/agile-velocity) olarak ölçülür.',
        'Çoğu ekip, Mike Cohn\'un "Agile Estimating and Planning" kitabıyla yaygınlaşan değiştirilmiş [Fibonacci ölçeğini](/fibonacci-planning-poker) (0, 1, 2, 3, 5, 8, 13, 20, 40, 100) kullanır ve tahminleri Planning Poker ile ekip olarak yapar. Değerler arasındaki aralıkların büyümesi, büyük işleri kesin olarak boyutlandırmanın küçük işlere göre daha zor olduğu gerçeğini yansıtır.',
      ],
    },
    {
      title: 'Saatle Tahmin Yapmak Aslında Ne Demek?',
      content: 'Saat tahmini, belirli bir iş için, genellikle belirli bir kişinin harcayacağı çalışma süresine dair bir öngörüdür. Mutlak bir tahmindir: "Bu yaklaşık 6 saat sürer." Çekiciliği açıktır. Saat evrensel bir birimdir; herkes anlar, tablolarda toplanabilir ve yöneticiler takvimle karşılaştırabilir. Sorun şu ki saat tahmini birbirinden çok farklı iki şeyi aynı pakete koyar: refinement sırasında bilinebilecek olan işin büyüklüğünü ve bilinemeyecek olanı, yani işi kim yapacaksa onun, hangi gün yapacaksa o günkü verimliliğini.',
    },
    {
      title: 'Saat Tahminleri Çevik Ekiplerde Neden Tutmaz?',
      content: 'Saatler kesin görünür; tuzak da tam olarak budur. Pratikte birkaç nedenle işe yaramaz hale gelirler:',
      items: [
        'İşi kimin yaptığına bağlıdır. Bir geliştiricinin 4 saatte bitirdiği görev bir başkasının 12 saatini alabilir; sprint planlanana kadar da işi kimin üstleneceğini kimse bilmez.',
        'Takvimi hesaba katmaz. Toplantılar, kod incelemeleri, canlı ortamdaki sorunlar ve bağlam değiştirme, görev başına saat tahmininde görünmez ama her iş gününün büyük bir kısmını yer.',
        'Sahte bir kesinlik yaratır. "8 saat" bir ölçüm gibi duyulur. 8 saatlik bir görevi 9 saatlik bir görevden önceden kimse ayırt edemez, ama sayı yine de bir taahhüt gibi ele alınır.',
        'Baskıya dönüşür. Tahmin bir zaman sözü haline gelince geliştiriciler ya o süreye yetişmek için işi baştan savma yapar ya da bir sonraki tahmine pay ekler.',
        'Sağlıklı biçimde toplanamaz. Görev düzeyindeki 40 ayrı saat tahminini toplamak güvenilir bir sprint süresi vermez, çünkü hataların çoğu aynı iyimser yöne sapar.',
      ],
    },
    {
      title: 'Story Point\'ler Sprint Planlamada Neden Daha İyi Çalışır?',
      content: 'Story point\'ler büyüklüğü hızdan ayırarak bu sorunların önüne geçer:',
      items: [
        'Ekip değiştiğinde de tahmin geçerli kalır. Hikayeyi ister kıdemli ister yeni başlayan bir geliştirici alsın, 5 yine 5\'tir. Hız, her sprintte kendiliğinden güncellenen velocity ile ölçülür.',
        'Göreli soruları iyi yanıtlamak daha kolaydır. "Bu, şifre sıfırlama hikayesinden büyük mü?" sorusu tutarlı cevaplar üretir; "Kaç saat?" sorusu ise ruh haline ve özgüvene göre değişen tahminler.',
        'Belirsizliğe yer açılır. Gereksinimleri net olmayan bir hikayeye, kimse saatini biliyormuş gibi yapmadan "büyük ve belirsiz" demek için 13 verilebilir.',
        'Velocity sana öngörüyü bedavaya verir. Birkaç sprint sonra ekip sprint başına kabaca N puan tamamladığını bilir; bu sayı tahmin edilmediği, ölçüldüğü için toplantıları, incelemeleri ve kesintileri zaten içerir.',
        'Puanlar kişisel taahhüdü ortadan kaldırır. Bir kişinin sözünü değil, işi anlatırlar; böylece oturumlar bir sayıyı savunmaya değil, hikayeyi anlamaya odaklanır.',
      ],
    },
    {
      title: 'Story Point ve Saat: Yan Yana Karşılaştırma',
      content: 'Kriter kriter temel farklar:',
      items: [
        'Neyi ölçer: puanlar göreli büyüklüğü (efor, karmaşıklık, belirsizlik, risk) ölçer; saatler tek bir kişi için öngörülen süreyi ölçer.',
        'Kararlılık: hikayeyi başka bir kişi aldığında puan tahmini değişmez; saat tahmini değişir.',
        'Öngörü: puanlarla öngörü, bütün sprintler üzerinden ölçülen velocity ile yapılır; saatlerle öngörü, görev başına tahminler toplanarak yapılır.',
        'Kesintiler: velocity bunları kendiliğinden içerir; görev başına saat tahmini ise her göreve pay eklenmedikçe onları yok sayar.',
        'Kesinlik: puanlar tasarımı gereği kabadır; saatler ise kimsenin önceden sahip olmadığı bir kesinlik ima eder.',
        'Ekip dinamiği: puanlar işe dair bir ekip tahminidir; saatler ise bireysel bir taahhüde dönüşür.',
      ],
    },
    {
      title: 'Uygulamalı Örnek: Aynı Sprint, İki Farklı Tahmin',
      content: 'Beş kişilik bir ekibin iki haftalık bir sprinti üç hikayeyle planladığını düşün: profil sayfasında bir hata düzeltmesi, sipariş geçmişinin CSV olarak dışa aktarılması ve yeni bir ödeme sağlayıcısının entegrasyonu.',
      paragraphs: [
        'Saatle: teknik lider 4, 16 ve 40 saat tahmin eder. Toplam 60 saat; kapasite ise 5 kişi çarpı 10 gün çarpı 8 saat, yani 400 saat. Sprint neredeyse boş göründüğü için üç hikaye daha alınır. Gerçekte toplantılar ve incelemeler takvimin üçte birini tüketir, dışa aktarmanın iki servisi etkilediği ortaya çıkar ve ödeme entegrasyonu dokümantasyon yüzünden takılır. Sprint, dışa aktarma yarım kalmış ve eklenen hikayelere hiç dokunulmamış halde biter.',
        'Story point ile: ekip Planning Poker oynar ve 2, 8 ve sonradan 3 puanlık bir spike\'a dönüşen bir "?" üzerinde uzlaşır. Ekibin son dört sprintteki velocity ortalaması 25\'tir. 13 puanlık taahhütle birkaç küçük hikayeye daha yer vardır; ekip geçmiş verilerinden 25 puanlık bir sprintin toplantıları ve incelemeleri zaten içerdiğini bilir. Ödeme entegrasyonu bir tahmine dayanılarak sprinte zorla sokulmaz; önce spike açık soruları yanıtlar. Puan tahmini daha kesin değildir, ama ideal iş günlerine değil, gerçek teslimata göre ayarlanmıştır.',
      ],
    },
    {
      title: '"Yönetim Saat İstiyor" Sorunu: Velocity ile Öngörü',
      content: 'Story point\'lere yöneltilen en yaygın itiraz, bir yöneticinin, müşterinin ya da finans ekibinin puan değil, tarih ve saat istemesidir. Çözüm puanlardan vazgeçmek değil, çeviriyi hikaye düzeyinde değil sprint düzeyinde yapmaktır.',
      paragraphs: [
        'Velocity, bir ekibin sprint başına tamamladığı puanların son birkaç sprint üzerinden ortalamasıdır. Üç dört sprintlik geçmişin olduğunda öngörü basit bir hesaptır. Bir sürüm 120 puan olarak tahmin edilmişse ve ekip sprint başına ortalama 25 puan tamamlıyorsa bu, kabaca iki haftalık beş sprint, yani yaklaşık on hafta demektir. Tek bir tarih değil, bir aralık ver: yakın geçmişteki en düşük ve en yüksek velocity, saat tahminlerinin toplamından çok daha savunulabilir bir en iyi ve en kötü senaryo ortaya koyar.',
        'Yapmaman gereken şey, sabit bir puan-saat oranı ("1 puan = 4 saat") ilan etmektir. Böyle bir oran ortaya çıktığı anda her puan tahmini kılık değiştirmiş bir saat tahminine dönüşür ve yukarıdaki sorunların hepsi geri gelir.',
      ],
    },
    {
      title: 'Saatin Doğru Tercih Olduğu Durumlar',
      content: 'Story point her derde deva değildir. Saat şu durumlarda makul bir seçimdir:',
      items: [
        'Kapsam sabit ve tanıdıksa. Rutin bir sertifika yenileme ya da bilinen bir yapılandırma değişikliğinde neredeyse hiç belirsizlik yoktur.',
        'Sprint içinde bir hikayeyi görevlere bölüyorsan. Bazı ekipler hikayeleri puanla boyutlandırır, sonra kendi günlük takipleri için saatlik görevlere ayırır. Bu saatler hikayenin story point tahminine geri yansıtılmadığı sürece sorun yoktur.',
        'İş saat üzerinden faturalandırılıyor ve müşteri teklif istiyorsa. Bu durumda bile görev başına saat tahmin etmek yerine önce puanla tahmin et, sonra velocity ile dönüştür.',
        'İşin tamamını tek bir kişi yapıyor ve bu işi daha önce defalarca yapmışsa. Uzlaşı arayacak bir ekip yoksa göreli tahminin katkısı azdır.',
      ],
    },
    {
      title: 'Saatten Story Point\'e Geçerken Sık Yapılan Hatalar',
      content: 'Puana geçen ekipler saat alışkanlıklarını da yanlarında getirir. Şunlara dikkat et:',
      items: [
        'Bir puanı belirli bir saat karşılığı olarak tanımlamak. İlk gün işe yarıyor gibi görünür, ama faydayı kalıcı olarak yok eder.',
        'Ekipler arasında velocity karşılaştırmak. Her ekibin puanları kendi referans hikayelerine göre ayarlanmıştır; bu yüzden bir ekipteki 30 puan, başka bir ekip hakkında hiçbir şey söylemez.',
        'Puanları verimlilik ölçütü olarak kullanmak. Velocity bir hedefe dönüştüğü anda tahminler şişer ve metrik hiçbir şeyi öngöremez hale gelir.',
        'Referans hikayeyi atlamak. Ortak bir "3 dediğimiz iş böyle bir şey" örneği olmadan herkes içinden saat hesabı yapar ve sonucu bir Fibonacci sayısına yuvarlar.',
        'Tahmini tek bir kişiye bırakmak. Puanların değeri ekip tartışmasından gelir. Puanları tek başına belirleyen bir lider, iki sistemin de dezavantajlarını bir arada yaşar.',
      ],
    },
    {
      title: 'Planning Poker ile Story Point Tahmini Nasıl Yapılır?',
      content: 'Story point tahmini yapmanın standart yolu, James Grenning\'in 2002\'de tanımladığı ve Mike Cohn\'un yaygınlaştırdığı [Planning Poker](/blog/what-is-planning-poker) tekniğidir. Kısaca:',
      items: [
        '1. Tamamlanmış bir iki hikayeyi referans olarak seç ve büyüklüklerinde ekipçe anlaş; örneğin "şifre sıfırlama akışı 3 puandı".',
        '2. Product Owner bir hikaye sunar, ekip de birkaç dakika boyunca netleştirici sorular sorar.',
        '3. Herkes kartını gizlice seçer ve kartlar aynı anda açılır; böylece ilk söylenen sayı kimse için çapa olmaz.',
        '4. Kartlar ayrışırsa en yüksek ve en düşük tahmini verenler ne gördüklerini anlatır, ardından ekip yeniden oylar. Çoğu hikaye iki turda bir noktada buluşur.',
        '5. Üzerinde anlaşılan değeri kaydet. Her sprintin sonunda gerçekten tamamlanan hikayelerin puanlarını topla; öngörülerinde kullanacağın velocity budur.',
      ],
      paragraphs: [
        'Scrum Poker Online gibi ücretsiz bir araç, uzaktan çalışan ekipler için işin mekaniğini halleder: bir oda oluştur, bağlantıyı paylaş; 50 kişiye kadar katılımcı kayıt olmadan Fibonacci, T-Shirt, 2\'nin kuvvetleri ya da özel bir desteyle oy verebilir.',
      ],
    },
    {
      title: 'Önerimiz',
      content: 'Story point ile tahmin et, velocity ile öngör; saati yalnızca kapsamın sabit olduğu ya da faturalandırmanın gerektirdiği dar durumlar için kullan. Fibonacci ölçeğiyle başla, yakın zamanda tamamlanmış ve iyi anlaşılmış bir hikayeyi referans seç ve taahhütlerde kullanmadan önce velocity\'nin oturması için üç dört sprint bekle. Paydaşlar tarih sorduğunda velocity\'den türetilmiş bir sprint aralığıyla cevap ver, asla bir puan-saat oranıyla değil. Bu geçişi yapan ekipler nadiren geri döner, çünkü sonunda işin büyüklüğünü ekibin hızından ayırmış olurlar.',
    },
  ],
  faq: [
    {
      q: 'Bir story point kaç saattir?',
      a: 'Sabit bir cevabı yoktur; bir karşılık belirlemek de amacı boşa çıkarır. Story point\'ler zamanı değil, göreli büyüklüğü ölçer. Puanlarla takvim süresi arasındaki ilişkiyi, ekipten ekibe değişen velocity gösterir.',
    },
    {
      q: 'Pek çok çevik ekip neden saatle tahmin yapmaktan kaçınır?',
      a: 'Çünkü saat tahminleri işi kimin yaptığına ve kimsenin öngöremeyeceği kesintilere bağlıdır, sahte bir kesinlik yaratır ve kişisel taahhütlere dönüşür. Story point\'ler işin kendisini anlatır; gerçek hayattaki hız ise velocity ile hesaba katılır.',
    },
    {
      q: 'Story point ve saat birlikte kullanılabilir mi?',
      a: 'Evet. Yaygın bir yöntem, hikayeleri planlama ve öngörü için puanla boyutlandırmak, sonra sprint içinde günlük takip için saatlik görevlere bölmektir. Ancak saatler, story point\'leri yeniden hesaplamak için asla kullanılmamalıdır.',
    },
    {
      q: 'Story point\'leri bir teslim tarihine nasıl dönüştürürüm?',
      a: 'Velocity kullan. Kalan puanları ekibin sprint başına ortalama puanına bölerek sprint sayısını bul, sonra bunu sprint uzunluğuyla çarp. Tek bir tarih yerine, yakın geçmişteki en düşük ve en yüksek velocity değerlerini kullanarak bir aralık sun.',
    },
    {
      q: 'Story point farklı ekiplerde aynı anlama mı gelir?',
      a: 'Hayır. Her ekip puanlarını kendi referans hikayelerine göre ayarlar; bu yüzden bir ekipteki 5, başka bir ekipteki 5 ile karşılaştırılamaz. Velocity yalnızca aynı ekibin kendi geçmişiyle karşılaştırılmalıdır.',
    },
  ],
};

export default tr;
