import type { Localized } from '../articleTypes';

const de: Localized = {
  title: 'Sprint-Planung remote durchführen: ein Praxisleitfaden',
  subtitle: 'Ein Schritt-für-Schritt-Leitfaden für verteilte Scrum-Teams: Vorbereitung, Agenda, Schätzung, Zeitzonen, Beteiligung und die Fehler, die Remote-Planungsmeetings unbemerkt ruinieren.',
  sections: [
    {
      title: 'Warum Sprint-Planung remote anders ist',
      content: 'Die Sprint-Planung ist das Scrum-Event, in dem das Team entscheidet, was es im nächsten Sprint liefert und wie. Sie ist das kooperativste Meeting im Framework: Der Product Owner bringt die Prioritäten mit, die Entwickler bringen Aufwandsschätzungen und technisches Urteilsvermögen ein, und gemeinsam handeln sie ein realistisches Sprint-Ziel aus. In einem gemeinsamen Raum läuft ein Großteil dieser Verhandlung über Blicke, Seitengespräche und ein Whiteboard. Remote gibt es nichts davon geschenkt – jedes Signal muss über Tools und Moderation ausdrücklich gemacht werden.',
      paragraphs: [
        'Die gute Nachricht: Verteilte Teams, die bewusst planen, haben oft bessere Sessions als Teams vor Ort, die sich auf Gewohnheit verlassen. Schriftliche Vorbereitung ersetzt den Kontext aus dem Flurgespräch, verdeckte Online-Abstimmung nimmt etwas sozialen Druck heraus, und ein festgehaltener Verlauf der Entscheidungen fällt beim Arbeiten im Browser ganz nebenbei ab. Dieser Leitfaden zeigt, wie du dorthin kommst.',
        'Er richtet sich an Scrum Master, Product Owner und Teamleitungen, die die Sprint-Planung per Videocall durchführen – ob das Team vollständig remote, hybrid oder über mehrere Zeitzonen verteilt arbeitet.',
      ],
    },
    {
      title: 'Vor dem Meeting: eine Checkliste für die Remote-Vorbereitung',
      content: 'Remote-Sessions bestrafen schlechte Vorbereitung viel härter als Präsenztermine. Öffnet jemand eine Story im Videocall zum ersten Mal, sitzen zehn Leute schweigend da, während er liest. Erledige das Lesen vorher und nutze eine [Checkliste für die Sprint-Planung](/blog/sprint-planning-checklist), damit nichts untergeht.',
      items: [
        'Verfeinere den oberen Teil des Backlogs mindestens zwei oder drei Tage vor der Planung. Jede infrage kommende Story braucht eine klare Beschreibung, Akzeptanzkriterien und bekannte Abhängigkeiten.',
        'Teile die Liste der Kandidaten 24 Stunden vorher schriftlich, mit einem Hinweis auf das vorgeschlagene Sprint-Ziel.',
        'Bitte die Teammitglieder, Fragen zu den Stories asynchron zu stellen, damit der Product Owner sie vor dem Call beantworten kann.',
        'Bestätige die Kapazität: Urlaub, Rufbereitschaft, Teilzeit. Schreib die Zahl auf, statt sie live zu schätzen.',
        'Halte die Kandidaten-Stories bereit, um sie zeilenweise in die Warteschlange des Poker-Raums einzufügen. Erstelle den Raum zu Beginn des Calls und poste den Link sofort im Call-Chat: Echtzeit-Räume wie die von Scrum Poker Online werden etwa eine Stunde, nachdem alle gegangen sind, gelöscht. Ein in der Kalendereinladung gespeicherter Link funktioniert also nur, wenn der Host den Raum behält (Menü „Mehr“ → „Diesen Raum behalten“).',
        'Leg fest, wer moderiert, wer mitschreibt und wer auf die Zeit achtet. In einem Call ergeben sich diese Rollen nicht von selbst.',
      ],
    },
    {
      title: 'Eine Schritt-für-Schritt-Agenda für die Remote-Sprint-Planung',
      content: 'Halte die Session je nach Sprintlänge zwischen 60 und 120 Minuten und folge einer sichtbaren Agenda. Eine Struktur, die für die meisten verteilten Teams funktioniert:',
      items: [
        '1. Check-in (5 Min.): kurze Runde zu „Gibt es etwas, das diesen Sprint beeinflusst?“ – eine kranke Kollegin, ein Incident, ein verschobener Release-Termin.',
        '2. Sprint-Ziel (10 Min.): Der Product Owner schlägt das Ziel vor; das Team stellt Verständnisfragen, bis alle es in einem Satz wiedergeben können.',
        '3. Kapazität (5 Min.): Bestätige die bei der Vorbereitung notierte Zahl und passe sie an alles an, was im Check-in aufkam.',
        '4. Schätzung (30–60 Min.): Geh die Kandidaten-Stories in Prioritätsreihenfolge mit Planning Poker durch. Abstimmen, Ausreißer besprechen, neu abstimmen, festhalten; die einzelnen Schritte erklärt die Anleitung [So leitest du eine Scrum-Poker-Session](/guide).',
        '5. Commitment (10 Min.): Vergleiche die Summe mit der Kapazität und der jüngsten Velocity; streiche oder teile Stories, bis der Plan realistisch ist.',
        '6. Aufgabenzerlegung (optional, 15–30 Min.): Skizziere für die ersten Stories die Aufgaben, damit die Arbeit sofort beginnen kann.',
        '7. Abschluss (5 Min.): Wiederhole das Sprint-Ziel, liste offene Fragen samt Verantwortlichen auf und bestätige, wo das Protokoll liegt.',
      ],
    },
    {
      title: 'Nutze ein eigenes Planning-Poker-Tool statt Chat oder Tabelle',
      content: 'Der häufigste Fehler beim Remote-Schätzen ist die Abstimmung im Chatfenster. Wer zuerst „5“ tippt, setzt den Anker für alle anderen, wer später antwortet, gerät unter Druck, und hinterher gibt es keine Aufzeichnung. Eine per Bildschirmfreigabe geteilte Tabelle hat dasselbe Problem, nur umständlicher.',
      paragraphs: [
        'Ein browserbasiertes Planning-Poker-Tool löst das richtig. Alle öffnen denselben Raum, wählen verdeckt eine Karte, und alle Stimmen werden gleichzeitig aufgedeckt. Scrum Poker Online ist eine kostenlose Option ohne Registrierung: Die Moderation [erstellt einen Planning-Poker-Raum](/), teilt einen Code oder QR-Link, und innerhalb einer Minute stimmt das Team ab. Eine Story-Warteschlange hält die Backlog-Reihenfolge sichtbar, ein gemeinsamer Timer hält die Diskussion im Rahmen, und der Rundenverlauf lässt sich am Ende der Session als CSV herunterladen oder als Markdown kopieren.',
        'Falls du noch [ein kostenloses Planning-Poker-Tool auswählst](/blog/free-scrum-poker-tools), achte darauf: Es sollte neben dem Videocall laufen, nicht an seine Stelle treten. Abgestimmt wird im Tool; diskutiert wird von Angesicht zu Angesicht vor der Kamera.',
      ],
    },
    {
      title: 'Ankereffekt und stilles Anpassen verhindern',
      content: 'Der Ankereffekt ist die Neigung, alle folgenden Schätzungen von der zuerst gehörten Zahl prägen zu lassen. Er ist in jedem Planungsmeeting ein Problem, remote aber noch mehr: Die Beteiligten können die Stimmung im Raum nicht lesen und folgen deshalb dem, der zuerst gesprochen hat – und das Stummschalten macht es leicht, still zu bleiben, statt zu widersprechen.',
      items: [
        'Verdeckte Stimmen mit gleichzeitigem Aufdecken sind nicht verhandelbar. Genau dafür gibt es Planning Poker.',
        'Bitte den Product Owner und Führungskräfte, als Zuschauer teilzunehmen. Sie können zusehen, ohne eine Karte zu halten, und eine subtile Quelle von Druck fällt weg.',
        'Sprich nach dem Aufdecken die Personen mit der höchsten und der niedrigsten Stimme mit Namen an. In einem Call folgt auf „Möchte jemand etwas erklären?“ meist Schweigen.',
        'Behandle die „?“-Karte als gültige Antwort und als Anlass, die Story zu klären, nicht als Versagen.',
        'Nutze die Anstupsen-Funktion oder eine Direktnachricht für jemanden, der noch nicht abgestimmt hat, statt es vor dem ganzen Call anzusprechen.',
      ],
    },
    {
      title: 'Zeitzonen meistern: synchron, asynchron oder beides',
      content: 'Ein Team, das über zwei oder drei Stunden Zeitunterschied verteilt ist, findet meist ein gemeinsames Zeitfenster. Ein Team mit acht oder mehr Stunden Unterschied kann keine vollständige Live-Session abhalten, ohne dass jemand in jedem Sprint mitten in der Nacht arbeitet. Passe das Format an die Überschneidung an, die ihr tatsächlich habt.',
      paragraphs: [
        'Bei ausreichender Überschneidung schützt du dieses Zeitfenster konsequent für Planung und Refinement und wechselst den ungünstigen Termin regelmäßig, damit nicht immer dieselbe Region den Preis zahlt. Zeichne die Session auf und veröffentliche noch am selben Tag Notizen für alle, die sie verpasst haben.',
        'Bei geringer oder keiner Überschneidung teilst du die Arbeit auf. Erledige die Vorbereitung asynchron: Der Product Owner stellt die verfeinerten Stories bereit, und alle lesen sie während ihres eigenen Arbeitstags und ergänzen Fragen. Schätze dann live in der kurzen Überschneidung, auch wenn nur ein Teil des Teams dabei sein kann, und verwende die Zeit für die Stories, die Diskussion brauchen. Echtzeit-Tools wie Scrum Poker Online erfordern, dass alle gleichzeitig im Raum sind; für über den Tag verteilte Abstimmungen sind sie nicht gebaut. Commitment und die Diskussion über das Sprint-Ziel profitieren trotzdem von einem Live-Gespräch, selbst wenn es nur ein 30-minütiger Call mit zwei oder drei Vertretern ist.',
      ],
      items: [
        'Risikoarme, gut verstandene Stories: Kläre Fragen vorab schriftlich, damit jede im Live-Fenster nur eine kurze Runde braucht.',
        'Stories mit offenen Fragen, neuer Technologie oder teamübergreifenden Abhängigkeiten: für das Live-Fenster reservieren.',
        'Veröffentliche die endgültigen Schätzungen und das Sprint-Ziel immer schriftlich dort, wo das ganze Team arbeitet, nicht nur im Call.',
      ],
    },
    {
      title: 'Die Beteiligung in einem langen Videocall hochhalten',
      content: 'Remote-Planungsmeetings verlieren schneller an Energie als Präsenztermine, weil alle Teilnehmenden nur einen Klick von ihren E-Mails entfernt sind. Beteiligung ist eine Frage der Moderation, und es gibt praktische Lösungen.',
      items: [
        'Kameras an für die Diskussionsteile, aus beim stillen Lesen. Sag das ausdrücklich, damit sich niemand bewertet fühlt.',
        'Mach alle 45 Minuten fünf Minuten Pause. Achte auf Kaffeekarten – sie sind ein Signal, kein Witz.',
        'Gib allen eine Aufgabe: Eine Person liest die Story vor, eine sammelt offene Fragen, eine behält den Timer im Blick.',
        'Nutze den integrierten Team-Chat für Randnotizen und Links, damit der Audiokanal frei für Entscheidungen bleibt.',
        'Feiere schnelle Konsensrunden laut. Das klingt banal, aber ein wenig Schwung hält die Leute bei der Sache.',
        'Hör pünktlich auf. Eine Session, die regelmäßig überzieht, gewöhnt die Leute daran, früh abzuschalten.',
      ],
    },
    {
      title: 'Moderationstipps für den Scrum Master',
      content: 'In einem Call leistet die Moderation mehr als in einem Raum vor Ort: Sie steuert gleichzeitig die Redebeiträge, die Stille und das Tool. Ein paar Gewohnheiten machen einen großen Unterschied.',
      paragraphs: [
        'Lies vor der Abstimmung jeden Story-Titel laut vor und bitte den Product Owner um eine 60-Sekunden-Zusammenfassung, auch wenn alle die Story vorher gelesen haben – das bringt die Gruppe auf einen Stand und gibt Nachzüglern Kontext. Starte den Timer beim Aufdecken, nicht bei der Zusammenfassung. Driftet die Diskussion ins Lösungsdesign ab, sprich es aus, halte die Designfrage in den Notizen fest und kehre zur Schätzung zurück.',
        'Achte auf Personen, die seit zwanzig Minuten nichts gesagt haben, und lade sie mit Namen ein. Achte darauf, ob immer dieselben zwei Personen jeden Ausreißer erklären; falls ja, frag eine dritte Person nach ihrer Sicht, bevor du die Runde öffnest. Und halte die Story-Warteschlange sichtbar, damit alle sehen, wie viel noch übrig ist – das Tempo fällt leichter, wenn die Ziellinie auf dem Bildschirm steht.',
      ],
    },
    {
      title: 'Dokumentieren und nachfassen',
      content: 'Eine Remote-Session ohne schriftliches Protokoll hat nicht wirklich stattgefunden. Veröffentliche innerhalb einer Stunde nach dem Abschluss eine kurze Zusammenfassung dort, wo das Team ohnehin arbeitet.',
      items: [
        'Das Sprint-Ziel in einem Satz.',
        'Die zugesagten Stories mit ihren endgültigen Schätzungen – kopiere den Rundenverlauf aus dem Poker-Tool, statt ihn abzutippen.',
        'Zurückgestellte Stories mit der offenen Frage und einer verantwortlichen Person.',
        'Annahmen zur Kapazität und bekannte Risiken.',
        'Einen Link zur Aufzeichnung, falls es eine gibt.',
      ],
    },
    {
      title: 'Häufige Fehler bei der Remote-Sprint-Planung',
      content: 'Diese Fehlermuster tauchen in verteilten Teams am häufigsten auf – und sie lassen sich alle vermeiden.',
      items: [
        'Während der Planung verfeinern. Fragt das Team noch „Was bedeutet diese Story überhaupt?“, ist die Session ein verkapptes Refinement.',
        'Im Chat abstimmen oder nacheinander das Mikrofon einschalten, womit der Ankereffekt zurückkehrt.',
        'Die lauteste Verbindung gewinnen lassen. Wer das beste Mikrofon und das schnellste Internet hat, hat nicht unbedingt die beste Schätzung.',
        'Mehr zusagen, als die Kapazität hergibt, weil „wir das schon hinkriegen“ – Remote-Teams haben weniger informelle Wege, mitten im Sprint gegenzusteuern.',
        'Das Protokoll weglassen. Ohne Notizen starten Personen in anderen Zeitzonen mit einem anderen Bild vom Plan in den Sprint.',
        'Ein dreistündiges Meeting statt zwei kürzerer abhalten. Die Ermüdung macht die letzte Stunde wertlos.',
      ],
    },
    {
      title: 'Beispiel: eine 90-minütige Remote-Session für einen zweiwöchigen Sprint',
      content: 'Ein siebenköpfiges Team, verteilt auf Istanbul und Berlin, im Sommer eine Stunde und im Winter zwei Stunden Zeitunterschied. Das Refinement fand am Dienstag statt; die Planung ist am Donnerstag um 10:00 Uhr Istanbuler Zeit.',
      paragraphs: [
        'Im Check-in stellt sich heraus, dass ein Entwickler in der zweiten Woche Urlaub hat und ein anderer zwei Tage Rufbereitschaft; die Kapazität sinkt also von 70 auf 63 Personentage. Der Product Owner schlägt das Ziel „Kunden können gespeicherte Adressen verwalten“ vor, und das Team gibt es in eigenen Worten wieder. Die zwölf Kandidaten-Stories werden in Prioritätsreihenfolge in die Warteschlange des Poker-Raums eingefügt. Die ersten sechs einigen sich jeweils in einer Runde. Story sieben – „Internationale Adressformate validieren“ – ergibt 3, 5, 8, 8, 13; die Person mit der 13 erklärt, dass die Postleitzahlregeln von Land zu Land variieren und eine Datenquelle brauchen, und das Team beschließt, die Story zurückzustellen und nach dem Call aufzuteilen. Die Stories acht bis elf brauchen jeweils zwei Runden. Story zwölf, eine 8, würde die Summe auf 34 Punkte bringen – bei einer jüngsten Velocity von 31 und einer um ein Zehntel geringeren Kapazität in diesem Sprint. Also streicht das Team sie und sagt 26 Punkte zu.',
        'Der Abschluss dauert vier Minuten: Ziel wiederholt, zehn Stories zugesagt, eine mit verantwortlicher Person zurückgestellt, Rundenverlauf in die Sprint-Seite kopiert. Gesamtdauer: 88 Minuten, mit einer Pause.',
      ],
    },
    {
      title: 'Ein schlanker Werkzeugkasten für die Remote-Planung',
      content: 'Du brauchst keine schwere Toolchain. Ein kleines, zuverlässiges Set lässt sich leichter für alle durchhalten als ein großes:',
      items: [
        'Ein Videocall für die Diskussion, mit einem festen Link, der sich nie ändert.',
        'Ein browserbasiertes Planning-Poker-Tool mit verdeckten Stimmen, Story-Warteschlange, gemeinsamem Timer und exportierbarem Verlauf – Scrum Poker Online deckt das kostenlos und ohne Konto ab.',
        'Dein bevorzugtes Backlog-Tool als maßgebliche Quelle für Stories und Prioritäten.',
        'Ein gemeinsamer Dokumentenbereich für die Sprint-Zusammenfassung und offene Fragen.',
      ],
    },
  ],
  faq: [
    {
      q: 'Wie lange sollte eine Remote-Sprint-Planung dauern?',
      a: 'Der Scrum Guide begrenzt die Sprint-Planung bei einem einmonatigen Sprint auf höchstens acht Stunden, und kürzere Sprints brauchen meist weniger. Remote-Sessions ermüden schneller, deshalb peilen viele Teams etwa eine Stunde pro Sprintwoche an – rund zwei Stunden für einen zweiwöchigen Sprint – und teilen alles, was länger dauert, auf zwei Sessions auf. Dauern die Sessions regelmäßig zu lange, ist das Backlog vor dem Meeting meist nicht ausreichend verfeinert.',
    },
    {
      q: 'Lässt sich die Sprint-Planung asynchron durchführen?',
      a: 'Teilweise. Die Vorbereitung funktioniert asynchron gut: Die Stories werden bereitgestellt, und alle lesen sie in ihrer eigenen Arbeitszeit und ergänzen Fragen. Die Abstimmung selbst funktioniert live am besten, und Echtzeit-Tools wie Scrum Poker Online erfordern, dass alle gleichzeitig im Raum sind – halte also ein kurzes gemeinsames Zeitfenster für die Schätzung frei. Auch die Einigung auf das Sprint-Ziel und das endgültige Commitment gelingen am besten in einem Live-Gespräch, selbst wenn es kurz ist.',
    },
    {
      q: 'Was ist das beste kostenlose Tool für Remote-Planning-Poker?',
      a: 'Achte auf verdeckte Stimmen mit gleichzeitigem Aufdecken, keine Registrierung, damit Gäste sofort beitreten können, eine Story-Warteschlange, einen Timer und eine Möglichkeit, Ergebnisse zu exportieren. Scrum Poker Online erfüllt diese Anforderungen und ist kostenlos, ohne Konto; die richtige Wahl für dein Team ist aber die, die alle auch tatsächlich öffnen.',
    },
    {
      q: 'Sollte der Product Owner beim Remote-Planning-Poker mit abstimmen?',
      a: 'Nein. Der Product Owner erklärt die Stories und beantwortet Fragen; die Entwickler, die die Arbeit erledigen, schätzen sie. Die meisten Tools bieten einen Zuschauermodus, in dem der Product Owner das Aufdecken verfolgen kann, ohne eine Karte zu halten.',
    },
    {
      q: 'Wie gehen wir mit Teammitgliedern um, die nicht an der Live-Session teilnehmen können?',
      a: 'Lass sie ihre Fragen und Bedenken zu den Stories vor dem Call einbringen, zeichne die Session auf und veröffentliche am selben Tag eine schriftliche Zusammenfassung. Verpassen wegen der Zeitzonen immer dieselben Personen jede Session, wechsle den Termin regelmäßig, damit sich die Unannehmlichkeit verteilt.',
    },
  ],
};

export default de;
