import type { SiteMeta } from './types';

// Addresses the reader with "vous", like the interface (lib/locales/fr.ts).
const fr: SiteMeta = {
  pages: {
    home: {
      title: 'Scrum Poker Online — Planning poker en ligne gratuit',
      description: 'Planning poker en ligne gratuit pour les équipes agiles : jeux Scrum, Fibonacci, T-shirt ou personnalisés, révélation en temps réel, sans inscription.',
    },
    guide: {
      title: 'Animer une session de Scrum Poker',
      description: 'Étape par étape : créez une salle gratuite, partagez le lien, votez en privé, révélez ensemble et convenez d’une estimation. Jeux, cartes spéciales et conseils.',
    },
    blog: {
      title: 'Blog et guides',
      description: 'Estimation agile, planning poker, bonnes pratiques de planification de sprint : nos articles pour bien utiliser le Scrum Poker en équipe.',
    },
    pricing: {
      title: 'Planning poker gratuit et complet',
      description: 'Scrum Poker Online est entièrement gratuit : jusqu’à 50 personnes par salle, jeux personnalisés, minuteur, historique des tours et export CSV. Sans inscription.',
    },
    demo: {
      title: 'Démo : un tour de planning poker révélé',
      description: 'Aperçu d’un tour de planning poker une fois les votes révélés : les votes, leur répartition et les statistiques automatiques, avant même de créer une salle.',
    },
    privacy: {
      title: 'Politique de confidentialité',
      description: 'Comment Scrum Poker Online traite vos données : pas de compte, pas de revente, pas de données de paiement. Les données des salles s’effacent automatiquement.',
    },
    terms: {
      title: 'Conditions d’utilisation',
      description: 'Conditions d’utilisation de Scrum Poker Online, un outil de planning poker entièrement gratuit pour les équipes agiles.',
    },
    fibonacci: {
      title: 'Le planning poker Fibonacci expliqué',
      description: 'La suite de Fibonacci au planning poker : 0, 1, 2, 3, 5, 8, 13, 21 et au-delà, pourquoi les écarts grandissent, le déroulé d’un tour, quand découper une story.',
    },
    tshirt: {
      title: 'Estimation agile en tailles de T-shirt',
      description: 'Les tailles de T-shirt expliquées : l’échelle de XS à XXL, quand elles valent mieux que les story points, la conversion en points et l’animation d’une session.',
    },
    cards: {
      title: 'Les cartes du planning poker',
      description: 'Ce que portent les cartes de planning poker : jeux Scrum, Fibonacci, T-shirt, puissances de 2 et personnalisés, cartes ? et café, papier ou en ligne.',
    },
  },
  articles: {
    'agile-velocity': { title: 'Vélocité agile et capacité du sprint' },
    'estimation-consensus': { title: 'Trouver un consensus d’estimation' },
    'fibonacci-vs-tshirt': { title: 'Fibonacci ou tailles de T-shirt ?' },
    'free-scrum-poker-tools': { title: 'Outils de Scrum Poker gratuits' },
    'remote-sprint-planning': { title: 'Planifier un sprint à distance' },
    'scrum-poker-best-practices': { title: '10 bonnes pratiques de Scrum Poker' },
    'sprint-planning-checklist': { title: 'Checklist de planification de sprint' },
    'story-points-vs-hours': { title: 'Story points ou heures ?' },
    'what-is-planning-poker': { title: 'Qu’est-ce que le planning poker ?' },
  },
  notFound: 'Page introuvable',
  imageAlt: {
    site: 'Scrum Poker Online — planning poker gratuit pour les équipes agiles',
    blog: 'Scrum Poker Online — Blog et guides',
  },
};

export default fr;
