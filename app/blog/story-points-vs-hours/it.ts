import type { Localized } from '../articleTypes';

const it: Localized = {
  title: 'Story point o ore: cosa dovrebbe usare il tuo team agile?',
  subtitle: 'Cosa misurano gli story point, perché le stime in ore continuano a fallire negli sprint, come rispondere a «ma il management vuole delle date» e quando le ore restano la scelta giusta.',
  sections: [
    {
      title: 'Story point o ore: la risposta breve',
      content: 'Stima gli elementi del backlog in story point e ricava le date dalla velocity. Usa le ore solo per lavori con un perimetro fisso e ben noto, per la fatturazione o, se il tuo team lo trova utile, per la scomposizione in attività giornaliere all’interno dello sprint. Gli story point descrivono quanto è grande un lavoro rispetto ad altri lavori; le ore descrivono quanto tempo una persona specifica prevede di dedicarci. Per pianificare gli sprint e prevedere i rilasci, la prima domanda è quella che regge.',
    },
    {
      title: 'Cosa sono gli story point?',
      content: 'Uno story point è un’unità di dimensione relativa. Quando un team dice che una user story vale 5, intende che è grande più o meno come gli altri 5 che ha fatto, più grande dei suoi 3 e più piccola dei suoi 8. Il numero riassume tutto ciò che rende faticoso un lavoro: la quantità di lavoro, la complessità, l’incertezza e il rischio di sorprese.',
      paragraphs: [
        'Gli story point non sono volutamente un’unità di tempo. La stessa storia da 5 punti potrebbe richiedere un giorno a un ingegnere senior e tre giorni a un nuovo assunto, ma resta un 5, perché la dimensione del lavoro non è cambiata. È proprio questo che rende utili i punti: restano stabili quando cambia la velocità del team, e la velocità si misura a parte, come [velocity del team](/blog/agile-velocity).',
        'La maggior parte dei team usa la [scala di Fibonacci](/fibonacci-planning-poker) modificata resa popolare da Mike Cohn in «Agile Estimating and Planning» (0, 1, 2, 3, 5, 8, 13, 20, 40, 100), con stime fatte in gruppo tramite il planning poker. Gli intervalli crescenti tra i valori riflettono il fatto che le cose grandi sono più difficili da dimensionare con precisione di quelle piccole.',
      ],
    },
    {
      title: 'Cosa significa davvero stimare in ore?',
      content: 'Una stima in ore è una previsione del tempo di lavoro effettivo per un lavoro specifico, di solito da parte di una persona specifica. È una stima assoluta: «ci vorranno circa 6 ore». Il fascino è evidente. Le ore sono universali, le capiscono tutti, i fogli di calcolo le sommano e i manager le confrontano con il calendario. Il problema è che una stima in ore mette insieme due cose molto diverse: la dimensione del lavoro, che si può conoscere durante il refinement, e la produttività di chi lo farà nel giorno in cui lo farà, che invece non si può conoscere.',
    },
    {
      title: 'Perché le stime in ore falliscono nei team agili',
      content: 'Le ore sembrano precise, ed è proprio questa la trappola. In pratica crollano per diversi motivi:',
      items: [
        'Dipendono da chi fa il lavoro. Un’attività che richiede 4 ore a uno sviluppatore può richiederne 12 a un altro, e finché lo sprint non è pianificato nessuno sa chi la prenderà.',
        'Ignorano il calendario. Riunioni, code review, incidenti in produzione e cambi di contesto sono invisibili in una stima in ore per attività, ma si mangiano una bella fetta di ogni giornata lavorativa.',
        'Invitano a una falsa precisione. «8 ore» suona come una misura. Nessuno sa distinguere in anticipo un’attività da 8 ore da una da 9, ma il numero verrà comunque trattato come un impegno.',
        'Si trasformano in pressione. Quando una stima è una promessa di tempo, gli sviluppatori tagliano gli angoli per rispettarla o gonfiano la successiva.',
        'Non si sommano in modo pulito. Sommare 40 stime in ore a livello di attività non dà una durata affidabile dello sprint, perché gli errori vanno per lo più nella stessa direzione ottimistica.',
      ],
    },
    {
      title: 'Perché gli story point funzionano meglio per pianificare lo sprint',
      content: 'Gli story point evitano questi fallimenti separando la dimensione dalla velocità:',
      items: [
        'La stima resta valida quando il team cambia. Un 5 è un 5 che lo prenda il senior o il junior. La velocità è catturata dalla velocity, che si aggiorna da sola a ogni sprint.',
        'Alle domande relative si risponde meglio. «È più grande della storia del reset della password?» produce risposte coerenti; «quante ore?» produce ipotesi che variano con l’umore e la sicurezza.',
        'L’incertezza trova posto. A una storia con specifiche traballanti si può dare un 13 per dire «grande e poco chiara», senza fingere che qualcuno conosca le ore.',
        'La velocity ti dà le previsioni gratis. Dopo qualche sprint il team sa di completare circa N punti per sprint, e quel numero assorbe riunioni, revisioni e interruzioni perché è misurato, non stimato.',
        'I punti eliminano l’impegno personale. Descrivono il lavoro, non la promessa di una persona, quindi le sessioni si concentrano sul capire la storia invece che sul difendere un numero.',
      ],
    },
    {
      title: 'Story point e ore a confronto',
      content: 'Le differenze chiave, criterio per criterio:',
      items: [
        'Cosa misurano: i punti misurano la dimensione relativa (impegno, complessità, incertezza, rischio); le ore misurano il tempo previsto per una persona.',
        'Stabilità: una stima in punti non cambia quando la storia la prende un’altra persona; una stima in ore sì.',
        'Previsioni: i punti prevedono tramite la velocity misurata su sprint interi; le ore prevedono sommando ipotesi per singola attività.',
        'Interruzioni: assorbite dalla velocity; ignorate dalle ore per attività, a meno di gonfiare ogni attività.',
        'Precisione: i punti sono grossolani per scelta; le ore implicano una precisione che nessuno ha in anticipo.',
        'Dinamiche di team: i punti sono una stima del lavoro fatta dal team; le ore diventano un impegno individuale.',
      ],
    },
    {
      title: 'Un esempio svolto: lo stesso sprint, stimato in entrambi i modi',
      content: 'Immagina un team di cinque persone che pianifica uno sprint di due settimane con tre storie: la correzione di un bug nella pagina del profilo, un’esportazione CSV dello storico degli ordini e l’integrazione di un nuovo fornitore di pagamenti.',
      paragraphs: [
        'In ore: il tech lead stima 4, 16 e 40 ore. Sono 60 ore contro 5 persone per 10 giorni per 8 ore, cioè 400 ore di capacità, quindi lo sprint sembra quasi vuoto e si aggiungono altre tre storie. In realtà riunioni e revisioni consumano un terzo del calendario, l’esportazione si rivela toccare due servizi e l’integrazione dei pagamenti si blocca sulla documentazione. Lo sprint finisce con l’esportazione a metà e le storie aggiuntive mai toccate.',
        'In story point: il team gioca a planning poker e arriva a 2, 8 e un «?» che diventa uno spike da 3 punti. La sua velocity negli ultimi quattro sprint è in media di 25. Con 13 punti di impegno c’è spazio per un paio di altre storie piccole, e il team sa dallo storico che uno sprint da 25 punti include già riunioni e revisioni. L’integrazione dei pagamenti non viene forzata nello sprint sulla base di un’ipotesi; lo spike risponde prima alle domande aperte. La stima in punti non è più precisa, ma è calibrata sulle consegne reali invece che su giornate lavorative ideali.',
      ],
    },
    {
      title: 'Il problema del «il management vuole le ore»: previsioni basate sulla velocity',
      content: 'L’obiezione più comune agli story point è che un manager, un cliente o l’ufficio finanza vuole date e ore, non punti. La risposta non è abbandonare i punti, ma tradurre a livello di sprint invece che di storie.',
      paragraphs: [
        'La velocity è il numero di punti che un team completa per sprint, in media sugli ultimi sprint. Quando hai tre o quattro sprint di storico, la previsione è aritmetica. Se un rilascio è stimato 120 punti e il team ne fa in media 25 a sprint, servono circa cinque sprint di due settimane, cioè una decina di settimane. Dai un intervallo, non una data singola: la velocity più bassa e quella più alta dello storico recente danno uno scenario migliore e uno peggiore molto più difendibili di una somma di ore tirate a indovinare.',
        'Quello che non dovresti fare è pubblicare un rapporto fisso tra punti e ore («1 punto = 4 ore»). Nel momento in cui quel rapporto esiste, ogni stima in punti diventa una stima in ore travestita e tutti i problemi visti sopra tornano.',
      ],
    },
    {
      title: 'Quando le ore sono la scelta giusta',
      content: 'Gli story point non sono una risposta universale. Le ore sono ragionevoli quando:',
      items: [
        'Il perimetro è fisso e familiare. Una rotazione di certificati di routine o una modifica di configurazione nota non hanno quasi incertezza.',
        'Stai scomponendo una storia in attività all’interno dello sprint. Alcuni team dimensionano le storie in punti e poi le dividono in attività da qualche ora per il proprio monitoraggio quotidiano. Va bene, purché le ore non rientrino mai nella stima in story point.',
        'Il lavoro si fattura a ore e il cliente ha bisogno di un preventivo. Anche qui, stima prima in punti e converti usando la velocity, invece di indovinare le ore per attività.',
        'Una sola persona fa tutto il lavoro e l’ha già fatto molte volte. Senza un team con cui raggiungere il consenso, la stima relativa aggiunge poco.',
      ],
    },
    {
      title: 'Errori comuni nel passaggio dalle ore agli story point',
      content: 'I team che passano ai punti tendono a portarsi dietro le abitudini delle ore. Fai attenzione a queste:',
      items: [
        'Definire un punto come un certo numero di ore. Il primo giorno sembra utile e distrugge il vantaggio per sempre.',
        'Confrontare la velocity tra team. I punti di ogni team sono calibrati sulle sue storie di riferimento, quindi 30 punti in un team non dicono nulla di un altro.',
        'Usare i punti come punteggio di produttività. Nell’istante in cui la velocity diventa un obiettivo, le stime si gonfiano e la metrica smette di prevedere qualsiasi cosa.',
        'Saltare la storia di riferimento. Senza un «ecco com’è un 3» condiviso, ognuno stima in silenzio in ore e arrotonda a un numero di Fibonacci.',
        'Lasciar stimare una sola persona. Il valore dei punti viene dalla discussione di team. Un lead che assegna i punti da solo si prende gli svantaggi di entrambi i sistemi.',
      ],
    },
    {
      title: 'Come stimare in story point con il planning poker',
      content: 'Il modo standard per produrre stime in story point è il [planning poker](/blog/what-is-planning-poker), la tecnica descritta da James Grenning nel 2002 e resa popolare da Mike Cohn. In breve:',
      items: [
        '1. Scegli una o due storie completate come riferimento e concorda con il team le loro dimensioni, per esempio «il flusso di reset della password era un 3».',
        '2. Il Product Owner presenta una storia e il team fa domande di chiarimento per un paio di minuti.',
        '3. Ognuno sceglie una carta in privato e la rivela nello stesso momento, così nessuno si ancora al primo numero pronunciato.',
        '4. Se le carte divergono, chi ha stimato più alto e chi più basso spiegano cosa vedono e il team vota di nuovo. La maggior parte delle storie converge entro due round.',
        '5. Registra il valore concordato. Dopo ogni sprint, somma i punti delle storie effettivamente completate: quella è la velocity con cui farai le previsioni.',
      ],
      paragraphs: [
        'Uno strumento gratuito come Scrum Poker Online gestisce la parte pratica per i team da remoto: crea una stanza, condividi il link e fino a 50 partecipanti possono votare con un mazzo Scrum, Fibonacci, T-shirt, potenze di 2 o personalizzato, senza registrarsi.',
      ],
    },
    {
      title: 'Il nostro consiglio',
      content: 'Stima in story point, fai previsioni con la velocity e tieni le ore per i casi limitati in cui il perimetro è fisso o la fatturazione le richiede. Parti dalla scala di Fibonacci, scegli come riferimento una storia recente ben compresa e dai alla velocity tre o quattro sprint per stabilizzarsi prima di usarla per gli impegni. Quando gli stakeholder chiedono delle date, rispondi con un intervallo di sprint ricavato dalla velocity, mai con un rapporto tra punti e ore. I team che fanno questo passaggio raramente tornano indietro, perché finalmente separano la dimensione del lavoro dalla velocità del team.',
    },
  ],
  faq: [
    {
      q: 'Quante ore vale uno story point?',
      a: 'Non c’è una risposta fissa e definirne una vanifica lo scopo. Gli story point misurano la dimensione relativa, non il tempo. Il rapporto tra punti e tempo di calendario è catturato dalla velocity, che varia da team a team.',
    },
    {
      q: 'Perché molti team agili evitano di stimare in ore?',
      a: 'Perché le stime in ore dipendono da chi fa il lavoro e da interruzioni che nessuno può prevedere, creano una falsa precisione e si trasformano in impegni personali. Gli story point descrivono il lavoro in sé e lasciano alla velocity il compito di tenere conto della velocità reale.',
    },
    {
      q: 'Si possono usare sia gli story point sia le ore?',
      a: 'Sì. Uno schema comune è dimensionare le storie in punti per pianificare e fare previsioni, poi dividerle in attività da qualche ora all’interno dello sprint per il monitoraggio quotidiano. Le ore non dovrebbero mai essere usate per ricalcolare gli story point.',
    },
    {
      q: 'Come converto gli story point in una data di consegna?',
      a: 'Usa la velocity. Dividi i punti rimanenti per la media di punti per sprint del team per ottenere un numero di sprint, poi moltiplica per la durata dello sprint. Presenta un intervallo usando la velocity recente più bassa e quella più alta invece di una data singola.',
    },
    {
      q: 'Uno story point vale lo stesso in team diversi?',
      a: 'No. Ogni team calibra i punti sulle proprie storie di riferimento, quindi un 5 in un team non è confrontabile con un 5 in un altro. La velocity va confrontata solo con lo storico dello stesso team.',
    },
  ],
};

export default it;
