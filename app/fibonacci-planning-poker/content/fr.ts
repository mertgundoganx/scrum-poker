import type { LandingContent } from '@/app/landingTypes';

const fr: LandingContent = {
  breadcrumb: 'Planning poker Fibonacci',
  title: 'Planning poker Fibonacci : cartes, suite et mode d’emploi',
  subtitle: 'Le jeu de planning poker le plus répandu, expliqué : ce que signifient les nombres, pourquoi les écarts se creusent et comment animer un tour avec votre équipe.',
  sections: [
    {
      blocks: [
        { p: 'Le **planning poker Fibonacci** est la méthode la plus courante pour estimer les user stories dans les équipes agiles. Au lieu de deviner un nombre d’heures, chacun choisit une carte dans une suite courte et fixe (0, 1, 2, 3, 5, 8, 13, 21, etc.), puis tout le monde la révèle en même temps. Le résultat est une estimation relative en story points, validée par toute l’équipe. Ce guide présente la suite, explique pourquoi elle fonctionne, comment animer un tour et que faire lorsqu’une story tombe sur les grosses cartes. Vous découvrez la technique ? Commencez par [Qu’est-ce que le planning poker ?](/blog/what-is-planning-poker), puis revenez ici.' },
      ],
    },
    {
      title: 'La suite de Fibonacci au planning poker',
      blocks: [
        { p: 'La suite de Fibonacci mathématique commence par 0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55 : chaque nombre est la somme des deux précédents. Les jeux de planning poker en reprennent la forme, pas l’arithmétique : le 1 en double disparaît et, au-delà de 13, les jeux divergent :' },
        {
          ul: [
            '**Fibonacci classique :** `0, 1, 2, 3, 5, 8, 13, 21, 34, 55`. C’est le jeu Fibonacci de Scrum Poker Online, complété par les cartes ? et ☕.',
            '**Fibonacci modifié :** `0, ½, 1, 2, 3, 5, 8, 13, 20, 40, 100`. Les grands nombres sont arrondis pour signaler qu’il s’agit d’ordres de grandeur, et non de valeurs précises. C’est le jeu Scrum de Scrum Poker Online, là encore avec ? et ☕.',
            '**Variantes courtes :** certaines équipes s’arrêtent à 13 ou 21 et considèrent que tout ce qui dépasse est trop gros pour être estimé.',
          ],
        },
        { p: 'La variante choisie compte bien moins que la constance avec laquelle vous l’utilisez. Une équipe qui estime depuis un an avec 21, 34 et 55 partage une idée précise de ce que représentent ces nombres ; passer à 20, 40 et 100 remettrait cet étalonnage à zéro. Si vous avez besoin d’un autre jeu de valeurs, un jeu de cartes personnalisé (jusqu’à 20 cartes de 4 caractères au maximum) vous permet de définir les vôtres. Les autres jeux standard sont comparés sur la page [cartes de planning poker](/planning-poker-cards).' },
      ],
    },
    {
      title: 'Pourquoi les écarts se creusent : l’incertitude croît avec la taille',
      blocks: [
        { p: 'La caractéristique essentielle de la suite, c’est que l’écart entre deux cartes voisines augmente avec les nombres. Entre 1 et 2, il est d’un point ; entre 13 et 21, de huit ; entre 34 et 55, de vingt et un. C’est voulu, et c’est la principale raison pour laquelle Fibonacci s’est imposé face à une simple échelle de 1 à 10 pour l’estimation.' },
        { p: 'Nous savons assez bien distinguer une toute petite tâche d’une petite tâche, mais beaucoup moins bien une grosse tâche d’une tâche à peine plus grosse. Si votre jeu proposait 20, 21, 22 et 23, l’équipe débattrait de différences que personne ne perçoit réellement, et le chiffre final afficherait une précision qu’il ne mérite pas. En ne proposant que 13 et 21, le jeu pose une question plus grossière, mais plus honnête : est-ce plus proche de 13 ou de 21 ? On peut y répondre. « Est-ce un 17 ou un 18 ? », non. Les stories petites et bien comprises ont droit à des cartes fines ; les grosses stories cachent des inconnues, elles reçoivent donc des cartes plus grossières.' },
      ],
    },
    {
      title: 'Comment animer un tour de planning poker Fibonacci',
      blocks: [
        {
          ol: [
            '**Choisissez une story de référence.** Prenez une story déjà livrée que l’équipe s’accorde à estimer à 2 ou 3. Toutes les autres estimations se font par rapport à elle.',
            '**Présentez la story.** Le Product Owner lit la story et ses critères d’acceptation ; l’équipe pose des questions jusqu’à ce que le périmètre soit clair.',
            '**Votez en privé.** Chaque participant choisit une carte. En ligne, les cartes restent cachées jusqu’à la révélation du tour : personne ne s’ancre sur le premier chiffre annoncé.',
            '**Révélez ensemble.** Toutes les cartes se retournent en même temps. Scrum Poker Online affiche la répartition des votes, le minimum, la médiane, la moyenne et le maximum, indique si le consensus est atteint et propose une estimation suggérée.',
            '**Discutez des valeurs extrêmes.** Si une personne a voté 3 et une autre 13, chacune explique son choix. L’écart révèle presque toujours une hypothèse : une API manquante, une migration oubliée, un environnement de test qui existe déjà.',
            '**Revotez si nécessaire.** La plupart des stories convergent en deux tours. Sinon, retenez la valeur la plus haute ou découpez la story. Une fois l’équipe d’accord, enregistrez l’estimation finale et passez à la story suivante.',
          ],
        },
        { p: 'Limitez chaque story à quelques minutes ; le minuteur partagé de la salle (en mode chronomètre ou compte à rebours) est là pour que la discussion ne s’éternise pas. Pour mettre d’accord une équipe divisée, lisez [comment trouver un consensus d’estimation](/blog/estimation-consensus).' },
      ],
    },
    {
      title: 'Faire correspondre les cartes Fibonacci aux story points',
      blocks: [
        { p: 'Les story points sont l’unité ; les cartes Fibonacci sont les valeurs autorisées. Une carte 5 signifie « environ cinq fois l’effort d’un 1, et un peu moins du double d’un 3 ». Le nombre absolu n’a aucun sens en soi : un 5 dans une équipe peut valoir un 8 dans une autre, c’est pourquoi les points ne se convertissent pas proprement en heures. Si vous êtes tenté de convertir, lisez d’abord [story points ou heures](/blog/story-points-vs-hours).' },
        { p: 'Ce que les cartes indiquent généralement :' },
        {
          ul: [
            '**0** : trivial, déjà fait, ou simple changement de configuration sans risque.',
            '**1 à 2** : petit, bien compris, sans inconnue.',
            '**3 à 5** : une story de sprint typique, au périmètre clair, avec quelques éléments à coordonner.',
            '**8** : gros, mais réalisable dans un sprint par une ou deux personnes.',
            '**13** : la limite haute de ce que la plupart des équipes acceptent pour une seule story de sprint.',
            '**21 et plus** : une epic, ou une story pleine d’inconnues. C’est généralement le signal qu’il faut la découper.',
          ],
        },
      ],
    },
    {
      title: 'Les cartes ? et ☕',
      blocks: [
        { p: 'Chaque jeu intégré de Scrum Poker Online comprend deux cartes non numériques (un jeu personnalisé ne contient que les cartes que vous ajoutez), et elles sont plus utiles qu’il n’y paraît.' },
        { p: 'La carte **?** signifie « je ne peux pas encore estimer cela ». Ce n’est pas une dérobade, c’est une information. Si deux personnes jouent ?, il faut clarifier le périmètre de la story avant que l’équipe revote. Mieux vaut jouer ? que tenter un 8 au hasard.' },
        { p: 'La carte **☕** signifie « j’ai besoin d’une pause ». La qualité des estimations baisse avec la fatigue, et plusieurs cartes café d’affilée sont un signe fiable que la session dure depuis trop longtemps. Faites une pause de cinq minutes, puis reprenez.' },
      ],
    },
    {
      title: 'Quand plafonner à 13 ou 21 et découper la story',
      blocks: [
        { p: 'De nombreuses équipes se fixent une règle : toute story estimée à 13 ou plus doit être découpée avant d’entrer dans un sprint. Plus l’estimation est grande, plus la marge d’incertitude est large, et un 21 qui se révèle être un 34 peut faire échouer un sprint. Le découpage transforme un chiffre flou en plusieurs chiffres plus nets.' },
        { p: 'Quelques façons concrètes de découper :' },
        {
          ul: [
            '**Par étape du parcours :** « envoyer le formulaire » séparément de « relire et valider ».',
            '**Par variation des données :** le cas courant d’abord, les cas limites ensuite.',
            '**Par interface :** l’API d’abord, l’UI ensuite.',
            '**Par critère d’acceptation :** chaque critère devient une story.',
          ],
        },
        { p: 'Plafonner à 13 ou à 21 dépend de la durée du sprint et de la taille de l’équipe ; avec des sprints de deux semaines et une équipe de cinq personnes, on retient généralement 13. Décidez une fois pour toutes, mettez la règle par écrit et appliquez-la avec constance.' },
      ],
    },
    {
      title: 'Exemple de tour',
      blocks: [
        { example: 'Une équipe de cinq personnes estime la story « Permettre aux utilisateurs d’exporter leur historique des tours en CSV ». Les votes révélés sont 3, 5, 5, 8 et 13 : pas de consensus, un écart de 3 à 13, et 8 en estimation suggérée, la carte la plus proche de la moyenne de 6,8. La personne qui a voté 13 explique que la table d’historique n’a pas de pagination et que l’export de milliers de lignes dépassera le délai d’expiration. Celle qui a voté 3 ignorait que l’export doit aussi fonctionner pour les spectateurs. L’équipe convient que l’export de base vaut 5 et ajoute une story distincte pour la pagination. Le second vote donne 5, 5, 5, 5, 8 : assez proche pour retenir 5 et passer à la suite.' },
        { p: 'Toute la technique est là : les nombres comptent moins que la conversation qu’ils déclenchent.' },
      ],
    },
  ],
  faqTitle: 'Questions fréquentes',
  faq: [
    {
      q: 'Pourquoi ne pas utiliser simplement une échelle de 1 à 10 ?',
      a: 'Une échelle linéaire laisse entendre que vous savez distinguer un 7 d’un 8. Au-delà d’une petite tâche, ce n’est pas le cas, et l’équipe perd du temps sur une fausse précision. Les écarts de Fibonacci augmentent avec l’estimation, à l’image de l’incertitude.',
    },
    {
      q: '21 est-il un vrai nombre de Fibonacci, ou faut-il utiliser 20 ?',
      a: 'Les deux sont courants. 21 est la vraie valeur de Fibonacci ; 20, 40 et 100 viennent du jeu modifié (le jeu Scrum de Scrum Poker Online) et sont arrondis pour souligner qu’il s’agit d’ordres de grandeur. Choisissez-en un et tenez-vous-y.',
    },
    {
      q: 'Faut-il faire la moyenne des votes ?',
      a: 'Pas systématiquement. La moyenne de 3 et 13 est 8, mais elle masque le désaccord qui compte. Discutez d’abord des valeurs extrêmes ; si l’équipe reste partagée après un nouveau vote, privilégiez la valeur la plus haute ou découpez la story.',
    },
    {
      q: 'Peut-on utiliser les cartes Fibonacci pour les bugs et la dette technique ?',
      a: 'Oui, à condition de les estimer par rapport à la même story de référence que le reste. Beaucoup d’équipes réservent le 0 aux bugs triviaux et estiment les autres normalement.',
    },
  ],
  ctaText: 'Prêt à estimer avec les cartes Fibonacci ? Gratuit, jusqu’à 50 personnes par salle, sans inscription.',
  ctaLabel: 'Créer une salle gratuite',
  relatedTitle: 'Pour aller plus loin',
  related: [
    { href: '/t-shirt-sizing', label: 'L’estimation agile en tailles de T-shirt' },
    { href: '/planning-poker-cards', label: 'Cartes et jeux de planning poker' },
    { href: '/guide', label: 'Animer une session de Scrum Poker, étape par étape' },
    { href: '/blog/fibonacci-vs-tshirt', label: 'Fibonacci ou tailles de T-shirt' },
    { href: '/blog/story-points-vs-hours', label: 'Story points ou heures' },
    { href: '/blog', label: 'Tous les articles du blog' },
  ],
};

export default fr;
