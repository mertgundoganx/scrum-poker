import type { Localized } from '../articleTypes';

const it: Localized = {
  title: 'Come condurre la pianificazione dello sprint da remoto: una guida pratica',
  subtitle: 'Un manuale passo per passo per i team Scrum distribuiti: preparazione, agenda, stima, fusi orari, coinvolgimento e gli errori che rovinano in silenzio le sessioni di pianificazione da remoto.',
  sections: [
    {
      title: 'Perché la pianificazione dello sprint da remoto è diversa',
      content: 'La pianificazione dello sprint è l’evento Scrum in cui il team decide cosa consegnerà nello sprint successivo e come. È la riunione più collaborativa del framework: il Product Owner porta le priorità, gli sviluppatori portano le stime di impegno e il giudizio tecnico, e insieme negoziano un obiettivo di sprint realistico. In una stanza condivisa, gran parte di questa negoziazione passa per sguardi, conversazioni a margine e una lavagna. Da remoto niente di tutto questo arriva gratis: ogni segnale va reso esplicito con strumenti e facilitazione.',
      paragraphs: [
        'La buona notizia è che i team distribuiti che pianificano in modo intenzionale spesso finiscono per avere sessioni migliori dei team in presenza che si affidano all’abitudine. La preparazione scritta sostituisce il contesto delle chiacchiere di corridoio, il voto privato online elimina parte della pressione sociale e uno storico delle decisioni è semplicemente un sottoprodotto del lavoro nel browser. Questa guida ti mostra come arrivarci.',
        'È scritta per Scrum Master, Product Owner e team lead che conducono la pianificazione dello sprint in videochiamata, che il team sia completamente da remoto, ibrido o distribuito su più fusi orari.',
      ],
    },
    {
      title: 'Prima della riunione: checklist di preparazione da remoto',
      content: 'Le sessioni da remoto puniscono una preparazione scarsa molto più di quelle in presenza. Quando qualcuno apre una storia per la prima volta in videochiamata, dieci persone restano in silenzio mentre legge. Fai in modo che la lettura avvenga prima e usa una [checklist per la pianificazione dello sprint](/blog/sprint-planning-checklist) per non dimenticare nulla.',
      items: [
        'Raffina la parte alta del backlog almeno due o tre giorni prima della pianificazione. Ogni storia candidata ha bisogno di una descrizione chiara, di criteri di accettazione e delle dipendenze note.',
        'Condividi per iscritto l’elenco dei candidati 24 ore prima, con una nota sull’obiettivo di sprint proposto.',
        'Chiedi ai membri del team di pubblicare le loro domande sulle storie in modo asincrono, così il Product Owner può rispondere prima della chiamata.',
        'Conferma la capacità: ferie, reperibilità, disponibilità part-time. Scrivi il numero; non indovinarlo in diretta.',
        'Tieni le storie candidate pronte da incollare nella coda della stanza di poker, una per riga. Crea la stanza all’inizio della chiamata e pubblica subito il link nella chat: le stanze in tempo reale come quelle di Scrum Poker Online vengono eliminate circa un’ora dopo che tutti sono usciti, quindi un link salvato nell’invito del calendario funziona solo se l’host conserva la stanza (menu Altro → Conserva questa stanza).',
        'Decidi chi facilita, chi prende appunti e chi tiene il tempo. In una chiamata, questi ruoli non emergono da soli.',
      ],
    },
    {
      title: 'Un’agenda passo per passo per una sessione di pianificazione da remoto',
      content: 'Mantieni la sessione tra 60 e 120 minuti a seconda della durata dello sprint e segui un’agenda visibile. Una struttura che funziona per la maggior parte dei team distribuiti:',
      items: [
        '1. Check-in (5 min): un giro veloce di «c’è qualcosa che influisce su questo sprint?»: un collega malato, un incidente, una data di rilascio spostata.',
        '2. Obiettivo di sprint (10 min): il Product Owner propone l’obiettivo; il team fa domande di chiarimento finché tutti sanno riformularlo in una frase.',
        '3. Capacità (5 min): conferma il numero annotato durante la preparazione e correggilo in base a ciò che è emerso nel check-in.',
        '4. Stima (30–60 min): scorri le storie candidate in ordine di priorità con il planning poker. Si vota, si discutono i valori anomali, si rivota e si registra il risultato; la guida su [come condurre una sessione di scrum poker](/guide) spiega ogni passaggio.',
        '5. Impegno (10 min): confronta il totale con la capacità e la velocity recente; togli o dividi storie finché il piano non è realistico.',
        '6. Scomposizione in attività (facoltativa, 15–30 min): per le prime storie, abbozza le attività così il lavoro può partire subito.',
        '7. Chiusura (5 min): riformula l’obiettivo di sprint, elenca le domande aperte con i rispettivi responsabili e conferma dove si trova il resoconto.',
      ],
    },
    {
      title: 'Usa uno strumento dedicato di planning poker, non la chat o un foglio di calcolo',
      content: 'L’errore di stima da remoto più comune è votare nella finestra della chat. Il primo che scrive «5» fa da àncora a tutti gli altri, chi risponde per ultimo si sente sotto pressione e alla fine non resta traccia. Condividere lo schermo con un foglio di calcolo ha lo stesso problema, con più attrito.',
      paragraphs: [
        'Uno strumento di planning poker nel browser risolve il problema come si deve. Tutti aprono la stessa stanza, scelgono una carta in privato e tutti i voti vengono rivelati insieme. Scrum Poker Online è un’opzione gratuita che non richiede registrazione: il facilitatore [crea una stanza di planning poker](/), condivide un codice, un link o un QR code e nel giro di un minuto il team sta votando. Una coda di storie mantiene visibile l’ordine del backlog, un timer condiviso tiene onesta la discussione e la cronologia dei round si può scaricare in CSV o copiare come Markdown a fine sessione.',
        'Se stai ancora [scegliendo uno strumento di planning poker gratuito](/blog/free-scrum-poker-tools), ricorda che dovrebbe affiancare la videochiamata, non sostituirla. Il voto avviene nello strumento; la discussione avviene faccia a faccia, in video.',
      ],
    },
    {
      title: 'Sconfiggi il bias di ancoraggio e il conformismo silenzioso',
      content: 'Il bias di ancoraggio è la tendenza a lasciare che il primo numero sentito condizioni tutte le stime successive. È un problema in ogni sessione di pianificazione, ma da remoto peggiora: le persone non riescono a leggere l’atmosfera, quindi seguono chi ha parlato per primo, e con il microfono spento è facile restare in silenzio invece di dissentire.',
      items: [
        'Voti nascosti con rivelazione simultanea: su questo non si tratta. È la ragione stessa per cui esiste il planning poker.',
        'Chiedi al Product Owner e ai manager di partecipare come spettatori. Possono osservare senza carta, il che elimina una sottile fonte di pressione.',
        'Dopo la rivelazione, chiama per nome chi ha votato più alto e chi più basso. In una chiamata, a «qualcuno vuole spiegare?» di solito risponde il silenzio.',
        'Considera la carta «?» una risposta valida e uno stimolo a chiarire la storia, non un fallimento.',
        'Per chi non ha ancora votato usa un sollecito o un messaggio diretto, invece di annunciarlo a tutta la chiamata.',
      ],
    },
    {
      title: 'Gestire i fusi orari: sincrono, asincrono o entrambi',
      content: 'Un team distribuito su due o tre ore di differenza di solito trova una finestra comune. Un team distribuito su otto o più ore non può tenere una sessione completa dal vivo senza che qualcuno lavori in piena notte a ogni sprint. Adatta il formato alla sovrapposizione che hai davvero.',
      paragraphs: [
        'Con una sovrapposizione ragionevole, proteggi senza pietà quella finestra per pianificazione e refinement, e fai ruotare l’orario scomodo così non è sempre la stessa area a pagarne il prezzo. Registra la sessione e pubblica gli appunti in giornata per chi non c’era.',
        'Con poca o nessuna sovrapposizione, dividi il lavoro. Fai la preparazione in modo asincrono: il Product Owner pubblica le storie raffinate e ognuno le legge e aggiunge domande durante la propria giornata lavorativa. Poi si stima dal vivo nella breve sovrapposizione, anche solo con chi riesce a esserci, dedicando il tempo alle storie che richiedono discussione. Gli strumenti in tempo reale come Scrum Poker Online richiedono che tutti siano nella stanza nello stesso momento; non sono pensati per voti distribuiti nell’arco di una giornata. L’impegno e la discussione sull’obiettivo di sprint beneficiano comunque di una conversazione dal vivo, anche se è una chiamata di 30 minuti con due o tre rappresentanti.',
      ],
      items: [
        'Storie a basso rischio e ben comprese: chiarisci le domande per iscritto in anticipo, così ognuna richiede un solo round rapido nella finestra dal vivo.',
        'Storie con domande aperte, tecnologie nuove o dipendenze tra team: riservale alla finestra dal vivo.',
        'Pubblica sempre le stime finali e l’obiettivo di sprint per iscritto dove lavora tutto il team, non solo nella chiamata.',
      ],
    },
    {
      title: 'Mantieni alto il coinvolgimento in una lunga videochiamata',
      content: 'Le sessioni di pianificazione da remoto perdono energia più in fretta di quelle in presenza, perché ogni partecipante è sempre a un clic dalla posta. Il coinvolgimento è un problema di facilitazione e ci sono soluzioni pratiche.',
      items: [
        'Videocamere accese durante le discussioni, spente durante la lettura silenziosa. Dillo esplicitamente, così nessuno si sente giudicato.',
        'Fai una pausa di cinque minuti ogni 45 minuti. Fai attenzione alle carte caffè: sono un segnale, non uno scherzo.',
        'Dai un compito a tutti: qualcuno legge la storia ad alta voce, qualcuno tiene traccia delle domande aperte, qualcuno controlla il timer.',
        'Usa la chat di team integrata per note a margine e link, così il canale audio resta libero per le decisioni.',
        'Festeggia ad alta voce i round in cui il consenso arriva subito. Sembra banale, ma un po’ di slancio tiene le persone presenti.',
        'Finisci in orario. Una sessione che sfora regolarmente abitua le persone a disconnettersi mentalmente prima della fine.',
      ],
    },
    {
      title: 'Consigli di facilitazione per lo Scrum Master',
      content: 'In una chiamata il facilitatore fa più che in una stanza: gestisce i turni di parola, i silenzi e lo strumento allo stesso tempo. Alcune abitudini fanno una grande differenza.',
      paragraphs: [
        'Leggi ad alta voce il titolo di ogni storia prima del voto e chiedi al Product Owner un riassunto di 60 secondi, anche se tutti l’hanno letta prima: allinea il gruppo e dà contesto a chi arriva in ritardo. Avvia il timer alla rivelazione, non al riassunto. Quando la discussione scivola nella progettazione della soluzione, fallo notare, annota la questione di design negli appunti e torna alla stima.',
        'Tieni d’occhio chi non parla da venti minuti e invitalo per nome. Tieni d’occhio anche le solite due persone che spiegano ogni valore anomalo; se succede, chiedi a una terza persona cosa ne pensa prima di aprire la discussione. E mantieni visibile la coda di storie, così tutti vedono quanto manca: è più facile tenere il ritmo quando il traguardo è sullo schermo.',
      ],
    },
    {
      title: 'Documenta e dai seguito',
      content: 'Una sessione da remoto che si chiude senza un resoconto scritto non è davvero avvenuta. Entro un’ora dalla chiusura, pubblica un breve riepilogo dove il team lavora già.',
      items: [
        'L’obiettivo di sprint, in una frase.',
        'Le storie su cui il team si è impegnato, con le stime finali: copia la cronologia dei round dallo strumento di poker invece di ribatterla.',
        'Le storie messe da parte, con la domanda aperta e un responsabile.',
        'Le ipotesi sulla capacità e gli eventuali rischi noti.',
        'Un link alla registrazione, se c’è.',
      ],
    },
    {
      title: 'Errori comuni nella pianificazione dello sprint da remoto',
      content: 'Questi sono i modi di fallire che si vedono più spesso nei team distribuiti, e sono tutti evitabili.',
      items: [
        'Fare refinement durante la pianificazione. Se il team si chiede ancora «cosa significa questa storia?», la sessione è un refinement travestito.',
        'Votare in chat o accendendo il microfono uno alla volta, il che reintroduce l’ancoraggio.',
        'Lasciar vincere la connessione più forte. La persona con il microfono migliore e la connessione più veloce non è per forza quella con la stima migliore.',
        'Impegnarsi oltre la capacità perché «in qualche modo ce la faremo»: i team da remoto hanno meno modi informali per recuperare a metà sprint.',
        'Saltare il resoconto. Senza appunti, chi è in altri fusi orari inizia lo sprint con un’idea diversa del piano.',
        'Fare una sola riunione di tre ore invece di due più brevi. La stanchezza rende inutile l’ultima ora.',
      ],
    },
    {
      title: 'Esempio: una sessione da remoto di 90 minuti per uno sprint di due settimane',
      content: 'Un team di sette persone diviso tra Istanbul e Berlino, con un’ora di differenza d’estate e due d’inverno. Il refinement si è svolto martedì; la pianificazione è giovedì alle 10:00, ora di Istanbul.',
      paragraphs: [
        'Dal check-in emerge che uno sviluppatore sarà in ferie la seconda settimana e un altro ha due giorni di reperibilità, quindi la capacità scende da 70 a 63 giorni-persona. Il Product Owner propone l’obiettivo «I clienti possono gestire gli indirizzi salvati» e il team lo riformula. Le dodici storie candidate vengono incollate nella coda della stanza di poker in ordine di priorità. Le prime sei convergono in un round ciascuna. La storia sette, «Convalidare i formati di indirizzo internazionali», rivela 3, 5, 8, 8, 13; chi ha votato 13 spiega che le regole dei codici postali cambiano da paese a paese e richiedono una fonte di dati, e il team decide di metterla da parte e dividerla dopo la chiamata. Le storie dalla otto alla undici richiedono due round ciascuna. La storia dodici, un 8, porterebbe il totale a 34 punti contro una velocity recente di 31, con la capacità ridotta di un decimo in questo sprint, quindi il team la toglie e si impegna su 26 punti.',
        'La chiusura richiede quattro minuti: obiettivo riformulato, dieci storie confermate, una messa da parte con un responsabile, cronologia dei round copiata nella pagina dello sprint. Tempo totale: 88 minuti, con una pausa.',
      ],
    },
    {
      title: 'Un set di strumenti leggero per pianificare da remoto',
      content: 'Non ti serve una catena di strumenti pesante. Un set piccolo e affidabile è più facile da far usare a tutti di uno grande:',
      items: [
        'Una videochiamata per la discussione, con un link fisso che non cambia mai.',
        'Uno strumento di planning poker nel browser con voti nascosti, coda di storie, timer condiviso e cronologia esportabile: Scrum Poker Online copre tutto questo gratis, senza bisogno di un account.',
        'Il tuo strumento di backlog preferito come fonte di verità su storie e priorità.',
        'Uno spazio documentale condiviso per il riepilogo dello sprint e le domande aperte.',
      ],
    },
  ],
  faq: [
    {
      q: 'Quanto dovrebbe durare la pianificazione dello sprint da remoto?',
      a: 'La Scrum Guide fissa per la pianificazione dello sprint un massimo di otto ore per uno sprint di un mese, e gli sprint più brevi di solito ne richiedono meno. Le sessioni da remoto stancano più in fretta, quindi molti team puntano a circa un’ora per ogni settimana di sprint (circa due ore per uno sprint di due settimane) e dividono in due sessioni tutto ciò che dura di più. Se le sessioni sforano regolarmente, di solito il backlog non è abbastanza raffinato prima della riunione.',
    },
    {
      q: 'La pianificazione dello sprint si può fare in modo asincrono?',
      a: 'In parte. La preparazione funziona bene in modo asincrono: le storie vengono pubblicate e ognuno le legge e aggiunge domande nel proprio orario di lavoro. Il voto vero e proprio funziona meglio dal vivo, e gli strumenti in tempo reale come Scrum Poker Online richiedono che tutti siano nella stanza nello stesso momento, quindi mantieni una breve finestra comune per la stima. Anche l’accordo sull’obiettivo di sprint e l’impegno finale funzionano meglio in una conversazione dal vivo, anche breve.',
    },
    {
      q: 'Qual è il miglior strumento gratuito per il planning poker da remoto?',
      a: 'Cerca voti nascosti con rivelazione simultanea, nessuna registrazione così gli ospiti possono entrare subito, una coda di storie, un timer e un modo per esportare i risultati. Scrum Poker Online soddisfa questi requisiti ed è gratuito senza bisogno di un account; la scelta giusta per il tuo team è quella che tutti apriranno davvero.',
    },
    {
      q: 'Il Product Owner dovrebbe votare nel planning poker da remoto?',
      a: 'No. Il Product Owner spiega le storie e risponde alle domande; a stimare sono gli sviluppatori che faranno il lavoro. La maggior parte degli strumenti offre una modalità spettatore, così il Product Owner può assistere alla rivelazione senza avere una carta.',
    },
    {
      q: 'Come gestiamo i membri del team che non possono partecipare alla sessione dal vivo?',
      a: 'Lascia che pubblichino domande e dubbi sulle storie prima della chiamata, registra la sessione e pubblica un riepilogo scritto in giornata. Se sono sempre le stesse persone a mancare a causa dei fusi orari, fai ruotare l’orario della riunione così il disagio viene condiviso.',
    },
  ],
};

export default it;
