import type { Localized } from '../articleTypes';

const it: Localized = {
  title: 'Fibonacci o taglie T-shirt: quale scala di stima agile usare?',
  subtitle: 'Come funzionano le due scale di stima più diffuse, perché gli intervalli di Fibonacci crescono, quando conviene l’una o l’altra e come convertire dall’una all’altra.',
  sections: [
    {
      title: 'Fibonacci o taglie T-shirt: la risposta breve',
      content: 'Usa gli story point di Fibonacci quando ti servono numeri da sommare, da seguire come velocity e da usare per le previsioni sugli sprint. Usa le taglie T-shirt quando ti serve un’idea rapida e senza attriti della dimensione relativa: un primo passaggio su un backlog grande, le discussioni di roadmap con gli stakeholder o un team alle prime armi con le stime. Molti team usano entrambe: le T-shirt per un dimensionamento grossolano a lungo termine, Fibonacci per le storie che stanno per entrare in uno sprint. Nessuna delle due scale è di per sé «più precisa»; la differenza sta nella granularità e in cosa puoi fare con il risultato.',
    },
    {
      title: 'Cos’è la stima con Fibonacci nell’agile?',
      content: 'La [stima con Fibonacci](/fibonacci-planning-poker) assegna story point agli elementi del backlog usando valori presi dalla sequenza di Fibonacci, in cui ogni numero è la somma dei due precedenti: 1, 2, 3, 5, 8, 13, 21, 34. La maggior parte dei team agili usa la versione modificata resa popolare da Mike Cohn in «Agile Estimating and Planning»: 0, 1, 2, 3, 5, 8, 13, 20, 40, 100. I valori più alti sono arrotondati perché un 21 al posto di un 20 implicherebbe una precisione che nessuno ha davvero.',
      paragraphs: [
        'Una storia stimata 8 non vale otto ore né otto giorni. Significa che il team la giudica sensibilmente più grande di un 5 e sensibilmente più piccola di un 13, tenendo conto di impegno, complessità, incertezza e rischio. I punti hanno senso solo rispetto a una storia di riferimento che il team conosce già, per esempio «il flusso di reset della password era un 3». Fibonacci è il mazzo predefinito nel planning poker e nella maggior parte degli strumenti.',
      ],
    },
    {
      title: 'Perché gli intervalli crescono: la logica della scala di Fibonacci',
      content: 'Ai fini della stima, la proprietà che definisce la sequenza è che ogni passo è circa 1,6 volte il precedente, quindi gli intervalli si allargano man mano che i numeri crescono. Questa forma corrisponde a come le persone percepiscono le dimensioni. Tutti sanno distinguere una storia da 2 punti da una da 3. Nessuno sa distinguere onestamente un 20 da un 21. Una scala lineare (1, 2, 3, 4, 5, 6, 7, 8...) invita a discutere su distinzioni che il team in realtà non sa fare.',
      paragraphs: [
        'La giustificazione abituale è la legge di Weber-Fechner della psicofisica: la differenza più piccola che una persona riesce a notare è proporzionale alla grandezza di ciò che si confronta. Una scala i cui passi crescono in proporzione si allinea a quel limite, così ogni carta rappresenta una differenza che il team percepisce davvero. Quando un team è indeciso tra 20 e 40, la risposta onesta di solito è «non ne sappiamo ancora abbastanza», e la storia andrebbe divisa o esplorata con uno spike invece che discussa all’infinito.',
      ],
    },
    {
      title: 'Cosa sono le taglie T-shirt?',
      content: 'Le [taglie T-shirt](/t-shirt-sizing) classificano gli elementi del backlog in poche categorie che prendono il nome dalle taglie dei vestiti: XS, S, M, L, XL e a volte XXL. È una scala relativa come Fibonacci, ma volutamente grossolana. Una «M» significa semplicemente «più o meno della dimensione delle altre cose che abbiamo chiamato M», e il team decide cosa significa indicando esempi reali.',
      paragraphs: [
        'Il vantaggio è che le taglie non sono numeri. Non c’è la tentazione di sommarle, di convertirle in ore o di discutere se qualcosa vale 5 o 6. Gli stakeholder non tecnici le trovano intuitive e un team che non ha mai stimato prima riesce a produrre taglie utili già nella prima sessione. La scala dà il meglio quando si dimensiona un grande insieme di elementi in una volta, come la roadmap di un trimestre o un gruppo di epic.',
      ],
    },
    {
      title: 'Come funzionano in pratica le taglie T-shirt',
      content: 'Una sessione con le taglie T-shirt è breve e si può condurre con carte, post-it o un mazzo online:',
      items: [
        '1. Concorda i punti di riferimento. Scegli un elemento che per il team è chiaramente una S e uno che è chiaramente una L. Ogni altro elemento si dimensiona rispetto a questi.',
        '2. Presenta brevemente ogni elemento. Il Product Owner dà la versione in una frase; le domande approfondite si rimandano, a meno che non blocchino il dimensionamento.',
        '3. Ognuno sceglie una taglia in privato e la rivela nello stesso momento, esattamente come nel planning poker, così la prima voce non fa da àncora a tutta la stanza.',
        '4. Discuti solo i valori anomali. Se quasi tutto il team dice M e una persona dice XL, quella persona spiega cosa vede.',
        '5. Registra la taglia e passa oltre. Una sessione tipica copre molti più elementi all’ora di una sessione con Fibonacci, perché la scala invita a discutere meno.',
        '6. Converti in seguito, se serve. Gli elementi che arrivano in cima al backlog vengono stimati di nuovo in story point quando il team è pronto a pianificare uno sprint.',
      ],
    },
    {
      title: 'Fibonacci e taglie T-shirt a confronto',
      content: 'Le differenze pratiche, criterio per criterio:',
      items: [
        'Granularità: Fibonacci offre una decina di valori distinti; le taglie T-shirt cinque o sei. Fibonacci separa un 5 da un 8; con le T-shirt entrambi finiscono in M o L.',
        'Aritmetica: i punti di Fibonacci si possono sommare in un totale di sprint e mediare in una velocity. Le taglie T-shirt non si possono sommare senza prima associare un numero a ogni taglia.',
        'Previsioni: con la velocity, i punti di Fibonacci permettono di rispondere a «quanti sprint ci vorranno?». Le taglie T-shirt rispondono a «quanto è grande, all’incirca, questo trimestre?».',
        'Velocità: con le taglie T-shirt ogni elemento si stima prima ed è più facile lavorare su un grande gruppo. Fibonacci è più lento, perché la scala più fine invita a discutere di più.',
        'Curva di apprendimento: le T-shirt sono subito intuitive. Fibonacci richiede una storia di riferimento e una breve spiegazione del perché i numeri non sono ore.',
        'Rischio di uso improprio: i punti di Fibonacci tendono di più a essere convertiti tacitamente in ore o trasformati in una metrica di produttività. Le T-shirt tendono di più a essere troppo vaghe per pianificare uno sprint.',
      ],
    },
    {
      title: 'Quando usare gli story point di Fibonacci',
      content: 'Fibonacci è la scelta migliore quando il risultato della stima alimenta i calcoli della pianificazione:',
      items: [
        'Pianificazione dello sprint: il team deve decidere quante storie entrano in uno sprint, e questo significa sommare le dimensioni.',
        'Monitoraggio della velocity: un team stabile vuole confrontare gli sprint e prevedere i rilasci in base al proprio storico.',
        'Previsioni per gli stakeholder: «questa epic vale circa 60 punti e in media ne facciamo 25 a sprint» è una risposta concreta e difendibile.',
      ],
    },
    {
      title: 'Quando usare le taglie T-shirt',
      content: 'Le taglie T-shirt vincono quando velocità e accessibilità contano più dell’aritmetica:',
      items: [
        'Triage del backlog: dimensionare decine di elementi per decidere quali vale la pena raffinare.',
        'Roadmap e pianificazione trimestrale: confrontare epic o iniziative che verranno comunque scomposte in seguito.',
        'Team nuovi: un team ai primi sprint non ha una velocity da alimentare né storie di riferimento; le T-shirt gli permettono di iniziare a stimare senza cerimonie.',
        'Pubblico misto: quando partecipano designer, product manager o stakeholder di business, le taglie intimidiscono meno e si rischia meno di scambiarle per impegni.',
      ],
    },
    {
      title: 'Si possono convertire le taglie T-shirt in story point?',
      content: 'Sì, e molti team lo fanno, ma considera la corrispondenza una comodità, non un dato di fatto. Una corrispondenza comune è XS = 1, S = 2, M = 3 o 5, L = 8, XL = 13, XXL = 20 o più. Il team dovrebbe concordarla, metterla per iscritto e mantenerla stabile, perché cambiarla di nascosto corrompe lo storico della velocity.',
      paragraphs: [
        'L’approccio più pulito è non convertire affatto: tieni le taglie T-shirt per le epic e gli elementi lontani nel tempo e stima di nuovo le singole storie in punti di Fibonacci quando si avvicinano a uno sprint. La taglia T-shirt era un ordinamento grossolano; la stima in story point si fa con informazioni migliori e una vera storia di riferimento.',
        'Qualunque cosa tu faccia, non convertire mai punti o taglie [in ore per storia](/blog/story-points-vs-hours). Entrambe le scale descrivono una dimensione relativa. Il tempo viene dalla velocity, misurata su sprint interi, non da una formula applicata alla singola storia.',
      ],
    },
    {
      title: 'Un esempio svolto: le stesse tre storie su entrambe le scale',
      content: 'Immagina un team che raffina tre storie. Il suo riferimento per Fibonacci è «il flusso di reset della password era un 3»; i suoi riferimenti per le T-shirt sono «flusso di reset = S» e «dashboard di amministrazione = L».',
      paragraphs: [
        '«Mostrare un messaggio di conferma dopo il salvataggio del profilo.» Fibonacci: tutti giocano 1 o 2, si registra 2. T-shirt: tutti giocano XS. Le due scale concordano e nessuna ha richiesto discussione.',
        '«Esportare lo storico degli ordini in CSV, con paginazione per gli account grandi.» Fibonacci: escono 5, 5, 8, 8, 13; dopo che chi ha votato 13 spiega che sono coinvolti due servizi, il team si accorda su 8. T-shirt: la stessa storia riceve M, M, L, L, L; il team si accorda su L. La discussione con Fibonacci ha prodotto un esito più specifico; quella con le T-shirt ha stabilito solo «più grande di M».',
        '«Integrare il nuovo fornitore di pagamenti.» Fibonacci: metà del team gioca «?» e gli altri 40 o 100, quindi la storia viene mandata a uno spike. T-shirt: tutti giocano XL e il team la registra tranquillamente. Qui la scala più grossolana ha nascosto un problema: su XL era facile accordarsi perché non impegna a nulla, mentre Fibonacci ha costretto il team ad ammettere di non sapere.',
      ],
    },
    {
      title: 'Errori comuni con ciascuna scala',
      content: 'Entrambe le scale falliscono in modi prevedibili quando le si usa senza un riferimento o con l’intento sbagliato:',
      items: [
        'Fibonacci: associare i punti alle ore («un 5 è circa un giorno»). A quel punto la scala è solo un modo più complicato di dire ore e tornano tutti gli anti-pattern della stima in ore.',
        'Fibonacci: usare i punti per misurare la produttività individuale. Le stime si gonfiano nel giro di uno o due sprint e la velocity smette di significare qualcosa.',
        'T-shirt: usare troppe taglie. Spaccare il capello tra XXS, XS e S su ogni elemento ricrea la granularità dei numeri senza la loro aritmetica. Di solito cinque o sei categorie bastano, anche se il tuo mazzo ne offre di più.',
        'T-shirt: pianificare uno sprint solo con le taglie. «Tre L e quattro M» non ti dice se lo sprint è pieno. Converti o stima di nuovo prima di impegnarti.',
      ],
    },
    {
      title: 'Altre scale: potenze di 2 e mazzi personalizzati',
      content: 'Fibonacci e T-shirt sono le scale più comuni, ma non le uniche. Le potenze di 2 (1, 2, 4, 8, 16, 32) offrono un raddoppio ancora più rigoroso tra una carta e l’altra e si adattano ai team che vogliono passi privi di ambiguità. Alcuni team definiscono un mazzo personalizzato con i soli valori che usano davvero, per esempio 1, 2, 3, 5, 8, 13 e «?».',
      paragraphs: [
        'Scrum Poker Online supporta i mazzi Scrum, Fibonacci, T-shirt, potenze di 2 e personalizzati, e l’host della stanza può cambiare mazzo tra un round e l’altro: passare da una sessione di roadmap alla pianificazione dello sprint significa cambiare un’impostazione, non uno strumento. È gratuito, non richiede registrazione e supporta fino a 50 partecipanti.',
      ],
    },
    {
      title: 'Il nostro consiglio',
      content: 'Parti da Fibonacci se il tuo team pianifica a sprint, monitora la velocity o salva già gli story point nei suoi strumenti. Parti dalle taglie T-shirt se il team è alle prime armi con le stime, il backlog è grande e approssimativo o alla sessione partecipano stakeholder non tecnici. Usale entrambe se hai una roadmap lunga: le T-shirt per ordinare il futuro lontano, Fibonacci per i prossimi sprint. Qualunque scelta tu faccia, [apri una stanza di planning poker gratuita](/) per provarla, tieni in vista un elemento di riferimento, fai rivelare i voti nello stesso momento e non tradurre mai il risultato in ore per storia.',
    },
  ],
  faq: [
    {
      q: 'Perché la stima agile usa la sequenza di Fibonacci?',
      a: 'Perché gli intervalli tra valori consecutivi crescono insieme ai valori stessi, e questo corrisponde al modo in cui le persone percepiscono le differenze di dimensione. Un team sa distinguere un 2 da un 3 ma non un 20 da un 21, quindi il mazzo salta i valori che nessuno sa distinguere.',
    },
    {
      q: 'Le taglie T-shirt sono la stessa cosa degli story point?',
      a: 'No. Entrambe sono scale di stima relativa, ma gli story point sono numeri che si possono sommare e trasformare in velocity, mentre le taglie T-shirt sono categorie che non si possono sommare senza una corrispondenza concordata.',
    },
    {
      q: 'Come converto le taglie T-shirt in story point?',
      a: 'Concorda una corrispondenza con il team, per esempio XS = 1, S = 2, M = 3 o 5, L = 8, XL = 13, mettila per iscritto e mantienila stabile. Meglio ancora, stima di nuovo le storie in punti quando si avvicinano a uno sprint invece di convertirle meccanicamente.',
    },
    {
      q: '1 story point equivale a 1 ora?',
      a: 'No. Gli story point descrivono una dimensione relativa, non il tempo. Le previsioni temporali vengono dalla velocity, misurata su sprint interi, non da una conversione per singola storia.',
    },
    {
      q: 'Quale scala è migliore per un team agile nuovo?',
      a: 'Di solito le taglie T-shirt sono il punto di partenza più facile, perché non richiedono una storia di riferimento né uno storico della velocity. Quando il team ha qualche storia completata su cui ancorarsi, può passare a Fibonacci per la pianificazione degli sprint.',
    },
  ],
};

export default it;
