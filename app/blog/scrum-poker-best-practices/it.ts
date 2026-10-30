import type { Localized } from '../articleTypes';

const it: Localized = {
  title: '10 best practice di scrum poker per stime migliori',
  subtitle: 'Tecniche pratiche che rendono le sessioni di planning poker più rapide, più coerenti e più utili per la pianificazione dello sprint, con esempi realistici e domande frequenti.',
  sections: [
    {
      title: 'Cos’è lo scrum poker (e perché le best practice contano)',
      content: 'Lo scrum poker, chiamato anche planning poker, è una tecnica di stima basata sul consenso. Ogni membro del team ha un mazzo di carte (di solito una sequenza di Fibonacci modificata: 0, 1, 2, 3, 5, 8, 13, 20, 40, 100), il Product Owner presenta una user story, ognuno sceglie una carta in privato e tutte le carte vengono rivelate nello stesso momento. Se le stime concordano, si passa oltre. Se differiscono, il team discute il perché e vota di nuovo.',
      paragraphs: [
        'La meccanica è semplice, ma la qualità del risultato dipende quasi interamente da [come viene condotta la sessione](/guide). Un team che rivela le carte una alla volta, discute di ore e lascia che l’ingegnere più rumoroso decida il numero otterrà stime peggiori di un team che non ha mai usato il planning poker, e ci metterà di più. Le pratiche che seguono nascono da ciò che funziona con costanza nelle vere sessioni di pianificazione dello sprint, che il team sia in una stanza o voti dal browser.',
        'Usa questo articolo come checklist. Scegli due o tre pratiche che il tuo team non segue ancora, applicale per un paio di sprint e guarda cosa cambia.',
      ],
    },
    {
      title: '1. Stima complessità e impegno, non ore',
      content: 'Gli story point esprimono una dimensione relativa: quanto lavoro, complessità e incertezza porta una storia rispetto alle altre. Un 5 è più o meno «un po’ meno del doppio di un 3», non «cinque ore». Questa distinzione è la base di tutto il resto, perché la stima relativa è ciò che permette a un team di confrontare le storie rapidamente senza fingere di sapere esattamente quanto richiederà ciascuna.',
      paragraphs: [
        'Quando qualcuno dice «sono circa due giorni, quindi è un 5», riporta gentilmente la discussione sul confronto: «Rispetto alla funzione di esportazione dello sprint scorso, è più grande o più piccola?». Ancorarsi al tempo di calendario si porta dietro la velocità personale, le riunioni e le interruzioni, che non hanno nulla a che fare con la storia. I punti, inoltre, restano stabili quando cambia la composizione del team; le ore no.',
        'Un test pratico: se due sviluppatori con livelli di esperienza diversi darebbero lo stesso valore in punti a una storia ma stime in ore diverse, il tuo team sta ragionando correttamente in punti.',
      ],
    },
    {
      title: '2. Tieni un insieme di storie di riferimento',
      content: 'La stima relativa funziona solo se tutti si confrontano con la stessa base. Scegli alcune storie completate e ben comprese e fissale su una scala: «L’e-mail di reset della password era un 2. L’esportazione CSV con filtri era un 5. La migrazione del fornitore di pagamenti era un 13». Tieni questa lista in vista in ogni sessione.',
      paragraphs: [
        'Le storie di riferimento risolvono due problemi comuni. I nuovi membri del team si calibrano rapidamente invece di indovinare cosa significa un 3 in questo team. E l’inflazione dei punti (quando un 3 diventa a poco a poco ciò che prima era un 5) è più facile da individuare, perché il team continua a confrontarsi con gli stessi esempi.',
        'Aggiorna la lista di riferimento ogni qualche mese. Una storia che un anno fa valeva 5 potrebbe non essere più rappresentativa se il codice o il team sono cambiati in modo significativo.',
      ],
    },
    {
      title: '3. Raffina le storie prima di stimarle',
      content: 'Il planning poker fa emergere l’incertezza, ma non dovrebbe essere la prima volta che qualcuno legge una storia. Il refinement del backlog, una breve sessione qualche giorno prima della pianificazione dello sprint, è il momento in cui il Product Owner chiarisce l’obiettivo, i criteri di accettazione e i vincoli noti. Quando la storia arriva al tavolo del poker, il team dovrebbe stimare una soluzione, non decifrare un titolo.',
      items: [
        'Ogni storia ha un «chi, cosa, perché» chiaro e almeno qualche criterio di accettazione.',
        'Le domande aperte sono elencate sulla storia, non scoperte a metà votazione.',
        'Le dipendenze da altri team o sistemi sono indicate in modo esplicito.',
        'Il Product Owner fa un riassunto di uno o due minuti prima del primo voto e risponde alle domande prima che qualcuno scelga una carta.',
      ],
    },
    {
      title: '4. Vota in privato e rivela simultaneamente',
      content: 'La regola più importante del planning poker: nessuno vede la carta degli altri finché tutti non hanno scelto. Rivelare uno alla volta, o chiedere a un ingegnere senior di «andare per primo», crea il bias di ancoraggio: il primo numero diventa il punto di riferimento e le stime successive si raggruppano intorno a esso, che sia giusto o no.',
      paragraphs: [
        'In una stanza fisica significa tenere le carte coperte e girarle insieme. Online significa usare uno strumento che nasconde i voti finché il round non viene rivelato. Scrum Poker Online, per esempio, tiene nascosto ogni voto finché qualcuno nella stanza non rivela il round, ed è gratuito e senza registrazione, così tutto il team può entrare con un codice stanza in pochi secondi.',
        'La stessa regola vale per il linguaggio del corpo e i commenti a margine. Anche un «oh, questa è facile» detto prima del voto è un’àncora. Chiedi alle persone di tenere le opinioni per la discussione dopo la rivelazione.',
      ],
    },
    {
      title: '5. Fai spiegare per primi i valori anomali',
      content: 'Quando la rivelazione mostra una dispersione, per esempio 3, 3, 5, 5 e 13, non fare la media dei numeri e non lasciare che la maggioranza copra la voce fuori dal coro. Chiedi a chi ha votato più alto e a chi più basso di spiegare per primi il proprio ragionamento. Chi ha votato 13 potrebbe sapere che l’API di terze parti ha un limite di richieste non documentato; chi ha votato 3 potrebbe sapere che esiste già una funzione di supporto per metà del lavoro.',
      paragraphs: [
        'Questa conversazione è il vero prodotto del planning poker. Il numero è un sottoprodotto. I team che la saltano e prendono semplicemente la mediana perdono la comprensione condivisa che fa filare liscio lo sprint.',
        'Mantieni la discussione sui fatti: qual è il lavoro, quali sono i rischi, cosa è già stato fatto. Se il dibattito diventa «come lo implementeresti?», annota la questione di design e vai avanti: si sta stimando, non progettando.',
      ],
    },
    {
      title: '6. Rivota, poi decidi: non girare in tondo all’infinito',
      content: 'Dopo che i valori anomali hanno parlato, si vota di nuovo. La maggior parte delle storie [converge verso il consenso](/blog/estimation-consensus) al secondo round, perché il divario di informazioni che causava la dispersione ora è colmato. Se anche il secondo round mostra una dispersione ampia, probabilmente la storia stessa non è chiara o è troppo grande, e altri voti non lo risolveranno.',
      items: [
        'Dispersione al round 1: si discutono i valori anomali e si rivota.',
        'Dispersione lieve al round 2 (carte adiacenti, per es. 5 e 8): si concorda un valore; molti team prendono la carta più alta quando la dispersione nasce dall’incertezza.',
        'Dispersione ampia al round 2 (per es. 3 e 13): si mette da parte la storia, si annota la domanda aperta e la si divide oppure la si rimanda al refinement.',
        'Mai più di tre round su una storia durante la pianificazione dello sprint.',
      ],
    },
    {
      title: '7. Dividi le storie grandi',
      content: 'Una storia che arriva a 13 o più è un segnale, non un risultato. Le stime grandi nascondono grande incertezza: nessuno sa davvero se «13» significa otto giorni o diciotto. Dividerla in porzioni più piccole e di valore autonomo produce stime più precise e dà al team un riscontro anticipato durante lo sprint.',
      paragraphs: [
        'Schemi di divisione utili: per fase del flusso (prima il caricamento, poi l’elaborazione, poi le notifiche), per variazione dei dati (supporta un formato di file prima di tre), per percorso ideale contro casi limite, o per piattaforma (web prima di mobile). Evita di dividere per livello tecnico («storia backend» e «storia frontend») quando le porzioni non si possono rilasciare in modo indipendente.',
        'Esempio: «Gli utenti possono esportare i propri report» arriva a 20. Dividila in «Esportare un singolo report in PDF» (5), «Esportare un intervallo di date come ZIP di PDF» (5) e «Inviare l’esportazione via e-mail quando è pronta» (3). Il totale è più piccolo e ogni parte si può mostrare da sola.',
      ],
    },
    {
      title: '8. Usa con onestà le carte «?» e caffè',
      content: 'La maggior parte dei [mazzi di planning poker](/planning-poker-cards) include due carte speciali. Il punto interrogativo significa «non capisco questa storia abbastanza bene da stimarla». La tazza di caffè significa «ho bisogno di una pausa». Entrambe sono voti legittimi ed entrambe portano informazioni utili.',
      paragraphs: [
        'Un solo «?» in un round dovrebbe sospendere il voto finché la domanda non trova risposta. Più carte «?» significano che la storia non è pronta e dovrebbe tornare al refinement invece di essere forzata a un numero. Una carta caffè da parte di un paio di persone dopo novanta minuti è un segnale affidabile che le stime rimanenti saranno peggiori delle precedenti: concedi una pausa al team.',
        'Fai in modo che usare queste carte sia socialmente sicuro. Se il team considera il «?» un’ammissione di debolezza, le persone tireranno a indovinare, e le ipotesi a caso sono proprio ciò che stai cercando di eliminare.',
      ],
    },
    {
      title: '9. Metti un limite di tempo a ogni storia',
      content: 'Le sessioni di planning poker si perdono quando una singola storia si mangia venti minuti. Imposta un timer visibile per ogni storia (da tre a cinque minuti, discussione compresa, è un buon valore predefinito) e concorda in anticipo con il team cosa succede allo scadere del tempo: la storia si mette da parte, si annota la domanda aperta e si prosegue.',
      paragraphs: [
        'Un timer condiviso funziona meglio del facilitatore che guarda l’orologio, perché tutti vedono quanto margine resta e si autoregolano. Gli strumenti online con un timer integrato rendono la cosa indolore per i team distribuiti.',
        'Metti un limite di tempo anche alla sessione nel suo complesso. Se ti servono regolarmente più di due ore per stimare il lavoro di uno sprint, il problema è il refinement, non la sessione di poker.',
      ],
    },
    {
      title: '10. Confronta le stime con la realtà',
      content: 'Le stime migliorano grazie al riscontro. A fine sprint, o durante la retrospettiva, guarda le storie che hanno richiesto molto più o molto meno di quanto suggerissero i loro punti. Chiediti cosa sapeva il team al momento della stima e cosa ha scoperto dopo.',
      items: [
        'Certi tipi di lavoro (integrazioni, migrazioni di dati, rifiniture dell’interfaccia) sforano sistematicamente? Aggiorna le storie di riferimento per quella categoria.',
        'Le dispersioni al primo round erano ampie proprio per le storie che poi hanno sorpreso il team? Questo indica un refinement debole, non stime deboli.',
        'Le storie messe da parte durante la sessione sono state chiarite prima dell’inizio dello sprint?',
        'Conserva la cronologia dei round del tuo strumento di poker, così puoi vedere i voti dell’ultimo round di ogni storia e non solo il numero concordato; annota tu stesso la dispersione del primo round quando una storia ha richiesto una nuova votazione.',
      ],
    },
    {
      title: 'Errori comuni nel planning poker',
      content: 'Anche i team che conoscono le regole cadono in alcune trappole ricorrenti. Fai attenzione a queste:',
      items: [
        'Fare la media dei voti. La media tra 3 e 13 non è una stima, è un lancio di moneta. Meglio discuterne.',
        'Far votare il Product Owner o il manager. Sono responsabili di priorità e perimetro, non dell’impegno. La modalità spettatore esiste proprio per questo.',
        'Stimare durante il voto invece che prima. Il voto dovrebbe seguire una breve discussione su cosa sia la storia.',
        'Trattare i punti come un impegno o una metrica di performance. Appena i punti vengono usati per giudicare le persone, si gonfiano.',
        'Rifare la stima del lavoro finito per «aggiustare» la velocity. La velocity è uno strumento di pianificazione, non un punteggio.',
        'Saltare la rivelazione nelle sessioni da remoto e scrivere i numeri in chat, il che reintroduce l’ancoraggio.',
      ],
    },
    {
      title: 'Un round d’esempio realistico',
      content: 'Storia: «Come cliente, posso salvare un indirizzo di spedizione nel mio profilo, così il checkout è più veloce». Criteri di accettazione: modulo dell’indirizzo con convalida, gli indirizzi salvati compaiono nel checkout, massimo cinque indirizzi per utente.',
      paragraphs: [
        'Il primo round rivela 3, 3, 5, 8, 8. I due 8 spiegano: la convalida degli indirizzi nei formati internazionali è complicata e il checkout attuale non prevede dati salvati. Uno dei 3 risponde che la pagina del profilo ha già un componente di modulo generico con convalida, e il team concorda che la convalida internazionale è fuori perimetro per questo sprint: il Product Owner aggiunge alla storia «solo indirizzi nazionali».',
        'Il secondo round rivela 5, 5, 5, 5, 8. Il team prende 5 e chi ha votato 8 è d’accordo, perché i formati internazionali ora sono un elemento separato del backlog. Tempo totale: quattro minuti. La storia è più chiara di quando è arrivata e tutti sanno perché vale 5.',
      ],
    },
    {
      title: 'Come iniziare',
      content: 'Non ti servono tutte e dieci le pratiche dal primo giorno. Inizia con la rivelazione simultanea, la discussione dei valori anomali e un limite di tempo; aggiungi le storie di riferimento dopo uno o due sprint; poi introduci le verifiche di accuratezza quando hai un po’ di storico. Se il tuo team è da remoto o ibrido, uno [strumento di scrum poker gratuito](/blog/free-scrum-poker-tools) nel browser come Scrum Poker Online ti offre voti nascosti, un timer condiviso e la cronologia dei round senza che nessuno debba creare un account.',
    },
  ],
  faq: [
    {
      q: 'Che differenza c’è tra scrum poker e planning poker?',
      a: 'Sono la stessa tecnica. «Planning poker» è il nome originale; «scrum poker» si è diffuso perché la pratica è usata soprattutto dai team Scrum durante la pianificazione dello sprint e il refinement del backlog.',
    },
    {
      q: 'Quanti round di voto dovremmo fare per ogni storia?',
      a: 'Di norma due: un voto iniziale, la discussione dei valori anomali e un secondo voto. Se anche il secondo round mostra un forte disaccordo, la storia non è chiara o è troppo grande: mettila da parte e dividila o raffinala invece di votare una terza volta.',
    },
    {
      q: 'Il Product Owner o lo Scrum Master dovrebbero votare nel planning poker?',
      a: 'Di solito no. Il lavoro lo stimano le persone che lo faranno. Il Product Owner spiega la storia e risponde alle domande; lo Scrum Master facilita. Entrambi possono partecipare come spettatori, così vedono i voti senza influenzarli.',
    },
    {
      q: 'Cosa fare quando le stime non convergono mai?',
      a: 'Un disaccordo persistente significa quasi sempre che la storia nasconde una domanda irrisolta: una dipendenza sconosciuta, un requisito ambiguo o due modelli mentali diversi della soluzione. Scrivi la domanda, rimanda la storia al refinement e stimala quando la domanda ha una risposta.',
    },
    {
      q: 'Si può usare il planning poker per bug e attività tecniche?',
      a: 'Sì, purché l’elemento sia compreso abbastanza bene da poterlo stimare. Molti team stimano i bug solo quando la causa è nota e trattano l’analisi come uno spike con un limite di tempo, invece che come una storia in punti.',
    },
  ],
};

export default it;
