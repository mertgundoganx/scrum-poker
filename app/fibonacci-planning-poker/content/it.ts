import type { LandingContent } from '@/app/landingTypes';

const it: LandingContent = {
  breadcrumb: 'Planning poker con Fibonacci',
  title: 'Planning poker con Fibonacci: carte, sequenza e come usarla',
  subtitle: 'Il mazzo di planning poker più diffuso, spiegato: cosa significano i numeri, perché gli intervalli crescono e come condurre un round con il tuo team.',
  sections: [
    {
      blocks: [
        { p: 'Il **planning poker con Fibonacci** è il modo più comune con cui i team agili stimano le user story. Invece di ipotizzare le ore, ognuno sceglie una carta da una sequenza breve e fissa (0, 1, 2, 3, 5, 8, 13, 21 e così via) e tutti la rivelano nello stesso momento. Il risultato è una stima relativa in story point su cui l’intero team è d’accordo. Questa guida spiega la sequenza, perché funziona, come condurre un round e cosa fare quando una storia finisce sulle carte più alte. Sei alle prime armi con la tecnica? Parti da [Cos’è il planning poker?](/blog/what-is-planning-poker) e poi torna qui.' },
      ],
    },
    {
      title: 'La sequenza di Fibonacci nel planning poker',
      blocks: [
        { p: 'La sequenza di Fibonacci matematica inizia con 0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, e ogni numero è la somma dei due precedenti. I mazzi di planning poker ne prendono in prestito la forma, non l’aritmetica: l’1 doppio viene eliminato e, oltre il 13, i mazzi si differenziano:' },
        {
          ul: [
            '**Fibonacci classico:** `0, 1, 2, 3, 5, 8, 13, 21, 34, 55`. È il mazzo Fibonacci di Scrum Poker Online, con in più le carte ? e ☕.',
            '**Fibonacci modificato:** `0, ½, 1, 2, 3, 5, 8, 13, 20, 40, 100`. I numeri grandi sono arrotondati per indicare che si tratta di fasce approssimative, non di valori precisi. È il mazzo Scrum di Scrum Poker Online, anche in questo caso con ? e ☕.',
            '**Varianti corte:** alcuni team si fermano a 13 o a 21 e considerano tutto ciò che va oltre troppo grande per essere stimato.',
          ],
        },
        { p: 'Quale variante usi conta molto meno che usarla con costanza. Un team che stima da un anno con 21, 34 e 55 ha un’idea condivisa di cosa significhino quei numeri; passare a 20, 40 e 100 azzererebbe quella calibrazione. Se ti serve un insieme diverso, un mazzo personalizzato fino a 20 carte (ognuna fino a 4 caratteri) ti permette di definire i tuoi valori. Gli altri mazzi standard sono messi a confronto nella pagina sulle [carte del planning poker](/planning-poker-cards).' },
      ],
    },
    {
      title: 'Perché gli intervalli crescono: l’incertezza aumenta con le dimensioni',
      blocks: [
        { p: 'La caratteristica distintiva della sequenza è che la distanza tra carte vicine cresce insieme ai numeri. Tra 1 e 2 l’intervallo è di un punto; tra 13 e 21 è di otto; tra 34 e 55 è di ventuno. È una scelta voluta, ed è il motivo principale per cui Fibonacci ha avuto la meglio su una semplice scala da 1 a 10 per la stima.' },
        { p: 'Le persone sono piuttosto brave a distinguere un’attività minuscola da una piccola, e molto meno a distinguere un’attività grande da una appena più grande. Se il tuo mazzo offrisse 20, 21, 22 e 23, il team discuterebbe di differenze che nessuno è davvero in grado di percepire, e il numero finale avrebbe una precisione che non merita. Offrendo solo 13 e 21, il mazzo pone una domanda più grossolana ma più onesta: è più vicino a 13 o a 21? A questa si può rispondere. A «È un 17 o un 18?» no. Le storie piccole e ben comprese hanno carte a grana fine; quelle grandi nascondono incognite, quindi ricevono carte a grana grossa.' },
      ],
    },
    {
      title: 'Come condurre un round di planning poker con Fibonacci',
      blocks: [
        {
          ol: [
            '**Scegli una storia di riferimento.** Prendi una storia già consegnata che il team considera da 2 o da 3. Ogni altra stima viene fatta in relazione a questa.',
            '**Presenta la storia.** Il product owner legge la storia e i criteri di accettazione; il team fa domande finché il perimetro non è chiaro.',
            '**Vota in privato.** Ogni partecipante sceglie una carta. Online, le carte restano nascoste finché il round non viene rivelato, così nessuno viene ancorato al primo numero pronunciato.',
            '**Rivela insieme al team.** Tutte le carte si girano nello stesso momento. Scrum Poker Online mostra la distribuzione dei voti, minimo, mediana, media e massimo, se è stato raggiunto il consenso e una stima suggerita.',
            '**Discuti i valori estremi.** Se una persona ha votato 3 e un’altra 13, entrambe spiegano il perché. La differenza rivela quasi sempre un’ipotesi: un’API mancante, una migrazione dimenticata, un ambiente di test che esiste già.',
            '**Rivota se serve.** La maggior parte delle storie converge in due round. In caso contrario, prendi il valore più alto o suddividi la storia. Quando il team è d’accordo, registra la stima finale e passa alla storia successiva.',
          ],
        },
        { p: 'Limita ogni storia a pochi minuti; il timer condiviso della stanza (in avanti o con conto alla rovescia) serve proprio a non far dilagare la discussione. Per mettere d’accordo un team diviso, leggi [raggiungere il consenso nella stima](/blog/estimation-consensus).' },
      ],
    },
    {
      title: 'Dalle carte di Fibonacci agli story point',
      blocks: [
        { p: 'Gli story point sono l’unità di misura; le carte di Fibonacci sono i valori ammessi. Una carta da 5 significa «circa cinque volte l’impegno di un 1, e un po’ meno del doppio di un 3». Il numero assoluto, da solo, non significa nulla: un 5 per un team può essere un 8 per un altro, ed è per questo che i punti non si convertono in modo pulito in ore. Se hai la tentazione di convertirli, leggi prima [story point o ore](/blog/story-points-vs-hours).' },
        { p: 'Cosa indicano di solito le carte:' },
        {
          ul: [
            '**0**: banale, già fatto, oppure una modifica di configurazione senza rischi.',
            '**Da 1 a 2**: piccola, ben compresa, senza incognite.',
            '**Da 3 a 5**: una tipica storia da sprint, con un perimetro chiaro e qualche parte in movimento.',
            '**8**: grande, ma realizzabile in uno sprint da una o due persone.',
            '**13**: il limite superiore di ciò che la maggior parte dei team accetta come singola storia di uno sprint.',
            '**21 e oltre**: un’epic, o una storia con grandi incognite. Di solito è il segnale che va suddivisa.',
          ],
        },
      ],
    },
    {
      title: 'Le carte ? e ☕',
      blocks: [
        { p: 'Ogni mazzo predefinito di Scrum Poker Online include due carte non numeriche (un mazzo personalizzato contiene solo le carte che aggiungi tu), e sono più utili di quanto sembri.' },
        { p: 'La carta **?** significa «Non riesco ancora a stimarla». Non è una scappatoia: è un dato. Se due persone giocano ?, la storia ha bisogno di una discussione sul perimetro prima che il team voti di nuovo. Giocare ? è meglio che tirare a indovinare un 8 e sperare.' },
        { p: 'La carta **☕** significa «Ho bisogno di una pausa». La qualità delle stime cala quando le persone si stancano, e alcune carte caffè di fila sono un segnale affidabile che la sessione è durata troppo. Fai cinque minuti di pausa, poi riprendi.' },
      ],
    },
    {
      title: 'Quando fermarsi a 13 o a 21 e suddividere la storia',
      blocks: [
        { p: 'Molti team stabiliscono che qualsiasi cosa stimata da 13 in su debba essere suddivisa prima di entrare in uno sprint. Più la stima è grande, più si allarga la fascia di incertezza, e un 21 che si rivela un 34 può affondare uno sprint. Suddividere trasforma un numero sfocato in diversi numeri più nitidi.' },
        { p: 'Modi pratici per suddividere:' },
        {
          ul: [
            '**Per fase del flusso di lavoro:** «inviare il modulo» separato da «revisionare e approvare».',
            '**Per variazione dei dati:** prima il caso comune, poi i casi limite.',
            '**Per interfaccia:** prima l’API, poi la UI.',
            '**Per criterio di accettazione:** ogni criterio diventa una storia.',
          ],
        },
        { p: 'Fermarsi a 13 o a 21 dipende dalla durata dello sprint e dalle dimensioni del team; con sprint di due settimane e un team di cinque persone, di solito si sceglie 13. Decidi una volta sola, mettilo per iscritto e applicalo con costanza.' },
      ],
    },
    {
      title: 'Esempio di round',
      blocks: [
        { example: 'Un team di cinque persone sta stimando «Consentire agli utenti di esportare la cronologia dei round in CSV». I voti rivelati sono 3, 5, 5, 8 e 13: nessun consenso, una dispersione da 3 a 13 e un 8 suggerito come carta più vicina alla media di 6,8. Chi ha votato 13 spiega che la tabella della cronologia non ha paginazione e che esportare migliaia di righe andrà in timeout. Chi ha votato 3 non sapeva che l’esportazione deve funzionare anche per gli spettatori. Il team concorda che l’esportazione di base vale 5 e aggiunge una storia separata per la paginazione. Il secondo voto è 5, 5, 5, 5, 8: abbastanza vicino per accettare 5 e andare avanti.' },
        { p: 'Questa è tutta la tecnica: i numeri contano meno della discussione che innescano.' },
      ],
    },
  ],
  faqTitle: 'Domande frequenti',
  faq: [
    {
      q: 'Perché non usare semplicemente una scala da 1 a 10?',
      a: 'Una scala lineare presuppone che tu sappia distinguere un 7 da un 8. Per qualsiasi cosa più grande di una piccola attività non è possibile, quindi il team perde tempo dietro a una falsa precisione. Gli intervalli di Fibonacci crescono con la stima, rispecchiando il comportamento dell’incertezza.',
    },
    {
      q: 'Il 21 è un vero numero di Fibonacci, o dovrei usare il 20?',
      a: 'Sono entrambi comuni. Il 21 è il vero valore di Fibonacci; 20, 40 e 100 provengono dal mazzo modificato (il mazzo Scrum di Scrum Poker Online) e sono arrotondati per sottolineare che si tratta di fasce approssimative. Scegline uno e resta coerente.',
    },
    {
      q: 'Devo fare la media dei voti?',
      a: 'Non in automatico. La media tra 3 e 13 è 8, ma nasconde proprio il disaccordo che conta. Discuti prima i valori estremi; se dopo un nuovo voto il team è ancora diviso, preferisci il valore più alto o suddividi la storia.',
    },
    {
      q: 'Posso usare le carte di Fibonacci per bug e debito tecnico?',
      a: 'Sì, a patto che vengano stimati rispetto alla stessa storia di riferimento usata per tutto il resto. Molti team riservano lo 0 ai bug banali e stimano gli altri normalmente.',
    },
  ],
  ctaText: 'Pronto a stimare con le carte di Fibonacci? Gratis, fino a 50 persone per stanza, senza registrazione.',
  ctaLabel: 'Crea una stanza gratuita',
  relatedTitle: 'Continua a leggere',
  related: [
    { href: '/t-shirt-sizing', label: 'Stima con le taglie T-shirt nei team agili' },
    { href: '/planning-poker-cards', label: 'Carte e mazzi del planning poker' },
    { href: '/guide', label: 'Come condurre una sessione di Scrum Poker, passo dopo passo' },
    { href: '/blog/fibonacci-vs-tshirt', label: 'Fibonacci o taglie T-shirt' },
    { href: '/blog/story-points-vs-hours', label: 'Story point o ore' },
    { href: '/blog', label: 'Tutti gli articoli del blog' },
  ],
};

export default it;
