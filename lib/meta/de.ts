import type { SiteMeta } from './types';

// Addresses the reader with "du", like the interface (lib/locales/de.ts).
const de: SiteMeta = {
  pages: {
    home: {
      title: 'Scrum Poker Online: Planning Poker gratis für agile Teams',
      description: 'Kostenloses Online-Planning-Poker für agile Teams: Scrum-, Fibonacci-, T-Shirt- und eigene Decks, Aufdecken in Echtzeit, ohne Registrierung. Sofort loslegen.',
    },
    guide: {
      title: 'So leitest du eine Scrum-Poker-Session',
      description: 'Schritt für Schritt: Raum kostenlos erstellen, Link teilen, verdeckt abstimmen, gemeinsam aufdecken und einigen. Dazu Decks, Sonderkarten und Moderationstipps.',
    },
    blog: {
      title: 'Blog & Leitfäden',
      description: 'Artikel über agile Schätzung, Planning Poker und Best Practices für die Sprint-Planung – und wie dein Team Scrum Poker wirksam einsetzt.',
    },
    pricing: {
      title: 'Planning Poker komplett kostenlos',
      description: 'Scrum Poker Online ist komplett kostenlos: bis zu 50 Personen pro Raum, eigene Decks, Timer, Rundenverlauf und CSV-Export. Ohne Anmeldung, ohne Kreditkarte.',
    },
    demo: {
      title: 'Demo: aufgedeckte Planning-Poker-Runde',
      description: 'So sieht eine aufgedeckte Planning-Poker-Runde aus: die Stimmen, ihre Verteilung und automatische Statistiken – noch bevor du einen Raum erstellst.',
    },
    privacy: {
      title: 'Datenschutzerklärung',
      description: 'Wie Scrum Poker Online mit deinen Daten umgeht: keine Konten, kein Datenverkauf, keine Zahlungsdaten. Raumdaten werden automatisch gelöscht.',
    },
    terms: {
      title: 'Nutzungsbedingungen',
      description: 'Nutzungsbedingungen von Scrum Poker Online – einem komplett kostenlosen Planning-Poker-Tool für agile Teams.',
    },
    fibonacci: {
      title: 'Fibonacci-Planning-Poker erklärt',
      description: 'Die Fibonacci-Folge im Planning Poker: 0, 1, 2, 3, 5, 8, 13, 21 und mehr, warum die Abstände wachsen, wie eine Runde abläuft und wann man Stories teilt.',
    },
    tshirt: {
      title: 'T-Shirt-Größen in der agilen Schätzung',
      description: 'T-Shirt-Größen erklärt: die Skala von XS bis XXL, wann relative Größen besser sind als Story Points, wie man in Punkte umrechnet und eine Runde leitet.',
    },
    cards: {
      title: 'Planning-Poker-Karten: Werte und Decks',
      description: 'Was auf Planning-Poker-Karten steht: Scrum-, Fibonacci-, T-Shirt-, Zweierpotenz- und eigene Decks, die ?- und die Kaffeekarte, gedruckt oder online.',
    },
  },
  articles: {
    'agile-velocity': { title: 'Agile Velocity und Sprint-Kapazität' },
    'estimation-consensus': { title: 'Schätzkonsens im Planning Poker' },
    'fibonacci-vs-tshirt': { title: 'Fibonacci oder T-Shirt-Größen?' },
    'free-scrum-poker-tools': { title: 'Kostenlose Scrum-Poker-Tools im Check' },
    'remote-sprint-planning': { title: 'Sprint-Planung remote durchführen' },
    'scrum-poker-best-practices': { title: '10 Best Practices für Scrum Poker' },
    'sprint-planning-checklist': { title: 'Checkliste Sprint-Planung: 12 Schritte' },
    'story-points-vs-hours': { title: 'Story Points oder Stunden?' },
    'what-is-planning-poker': { title: 'Was ist Planning Poker? Der Leitfaden' },
  },
  notFound: 'Seite nicht gefunden',
  imageAlt: {
    site: 'Scrum Poker Online – kostenloses Planning Poker für agile Teams',
    blog: 'Scrum Poker Online – Blog & Leitfäden',
  },
};

export default de;
