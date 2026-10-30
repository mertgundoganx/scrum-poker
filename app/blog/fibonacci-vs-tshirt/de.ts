import type { Localized } from '../articleTypes';

const de: Localized = {
  title: 'Fibonacci oder T-Shirt-Größen: Welche agile Schätzskala solltest du nutzen?',
  subtitle: 'Wie die beiden beliebtesten Schätzskalen funktionieren, warum die Abstände bei Fibonacci wachsen, wann welche passt und wie du zwischen ihnen umrechnest.',
  sections: [
    {
      title: 'Fibonacci oder T-Shirt-Größen: die kurze Antwort',
      content: 'Nutze Fibonacci-Story-Points, wenn du Zahlen brauchst, die sich addieren, als Velocity verfolgen und für Sprint-Prognosen verwenden lassen. Nutze T-Shirt-Größen, wenn du schnell und ohne großen Aufwand ein Gefühl für die relative Größe brauchst – etwa für einen ersten Durchgang durch ein großes Backlog, für Roadmap-Gespräche mit Stakeholdern oder in einem Team, das gerade erst mit dem Schätzen beginnt. Viele Teams nutzen beides: T-Shirts für die grobe Einordnung weit im Voraus, Fibonacci für die Stories, die demnächst in einen Sprint kommen. Keine der beiden Skalen ist für sich genommen „genauer“; der Unterschied liegt in der Feinheit und darin, was du anschließend mit dem Ergebnis anfangen kannst.',
    },
    {
      title: 'Was ist Fibonacci-Schätzung in agilen Teams?',
      content: 'Bei der [Fibonacci-Schätzung](/fibonacci-planning-poker) erhalten Backlog-Einträge Story Points aus der Fibonacci-Folge, in der jede Zahl die Summe der beiden vorherigen ist: 1, 2, 3, 5, 8, 13, 21, 34. Die meisten agilen Teams verwenden die abgewandelte Variante, die Mike Cohn in „Agile Estimating and Planning“ bekannt gemacht hat: 0, 1, 2, 3, 5, 8, 13, 20, 40, 100. Die größeren Werte sind gerundet, weil 21 gegenüber 20 eine Präzision vortäuschen würde, die niemand tatsächlich hat.',
      paragraphs: [
        'Eine Story mit 8 Punkten bedeutet weder acht Stunden noch acht Tage. Sie bedeutet, dass das Team die Story als spürbar größer als eine 5 und spürbar kleiner als eine 13 einschätzt – unter Berücksichtigung von Aufwand, Komplexität, Unsicherheit und Risiko. Die Punkte ergeben nur relativ zu einer Referenz-Story Sinn, die das Team bereits kennt, zum Beispiel „Der Passwort-Reset war eine 3“. Fibonacci ist das Standard-Deck beim Planning Poker und in den meisten Tools.',
      ],
    },
    {
      title: 'Warum die Abstände wachsen: die Logik der Fibonacci-Skala',
      content: 'Die für das Schätzen entscheidende Eigenschaft der Folge ist, dass jeder Schritt etwa das 1,6-Fache des vorherigen beträgt, die Abstände also mit den Zahlen wachsen. Diese Form entspricht der Art, wie Menschen Größe wahrnehmen. Jeder kann eine 2-Punkte-Story von einer 3-Punkte-Story unterscheiden. Niemand kann ehrlich eine 20 von einer 21 unterscheiden. Eine lineare Skala (1, 2, 3, 4, 5, 6, 7, 8 …) lädt zu Diskussionen über Unterschiede ein, die das Team gar nicht treffen kann.',
      paragraphs: [
        'Die übliche Begründung ist das Weber-Fechner-Gesetz aus der Psychophysik: Der kleinste Unterschied, den ein Mensch wahrnehmen kann, ist proportional zur Größe dessen, was verglichen wird. Eine Skala mit proportional wachsenden Schritten folgt dieser Grenze, sodass jede Karte einen Unterschied darstellt, den das Team tatsächlich wahrnehmen kann. Schwankt ein Team zwischen 20 und 40, lautet die ehrliche Antwort meist „Wir wissen noch nicht genug“ – dann sollte die Story aufgeteilt oder mit einem Spike untersucht werden, statt darüber zu streiten.',
      ],
    },
    {
      title: 'Was sind T-Shirt-Größen?',
      content: 'Beim [Schätzen mit T-Shirt-Größen](/t-shirt-sizing) werden Backlog-Einträge in eine Handvoll Kategorien eingeteilt, die nach Kleidergrößen benannt sind: XS, S, M, L, XL und manchmal XXL. Wie Fibonacci ist das eine relative Skala, aber eine bewusst grobe. Ein „M“ heißt einfach „ungefähr so groß wie die anderen Dinge, die wir M genannt haben“, und das Team legt anhand realer Beispiele fest, wie das aussieht.',
      paragraphs: [
        'Der Reiz liegt darin, dass Größen keine Zahlen sind. Es gibt keine Versuchung, sie zu addieren, in Stunden umzurechnen oder darüber zu streiten, ob etwas eine 5 oder eine 6 ist. Fachfremde Stakeholder finden sie intuitiv, und ein Team, das noch nie geschätzt hat, kann schon in seiner ersten Session brauchbare T-Shirt-Größen vergeben. Ihre Stärken spielt die Skala aus, wenn viele Einträge auf einmal eingeordnet werden, etwa die Roadmap eines Quartals oder ein Stapel Epics.',
      ],
    },
    {
      title: 'Wie das Schätzen mit T-Shirt-Größen in der Praxis funktioniert',
      content: 'Eine Session mit T-Shirt-Größen ist kurz und lässt sich mit Karten, Haftnotizen oder einem Online-Deck durchführen:',
      items: [
        '1. Anker vereinbaren. Wähle einen Eintrag, den das Team eindeutig als S sieht, und einen, der eindeutig ein L ist. Alle anderen Einträge werden relativ dazu eingeordnet.',
        '2. Jeden Eintrag kurz vorstellen. Der Product Owner liefert die Ein-Satz-Version; tiefere Fragen werden zurückgestellt, sofern sie die Einordnung nicht blockieren.',
        '3. Alle wählen verdeckt eine Größe und decken gleichzeitig auf, genau wie beim Planning Poker, damit die erste Stimme nicht den ganzen Raum beeinflusst.',
        '4. Nur die Ausreißer besprechen. Sagt der Großteil des Teams M und eine Person XL, erklärt diese Person, was sie sieht.',
        '5. Größe festhalten und weitermachen. Eine typische Session schafft pro Stunde weit mehr Einträge als eine Fibonacci-Session, weil die Skala weniger Diskussion auslöst.',
        '6. Bei Bedarf später umrechnen. Einträge, die weit oben im Backlog landen, werden in Story Points neu geschätzt, sobald das Team einen Sprint planen will.',
      ],
    },
    {
      title: 'Fibonacci und T-Shirt-Größen im direkten Vergleich',
      content: 'Die praktischen Unterschiede, Kriterium für Kriterium:',
      items: [
        'Feinheit: Fibonacci bietet etwa zehn unterscheidbare Werte, T-Shirt-Größen fünf oder sechs. Fibonacci kann eine 5 von einer 8 trennen; bei T-Shirts landen beide in M oder L.',
        'Rechnen: Fibonacci-Punkte lassen sich zu einer Sprintsumme addieren und zur Velocity mitteln. T-Shirt-Größen lassen sich erst addieren, wenn jeder Größe eine Zahl zugeordnet wurde.',
        'Prognosen: Zusammen mit der Velocity beantworten Fibonacci-Punkte die Frage „Wie viele Sprints wird das dauern?“. T-Shirt-Größen beantworten eher „Wie groß ist dieses Quartal ungefähr?“.',
        'Tempo: T-Shirt-Größen sind pro Eintrag schneller und eignen sich besser für große Mengen. Fibonacci ist langsamer, weil die feinere Skala mehr Diskussion auslöst.',
        'Lernkurve: T-Shirts sind sofort intuitiv. Fibonacci braucht eine Referenz-Story und eine kurze Erklärung, warum die Zahlen keine Stunden sind.',
        'Missbrauchsrisiko: Fibonacci-Punkte werden eher stillschweigend in Stunden umgerechnet oder zur Produktivitätskennzahl gemacht. T-Shirts sind eher zu vage, um damit einen Sprint zu planen.',
      ],
    },
    {
      title: 'Wann du Fibonacci-Story-Points nutzen solltest',
      content: 'Fibonacci ist die bessere Wahl, wenn das Ergebnis der Schätzung in Planungsrechnungen einfließt:',
      items: [
        'Sprint-Planung: Das Team muss entscheiden, wie viele Stories in einen Sprint passen, und dafür muss es Größen addieren.',
        'Velocity-Tracking: Ein stabiles Team möchte Sprints vergleichen und Releases aus seiner eigenen Historie prognostizieren.',
        'Prognosen für Stakeholder: „Dieses Epic umfasst etwa 60 Punkte, und wir schaffen im Schnitt 25 pro Sprint“ ist eine konkrete, belastbare Antwort.',
      ],
    },
    {
      title: 'Wann du T-Shirt-Größen nutzen solltest',
      content: 'T-Shirt-Größen gewinnen, wenn Tempo und Zugänglichkeit wichtiger sind als Rechnen:',
      items: [
        'Backlog-Sichtung: Dutzende Einträge einordnen, um zu entscheiden, welche eine weitere Verfeinerung lohnen.',
        'Roadmap- und Quartalsplanung: Epics oder Initiativen vergleichen, die später ohnehin heruntergebrochen werden.',
        'Neue Teams: Ein Team in seinen ersten Sprints hat noch keine Velocity und keine Referenz-Stories; mit T-Shirts kann es ohne viel Zeremonie losschätzen.',
        'Gemischtes Publikum: Wenn Designerinnen, Produktmanager oder Fachbereiche teilnehmen, wirken Größen weniger einschüchternd und werden seltener mit Zusagen verwechselt.',
      ],
    },
    {
      title: 'Lassen sich T-Shirt-Größen in Story Points umrechnen?',
      content: 'Ja, und viele Teams tun das – behandle die Zuordnung aber als praktische Hilfe, nicht als Tatsache. Eine verbreitete Zuordnung ist XS = 1, S = 2, M = 3 oder 5, L = 8, XL = 13, XXL = 20 oder mehr. Das Team sollte die Zuordnung gemeinsam festlegen, aufschreiben und stabil halten, denn eine stillschweigende Änderung verfälscht die Velocity-Historie.',
      paragraphs: [
        'Sauberer ist es, gar nicht umzurechnen: Behalte T-Shirt-Größen für Epics und weit entfernte Einträge bei und schätze einzelne Stories in Fibonacci-Punkten neu, sobald sie in die Nähe eines Sprints rücken. Die T-Shirt-Größe war eine grobe Sortierung; die Story-Point-Schätzung entsteht mit besseren Informationen und einer richtigen Referenz-Story.',
        'Was auch immer du tust: Rechne Punkte oder Größen nie [in Stunden pro Story](/blog/story-points-vs-hours) um. Beide Skalen beschreiben relative Größe. Zeitangaben ergeben sich aus der Velocity, die über ganze Sprints gemessen wird, nicht aus einer Formel pro Story.',
      ],
    },
    {
      title: 'Ein Beispiel: dieselben drei Stories auf beiden Skalen',
      content: 'Stell dir ein Team vor, das drei Stories verfeinert. Seine Fibonacci-Referenz lautet „Der Passwort-Reset war eine 3“; seine T-Shirt-Anker sind „Passwort-Reset = S“ und „Admin-Dashboard = L“.',
      paragraphs: [
        '„Nach dem Speichern des Profils eine Bestätigungsmeldung anzeigen.“ Fibonacci: Alle spielen 1 oder 2, festgehalten wird 2. T-Shirt: Alle spielen XS. Beide Skalen sind sich einig, und keine brauchte eine Diskussion.',
        '„Bestellhistorie als CSV exportieren, mit Seitenaufteilung für große Konten.“ Fibonacci: Die Karten zeigen 5, 5, 8, 8, 13; nachdem die Person mit der 13 erklärt hat, dass zwei Services beteiligt sind, einigt sich das Team auf 8. T-Shirt: Dieselbe Story erhält M, M, L, L, L; das Team einigt sich auf L. Die Fibonacci-Diskussion lieferte ein konkreteres Ergebnis; die T-Shirt-Diskussion stellte nur „größer als M“ fest.',
        '„Den neuen Zahlungsanbieter integrieren.“ Fibonacci: Die Hälfte des Teams spielt „?“, der Rest 40 oder 100 – die Story geht in einen Spike. T-Shirt: Alle spielen XL, und das Team hält das zufrieden fest. Hier hat die gröbere Skala ein Problem verdeckt: Auf XL konnte man sich leicht einigen, weil es zu nichts verpflichtet, während Fibonacci das Team zwang, zuzugeben, dass es nicht genug wusste.',
      ],
    },
    {
      title: 'Typische Fehler mit beiden Skalen',
      content: 'Beide Skalen scheitern auf vorhersehbare Weise, wenn sie ohne Referenz oder mit der falschen Absicht eingesetzt werden:',
      items: [
        'Fibonacci: Punkte in Stunden umrechnen („Eine 5 ist ungefähr ein Tag“). Sobald das passiert, ist die Skala nur noch Stunden mit Umweg, und alle Anti-Patterns der Stundenschätzung kehren zurück.',
        'Fibonacci: Punkte zur Messung individueller Produktivität nutzen. Innerhalb von ein, zwei Sprints blähen sich die Schätzungen auf, und die Velocity verliert jede Aussagekraft.',
        'T-Shirt: zu viele Größen verwenden. Wer bei jedem Eintrag haarfein zwischen XXS, XS und S unterscheidet, holt sich die Feinheit von Zahlen zurück, ohne mit ihnen rechnen zu können. Fünf oder sechs Kategorien reichen meist, auch wenn dein Deck mehr bietet.',
        'T-Shirt: einen Sprint nur mit Größen planen. „Drei L und vier M“ sagt nicht, ob der Sprint voll ist. Rechne um oder schätze neu, bevor du dich festlegst.',
      ],
    },
    {
      title: 'Weitere Skalen: Zweierpotenzen und eigene Decks',
      content: 'Fibonacci und T-Shirts sind die verbreitetsten Skalen, aber nicht die einzigen. Zweierpotenzen (1, 2, 4, 8, 16, 32) verdoppeln sich von Karte zu Karte noch strikter und passen zu Teams, die jeden Schritt eindeutig haben möchten. Manche Teams legen ein eigenes Deck an, das nur die Werte enthält, die sie tatsächlich nutzen, zum Beispiel 1, 2, 3, 5, 8, 13 und „?“.',
      paragraphs: [
        'Scrum Poker Online unterstützt Fibonacci, T-Shirt, Zweierpotenzen und eigene Decks, und der Host des Raums kann das Deck zwischen den Runden wechseln. Der Übergang von einer Roadmap-Session zur Sprint-Planung ist also nur eine Einstellung, kein Toolwechsel. Es ist kostenlos, braucht keine Registrierung und unterstützt bis zu 50 Teilnehmer.',
      ],
    },
    {
      title: 'Unsere Empfehlung',
      content: 'Beginne mit Fibonacci, wenn dein Team in Sprints plant, die Velocity verfolgt oder Story Points bereits in seinen Tools pflegt. Beginne mit T-Shirt-Größen, wenn das Team neu im Schätzen ist, das Backlog groß und grob ist oder fachfremde Stakeholder mit am Tisch sitzen. Nutze beides, wenn du eine lange Roadmap hast: T-Shirts, um die ferne Zukunft zu sortieren, Fibonacci für die nächsten Sprints. Was immer du wählst: [Starte einen kostenlosen Planning-Poker-Raum](/) zum Ausprobieren, halte einen Referenzeintrag sichtbar, lass gleichzeitig aufdecken und übersetze das Ergebnis nie in Stunden pro Story.',
    },
  ],
  faq: [
    {
      q: 'Warum nutzt agiles Schätzen die Fibonacci-Folge?',
      a: 'Weil die Abstände zwischen aufeinanderfolgenden Werten mit den Werten selbst wachsen – das entspricht der Art, wie Menschen Größenunterschiede wahrnehmen. Ein Team kann eine 2 von einer 3 unterscheiden, aber keine 20 von einer 21; also lässt das Deck die Werte aus, die niemand auseinanderhalten kann.',
    },
    {
      q: 'Sind T-Shirt-Größen dasselbe wie Story Points?',
      a: 'Nein. Beides sind relative Schätzskalen, aber Story Points sind Zahlen, die sich summieren und in Velocity umwandeln lassen, während T-Shirt-Größen Kategorien sind, die sich ohne vereinbarte Zuordnung nicht addieren lassen.',
    },
    {
      q: 'Wie rechne ich T-Shirt-Größen in Story Points um?',
      a: 'Leg im Team eine Zuordnung fest, zum Beispiel XS = 1, S = 2, M = 3 oder 5, L = 8, XL = 13, schreib sie auf und halte sie stabil. Noch besser: Schätze Stories in Punkten neu, sobald sie in die Nähe eines Sprints rücken, statt mechanisch umzurechnen.',
    },
    {
      q: 'Entspricht 1 Story Point 1 Stunde?',
      a: 'Nein. Story Points beschreiben relative Größe, keine Zeit. Zeitprognosen ergeben sich aus der Velocity, die über ganze Sprints gemessen wird, nicht aus einer Umrechnung pro Story.',
    },
    {
      q: 'Welche Skala eignet sich besser für ein neues agiles Team?',
      a: 'T-Shirt-Größen sind meist der leichtere Einstieg, weil sie weder eine Referenz-Story noch eine Velocity-Historie brauchen. Sobald das Team einige abgeschlossene Stories als Anker hat, kann es für die Sprint-Planung zu Fibonacci wechseln.',
    },
  ],
};

export default de;
