import type { DemoContent } from './types';

const it: DemoContent = {
  title: 'Come leggere il risultato',
  paragraphs: [
    'In questo round quattro persone hanno stimato la stessa storia: Aleyna e Carol hanno giocato 5, Bob 8 e Damla 3. La media è 5,3, ma è solo un indizio: le stime del planning poker sono carte su una scala, quindi il team registra un valore del mazzo, non 5,3.',
    'Conta di più la dispersione. I voti vanno da 3 a 8, a due gradini di distanza sulla [scala di Fibonacci](/fibonacci-planning-poker), e la distribuzione mostra la maggior parte del team sul 5. È quasi un accordo, con due voti estremi che vale la pena ascoltare: Bob forse ha visto lavoro in più, come una migrazione di dati o dei test mancanti, e Damla forse conosce una scorciatoia, come un componente esistente che la storia può riutilizzare.',
    'Cosa succede dopo: Bob e Damla spiegano il proprio ragionamento in un paio di minuti, il team chiarisce la storia e tutti votano di nuovo. La maggior parte delle storie converge al secondo round; se i voti restano divisi, di solito la storia va suddivisa. Quando il team è d’accordo, registra la stima finale (qui con ogni probabilità 5) e avvia un nuovo round per la storia successiva. Trovi consigli per questa discussione in [come raggiungere il consenso sulle stime](/blog/estimation-consensus).',
    'Vuoi provarlo con il tuo backlog? [Crea una stanza gratuita](/), condividi il link con il tuo team e avvia il primo round in meno di un minuto: senza registrazione, senza installare nulla.',
  ],
};

export default it;
