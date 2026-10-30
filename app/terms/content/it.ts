import type { LegalContent } from '@/app/ContentPage';

const it: LegalContent = {
  title: 'Termini di servizio',
  updated: 'Ultimo aggiornamento: 30 ottobre 2026',
  intro: 'I presenti termini si applicano all’utilizzo di Scrum Poker Online su scrumpokerplay.com («il Servizio»). Il Servizio è gestito da Mert Gündoğan, un privato residente in Turchia («noi»). Contatto: contact@scrumpokerplay.com. Utilizzando il Servizio, Lei accetta questi termini. Se non li accetta, non utilizzi il Servizio. Il modo in cui trattiamo i dati personali è spiegato nell’Informativa sulla privacy: https://www.scrumpokerplay.com/it/privacy.',
  sections: [
    {
      title: '1. Il Servizio',
      content: 'Scrum Poker Online è uno strumento di planning poker online per stimare il lavoro insieme al Suo team. Non ci sono account. Il Servizio è attualmente gratuito: non esistono piani a pagamento, abbonamenti o pagamenti. Se aggiungeremo funzionalità a pagamento, queste potranno avere termini propri.',
    },
    {
      title: '2. Chi può utilizzarlo',
      content: 'Per utilizzare il Servizio deve avere almeno 16 anni.',
    },
    {
      title: '3. Stanze',
      items: [
        'Chiunque disponga del codice o del link di una stanza può entrarvi, salvo che l’host l’abbia chiusa a nuove persone. Può vederne i partecipanti, le storie, i voti rivelati e la chat, e prendervi parte. Il codice di una stanza non è una password: lo condivida solo con le persone che desidera nella stanza.',
        'Per impostazione predefinita, ogni partecipante può rivelare i voti, avviare un nuovo round, gestire la coda delle storie e usare il timer. L’host può inoltre cambiare il mazzo e le impostazioni della stanza (rivelazione automatica, voto anonimo, round gestito solo dall’host, chiusura della stanza a nuove persone, reazioni emoji, un indirizzo per i link ai ticket), rimuovere partecipanti e cedere il ruolo di host a un’altra persona. Chi è stato rimosso non può rientrare in quella stanza dallo stesso browser finché la stanza esiste, tranne il proprietario della stanza conservata, che può rientrarvi grazie al proprio link di proprietario.',
        'Chi crea la stanza ne è il primo host. Se l’host esce, il ruolo passa a un altro partecipante. Un proprietario che apre una stanza conservata con il relativo link di proprietario assume il ruolo di host al posto di un host che non dispone della chiave di proprietario.',
        'Le stanze sono temporanee. Una stanza e i suoi contenuti vengono di norma eliminati circa un’ora dopo che si è svuotata (circa dieci minuti se nella stanza non è mai stato fatto nulla). Di una stanza conservata (sezione 4) restano solo la configurazione, la coda di storie e gli ultimi risultati.',
      ],
    },
    {
      title: '4. Stanze conservate e link di proprietario',
      items: [
        'L’host può conservare una stanza. In tal caso la sua configurazione (codice, nome, mazzo e impostazioni), la coda di storie e i risultati degli ultimi round (storia e stima concordata) restano disponibili, e riaprendo in seguito il link della stanza la si ritrova.',
        'Conservare una stanza genera un link di proprietario segreto. Lo tenga riservato: chiunque lo possieda controlla la stanza. Ne assume il ruolo di host e può smettere di conservarla.',
        'Il browser in cui la stanza è stata conservata memorizza il link di proprietario. Lo copi se desidera usarlo su un altro dispositivo. Poiché non esistono account, non possiamo recuperare un link di proprietario smarrito.',
        'Una stanza conservata viene di norma rimossa quando il proprietario smette di conservarla, oppure automaticamente 180 giorni dopo l’ultima volta in cui il proprietario vi è tornato con il link di proprietario, oppure 30 giorni dopo la sua conservazione se il proprietario non vi torna mai con tale link. Può anche essere rimossa prima (sezione 8). Possiamo limitare il numero di stanze che è possibile conservare.',
      ],
    },
    {
      title: '5. I Suoi contenuti e la Sua responsabilità',
      items: [
        'Ciò che inserisce (nomi, nomi delle stanze, storie, link, voti, stime, messaggi in chat) resta Suo. Ci concede soltanto l’autorizzazione necessaria per far funzionare il Servizio con tali contenuti: conservarli e trasmetterli, come descritto nell’Informativa sulla privacy, e mostrarli alle altre persone presenti nella stanza. Queste possono anche esportare la cronologia dei round.',
        'Lei è responsabile di ciò che inserisce. Non inserisca informazioni riservate, dati personali di altre persone, né nulla di illecito o che non abbia il diritto di condividere.',
        'Non controlliamo i contenuti. Se riteniamo che le regole dei presenti termini non vengano rispettate, possiamo rimuovere contenuti o stanze e bloccare o limitare l’accesso, senza preavviso.',
      ],
    },
    {
      title: '6. Uso consentito',
      content: 'Non utilizzi il Servizio per violare la legge; per molestare o minacciare altre persone o spacciarsi per esse; per condividere contenuti illeciti, d’odio o sessualmente espliciti o link dannosi; per attaccare il Servizio o tentare accessi non autorizzati; per estrarne dati in modo automatizzato (scraping) o inviargli traffico automatizzato; per eseguire test di carico o di stress sul Servizio; o per aggirarne i limiti o le protezioni. Possiamo bloccare qualsiasi accesso che violi queste regole.',
    },
    {
      title: '7. Link ad altri siti',
      content: 'Le stanze possono contenere link ad altri siti, ad esempio link ai ticket aggiunti dai partecipanti. Non controlliamo né verifichiamo questi siti. Chi aggiunge un link ne è responsabile, e Lei apre tali link a Suo rischio.',
    },
    {
      title: '8. Disponibilità, dati e modifiche al Servizio',
      items: [
        'Non garantiamo che il Servizio sia disponibile in un determinato momento o per un determinato periodo, né ci impegniamo a conservare dati o a fare backup su cui Lei possa fare affidamento. Le stanze e le stanze conservate possono essere eliminate o andare perse in qualsiasi momento, ad esempio dopo un guasto tecnico.',
        'Conservi una Sua copia di tutto ciò che è importante. La cronologia dei round di una stanza può essere scaricata in formato CSV oppure copiata in formato CSV o Markdown.',
        'Possiamo modificare, sospendere o cessare il Servizio, o qualsiasi sua parte o funzionalità, in qualsiasi momento, senza preavviso e, nei limiti consentiti dalla legge, senza alcuna responsabilità.',
      ],
    },
    {
      title: '9. Esclusione di garanzie',
      content: 'Nei limiti consentiti dalla legge, il Servizio è fornito «così com’è» e «secondo disponibilità», senza garanzie di alcun tipo, espresse o implicite. In particolare, non garantiamo che sia privo di errori, sicuro, ininterrotto o adatto a uno scopo particolare.',
    },
    {
      title: '10. Limitazione di responsabilità',
      items: [
        'Nei limiti consentiti dalla legge, non siamo responsabili di danni indiretti, incidentali, speciali o consequenziali, né di perdita di dati, mancato guadagno, perdita di tempo o interruzione dell’attività.',
        'Il Servizio è gratuito. Nei limiti consentiti dalla legge, la nostra responsabilità complessiva per tutte le pretese connesse al Servizio è quindi limitata all’importo che ci ha pagato per esso, ossia zero.',
        'Questi limiti non si applicano quando la legge non consente di limitare la responsabilità, in particolare in caso di dolo o colpa grave e di danni alla vita, all’integrità fisica o alla salute. Nessuna disposizione dei presenti termini limita i diritti che Le spettano in qualità di consumatore in base alle norme imperative del Suo Paese.',
      ],
    },
    {
      title: '11. Assistenza e comunicazioni',
      content: 'Non abbiamo alcun obbligo di fornire assistenza, rispondere a domande o correggere errori. Può inviare comunicazioni e domande a contact@scrumpokerplay.com. Le nostre comunicazioni sono pubblicate su questo sito.',
    },
    {
      title: '12. Modifiche ai presenti termini',
      content: 'Possiamo modificare questi termini in qualsiasi momento. La versione vigente, con la relativa data, è sempre su questa pagina. Poiché non esistono account, non avvisiamo nessuno individualmente. Se continua a utilizzare il Servizio dopo una modifica, accetta i nuovi termini.',
    },
    {
      title: '13. Codice sorgente',
      content: 'Il codice sorgente del Servizio è disponibile con licenza GNU Affero General Public License, versione 3, all’indirizzo https://github.com/mertgundoganx/scrum-poker. Tale licenza si applica al codice; i presenti termini si applicano al Suo utilizzo del Servizio gestito su scrumpokerplay.com.',
    },
    {
      title: '14. Marchi',
      content: 'Planning Poker® è un marchio registrato di Mountain Goat Software, LLC. Scrum Poker Online non è affiliato a tale società né da essa approvato.',
    },
    {
      title: '15. Disposizioni finali',
      content: 'I presenti termini costituiscono l’intero accordo tra Lei e noi relativo al Servizio. Se una loro parte è invalida o inapplicabile, il resto continua ad applicarsi. Il fatto che non facciamo valere una disposizione non costituisce rinuncia alla stessa.',
    },
    {
      title: '16. Contatti',
      content: 'Domande sui presenti termini: contact@scrumpokerplay.com',
    },
  ],
};

export default it;
