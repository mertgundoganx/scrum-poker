import type { Localized } from '../articleTypes';

const de: Localized = {
  title: 'Die besten kostenlosen Scrum-Poker-Tools: Worauf du achten solltest',
  subtitle: 'Ein praktischer Leitfaden zur Auswahl kostenloser Planning-Poker-Tools: die Kriterien, auf die es ankommt, die verfügbaren Tool-Kategorien, Fragen vor der Entscheidung und wie Scrum Poker Online dabei abschneidet.',
  sections: [
    {
      title: 'Warum „kostenlos“ einen genaueren Blick verdient',
      content: 'Wer nach einem kostenlosen Scrum-Poker-Tool sucht, findet Dutzende Angebote, und die meisten bezeichnen sich selbst als kostenlos. In der Praxis deckt „kostenlos“ eine große Bandbreite ab: komplett kostenlose Produkte, Gratis-Tarife mit begrenzter Teilnehmer- oder Raumzahl, ablaufende Testphasen und Open-Source-Projekte, die du selbst betreibst. Nichts davon ist falsch, aber die Unterschiede werden wichtig, wenn ein zehnköpfiges Team am Donnerstagmorgen schätzen will und feststellt, dass der zehnte Platz, der Timer oder der Export hinter einer Bezahlschranke liegt.',
      paragraphs: [
        'Statt Produkte nach Funktionslisten zu ranken, die sich jedes Quartal ändern – und die wir nicht unabhängig überprüfen können –, gibt dir dieser Leitfaden ein beständiges Set an Kriterien. Damit kannst du jedes Planning-Poker-Tool in etwa fünfzehn Minuten bewerten, auch solche, die erst nach Erscheinen dieses Artikels auftauchen.',
        'Die Kurzfassung: Wähle ein Tool, das dein ganzes Team sofort öffnen kann, das die Stimmen bis zum Aufdecken verdeckt hält, das das Deck unterstützt, das ihr tatsächlich nutzt, und mit dem du die Ergebnisse behalten kannst. Alles andere ist ein Bonus.',
      ],
    },
    {
      title: 'Was ist ein Scrum-Poker-Tool, und brauchst du eines?',
      content: 'Ein Scrum-Poker-Tool (Planning-Poker-Tool) ersetzt beim Schätzen das physische Kartendeck. Alle betreten einen gemeinsamen Raum, die Moderation stellt eine User Story vor, alle Teilnehmenden wählen verdeckt eine Karte, und alle Karten werden gleichzeitig aufgedeckt. Anschließend zeigt das Tool die Streuung, oft mit einem Durchschnitt oder einer vorgeschlagenen Schätzung, und das Team diskutiert und stimmt bei Bedarf erneut ab.',
      paragraphs: [
        'Teams vor Ort kommen mit physischen Karten aus. Remote- und Hybrid-Teams nicht: Wird im Chat abgestimmt oder schaltet eine Person nach der anderen das Mikrofon ein, um ihre Zahl zu nennen, kehrt der Ankereffekt zurück – genau das Problem, das [die Planning-Poker-Methode](/blog/what-is-planning-poker) beseitigen soll. Nimmt auch nur ein Mitglied deines Teams per Videocall an der Sprint-Planung teil, lohnt sich ein eigenes Tool für die paar Minuten, die die Einrichtung dauert.',
      ],
    },
    {
      title: 'Die Kriterien-Checkliste: Worauf es bei einem kostenlosen Planning-Poker-Tool ankommt',
      content: 'Prüfe jedes infrage kommende Tool anhand dieser Liste. Die ersten vier Punkte sind unverzichtbar; die übrigen hängen davon ab, wie dein Team arbeitet.',
      items: [
        'Keine Registrierung für Teilnehmende. Gäste sollten über einen Link oder Raumcode und mit einem Anzeigenamen beitreten können. Muss jeder Entwickler ein Konto anlegen, sinkt die Akzeptanz, und die erste Session geht für das Onboarding drauf.',
        'Grenzen für Teilnehmende. Prüfe, wie viele Personen im Gratis-Tarif in einem Raum sein können und ob diese Zahl eure größte Session abdeckt – einschließlich Zuschauern wie dem Product Owner und Stakeholdern.',
        'Unterstützte Deck-Typen. Die modifizierte Fibonacci-Folge ist der Standard für die [Kartenwerte beim Planning Poker](/planning-poker-cards), aber viele Teams nutzen T-Shirt-Größen, Zweierpotenzen oder eine eigene Folge. Ein Tool, das nur ein Deck unterstützt, zwingt das Team, sich dem Tool anzupassen statt umgekehrt.',
        'Verdeckte Stimmen und gleichzeitiges Aufdecken. Darüber lässt sich nicht verhandeln. Die Stimmen müssen für alle unsichtbar bleiben, bis die Runde aufgedeckt wird.',
        'Konsens und Schätzvorschlag. Nach dem Aufdecken sollte das Tool die Verteilung klar zeigen und idealerweise Übereinstimmung hervorheben oder einen Wert vorschlagen, damit die Moderation nicht im Kopf rechnen muss.',
        'Integrierter Team-Chat. Praktisch für Randnotizen und Links zu Tickets, damit der Audiokanal frei für die Diskussion bleibt.',
        'Eine Story-Warteschlange. Wer eine Liste von Stories laden und der Reihe nach abarbeiten kann, hält das Tempo der Session und gibt allen ein Gefühl dafür, wie viel noch übrig ist.',
        'Gemeinsamer Timer. Eine für alle sichtbare Zeitbegrenzung pro Story ist eines der einfachsten Mittel, damit eine Session nicht überzieht.',
        'Rundenverlauf und Export. Du solltest frühere Runden einsehen und die Ergebnisse herauskopieren können – als CSV oder Ähnliches – in dein Backlog-Tool oder deine Sprint-Notizen.',
        'Zuschauermodus. Product Owner, Scrum Master und Stakeholder müssen zusehen können, ohne eine Karte zu halten.',
        'Datenschutz und Datenverarbeitung. Was wird gespeichert, wie lange und wo? Räume, die ablaufen und keine personenbezogenen Daten erfordern, lassen sich in regulierten Umgebungen leichter freigeben.',
        'Mobile Unterstützung. Manche Teilnehmende stimmen vom Smartphone ab. Kartenauswahl und Aufdecken sollten auf Smartphone-Breite funktionieren, ohne dass man zoomen muss.',
        'Mehrere Sprachen. Für internationale Teams beseitigt eine Oberfläche in der Sprache jedes Mitglieds eine kleine, aber spürbare Hürde.',
        'Self-Hosting und Open Source. Darf deine Organisation keine externen SaaS-Dienste nutzen, ist ein Open-Source-Tool, das du intern betreibst, womöglich die einzige praktikable Wahl. Außerdem kannst du dann genau prüfen, was das Tool mit deinen Daten macht.',
        'Upselling und Unterbrechungen. Ein kostenloses Tool, das die Schätzung mit Pop-ups oder wiederholten Upgrade-Hinweisen unterbricht, bremst die Session und nervt das Team.',
      ],
    },
    {
      title: 'Kategorien von Planning-Poker-Tools',
      content: 'Kostenlose Scrum-Poker-Tools lassen sich in einige grobe Kategorien einteilen. Wer weiß, welche Kategorie zum eigenen Team passt, grenzt die Suche schnell ein.',
      paragraphs: [
        'Eigenständige Browser-Tools sind am verbreitetsten. Sie laufen auf einer Website, erfordern keine Installation und lassen Gäste meist per Link beitreten. Sie passen zu Teams, die sofort mit dem Schätzen loslegen wollen und die Schätzungen nicht automatisch in ein Ticketsystem zurückschreiben müssen. Der wichtigste Nachteil: Die Schätzungen müssen von Hand ins Backlog übertragen werden – deshalb ist eine Export- oder Kopierfunktion wichtig.',
        'Plugins und Integrationen für Backlog-Tools leben in Jira, Azure DevOps oder ähnlichen Systemen. Ihre Stärke ist, dass Story und Schätzung an einem Ort liegen. Die Nachteile: Alle brauchen in der Regel eine Lizenz und ein Login für das jeweilige System, Zuschauer außerhalb der Organisation lassen sich schwerer einbinden, und Gratis-Tarife für Marketplace-Apps können eingeschränkt oder zeitlich begrenzt sein. Prüfe die Details für deine Plattform, bevor du dich festlegst.',
        'Physische Kartendecks funktionieren weiterhin für Teams, die vollständig vor Ort arbeiten. Sie kosten wenig, brauchen keine Einrichtung und werfen keine Datenschutzfragen auf. Für Hybrid-Teams funktionieren sie nicht, sie hinterlassen keinen Verlauf, und das „Aufdecken“ setzt voraus, dass niemand vorher spickt.',
        'Selbst betriebene Open-Source-Tools passen gut, wenn Daten im Firmennetz bleiben müssen oder das Team das Tool anpassen möchte. Die Kosten liegen im Betrieb: Jemand muss es bereitstellen, aktualisieren und am Laufen halten.',
      ],
    },
    {
      title: 'Wie Scrum Poker Online die Checkliste erfüllt',
      content: 'Scrum Poker Online (scrumpokerplay.com) ist ein kostenloses, browserbasiertes Planning-Poker-Tool. Gemessen an den Kriterien oben bietet es Folgendes – nüchtern aufgelistet, damit du es mit allem anderen vergleichen kannst, das du gerade prüfst.',
      items: [
        'Kostenlos und ohne Registrierung: Die Moderation erstellt einen Raum, teilt einen Code oder eine QR-Einladung, und die Teilnehmenden treten mit einem Anzeigenamen bei. Es gibt überhaupt keine Konten und nichts zu bezahlen.',
        'Teilnehmende: bis zu 50 Personen in einem Raum, Zuschauer eingeschlossen.',
        'Decks: Scrum (0, ½, 1, 2, 3, 5, 8, 13, 20, 40, 100), Fibonacci, T-Shirt-Größen, Zweierpotenzen und eigene Decks.',
        'Aufdecken: Die Stimmen bleiben verdeckt, bis jemand im Raum die Runde aufdeckt (oder nur der Host, wenn der Host die Runden steuert) – nach einem 3-Sekunden-Countdown; die Ergebnisansicht zeigt die Streuung mit einer Konsensanzeige und einem Schätzvorschlag.',
        'Funktionen für die Session: integrierter Team-Chat, eine Story-Warteschlange, die du per Einfügen oder durch Import einer CSV-Datei füllst (ein Jira- oder Tabellen-Export funktioniert), ein gemeinsamer Timer, der vorwärts oder rückwärts zählt, Zuschauermodus, Emoji-Reaktionen und die Möglichkeit, Teammitglieder anzustupsen, die noch nicht abgestimmt haben.',
        'Funktionen für den Host: Deck wechseln, automatisch aufdecken, sobald alle abgestimmt haben, anonyme Abstimmung, nur den Host die Runde steuern lassen, den Raum für Neuankömmlinge schließen, Personen entfernen, die Host-Rolle übergeben und einen Raum behalten, damit Link, Einstellungen und Story-Warteschlange im nächsten Sprint wieder funktionieren.',
        'Tickets: Issue-Keys wie PROJ-123 werden zu Links in deinen Tracker, sobald der Host dessen Adresse in den Raumeinstellungen unter „Issue-Link“ hinterlegt hat.',
        'Verlauf: Rundenverlauf mit der endgültigen Schätzung jeder Story, als CSV-Datei mit Spalten für Issue-Key und Story Points herunterladbar oder als Markdown in deine Sprint-Notizen kopierbar.',
        'Mobilgeräte und Sprachen: funktioniert auf Smartphone-Breite und ist in 7 Sprachen verfügbar.',
        'Datenschutz: keine Konten und keine E-Mail-Adressen; Rauminhalte werden etwa eine Stunde, nachdem die letzte Person gegangen ist, gelöscht, und ein behaltener Raum speichert nur Code, Name, Deck, Einstellungen, Story-Warteschlange und endgültige Schätzungen.',
      ],
      paragraphs: [
        'Was es nicht kann: Es schreibt Schätzungen nicht automatisch in ein Ticketsystem zurück. Braucht dein Team diese Integration, passt ein Plugin für dein Backlog-Tool womöglich besser – oder du kombinierst beides: im Browser schätzen, die CSV herunterladen und in deinen Tracker importieren. Außerdem ist es nur für Live-Sessions gebaut: Die Räume arbeiten in Echtzeit, für eine über den Tag verteilte Abstimmung eignet es sich also nicht.',
      ],
    },
    {
      title: 'Fragen vor der Entscheidung',
      content: 'Diese Fragen bringen die Einschränkungen ans Licht, die Funktionslisten gern verschweigen. Beantworte sie mit deinem Team, bevor du einen Testlauf machst.',
      items: [
        '1. Wer nimmt an unseren Sessions teil? Zähl Entwickler, den Product Owner, den Scrum Master und alle regelmäßigen Stakeholder zusammen – das ist eure Mindestzahl an Teilnehmenden.',
        '2. Welches Deck nutzen wir, und wird jemand wahrscheinlich ein anderes wollen? Teams, die sowohl Stories als auch Bugs schätzen, nutzen oft zwei Decks.',
        '3. Muss sich ohnehin schon jeder irgendwo anmelden? Lebt das Team den ganzen Tag in einem Backlog-Tool, liegt ein Plugin nahe; nehmen externe Dienstleister oder Partnerteams teil, ist ein Tool ohne Registrierung einfacher.',
        '4. Wo müssen die Schätzungen am Ende landen? Lautet die Antwort „in den Tickets“, prüfe, wie einfach sie dorthin gelangen.',
        '5. Welche Daten- und Datenschutzregeln gelten bei uns? Frag nach, ob Rauminhalte gespeichert werden, wie lange, und ob der Anbieter das belegen kann.',
        '6. Führen wir Sessions asynchron durch? Falls ja, müssen Räume lange genug bestehen bleiben, damit Personen in anderen Zeitzonen abstimmen können.',
        '7. Was passiert, wenn das Tool einen schlechten Tag hat? Prüfe, ob du auf etwas Einfaches ausweichen kannst, ohne die Session zu verlieren.',
      ],
    },
    {
      title: 'Ein 15-minütiger Testlauf',
      content: 'Am schnellsten vergleichst du Tools, indem du in jedem auf dieselbe Weise [eine kurze Scrum-Poker-Session durchführst](/guide). Verlass dich nicht auf die Marketingseite.',
      items: [
        'Erstelle einen Raum und stoppe, wie lange es dauert, bis drei Personen über einen Link beigetreten sind, eine davon per Smartphone.',
        'Lade drei Stories in die Warteschlange, darunter eine absichtlich vage formulierte.',
        'Stimm über die erste Story ab, deck auf und prüfe, dass vor dem Aufdecken keine Stimmen sichtbar waren.',
        'Starte bei der zweiten Story den Timer und prüfe, ob alle dieselbe Zeit sehen.',
        'Lass eine Person bei der vagen Story die „?“-Karte wählen und sieh dir an, wie das Tool das darstellt.',
        'Füge einen Zuschauer hinzu und bestätige, dass er nicht abstimmen kann.',
        'Exportiere oder kopiere die Ergebnisse und füge sie in dein Backlog-Tool ein.',
        'Schließ den Browser, öffne den Raumlink erneut und prüfe, ob die Session dort steht, wo du sie verlassen hast.',
      ],
    },
    {
      title: 'Häufige Fehler bei der Wahl eines kostenlosen Tools',
      content: 'Bei der Auswahl eines Schätztools machen Teams immer wieder dieselben wenigen Fehler. Sind sie einmal benannt, lassen sie sich leicht vermeiden.',
      items: [
        'Nach Funktionsumfang wählen. Ein Tool mit dreißig Funktionen, die niemand versteht, verliert gegen eines mit acht, die alle nutzen.',
        'Den Beitritt unterschätzen. Dauert der Beitritt zu einem Raum länger als eine Minute, tippt irgendwann jemand die Zahlen doch wieder in den Chat.',
        'Nicht auf dem Smartphone testen. Mindestens eine Person pro Session wird irgendwann vom Smartphone aus teilnehmen.',
        'Den Verlauf vergessen. Ohne Export endet jede Session damit, dass jemand die Schätzungen von Hand abtippt – und dabei schleichen sich Fehler ein.',
        'Den Gratis-Tarif für dauerhaft halten. Hängt das Geschäftsmodell eines Anbieters davon ab, dich zu einem bezahlten Tarif zu bewegen, bereite dich auf dieses Gespräch vor, bevor es kommt.',
        'Das Tool den Prozess bestimmen lassen. Das Tool sollte die Art unterstützen, wie dein Team schätzt – verdeckte Stimmen, Diskussion, neue Abstimmung –, statt sie durch einen anderen Ablauf zu ersetzen.',
      ],
    },
    {
      title: 'Fazit',
      content: 'Es gibt nicht das eine beste kostenlose Scrum-Poker-Tool für jedes Team, aber es gibt das beste Tool für deines: eines, das die wesentlichen Kriterien erfüllt, zu eurer tatsächlichen Arbeitsweise passt und das das ganze Team öffnet, ohne daran erinnert werden zu müssen. Nutze die Checkliste, mach den 15-minütigen Testlauf mit zwei oder drei Kandidaten und triff die Entscheidung gemeinsam. Wenn du einen Ausgangspunkt suchst: Scrum Poker Online ist kostenlos, braucht keine Registrierung und deckt die oben genannten Grundlagen ab – [starte einen kostenlosen Raum](/) mit deinem Team und sieh, ob es passt.',
    },
  ],
  faq: [
    {
      q: 'Gibt es ein komplett kostenloses Planning-Poker-Tool ohne Registrierung?',
      a: 'Ja. Mehrere browserbasierte Tools lassen die Moderation einen Raum erstellen und einen Link teilen, sodass Teilnehmende nur mit einem Anzeigenamen beitreten. Scrum Poker Online ist ein Beispiel dafür: Es ist kostenlos, kommt ganz ohne Konten aus, und alle Funktionen sind enthalten.',
    },
    {
      q: 'Was ist der Unterschied zwischen Scrum-Poker- und Planning-Poker-Tools?',
      a: 'In der Praxis keiner. „Planning Poker“ ist der ursprüngliche Name der Schätztechnik; „Scrum Poker“ nennen sie viele Scrum-Teams. Tools mit beiden Namen erfüllen dieselbe Aufgabe: verdeckte Abstimmung über die Größe einer Story mit gleichzeitigem Aufdecken.',
    },
    {
      q: 'Brauche ich für Planning Poker eine Integration mit Jira oder Azure DevOps?',
      a: 'Nur wenn es dir wichtig ist, dass Schätzungen automatisch in die Tickets zurückgeschrieben werden, und alle Beteiligten ohnehin Zugriff auf dieses System haben. Viele Teams schätzen in einem eigenständigen Browser-Tool und kopieren die Ergebnisse anschließend ins Backlog – das dauert eine Minute und hält die Session offen für Gäste.',
    },
    {
      q: 'Wie viele Personen können einem kostenlosen Scrum-Poker-Raum beitreten?',
      a: 'Das hängt vom Tool ab, also vergleiche die Grenzen des Gratis-Tarifs mit eurer größten Session. Scrum Poker Online erlaubt kostenlos bis zu 50 Teilnehmer in einem Raum – das reicht für die meisten Scrum-Teams samt Zuschauern. Ein Host kann einen Raum behalten, sodass derselbe Link und dieselben Einstellungen im nächsten Sprint wieder funktionieren.',
    },
    {
      q: 'Können wir Planning-Poker-Tools asynchron über Zeitzonen hinweg nutzen?',
      a: 'Manche Tools unterstützen das, solange die Räume lange genug bestehen, damit alle abstimmen können, und niemand vorzeitig aufdeckt. Scrum Poker Online ist dagegen für Live-Sessions gebaut: Wer die Verbindung verliert, verlässt den Raum nach etwa 90 Sekunden, und ein leerer Raum wird nach etwa einer Stunde gelöscht. Nutze über Zeitzonen hinweg ein gemeinsames Überschneidungsfenster, auch wenn es kurz ist, und bereite die Stories vorab schriftlich vor.',
    },
  ],
};

export default de;
