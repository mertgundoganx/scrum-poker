import type { Localized } from '../articleTypes';

const fr: Localized = {
  title: 'Fibonacci ou tailles de T-shirt : quelle échelle d’estimation agile choisir ?',
  subtitle: 'Comment fonctionnent les deux échelles d’estimation les plus répandues, pourquoi les écarts de Fibonacci se creusent, quand utiliser l’une ou l’autre, et comment passer de l’une à l’autre.',
  sections: [
    {
      title: 'Fibonacci ou tailles de T-shirt : la réponse courte',
      content: 'Utilisez les story points en Fibonacci quand vous avez besoin de chiffres à additionner, à suivre sous forme de vélocité et à exploiter pour vos prévisions de sprint. Utilisez les tailles de T-shirt quand vous avez besoin d’une idée rapide et sans friction de la taille relative : premier passage sur un gros backlog, discussions de roadmap avec les parties prenantes, ou équipe qui découvre l’estimation. Beaucoup d’équipes utilisent les deux : les T-shirts pour un dimensionnement grossier à long terme, Fibonacci pour les stories sur le point d’entrer dans un sprint. Aucune des deux échelles n’est « plus juste » en soi ; la différence tient à la granularité et à ce que vous pouvez faire du résultat ensuite.',
    },
    {
      title: 'Qu’est-ce que l’estimation Fibonacci en agile ?',
      content: 'L’[estimation Fibonacci](/fibonacci-planning-poker) attribue des story points aux éléments du backlog en utilisant des valeurs tirées de la suite de Fibonacci, dans laquelle chaque nombre est la somme des deux précédents : 1, 2, 3, 5, 8, 13, 21, 34. La plupart des équipes agiles utilisent la version modifiée popularisée par Mike Cohn dans « Agile Estimating and Planning » : 0, 1, 2, 3, 5, 8, 13, 20, 40, 100. Les grandes valeurs sont arrondies, car hésiter entre 21 et 20 supposerait une précision que personne n’a réellement.',
      paragraphs: [
        'Une story notée 8 ne représente ni huit heures ni huit jours. Cela signifie que l’équipe la juge nettement plus grosse qu’un 5 et nettement plus petite qu’un 13, en tenant compte de l’effort, de la complexité, de l’incertitude et des risques. Les points n’ont de sens que par rapport à une story de référence que l’équipe connaît déjà, par exemple « le parcours de réinitialisation du mot de passe valait 3 ». Fibonacci est le jeu de cartes par défaut du Planning Poker et de la plupart des outils.',
      ],
    },
    {
      title: 'Pourquoi les écarts se creusent : la logique de l’échelle de Fibonacci',
      content: 'Pour l’estimation, la propriété clé de la suite est que chaque valeur vaut environ 1,6 fois la précédente : les écarts s’élargissent à mesure que les nombres grandissent. Cette forme correspond à la façon dont nous percevons la taille. Tout le monde sait distinguer une story de 2 points d’une story de 3 points. Personne ne peut honnêtement distinguer un 20 d’un 21. Une échelle linéaire (1, 2, 3, 4, 5, 6, 7, 8…) invite à débattre de distinctions que l’équipe est incapable de faire.',
      paragraphs: [
        'La justification habituelle est la loi de Weber–Fechner, issue de la psychophysique : la plus petite différence perceptible est proportionnelle à la taille de ce que l’on compare. Une échelle dont les pas croissent proportionnellement respecte cette limite, si bien que chaque carte représente une différence que l’équipe peut réellement percevoir. Quand une équipe hésite entre 20 et 40, la réponse honnête est généralement « nous n’en savons pas encore assez », et la story doit être découpée ou faire l’objet d’un spike plutôt que d’un débat.',
      ],
    },
    {
      title: 'Qu’est-ce que l’estimation en tailles de T-shirt ?',
      content: 'L’[estimation en tailles de T-shirt](/t-shirt-sizing) classe les éléments du backlog dans une poignée de catégories qui portent le nom de tailles de vêtements : XS, S, M, L, XL et parfois XXL. C’est une échelle relative, comme Fibonacci, mais volontairement grossière. Un « M » signifie simplement « à peu près de la taille des autres éléments que nous avons classés M », et l’équipe définit ce que cela recouvre en s’appuyant sur des exemples réels.',
      paragraphs: [
        'Leur atout : les tailles ne sont pas des nombres. Aucune tentation de les additionner, de les convertir en heures ou de débattre pour savoir si quelque chose vaut 5 ou 6. Les parties prenantes non techniques les trouvent intuitives, et une équipe qui n’a jamais estimé peut produire des tailles de T-shirt utiles dès sa première session. L’échelle brille quand il s’agit de dimensionner un grand nombre d’éléments à la fois, comme la roadmap d’un trimestre ou un lot d’epics.',
      ],
    },
    {
      title: 'L’estimation en tailles de T-shirt en pratique',
      content: 'Une session d’estimation en tailles de T-shirt est courte et peut se faire avec des cartes, des post-it ou un jeu de cartes en ligne :',
      items: [
        '1. Convenez de points d’ancrage. Choisissez un élément que l’équipe considère clairement comme un S et un autre clairement comme un L. Tous les autres éléments sont dimensionnés par rapport à ceux-là.',
        '2. Présentez brièvement chaque élément. Le Product Owner en donne la version en une phrase ; les questions de fond sont reportées, sauf si elles bloquent le dimensionnement.',
        '3. Chacun choisit une taille en privé et la révèle en même temps que les autres, exactement comme au Planning Poker, pour que la première voix ne serve pas d’ancre à toute la salle.',
        '4. Ne discutez que des écarts. Si presque toute l’équipe dit M et qu’une personne dit XL, cette personne explique ce qu’elle voit.',
        '5. Notez la taille et passez à la suite. Une session type traite bien plus d’éléments par heure qu’une session en Fibonacci, car l’échelle suscite moins de débats.',
        '6. Convertissez plus tard si nécessaire. Les éléments qui remontent en haut du backlog sont réestimés en story points quand l’équipe est prête à planifier un sprint.',
      ],
    },
    {
      title: 'Fibonacci ou tailles de T-shirt : comparaison point par point',
      content: 'Les différences concrètes, critère par critère :',
      items: [
        'Granularité : Fibonacci offre une dizaine de valeurs distinctes, les tailles de T-shirt cinq ou six. Fibonacci distingue un 5 d’un 8 ; les T-shirts regroupent les deux en M ou en L.',
        'Calcul : les points Fibonacci s’additionnent en un total de sprint et se moyennent en vélocité. Les tailles de T-shirt ne peuvent pas s’additionner sans associer d’abord chaque taille à un nombre.',
        'Prévisions : avec la vélocité, les points Fibonacci permettent de répondre à « combien de sprints cela prendra-t-il ? ». Les tailles de T-shirt permettent de répondre à « quelle est à peu près l’ampleur de ce trimestre ? ».',
        'Rapidité : l’estimation en T-shirt est plus rapide par élément et plus facile à mener sur un gros lot. Fibonacci est plus lent, car l’échelle plus fine suscite davantage de discussion.',
        'Prise en main : les T-shirts sont immédiatement intuitifs. Fibonacci demande une story de référence et une courte explication sur le fait que les nombres ne sont pas des heures.',
        'Risque de dérive : les points Fibonacci risquent davantage d’être convertis en heures sans le dire ou transformés en indicateur de productivité. Les T-shirts risquent davantage d’être trop vagues pour planifier un sprint.',
      ],
    },
    {
      title: 'Quand utiliser les story points en Fibonacci',
      content: 'Fibonacci est le meilleur choix quand le résultat de l’estimation alimente des calculs de planification :',
      items: [
        'Planification de sprint : l’équipe doit déterminer combien de stories tiennent dans un sprint, ce qui implique d’additionner des tailles.',
        'Suivi de la vélocité : une équipe stable veut comparer ses sprints et prévoir ses releases à partir de son propre historique.',
        'Prévisions pour les parties prenantes : « cet epic représente environ 60 points et nous faisons en moyenne 25 points par sprint » est une réponse concrète et défendable.',
      ],
    },
    {
      title: 'Quand utiliser les tailles de T-shirt',
      content: 'Les tailles de T-shirt l’emportent quand la rapidité et l’accessibilité comptent plus que le calcul :',
      items: [
        'Tri du backlog : dimensionner des dizaines d’éléments pour décider lesquels méritent d’être affinés davantage.',
        'Roadmap et planification trimestrielle : comparer des epics ou des initiatives qui seront de toute façon découpés plus tard.',
        'Nouvelles équipes : une équipe dans ses premiers sprints n’a ni vélocité à alimenter ni stories de référence ; les T-shirts lui permettent d’estimer sans cérémonial.',
        'Publics mixtes : quand des designers, des product managers ou des parties prenantes métier participent, les tailles sont moins intimidantes et risquent moins d’être prises pour des engagements.',
      ],
    },
    {
      title: 'Peut-on convertir les tailles de T-shirt en story points ?',
      content: 'Oui, et beaucoup d’équipes le font, mais considérez cette correspondance comme une commodité plutôt qu’un fait. Une correspondance courante est XS = 1, S = 2, M = 3 ou 5, L = 8, XL = 13, XXL = 20 ou plus. Elle doit être décidée par l’équipe, écrite et maintenue stable, car la modifier sans le dire corrompt l’historique de vélocité.',
      paragraphs: [
        'L’approche la plus propre consiste à ne pas convertir du tout : gardez les tailles de T-shirt pour les epics et les éléments lointains, et réestimez chaque story en points Fibonacci quand elle approche d’un sprint. La taille de T-shirt servait à un tri grossier ; l’estimation en story points se fait avec de meilleures informations et une vraie story de référence.',
        'Quoi que vous fassiez, ne convertissez jamais des points ou des tailles [en heures par story](/blog/story-points-vs-hours). Les deux échelles décrivent une taille relative. Le temps se déduit de la vélocité, mesurée sur des sprints entiers, et non d’une formule appliquée à chaque story.',
      ],
    },
    {
      title: 'Un exemple concret : les trois mêmes stories sur les deux échelles',
      content: 'Imaginez une équipe qui affine trois stories. Sa référence Fibonacci est « le parcours de réinitialisation du mot de passe valait 3 » ; ses points d’ancrage en T-shirt sont « réinitialisation = S » et « tableau de bord d’administration = L ».',
      paragraphs: [
        '« Afficher un message de confirmation après l’enregistrement du profil. » Fibonacci : tout le monde joue 1 ou 2, la story est notée 2. T-shirt : tout le monde joue XS. Les deux échelles concordent et aucune discussion n’a été nécessaire.',
        '« Exporter l’historique des commandes en CSV, avec pagination pour les gros comptes. » Fibonacci : les cartes donnent 5, 5, 8, 8, 13 ; après que la personne qui a voté 13 a expliqué que deux services sont concernés, l’équipe retient 8. T-shirt : la même story obtient M, M, L, L, L ; l’équipe retient L. La discussion en Fibonacci a abouti à un résultat plus précis ; celle en T-shirt a seulement établi « plus gros que M ».',
        '« Intégrer le nouveau prestataire de paiement. » Fibonacci : la moitié de l’équipe joue « ? » et les autres jouent 40 ou 100 ; la story part donc en spike. T-shirt : tout le monde joue XL et l’équipe l’enregistre sans s’inquiéter. Ici, l’échelle plus grossière a masqué un problème : il était facile de s’accorder sur XL parce que cela n’engage à rien, alors que Fibonacci a obligé l’équipe à admettre qu’elle ne savait pas.',
      ],
    },
    {
      title: 'Erreurs courantes avec chaque échelle',
      content: 'Les deux échelles échouent de façon prévisible quand on les utilise sans référence ou dans un mauvais but :',
      items: [
        'Fibonacci : associer les points à des heures (« un 5, c’est environ une journée »). Dès lors, l’échelle n’est plus qu’une estimation en heures avec des étapes en plus, et tous les travers de l’estimation en heures reviennent.',
        'Fibonacci : utiliser les points pour mesurer la productivité individuelle. Les estimations gonflent en un sprint ou deux et la vélocité ne veut plus rien dire.',
        'T-shirt : utiliser trop de tailles. Couper les cheveux en quatre entre XXS, XS et S sur chaque élément recrée la granularité des nombres sans permettre de calcul. Cinq ou six catégories suffisent généralement, même si votre jeu de cartes en propose davantage.',
        'T-shirt : planifier un sprint avec des tailles uniquement. « Trois L et quatre M » ne vous dit pas si le sprint est plein. Convertissez ou réestimez avant de vous engager.',
      ],
    },
    {
      title: 'Autres échelles : puissances de 2 et jeux personnalisés',
      content: 'Fibonacci et les T-shirts sont les échelles les plus courantes, mais pas les seules. Les puissances de 2 (1, 2, 4, 8, 16, 32) imposent un doublement encore plus strict d’une carte à l’autre et conviennent aux équipes qui veulent que chaque palier soit sans ambiguïté. Certaines équipes définissent un jeu personnalisé ne contenant que les valeurs qu’elles utilisent réellement, par exemple 1, 2, 3, 5, 8, 13 et « ? ».',
      paragraphs: [
        'Scrum Poker Online prend en charge les jeux Scrum, Fibonacci, T-shirt, puissances de 2 et personnalisés, et l’hôte de la salle peut changer de jeu de cartes entre deux tours : passer d’une session de roadmap à une planification de sprint revient à modifier un réglage, pas à changer d’outil. L’outil est gratuit, ne demande aucune inscription et accueille jusqu’à 50 participants.',
      ],
    },
    {
      title: 'Notre recommandation',
      content: 'Commencez par Fibonacci si votre équipe planifie en sprints, suit sa vélocité ou enregistre déjà des story points dans ses outils. Commencez par les tailles de T-shirt si l’équipe découvre l’estimation, si le backlog est volumineux et encore brut, ou si des parties prenantes non techniques participent à la session. Utilisez les deux si votre roadmap est longue : les T-shirts pour trier le futur lointain, Fibonacci pour les prochains sprints. Quel que soit votre choix, [créez une salle de Planning Poker gratuite](/) pour l’essayer, gardez un élément de référence visible, révélez simultanément et ne traduisez jamais le résultat en heures par story.',
    },
  ],
  faq: [
    {
      q: 'Pourquoi l’estimation agile utilise-t-elle la suite de Fibonacci ?',
      a: 'Parce que les écarts entre valeurs successives augmentent avec les valeurs elles-mêmes, ce qui correspond à la façon dont nous percevons les différences de taille. Une équipe sait distinguer un 2 d’un 3, mais pas un 20 d’un 21 ; le jeu de cartes saute donc les valeurs que personne ne sait différencier.',
    },
    {
      q: 'Les tailles de T-shirt sont-elles la même chose que les story points ?',
      a: 'Non. Ce sont deux échelles d’estimation relative, mais les story points sont des nombres que l’on peut additionner et transformer en vélocité, alors que les tailles de T-shirt sont des catégories qui ne s’additionnent pas sans correspondance convenue.',
    },
    {
      q: 'Comment convertir des tailles de T-shirt en story points ?',
      a: 'Convenez d’une correspondance en équipe, par exemple XS = 1, S = 2, M = 3 ou 5, L = 8, XL = 13, écrivez-la et gardez-la stable. Mieux encore : réestimez les stories en points quand elles approchent d’un sprint, plutôt que de convertir mécaniquement.',
    },
    {
      q: '1 story point équivaut-il à 1 heure ?',
      a: 'Non. Les story points décrivent une taille relative, pas une durée. Les prévisions de temps se déduisent de la vélocité, mesurée sur des sprints entiers, et non d’une conversion story par story.',
    },
    {
      q: 'Quelle échelle choisir pour une nouvelle équipe agile ?',
      a: 'Les tailles de T-shirt sont généralement le point de départ le plus simple, car elles ne demandent ni story de référence ni historique de vélocité. Une fois que l’équipe dispose de quelques stories terminées sur lesquelles s’appuyer, elle peut passer à Fibonacci pour la planification de sprint.',
    },
  ],
};

export default fr;
