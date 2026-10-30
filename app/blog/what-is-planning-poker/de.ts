import type { Localized } from '../articleTypes';

const de: Localized = {
  title: 'Was ist Planning Poker? Ein umfassender Leitfaden zur agilen Schätzung',
  subtitle: 'Was Planning Poker ist, woher es stammt, wie eine Session Schritt für Schritt abläuft, welche Karten du nutzen solltest und welche Fehler deine Schätzungen unbemerkt verderben.',
  sections: [
    {
      title: 'Was ist Planning Poker? (Definition)',
      content: 'Planning Poker ist eine konsensbasierte, spielerische Schätztechnik, mit der agile Teams Backlog-Einträge wie User Stories bemessen. Alle Teilnehmenden wählen verdeckt eine Karte, die ihrer Schätzung entspricht, alle decken gleichzeitig auf, und das Team bespricht die Unterschiede, bis es sich auf einen einzigen Wert einigt. Die Zahl auf der Karte ist meist ein Story Point, keine Anzahl von Stunden.',
      paragraphs: [
        'Das entscheidende Merkmal ist das gleichzeitige Aufdecken. Nennen Menschen ihre Schätzungen nacheinander laut, setzt die erste Zahl einen Anker für alle, die danach kommen. Bleiben die Karten bis zum Aufdecken verdeckt, fällt dieser Anker weg, und das Team sieht, was jede Person wirklich denkt, bevor die Diskussion beginnt.',
        'Das zweite entscheidende Merkmal: Uneinigkeit gilt als Information. Hält eine Entwicklerin eine 3 hoch und ein Entwickler eine 13, haben zwei Menschen ein sehr unterschiedliches Bild derselben Story – und aus genau diesem Gespräch entsteht der größte Teil des Nutzens.',
      ],
    },
    {
      title: 'Planning Poker oder Scrum Poker – gibt es einen Unterschied?',
      content: 'Nein. Planning Poker und Scrum Poker sind zwei Namen für dieselbe Technik. „Planning Poker“ ist der ursprüngliche Name aus James Grennings Artikel von 2002 und Mike Cohns Buch, während sich „Scrum Poker“ durchgesetzt hat, weil die meisten Teams, die die Technik nutzen, mit Scrum arbeiten und im Backlog-Refinement oder in der Sprint-Planung schätzen. „Pointing Poker“ und „Estimation Poker“ meinen dasselbe, und keiner der Begriffe ist an Scrum gebunden: Kanban-Teams und Teams außerhalb der Softwareentwicklung nutzen die Technik genauso.',
    },
    {
      title: 'Woher stammt Planning Poker? Grenning, Cohn und Wideband Delphi',
      content: 'Planning Poker wurde erstmals 2002 von James Grenning beschrieben, in einem kurzen Artikel für Extreme-Programming-Teams, die Stunden mit Debatten in der Release-Planung verloren. Sein Ziel war es, die „Analyse-Paralyse“ zu vermeiden: alle Stimmen schnell zu Wort kommen lassen, verhindern, dass die lauteste Person die Zahl bestimmt, und weitermachen.',
      paragraphs: [
        'Zum Standard wurde die Technik, als Mike Cohn sie in „Agile Estimating and Planning“ (2005) aufnahm. Cohns Variante machte das modifizierte Fibonacci-Deck (0, 1, 2, 3, 5, 8, 13, 20, 40, 100) bekannt, das die meisten Teams heute nutzen.',
        'Der geistige Vorläufer ist die Delphi-Methode, entwickelt bei der RAND Corporation, und ihre Variante für Softwareschätzungen, Wideband Delphi: Fachleute schätzen unabhängig voneinander, die Ergebnisse werden geteilt, die Gruppe diskutiert, und der Zyklus wiederholt sich, bis sich die Schätzungen annähern. Planning Poker behält diese Struktur bei, verdichtet sie aber auf wenige Minuten pro Eintrag und ergänzt ein Kartendeck.',
      ],
    },
    {
      title: 'Wie läuft eine Planning-Poker-Session ab? Schritt für Schritt',
      content: 'An einer typischen Session nehmen das Entwicklungsteam, der Product Owner und meist ein Scrum Master oder eine andere moderierende Person teil. Sie läuft so ab:',
      items: [
        '1. Wähle eine Referenz-Story. Einigt euch vor der Session auf eine oder zwei kürzlich abgeschlossene Stories mit bekannter Größe (zum Beispiel „Der Passwort-Reset war eine 3“). Jede Schätzung erfolgt relativ zu diesen Referenzen.',
        '2. Der Product Owner stellt einen Backlog-Eintrag vor: die User Story, die Akzeptanzkriterien und bekannte Rahmenbedingungen. Ziel ist ein gemeinsames Verständnis von „fertig“, kein technisches Design.',
        '3. Das Team stellt Verständnisfragen, begrenzt auf zwei bis drei Minuten.',
        '4. Alle wählen verdeckt eine Karte, vergleichen die Story dabei mit den Referenz-Stories und berücksichtigen Aufwand, Komplexität, Unsicherheit und Risiko.',
        '5. Alle Karten werden gleichzeitig aufgedeckt. In einem Online-Tool klickt jemand (meist die Moderation) auf „Aufdecken“, sobald alle Stimmen abgegeben sind.',
        '6. Stimmen die Schätzungen überein, halte den Wert fest und mach weiter. Schätzungen, die eine Karte auseinanderliegen (eine 5 und eine 8), gelten meist als Einigung.',
        '7. Gehen sie auseinander, erklären die Personen mit der höchsten und der niedrigsten Schätzung ihre Überlegungen. Niemand streitet; es geht darum, sichtbar zu machen, was eine Person weiß und die anderen nicht.',
        '8. Neu abstimmen. Bei den meisten Stories liegen die Schätzungen nach spätestens zwei Runden beieinander. Ist eine Story nach drei Runden noch strittig, muss sie meist in kleinere Stories aufgeteilt oder mit einem Spike untersucht werden.',
      ],
    },
    {
      title: 'Was bedeuten die Planning-Poker-Karten?',
      content: 'Das verbreitetste Deck ist die [modifizierte Fibonacci-Folge](/fibonacci-planning-poker): 0, 1, 2, 3, 5, 8, 13, 20, 40, 100. Die Abstände zwischen den Zahlen werden bewusst größer, je höher sie steigen. Niemand kann ehrlich eine 20-Punkte-Story von einer 21-Punkte-Story unterscheiden, also gibt es keine 21; das Deck springt auf 40. Je größer die Story, desto ungenauer kann die Schätzung sein – und genau das bildet das Deck ab.',
      paragraphs: [
        'Die übliche Begründung für die wachsenden Abstände ist das Weber-Fechner-Gesetz: Menschen nehmen Unterschiede im Verhältnis zur Größe dessen wahr, was sie vergleichen. Ein Punkt Abstand zwischen 1 und 2 ist offensichtlich; derselbe Abstand zwischen 40 und 41 ist nicht wahrnehmbar. Eine Skala, deren Schritte ungefähr proportional wachsen, entspricht der Art, wie Schätzende Größe tatsächlich wahrnehmen.',
        'Die meisten Decks enthalten außerdem [Sonderkarten](/planning-poker-cards). „?“ bedeutet „Ich verstehe diese Story nicht gut genug, um sie zu schätzen“, das Unendlich-Symbol bedeutet „Das ist zu groß und sollte aufgeteilt werden“, und eine Kaffeetasse bedeutet „Ich brauche eine Pause“. Die 0 ist für winzige Einträge gedacht und sollte sparsam eingesetzt werden. Alternativen zu Fibonacci sind [T-Shirt-Größen](/t-shirt-sizing) (XS bis XL), Zweierpotenzen (1, 2, 4, 8, 16, 32) und eigene Decks; die Wahl ist weniger wichtig, als dasselbe Deck konsequent zu nutzen.',
      ],
    },
    {
      title: 'Warum liefert Planning Poker bessere Schätzungen?',
      content: 'Planning Poker funktioniert nicht, weil Karten magisch wären, sondern weil das Format mehreren bekannten Schwachstellen von Gruppenentscheidungen entgegenwirkt:',
      items: [
        'Es beseitigt den Ankereffekt. Weil die Karten bis zum Aufdecken verdeckt bleiben, kann die zuerst genannte Zahl die anderen nicht in ihre Richtung ziehen. Das ist der wichtigste Grund, warum Teams die Technik einführen.',
        'Es erzwingt Beteiligung. Alle Schätzenden müssen eine Karte legen, also müssen sich auch stille Teammitglieder auf eine Zahl festlegen.',
        'Es bringt verborgene Annahmen ans Licht. Eine große Streuung bedeutet fast immer, dass jemand etwas weiß, das die anderen nicht wissen: eine Abhängigkeit, ein fragiles Modul, eine vorhandene Hilfsfunktion, die die Arbeit trivial macht.',
        'Es schätzt relativ statt absolut. „Ist das größer als die Passwort-Reset-Story?“ lässt sich viel leichter gut beantworten als „Wie viele Stunden wird das dauern?“.',
      ],
    },
    {
      title: 'Ein Beispiel: drei Stories schätzen',
      content: 'Angenommen, ein Team hat sich darauf geeinigt, dass „Einen Passwort-vergessen-Link hinzufügen, der ein Reset-Token per E-Mail verschickt“ eine Referenz-3 ist und „Das Admin-Reporting-Dashboard bauen“ eine 13 war. Der Product Owner bringt drei neue Stories ins Refinement.',
      paragraphs: [
        'Story A: „Nach dem Speichern des Profils eine Bestätigungsmeldung anzeigen.“ Alle decken 1 oder 2 auf; die Story folgt einem bestehenden UI-Muster. Das Team hält eine 2 fest und ist in weniger als einer Minute fertig.',
        'Story B: „Nutzer können ihre Bestellhistorie als CSV exportieren.“ Die Karten zeigen 3, 5, 5, 8, 13. Die Person mit der 13 erklärt, dass sich die Bestellhistorie über zwei Services erstreckt und der Export für große Konten seitenweise erfolgen muss. Die Person mit der 3 räumt ein, von einer einzigen Tabelle ausgegangen zu sein. Bei der neuen Abstimmung zeigen die Karten 8, 8, 8, 5, 8, und das Team hält eine 8 fest.',
        'Story C: „Den neuen Zahlungsanbieter integrieren.“ Die Hälfte des Teams spielt „?“, die andere Hälfte 40 oder Unendlich. Niemand hat die Dokumentation des Anbieters gesehen. Das Team erzwingt keine Zahl, sondern legt einen kurzen Spike an, um die Dokumentation zu lesen, und schätzt in der nächsten Woche neu. Eine gut geführte Session verwendet ihre Minuten dort, wo die Uneinigkeit liegt.',
      ],
    },
    {
      title: 'Planning Poker im Vergleich zu anderen agilen Schätztechniken',
      content: 'Planning Poker ist nicht der einzige Weg, ein Backlog zu bemessen. So schneidet es im Vergleich zu den üblichen Alternativen ab:',
      items: [
        'Experten- oder Top-down-Schätzung (eine Person legt fest): schnell, bildet aber nur das Wissen einer Person ab, neigt zum Optimismus und gibt dem Team keine Verantwortung für die Schätzung.',
        'T-Shirt-Größen (XS bis XL): schneller und weniger einschüchternd, gut für einen ersten Durchgang durch ein großes Backlog oder für fachfremde Teilnehmende, aber weniger fein und nicht direkt zur Velocity summierbar. Viele Teams schätzen früh mit T-Shirts und wechseln für Einträge auf Sprintebene zu Planning Poker.',
        'Affinity Estimation oder Bucket System: Das Team sortiert Dutzende Stories schweigend in Größenkategorien und diskutiert anschließend. Hervorragend, um ein ganzes Backlog in einer Session zu bemessen; schwächer bei einer einzelnen kniffligen Story.',
        'Schätzung in Stunden: wirkt präzise, ist aber fragil, weil sie davon abhängt, wer die Arbeit macht. Die meisten agilen Teams schätzen in Punkten und leiten Zeitprognosen aus der Velocity ab.',
      ],
    },
    {
      title: 'Häufige Fehler beim Planning Poker (und wie du sie behebst)',
      content: 'Die meisten Beschwerden über Planning Poker gehen auf eine Handvoll vermeidbarer Fehler zurück:',
      items: [
        'Mit Punktkarten in Stunden schätzen. Setzt das Team insgeheim 5 Punkte mit 5 Stunden gleich, verschwinden die Vorteile des relativen Schätzens. Abhilfe: immer mit der Referenz-Story vergleichen, nie mit der Uhr.',
        'Die Diskussion überspringen. Den Durchschnitt der Karten zu bilden verfehlt den Zweck; der Wert liegt im Gespräch zwischen höchster und niedrigster Schätzung. Abhilfe: Die Ausreißer sprechen vor jeder neuen Abstimmung.',
        'Eine erfahrene Person vorpreschen lassen. Verkündet der Tech Lead „Das ist offensichtlich eine 3“, bevor abgestimmt wird, ist das Aufdecken bedeutungslos. Abhilfe: Bis die Karten gezeigt werden, wird keine Zahl ausgesprochen.',
        'Keine Referenz-Story haben. Ohne gemeinsame Basis hat jede schätzende Person ihre eigene Skala. Abhilfe: Halte in der Session ein oder zwei gut verstandene, abgeschlossene Stories sichtbar.',
        'Die Schätzung als Zusage behandeln. Story Points beschreiben Größe, kein Versprechen. Teams, die für „verfehlte“ Punkte bestraft werden, lernen, sie aufzublähen, und die Zahlen verlieren jede Bedeutung.',
      ],
    },
    {
      title: 'Wann du Planning Poker nutzen solltest – und wann nicht',
      content: 'Planning Poker ist das richtige Werkzeug, wenn die Schätzung von mehreren Perspektiven profitiert und eine falsche Schätzung echte Kosten verursacht. Für alles ist es nicht das richtige Werkzeug.',
      items: [
        'Nutze es im Backlog-Refinement und in der Sprint-Planung, wo jede Story, die in den nächsten ein, zwei Sprints ansteht, eine Größe braucht.',
        'Nutze es, wenn das Wissen über ein crossfunktionales Team verteilt ist: Frontend, Backend, QA und Betrieb sehen in derselben Story oft unterschiedliche Risiken.',
        'Verzichte darauf beim ersten Durchgang durch ein Backlog mit hundert Einträgen; sortiere zuerst grob mit T-Shirt-Größen und schätze dann die oberen Einträge mit Planning Poker.',
        'Verzichte darauf bei Stories, die nicht bereit sind. Ein Spike oder ein Gespräch mit dem Product Owner kommt zuerst.',
      ],
    },
    {
      title: 'Planning Poker mit einem Remote- oder Hybrid-Team',
      content: 'Physische Karten funktionieren nicht im Videocall, deshalb nutzen Remote-Teams ein Online-Tool. Das Wesentliche ist einfach: verdeckte Abstimmung, ein einziges gleichzeitiges Aufdecken, eine gemeinsame Ansicht der Ergebnisse und ein Deck, an das das Team gewöhnt ist.',
      paragraphs: [
        'Scrum Poker Online ist eine kostenlose Option, die genau diesen Ablauf abbildet: [Raum kostenlos erstellen](/), Link teilen, und bis zu 50 Teilnehmer können ohne Registrierung abstimmen. Es unterstützt Fibonacci, T-Shirt, Zweierpotenzen und eigene Decks, sodass ein Team seine gewohnte Skala behalten kann. Welches Tool du auch nutzt – die Regeln der Moderation bleiben dieselben.',
      ],
    },
  ],
  faq: [
    {
      q: 'Ist Planning Poker dasselbe wie Scrum Poker?',
      a: 'Ja. Es sind zwei Namen für dieselbe Schätztechnik. „Planning Poker“ ist der ursprüngliche Name; „Scrum Poker“ spiegelt einfach wider, dass die meisten Teams, die sie nutzen, mit Scrum arbeiten.',
    },
    {
      q: 'Warum nutzt Planning Poker die Fibonacci-Folge?',
      a: 'Weil die Abstände zwischen den Zahlen mit den Zahlen wachsen – das entspricht der Art, wie Menschen Größe wahrnehmen: Eine 2 von einer 3 zu unterscheiden ist leicht, eine 20 von einer 21 zuverlässig zu unterscheiden kann niemand. Das von Mike Cohn bekannt gemachte modifizierte Deck rundet die größeren Werte aus demselben Grund.',
    },
    {
      q: 'Wer sollte am Planning Poker teilnehmen?',
      a: 'Alle, die die Arbeit erledigen werden: Entwickler, Tester und alle anderen im Umsetzungsteam. Der Product Owner stellt die Stories vor und beantwortet Fragen, stimmt aber nicht ab; Führungskräfte dürfen zusehen, sollten aber keine Karten halten.',
    },
    {
      q: 'Wie lange sollte eine Planning-Poker-Session dauern?',
      a: 'Peile wenige Minuten pro Story und höchstens ein bis zwei Stunden pro Session an. Dauert eine einzelne Story deutlich länger, muss sie meist aufgeteilt oder geklärt werden, statt weiter darüber zu debattieren.',
    },
    {
      q: 'Was bedeuten die ?- und die Unendlich-Karte?',
      a: 'Die „?“-Karte bedeutet, dass die schätzende Person die Story nicht gut genug versteht, um sie zu bemessen. Die Unendlich-Karte bedeutet, dass die Story zu groß zum Schätzen ist und heruntergebrochen werden sollte. Beide sind Signale, die Abstimmung zu beenden und stattdessen die Story zu verfeinern.',
    },
  ],
};

export default de;
