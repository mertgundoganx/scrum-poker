import type { SiteMeta } from './types';

// Addresses the reader with "tu", like the interface (lib/locales/it.ts).
const it: SiteMeta = {
  pages: {
    home: {
      title: 'Scrum Poker Online — Planning poker online gratuito',
      description: 'Planning poker online gratuito per team agili: mazzi Scrum, Fibonacci, taglie T-shirt o personalizzati, rivelazione in tempo reale, senza registrazione.',
    },
    guide: {
      title: 'Condurre una sessione di Scrum Poker',
      description: 'Passo dopo passo: crea una stanza gratuita, condividi il link, vota in privato, rivela insieme e concorda la stima. Con mazzi, carte speciali e consigli.',
    },
    blog: {
      title: 'Blog e guide',
      description: 'Articoli su stima agile, planning poker e best practice per la pianificazione degli sprint, più consigli per usare al meglio Scrum Poker con il tuo team.',
    },
    pricing: {
      title: 'Planning poker gratis e completo',
      description: 'Scrum Poker Online è completamente gratuito: fino a 50 persone per stanza, mazzi personalizzati, timer, cronologia ed esportazione CSV. Senza registrazione.',
    },
    demo: {
      title: 'Demo di planning poker: round rivelato',
      description: 'Anteprima di un round di planning poker dopo la rivelazione: i voti, la loro distribuzione e le statistiche automatiche, prima ancora di creare una stanza.',
    },
    privacy: {
      title: 'Informativa sulla privacy',
      description: 'Come Scrum Poker Online tratta i tuoi dati: nessun account, nessuna vendita di dati, nessun dato di pagamento. I dati delle stanze si cancellano da soli.',
    },
    terms: {
      title: 'Termini di servizio',
      description: 'Termini di servizio di Scrum Poker Online, uno strumento di planning poker completamente gratuito per team agili.',
    },
    fibonacci: {
      title: 'Il planning poker con Fibonacci',
      description: 'La sequenza di Fibonacci nel planning poker (0, 1, 2, 3, 5, 8, 13, 21…): perché gli intervalli crescono, come si svolge un round e quando dividere le storie.',
    },
    tshirt: {
      title: 'Stima agile con le taglie T-shirt',
      description: 'Le taglie T-shirt spiegate: la scala da XS a XXL, quando la stima relativa batte gli story point, come convertire le taglie in punti e condurre una sessione.',
    },
    cards: {
      title: 'Carte planning poker: valori e mazzi',
      description: 'Cosa c’è sulle carte del planning poker: mazzi Scrum, Fibonacci, T-shirt, potenze di 2 e personalizzati, le carte ? e caffè, stampabili oppure online.',
    },
  },
  articles: {
    'agile-velocity': { title: 'Velocity agile e capacità dello sprint' },
    'estimation-consensus': { title: 'Consenso sulle stime nel planning poker' },
    'fibonacci-vs-tshirt': { title: 'Fibonacci o taglie T-shirt?' },
    'free-scrum-poker-tools': { title: 'Strumenti gratuiti di scrum poker' },
    'remote-sprint-planning': { title: 'Pianificare lo sprint da remoto' },
    'scrum-poker-best-practices': { title: '10 best practice di scrum poker' },
    'sprint-planning-checklist': { title: 'Checklist per pianificare lo sprint' },
    'story-points-vs-hours': { title: 'Story point o ore?' },
    'what-is-planning-poker': { title: 'Cos’è il planning poker? Guida completa' },
  },
  notFound: 'Pagina non trovata',
  imageAlt: {
    site: 'Scrum Poker Online — planning poker gratuito per team agili',
    blog: 'Scrum Poker Online — Blog e guide',
  },
};

export default it;
