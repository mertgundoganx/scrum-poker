import type { Localized } from '../articleTypes';

const fr: Localized = {
  title: 'Les meilleurs outils de Scrum Poker gratuits : les critères qui comptent',
  subtitle: 'Un guide pratique pour choisir un outil de planning poker gratuit : les critères qui comptent, les catégories d’outils disponibles, les questions à se poser avant de choisir, et ce que propose Scrum Poker Online.',
  sections: [
    {
      title: 'Pourquoi « gratuit » mérite qu’on y regarde de plus près',
      content: 'Une recherche d’outil de Scrum Poker gratuit renvoie des dizaines de résultats, et la plupart se présentent comme gratuits. En pratique, « gratuit » recouvre des réalités très différentes : des produits entièrement gratuits, des offres gratuites qui limitent le nombre de participants ou de salles, des essais qui expirent et des projets open source à héberger soi-même. Aucune de ces formules n’est mauvaise, mais les différences comptent le jour où une équipe de dix personnes veut estimer un jeudi matin et découvre que la dixième place, le minuteur ou l’export est réservé à une offre payante.',
      paragraphs: [
        'Plutôt que de classer des produits selon des listes de fonctionnalités qui changent tous les trimestres, et que nous ne pouvons pas vérifier de façon indépendante, ce guide vous propose un ensemble de critères stables. Utilisez-le pour évaluer n’importe quel outil de planning poker en une quinzaine de minutes, y compris ceux qui apparaîtront après la publication de cet article.',
        'En bref : choisissez un outil que toute l’équipe peut ouvrir instantanément, qui cache les votes jusqu’à la révélation, qui prend en charge le jeu de cartes que vous utilisez réellement et qui vous permet de conserver les résultats. Tout le reste est un bonus.',
      ],
    },
    {
      title: 'Qu’est-ce qu’un outil de Scrum Poker, et en avez-vous besoin ?',
      content: 'Un outil de Scrum Poker (ou de planning poker) remplace le jeu de cartes physique utilisé lors des sessions d’estimation. Tout le monde rejoint une salle partagée, l’animateur présente une user story, chaque participant choisit une carte en privé et toutes les cartes sont révélées en même temps. L’outil affiche ensuite la répartition des votes, souvent avec une moyenne ou une estimation suggérée, puis l’équipe discute et revote si nécessaire.',
      paragraphs: [
        'Les équipes réunies sur un même site peuvent se contenter de cartes physiques. Pas les équipes à distance ou hybrides : voter dans le chat ou en réactivant son micro chacun son tour réintroduit le biais d’ancrage, précisément le problème que [la méthode du planning poker](/blog/what-is-planning-poker) devait éliminer. Si un seul membre de votre équipe participe à la planification de sprint en visioconférence, un outil dédié vaut bien les quelques minutes de mise en place.',
      ],
    },
    {
      title: 'La checklist des critères : que regarder dans un outil de planning poker gratuit',
      content: 'Passez chaque outil candidat au crible de cette liste. Les quatre premiers critères sont indispensables ; les autres dépendent de la façon dont votre équipe travaille.',
      items: [
        'Aucune inscription pour les participants. Les invités doivent pouvoir rejoindre la salle avec un lien ou un code et un nom d’affichage. Si chaque développeur doit créer un compte, l’adoption chute et la première session est consacrée à la prise en main de l’outil.',
        'Limite de participants. Vérifiez combien de personnes une salle peut accueillir dans l’offre gratuite, et si ce nombre couvre votre plus grande session, spectateurs compris, comme le Product Owner et les parties prenantes.',
        'Types de jeux de cartes. La suite de Fibonacci modifiée est le choix par défaut pour les [valeurs des cartes de planning poker](/planning-poker-cards), mais beaucoup d’équipes utilisent des tailles de T-shirt, des puissances de 2 ou une suite personnalisée. Un outil qui ne propose qu’un seul jeu oblige l’équipe à s’adapter à l’outil, au lieu de l’inverse.',
        'Votes cachés et révélation simultanée. C’est non négociable. Les votes doivent rester invisibles pour tout le monde jusqu’à la révélation du tour.',
        'Consensus et estimation suggérée. Après la révélation, l’outil doit afficher clairement la répartition et, idéalement, signaler l’accord ou suggérer une valeur, pour que l’animateur n’ait pas à calculer de tête.',
        'Chat d’équipe. Pratique pour les remarques en aparté et les liens vers les tickets, afin que le canal audio reste libre pour la discussion.',
        'File de stories. Pouvoir charger une liste de stories et les parcourir dans l’ordre donne du rythme à la session et permet à chacun de savoir combien il en reste.',
        'Minuteur partagé. Une durée limite par story, visible par tous, est l’un des moyens les plus simples d’éviter qu’une session déborde.',
        'Historique des tours et export. Vous devez pouvoir consulter les tours précédents et en copier les résultats, en CSV ou dans un format similaire, vers votre outil de backlog ou vos notes de sprint.',
        'Mode spectateur. Les Product Owners, les Scrum Masters et les parties prenantes doivent pouvoir observer sans avoir de carte en main.',
        'Confidentialité et traitement des données. Ce qui est stocké, pendant combien de temps et où. Des salles qui expirent et ne demandent aucune donnée personnelle sont plus faciles à faire valider dans les environnements réglementés.',
        'Prise en charge du mobile. Certains participants voteront depuis leur téléphone. Le choix des cartes et la révélation doivent fonctionner sur un écran de téléphone, sans zoomer.',
        'Prise en charge des langues. Pour les équipes internationales, une interface disponible dans la langue de chaque membre supprime une friction modeste, mais bien réelle.',
        'Auto-hébergement et open source. Si votre organisation ne peut pas utiliser de SaaS externe, un outil open source déployé en interne est peut-être la seule option viable. Il vous permet aussi de vérifier précisément ce que l’outil fait de vos données.',
        'Incitations commerciales et interruptions. Un outil gratuit qui interrompt l’estimation par des fenêtres pop-up ou des invitations répétées à passer à une offre supérieure ralentira la session et agacera l’équipe.',
      ],
    },
    {
      title: 'Les catégories d’outils de planning poker',
      content: 'Les outils de Scrum Poker gratuits se répartissent en quelques grandes catégories. Savoir laquelle convient à votre équipe réduit rapidement le champ de recherche.',
      paragraphs: [
        'Les outils autonomes dans le navigateur sont les plus répandus. Ils fonctionnent sur un site web, ne demandent aucune installation et permettent généralement aux invités de rejoindre la salle avec un lien. Ils conviennent aux équipes qui veulent commencer à estimer tout de suite et n’ont pas besoin que les estimations soient reportées automatiquement dans un outil de tickets. Leur principale contrepartie : les estimations doivent être recopiées à la main dans le backlog, d’où l’importance d’une fonction d’export ou de copie.',
        'Les plugins et intégrations d’outils de backlog fonctionnent au sein de Jira, d’Azure DevOps ou de systèmes similaires. Leur force : la story et l’estimation sont au même endroit. Leurs contreparties : tout le monde a généralement besoin d’une licence et d’un identifiant pour le système hôte, il est plus difficile d’inclure des spectateurs extérieurs à l’organisation, et les offres gratuites des applications de marketplace peuvent être limitées ou temporaires. Vérifiez les conditions propres à votre plateforme avant de vous engager.',
        'Les jeux de cartes physiques fonctionnent toujours pour les équipes entièrement réunies sur site. Ils coûtent peu, ne demandent aucune mise en place et ne posent aucune question de confidentialité. Ils ne conviennent pas aux équipes hybrides, ne laissent aucun historique, et la « révélation » suppose que personne ne regarde en douce.',
        'Les outils open source auto-hébergés sont adaptés quand les données doivent rester sur le réseau de l’entreprise ou quand l’équipe veut personnaliser l’outil. Le coût est opérationnel : quelqu’un doit le déployer, le mettre à jour et le maintenir en service.',
      ],
    },
    {
      title: 'Ce que propose Scrum Poker Online au regard de la checklist',
      content: 'Scrum Poker Online (scrumpokerplay.com) est un outil de planning poker gratuit qui fonctionne dans le navigateur. Voici ce qu’il propose au regard des critères ci-dessus, présenté sans détour pour que vous puissiez le comparer aux autres outils que vous évaluez.',
      items: [
        'Gratuit et sans inscription : l’animateur crée une salle, partage un code ou une invitation QR, et les participants la rejoignent avec un nom d’affichage. Il n’y a aucun compte et rien à payer.',
        'Participants : jusqu’à 50 personnes dans une salle, spectateurs compris.',
        'Jeux de cartes : Scrum (0, ½, 1, 2, 3, 5, 8, 13, 20, 40, 100), Fibonacci, tailles de T-shirt, puissances de 2 et jeux personnalisés.',
        'Mécanique de révélation : les votes restent cachés jusqu’à ce que quelqu’un dans la salle révèle le tour (ou seulement l’hôte, si l’option « Seul l’hôte mène le tour » est activée), après un compte à rebours de 3 secondes ; l’écran de résultats affiche la répartition avec un indicateur de consensus et une estimation suggérée.',
        'Outils de session : chat d’équipe intégré, file de stories à remplir par copier-coller ou par import d’un fichier CSV (un export Jira ou de tableur fonctionne), minuteur partagé (chronomètre ou compte à rebours), mode spectateur, réactions emoji et relance d’un coéquipier qui n’a pas encore voté.',
        'Outils de l’hôte : changer de jeu de cartes, révéler automatiquement quand tout le monde a voté, vote anonyme, réserver le lancement des tours à l’hôte, fermer la salle aux nouveaux venus, retirer des participants, transmettre le rôle d’hôte et conserver une salle pour que son lien, sa configuration et sa file de stories resservent au sprint suivant.',
        'Tickets : les clés de tickets comme PROJ-123 deviennent des liens vers votre outil de suivi dès que l’hôte en a renseigné l’adresse.',
        'Historique : historique des tours avec l’estimation finale de chaque story, téléchargeable en fichier CSV avec des colonnes pour la clé de ticket et les story points, ou copiable en Markdown dans vos notes de sprint.',
        'Mobile et langues : fonctionne sur un écran de téléphone et est disponible en 7 langues.',
        'Confidentialité : ni compte ni adresse e-mail ; le contenu d’une salle est supprimé environ une heure après le départ de la dernière personne, et une salle conservée ne garde que son code, son nom, son jeu de cartes, ses paramètres, sa file de stories et ses estimations finales.',
      ],
      paragraphs: [
        'Ce qu’il ne fait pas : il ne reporte pas automatiquement les estimations dans un outil de tickets. Si votre équipe a besoin de cette intégration, un plugin pour votre outil de backlog conviendra peut-être mieux, ou vous pouvez combiner les deux : estimer dans le navigateur, télécharger le CSV et l’importer dans votre outil de suivi. Il est aussi conçu uniquement pour les sessions en direct : les salles fonctionnent en temps réel, il ne convient donc pas à un vote étalé sur une journée.',
      ],
    },
    {
      title: 'Les questions à se poser avant de choisir',
      content: 'Ces questions font apparaître les contraintes que les listes de fonctionnalités ont tendance à masquer. Répondez-y avec votre équipe avant de lancer une session d’essai.',
      items: [
        '1. Qui participe à nos sessions ? Comptez les développeurs, le Product Owner, le Scrum Master et les parties prenantes régulières. Ce total est votre nombre minimum de participants.',
        '2. Quel jeu de cartes utilisons-nous, et quelqu’un risque-t-il d’en vouloir un autre ? Les équipes qui estiment à la fois des stories et des bugs utilisent souvent deux jeux.',
        '3. Tout le monde doit-il déjà se connecter à un outil ? Si l’équipe passe ses journées dans un outil de backlog, un plugin peut sembler naturel ; si des prestataires ou des équipes partenaires participent, un outil sans inscription est plus simple.',
        '4. Où les estimations doivent-elles aboutir ? Si la réponse est « dans les tickets », vérifiez à quel point il est facile de les y reporter.',
        '5. Quelles sont nos règles en matière de données et de confidentialité ? Demandez si le contenu des salles est stocké, pendant combien de temps, et si l’éditeur peut vous le montrer.',
        '6. Menons-nous des sessions en asynchrone ? Si oui, les salles doivent persister assez longtemps pour que les personnes situées dans d’autres fuseaux horaires puissent voter.',
        '7. Que se passe-t-il si l’outil fait des siennes ? Vérifiez que vous pouvez basculer sur une solution simple sans perdre la session.',
      ],
    },
    {
      title: 'Une session d’évaluation de 15 minutes',
      content: 'Le moyen le plus rapide de comparer des outils consiste à [mener une courte session de Scrum Poker](/guide) de la même façon dans chacun d’eux. Ne vous fiez pas à la page marketing.',
      items: [
        'Créez une salle et chronométrez le temps nécessaire à trois personnes pour la rejoindre depuis un lien, dont une sur téléphone.',
        'Chargez trois stories dans la file, dont une volontairement floue.',
        'Votez sur la première story, révélez, et vérifiez qu’aucun vote n’était visible avant la révélation.',
        'Lancez le minuteur sur la deuxième story et vérifiez que tout le monde voit le même temps.',
        'Demandez à une personne de jouer la carte « ? » sur la story floue et regardez comment l’outil la présente.',
        'Ajoutez un spectateur et vérifiez qu’il ne peut pas voter.',
        'Exportez ou copiez les résultats et collez-les dans votre outil de backlog.',
        'Fermez le navigateur, rouvrez le lien de la salle et vérifiez que la session se trouve dans l’état où vous l’avez laissée.',
      ],
    },
    {
      title: 'Les erreurs courantes dans le choix d’un outil gratuit',
      content: 'Les équipes commettent souvent les mêmes quelques erreurs en choisissant un outil d’estimation. Elles sont faciles à éviter une fois identifiées.',
      items: [
        'Choisir au nombre de fonctionnalités. Un outil doté de trente fonctionnalités que personne ne comprend perd face à un outil qui en a huit que tout le monde utilise.',
        'Négliger la facilité d’accès à la salle. Si rejoindre une salle prend plus d’une minute, quelqu’un finira par taper ses chiffres dans le chat.',
        'Ne pas tester sur téléphone. Au moins un participant par session sera sur mobile à un moment ou à un autre.',
        'Oublier l’historique. Sans export, chaque session se termine par quelqu’un qui retape les estimations à la main, et des erreurs s’y glissent.',
        'Considérer l’offre gratuite comme acquise. Si le modèle économique d’un éditeur repose sur votre passage à une offre payante, préparez cette discussion avant qu’elle n’arrive.',
        'Laisser l’outil dicter le processus. L’outil doit soutenir la façon dont votre équipe estime (votes cachés, discussion, nouveau vote), et non la remplacer par un autre fonctionnement.',
      ],
    },
    {
      title: 'En résumé',
      content: 'Il n’existe pas de meilleur outil de Scrum Poker gratuit pour toutes les équipes, mais il existe un meilleur outil pour la vôtre : celui qui remplit les critères essentiels, correspond à votre façon réelle de travailler et que toute l’équipe ouvrira sans qu’on ait à le lui rappeler. Utilisez la checklist, menez l’évaluation de 15 minutes avec deux ou trois candidats et décidez ensemble. Si vous cherchez un point de départ, Scrum Poker Online est gratuit, ne demande aucune inscription et couvre les critères essentiels ci-dessus : [lancez une salle gratuite](/) avec votre équipe et voyez s’il vous convient.',
    },
  ],
  faq: [
    {
      q: 'Existe-t-il un outil de planning poker entièrement gratuit et sans inscription ?',
      a: 'Oui. Plusieurs outils dans le navigateur permettent à un animateur de créer une salle et de partager un lien, pour que les participants la rejoignent avec un simple nom d’affichage. Scrum Poker Online en est un exemple : il est gratuit, ne comporte aucun compte, et toutes les fonctionnalités sont incluses.',
    },
    {
      q: 'Quelle est la différence entre les outils de Scrum Poker et de planning poker ?',
      a: 'Aucune en pratique. « Planning poker » est le nom d’origine de la technique d’estimation ; « Scrum Poker » est le nom que lui donnent de nombreuses équipes Scrum. Les outils qui utilisent l’un ou l’autre nom font le même travail : un vote privé sur la taille des stories, avec une révélation simultanée.',
    },
    {
      q: 'Ai-je besoin d’une intégration Jira ou Azure DevOps pour le planning poker ?',
      a: 'Seulement s’il est important pour vous que les estimations soient reportées automatiquement dans les tickets et que toutes les personnes présentes à la session aient déjà accès à ce système. Beaucoup d’équipes estiment dans un outil autonome dans le navigateur et copient ensuite les résultats dans leur backlog, ce qui prend une minute et garde la session ouverte aux invités.',
    },
    {
      q: 'Combien de personnes peuvent rejoindre une salle de Scrum Poker gratuite ?',
      a: 'Cela dépend de l’outil : comparez les limites de l’offre gratuite à votre plus grande session. Scrum Poker Online accepte jusqu’à 50 participants dans une salle, gratuitement, ce qui couvre la plupart des équipes Scrum en laissant de la place aux spectateurs. L’hôte peut conserver une salle, pour que le même lien et la même configuration resservent au sprint suivant.',
    },
    {
      q: 'Peut-on utiliser les outils de planning poker en asynchrone, sur plusieurs fuseaux horaires ?',
      a: 'Certains outils le permettent, à condition que les salles persistent assez longtemps pour que tout le monde vote et que personne ne révèle trop tôt. Scrum Poker Online est au contraire conçu pour les sessions en direct : une personne déconnectée quitte la salle au bout d’environ 90 secondes, et une salle vide est supprimée au bout d’environ une heure. Entre fuseaux horaires, utilisez une plage commune, même courte, et préparez les stories par écrit à l’avance.',
    },
  ],
};

export default fr;
