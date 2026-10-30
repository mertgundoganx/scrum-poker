import type { LegalContent } from '@/app/ContentPage';

const tr: LegalContent = {
  title: 'Gizlilik Politikası',
  updated: 'Son güncelleme: 30 Ekim 2026',
  intro: 'Bu politika, Scrum Poker Online\'ın (scrumpokerplay.com, "Hizmet") hangi verileri, neden, ne kadar süreyle ve kimlerle işlediğini açıklar. Hizmet, Türkiye\'de yerleşik bir gerçek kişi olan Mert Gündoğan ("biz") tarafından işletilir; burada anlatılan işlemeden sorumlu veri sorumlusu da biziz. İletişim: contact@scrumpokerplay.com. Hizmet AB/AEA\'daki kişilere de sunulduğu için AB Genel Veri Koruma Tüzüğü (GDPR) uygulanır (md. 3/2); Türk kişisel verilerin korunması hukuku (KVKK, 8. bölüm) da uygulanır. Hizmette kullanıcı hesabı yoktur. Kullanım Koşullarımız: https://www.scrumpokerplay.com/tr/terms.',
  sections: [
    {
      title: '1. İşlediğimiz veriler',
      items: [
        'Hesap yoktur: sizden e-posta adresi ya da şifre istemeyiz; herhangi bir giriş (oturum açma) işlemi de yoktur.',
        'Odada: seçtiğiniz görünen ad (gerçek adınız olması gerekmez), isteğe bağlı emoji avatar, tarayıcınızın oluşturduğu rastgele bir tanımlayıcı ve odanın içeriği — oda adı, hikayeler, oylar ve tur geçmişi, nihai tahminler, sohbet mesajları (her odanın son 30 mesajı) ve ortak zamanlayıcı.',
        'Odadaki diğer kişilerin gördükleri: odadaki herkes adınızı, avatarınızı, oy verip vermediğinizi, izleyici ya da uzakta olup olmadığınızı, sohbet mesajlarınızı ve açıldıktan sonra oylarınızı görür. Tur geçmişi (her turun hikayesi ve oda anonim değilse kimin ne oy verdiği) ile son 30 sohbet mesajı, oda var olduğu sürece odaya sonradan katılanlara da gösterilir; odadaki herkes tur geçmişini adlar ve oylar dahil CSV ya da Markdown olarak indirebilir veya kopyalayabilir — bu kopyalar üzerinde hiçbir kontrolümüz yoktur. Anonim odalarda açılan kartlar adlar olmadan gösterilir ve saklanır. Emoji tepkileri ve dürtmeler (dürtme, dürtülen kişiye adınızı gösterir) canlı olarak gösterilir ve hiçbir zaman saklanmaz. Oda ayrıca oda sahibinin, oda sahibinin odadan çıkardığı kişilerin ve saklanan bir odanın sahiplerinin rastgele tanımlayıcılarını tutar.',
        'Saklanan odalar: oda sahibi bir odayı saklarsa, odanın kodunu, adını, destesini (özel kartlar dahil) ve ayarlarını (otomatik açılış, anonim oylama, turu yalnızca oda sahibinin yönetmesi, tepkilerin açık ya da kapalı olması ve oda sahibinin girdiği görev bağlantısı adres kalıbı), hikaye kuyruğunu, en fazla 50 olmak üzere son turlarının sonuçlarını (her biri için yalnızca hikaye metni, üzerinde uzlaşılan tahmin ve turun bittiği zaman — ad yok, tek tek oylar yok), sahip anahtarının SHA-256 özetini (hash; anahtarın kendisini asla saklamayız) ve odanın ne zaman saklandığını tutarız. Biri oda adına ya da hikayelere yazmadıkça bunlar normalde kişisel veri içermez ve saklanan bir odayı herhangi bir kişiyle ilişkilendirmeyiz.',
        'IP adresi: IP adresinizi kötüye kullanımı sınırlamak için kullanırız (istek sınırlaması ve bir adresin aynı anda açık tutabileceği oda ve bağlantı sayısının sınırlanması). Bu kayıtlar yalnızca sunucunun belleğinde tutulur; veritabanına ya da yedeklerine hiçbir zaman yazılmaz. IP adresiniz ayrıca ters vekil sunucunun erişim kaydında da yer alır (bkz. Kayıtlar).',
        'Kayıtlar: uygulamanın kayıtları olayları (bir odanın oluşturulması, birinin katılması veya odadan çıkarılması) oda kodu ve rastgele tanımlayıcıyla birlikte kaydeder; IP adreslerini ve oda içeriğini kaydetmez. Uygulamanın önündeki ters vekil sunucu (reverse proxy; dağıtım aracımızın aynı sunucuda çalıştırdığı Caddy) her isteği kaydeder: zamanı, alan adını (host), yöntemi, sorgu dizesi olmadan yolu, durum kodunu, süreyi, boyutu ve IP adresinizi.',
        'Ziyaret istatistikleri: Cloudflare Web Analytics\'in betiği (static.cloudflareinsights.com) sayfa adresini, yönlendiren sayfayı, tarayıcı türünüzü ve sayfa yükleme sürelerini Cloudflare\'e gönderir; Cloudflare bu istekle birlikte IP adresinizi de alır. Betik çerez yerleştirmez ve cihazınızda hiçbir şey saklamaz; biz yalnızca toplu rakamları (sayfalar, ülkeler, tarayıcılar) görürüz ve hakkınızda profil oluşturulmaz.',
        'E-posta: contact@scrumpokerplay.com adresine yazarsanız, Cloudflare Email Routing mesajınızı Microsoft Outlook\'taki (Microsoft Corporation, ABD) posta kutumuza iletir; Microsoft bu posta kutusunu bizim adımıza değil, kendi koşullarıyla ve kendisi veri sorumlusu olarak sunar. E-posta adresinizi ve mesajınızı yalnızca size yanıt vermek için işleriz.',
      ],
    },
    {
      title: '2. Cihazınızda tutulanlar',
      items: [
        'Çerezler: kendimiz tek bir tür çerez yerleştiririz — katıldığınız her oda için imzalı bir oda çerezi. Yalnızca o odanın API\'sine gönderilir; rastgele tanımlayıcınızı, oda kodunu ve bir geçerlilik süresini içerir; 2 saat geçerlidir ve odayı kullandıkça yenilenir. Bunun yanında Cloudflare\'in bot koruması tarayıcınızda kısa bir otomatik kontrol çalıştırabilir ve scrumpokerplay.com için cf_clearance (en fazla bir yıl geçerlidir) gibi güvenlik çerezleri yerleştirebilir; bu çerezler yalnızca tarayıcıları otomatik trafikten ayırt etmek için kullanılır. Cloudflare ayrıca tarayıcınızdan ağ hatalarını Cloudflare\'e bildirmesini isteyebilir (Network Error Logging); tarayıcınız bu talimatı en fazla 7 gün saklar. Bunların dışında hiçbir çerez yerleştirmeyiz.',
        'Bu çerezler ve aşağıda anlatılan tarayıcı depolaması, istediğiniz hizmeti sunmak, hizmeti güvenli tutmak ya da seçtiğiniz ayarları hatırlamak için kesinlikle gereklidir; bu nedenle onay gerektirmez (ePrivacy Direktifi md. 5/3; Almanya için TDDDG § 25/2, bent 2). Bu yüzden çerez uyarısı yoktur.',
        'Tarayıcınızın yerel depolaması: seçtiyseniz diliniz; tema ve ses ayarlarınız; görünen adınız, avatarınız ve rastgele tanımlayıcınız; son açtığınız en fazla 5 oda (kodu, adı ve ne zaman açtığınız); bu tarayıcıda saklanan en fazla 50 odanın sahip anahtarları, kodları ve adları; oda ipucunu kapatıp kapatmadığınız ve her oda için, bir sekmeyi kapattığınızda odadan çıkmamanız için açık sekmelerinizin kısa bir listesi.',
        'Oturum depolaması: son okuduğunuz sayfanın dili (oradan açtığınız bir oda o dilde başlasın diye); bu sekmenin bir kez tarayıcınızın diline yönlendirildiğine dair bir not ve yalnızca bir sahip bağlantısı açılırken kısa bir an için o bağlantının sahip anahtarı.',
        'Çevrimdışı kullanım: hizmet çalışanı (service worker), sitenin çevrimdışı da çalışması için sayfaları (oda sayfaları hariç) ve statik dosyaları tarayıcınızda saklar.',
        'Yerel depolama ve hizmet çalışanının dosyaları, tarayıcınızda sitenin verilerini silene kadar cihazınızda kalır; oturum depolaması sekmeyi kapattığınızda, bir odanın açık sekme listesi de o odanın son sekmesi kapandığında silinir. Adınız, avatarınız ve tanımlayıcınız yalnızca bir oda oluşturduğunuzda ya da bir odaya katıldığınızda (tanımlayıcı ayrıca o odadaki her işlemde oda çerezinin içinde), sahip anahtarı da yalnızca saklanan bir odanın sahibi olduğunuzu kanıtlamak için bize gönderilir.',
      ],
    },
    {
      title: '3. Verileri neden işliyoruz (hukuki sebepler)',
      items: [
        'İstediğiniz hizmeti sunmak — odalar ve saklanan odalar: sözleşmenin ifası (GDPR md. 6/1-b).',
        'Zorunlu olanlar: bir odaya katılmak için bir görünen ad (herhangi bir ad olabilir; gerçek adınız olması gerekmez) girmeniz, tarayıcınızın da rastgele tanımlayıcıyı ve oda çerezini kullanması gerekir. Bunlar olmadan oda çalışamaz. Bunun dışında hiçbir şey zorunlu değildir.',
        'Hizmeti güvenli ve erişilebilir tutmak — istek sınırlaması, kötüye kullanıma ve botlara karşı koruma, kayıtlar ve yedekler: çalışan ve kötüye kullanılmayan bir hizmete ilişkin meşru menfaatimiz (GDPR md. 6/1-f).',
        'Hangi sayfaların kullanıldığını anlamak için ziyaret istatistikleri: meşru menfaatimiz (GDPR md. 6/1-f); hakkınızda profil oluşturulmaz.',
        'E-postalarınızı yanıtlamak: meşru menfaatimiz (GDPR md. 6/1-f).',
        'Hakkınızda hukuki sonuç doğuran ya da sizi benzer biçimde önemli ölçüde etkileyen, yalnızca otomatik işlemeye dayalı kararlar vermeyiz (GDPR md. 22); otomatik istek sınırları yalnızca aşırı istekleri geciktirir ya da reddeder.',
      ],
    },
    {
      title: '4. Ne kadar süre saklıyoruz',
      items: [
        'Oda içeriği (adlar, avatarlar, tanımlayıcılar, hikayeler, oylar ve tur geçmişi, nihai tahminler, sohbet, zamanlayıcı ile odadan çıkarılan kişilerin ve sahiplerin tanımlayıcıları): oda boşaldıktan yaklaşık bir saat sonra, odada hiçbir işlem yapılmamışsa yaklaşık on dakika sonra silinir. Veritabanının diskteki değişiklik kaydı bu içeriği, kayıt bir sonraki sıkıştırılışına kadar, en geç bir sonraki günlük yedeklemeden önceye kadar içermeye devam edebilir. Bir odanın sohbetinden her an yalnızca son 30 mesaj tutulur.',
        'Saklanan odalar: sahipleri saklamayı bırakana kadar ya da sahipleri sahip bağlantısıyla en son geri döndükten 180 gün sonrasına kadar — sahip, odayı sakladıktan sonra bağlantıyla hiç geri dönmezse odanın saklanmasından 30 gün sonrasına kadar; ardından otomatik olarak silinir. Odayı başkalarının açması bu süreyi uzatmaz. Saklanan bir oda daha erken de kaldırılabilir; örneğin sunucunun belleği dolarsa.',
        'İstek sınırlaması için IP adresleri: yalnızca sunucunun belleğinde; zaman pencereleri dolunca (normalde son istekten yaklaşık bir saat içinde) ve uygulama her yeniden başladığında silinir. Hâlâ açık olan bir odayı hangi adresin açtığı: o oda silinene kadar bellekte. Adres başına açık bağlantı sayıları: yalnızca bağlantılar açık olduğu sürece.',
        'Kayıtlar: uygulamanın kayıtları boyuta göre döndürülür — en fazla 10 MB\'lık beş dosya tutulur ve en eski dosyanın üzerine yazılır; uygulama yeniden dağıtıldığında, yerine yenisi gelen örneğin son satırlarının (en fazla 2.000 satır) bir kopyası 14 gün saklanır. Ters vekil sunucunun erişim kaydı toplam 3 × 10 MB ile sınırlı dosyalarda tutulur ve en eskisinin üzerine yazılır; IP adresi içermeyen, dakika başına toplu sayılar 7 gün saklanır.',
        'E-postalar: size yanıt vermek ve konuyu sonuçlandırmak için gerektiği sürece saklanır; hukuki taleplerin ileri sürülmesi, kullanılması veya savunulması için gerekmedikçe bu süre normalde yazışmamızın bitmesinden sonra 12 ayı geçmez.',
        'Yedekler: veritabanı günde bir kez yedeklenir ve her yedek aynı sunucuda 7 gün saklanır. Her yedeklemeden önce veritabanının değişiklik kaydı sıkıştırılır; böylece bir yedek, veritabanında o anda bulunanları içerir. Bu nedenle yedekleme anında bulunan oda içeriği, sohbet ve saklanan odalar bir yedekte en fazla 7 gün daha kalabilir. Yedekler yalnızca bir arızadan sonra Hizmeti geri yüklemek için kullanılır.',
      ],
    },
    {
      title: '5. Veriler nerede saklanır ve hangi sağlayıcılar yer alır',
      items: [
        'Hizmetin sakladığı her şey — tek bir Redis veritabanı, onun yedekleri ve kayıtlar — Hetzner\'in Helsinki\'deki (Finlandiya) veri merkezinde bulunan sunucumuzdadır. Bize gönderilen e-postalar Microsoft Outlook\'taki posta kutumuzda tutulur.',
        'Hetzner Online GmbH (Almanya): veritabanı, yedekleri ve kayıtlarla birlikte sunucumuz; Helsinki\'deki (Finlandiya) veri merkezinde.',
        'Cloudflare, Inc. (ABD): tüm trafik DNS, şifreleme (TLS), botlara ve saldırılara karşı koruma, e-posta yönlendirme ve Web Analytics için Cloudflare\'in ağı üzerinden geçer — normalde size en yakın veri merkezinden; bu merkez AB dışında olabilir. Cloudflare şifreli bağlantıyı sonlandırdığı için, IP adresleri ve aktarım sırasındaki oda içeriği dahil tüm trafiği bizim adımıza işler; oda içeriğini saklamaz.',
        'Microsoft Corporation (ABD): contact@scrumpokerplay.com adresine gönderilen mesajları alan, Microsoft Outlook\'taki posta kutumuzu kendi koşullarıyla sunar; bu posta kutusu bakımından Microsoft, bizim adımıza veri işleyen değil, kendisi veri sorumlusudur.',
        'AB dışına aktarımlar: Cloudflare ve Microsoft, AB-ABD Veri Gizliliği Çerçevesi (EU-U.S. Data Privacy Framework) kapsamında sertifikalıdır (https://www.dataprivacyframework.gov); Cloudflare\'in AB Standart Sözleşme Hükümlerini içeren Veri İşleme Eki (Data Processing Addendum) https://www.cloudflare.com/cloudflare-customer-dpa/ adresindedir. Hizmeti, hakkında AB yeterlilik kararı bulunmayan Türkiye\'den işletiriz; sunucuyu yönetirken verilere oradan erişiriz. Hetzner ve Cloudflare verileri yalnızca bizim adımıza, bize kendi hizmetlerini sunmak için işler.',
      ],
    },
    {
      title: '6. Haklarınız',
      items: [
        'Kişisel verilerinize erişmeyi; bunların düzeltilmesini, dışa aktarılmasını veya silinmesini; işlenmelerinin kısıtlanmasını talep edebilir ve kimlerle paylaşıldıklarını öğrenebilirsiniz (GDPR md. 15–20). Talepleriniz için contact@scrumpokerplay.com adresine yazın; bir ay içinde yanıt veririz (GDPR md. 12/3; karmaşık taleplerde bu süre iki ay daha uzayabilir, bu durumda size bildiririz). Hesap olmadığı ve oda verileri oda boşaldıktan yaklaşık bir saat sonra silindiği için, genellikle sizinle ilişkilendirebileceğimiz hiçbir veri tutmayız; lütfen oda kodunu, odayı yaklaşık ne zaman kullandığınızı ve görünen adınızı belirtin.',
        'Ayrıca bir denetim makamına, özellikle yaşadığınız veya çalıştığınız AB/AEA ülkesindeki makama şikâyette bulunma hakkınız vardır.',
      ],
    },
    {
      title: '7. İtiraz hakkınız',
      content: 'Meşru menfaatlerimize dayanan işlemelere (güvenlik, istek sınırlaması ve bot koruması, kayıtlar ve yedekler, ziyaret istatistikleri, e-postaların yanıtlanması) özel durumunuzdan kaynaklanan sebeplerle her zaman itiraz edebilirsiniz (GDPR md. 21). Bunun için contact@scrumpokerplay.com adresine yazın; menfaatlerinizden, haklarınızdan ve özgürlüklerinizden üstün gelen zorunlu meşru sebeplerimiz olmadıkça ya da veriler hukuki taleplerin ileri sürülmesi, kullanılması veya savunulması için gerekmedikçe bu işlemeyi durdururuz.',
    },
    {
      title: '8. Türk hukuku (KVKK)',
      items: [
        'Türkiye\'de yerleşik olduğumuz için 6698 sayılı Kişisel Verilerin Korunması Kanunu (KVKK) da uygulanır. Veri sorumlusu sıfatıyla, KVKK md. 10\'da öngörülen aydınlatma yükümlülüğümüzü bu politikayla yerine getiririz.',
        'Burada anlatılan kişisel verileri, internet sitesi üzerinden elektronik ortamda, 3. bölümdeki amaçlarla toplarız (KVKK md. 5/2-c: bir sözleşmenin kurulması veya ifasıyla doğrudan ilgili olması ve md. 5/2-f: veri sorumlusunun meşru menfaati). Veriler, 5. bölümde anlatıldığı şekilde Hetzner\'e (Almanya; sunucu Finlandiya\'da), Cloudflare\'e ve Microsoft\'a (ABD) yurt dışına aktarılır.',
        'İlgili kişi olarak KVKK md. 11\'deki haklara sahipsiniz: kişisel verilerinizin işlenip işlenmediğini öğrenme, işlenmişse buna ilişkin bilgi talep etme, işlenme amacını ve amacına uygun kullanılıp kullanılmadığını öğrenme, yurt içinde veya yurt dışında aktarıldığı üçüncü kişileri bilme, düzeltilmesini veya silinmesini ve bu işlemlerin verilerin aktarıldığı üçüncü kişilere bildirilmesini isteme, münhasıran otomatik sistemlerle analiz edilmesi sonucu aleyhinize bir sonucun ortaya çıkmasına itiraz etme ve kanuna aykırı işleme sebebiyle zarara uğramanız hâlinde zararın giderilmesini talep etme. Başvurularınız için contact@scrumpokerplay.com adresine yazın; en geç 30 gün içinde yanıt veririz (KVKK md. 13).',
        'Başvurunuz reddedilirse, süresinde yanıt verilmezse ya da yanıtı yetersiz bulursanız Kişisel Verileri Koruma Kurulu\'na da şikâyette bulunabilirsiniz (KVKK md. 14).',
      ],
    },
    {
      title: '9. Güvenlik',
      content: 'Verileri korumak için makul teknik önlemler alırız. Örneğin bağlantılar şifrelidir (TLS), saklanan odaların sahip anahtarları yalnızca özet olarak saklanır, oda çerezleri imzalıdır ve HttpOnly\'dir (betikler okuyamaz), veritabanına da internetten erişilemez. Hiçbir sistem tamamen güvenli değildir ve güvenliği garanti edemeyiz. Bir veri ihlali olursa mevzuatın gerektirdiği şekilde hareket ederiz.',
    },
    {
      title: '10. Çocuklar',
      content: 'Hizmet 16 yaşından küçüklere yönelik değildir ve onların verilerini bilerek toplamayız. Bir çocuğa ait veri tuttuğumuzu düşünüyorsanız silebilmemiz için bizimle iletişime geçin.',
    },
    {
      title: '11. Değişiklikler',
      content: 'Bu politikayı değiştirebiliriz. Güncel sürüm her zaman tarihiyle birlikte bu sayfadadır. Hesap olmadığı için kimseye ayrıca bildirim göndermeyiz. Sorularınız için: contact@scrumpokerplay.com.',
    },
  ],
};

export default tr;
