import type { Localized } from '../articleTypes';

const tr: Localized = {
  title: 'Uzaktan Sprint Planlama Nasıl Yapılır? Pratik Bir Rehber',
  subtitle: 'Dağıtık Scrum ekipleri için adım adım bir yol haritası: hazırlık, gündem, tahmin, zaman dilimleri, katılım ve uzaktan planlama oturumlarını sessiz sedasız baltalayan hatalar.',
  sections: [
    {
      title: 'Uzaktan Sprint Planlama Neden Farklıdır?',
      content: 'Sprint planlama, ekibin bir sonraki sprintte neyi, nasıl teslim edeceğine karar verdiği Scrum etkinliğidir. Scrum çerçevesinde en çok iş birliği gerektiren toplantıdır: Product Owner öncelikleri, geliştiriciler efor tahminlerini ve teknik görüşlerini getirir; birlikte gerçekçi bir sprint hedefinde uzlaşırlar. Aynı odadayken bu pazarlığın büyük kısmı bakışlarla, yan sohbetlerle ve beyaz tahta başında yürür. Uzaktan sprint planlamada bunların hiçbiri kendiliğinden gelmez; her sinyalin araçlar ve kolaylaştırma yoluyla açık hale getirilmesi gerekir.',
      paragraphs: [
        'İyi haber şu: planlamayı bilinçli biçimde yürüten dağıtık ekipler, çoğu zaman alışkanlıkla hareket eden aynı ofisteki ekiplerden daha iyi oturumlar yapar. Yazılı hazırlık koridor sohbetlerinden gelen bağlamın yerini alır, çevrim içi gizli oylama sosyal baskının bir kısmını ortadan kaldırır ve kararların kaydı, tarayıcıda çalışmanın doğal bir yan ürünü olur. Bu rehber, oraya nasıl ulaşacağını adım adım anlatıyor.',
        'Ekip ister tamamen uzaktan, ister hibrit, ister birkaç zaman dilimine yayılmış olsun; rehber, sprint planlamayı video görüşmesiyle yürüten Scrum Master\'lar, Product Owner\'lar ve ekip liderleri için yazıldı.',
      ],
    },
    {
      title: 'Toplantıdan Önce: Uzaktan Hazırlık Kontrol Listesi',
      content: 'Uzaktan oturumlar, yetersiz hazırlığı yüz yüze oturumlardan çok daha ağır cezalandırır. Biri bir hikayeyi video görüşmesinde ilk kez açtığında, o okurken on kişi sessizce bekler. Okumayı önceden yap ve hiçbir şeyi atlamamak için bir [sprint planlama kontrol listesi](/blog/sprint-planning-checklist) kullan.',
      items: [
        'Planlamadan en az iki üç gün önce backlog\'un en üstündeki öğeleri olgunlaştır. Her aday hikayenin net bir açıklaması, kabul kriterleri ve bilinen bağımlılıkları olmalıdır.',
        'Aday listesini, önerilen sprint hedefine dair kısa bir notla birlikte 24 saat önceden yazılı olarak paylaş.',
        'Ekip üyelerinden hikayelerle ilgili sorularını önceden, yazılı olarak iletmelerini iste; böylece Product Owner görüşmeden önce yanıtlayabilir.',
        'Kapasiteyi netleştir: izinler, nöbetler, yarı zamanlı çalışanlar. Sayıyı yazıya dök; toplantıda tahmin etmeye çalışma.',
        'Aday hikayeleri, poker odasının kuyruğuna her satıra bir hikaye gelecek şekilde yapıştırmaya hazır tut. Odayı görüşme başladığında oluştur ve bağlantıyı hemen görüşmenin sohbetine yaz: Scrum Poker Online\'daki gibi gerçek zamanlı odalar herkes ayrıldıktan yaklaşık bir saat sonra silinir, bu yüzden takvim davetine eklenen bağlantı ancak oda sahibi odayı saklarsa çalışır ("Diğer" menüsü → "Bu odayı sakla").',
        'Kimin kolaylaştıracağına, kimin not tutacağına ve kimin süreyi takip edeceğine önceden karar ver. Görüşmede bu roller kendiliğinden ortaya çıkmaz.',
      ],
    },
    {
      title: 'Uzaktan Sprint Planlama Oturumu İçin Adım Adım Gündem',
      content: 'Oturumu sprint uzunluğuna göre 60 ile 120 dakika arasında tut ve herkesin görebildiği bir gündemi izle. Çoğu dağıtık ekipte işe yarayan bir yapı:',
      items: [
        '1. Açılış turu (5 dk): kısa bir "bu sprinti etkileyen bir durum var mı?" turu — hastalanan bir ekip arkadaşı, yaşanan bir olay, değişen bir sürüm tarihi.',
        '2. Sprint hedefi (10 dk): Product Owner hedefi önerir; ekip, herkes hedefi tek cümleyle kendi sözleriyle ifade edebilene kadar netleştirici sorular sorar.',
        '3. Kapasite (5 dk): hazırlık sırasında yazılan sayıyı teyit et ve açılış turunda çıkan durumlara göre güncelle.',
        '4. Tahmin (30–60 dk): aday hikayeleri öncelik sırasıyla planning poker ile ele al. Oyla, uç değerleri tartış, yeniden oyla, kaydet; adımların ayrıntısı için [scrum poker oturumu yürütme rehberine](/guide) bak.',
        '5. Taahhüt (10 dk): toplamı kapasiteyle ve son sprintlerin velocity\'siyle karşılaştır; plan gerçekçi olana kadar hikaye çıkar ya da böl.',
        '6. Görevlere bölme (isteğe bağlı, 15–30 dk): işe hemen başlanabilmesi için ilk birkaç hikayenin görevlerini kabaca çıkar.',
        '7. Kapanış (5 dk): sprint hedefini yeniden ifade et, açık soruları ve sorumlularını listele, kaydın nerede tutulacağını teyit et.',
      ],
    },
    {
      title: 'Sohbet ya da Tablo Değil, Özel Bir Planning Poker Aracı Kullan',
      content: 'Uzaktan tahminde en sık yapılan hata, sohbet penceresinde oylamaktır. "5" yazan ilk kişi çapa etkisiyle herkesi etkiler, geç yanıt verenler baskı hisseder ve sonunda geriye hiçbir kayıt kalmaz. Ekranda bir tablo paylaşmak da aynı sorunu, üstelik daha zahmetli biçimde yaratır.',
      paragraphs: [
        'Tarayıcı tabanlı bir planning poker aracı bu sorunu kökten çözer. Herkes aynı odayı açar, kartını gizlice seçer ve tüm oylar aynı anda açılır. Scrum Poker Online kayıt gerektirmeyen ücretsiz bir seçenektir: kolaylaştırıcı [bir planning poker odası oluşturur](/), kodu ya da QR bağlantısını paylaşır ve ekip bir dakika içinde oy vermeye başlar. Hikaye kuyruğu backlog sırasını görünür tutar, paylaşılan zamanlayıcı tartışmayı dizginler ve oturum bittiğinde tur geçmişi CSV olarak indirilebilir ya da Markdown olarak kopyalanabilir.',
        'Hâlâ [ücretsiz bir planning poker aracı seçiyorsan](/blog/free-scrum-poker-tools), şunu unutma: araç video görüşmesinin yerini almamalı, onunla birlikte çalışmalıdır. Oylama araçta yapılır; tartışma ise kamerada, yüz yüze.',
      ],
    },
    {
      title: 'Çapa Etkisini ve Sessiz Uyumu Aş',
      content: 'Çapa etkisi, duyulan ilk sayının sonraki tüm tahminleri şekillendirmesidir. Her planlama oturumunda karşılaşılan bir sorundur, ancak uzaktan çalışmada daha da belirginleşir: insanlar ortamın havasını okuyamadığı için ilk konuşanı takip eder, mikrofonun kapalı olması da itiraz etmek yerine sessiz kalmayı kolaylaştırır.',
      items: [
        'Gizli oylar ve eş zamanlı açılış vazgeçilmezdir. Planning poker\'in var olma nedeni tam olarak budur.',
        'Product Owner\'dan ve yöneticilerden izleyici olarak katılmalarını iste. Kart tutmadan izleyebilirler; bu da fark edilmesi zor bir baskı kaynağını ortadan kaldırır.',
        'Oylar açıldıktan sonra en yüksek ve en düşük oyu verenlere adlarıyla söz ver. Görüşmede "açıklamak isteyen var mı?" sorusu genellikle sessizlikle karşılanır.',
        '"?" kartını bir başarısızlık olarak değil, geçerli bir yanıt ve hikayeyi netleştirme çağrısı olarak gör.',
        'Henüz oy vermemiş biri olduğunda bunu tüm görüşmeye duyurmak yerine dürtme özelliğini ya da doğrudan mesajı kullan.',
      ],
    },
    {
      title: 'Zaman Dilimlerini Yönetmek: Eş Zamanlı, Asenkron ya da İkisi Birden',
      content: 'Aralarında iki üç saat fark olan bir ekip genellikle ortak bir zaman aralığı bulabilir. Sekiz saat ya da daha fazla farkla dağılmış bir ekip ise, birileri her sprintte gecenin bir yarısı çalışmadıkça tam bir oturumu canlı yapamaz. Formatı, ekibin gerçekte sahip olduğu ortak çalışma saatlerine göre seç.',
      paragraphs: [
        'Makul bir ortak zaman aralığı varsa onu planlama ve refinement için titizlikle koru; elverişsiz saati dönüşümlü belirle ki bedeli hep aynı bölge ödemesin. Oturumu kaydet ve katılamayanlar için notları aynı gün paylaş.',
        'Ortak zaman aralığı çok kısaysa ya da hiç yoksa işi böl. Hazırlığı asenkron yap: Product Owner olgunlaştırılmış hikayeleri paylaşır, herkes bunları kendi iş günü içinde okur ve sorularını ekler. Ardından tahmini, yalnızca katılabilenlerle bile olsa, kısa ortak aralıkta canlı yap ve bu süreyi tartışma gerektiren hikayelere ayır. Scrum Poker Online gibi gerçek zamanlı araçlar herkesin aynı anda odada olmasını gerektirir; güne yayılan oylamalar için tasarlanmamıştır. Taahhüt ve sprint hedefi tartışması ise iki üç temsilciyle yapılan 30 dakikalık bir görüşme bile olsa, canlı bir konuşmadan yine de fayda görür.',
      ],
      items: [
        'Düşük riskli, iyi anlaşılmış hikayeler: soruları önceden yazılı olarak netleştir; böylece her biri canlı aralıkta tek bir hızlı turda biter.',
        'Açık soruları, yeni teknoloji ya da ekipler arası bağımlılık içeren hikayeler: canlı aralığa ayır.',
        'Nihai tahminleri ve sprint hedefini yalnızca görüşmede söylemekle yetinme; her zaman tüm ekibin çalıştığı yerde yazılı olarak paylaş.',
      ],
    },
    {
      title: 'Uzun Bir Video Görüşmesinde Katılımı Canlı Tut',
      content: 'Uzaktan planlama oturumları yüz yüze olanlardan daha çabuk enerji kaybeder, çünkü her katılımcı e-postasından yalnızca bir tık uzaktadır. Katılım bir kolaylaştırma sorunudur ve bunun pratik çözümleri vardır.',
      items: [
        'Tartışma bölümlerinde kameralar açık, sessiz okuma sırasında kapalı olsun. Kimse yargılandığını hissetmesin diye bunu açıkça söyle.',
        'Her 45 dakikada bir beş dakikalık mola ver. Kahve kartlarını ciddiye al — onlar şaka değil, bir sinyaldir.',
        'Herkese bir görev ver: biri hikayeyi yüksek sesle okur, biri açık soruları takip eder, biri zamanlayıcıyı izler.',
        'Yan notlar ve bağlantılar için yerleşik ekip sohbetini kullan; böylece ses kanalı kararlara ayrılır.',
        'Hızlı uzlaşıyla biten turları sesli olarak kutla. Önemsiz görünebilir, ama biraz ivme insanların dikkatini toplantıda tutar.',
        'Zamanında bitir. Sürekli uzayan bir oturum, insanlara toplantıdan erken kopmayı öğretir.',
      ],
    },
    {
      title: 'Scrum Master İçin Kolaylaştırma İpuçları',
      content: 'Görüşmede kolaylaştırıcının işi, fiziksel bir odada olduğundan daha fazladır: söz sırasını, sessizlikleri ve aracı aynı anda yönetir. Birkaç alışkanlık büyük fark yaratır.',
      paragraphs: [
        'Oylamadan önce her hikayenin başlığını yüksek sesle oku ve herkes önceden okumuş olsa bile Product Owner\'dan 60 saniyelik bir özet iste; bu, grubu aynı noktaya getirir ve geç katılanlara bağlam sağlar. Zamanlayıcıyı özet sırasında değil, oylar açıldığında başlat. Tartışma çözüm tasarımına kaydığında bunu dile getir, tasarım sorusunu notlara yaz ve tahmine geri dön.',
        'Yirmi dakikadır konuşmayan kişileri fark et ve onları adlarıyla davet et. Her uç değeri hep aynı iki kişinin açıkladığını görürsen, sözü herkese açmadan önce üçüncü bir katılımcıya ne düşündüğünü sor. Hikaye kuyruğunu da görünür tut ki herkes ne kadar iş kaldığını görsün; bitiş çizgisi ekrandayken tempoyu korumak daha kolaydır.',
      ],
    },
    {
      title: 'Kayıt Altına Al ve Takip Et',
      content: 'Yazılı bir kayıtla bitmeyen uzaktan oturum, aslında hiç yapılmamış sayılır. Kapanıştan sonraki bir saat içinde, ekibin zaten çalıştığı yerde kısa bir özet paylaş.',
      items: [
        'Tek cümleyle sprint hedefi.',
        'Nihai tahminleriyle birlikte taahhüt edilen hikayeler — elle yeniden yazmak yerine tur geçmişini poker aracından kopyala.',
        'Bekletmeye alınan hikayeler, açık soru ve bir sorumluyla birlikte.',
        'Kapasite varsayımları ve bilinen riskler.',
        'Varsa kaydın bağlantısı.',
      ],
    },
    {
      title: 'Uzaktan Sprint Planlamada Yaygın Hatalar',
      content: 'Dağıtık ekiplerde en sık karşılaşılan başarısızlık biçimleri bunlardır ve hepsinden kaçınmak mümkündür.',
      items: [
        'Planlama sırasında refinement yapmak. Ekip hâlâ "bu hikaye ne anlama geliyor?" diye soruyorsa oturum aslında kılık değiştirmiş bir refinement toplantısıdır.',
        'Sohbette ya da sırayla mikrofonu açarak oylamak; bu, çapa etkisini geri getirir.',
        'Sesi en güçlü bağlantının kazanmasına izin vermek. En iyi mikrofona ve en hızlı internete sahip kişi, en iyi tahmini yapan kişi olmak zorunda değildir.',
        '"Bir şekilde hallederiz" diyerek kapasitenin üzerinde taahhütte bulunmak — uzaktan ekiplerin sprint ortasında toparlanmak için daha az gayriresmî yolu vardır.',
        'Kaydı atlamak. Notlar olmadan, diğer zaman dilimlerindeki kişiler sprinte planla ilgili farklı bir tabloyla başlar.',
        'İki kısa toplantı yerine üç saatlik tek bir toplantı yapmak. Yorgunluk son saati verimsiz kılar.',
      ],
    },
    {
      title: 'Örnek: İki Haftalık Sprint İçin 90 Dakikalık Uzaktan Oturum',
      content: 'Yedi kişilik ekip İstanbul ve Berlin arasında dağılmış; iki şehir arasında yazın bir, kışın iki saat fark var. Refinement salı günü yapıldı; planlama perşembe İstanbul saatiyle 10:00\'da.',
      paragraphs: [
        'Açılış turunda bir geliştiricinin ikinci hafta izinli olduğu, bir diğerinin de iki gün nöbet tutacağı ortaya çıkıyor; bu yüzden kapasite 70\'ten 63 kişi-güne düşüyor. Product Owner "Müşteriler kayıtlı adreslerini yönetebilir" hedefini öneriyor ve ekip hedefi kendi sözleriyle yeniden ifade ediyor. On iki aday hikaye, öncelik sırasıyla poker odasının kuyruğuna yapıştırılıyor. İlk altısında ekip birer turda uzlaşıyor. Yedinci hikaye — "Uluslararası adres formatlarını doğrula" — açıldığında oylar 3, 5, 8, 8 ve 13; 13 veren kişi posta kodu kurallarının ülkeden ülkeye değiştiğini ve bir veri kaynağı gerektirdiğini açıklıyor. Ekip bu hikayeyi bekletmeye ve görüşmeden sonra bölmeye karar veriyor. Sekizinciden on birinciye kadar olan hikayeler ikişer tur sürüyor. On ikinci hikaye 8 puanlık; eklenirse toplam, son sprintlerdeki 31 puanlık velocity\'ye karşılık 34 puana çıkacak, üstelik bu sprintte kapasite onda bir azalmış durumda. Bu yüzden ekip bu hikayeyi çıkarıyor ve 26 puanlık bir taahhütte bulunuyor.',
        'Kapanış dört dakika sürüyor: hedef yeniden ifade ediliyor, on hikaye taahhüt ediliyor, biri bir sorumluyla bekletmeye alınıyor ve tur geçmişi sprint sayfasına kopyalanıyor. Toplam süre: bir molayla birlikte 88 dakika.',
      ],
    },
    {
      title: 'Sade Bir Uzaktan Planlama Araç Seti',
      content: 'Ağır bir araç zincirine ihtiyacın yok. Küçük ve güvenilir bir seti herkese benimsetmek, büyük bir setten çok daha kolaydır:',
      items: [
        'Tartışma için, bağlantısı hiç değişmeyen sabit bir video görüşmesi.',
        'Gizli oylama, hikaye kuyruğu, paylaşılan zamanlayıcı ve dışa aktarılabilir geçmiş sunan tarayıcı tabanlı bir planning poker aracı — Scrum Poker Online bunları ücretsiz sunar; hesap gerekmez.',
        'Hikayeler ve öncelikler için tek doğru kaynak olarak tercih ettiğin backlog aracı.',
        'Sprint özeti ve açık sorular için ortak bir doküman alanı.',
      ],
    },
  ],
  faq: [
    {
      q: 'Uzaktan sprint planlama ne kadar sürmeli?',
      a: 'Scrum Guide, bir aylık sprint için sprint planlamaya en fazla sekiz saat süre tanır; daha kısa sprintlerde genellikle daha az süre yeter. Uzaktan oturumlar insanı daha çabuk yorduğu için birçok ekip sprintin her haftası için yaklaşık bir saati hedefler — iki haftalık bir sprint için iki saat civarı — ve bundan uzun sürecek planlamayı iki oturuma böler. Oturumlar sürekli uzun sürüyorsa backlog toplantıdan önce genellikle yeterince olgunlaştırılmamış demektir.',
    },
    {
      q: 'Sprint planlama asenkron yapılabilir mi?',
      a: 'Kısmen. Hazırlık asenkron olarak gayet iyi yürür: hikayeler paylaşılır, herkes bunları kendi çalışma saatlerinde okur ve sorularını ekler. Oylamanın kendisi ise en iyi canlı yapılır; Scrum Poker Online gibi gerçek zamanlı araçlar da herkesin aynı anda odada olmasını gerektirir. Bu yüzden tahmin için kısa bir ortak zaman aralığı ayır. Sprint hedefinde ve nihai taahhütte anlaşmak da kısa bile olsa canlı bir konuşmada en iyi sonucu verir.',
    },
    {
      q: 'Uzaktan planning poker için en iyi ücretsiz araç hangisi?',
      a: 'Eş zamanlı açılışla gizli oylama, misafirlerin hemen katılabilmesi için kayıt gerektirmemesi, hikaye kuyruğu, zamanlayıcı ve sonuçları dışa aktarma imkânı ara. Scrum Poker Online bu gereksinimleri karşılar; ücretsizdir ve hesap gerekmez. Yine de ekibin için doğru seçim, herkesin gerçekten açıp kullanacağı araçtır.',
    },
    {
      q: 'Product Owner uzaktan planning poker\'de oy vermeli mi?',
      a: 'Hayır. Product Owner hikayeleri açıklar ve soruları yanıtlar; tahmini, işi yapacak geliştiriciler verir. Çoğu araç, Product Owner\'ın kart tutmadan oyların açılışını izleyebilmesi için bir izleyici modu sunar.',
    },
    {
      q: 'Canlı oturuma katılamayan ekip üyelerini nasıl dahil ederiz?',
      a: 'Görüşmeden önce hikayelerle ilgili sorularını ve endişelerini yazmalarını sağla, oturumu kaydet ve aynı gün yazılı bir özet paylaş. Zaman dilimleri yüzünden hep aynı kişiler oturumları kaçırıyorsa, zahmeti paylaştırmak için toplantı saatini dönüşümlü belirle.',
    },
  ],
};

export default tr;
