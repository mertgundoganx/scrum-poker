import type { Localized } from '../articleTypes';

const fr: Localized = {
  title: "Comment atteindre un consensus d’estimation en Planning Poker",
  subtitle: "Pourquoi les estimations en story points divergent, comment mener un tour de consensus étape par étape, et quand un désaccord vous apprend quelque chose de plus utile qu’un chiffre.",
  sections: [
    {
      title: "Que signifie le consensus en Planning Poker ?",
      content: "En [Planning Poker](/blog/what-is-planning-poker), le consensus signifie que l’équipe s’accorde sur une valeur unique en story points pour un élément du backlog et, surtout, sur ce que cet élément implique. Le chiffre n’est qu’un sous-produit. Si les équipes estiment ensemble, c’est pour faire émerger avant le début du travail des hypothèses différentes sur le périmètre, les risques et l’approche, et c’est dans la discussion qui réduit l’écart entre un 3 et un 13 que cela se produit.",
      paragraphs: [
        "Le consensus n’est pas une unanimité obtenue à l’usure, ni la moyenne des votes. Une équipe qui retient 8 parce que deux personnes ont voté 5, deux autres 13 et que l’animateur a coupé la poire en deux n’a pas atteint de consensus : elle a caché un désaccord dans un chiffre. Un vrai consensus, c’est quand chaque estimateur peut dire « je peux vivre avec cette valeur et je comprends pourquoi c’est celle-là ».",
      ],
    },
    {
      title: "Pourquoi les estimations divergent",
      content: "Quand un développeur vote 3 et un autre 13 pour le même élément, c’est rarement parce que l’un des deux estime mal. Les votes divergents proviennent presque toujours d’un petit nombre de causes.",
      items: [
        "Un périmètre imaginé différemment : l’un estime le scénario nominal, l’autre inclut la gestion des erreurs, les migrations et la documentation.",
        "Des connaissances différentes : l’un connaît le code et se souvient qu’un changement similaire a pris un après-midi ; l’autre n’a jamais touché à ce module.",
        "Des dépendances cachées : quelqu’un sait que l’élément nécessite une équipe externe, une API tierce ou un système legacy sans tests.",
        "Des définitions différentes de « terminé » : l’un compte « fusionné », l’autre « déployé, surveillé et communiqué ».",
        "Une ambiguïté dans l’élément lui-même : la description laisse place à deux ou trois interprétations légitimes.",
      ],
      paragraphs: [
        "Chacune de ces causes mérite d’être découverte pendant l’estimation plutôt que pendant le sprint. C’est pourquoi des votes dispersés sont un bon résultat pour un tour, et non un échec.",
      ],
    },
    {
      title: "Mener un tour de consensus étape par étape",
      content: "Un tour de consensus suit le même rythme fixe que toute [session de Scrum Poker bien menée](/guide). C’est en tenant ce rythme qu’une équipe peut estimer une douzaine d’éléments en une demi-heure sans sacrifier la discussion qui compte.",
      items: [
        "1. Le Product Owner ou l’auteur de l’élément le lit à voix haute, avec ses critères d’acceptation.",
        "2. L’équipe pose des questions de clarification pendant deux ou trois minutes. L’animateur note toute réponse qui modifie le périmètre.",
        "3. Chaque estimateur choisit une carte en privé. Personne ne prononce de chiffre.",
        "4. Toutes les cartes sont révélées au même moment.",
        "5. Si les votes concordent ou se situent sur des cartes voisines, l’équipe retient la valeur commune (en général la plus haute des deux valeurs voisines) et passe à la suite.",
        "6. Si l’écart est plus large, la personne qui a voté le plus haut et celle qui a voté le plus bas expliquent chacune leur raisonnement en une minute au plus. Les autres peuvent ajouter des faits, pas des opinions sur le chiffre.",
        "7. L’équipe revote. La plupart des écarts se résorbent au deuxième tour.",
        "8. Si un troisième tour montre encore un large écart, arrêtez d’estimer : soit l’élément n’est pas compris, soit il est trop gros. Découpez-le, clarifiez-le ou renvoyez-le en affinage.",
      ],
    },
    {
      title: "Exemple concret : combler un écart entre 3 et 13",
      content: "Imaginons une équipe de cinq personnes qui estime l’élément « permettre aux utilisateurs d’exporter leur historique de commandes en CSV ». La première révélation donne 3, 5, 5, 8 et 13. Cet exemple est fictif et sert d’illustration.",
      paragraphs: [
        "L’animateur donne la parole à la personne qui a voté 3 et à celle qui a voté 13. Le développeur qui a voté 3 explique que l’API renvoie déjà l’historique des commandes en JSON : le convertir en CSV et ajouter un bouton de téléchargement représente quelques heures de travail. Celui qui a voté 13 fait remarquer que certains clients ont des dizaines de milliers de commandes, que l’export devrait donc être généré de façon asynchrone et envoyé par e-mail, et que l’endpoint actuel échoue déjà par dépassement de délai au-delà de quelques centaines de lignes.",
        "L’équipe sait maintenant deux choses qu’elle ignorait une minute plus tôt : l’élément cache un problème de performance, et le Product Owner doit décider si les gros comptes font partie du périmètre. Le Product Owner indique que la première version peut se limiter aux douze derniers mois et à quelques milliers de lignes au maximum, les gros exports étant reportés à un élément séparé.",
        "Le deuxième vote donne 5, 5, 5, 8 et 8. Les deux personnes qui ont voté 8 expliquent que leur doute résiduel portait sur les gros exports, désormais hors périmètre ; la tendance habituelle à retenir la carte la plus haute ne s’applique donc pas. L’équipe s’accorde sur 5 pour le périmètre réduit et crée un nouvel élément de backlog pour les gros exports asynchrones, qui sera estimé séparément. Le tour a pris environ six minutes et a éliminé un risque qui serait sinon apparu pendant la deuxième semaine du sprint.",
      ],
    },
    {
      title: "Techniques pour converger plus vite",
      content: "Les techniques suivantes raccourcissent la discussion sans forcer un accord artificiel.",
      items: [
        "Interrogez d’abord les extrêmes. Écouter la personne qui a voté le plus bas et celle qui a voté le plus haut avant tout le monde évite que la majorité couvre la voix de celle qui sait quelque chose d’important.",
        "Gardez des stories de référence. Deux ou trois éléments déjà livrés, de taille convenue, donnent à chacun une règle commune : « est-ce plus gros ou plus petit que la story de réinitialisation du mot de passe, que nous avions estimée à 5 ? »",
        "Limitez la discussion dans le temps. Trois minutes de discussion, puis un nouveau vote, où que l’on en soit. Si un troisième vote est nécessaire, l’élément retourne en affinage.",
        "Découpez avant de débattre. Quand l’écart vient de deux interprétations différentes, découper l’élément selon ces deux interprétations résout généralement le désaccord immédiatement.",
        "Penchez pour la valeur voisine la plus haute. Quand il reste deux cartes voisines, la plus haute reflète en général mieux l’incertitude que la plus basse.",
      ],
    },
    {
      title: "L’ancrage et les autres biais qui faussent les estimations",
      content: "L’ancrage est la tendance à s’aligner sur le premier chiffre entendu. Si un développeur senior dit « ça ressemble à un 3 » avant que les cartes soient montrées, le reste de l’équipe glisse vers 3, d’accord ou non. C’est la raison principale pour laquelle le Planning Poker cache les votes jusqu’à ce que tout le monde ait choisi : le format n’est pas un jeu, c’est une parade.",
      paragraphs: [
        "D’autres biais apparaissent dans les mêmes réunions. Le biais d’autorité pousse à s’en remettre à la voix la plus senior. Le biais d’optimisme amène les estimateurs à supposer que tout se passera comme prévu. La pression du groupe pousse la seule personne qui a montré un 13 dans une salle remplie de 3 à baisser discrètement sa carte au nouveau vote. Chacun de ces biais est atténué par la même pratique : choix privé, révélation simultanée, et une règle selon laquelle les auteurs des votes extrêmes s’expriment en premier et en sont remerciés.",
        "L’outil compte, car le format est facile à casser. En visioconférence, annoncer les chiffres à voix haute ou les taper dans le chat les uns après les autres réintroduit l’ancrage. Scrum Poker Online est une option gratuite qui garde les votes cachés jusqu’à la révélation simultanée, ne demande aucune inscription et conserve un historique des tours avec les votes et l’estimation finale de chaque élément, pour que l’équipe puisse revoir les résultats ensuite.",
      ],
    },
    {
      title: "Quand arrêter la discussion : repères selon l’écart",
      content: "Tous les désaccords ne méritent pas le même temps. Une règle simple, liée à la distance entre les cartes sur [l’échelle de Fibonacci du Planning Poker](/fibonacci-planning-poker), permet de garder des tours courts.",
      items: [
        "Même carte ou cartes voisines (5 et 8) : retenez la valeur la plus haute ou celle de la majorité et passez à la suite ; la discussion coûterait plus cher que la différence.",
        "Deux cartes d’écart (3 et 8) : les auteurs du vote le plus haut et du plus bas s’expliquent, puis l’équipe revote.",
        "Trois cartes d’écart ou plus (2 et 13) : l’élément est compris différemment selon les personnes. Clarifiez le périmètre avant de revoter, et soyez prêt à découper.",
        "Une carte point d’interrogation : quelqu’un ne peut pas estimer du tout. N’avancez pas tant que l’élément ne lui a pas été expliqué ; s’il ne peut pas l’être rapidement, c’est qu’il n’est pas prêt.",
        "Une carte café ou pause : l’équipe est fatiguée. La qualité des estimations chute nettement avec la fatigue ; faites la pause.",
      ],
    },
    {
      title: "Erreurs et anti-patterns courants autour du consensus",
      content: "Les équipes qui peinent à estimer se reconnaissent généralement dans un ou plusieurs de ces travers.",
      items: [
        "Faire la moyenne des votes. La moyenne de 3 et 13 est un chiffre auquel personne ne croit, issu d’une discussion qui n’a jamais eu lieu.",
        "Voter à la majorité. Passer outre la seule personne qui connaît la dépendance va à l’encontre du principe même de l’estimation en groupe.",
        "Laisser le lead décider. Si le résultat est toujours le chiffre du lead, les autres cessent de réfléchir et l’estimation devient l’intuition d’une seule personne, entourée d’un cérémonial.",
        "Discuter jusqu’à ce que tout le monde soit d’accord. Un débat sans fin produit de la fatigue, pas de la justesse. Limitez le temps et revotez.",
        "Récompenser les estimations basses. Si vous félicitez les petits chiffres, ce sont des petits chiffres que vous obtiendrez, et le sprint en paiera le prix.",
        "Rouvrir le chiffre plus tard. Une fois l’équipe d’accord, l’estimation tient, sauf si le périmètre change. La modifier après coup pour « corriger » la vélocité fausse l’historique.",
      ],
    },
    {
      title: "Quand le consensus est un signal d’alerte, et quand le désaccord est normal",
      content: "Un consensus unanime et immédiat sur chaque élément peut être un signal d’alerte. Si cinq personnes votent toujours la même carte sans le moindre mot de discussion, elles s’ancrent peut-être sur une voix dominante, valident par réflexe pour finir plus tôt, ou ne lisent pas vraiment les éléments. Les équipes en bonne santé sont parfois en désaccord ; c’est le signe que chacun réfléchit de façon indépendante et apporte des connaissances différentes.",
      paragraphs: [
        "À l’inverse, tous les désaccords n’ont pas besoin d’être résolus. Sur de petits éléments, un écart entre cartes voisines relève du bruit. Sur de gros éléments incertains, la réponse honnête est parfois « nous n’en savons pas encore assez », et la bonne action est un spike ou un découpage plutôt qu’un chiffre, ou tout au plus une [taille de T-shirt approximative](/t-shirt-sizing). Forcer le consensus dans ces cas-là donne une estimation d’apparence précise qui ne repose sur rien.",
      ],
    },
    {
      title: "Le rôle de l’animateur dans la recherche du consensus",
      content: "Quelqu’un doit tenir le rythme du tour, et cette personne ne devrait généralement pas voter. L’animateur, souvent le Scrum Master, lit ou fait présenter l’élément, maintient les questions de clarification sur le périmètre plutôt que sur la solution, déclenche la révélation, invite les auteurs des votes extrêmes à s’exprimer, surveille l’horloge et lance le nouveau vote. Dans une salle physique, c’est facile ; dans une session à distance, cela fait la différence entre une estimation de vingt minutes et une estimation d’une heure.",
      paragraphs: [
        "L’animateur protège aussi les voix plus discrètes et cantonne le Product Owner à un rôle de réponse aux questions : le Product Owner fixe la priorité, pas la taille.",
      ],
    },
    {
      title: "Checklist du consensus d’estimation",
      content: "Parcourez cette liste avant et pendant votre prochaine session d’estimation.",
      items: [
        "Chaque élément a une description et des critères d’acceptation avant d’être estimé.",
        "Deux ou trois stories de référence, de taille convenue, sont visibles par toute l’équipe.",
        "Les votes sont privés et révélés simultanément ; personne n’annonce de chiffre avant la révélation.",
        "Les personnes ayant voté le plus haut et le plus bas s’expriment en premier, et les autres ajoutent des faits plutôt que des opinions.",
        "La discussion est limitée dans le temps pour chaque élément ; un large écart après deux nouveaux votes renvoie l’élément en affinage.",
        "Les désaccords entre cartes voisines sont tranchés en retenant la valeur la plus haute ou celle de la majorité, jamais en faisant la moyenne.",
        "Le Product Owner répond aux questions de périmètre mais ne vote pas.",
        "Les valeurs finales et une raison en une ligne pour chaque nouveau vote sont consignées.",
        "L’animateur remet de temps en temps en question les votes unanimes obtenus sans discussion.",
      ],
    },
  ],
  faq: [
    {
      q: "Que se passe-t-il si l’équipe ne parvient pas à s’accorder sur une estimation ?",
      a: "Après deux nouveaux votes toujours très dispersés, arrêtez de voter. Soit l’élément est compris différemment selon les personnes, soit il est trop incertain pour être dimensionné. Découpez-le selon les interprétations sur la table, clarifiez le périmètre avec le Product Owner ou planifiez un court spike pour apprendre ce qui manque. Forcer un chiffre à ce stade produit une estimation à laquelle personne ne croit.",
    },
    {
      q: "Faut-il faire la moyenne des votes au Planning Poker ?",
      a: "Non. La moyenne masque le désaccord que le tour devait faire apparaître, et elle produit généralement une valeur qui ne figure même pas sur l’échelle. Si les votes sont sur des cartes voisines, retenez la plus haute ou celle de la majorité. S’ils sont très éloignés, discutez et revotez.",
    },
    {
      q: "Le Product Owner ou le Scrum Master doivent-ils voter ?",
      a: "Le Product Owner ne devrait pas voter : son rôle est d’expliquer le périmètre et la priorité, et son estimation aurait un poids qu’elle ne devrait pas avoir. Le Scrum Master anime généralement plutôt qu’il ne vote, sauf s’il fait aussi du développement dans l’équipe ; dans ce cas, il vote en tant que développeur et quelqu’un d’autre surveille l’horloge.",
    },
    {
      q: "Combien de tours de vote sont normaux pour un élément ?",
      a: "Un ou deux. La plupart des éléments font l’unanimité dès la première révélation ou convergent après une seule explication des votes le plus haut et le plus bas. Un troisième tour signale que l’élément doit être clarifié ou découpé, plutôt que débattu davantage.",
    },
    {
      q: "Le consensus signifie-t-il que tout le monde doit voter la même carte ?",
      a: "Non. Le consensus signifie que chaque estimateur peut accepter la valeur finale et comprend le raisonnement qui la justifie. Des votes sur des cartes voisines, tranchés en retenant la valeur la plus haute, sont un résultat de consensus normal. Des cartes identiques pour tout le monde sur chaque élément, sans discussion, sont plus souvent le signe d’un ancrage que d’une équipe bien calibrée.",
    },
  ],
};

export default fr;
