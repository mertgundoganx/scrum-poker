import type { Localized } from '../articleTypes';

const fr: Localized = {
  title: "Checklist de planification de sprint : 12 étapes pour une réunion réussie",
  subtitle: "Ce qu’il faut préparer avant la réunion, ce qu’il faut décider pendant et ce qu’il faut consigner après : une checklist de planification de sprint pas à pas pour les équipes Scrum, avec un exemple concret.",
  sections: [
    {
      title: "Qu’est-ce que la planification de sprint ?",
      content: "La planification de sprint est la réunion qui ouvre chaque sprint. L’équipe Scrum examine le product backlog priorisé, s’accorde sur un objectif de sprint, sélectionne les éléments du backlog qu’elle pense pouvoir terminer et détermine comment elle va les livrer. Le résultat est le sprint backlog : l’objectif, les éléments sélectionnés et un premier plan de travail.",
      paragraphs: [
        "Le Scrum Guide limite la planification de sprint à huit heures au maximum pour un sprint d’un mois, en précisant qu’elle dure généralement moins longtemps pour des sprints plus courts ; la plupart des équipes en sprints de deux semaines terminent en deux à quatre heures. La réunion répond à trois questions : pourquoi ce sprint a-t-il de la valeur, que peut-on faire, et comment le travail sera-t-il réalisé. Chaque étape de la checklist ci-dessous sert l’une de ces trois questions.",
      ],
    },
    {
      title: "Avant la réunion : étapes 1 à 4",
      content: "La préparation se fait lors de l’affinage du backlog pendant le sprint précédent, et non pendant la réunion de planification elle-même. Si les quatre étapes suivantes sont réalisées, la planification devient une session de décision plutôt qu’une session de découverte.",
      items: [
        "1. Affinez le haut du backlog. Le Product Owner et les développeurs ont discuté des éléments les plus prioritaires, chacun a une description claire et des critères d’acceptation testables, et les éléments trop gros pour un seul sprint ont été découpés.",
        "2. Estimez les éléments candidats. Tout ce qui pourrait entrer dans le sprint a une estimation en story points validée par l’équipe. S’il reste quelques éléments non estimés, prévoyez un court tour d’estimation au début de la planification plutôt que d’estimer au fil de l’eau en pleine réunion.",
        "3. Connaissez votre vélocité et votre capacité. Calculez la moyenne des trois à cinq derniers sprints et recensez qui sera disponible pendant le prochain sprint : congés, formations, astreintes, jours à temps partiel.",
        "4. Préparez une ébauche d’objectif de sprint. Le Product Owner apporte un objectif proposé, lié à un résultat métier. Il sera ajusté pendant la réunion, mais partir d’une ébauche permet de garder une discussion ciblée.",
      ],
    },
    {
      title: "Étape 5 : s’accorder sur l’objectif de sprint",
      content: "Commencez la réunion par l’objectif, pas par la liste des tickets. L’objectif de sprint est une phrase qui énonce ce que le sprint doit accomplir : « les clients peuvent payer avec une carte enregistrée » plutôt que « terminer les tickets 231 à 244 ». Il donne à l’équipe une raison de collaborer et une base pour arbitrer : quand quelque chose glisse, les éléments qui ne servent pas l’objectif sont les premiers à sortir.",
      paragraphs: [
        "Un bon objectif est assez précis pour que l’on sache s’il a été atteint, et assez large pour que l’équipe puisse choisir comment l’atteindre. Si les éléments proposés servent trois objectifs sans rapport entre eux, choisissez-en un, ou reconnaissez que le sprint n’a pas d’objectif unique et acceptez la dispersion qui en découle.",
      ],
    },
    {
      title: "Étape 6 : confirmer la capacité pour ce sprint",
      content: "[La vélocité de votre équipe](/blog/agile-velocity) vous indique ce qu’elle a livré lors d’un sprint passé typique. La capacité vous indique si le prochain sprint sera typique. Comparez les deux avant de sélectionner le moindre élément.",
      paragraphs: [
        "Supposons que la vélocité moyenne soit de 30 points et que l’équipe compte six développeurs. Lors du prochain sprint, un développeur est en congé pendant tout le sprint et un autre pendant la moitié : l’équipe perd l’équivalent d’un développeur et demi sur six pour ce sprint, soit un quart de sa capacité habituelle. Prévoir 22 ou 23 points plutôt que 30 est le point de départ honnête. Retranchez aussi les engagements connus hors sprint, comme un jour de mise en production, un événement d’entreprise ou une rotation d’astreinte chargée.",
      ],
    },
    {
      title: "Étapes 7 et 8 : sélectionner et vérifier les éléments du backlog",
      content: "Une fois l’objectif et la capacité validés, prenez les éléments du haut du backlog jusqu’à ce que le total des points approche la capacité. Arrêtez-vous là, même si le sprint paraît léger ; il vaut bien mieux ajouter un élément en cours de sprint que d’en reporter trois.",
      items: [
        "7. Prenez par ordre de priorité ce qui sert l’objectif. Écarter un élément prioritaire parce qu’il dérange est une décision que le Product Owner doit prendre explicitement, pas un choix par défaut.",
        "8. Vérifiez chaque élément avant de l’accepter : il tient dans un sprint, ses critères d’acceptation sont testables, ses dépendances envers d’autres équipes ou systèmes sont résolues ou explicitement acceptées comme un risque, quelqu’un dans l’équipe a les compétences nécessaires, et les éléments de conception ou d’architecture dont il a besoin sont déjà disponibles.",
      ],
      paragraphs: [
        "Un élément qui échoue à l’une de ces vérifications retourne en affinage. L’intégrer « parce qu’on trouvera bien » est la recette des sprints qui se terminent avec du travail à moitié fait.",
      ],
    },
    {
      title: "Étape 9 : estimer ce qui ne l’est pas encore",
      content: "Si certains éléments candidats n’ont pas d’estimation, faites maintenant un court tour de Planning Poker pour eux. Restez efficace : lisez l’élément, posez les questions de clarification, chacun choisit une carte en privé, révélez simultanément, et laissez les personnes qui ont voté le plus haut et le plus bas s’expliquer si l’écart est large ; le guide [Comment animer une session de Scrum Poker](/guide) détaille chaque étape. Limitez chaque élément à quelques minutes ; s’il ne peut pas être estimé dans ce délai, il n’est pas prêt et ne doit pas entrer dans le sprint.",
      paragraphs: [
        "La révélation simultanée fait partie des [bonnes pratiques de Scrum Poker](/blog/scrum-poker-best-practices) essentielles, car le premier chiffre prononcé à voix haute attire tous les autres vers lui. Avec Scrum Poker Online, vous pouvez [créer une salle de Planning Poker gratuite](/) et mener ces tours sans inscription : les votes restent cachés jusqu’à la révélation du tour, et l’historique des tours conserve les votes finaux de chaque élément, à télécharger en CSV ou à copier en Markdown. Notez vous-même les éléments qui ont nécessité un second vote : c’est un signal utile pour la prochaine session d’affinage.",
      ],
    },
    {
      title: "Étapes 10 et 11 : découper le travail et s’engager",
      content: "Une fois les éléments sélectionnés, les développeurs planifient la manière de les livrer. Cette partie de la réunion appartient aux développeurs ; le Product Owner reste disponible pour répondre aux questions, mais ne dirige pas le plan technique.",
      items: [
        "10. Découpez au moins les premiers éléments en tâches assez petites pour être terminées en une journée ou moins. Le découpage en tâches révèle régulièrement une complexité cachée (une migration, une API manquante, un cas limite flou) alors qu’il est encore temps de remplacer un élément.",
        "11. Rendez l’engagement explicite. Demandez directement à l’équipe si elle pense que l’objectif de sprint est atteignable avec les éléments sélectionnés et la capacité connue. Un oui hésitant est un non : retirez quelque chose.",
      ],
    },
    {
      title: "Étape 12 : après la réunion",
      content: "La réunion produit des décisions ; le sprint backlog les concrétise. Dans l’heure qui suit, les points suivants doivent être acquis.",
      items: [
        "12. Le sprint backlog est formalisé par écrit : l’objectif de sprint est visible dans l’outil et sur le tableau utilisé par l’équipe, les éléments sélectionnés sont placés dans le sprint avec leurs estimations, les tâches sont enregistrées, les hypothèses de capacité sont notées, et chaque risque ou dépendance soulevé pendant la réunion a un responsable.",
        "L’équipe sait par quel élément commencer et, idéalement, l’a commencé le jour même.",
        "Tout ce qui a été renvoyé en affinage a été signalé au Product Owner pour être prêt la prochaine fois.",
      ],
    },
    {
      title: "Exemple concret : une planification de deux heures",
      content: "Voici à quoi ressemblent les douze étapes en pratique pour une équipe fictive de cinq développeurs en sprints de deux semaines, avec une vélocité moyenne de 28 points. Les chiffres sont inventés pour l’illustration.",
      items: [
        "0:00–0:10 — Le Scrum Master confirme la capacité. Tout le monde est disponible, sauf un développeur qui assiste à une conférence de deux jours ; l’équipe prévoit donc environ 26 points au lieu de 28.",
        "0:10–0:25 — Le Product Owner présente l’ébauche d’objectif, « les nouveaux utilisateurs peuvent terminer leur prise en main sans ouvrir de ticket de support », ainsi que les douze éléments affinés en tête du backlog. L’équipe pose des questions et resserre la formulation de l’objectif.",
        "0:25–0:40 — Trois éléments n’ont pas d’estimation. Un rapide tour de Planning Poker les estime à 3, 5 et 8, avec un nouveau vote sur le 8.",
        "0:40–1:10 — L’équipe prend les éléments par ordre de priorité : 5, 3, 8, 5 et 3, soit 24 points. L’élément suivant est un 8 qui porterait le total à 32 ; il reste donc dans le backlog, et un élément de 1 point situé plus bas est pris à la place, ce qui amène le sprint à 25 points.",
        "1:10–1:50 — Les développeurs découpent les quatre premiers éléments en tâches. L’un des éléments de 5 points s’avère dépendre d’une API pas encore publiée par une autre équipe ; il est remplacé par un autre élément de 5 points situé plus bas dans le backlog, ce qui maintient le sprint à 25 points.",
        "1:50–2:00 — L’équipe confirme son engagement, le sprint backlog est mis à jour dans l’outil et l’objectif est publié dans le canal de l’équipe.",
      ],
      paragraphs: [
        "Rien dans cette session n’est remarquable, et c’est tout l’intérêt. Comme l’affinage avait eu lieu en amont, deux heures ont suffi pour prendre chaque décision avec toute l’équipe présente.",
      ],
    },
    {
      title: "Les erreurs courantes de la planification de sprint",
      content: "Ces travers reviennent sans cesse dans les équipes dont les réunions de planification s’éternisent ou dont les sprints se terminent avec du travail inachevé.",
      items: [
        "Affiner pendant la réunion. Si l’équipe rédige les critères d’acceptation pendant la planification, la réunion dure deux fois plus longtemps et les estimations sont des suppositions.",
        "Planifier sur la vélocité sans vérifier la capacité. Trente points ne constituent pas un plan pour un sprint où deux personnes sont absentes.",
        "Remplir le sprint à ras bord. Traiter la vélocité comme un quota à atteindre plutôt que comme un plafond mène à des reports systématiques.",
        "Ne pas avoir d’objectif de sprint. Quand tous les éléments sont aussi importants les uns que les autres, l’équipe ne peut pas décider quoi abandonner quand la réalité s’en mêle.",
        "Laisser une seule personne estimer. Un lead qui annonce les tailles ancre tous les autres et masque les désaccords qui révèlent les risques.",
        "Un Product Owner absent ou pas préparé. Sans priorités ni réponses dans la salle, l’équipe devine ou attend.",
        "Sauter l’engagement explicite. Un sprint que personne n’a validé est un sprint que personne ne porte.",
      ],
    },
    {
      title: "Quand cette checklist aide, et quand elle gêne",
      content: "La checklist est la plus utile pour les équipes dont les sprints se terminent régulièrement avec du travail inachevé, dont les réunions de planification dépassent leur durée prévue, ou dont la composition ou les outils ont récemment changé. Elle transforme la planification, d’une conversation qui dépend de la mémoire d’une personne expérimentée, en une routine reproductible.",
      paragraphs: [
        "Elle est moins utile pour les équipes très matures qui affinent déjà en continu et planifient en trente minutes ; pour elles, dérouler les douze étapes de façon cérémonielle ajoute de la lourdeur sans rien leur apprendre. Utilisez les étapes comme un diagnostic : si vous pouvez en sauter une parce qu’elle est déjà acquise, sautez-la. Et n’oubliez pas qu’une checklist peut confirmer que des critères d’acceptation existent, mais pas qu’ils sont bons.",
      ],
    },
    {
      title: "Checklist de planification de sprint : les 12 étapes sur une page",
      content: "Les douze étapes sous une forme que vous pouvez coller dans le wiki de votre équipe.",
      items: [
        "1. Éléments du haut du backlog affinés, avec critères d’acceptation",
        "2. Éléments candidats estimés",
        "3. Vélocité et capacité connues",
        "4. Ébauche d’objectif de sprint préparée",
        "5. Objectif de sprint validé",
        "6. Capacité ajustée pour ce sprint",
        "7. Éléments sélectionnés par ordre de priorité, dans la limite de la capacité",
        "8. Chaque élément vérifié : tient dans le sprint, testable, dépendances traitées, compétences présentes",
        "9. Éléments non estimés dimensionnés en Planning Poker avec révélation simultanée",
        "10. Travail découpé en tâches d’une journée",
        "11. Engagement explicite de l’équipe sur l’objectif",
        "12. Sprint backlog formalisé par écrit et communiqué",
      ],
    },
  ],
  faq: [
    {
      q: "Combien de temps doit durer la planification de sprint ?",
      a: "Le Scrum Guide fixe un maximum de huit heures pour un sprint d’un mois ; pour des sprints plus courts, elle dure généralement moins longtemps. Les équipes en sprints de deux semaines ont généralement besoin de deux à quatre heures. Si vos réunions durent plus longtemps, la cause est presque toujours un affinage fait pendant la réunion au lieu d’avant.",
    },
    {
      q: "Qui doit participer à la planification de sprint ?",
      a: "Toute l’équipe Scrum : le Product Owner, les développeurs et le Scrum Master. Des parties prenantes ou des experts métier peuvent assister à la première partie pour apporter du contexte, mais la sélection et le plan appartiennent à l’équipe. Le Product Owner doit être présent : planifier sans priorités ni réponses dans la salle revient à deviner.",
    },
    {
      q: "Quelle est la différence entre l’affinage du backlog et la planification de sprint ?",
      a: "L’affinage est l’activité continue qui consiste à clarifier, découper et estimer les éléments du backlog pour qu’ils soient prêts à être traités. La planification de sprint est l’événement où l’équipe sélectionne des éléments prêts pour le prochain sprint et planifie la manière de les livrer. L’affinage prépare le menu ; la planification passe la commande.",
    },
    {
      q: "Faut-il planifier en fonction de la vélocité ou de la capacité ?",
      a: "Des deux. La vélocité fournit la référence : ce que l’équipe termine habituellement. La capacité ajuste cette référence au sprint qui vient, en tenant compte des congés, des astreintes et des autres absences. Planifier sur la seule vélocité ignore la réalité du prochain sprint ; planifier sur la seule capacité ignore l’historique de l’équipe.",
    },
    {
      q: "Que faire si l’équipe ne parvient pas à s’accorder sur un objectif de sprint ?",
      a: "Cela signifie généralement que le haut du backlog manque de cohérence : il contient des éléments qui servent plusieurs résultats sans rapport entre eux. Le Product Owner décide quel résultat est prioritaire, et l’objectif en découle. Si le sprint doit vraiment servir deux résultats, nommez un objectif principal et traitez le second comme un bonus, pour que l’équipe sache quoi protéger quand le temps vient à manquer.",
    },
  ],
};

export default fr;
