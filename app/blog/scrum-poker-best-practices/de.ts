import type { Localized } from '../articleTypes';

const de: Localized = {
  title: '10 Best Practices für Scrum Poker und bessere Schätzungen',
  subtitle: 'Praktische Techniken, die Planning-Poker-Sessions schneller, konsistenter und nützlicher für die Sprint-Planung machen – mit realistischen Beispielen und FAQ.',
  sections: [
    {
      title: 'Was Scrum Poker ist (und warum Best Practices wichtig sind)',
      content: 'Scrum Poker – auch Planning Poker genannt – ist eine konsensbasierte Schätztechnik. Jedes Teammitglied hat ein Kartendeck (meist eine modifizierte Fibonacci-Folge: 0, 1, 2, 3, 5, 8, 13, 20, 40, 100), der Product Owner stellt eine User Story vor, alle wählen verdeckt eine Karte, und alle Karten werden gleichzeitig aufgedeckt. Stimmen die Schätzungen überein, geht es weiter. Weichen sie ab, bespricht das Team die Gründe und stimmt erneut ab.',
      paragraphs: [
        'Die Mechanik ist einfach, doch die Qualität des Ergebnisses hängt fast vollständig davon ab, [wie die Session abläuft](/guide). Ein Team, das Karten einzeln aufdeckt, über Stunden streitet und die lauteste Entwicklerin die Zahl bestimmen lässt, erhält schlechtere Schätzungen als ein Team, das nie Planning Poker gespielt hat – und braucht dafür länger. Die folgenden Praktiken stammen aus dem, was in echten Sprint-Planungen immer wieder funktioniert, ob das Team in einem Raum sitzt oder im Browser abstimmt.',
        'Nutze diesen Artikel als Checkliste. Wähle zwei oder drei Praktiken, die dein Team noch nicht anwendet, setze sie ein paar Sprints lang um und beobachte, was sich verändert.',
      ],
    },
    {
      title: '1. Schätze Komplexität und Aufwand, nicht Stunden',
      content: 'Story Points drücken relative Größe aus: wie viel Arbeit, Komplexität und Unsicherheit eine Story im Vergleich zu anderen Stories mit sich bringt. Eine 5 ist ungefähr „etwas weniger als zweimal eine 3“, nicht „fünf Stunden“. Diese Unterscheidung ist das Fundament für alles Weitere, denn relatives Schätzen ermöglicht es einem Team, Stories schnell zu vergleichen, ohne so zu tun, als wüsste es genau, wie lange jede dauern wird.',
      paragraphs: [
        'Sagt jemand „Das sind ungefähr zwei Tage, also eine 5“, lenke behutsam um: „Ist das im Vergleich zur Export-Funktion aus dem letzten Sprint größer oder kleiner?“ Wer sich an Kalenderzeit orientiert, holt persönliches Tempo, Meetings und Unterbrechungen herein, die mit der Story selbst nichts zu tun haben. Außerdem bleiben Punkte stabil, wenn sich die Teamzusammensetzung ändert; Stunden nicht.',
        'Ein praktischer Test: Wenn zwei Entwickler mit unterschiedlicher Erfahrung einer Story denselben Punktwert, aber unterschiedliche Stundenschätzungen geben würden, denkt dein Team richtig in Punkten.',
      ],
    },
    {
      title: '2. Pflege eine Sammlung von Referenz-Stories',
      content: 'Relatives Schätzen funktioniert nur, wenn alle mit derselben Basis vergleichen. Wähle einige abgeschlossene, gut verstandene Stories und verankere sie auf der Skala: „Die E-Mail zum Zurücksetzen des Passworts war eine 2. Der CSV-Export mit Filtern war eine 5. Die Migration zum neuen Zahlungsanbieter war eine 13.“ Halte diese Liste in jeder Session sichtbar.',
      paragraphs: [
        'Referenz-Stories lösen zwei häufige Probleme. Neue Teammitglieder können sich schnell kalibrieren, statt zu raten, was eine 3 in diesem Team bedeutet. Und Punkteinflation – bei der eine 3 allmählich zu dem wird, was früher eine 5 war – fällt leichter auf, weil das Team immer wieder mit denselben Beispielen abgleicht.',
        'Aktualisiere die Referenzliste alle paar Monate. Eine Story, die vor einem Jahr eine 5 war, ist womöglich nicht mehr repräsentativ, wenn sich Codebasis oder Team deutlich verändert haben.',
      ],
    },
    {
      title: '3. Verfeinere Stories, bevor du sie schätzt',
      content: 'Planning Poker macht Unsicherheit sichtbar, sollte aber nicht der Moment sein, in dem jemand eine Story zum ersten Mal liest. Im Backlog-Refinement – einer kurzen Session einige Tage vor der Sprint-Planung – klärt der Product Owner Ziel, Akzeptanzkriterien und bekannte Rahmenbedingungen. Wenn die Story auf den Pokertisch kommt, sollte das Team eine Lösung schätzen, nicht einen Titel entschlüsseln.',
      items: [
        'Jede Story hat ein klares „Wer, was, warum“ und zumindest einige Akzeptanzkriterien.',
        'Offene Fragen stehen an der Story und werden nicht erst mitten in der Abstimmung entdeckt.',
        'Abhängigkeiten von anderen Teams oder Systemen werden ausdrücklich benannt.',
        'Der Product Owner gibt vor der ersten Abstimmung eine ein- bis zweiminütige Zusammenfassung und beantwortet Fragen, bevor jemand eine Karte wählt.',
      ],
    },
    {
      title: '4. Verdeckt abstimmen und gleichzeitig aufdecken',
      content: 'Die wichtigste Regel beim Planning Poker: Niemand sieht die Karte eines anderen, bevor alle gewählt haben. Wer Karten einzeln aufdeckt oder eine erfahrene Entwicklerin bittet, „anzufangen“, erzeugt den Ankereffekt – die erste Zahl wird zum Bezugspunkt, und spätere Schätzungen sammeln sich um sie herum, ob sie sollten oder nicht.',
      paragraphs: [
        'Vor Ort heißt das: Karten verdeckt halten und gemeinsam umdrehen. Online heißt es: ein Tool nutzen, das die Stimmen verbirgt, bis die Runde aufgedeckt wird. Scrum Poker Online etwa hält jede Stimme verdeckt, bis jemand im Raum die Runde aufdeckt; es ist kostenlos und ohne Registrierung nutzbar, sodass das ganze Team in Sekunden mit einem Raumcode beitreten kann.',
        'Dieselbe Regel gilt für Körpersprache und Zwischenbemerkungen. Ein „Ach, das ist doch einfach“ vor der Abstimmung ist ebenfalls ein Anker. Bitte alle, ihre Meinung für die Diskussion nach dem Aufdecken aufzuheben.',
      ],
    },
    {
      title: '5. Lass die Ausreißer zuerst erklären',
      content: 'Zeigt das Aufdecken eine Streuung – etwa 3, 3, 5, 5 und 13 –, bilde keinen Durchschnitt und lass die Mehrheit den Ausreißer nicht übertönen. Bitte die Personen mit der höchsten und der niedrigsten Stimme, ihre Überlegungen zuerst zu erläutern. Wer 13 gewählt hat, weiß vielleicht, dass die Drittanbieter-API ein undokumentiertes Rate Limit hat; wer 3 gewählt hat, weiß vielleicht, dass es für die Hälfte der Arbeit schon eine Hilfsfunktion gibt.',
      paragraphs: [
        'Dieses Gespräch ist das eigentliche Ergebnis von Planning Poker. Die Zahl ist ein Nebenprodukt. Teams, die es überspringen und einfach den Median nehmen, verlieren das gemeinsame Verständnis, das den Sprint reibungslos laufen lässt.',
        'Halte die Diskussion sachlich: Was ist die Arbeit, was sind die Risiken, was wurde schon einmal gemacht? Wird daraus eine Debatte über „Wie würdest du das umsetzen?“, notiere die Designfrage und mach weiter – hier wird geschätzt, nicht entworfen.',
      ],
    },
    {
      title: '6. Neu abstimmen, dann entscheiden – keine Endlosschleifen',
      content: 'Nachdem die Ausreißer gesprochen haben, wird erneut abgestimmt. Die meisten Stories [erreichen in der zweiten Runde einen Konsens](/blog/estimation-consensus), weil die Informationslücke, die die Streuung verursacht hat, nun geschlossen ist. Zeigt auch die zweite Runde noch eine große Streuung, ist die Story selbst wahrscheinlich unklar oder zu groß, und weitere Abstimmungen ändern daran nichts.',
      items: [
        'Streuung in Runde 1: Ausreißer besprechen, neu abstimmen.',
        'Kleine Streuung in Runde 2 (Nachbarkarten, etwa 5 und 8): Einigt euch auf einen Wert – viele Teams nehmen die höhere Karte, wenn Unsicherheit der Grund für die Streuung ist.',
        'Große Streuung in Runde 2 (etwa 3 und 13): Stell die Story zurück, halte die offene Frage fest und teile sie entweder auf oder schick sie zurück ins Refinement.',
        'Überschreite in der Sprint-Planung nie drei Runden für eine Story.',
      ],
    },
    {
      title: '7. Teile große Stories auf',
      content: 'Eine Story, die bei 13 oder mehr landet, ist ein Signal, kein Ergebnis. Große Schätzungen verbergen große Unsicherheit: Niemand kann wirklich sagen, ob „13“ acht Tage bedeutet oder achtzehn. Die Aufteilung in kleinere, jeweils für sich wertvolle Teile führt zu genaueren Schätzungen und verschafft dem Team im Sprint früher Feedback.',
      paragraphs: [
        'Nützliche Muster zum Aufteilen: nach Arbeitsschritt (zuerst Upload, dann Verarbeitung, dann Benachrichtigungen), nach Datenvariante (ein Dateiformat vor dreien unterstützen), nach Normalfall und Sonderfällen oder nach Plattform (Web vor Mobile). Vermeide die Aufteilung nach technischer Schicht („Backend-Story“ und „Frontend-Story“), wenn sich die Teile nicht unabhängig voneinander ausliefern lassen.',
        'Beispiel: „Nutzer können ihre Berichte exportieren“ landet bei 20. Aufgeteilt in „Einzelnen Bericht als PDF exportieren“ (5), „Zeitraum als ZIP mit PDFs exportieren“ (5) und „Export per E-Mail senden, sobald er fertig ist“ (3). Die Summe ist kleiner, und jedes Teil lässt sich für sich vorführen.',
      ],
    },
    {
      title: '8. Nutze die ?- und Kaffeekarten ehrlich',
      content: 'Die meisten [Kartendecks für Planning Poker](/planning-poker-cards) enthalten zwei Sonderkarten. Das Fragezeichen bedeutet „Ich verstehe diese Story nicht gut genug, um sie zu schätzen“. Die Kaffeetasse bedeutet „Ich brauche eine Pause“. Beides sind legitime Stimmen, und beide tragen nützliche Informationen.',
      paragraphs: [
        'Schon ein einziges „?“ in einer Runde sollte die Abstimmung anhalten, bis die Frage beantwortet ist. Mehrere „?“-Karten bedeuten, dass die Story nicht bereit ist und zurück ins Refinement gehört, statt in eine Zahl gepresst zu werden. Eine Kaffeekarte von ein paar Personen nach neunzig Minuten ist ein verlässliches Zeichen, dass die restlichen Schätzungen schlechter ausfallen werden als die früheren – mach die Pause.',
        'Sorge dafür, dass diese Karten ohne soziales Risiko genutzt werden können. Wertet das Team ein „?“ als Eingeständnis von Schwäche, wird stattdessen geraten – und genau das Raten willst du abschaffen.',
      ],
    },
    {
      title: '9. Setze jeder Story eine Zeitgrenze',
      content: 'Planning-Poker-Sessions geraten aus dem Ruder, wenn eine einzelne Story zwanzig Minuten verschlingt. Stell pro Story einen sichtbaren Timer – drei bis fünf Minuten inklusive Diskussion sind ein guter Standard – und vereinbare vorab, was passiert, wenn die Zeit abgelaufen ist: Story zurückstellen, offene Frage notieren, weitermachen.',
      paragraphs: [
        'Ein gemeinsamer Timer funktioniert besser, als wenn die Moderation auf die Uhr schaut, weil alle sehen, wie viel Zeit noch bleibt, und sich selbst regulieren. Online-Tools mit integriertem Timer machen das für verteilte Teams mühelos.',
        'Begrenze auch die Session als Ganzes zeitlich. Braucht dein Team regelmäßig mehr als zwei Stunden, um die Arbeit eines Sprints zu schätzen, liegt das Problem im Refinement, nicht in der Poker-Session.',
      ],
    },
    {
      title: '10. Gleiche Schätzungen mit der Realität ab',
      content: 'Schätzungen werden durch Feedback besser. Sieh dir am Ende jedes Sprints oder in der Retrospektive die Stories an, die deutlich länger oder kürzer gedauert haben, als ihre Punkte nahelegten. Frag, was das Team zum Zeitpunkt der Schätzung wusste und was es später gelernt hat.',
      items: [
        'Laufen bestimmte Arten von Arbeit (Integrationen, Datenmigrationen, UI-Feinschliff) regelmäßig aus dem Ruder? Passe die Referenz-Stories für diese Kategorie an.',
        'War die Streuung in Runde eins bei den Stories groß, die das Team später überrascht haben? Das deutet auf schwaches Refinement hin, nicht auf schwaches Schätzen.',
        'Wurden die in der Session zurückgestellten Stories geklärt, bevor der Sprint begann?',
        'Bewahre den Rundenverlauf aus deinem Poker-Tool auf, damit du die abschließenden Stimmen jeder Story siehst, nicht nur die vereinbarte Zahl; notiere die Streuung der ersten Runde selbst, wenn eine Story neu abgestimmt werden musste.',
      ],
    },
    {
      title: 'Häufige Fehler beim Planning Poker',
      content: 'Selbst Teams, die die Regeln kennen, tappen in einige wiederkehrende Fallen. Achte auf diese:',
      items: [
        'Den Durchschnitt der Stimmen bilden. Der Mittelwert von 3 und 13 ist keine Schätzung, sondern ein Münzwurf. Diskutiert stattdessen.',
        'Product Owner oder Führungskräfte mitstimmen lassen. Sie verantworten Priorität und Umfang, nicht den Aufwand. Genau dafür gibt es den Zuschauermodus.',
        'Die Story erst beim Abstimmen verstehen wollen. Der Abstimmung sollte eine kurze Klärung vorausgehen, worum es in der Story geht.',
        'Punkte als Zusage oder Leistungskennzahl behandeln. Sobald Punkte zur Bewertung von Menschen dienen, werden sie aufgebläht.',
        'Fertige Arbeit neu schätzen, um die Velocity zu „korrigieren“. Velocity ist ein Planungswerkzeug, kein Punktestand.',
        'In Remote-Sessions das Aufdecken überspringen und Zahlen in den Chat schreiben, womit der Ankereffekt zurückkehrt.',
      ],
    },
    {
      title: 'Eine realistische Beispielrunde',
      content: 'Story: „Als Kunde kann ich eine Lieferadresse in meinem Profil speichern, damit der Checkout schneller geht.“ Akzeptanzkriterien: Adressformular mit Validierung, gespeicherte Adressen erscheinen im Checkout, höchstens fünf Adressen pro Nutzer.',
      paragraphs: [
        'Runde eins ergibt 3, 3, 5, 8, 8. Die beiden Personen mit der 8 erklären: Die Validierung internationaler Adressformate ist knifflig, und der bestehende Checkout kennt keine gespeicherten Daten. Eine Person mit der 3 entgegnet, dass die Profilseite bereits eine generische Formularkomponente mit Validierung hat, und das Team ist sich einig, dass internationale Validierung in diesem Sprint nicht zum Umfang gehört – der Product Owner ergänzt die Story um „nur inländische Adressen“.',
        'Runde zwei ergibt 5, 5, 5, 5, 8. Das Team nimmt die 5, und die Person mit der 8 ist einverstanden, weil die internationalen Formate nun ein eigener Backlog-Eintrag sind. Gesamtdauer: vier Minuten. Die Story ist klarer als bei ihrer Ankunft, und alle wissen, warum sie eine 5 ist.',
      ],
    },
    {
      title: 'Der Einstieg',
      content: 'Du brauchst nicht alle zehn Praktiken ab dem ersten Tag. Beginne mit gleichzeitigem Aufdecken, der Diskussion der Ausreißer und einer Zeitgrenze; nimm nach ein, zwei Sprints Referenz-Stories hinzu; führe dann Genauigkeitsrückblicke ein, sobald du etwas Historie hast. Arbeitet dein Team remote oder hybrid, bietet dir ein [kostenloses Browser-Tool für Scrum Poker](/blog/free-scrum-poker-tools) wie Scrum Poker Online verdeckte Stimmen, einen gemeinsamen Timer und einen Rundenverlauf, ohne dass jemand ein Konto anlegen muss.',
    },
  ],
  faq: [
    {
      q: 'Was ist der Unterschied zwischen Scrum Poker und Planning Poker?',
      a: 'Es ist dieselbe Technik. „Planning Poker“ ist der ursprüngliche Name; „Scrum Poker“ hat sich verbreitet, weil die Praxis am häufigsten von Scrum-Teams in der Sprint-Planung und im Backlog-Refinement eingesetzt wird.',
    },
    {
      q: 'Wie viele Abstimmungsrunden sollten wir pro Story durchführen?',
      a: 'Zwei Runden sind die Regel: eine erste Abstimmung, die Diskussion der Ausreißer und eine zweite Abstimmung. Gehen die Werte auch in der zweiten Runde weit auseinander, ist die Story unklar oder zu groß – stellt sie zurück und teilt oder verfeinert sie, statt ein drittes Mal abzustimmen.',
    },
    {
      q: 'Sollten Product Owner oder Scrum Master beim Planning Poker mit abstimmen?',
      a: 'In der Regel nicht. Wer die Arbeit erledigt, schätzt die Arbeit. Der Product Owner erklärt die Story und beantwortet Fragen; der Scrum Master moderiert. Beide können als Zuschauer teilnehmen, sodass sie die Stimmen sehen, ohne sie zu beeinflussen.',
    },
    {
      q: 'Was tun, wenn die Schätzungen nie zusammenkommen?',
      a: 'Anhaltende Uneinigkeit bedeutet fast immer, dass die Story eine ungeklärte Frage verbirgt – eine unbekannte Abhängigkeit, eine mehrdeutige Anforderung oder zwei unterschiedliche Vorstellungen von der Lösung. Schreib die Frage auf, schick die Story zurück ins Refinement und schätze sie, sobald die Frage beantwortet ist.',
    },
    {
      q: 'Können wir Planning Poker auch für Bugs und technische Aufgaben nutzen?',
      a: 'Ja, solange der Eintrag gut genug verstanden ist, um ihn zu schätzen. Viele Teams schätzen Bugs nur, wenn die Ursache bekannt ist, und behandeln die Untersuchung als zeitlich begrenzten Spike statt als Story mit Punkten.',
    },
  ],
};

export default de;
