import type { LandingContent } from '@/app/landingTypes';

const fr: LandingContent = {
  breadcrumb: 'Cartes de planning poker',
  title: 'Cartes de planning poker : valeurs, jeux, papier ou en ligne',
  subtitle: 'Ce qui figure sur les cartes, les jeux standard utilisés par les équipes, la signification des cartes spéciales et la comparaison entre cartes physiques et jeu en ligne.',
  sections: [
    {
      blocks: [
        { p: 'Les **cartes de planning poker** sont à elles seules tout l’outil : un petit jeu de valeurs que chaque participant tient en main, dans lequel il choisit en privé et qu’il révèle au même moment que les autres. Les valeurs sont choisies pour que l’équipe puisse exprimer un effort relatif sans prétendre à une précision qu’elle n’a pas. Cette page passe en revue ce qui figure sur les cartes, les jeux standard, la signification des cartes spéciales, les différences entre cartes physiques et cartes en ligne, et la manière de choisir un jeu pour votre équipe.' },
      ],
    },
    {
      title: 'Ce qui figure sur une carte de planning poker',
      blocks: [
        { p: 'Chaque carte porte une seule valeur. Dans un jeu numérique, c’est un nombre de story points ; dans un jeu de tailles de T-shirt, une étiquette de taille. Avec des cartes physiques, chaque participant reçoit un jeu complet pour pouvoir voter de façon indépendante : une équipe de huit personnes a donc besoin de huit jeux. Dans une salle en ligne, le jeu s’affiche à l’écran et chaque participant touche une carte ; la salle se charge de cacher et de révéler les votes.' },
        { p: 'Ce qu’une carte ne porte pas, c’est une unité. Un 5 ne correspond ni à cinq heures ni à cinq jours : il vaut cinq fois un 1, le 1 étant la plus petite story de référence retenue par l’équipe. C’est tout le principe de l’estimation relative, et c’est pourquoi le même jeu convient à des équipes aux vélocités très différentes. Si cette distinction est nouvelle pour vous, [Qu’est-ce que le planning poker ?](/blog/what-is-planning-poker) et [story points ou heures](/blog/story-points-vs-hours) l’expliquent en détail.' },
      ],
    },
    {
      title: 'Les jeux de planning poker standard',
      blocks: [
        { p: 'Une poignée de jeux couvre les besoins de presque toutes les équipes. Scrum Poker Online propose les jeux Scrum, Fibonacci, T-shirt et Puissances de 2, et vous permet de créer le vôtre.' },
        {
          decks: [
            {
              title: 'Scrum (Fibonacci modifié)',
              cards: '0, ½, 1, 2, 3, 5, 8, 13, 20, 40, 100, ?, ☕',
              desc: 'Fibonacci jusqu’à 13, puis des valeurs arrondies qui soulignent que les grandes estimations sont des ordres de grandeur et non des mesures, plus une carte demi-point pour le travail trivial. Ce sont les valeurs de la plupart des jeux imprimés.',
            },
            {
              title: 'Fibonacci',
              cards: '0, 1, 2, 3, 5, 8, 13, 21, 34, 55, ?, ☕',
              desc: 'La suite classique. Les écarts augmentent avec les nombres : les grosses stories sont estimées de façon grossière et les petites de façon fine. Lisez le [guide complet du planning poker Fibonacci](/fibonacci-planning-poker).',
            },
            {
              title: 'Tailles de T-shirt',
              cards: 'Z, T, XXS, XS, S, M, L, XL, XXL, XXXL, ?, ☕',
              desc: 'Des étiquettes relatives à la place des nombres. Le jeu classique va de XS à XXL ; le nôtre ajoute Z (zéro), T (tiny, minuscule), XXS et XXXL aux extrémités. Idéal pour les roadmaps, les epics et les équipes non techniques. Consultez le [guide de l’estimation en tailles de T-shirt](/t-shirt-sizing).',
            },
            {
              title: 'Puissances de 2',
              cards: '0, 1, 2, 4, 8, 16, 32, 64, 128, ?, ☕',
              desc: 'Chaque carte double la précédente. Les écarts sont plus grands qu’avec Fibonacci, ce qui pousse les équipes à découper les stories plus tôt et convient au travail très incertain.',
            },
            {
              title: 'Personnalisé',
              cards: 'de 2 à 20 cartes, 4 caractères maximum chacune',
              desc: 'Utilisez-le pour une échelle de 1 à 5, un jeu de trois cartes petit / moyen / grand, un jeu en heures si votre organisation y tient, ou tout autre besoin de votre processus.',
            },
          ],
        },
      ],
    },
    {
      title: 'Ce que signifient les cartes spéciales',
      blocks: [
        { p: 'Chaque jeu intégré de Scrum Poker Online comprend deux cartes non numériques (un jeu personnalisé ne contient que les cartes que vous ajoutez), et de nombreux jeux physiques en ajoutent une troisième.' },
        {
          ul: [
            '**?** signifie « je ne peux pas estimer cela ». Il manque des informations, ou la story n’est pas claire. Si plusieurs personnes la jouent, arrêtez de voter et clarifiez le périmètre. C’est la carte la plus précieuse du jeu : elle transforme une confusion silencieuse en signal visible.',
            '**☕** signifie « j’ai besoin d’une pause ». La qualité des estimations chute nettement quand les participants sont fatigués. La carte café est une manière polie de dire que la session a assez duré.',
            '**∞ ou « trop gros »** figure sur de nombreux jeux imprimés et indique que la story dépasse le haut de l’échelle et doit être découpée. En ligne, on transmet le même message en jouant la carte la plus haute, ou en jouant ? et en expliquant pourquoi.',
          ],
        },
        { p: 'Certains jeux, comme le jeu Scrum, comportent aussi un 0 et un ½. Zéro signifie « aucun travail » ou « déjà fait » ; la carte ½ sert aux tâches si petites que même un 1 les surestime. Les utiliser ou non relève d’une convention d’équipe.' },
      ],
    },
    {
      title: 'Cartes physiques ou cartes en ligne',
      blocks: [
        { p: 'Les jeux imprimés sont les originaux et fonctionnent toujours bien pour les équipes réunies dans une même pièce. La comparaison porte surtout sur la logistique.' },
        {
          compare: [
            {
              title: 'Cartes physiques',
              items: [
                'Chacun a besoin d’un jeu, et les jeux se perdent. Une équipe de dix personnes a besoin de dix jeux complets sur la table.',
                'La discipline de la révélation est manuelle. Quelqu’un fait le compte à rebours, et il arrive que certains jettent un œil en avance.',
                'Rien n’est enregistré. Les résultats sont notés au tableau blanc ou saisis après coup dans un outil de suivi.',
                'Pas de participants à distance. Dans une équipe hybride, une personne finit par voter par message dans le chat.',
              ],
            },
            {
              title: 'Cartes en ligne',
              items: [
                'Cachées jusqu’à la révélation. Les votes sont invisibles pour tout le monde, animateur compris, jusqu’à la révélation du tour.',
                'Adaptées aux équipes à distance et hybrides. Partagez un lien ou scannez un QR code, et toute l’équipe se retrouve dans la même salle.',
                'Analyse automatique : répartition des votes, minimum, médiane, moyenne et maximum, détection du consensus et estimation suggérée dès que les cartes se retournent.',
                'Historique. Chaque tour terminé est conservé avec son estimation finale, et l’historique peut être téléchargé en CSV ou copié en Markdown pour votre outil de backlog.',
                'Des extras impossibles sur papier : une file de stories qui importe un fichier CSV ou un export Jira, un minuteur partagé, le mode spectateur, le chat d’équipe et une relance pour ceux qui n’ont pas encore voté.',
              ],
            },
          ],
        },
        { p: 'Si vous voulez des cartes à imprimer, les valeurs ci-dessus suffisent : imprimez chaque valeur sur un morceau de papier au format carte, un jeu par personne. Au-delà d’une session en présentiel occasionnelle, un jeu en ligne supprime les tâches fastidieuses et recentre l’attention sur la discussion, là où réside toute la valeur de la technique. Notre [guide du Scrum Poker](/guide) décrit une session en ligne complète.' },
      ],
    },
    {
      title: 'Comment choisir un jeu',
      blocks: [
        { p: 'Posez-vous trois questions :' },
        {
          ol: [
            '**Qu’estimez-vous ?** Des stories de sprint : Scrum ou Fibonacci. Des epics, des éléments de roadmap ou tout ce qui est prévu à plus d’un sprint d’ici : les tailles de T-shirt. Du travail très incertain, pour lequel vous voulez découper tôt : Puissances de 2.',
            '**Qui vote ?** Les développeurs habitués aux story points s’accommodent très bien des nombres. Les groupes mixtes ou non techniques préfèrent généralement les tailles.',
            '**Qu’attend votre outil de suivi ?** Si la vélocité est suivie en points, utilisez un jeu numérique ou convenez d’une correspondance entre tailles et points avant la session.',
          ],
        },
        { p: 'Quel que soit votre choix, changez-en rarement. La valeur d’une échelle d’estimation vient de l’habitude que l’équipe a acquise avec elle, et chaque changement la remet à zéro. Lorsque vous créez une salle dans Scrum Poker Online, vous choisissez son jeu de cartes ; l’hôte peut le changer entre deux tours, le même jeu apparaît toujours sur l’écran de chaque participant, et un hôte qui conserve la salle grâce à son lien de propriétaire privé retrouve le même jeu et les mêmes paramètres la fois suivante. Si votre équipe est régulièrement en désaccord après la révélation, le problème vient rarement du jeu ; consultez [comment trouver un consensus d’estimation](/blog/estimation-consensus) pour découvrir ce qui aide le plus souvent.' },
      ],
    },
  ],
  faqTitle: 'Questions fréquentes',
  faq: [
    {
      q: 'Combien de cartes compte un jeu de planning poker ?',
      a: 'Généralement onze à treize. Un jeu Fibonacci en compte douze : dix valeurs numériques plus ? et ☕. Le jeu Scrum en compte treize, le jeu T-shirt douze et le jeu Puissances de 2 onze. Les jeux personnalisés de Scrum Poker Online peuvent contenir jusqu’à 20 cartes.',
    },
    {
      q: 'Puis-je imprimer mes propres cartes de planning poker ?',
      a: 'Oui. N’importe lequel des jeux de valeurs de cette page convient ; imprimez un jeu complet par participant sur du papier au format carte. Pour les équipes à distance ou hybrides, une salle en ligne se met en place plus vite et conserve l’historique des tours pour vous.',
    },
    {
      q: 'Que signifie la carte café ?',
      a: 'Elle signifie « j’ai besoin d’une pause ». C’est une manière discrète de signaler la fatigue sans interrompre la personne qui parle, et plusieurs cartes café d’affilée indiquent qu’il est temps de faire une pause dans la session.',
    },
    {
      q: 'Avec quel jeu une nouvelle équipe scrum devrait-elle commencer ?',
      a: 'Scrum ou Fibonacci. Tous deux sont largement documentés, correspondent directement aux story points, et la plupart des tutoriels supposent l’un ou l’autre. Ne passez aux tailles de T-shirt que si les nombres suscitent plus de débats qu’ils n’en règlent.',
    },
  ],
  ctaText: 'Inutile d’imprimer. Choisissez un jeu, partagez un lien, et votre équipe estime en quelques secondes. Gratuit, sans inscription.',
  ctaLabel: 'Créer une salle gratuite',
  relatedTitle: 'Pour aller plus loin',
  related: [
    { href: '/fibonacci-planning-poker', label: 'Planning poker Fibonacci' },
    { href: '/t-shirt-sizing', label: 'L’estimation agile en tailles de T-shirt' },
    { href: '/guide', label: 'Animer une session de Scrum Poker, étape par étape' },
    { href: '/blog/fibonacci-vs-tshirt', label: 'Fibonacci ou tailles de T-shirt' },
    { href: '/blog/what-is-planning-poker', label: 'Qu’est-ce que le planning poker ?' },
    { href: '/blog', label: 'Tous les articles du blog' },
  ],
};

export default fr;
