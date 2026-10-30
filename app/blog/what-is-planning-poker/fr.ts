import type { Localized } from '../articleTypes';

const fr: Localized = {
  title: 'Qu’est-ce que le Planning Poker ? Le guide complet de l’estimation agile',
  subtitle: 'Ce qu’est le planning poker, d’où il vient, comment se déroule une session étape par étape, quelles cartes utiliser, et les erreurs qui sabotent discrètement vos estimations.',
  sections: [
    {
      title: 'Qu’est-ce que le Planning Poker ? (Définition)',
      content: 'Le Planning Poker est une technique d’estimation ludique, fondée sur le consensus, que les équipes agiles utilisent pour dimensionner les éléments du backlog, comme les user stories. Chaque participant choisit en privé une carte qui représente son estimation, toutes les cartes sont retournées en même temps, et l’équipe discute des écarts jusqu’à s’accorder sur une valeur unique. Le nombre inscrit sur la carte exprime généralement des story points, pas des heures.',
      paragraphs: [
        'Sa caractéristique déterminante est la révélation simultanée. Quand les participants annoncent leur estimation à voix haute les uns après les autres, le premier chiffre sert d’ancre à tous ceux qui suivent. Cacher les cartes jusqu’à la révélation supprime cette ancre : l’équipe voit ce que chacun pense vraiment avant le début de toute discussion.',
        'Sa deuxième caractéristique déterminante est que le désaccord est traité comme une information. Si un développeur montre un 3 et un autre un 13, deux personnes se font une idée très différente de la même story, et c’est de cette conversation que vient l’essentiel de la valeur.',
      ],
    },
    {
      title: 'Planning Poker ou Scrum Poker : y a-t-il une différence ?',
      content: 'Non. Planning Poker et Scrum Poker sont deux noms pour la même technique. « Planning Poker » est le nom d’origine, issu de l’article de James Grenning en 2002 et du livre de Mike Cohn, tandis que « Scrum Poker » s’est répandu parce que la plupart des équipes qui l’utilisent pratiquent Scrum et estiment pendant l’affinage du backlog ou la planification de sprint. « Pointing poker » et « estimation poker » désignent la même chose, et aucun de ces noms n’est lié à Scrum : les équipes Kanban et les équipes hors logiciel l’utilisent tout aussi bien.',
    },
    {
      title: 'D’où vient le Planning Poker ? Grenning, Cohn et le Wideband Delphi',
      content: 'Le Planning Poker a été décrit pour la première fois par James Grenning en 2002, dans un court article destiné aux équipes Extreme Programming qui perdaient des heures en débats de planification de release. Son objectif était d’éviter la « paralysie par l’analyse » : entendre rapidement chaque voix, empêcher la personne la plus bavarde de fixer le chiffre, et passer à la suite.',
      paragraphs: [
        'La technique s’est généralisée quand Mike Cohn l’a intégrée à « Agile Estimating and Planning » (2005). La version de Cohn a popularisé le jeu de cartes Fibonacci modifié (0, 1, 2, 3, 5, 8, 13, 20, 40, 100) qu’utilisent aujourd’hui la plupart des équipes.',
        'Son ancêtre intellectuel est la méthode Delphi, développée à la RAND Corporation, et sa variante pour l’estimation logicielle, le Wideband Delphi : des experts estiment chacun de leur côté, les résultats sont partagés, le groupe en discute, et le cycle se répète jusqu’à ce que les estimations convergent. Le Planning Poker conserve cette structure, mais la condense en quelques minutes par élément et y ajoute un jeu de cartes.',
      ],
    },
    {
      title: 'Comment se déroule une session de Planning Poker ? Étape par étape',
      content: 'Une session type réunit l’équipe de développement, le Product Owner et généralement un Scrum Master ou un animateur. Elle se déroule ainsi :',
      items: [
        '1. Choisissez une story de référence. Avant la session, convenez d’une ou deux stories récemment terminées dont la taille est connue (par exemple, « le parcours de réinitialisation du mot de passe valait 3 »). Toute estimation se fait par rapport à ces références.',
        '2. Le Product Owner présente un élément du backlog : la user story, les critères d’acceptation et les contraintes connues. L’objectif est une compréhension partagée de ce que signifie « terminé », pas une conception technique.',
        '3. L’équipe pose des questions de clarification, en se limitant à deux ou trois minutes.',
        '4. Chacun choisit une carte en privé, en comparant la story aux stories de référence et en tenant compte de l’effort, de la complexité, de l’incertitude et des risques.',
        '5. Toutes les cartes sont révélées en même temps. Dans un outil en ligne, quelqu’un (généralement l’animateur) clique sur « Révéler les votes » une fois tous les votes exprimés.',
        '6. Si les estimations concordent, notez la valeur et passez à la suite. Deux estimations sur des cartes voisines (un 5 et un 8) comptent généralement comme un accord.',
        '7. Si elles divergent, les personnes qui ont donné l’estimation la plus haute et la plus basse expliquent leur raisonnement. Personne ne se dispute : il s’agit de faire émerger ce qu’une personne sait et que les autres ignorent.',
        '8. Revotez. La plupart des stories convergent en deux tours. Si une story divise encore l’équipe au bout de trois tours, elle doit généralement être découpée en stories plus petites ou explorée par un spike.',
      ],
    },
    {
      title: 'Que signifient les cartes du Planning Poker ?',
      content: 'Le jeu de cartes le plus courant est la [suite de Fibonacci modifiée](/fibonacci-planning-poker) : 0, 1, 2, 3, 5, 8, 13, 20, 40, 100. Les nombres sont volontairement de plus en plus espacés à mesure qu’ils grandissent. Personne ne peut honnêtement distinguer une story de 20 points d’une story de 21 points ; il n’y a donc pas de carte 21, et le jeu saute directement à 40. Plus la story est grosse, moins l’estimation peut être précise, et le jeu de cartes le traduit.',
      paragraphs: [
        'La justification habituelle de ces écarts croissants est la loi de Weber–Fechner : nous percevons les différences proportionnellement à la taille de ce que nous comparons. Un écart d’un point entre 1 et 2 saute aux yeux ; le même écart entre 40 et 41 est imperceptible. Une échelle dont les paliers croissent à peu près proportionnellement correspond à la façon dont les estimateurs perçoivent réellement la taille.',
        'La plupart des jeux comportent aussi des [cartes spéciales](/planning-poker-cards). « ? » signifie « je ne comprends pas assez cette story pour l’estimer », le symbole infini signifie « c’est trop gros et il faut découper », et une tasse de café signifie « j’ai besoin d’une pause ». La carte 0 est réservée aux éléments insignifiants et doit être utilisée avec parcimonie. Parmi les alternatives à Fibonacci figurent les [tailles de T-shirt](/t-shirt-sizing) (de XS à XL), les puissances de 2 (1, 2, 4, 8, 16, 32) et les jeux personnalisés ; le choix compte moins que le fait d’utiliser le même jeu de façon cohérente.',
      ],
    },
    {
      title: 'Pourquoi le Planning Poker produit-il de meilleures estimations ?',
      content: 'Le Planning Poker fonctionne non pas parce que les cartes auraient un pouvoir magique, mais parce que le format contrecarre plusieurs travers bien connus de la prise de décision en groupe :',
      items: [
        'Il supprime l’ancrage. Comme les cartes restent cachées jusqu’à la révélation, le premier chiffre prononcé ne peut pas attirer les autres vers lui. C’est la principale raison pour laquelle les équipes adoptent la technique.',
        'Il oblige chacun à participer. Chaque estimateur doit poser une carte, si bien que les membres discrets de l’équipe doivent s’engager sur un chiffre.',
        'Il fait apparaître les hypothèses cachées. Un large écart signifie presque toujours que quelqu’un sait quelque chose que les autres ignorent : une dépendance, un module fragile, un utilitaire existant qui rend le travail trivial.',
        'Il estime de façon relative, et non absolue. « Est-ce plus gros que la story de réinitialisation du mot de passe ? » est une question à laquelle il est bien plus facile de bien répondre que « combien d’heures cela prendra-t-il ? ».',
      ],
    },
    {
      title: 'Un exemple concret : estimer trois stories',
      content: 'Supposons qu’une équipe ait convenu que « Ajouter un lien “Mot de passe oublié” qui envoie un jeton de réinitialisation par e-mail » est un 3 de référence, et que « Construire le tableau de bord de reporting d’administration » valait 13. Le Product Owner apporte trois nouvelles stories en affinage.',
      paragraphs: [
        'Story A : « Afficher un message de confirmation après l’enregistrement du profil par l’utilisateur. » Tout le monde révèle 1 ou 2 ; la story suit un modèle d’interface existant. L’équipe note un 2 et passe à la suite en moins d’une minute.',
        'Story B : « Permettre aux utilisateurs d’exporter leur historique de commandes en CSV. » Les cartes donnent 3, 5, 5, 8, 13. La personne qui a voté 13 explique que l’historique des commandes est réparti sur deux services et que l’export doit être paginé pour les gros comptes. Celle qui a voté 3 reconnaît avoir supposé une seule table. Au nouveau vote, les cartes donnent 8, 8, 8, 5, 8, et l’équipe note un 8.',
        'Story C : « Intégrer le nouveau prestataire de paiement. » La moitié de l’équipe joue « ? », l’autre moitié joue 40 ou l’infini. Personne n’a vu la documentation du prestataire. L’équipe ne force pas de chiffre : elle crée un court spike pour lire la documentation et réestime la semaine suivante. Une session bien menée consacre son temps là où se trouve le désaccord.',
      ],
    },
    {
      title: 'Le Planning Poker face aux autres techniques d’estimation agile',
      content: 'Le Planning Poker n’est pas la seule façon de dimensionner un backlog. Voici comment il se compare aux alternatives habituelles :',
      items: [
        'Estimation par un expert (un lead attribue les chiffres) : rapide, mais elle ne reflète que les connaissances d’une personne, tend vers l’optimisme et ne donne à l’équipe aucune appropriation de l’estimation.',
        'Tailles de T-shirt (de XS à XL) : plus rapides et moins intimidantes, adaptées à un premier passage sur un gros backlog ou à des participants non techniques, mais moins granulaires et impossibles à additionner directement pour la vélocité. Beaucoup d’équipes dimensionnent d’abord en T-shirts, puis passent au Planning Poker pour les éléments à l’échelle du sprint.',
        'Estimation par affinité ou système de seaux : l’équipe trie en silence des dizaines de stories dans des catégories de taille, puis en discute. Excellente pour dimensionner tout un backlog en une session ; moins adaptée à une seule story délicate.',
        'Estimation en heures : d’apparence précise mais fragile, car elle dépend de la personne qui fait le travail. La plupart des équipes agiles estiment en points et déduisent les prévisions de temps de la vélocité.',
      ],
    },
    {
      title: 'Les erreurs courantes du Planning Poker (et comment les corriger)',
      content: 'La plupart des reproches faits au Planning Poker remontent à une poignée d’erreurs évitables :',
      items: [
        'Estimer en heures avec des cartes en points. Si l’équipe associe en secret 5 points à 5 heures, les bénéfices de l’estimation relative disparaissent. Solution : comparez toujours à la story de référence, jamais à une horloge.',
        'Sauter la discussion. Faire la moyenne des cartes passe à côté de l’essentiel : la valeur réside dans la conversation entre l’estimation la plus haute et la plus basse. Solution : les auteurs des votes extrêmes s’expriment avant tout nouveau vote.',
        'Laisser une personne senior parler en premier. Si le lead technique annonce « c’est évidemment un 3 » avant le vote, la révélation n’a plus de sens. Solution : aucun chiffre n’est prononcé avant que les cartes soient montrées.',
        'Ne pas avoir de story de référence. Sans base commune, chaque estimateur a sa propre échelle. Solution : gardez une ou deux stories terminées et bien comprises visibles pendant la session.',
        'Traiter l’estimation comme un engagement. Les story points décrivent une taille, pas une promesse. Les équipes sanctionnées pour avoir « raté » leurs points apprennent à les gonfler, et les chiffres ne veulent plus rien dire.',
      ],
    },
    {
      title: 'Quand utiliser le Planning Poker, et quand s’en passer',
      content: 'Le Planning Poker est le bon outil quand l’estimation gagne à croiser plusieurs points de vue et qu’une mauvaise estimation a un coût réel. Ce n’est pas le bon outil pour tout.',
      items: [
        'Utilisez-le pour l’affinage du backlog et la planification de sprint, quand chaque story qui entrera dans l’un des deux prochains sprints a besoin d’une taille.',
        'Utilisez-le quand les connaissances sont réparties dans une équipe pluridisciplinaire : front-end, back-end, QA et exploitation voient souvent des risques différents dans la même story.',
        'Passez-vous-en pour un premier passage sur un backlog d’une centaine d’éléments ; faites d’abord un tri grossier en tailles de T-shirt, puis réservez le Planning Poker aux éléments en tête de liste.',
        'Passez-vous-en pour les stories qui ne sont pas prêtes. Commencez par un spike ou une conversation avec le Product Owner.',
      ],
    },
    {
      title: 'Mener un Planning Poker avec une équipe à distance ou hybride',
      content: 'Les cartes physiques ne fonctionnent pas en visioconférence ; les équipes à distance utilisent donc un outil en ligne. L’essentiel est simple : un vote privé, une révélation simultanée unique, une vue partagée des résultats et un jeu de cartes auquel l’équipe est habituée.',
      paragraphs: [
        'Scrum Poker Online est une option gratuite conçue précisément autour de ce déroulé : [créez une salle gratuite](/), partagez le lien, et jusqu’à 50 participants peuvent voter sans inscription. Il prend en charge les jeux Scrum, Fibonacci, T-shirt, puissances de 2 et personnalisés, si bien qu’une équipe peut garder l’échelle qu’elle utilise déjà. Quel que soit l’outil, les règles d’animation restent les mêmes.',
      ],
    },
  ],
  faq: [
    {
      q: 'Le Planning Poker est-il la même chose que le Scrum Poker ?',
      a: 'Oui. Ce sont deux noms pour la même technique d’estimation. « Planning Poker » est le nom d’origine ; « Scrum Poker » reflète simplement le fait que la plupart des équipes qui l’utilisent travaillent en Scrum.',
    },
    {
      q: 'Pourquoi le Planning Poker utilise-t-il la suite de Fibonacci ?',
      a: 'Parce que les écarts entre les nombres augmentent à mesure que les nombres grandissent, ce qui correspond à la façon dont nous percevons la taille : il est facile de distinguer un 2 d’un 3, mais personne ne peut distinguer de façon fiable un 20 d’un 21. Le jeu modifié popularisé par Mike Cohn arrondit les grandes valeurs pour la même raison.',
    },
    {
      q: 'Qui doit participer au Planning Poker ?',
      a: 'Toutes les personnes qui feront le travail : développeurs, testeurs et tout autre membre de l’équipe de réalisation. Le Product Owner présente les stories et répond aux questions, mais ne vote pas ; les managers peuvent observer, mais ne devraient pas avoir de cartes.',
    },
    {
      q: 'Combien de temps doit durer une session de Planning Poker ?',
      a: 'Visez quelques minutes par story et pas plus d’une à deux heures par session. Si une seule story prend beaucoup plus de temps, elle doit généralement être découpée ou clarifiée plutôt que débattue davantage.',
    },
    {
      q: 'Que signifient les cartes « ? » et infini ?',
      a: 'La carte « ? » signifie que l’estimateur ne comprend pas assez la story pour la dimensionner. La carte infini signifie que la story est trop grosse pour être estimée et doit être découpée. Dans les deux cas, c’est le signal qu’il faut arrêter de voter et affiner la story.',
    },
  ],
};

export default fr;
