import type { LandingContent } from '@/app/landingTypes';

const fr: LandingContent = {
  breadcrumb: 'Tailles de T-shirt',
  title: 'L’estimation agile en tailles de T-shirt : guide pratique',
  subtitle: 'Estimer avec XS, S, M, L et XL plutôt qu’avec des nombres : quand cela fonctionne, quand cela ne fonctionne pas et comment animer une session.',
  sections: [
    {
      blocks: [
        { p: 'L’**estimation en tailles de T-shirt** est une technique d’estimation relative dans laquelle l’équipe qualifie le travail de très petit, petit, moyen, grand ou très grand, au lieu de lui attribuer un nombre. Elle sacrifie la précision au profit de la rapidité et du confort : presque tout le monde peut dire « ça ressemble à un M » sans cours préalable sur les story points. Les équipes agiles l’utilisent pour la planification de roadmap en amont, le dimensionnement des epics et toutes les situations où des nombres susciteraient plus de débats qu’ils n’en valent la peine. Ce guide présente les tailles, explique quand les tailles de T-shirt l’emportent sur les jeux numériques, comment convertir les tailles en points si besoin et comment animer une session avec votre équipe.' },
      ],
    },
    {
      title: 'Qu’est-ce que l’estimation en tailles de T-shirt ?',
      blocks: [
        { p: 'La méthode reprend l’échelle familière des vêtements. Chaque élément du backlog reçoit une taille, et l’équipe compare les éléments entre eux plutôt que de les mesurer en temps. Un « L » ne correspond pas à un nombre d’heures : il est simplement plus gros qu’un « M » et plus petit qu’un « XL ». Comme les catégories sont larges, l’équipe passe moins de temps à débattre de petites différences et se concentre davantage sur la question qui compte : cet élément a-t-il à peu près la taille du précédent, ou est-il nettement plus gros ?' },
        { p: 'L’estimation en tailles de T-shirt se pratique généralement sous forme de [planning poker](/blog/what-is-planning-poker) : votes privés, révélation simultanée, discussion des valeurs extrêmes, avec des cartes de tailles à la place des cartes numériques. Le fonctionnement reste le même ; seul le vocabulaire change.' },
      ],
    },
    {
      title: 'Les tailles : de XS à XXL, et le jeu étendu',
      blocks: [
        { p: 'Le jeu standard compte cinq ou six tailles :' },
        {
          sizes: [
            { size: 'XS', desc: 'Trivial. Une modification de texte, un changement de configuration, un correctif d’une ligne.' },
            { size: 'S', desc: 'Petit et bien compris. Une journée ou moins pour une personne, sans surprise attendue.' },
            { size: 'M', desc: 'Une story typique. Périmètre clair, quelques éléments à coordonner, tient sans difficulté dans un sprint.' },
            { size: 'L', desc: 'Une grosse story. Réalisable dans un sprint, mais demandera sans doute plus d’une personne ou la majeure partie du sprint.' },
            { size: 'XL', desc: 'Très gros. Probablement une epic déguisée ; mieux vaut la découper avant de s’engager.' },
            { size: 'XXL', desc: 'Trop gros pour être planifié. Un travail d’exploration est nécessaire avant que quiconque puisse le dimensionner sérieusement.' },
          ],
        },
        { p: 'Le jeu T-shirt de Scrum Poker Online étend cette échelle à `Z, T, XXS, XS, S, M, L, XL, XXL, XXXL`, avec en plus les cartes ? et ☕. Z (zéro) couvre les éléments déjà faits ou qui ne demandent aucun travail, T (tiny, minuscule) se place sous XXS pour le plus petit changement imaginable, et XXXL désigne un travail si vaste qu’il est inutile de l’estimer avant de l’avoir découpé. La plupart des équipes n’utilisent que le milieu du jeu ; les extrêmes sont là pour que personne ne soit contraint de choisir une étiquette mal adaptée. Si vous préférez un jeu plus court ou différent, un jeu de cartes personnalisé (jusqu’à 20 cartes de 4 caractères au maximum) s’en charge. Tous les jeux sont comparés sur la page [cartes de planning poker](/planning-poker-cards).' },
      ],
    },
    {
      title: 'Quand le dimensionnement relatif l’emporte sur les nombres',
      blocks: [
        { p: 'Les jeux numériques comme [Fibonacci](/fibonacci-planning-poker) sont excellents pour le travail à l’échelle du sprint. Les tailles de T-shirt brillent dans trois situations :' },
        {
          ul: [
            '**La planification de roadmap en amont.** Quand vous avez cinquante fonctionnalités candidates et devez savoir dans quel trimestre elles pourraient arriver, les classer en S, M ou L en un après-midi est bien plus utile que de passer une semaine à attribuer des story points qui seront faux de toute façon.',
            '**Les epics et les grandes initiatives.** Les gros éléments comportent trop d’inconnues pour qu’un nombre ait un sens. « Cette epic est un XL » est honnête ; « cette epic vaut 89 points » prétend à une précision que personne n’a.',
            '**Les équipes non techniques.** Les équipes marketing, design, opérations ou contenu trouvent souvent les story points rebutants. Les tailles sont intuitives, ne demandent aucune formation et apportent le même bénéfice : une perception commune et relative de l’effort.',
          ],
        },
        { p: 'Les tailles apaisent aussi les discussions. Personne ne défend avec passion qu’une story est un M plutôt qu’un L, comme on pourrait le faire pour un 5 face à un 8 : le consensus arrive donc souvent plus vite. Pour une comparaison plus complète, consultez [Fibonacci ou tailles de T-shirt](/blog/fibonacci-vs-tshirt).' },
      ],
    },
    {
      title: 'Convertir les tailles en story points (facultatif)',
      blocks: [
        { p: 'Certaines équipes veulent intégrer les tailles de T-shirt à leur vélocité ou à un modèle de capacité, et il leur faut pour cela des nombres. Une correspondance courante est `XS=1, S=2, M=3, L=5, XL=8, XXL=13`, qui reproduit l’échelonnement de Fibonacci. Une autre approche consiste à définir chaque taille comme une fourchette : S vaut de 1 à 3 points, M de 5 à 8, L de 13 à 21, et tout ce qui est plus gros reste non estimé.' },
        { p: 'Deux mises en garde. D’abord, c’est facultatif. Beaucoup d’équipes ne convertissent jamais et ne s’en portent que mieux, car dès que les tailles deviennent des nombres, on commence à les traiter comme des engagements. Ensuite, quelle que soit la correspondance choisie, elle doit être convenue avant la session, pas après, sinon les estimations glisseront vers la correspondance qui arrange le plan. Si vous vous surprenez à convertir chaque story, c’est sans doute qu’un jeu numérique vous conviendrait mieux dès le départ. Et si la conversion cache en réalité une envie d’obtenir des heures, lisez [story points ou heures](/blog/story-points-vs-hours) avant d’aller plus loin.' },
      ],
    },
    {
      title: 'Animer une session d’estimation en tailles de T-shirt',
      blocks: [
        {
          ol: [
            '**Convenez d’éléments de référence.** Choisissez une story que l’équipe considère comme un S et une autre comme un L. Tout le reste est dimensionné par rapport à ces deux-là.',
            '**Gardez une liste courte.** Le dimensionnement fonctionne mieux par lots de dix à trente éléments, décrits chacun en une phrase. Collez-les dans la file de stories, ou importez un fichier CSV ou un export Jira, pour que l’animateur puisse les parcourir sans faire défiler un tableur.',
            '**Votez en privé, révélez ensemble.** Chaque participant choisit une carte de taille ; les cartes restent cachées jusqu’à la révélation du tour. Cela évite que la voix la plus expérimentée de la salle impose la taille à tous les autres.',
            '**Ne discutez que des vrais désaccords.** Un S à côté d’un M ne mérite pas de débat. Un S à côté d’un XL, si : l’une de ces deux personnes sait quelque chose que l’autre ignore.',
            '**Enregistrez et passez à la suite.** Enregistrez la taille finale de chaque élément ; l’historique des tours peut être téléchargé en CSV ou copié en Markdown : les tailles arrivent dans votre outil de backlog sans que personne ait à les recopier.',
          ],
        },
        { p: 'Une session de trente éléments prend généralement moins d’une heure. Si elle dure plus longtemps, ce sont probablement les éléments qui sont trop vagues, pas l’équipe qui est trop lente.' },
      ],
    },
    {
      title: 'Les pièges courants',
      blocks: [
        {
          ul: [
            '**Traiter les tailles comme des durées.** « M signifie trois jours » ramène insidieusement le dimensionnement relatif à une estimation en heures, en plus compliqué. Les tailles sont des comparaisons, pas des calendriers.',
            '**Trop de tailles.** Si l’équipe hésite longuement entre XS et S pour chaque élément, convenez de laisser XS de côté. Moins de catégories, des décisions plus rapides.',
            '**Sauter les éléments de référence.** Sans un S et un L convenus, « moyen » ne veut pas dire la même chose pour tout le monde, et les résultats ne sont que du bruit.',
            '**Dimensionner seul.** Une personne qui dimensionne seule un backlog n’y projette que ses propres hypothèses. La valeur naît du désaccord entre plusieurs personnes.',
            '**Ne jamais réévaluer.** Une taille attribuée lors de la planification de roadmap n’est qu’un instantané. Redimensionnez l’élément avant qu’il entre réellement dans un sprint, quand vous en savez davantage.',
          ],
        },
      ],
    },
    {
      title: 'Exemple de session',
      blocks: [
        { example: 'Une équipe produit prépare le trimestre suivant et dispose de douze fonctionnalités candidates. En s’appuyant sur la file de stories, elle les dimensionne en quarante minutes. Neuf convergent immédiatement. « Facturation en libre-service » se partage entre L et XXL ; la personne qui a voté XXL rappelle qu’il faut une intégration de calcul des taxes que personne n’a cadrée. L’équipe la retient en XL et ajoute une tâche d’exploration. « Mode sombre » se partage entre S et L ; la personne qui a voté L se souvient que la bibliothèque de graphiques code ses couleurs en dur. Elle finit en M. L’équipe repart avec une liste dimensionnée, deux risques nouvellement identifiés et aucune dispute pour savoir si quelque chose vaut 5 ou 8.' },
      ],
    },
  ],
  faqTitle: 'Questions fréquentes',
  faq: [
    {
      q: 'Les tailles de T-shirt sont-elles la même chose que les story points ?',
      a: 'Non. Les story points sont numériques et alimentent la vélocité ; les tailles sont des étiquettes ordinales. Vous pouvez faire correspondre les tailles à des points, mais cette correspondance est une convention adoptée par l’équipe, pas une mesure.',
    },
    {
      q: 'Combien de tailles faut-il utiliser ?',
      a: 'Cinq est un bon choix par défaut (de XS à XL). Ajoutez XXL si vous rencontrez régulièrement des éléments trop gros pour être planifiés, et supprimez XS si l’équipe s’en sert rarement. Le jeu étendu existe pour que vous n’ayez pas à trancher dès le départ.',
    },
    {
      q: 'Peut-on utiliser les tailles de T-shirt pour la planification de sprint ?',
      a: 'C’est possible, mais la plupart des équipes passent à un jeu numérique pour les stories à l’échelle du sprint, car il facilite le suivi de la vélocité. Utilisez les tailles pour la roadmap et les epics, puis Fibonacci une fois les stories affinées.',
    },
    {
      q: 'Que faire si l’équipe ne parvient pas à s’accorder sur une taille ?',
      a: 'Discutez des deux extrêmes, puis revotez une fois. Si les avis restent partagés, retenez la taille la plus grande, car sous-estimer coûte généralement plus cher que surestimer, et notez l’incertitude à côté de l’élément.',
    },
  ],
  ctaText: 'Dimensionnez votre backlog avec le jeu T-shirt. Gratuit, sans inscription, jusqu’à 50 participants par salle.',
  ctaLabel: 'Créer une salle gratuite',
  relatedTitle: 'Pour aller plus loin',
  related: [
    { href: '/fibonacci-planning-poker', label: 'Planning poker Fibonacci' },
    { href: '/planning-poker-cards', label: 'Cartes et jeux de planning poker' },
    { href: '/guide', label: 'Animer une session de Scrum Poker, étape par étape' },
    { href: '/blog/estimation-consensus', label: 'Trouver un consensus d’estimation' },
    { href: '/blog/story-points-vs-hours', label: 'Story points ou heures' },
    { href: '/blog', label: 'Tous les articles du blog' },
  ],
};

export default fr;
