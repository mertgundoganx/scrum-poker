import type { Locale } from '@/lib/translations';

/**
 * Single source of truth for blog post metadata.
 * Used by the blog index (app/blog/page.tsx), the article header (app/blog/BlogArticle.tsx)
 * and the sitemap (app/sitemap.ts).
 */
export interface PostText {
  title: string;
  description: string;
  /**
   * Read time shown on the blog index and in the article header: words / 200, rounded (for
   * Chinese, characters / 400), counted over title, subtitle, sections and FAQ. Recount after
   * substantial edits.
   */
  minutes: number;
}

export interface BlogPost {
  /** Bare slug, e.g. 'what-is-planning-poker'. */
  slug: string;
  /** Route to link to. Blog posts live under /blog/<slug>; the guide is external to the blog segment. */
  href: string;
  /** Title, description and read time in each language; English always, the others once translated. */
  text: { en: PostText } & Partial<Record<Locale, PostText>>;
  /** 'YYYY-MM-DD' */
  published: string;
  /** 'YYYY-MM-DD' */
  updated: string;
  /** Sitemap priority (defaults to 0.7). */
  priority?: number;
  /** True for entries shown on the blog index that are not under /blog (e.g. /guide). */
  external?: boolean;
}

const PUBLISHED = '2026-07-05';
const UPDATED = '2026-09-20';
const CONTENT_UPDATED = '2026-10-18';

