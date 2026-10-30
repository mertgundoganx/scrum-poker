import type { LandingContent } from '@/app/landingTypes';

const it: LandingContent = {
  breadcrumb: 'Carte del planning poker',
  title: 'Carte del planning poker: valori, mazzi, carte stampabili o online',
  subtitle: 'Cosa c’è stampato sulle carte, i mazzi standard usati dai team, cosa significano le carte speciali e come si confrontano le carte fisiche con un mazzo online.',
  sections: [
    {
      blocks: [
        { p: 'Le **carte del planning poker** sono l’intero strumento: un piccolo mazzo di valori che ogni partecipante tiene in mano, da cui sceglie in privato e che rivela nello stesso momento degli altri. I valori sono scelti in modo che il team possa esprimere l’impegno relativo senza fingere una precisione che non ha. Questa pagina spiega cosa c’è sulle carte, quali sono i mazzi standard, cosa significano le carte speciali, in cosa differiscono le carte fisiche da quelle online e come scegliere un mazzo per il tuo team.' },
      ],
    },
    {
      title: 'Cosa c’è su una carta del planning poker',
      blocks: [
        { p: 'Ogni carta riporta un solo valore. In un mazzo numerico è un numero di story point; in un mazzo T-shirt è un’etichetta di taglia. Con un mazzo fisico ogni partecipante riceve un set completo di carte, così che tutti possano votare in modo indipendente: un team di otto persone ha quindi bisogno di otto set. In una stanza online il mazzo compare sullo schermo e ogni partecipante tocca una carta; a nascondere e rivelare i voti ci pensa la stanza.' },
        { p: 'Quello che una carta non riporta è un’unità di misura. Un 5 non equivale a cinque ore o cinque giorni: vale cinque volte un 1, dove l’1 è la storia di riferimento più piccola su cui il team si è accordato. È questo il senso della stima relativa, ed è il motivo per cui lo stesso mazzo funziona per team con velocity molto diverse. Se la distinzione ti è nuova, [Cos’è il planning poker?](/blog/what-is-planning-poker) e [story point o ore](/blog/story-points-vs-hours) la spiegano nel dettaglio.' },
      ],
    },
    {
      title: 'I mazzi standard del planning poker',
      blocks: [
        { p: 'Pochi mazzi coprono le esigenze di quasi tutti i team. Scrum Poker Online offre i mazzi Scrum, Fibonacci, T-shirt e Potenze di 2, e ti permette di crearne uno tuo.' },
        {
          decks: [
            {
              title: 'Scrum (Fibonacci modificato)',
              cards: '0, ½, 1, 2, 3, 5, 8, 13, 20, 40, 100, ?, ☕',
              desc: 'Fibonacci fino a 13, poi valori arrotondati che sottolineano come le stime grandi siano fasce e non misure, più una carta da mezzo punto per il lavoro banale. Sono i valori della maggior parte dei set di carte stampati.',
            },
            {
              title: 'Fibonacci',
              cards: '0, 1, 2, 3, 5, 8, 13, 21, 34, 55, ?, ☕',
              desc: 'La sequenza classica. Gli intervalli crescono insieme ai numeri, quindi le storie grandi vengono stimate a grana grossa e quelle piccole a grana fine. Leggi la [guida completa al planning poker con Fibonacci](/fibonacci-planning-poker).',
            },
            {
              title: 'Taglie T-shirt',
              cards: 'Z, T, XXS, XS, S, M, L, XL, XXL, XXXL, ?, ☕',
              desc: 'Etichette relative al posto dei numeri. L’insieme classico va da XS a XXL; il nostro mazzo aggiunge Z (zero), T (tiny, minuscola), XXS e XXXL agli estremi. Ideale per roadmap, epic e team non tecnici. Leggi la [guida alla stima con le taglie T-shirt](/t-shirt-sizing).',
            },
            {
              title: 'Potenze di 2',
              cards: '0, 1, 2, 4, 8, 16, 32, 64, 128, ?, ☕',
              desc: 'Ogni carta vale il doppio della precedente. Gli intervalli sono più ampi di quelli di Fibonacci, il che spinge i team a suddividere prima le storie ed è adatto al lavoro con un’alta incertezza.',
            },
            {
              title: 'Personalizzato',
              cards: 'da 2 a 20 carte, ognuna fino a 4 caratteri',
              desc: 'Usalo per una scala da 1 a 5, un set di tre carte piccolo / medio / grande, un mazzo basato sulle ore se la tua organizzazione lo pretende, o qualsiasi altra cosa richieda il tuo processo.',
            },
          ],
        },
      ],
    },
    {
      title: 'Cosa significano le carte speciali',
      blocks: [
        { p: 'Ogni mazzo predefinito di Scrum Poker Online include due carte non numeriche (un mazzo personalizzato contiene solo le carte che aggiungi tu), e molti mazzi fisici ne includono una terza.' },
        {
          ul: [
            '**?** significa «Non riesco a stimarla». Le informazioni non bastano, oppure la storia non è chiara. Se più persone la giocano, smetti di votare e chiarisci il perimetro. È la carta più preziosa del mazzo: trasforma una confusione silenziosa in un segnale visibile.',
            '**☕** significa «Ho bisogno di una pausa». La qualità delle stime cala bruscamente quando le persone sono stanche. Una carta caffè è un modo cortese per dire che la sessione è durata abbastanza.',
            '**∞ o «troppo grande»** compare su molti mazzi stampati e indica che la storia supera il limite della scala e va suddivisa. Online si comunica la stessa cosa giocando la carta più alta, oppure giocando ? e spiegando il perché.',
          ],
        },
        { p: 'Alcuni mazzi, come il mazzo Scrum, includono anche uno 0 e un ½. Lo zero significa «nessun lavoro» o «già fatto»; la mezza carta è per attività così piccole che anche un 1 le sopravvaluterebbe. Usarle o meno è una convenzione del team.' },
      ],
    },
    {
      title: 'Carte fisiche o carte online',
      blocks: [
        { p: 'I mazzi stampati sono stati i primi e funzionano ancora bene per i team che condividono lo stesso spazio. Il confronto riguarda soprattutto la logistica.' },
        {
          compare: [
            {
              title: 'Carte fisiche',
              items: [
                'Ognuno ha bisogno di un mazzo, e i mazzi si perdono. Un team di dieci persone ha bisogno di dieci set completi sul tavolo.',
                'La disciplina della rivelazione è manuale. Qualcuno fa il conto alla rovescia, e ogni tanto qualcuno sbircia.',
                'Non viene registrato nulla. I risultati si scrivono su una lavagna o si riportano a mano in uno strumento di tracciamento.',
                'Niente partecipanti da remoto. In un team ibrido si finisce con una persona che vota tramite messaggio in chat.',
              ],
            },
            {
              title: 'Carte online',
              items: [
                'Nascoste fino alla rivelazione. I voti sono invisibili a tutti, facilitatore compreso, finché il round non viene rivelato.',
                'Funzionano per team da remoto e ibridi. Condividi un link o fai scansionare un QR code, e tutto il team si ritrova nella stessa stanza.',
                'Analisi automatica: distribuzione dei voti, minimo, mediana, media e massimo, rilevamento del consenso e una stima suggerita nell’istante in cui le carte si girano.',
                'Cronologia. Ogni round concluso viene conservato con la sua stima finale, e la cronologia si può scaricare in CSV o copiare come Markdown per il tuo strumento di backlog.',
                'Extra che le carte stampate non possono offrire: una coda di storie che importa un file CSV o un’esportazione di Jira, un timer condiviso, la modalità spettatore, la chat di team e un sollecito per chi non ha ancora votato.',
              ],
            },
          ],
        },
        { p: 'Se vuoi carte stampabili, i valori qui sopra sono tutto ciò che ti serve: stampa ogni valore su un foglio delle dimensioni di una carta, un set per persona. Per qualsiasi cosa vada oltre una sessione occasionale in presenza, un mazzo online elimina il lavoro di contorno e mantiene l’attenzione sulla discussione, che è dove risiede il valore della tecnica. La nostra [guida allo Scrum Poker](/guide) illustra una sessione online completa.' },
      ],
    },
    {
      title: 'Come scegliere un mazzo',
      blocks: [
        { p: 'Poniti tre domande:' },
        {
          ol: [
            '**Cosa stai stimando?** Storie dello sprint: Scrum o Fibonacci. Epic, elementi della roadmap o qualsiasi cosa lontana più di uno sprint: taglie T-shirt. Lavoro con un’alta incertezza in cui vuoi suddividere presto: Potenze di 2.',
            '**Chi vota?** Gli sviluppatori abituati agli story point si trovano bene con i numeri. I gruppi misti o non tecnici di solito preferiscono le taglie.',
            '**Cosa si aspetta il tuo strumento di tracciamento?** Se la velocity viene misurata in punti, usa un mazzo numerico oppure concorda una corrispondenza tra taglie e punti prima della sessione.',
          ],
        },
        { p: 'Qualunque mazzo tu scelga, cambialo di rado. Il valore di una scala di stima nasce dalla familiarità che il team ha accumulato con essa, e ogni cambio la azzera. Quando crei una stanza in Scrum Poker Online ne scegli il mazzo; l’host può cambiarlo tra un round e l’altro, sullo schermo di ogni partecipante compare sempre lo stesso mazzo, e un host che conserva la stanza tramite il suo link di proprietario privato ritrova la volta successiva lo stesso mazzo e le stesse impostazioni. Se il tuo team è spesso in disaccordo dopo la rivelazione, raramente il problema è il mazzo; leggi [raggiungere il consenso nella stima](/blog/estimation-consensus) per scoprire cosa aiuta di solito.' },
      ],
    },
  ],
  faqTitle: 'Domande frequenti',
  faq: [
    {
      q: 'Quante carte ci sono in un mazzo di planning poker?',
      a: 'Di solito da undici a tredici. Un mazzo Fibonacci ne ha dodici: dieci valori numerici più ? e ☕. Il mazzo Scrum ne ha tredici, quello T-shirt dodici e quello Potenze di 2 undici. I mazzi personalizzati di Scrum Poker Online possono contenere fino a 20 carte.',
    },
    {
      q: 'Posso stampare le mie carte del planning poker?',
      a: 'Sì. Va bene uno qualsiasi degli insiemi di valori di questa pagina; stampa un set completo per partecipante su fogli delle dimensioni di una carta. Per i team da remoto o ibridi, una stanza online si prepara più in fretta e conserva per te la cronologia dei round.',
    },
    {
      q: 'Cosa significa la carta caffè?',
      a: 'Significa «Ho bisogno di una pausa». È un modo leggero per segnalare la stanchezza senza interrompere chi sta parlando, e alcune carte caffè di fila sono un buon segnale per mettere in pausa la sessione.',
    },
    {
      q: 'Con quale mazzo dovrebbe iniziare un nuovo team Scrum?',
      a: 'Scrum o Fibonacci. Entrambi sono ampiamente documentati, corrispondono direttamente agli story point e la maggior parte dei tutorial dà per scontato uno dei due. Passa alle taglie T-shirt solo se i numeri generano più discussioni di quante ne risolvano.',
    },
  ],
  ctaText: 'Lascia perdere la stampa. Scegli un mazzo, condividi un link e il tuo team inizia a stimare in pochi secondi. Gratis, senza registrazione.',
  ctaLabel: 'Crea una stanza gratuita',
  relatedTitle: 'Continua a leggere',
  related: [
    { href: '/fibonacci-planning-poker', label: 'Planning poker con Fibonacci' },
    { href: '/t-shirt-sizing', label: 'Stima con le taglie T-shirt nei team agili' },
    { href: '/guide', label: 'Come condurre una sessione di Scrum Poker, passo dopo passo' },
    { href: '/blog/fibonacci-vs-tshirt', label: 'Fibonacci o taglie T-shirt' },
    { href: '/blog/what-is-planning-poker', label: 'Cos’è il planning poker?' },
    { href: '/blog', label: 'Tutti gli articoli del blog' },
  ],
};

export default it;
