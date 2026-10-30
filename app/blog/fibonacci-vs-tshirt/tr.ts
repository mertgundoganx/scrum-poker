import type { Localized } from '../articleTypes';

const tr: Localized = {
  title: 'Fibonacci mi, T-Shirt Boyutlandırma mı? Hangisini Kullanmalı?',
  subtitle: 'En popüler iki tahmin ölçeğinin nasıl çalıştığı, Fibonacci\'de aralıkların neden büyüdüğü, hangisinin ne zaman uygun olduğu ve birinden diğerine nasıl dönüştürüleceği.',
  sections: [
    {
      title: 'Fibonacci mi, T-Shirt Boyutlandırma mı? Kısa Cevap',
      content: 'Toplanabilen, velocity olarak izlenebilen ve sprint öngörüsünde kullanılabilen sayılara ihtiyacın varsa Fibonacci story point\'lerini kullan. Göreli büyüklük hakkında hızlı ve zahmetsiz bir fikir edinmek istiyorsan T-shirt boyutlandırmayı kullan; örneğin büyük bir backlog\'u ilk kez elden geçirirken, paydaşlarla yol haritası konuşurken ya da ekibin tahmine yeni başlamışken. Birçok ekip ikisini birlikte kullanır: uzak gelecekteki işlerin kaba boyutlandırması için T-shirt, sprinte girmek üzere olan hikayeler için Fibonacci. Hiçbir ölçek tek başına "daha doğru" değildir; fark, ayrıntı düzeyinde ve sonucu sonradan ne için kullanabildiğindedir.',
    },
    {
      title: 'Çevik Tahminlemede Fibonacci Nedir?',
      content: '[Fibonacci tahmini](/fibonacci-planning-poker), backlog öğelerine Fibonacci dizisinden alınan değerlerle story point verir. Bu dizide her sayı kendinden önceki iki sayının toplamıdır: 1, 2, 3, 5, 8, 13, 21, 34. Çevik ekiplerin çoğu, Mike Cohn\'un "Agile Estimating and Planning" kitabıyla yaygınlaşan değiştirilmiş sürümü kullanır: 0, 1, 2, 3, 5, 8, 13, 20, 40, 100. Büyük değerler yuvarlanmıştır, çünkü 20 yerine 21 demek kimsenin gerçekte sahip olmadığı bir kesinliği ima ederdi.',
      paragraphs: [
        '8 verilen bir hikaye sekiz saat de değildir, sekiz gün de. Bu değer, ekibin efor, karmaşıklık, belirsizlik ve riski birlikte düşünerek hikayeyi bir 5\'ten belirgin biçimde büyük, bir 13\'ten belirgin biçimde küçük bulduğu anlamına gelir. Puanlar ancak ekibin zaten bildiği bir referans hikayeye göre anlam kazanır; örneğin "şifre sıfırlama akışı 3 puandı". Fibonacci, Planning Poker\'de ve çoğu araçta varsayılan destedir.',
      ],
    },
    {
      title: 'Aralıklar Neden Büyür? Fibonacci Ölçeğinin Mantığı',
      content: 'Tahmin açısından dizinin belirleyici özelliği, her adımın bir öncekinin yaklaşık 1,6 katı olmasıdır; bu yüzden sayılar büyüdükçe aralıklar da açılır. Bu yapı, insanların büyüklüğü algılama biçimiyle örtüşür. 2 puanlık bir hikayeyi 3 puanlık bir hikayeden herkes ayırt edebilir. 20 ile 21\'i ise kimse dürüstçe ayırt edemez. Doğrusal bir ölçek (1, 2, 3, 4, 5, 6, 7, 8...) ekibin aslında yapamayacağı ayrımlar üzerine tartışmaya davetiye çıkarır.',
      paragraphs: [
        'Bunun gerekçesi olarak genellikle psikofizikteki Weber–Fechner ilkesi gösterilir: bir insanın fark edebildiği en küçük fark, karşılaştırılan şeyin büyüklüğüyle orantılıdır. Adımları orantılı olarak büyüyen bir ölçek bu sınıra uyar; böylece her kart, ekibin gerçekten algılayabildiği bir farkı temsil eder. Ekip 20 ile 40 arasında kaldığında dürüst cevap çoğu zaman "henüz yeterince bilmiyoruz" olur; bu durumda hikaye üzerine tartışmak yerine hikayeyi bölmek ya da bir spike ile araştırmak gerekir.',
      ],
    },
    {
      title: 'T-Shirt Boyutlandırma Nedir?',
      content: '[T-shirt boyutlandırma](/t-shirt-sizing), backlog öğelerini adını giysi bedenlerinden alan birkaç gruba ayırır: XS, S, M, L, XL ve bazen XXL. Fibonacci gibi göreli bir ölçektir, ama bilinçli olarak kaba tutulmuştur. "M" yalnızca "M dediğimiz diğer işlerle aşağı yukarı aynı büyüklükte" demektir; bunun neye karşılık geldiğine ekip gerçek örnekler üzerinden karar verir.',
      paragraphs: [
        'Çekiciliği, bedenlerin sayı olmamasından gelir. Onları toplama, saate çevirme ya da bir işin 5 mi 6 mı olduğunu tartışma isteği doğmaz. Teknik olmayan paydaşlar bedenleri kolayca kavrar; daha önce hiç tahmin yapmamış bir ekip bile ilk oturumunda işe yarar T-shirt bedenleri çıkarabilir. Ölçek, bir çeyreğin yol haritası ya da bir grup epic gibi çok sayıda öğeyi tek seferde boyutlandırırken öne çıkar.',
      ],
    },
    {
      title: 'T-Shirt Boyutlandırma Pratikte Nasıl Uygulanır?',
      content: 'Bir T-shirt boyutlandırma oturumu kısa sürer; kartlarla, yapışkan notlarla ya da çevrim içi bir desteyle yapılabilir:',
      items: [
        '1. Referans öğeleri birlikte belirle. Ekibin açıkça S olduğunda hemfikir olduğu bir öğe ile açıkça L olan bir öğe seç. Diğer tüm öğeler bunlara göre boyutlandırılır.',
        '2. Her öğeyi kısaca sun. Product Owner işi tek cümleyle anlatır; boyutlandırmayı engellemedikçe ayrıntılı sorular sonraya bırakılır.',
        '3. Herkes bedenini gizlice seçer ve tıpkı Planning Poker\'deki gibi kartlar aynı anda açılır; böylece ilk söylenen beden odadakileri peşinden sürüklemez.',
        '4. Yalnızca uç değerleri tartışmaya aç. Ekibin çoğu M, bir kişi XL diyorsa o kişi neyi gördüğünü anlatır.',
        '5. Bedeni kaydet ve devam et. Ölçek daha az tartışmaya yol açtığı için tipik bir oturumda saat başına, bir Fibonacci oturumundakinden çok daha fazla öğe ele alınır.',
        '6. Gerekirse sonra dönüştür. Backlog\'un üst sıralarına yaklaşan öğeler, ekip sprint planlamaya hazır olduğunda story point ile yeniden tahmin edilir.',
      ],
    },
    {
      title: 'Fibonacci ve T-Shirt Boyutlandırma: Yan Yana Karşılaştırma',
      content: 'Kriter kriter pratik farklar:',
      items: [
        'Ayrıntı düzeyi: Fibonacci yaklaşık on farklı değer sunar; T-shirt boyutlandırma beş ya da altı. Fibonacci 5 ile 8\'i birbirinden ayırabilir; T-shirt ikisini de aynı M ya da L grubuna koyar.',
        'Aritmetik: Fibonacci puanları toplanarak sprint toplamına, ortalaması alınarak velocity\'ye dönüşür. T-shirt bedenleri ise her beden önce bir sayıya eşlenmeden toplanamaz.',
        'Öngörü: velocity ile birlikte Fibonacci puanları "bu kaç sprint sürer?" sorusuna cevap verir. T-shirt bedenleri ise "bu çeyrek kabaca ne kadar büyük?" sorusuna cevap verir.',
        'Hız: T-shirt boyutlandırma öğe başına daha hızlıdır ve büyük bir öğe grubunda uygulaması daha kolaydır. Fibonacci daha yavaştır, çünkü daha ince ölçek daha fazla tartışmaya yol açar.',
        'Öğrenme eğrisi: T-shirt bedenleri ilk bakışta anlaşılır. Fibonacci ise bir referans hikaye ve sayıların neden saat olmadığına dair kısa bir açıklama gerektirir.',
        'Yanlış kullanım riski: Fibonacci puanlarının sessizce saate çevrilme ya da bir verimlilik metriğine dönüştürülme olasılığı daha yüksektir. T-shirt bedenlerinin ise sprint planlamak için fazla belirsiz kalma olasılığı daha yüksektir.',
      ],
    },
    {
      title: 'Fibonacci Story Point\'leri Ne Zaman Kullanılmalı?',
      content: 'Tahminin sonucu planlama hesaplarında kullanılacaksa Fibonacci daha iyi seçimdir:',
      items: [
        'Sprint planlama: ekip bir sprinte kaç hikaye sığacağına karar vermelidir; bu da büyüklükleri toplamak demektir.',
        'Velocity takibi: istikrarlı bir ekip sprintleri karşılaştırmak ve sürümleri kendi geçmişine dayanarak öngörmek ister.',
        'Paydaş öngörüleri: "Bu epic yaklaşık 60 puan, biz de sprint başına ortalama 25 puan tamamlıyoruz" somut ve savunulabilir bir cevaptır.',
      ],
    },
    {
      title: 'T-Shirt Boyutlandırma Ne Zaman Kullanılmalı?',
      content: 'Hız ve erişilebilirlik aritmetikten daha önemliyse T-shirt boyutlandırma öne geçer:',
      items: [
        'Backlog ayıklama: hangilerinin daha fazla netleştirilmeye değer olduğuna karar vermek için onlarca öğeyi boyutlandırmak.',
        'Yol haritası ve çeyreklik planlama: nasılsa sonradan parçalara ayrılacak epic\'leri ya da girişimleri karşılaştırmak.',
        'Yeni ekipler: ilk sprintlerindeki bir ekibin henüz ne velocity geçmişi ne de referans hikayeleri vardır; T-shirt bedenleri ekibi formalitelere boğmadan tahmine başlatır.',
        'Karma katılımcılar: tasarımcılar, ürün yöneticileri ya da iş birimlerinden paydaşlar katıldığında bedenler daha az ürkütücüdür ve taahhüt sanılma olasılıkları daha düşüktür.',
      ],
    },
    {
      title: 'T-Shirt Bedenleri Story Point\'e Dönüştürülebilir mi?',
      content: 'Evet, birçok ekip bunu yapar; ancak eşlemeyi bir gerçek değil, bir kolaylık olarak gör. Yaygın bir eşleme şöyledir: XS = 1, S = 2, M = 3 ya da 5, L = 8, XL = 13, XXL = 20 veya üzeri. Eşlemeyi ekip birlikte belirlemeli, yazıya geçirmeli ve sabit tutmalıdır; çünkü eşlemeyi sessizce değiştirmek velocity geçmişini bozar.',
      paragraphs: [
        'Daha temiz yol hiç dönüştürmemektir: T-shirt bedenlerini epic\'lerde ve uzak gelecekteki öğelerde kullan, tek tek hikayeleri ise sprinte yaklaştıklarında Fibonacci puanlarıyla yeniden tahmin et. T-shirt bedeni kaba bir sıralamaydı; story point tahmini ise daha iyi bilgiyle ve sağlam bir referans hikayeyle yapılır.',
        'Ne yaparsan yap, puanları ya da bedenleri asla [hikaye başına saate çevirme](/blog/story-points-vs-hours). İki ölçek de göreli büyüklüğü anlatır. Süre bilgisi hikaye başına bir formülden değil, bütün sprintler üzerinden ölçülen velocity\'den gelir.',
      ],
    },
    {
      title: 'Uygulamalı Örnek: Aynı Üç Hikaye, İki Ölçekte',
      content: 'Üç hikayeyi netleştiren bir ekip düşün. Ekibin Fibonacci referansı "şifre sıfırlama akışı 3 puandı"; T-shirt referansları ise "sıfırlama akışı = S" ve "yönetici paneli = L".',
      paragraphs: [
        '"Profil kaydedildikten sonra bir onay bildirimi göster." Fibonacci: herkes 1 ya da 2 verir, 2 olarak kaydedilir. T-shirt: herkes XS verir. İki ölçek de aynı sonuca varır ve hiçbiri tartışma gerektirmez.',
        '"Sipariş geçmişini, büyük hesaplar için sayfalanmış biçimde CSV olarak dışa aktar." Fibonacci: kartlar 5, 5, 8, 8, 13 gelir; 13 veren kişi işin iki servisi kapsadığını açıkladıktan sonra ekip 8\'de uzlaşır. T-shirt: aynı hikaye M, M, L, L, L alır; ekip L\'de uzlaşır. Fibonacci tartışması daha net bir sonuç verdi; T-shirt tartışması ise yalnızca hikayenin "M\'den büyük" olduğunu ortaya koydu.',
        '"Yeni ödeme sağlayıcısını entegre et." Fibonacci: ekibin yarısı "?" verir, diğerleri 40 ya da 100; hikaye bir spike\'a gönderilir. T-shirt: herkes XL verir ve ekip bunu gönül rahatlığıyla kaydeder. Burada kaba ölçek bir sorunu gizledi: XL hiçbir şey taahhüt etmediği için üzerinde anlaşmak kolaydı; Fibonacci ise ekibi bilmediğini kabul etmeye zorladı.',
      ],
    },
    {
      title: 'Her İki Ölçekte de Sık Yapılan Hatalar',
      content: 'İki ölçek de referans olmadan ya da yanlış amaçla kullanıldığında öngörülebilir biçimde işlevini yitirir:',
      items: [
        'Fibonacci: puanları saate eşlemek ("5 puan aşağı yukarı bir gün"). Bu noktadan sonra ölçek, dolambaçlı bir saat tahmininden ibarettir ve saat tahmininin bütün kötü alışkanlıkları geri döner.',
        'Fibonacci: puanları bireysel verimliliği ölçmek için kullanmak. Tahminler bir iki sprint içinde şişer ve velocity hiçbir anlam taşımaz olur.',
        'T-shirt: gereğinden fazla beden kullanmak. Her öğede XXS, XS ve S arasında kılı kırk yarmak, sayıların ayrıntı düzeyini aritmetiği olmadan yeniden yaratır. Desten daha fazlasını sunsa bile beş ya da altı grup genellikle yeterlidir.',
        'T-shirt: sprinti yalnızca bedenlerle planlamak. "Üç L ve dört M", sprintin dolu olup olmadığını söylemez. Taahhütte bulunmadan önce dönüştür ya da yeniden tahmin et.',
      ],
    },
    {
      title: 'Diğer Ölçekler: 2\'nin Kuvvetleri ve Özel Desteler',
      content: 'Fibonacci ve T-shirt en yaygın ölçeklerdir, ama tek seçenek değildir. 2\'nin kuvvetleri (1, 2, 4, 8, 16, 32) her kartta değeri tam olarak ikiye katlar ve her adımın net olmasını isteyen ekiplere uyar. Bazı ekipler yalnızca gerçekten kullandıkları değerleri içeren özel bir deste tanımlar; örneğin 1, 2, 3, 5, 8, 13 ve "?".',
      paragraphs: [
        'Scrum Poker Online; Fibonacci, T-Shirt, 2\'nin kuvvetleri ve özel desteleri destekler. Oda sahibi turlar arasında desteyi değiştirebilir; böylece yol haritası oturumundan sprint planlamaya geçmek için araç değiştirmen gerekmez, bir ayarı değiştirmen yeterlidir. Ücretsizdir, kayıt gerektirmez ve bir odaya 50 kişiye kadar katılabilir.',
      ],
    },
    {
      title: 'Tavsiyemiz',
      content: 'Ekibin sprintlerle planlama yapıyor, velocity takip ediyor ya da story point\'leri zaten kullandığı araçlarda tutuyorsa Fibonacci ile başla. Ekip tahmine yeniyse, backlog büyük ve henüz kabaysa ya da oturuma teknik olmayan paydaşlar katılıyorsa T-shirt boyutlandırmayla başla. Uzun bir yol haritan varsa ikisini birlikte kullan: uzak geleceği sıralamak için T-shirt, önümüzdeki birkaç sprint için Fibonacci. Hangisini seçersen seç, denemek için [ücretsiz bir planning poker odası aç](/), herkesin görebileceği bir referans öğe bulundur, kartları aynı anda aç ve sonucu asla hikaye başına saate çevirme.',
    },
  ],
  faq: [
    {
      q: 'Çevik tahminlemede neden Fibonacci dizisi kullanılır?',
      a: 'Çünkü ardışık değerler arasındaki aralıklar değerlerle birlikte büyür ve bu, insanların büyüklük farklarını algılama biçimiyle örtüşür. Bir ekip 2 ile 3\'ü ayırt edebilir ama 20 ile 21\'i edemez; bu yüzden deste, kimsenin ayırt edemeyeceği değerleri atlar.',
    },
    {
      q: 'T-shirt boyutlandırma ile story point aynı şey mi?',
      a: 'Hayır. İkisi de göreli tahmin ölçeğidir; ancak story point\'ler toplanabilen ve velocity\'ye dönüştürülebilen sayılardır, T-shirt bedenleri ise üzerinde anlaşılmış bir eşleme olmadan toplanamayan kategorilerdir.',
    },
    {
      q: 'T-shirt bedenlerini story point\'e nasıl dönüştürürüm?',
      a: 'Ekip olarak bir eşleme belirle, örneğin XS = 1, S = 2, M = 3 ya da 5, L = 8, XL = 13; bunu yazıya geçir ve sabit tut. Daha da iyisi, mekanik olarak dönüştürmek yerine hikayeleri sprinte yaklaştıklarında puanla yeniden tahmin et.',
    },
    {
      q: '1 story point 1 saate mi eşittir?',
      a: 'Hayır. Story point\'ler zamanı değil, göreli büyüklüğü anlatır. Süre öngörüleri hikaye başına bir dönüşümden değil, bütün sprintler üzerinden ölçülen velocity\'den gelir.',
    },
    {
      q: 'Yeni bir çevik ekip için hangi ölçek daha uygun?',
      a: 'Başlangıç için genellikle T-shirt boyutlandırma daha kolaydır, çünkü referans hikaye ya da velocity geçmişi gerektirmez. Ekibin referans alabileceği birkaç tamamlanmış hikayesi olduğunda sprint planlama için Fibonacci\'ye geçebilir.',
    },
  ],
};

export default tr;
