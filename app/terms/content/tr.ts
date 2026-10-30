import type { LegalContent } from '@/app/ContentPage';

const tr: LegalContent = {
  title: 'Kullanım Koşulları',
  updated: 'Son güncelleme: 30 Ekim 2026',
  intro: 'Bu koşullar, scrumpokerplay.com adresindeki Scrum Poker Online\'ı ("Hizmet") kullanımınız için geçerlidir. Hizmet, Türkiye\'de yaşayan bir gerçek kişi olan Mert Gündoğan ("biz") tarafından işletilir. İletişim: contact@scrumpokerplay.com. Hizmeti kullanarak bu koşulları kabul etmiş olursunuz. Kabul etmiyorsanız Hizmeti kullanmayın. Kişisel verileri nasıl işlediğimiz Gizlilik Politikasında anlatılır: https://www.scrumpokerplay.com/tr/privacy.',
  sections: [
    {
      title: '1. Hizmet',
      content: 'Scrum Poker Online, ekibinizle iş tahmini yapmanız için çevrimiçi bir planning poker aracıdır. Hesap yoktur. Hizmet şu anda ücretsizdir: ücretli plan, abonelik ya da ödeme yoktur. İleride ücretli özellikler eklersek bunların kendi koşulları olabilir.',
    },
    {
      title: '2. Kimler kullanabilir',
      content: 'Hizmeti kullanmak için en az 16 yaşında olmalısınız.',
    },
    {
      title: '3. Odalar',
      items: [
        'Bir odanın kodunu ya da bağlantısını bilen herkes, oda sahibi odayı yeni kişilere kapatmadıkça o odaya katılabilir. Katılımcıları, hikayeleri, açılan oyları ve sohbeti görebilir, oylamaya katılabilir. Oda kodu bir şifre değildir: yalnızca odada olmasını istediğiniz kişilerle paylaşın.',
        'Varsayılan olarak her katılımcı oyları açabilir, yeni tur başlatabilir, hikaye kuyruğunu yönetebilir ve zamanlayıcıyı kullanabilir. Oda sahibi ayrıca desteyi ve oda ayarlarını (otomatik açılış, anonim oylama, turu yalnızca oda sahibinin yönetmesi, odayı yeni katılımlara kapatma, emoji tepkileri, görev bağlantısı adresi) değiştirebilir, katılımcıları odadan çıkarabilir ve oda sahibi rolünü başka birine devredebilir. Çıkarılan kişi, oda var olduğu sürece aynı tarayıcıdan o odaya yeniden katılamaz. Tek istisna, sahip bağlantısıyla odaya geri dönebilen saklanan odanın sahibidir.',
        'Odayı oluşturan kişi ilk oda sahibidir. Oda sahibi ayrılırsa bu rol başka bir katılımcıya geçer. Saklanan bir odayı sahip bağlantısıyla açan kişi, sahip anahtarı olmayan oda sahibinden bu rolü devralır.',
        'Odalar geçicidir. Bir oda ve içeriği normalde oda boşaldıktan yaklaşık bir saat sonra (odada hiçbir işlem yapılmamışsa yaklaşık on dakika sonra) silinir. Saklanan bir odanın (4. madde) yalnızca kurulumu, hikaye kuyruğu ve son sonuçları korunur.',
      ],
    },
    {
      title: '4. Saklanan odalar ve sahip bağlantıları',
      items: [
        'Oda sahibi bir odayı saklayabilir. Bu durumda odanın kurulumu (kodu, adı, destesi ve ayarları), hikaye kuyruğu ve son turlarının sonuçları (hikaye ve üzerinde uzlaşılan tahmin) korunur; oda bağlantısı daha sonra açıldığında oda geri gelir.',
        'Bir odayı saklamak gizli bir sahip bağlantısı oluşturur. Bu bağlantıyı kimseyle paylaşmayın: bağlantıya sahip olan herkes odayı kontrol eder. Oda sahibi rolünü devralır ve odayı saklamayı bırakabilir.',
        'Odayı saklayan tarayıcı sahip bağlantısını hatırlar. Başka bir cihazda kullanmak isterseniz bağlantıyı kopyalayın. Hesap olmadığı için kaybolan bir sahip bağlantısını kurtaramayız.',
        'Saklanan bir oda normalde sahibi saklamayı bıraktığında ya da sahibi sahip bağlantısıyla en son geri döndükten 180 gün sonra otomatik olarak kaldırılır. Sahip, odayı sakladıktan sonra bağlantıyla hiç geri dönmezse oda 30 gün sonra kaldırılır. Oda daha erken de kaldırılabilir (8. madde). Saklanabilecek oda sayısını sınırlayabiliriz.',
      ],
    },
    {
      title: '5. İçeriğiniz ve sorumluluğunuz',
      items: [
        'Girdiğiniz içerik (adlar, oda adları, hikayeler, bağlantılar, oylar, tahminler, sohbet mesajları) sizindir. Bize yalnızca Hizmeti bu içerikle çalıştırmak için gereken izni verirsiniz: içeriği Gizlilik Politikasında anlatıldığı şekilde saklamak ve iletmek, odadaki diğer kişilere göstermek. Odadakiler tur geçmişini dışa da aktarabilir.',
        'Girdiğiniz içerikten siz sorumlusunuz. Gizli bilgi, başkalarının kişisel verilerini, hukuka aykırı ya da paylaşma yetkiniz olmayan hiçbir şeyi girmeyin.',
        'İçeriği incelemeyiz. Bu koşullardaki kuralların çiğnendiğini düşünürsek içeriği ya da odaları kaldırabilir, erişimi engelleyebilir veya sınırlayabiliriz; bunun için önceden haber vermeyiz.',
      ],
    },
    {
      title: '6. Kabul edilebilir kullanım',
      content: 'Hizmeti şunlar için kullanmayın: yasaları çiğnemek; başkalarını taciz etmek, tehdit etmek ya da kimliğine bürünmek; hukuka aykırı, nefret içeren veya müstehcen içerik ya da zararlı bağlantı paylaşmak; Hizmete saldırmak ya da yetkisiz erişim denemek; Hizmetten otomatik veri toplamak (scraping) veya ona otomatik trafik göndermek; Hizmet üzerinde yük ya da stres testi yapmak; Hizmetin sınırlarını veya korumalarını aşmaya çalışmak. Bu kurallara aykırı erişimi engelleyebiliriz.',
    },
    {
      title: '7. Başka sitelere bağlantılar',
      content: 'Odalarda başka sitelere bağlantılar olabilir; örneğin katılımcıların eklediği iş takip aracı (issue tracker) bağlantıları. Bu siteleri kontrol etmeyiz ve denetlemeyiz. Bağlantıyı ekleyen kişi ondan sorumludur; bu bağlantıları açma riski size aittir.',
    },
    {
      title: '8. Hizmetin sürekliliği, veriler ve Hizmette değişiklikler',
      items: [
        'Hizmetin belirli bir zamanda ya da belirli bir süre boyunca erişilebilir olacağını taahhüt etmeyiz. Herhangi bir veriyi saklamayı ya da güvenebileceğiniz yedekler almayı da taahhüt etmeyiz. Odalar ve saklanan odalar her an silinebilir veya kaybolabilir; örneğin teknik bir arızadan sonra.',
        'Önemli olan her şeyin bir kopyasını kendiniz saklayın. Bir odanın tur geçmişini CSV olarak indirebilir ya da CSV veya Markdown olarak kopyalayabilirsiniz.',
        'Hizmeti ya da herhangi bir kısmını veya özelliğini dilediğimiz zaman, önceden haber vermeden ve yasaların izin verdiği ölçüde hiçbir sorumluluk üstlenmeden değiştirebilir, askıya alabilir ya da sonlandırabiliriz.',
      ],
    },
    {
      title: '9. Garanti verilmemesi',
      content: 'Yasaların izin verdiği ölçüde Hizmet "olduğu gibi" ve "mevcut olduğu şekliyle", açık ya da örtülü hiçbir garanti verilmeden sunulur. Özellikle Hizmetin hatasız, güvenli ya da kesintisiz olacağını veya belirli bir amaca uygun olduğunu taahhüt etmeyiz.',
    },
    {
      title: '10. Sorumluluğun sınırlandırılması',
      items: [
        'Yasaların izin verdiği ölçüde dolaylı, arızi, özel ya da sonuç olarak doğan zararlardan, veri kaybından, kâr kaybından, zaman kaybından veya iş kesintisinden sorumlu değiliz.',
        'Hizmet ücretsizdir. Bu nedenle, yasaların izin verdiği ölçüde, Hizmetle ilgili tüm talepler için toplam sorumluluğumuz Hizmet için bize ödediğiniz tutarla, yani sıfırla sınırlıdır.',
        'Bu sınırlar, yasaların sorumluluğun sınırlandırılmasına izin vermediği durumlarda uygulanmaz; özellikle kasten ya da ağır ihmalle verilen zararlar ile hayata, vücut bütünlüğüne veya sağlığa verilen zararlar için. Bu koşullardaki hiçbir hüküm, ülkenizin emredici hukukundan doğan tüketici haklarınızı sınırlamaz.',
      ],
    },
    {
      title: '11. Destek ve bildirimler',
      content: 'Destek vermek, soruları yanıtlamak ya da hataları düzeltmek gibi bir yükümlülüğümüz yoktur. Bildirimlerinizi ve sorularınızı contact@scrumpokerplay.com adresine gönderebilirsiniz. Bildirimlerimizi bu web sitesinde yaparız.',
    },
    {
      title: '12. Bu koşullarda değişiklikler',
      content: 'Bu koşulları dilediğimiz zaman değiştirebiliriz. Güncel sürüm her zaman tarihiyle birlikte bu sayfadadır. Hesap olmadığı için kimseye ayrıca bildirim göndermeyiz. Bir değişiklikten sonra Hizmeti kullanmaya devam ederseniz yeni koşulları kabul etmiş olursunuz.',
    },
    {
      title: '13. Kaynak kodu',
      content: 'Hizmetin kaynak kodu, GNU Affero Genel Kamu Lisansı sürüm 3 kapsamında https://github.com/mertgundoganx/scrum-poker adresinde herkese açıktır. Bu lisans kod için geçerlidir; bu koşullar ise scrumpokerplay.com adresinde çalışan Hizmeti kullanımınız için geçerlidir.',
    },
    {
      title: '14. Ticari markalar',
      content: 'Planning Poker®, Mountain Goat Software, LLC\'nin tescilli ticari markasıdır. Scrum Poker Online\'ın bu şirketle herhangi bir bağlantısı yoktur ve şirket tarafından onaylanmamıştır.',
    },
    {
      title: '15. Son hükümler',
      content: 'Bu koşullar, Hizmetle ilgili olarak sizinle aramızdaki anlaşmanın tamamıdır. Herhangi bir hükmü geçersiz olur ya da uygulanamazsa geri kalanı geçerliliğini korur. Bir hükmü uygulamamamız, o hükümden vazgeçtiğimiz anlamına gelmez.',
    },
    {
      title: '16. İletişim',
      content: 'Bu koşullarla ilgili sorularınız için: contact@scrumpokerplay.com',
    },
  ],
};

export default tr;
