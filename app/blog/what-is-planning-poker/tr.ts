import type { Localized } from '../articleTypes';

const tr: Localized = {
  title: 'Planning Poker Nedir? Çevik Tahmin İçin Kapsamlı Rehber',
  subtitle: 'Planning Poker\'in ne olduğu, nereden çıktığı, bir oturumun adım adım nasıl işlediği, hangi kartların kullanıldığı ve tahminlerini sessizce bozan hatalar.',
  sections: [
    {
      title: 'Planning Poker Nedir? (Tanım)',
      content: 'Planning Poker, çevik ekiplerin kullanıcı hikayeleri gibi backlog öğelerini boyutlandırmak için kullandığı, uzlaşıya dayalı ve oyunlaştırılmış bir tahmin tekniğidir. Her katılımcı tahminini temsil eden kartı gizlice seçer, kartlar herkes için aynı anda açılır ve ekip tek bir değerde anlaşana kadar farklılıkları tartışır. Kartın üzerindeki sayı genellikle saat değil, story point\'tir.',
      paragraphs: [
        'Tekniğin belirleyici özelliği kartların aynı anda açılmasıdır. Tahminler sırayla yüksek sesle söylendiğinde, ilk söylenen sayı arkadan gelen herkes için bir çapa olur. Kartları açılış anına kadar gizli tutmak bu çapa etkisini ortadan kaldırır; böylece ekip, tartışma başlamadan önce herkesin gerçekte ne düşündüğünü görür.',
        'İkinci belirleyici özellik, görüş ayrılığının bir bilgi olarak görülmesidir. Bir geliştirici 3, bir diğeri 13 kartını kaldırıyorsa bu iki kişinin aynı hikayeye dair zihinlerindeki resimler çok farklıdır; tekniğin sağladığı değerin büyük kısmı da işte bu konuşmadan gelir.',
      ],
    },
    {
      title: 'Planning Poker ve Scrum Poker: Arada Fark Var mı?',
      content: 'Hayır. Planning Poker ve Scrum Poker aynı tekniğin iki adıdır. "Planning Poker", James Grenning\'in 2002 tarihli makalesinden ve Mike Cohn\'un kitabından gelen asıl addır. "Scrum Poker" adı ise tekniği kullanan ekiplerin çoğu Scrum uyguladığı ve tahminlerini backlog refinement ya da sprint planlama sırasında yaptığı için yaygınlaştı. "Pointing poker" ve "estimation poker" da aynı anlama gelir ve hiçbiri Scrum\'a bağlı değildir: Kanban ekipleri ve yazılım dışı ekipler de tekniği aynı başarıyla kullanır.',
    },
    {
      title: 'Planning Poker Nereden Çıktı? Grenning, Cohn ve Wideband Delphi',
      content: 'Planning Poker ilk kez 2002\'de James Grenning tarafından, sürüm planlama tartışmalarında saatler kaybeden Extreme Programming ekipleri için yazılmış kısa bir makalede tanımlandı. Grenning\'in amacı "analiz felcinden" kaçınmaktı: herkesin sesini hızla duyurmak, sayıyı en baskın sesin belirlemesini önlemek ve yola devam etmek.',
      paragraphs: [
        'Teknik, Mike Cohn\'un "Agile Estimating and Planning" (2005) kitabında yer vermesiyle yaygınlaştı. Cohn\'un sürümü, bugün çoğu ekibin kullandığı değiştirilmiş Fibonacci destesini (0, 1, 2, 3, 5, 8, 13, 20, 40, 100) popüler hale getirdi.',
        'Tekniğin fikir atası, RAND Corporation\'da geliştirilen Delphi yöntemi ve bu yöntemin yazılım tahminine uyarlanmış hali olan Wideband Delphi\'dir: uzmanlar birbirinden bağımsız tahmin yapar, sonuçlar paylaşılır, grup tartışır ve tahminler birbirine yaklaşana kadar döngü tekrarlanır. Planning Poker bu yapıyı korur, ama öğe başına birkaç dakikaya sığdırır ve işin içine bir kart destesi katar.',
      ],
    },
    {
      title: 'Planning Poker Oturumu Adım Adım Nasıl İşler?',
      content: 'Tipik bir oturuma geliştirme ekibi, Product Owner ve genellikle bir Scrum Master ya da kolaylaştırıcı katılır. Akış şöyledir:',
      items: [
        '1. Bir referans hikaye seç. Oturumdan önce, yakın zamanda tamamlanmış ve büyüklüğü bilinen bir iki hikaye üzerinde ekipçe anlaş (örneğin "şifre sıfırlama akışı 3 puandı"). Her tahmin bu referanslara göre yapılır.',
        '2. Product Owner bir backlog öğesini sunar: kullanıcı hikayesini, kabul kriterlerini ve bilinen kısıtları. Amaç teknik bir tasarım değil, "bitti"nin ne demek olduğuna dair ortak bir anlayıştır.',
        '3. Ekip netleştirici sorular sorar; bu bölüm iki üç dakikayla sınırlandırılır.',
        '4. Herkes kartını gizlice seçer; hikayeyi referans hikayelerle karşılaştırır ve efor, karmaşıklık, belirsizlik ile riski hesaba katar.',
        '5. Tüm kartlar aynı anda açılır. Çevrim içi bir araçta, tüm oylar verildiğinde biri (genellikle kolaylaştırıcı) "Oyları aç" düğmesine tıklar.',
        '6. Tahminler uyuşuyorsa değeri kaydet ve devam et. Aralarında yalnızca bir kart fark olan tahminler (bir 5 ve bir 8) genellikle uzlaşı sayılır.',
        '7. Tahminler ayrışırsa en yüksek ve en düşük tahmini verenler gerekçelerini anlatır. Kimse kimseyle tartışmaz; amaç, bir kişinin bilip diğerlerinin bilmediği şeyi ortaya çıkarmaktır.',
        '8. Yeniden oyla. Çoğu hikaye iki turda bir noktada buluşur. Üç turdan sonra hâlâ görüş ayrılığı varsa, hikayenin genellikle daha küçük hikayelere bölünmesi ya da bir spike ile araştırılması gerekir.',
      ],
    },
    {
      title: 'Planning Poker Kartları Ne Anlama Gelir?',
      content: 'En yaygın deste [değiştirilmiş Fibonacci dizisidir](/fibonacci-planning-poker): 0, 1, 2, 3, 5, 8, 13, 20, 40, 100. Sayılar büyüdükçe aralarındaki boşluk bilinçli olarak genişler. 20 puanlık bir hikayeyi 21 puanlık bir hikayeden kimse dürüstçe ayırt edemez; bu yüzden 21 kartı yoktur, deste doğrudan 40\'a atlar. Hikaye büyüdükçe tahmin de daha az kesin olur ve deste bunu yapısına yansıtır.',
      paragraphs: [
        'Büyüyen aralıkların olağan gerekçesi Weber–Fechner ilkesidir: insanlar farkları, karşılaştırdıkları şeyin büyüklüğüyle orantılı olarak algılar. 1 ile 2 arasındaki bir puanlık fark hemen göze çarpar; 40 ile 41 arasındaki aynı fark ise neredeyse hissedilmez. Adımları yaklaşık orantılı büyüyen bir ölçek, tahmin yapanların büyüklüğü gerçekte nasıl algıladığıyla örtüşür.',
        'Çoğu destede [özel kartlar](/planning-poker-cards) da vardır. "?" "bu hikayeyi tahmin edecek kadar iyi anlamadım", sonsuz işareti "bu çok büyük, bölünmeli", kahve fincanı ise "molaya ihtiyacım var" demektir. 0 kartı önemsiz derecede küçük işler içindir ve idareli kullanılmalıdır. Fibonacci\'nin alternatifleri arasında [T-shirt bedenleri](/t-shirt-sizing) (XS\'ten XL\'e), 2\'nin kuvvetleri (1, 2, 4, 8, 16, 32) ve özel desteler bulunur; hangisini seçtiğin, aynı desteyi tutarlı biçimde kullanman kadar önemli değildir.',
      ],
    },
    {
      title: 'Planning Poker Neden Daha İyi Tahminler Sağlar?',
      content: 'Planning Poker, kartlar sihirli olduğu için değil, grup kararlarında sık görülen bazı tuzakları önlediği için işe yarar:',
      items: [
        'Çapa etkisini ortadan kaldırır. Kartlar açılana kadar gizli kaldığı için ilk söylenen sayı diğerlerini kendine doğru çekemez. Ekiplerin bu tekniği benimsemesinin en büyük nedeni budur.',
        'Herkesi katılmaya zorlar. Tahmin yapan herkes bir kart açmak zorundadır; böylece sessiz ekip üyeleri de bir sayının arkasında durur.',
        'Örtük varsayımları açığa çıkarır. Tahminler arasındaki büyük bir dağılım, neredeyse her zaman birinin diğerlerinin bilmediği bir şeyi bildiği anlamına gelir: bir bağımlılık, kırılgan bir modül ya da işi önemsizleştiren hazır bir yardımcı fonksiyon.',
        'Mutlak değil, göreli tahmin yaptırır. "Bu, şifre sıfırlama hikayesinden büyük mü?" sorusunu iyi yanıtlamak, "bu kaç saat sürer?" sorusunu yanıtlamaktan çok daha kolaydır.',
      ],
    },
    {
      title: 'Uygulamalı Örnek: Üç Hikayeyi Tahmin Etmek',
      content: 'Bir ekibin "Şifresini unutan kullanıcıya e-postayla sıfırlama bağlantısı gönder" hikayesini referans 3, "Yönetici raporlama panelini oluştur" hikayesini de 13 olarak kabul ettiğini varsayalım. Product Owner, backlog refinement toplantısına üç yeni hikaye getiriyor.',
      paragraphs: [
        'Hikaye A: "Kullanıcı profilini kaydettikten sonra bir onay bildirimi göster." Herkes 1 ya da 2 açıyor; iş, var olan bir arayüz kalıbını izliyor. Ekip 2 yazıyor ve bir dakika dolmadan sıradakine geçiyor.',
        'Hikaye B: "Kullanıcılar sipariş geçmişlerini CSV olarak dışa aktarabilsin." Kartlar 3, 5, 5, 8, 13 geliyor. 13 veren kişi, sipariş geçmişinin iki servise yayıldığını ve büyük hesaplar için dışa aktarmanın sayfalanması gerektiğini açıklıyor. 3 veren kişi tek bir tablo varsaydığını kabul ediyor. Yeniden oylamada kartlar 8, 8, 8, 5, 8 geliyor ve ekip 8 yazıyor.',
        'Hikaye C: "Yeni ödeme sağlayıcısını entegre et." Ekibin yarısı "?", diğer yarısı 40 ya da sonsuz veriyor. Kimse sağlayıcının dokümantasyonunu görmemiş. Ekip bir sayıyı zorlamıyor; dokümantasyonu okumak için kısa bir spike açıyor ve hikayeyi gelecek hafta yeniden tahmin ediyor. İyi yürütülen bir oturum, dakikalarını görüş ayrılığının olduğu yere harcar.',
      ],
    },
    {
      title: 'Planning Poker ve Diğer Çevik Tahmin Teknikleri',
      content: 'Planning Poker, bir backlog\'u boyutlandırmanın tek yolu değildir. Yaygın alternatiflerle karşılaştırması şöyle:',
      items: [
        'Uzman ya da yukarıdan aşağıya tahmin (sayıları tek bir lider belirler): hızlıdır, ama yalnızca bir kişinin bilgisini yansıtır, iyimserliğe kayar ve ekibe tahmin üzerinde sahiplik duygusu vermez.',
        'T-shirt boyutlandırma (XS\'ten XL\'e): daha hızlı ve daha az ürkütücüdür; büyük bir backlog\'u ilk kez elden geçirirken ya da teknik olmayan katılımcılarla iyi çalışır, ancak ayrıntı düzeyi daha düşüktür ve velocity için doğrudan toplanamaz. Birçok ekip erken aşamada T-shirt bedenleriyle boyutlandırır, sprint düzeyindeki öğeler için Planning Poker\'e geçer.',
        'Affinity estimation ya da kova sistemi: ekip onlarca hikayeyi sessizce büyüklük gruplarına ayırır, ardından tartışır. Tüm backlog\'u tek oturumda boyutlandırmak için mükemmeldir; tek bir çetrefilli hikaye içinse zayıf kalır.',
        'Saat bazlı tahmin: kesin görünür ama kırılgandır, çünkü işi kimin yapacağına bağlıdır. Çevik ekiplerin çoğu puanla tahmin yapar ve süre öngörülerini velocity\'den çıkarır.',
      ],
    },
    {
      title: 'Sık Yapılan Planning Poker Hataları (ve Çözümleri)',
      content: 'Planning Poker\'e yönelik şikayetlerin çoğu, kaçınılabilecek birkaç hataya dayanır:',
      items: [
        'Puan kartlarıyla saat tahmini yapmak. Ekip 5 puanı gizlice 5 saat olarak düşünüyorsa göreli tahminin faydaları kaybolur. Çözüm: her zaman referans hikayeyle karşılaştır, asla saatle değil.',
        'Tartışmayı atlamak. Kartların ortalamasını almak işin özünü kaçırır; asıl değer, en yüksek ve en düşük tahmini verenler arasındaki konuşmadadır. Çözüm: yeniden oylamadan önce uç değerleri verenler söz alır.',
        'Kıdemli birinin ilk konuşmasına izin vermek. Teknik lider oylar verilmeden "bu belli ki 3" derse kartları açmanın bir anlamı kalmaz. Çözüm: kartlar açılana kadar kimse sayı söylemez.',
        'Referans hikaye belirlememek. Ortak bir başlangıç noktası olmadan herkes kendi kafasındaki ölçeği kullanır. Çözüm: iyi anlaşılmış, tamamlanmış bir iki hikayeyi oturum boyunca göz önünde tut.',
        'Tahmini bir taahhüt gibi görmek. Story point\'ler bir söz değil, büyüklük bildirir. Puanlarını "tutturamadığı" için cezalandırılan ekipler puanları şişirmeyi öğrenir ve sayılar anlamını yitirir.',
      ],
    },
    {
      title: 'Planning Poker Ne Zaman Kullanılmalı, Ne Zaman Kullanılmamalı?',
      content: 'Planning Poker, tahminin birden çok bakış açısından fayda gördüğü ve yanlış bir tahminin gerçek bir bedeli olduğu durumlarda doğru araçtır. Her iş için doğru araç değildir.',
      items: [
        'Backlog refinement ve sprint planlamada kullan; önümüzdeki bir iki sprinte girecek her hikayenin bir büyüklüğe ihtiyacı vardır.',
        'Bilgi, farklı uzmanlıklardan oluşan bir ekibe dağılmışsa kullan: front-end, back-end, QA ve operasyon aynı hikayede çoğu zaman farklı riskler görür.',
        'Yüz öğelik bir backlog\'un ilk taramasında kullanma; önce T-shirt bedenleriyle kabaca sırala, sonra üst sıralardaki öğeleri poker ile tahmin et.',
        'Hazır olmayan hikayelerde kullanma. Önce bir spike ya da Product Owner ile bir konuşma gerekir.',
      ],
    },
    {
      title: 'Uzaktan ve Hibrit Ekiplerle Planning Poker',
      content: 'Fiziksel kartlar görüntülü görüşmede işe yaramaz; bu yüzden uzaktan çalışan ekipler çevrim içi bir araç kullanır. Temel ihtiyaçlar basittir: gizli oylama, kartların tek seferde ve aynı anda açılması, sonuçların herkes tarafından görülmesi ve ekibin alışık olduğu bir deste.',
      paragraphs: [
        'Scrum Poker Online tam da bu akış üzerine kurulmuş ücretsiz bir seçenektir: [bir oda oluştur](/), bağlantıyı paylaş; 50 kişiye kadar katılımcı kayıt olmadan oy verebilir. Fibonacci, T-Shirt, 2\'nin kuvvetleri ve özel desteleri desteklediği için ekip zaten kullandığı ölçeği koruyabilir. Araç hangisi olursa olsun, kolaylaştırma kuralları değişmez.',
      ],
    },
  ],
  faq: [
    {
      q: 'Planning Poker ile Scrum Poker aynı şey mi?',
      a: 'Evet. Aynı tahmin tekniğinin iki farklı adıdır. "Planning Poker" asıl addır; "Scrum Poker" ise tekniği kullanan ekiplerin çoğunun Scrum ile çalıştığını yansıtır.',
    },
    {
      q: 'Planning Poker neden Fibonacci dizisini kullanır?',
      a: 'Çünkü sayılar büyüdükçe aralarındaki mesafe de büyür ve bu, insanların büyüklüğü algılama biçimiyle örtüşür: 2 ile 3\'ü ayırt etmek kolaydır, ama 20 ile 21\'i kimse güvenilir biçimde ayırt edemez. Mike Cohn\'un yaygınlaştırdığı değiştirilmiş deste, büyük değerleri de aynı nedenle yuvarlar.',
    },
    {
      q: 'Planning Poker\'e kimler katılmalı?',
      a: 'İşi yapacak herkes: geliştiriciler, test uzmanları ve teslimat ekibindeki diğer herkes. Product Owner hikayeleri sunar ve soruları yanıtlar ama oy vermez; yöneticiler izleyebilir ama kart tutmamalıdır.',
    },
    {
      q: 'Bir Planning Poker oturumu ne kadar sürmeli?',
      a: 'Hikaye başına birkaç dakika, oturum başına da en fazla bir iki saat hedefle. Tek bir hikaye bundan çok daha uzun sürüyorsa, genellikle daha fazla tartışmak yerine hikayeyi bölmek ya da netleştirmek gerekir.',
    },
    {
      q: '? ve sonsuz kartları ne anlama gelir?',
      a: '"?" kartı, tahmin yapan kişinin hikayeyi boyutlandıracak kadar iyi anlamadığını gösterir. Sonsuz kartı, hikayenin tahmin edilemeyecek kadar büyük olduğunu ve parçalara ayrılması gerektiğini gösterir. İkisi de oylamayı bırakıp önce hikayeyi netleştirme işaretidir.',
    },
  ],
};

export default tr;
