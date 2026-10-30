import type { DemoContent } from './types';

const fr: DemoContent = {
  title: 'Comment lire le résultat',
  paragraphs: [
    'Dans ce tour, quatre personnes ont estimé la même story : Aleyna et Carol ont joué 5, Bob a joué 8 et Damla 3. La moyenne est de 5,3, mais ce n’est qu’un indice : les estimations du planning poker sont des cartes sur une échelle, l’équipe retient donc une valeur du jeu, pas 5,3.',
    'L’écart compte davantage. Les votes vont de 3 à 8, à deux crans d’écart sur [l’échelle de Fibonacci](/fibonacci-planning-poker), et la répartition montre la majorité de l’équipe sur 5. On est proche d’un accord, avec deux valeurs extrêmes qui méritent d’être entendues : Bob a peut-être repéré du travail en plus, comme une migration de données ou des tests manquants, et Damla connaît peut-être un raccourci, comme un composant existant que la story peut réutiliser.',
    'Et ensuite : Bob et Damla expliquent leur raisonnement en une ou deux minutes, l’équipe clarifie la story et tout le monde revote. La plupart des stories convergent au deuxième tour ; si les votes restent partagés, la story doit généralement être découpée. Quand l’équipe est d’accord, elle enregistre l’estimation finale (ici très probablement 5) et lance un nouveau tour pour la story suivante. Des conseils pour cette discussion : [trouver un consensus d’estimation](/blog/estimation-consensus).',
    'Envie d’essayer avec votre propre backlog ? [Créez une salle gratuite](/), partagez le lien avec votre équipe et lancez votre premier tour en moins d’une minute : sans inscription, sans installation.',
  ],
};

export default fr;
