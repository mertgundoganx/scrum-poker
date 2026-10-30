import type { Localized } from '../articleTypes';

const it: Localized = {
  title: 'I migliori strumenti gratuiti di scrum poker: cosa cercare',
  subtitle: 'Una guida pratica alla scelta di uno strumento gratuito di planning poker: i criteri che contano, le categorie di strumenti disponibili, le domande da porsi prima di scegliere e come se la cava Scrum Poker Online.',
  sections: [
    {
      title: 'Perché «gratis» merita uno sguardo più attento',
      content: 'Cercando uno strumento gratuito di scrum poker si trovano decine di opzioni, e quasi tutte si definiscono gratuite. In pratica, «gratis» copre molte situazioni diverse: prodotti completamente gratuiti, piani gratuiti che limitano partecipanti o stanze, prove che scadono e progetti open source da ospitare in proprio. Nessuna di queste è sbagliata, ma le differenze contano quando un team di dieci persone prova a stimare un giovedì mattina e scopre che il decimo posto, il timer o l’esportazione sono a pagamento.',
      paragraphs: [
        'Invece di stilare classifiche basate su elenchi di funzionalità che cambiano ogni trimestre (e che non possiamo verificare in modo indipendente), questa guida ti dà un insieme stabile di criteri. Usalo per valutare qualsiasi strumento di planning poker in circa quindici minuti, compresi quelli che usciranno dopo la pubblicazione di questo articolo.',
        'In breve: scegli uno strumento che tutto il team possa aprire all’istante, che tenga nascosti i voti fino alla rivelazione, che supporti il mazzo che usi davvero e che ti permetta di conservare i risultati. Tutto il resto è un di più.',
      ],
    },
    {
      title: 'Cos’è uno strumento di scrum poker e ti serve davvero?',
      content: 'Uno strumento di scrum poker (o planning poker) sostituisce il mazzo di carte fisico usato nelle sessioni di stima. Tutti entrano in una stanza condivisa, il facilitatore presenta una user story, ogni partecipante sceglie una carta in privato e tutte le carte vengono rivelate insieme. Lo strumento mostra poi la dispersione dei voti, spesso con una media o una stima suggerita, e il team discute e, se serve, rivota.',
      paragraphs: [
        'I team che lavorano nello stesso luogo possono cavarsela con le carte fisiche. I team da remoto e ibridi no: votare in chat o togliendo il microfono uno alla volta reintroduce il bias di ancoraggio, cioè proprio il problema che [il metodo del planning poker](/blog/what-is-planning-poker) doveva eliminare. Se anche un solo membro del team partecipa alla pianificazione dello sprint in videochiamata, uno strumento dedicato vale i pochi minuti necessari a configurarlo.',
      ],
    },
    {
      title: 'La checklist dei criteri: cosa cercare in uno strumento gratuito di planning poker',
      content: 'Passa ogni strumento candidato attraverso questa lista. I primi quattro punti sono essenziali; gli altri dipendono da come lavora il tuo team.',
      items: [
        'Nessuna registrazione per i partecipanti. Gli ospiti dovrebbero entrare con un link o un codice stanza e un nome visualizzato. Se ogni sviluppatore deve creare un account, l’adozione cala e la prima sessione se ne va in configurazioni.',
        'Limiti di partecipanti. Verifica quante persone possono stare in una stanza con il piano gratuito e se quel numero copre la tua sessione più numerosa, spettatori come il Product Owner e gli stakeholder compresi.',
        'Tipi di mazzo. Il Fibonacci modificato è lo standard tra i [valori delle carte di planning poker](/planning-poker-cards), ma molti team usano le taglie T-shirt, le potenze di 2 o una sequenza personalizzata. Uno strumento che supporta un solo mazzo costringe il team ad adattarsi allo strumento invece del contrario.',
        'Voti nascosti e rivelazione simultanea. Su questo non si tratta. I voti devono restare invisibili a tutti finché il round non viene rivelato.',
        'Consenso e stima suggerita. Dopo la rivelazione, lo strumento dovrebbe mostrare chiaramente la distribuzione e, idealmente, evidenziare l’accordo o suggerire un valore, così il facilitatore non deve fare calcoli a mente.',
        'Chat di team. Utile per note a margine e link ai ticket, così il canale audio resta libero per la discussione.',
        'Coda di storie. Poter caricare un elenco di storie e scorrerle in ordine mantiene il ritmo della sessione e fa capire a tutti quanto manca.',
        'Timer condiviso. Un limite di tempo per storia visibile a tutti è uno dei modi più semplici per evitare che la sessione sfori.',
        'Cronologia dei round ed esportazione. Dovresti poter vedere i round precedenti e copiare i risultati, in CSV o simili, nel tuo strumento di backlog o nelle note dello sprint.',
        'Modalità spettatore. Product Owner, Scrum Master e stakeholder devono poter osservare senza avere una carta in mano.',
        'Privacy e gestione dei dati. Cosa viene salvato, per quanto tempo e dove. Le stanze che scadono e non richiedono dati personali sono più facili da far approvare negli ambienti regolamentati.',
        'Supporto mobile. Alcuni partecipanti voteranno dal telefono. La scelta della carta e la rivelazione dovrebbero funzionare sullo schermo di uno smartphone senza dover zoomare.',
        'Supporto linguistico. Per i team internazionali, un’interfaccia disponibile nella lingua di ciascun membro elimina un attrito piccolo ma reale.',
        'Self-hosting e open source. Se la tua organizzazione non può usare SaaS esterni, uno strumento open source da installare internamente può essere l’unica scelta praticabile. Ti permette anche di verificare esattamente cosa fa lo strumento con i tuoi dati.',
        'Proposte di upgrade e interruzioni. Uno strumento gratuito che interrompe la stima con pop-up o continui inviti a passare al piano a pagamento rallenterà la sessione e infastidirà il team.',
      ],
    },
    {
      title: 'Le categorie di strumenti di planning poker',
      content: 'Gli strumenti gratuiti di scrum poker rientrano in poche grandi categorie. Sapere quale fa al caso del tuo team restringe rapidamente la ricerca.',
      paragraphs: [
        'Gli strumenti autonomi basati sul browser sono i più comuni. Funzionano su un sito web, non richiedono installazioni e di solito permettono agli ospiti di entrare con un link. Sono adatti ai team che vogliono iniziare a stimare subito e non hanno bisogno che le stime vengano riscritte automaticamente in un sistema di ticketing. Il loro limite principale è che le stime vanno copiate a mano nel backlog, ed è per questo che una funzione di esportazione o copia è importante.',
        'I plugin e le integrazioni per gli strumenti di backlog vivono dentro Jira, Azure DevOps o sistemi simili. Il loro punto di forza è che storia e stima stanno nello stesso posto. I compromessi sono che di solito tutti hanno bisogno di una licenza e di un login per il sistema ospitante, che è più difficile includere spettatori esterni all’organizzazione e che i piani gratuiti delle app dei marketplace possono essere limitati o temporanei. Verifica i dettagli per la tua piattaforma prima di impegnarti.',
        'I mazzi di carte fisici funzionano ancora per i team che lavorano tutti nello stesso luogo. Costano poco, non richiedono configurazione e non pongono questioni di privacy. Non funzionano per i team ibridi, non lasciano cronologia e la «rivelazione» si basa sul fatto che nessuno sbirci.',
        'Gli strumenti open source ospitati in proprio sono una buona scelta quando i dati devono restare nella rete aziendale o quando il team vuole personalizzare lo strumento. Il costo è operativo: qualcuno deve installarlo, aggiornarlo e mantenerlo in funzione.',
      ],
    },
    {
      title: 'Come Scrum Poker Online risponde alla checklist',
      content: 'Scrum Poker Online (scrumpokerplay.com) è uno strumento di planning poker gratuito basato sul browser. Rispetto ai criteri qui sopra, ecco cosa offre, detto in modo diretto così puoi confrontarlo con qualunque altro strumento tu stia valutando.',
      items: [
        'Gratis e senza registrazione: il facilitatore crea una stanza, condivide un codice o un invito QR e i partecipanti entrano con un nome visualizzato. Non esistono account e non c’è nulla da pagare.',
        'Partecipanti: fino a 50 persone in una stanza, spettatori compresi.',
        'Mazzi: Scrum (0, ½, 1, 2, 3, 5, 8, 13, 20, 40, 100), Fibonacci, taglie T-shirt, potenze di 2 e mazzi personalizzati.',
        'Meccanica della rivelazione: i voti restano nascosti finché qualcuno nella stanza (o solo l’host, se è l’host a gestire i round) non rivela il round, dopo un conto alla rovescia di 3 secondi; la schermata dei risultati mostra la dispersione con un indicatore di consenso e una stima suggerita.',
        'Strumenti per la sessione: chat di team integrata, una coda di storie da riempire incollando o importando un file CSV (va bene un’esportazione da Jira o da un foglio di calcolo), un timer condiviso che conta in avanti o alla rovescia, modalità spettatore, reazioni emoji e un sollecito per avvisare un collega che non ha ancora votato.',
        'Strumenti dell’host: cambiare mazzo, rivelare automaticamente quando tutti hanno votato, voto anonimo, lasciare la gestione del round al solo host, chiudere la stanza ai nuovi arrivi, rimuovere persone, passare il ruolo di host e conservare una stanza, così il link, la configurazione e la coda di storie funzionano di nuovo allo sprint successivo.',
        'Ticket: le chiavi delle issue come PROJ-123 diventano link al tuo tracker una volta che l’host ne imposta l’indirizzo.',
        'Cronologia: cronologia dei round con la stima finale di ogni storia, scaricabile come file CSV con le colonne chiave della issue e story point, oppure copiabile come Markdown nelle note dello sprint.',
        'Mobile e lingue: funziona sullo schermo di uno smartphone ed è disponibile in 7 lingue.',
        'Privacy: niente account né indirizzi e-mail; il contenuto della stanza viene eliminato circa un’ora dopo che l’ultima persona è uscita, e una stanza conservata mantiene solo codice, nome, mazzo, impostazioni, coda di storie e stime finali.',
      ],
      paragraphs: [
        'Cosa non fa: non riscrive automaticamente le stime in un sistema di ticketing. Se il tuo team ha bisogno di quell’integrazione, un plugin per il tuo strumento di backlog potrebbe essere più adatto, oppure puoi combinare le due cose: stimi nel browser, scarichi il CSV e lo importi nel tracker. Inoltre è pensato solo per sessioni dal vivo: le stanze funzionano in tempo reale, quindi non si presta a votazioni distribuite nell’arco di una giornata.',
      ],
    },
    {
      title: 'Domande da porsi prima di scegliere',
      content: 'Queste domande fanno emergere i vincoli che gli elenchi di funzionalità tendono a nascondere. Rispondi insieme al tuo team prima di fare una sessione di prova.',
      items: [
        '1. Chi partecipa alle nostre sessioni? Conta sviluppatori, Product Owner, Scrum Master ed eventuali stakeholder abituali. Quello è il tuo numero minimo di partecipanti.',
        '2. Quale mazzo usiamo, ed è probabile che qualcuno ne voglia un altro? I team che stimano sia storie sia bug usano spesso due mazzi.',
        '3. Tutti devono già fare login da qualche parte? Se il team passa la giornata in un unico strumento di backlog, un plugin può essere naturale; se partecipano collaboratori esterni o team partner, uno strumento senza registrazione è più semplice.',
        '4. Dove devono finire le stime? Se la risposta è «nei ticket», verifica quanto è facile portarle lì.',
        '5. Quali sono le nostre regole su dati e privacy? Chiedi se il contenuto delle stanze viene salvato, per quanto tempo e se il fornitore può mostrartelo.',
        '6. Facciamo sessioni asincrone? Se sì, le stanze devono restare attive abbastanza a lungo da permettere di votare a chi è in altri fusi orari.',
        '7. Cosa succede se lo strumento ha una giornata storta? Verifica di poter ripiegare su qualcosa di semplice senza perdere la sessione.',
      ],
    },
    {
      title: 'Una sessione di valutazione di 15 minuti',
      content: 'Il modo più rapido per confrontare gli strumenti è [condurre una breve sessione di scrum poker](/guide) allo stesso modo con ciascuno. Non fidarti della pagina di marketing.',
      items: [
        'Crea una stanza e cronometra quanto tempo serve a tre persone per entrare da un link, una delle quali da telefono.',
        'Carica tre storie nella coda, tra cui una volutamente vaga.',
        'Vota la prima storia, rivela e verifica che nessun voto fosse visibile prima della rivelazione.',
        'Avvia il timer sulla seconda storia e verifica che tutti vedano lo stesso tempo.',
        'Fai usare a una persona la carta «?» sulla storia vaga e guarda come la presenta lo strumento.',
        'Aggiungi uno spettatore e verifica che non possa votare.',
        'Esporta o copia i risultati e incollali nel tuo strumento di backlog.',
        'Chiudi il browser, riapri il link della stanza e verifica che la sessione sia rimasta dove l’avevi lasciata.',
      ],
    },
    {
      title: 'Errori comuni nella scelta di uno strumento gratuito',
      content: 'Nella scelta di uno strumento di stima i team tendono a commettere sempre gli stessi pochi errori. Una volta individuati, è facile evitarli.',
      items: [
        'Scegliere in base al numero di funzionalità. Uno strumento con trenta funzionalità che nessuno capisce perde contro uno con otto che usano tutti.',
        'Trascurare l’esperienza di accesso. Se entrare in una stanza richiede più di un minuto, qualcuno tornerà a scrivere i numeri in chat.',
        'Non provare da telefono. Prima o poi almeno un partecipante per sessione sarà da mobile.',
        'Dimenticare la cronologia. Senza esportazione, ogni sessione finisce con qualcuno che ricopia le stime a mano, e gli errori si insinuano.',
        'Dare per scontato che il piano gratuito sia permanente. Se il modello di business di un fornitore dipende dal convincerti a passare a un piano a pagamento, preparati a quella conversazione prima che arrivi.',
        'Lasciare che lo strumento detti il processo. Lo strumento dovrebbe supportare il modo in cui il tuo team stima (voti nascosti, discussione, nuova votazione), non sostituirlo con un flusso di lavoro diverso.',
      ],
    },
    {
      title: 'In conclusione',
      content: 'Non esiste un unico miglior strumento gratuito di scrum poker per tutti i team, ma esiste il migliore per il tuo: quello che soddisfa i criteri essenziali, si adatta al modo in cui il tuo team lavora davvero e che tutti apriranno senza bisogno di promemoria. Usa la checklist, fai la valutazione di 15 minuti con due o tre candidati e decidi insieme al team. Se vuoi un punto di partenza, Scrum Poker Online è gratuito, non richiede registrazione e copre gli elementi essenziali visti sopra: [apri una stanza gratuita](/) con il tuo team e verifica se fa al caso tuo.',
    },
  ],
  faq: [
    {
      q: 'Esiste uno strumento di planning poker completamente gratuito e senza registrazione?',
      a: 'Sì. Diversi strumenti basati sul browser permettono al facilitatore di creare una stanza e condividere un link, così i partecipanti entrano solo con un nome visualizzato. Scrum Poker Online è un esempio: è gratuito, non usa account e ogni funzionalità è inclusa.',
    },
    {
      q: 'Che differenza c’è tra gli strumenti di scrum poker e quelli di planning poker?',
      a: 'In pratica nessuna. «Planning poker» è il nome originale della tecnica di stima; «scrum poker» è il nome che le danno molti team Scrum. Gli strumenti che usano l’uno o l’altro nome fanno la stessa cosa: voto privato sulla dimensione delle storie con rivelazione simultanea.',
    },
    {
      q: 'Serve un’integrazione con Jira o Azure DevOps per il planning poker?',
      a: 'Solo se per te è importante che le stime vengano riscritte automaticamente nei ticket e se tutti i partecipanti alla sessione hanno già accesso a quel sistema. Molti team stimano in uno strumento autonomo nel browser e poi copiano i risultati nel backlog: ci vuole un minuto e la sessione resta aperta agli ospiti.',
    },
    {
      q: 'Quante persone possono entrare in una stanza gratuita di scrum poker?',
      a: 'Dipende dallo strumento, quindi confronta i limiti del piano gratuito con la tua sessione più numerosa. Scrum Poker Online permette fino a 50 partecipanti in una stanza senza costi, abbastanza per la maggior parte dei team Scrum con posto anche per gli spettatori. L’host può conservare una stanza, così lo stesso link e la stessa configurazione funzionano di nuovo allo sprint successivo.',
    },
    {
      q: 'Si possono usare gli strumenti di planning poker in modo asincrono tra fusi orari diversi?',
      a: 'Alcuni strumenti lo supportano, purché le stanze restino attive abbastanza a lungo da permettere a tutti di votare e nessuno riveli in anticipo. Scrum Poker Online, invece, è pensato per le sessioni dal vivo: chi si disconnette esce dalla stanza dopo circa 90 secondi e una stanza vuota viene eliminata dopo circa un’ora. Tra fusi orari diversi, usa una fascia oraria comune, anche breve, e prepara le storie per iscritto in anticipo.',
    },
  ],
};

export default it;
