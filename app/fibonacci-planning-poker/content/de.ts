import type { LandingContent } from '@/app/landingTypes';

const de: LandingContent = {
  breadcrumb: 'Fibonacci-Planning-Poker',
  title: 'Fibonacci-Planning-Poker: Karten, Zahlenfolge und Anwendung',
  subtitle: 'Das beliebteste Planning-Poker-Deck erklärt: was die Zahlen bedeuten, warum die Abstände wachsen und wie du mit deinem Team eine Runde durchführst.',
  sections: [
    {
      blocks: [
        { p: '**Fibonacci-Planning-Poker** ist die gängigste Methode, mit der agile Teams User Stories schätzen. Statt Stunden zu raten, wählt jede Person eine Karte aus einer kurzen, festen Zahlenfolge (0, 1, 2, 3, 5, 8, 13, 21 und so weiter), und alle decken gleichzeitig auf. Das Ergebnis ist eine relative Schätzung in Story Points, auf die sich das ganze Team geeinigt hat. Dieser Leitfaden erklärt die Zahlenfolge, warum sie funktioniert, wie du eine Runde durchführst und was zu tun ist, wenn eine Story bei den großen Karten landet. Neu bei der Technik? Lies zuerst [Was ist Planning Poker?](/blog/what-is-planning-poker) und komm dann hierher zurück.' },
      ],
    },
    {
      title: 'Die Fibonacci-Folge im Planning Poker',
      blocks: [
        { p: 'Die mathematische Fibonacci-Folge beginnt mit 0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55; jede Zahl ist die Summe der beiden vorherigen. Planning-Poker-Decks übernehmen die Form, nicht die Arithmetik: Die doppelte 1 entfällt, und oberhalb von 13 gehen die Decks auseinander:' },
        {
          ul: [
            '**Klassisches Fibonacci:** `0, 1, 2, 3, 5, 8, 13, 21, 34, 55`. Das ist das Fibonacci-Deck in Scrum Poker Online, ergänzt um die Karten ? und ☕.',
            '**Modifiziertes Fibonacci:** `0, ½, 1, 2, 3, 5, 8, 13, 20, 40, 100`. Die großen Zahlen sind gerundet, um zu zeigen, dass es sich um grobe Größenklassen handelt, nicht um exakte Werte. Das ist das Scrum-Deck in Scrum Poker Online, ebenfalls mit ? und ☕.',
            '**Kurze Varianten:** Manche Teams hören bei 13 oder 21 auf und betrachten alles darüber als zu groß zum Schätzen.',
          ],
        },
        { p: 'Welche Variante du verwendest, ist weit weniger wichtig, als sie konsequent zu verwenden. Ein Team, das ein Jahr lang mit 21, 34 und 55 geschätzt hat, hat ein gemeinsames Gefühl dafür entwickelt, was diese Zahlen bedeuten; ein Wechsel zu 20, 40 und 100 würde diese Kalibrierung zurücksetzen. Brauchst du andere Werte, kannst du mit einem eigenen Deck mit bis zu 20 Karten (je bis zu 4 Zeichen) deine eigenen festlegen. Die anderen Standard-Decks werden auf der Seite [Planning-Poker-Karten](/planning-poker-cards) verglichen.' },
      ],
    },
    {
      title: 'Warum die Abstände wachsen: Unsicherheit wächst mit der Größe',
      blocks: [
        { p: 'Das prägende Merkmal der Folge ist, dass der Abstand zwischen benachbarten Karten mit den Zahlen wächst. Zwischen 1 und 2 liegt ein Punkt, zwischen 13 und 21 sind es acht, zwischen 34 und 55 einundzwanzig. Das ist Absicht, und es ist der Hauptgrund, warum sich Fibonacci gegenüber einer einfachen Skala von 1 bis 10 durchgesetzt hat.' },
        { p: 'Menschen können eine winzige Aufgabe recht gut von einer kleinen unterscheiden, eine große Aufgabe von einer etwas größeren dagegen kaum. Böte dein Deck 20, 21, 22 und 23 an, würde das Team über Unterschiede streiten, die niemand tatsächlich wahrnehmen kann, und die endgültige Zahl hätte eine Genauigkeit, die ihr nicht zusteht. Weil das Deck nur 13 und 21 anbietet, stellt es eine gröbere, ehrlichere Frage: Liegt das eher bei 13 oder bei 21? Darauf gibt es eine Antwort. Auf „Ist das eine 17 oder eine 18?“ nicht. Kleine, gut verstandene Stories bekommen fein abgestufte Karten; große Stories verbergen Unbekanntes und bekommen deshalb grobe.' },
      ],
    },
    {
      title: 'So führst du eine Runde Fibonacci-Planning-Poker durch',
      blocks: [
        {
          ol: [
            '**Wähle eine Referenz-Story.** Nimm eine bereits gelieferte Story, die das Team übereinstimmend als 2 oder 3 einstuft. Jede weitere Schätzung erfolgt relativ dazu.',
            '**Stell die Story vor.** Der Product Owner liest die Story und die Akzeptanzkriterien vor; das Team stellt Fragen, bis der Umfang klar ist.',
            '**Stimmt verdeckt ab.** Alle, die schätzen, wählen eine Karte. Online bleiben die Karten verdeckt, bis die Runde aufgedeckt wird, sodass niemand von der zuerst genannten Zahl beeinflusst wird.',
            '**Deckt gemeinsam auf.** Alle Karten drehen sich gleichzeitig um. Scrum Poker Online zeigt die Stimmenverteilung, Minimum, Median, Durchschnitt und Maximum, ob Konsens erreicht wurde, sowie eine vorgeschlagene Schätzung.',
            '**Besprecht die Ausreißer.** Hat eine Person 3 gewählt und eine andere 13, erklären beide ihre Gründe. Hinter der Lücke steckt fast immer eine Annahme: eine fehlende API, eine vergessene Migration, ein Test-Setup, das es schon gibt.',
            '**Stimmt bei Bedarf neu ab.** Die meisten Stories nähern sich in zwei Runden an. Falls nicht, nehmt den höheren Wert oder teilt die Story auf. Sobald ihr euch einig seid, haltet die endgültige Schätzung fest und geht zur nächsten Story über.',
          ],
        },
        { p: 'Plane für jede Story nur wenige Minuten ein; der gemeinsame Timer im Raum (zählt hoch oder herunter) sorgt dafür, dass die Diskussion nicht ausufert. Wie du ein gespaltenes Team zur Einigung bringst, erfährst du unter [Konsens beim Schätzen erreichen](/blog/estimation-consensus).' },
      ],
    },
    {
      title: 'Fibonacci-Karten und Story Points',
      blocks: [
        { p: 'Story Points sind die Einheit, Fibonacci-Karten die erlaubten Werte. Eine 5 bedeutet „etwa fünfmal so viel Aufwand wie eine 1 und etwas weniger als das Doppelte einer 3“. Für sich genommen hat die absolute Zahl keine Bedeutung: Eine 5 in einem Team kann in einem anderen eine 8 sein, und deshalb lassen sich Punkte nicht sauber in Stunden umrechnen. Wenn du versucht bist, umzurechnen, lies zuerst [Story Points vs. Stunden](/blog/story-points-vs-hours).' },
        { p: 'Was die Karten üblicherweise signalisieren:' },
        {
          ul: [
            '**0**: trivial, bereits erledigt oder eine risikolose Konfigurationsänderung.',
            '**1 bis 2**: klein, gut verstanden, keine Unbekannten.',
            '**3 bis 5**: eine typische Sprint-Story mit klarem Umfang und einigen beweglichen Teilen.',
            '**8**: groß, aber von ein oder zwei Personen in einem Sprint lieferbar.',
            '**13**: die Obergrenze dessen, was die meisten Teams als einzelne Sprint-Story akzeptieren.',
            '**21 und mehr**: ein Epic oder eine Story mit großen Unbekannten. Meist ein Zeichen, dass sie aufgeteilt werden sollte.',
          ],
        },
      ],
    },
    {
      title: 'Die Karten ? und ☕',
      blocks: [
        { p: 'Jedes fertige Deck in Scrum Poker Online enthält zwei nicht numerische Karten (ein eigenes Deck enthält nur die Karten, die du hinzufügst), und sie sind nützlicher, als sie aussehen.' },
        { p: 'Die Karte **?** bedeutet „Ich kann das noch nicht schätzen“. Das ist keine Ausrede, sondern eine Information. Spielen zwei Personen ?, braucht die Story ein Gespräch über den Umfang, bevor das Team erneut abstimmt. Ein ? ist besser, als eine 8 zu raten und zu hoffen.' },
        { p: 'Die Karte **☕** bedeutet „Ich brauche eine Pause“. Die Qualität der Schätzungen sinkt, wenn die Leute müde werden, und mehrere Kaffeekarten hintereinander sind ein verlässliches Zeichen, dass die Session zu lange dauert. Gönnt euch fünf Minuten Pause und macht dann weiter.' },
      ],
    },
    {
      title: 'Wann du bei 13 oder 21 deckelst und die Story aufteilst',
      blocks: [
        { p: 'Viele Teams legen fest, dass alles, was auf 13 oder höher geschätzt wird, aufgeteilt werden muss, bevor es in einen Sprint kommt. Je größer die Schätzung, desto breiter die Unsicherheit, und eine 21, die sich als 34 herausstellt, kann einen Sprint zum Scheitern bringen. Durch das Aufteilen wird aus einer unscharfen Zahl eine Reihe schärferer.' },
        { p: 'Praktische Möglichkeiten zum Aufteilen:' },
        {
          ul: [
            '**Nach Arbeitsschritt:** „Formular absenden“ getrennt von „prüfen und freigeben“.',
            '**Nach Datenvariante:** zuerst der Normalfall, Sonderfälle später.',
            '**Nach Schnittstelle:** zuerst die API, dann die UI.',
            '**Nach Akzeptanzkriterium:** Jedes Kriterium wird zu einer eigenen Story.',
          ],
        },
        { p: 'Ob du bei 13 oder 21 deckelst, hängt von Sprintlänge und Teamgröße ab; bei zweiwöchigen Sprints und einem fünfköpfigen Team landet man meist bei 13. Entscheide es einmal, schreib es auf und wende es konsequent an.' },
      ],
    },
    {
      title: 'Beispielrunde',
      blocks: [
        { example: 'Ein fünfköpfiges Team schätzt „Nutzer können ihren Rundenverlauf als CSV exportieren“. Aufgedeckt werden 3, 5, 5, 8 und 13: kein Konsens, eine Spanne von 3 bis 13, und als Vorschlag die 8 als die Karte, die dem Durchschnitt von 6,8 am nächsten liegt. Die Person mit der 13 erklärt, dass die Verlaufstabelle keine Paginierung hat und der Export von Tausenden Zeilen in einen Timeout laufen wird. Die Person mit der 3 wusste nicht, dass der Export auch für Zuschauer funktionieren muss. Das Team einigt sich darauf, dass der Kern-Export eine 5 ist, und legt eine separate Story für die Paginierung an. Die zweite Abstimmung ergibt 5, 5, 5, 5, 8: nah genug, um die 5 zu übernehmen und weiterzumachen.' },
        { p: 'Das ist die ganze Technik: Die Zahlen sind weniger wichtig als das Gespräch, das sie auslösen.' },
      ],
    },
  ],
  faqTitle: 'Häufig gestellte Fragen',
  faq: [
    {
      q: 'Warum nicht einfach eine Skala von 1 bis 10?',
      a: 'Eine lineare Skala unterstellt, dass du eine 7 von einer 8 unterscheiden kannst. Bei allem, was größer als eine kleine Aufgabe ist, kannst du das nicht, und das Team verschwendet Zeit mit Scheingenauigkeit. Die Abstände bei Fibonacci wachsen mit der Schätzung, genau wie die Unsicherheit.',
    },
    {
      q: 'Ist 21 eine echte Fibonacci-Zahl, oder sollte ich 20 verwenden?',
      a: 'Beides ist verbreitet. 21 ist der echte Fibonacci-Wert; 20, 40 und 100 stammen aus dem modifizierten Deck (dem Scrum-Deck in Scrum Poker Online) und sind gerundet, um zu betonen, dass es grobe Größenklassen sind. Entscheide dich für eine Variante und bleib dabei.',
    },
    {
      q: 'Sollte ich den Durchschnitt der Stimmen nehmen?',
      a: 'Nicht automatisch. Der Durchschnitt von 3 und 13 ist 8, aber das verdeckt genau die Meinungsverschiedenheit, auf die es ankommt. Besprecht zuerst die Ausreißer; ist das Team nach einer erneuten Abstimmung immer noch gespalten, nehmt lieber den höheren Wert oder teilt die Story auf.',
    },
    {
      q: 'Kann ich Fibonacci-Karten auch für Bugs und technische Schulden verwenden?',
      a: 'Ja, solange sie relativ zur selben Referenz-Story geschätzt werden wie alles andere. Viele Teams reservieren die 0 für triviale Bugs und schätzen den Rest ganz normal.',
    },
  ],
  ctaText: 'Bereit, mit Fibonacci-Karten zu schätzen? Kostenlos, bis zu 50 Personen pro Raum, ohne Registrierung.',
  ctaLabel: 'Kostenlosen Raum erstellen',
  relatedTitle: 'Weiterlesen',
  related: [
    { href: '/t-shirt-sizing', label: 'T-Shirt-Größen in der agilen Schätzung' },
    { href: '/planning-poker-cards', label: 'Planning-Poker-Karten und -Decks' },
    { href: '/guide', label: 'Eine Scrum-Poker-Session Schritt für Schritt leiten' },
    { href: '/blog/fibonacci-vs-tshirt', label: 'Fibonacci vs. T-Shirt-Größen' },
    { href: '/blog/story-points-vs-hours', label: 'Story Points vs. Stunden' },
    { href: '/blog', label: 'Alle Artikel im Blog' },
  ],
};

export default de;
