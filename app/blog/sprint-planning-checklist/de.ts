import type { Localized } from '../articleTypes';

const de: Localized = {
  title: "Checkliste für die Sprint-Planung: 12 Schritte zu einer erfolgreichen Sprint-Planung",
  subtitle: "Was du vor dem Meeting vorbereiten, was du im Raum entscheiden und was du danach festhalten solltest – eine Schritt-für-Schritt-Checkliste für die Sprint-Planung in Scrum-Teams, mit durchgerechnetem Beispiel.",
  sections: [
    {
      title: "Was ist Sprint-Planung?",
      content: "Die Sprint-Planung ist das Meeting, mit dem jeder Sprint beginnt. Das Scrum-Team sieht sich das priorisierte Product Backlog an, einigt sich auf ein Sprint-Ziel, wählt die Backlog-Einträge aus, die es fertigstellen zu können glaubt, und erarbeitet, wie es sie liefern wird. Das Ergebnis ist das Sprint Backlog: das Ziel, die ausgewählten Einträge und ein erster Plan für die Arbeit.",
      paragraphs: [
        "Der Scrum Guide begrenzt die Sprint-Planung bei einem einmonatigen Sprint auf höchstens acht Stunden und hält fest, dass das Event bei kürzeren Sprints in der Regel kürzer ist; die meisten Teams mit zweiwöchigen Sprints sind nach zwei bis vier Stunden fertig. Das Meeting beantwortet drei Fragen: Warum ist dieser Sprint wertvoll, was kann erledigt werden, und wie wird die Arbeit erledigt? Jeder Schritt der folgenden Checkliste dient einer dieser drei Fragen.",
      ],
    },
    {
      title: "Vor dem Meeting: Schritte 1 bis 4",
      content: "Die Vorbereitung findet im Backlog-Refinement während des vorherigen Sprints statt, nicht im Planungsmeeting selbst. Sind die folgenden vier Schritte erledigt, wird in der Planung entschieden statt erst erkundet.",
      items: [
        "1. Den oberen Teil des Backlogs verfeinern. Product Owner und Entwickler haben die Einträge mit der höchsten Priorität besprochen, jeder hat eine klare Beschreibung und testbare Akzeptanzkriterien, und Einträge, die für einen Sprint zu groß sind, wurden aufgeteilt.",
        "2. Die Kandidaten schätzen. Alles, was in den Sprint kommen könnte, hat eine vom Team vereinbarte Story-Point-Schätzung. Sind einige Einträge noch ungeschätzt, plane zu Beginn der Planung eine kurze Schätzrunde ein, statt mittendrin spontan zu schätzen.",
        "3. Velocity und Kapazität kennen. Berechne den Durchschnitt der letzten drei bis fünf Sprints und erfasse, wer im kommenden Sprint verfügbar ist – Urlaub, Schulungen, Rufbereitschaft, Teilzeittage.",
        "4. Ein Sprint-Ziel entwerfen. Der Product Owner bringt einen Zielvorschlag mit, der an ein geschäftliches Ergebnis geknüpft ist. Er wird im Meeting angepasst, aber ein Entwurf als Ausgangspunkt hält die Diskussion fokussiert.",
      ],
    },
    {
      title: "Schritt 5: das Sprint-Ziel vereinbaren",
      content: "Beginne das Meeting mit dem Ziel, nicht mit der Ticketliste. Das Sprint-Ziel ist ein Satz, der beschreibt, was der Sprint erreichen soll – „Kunden können mit einer gespeicherten Karte bezahlen“ statt „Tickets 231 bis 244 abarbeiten“. Es gibt dem Team einen Grund zur Zusammenarbeit und eine Grundlage für Abwägungen: Wenn etwas ins Rutschen gerät, fallen zuerst die Einträge weg, die dem Ziel nicht dienen.",
      paragraphs: [
        "Ein gutes Ziel ist konkret genug, dass sich erkennen lässt, ob es erreicht wurde, und offen genug, dass das Team selbst wählen kann, wie es dorthin kommt. Dienen die vorgeschlagenen Einträge drei voneinander unabhängigen Zielen, wähle entweder eines aus oder erkenne an, dass der Sprint kein einzelnes Ziel hat – und nimm den damit verbundenen Verlust an Fokus in Kauf.",
      ],
    },
    {
      title: "Schritt 6: die Kapazität für diesen Sprint bestätigen",
      content: "[Die Velocity deines Teams](/blog/agile-velocity) sagt dir, was das Team in einem typischen vergangenen Sprint geliefert hat. Die Kapazität sagt dir, ob der kommende Sprint typisch ist. Vergleiche beides, bevor du auch nur einen Eintrag auswählst.",
      paragraphs: [
        "Angenommen, die durchschnittliche Velocity liegt bei 30 Punkten und das Team hat sechs Entwickler. Im kommenden Sprint ist eine Entwicklerin den ganzen Sprint über im Urlaub und ein Entwickler die Hälfte der Zeit abwesend; dem Team fehlen also eineinhalb von sechs Entwickler-Sprints – ein Viertel seiner üblichen Kapazität. Mit 22 oder 23 statt 30 Punkten zu planen ist der ehrliche Ausgangspunkt. Zieh außerdem bekannte Verpflichtungen außerhalb des Sprints ab, etwa einen Release-Tag, eine Firmenveranstaltung oder eine intensive Rufbereitschaft.",
      ],
    },
    {
      title: "Schritte 7 und 8: Backlog-Einträge auswählen und prüfen",
      content: "Sind Ziel und Kapazität vereinbart, ziehst du Einträge von oben aus dem Backlog, bis sich die Punktesumme der Kapazität nähert. Hör dort auf, auch wenn sich der Sprint leicht anfühlt; es ist weitaus besser, mitten im Sprint einen zusätzlichen Eintrag hereinzunehmen, als drei in den nächsten Sprint zu übertragen.",
      items: [
        "7. Wähle nach Priorität aus, was dem Ziel dient. Einen Eintrag mit hoher Priorität zu überspringen, weil er unbequem ist, ist eine Entscheidung, die der Product Owner ausdrücklich treffen muss – kein Standard.",
        "8. Prüfe jeden Eintrag, bevor du ihn annimmst: Er passt in einen Sprint, seine Akzeptanzkriterien sind testbar, seine Abhängigkeiten von anderen Teams oder Systemen sind gelöst oder ausdrücklich als Risiko akzeptiert, jemand im Team hat die nötigen Fähigkeiten, und benötigter Input zu Design oder Architektur liegt bereits vor.",
      ],
      paragraphs: [
        "Ein Eintrag, der eine dieser Prüfungen nicht besteht, geht zurück ins Refinement. Ihn hereinzunehmen, „weil wir das schon herausfinden“, ist genau der Weg zu Sprints, die mit halbfertiger Arbeit enden.",
      ],
    },
    {
      title: "Schritt 9: schätzen, was noch nicht geschätzt ist",
      content: "Fehlen einigen Kandidaten noch Schätzungen, führe jetzt eine kurze Planning-Poker-Runde für sie durch. Halte sie straff: Eintrag vorlesen, Verständnisfragen stellen, alle wählen verdeckt eine Karte, gleichzeitig aufdecken, und bei großer Streuung erklären die Personen mit der höchsten und der niedrigsten Stimme ihre Sicht; die Anleitung [So leitest du eine Scrum-Poker-Session](/guide) zeigt jeden Schritt im Detail. Begrenze jeden Eintrag auf wenige Minuten; lässt er sich in dieser Zeit nicht schätzen, ist er nicht bereit und sollte nicht in den Sprint.",
      paragraphs: [
        "Das gleichzeitige Aufdecken gehört zu den wichtigsten [Best Practices für Scrum Poker](/blog/scrum-poker-best-practices), weil die zuerst laut genannte Zahl alle anderen in ihre Richtung zieht. Mit Scrum Poker Online kannst du [einen kostenlosen Planning-Poker-Raum starten](/) und diese Runden ohne Registrierung durchführen: Die Stimmen bleiben verdeckt, bis die Runde aufgedeckt wird, und der Rundenverlauf hält die abschließenden Stimmen jedes Eintrags fest, die du als CSV herunterladen oder als Markdown kopieren kannst. Notiere selbst, welche Einträge eine zweite Abstimmung brauchten – ein nützliches Signal für das nächste Refinement.",
      ],
    },
    {
      title: "Schritte 10 und 11: die Arbeit zerlegen und sich festlegen",
      content: "Sind die Einträge ausgewählt, planen die Entwickler, wie sie sie liefern. Dieser Teil des Meetings gehört den Entwicklern; der Product Owner bleibt für Fragen verfügbar, gibt aber den technischen Plan nicht vor.",
      items: [
        "10. Zerlege zumindest die ersten Einträge in Aufgaben, die klein genug sind, um sie an einem Tag oder schneller zu erledigen. Die Aufgabenzerlegung deckt regelmäßig versteckte Komplexität auf – eine Migration, eine fehlende API, einen unklaren Sonderfall –, solange noch Zeit ist, einen Eintrag auszutauschen.",
        "11. Mach das Commitment ausdrücklich. Frag das Team direkt, ob es das Sprint-Ziel mit den ausgewählten Einträgen und der bekannten Kapazität für erreichbar hält. Ein zögerliches Ja ist ein Nein; nimm etwas heraus.",
      ],
    },
    {
      title: "Schritt 12: nach dem Meeting",
      content: "Das Meeting bringt Entscheidungen hervor; das Sprint Backlog macht sie real. Innerhalb einer Stunde nach dem Ende sollte Folgendes erfüllt sein.",
      items: [
        "12. Das Sprint Backlog ist festgehalten: Das Sprint-Ziel ist im Tool und auf dem Board des Teams sichtbar, die ausgewählten Einträge sind mit ihren Schätzungen in den Sprint verschoben, Aufgaben sind erfasst, Annahmen zur Kapazität notiert, und jedes im Meeting angesprochene Risiko und jede Abhängigkeit hat eine verantwortliche Person.",
        "Das Team weiß, mit welchem Eintrag es beginnt, und hat ihn idealerweise noch am selben Tag begonnen.",
        "Alles, was zurück ins Refinement gegangen ist, wurde dem Product Owner gemeldet, damit es beim nächsten Mal bereit ist.",
      ],
    },
    {
      title: "Beispiel: ein zweistündiges Planungsmeeting",
      content: "So sehen die zwölf Schritte in der Praxis aus – für ein fiktives Team aus fünf Entwicklern mit zweiwöchigen Sprints und einer durchschnittlichen Velocity von 28 Punkten. Die Zahlen sind zur Veranschaulichung erfunden.",
      items: [
        "0:00–0:10 – Der Scrum Master bestätigt die Kapazität. Alle sind verfügbar außer einem Entwickler, der zwei Tage auf einer Konferenz ist; das Team plant daher mit etwa 26 statt 28 Punkten.",
        "0:10–0:25 – Der Product Owner stellt den Zielentwurf „Neue Nutzer können das Onboarding abschließen, ohne ein Support-Ticket zu eröffnen“ und die zwölf obersten verfeinerten Einträge vor. Das Team stellt Fragen und schärft die Formulierung des Ziels.",
        "0:25–0:40 – Drei Einträgen fehlen Schätzungen. Eine kurze Planning-Poker-Runde ergibt 3, 5 und 8, mit einer neuen Abstimmung bei der 8.",
        "0:40–1:10 – Das Team zieht Einträge in Prioritätsreihenfolge: 5, 3, 8, 5 und 3, zusammen 24 Punkte. Der nächste Eintrag ist eine 8, die die Summe auf 32 bringen würde; er bleibt im Backlog, und stattdessen wird ein 1-Punkt-Eintrag weiter unten gezogen, womit der Sprint auf 25 Punkte kommt.",
        "1:10–1:50 – Die Entwickler zerlegen die ersten vier Einträge in Aufgaben. Einer der 5-Punkte-Einträge hängt, wie sich zeigt, von einer noch nicht veröffentlichten API eines anderen Teams ab; er wird gegen einen anderen 5-Punkte-Eintrag weiter unten im Backlog getauscht, sodass der Sprint bei 25 Punkten bleibt.",
        "1:50–2:00 – Das Team bestätigt das Commitment, das Sprint Backlog wird im Tool aktualisiert, und das Ziel wird im Team-Channel gepostet.",
      ],
      paragraphs: [
        "Nichts an diesem Meeting ist bemerkenswert, und genau darum geht es. Weil das Refinement vorher stattgefunden hat, reichten zwei Stunden, um jede Entscheidung mit dem ganzen Team zu treffen.",
      ],
    },
    {
      title: "Häufige Fehler bei der Sprint-Planung",
      content: "Diese Muster tauchen immer wieder in Teams auf, deren Planungsmeetings zu lange dauern oder deren Sprints mit unfertiger Arbeit enden.",
      items: [
        "Im Meeting verfeinern. Schreibt das Team während der Planung Akzeptanzkriterien, dauert das Meeting doppelt so lange, und die Schätzungen sind geraten.",
        "Nach Velocity planen, ohne die Kapazität zu prüfen. Dreißig Punkte sind kein Plan für einen Sprint, in dem zwei Personen fehlen.",
        "Den Sprint vollstopfen. Wer die Velocity als zu erfüllende Quote statt als Obergrenze behandelt, überträgt routinemäßig Arbeit in den nächsten Sprint.",
        "Kein Sprint-Ziel. Ist jeder Eintrag gleich wichtig, kann das Team nicht entscheiden, was wegfällt, wenn die Realität dazwischenkommt.",
        "Schätzungen von einer einzigen Person. Verkündet eine Teamleitung die Größen, setzt sie den Anker für alle anderen und verdeckt die Meinungsverschiedenheiten, die Risiken sichtbar machen.",
        "Product Owner abwesend oder unvorbereitet. Ohne Prioritäten und Antworten im Raum rät das Team entweder oder wartet.",
        "Das ausdrückliche Commitment auslassen. Ein Sprint, dem niemand zugestimmt hat, ist ein Sprint, für den sich niemand verantwortlich fühlt.",
      ],
    },
    {
      title: "Wann diese Checkliste hilft und wann sie im Weg steht",
      content: "Am wertvollsten ist die Checkliste für Teams, deren Sprints regelmäßig mit unfertiger Arbeit enden, deren Planungsmeetings ihre Zeitgrenze überschreiten oder die kürzlich ihre Besetzung oder ihre Tools gewechselt haben. Sie macht aus der Planung, die vom Gedächtnis einer erfahrenen Person abhängt, eine wiederholbare Routine.",
      paragraphs: [
        "Weniger nützlich ist sie für sehr reife Teams, die bereits kontinuierlich verfeinern und in dreißig Minuten planen; für sie bringt es Overhead ohne Erkenntnis, alle zwölf Schritte zeremoniell abzuarbeiten. Verstehe die Schritte als Diagnose: Kannst du einen überspringen, weil er bereits erfüllt ist, dann überspring ihn. Und denk daran: Eine Checkliste kann bestätigen, dass es Akzeptanzkriterien gibt – nicht, dass sie gut sind.",
      ],
    },
    {
      title: "Checkliste für die Sprint-Planung: die 12 Schritte auf einer Seite",
      content: "Die zwölf Schritte in einer Form, die du in dein Team-Wiki einfügen kannst.",
      items: [
        "1. Oberste Backlog-Einträge verfeinert, mit Akzeptanzkriterien",
        "2. Kandidaten geschätzt",
        "3. Velocity und Kapazität bekannt",
        "4. Entwurf des Sprint-Ziels vorbereitet",
        "5. Sprint-Ziel vereinbart",
        "6. Kapazität für diesen Sprint angepasst",
        "7. Einträge in Prioritätsreihenfolge innerhalb der Kapazität ausgewählt",
        "8. Jeder Eintrag geprüft: passt, testbar, Abhängigkeiten geklärt, Fähigkeiten vorhanden",
        "9. Ungeschätzte Einträge per Planning Poker mit gleichzeitigem Aufdecken geschätzt",
        "10. Arbeit in tagesgroße Aufgaben zerlegt",
        "11. Ausdrückliches Commitment des Teams zum Ziel",
        "12. Sprint Backlog festgehalten und kommuniziert",
      ],
    },
  ],
  faq: [
    {
      q: "Wie lange sollte die Sprint-Planung dauern?",
      a: "Der Scrum Guide legt für einen einmonatigen Sprint höchstens acht Stunden fest; bei kürzeren Sprints ist das Event in der Regel kürzer. Teams mit zweiwöchigen Sprints brauchen meist zwei bis vier Stunden. Dauern eure Meetings länger, liegt das fast immer daran, dass das Refinement im Meeting stattfindet statt davor.",
    },
    {
      q: "Wer sollte an der Sprint-Planung teilnehmen?",
      a: "Das gesamte Scrum-Team: der Product Owner, die Entwickler und der Scrum Master. Stakeholder oder Fachexperten können zum Auftakt dazukommen, um Kontext zu liefern, aber die Auswahl und der Plan gehören dem Team. Der Product Owner muss anwesend sein; Planung ohne Prioritäten und Antworten im Raum ist Rätselraten.",
    },
    {
      q: "Was ist der Unterschied zwischen Backlog-Refinement und Sprint-Planung?",
      a: "Refinement ist die fortlaufende Tätigkeit, Backlog-Einträge zu klären, aufzuteilen und zu schätzen, damit sie bearbeitet werden können. Die Sprint-Planung ist das Event, in dem das Team bereite Einträge für den kommenden Sprint auswählt und plant, wie es sie liefert. Das Refinement stellt die Speisekarte zusammen; die Planung gibt die Bestellung auf.",
    },
    {
      q: "Sollten wir nach Velocity oder nach Kapazität planen?",
      a: "Nach beidem. Die Velocity liefert die Basis – das, was das Team typischerweise abschließt. Die Kapazität passt diese Basis an den konkreten kommenden Sprint an und berücksichtigt Urlaub, Rufbereitschaft und andere Abwesenheiten. Wer nur nach Velocity plant, ignoriert die Realität des kommenden Sprints; wer nur nach Kapazität plant, ignoriert die Historie des Teams.",
    },
    {
      q: "Was, wenn sich das Team nicht auf ein Sprint-Ziel einigen kann?",
      a: "Das bedeutet meist, dass der obere Teil des Backlogs nicht fokussiert ist: Er enthält Einträge, die mehreren voneinander unabhängigen Ergebnissen dienen. Der Product Owner entscheidet, welches Ergebnis Vorrang hat, und das Ziel ergibt sich daraus. Muss der Sprint tatsächlich zwei Ergebnissen dienen, benenne ein Hauptziel und behandle das zweite als Zusatzziel, damit das Team weiß, was es schützen muss, wenn die Zeit knapp wird.",
    },
  ],
};

export default de;
