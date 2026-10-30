import type { Localized } from '../articleTypes';

const tr: Localized = {
  title: "Planning Poker'de Tahminde Uzlaşı Nasıl Sağlanır?",
  subtitle: "Story point tahminleri neden ayrışır, bir uzlaşı turu adım adım nasıl yürütülür ve anlaşmazlık sana ne zaman bir sayıdan daha değerli bir şey söyler?",
  sections: [
    {
      title: "Planning Poker'de uzlaşı ne anlama gelir?",
      content: "[Planning Poker'de](/blog/what-is-planning-poker) uzlaşı, ekibin bir backlog öğesi için tek bir story point değerinde ve daha da önemlisi öğenin neleri kapsadığı konusunda anlaşması demektir. Sayı bir yan üründür. Ekiplerin birlikte tahmin yapmasının nedeni, iş başlamadan önce kapsam, risk ve yaklaşım hakkındaki farklı varsayımları ortaya çıkarmaktır; bu da tam olarak 3 ile 13 arasındaki farkı kapatan tartışmada gerçekleşir.",
      paragraphs: [
        "Uzlaşı, herkes yorulup pes ettiği için varılan oy birliği değildir; oyların ortalaması da değildir. İki kişi 5, iki kişi 13 dediği ve kolaylaştırıcı ortasını bulduğu için 8'de karar kılan bir ekip uzlaşıya varmamıştır; bir anlaşmazlığı bir sayının içine saklamıştır. Gerçek uzlaşı, her tahmincinin “Bu değere razıyım ve neden bu değer olduğunu anlıyorum” diyebilmesidir.",
      ],
    },
    {
      title: "Tahminler aslında neden ayrışır?",
      content: "Aynı öğe için bir geliştirici 3, diğeri 13 verdiğinde bunun nedeni nadiren birinin tahmin konusunda kötü olmasıdır. Ayrışan oylar neredeyse her zaman birkaç tanıdık nedenden birinden kaynaklanır.",
      items: [
        "Akıldaki kapsamın farklı olması: biri yalnızca her şeyin yolunda gittiği senaryoyu (happy path) tahmin ederken diğeri hata yönetimini, veri taşıma işlerini (migration) ve dokümantasyonu da hesaba katıyor.",
        "Bilgi farkı: bir tahminci kodu tanıyor ve benzer bir değişikliğin bir öğleden sonra sürdüğünü hatırlıyor; diğeri o modüle hiç dokunmamış.",
        "Gizli bağımlılıklar: biri, öğenin başka bir ekibe, üçüncü taraf bir API'ye ya da hiç testi olmayan eski bir sisteme bağlı olduğunu biliyor.",
        "Farklı “bitti” tanımları: biri “birleştirildi”yi esas alırken diğeri “canlıya alındı, izleniyor ve duyuruldu”yu esas alıyor.",
        "Öğenin kendisindeki belirsizlik: açıklama iki ya da üç makul yoruma yer bırakıyor.",
      ],
      paragraphs: [
        "Bunların her birini sprint sırasında değil, tahmin sırasında keşfetmek gerekir. Bu yüzden oyların dağılması bir turun başarısızlığı değil, iyi bir sonucudur.",
      ],
    },
    {
      title: "Uzlaşı turu adım adım nasıl yürütülür?",
      content: "Bir uzlaşı turu, [iyi yönetilen bir scrum poker oturumu](/guide) gibi sabit bir ritim izler. Bu ritmi korumak, ekibin önemli tartışmalardan ödün vermeden yarım saatte bir düzine öğeyi tahmin edebilmesini sağlar.",
      items: [
        "1. Product Owner ya da öğeyi yazan kişi öğeyi ve kabul kriterlerini yüksek sesle okur.",
        "2. Ekip birkaç dakika boyunca netleştirici sorular sorar. Kolaylaştırıcı, kapsamı değiştiren her yanıtı not eder.",
        "3. Her tahminci gizlice bir kart seçer. Kimse bir sayı söylemez.",
        "4. Tüm kartlar aynı anda açılır.",
        "5. Oylar aynıysa ya da bitişik kartlardaysa ekip üzerinde anlaşılan değeri — genellikle iki bitişik değerden yüksek olanı — alır ve devam eder.",
        "6. Dağılım daha genişse en yüksek ve en düşük oyu verenler gerekçelerini en fazla birer dakikada anlatır. Diğerleri sayı hakkında görüş değil, yalnızca olgu ekleyebilir.",
        "7. Ekip yeniden oylar. Farkların çoğu ikinci turda kapanır.",
        "8. Üçüncü turda da dağılım genişse tahmin etmeyi bırak: öğe ya anlaşılmamıştır ya da çok büyüktür. Böl, netleştir ya da refinement'a geri gönder.",
      ],
    },
    {
      title: "Örnek: 3 ile 13 arasındaki farkı kapatmak",
      content: "Beş kişilik bir ekibin “Kullanıcılar sipariş geçmişlerini CSV olarak dışa aktarabilsin” öğesini tahmin ettiğini varsayalım. İlk açılışta 3, 5, 5, 8 ve 13 çıkar. Bu örnek yalnızca açıklama amacıyla kurgulanmıştır.",
      paragraphs: [
        "Kolaylaştırıcı, 3 ve 13 verenleri konuşmaya davet eder. 3 veren geliştirici, API'nin sipariş geçmişini zaten JSON olarak döndürdüğünü, bunu CSV'ye çevirip bir indirme düğmesi eklemenin birkaç saatlik iş olduğunu söyler. 13 veren geliştirici ise bazı müşterilerin on binlerce siparişi olduğunu, bu yüzden dışa aktarmanın asenkron olarak üretilip e-postayla gönderilmesi gerekeceğini ve mevcut endpoint'in birkaç yüz satırı aşınca zaten zaman aşımına uğradığını hatırlatır.",
        "Ekip artık bir dakika önce bilmediği iki şeyi öğrenmiştir: öğe bir performans sorunu barındırıyor ve büyük hesapların kapsama dahil olup olmadığına Product Owner'ın karar vermesi gerekiyor. Product Owner, ilk sürümün son on iki ayla ve en fazla birkaç bin satırla sınırlanabileceğini, büyük dışa aktarmaların ise ayrı bir öğeye bırakılacağını söyler.",
        "İkinci oylamada 5, 5, 5, 8 ve 8 çıkar. 8 veren iki kişi, kalan tereddütlerinin büyük dışa aktarmalarla ilgili olduğunu ve bunların artık kapsam dışında kaldığını söyler; bu yüzden yüksek karta yönelme alışkanlığı burada geçerli değildir. Ekip sınırlı kapsam için 5'te uzlaşır ve asenkron büyük dışa aktarmalar için ayrıca tahmin edilecek yeni bir backlog öğesi açar. Tur yaklaşık altı dakika sürer ve aksi halde sprintin ikinci haftasında ortaya çıkacak bir riski ortadan kaldırır.",
      ],
    },
    {
      title: "Oyları birbirine yaklaştıran teknikler",
      content: "Aşağıdaki teknikler, yapay bir uzlaşıya zorlamadan tartışmayı kısaltır.",
      items: [
        "Önce uçlara sor. En düşük ve en yüksek oyu verenleri herkesten önce dinlemek, çoğunluğun önemli bir şey bilen tek kişiyi bastırmasını önler.",
        "Referans hikayeler tut. Boyutu üzerinde anlaşılmış, daha önce teslim edilmiş iki üç öğe herkese ortak bir cetvel sunar: “Bu, 5 dediğimiz şifre sıfırlama hikayesinden büyük mü, küçük mü?”",
        "Tartışmaya süre sınırı koy. Üç dakika tartışmaya izin ver, ardından nerede kalınmış olursa olsun yeniden oylat. Üçüncü bir oylama gerekiyorsa öğe refinement'a geri döner.",
        "Tartışmadan önce böl. Fark iki farklı yorumdan kaynaklanıyorsa öğeyi bu iki yoruma göre bölmek anlaşmazlığı çoğu zaman anında çözer.",
        "Bitişik değerlerden yüksek olana yönel. İki komşu kart kaldığında yüksek olan, belirsizliği genellikle düşük olandan daha iyi yansıtır.",
      ],
    },
    {
      title: "Dürüst tahmini engelleyen çapa etkisi ve diğer önyargılar",
      content: "Çapa etkisi, duyduğun ilk sayıya doğru kayma eğilimidir. Kıdemli bir geliştirici kartlar açılmadan önce “Bu bana 3 gibi geldi” derse ekibin geri kalanı, katılsın ya da katılmasın, 3'e doğru kayar. Planning Poker'in oyları herkes seçimini yapana kadar gizlemesinin en önemli nedeni budur: bu format bir oyun değil, bir önlemdir.",
      paragraphs: [
        "Aynı toplantılarda benzer önyargılar da ortaya çıkar. Otorite önyargısı, insanların en kıdemli kişinin sözüne uymasına yol açar. İyimserlik önyargısı, tahmincilerin her şeyin yolunda gideceğini varsaymasına neden olur. Grup baskısı ise herkesin 3 dediği bir odada 13 tutan tek kişinin yeniden oylamada sessizce daha düşük bir kart seçmesine yol açar. Bunların hepsi aynı uygulamayla azalır: gizli seçim, aynı anda açılış ve aykırı oy verenlerin önce konuştuğu ve bunun için teşekkür gördüğü bir ekip normu.",
        "Burada araç önemlidir, çünkü bu formatı bozmak kolaydır. Görüntülü bir görüşmede sayıları yüksek sesle söylemek ya da sohbete art arda yazmak çapayı geri getirir. Scrum Poker Online, oyları aynı anda açılışa kadar gizli tutan, kayıt gerektirmeyen ve her öğenin oylarını ve nihai tahminini tur geçmişinde saklayan ücretsiz bir seçenektir; böylece ekip sonuçları sonradan gözden geçirebilir.",
      ],
    },
    {
      title: "Tartışmayı ne zaman bitirmeli: farkın büyüklüğüne göre pratik kurallar",
      content: "Her anlaşmazlık aynı süreyi hak etmez. [Fibonacci planning poker ölçeğinde](/fibonacci-planning-poker) kartlar arasındaki mesafeye bağlı basit bir kural turları kısa tutar.",
      items: [
        "Aynı kart ya da bitişik kartlar (5 ve 8): yüksek değeri ya da çoğunluğun verdiği değeri alıp devam et; tartışmanın maliyeti aradaki farktan yüksek olur.",
        "İki kart arayla (3 ve 8): en yüksek ve en düşük oyu verenler bir kez gerekçelerini anlatır, ardından yeniden oylanır.",
        "Üç ya da daha fazla kart arayla (2 ve 13): öğe farklı kişilerce farklı anlaşılıyor. Yeniden oylamadan önce kapsamı netleştir ve bölmeye hazır ol.",
        "Soru işareti kartı: biri hiç tahmin yapamıyor. Öğe o kişiye açıklanana kadar devam etme; hızlıca açıklanamıyorsa öğe hazır değildir.",
        "Kahve ya da mola kartı: ekip yorgun. Yorgunlukla birlikte tahmin kalitesi hızla düşer; molayı ver.",
      ],
    },
    {
      title: "Yaygın uzlaşı hataları ve anti-pattern'ler",
      content: "Tahminde zorlanan ekipler, genellikle bu kalıpların bir ya da birkaçında kendilerini tanır.",
      items: [
        "Oyların ortalamasını almak. 3 ile 13'ün ortalaması, kimsenin inanmadığı bir sayı ve kimsenin yapmadığı bir tartışmadır.",
        "Çoğunluk oylaması. Bağımlılığı bilen tek kişiyi oy çokluğuyla geçersiz kılmak, birlikte tahmin yapmanın amacını boşa çıkarır.",
        "Kararı lidere bırakmak. Sonuç her seferinde liderin söylediği sayı oluyorsa diğerleri düşünmeyi bırakır ve tahmin, etrafına bir tören kurulmuş tek kişilik bir varsayıma dönüşür.",
        "Herkes anlaşana kadar tartışmak. Bitmeyen tartışma doğruluk değil, yorgunluk üretir. Süre sınırı koy ve yeniden oylamaya geç.",
        "Düşük tahminleri ödüllendirmek. Küçük sayılar övülürse alacağın şey küçük sayılar olur ve bedelini sprint öder.",
        "Sayıyı sonradan yeniden tartışmaya açmak. Ekip bir kez anlaştıktan sonra, kapsam değişmedikçe tahmin geçerlidir. Velocity'yi “düzeltmek” için iş bittikten sonra tahmini değiştirmek geçmiş verileri bozar.",
      ],
    },
    {
      title: "Uzlaşı ne zaman tehlike işaretidir, anlaşmazlık ne zaman sorun değildir?",
      content: "Her öğede hızla ve oy birliğiyle varılan uzlaşı bir uyarı işareti olabilir. Beş kişi hiç tartışmadan her seferinde aynı kartı seçiyorsa liderin sesinin çapa etkisinde kalıyor, işi erken bitirmek için göstermelik onay veriyor ya da öğeleri gerçekten okumuyor olabilirler. Sağlıklı ekipler zaman zaman anlaşamaz; bu, insanların bağımsız düşündüğünü ve masaya farklı bilgiler getirdiğini gösterir.",
      paragraphs: [
        "Aynı şekilde, her anlaşmazlığın çözülmesi de gerekmez. Küçük öğelerde bitişik kartlar arasındaki fark gürültüden ibarettir. Büyük ve belirsiz öğelerde ise dürüst sonuç bazen “Henüz yeterince bilmiyoruz” olur; doğru adım da bir sayı değil, bir spike ya da öğeyi bölmektir; olsa olsa [kaba bir T-shirt bedeni](/t-shirt-sizing) verilebilir. Bu durumlarda uzlaşıyı zorlamak, arkasında hiçbir şey olmayan ama kesin görünen bir tahmin üretir.",
      ],
    },
    {
      title: "Uzlaşıya varmada kolaylaştırıcının rolü",
      content: "Turun ritmini birinin üstlenmesi gerekir ve bu kişi genellikle oy vermemelidir. Kolaylaştırıcı — çoğunlukla Scrum Master — öğeyi okur ya da okunmasını sağlar, netleştirici soruları çözüme değil kapsama odaklı tutar, açılış anını belirler, uç oy verenleri konuşmaya davet eder, süreyi takip eder ve yeniden oylamayı başlatır. Aynı odada bu kolaydır; uzaktan bir oturumda ise yirmi dakikalık bir tahmin oturumuyla bir saatlik bir oturum arasındaki farkı yaratır.",
      paragraphs: [
        "Kolaylaştırıcı ayrıca daha sessiz ekip üyelerinin sesini korur ve Product Owner'ı soruları yanıtlayan rolünde tutar: Product Owner büyüklüğü değil, önceliği belirler.",
      ],
    },
    {
      title: "Tahminde uzlaşı kontrol listesi",
      content: "Bir sonraki tahmin oturumundan önce ve oturum sırasında bu listeyi gözden geçir.",
      items: [
        "Her öğenin, tahmin edilmeden önce bir açıklaması ve kabul kriterleri var.",
        "Boyutu üzerinde anlaşılmış iki üç referans hikaye tüm ekibin görebileceği bir yerde.",
        "Oylar gizli veriliyor ve aynı anda açılıyor; açılıştan önce kimse sayı söylemiyor.",
        "Önce en yüksek ve en düşük oyu verenler gerekçelerini anlatıyor; diğerleri görüş değil, olgu ekliyor.",
        "Öğe başına tartışma süreyle sınırlı; iki yeniden oylamadan sonra hâlâ geniş olan dağılım öğeyi refinement'a geri gönderiyor.",
        "Bitişik kartlar arasındaki anlaşmazlıklar yüksek değer ya da çoğunluğun oyu alınarak çözülüyor, asla ortalamayla değil.",
        "Product Owner kapsamla ilgili soruları yanıtlıyor ama oy vermiyor.",
        "Nihai değerler ve yeniden oylamaların tek satırlık gerekçeleri kayda geçiriliyor.",
        "Kolaylaştırıcı, hiç tartışılmadan varılan oy birliklerini zaman zaman sorguluyor.",
      ],
    },
  ],
  faq: [
    {
      q: "Ekip bir tahmin üzerinde anlaşamazsa ne olur?",
      a: "Geniş dağılımla geçen iki yeniden oylamadan sonra oylamayı bırak. Öğe ya farklı kişilerce farklı anlaşılıyordur ya da boyutlandırılamayacak kadar belirsizdir. Öğeyi masadaki yorumlara göre böl, kapsamı Product Owner ile netleştir ya da eksik bilgiyi edinmek için kısa bir spike planla. Bu noktada bir sayıyı zorlamak, kimsenin inanmadığı bir tahmin üretir.",
    },
    {
      q: "Planning Poker oylarının ortalaması alınmalı mı?",
      a: "Hayır. Ortalama almak, turun ortaya çıkarması gereken anlaşmazlığı gizler ve çoğu zaman ölçekte bile bulunmayan bir değer üretir. Oylar bitişik kartlardaysa yüksek olanı ya da çoğunluğun verdiği değeri al. Birbirinden uzaksa konuyu tartışmaya aç ve yeniden oylat.",
    },
    {
      q: "Product Owner ya da Scrum Master oy vermeli mi?",
      a: "Product Owner oy vermemelidir: rolü kapsamı ve önceliği açıklamaktır ve vereceği tahmin, taşımaması gereken bir otorite taşır. Scrum Master genellikle oy vermek yerine oturumu kolaylaştırır; ekipte geliştirme işi de yapıyorsa geliştirici olarak oy verir ve süreyi başka biri takip eder.",
    },
    {
      q: "Bir öğe için kaç oylama turu normaldir?",
      a: "Bir ya da iki. Öğelerin çoğunda oylar ya ilk açılışta uyuşur ya da en yüksek ve en düşük oyu verenlerin tek bir açıklamasından sonra birbirine yaklaşır. Üçüncü bir tur, öğenin daha fazla tartışmaya değil, netleştirmeye ya da bölünmeye ihtiyaç duyduğunun işaretidir.",
    },
    {
      q: "Uzlaşı, herkesin aynı kartı seçmesi mi demektir?",
      a: "Hayır. Uzlaşı, her tahmincinin nihai değeri kabul edebilmesi ve arkasındaki gerekçeyi anlaması demektir. Bitişik kartlara dağılan ve yüksek değer alınarak çözülen oylar olağan bir uzlaşı sonucudur. Her öğede herkesin hiç tartışmadan aynı kartı seçmesi ise iyi kalibre olmuş bir ekipten çok çapa etkisinin işaretidir.",
    },
  ],
};

export default tr;
