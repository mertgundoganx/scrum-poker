import type { Localized } from '../articleTypes';

const it: Localized = {
  title: 'Cos’è il planning poker? Guida completa alla stima agile',
  subtitle: 'Cos’è il planning poker, da dove viene, come funziona una sessione passo per passo, quali carte usare e gli errori che rovinano in silenzio le tue stime.',
  sections: [
    {
      title: 'Cos’è il planning poker? (Definizione)',
      content: 'Il planning poker è una tecnica di stima basata sul consenso e organizzata come un gioco, che i team agili usano per dimensionare gli elementi del backlog come le user story. Ogni partecipante sceglie in privato una carta che rappresenta la propria stima, tutti la rivelano nello stesso momento e il team discute le differenze finché non concorda su un unico valore. Il numero sulla carta di solito è uno story point, non un numero di ore.',
      paragraphs: [
        'La caratteristica distintiva è la rivelazione simultanea. Quando le persone dicono le proprie stime ad alta voce una dopo l’altra, il primo numero fa da àncora a tutti quelli che seguono. Nascondere le carte fino alla rivelazione elimina quell’àncora, così il team vede cosa pensa davvero ciascuno prima che inizi qualsiasi discussione.',
        'La seconda caratteristica distintiva è che il disaccordo viene trattato come un’informazione. Se uno sviluppatore mostra un 3 e un altro un 13, due persone hanno in mente quadri molto diversi della stessa storia, ed è da quella conversazione che arriva gran parte del valore.',
      ],
    },
    {
      title: 'Planning poker e scrum poker: c’è differenza?',
      content: 'No. Planning poker e scrum poker sono due nomi della stessa tecnica. «Planning poker» è il nome originale, dall’articolo di James Grenning del 2002 e dal libro di Mike Cohn, mentre «scrum poker» si è diffuso perché la maggior parte dei team che lo usano lavora con Scrum e stima durante il refinement del backlog o la pianificazione dello sprint. «Pointing poker» ed «estimation poker» significano la stessa cosa, e nessuno di questi nomi è legato a Scrum: i team Kanban e quelli che non sviluppano software lo usano altrettanto bene.',
    },
    {
      title: 'Da dove viene il planning poker? Grenning, Cohn e Wideband Delphi',
      content: 'Il planning poker è stato descritto per la prima volta da James Grenning nel 2002, in un breve articolo scritto per i team di Extreme Programming che perdevano ore nelle discussioni sulla pianificazione dei rilasci. Il suo obiettivo era evitare la «paralisi da analisi»: far sentire in fretta ogni voce, impedire alla persona più rumorosa di decidere il numero e andare avanti.',
      paragraphs: [
        'La tecnica si è diffusa quando Mike Cohn l’ha inclusa in «Agile Estimating and Planning» (2005). La versione di Cohn ha reso popolare il mazzo di Fibonacci modificato (0, 1, 2, 3, 5, 8, 13, 20, 40, 100) che la maggior parte dei team usa ancora oggi.',
        'L’antenato intellettuale è il metodo Delphi, sviluppato alla RAND Corporation, e la sua variante per la stima del software, il Wideband Delphi: gli esperti stimano in modo indipendente, i risultati vengono condivisi, il gruppo discute e il ciclo si ripete finché le stime non convergono. Il planning poker mantiene questa struttura ma la comprime in pochi minuti per elemento e aggiunge un mazzo di carte.',
      ],
    },
    {
      title: 'Come funziona una sessione di planning poker? Passo per passo',
      content: 'Una sessione tipica coinvolge il team di sviluppo, il Product Owner e di solito uno Scrum Master o un facilitatore. Si svolge così:',
      items: [
        '1. Scegli una storia di riferimento. Prima della sessione, concorda con il team una o due storie completate di recente con dimensioni note (per esempio «il flusso di reset della password era un 3»). Ogni stima è relativa a questi riferimenti.',
        '2. Il Product Owner presenta un elemento del backlog: la user story, i criteri di accettazione e gli eventuali vincoli noti. L’obiettivo è una comprensione condivisa di cosa significhi «fatto», non un progetto tecnico.',
        '3. Il team fa domande di chiarimento, con un limite di due o tre minuti.',
        '4. Ognuno sceglie una carta in privato, confrontando la storia con quelle di riferimento e tenendo conto di impegno, complessità, incertezza e rischio.',
        '5. Tutte le carte vengono rivelate nello stesso momento. In uno strumento online, qualcuno (di solito il facilitatore) fa clic su «Rivela i voti» quando tutti hanno votato.',
        '6. Se le stime concordano, registra il valore e passa oltre. Stime a una carta di distanza (un 5 e un 8) di solito contano come accordo.',
        '7. Se divergono, chi ha stimato più alto e chi più basso spiegano il proprio ragionamento. Nessuno litiga: lo scopo è far emergere ciò che una persona sa e le altre no.',
        '8. Si vota di nuovo. La maggior parte delle storie converge entro due round. Se dopo tre round una storia divide ancora il team, di solito va divisa in storie più piccole o approfondita con uno spike.',
      ],
    },
    {
      title: 'Cosa significano le carte del planning poker?',
      content: 'Il mazzo più comune è la [sequenza di Fibonacci modificata](/fibonacci-planning-poker): 0, 1, 2, 3, 5, 8, 13, 20, 40, 100. I numeri sono volutamente sempre più distanziati man mano che crescono. Nessuno sa distinguere onestamente una storia da 20 punti da una da 21, quindi la carta 21 non esiste e il mazzo salta a 40. Più la storia è grande, meno la stima può essere precisa, e il mazzo lo esprime.',
      paragraphs: [
        'La spiegazione abituale degli intervalli crescenti è la legge di Weber-Fechner: le persone percepiscono le differenze in proporzione alla grandezza di ciò che confrontano. Un punto di distanza tra 1 e 2 è evidente; la stessa distanza tra 40 e 41 è impercettibile. Una scala i cui passi crescono più o meno in proporzione corrisponde a come chi stima percepisce davvero le dimensioni.',
        'La maggior parte dei mazzi include anche [carte speciali](/planning-poker-cards). «?» significa «non capisco questa storia abbastanza bene da stimarla», il simbolo dell’infinito significa «è troppo grande e va divisa» e la tazza di caffè significa «ho bisogno di una pausa». La carta 0 è per gli elementi banalmente piccoli e va usata con parsimonia. Le alternative a Fibonacci includono le [taglie T-shirt](/t-shirt-sizing) (da XS a XL), le potenze di 2 (1, 2, 4, 8, 16, 32) e i mazzi personalizzati; la scelta conta meno dell’usare sempre lo stesso mazzo in modo coerente.',
      ],
    },
    {
      title: 'Perché il planning poker produce stime migliori?',
      content: 'Il planning poker funziona non perché le carte siano magiche, ma perché il formato contrasta diversi errori ben noti delle decisioni di gruppo:',
      items: [
        'Elimina l’ancoraggio. Poiché le carte restano nascoste fino alla rivelazione, il primo numero pronunciato non può trascinare gli altri verso di sé. È il motivo principale per cui i team adottano la tecnica.',
        'Obbliga a partecipare. Ogni persona che stima deve mettere giù una carta, quindi anche i membri più silenziosi del team devono impegnarsi su un numero.',
        'Fa emergere le ipotesi nascoste. Una dispersione ampia significa quasi sempre che qualcuno sa qualcosa che gli altri non sanno: una dipendenza, un modulo fragile, una funzione già esistente che rende il lavoro banale.',
        'Stima in modo relativo, non assoluto. «È più grande della storia del reset della password?» è una domanda a cui è molto più facile rispondere bene che «quante ore ci vorranno?».',
      ],
    },
    {
      title: 'Un esempio svolto: stimare tre storie',
      content: 'Supponi che un team abbia concordato che «Aggiungere un link “password dimenticata” che invia via e-mail un token di reset» è un 3 di riferimento e che «Costruire la dashboard di reportistica per gli amministratori» era un 13. Il Product Owner porta al refinement tre nuove storie.',
      paragraphs: [
        'Storia A: «Mostrare un messaggio di conferma dopo che l’utente ha salvato il profilo». Tutti rivelano 1 o 2: segue uno schema di interfaccia già esistente. Il team registra 2 e passa oltre in meno di un minuto.',
        'Storia B: «Permettere agli utenti di esportare lo storico degli ordini in CSV». Escono 3, 5, 5, 8, 13. Chi ha votato 13 spiega che lo storico degli ordini è distribuito su due servizi e che l’esportazione va paginata per gli account grandi. Chi ha votato 3 ammette di aver presupposto una sola tabella. Alla nuova votazione le carte sono 8, 8, 8, 5, 8 e il team registra 8.',
        'Storia C: «Integrare il nuovo fornitore di pagamenti». Metà del team gioca «?», l’altra metà 40 o infinito. Nessuno ha visto la documentazione del fornitore. Il team non forza un numero: crea un breve spike per leggere la documentazione e rifà la stima la settimana dopo. Una sessione ben condotta spende i suoi minuti dove c’è disaccordo.',
      ],
    },
    {
      title: 'Planning poker e altre tecniche di stima agile',
      content: 'Il planning poker non è l’unico modo per dimensionare un backlog. Ecco come si confronta con le alternative più comuni:',
      items: [
        'Stima dell’esperto o top-down (un lead assegna i numeri): veloce, ma cattura le conoscenze di una sola persona, tende all’ottimismo e il team non sente la stima come propria.',
        'Taglie T-shirt (da XS a XL): più veloci e meno intimidatorie, adatte a un primo passaggio su un backlog grande o a partecipanti non tecnici, ma meno granulari e non sommabili direttamente per la velocity. Molti team dimensionano all’inizio con le T-shirt e passano al planning poker per gli elementi a livello di sprint.',
        'Stima per affinità o bucket system: il team ordina in silenzio decine di storie in categorie di dimensione, poi discute. Ottima per dimensionare un intero backlog in una sessione; meno efficace su una singola storia complicata.',
        'Stima in ore: sembra precisa ma è fragile, perché dipende da chi fa il lavoro. La maggior parte dei team agili stima in punti e ricava le previsioni temporali dalla velocity.',
      ],
    },
    {
      title: 'Errori comuni nel planning poker (e come correggerli)',
      content: 'La maggior parte delle lamentele sul planning poker risale a pochi errori evitabili:',
      items: [
        'Stimare in ore con le carte dei punti. Se il team associa in segreto 5 punti a 5 ore, i vantaggi della stima relativa svaniscono. Soluzione: confrontati sempre con la storia di riferimento, mai con l’orologio.',
        'Saltare la discussione. Limitarsi a fare la media delle carte significa perdere il senso dell’esercizio: il valore sta nella conversazione tra chi ha stimato più alto e chi più basso. Soluzione: i valori anomali parlano prima di ogni nuova votazione.',
        'Lasciar parlare per prima una persona senior. Se il tech lead annuncia «è ovviamente un 3» prima del voto, la rivelazione perde senso. Soluzione: nessuno pronuncia numeri finché le carte non sono scoperte.',
        'Non avere una storia di riferimento. Senza una base condivisa, ognuno ha la propria scala privata. Soluzione: tieni in vista durante la sessione una o due storie completate e ben comprese.',
        'Trattare la stima come un impegno. Gli story point descrivono una dimensione, non una promessa. I team puniti per aver «mancato» i propri punti imparano a gonfiarli e i numeri smettono di significare qualcosa.',
      ],
    },
    {
      title: 'Quando usare il planning poker e quando no',
      content: 'Il planning poker è lo strumento giusto quando la stima trae vantaggio da più punti di vista e una stima sbagliata ha un costo reale. Non è lo strumento giusto per tutto.',
      items: [
        'Usalo per il refinement del backlog e la pianificazione dello sprint, quando ogni storia che entrerà nei prossimi uno o due sprint ha bisogno di una dimensione.',
        'Usalo quando le conoscenze sono distribuite in un team cross-funzionale: front-end, back-end, QA e operations vedono spesso rischi diversi nella stessa storia.',
        'Evitalo per un primo passaggio su un backlog di cento elementi: ordinali prima a grandi linee con le taglie T-shirt, poi usa il poker per gli elementi in cima.',
        'Evitalo per le storie che non sono pronte. Prima serve uno spike o una conversazione con il Product Owner.',
      ],
    },
    {
      title: 'Planning poker con un team da remoto o ibrido',
      content: 'Le carte fisiche non funzionano in videochiamata, quindi i team da remoto usano uno strumento online. L’essenziale è semplice: voto privato, un’unica rivelazione simultanea, una vista condivisa dei risultati e un mazzo a cui il team è abituato.',
      paragraphs: [
        'Scrum Poker Online è un’opzione gratuita costruita proprio intorno a questo flusso: [crea una stanza gratuita](/), condividi il link e fino a 50 partecipanti possono votare senza registrarsi. Supporta i mazzi Scrum, Fibonacci, T-shirt, potenze di 2 e personalizzati, così un team può mantenere la scala che usa già. Qualunque sia lo strumento, le regole della facilitazione non cambiano.',
      ],
    },
  ],
  faq: [
    {
      q: 'Il planning poker è la stessa cosa dello scrum poker?',
      a: 'Sì. Sono due nomi della stessa tecnica di stima. «Planning poker» è il nome originale; «scrum poker» riflette semplicemente il fatto che la maggior parte dei team che lo usano lavora con Scrum.',
    },
    {
      q: 'Perché il planning poker usa la sequenza di Fibonacci?',
      a: 'Perché gli intervalli tra i numeri crescono man mano che i numeri crescono, e questo corrisponde a come le persone percepiscono le dimensioni: è facile distinguere un 2 da un 3, ma nessuno sa distinguere in modo affidabile un 20 da un 21. Il mazzo modificato reso popolare da Mike Cohn arrotonda i valori più alti per lo stesso motivo.',
    },
    {
      q: 'Chi dovrebbe partecipare al planning poker?',
      a: 'Tutti quelli che faranno il lavoro: sviluppatori, tester e chiunque altro faccia parte del team di consegna. Il Product Owner presenta le storie e risponde alle domande ma non vota; i manager possono osservare ma non dovrebbero avere carte.',
    },
    {
      q: 'Quanto dovrebbe durare una sessione di planning poker?',
      a: 'Punta a pochi minuti per storia e a non più di una o due ore per sessione. Se una singola storia richiede molto di più, di solito va divisa o chiarita invece che discussa ancora.',
    },
    {
      q: 'Cosa significano le carte «?» e infinito?',
      a: 'La carta «?» significa che chi stima non capisce la storia abbastanza bene da dimensionarla. La carta infinito significa che la storia è troppo grande da stimare e va scomposta. Entrambe sono segnali per smettere di votare e raffinare la storia.',
    },
  ],
};

export default it;
