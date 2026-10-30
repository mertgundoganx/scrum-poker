import type { Localized } from '../articleTypes';

const it: Localized = {
  title: "Velocity agile: come calcolarla, monitorarla e usarla nella pianificazione dello sprint",
  subtitle: "Cosa misura davvero la velocity, come calcolarla correttamente, un esempio svolto con conti reali e gli errori che trasformano un numero utile per pianificare in un numero dannoso.",
  sections: [
    {
      title: "Cos’è la velocity agile?",
      content: "La velocity è la quantità di lavoro che un team Scrum completa in un singolo sprint, misurata nella stessa unità che il team usa per stimare, di solito gli [story point invece delle ore](/blog/story-points-vs-hours). Se un team chiude user story per 30 punti in uno sprint di due settimane, la sua velocity per quello sprint è 30. Mediata su più sprint, la velocity diventa il numero più pratico per la pianificazione: ti dice all’incirca quanto backlog il team può portare nello sprint successivo e quanti sprint richiederà probabilmente un rilascio.",
      paragraphs: [
        "Due aspetti distinguono la velocity dalle metriche di produttività a cui sono abituati molti manager. Primo, si misura a livello di team, mai individuale: gli story point vengono assegnati a una storia e la storia la consegna il team. Secondo, è relativa. Un punto non ha un significato fisso al di fuori del team che l’ha stimato, quindi la velocity ha senso solo nel contesto dello storico di quel team.",
        "La velocity è una misura empirica, non un obiettivo. Descrive ciò che è successo e serve solo a proiettare ciò che probabilmente succederà se le condizioni restano simili. Appena si spinge un team ad «aumentare la velocity», il numero smette di descrivere la realtà e comincia a descrivere la pressione.",
      ],
    },
    {
      title: "Come calcolare la velocity passo per passo",
      content: "Il calcolo in sé è semplice. La disciplina sta in cosa conti.",
      items: [
        "1. A fine sprint, elenca tutti gli elementi del backlog che il team ha portato nello sprint.",
        "2. Tieni solo quelli che soddisfano pienamente la Definition of Done: revisionati, testati, integrati, rilasciabili, o qualunque cosa il team abbia concordato. Un elemento finito al 90% vale zero in questo sprint; i suoi punti passano allo sprint in cui viene davvero completato.",
        "3. Somma gli story point degli elementi completati. Quel totale è la velocity dello sprint.",
        "4. Ripeti per ogni sprint e registra i numeri in un posto visibile a tutto il team.",
        "5. Dopo tre-cinque sprint, calcola la media, oppure una media mobile degli sprint più recenti. Quella è la velocity da usare per pianificare.",
      ],
      paragraphs: [
        "Non rifare la stima delle storie dopo averle completate per migliorare il numero e non assegnare crediti parziali. Sul momento entrambe le pratiche sembrano innocue, ma rendono inaffidabili i dati storici, il che vanifica l’unico scopo della velocity.",
      ],
    },
    {
      title: "Esempio svolto: sei sprint di velocity",
      content: "Supponi che un team appena formato lavori con sprint di due settimane e registri questi risultati nei primi sei sprint. I numeri sono inventati a scopo illustrativo.",
      items: [
        "Sprint 1: 30 punti pianificati, 22 completati (due storie riportate)",
        "Sprint 2: 30 punti pianificati, 31 completati (il lavoro riportato è finito presto)",
        "Sprint 3: 32 punti pianificati, 28 completati",
        "Sprint 4: 30 punti pianificati, 35 completati",
        "Sprint 5: 34 punti pianificati, 26 completati (uno sviluppatore in ferie per una settimana)",
        "Sprint 6: 30 punti pianificati, 32 completati",
      ],
      paragraphs: [
        "La media dei sei sprint è (22 + 31 + 28 + 35 + 26 + 32) / 6 = 174 / 6 = 29 punti. La media mobile degli ultimi tre sprint è (35 + 26 + 32) / 3 = 93 / 3 = 31 punti. Entrambi sono numeri ragionevoli per pianificare. L’osservazione più importante, però, è che in uno sprint normale il team completa all’incirca tra 26 e 35 punti, ed è questo intervallo, non un singolo sprint, la realtà su cui pianificare.",
        "Ora supponi che il Product Owner chieda quanto tempo richiederanno i 180 punti rimasti nel backlog del rilascio. Con la media di sei sprint di 29 punti, 180 / 29 fa circa 6,2, quindi all’incirca sette sprint. Con il limite inferiore dell’intervallo (26 punti), 180 / 26 fa circa 6,9, quindi sette sprint. Con il limite superiore (35 punti), 180 / 35 fa circa 5,1, quindi sei sprint. Una previsione responsabile è quindi «da sei a sette sprint, più probabilmente sette», comunicata come intervallo e non come data.",
      ],
    },
    {
      title: "Usare la velocity per pianificare lo sprint e prevedere i rilasci",
      content: "Durante la [pianificazione dello sprint](/blog/sprint-planning-checklist), la velocity è il tetto di quanto il team dovrebbe prendere in carico, non una quota da riempire. Con una velocity di pianificazione di circa 30 punti, il team sceglie le storie a priorità più alta dal backlog già raffinato finché il totale si avvicina a 30, poi si ferma, anche se lo sprint sembra leggero.",
      paragraphs: [
        "Prima di scegliere le storie, tieni conto delle variazioni di capacità note. Se due sviluppatori su sei sono in ferie per metà sprint, al team manca circa un sesto della capacità e dovrebbe pianificare circa 25 punti invece di 30. La velocity ti dà la base; la pianificazione della capacità la adatta allo sprint specifico che hai davanti.",
        "La velocity alimenta anche la pianificazione dei rilasci. Dividendo i punti rimasti nel backlog per la velocity media ottieni il numero atteso di sprint; dividendo per la velocity recente più bassa e più alta ottieni un limite pessimistico e uno ottimistico. Presentarli tutti e tre è molto più onesto che presentare una sola data e rende concrete le trattative sul perimetro con gli stakeholder: se la data è fissa, l’intervallo ti dice quanti punti devono uscire dal backlog.",
      ],
    },
    {
      title: "Perché la velocity cambia nel tempo",
      content: "La velocity non è mai una linea piatta, e non dovrebbe esserlo. Qualche punto di variazione da uno sprint all’altro è rumore. Gli scostamenti più ampi o persistenti hanno di solito una causa identificabile che vale la pena discutere nella retrospettiva.",
      items: [
        "Composizione del team: un nuovo membro di solito abbassa la velocity per qualche sprint mentre impara a conoscere il codice, e la perdita di un ingegnere senior può abbassarla più a lungo.",
        "Durata dello sprint: passare da sprint di due settimane a sprint di tre cambia il numero stesso. Confronta la velocity solo tra sprint della stessa durata.",
        "Deriva delle stime: se il team comincia a poco a poco a chiamare 8 punti le storie da 5, la velocity sale senza che cambi il lavoro prodotto. Le storie di riferimento aiutano a mantenere stabile la scala.",
        "Mix di lavoro: uno sprint pieno di bug, incidenti o attività di supporto non stimati mostrerà una velocity più bassa anche se il team ha lavorato altrettanto.",
        "Cambiamenti tecnici: adottare un nuovo framework, migrare l’infrastruttura o ripagare una grossa fetta di debito tecnico riduce temporaneamente i punti consegnati.",
        "Interruzioni: rilasci, eventi aziendali, festività e inserimento di nuove persone riducono tutti il tempo disponibile per il lavoro pianificato.",
      ],
      paragraphs: [
        "Per via di questi fattori, la maggior parte dei team pianifica con una media mobile degli ultimi tre-cinque sprint invece che con il solo sprint più recente. La media mobile reagisce ai cambiamenti reali e smorza il rumore di un singolo sprint anomalo.",
      ],
    },
    {
      title: "Errori comuni e anti-pattern della velocity",
      content: "La velocity viene usata male molto più spesso di quanto venga usata bene. Gli schemi seguenti compaiono in quasi ogni organizzazione che la adotta senza capire cosa misura.",
      items: [
        "Confrontare la velocity tra team. Due team che stimano con scale diverse misurano cose diverse: un team con velocity 60 non è due volte più efficace di uno con velocity 30. Il confronto non ha senso e, appena i team sanno di essere confrontati, i punti si gonfiano.",
        "Usare la velocity come metrica di performance. Premiare una velocity più alta è il modo più rapido per distruggerla. Le stime crescono, la Definition of Done si restringe e il numero smette di prevedere qualsiasi cosa.",
        "Fissare obiettivi di velocity. «Questo trimestre dobbiamo arrivare a 40» trasforma una misura in un obiettivo, e un obiettivo raggiungibile cambiando le stime verrà raggiunto cambiando le stime.",
        "Contare il lavoro parzialmente completato. Assegnare 5 punti su 8 a una storia «quasi finita» nasconde il lavoro riportato e gonfia l’andamento.",
        "Pianificare sullo sprint migliore. Impegnarsi sulla velocity più alta mai raggiunta dal team garantisce sprint falliti con regolarità.",
        "Misurare la velocity individuale. Gli story point appartengono al team. La velocity individuale spinge le persone a evitare il pairing, le revisioni e l’aiuto reciproco, cioè proprio i comportamenti che rendono veloce un team.",
      ],
    },
    {
      title: "Quando la velocity aiuta e quando inganna",
      content: "La velocity dà il meglio quando un team stabile stima allo stesso modo da almeno qualche sprint e ha bisogno di una risposta realistica alla domanda «quanto possiamo prendere in carico?». In questo contesto è semplice, economica e molto più onesta dell’istinto.",
      paragraphs: [
        "Inganna quando mancano le condizioni da cui dipende. Un team appena nato non ha uno storico su cui fare la media. Un team i cui membri cambiano a ogni sprint non ha un’unità di misura stabile. Un team che mescola lavoro operativo non stimato in ogni sprint vedrà oscillazioni enormi che non hanno nulla a che fare con la qualità della pianificazione. E un team sotto pressione per mostrare miglioramenti farà slittare le proprie stime, consapevolmente o no, finché il grafico non avrà l’aspetto che vuole il management.",
        "La velocity, inoltre, non dice nulla sul valore. Uno sprint che consegna 35 punti di funzionalità a bassa priorità non è migliore di uno che ne consegna 20 che sbloccano un cliente importante. Affianca alla velocity misure di risultato (obiettivi raggiunti, problemi dei clienti risolti, incidenti ridotti) e trattala strettamente come un segnale di capacità.",
      ],
    },
    {
      title: "Stime coerenti mantengono significativa la velocity",
      content: "La velocity vale quanto le stime su cui si basa. Se una storia viene stimata 3 una settimana e una storia simile 8 la settimana dopo, le oscillazioni di velocity che ne risultano non ti dicono nulla. In questo quadro lo scopo del planning poker non è la precisione, ma la coerenza. Quando ogni membro del team stima in modo indipendente rispetto alle stesse storie di riferimento e poi si discutono le differenze, la [scala Fibonacci dei punti](/fibonacci-planning-poker) del team resta stabile da uno sprint all’altro.",
      paragraphs: [
        "Le modalità contano. Le stime dovrebbero restare nascoste finché tutti hanno scelto, così il primo numero pronunciato non fa da àncora agli altri. Scrum Poker Online è uno strumento gratuito per farlo: non serve registrarsi, i voti restano nascosti fino alla rivelazione simultanea e la cronologia dei round conserva i voti e la stima finale di ogni storia, che puoi scaricare in CSV o copiare come Markdown. Quella cronologia è utile anche quando in retrospettiva ci si chiede perché la velocity si è mossa.",
      ],
    },
    {
      title: "Checklist della velocity",
      content: "Usa questa checklist per verificare che la tua velocity sia affidabile per pianificare.",
      items: [
        "Il team ha completato almeno tre sprint della stessa durata con una composizione per lo più stabile.",
        "Si contano solo gli elementi che soddisfano la Definition of Done: niente crediti parziali, niente nuove stime a posteriori.",
        "Il lavoro non pianificato viene gestito allo stesso modo in ogni sprint: sempre stimato o mai stimato.",
        "La velocity di ogni sprint è registrata e visibile, compreso lo scarto tra pianificato e completato.",
        "La pianificazione usa una media mobile degli ultimi tre-cinque sprint, corretta per le variazioni di capacità note.",
        "Le previsioni vengono comunicate come intervallo di sprint, non come una singola data.",
        "Nessuno al di fuori del team usa il numero per confrontare team, stilare classifiche di persone o fissare obiettivi.",
        "Il team ricontrolla periodicamente alcune storie di riferimento per individuare la deriva delle stime.",
      ],
    },
  ],
  faq: [
    {
      q: "Qual è una buona velocity per un team Scrum?",
      a: "Non esiste una buona velocity universale. Il numero dipende da come il team assegna i punti, da quanto durano gli sprint e da quante persone ne fanno parte, quindi 20 può essere ottimo per un team e 80 normale per un altro. Una buona velocity è semplicemente una velocity abbastanza stabile da poterci pianificare: se gli ultimi cinque sprint rientrano in un intervallo stretto, il team può fare previsioni con fiducia, qualunque sia il numero assoluto.",
    },
    {
      q: "Quanti sprint servono prima che la velocity sia affidabile?",
      a: "La maggior parte dei team ottiene una media utilizzabile dopo tre sprint e una abbastanza stabile dopo cinque o sei, a patto che composizione del team e durata degli sprint restino invariate. Fino ad allora pianifica con prudenza, considera il numero provvisorio e preparati a correggerlo.",
    },
    {
      q: "Bug e debito tecnico vanno contati nella velocity?",
      a: "Entrambe le scelte vanno bene, purché siano coerenti. Se stimi e conti bug ed elementi di debito tecnico, la velocity riflette tutto il lavoro consegnato. Se non li stimi, la velocity riflette solo il lavoro sulle funzionalità e risulterà più bassa negli sprint pieni di bug. L’errore è passare da un approccio all’altro, perché rende gli sprint non confrontabili.",
    },
    {
      q: "Una velocity più alta significa che il team sta migliorando?",
      a: "Non necessariamente. La velocity sale quando il team consegna davvero di più, ma sale anche quando le stime si gonfiano, quando la Definition of Done viene allentata o quando gli sprint si allungano. Prima di leggere una linea in crescita come un miglioramento, controlla la coerenza delle stime e la qualità di ciò che è stato rilasciato.",
    },
    {
      q: "Qual è la differenza tra velocity e capacità?",
      a: "La velocity è una misura storica: i punti che il team ha effettivamente completato per sprint. La capacità è una misura rivolta al futuro: le persone e i giorni disponibili per uno specifico sprint in arrivo. Usa la velocity come base e correggila in base alla capacità quando ferie, reperibilità o altre assenze rendono lo sprint successivo diverso da uno tipico.",
    },
  ],
};

export default it;
