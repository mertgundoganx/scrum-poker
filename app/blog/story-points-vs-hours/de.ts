import type { Localized } from '../articleTypes';

const de: Localized = {
  title: 'Story Points oder Stunden: Was sollte dein agiles Team nutzen?',
  subtitle: 'Was Story Points messen, warum Stundenschätzungen in Sprints immer wieder scheitern, was du antwortest, wenn „das Management aber Termine will“, und wann Stunden trotzdem die richtige Wahl sind.',
  sections: [
    {
      title: 'Story Points oder Stunden: die kurze Antwort',
      content: 'Schätze Backlog-Einträge in Story Points und leite Termine aus der Velocity ab. Nutze Stunden nur für Arbeit mit festem, gut verstandenem Umfang, für die Abrechnung oder – falls dein Team das hilfreich findet – für die tageweise Aufgabenzerlegung innerhalb eines Sprints. Story Points beschreiben, wie groß ein Stück Arbeit im Vergleich zu anderer Arbeit ist; Stunden beschreiben, wie lange eine bestimmte Person dafür zu brauchen glaubt. Für die Sprint-Planung und Release-Prognosen ist die erste Frage diejenige, die trägt.',
    },
    {
      title: 'Was sind Story Points?',
      content: 'Ein Story Point ist eine Einheit für relative Größe. Wenn ein Team sagt, eine User Story sei eine 5, bedeutet das: Die Story ist etwa so groß wie andere 5er, die das Team erledigt hat, größer als seine 3er und kleiner als seine 8er. Die Zahl bündelt alles, was Arbeit aufwendig macht: die Menge der Arbeit, ihre Komplexität, die Unsicherheit drumherum und das Risiko von Überraschungen.',
      paragraphs: [
        'Story Points sind bewusst keine Zeiteinheit. Dieselbe 5-Punkte-Story braucht bei einem erfahrenen Entwickler vielleicht einen Tag und bei einer neuen Kollegin drei Tage, bleibt aber eine 5, weil sich die Größe der Arbeit nicht verändert hat. Genau das macht Punkte nützlich: Sie bleiben stabil, wenn sich das Tempo des Teams ändert, und das Tempo wird separat als [Velocity des Teams](/blog/agile-velocity) gemessen.',
        'Die meisten Teams nutzen die modifizierte [Fibonacci-Skala](/fibonacci-planning-poker), die Mike Cohn in „Agile Estimating and Planning“ bekannt gemacht hat (0, 1, 2, 3, 5, 8, 13, 20, 40, 100), und schätzen gemeinsam mit Planning Poker. Die wachsenden Abstände zwischen den Werten spiegeln wider, dass sich große Dinge schwerer präzise bemessen lassen als kleine.',
      ],
    },
    {
      title: 'Was bedeutet Schätzen in Stunden eigentlich?',
      content: 'Eine Stundenschätzung ist eine Vorhersage der Arbeitszeit, die ein bestimmtes Stück Arbeit braucht, meist bezogen auf eine bestimmte Person. Sie ist eine absolute Schätzung: „Das dauert etwa 6 Stunden.“ Der Reiz liegt auf der Hand. Stunden sind universell, alle verstehen sie, Tabellen addieren sie, und Führungskräfte können sie mit Kalendern vergleichen. Das Problem: Eine Stundenschätzung bündelt zwei sehr verschiedene Dinge – die Größe der Arbeit, die sich im Refinement ermitteln lässt, und die Produktivität der Person, die sie an einem bestimmten Tag erledigt, die sich nicht ermitteln lässt.',
    },
    {
      title: 'Warum Stundenschätzungen in agilen Teams scheitern',
      content: 'Stunden wirken präzise, und genau darin liegt die Falle. In der Praxis scheitern sie aus mehreren Gründen:',
      items: [
        'Sie hängen davon ab, wer die Arbeit macht. Eine Aufgabe, für die ein Entwickler 4 Stunden braucht, kostet eine andere Entwicklerin vielleicht 12 – und bis der Sprint geplant ist, weiß niemand, wer sie übernimmt.',
        'Sie ignorieren den Kalender. Meetings, Code-Reviews, Produktionsvorfälle und Kontextwechsel sind in einer Stundenschätzung pro Aufgabe unsichtbar, fressen aber einen großen Teil jedes Arbeitstags.',
        'Sie verleiten zu falscher Präzision. „8 Stunden“ klingt nach einer Messung. Niemand kann vorab eine 8-Stunden-Aufgabe von einer 9-Stunden-Aufgabe unterscheiden, aber die Zahl wird trotzdem als Zusage behandelt.',
        'Sie werden zum Druckmittel. Ist eine Schätzung ein Zeitversprechen, sparen Entwickler an der Qualität, um es einzuhalten, oder polstern die nächste Schätzung auf.',
        'Sie lassen sich nicht sauber summieren. 40 Stundenschätzungen auf Aufgabenebene ergeben zusammen keine verlässliche Sprintdauer, weil die Fehler meist in dieselbe optimistische Richtung gehen.',
      ],
    },
    {
      title: 'Warum Story Points für die Sprint-Planung besser funktionieren',
      content: 'Story Points umgehen diese Schwächen, indem sie Größe und Tempo trennen:',
      items: [
        'Die Schätzung bleibt gültig, wenn das Team sich ändert. Eine 5 ist eine 5, ob die erfahrene oder die neue Kollegin sie übernimmt. Das Tempo erfasst die Velocity, die sich in jedem Sprint automatisch aktualisiert.',
        'Relative Fragen lassen sich besser beantworten. „Ist das größer als die Passwort-Reset-Story?“ liefert konsistente Antworten; „Wie viele Stunden?“ liefert Vermutungen, die mit Stimmung und Selbstvertrauen schwanken.',
        'Unsicherheit hat ihren Platz. Eine Story mit wackliger Spezifikation kann eine 13 bekommen, um „groß und unklar“ auszudrücken, ohne so zu tun, als kenne jemand die Stunden.',
        'Die Velocity liefert Prognosen gleich mit. Nach ein paar Sprints weiß das Team, dass es etwa N Punkte pro Sprint schafft – und diese Zahl berücksichtigt Meetings, Reviews und Unterbrechungen bereits, weil sie gemessen und nicht geschätzt wird.',
        'Punkte nehmen die persönliche Zusage heraus. Sie beschreiben die Arbeit, nicht das Versprechen einer Person; deshalb geht es in den Sessions darum, die Story zu verstehen, statt eine Zahl zu verteidigen.',
      ],
    },
    {
      title: 'Story Points und Stunden im direkten Vergleich',
      content: 'Die wichtigsten Unterschiede, Kriterium für Kriterium:',
      items: [
        'Was gemessen wird: Punkte messen relative Größe (Aufwand, Komplexität, Unsicherheit, Risiko); Stunden messen die vorhergesagte Arbeitszeit einer Person.',
        'Stabilität: Eine Punkteschätzung ändert sich nicht, wenn eine andere Person die Story übernimmt; eine Stundenschätzung schon.',
        'Prognosen: Punkte prognostizieren über die Velocity, gemessen über ganze Sprints; Stunden prognostizieren durch das Addieren von Vermutungen pro Aufgabe.',
        'Unterbrechungen: in der Velocity bereits enthalten; von Stunden pro Aufgabe ignoriert, sofern nicht jede Aufgabe aufgepolstert wird.',
        'Präzision: Punkte sind absichtlich grob; Stunden suggerieren eine Präzision, die vorab niemand hat.',
        'Teamdynamik: Punkte sind eine Teamschätzung der Arbeit; Stunden werden zur individuellen Zusage.',
      ],
    },
    {
      title: 'Ein Beispiel: derselbe Sprint, auf beide Arten geschätzt',
      content: 'Stell dir ein fünfköpfiges Team vor, das einen zweiwöchigen Sprint mit drei Stories plant: einem Bugfix auf der Profilseite, einem CSV-Export der Bestellhistorie und der Integration eines neuen Zahlungsanbieters.',
      paragraphs: [
        'In Stunden: Der Tech Lead schätzt 4, 16 und 40 Stunden. Das sind 60 Stunden gegenüber 5 Personen mal 10 Tage mal 8 Stunden, also 400 Stunden Kapazität – der Sprint wirkt fast leer, und drei weitere Stories werden hereingenommen. In Wirklichkeit verschlingen Meetings und Reviews ein Drittel der Zeit, beim Export sind dann doch zwei Services betroffen, und die Zahlungsintegration bleibt an der Dokumentation hängen. Der Sprint endet mit einem halbfertigen Export und unangetasteten Zusatz-Stories.',
        'In Story Points: Das Team spielt Planning Poker und landet bei 2, 8 und einem „?“, aus dem ein Spike mit 3 Punkten wird. Seine Velocity liegt über die letzten vier Sprints im Schnitt bei 25. Mit 13 zugesagten Punkten ist Platz für ein paar weitere kleine Stories, und das Team weiß aus Erfahrung, dass ein 25-Punkte-Sprint seine Meetings und Reviews bereits enthält. Die Zahlungsintegration wird nicht auf Verdacht in den Sprint gepresst; der Spike beantwortet zuerst die offenen Fragen. Die Punkteschätzung ist nicht präziser, aber sie ist an tatsächlicher Lieferung kalibriert statt an idealen Arbeitstagen.',
      ],
    },
    {
      title: 'Das Problem „Das Management will Stunden“: Prognosen über die Velocity',
      content: 'Der häufigste Einwand gegen Story Points lautet, dass eine Führungskraft, ein Kunde oder die Finanzabteilung Termine und Stunden will, keine Punkte. Die Antwort ist nicht, Punkte aufzugeben, sondern auf der Ebene von Sprints zu übersetzen statt auf der Ebene einzelner Stories.',
      paragraphs: [
        'Die Velocity ist die Zahl der Punkte, die ein Team pro Sprint abschließt, gemittelt über die letzten Sprints. Sobald du drei oder vier Sprints Historie hast, ist die Prognose reine Rechnung. Ist ein Release auf 120 Punkte geschätzt und schafft das Team im Schnitt 25 pro Sprint, sind das ungefähr fünf zweiwöchige Sprints, also etwa zehn Wochen. Nenne eine Spanne statt eines einzelnen Datums: Die niedrigste und die höchste Velocity der jüngeren Vergangenheit ergeben einen besten und einen schlechtesten Fall, die weit belastbarer sind als eine Summe geschätzter Stunden.',
        'Was du nicht tun solltest: ein festes Verhältnis von Punkten zu Stunden veröffentlichen („1 Punkt = 4 Stunden“). Sobald es dieses Verhältnis gibt, wird jede Punkteschätzung zu einer verkappten Stundenschätzung, und alle oben genannten Probleme kehren zurück.',
      ],
    },
    {
      title: 'Wann Stunden die richtige Wahl sind',
      content: 'Story Points sind keine Universallösung. In folgenden Fällen sind Stunden sinnvoll:',
      items: [
        'Der Umfang ist fest und vertraut. Ein routinemäßiger Zertifikatswechsel oder eine bekannte Konfigurationsänderung birgt kaum Unsicherheit.',
        'Du zerlegst eine Story im Sprint in Aufgaben. Manche Teams schätzen Stories in Punkten und zerlegen sie dann für ihre tägliche Nachverfolgung in stundengroße Aufgaben. Das ist in Ordnung, solange die Stunden nie in die Story-Point-Schätzung zurückfließen.',
        'Du rechnest nach Stunden ab, und der Kunde will ein Angebot. Selbst dann solltest du zuerst in Punkten schätzen und über die Velocity umrechnen, statt Stunden pro Aufgabe zu raten.',
        'Eine einzelne Person erledigt die gesamte Arbeit und hat sie schon oft gemacht. Ohne ein Team, mit dem man einen Konsens findet, bringt relatives Schätzen wenig.',
      ],
    },
    {
      title: 'Häufige Fehler beim Umstieg von Stunden auf Story Points',
      content: 'Teams, die auf Punkte umsteigen, nehmen ihre Stunden-Gewohnheiten oft mit. Achte auf diese Fehler:',
      items: [
        'Einen Punkt als Anzahl von Stunden definieren. Am ersten Tag wirkt das hilfreich, und es zerstört den Nutzen dauerhaft.',
        'Velocity zwischen Teams vergleichen. Die Punkte jedes Teams sind an seinen eigenen Referenz-Stories kalibriert; 30 Punkte in einem Team sagen nichts über ein anderes aus.',
        'Punkte als Produktivitätskennzahl nutzen. Sobald die Velocity zum Ziel wird, blähen sich die Schätzungen auf, und die Kennzahl sagt nichts mehr voraus.',
        'Die Referenz-Story weglassen. Ohne ein gemeinsames „So sieht eine 3 aus“ schätzt jeder still in Stunden und rundet auf eine Fibonacci-Zahl.',
        'Eine einzelne Person schätzen lassen. Der Wert von Punkten entsteht in der Diskussion im Team. Vergibt eine Teamleitung die Punkte allein, bekommt man die Nachteile beider Systeme.',
      ],
    },
    {
      title: 'Wie du mit Planning Poker in Story Points schätzt',
      content: 'Der übliche Weg zu Story-Point-Schätzungen ist [Planning Poker](/blog/what-is-planning-poker), die Technik, die James Grenning 2002 beschrieben und Mike Cohn bekannt gemacht hat. In Kürze:',
      items: [
        '1. Wähle eine oder zwei abgeschlossene Stories als Referenz und vereinbare ihre Größe, zum Beispiel „Der Passwort-Reset war eine 3“.',
        '2. Der Product Owner stellt eine Story vor, und das Team stellt ein paar Minuten lang Verständnisfragen.',
        '3. Alle wählen verdeckt eine Karte und decken gleichzeitig auf, damit sich niemand an der zuerst genannten Zahl orientiert.',
        '4. Gehen die Karten auseinander, erklären die Personen mit der höchsten und der niedrigsten Schätzung ihre Sicht, und das Team stimmt erneut ab. Bei den meisten Stories liegen die Schätzungen nach spätestens zwei Runden beieinander.',
        '5. Halte den vereinbarten Wert fest. Addiere nach jedem Sprint die Punkte der tatsächlich abgeschlossenen Stories; das ist die Velocity, mit der du prognostizierst.',
      ],
      paragraphs: [
        'Ein kostenloses Tool wie Scrum Poker Online übernimmt die Mechanik für Remote-Teams: Raum erstellen, Link teilen, und bis zu 50 Teilnehmer können ohne Registrierung mit Fibonacci, T-Shirt, Zweierpotenzen oder einem eigenen Deck abstimmen.',
      ],
    },
    {
      title: 'Unsere Empfehlung',
      content: 'Schätze in Story Points, prognostiziere mit der Velocity und behalte Stunden den wenigen Fällen vor, in denen der Umfang fest ist oder die Abrechnung es verlangt. Beginne mit der Fibonacci-Skala, wähle eine gut verstandene, kürzlich abgeschlossene Story als Referenz und gib der Velocity drei oder vier Sprints Zeit, sich einzupendeln, bevor du sie für Zusagen nutzt. Fragen Stakeholder nach Terminen, antworte mit einer aus der Velocity abgeleiteten Spanne von Sprints, nie mit einem Umrechnungsfaktor von Punkten in Stunden. Teams, die diesen Wechsel vollziehen, kehren selten zurück, weil sie endlich die Größe der Arbeit vom Tempo des Teams trennen.',
    },
  ],
  faq: [
    {
      q: 'Wie vielen Stunden entspricht ein Story Point?',
      a: 'Darauf gibt es keine feste Antwort, und wer eine festlegt, untergräbt den Zweck. Story Points messen relative Größe, keine Zeit. Das Verhältnis zwischen Punkten und Kalenderzeit erfasst die Velocity, und die ist von Team zu Team verschieden.',
    },
    {
      q: 'Warum vermeiden viele agile Teams Schätzungen in Stunden?',
      a: 'Weil Stundenschätzungen davon abhängen, wer die Arbeit macht und welche unvorhersehbaren Unterbrechungen auftreten, weil sie falsche Präzision erzeugen und weil sie zu persönlichen Zusagen werden. Story Points beschreiben die Arbeit selbst und überlassen es der Velocity, das tatsächliche Tempo abzubilden.',
    },
    {
      q: 'Kann man Story Points und Stunden gemeinsam nutzen?',
      a: 'Ja. Ein verbreitetes Muster: Stories werden für Planung und Prognosen in Punkten geschätzt und dann im Sprint für die tägliche Nachverfolgung in stundengroße Aufgaben zerlegt. Die Stunden sollten aber nie dazu dienen, die Story Points neu zu berechnen.',
    },
    {
      q: 'Wie rechne ich Story Points in einen Liefertermin um?',
      a: 'Über die Velocity. Teile die verbleibenden Punkte durch die durchschnittlichen Punkte des Teams pro Sprint, um die Zahl der Sprints zu erhalten, und multipliziere mit der Sprintlänge. Nenne statt eines einzelnen Datums eine Spanne auf Basis der niedrigsten und höchsten Velocity der letzten Zeit.',
    },
    {
      q: 'Ist ein Story Point in verschiedenen Teams gleich groß?',
      a: 'Nein. Jedes Team kalibriert seine Punkte an eigenen Referenz-Stories, daher ist eine 5 in einem Team nicht mit einer 5 in einem anderen vergleichbar. Die Velocity sollte immer nur mit der eigenen Historie desselben Teams verglichen werden.',
    },
  ],
};

export default de;
