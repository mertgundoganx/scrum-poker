import type { Localized } from '../articleTypes';

const de: Localized = {
  title: "Agile Velocity: Berechnen, verfolgen und für die Sprint-Planung nutzen",
  subtitle: "Was Velocity tatsächlich misst, wie du sie korrekt berechnest, ein durchgerechnetes Beispiel und die Fehler, die aus einer nützlichen Planungsgröße eine schädliche machen.",
  sections: [
    {
      title: "Was ist Velocity in agilen Teams?",
      content: "Velocity ist die Menge an Arbeit, die ein Scrum-Team in einem einzelnen Sprint fertigstellt – gemessen in derselben Einheit, in der das Team schätzt, meist in [Story Points statt Stunden](/blog/story-points-vs-hours). Schließt ein Team in einem zweiwöchigen Sprint User Stories im Umfang von 30 Punkten ab, beträgt seine Velocity für diesen Sprint 30. Über mehrere Sprints gemittelt wird die Velocity zur praktischsten Planungsgröße des Teams: Sie zeigt ungefähr, wie viel aus dem Backlog in den nächsten Sprint passt und wie viele Sprints ein Release voraussichtlich braucht.",
      paragraphs: [
        "Zwei Dinge unterscheiden Velocity von den Produktivitätskennzahlen, die die meisten Führungskräfte gewohnt sind. Erstens bezieht sie sich immer auf das Team, nie auf Einzelne: Story Points werden einer Story zugeordnet, und geliefert wird die Story vom Team. Zweitens ist sie relativ. Ein Punkt hat außerhalb des Teams, das ihn geschätzt hat, keine feste Bedeutung – Velocity ergibt also nur im Kontext der eigenen Historie dieses Teams Sinn.",
        "Velocity ist ein empirischer Messwert, kein Ziel. Sie beschreibt, was passiert ist, und taugt nur dazu, abzuschätzen, was bei ähnlichen Bedingungen wahrscheinlich als Nächstes passiert. Sobald ein Team gedrängt wird, „die Velocity zu steigern“, beschreibt die Zahl nicht mehr die Realität, sondern den Druck.",
      ],
    },
    {
      title: "Velocity Schritt für Schritt berechnen",
      content: "Die Rechnung selbst ist einfach. Die Disziplin liegt darin, was du zählst.",
      items: [
        "1. Liste am Ende des Sprints alle Backlog-Einträge auf, die das Team in den Sprint gezogen hat.",
        "2. Behalte nur die Einträge, die eure Definition of Done vollständig erfüllen – reviewt, getestet, gemergt, auslieferbar oder was immer dein Team vereinbart hat. Ein zu 90 % fertiger Eintrag zählt in diesem Sprint mit null; seine Punkte wandern in den Sprint, in dem er tatsächlich fertig wird.",
        "3. Addiere die Story Points der abgeschlossenen Einträge. Diese Summe ist die Velocity des Sprints.",
        "4. Wiederhole das für jeden Sprint und halte die Zahlen an einem Ort fest, den das ganze Team sehen kann.",
        "5. Berechne nach drei bis fünf Sprints den Durchschnitt oder einen gleitenden Durchschnitt der letzten Sprints. Das ist die Velocity, mit der du planst.",
      ],
      paragraphs: [
        "Schätze fertige Stories nicht nachträglich neu, um die Zahl besser aussehen zu lassen, und vergib keine Teilpunkte. Beides wirkt im Moment harmlos, macht aber die historischen Werte unzuverlässig – und damit ist der einzige Zweck der Velocity dahin.",
      ],
    },
    {
      title: "Beispiel: sechs Sprints Velocity",
      content: "Angenommen, ein neu zusammengestelltes Team arbeitet in zweiwöchigen Sprints und erzielt in seinen ersten sechs Sprints folgende Ergebnisse. Die Zahlen sind zur Veranschaulichung erfunden.",
      items: [
        "Sprint 1: 30 Punkte eingeplant, 22 abgeschlossen (zwei Stories in den nächsten Sprint übernommen)",
        "Sprint 2: 30 Punkte eingeplant, 31 abgeschlossen (die übernommenen Stories wurden früh fertig)",
        "Sprint 3: 32 Punkte eingeplant, 28 abgeschlossen",
        "Sprint 4: 30 Punkte eingeplant, 35 abgeschlossen",
        "Sprint 5: 34 Punkte eingeplant, 26 abgeschlossen (eine Entwicklerin eine Woche im Urlaub)",
        "Sprint 6: 30 Punkte eingeplant, 32 abgeschlossen",
      ],
      paragraphs: [
        "Der Durchschnitt über alle sechs Sprints beträgt (22 + 31 + 28 + 35 + 26 + 32) / 6 = 174 / 6 = 29 Punkte. Der gleitende Durchschnitt der letzten drei Sprints liegt bei (35 + 26 + 32) / 3 = 93 / 3 = 31 Punkten. Beides sind vernünftige Planungswerte. Wichtiger ist die Beobachtung, dass das Team in einem normalen Sprint irgendwo zwischen etwa 26 und 35 Punkten schafft – und diese Spanne, nicht ein einzelner Sprint, ist die Realität, mit der du planen solltest.",
        "Nun fragt der Product Owner, wie lange die restlichen 180 Punkte im Release-Backlog dauern werden. Mit dem Sechs-Sprint-Durchschnitt von 29 Punkten ergibt 180 / 29 etwa 6,2, also rund sieben Sprints. Mit dem unteren Ende der Spanne (26 Punkte) ergibt 180 / 26 etwa 6,9, also sieben Sprints. Mit dem oberen Ende (35 Punkte) ergibt 180 / 35 etwa 5,1, also sechs Sprints. Eine seriöse Prognose lautet daher „sechs bis sieben Sprints, am wahrscheinlichsten sieben“ – kommuniziert als Spanne, nicht als Datum.",
      ],
    },
    {
      title: "Velocity für Sprint-Planung und Release-Prognosen nutzen",
      content: "In der [Sprint-Planung](/blog/sprint-planning-checklist) ist die Velocity die Obergrenze dafür, wie viel das Team hereinnimmt, keine Quote, die erfüllt werden muss. Bei einer Planungs-Velocity von rund 30 Punkten wählt das Team die Stories mit der höchsten Priorität aus dem verfeinerten Backlog, bis die Summe nahe 30 liegt, und hört dann auf – auch wenn sich der Sprint leicht anfühlt.",
      paragraphs: [
        "Berücksichtige bekannte Kapazitätsänderungen, bevor du Stories auswählst. Sind zwei von sechs Entwicklern den halben Sprint im Urlaub, fehlt dem Team etwa ein Sechstel seiner Kapazität, und es sollte eher mit 25 statt 30 Punkten planen. Die Velocity liefert die Basis; die Kapazitätsplanung passt sie an den konkreten Sprint an.",
        "Auch in die Release-Planung fließt die Velocity ein. Teilst du die verbleibenden Backlog-Punkte durch die durchschnittliche Velocity, erhältst du die erwartete Zahl an Sprints; teilst du durch die niedrigste und höchste Velocity der letzten Zeit, erhältst du eine pessimistische und eine optimistische Grenze. Alle drei Werte zu zeigen ist weitaus ehrlicher als ein einzelnes Datum und macht Verhandlungen über den Umfang mit Stakeholdern konkret: Steht das Datum fest, zeigt die Spanne, wie viele Punkte aus dem Backlog weichen müssen.",
      ],
    },
    {
      title: "Warum sich die Velocity im Lauf der Zeit verändert",
      content: "Velocity verläuft nie als gerade Linie, und das soll sie auch nicht. Ein paar Punkte Schwankung von Sprint zu Sprint sind Rauschen. Größere oder anhaltende Verschiebungen haben meist eine erkennbare Ursache, die eine Diskussion in der Retrospektive wert ist.",
      items: [
        "Teamzusammensetzung: Ein neues Mitglied senkt die Velocity typischerweise für ein paar Sprints, während es die Codebasis kennenlernt; der Weggang einer erfahrenen Entwicklerin kann sie für längere Zeit senken.",
        "Sprintlänge: Der Wechsel von zwei- auf dreiwöchige Sprints verändert die Zahl selbst. Vergleiche Velocity nur zwischen Sprints gleicher Länge.",
        "Schätzdrift: Nennt das Team 5-Punkte-Stories allmählich 8-Punkte-Stories, steigt die Velocity, ohne dass mehr geliefert wird. Referenz-Stories helfen, die Skala stabil zu halten.",
        "Arbeitsmix: Ein Sprint mit vielen ungeschätzten Bugs, Incidents oder Support-Anfragen zeigt eine niedrigere Velocity, auch wenn das Team genauso hart gearbeitet hat.",
        "Technische Umbrüche: Die Einführung eines neuen Frameworks, eine Infrastrukturmigration oder der Abbau eines großen Bergs technischer Schulden senken die gelieferten Punkte vorübergehend.",
        "Unterbrechungen: Releases, Firmenveranstaltungen, Feiertage und Onboarding verringern die Zeit für geplante Arbeit.",
      ],
      paragraphs: [
        "Wegen dieser Faktoren planen die meisten Teams mit einem gleitenden Durchschnitt der letzten drei bis fünf Sprints statt nur mit dem letzten Sprint. Der gleitende Durchschnitt reagiert auf echte Veränderungen und dämpft zugleich das Rauschen eines einzelnen ungewöhnlichen Sprints.",
      ],
    },
    {
      title: "Häufige Velocity-Fehler und Anti-Patterns",
      content: "Velocity wird weit häufiger falsch als richtig eingesetzt. Die folgenden Muster tauchen in fast jeder Organisation auf, die sie einführt, ohne zu verstehen, was sie misst.",
      items: [
        "Velocity zwischen Teams vergleichen. Zwei Teams, die mit unterschiedlichen Skalen schätzen, messen Unterschiedliches; ein Team mit Velocity 60 ist nicht doppelt so effektiv wie eines mit Velocity 30. Der Vergleich ist bedeutungslos, und sobald Teams wissen, dass sie verglichen werden, blähen sich die Punkte auf.",
        "Velocity als Leistungskennzahl nutzen. Eine höhere Velocity zu belohnen ist der schnellste Weg, sie zu zerstören. Die Schätzungen wachsen, die Definition of Done schrumpft, und die Zahl sagt nichts mehr voraus.",
        "Velocity-Ziele vorgeben. „Wir müssen in diesem Quartal 40 schaffen“ macht aus einer Messung ein Ziel – und ein Ziel, das sich durch geänderte Schätzungen erreichen lässt, wird durch geänderte Schätzungen erreicht.",
        "Halbfertige Arbeit mitzählen. Wer für eine „fast fertige“ Story 5 von 8 Punkten vergibt, verschleiert, dass Arbeit in den nächsten Sprint wandert, und schönt den Trend.",
        "Mit dem besten Sprint planen. Wer sich auf die höchste jemals erreichte Velocity festlegt, garantiert regelmäßig gescheiterte Sprints.",
        "Individuelle Velocity messen. Story Points gehören dem Team. Individuelle Velocity verleitet dazu, Pairing, Reviews und gegenseitige Hilfe zu meiden – genau das Verhalten, das Teams schnell macht.",
      ],
    },
    {
      title: "Wann Velocity hilft und wann sie in die Irre führt",
      content: "Velocity spielt ihre Stärken aus, wenn ein stabiles Team seit mindestens einer Handvoll Sprints auf dieselbe Weise schätzt und eine realistische Antwort auf die Frage „Wie viel können wir übernehmen?“ braucht. In diesem Umfeld ist sie einfach, günstig und deutlich ehrlicher als das Bauchgefühl.",
      paragraphs: [
        "In die Irre führt sie, wenn die Voraussetzungen fehlen, auf denen sie beruht. Ein brandneues Team hat keine Historie, über die es mitteln könnte. Ein Team, dessen Mitglieder jeden Sprint wechseln, hat keine stabile Maßeinheit. Ein Team, das in jeden Sprint ungeschätzte Betriebsarbeit mischt, sieht wilde Ausschläge, die nichts mit der Planungsqualität zu tun haben. Und ein Team, das unter Druck steht, Verbesserung zu zeigen, verschiebt – bewusst oder nicht – seine Schätzungen, bis das Diagramm so aussieht, wie das Management es sich wünscht.",
        "Außerdem sagt Velocity nichts über den Wert aus. Ein Sprint, der 35 Punkte an Features mit niedriger Priorität liefert, ist nicht besser als einer, der 20 Punkte liefert und damit einen wichtigen Kunden entblockt. Kombiniere Velocity mit Ergebniskennzahlen – erreichte Ziele, gelöste Kundenprobleme, weniger Incidents – und behandle sie strikt als Kapazitätssignal.",
      ],
    },
    {
      title: "Konsistente Schätzungen halten die Velocity aussagekräftig",
      content: "Velocity ist nur so gut wie die Schätzungen dahinter. Wird eine Story in der einen Woche auf 3 geschätzt und eine ähnliche Story in der nächsten auf 8, sagen die daraus resultierenden Schwankungen nichts aus. Planning Poker dient hier nicht der Präzision, sondern der Konsistenz. Wenn jedes Teammitglied unabhängig anhand derselben Referenz-Stories schätzt und das Team die Unterschiede anschließend bespricht, bleibt die [Fibonacci-Punkteskala des Teams](/fibonacci-planning-poker) von Sprint zu Sprint stabil.",
      paragraphs: [
        "Auf die Mechanik kommt es an. Schätzungen sollten verdeckt bleiben, bis alle gewählt haben, damit die zuerst genannte Zahl nicht alle anderen beeinflusst. Scrum Poker Online ist ein kostenloses Werkzeug dafür: Es gibt keine Registrierung, die Stimmen bleiben bis zum gleichzeitigen Aufdecken verdeckt, und der Rundenverlauf hält für jede Story die abschließenden Stimmen fest, die du als CSV herunterladen oder als Markdown kopieren kannst. Dieser Verlauf ist auch eine nützliche Grundlage, wenn in der Retrospektive die Frage aufkommt, warum sich die Velocity verändert hat.",
      ],
    },
    {
      title: "Velocity-Checkliste",
      content: "Prüfe mit dieser Checkliste, ob eure Velocity als Planungsgrundlage taugt.",
      items: [
        "Das Team hat mindestens drei Sprints gleicher Länge in weitgehend stabiler Besetzung abgeschlossen.",
        "Gezählt werden nur Einträge, die die Definition of Done erfüllen; keine Teilpunkte, keine nachträgliche Neuschätzung.",
        "Ungeplante Arbeit wird in jedem Sprint gleich behandelt – immer geschätzt oder nie geschätzt.",
        "Die Velocity pro Sprint wird festgehalten und ist sichtbar, einschließlich der Lücke zwischen Eingeplantem und Abgeschlossenem.",
        "Geplant wird mit einem gleitenden Durchschnitt der letzten drei bis fünf Sprints, angepasst an bekannte Kapazitätsänderungen.",
        "Prognosen werden als Spanne von Sprints kommuniziert, nicht als einzelnes Datum.",
        "Niemand außerhalb des Teams nutzt die Zahl, um Teams zu vergleichen, Personen zu bewerten oder Ziele zu setzen.",
        "Das Team prüft regelmäßig einige Referenz-Stories, um Schätzdrift zu erkennen.",
      ],
    },
  ],
  faq: [
    {
      q: "Was ist eine gute Velocity für ein Scrum-Team?",
      a: "Eine allgemeingültige gute Velocity gibt es nicht. Die Zahl hängt davon ab, wie das Team Punkte vergibt, wie lang seine Sprints sind und wie viele Personen es umfasst – 20 kann für ein Team hervorragend und 80 für ein anderes gewöhnlich sein. Eine gute Velocity ist einfach eine, die stabil genug für die Planung ist: Liegen die letzten fünf Sprints in einer engen Spanne, kann das Team zuverlässig prognostizieren, ganz gleich, wie hoch die absolute Zahl ist.",
    },
    {
      q: "Wie viele Sprints braucht es, bis die Velocity verlässlich ist?",
      a: "Die meisten Teams haben nach drei Sprints einen brauchbaren Durchschnitt und nach fünf oder sechs einen recht stabilen – vorausgesetzt, Teambesetzung und Sprintlänge bleiben gleich. Plane bis dahin vorsichtig, behandle die Zahl als vorläufig und rechne damit, sie anzupassen.",
    },
    {
      q: "Sollten Bugs und technische Schulden in die Velocity einfließen?",
      a: "Beides ist in Ordnung, solange du konsequent bleibst. Schätzt und zählst du Bugs und technische Schulden, spiegelt die Velocity die gesamte gelieferte Arbeit wider. Bleiben sie ungeschätzt, spiegelt die Velocity nur Feature-Arbeit wider und fällt in Sprints mit vielen Bugs niedriger aus. Der Fehler liegt darin, zwischen beiden Ansätzen zu wechseln – dann lassen sich Sprints nicht mehr vergleichen.",
    },
    {
      q: "Bedeutet eine höhere Velocity, dass sich das Team verbessert?",
      a: "Nicht unbedingt. Die Velocity steigt, wenn das Team tatsächlich mehr liefert, aber auch, wenn Schätzungen aufgebläht werden, die Definition of Done gelockert wird oder Sprints länger werden. Prüfe die Konsistenz der Schätzungen und die Qualität des Gelieferten, bevor du eine steigende Kurve als Verbesserung deutest.",
    },
    {
      q: "Was ist der Unterschied zwischen Velocity und Kapazität?",
      a: "Velocity ist ein historischer Messwert: die Punkte, die das Team pro Sprint tatsächlich abgeschlossen hat. Kapazität ist ein vorausschauender Wert: die Personen und Tage, die für einen bestimmten kommenden Sprint zur Verfügung stehen. Nutze die Velocity als Basis und passe sie an die Kapazität an, wenn Urlaub, Rufbereitschaft oder andere Abwesenheiten den kommenden Sprint von einem typischen unterscheiden.",
    },
  ],
};

export default de;
