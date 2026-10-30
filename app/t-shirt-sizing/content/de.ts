import type { LandingContent } from '@/app/landingTypes';

const de: LandingContent = {
  breadcrumb: 'T-Shirt-Größen',
  title: 'T-Shirt-Größen in der agilen Schätzung: ein praktischer Leitfaden',
  subtitle: 'Schätze mit XS, S, M, L und XL statt mit Zahlen: wann das funktioniert, wann nicht und wie du eine Session durchführst.',
  sections: [
    {
      blocks: [
        { p: '**T-Shirt-Größen** sind eine relative Schätztechnik, bei der ein Team Arbeit als extra klein, klein, mittel, groß oder extra groß einstuft, statt ihr eine Zahl zuzuweisen. Sie tauscht Genauigkeit gegen Tempo und Zugänglichkeit: Fast jeder kann sagen „Das fühlt sich nach M an“, ohne vorher einen Vortrag über Story Points zu hören. Agile Teams nutzen sie für die frühe Roadmap-Planung, für die Größenschätzung von Epics und überall dort, wo Zahlen mehr Diskussion auslösen würden, als sie wert sind. Dieser Leitfaden erklärt die Größen, wann T-Shirt-Größen numerischen Decks überlegen sind, wie du Größen bei Bedarf in Punkte umrechnest und wie du eine Session mit deinem Team durchführst.' },
      ],
    },
    {
      title: 'Was sind T-Shirt-Größen?',
      blocks: [
        { p: 'Die Methode leiht sich die vertraute Größenskala aus der Kleidung. Jeder Eintrag im Backlog bekommt eine Größe, und das Team vergleicht die Einträge miteinander, statt sie an der Uhr zu messen. Ein „L“ ist keine Stundenzahl; es ist einfach größer als ein „M“ und kleiner als ein „XL“. Weil die Bezeichnungen grob sind, verbringt das Team weniger Zeit damit, über kleine Unterschiede zu streiten, und mehr Zeit mit der Frage, auf die es ankommt: Ist dieser Eintrag ungefähr so groß wie der letzte oder deutlich größer?' },
        { p: 'T-Shirt-Größen werden meist als [Planning Poker](/blog/what-is-planning-poker) geschätzt: verdeckt abstimmen, gleichzeitig aufdecken, Ausreißer besprechen, nur eben mit Größenkarten statt Zahlenkarten. Der Ablauf bleibt gleich; nur das Vokabular ändert sich.' },
      ],
    },
    {
      title: 'Die Größen: von XS bis XXL und das erweiterte Deck',
      blocks: [
        { p: 'Der Standardsatz umfasst fünf oder sechs Größen:' },
        {
          sizes: [
            { size: 'XS', desc: 'Trivial. Eine Textänderung, ein umgelegter Konfigurationsschalter, ein Einzeiler.' },
            { size: 'S', desc: 'Klein und gut verstanden. Höchstens ein Tag für eine Person, ohne zu erwartende Überraschungen.' },
            { size: 'M', desc: 'Eine typische Story. Klarer Umfang, einige bewegliche Teile, passt bequem in einen Sprint.' },
            { size: 'L', desc: 'Eine große Story. In einem Sprint lieferbar, braucht aber wahrscheinlich mehr als eine Person oder den Großteil des Sprints.' },
            { size: 'XL', desc: 'Sehr groß. Vermutlich ein verkapptes Epic; vor einer Zusage lohnt es sich, es aufzuteilen.' },
            { size: 'XXL', desc: 'Zu groß zum Planen. Erfordert Discovery-Arbeit, bevor jemand die Größe verantwortungsvoll schätzen kann.' },
          ],
        },
        { p: 'Das T-Shirt-Deck in Scrum Poker Online erweitert das auf `Z, T, XXS, XS, S, M, L, XL, XXL, XXXL`, dazu die Karten ? und ☕. Z (Zero, null) steht für Einträge, die bereits erledigt sind oder keine Arbeit erfordern, T (Tiny, winzig) liegt unter XXS für die kleinste denkbare Änderung, und XXXL kennzeichnet Arbeit, die so groß ist, dass eine Schätzung sinnlos ist, bis sie zerlegt wurde. Die meisten Teams nutzen nur die Mitte des Decks; die Extreme sind dafür da, dass niemand eine schlecht passende Größe erzwingen muss. Wenn du einen kürzeren oder anderen Satz bevorzugst, hilft ein eigenes Deck mit bis zu 20 Karten (je bis zu 4 Zeichen). Alle Decks werden auf der Seite [Planning-Poker-Karten](/planning-poker-cards) verglichen.' },
      ],
    },
    {
      title: 'Wann relative Größen besser sind als Zahlen',
      blocks: [
        { p: 'Numerische Decks wie [Fibonacci](/fibonacci-planning-poker) eignen sich hervorragend für Arbeit auf Sprint-Ebene. T-Shirt-Größen spielen ihre Stärken in drei Situationen aus:' },
        {
          ul: [
            '**Frühe Roadmap-Planung.** Wenn du fünfzig mögliche Features hast und wissen musst, in welchem Quartal sie landen könnten, ist es weitaus nützlicher, sie an einem Nachmittag als S, M oder L einzustufen, als eine Woche lang Story Points zu vergeben, die ohnehin falsch sein werden.',
            '**Epics und Initiativen.** Große Einträge haben zu viele Unbekannte, als dass eine Zahl etwas aussagen könnte. „Dieses Epic ist ein XL“ ist ehrlich; „Dieses Epic hat 89 Punkte“ täuscht eine Genauigkeit vor, die niemand hat.',
            '**Teams außerhalb der Entwicklung.** Marketing-, Design-, Operations- und Content-Teams empfinden Story Points oft als fremd. Größen sind intuitiv, brauchen keine Schulung und bringen denselben Nutzen: ein gemeinsames, relatives Gefühl für den Aufwand.',
          ],
        },
        { p: 'Größen nehmen Diskussionen außerdem die Schärfe. Niemand verteidigt so leidenschaftlich, dass eine Story ein M und kein L ist, wie man über eine 5 gegenüber einer 8 streiten würde, und so stellt sich der Konsens meist schneller ein. Einen ausführlicheren Vergleich findest du unter [Fibonacci vs. T-Shirt-Größen](/blog/fibonacci-vs-tshirt).' },
      ],
    },
    {
      title: 'Größen in Story Points umrechnen (optional)',
      blocks: [
        { p: 'Manche Teams möchten T-Shirt-Größen in die Velocity oder ein Kapazitätsmodell einfließen lassen, und dafür brauchen sie Zahlen. Eine verbreitete Zuordnung ist `XS=1, S=2, M=3, L=5, XL=8, XXL=13`, die sich an der Fibonacci-Folge orientiert. Ein anderer Ansatz definiert jede Größe als Spanne: S sind 1 bis 3 Punkte, M 5 bis 8, L 13 bis 21, und alles Größere bleibt ungeschätzt.' },
        { p: 'Zwei Einschränkungen. Erstens ist das optional. Viele Teams rechnen nie um und fahren besser damit, denn sobald Größen zu Zahlen werden, behandeln die Leute sie als Zusagen. Zweitens muss die gewählte Zuordnung vor der Session vereinbart werden, nicht danach, sonst driften die Schätzungen in Richtung der Zuordnung, die den Plan am besten aussehen lässt. Wenn du bei jeder Story umrechnest, willst du wahrscheinlich von vornherein ein numerisches Deck. Und wenn die Umrechnung in Wahrheit ein Versuch ist, auf Stunden zu kommen, lies [Story Points vs. Stunden](/blog/story-points-vs-hours), bevor du weitermachst.' },
      ],
    },
    {
      title: 'So führst du eine Session mit T-Shirt-Größen durch',
      blocks: [
        {
          ol: [
            '**Einigt euch auf Referenzeinträge.** Wählt eine Story, die das Team übereinstimmend als S einstuft, und eine, die ein L ist. Alles andere wird relativ zu diesen beiden eingeordnet.',
            '**Haltet die Liste kurz.** Die Größenschätzung funktioniert am besten in Paketen von zehn bis dreißig Einträgen mit je einer Beschreibung in einem Satz. Fügt sie in die Story-Warteschlange ein oder importiert eine CSV-Datei bzw. einen Jira-Export, damit die Moderation sie durchgehen kann, ohne durch eine Tabelle zu scrollen.',
            '**Verdeckt abstimmen, gemeinsam aufdecken.** Alle wählen eine Größenkarte; die Karten bleiben verdeckt, bis die Runde aufgedeckt wird. So verhindert ihr, dass die erfahrenste Stimme im Raum die Größe für alle anderen festlegt.',
            '**Diskutiert nur echte Meinungsverschiedenheiten.** Ein S neben einem M ist keine Debatte wert. Ein S neben einem XL schon: Eine der beiden Personen weiß etwas, das die andere nicht weiß.',
            '**Festhalten und weitermachen.** Haltet für jeden Eintrag die endgültige Größe fest; der Rundenverlauf lässt sich als CSV herunterladen oder als Markdown kopieren, sodass die Größen in eurem Backlog-Tool landen, ohne dass jemand sie abtippen muss.',
          ],
        },
        { p: 'Eine Session mit dreißig Einträgen dauert in der Regel weniger als eine Stunde. Dauert sie länger, sind vermutlich die Einträge zu vage und nicht das Team zu langsam.' },
      ],
    },
    {
      title: 'Typische Fallstricke',
      blocks: [
        {
          ul: [
            '**Größen als Zeitdauer behandeln.** „M heißt drei Tage“ macht aus relativer Größenschätzung still und leise eine Stundenschätzung durch die Hintertür. Größen sind Vergleiche, keine Kalender.',
            '**Zu viele Größen.** Wenn das Team bei jedem Eintrag zwischen XS und S hadert, einigt euch darauf, XS wegzulassen. Weniger Klassen bedeuten schnellere Entscheidungen.',
            '**Die Referenzeinträge weglassen.** Ohne ein vereinbartes S und L versteht jeder unter „mittel“ etwas anderes, und die Ergebnisse sind Rauschen.',
            '**Allein schätzen.** Wenn eine einzelne Person ein Backlog schätzt, spiegelt das nur ihre Annahmen wider. Der Wert entsteht aus den Meinungsverschiedenheiten zwischen mehreren Personen.',
            '**Nie neu bewerten.** Eine Größe aus der Roadmap-Planung ist eine Momentaufnahme. Schätze die Größe neu, bevor der Eintrag tatsächlich in einen Sprint kommt und mehr bekannt ist.',
          ],
        },
      ],
    },
    {
      title: 'Beispiel-Session',
      blocks: [
        { example: 'Ein Produktteam plant das nächste Quartal und hat zwölf mögliche Features. Mithilfe der Story-Warteschlange schätzt es ihre Größe in vierzig Minuten. Bei neun Einträgen liegen die Stimmen sofort beieinander. Bei „Self-Service-Abrechnung“ gehen die Stimmen zwischen L und XXL auseinander; die Person mit XXL weist darauf hin, dass dafür eine Integration zur Steuerberechnung nötig ist, deren Umfang noch niemand geklärt hat. Das Team hält XL fest und legt eine Discovery-Aufgabe an. Bei „Dunkles Design“ gehen die Stimmen zwischen S und L auseinander; der Person mit L fällt ein, dass die Diagrammbibliothek ihre Farben fest im Code hinterlegt. Am Ende wird es ein M. Am Ende steht eine geschätzte Liste mit zwei neu entdeckten Risiken – und niemand hat darüber gestritten, ob etwas eine 5 oder eine 8 ist.' },
      ],
    },
  ],
  faqTitle: 'Häufig gestellte Fragen',
  faq: [
    {
      q: 'Sind T-Shirt-Größen dasselbe wie Story Points?',
      a: 'Nein. Story Points sind numerisch und fließen in die Velocity ein; Größen sind ordinale Bezeichnungen. Du kannst Größen Punkten zuordnen, aber diese Zuordnung ist eine Konvention, auf die sich das Team einigt, keine Messung.',
    },
    {
      q: 'Wie viele Größen sollten wir verwenden?',
      a: 'Fünf sind ein guter Standard (XS bis XL). Nehmt XXL hinzu, wenn ihr regelmäßig auf Einträge stoßt, die zu groß zum Planen sind, und lasst XS weg, wenn das Team es selten nutzt. Das erweiterte Deck gibt es, damit ihr das nicht vorab entscheiden müsst.',
    },
    {
      q: 'Können wir T-Shirt-Größen für die Sprint-Planung verwenden?',
      a: 'Das geht, aber die meisten Teams wechseln für Stories auf Sprint-Ebene zu einem numerischen Deck, weil sich die Velocity so leichter verfolgen lässt. Nutze Größen für die Roadmap und Epics und dann Fibonacci, sobald die Stories verfeinert sind.',
    },
    {
      q: 'Was, wenn sich das Team nicht auf eine Größe einigen kann?',
      a: 'Besprecht die beiden Extreme und stimmt dann einmal neu ab. Ist das Team immer noch gespalten, nehmt die größere Größe, denn Unterschätzen schadet meist mehr als Überschätzen, und vermerkt die Unsicherheit beim Eintrag.',
    },
  ],
  ctaText: 'Schätze dein Backlog mit dem T-Shirt-Deck. Kostenlos, ohne Registrierung, bis zu 50 Teilnehmer pro Raum.',
  ctaLabel: 'Kostenlosen Raum erstellen',
  relatedTitle: 'Weiterlesen',
  related: [
    { href: '/fibonacci-planning-poker', label: 'Fibonacci-Planning-Poker' },
    { href: '/planning-poker-cards', label: 'Planning-Poker-Karten und -Decks' },
    { href: '/guide', label: 'Eine Scrum-Poker-Session Schritt für Schritt leiten' },
    { href: '/blog/estimation-consensus', label: 'Konsens beim Schätzen erreichen' },
    { href: '/blog/story-points-vs-hours', label: 'Story Points vs. Stunden' },
    { href: '/blog', label: 'Alle Artikel im Blog' },
  ],
};

export default de;
