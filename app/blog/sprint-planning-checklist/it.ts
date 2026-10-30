import type { Localized } from '../articleTypes';

const it: Localized = {
  title: "Checklist per la pianificazione dello sprint: 12 passi per una riunione riuscita",
  subtitle: "Cosa preparare prima della riunione, cosa decidere durante e cosa mettere per iscritto dopo: una checklist passo per passo per la pianificazione dello sprint dei team Scrum, con un esempio svolto.",
  sections: [
    {
      title: "Cos’è la pianificazione dello sprint?",
      content: "La pianificazione dello sprint (sprint planning) è la riunione che apre ogni sprint. Il team Scrum esamina il product backlog ordinato per priorità, concorda un obiettivo di sprint, seleziona gli elementi del backlog che ritiene di poter completare e stabilisce come li consegnerà. Il risultato è lo sprint backlog: l’obiettivo, gli elementi selezionati e un piano iniziale del lavoro.",
      paragraphs: [
        "La Scrum Guide fissa per la pianificazione dello sprint un limite massimo di otto ore per uno sprint di un mese e precisa che per sprint più brevi l’evento di solito dura meno; la maggior parte dei team con sprint di due settimane finisce in due-quattro ore. La riunione risponde a tre domande: perché questo sprint ha valore, cosa si può fare e come verrà svolto il lavoro. Ogni passo della checklist che segue serve a una di queste tre domande.",
      ],
    },
    {
      title: "Prima della riunione: passi da 1 a 4",
      content: "La preparazione avviene nel refinement del backlog durante lo sprint precedente, non nella riunione di pianificazione. Se i quattro passi seguenti sono stati fatti, la pianificazione diventa una sessione per prendere decisioni invece che per scoprire cose nuove.",
      items: [
        "1. Raffina la parte alta del backlog. Il Product Owner e gli sviluppatori hanno discusso gli elementi a priorità più alta, ognuno ha una descrizione chiara e criteri di accettazione verificabili, e gli elementi troppo grandi per un solo sprint sono stati divisi.",
        "2. Stima gli elementi candidati. Tutto ciò che potrebbe entrare nello sprint ha una stima in story point concordata dal team. Se qualche elemento non è ancora stimato, prevedi un breve round di stima all’inizio della pianificazione invece di stimare a caso nel mezzo.",
        "3. Conosci la tua velocity e la tua capacità. Calcola la media degli ultimi tre-cinque sprint e raccogli le disponibilità per lo sprint in arrivo: ferie, formazione, reperibilità, giorni part-time.",
        "4. Prepara una bozza di obiettivo di sprint. Il Product Owner porta un obiettivo proposto legato a un risultato di business. Verrà corretto durante la riunione, ma partire da una bozza mantiene la discussione concentrata.",
      ],
    },
    {
      title: "Passo 5: concorda l’obiettivo di sprint",
      content: "Inizia la riunione dall’obiettivo, non dall’elenco dei ticket. L’obiettivo di sprint è una frase che dice cosa dovrebbe ottenere lo sprint: «i clienti possono pagare con una carta salvata» invece di «chiudere i ticket dal 231 al 244». Dà al team un motivo per collaborare e una base per i compromessi: quando qualcosa slitta, gli elementi che non servono all’obiettivo sono i primi a uscire.",
      paragraphs: [
        "Un buon obiettivo è abbastanza specifico da capire se l’hai raggiunto e abbastanza ampio da lasciare al team la scelta di come raggiungerlo. Se gli elementi proposti servono tre obiettivi scollegati, scegline uno oppure ammetti che lo sprint non ha un obiettivo unico e accetta la perdita di concentrazione che ne deriva.",
      ],
    },
    {
      title: "Passo 6: conferma la capacità per questo sprint",
      content: "[La velocity del tuo team](/blog/agile-velocity) ti dice cosa ha consegnato il team in uno sprint passato tipico. La capacità ti dice se lo sprint in arrivo sarà tipico. Confronta le due cose prima di selezionare anche un solo elemento.",
      paragraphs: [
        "Supponi che la velocity media sia di 30 punti e che il team abbia sei sviluppatori. Nello sprint in arrivo uno sviluppatore è in ferie per tutto lo sprint e un altro per metà, quindi al team manca uno sprint-sviluppatore e mezzo su sei, cioè un quarto della capacità abituale. Pianificare intorno a 22 o 23 punti invece di 30 è il punto di partenza onesto. Sottrai anche gli impegni noti esterni allo sprint, come una giornata di rilascio, un evento aziendale o un turno di reperibilità pesante.",
      ],
    },
    {
      title: "Passi 7 e 8: seleziona e verifica gli elementi del backlog",
      content: "Con obiettivo e capacità concordati, prendi elementi dalla cima del backlog finché il totale dei punti si avvicina al numero della capacità. Fermati lì, anche se lo sprint sembra leggero: è molto meglio aggiungere un elemento a metà sprint che riportarne tre allo sprint successivo.",
      items: [
        "7. Seleziona per priorità gli elementi utili all’obiettivo. Saltare un elemento ad alta priorità perché è scomodo è una decisione che il Product Owner deve prendere in modo esplicito, non una scelta predefinita.",
        "8. Verifica ogni elemento prima di accettarlo: entra in uno sprint, i criteri di accettazione sono verificabili, le dipendenze da altri team o sistemi sono risolte o accettate esplicitamente come rischio, qualcuno nel team ha le competenze per farlo e gli eventuali input di design o di architettura necessari sono già disponibili.",
      ],
      paragraphs: [
        "Un elemento che non supera anche una sola verifica torna al refinement. Prenderlo comunque «perché poi ci pensiamo» è il modo in cui gli sprint finiscono con lavoro a metà.",
      ],
    },
    {
      title: "Passo 9: stima ciò che non è ancora stimato",
      content: "Se alcuni elementi candidati non hanno una stima, fai ora un breve round di planning poker. Mantienilo serrato: leggi l’elemento, raccogli le domande di chiarimento, ognuno sceglie una carta in privato, le carte si rivelano tutte insieme e, se la dispersione è ampia, lascia spiegare chi ha votato più alto e chi più basso; la guida su [come condurre una sessione di scrum poker](/guide) spiega ogni passaggio. Dai a ogni elemento pochi minuti al massimo; se non si riesce a stimarlo in quel tempo, non è pronto e non dovrebbe entrare nello sprint.",
      paragraphs: [
        "La rivelazione simultanea è una delle [best practice di scrum poker](/blog/scrum-poker-best-practices) fondamentali, perché il primo numero pronunciato ad alta voce attira tutti gli altri verso di sé. Con Scrum Poker Online puoi [aprire una stanza di planning poker gratuita](/) e condurre questi round senza registrazione: i voti restano nascosti finché il round non viene rivelato e la cronologia dei round conserva i voti e la stima finale di ogni elemento, da scaricare in CSV o copiare come Markdown. Annota tu quali elementi hanno richiesto un secondo voto: è un segnale utile per il prossimo refinement.",
      ],
    },
    {
      title: "Passi 10 e 11: scomponi il lavoro e prendi l’impegno",
      content: "Una volta selezionati gli elementi, gli sviluppatori pianificano come consegnarli. Questa parte della riunione appartiene agli sviluppatori; il Product Owner resta disponibile per le domande ma non dirige il piano tecnico.",
      items: [
        "10. Scomponi almeno i primi elementi in attività abbastanza piccole da completarsi in un giorno o meno. La scomposizione in attività fa emergere spesso complessità nascoste (una migrazione, un’API mancante, un caso limite poco chiaro) quando c’è ancora tempo per sostituire un elemento.",
        "11. Rendi esplicito l’impegno. Chiedi direttamente al team se ritiene raggiungibile l’obiettivo di sprint con gli elementi selezionati e la capacità nota. Un sì esitante è un no: togli qualcosa.",
      ],
    },
    {
      title: "Passo 12: dopo la riunione",
      content: "La riunione produce decisioni; lo sprint backlog le rende reali. Entro un’ora dalla fine, deve valere quanto segue.",
      items: [
        "12. Lo sprint backlog è messo per iscritto: l’obiettivo di sprint è visibile nello strumento e sulla board che usa il team, gli elementi selezionati sono stati spostati nello sprint con le loro stime, le attività sono registrate, le ipotesi sulla capacità sono annotate e ogni rischio o dipendenza emersi nella riunione hanno un responsabile.",
        "Il team sa da quale elemento partire e, idealmente, l’ha iniziato in giornata.",
        "Tutto ciò che è tornato al refinement è stato segnalato al Product Owner, così la prossima volta sarà pronto.",
      ],
    },
    {
      title: "Esempio svolto: una sessione di pianificazione di due ore",
      content: "Ecco come appaiono in pratica i dodici passi per un ipotetico team di cinque sviluppatori con sprint di due settimane e una velocity media di 28 punti. I numeri sono inventati a scopo illustrativo.",
      items: [
        "0:00–0:10 — Lo Scrum Master conferma la capacità. Sono tutti disponibili tranne uno sviluppatore che è a una conferenza di due giorni, quindi il team pianifica circa 26 punti invece di 28.",
        "0:10–0:25 — Il Product Owner presenta la bozza di obiettivo, «i nuovi utenti possono completare l’onboarding senza aprire un ticket di supporto», e i primi dodici elementi raffinati. Il team fa domande e affina la formulazione dell’obiettivo.",
        "0:25–0:40 — Tre elementi non hanno una stima. Un rapido round di planning poker li dimensiona a 3, 5 e 8, con una nuova votazione sull’8.",
        "0:40–1:10 — Il team prende gli elementi in ordine di priorità: 5, 3, 8, 5 e 3, per 24 punti. L’elemento successivo è un 8 che porterebbe il totale a 32, quindi resta nel backlog e al suo posto si prende un elemento da 1 punto più in basso, arrivando a 25 punti.",
        "1:10–1:50 — Gli sviluppatori scompongono in attività i primi quattro elementi. Uno degli elementi da 5 punti risulta dipendere da un’API non ancora rilasciata da un altro team; viene sostituito con un altro elemento da 5 punti più in basso nel backlog, così lo sprint resta a 25 punti.",
        "1:50–2:00 — Il team conferma l’impegno, lo sprint backlog viene aggiornato nello strumento e l’obiettivo viene pubblicato nel canale del team.",
      ],
      paragraphs: [
        "In questa sessione non c’è nulla di straordinario, ed è proprio questo il punto. Poiché il refinement era stato fatto prima, due ore sono bastate per prendere ogni decisione con tutto il team presente.",
      ],
    },
    {
      title: "Errori comuni nella pianificazione dello sprint",
      content: "Questi schemi ricorrono nei team le cui riunioni di pianificazione si allungano o i cui sprint finiscono con lavoro incompiuto.",
      items: [
        "Fare refinement in riunione. Se il team scrive i criteri di accettazione durante la pianificazione, la riunione dura il doppio e le stime sono tirate a indovinare.",
        "Pianificare sulla velocity senza controllare la capacità. Trenta punti non sono un piano per uno sprint in cui due persone sono assenti.",
        "Riempire lo sprint. Trattare la velocity come una quota da raggiungere invece che come un tetto porta a riportare lavoro allo sprint successivo come routine.",
        "Nessun obiettivo di sprint. Quando ogni elemento è ugualmente importante, il team non sa cosa togliere quando la realtà si mette di mezzo.",
        "Stime di una sola persona. Un lead che annuncia le dimensioni fa da àncora a tutti gli altri e nasconde i disaccordi che rivelano i rischi.",
        "Product Owner assente o impreparato. Senza priorità e risposte nella stanza, il team tira a indovinare o aspetta.",
        "Saltare l’impegno esplicito. Uno sprint su cui nessuno si è impegnato è uno sprint di cui nessuno si sente responsabile.",
      ],
    },
    {
      title: "Quando questa checklist aiuta e quando è d’intralcio",
      content: "La checklist è più preziosa per i team i cui sprint finiscono spesso con lavoro incompiuto, le cui riunioni di pianificazione sforano il limite di tempo o che hanno cambiato da poco composizione o strumenti. Trasforma la pianificazione da una conversazione che dipende dalla memoria di una persona esperta in una routine ripetibile.",
      paragraphs: [
        "È meno utile per i team molto maturi che fanno già refinement in modo continuo e pianificano in trenta minuti: per loro, seguire tutti e dodici i passi come un rituale aggiunge lavoro senza aggiungere comprensione. Usa i passi come strumento diagnostico: se puoi saltarne uno perché è già vero, saltalo. E ricorda che una checklist può confermare che i criteri di accettazione esistono, non che siano buoni.",
      ],
    },
    {
      title: "Checklist per la pianificazione dello sprint: i 12 passi in una pagina",
      content: "I dodici passi in una forma che puoi incollare nella wiki del tuo team.",
      items: [
        "1. Elementi in cima al backlog raffinati, con criteri di accettazione",
        "2. Elementi candidati stimati",
        "3. Velocity e capacità note",
        "4. Bozza di obiettivo di sprint preparata",
        "5. Obiettivo di sprint concordato",
        "6. Capacità corretta per questo sprint",
        "7. Elementi selezionati in ordine di priorità, entro la capacità",
        "8. Ogni elemento verificato: entra nello sprint, è verificabile, dipendenze gestite, competenze presenti",
        "9. Elementi non stimati dimensionati con il planning poker a rivelazione simultanea",
        "10. Lavoro scomposto in attività da un giorno",
        "11. Impegno esplicito del team sull’obiettivo",
        "12. Sprint backlog messo per iscritto e comunicato",
      ],
    },
  ],
  faq: [
    {
      q: "Quanto dovrebbe durare la pianificazione dello sprint?",
      a: "La Scrum Guide fissa un massimo di otto ore per uno sprint di un mese; per sprint più brevi l’evento di solito dura meno. I team con sprint di due settimane di solito hanno bisogno di due-quattro ore. Se le tue riunioni durano di più, la causa è quasi sempre il refinement fatto in riunione invece che prima.",
    },
    {
      q: "Chi dovrebbe partecipare alla pianificazione dello sprint?",
      a: "L’intero team Scrum: il Product Owner, gli sviluppatori e lo Scrum Master. Stakeholder o esperti di dominio possono partecipare alla parte iniziale per fornire contesto, ma la selezione e il piano spettano al team. Il Product Owner deve esserci: pianificare senza priorità e risposte nella stanza significa tirare a indovinare.",
    },
    {
      q: "Che differenza c’è tra refinement del backlog e pianificazione dello sprint?",
      a: "Il refinement è l’attività continua di chiarire, dividere e stimare gli elementi del backlog perché siano pronti per essere lavorati. La pianificazione dello sprint è l’evento in cui il team seleziona gli elementi pronti per lo sprint in arrivo e pianifica come consegnarli. Il refinement prepara il menù; la pianificazione fa l’ordinazione.",
    },
    {
      q: "Conviene pianificare in base alla velocity o alla capacità?",
      a: "In base a entrambe. La velocity ti dà la base: ciò che il team completa di solito. La capacità adatta quella base allo sprint specifico che hai davanti, tenendo conto di ferie, reperibilità e altre assenze. Pianificare solo sulla velocity ignora la realtà dello sprint in arrivo; pianificare solo sulla capacità ignora lo storico del team.",
    },
    {
      q: "E se il team non riesce a concordare un obiettivo di sprint?",
      a: "Di solito significa che la parte alta del backlog non è focalizzata: contiene elementi che servono diversi risultati scollegati. Il Product Owner decide quale risultato ha la priorità e l’obiettivo ne consegue. Se lo sprint deve davvero servire due risultati, indica un obiettivo principale e tratta il secondo come facoltativo, così il team sa cosa proteggere quando il tempo stringe.",
    },
  ],
};

export default it;
