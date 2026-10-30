import type { LegalContent } from '@/app/ContentPage';

const it: LegalContent = {
  title: 'Informativa sulla privacy',
  updated: 'Ultimo aggiornamento: 30 ottobre 2026',
  intro: 'La presente informativa spiega quali dati tratta Scrum Poker Online (scrumpokerplay.com, «il Servizio»), per quali finalità, per quanto tempo e con chi. Il Servizio è gestito da Mert Gündoğan, un privato residente in Turchia («noi»), che è il titolare dei trattamenti qui descritti. Contatto: contact@scrumpokerplay.com. Poiché il Servizio è offerto anche a persone che si trovano nell’UE/SEE, gli si applica il Regolamento generale sulla protezione dei dati (GDPR, art. 3, par. 2), così come la normativa turca sulla protezione dei dati (KVKK, sezione 8). Il Servizio non prevede account utente. I nostri Termini di servizio sono disponibili all’indirizzo https://www.scrumpokerplay.com/it/terms.',
  sections: [
    {
      title: '1. Dati che trattiamo',
      items: [
        'Non esistono account: non chiediamo alcun indirizzo e-mail né alcuna password, e non è previsto alcun tipo di accesso.',
        'In una stanza: il nome visualizzato da Lei scelto (non deve essere necessariamente il Suo vero nome), un avatar emoji facoltativo, un identificativo casuale generato dal Suo browser e i contenuti della stanza – nome della stanza, storie, voti e cronologia dei round, stime finali, messaggi in chat (gli ultimi 30 di ogni stanza) e timer condiviso.',
        'Che cosa vedono gli altri nella stanza: tutti i presenti nella stanza vedono il Suo nome, il Suo avatar, se ha votato, se sta solo osservando o è assente, i Suoi messaggi in chat e i Suoi voti una volta rivelati. La cronologia dei round (la storia di ogni round e, se la stanza non è anonima, chi ha votato cosa) e gli ultimi 30 messaggi in chat sono mostrati anche a chi entra in seguito, finché la stanza esiste, e chiunque si trovi nella stanza può scaricare o copiare la cronologia dei round, compresi nomi e voti, in formato CSV o Markdown – non abbiamo alcun controllo su tali copie. Nelle stanze anonime le carte rivelate sono mostrate e conservate senza nomi. Le reazioni emoji e i solleciti (un sollecito mostra il Suo nome alla persona sollecitata) sono mostrati in diretta e non vengono mai memorizzati. La stanza memorizza inoltre gli identificativi casuali dell’host, delle persone rimosse dall’host e dei proprietari di una stanza conservata.',
        'Stanze conservate: se l’host conserva una stanza, salviamo il codice, il nome, il mazzo (comprese le carte personalizzate) e le impostazioni della stanza (rivelazione automatica, voto anonimo, round gestito solo dall’host, reazioni attive o disattivate e lo schema di indirizzo per i link ai ticket inserito dall’host), la sua coda di storie, i risultati dei suoi ultimi round, fino a 50 (per ciascuno, solo il testo della storia, la stima concordata e il momento in cui il round è terminato – nessun nome, nessun voto individuale), un hash SHA-256 della sua chiave di proprietario (mai la chiave stessa) e la data in cui è stata conservata. Di norma queste informazioni non contengono dati personali, a meno che qualcuno non li inserisca nel nome della stanza o nelle storie, e non colleghiamo una stanza conservata ad alcuna persona.',
        'Indirizzo IP: utilizziamo il Suo indirizzo IP per limitare gli abusi (limitazione della frequenza delle richieste e del numero di stanze e connessioni che uno stesso indirizzo può tenere aperte). Queste registrazioni sono conservate solo nella memoria del server e non vengono mai scritte nel database né nei suoi backup. Il Suo indirizzo IP compare inoltre nel log degli accessi del reverse proxy (v. Log).',
        'Log: i log dell’applicazione registrano eventi (la creazione di una stanza, l’ingresso o la rimozione di una persona) con il codice della stanza e l’identificativo casuale, ma non gli indirizzi IP né i contenuti delle stanze. Il reverse proxy posto davanti all’applicazione (Caddy, eseguito dal nostro strumento di deployment sullo stesso server) registra ogni richiesta: ora, host, metodo, percorso senza la stringa di query, codice di stato, durata, dimensione e il Suo indirizzo IP.',
        'Statistiche di visita: lo script di Cloudflare Web Analytics (static.cloudflareinsights.com) invia a Cloudflare l’indirizzo della pagina, la pagina di provenienza, il tipo di browser e i tempi di caricamento della pagina; con questa richiesta Cloudflare riceve il Suo indirizzo IP. Lo script non imposta alcun cookie e non memorizza nulla sul Suo dispositivo; noi vediamo solo dati aggregati (pagine, Paesi, browser) e non viene creato alcun profilo che La riguardi.',
        'E-mail: se scrive a contact@scrumpokerplay.com, Cloudflare Email Routing inoltra il Suo messaggio alla nostra casella di posta su Microsoft Outlook (Microsoft Corporation, USA), che Microsoft fornisce secondo le proprie condizioni in qualità di autonomo titolare del trattamento, e non per nostro conto. Trattiamo il Suo indirizzo e-mail e il Suo messaggio esclusivamente per risponderLe.',
      ],
    },
    {
      title: '2. Sul Suo dispositivo',
      items: [
        'Cookie: noi impostiamo un solo tipo di cookie, ossia, per ogni stanza in cui entra, un cookie di stanza firmato. Viene inviato solo all’API di quella stanza e contiene il Suo identificativo casuale, il codice della stanza e una scadenza; è valido 2 ore e viene rinnovato mentre utilizza la stanza. Inoltre, la protezione dai bot di Cloudflare può eseguire nel Suo browser un breve controllo automatico e impostare per scrumpokerplay.com cookie di sicurezza, come cf_clearance (valido fino a un anno), utilizzati solo per distinguere i browser dal traffico automatizzato. Cloudflare può anche chiedere al Suo browser di segnalarle gli errori di rete (Network Error Logging); il Suo browser conserva questa istruzione per un massimo di 7 giorni. Non impostiamo altri cookie.',
        'Questi cookie e l’archiviazione nel browser descritta di seguito sono strettamente necessari per fornire il Servizio da Lei richiesto, per mantenerlo sicuro o per ricordare le impostazioni da Lei scelte, e quindi non richiedono consenso (art. 5, par. 3, della direttiva ePrivacy; in Germania § 25, comma 2, n. 2, TDDDG). Per questo non è previsto alcun banner dei cookie.',
        'Archiviazione locale del browser: la Sua lingua, se ne ha scelta una; le Sue impostazioni di tema e suoni; il Suo nome visualizzato, il Suo avatar e il Suo identificativo casuale; fino a 5 stanze aperte di recente (codice, nome e momento dell’apertura); le chiavi di proprietario, i codici e i nomi di un massimo di 50 stanze conservate in questo browser; se ha chiuso il suggerimento della stanza; e, per ogni stanza, un breve elenco delle Sue schede aperte, affinché la chiusura di una scheda non La faccia uscire dalla stanza.',
        'Archiviazione di sessione: la lingua dell’ultima pagina che ha letto, affinché una stanza aperta da lì si avvii in quella lingua; una nota che indica che questa scheda è già stata indirizzata una volta alla lingua del Suo browser; e, solo per un istante mentre viene aperto un link di proprietario, la relativa chiave di proprietario.',
        'Uso offline: il service worker memorizza nel Suo browser pagine (mai le pagine delle stanze) e file statici, affinché il sito funzioni anche offline.',
        'L’archiviazione locale e i file del service worker restano sul Suo dispositivo finché non cancella i dati del sito nel Suo browser; l’archiviazione di sessione viene cancellata alla chiusura della scheda, e l’elenco delle schede di una stanza alla chiusura della sua ultima scheda. Nome, avatar e identificativo ci vengono inviati solo quando crea una stanza o vi entra (l’identificativo anche all’interno del cookie di stanza, a ogni azione in quella stanza), e una chiave di proprietario solo per dimostrare che una stanza conservata Le appartiene.',
      ],
    },
    {
      title: '3. Perché trattiamo i dati (basi giuridiche)',
      items: [
        'Per fornire il Servizio da Lei richiesto – stanze e stanze conservate: esecuzione di un contratto (art. 6, par. 1, lett. b) del GDPR).',
        'Dati necessari: per partecipare a una stanza Le occorre un nome visualizzato (un nome qualsiasi; non deve essere necessariamente il Suo vero nome), e il Suo browser ha bisogno dell’identificativo casuale e del cookie di stanza. Senza di essi la stanza non può funzionare. Non è richiesto nient’altro.',
        'Per mantenere il Servizio sicuro e disponibile – limitazione della frequenza delle richieste, protezione da abusi e bot, log e backup: nostro legittimo interesse a un servizio che funzioni e non venga usato in modo abusivo (art. 6, par. 1, lett. f) del GDPR).',
        'Statistiche di visita, per capire quali pagine vengono utilizzate: nostro legittimo interesse (art. 6, par. 1, lett. f) del GDPR); non viene creato alcun profilo che La riguardi.',
        'Rispondere alle Sue e-mail: nostro legittimo interesse (art. 6, par. 1, lett. f) del GDPR).',
        'Non adottiamo decisioni basate unicamente su un trattamento automatizzato che producano effetti giuridici che La riguardano o che incidano in modo analogo significativamente sulla Sua persona (art. 22 del GDPR); i limiti automatici alle richieste si limitano a ritardare o rifiutare le richieste eccessive.',
      ],
    },
    {
      title: '4. Per quanto tempo conserviamo i dati',
      items: [
        'Contenuti della stanza (nomi, avatar, identificativi, storie, voti e cronologia dei round, stime finali, chat, timer, nonché gli identificativi delle persone rimosse e dei proprietari): eliminati circa un’ora dopo che la stanza si è svuotata, oppure dopo circa dieci minuti se nella stanza non è mai stato fatto nulla. Il registro delle modifiche del database su disco può contenerli ancora fino alla sua successiva compattazione, al più tardi prima del backup giornaliero successivo. Di ogni stanza vengono conservati, in qualsiasi momento, solo gli ultimi 30 messaggi della chat.',
        'Stanze conservate: finché il proprietario non smette di conservarle, oppure automaticamente 180 giorni dopo l’ultima volta in cui il proprietario vi è tornato con il link di proprietario – oppure 30 giorni dopo la conservazione della stanza, se il proprietario non vi torna mai con tale link; l’apertura della stanza da parte di altre persone non prolunga questo periodo. Una stanza conservata può anche essere rimossa prima, ad esempio se il server esaurisce la memoria.',
        'Indirizzi IP per la limitazione delle richieste: solo nella memoria del server; vengono rimossi allo scadere della relativa finestra temporale (di norma entro circa un’ora dall’ultima richiesta) e a ogni riavvio dell’applicazione. Quale indirizzo ha aperto una stanza ancora attiva: in memoria fino all’eliminazione di quella stanza. Il numero di connessioni aperte per indirizzo: solo finché le connessioni restano aperte.',
        'Log: i log dell’applicazione vengono ruotati in base alla dimensione – sono conservati al massimo cinque file da 10 MB ciascuno e il più vecchio viene sovrascritto; quando l’applicazione viene ridistribuita, una copia delle ultime righe dell’istanza sostituita (fino a 2.000 righe) viene conservata per 14 giorni. Il log degli accessi del reverse proxy è conservato in file limitati a 3 × 10 MB, e il più vecchio viene sovrascritto; conteggi aggregati al minuto, senza indirizzi IP, vengono conservati per 7 giorni.',
        'E-mail: conservate per il tempo necessario a risponderLe e a gestire l’eventuale seguito, di norma non oltre 12 mesi dalla fine della nostra corrispondenza, salvo che siano necessarie per l’accertamento, l’esercizio o la difesa di un diritto in sede giudiziaria.',
        'Backup: il database viene sottoposto a backup una volta al giorno e ogni backup viene conservato per 7 giorni sullo stesso server. Prima di ogni backup il registro delle modifiche del database viene compattato, così che un backup contenga ciò che si trovava nel database in quel momento. I contenuti delle stanze, la chat e le stanze conservate presenti al momento del backup possono quindi rimanere in un backup per un massimo di ulteriori 7 giorni. I backup sono utilizzati esclusivamente per ripristinare il Servizio dopo un guasto.',
      ],
    },
    {
      title: '5. Dove sono conservati i dati e quali fornitori sono coinvolti',
      items: [
        'Tutto ciò che il Servizio conserva – un unico database Redis, i relativi backup e i log – si trova sul nostro server presso Hetzner, nel suo data center di Helsinki (Finlandia). Le e-mail che ci vengono inviate sono conservate nella nostra casella di posta su Microsoft Outlook.',
        'Hetzner Online GmbH (Germania): il nostro server, con il database, i relativi backup e i log, nel suo data center di Helsinki (Finlandia).',
        'Cloudflare, Inc. (USA): tutto il traffico passa attraverso la rete di Cloudflare – di norma il data center più vicino a Lei, che può trovarsi al di fuori dell’UE – per il DNS, la cifratura (TLS), la protezione da bot e attacchi, l’inoltro delle e-mail e Web Analytics. Poiché Cloudflare termina la connessione cifrata, tratta per nostro conto tutto il traffico, compresi gli indirizzi IP e i contenuti delle stanze in transito; non conserva i contenuti delle stanze.',
        'Microsoft Corporation (USA): fornisce, secondo le proprie condizioni, la nostra casella di posta su Microsoft Outlook, che riceve i messaggi inviati a contact@scrumpokerplay.com; per questa casella di posta Microsoft è autonomo titolare del trattamento e non un responsabile del trattamento che agisce per nostro conto.',
        'Trasferimenti al di fuori dell’UE: Cloudflare e Microsoft sono certificate ai sensi del quadro UE-USA per la protezione dei dati personali (EU-U.S. Data Privacy Framework) (https://www.dataprivacyframework.gov); l’accordo sul trattamento dei dati di Cloudflare (Data Processing Addendum), che comprende le clausole contrattuali tipo dell’UE, è disponibile all’indirizzo https://www.cloudflare.com/cloudflare-customer-dpa/. Gestiamo il Servizio dalla Turchia, per la quale non esiste una decisione di adeguatezza dell’UE; quando amministriamo il server, accediamo ai dati da lì. Hetzner e Cloudflare trattano i dati esclusivamente per nostro conto, per fornirci il proprio servizio.',
      ],
    },
    {
      title: '6. I Suoi diritti',
      items: [
        'Può chiedere di accedere ai Suoi dati personali, di rettificarli, esportarli o cancellarli, di limitarne il trattamento, nonché di sapere a chi sono stati comunicati (artt. 15–20 del GDPR). Scriva a contact@scrumpokerplay.com: risponderemo entro un mese (art. 12, par. 3, del GDPR; per le richieste complesse il termine può essere prorogato di altri due mesi, e in tal caso La informeremo). Poiché non esistono account e i dati di una stanza vengono eliminati circa un’ora dopo che si è svuotata, di solito non conserviamo nulla che possiamo collegare a Lei; ci indichi il codice della stanza, quando l’ha utilizzata, anche in modo approssimativo, e il Suo nome visualizzato.',
        'Ha inoltre il diritto di proporre reclamo a un’autorità di controllo, in particolare nel Paese dell’UE/SEE in cui risiede o lavora.',
      ],
    },
    {
      title: '7. Il Suo diritto di opposizione',
      content: 'Può opporsi in qualsiasi momento, per motivi connessi alla Sua situazione particolare, ai trattamenti basati sui nostri legittimi interessi (sicurezza, limitazione della frequenza delle richieste e protezione dai bot, log e backup, statistiche di visita, risposta alle e-mail) (art. 21 del GDPR). Scriva a contact@scrumpokerplay.com; interromperemo quindi tali trattamenti, salvo che abbiamo motivi legittimi cogenti che prevalgano sui Suoi interessi, diritti e libertà, oppure che i trattamenti siano necessari per l’accertamento, l’esercizio o la difesa di un diritto in sede giudiziaria.',
    },
    {
      title: '8. Diritto turco (KVKK)',
      items: [
        'Poiché abbiamo sede in Turchia, si applica anche la Legge n. 6698 sulla protezione dei dati personali (KVKK). In qualità di titolare del trattamento, La informiamo con la presente informativa, come richiesto dall’art. 10 della KVKK.',
        'Raccogliamo i dati qui descritti in modalità elettronica tramite il sito web, per le finalità indicate nella sezione 3 (art. 5, comma 2, lett. c) della KVKK: necessità per un contratto, e lett. f): nostri legittimi interessi). I dati sono trasferiti all’estero a Hetzner (Germania; server in Finlandia), Cloudflare e Microsoft (USA), come descritto nella sezione 5.',
        'Le spettano i diritti di cui all’art. 11 della KVKK: sapere se i Suoi dati sono trattati, richiedere informazioni al riguardo, conoscere la finalità del trattamento e se i dati sono utilizzati in modo conforme a essa, conoscere i destinatari in Turchia o all’estero, chiedere la rettifica o la cancellazione e che ne siano informati i destinatari, opporsi a un risultato a Lei sfavorevole derivante unicamente da un’analisi automatizzata e chiedere il risarcimento del danno causato da un trattamento illecito. Scriva a contact@scrumpokerplay.com; risponderemo entro 30 giorni al massimo (art. 13 della KVKK).',
        'Se respingiamo la Sua richiesta, non rispondiamo in tempo o Lei ritiene insufficiente la nostra risposta, può anche presentare reclamo al Comitato per la protezione dei dati personali (Kişisel Verileri Koruma Kurulu) (art. 14 della KVKK).',
      ],
    },
    {
      title: '9. Sicurezza',
      content: 'Adottiamo misure tecniche ragionevoli per proteggere i dati. Ad esempio, le connessioni sono cifrate (TLS), le chiavi di proprietario delle stanze conservate sono memorizzate solo sotto forma di hash, i cookie di stanza sono firmati e HttpOnly (non leggibili dagli script) e il database non è raggiungibile da Internet. Nessun sistema è completamente sicuro e non possiamo garantire la sicurezza. In caso di violazione dei dati, agiremo come previsto dalla legge.',
    },
    {
      title: '10. Minori',
      content: 'Il Servizio non è rivolto a minori di 16 anni e non raccogliamo consapevolmente i loro dati. Se ritiene che conserviamo dati relativi a un minore, ci contatti affinché possiamo eliminarli.',
    },
    {
      title: '11. Modifiche',
      content: 'Possiamo modificare la presente informativa. La versione vigente, con la relativa data, è sempre su questa pagina. Poiché non esistono account, non avvisiamo nessuno individualmente. Domande: contact@scrumpokerplay.com.',
    },
  ],
};

export default it;
