import type { LandingContent } from '@/app/landingTypes';

const it: LandingContent = {
  breadcrumb: 'Taglie T-shirt',
  title: 'Stima con le taglie T-shirt nei team agili: una guida pratica',
  subtitle: 'Stima con XS, S, M, L e XL invece che con i numeri: quando funziona, quando no e come condurre una sessione.',
  sections: [
    {
      blocks: [
        { p: 'La **stima con le taglie T-shirt** è una tecnica di stima relativa in cui il team etichetta il lavoro come extra-small, small, medium, large o extra-large invece di assegnargli un numero. Rinuncia a un po’ di precisione in cambio di velocità e semplicità: quasi chiunque può dire «mi sembra una M» senza bisogno di una lezione sugli story point. I team agili la usano per la pianificazione iniziale della roadmap, per dimensionare le epic e in tutte le situazioni in cui i numeri farebbero discutere più del necessario. Questa guida spiega le taglie, quando le taglie T-shirt funzionano meglio dei mazzi numerici, come convertire le taglie in punti se ti serve e come condurre una sessione con il tuo team.' },
      ],
    },
    {
      title: 'Cos’è la stima con le taglie T-shirt?',
      blocks: [
        { p: 'Il metodo prende in prestito la familiare scala delle taglie di abbigliamento. Ogni elemento del backlog riceve una taglia, e il team confronta gli elementi tra loro invece di misurarli con l’orologio. Una «L» non corrisponde a un certo numero di ore: è semplicemente più grande di una «M» e più piccola di una «XL». Dato che le etichette sono grossolane, il team passa meno tempo a discutere di piccole differenze e più tempo sulla domanda che conta: questo elemento ha più o meno le stesse dimensioni dell’ultimo, o è chiaramente più grande?' },
        { p: 'La stima con le taglie T-shirt si svolge di solito come un [planning poker](/blog/what-is-planning-poker): voti privati, rivelazione simultanea, discussione dei valori estremi, con le carte delle taglie al posto di quelle numeriche. Il meccanismo è lo stesso; cambia solo il vocabolario.' },
      ],
    },
    {
      title: 'Le taglie: da XS a XXL, più il mazzo esteso',
      blocks: [
        { p: 'L’insieme standard comprende cinque o sei taglie:' },
        {
          sizes: [
            { size: 'XS', desc: 'Banale. Una modifica a un testo, un cambio di configurazione, una correzione di una riga.' },
            { size: 'S', desc: 'Piccola e ben compresa. Al massimo una giornata per una persona, senza sorprese previste.' },
            { size: 'M', desc: 'Una storia tipica. Perimetro chiaro, qualche parte in movimento, sta comodamente in uno sprint.' },
            { size: 'L', desc: 'Una storia grande. Realizzabile in uno sprint, ma probabilmente richiede più di una persona o buona parte dello sprint.' },
            { size: 'XL', desc: 'Molto grande. Probabilmente un’epic sotto mentite spoglie; conviene suddividerla prima di impegnarsi.' },
            { size: 'XXL', desc: 'Troppo grande per essere pianificata. Serve un lavoro di analisi prima che qualcuno possa dimensionarla in modo responsabile.' },
          ],
        },
        { p: 'Il mazzo T-shirt di Scrum Poker Online estende questa scala a `Z, T, XXS, XS, S, M, L, XL, XXL, XXXL`, con in più le carte ? e ☕. Z (zero) copre gli elementi già fatti o che non richiedono lavoro, T (tiny, minuscola) si colloca sotto XXS per la modifica più piccola immaginabile, e XXXL indica un lavoro così grande che stimarlo non ha senso finché non viene scomposto. La maggior parte dei team usa solo la parte centrale del mazzo; gli estremi ci sono perché nessuno sia costretto a forzare un’etichetta che non calza. Se preferisci un insieme più corto o diverso, puoi usare un mazzo personalizzato fino a 20 carte (ognuna fino a 4 caratteri). Tutti i mazzi sono messi a confronto nella pagina sulle [carte del planning poker](/planning-poker-cards).' },
      ],
    },
    {
      title: 'Quando il dimensionamento relativo batte i numeri',
      blocks: [
        { p: 'I mazzi numerici come [Fibonacci](/fibonacci-planning-poker) sono eccellenti per il lavoro a livello di sprint. Le taglie T-shirt danno il meglio in tre situazioni:' },
        {
          ul: [
            '**Pianificazione iniziale della roadmap.** Quando hai cinquanta funzionalità candidate e devi capire in quale trimestre potrebbero arrivare, dimensionarle S, M o L in un pomeriggio è molto più utile che passare una settimana ad assegnare story point che saranno comunque sbagliati.',
            '**Epic e iniziative.** Gli elementi grandi hanno troppe incognite perché un numero abbia senso. «Questa epic è una XL» è onesto; «questa epic vale 89 punti» finge una precisione che nessuno ha.',
            '**Team non tecnici.** I team di marketing, design, operations e contenuti trovano spesso gli story point poco familiari. Le taglie sono intuitive, non richiedono formazione e producono lo stesso beneficio: un senso condiviso e relativo dell’impegno.',
          ],
        },
        { p: 'Le taglie abbassano anche la tensione nelle discussioni. Nessuno si accalora per sostenere che una storia sia una M anziché una L, come potrebbe invece fare discutendo tra un 5 e un 8, quindi il consenso tende ad arrivare prima. Per un confronto più approfondito, leggi [Fibonacci o taglie T-shirt](/blog/fibonacci-vs-tshirt).' },
      ],
    },
    {
      title: 'Convertire le taglie in story point (facoltativo)',
      blocks: [
        { p: 'Alcuni team vogliono far rientrare le taglie T-shirt nella velocity o in un modello di capacità, e per questo hanno bisogno di numeri. Una corrispondenza comune è `XS=1, S=2, M=3, L=5, XL=8, XXL=13`, che ricalca la progressione di Fibonacci. Un altro approccio consiste nel definire ogni taglia come un intervallo: S vale da 1 a 3 punti, M da 5 a 8, L da 13 a 21, e tutto ciò che è più grande resta senza stima.' },
        { p: 'Due avvertenze. Primo, è facoltativo. Molti team non convertono mai e ne traggono vantaggio, perché nel momento in cui le taglie diventano numeri le persone iniziano a trattarle come impegni. Secondo, qualunque corrispondenza tu scelga va concordata prima della sessione, non dopo, altrimenti le stime scivoleranno verso la corrispondenza che fa sembrare migliore il piano. Se ti ritrovi a convertire ogni storia, probabilmente ti serviva fin dall’inizio un mazzo numerico. E se la conversione è in realtà un tentativo di arrivare alle ore, leggi [story point o ore](/blog/story-points-vs-hours) prima di andare oltre.' },
      ],
    },
    {
      title: 'Condurre una sessione con le taglie T-shirt',
      blocks: [
        {
          ol: [
            '**Concorda gli elementi di riferimento.** Scegli una storia che il team considera una S e una che considera una L. Tutto il resto viene dimensionato in relazione a queste due.',
            '**Tieni corto l’elenco.** Il dimensionamento funziona meglio in blocchi da dieci a trenta elementi, ognuno con una descrizione di una frase. Incollali nella coda di storie, oppure importa un file CSV o un’esportazione di Jira, così il facilitatore può scorrerli senza dover navigare in un foglio di calcolo.',
            '**Vota in privato, poi rivela insieme al team.** Ogni partecipante sceglie una carta taglia; le carte restano nascoste finché il round non viene rivelato. In questo modo la voce più autorevole nella stanza non decide la taglia per tutti gli altri.',
            '**Discuti solo i disaccordi veri.** Una S accanto a una M non merita un dibattito. Una S accanto a una XL sì: una delle due persone sa qualcosa che l’altra non sa.',
            '**Registra e vai avanti.** Registra la taglia finale di ogni elemento; la cronologia dei round si può scaricare in CSV o copiare come Markdown, così le taglie finiscono nel tuo strumento di backlog senza che nessuno debba trascriverle.',
          ],
        },
        { p: 'Una sessione da trenta elementi richiede in genere meno di un’ora. Se dura di più, probabilmente sono gli elementi a essere troppo vaghi, non il team a essere troppo lento.' },
      ],
    },
    {
      title: 'Errori comuni',
      blocks: [
        {
          ul: [
            '**Trattare le taglie come durate.** «M significa tre giorni» trasforma in silenzio il dimensionamento relativo in una stima in ore con passaggi in più. Le taglie sono confronti, non calendari.',
            '**Troppe taglie.** Se il team si arrovella tra XS e S su ogni elemento, conviene accordarsi per eliminare la XS. Meno fasce significano decisioni più rapide.',
            '**Saltare gli elementi di riferimento.** Senza una S e una L concordate, «medium» significa qualcosa di diverso per ciascuno, e i risultati sono solo rumore.',
            '**Dimensionare da soli.** Una sola persona che dimensiona un backlog produce le ipotesi di una sola persona. Il valore nasce dal disaccordo tra più persone.',
            '**Non rivedere mai le taglie.** Una taglia assegnata durante la pianificazione della roadmap è un’istantanea. Rivaluta la taglia prima che l’elemento entri davvero in uno sprint, quando se ne sa di più.',
          ],
        },
      ],
    },
    {
      title: 'Esempio di sessione',
      blocks: [
        { example: 'Un team di prodotto sta pianificando il prossimo trimestre e ha dodici funzionalità candidate. Lavorando dalla coda di storie, le dimensiona in quaranta minuti. Nove convergono subito. «Fatturazione self-service» si divide tra L e XXL; chi ha votato XXL fa notare che richiede un’integrazione per il calcolo delle imposte che nessuno ha ancora analizzato. Il team la registra come XL e aggiunge un’attività di analisi. «Tema scuro» si divide tra S e L; chi ha votato L ricorda che la libreria dei grafici ha i colori scritti direttamente nel codice. Alla fine diventa una M. Il team esce con un elenco dimensionato, due rischi appena scoperti e nessuna discussione sul fatto che qualcosa sia un 5 o un 8.' },
      ],
    },
  ],
  faqTitle: 'Domande frequenti',
  faq: [
    {
      q: 'Le taglie T-shirt sono la stessa cosa degli story point?',
      a: 'No. Gli story point sono numerici e alimentano la velocity; le taglie sono etichette ordinali. Puoi far corrispondere le taglie ai punti, ma la corrispondenza è una convenzione concordata dal team, non una misura.',
    },
    {
      q: 'Quante taglie conviene usare?',
      a: 'Cinque sono un buon punto di partenza (da XS a XL). Aggiungi la XXL se incontri spesso elementi troppo grandi da pianificare, ed elimina la XS se il team la usa di rado. Il mazzo esteso esiste proprio perché tu non debba decidere in anticipo.',
    },
    {
      q: 'Possiamo usare le taglie T-shirt per la pianificazione dello sprint?',
      a: 'Sì, ma la maggior parte dei team passa a un mazzo numerico per le storie a livello di sprint, perché rende più semplice monitorare la velocity. Usa le taglie per la roadmap e le epic, poi Fibonacci quando le storie sono state raffinate.',
    },
    {
      q: 'E se il team non riesce a mettersi d’accordo su una taglia?',
      a: 'Discuti i due estremi, poi rivota una volta. Se il team è ancora diviso, scegli la taglia più grande, perché sottostimare di solito fa più danni che sovrastimare, e annota l’incertezza accanto all’elemento.',
    },
  ],
  ctaText: 'Dimensiona il tuo backlog con il mazzo T-shirt. Gratis, senza registrazione, fino a 50 partecipanti per stanza.',
  ctaLabel: 'Crea una stanza gratuita',
  relatedTitle: 'Continua a leggere',
  related: [
    { href: '/fibonacci-planning-poker', label: 'Planning poker con Fibonacci' },
    { href: '/planning-poker-cards', label: 'Carte e mazzi del planning poker' },
    { href: '/guide', label: 'Come condurre una sessione di Scrum Poker, passo dopo passo' },
    { href: '/blog/estimation-consensus', label: 'Raggiungere il consenso nella stima' },
    { href: '/blog/story-points-vs-hours', label: 'Story point o ore' },
    { href: '/blog', label: 'Tutti gli articoli del blog' },
  ],
};

export default it;
