import type { Localized } from '../articleTypes';

const fr: Localized = {
  title: '10 bonnes pratiques de Scrum Poker pour de meilleures estimations',
  subtitle: 'Des techniques concrètes pour des sessions de planning poker plus rapides, plus cohérentes et plus utiles à la planification de sprint, avec des exemples réalistes et une FAQ.',
  sections: [
    {
      title: 'Ce qu’est le Scrum Poker (et pourquoi les bonnes pratiques comptent)',
      content: 'Le Scrum Poker, aussi appelé planning poker, est une technique d’estimation fondée sur le consensus. Chaque membre de l’équipe dispose d’un jeu de cartes (généralement une suite de Fibonacci modifiée : 0, 1, 2, 3, 5, 8, 13, 20, 40, 100), le Product Owner présente une user story, chacun choisit une carte en privé et toutes les cartes sont révélées en même temps. Si les estimations concordent, vous passez à la suite. Si elles divergent, l’équipe en discute et revote.',
      paragraphs: [
        'La mécanique est simple, mais la qualité du résultat dépend presque entièrement de [la façon dont la session est menée](/guide). Une équipe qui révèle les cartes une par une, débat en heures et laisse l’ingénieur le plus bavard fixer le chiffre obtiendra de moins bonnes estimations qu’une équipe qui n’a jamais pratiqué le planning poker, et elle y passera plus de temps. Les pratiques ci-dessous sont celles qui fonctionnent régulièrement lors de vraies planifications de sprint, que l’équipe soit réunie dans une même pièce ou vote depuis un navigateur.',
        'Utilisez cet article comme une checklist. Choisissez deux ou trois pratiques que votre équipe n’applique pas encore, mettez-les en œuvre pendant quelques sprints et observez ce qui change.',
      ],
    },
    {
      title: '1. Estimez la complexité et l’effort, pas les heures',
      content: 'Les story points expriment une taille relative : la quantité de travail, de complexité et d’incertitude que porte une story par rapport aux autres. Un 5 signifie à peu près « un peu moins de deux fois un 3 », pas « cinq heures ». Cette distinction est le fondement de tout le reste, car c’est l’estimation relative qui permet à une équipe de comparer rapidement des stories sans prétendre savoir exactement combien de temps chacune prendra.',
      paragraphs: [
        'Quand quelqu’un dit « ça fait environ deux jours, donc c’est un 5 », recentrez la discussion avec tact : « Par rapport à la fonction d’export que nous avons faite au dernier sprint, est-ce plus gros ou plus petit ? » Se référer au calendrier fait entrer en jeu la vitesse de chacun, les réunions et les interruptions, qui n’ont rien à voir avec la story elle-même. Les points restent aussi stables quand la composition de l’équipe change ; les heures, non.',
        'Un test pratique : si deux développeurs d’expérience différente donnent la même valeur en points à une story mais des estimations différentes en heures, votre équipe raisonne correctement en points.',
      ],
    },
    {
      title: '2. Gardez un ensemble de stories de référence',
      content: 'L’estimation relative ne fonctionne que si tout le monde se compare à la même base. Choisissez quelques stories terminées et bien comprises, et placez-les sur l’échelle : « L’e-mail de réinitialisation du mot de passe valait 2. L’export CSV avec filtres valait 5. La migration du prestataire de paiement valait 13. » Gardez cette liste visible à chaque session.',
      paragraphs: [
        'Les stories de référence règlent deux problèmes courants. Les nouveaux membres de l’équipe peuvent se calibrer rapidement au lieu de deviner ce que vaut un 3 dans cette équipe. Et l’inflation des points, quand un 3 devient peu à peu ce qu’était un 5, est plus facile à repérer, puisque l’équipe se compare sans cesse aux mêmes exemples.',
        'Révisez la liste de référence à intervalles de quelques mois. Une story qui valait 5 il y a un an n’est peut-être plus représentative si le code ou l’équipe a beaucoup changé.',
      ],
    },
    {
      title: '3. Affinez les stories avant de les estimer',
      content: 'Le planning poker met l’incertitude au jour, mais ce ne doit pas être la première fois que quelqu’un lit une story. L’affinage du backlog, une courte session quelques jours avant la planification de sprint, est le moment où le Product Owner clarifie l’objectif, les critères d’acceptation et les contraintes connues. Quand la story arrive à la table de poker, l’équipe doit estimer une solution, pas déchiffrer un titre.',
      items: [
        'Chaque story précise clairement « qui, quoi, pourquoi » et comporte au moins quelques critères d’acceptation.',
        'Les questions ouvertes sont listées sur la story, et non découvertes en plein vote.',
        'Les dépendances envers d’autres équipes ou d’autres systèmes sont signalées explicitement.',
        'Le Product Owner fait un résumé d’une à deux minutes avant le premier vote et répond aux questions avant que quiconque choisisse une carte.',
      ],
    },
    {
      title: '4. Votez en privé et révélez simultanément',
      content: 'La règle la plus importante du planning poker : personne ne voit la carte des autres tant que tout le monde n’a pas choisi. Révéler une par une, ou demander à un ingénieur senior de « commencer », crée un biais d’ancrage : le premier chiffre devient la référence et les estimations suivantes se regroupent autour, que ce soit justifié ou non.',
      paragraphs: [
        'En salle, cela signifie garder les cartes face cachée et les retourner ensemble. En ligne, cela signifie utiliser un outil qui cache les votes jusqu’à la révélation du tour. Scrum Poker Online, par exemple, garde chaque vote caché jusqu’à ce que quelqu’un dans la salle révèle le tour ; il est gratuit et sans inscription, si bien que toute l’équipe peut rejoindre la salle avec un code en quelques secondes.',
        'La même règle s’applique aux attitudes et aux commentaires en aparté. Un « oh, celle-là est facile » lancé avant le vote est aussi une ancre. Demandez à chacun de garder ses avis pour la discussion qui suit la révélation.',
      ],
    },
    {
      title: '5. Donnez d’abord la parole aux votes extrêmes',
      content: 'Quand la révélation montre un écart, par exemple 3, 3, 5, 5 et 13, ne faites pas la moyenne des chiffres et ne laissez pas la majorité couvrir la voix de la valeur isolée. Demandez d’abord aux personnes qui ont voté le plus haut et le plus bas d’expliquer leur raisonnement. Celle qui a voté 13 sait peut-être que l’API tierce a une limite de requêtes non documentée ; celle qui a voté 3 sait peut-être qu’un utilitaire existe déjà pour la moitié du travail.',
      paragraphs: [
        'Cette conversation est le vrai produit du planning poker. Le chiffre n’est qu’un sous-produit. Les équipes qui la sautent et se contentent de la médiane perdent la compréhension partagée qui permet au sprint de se dérouler sans accroc.',
        'Gardez une discussion factuelle : en quoi consiste le travail, quels sont les risques, qu’a-t-on déjà fait de comparable. Si le débat glisse vers « comment l’implémenterais-tu ? », notez la question de conception et passez à la suite : vous estimez, vous ne concevez pas.',
      ],
    },
    {
      title: '6. Revotez, puis décidez : ne tournez pas en boucle',
      content: 'Une fois que les auteurs des votes extrêmes se sont exprimés, votez à nouveau. La plupart des stories [convergent vers un consensus](/blog/estimation-consensus) au deuxième tour, car l’écart d’information qui causait la dispersion est désormais comblé. Si le deuxième tour montre encore un large écart, c’est probablement la story elle-même qui est floue ou trop grosse, et voter davantage n’y changera rien.',
      items: [
        'Écart au tour 1 : discutez des votes extrêmes, puis revotez.',
        'Léger écart au tour 2 (cartes voisines, comme 5 et 8) : accordez-vous sur une valeur ; beaucoup d’équipes retiennent la carte la plus haute quand l’incertitude explique l’écart.',
        'Fort écart au tour 2 (comme 3 et 13) : mettez la story de côté, notez la question ouverte, puis découpez-la ou renvoyez-la en affinage.',
        'Ne dépassez jamais trois tours sur une même story pendant la planification de sprint.',
      ],
    },
    {
      title: '7. Découpez les grosses stories',
      content: 'Une story estimée à 13 ou plus est un signal, pas un résultat. Les grosses estimations cachent une grande incertitude : personne ne peut vraiment dire si « 13 » signifie huit jours ou dix-huit. Découper en tranches plus petites, apportant chacune de la valeur de façon indépendante, produit des estimations plus justes et donne à l’équipe des retours plus tôt pendant le sprint.',
      paragraphs: [
        'Quelques façons utiles de découper : par étape du parcours (d’abord l’envoi du fichier, puis le traitement, puis les notifications), par variante de données (prendre en charge un format de fichier avant trois), par scénario nominal puis cas limites, ou par plateforme (le web avant le mobile). Évitez de découper par couche technique (« story backend » et « story frontend ») quand les tranches ne peuvent pas être livrées indépendamment.',
        'Exemple : « Les utilisateurs peuvent exporter leurs rapports » est estimée à 20. On la découpe en « Exporter un rapport en PDF » (5), « Exporter une période sous forme de ZIP de PDF » (5) et « Envoyer l’export par e-mail quand il est prêt » (3). Le total est plus petit, et chaque morceau peut être présenté seul.',
      ],
    },
    {
      title: '8. Utilisez honnêtement les cartes « ? » et café',
      content: 'La plupart des [jeux de cartes de planning poker](/planning-poker-cards) comportent deux cartes spéciales. Le point d’interrogation signifie « je ne comprends pas assez cette story pour l’estimer ». La tasse de café signifie « j’ai besoin d’une pause ». Ce sont deux votes légitimes, et tous deux apportent une information utile.',
      paragraphs: [
        'Un seul « ? » dans un tour doit suspendre le vote jusqu’à ce que la question ait trouvé réponse. Plusieurs cartes « ? » signifient que la story n’est pas prête et qu’elle doit retourner en affinage plutôt que d’être réduite de force à un chiffre. Une carte café jouée par deux ou trois personnes au bout de quatre-vingt-dix minutes est un signe fiable que les estimations restantes seront moins bonnes que les précédentes : faites la pause.',
        'Faites en sorte qu’utiliser ces cartes ne soit pas mal vu. Si l’équipe considère le « ? » comme un aveu de faiblesse, les gens voteront au jugé, et ce sont précisément ces estimations au hasard que vous cherchez à éliminer.',
      ],
    },
    {
      title: '9. Limitez le temps de chaque story',
      content: 'Les sessions de planning poker dérapent quand une seule story engloutit vingt minutes. Réglez un minuteur visible par story (trois à cinq minutes, discussion comprise, constituent une bonne base) et convenez à l’avance de ce qui se passe quand le temps est écoulé : mettre la story de côté, noter la question ouverte et continuer.',
      paragraphs: [
        'Un minuteur partagé fonctionne mieux qu’un animateur qui surveille sa montre, car chacun voit combien de temps il reste et peut s’autoréguler. Les outils en ligne dotés d’un minuteur intégré facilitent les choses pour les équipes distribuées.',
        'Limitez aussi la durée de la session dans son ensemble. Si vous avez régulièrement besoin de plus de deux heures pour estimer le travail d’un sprint, le problème vient de l’affinage, pas de la session de poker.',
      ],
    },
    {
      title: '10. Confrontez les estimations à la réalité',
      content: 'L’estimation progresse grâce au retour d’expérience. À la fin de chaque sprint, ou pendant la rétrospective, examinez les stories qui ont pris beaucoup plus ou beaucoup moins de temps que ne le laissaient penser leurs points. Demandez-vous ce que l’équipe savait au moment de l’estimation et ce qu’elle a appris ensuite.',
      items: [
        'Certains types de travail (intégrations, migrations de données, finitions d’interface) débordent-ils systématiquement ? Ajustez les stories de référence de cette catégorie.',
        'Les écarts du premier tour étaient-ils larges pour les stories qui ont ensuite surpris l’équipe ? Cela révèle un affinage insuffisant, pas une mauvaise estimation.',
        'Les stories mises de côté pendant la session ont-elles été clarifiées avant le début du sprint ?',
        'Conservez l’historique des tours de votre outil de poker pour voir les votes finaux de chaque story, et pas seulement le chiffre retenu ; notez vous-même l’écart du premier tour quand une story a nécessité un nouveau vote.',
      ],
    },
    {
      title: 'Les erreurs courantes du planning poker',
      content: 'Même les équipes qui connaissent les règles tombent dans quelques pièges récurrents. Surveillez ceux-ci :',
      items: [
        'Faire la moyenne des votes. La moyenne de 3 et 13 n’est pas une estimation, c’est un pile ou face. Discutez plutôt.',
        'Laisser voter le Product Owner ou le manager. Ils sont responsables de la priorité et du périmètre, pas de l’effort. Le mode spectateur existe précisément pour cette raison.',
        'Découvrir la story au moment de voter. Le vote doit suivre une courte discussion sur ce qu’est la story.',
        'Traiter les points comme un engagement ou un indicateur de performance. Dès que les points servent à juger les personnes, ils gonflent.',
        'Réestimer le travail terminé pour « corriger » la vélocité. La vélocité est un outil de planification, pas un score.',
        'Sauter l’étape de la révélation lors des sessions à distance et publier les chiffres dans le chat, ce qui réintroduit l’ancrage.',
      ],
    },
    {
      title: 'Un exemple de tour réaliste',
      content: 'Story : « En tant que client, je peux enregistrer une adresse de livraison dans mon profil pour payer plus vite. » Critères d’acceptation : formulaire d’adresse avec validation, adresses enregistrées affichées au moment du paiement, cinq adresses au maximum par utilisateur.',
      paragraphs: [
        'Le premier tour donne 3, 3, 5, 8, 8. Les deux personnes qui ont voté 8 s’expliquent : la validation des formats d’adresse internationaux est délicate, et le parcours de paiement actuel ne gère aucune donnée enregistrée. L’une des personnes qui ont voté 3 répond que la page de profil dispose déjà d’un composant de formulaire générique avec validation, et l’équipe convient que la validation internationale est hors périmètre pour ce sprint ; le Product Owner ajoute « adresses nationales uniquement » à la story.',
        'Le deuxième tour donne 5, 5, 5, 5, 8. L’équipe retient 5, et la personne qui a voté 8 est à l’aise avec ce choix, puisque les formats internationaux font désormais l’objet d’un élément de backlog distinct. Durée totale : quatre minutes. La story est plus claire qu’à son arrivée, et tout le monde sait pourquoi elle vaut 5.',
      ],
    },
    {
      title: 'Pour commencer',
      content: 'Inutile d’appliquer les dix pratiques dès le premier jour. Commencez par la révélation simultanée, la discussion des votes extrêmes et la limite de temps ; ajoutez des stories de référence au bout d’un sprint ou deux ; puis introduisez la confrontation à la réalité une fois que vous disposez d’un peu d’historique. Si votre équipe travaille à distance ou en hybride, un [outil de Scrum Poker gratuit](/blog/free-scrum-poker-tools) dans le navigateur comme Scrum Poker Online vous offre votes cachés, minuteur partagé et historique des tours, sans que personne ait à créer de compte.',
    },
  ],
  faq: [
    {
      q: 'Quelle est la différence entre Scrum Poker et planning poker ?',
      a: 'C’est la même technique. « Planning poker » est le nom d’origine ; « Scrum Poker » s’est répandu parce que la pratique est surtout utilisée par les équipes Scrum, lors de la planification de sprint et de l’affinage du backlog.',
    },
    {
      q: 'Combien de tours de vote faut-il faire par story ?',
      a: 'Deux tours, c’est la norme : un premier vote, une discussion des votes extrêmes et un second vote. Si le second tour montre encore un fort désaccord, la story est floue ou trop grosse : mettez-la de côté et découpez-la ou affinez-la au lieu de voter une troisième fois.',
    },
    {
      q: 'Le Product Owner ou le Scrum Master doivent-ils voter au planning poker ?',
      a: 'En général, non. Ce sont les personnes qui réaliseront le travail qui l’estiment. Le Product Owner explique la story et répond aux questions ; le Scrum Master anime. Tous deux peuvent rejoindre la salle en tant que spectateurs pour voir les votes sans les influencer.',
    },
    {
      q: 'Que faire quand les estimations ne convergent jamais ?',
      a: 'Un désaccord persistant signifie presque toujours que la story cache une question non résolue : une dépendance inconnue, une exigence ambiguë, ou deux représentations différentes de la solution. Notez la question, renvoyez la story en affinage et estimez-la une fois la question tranchée.',
    },
    {
      q: 'Peut-on utiliser le planning poker pour les bugs et les tâches techniques ?',
      a: 'Oui, à condition que l’élément soit suffisamment compris pour être estimé. Beaucoup d’équipes n’estiment les bugs que lorsque leur cause est connue, et traitent l’investigation comme un spike limité dans le temps plutôt que comme une story estimée en points.',
    },
  ],
};

export default fr;
