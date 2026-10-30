import type { Localized } from '../articleTypes';

const fr: Localized = {
  title: 'Mener une planification de sprint à distance : guide pratique',
  subtitle: 'Un mode d’emploi pas à pas pour les équipes Scrum distribuées : préparation, ordre du jour, estimation, fuseaux horaires, engagement des participants, et les erreurs qui sabotent discrètement les planifications à distance.',
  sections: [
    {
      title: 'Pourquoi la planification de sprint à distance est différente',
      content: 'La planification de sprint est l’événement Scrum au cours duquel l’équipe décide de ce qu’elle livrera lors du prochain sprint, et de la manière d’y parvenir. C’est la réunion la plus collaborative du cadre : le Product Owner apporte les priorités, les développeurs apportent les estimations d’effort et leur jugement technique, et ensemble ils négocient un objectif de sprint réaliste. Dans une même pièce, une bonne partie de cette négociation passe par des regards, des apartés et un tableau blanc. À distance, rien de tout cela n’est acquis : chaque signal doit être rendu explicite grâce aux outils et à l’animation.',
      paragraphs: [
        'La bonne nouvelle, c’est que les équipes distribuées qui planifient avec méthode obtiennent souvent de meilleures sessions que les équipes sur site qui s’en remettent à l’habitude. La préparation écrite remplace les échanges de couloir, le vote privé en ligne lève une partie de la pression sociale, et l’historique des décisions est un simple sous-produit du travail dans le navigateur. Ce guide explique comment y arriver.',
        'Il s’adresse aux Scrum Masters, aux Product Owners et aux responsables d’équipe qui animent la planification de sprint en visioconférence, que l’équipe soit entièrement à distance, hybride ou répartie sur plusieurs fuseaux horaires.',
      ],
    },
    {
      title: 'Avant la réunion : la checklist de préparation à distance',
      content: 'Les sessions à distance pénalisent une mauvaise préparation bien plus durement que les sessions en présentiel. Quand quelqu’un découvre une story en pleine visioconférence, dix personnes attendent en silence pendant qu’il la lit. Faites la lecture en amont, et appuyez-vous sur une [checklist de planification de sprint](/blog/sprint-planning-checklist) pour ne rien oublier.',
      items: [
        'Affinez le haut du backlog au moins deux ou trois jours avant la planification. Chaque story candidate doit avoir une description claire, des critères d’acceptation et des dépendances identifiées.',
        'Partagez la liste des candidates par écrit 24 heures à l’avance, avec une note sur l’objectif de sprint proposé.',
        'Demandez aux membres de l’équipe de poser leurs questions sur les stories en asynchrone, pour que le Product Owner puisse y répondre avant la réunion.',
        'Confirmez la capacité : congés, astreintes, disponibilités à temps partiel. Notez le chiffre ; ne le devinez pas en direct.',
        'Préparez les stories candidates pour les coller dans la file de la salle de poker, une par ligne. Créez la salle au début de la réunion et publiez aussitôt le lien dans le chat de la visioconférence : les salles en temps réel comme celles de Scrum Poker Online sont supprimées environ une heure après le départ de tous les participants ; un lien enregistré dans l’invitation du calendrier ne fonctionne donc que si l’hôte conserve la salle (menu « Plus » → « Conserver cette salle »).',
        'Décidez qui anime, qui prend des notes et qui surveille le temps. En visioconférence, ces rôles n’émergent pas naturellement.',
      ],
    },
    {
      title: 'Un ordre du jour pas à pas pour une planification de sprint à distance',
      content: 'Prévoyez une session de 60 à 120 minutes selon la durée du sprint, et suivez un ordre du jour visible. Une structure qui fonctionne pour la plupart des équipes distribuées :',
      items: [
        '1. Tour de table (5 min) : un rapide « quelque chose qui affecte ce sprint ? » — un collègue malade, un incident, une date de release déplacée.',
        '2. Objectif de sprint (10 min) : le Product Owner propose l’objectif ; l’équipe pose des questions de clarification jusqu’à ce que chacun puisse le reformuler en une phrase.',
        '3. Capacité (5 min) : confirmez le chiffre noté pendant la préparation et ajustez-le selon ce qui est ressorti du tour de table.',
        '4. Estimation (30–60 min) : parcourez les stories candidates par ordre de priorité avec le planning poker. Votez, discutez des écarts, revotez, notez ; le guide [Comment animer une session de Scrum Poker](/guide) détaille chaque étape.',
        '5. Engagement (10 min) : comparez le total à la capacité et à la vélocité récente ; retirez ou découpez des stories jusqu’à ce que le plan soit réaliste.',
        '6. Découpage en tâches (facultatif, 15–30 min) : pour les premières stories, esquissez les tâches afin que le travail puisse démarrer immédiatement.',
        '7. Clôture (5 min) : reformulez l’objectif de sprint, listez les questions ouvertes et leurs responsables, et confirmez où se trouve le compte rendu.',
      ],
    },
    {
      title: 'Utilisez un outil de planning poker dédié, pas le chat ni un tableur',
      content: 'L’erreur d’estimation à distance la plus courante consiste à voter dans la fenêtre de chat. La première personne qui tape « 5 » ancre tous les autres, les retardataires subissent une pression, et il ne reste aucune trace ensuite. Partager un tableur à l’écran pose le même problème, avec plus de friction.',
      paragraphs: [
        'Un outil de planning poker dans le navigateur règle le problème correctement. Tout le monde ouvre la même salle, choisit une carte en privé, et tous les votes sont révélés en même temps. Scrum Poker Online est une option gratuite qui ne demande aucune inscription : l’animateur [crée une salle de planning poker](/), partage un code, un lien ou un QR code, et l’équipe vote en moins d’une minute. Une file de stories garde l’ordre du backlog visible, un minuteur partagé aide à contenir la discussion, et l’historique des tours peut être téléchargé en CSV ou copié en Markdown à la fin de la session.',
        'Si vous êtes encore en train de [choisir un outil de planning poker gratuit](/blog/free-scrum-poker-tools), gardez en tête qu’il doit fonctionner en parallèle de la visioconférence, pas la remplacer. Le vote se fait dans l’outil ; la discussion se fait face à face, caméra allumée.',
      ],
    },
    {
      title: 'Déjouer le biais d’ancrage et le conformisme silencieux',
      content: 'Le biais d’ancrage est la tendance à laisser le premier chiffre entendu influencer toutes les estimations suivantes. C’est un problème dans toute session de planification, mais la distance l’aggrave : faute de pouvoir lire l’ambiance de la salle, chacun suit celui qui a parlé en premier, et le micro coupé permet de se taire facilement plutôt que d’exprimer un désaccord.',
      items: [
        'Les votes cachés avec révélation simultanée ne se négocient pas. C’est toute la raison d’être du planning poker.',
        'Demandez au Product Owner et aux managers de rejoindre la salle en tant que spectateurs. Ils peuvent observer sans carte, ce qui supprime une source subtile de pression.',
        'Après la révélation, interpellez par leur nom les personnes qui ont voté le plus haut et le plus bas. En visioconférence, un « quelqu’un veut expliquer ? » ne rencontre généralement que du silence.',
        'Traitez la carte « ? » comme une réponse valable et une invitation à clarifier la story, pas comme un échec.',
        'Utilisez une fonction de relance ou un message privé pour une personne qui n’a pas voté, plutôt que de l’annoncer à toute la réunion.',
      ],
    },
    {
      title: 'Gérer les fuseaux horaires : synchrone, asynchrone ou les deux',
      content: 'Une équipe répartie sur deux ou trois heures de décalage trouve généralement une plage commune. Une équipe répartie sur huit heures ou plus ne peut pas tenir une session complète en direct sans que quelqu’un travaille au milieu de la nuit à chaque sprint. Adaptez le format au chevauchement dont vous disposez réellement.',
      paragraphs: [
        'Avec un chevauchement raisonnable, protégez cette plage sans concession pour la planification et l’affinage, et faites tourner le créneau inconfortable pour que ce ne soit pas toujours la même région qui en pâtisse. Enregistrez la session et publiez des notes le jour même pour les absents.',
        'Avec peu ou pas de chevauchement, répartissez le travail. Faites la préparation en asynchrone : le Product Owner publie les stories affinées, et chacun les lit et ajoute ses questions pendant sa propre journée de travail. Estimez ensuite en direct pendant le court chevauchement, même avec les seules personnes disponibles, et consacrez ce temps aux stories qui méritent une discussion. Les outils en temps réel comme Scrum Poker Online exigent que tout le monde soit dans la salle au même moment ; ils ne sont pas conçus pour des votes étalés sur une journée. L’engagement et la discussion sur l’objectif de sprint gagnent tout de même à se faire de vive voix, même lors d’un appel de 30 minutes avec deux ou trois représentants.',
      ],
      items: [
        'Stories peu risquées et bien comprises : réglez les questions par écrit en amont pour que chacune ne demande qu’un tour rapide pendant la plage en direct.',
        'Stories avec des questions ouvertes, une nouvelle technologie ou des dépendances entre équipes : réservez-les pour la plage en direct.',
        'Publiez toujours les estimations finales et l’objectif de sprint par écrit, là où toute l’équipe travaille, et pas seulement pendant la réunion.',
      ],
    },
    {
      title: 'Maintenir l’engagement pendant une longue visioconférence',
      content: 'Les sessions de planification à distance perdent leur énergie plus vite qu’en présentiel, car chaque participant est aussi à un clic de sa messagerie. L’engagement est une question d’animation, et il existe des solutions concrètes.',
      items: [
        'Caméras allumées pendant les discussions, éteintes pendant les moments de lecture. Dites-le explicitement pour que personne ne se sente jugé.',
        'Faites une pause de cinq minutes toutes les 45 minutes. Surveillez les cartes café : c’est un signal, pas une plaisanterie.',
        'Donnez un rôle à chacun : quelqu’un lit la story à voix haute, quelqu’un suit les questions ouvertes, quelqu’un surveille le minuteur.',
        'Utilisez le chat d’équipe intégré pour les remarques en aparté et les liens, afin que le canal audio reste dégagé pour les décisions.',
        'Saluez à voix haute les tours où le consensus est rapide. Cela paraît anodin, mais un peu d’élan aide chacun à rester présent.',
        'Terminez à l’heure. Une session qui déborde régulièrement apprend aux participants à décrocher avant la fin.',
      ],
    },
    {
      title: 'Conseils d’animation pour le Scrum Master',
      content: 'En visioconférence, l’animateur en fait plus que dans une salle : il gère la prise de parole, les silences et l’outil en même temps. Quelques habitudes font une grande différence.',
      paragraphs: [
        'Lisez à voix haute le titre de chaque story avant le vote et demandez au Product Owner un résumé de 60 secondes, même si tout le monde l’a lue en amont : cela aligne le groupe et donne du contexte aux retardataires. Lancez le minuteur à la révélation, pas au résumé. Quand la discussion dérive vers la conception de la solution, dites-le, notez la question de conception et revenez à l’estimation.',
        'Repérez les personnes qui n’ont pas parlé depuis vingt minutes et invitez-les par leur nom à s’exprimer. Repérez aussi les deux mêmes personnes qui expliquent chaque écart ; si cela se produit, demandez l’avis d’une troisième personne avant d’ouvrir la discussion. Et gardez la file de stories visible pour que chacun voie ce qu’il reste : il est plus facile de tenir le rythme quand la ligne d’arrivée est à l’écran.',
      ],
    },
    {
      title: 'Documenter et assurer le suivi',
      content: 'Une session à distance qui se termine sans compte rendu écrit n’a pas vraiment eu lieu. Dans l’heure qui suit la clôture, publiez un court résumé là où l’équipe travaille déjà.',
      items: [
        'L’objectif de sprint, en une phrase.',
        'Les stories engagées avec leurs estimations finales — copiez l’historique des tours depuis l’outil de poker plutôt que de le retaper.',
        'Les stories mises de côté, avec la question ouverte et un responsable.',
        'Les hypothèses de capacité et les risques connus.',
        'Un lien vers l’enregistrement, s’il y en a un.',
      ],
    },
    {
      title: 'Les erreurs courantes de la planification de sprint à distance',
      content: 'Voici les écueils les plus fréquents dans les équipes distribuées, et tous peuvent être évités.',
      items: [
        'Affiner pendant la planification. Si l’équipe en est encore à demander « que signifie cette story ? », la session est une réunion d’affinage déguisée.',
        'Voter dans le chat ou en réactivant son micro chacun son tour, ce qui réintroduit l’ancrage.',
        'Laisser gagner la meilleure connexion. La personne qui a le meilleur micro et l’internet le plus rapide n’est pas forcément celle qui a la meilleure estimation.',
        'S’engager au-delà de la capacité parce que « ça va passer » — les équipes à distance ont moins de moyens informels de se rattraper en cours de sprint.',
        'Sauter le compte rendu. Sans notes, les personnes situées dans d’autres fuseaux horaires commencent le sprint avec une vision différente du plan.',
        'Tenir une réunion de trois heures au lieu de deux plus courtes. La fatigue rend la dernière heure inutile.',
      ],
    },
    {
      title: 'Exemple : une session à distance de 90 minutes pour un sprint de deux semaines',
      content: 'Une équipe de sept personnes, répartie entre Istanbul et Berlin, avec une heure de décalage en été et deux en hiver. L’affinage a eu lieu mardi ; la planification a lieu jeudi à 10 h, heure d’Istanbul.',
      paragraphs: [
        'Le tour de table révèle qu’un développeur sera en congé la deuxième semaine et qu’un autre a deux jours d’astreinte ; la capacité passe donc de 70 à 63 jours-personne. Le Product Owner propose l’objectif « Les clients peuvent gérer leurs adresses enregistrées » et l’équipe le reformule. Les douze stories candidates sont collées dans la file de la salle de poker par ordre de priorité. Les six premières convergent chacune en un tour. La story sept, « Valider les formats d’adresse internationaux », donne 3, 5, 8, 8, 13 ; la personne qui a voté 13 explique que les règles de code postal varient selon les pays et nécessitent une source de données, et l’équipe décide de la mettre de côté et de la découper après la réunion. Les stories huit à onze prennent chacune deux tours. La story douze, un 8, porterait le total à 34 points pour une vélocité récente de 31, avec une capacité en baisse d’un dixième sur ce sprint ; l’équipe la retire donc et s’engage sur 26 points.',
        'La clôture prend quatre minutes : objectif reformulé, dix stories engagées, une mise de côté avec un responsable, historique des tours copié dans la page du sprint. Durée totale : 88 minutes, avec une pause.',
      ],
    },
    {
      title: 'Une boîte à outils légère pour planifier à distance',
      content: 'Vous n’avez pas besoin d’une chaîne d’outils lourde. Un ensemble restreint et fiable est plus facile à faire adopter par tout le monde qu’un ensemble étendu :',
      items: [
        'Une visioconférence pour la discussion, avec un lien permanent qui ne change jamais.',
        'Un outil de planning poker dans le navigateur avec votes cachés, file de stories, minuteur partagé et historique exportable — Scrum Poker Online couvre tout cela gratuitement, sans compte.',
        'L’outil de backlog de votre choix, comme source de vérité pour les stories et les priorités.',
        'Un espace documentaire partagé pour le résumé du sprint et les questions ouvertes.',
      ],
    },
  ],
  faq: [
    {
      q: 'Combien de temps doit durer une planification de sprint à distance ?',
      a: 'Le Scrum Guide plafonne la planification de sprint à huit heures pour un sprint d’un mois, et les sprints plus courts en demandent généralement moins. À distance, la fatigue arrive plus vite ; beaucoup d’équipes visent donc environ une heure par semaine de sprint, soit à peu près deux heures pour un sprint de deux semaines, et scindent toute réunion plus longue en deux sessions. Si les sessions durent régulièrement plus longtemps, c’est généralement que le backlog n’est pas suffisamment affiné avant la réunion.',
    },
    {
      q: 'La planification de sprint peut-elle se faire en asynchrone ?',
      a: 'En partie. La préparation se prête bien à l’asynchrone : les stories sont publiées, et chacun les lit et ajoute ses questions pendant ses propres heures de travail. Le vote lui-même fonctionne mieux en direct, et les outils en temps réel comme Scrum Poker Online exigent que tout le monde soit dans la salle en même temps ; gardez donc une courte plage commune pour l’estimation. S’accorder sur l’objectif de sprint et sur l’engagement final fonctionne aussi mieux de vive voix, même brièvement.',
    },
    {
      q: 'Quel est le meilleur outil gratuit pour le planning poker à distance ?',
      a: 'Recherchez des votes cachés avec révélation simultanée, l’absence d’inscription pour que les invités rejoignent la salle instantanément, une file de stories, un minuteur et un moyen d’exporter les résultats. Scrum Poker Online répond à ces exigences, gratuitement et sans compte ; le bon choix pour votre équipe reste celui que tout le monde ouvrira vraiment.',
    },
    {
      q: 'Le Product Owner doit-il voter lors d’un planning poker à distance ?',
      a: 'Non. Le Product Owner explique les stories et répond aux questions ; ce sont les développeurs qui réaliseront le travail qui l’estiment. La plupart des outils proposent un mode spectateur pour que le Product Owner puisse assister à la révélation sans avoir de carte.',
    },
    {
      q: 'Comment gérer les membres de l’équipe qui ne peuvent pas assister à la session en direct ?',
      a: 'Laissez-les publier leurs questions et leurs réserves sur les stories avant la réunion, enregistrez la session et publiez un résumé écrit le jour même. Si les mêmes personnes manquent chaque session à cause des fuseaux horaires, faites tourner le créneau pour que la contrainte soit partagée.',
    },
  ],
};

export default fr;
