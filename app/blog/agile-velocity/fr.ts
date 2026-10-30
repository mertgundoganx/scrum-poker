import type { Localized } from '../articleTypes';

const fr: Localized = {
  title: "Vélocité agile : la calculer, la suivre et l’utiliser pour planifier vos sprints",
  subtitle: "Ce que mesure vraiment la vélocité, comment la calculer correctement, un exemple chiffré pas à pas, et les erreurs qui transforment un indicateur de planification utile en indicateur nuisible.",
  sections: [
    {
      title: "Qu’est-ce que la vélocité agile ?",
      content: "La vélocité agile correspond à la quantité de travail qu’une équipe Scrum termine en un sprint, mesurée dans l’unité qu’elle utilise pour estimer, généralement les [story points plutôt que les heures](/blog/story-points-vs-hours). Si une équipe livre pour 30 points de user stories au cours d’un sprint de deux semaines, sa vélocité pour ce sprint est de 30. Moyennée sur plusieurs sprints, la vélocité devient l’indicateur de planification le plus pratique de l’équipe : elle indique à peu près quelle part du backlog l’équipe peut intégrer au prochain sprint et combien de sprints une release prendra probablement.",
      paragraphs: [
        "Deux caractéristiques distinguent la vélocité des indicateurs de productivité auxquels la plupart des managers sont habitués. D’abord, elle se mesure à l’échelle de l’équipe, jamais de l’individu : les story points sont attribués à une story, et c’est l’équipe qui livre la story. Ensuite, elle est relative. Un point n’a pas de valeur fixe en dehors de l’équipe qui l’a estimé ; la vélocité n’a donc de sens qu’au regard de l’historique propre à cette équipe.",
        "La vélocité est une mesure empirique, pas un objectif. Elle décrit ce qui s’est passé, et elle ne sert qu’à une chose : projeter ce qui se passera probablement ensuite si les conditions restent comparables. Dès qu’on pousse une équipe à « augmenter sa vélocité », le chiffre cesse de décrire la réalité et se met à décrire la pression.",
      ],
    },
    {
      title: "Calculer la vélocité, étape par étape",
      content: "Le calcul en lui-même est simple. Toute la rigueur porte sur ce que vous comptez.",
      items: [
        "1. À la fin du sprint, listez tous les éléments du backlog que l’équipe a intégrés au sprint.",
        "2. Ne gardez que ceux qui satisfont entièrement votre Definition of Done — revus, testés, fusionnés, déployables, ou tout autre critère convenu par l’équipe. Un élément terminé à 90 % compte pour zéro dans ce sprint ; ses points sont reportés au sprint où il est réellement terminé.",
        "3. Additionnez les story points des éléments terminés. Ce total est la vélocité du sprint.",
        "4. Répétez l’opération à chaque sprint et consignez les chiffres dans un endroit visible par toute l’équipe.",
        "5. Après trois à cinq sprints, calculez la moyenne, ou une moyenne glissante des derniers sprints. C’est la vélocité à utiliser pour planifier.",
      ],
      paragraphs: [
        "Ne réestimez pas les stories une fois terminées pour embellir le chiffre, et n’accordez pas de points partiels. Ces deux pratiques semblent anodines sur le moment, mais elles rendent l’historique peu fiable, ce qui ruine la seule utilité de la vélocité.",
      ],
    },
    {
      title: "Exemple chiffré : six sprints de vélocité",
      content: "Imaginons une équipe nouvellement constituée qui travaille en sprints de deux semaines et enregistre les résultats suivants sur ses six premiers sprints. Ces chiffres sont fictifs et servent d’illustration.",
      items: [
        "Sprint 1 : 30 points engagés, 22 terminés (deux stories reportées)",
        "Sprint 2 : 30 points engagés, 31 terminés (les stories reportées ont été terminées dès le début du sprint)",
        "Sprint 3 : 32 points engagés, 28 terminés",
        "Sprint 4 : 30 points engagés, 35 terminés",
        "Sprint 5 : 34 points engagés, 26 terminés (un développeur en congé pendant une semaine)",
        "Sprint 6 : 30 points engagés, 32 terminés",
      ],
      paragraphs: [
        "La moyenne des six sprints est de (22 + 31 + 28 + 35 + 26 + 32) / 6 = 174 / 6 = 29 points. La moyenne glissante des trois derniers sprints est de (35 + 26 + 32) / 3 = 93 / 3 = 31 points. Les deux sont des bases de planification raisonnables. L’observation la plus importante est ailleurs : l’équipe termine entre 26 et 35 points environ lors d’un sprint normal, et c’est cette fourchette, et non un sprint isolé, qui constitue la réalité sur laquelle planifier.",
        "Supposons maintenant que le Product Owner demande combien de temps prendront les 180 points restants du backlog de la release. Avec la moyenne de 29 points sur six sprints, 180 / 29 donne environ 6,2, soit à peu près sept sprints. Avec le bas de la fourchette (26 points), 180 / 26 donne environ 6,9, soit sept sprints. Avec le haut de la fourchette (35 points), 180 / 35 donne environ 5,1, soit six sprints. Une prévision responsable est donc « six à sept sprints, plus probablement sept », communiquée sous forme de fourchette plutôt que de date.",
      ],
    },
    {
      title: "Utiliser la vélocité pour la planification de sprint et les prévisions de release",
      content: "En [planification de sprint](/blog/sprint-planning-checklist), la vélocité est un plafond pour la quantité de travail que l’équipe intègre, pas un quota à remplir. Avec une vélocité de planification d’environ 30 points, l’équipe sélectionne les stories les plus prioritaires du backlog affiné jusqu’à approcher 30, puis s’arrête, même si le sprint paraît léger.",
      paragraphs: [
        "Tenez compte des variations de capacité connues avant de choisir les stories. Si deux développeurs sur six sont en vacances pendant la moitié du sprint, l’équipe perd environ un sixième de sa capacité et devrait prévoir environ 25 points plutôt que 30. La vélocité fournit la référence ; la planification de capacité l’ajuste au sprint qui vient.",
        "La vélocité alimente aussi la planification de release. Diviser les points restants du backlog par la vélocité moyenne donne un nombre de sprints attendu ; diviser par la vélocité récente la plus basse et la plus haute donne une borne pessimiste et une borne optimiste. Présenter les trois est bien plus honnête que d’annoncer une seule date, et cela rend concrètes les négociations de périmètre avec les parties prenantes : si la date est fixe, la fourchette indique combien de points doivent sortir du backlog.",
      ],
    },
    {
      title: "Pourquoi la vélocité évolue dans le temps",
      content: "La vélocité n’est jamais une ligne plate, et elle ne doit pas l’être. Quelques points d’écart d’un sprint à l’autre relèvent du bruit. Les variations plus fortes ou durables ont généralement une cause identifiable qui mérite d’être abordée en rétrospective.",
      items: [
        "Composition de l’équipe : un nouveau membre fait généralement baisser la vélocité pendant quelques sprints, le temps de découvrir le code, et le départ d’un ingénieur senior peut la faire baisser plus longtemps.",
        "Durée du sprint : passer de sprints de deux semaines à des sprints de trois semaines change le chiffre lui-même. Ne comparez la vélocité qu’entre sprints de même durée.",
        "Dérive des estimations : si l’équipe se met progressivement à appeler 8 des stories qu’elle aurait notées 5, la vélocité augmente sans que la production change. Les stories de référence aident à garder une échelle stable.",
        "Nature du travail : un sprint chargé en bugs, incidents ou demandes de support non estimés affichera une vélocité plus faible, même si l’équipe a travaillé tout autant.",
        "Changements techniques : adopter un nouveau framework, migrer une infrastructure ou résorber une grosse part de dette technique réduit temporairement les points livrés.",
        "Interruptions : mises en production, semaines de réunions générales, jours fériés et intégration de nouveaux arrivants réduisent le temps disponible pour le travail planifié.",
      ],
      paragraphs: [
        "En raison de ces facteurs, la plupart des équipes planifient avec une moyenne glissante des trois à cinq derniers sprints plutôt qu’avec le seul dernier sprint. La moyenne glissante réagit aux changements réels tout en atténuant le bruit d’un sprint inhabituel.",
      ],
    },
    {
      title: "Erreurs et anti-patterns courants avec la vélocité",
      content: "La vélocité est bien plus souvent mal utilisée que bien utilisée. Les pratiques suivantes apparaissent dans presque toutes les organisations qui l’adoptent sans comprendre ce qu’elle mesure.",
      items: [
        "Comparer la vélocité entre équipes. Deux équipes qui estiment avec des échelles différentes mesurent des choses différentes ; une équipe dont la vélocité est de 60 n’est pas deux fois plus efficace qu’une équipe à 30. La comparaison n’a aucun sens, et dès que les équipes savent qu’on les compare, les points gonflent.",
        "Utiliser la vélocité comme indicateur de performance. Récompenser une vélocité plus élevée est le moyen le plus rapide de la détruire. Les estimations grossissent, la Definition of Done rétrécit, et le chiffre ne prédit plus rien.",
        "Fixer des objectifs de vélocité. « Nous devons atteindre 40 ce trimestre » transforme une mesure en objectif, et un objectif qu’on peut atteindre en changeant les estimations sera atteint en changeant les estimations.",
        "Compter le travail partiellement terminé. Accorder 5 points sur 8 à une story « presque finie » masque les reports et gonfle la tendance.",
        "Planifier sur le meilleur sprint. S’engager sur la vélocité la plus élevée jamais atteinte garantit des sprints régulièrement ratés.",
        "Suivre une vélocité individuelle. Les story points appartiennent à l’équipe. Une vélocité individuelle incite chacun à éviter le travail en binôme, les revues et l’entraide, c’est-à-dire précisément les comportements qui rendent les équipes rapides.",
      ],
    },
    {
      title: "Quand la vélocité aide et quand elle induit en erreur",
      content: "La vélocité donne le meilleur d’elle-même lorsqu’une équipe stable estime de la même façon depuis au moins quelques sprints et a besoin d’une réponse réaliste à la question « combien pouvons-nous prendre ? ». Dans ce contexte, elle est simple, peu coûteuse et nettement plus honnête que l’intuition.",
      paragraphs: [
        "Elle induit en erreur lorsque les conditions dont elle dépend ne sont pas réunies. Une toute nouvelle équipe n’a pas d’historique à moyenner. Une équipe dont les membres changent à chaque sprint n’a pas d’unité de mesure stable. Une équipe qui mêle du travail opérationnel non estimé à chaque sprint verra des variations brutales sans rapport avec la qualité de sa planification. Et une équipe sommée de montrer des progrès fera dériver ses estimations, consciemment ou non, jusqu’à ce que le graphique ressemble à ce que la direction veut voir.",
        "La vélocité ne dit rien non plus de la valeur. Un sprint qui livre 35 points de fonctionnalités peu prioritaires n’est pas meilleur qu’un sprint qui livre 20 points débloquant un client important. Associez la vélocité à des mesures de résultat (objectifs atteints, problèmes clients résolus, incidents en baisse) et traitez-la strictement comme un signal de capacité.",
      ],
    },
    {
      title: "Des estimations cohérentes pour une vélocité qui a du sens",
      content: "La vélocité ne vaut que ce que valent les estimations qui la sous-tendent. Si une story est estimée à 3 une semaine et une story similaire à 8 la semaine suivante, les variations de vélocité qui en résultent ne vous apprennent rien. Ici, le rôle du Planning Poker n’est pas la précision mais la cohérence. Lorsque chaque membre de l’équipe estime indépendamment par rapport aux mêmes stories de référence, puis que l’équipe discute des écarts, l’[échelle de points de Fibonacci](/fibonacci-planning-poker) reste stable d’un sprint à l’autre.",
      paragraphs: [
        "La façon de procéder compte. Les estimations doivent rester cachées jusqu’à ce que tout le monde ait choisi, afin que le premier chiffre prononcé ne serve pas d’ancre aux autres. Scrum Poker Online est un outil gratuit conçu pour cela : aucune inscription, des votes cachés jusqu’à la révélation simultanée, et un historique des tours qui conserve les votes finaux de chaque story, que vous pouvez télécharger en CSV ou copier en Markdown. Cet historique est aussi précieux lorsque la rétrospective cherche à comprendre pourquoi la vélocité a bougé.",
      ],
    },
    {
      title: "Checklist de la vélocité",
      content: "Utilisez cette checklist pour vérifier que votre vélocité est une base de planification fiable.",
      items: [
        "L’équipe a terminé au moins trois sprints de même durée avec une composition globalement stable.",
        "Seuls les éléments conformes à la Definition of Done sont comptés ; pas de points partiels, pas de réestimation a posteriori.",
        "Le travail imprévu est traité de la même manière à chaque sprint — toujours estimé ou jamais estimé.",
        "La vélocité de chaque sprint est consignée et visible, y compris l’écart entre l’engagé et le terminé.",
        "La planification repose sur une moyenne glissante des trois à cinq derniers sprints, ajustée selon les variations de capacité connues.",
        "Les prévisions sont communiquées sous forme de fourchette de sprints, pas de date unique.",
        "Personne en dehors de l’équipe n’utilise ce chiffre pour comparer des équipes, classer des personnes ou fixer des objectifs.",
        "L’équipe revérifie régulièrement quelques stories de référence pour détecter une dérive des estimations.",
      ],
    },
  ],
  faq: [
    {
      q: "Qu’est-ce qu’une bonne vélocité pour une équipe Scrum ?",
      a: "Il n’existe pas de bonne vélocité universelle. Le chiffre dépend de la façon dont l’équipe attribue ses points, de la durée de ses sprints et de son effectif : 20 peut être excellent pour une équipe et 80 tout à fait ordinaire pour une autre. Une bonne vélocité est simplement une vélocité assez stable pour planifier : si les cinq derniers sprints restent dans une fourchette étroite, l’équipe peut faire des prévisions en confiance, quel que soit le chiffre absolu.",
    },
    {
      q: "Combien de sprints faut-il pour que la vélocité soit fiable ?",
      a: "La plupart des équipes obtiennent une moyenne exploitable après trois sprints et une moyenne assez stable après cinq ou six, à condition que la composition de l’équipe et la durée des sprints restent les mêmes. D’ici là, planifiez prudemment, considérez le chiffre comme provisoire et attendez-vous à l’ajuster.",
    },
    {
      q: "Faut-il compter les bugs et la dette technique dans la vélocité ?",
      a: "Les deux choix se valent tant qu’ils restent cohérents. Si vous estimez et comptez les bugs et les éléments de dette technique, la vélocité reflète l’ensemble du travail livré. Si vous ne les estimez pas, elle ne reflète que le travail sur les fonctionnalités et paraîtra plus faible lors des sprints chargés en bugs. L’erreur consiste à alterner entre les deux approches, ce qui rend les sprints impossibles à comparer.",
    },
    {
      q: "Une vélocité plus élevée signifie-t-elle que l’équipe progresse ?",
      a: "Pas nécessairement. La vélocité augmente lorsque l’équipe livre réellement davantage, mais aussi lorsque les estimations gonflent, que la Definition of Done est assouplie ou que les sprints s’allongent. Vérifiez la cohérence des estimations et la qualité de ce qui a été livré avant de voir une progression dans une courbe ascendante.",
    },
    {
      q: "Quelle est la différence entre vélocité et capacité ?",
      a: "La vélocité est une mesure historique : les points que l’équipe a réellement terminés par sprint. La capacité est une mesure prospective : les personnes et les jours disponibles pour un sprint à venir précis. Utilisez la vélocité comme référence et ajustez-la selon la capacité lorsque des vacances, des astreintes ou d’autres absences rendent le prochain sprint différent d’un sprint habituel.",
    },
  ],
};

export default fr;