/** The /guide page — listed first on the blog index but not part of the /blog segment. */
export const GUIDE_ENTRY: BlogPost = {
  slug: 'guide',
  href: '/guide',
  external: true,
  text: {
    en: { title: 'How to Run a Scrum Poker Session: Step-by-Step Guide', description: 'Create a room, vote in private, reveal together and agree on an estimate: how to run a session with your team, plus decks and special cards.', minutes: 3 },
    tr: { title: 'Scrum Poker Oturumu Nasıl Yürütülür? Adım Adım Rehber', description: 'Oda oluştur, gizlice oy ver, kartları birlikte aç ve tahminde uzlaş: ekibinle bir oturumu nasıl yürüteceğin, desteler ve özel kartlarla birlikte.', minutes: 2 },
    ar: { title: 'كيف تدير جلسة سكرم بوكر: دليل خطوة بخطوة', description: 'أنشئ غرفة، وصوّت بسرية، واكشف البطاقات مع فريقك، واتفق معه على التقدير: كيف تدير جلسة، مع مجموعات البطاقات والبطاقات الخاصة.', minutes: 3 },
    de: { title: 'So leitest du eine Scrum-Poker-Session: Schritt für Schritt', description: 'Raum erstellen, verdeckt abstimmen, gemeinsam aufdecken und einigen: So leitest du eine Session mit deinem Team – dazu Decks und Sonderkarten.', minutes: 3 },
    fr: { title: 'Comment animer une session de Scrum Poker : guide étape par étape', description: 'Créez une salle, votez en privé, révélez ensemble et convenez d’une estimation : comment animer une session avec votre équipe, jeux et cartes spéciales compris.', minutes: 4 },
    zh: { title: '如何开展 Scrum Poker 会议：分步指南', description: '创建房间、私下投票、同时揭晓并商定估算：如何与团队开展一场会议，另附牌组和特殊卡牌说明。', minutes: 2 },
    it: { title: 'Come condurre una sessione di Scrum Poker: guida passo passo', description: 'Crea una stanza, vota in privato, rivelate insieme e concordate la stima: come condurre una sessione con il tuo team, con mazzi e carte speciali.', minutes: 3 },
  },
  published: PUBLISHED,
  updated: '2026-10-30',
};

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: 'fibonacci-vs-tshirt',
    href: '/blog/fibonacci-vs-tshirt',
    text: {
      en: { title: 'Fibonacci vs T-Shirt Sizing: Which to Use?', description: 'Compare the two most popular estimation scales and learn when to use each one for sprint planning.', minutes: 10 },
      tr: { title: 'Fibonacci mi, T-Shirt Boyutlandırma mı? Hangisini Kullanmalı?', description: 'En popüler iki tahmin ölçeğini karşılaştır ve sprint planlamasında hangisini ne zaman kullanacağını öğren.', minutes: 9 },
      ar: { title: 'فيبوناتشي أم مقاسات القمصان: أيهما تستخدم؟', description: 'قارن بين مقياسَي التقدير الأكثر شيوعًا، وتعرّف على الوقت المناسب لاستخدام كل منهما في تخطيط السبرنت.', minutes: 9 },
      de: { title: 'Fibonacci oder T-Shirt-Größen: Was solltest du nutzen?', description: 'Vergleiche die beiden beliebtesten Schätzskalen und erfahre, wann sich welche für die Sprint-Planung eignet.', minutes: 10 },
      fr: { title: 'Fibonacci ou tailles de T-shirt : que choisir ?', description: 'Comparez les deux échelles d’estimation les plus répandues et découvrez quand utiliser chacune pour la planification de sprint.', minutes: 12 },
      zh: { title: '斐波那契还是 T 恤尺码：该用哪个？', description: '比较斐波那契故事点与 T 恤尺码这两种最流行的敏捷估算尺度：各自如何运作、适合哪些场景、如何相互换算，以及在冲刺规划中何时该用哪一种。', minutes: 8 },
      it: { title: 'Fibonacci o taglie T-shirt: quale usare?', description: 'Confronta le due scale di stima più diffuse e scopri quando usare ciascuna nella pianificazione dello sprint.', minutes: 11 },
    },
    published: PUBLISHED,
    updated: CONTENT_UPDATED,
  },
  {
    slug: 'remote-sprint-planning',
    href: '/blog/remote-sprint-planning',
    text: {
      en: { title: 'How to Run Sprint Planning Remotely', description: 'Practical tips for running effective remote sprint planning sessions with distributed agile teams.', minutes: 12 },
      tr: { title: 'Uzaktan Sprint Planlama Nasıl Yapılır?', description: 'Dağıtık ekiplerle etkili uzaktan sprint planlama oturumları için pratik ipuçları.', minutes: 10 },
      ar: { title: 'كيف تدير تخطيط السبرنت عن بُعد', description: 'نصائح عملية لإدارة جلسات فعّالة لتخطيط السبرنت عن بُعد مع فرق أجايل الموزّعة.', minutes: 10 },
      de: { title: 'Sprint-Planung remote durchführen', description: 'Praktische Tipps für wirksame Remote-Sprint-Planungen mit verteilten agilen Teams.', minutes: 11 },
      fr: { title: 'Mener une planification de sprint à distance', description: 'Des conseils pratiques pour mener des planifications de sprint à distance efficaces avec des équipes agiles distribuées.', minutes: 14 },
      zh: { title: '如何远程进行冲刺规划', description: '与分布式敏捷团队开好远程冲刺规划会议的实用指南：会前准备、分步议程、在线计划扑克估算、跨时区协作，以及如何避开锚定偏差和沉默从众。', minutes: 10 },
      it: { title: 'Come condurre la pianificazione dello sprint da remoto', description: 'Consigli pratici per condurre sessioni efficaci di pianificazione dello sprint da remoto con team agili distribuiti.', minutes: 13 },
    },
    published: PUBLISHED,
    updated: CONTENT_UPDATED,
  },
  {
    slug: 'scrum-poker-best-practices',
    href: '/blog/scrum-poker-best-practices',
    text: {
      en: { title: '10 Scrum Poker Best Practices for Better Estimates', description: 'Proven techniques to improve your team\'s estimation accuracy and make sprint planning more effective.', minutes: 11 },
      tr: { title: 'Daha İyi Tahminler İçin Scrum Poker\'de 10 En İyi Uygulama', description: 'Ekibinin tahmin isabetini artıran ve sprint planlamayı daha verimli hale getiren, denenmiş teknikler.', minutes: 10 },
      ar: { title: '10 من أفضل ممارسات سكرم بوكر لتقديرات أفضل', description: 'أساليب مجرَّبة لتحسين دقة تقديرات فريقك وجعل تخطيط السبرنت أكثر فاعلية.', minutes: 10 },
      de: { title: '10 Best Practices für Scrum Poker und bessere Schätzungen', description: 'Bewährte Techniken, die die Schätzgenauigkeit deines Teams verbessern und die Sprint-Planung wirksamer machen.', minutes: 11 },
      fr: { title: '10 bonnes pratiques de Scrum Poker pour de meilleures estimations', description: 'Des techniques éprouvées pour améliorer la justesse des estimations de votre équipe et rendre la planification de sprint plus efficace.', minutes: 13 },
      zh: { title: '让估算更准确的 10 条 Scrum Poker 最佳实践', description: '10 条经过验证的 Scrum Poker 最佳实践：参考故事、私下投票并同时揭晓、先听离群值的理由、拆分大故事、限时讨论，让估算更准、冲刺规划更高效。', minutes: 9 },
      it: { title: '10 best practice di scrum poker per stime migliori', description: 'Tecniche collaudate per migliorare la precisione delle stime del tuo team e rendere più efficace la pianificazione dello sprint.', minutes: 12 },
    },
    published: PUBLISHED,
    updated: CONTENT_UPDATED,
  },
  {
    slug: 'free-scrum-poker-tools',
    href: '/blog/free-scrum-poker-tools',
    text: {
      en: { title: 'Best Free Scrum Poker Tools: What to Look For', description: 'The criteria that matter, the questions to ask, and a 15-minute test for choosing a free planning poker tool for your team.', minutes: 12 },
      tr: { title: 'En İyi Ücretsiz Scrum Poker Araçları: Nelere Bakmalı?', description: 'Önemli kriterler, sorulması gereken sorular ve ekibin için ücretsiz bir planning poker aracı seçerken uygulayabileceğin 15 dakikalık bir test.', minutes: 10 },
      ar: { title: 'أفضل أدوات سكرم بوكر المجانية: ما الذي تبحث عنه', description: 'المعايير المهمة، والأسئلة التي تطرحها، واختبار مدته 15 دقيقة لاختيار أداة بلانينغ بوكر مجانية لفريقك.', minutes: 10 },
      de: { title: 'Die besten kostenlosen Scrum-Poker-Tools: Worauf achten?', description: 'Die wichtigen Kriterien, die richtigen Fragen und ein 15-Minuten-Test, mit dem du ein kostenloses Planning-Poker-Tool für dein Team auswählst.', minutes: 11 },
      fr: { title: 'Les meilleurs outils de Scrum Poker gratuits : les critères à examiner', description: 'Les critères qui comptent, les questions à se poser et un test de 15 minutes pour choisir un outil de planning poker gratuit pour votre équipe.', minutes: 14 },
      zh: { title: '最好的免费 Scrum Poker 工具：该看哪些方面', description: '为团队挑选免费计划扑克工具：免注册加入、隐藏投票、牌组、导出和隐私等真正重要的标准，选择前要问的问题，以及一套 15 分钟的试用评估方法。', minutes: 10 },
      it: { title: 'I migliori strumenti gratuiti di scrum poker: cosa cercare', description: 'I criteri che contano, le domande da porsi e un test di 15 minuti per scegliere uno strumento gratuito di planning poker per il tuo team.', minutes: 13 },
    },
    published: PUBLISHED,
    updated: CONTENT_UPDATED,
  },
  {
    slug: 'story-points-vs-hours',
    href: '/blog/story-points-vs-hours',
    text: {
      en: { title: 'Story Points vs Hours: Which Should Your Team Use?', description: 'The definitive answer to the story points vs hours debate — understand the trade-offs and make the right choice for your agile team.', minutes: 10 },
      tr: { title: 'Story Point mi, Saat mi? Hangisini Kullanmalı?', description: 'Story point ile saat tartışmasına net bir yanıt: artıları, eksileri ve çevik ekibin için doğru seçim.', minutes: 9 },
      ar: { title: 'نقاط القصة أم الساعات: أيهما يستخدم فريقك؟', description: 'الجواب الحاسم في الجدل بين نقاط القصة والساعات: افهم المفاضلات واتخذ الخيار الصحيح لفريق أجايل الذي تعمل فيه.', minutes: 9 },
      de: { title: 'Story Points oder Stunden: Was sollte dein Team nutzen?', description: 'Eine klare Antwort auf die Frage „Story Points oder Stunden?“ – verstehe die Vor- und Nachteile und triff die richtige Wahl für dein agiles Team.', minutes: 10 },
      fr: { title: 'Story points ou heures : que doit utiliser votre équipe ?', description: 'La réponse claire au débat entre story points et heures : comprenez les compromis et faites le bon choix pour votre équipe agile.', minutes: 12 },
      zh: { title: '故事点还是小时：你的团队该用哪个？', description: '故事点与小时之争的明确答案：两者分别衡量什么，为什么小时估算在冲刺中容易失灵，如何用速度推算交付日期，以及什么时候小时仍是正确选择。', minutes: 9 },
      it: { title: 'Story point o ore: cosa usare nel tuo team?', description: 'La risposta definitiva al dibattito tra story point e ore: capisci i compromessi e fai la scelta giusta per il tuo team agile.', minutes: 11 },
    },
    published: PUBLISHED,
    updated: UPDATED,
  },
  {
    slug: 'what-is-planning-poker',
    href: '/blog/what-is-planning-poker',
    text: {
      en: { title: 'What Is Planning Poker? A Complete Guide', description: 'Everything about planning poker — what it is, how it works, why it produces better estimates, and how to run sessions online.', minutes: 10 },
      tr: { title: 'Planning Poker Nedir? Kapsamlı Rehber', description: 'Planning poker hakkında her şey: ne olduğu, nasıl çalıştığı, neden daha iyi tahminler ürettiği ve oturumların çevrim içi nasıl yürütüleceği.', minutes: 9 },
      ar: { title: 'ما هو بلانينغ بوكر؟ دليل شامل', description: 'كل شيء عن بلانينغ بوكر: ما هو، وكيف يعمل، ولماذا ينتج تقديرات أفضل، وكيف تدير الجلسات عبر الإنترنت.', minutes: 9 },
      de: { title: 'Was ist Planning Poker? Ein umfassender Leitfaden', description: 'Alles über Planning Poker – was es ist, wie es funktioniert, warum es bessere Schätzungen liefert und wie du Sessions online durchführst.', minutes: 10 },
      fr: { title: 'Qu’est-ce que le Planning Poker ? Guide complet', description: 'Tout sur le Planning Poker : ce que c’est, comment il fonctionne, pourquoi il produit de meilleures estimations et comment mener des sessions en ligne.', minutes: 12 },
      zh: { title: '什么是计划扑克？完整指南', description: '关于计划扑克的一切：它是什么、从何而来、一次会议如何进行、卡牌数值代表什么、为什么能得出更好的估算，以及如何与远程团队在线开展会议。', minutes: 8 },
      it: { title: 'Cos’è il planning poker? Guida completa', description: 'Tutto sul planning poker: cos’è, come funziona, perché produce stime migliori e come condurre le sessioni online.', minutes: 11 },
    },
    published: PUBLISHED,
    updated: CONTENT_UPDATED,
    priority: 0.8,
  },
  {
    slug: 'agile-velocity',
    href: '/blog/agile-velocity',
    text: {
      en: { title: 'Agile Velocity: Story Points & Sprint Capacity', description: 'What agile velocity is, how to calculate it, and how to use it for reliable sprint planning and capacity forecasting.', minutes: 11 },
      tr: { title: 'Çevik Ekiplerde Velocity: Story Point ve Sprint Kapasitesi', description: 'Velocity nedir, nasıl hesaplanır ve güvenilir sprint planlaması ile kapasite tahmini için nasıl kullanılır?', minutes: 9 },
      ar: { title: 'السرعة في أجايل: نقاط القصة وسعة السبرنت', description: 'ما هي السرعة في أجايل، وكيف تحسبها، وكيف تستخدمها لتخطيط موثوق للسبرنت ولتوقّع السعة.', minutes: 9 },
      de: { title: 'Agile Velocity: Story Points und Sprint-Kapazität', description: 'Was Velocity ist, wie du sie berechnest und wie du sie für eine verlässliche Sprint-Planung und Kapazitätsprognosen nutzt.', minutes: 10 },
      fr: { title: 'Vélocité agile : story points et capacité du sprint', description: 'Ce qu’est la vélocité agile, comment la calculer et comment l’utiliser pour planifier des sprints et prévoir la capacité de façon fiable.', minutes: 12 },
      zh: { title: '敏捷速度：故事点与冲刺产能', description: '什么是敏捷速度、如何一步步计算（附六个冲刺的算例），如何用它做可靠的冲刺规划和版本预测，以及哪些常见误区会让这个数字失去意义。', minutes: 8 },
      it: { title: 'Velocity agile: story point e capacità dello sprint', description: 'Cos’è la velocity agile, come si calcola e come usarla per pianificare gli sprint in modo affidabile e prevedere la capacità.', minutes: 11 },
    },
    published: PUBLISHED,
    updated: CONTENT_UPDATED,
  },
  {
    slug: 'sprint-planning-checklist',
    href: '/blog/sprint-planning-checklist',
    text: {
      en: { title: 'Sprint Planning Checklist: 12 Steps to Success', description: 'A practical checklist covering everything before, during, and after sprint planning — avoid the most common mistakes.', minutes: 11 },
      tr: { title: 'Sprint Planlama Kontrol Listesi: Başarı İçin 12 Adım', description: 'Sprint planlamanın öncesi, sırası ve sonrası için pratik bir kontrol listesi: en yaygın hatalardan kaçın.', minutes: 9 },
      ar: { title: 'قائمة تحقق لتخطيط السبرنت: 12 خطوة نحو النجاح', description: 'قائمة تحقق عملية تغطي كل ما يسبق تخطيط السبرنت ويرافقه ويليه، لتتجنّب الأخطاء الأكثر شيوعًا.', minutes: 9 },
      de: { title: 'Checkliste für die Sprint-Planung: 12 Schritte zum Erfolg', description: 'Eine praktische Checkliste für alles vor, während und nach der Sprint-Planung – vermeide die häufigsten Fehler.', minutes: 10 },
      fr: { title: 'Checklist de planification de sprint : 12 étapes', description: 'Une checklist pratique qui couvre tout ce qui se passe avant, pendant et après la planification de sprint, pour éviter les erreurs les plus courantes.', minutes: 12 },
      zh: { title: '冲刺规划检查清单：成功的 12 个步骤', description: '一份涵盖冲刺规划会前、会中和会后的 12 步实用检查清单：梳理待办列表、商定冲刺目标、核对产能、估算并承诺，附一场两小时会议的完整示例。', minutes: 9 },
      it: { title: 'Checklist per la pianificazione dello sprint: 12 passi', description: 'Una checklist pratica che copre tutto ciò che serve prima, durante e dopo la pianificazione dello sprint, per evitare gli errori più comuni.', minutes: 11 },
    },
    published: PUBLISHED,
    updated: CONTENT_UPDATED,
  },
  {
    slug: 'estimation-consensus',
    href: '/blog/estimation-consensus',
    text: {
      en: { title: 'How to Reach Estimation Consensus in Planning Poker', description: 'Why teams disagree on story points and practical techniques to bridge the gap without forcing artificial agreement.', minutes: 11 },
      tr: { title: 'Planning Poker\'de Tahminde Uzlaşı Nasıl Sağlanır?', description: 'Ekipler story point\'lerde neden anlaşamaz ve yapay bir uzlaşı dayatmadan farkı kapatmanın pratik yolları.', minutes: 9 },
      ar: { title: 'كيف تصل إلى إجماع على التقدير في بلانينغ بوكر', description: 'لماذا تختلف الفرق على نقاط القصة، وأساليب عملية لسدّ الفجوة دون فرض اتفاق مصطنع.', minutes: 9 },
      de: { title: 'Wie du beim Planning Poker einen Schätzkonsens erreichst', description: 'Warum Teams bei Story Points uneins sind – und praktische Techniken, um die Lücke zu schließen, ohne eine künstliche Einigung zu erzwingen.', minutes: 11 },
      fr: { title: 'Comment atteindre un consensus d’estimation en Planning Poker', description: 'Pourquoi les équipes divergent sur les story points, et des techniques concrètes pour réduire l’écart sans imposer un accord artificiel.', minutes: 12 },
      zh: { title: '如何在计划扑克中达成估算共识', description: '团队为什么会在故事点上产生分歧，如何一步步主持一轮共识投票，以及在不强求表面一致的前提下弥合 3 与 13 之间差距的实用技巧和经验法则。', minutes: 9 },
      it: { title: 'Come raggiungere il consenso sulle stime nel planning poker', description: 'Perché i team non sono d’accordo sugli story point e tecniche pratiche per colmare la distanza senza forzare un accordo artificiale.', minutes: 11 },
    },
    published: PUBLISHED,
    updated: CONTENT_UPDATED,
  },
];

/** Everything the blog index lists, guide first. */
export const BLOG_INDEX: BlogPost[] = [GUIDE_ENTRY, ...BLOG_POSTS];

/** A post's text in `locale`, English until it is translated. */
export function postText(post: BlogPost, locale: Locale): PostText {
  return post.text[locale] ?? post.text.en;
}
