/** Strings may hold [text](/path) links (introP1/P2, the scale descriptions, specialNote). */
export type GuideContent = {
  title: string;
  /** The technique's name, bolded at the start of the intro */
  term: string;
  subtitle: string;
  introP1: string;
  introP2: string;
  howTitle: string;
  howSteps: { title: string; desc: string }[];
  whyTitle: string;
  whyItems: { title: string; desc: string }[];
  scalesTitle: string;
  /** The Scrum deck (modified Fibonacci), the default in a new room */
  scrumTitle: string;
  scrumCards: string;
  scrumDesc: string;
  fibTitle: string;
  fibCards: string;
  fibDesc: string;
  tshirtTitle: string;
  tshirtCards: string;
  tshirtDesc: string;
  powersTitle: string;
  powersCards: string;
  powersDesc: string;
  specialTitle: string;
  specialItems: string[];
  /** After the special cards: points to the cards page, as a [link](/planning-poker-cards). */
  specialNote: string;
  bestTitle: string;
  bestItems: string[];
  remoteTitle: string;
  remoteIntro: string;
  remoteFeatures: string[];
  faqTitle: string;
  faqItems: { q: string; a: string }[];
  ctaText: string;
  ctaBtn: string;
};
