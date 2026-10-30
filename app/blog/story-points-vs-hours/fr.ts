import type { Localized } from '../articleTypes';

const fr: Localized = {
  title: 'Story points ou heures : que doit utiliser votre équipe agile ?',
  subtitle: 'Ce que mesurent les story points, pourquoi les estimations en heures échouent sprint après sprint, comment répondre à « mais la direction veut des dates », et quand les heures restent le bon choix.',
  sections: [
    {
      title: 'Story points ou heures : la réponse courte',
      content: 'Estimez les éléments du backlog en story points et déduisez les dates de la vélocité. Réservez les heures au travail dont le périmètre est fixe et bien connu, à la facturation, ou au découpage en tâches à la journée au sein d’un sprint si votre équipe y trouve un intérêt. Les story points décrivent la taille d’un travail par rapport à d’autres ; les heures décrivent le temps qu’une personne précise pense y consacrer. Pour planifier des sprints et prévoir des releases, c’est la première question qui tient la route.',
    },
    {
      title: 'Que sont les story points ?',
      content: 'Un story point est une unité de taille relative. Quand une équipe dit qu’une user story vaut 5, cela signifie qu’elle est à peu près aussi grosse que les autres stories à 5 déjà réalisées, plus grosse que ses 3 et plus petite que ses 8. Ce chiffre regroupe tout ce qui rend un travail exigeant : la quantité de travail, sa complexité, l’incertitude qui l’entoure et le risque de mauvaises surprises.',
      paragraphs: [
        'Les story points ne sont volontairement pas une unité de temps. La même story de 5 points peut prendre une journée à un ingénieur senior et trois jours à une nouvelle recrue, mais elle vaut toujours 5, car la taille du travail n’a pas changé. C’est justement ce qui rend les points utiles : ils restent stables quand la vitesse de l’équipe varie, et cette vitesse est mesurée à part, sous forme de [vélocité d’équipe](/blog/agile-velocity).',
        'La plupart des équipes utilisent l’[échelle de Fibonacci](/fibonacci-planning-poker) modifiée popularisée par Mike Cohn dans « Agile Estimating and Planning » (0, 1, 2, 3, 5, 8, 13, 20, 40, 100), et estiment en groupe avec le Planning Poker. Les écarts croissants entre les valeurs traduisent le fait que les gros éléments sont plus difficiles à dimensionner précisément que les petits.',
      ],
    },
    {
      title: 'Que signifie réellement estimer en heures ?',
      content: 'Une estimation en heures est une prévision du temps de travail écoulé pour un travail précis, généralement par une personne précise. C’est une estimation absolue : « cela prendra environ 6 heures ». L’attrait est évident. Les heures sont universelles, tout le monde les comprend, les tableurs les additionnent et les managers peuvent les comparer au calendrier. Le problème, c’est qu’une estimation en heures mélange deux choses très différentes : la taille du travail, que l’on peut connaître pendant l’affinage, et la productivité de la personne qui le fera le jour où elle le fera, que l’on ne peut pas connaître.',
    },
    {
      title: 'Pourquoi les estimations en heures échouent dans les équipes agiles',
      content: 'Les heures ont l’air précises, et c’est précisément le piège. En pratique, elles échouent pour plusieurs raisons :',
      items: [
        'Elles dépendent de la personne qui fait le travail. Une tâche qui prend 4 heures à un développeur peut en prendre 12 à un autre, et tant que le sprint n’est pas planifié, personne ne sait qui s’en chargera.',
        'Elles ignorent le calendrier. Les réunions, les revues de code, les incidents de production et les changements de contexte sont invisibles dans une estimation en heures par tâche, mais ils absorbent une large part de chaque journée de travail.',
        'Elles invitent à une fausse précision. « 8 heures » ressemble à une mesure. Personne ne peut distinguer à l’avance une tâche de 8 heures d’une tâche de 9 heures, mais le chiffre sera quand même traité comme un engagement.',
        'Elles se transforment en pression. Quand une estimation est une promesse de délai, les développeurs bâclent pour la tenir ou gonflent la suivante.',
        'Elles ne s’additionnent pas proprement. Additionner 40 estimations en heures au niveau des tâches ne donne pas une durée de sprint fiable, car les erreurs vont pour la plupart dans le même sens, celui de l’optimisme.',
      ],
    },
    {
      title: 'Pourquoi les story points conviennent mieux à la planification de sprint',
      content: 'Les story points évitent ces écueils en séparant la taille de la vitesse :',
      items: [
        'L’estimation reste valable quand l’équipe change. Un 5 reste un 5, que ce soit le senior ou le junior qui s’en charge. La vitesse est captée par la vélocité, qui se met à jour d’elle-même à chaque sprint.',
        'On répond mieux à des questions relatives. « Est-ce plus gros que la story de réinitialisation du mot de passe ? » donne des réponses cohérentes ; « combien d’heures ? » donne des suppositions qui varient selon l’humeur et l’assurance de chacun.',
        'L’incertitude a sa place. Une story aux spécifications incertaines peut recevoir un 13 pour signifier « grosse et floue », sans prétendre que quiconque connaît le nombre d’heures.',
        'La vélocité fournit des prévisions sans effort. Après quelques sprints, l’équipe sait qu’elle termine environ N points par sprint, et ce chiffre intègre les réunions, les revues et les interruptions, puisqu’il est mesuré et non estimé.',
        'Les points suppriment l’engagement personnel. Ils décrivent le travail, pas la promesse d’une personne ; les sessions se concentrent donc sur la compréhension de la story plutôt que sur la défense d’un chiffre.',
      ],
    },
    {
      title: 'Story points ou heures : comparaison point par point',
      content: 'Les principales différences, critère par critère :',
      items: [
        'Ce qui est mesuré : les points mesurent une taille relative (effort, complexité, incertitude, risque) ; les heures mesurent le temps écoulé prévu pour une personne.',
        'Stabilité : une estimation en points ne change pas quand une autre personne prend la story ; une estimation en heures, si.',
        'Prévisions : les points permettent de prévoir grâce à la vélocité mesurée sur des sprints entiers ; les heures, en additionnant des suppositions tâche par tâche.',
        'Interruptions : absorbées par la vélocité ; ignorées par les heures par tâche, sauf à gonfler chaque tâche.',
        'Précision : les points sont volontairement grossiers ; les heures supposent une précision que personne n’a à l’avance.',
        'Dynamique d’équipe : les points sont une estimation collective du travail ; les heures deviennent un engagement individuel.',
      ],
    },
    {
      title: 'Un exemple concret : le même sprint estimé des deux façons',
      content: 'Imaginez une équipe de cinq personnes qui planifie un sprint de deux semaines avec trois stories : une correction de bug sur la page de profil, un export CSV de l’historique des commandes et l’intégration d’un nouveau prestataire de paiement.',
      paragraphs: [
        'En heures : le lead technique estime 4, 16 et 40 heures. Cela fait 60 heures face à 5 personnes × 10 jours × 8 heures, soit 400 heures de capacité ; le sprint paraît donc presque vide, et trois stories supplémentaires sont ajoutées. En réalité, les réunions et les revues absorbent un tiers du calendrier, l’export s’avère toucher deux services, et l’intégration du paiement bloque sur la documentation. Le sprint se termine avec l’export à moitié fait et les stories supplémentaires intactes.',
        'En story points : l’équipe joue au Planning Poker et aboutit à 2, 8 et un « ? » qui devient un spike de 3 points. Sa vélocité sur les quatre derniers sprints est en moyenne de 25. Avec 13 points engagés, il reste de la place pour deux ou trois petites stories, et l’équipe sait par expérience qu’un sprint de 25 points inclut déjà ses réunions et ses revues. L’intégration du paiement n’est pas forcée dans le sprint sur une supposition ; le spike répond d’abord aux questions ouvertes. L’estimation en points n’est pas plus précise, mais elle est calibrée sur la livraison réelle et non sur des journées de travail idéales.',
      ],
    },
    {
      title: 'Le problème « la direction veut des heures » : prévoir avec la vélocité',
      content: 'L’objection la plus courante aux story points, c’est qu’un manager, un client ou une équipe financière veut des dates et des heures, pas des points. La réponse n’est pas d’abandonner les points, mais de faire la traduction à l’échelle des sprints plutôt que des stories.',
      paragraphs: [
        'La vélocité est le nombre de points qu’une équipe termine par sprint, en moyenne sur les derniers sprints. Dès que vous disposez de trois ou quatre sprints d’historique, la prévision devient un simple calcul. Si une release est estimée à 120 points et que l’équipe fait en moyenne 25 points par sprint, il faut environ cinq sprints de deux semaines, soit une dizaine de semaines. Donnez une fourchette, pas une date unique : la vélocité la plus basse et la plus haute de l’historique récent donnent un scénario optimiste et un scénario pessimiste, bien plus défendables qu’un total de suppositions en heures.',
        'Ce qu’il ne faut pas faire, c’est publier un ratio fixe entre points et heures (« 1 point = 4 heures »). Dès que ce ratio existe, chaque estimation en points devient une estimation en heures déguisée, et tous les problèmes décrits plus haut reviennent.',
      ],
    },
    {
      title: 'Quand les heures sont le bon choix',
      content: 'Les story points ne sont pas une réponse universelle. Les heures sont pertinentes quand :',
      items: [
        'Le périmètre est fixe et connu. Un renouvellement de certificat de routine ou une modification de configuration connue ne comporte presque aucune incertitude.',
        'Vous découpez une story en tâches au sein du sprint. Certaines équipes dimensionnent les stories en points, puis les découpent en tâches estimées en heures pour leur propre suivi au quotidien. C’est acceptable tant que les heures ne viennent jamais modifier l’estimation en story points.',
        'Le travail est facturé à l’heure et le client a besoin d’un devis. Même dans ce cas, estimez d’abord en points et convertissez à l’aide de la vélocité, plutôt que de deviner les heures tâche par tâche.',
        'Une seule personne fait tout le travail et l’a déjà fait de nombreuses fois. L’estimation relative apporte peu sans équipe avec qui rechercher un consensus.',
      ],
    },
    {
      title: 'Les erreurs courantes lors du passage des heures aux story points',
      content: 'Les équipes qui passent aux points ont tendance à emporter avec elles leurs habitudes en heures. Surveillez ces travers :',
      items: [
        'Définir un point comme un nombre d’heures. Cela semble utile le premier jour et détruit l’intérêt des points pour de bon.',
        'Comparer la vélocité entre équipes. Les points de chaque équipe sont calibrés sur ses propres stories de référence ; 30 points dans une équipe ne disent donc rien d’une autre.',
        'Utiliser les points comme un score de productivité. Dès que la vélocité devient un objectif, les estimations gonflent et l’indicateur ne prédit plus rien.',
        'Se passer de story de référence. Sans un « voilà à quoi ressemble un 3 » partagé, chacun estime discrètement en heures et arrondit à un nombre de Fibonacci.',
        'Laisser une seule personne estimer. La valeur des points vient de la discussion d’équipe. Un lead qui attribue seul les points cumule les inconvénients des deux systèmes.',
      ],
    },
    {
      title: 'Estimer en story points avec le Planning Poker',
      content: 'La méthode standard pour produire des estimations en story points est le [Planning Poker](/blog/what-is-planning-poker), la technique décrite par James Grenning en 2002 et popularisée par Mike Cohn. En bref :',
      items: [
        '1. Choisissez une ou deux stories terminées comme références et convenez de leur taille, par exemple « le parcours de réinitialisation du mot de passe valait 3 ».',
        '2. Le Product Owner présente une story et l’équipe pose des questions de clarification pendant deux ou trois minutes.',
        '3. Chacun choisit une carte en privé et la révèle en même temps que les autres, pour que personne ne s’ancre sur le premier chiffre prononcé.',
        '4. Si les cartes divergent, les personnes qui ont donné l’estimation la plus haute et la plus basse expliquent ce qu’elles voient, et l’équipe revote. La plupart des stories convergent en deux tours.',
        '5. Notez la valeur retenue. Après chaque sprint, additionnez les points des stories réellement terminées : c’est la vélocité sur laquelle vous baserez vos prévisions.',
      ],
      paragraphs: [
        'Un outil gratuit comme Scrum Poker Online prend en charge la mécanique pour les équipes à distance : créez une salle, partagez le lien, et jusqu’à 50 participants peuvent voter avec un jeu Scrum, Fibonacci, T-shirt, puissances de 2 ou personnalisé, sans inscription.',
      ],
    },
    {
      title: 'Notre recommandation',
      content: 'Estimez en story points, faites vos prévisions avec la vélocité, et gardez les heures pour les rares cas où le périmètre est fixe ou la facturation l’exige. Commencez avec l’échelle de Fibonacci, choisissez comme référence une story récente et bien comprise, et laissez trois ou quatre sprints à la vélocité pour se stabiliser avant de l’utiliser pour des engagements. Quand les parties prenantes demandent des dates, répondez par une fourchette de sprints déduite de la vélocité, jamais par un ratio entre points et heures. Les équipes qui font ce changement reviennent rarement en arrière, car elles séparent enfin la taille du travail de la vitesse de l’équipe.',
    },
  ],
  faq: [
    {
      q: 'Combien d’heures vaut un story point ?',
      a: 'Il n’y a pas de réponse fixe, et en définir une va à l’encontre du principe. Les story points mesurent une taille relative, pas du temps. Le lien entre les points et le temps calendaire est capté par la vélocité, qui diffère d’une équipe à l’autre.',
    },
    {
      q: 'Pourquoi beaucoup d’équipes agiles évitent-elles d’estimer en heures ?',
      a: 'Parce que les estimations en heures dépendent de la personne qui fait le travail et d’interruptions que personne ne peut prévoir, qu’elles créent une fausse précision et qu’elles se transforment en engagements personnels. Les story points décrivent le travail lui-même et laissent la vélocité rendre compte de la vitesse réelle.',
    },
    {
      q: 'Peut-on utiliser à la fois des story points et des heures ?',
      a: 'Oui. Une pratique courante consiste à dimensionner les stories en points pour la planification et les prévisions, puis à les découper en tâches estimées en heures au sein du sprint pour le suivi au quotidien. Les heures ne doivent jamais servir à recalculer les story points.',
    },
    {
      q: 'Comment convertir des story points en date de livraison ?',
      a: 'Utilisez la vélocité. Divisez les points restants par le nombre moyen de points que l’équipe termine par sprint pour obtenir un nombre de sprints, puis multipliez par la durée d’un sprint. Présentez une fourchette fondée sur la vélocité récente la plus basse et la plus haute plutôt qu’une date unique.',
    },
    {
      q: 'Un story point a-t-il la même valeur d’une équipe à l’autre ?',
      a: 'Non. Chaque équipe calibre ses points sur ses propres stories de référence ; un 5 dans une équipe n’est donc pas comparable à un 5 dans une autre. La vélocité ne doit jamais être comparée qu’à l’historique de la même équipe.',
    },
  ],
};

export default fr;
