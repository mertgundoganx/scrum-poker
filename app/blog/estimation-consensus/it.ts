import type { Localized } from '../articleTypes';

const it: Localized = {
  title: "Come raggiungere il consenso sulle stime nel planning poker",
  subtitle: "Perché le stime in story point divergono, come condurre passo per passo un round di consenso e quando il disaccordo ti dice qualcosa di più utile di un numero.",
  sections: [
    {
      title: "Cosa significa consenso nel planning poker?",
      content: "Nel [planning poker](/blog/what-is-planning-poker), consenso significa che il team concorda su un unico valore in story point per un elemento del backlog e, cosa ancora più importante, concorda su ciò che l’elemento comporta. Il numero è un sottoprodotto. I team stimano insieme per far emergere, prima che il lavoro cominci, ipotesi diverse su perimetro, rischi e approccio, ed è proprio nella discussione che colma la distanza tra un 3 e un 13 che questo accade.",
      paragraphs: [
        "Il consenso non è un’unanimità raggiunta per sfinimento, né la media dei voti. Un team che arriva a 8 perché due persone hanno detto 5, due hanno detto 13 e il facilitatore ha preso la via di mezzo non ha raggiunto il consenso: ha nascosto un disaccordo dentro un numero. Il vero consenso significa che ogni persona che stima può dire: «Posso accettare questo valore e capisco perché è questo».",
      ],
    },
    {
      title: "Perché le stime divergono",
      content: "Quando uno sviluppatore vota 3 e un altro vota 13 per lo stesso elemento, raramente è perché uno dei due stima male. I voti divergenti hanno quasi sempre una di poche cause.",
      items: [
        "Perimetro diverso in mente: una persona stima il percorso ideale, l’altra include gestione degli errori, migrazioni e documentazione.",
        "Conoscenze diverse: una persona conosce il codice e ricorda che una modifica simile ha richiesto un pomeriggio; un’altra non ha mai toccato quel modulo.",
        "Dipendenze nascoste: qualcuno sa che l’elemento richiede un team esterno, un’API di terze parti o un sistema legacy senza test.",
        "Definizioni di «fatto» diverse: una persona considera «integrato», un’altra «rilasciato, monitorato e comunicato».",
        "Ambiguità nell’elemento stesso: la descrizione lascia spazio a due o tre interpretazioni legittime.",
      ],
      paragraphs: [
        "È molto meglio scoprire ognuna di queste cause durante la stima che durante lo sprint. Per questo una dispersione dei voti è un buon esito di un round, non un fallimento.",
      ],
    },
    {
      title: "Come condurre un round di consenso passo per passo",
      content: "Un round di consenso segue lo stesso ritmo fisso di ogni [sessione di scrum poker ben condotta](/guide). Mantenerlo è ciò che permette a un team di stimare una dozzina di elementi in mezz’ora senza tagliare la discussione che conta.",
      items: [
        "1. Il Product Owner o l’autore dell’elemento legge ad alta voce l’elemento e i suoi criteri di accettazione.",
        "2. Il team fa domande di chiarimento per un paio di minuti. Il facilitatore annota ogni risposta che cambia il perimetro.",
        "3. Ogni persona sceglie una carta in privato. Nessuno pronuncia numeri.",
        "4. Tutte le carte vengono rivelate nello stesso momento.",
        "5. Se i voti coincidono o cadono su carte adiacenti, il team adotta il valore concordato (di solito il più alto dei due adiacenti) e passa oltre.",
        "6. Se la dispersione è maggiore, chi ha votato più alto e chi più basso spiegano ciascuno il proprio ragionamento in un minuto o meno. Gli altri possono aggiungere fatti, non opinioni sul numero.",
        "7. Il team vota di nuovo. La maggior parte delle distanze si chiude al secondo round.",
        "8. Se anche un terzo round mostra una dispersione ampia, smetti di stimare: l’elemento non è compreso o è troppo grande. Dividilo, chiariscilo o rimandalo al refinement.",
      ],
    },
    {
      title: "Esempio svolto: colmare la distanza tra 3 e 13",
      content: "Supponi che un team di cinque persone stia stimando l’elemento «permettere agli utenti di esportare lo storico degli ordini in CSV». La prima rivelazione mostra 3, 5, 5, 8 e 13. L’esempio è inventato a scopo illustrativo.",
      paragraphs: [
        "Il facilitatore chiede al 3 e al 13 di parlare. Lo sviluppatore che ha votato 3 dice che l’API restituisce già lo storico degli ordini in JSON: convertirlo in CSV e aggiungere un pulsante di download è questione di poche ore. Lo sviluppatore che ha votato 13 fa notare che alcuni clienti hanno decine di migliaia di ordini, quindi l’esportazione andrebbe generata in modo asincrono e inviata via e-mail, e che l’endpoint attuale va già in timeout sopra qualche centinaio di righe.",
        "Ora il team sa due cose che un minuto prima non sapeva: l’elemento nasconde un problema di prestazioni e il Product Owner deve decidere se gli account grandi rientrano nel perimetro. Il Product Owner dice che la prima versione può limitarsi agli ultimi dodici mesi e al massimo a qualche migliaio di righe, rimandando le esportazioni grandi a un elemento separato.",
        "Il secondo voto mostra 5, 5, 5, 8 e 8. I due che hanno votato 8 dicono che il loro dubbio residuo riguardava le esportazioni grandi, ora fuori perimetro, quindi la solita preferenza per la carta più alta non si applica: il team concorda su 5 per il perimetro ridotto e crea un nuovo elemento di backlog per le esportazioni grandi asincrone, che verrà stimato a parte. Il round è durato circa sei minuti e ha eliminato un rischio che altrimenti sarebbe emerso nella seconda settimana dello sprint.",
      ],
    },
    {
      title: "Tecniche che accelerano la convergenza",
      content: "Le tecniche seguenti accorciano la discussione senza imporre un accordo artificiale.",
      items: [
        "Fai parlare prima gli estremi. Ascoltare chi ha votato più basso e chi più alto prima di chiunque altro evita che la maggioranza copra l’unica persona che sa qualcosa di importante.",
        "Tieni delle storie di riferimento. Due o tre elementi già consegnati con dimensioni concordate danno a tutti un metro comune: «è più grande o più piccolo della storia del reset della password che abbiamo stimato 5?»",
        "Metti un limite di tempo alla discussione. Tre minuti di discussione, poi si rivota, a prescindere da come stanno le cose. Se serve un terzo voto, l’elemento torna al refinement.",
        "Dividi prima di discutere. Quando la distanza nasce da due interpretazioni diverse, dividere l’elemento secondo entrambe di solito risolve subito il disaccordo.",
        "Preferisci il valore adiacente più alto. Quando restano due carte vicine, quella più alta di solito rappresenta meglio l’incertezza.",
      ],
    },
    {
      title: "Ancoraggio e altri bias che ostacolano stime oneste",
      content: "L’ancoraggio è la tendenza ad avvicinarsi al primo numero che si sente. Se uno sviluppatore senior dice «mi sembra un 3» prima che le carte vengano mostrate, il resto del team scivola verso il 3, che sia d’accordo o no. È questo il motivo principale per cui il planning poker nasconde i voti finché tutti hanno scelto: il formato non è un gioco, è una contromisura.",
      paragraphs: [
        "Nelle stesse riunioni compaiono bias affini. Il bias di autorità porta a rimettersi alla voce più senior. Il bias di ottimismo porta a presumere il percorso ideale. La pressione del gruppo spinge l’unica persona con in mano un 13, in una stanza piena di 3, ad abbassare in silenzio la propria carta quando si rivota. Ognuno di questi bias si riduce con la stessa pratica: scelta privata, rivelazione simultanea e la regola che chi ha votato agli estremi parla per primo e viene ringraziato per questo.",
        "Gli strumenti contano, perché il formato si rompe facilmente. In una videochiamata, dire i numeri ad alta voce o scriverli in chat uno dopo l’altro reintroduce l’ancora. Scrum Poker Online è un’opzione gratuita che tiene nascosti i voti fino alla rivelazione simultanea, non richiede registrazione e conserva una cronologia dei round con i voti e la stima finale di ogni elemento, così il team può rivedere i risultati in seguito.",
      ],
    },
    {
      title: "Quando smettere di discutere: regole pratiche in base alla distanza",
      content: "Non tutti i disaccordi meritano lo stesso tempo. Una regola semplice, legata alla distanza tra le carte sulla [scala Fibonacci del planning poker](/fibonacci-planning-poker), mantiene brevi i round.",
      items: [
        "Stessa carta o carte adiacenti (5 e 8): prendi il valore più alto o quello della maggioranza e vai avanti; la discussione costerebbe più della differenza.",
        "Due carte di distanza (3 e 8): un giro di spiegazioni da parte di chi ha votato più alto e più basso, poi si rivota.",
        "Tre o più carte di distanza (2 e 13): persone diverse intendono l’elemento in modo diverso. Chiarisci il perimetro prima di votare di nuovo e preparati a dividerlo.",
        "Una carta con il punto interrogativo: qualcuno non riesce proprio a stimare. Non procedere finché l’elemento non gli è stato spiegato; se non si può spiegare in fretta, non è pronto.",
        "Una carta caffè o pausa: il team è stanco. La qualità delle stime crolla con la fatica: fai fare una pausa.",
      ],
    },
    {
      title: "Errori comuni e anti-pattern del consenso",
      content: "I team che faticano con le stime di solito si riconoscono in uno o più di questi schemi.",
      items: [
        "Fare la media dei voti. La media tra 3 e 13 è un numero a cui nessuno crede e una discussione che nessuno ha fatto.",
        "Votare a maggioranza. Mettere in minoranza l’unica persona che conosce la dipendenza vanifica lo scopo di stimare in gruppo.",
        "Lasciar decidere il lead. Se l’esito è sempre il numero del lead, tutti gli altri smettono di pensare e la stima diventa l’ipotesi di una sola persona con un rituale intorno.",
        "Discutere finché tutti sono d’accordo. Un dibattito infinito produce stanchezza, non precisione. Limita il tempo e rivota.",
        "Premiare le stime basse. Se i numeri piccoli vengono lodati, otterrai numeri piccoli, e a pagarne il prezzo sarà lo sprint.",
        "Riaprire il numero in seguito. Una volta che il team è d’accordo, la stima resta tale a meno che non cambi il perimetro. Modificarla a lavoro finito per «aggiustare» la velocity rovina lo storico.",
      ],
    },
    {
      title: "Quando il consenso è un campanello d’allarme e quando il disaccordo va bene",
      content: "Un consenso unanime e immediato su ogni elemento può essere un segnale d’allarme. Se cinque persone votano ogni volta la stessa carta senza dire una parola, forse si stanno ancorando a una voce di riferimento, approvano in automatico per finire prima o non leggono davvero gli elementi. I team sani a volte non sono d’accordo: è il segno che le persone pensano in modo indipendente e portano conoscenze diverse.",
      paragraphs: [
        "Allo stesso modo, non ogni disaccordo va risolto. Sugli elementi piccoli una distanza di una carta è rumore. Sugli elementi grandi e incerti l’esito onesto a volte è «non ne sappiamo ancora abbastanza», e la mossa giusta è uno spike o una divisione, non un numero, o al massimo una [taglia T-shirt approssimativa](/t-shirt-sizing). Forzare il consenso in questi casi ti dà una stima dall’aspetto preciso con niente dietro.",
      ],
    },
    {
      title: "Il ruolo del facilitatore nel raggiungere il consenso",
      content: "Qualcuno deve gestire il ritmo del round e di solito quella persona non dovrebbe votare. Il facilitatore, spesso lo Scrum Master, legge o fa leggere l’elemento, mantiene le domande di chiarimento sul perimetro anziché sulla soluzione, avvia la rivelazione, invita gli estremi a parlare, tiene d’occhio l’orologio e chiede di rivotare. In una stanza fisica è facile; in una sessione da remoto fa la differenza tra una stima di venti minuti e una di un’ora.",
      paragraphs: [
        "Il facilitatore protegge anche le voci più silenziose e mantiene il Product Owner nel ruolo di chi risponde: il Product Owner decide la priorità, non la dimensione.",
      ],
    },
    {
      title: "Checklist per il consenso sulle stime",
      content: "Ripassa questa lista prima e durante la tua prossima sessione di stima.",
      items: [
        "Ogni elemento ha una descrizione e dei criteri di accettazione prima di essere stimato.",
        "Due o tre storie di riferimento con dimensioni concordate sono visibili a tutto il team.",
        "I voti sono privati e rivelati simultaneamente; nessuno dice un numero prima della rivelazione.",
        "Chi ha votato più alto e chi più basso spiegano per primi, e gli altri aggiungono fatti anziché opinioni.",
        "La discussione su ogni elemento ha un limite di tempo; una dispersione ampia dopo due nuove votazioni rimanda l’elemento al refinement.",
        "I disaccordi tra carte adiacenti si risolvono prendendo il valore più alto o quello della maggioranza, mai facendo la media.",
        "Il Product Owner risponde alle domande sul perimetro ma non vota.",
        "Si registrano i valori finali e, in una riga, il motivo di ogni nuova votazione.",
        "Ogni tanto il facilitatore mette in discussione i voti unanimi arrivati senza alcuna discussione.",
      ],
    },
  ],
  faq: [
    {
      q: "Cosa succede se il team non riesce a mettersi d’accordo su una stima?",
      a: "Dopo due nuove votazioni con una dispersione ampia, smetti di votare. L’elemento è inteso in modo diverso da persone diverse oppure è troppo incerto per essere dimensionato. Dividilo secondo le interpretazioni emerse, chiarisci il perimetro con il Product Owner o pianifica un breve spike per scoprire cosa manca. Forzare un numero a quel punto produce una stima a cui nessuno crede.",
    },
    {
      q: "Conviene fare la media dei voti del planning poker?",
      a: "No. La media nasconde il disaccordo che il round doveva far emergere e di solito produce un valore che non è nemmeno sulla scala. Se i voti sono su carte adiacenti, prendi il più alto o quello della maggioranza. Se sono lontani, si discute e si rivota.",
    },
    {
      q: "Il Product Owner o lo Scrum Master dovrebbero votare?",
      a: "Il Product Owner non dovrebbe votare: il suo ruolo è spiegare perimetro e priorità, e la sua stima avrebbe un’autorità che non dovrebbe avere. Lo Scrum Master di solito facilita invece di votare, a meno che non faccia anche lavoro di sviluppo nel team: in quel caso vota come sviluppatore e qualcun altro tiene d’occhio l’orologio.",
    },
    {
      q: "Quanti round di voto sono normali per un elemento?",
      a: "Uno o due. La maggior parte degli elementi trova l’accordo alla prima rivelazione o converge dopo una sola spiegazione da parte di chi ha votato più alto e più basso. Un terzo round segnala che l’elemento va chiarito o diviso, non discusso ancora.",
    },
    {
      q: "Consenso significa che tutti devono votare la stessa carta?",
      a: "No. Consenso significa che ogni persona che stima può accettare il valore finale e ne capisce il ragionamento. Voti su carte adiacenti, risolti prendendo il valore più alto, sono un normale esito di consenso. Carte identiche da parte di tutti su ogni elemento, senza alcuna discussione, sono più spesso un segno di ancoraggio che di un team ben calibrato.",
    },
  ],
};

export default it;
