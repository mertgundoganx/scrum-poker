import type { Localized } from '../articleTypes';

const de: Localized = {
  title: "Wie du beim Planning Poker einen Schätzkonsens erreichst",
  subtitle: "Warum Story-Point-Schätzungen auseinandergehen, wie du eine Konsensrunde Schritt für Schritt durchführst und wann Uneinigkeit dir mehr verrät als eine Zahl.",
  sections: [
    {
      title: "Was bedeutet Konsens beim Planning Poker?",
      content: "Beim [Planning Poker](/blog/what-is-planning-poker) bedeutet Konsens, dass sich das Team auf einen einzigen Story-Point-Wert für einen Backlog-Eintrag einigt – und, noch wichtiger, darauf, was der Eintrag umfasst. Die Zahl ist ein Nebenprodukt. Teams schätzen gemeinsam, um unterschiedliche Annahmen über Umfang, Risiko und Vorgehen sichtbar zu machen, bevor die Arbeit beginnt. Genau das passiert in der Diskussion, die die Lücke zwischen einer 3 und einer 13 schließt.",
      paragraphs: [
        "Konsens ist keine Einstimmigkeit durch Ermüdung und auch nicht der Durchschnitt der Stimmen. Ein Team, das bei 8 landet, weil zwei Personen 5 und zwei 13 gesagt haben und die Moderation den Mittelwert genommen hat, hat keinen Konsens erreicht, sondern eine Meinungsverschiedenheit in einer Zahl versteckt. Echter Konsens heißt, dass jede schätzende Person sagen kann: „Mit diesem Wert kann ich leben, und ich verstehe, warum es dieser Wert ist.“",
      ],
    },
    {
      title: "Warum Schätzungen überhaupt auseinandergehen",
      content: "Wenn eine Entwicklerin für denselben Eintrag eine 3 und ein Entwickler eine 13 wählt, liegt das selten daran, dass einer von beiden schlecht schätzt. Abweichende Stimmen haben fast immer eine von wenigen Ursachen.",
      items: [
        "Unterschiedlicher Umfang im Kopf: Die eine Person schätzt nur den Normalfall, die andere bezieht Fehlerbehandlung, Migrationen und Dokumentation mit ein.",
        "Unterschiedliches Wissen: Eine Person kennt den Code und erinnert sich, dass eine ähnliche Änderung einen Nachmittag gedauert hat; eine andere hat das Modul noch nie angefasst.",
        "Versteckte Abhängigkeiten: Jemand weiß, dass der Eintrag ein externes Team, eine Drittanbieter-API oder ein Altsystem ohne Tests erfordert.",
        "Unterschiedliche Definitionen von „fertig“: Für die eine Person zählt „gemergt“, für die andere „ausgeliefert, überwacht und kommuniziert“.",
        "Mehrdeutigkeit im Eintrag selbst: Die Beschreibung lässt Raum für zwei oder drei berechtigte Interpretationen.",
      ],
      paragraphs: [
        "Jede dieser Ursachen solltest du lieber bei der Schätzung entdecken als mitten im Sprint. Deshalb ist eine Streuung der Stimmen ein gutes Ergebnis einer Runde, kein Fehlschlag.",
      ],
    },
    {
      title: "Eine Konsensrunde Schritt für Schritt durchführen",
      content: "Eine Konsensrunde folgt demselben festen Rhythmus wie jede [gut geführte Scrum-Poker-Session](/guide). Wer diesen Rhythmus einhält, kann ein Dutzend Einträge in einer halben Stunde schätzen, ohne die Diskussion abzuwürgen, auf die es ankommt.",
      items: [
        "1. Der Product Owner oder die Person, die den Eintrag verfasst hat, liest ihn samt Akzeptanzkriterien vor.",
        "2. Das Team stellt ein paar Minuten lang Verständnisfragen. Die Moderation notiert jede Antwort, die den Umfang verändert.",
        "3. Alle Schätzenden wählen verdeckt eine Karte. Niemand nennt eine Zahl.",
        "4. Alle Karten werden im selben Moment aufgedeckt.",
        "5. Stimmen die Werte überein oder liegen sie auf benachbarten Karten, übernimmt das Team den vereinbarten Wert – meist den höheren von zwei benachbarten Werten – und macht weiter.",
        "6. Ist die Streuung größer, erklären die Personen mit der höchsten und der niedrigsten Stimme jeweils in höchstens einer Minute ihre Überlegungen. Andere dürfen Fakten ergänzen, aber keine Meinungen zur Zahl.",
        "7. Das Team stimmt erneut ab. Die meisten Lücken schließen sich in der zweiten Runde.",
        "8. Zeigt auch eine dritte Runde noch eine große Streuung, hör auf zu schätzen: Der Eintrag ist entweder nicht verstanden oder zu groß. Teile ihn auf, kläre ihn oder schick ihn zurück ins Refinement.",
      ],
    },
    {
      title: "Beispiel: eine Lücke zwischen 3 und 13 schließen",
      content: "Angenommen, ein fünfköpfiges Team schätzt den Eintrag „Nutzer können ihre Bestellhistorie als CSV exportieren“. Beim ersten Aufdecken zeigen sich 3, 5, 5, 8 und 13. Das Beispiel ist zur Veranschaulichung erfunden.",
      paragraphs: [
        "Die Moderation bittet die Personen mit der 3 und der 13 um ihre Sicht. Der Entwickler mit der 3 sagt, die API liefere die Bestellhistorie bereits als JSON; die Umwandlung in CSV und ein Download-Button seien ein paar Stunden Arbeit. Die Entwicklerin mit der 13 weist darauf hin, dass manche Kunden Zehntausende Bestellungen haben, der Export also asynchron erzeugt und per E-Mail verschickt werden müsste – und dass der bestehende Endpunkt schon bei einigen hundert Zeilen in einen Timeout läuft.",
        "Jetzt weiß das Team zwei Dinge, die es eine Minute zuvor nicht wusste: Der Eintrag verbirgt ein Performance-Problem, und der Product Owner muss entscheiden, ob große Konten zum Umfang gehören. Der Product Owner sagt, die erste Version könne auf die letzten zwölf Monate und höchstens einige tausend Zeilen begrenzt werden; große Exporte kommen in einen eigenen Eintrag.",
        "Die zweite Abstimmung ergibt 5, 5, 5, 8 und 8. Die beiden Personen mit der 8 erklären, ihr verbleibender Zweifel habe den großen Exporten gegolten, die nun nicht mehr zum Umfang gehören – die übliche Tendenz zur höheren Karte greift hier also nicht. Das Team einigt sich für den begrenzten Umfang auf 5 und legt einen neuen Backlog-Eintrag für asynchrone große Exporte an, der separat geschätzt wird. Die Runde dauerte etwa sechs Minuten und beseitigte ein Risiko, das sonst in der zweiten Sprintwoche aufgetaucht wäre.",
      ],
    },
    {
      title: "Techniken, die die Einigung beschleunigen",
      content: "Die folgenden Techniken verkürzen die Diskussion, ohne eine künstliche Einigung zu erzwingen.",
      items: [
        "Frag zuerst die Extreme. Wer die niedrigste und die höchste Stimme vor allen anderen hört, verhindert, dass die Mehrheit die eine Person übertönt, die etwas Wichtiges weiß.",
        "Pflege Referenz-Stories. Zwei oder drei bereits gelieferte Einträge mit vereinbarter Größe geben allen einen gemeinsamen Maßstab: „Ist das größer oder kleiner als die Passwort-Reset-Story, die wir mit 5 bewertet haben?“",
        "Begrenze die Diskussion zeitlich. Drei Minuten Diskussion, dann eine neue Abstimmung, ganz gleich, wo die Diskussion steht. Ist eine dritte Abstimmung nötig, geht der Eintrag zurück ins Refinement.",
        "Erst aufteilen, dann streiten. Entsteht die Lücke aus zwei unterschiedlichen Interpretationen, löst eine Aufteilung des Eintrags in beide Interpretationen die Uneinigkeit meist sofort auf.",
        "Tendiere zum höheren Nachbarwert. Bleiben zwei benachbarte Karten übrig, bildet die höhere die Unsicherheit meist besser ab als die niedrigere.",
      ],
    },
    {
      title: "Ankereffekt und andere Verzerrungen, die ehrliche Schätzungen verhindern",
      content: "Der Ankereffekt ist die Neigung, sich an der ersten gehörten Zahl auszurichten. Sagt ein erfahrener Entwickler „Das fühlt sich nach einer 3 an“, bevor die Karten gezeigt werden, driftet der Rest des Teams in Richtung 3 – ob er zustimmt oder nicht. Das ist der wichtigste Grund, warum Planning Poker die Stimmen verdeckt hält, bis alle gewählt haben: Das Format ist kein Spiel, sondern eine Gegenmaßnahme.",
      paragraphs: [
        "In denselben Meetings zeigen sich verwandte Verzerrungen. Der Autoritätseffekt lässt Menschen der erfahrensten Stimme folgen. Der Optimismus-Bias führt dazu, dass Schätzende vom Normalfall ausgehen. Gruppendruck bringt die eine Person, die in einem Raum voller Dreien eine 13 hält, dazu, bei der neuen Abstimmung stillschweigend eine niedrigere Karte zu wählen. Gegen all das hilft dieselbe Praxis: verdeckte Wahl, gleichzeitiges Aufdecken und die Norm, dass die Ausreißer zuerst sprechen und man ihnen dafür dankt.",
        "Das Werkzeug spielt hier eine Rolle, weil sich das Format leicht aushebeln lässt. Werden Zahlen in einem Videocall laut ausgesprochen oder nacheinander in den Chat getippt, ist der Anker zurück. Scrum Poker Online ist eine kostenlose Option, die die Stimmen bis zum gleichzeitigen Aufdecken verdeckt hält, keine Registrierung erfordert und einen Rundenverlauf mit den Stimmen und der endgültigen Schätzung jedes Eintrags führt, sodass das Team die Ergebnisse später nachvollziehen kann.",
      ],
    },
    {
      title: "Wann du die Diskussion beendest: Faustregeln nach Abstand",
      content: "Nicht jede Uneinigkeit verdient gleich viel Zeit. Eine einfache Regel, die sich am Abstand zwischen den Karten auf der [Fibonacci-Skala beim Planning Poker](/fibonacci-planning-poker) orientiert, hält die Runden kurz.",
      items: [
        "Gleiche oder benachbarte Karten (5 und 8): Nimm den höheren Wert oder den Mehrheitswert und mach weiter; die Diskussion würde mehr kosten als der Unterschied.",
        "Zwei Karten auseinander (3 und 8): eine Erklärungsrunde der höchsten und niedrigsten Stimme, dann neu abstimmen.",
        "Drei oder mehr Karten auseinander (2 und 13): Verschiedene Personen verstehen den Eintrag unterschiedlich. Kläre den Umfang, bevor du erneut abstimmst, und sei bereit, ihn aufzuteilen.",
        "Eine Fragezeichen-Karte: Jemand kann überhaupt nicht schätzen. Mach erst weiter, wenn der Eintrag dieser Person erklärt wurde; lässt er sich nicht schnell erklären, ist er nicht bereit.",
        "Eine Kaffee- oder Pausenkarte: Das Team ist müde. Die Schätzqualität sinkt mit zunehmender Ermüdung deutlich; mach die Pause.",
      ],
    },
    {
      title: "Häufige Konsensfehler und Anti-Patterns",
      content: "Teams, die sich mit dem Schätzen schwertun, erkennen sich meist in einem oder mehreren dieser Muster wieder.",
      items: [
        "Den Durchschnitt der Stimmen bilden. Der Mittelwert von 3 und 13 ist eine Zahl, an die niemand glaubt, und eine Diskussion, die nie stattgefunden hat.",
        "Per Mehrheit entscheiden. Wer die eine Person überstimmt, die von der Abhängigkeit weiß, untergräbt den Sinn des gemeinsamen Schätzens.",
        "Die Leitung entscheiden lassen. Ist das Ergebnis immer die Zahl der Teamleitung, hören alle anderen auf mitzudenken, und die Schätzung wird zum Ein-Personen-Tipp mit Zeremonie drumherum.",
        "Diskutieren, bis alle zustimmen. Endlose Debatten erzeugen Ermüdung, keine Genauigkeit. Setz eine Zeitgrenze und stimm neu ab.",
        "Niedrige Schätzungen belohnen. Werden kleine Zahlen gelobt, bekommst du kleine Zahlen – und der Sprint zahlt den Preis dafür.",
        "Die Zahl später wieder aufmachen. Hat sich das Team geeinigt, bleibt die Schätzung bestehen, solange sich der Umfang nicht ändert. Wer sie nach getaner Arbeit anpasst, um die Velocity zu „korrigieren“, zerstört die Historie.",
      ],
    },
    {
      title: "Wann Konsens ein Warnsignal ist und wann Uneinigkeit in Ordnung ist",
      content: "Schneller einstimmiger Konsens bei jedem Eintrag kann ein Warnsignal sein. Wählen fünf Personen jedes Mal ohne ein Wort der Diskussion dieselbe Karte, orientieren sie sich womöglich an einer dominanten Stimme, nicken ab, um schneller fertig zu werden, oder lesen die Einträge nicht wirklich. Gesunde Teams sind sich manchmal uneinig; das zeigt, dass die Beteiligten unabhängig denken und unterschiedliches Wissen einbringen.",
      paragraphs: [
        "Ebenso muss nicht jede Uneinigkeit aufgelöst werden. Bei kleinen Einträgen ist der Abstand zwischen benachbarten Karten Rauschen. Bei großen, unsicheren Einträgen lautet das ehrliche Ergebnis manchmal „Wir wissen noch nicht genug“, und die richtige Maßnahme ist dann ein Spike oder eine Aufteilung statt einer Zahl, allenfalls eine [grobe T-Shirt-Größe](/t-shirt-sizing). Wer in solchen Fällen Konsens erzwingt, erhält eine präzise wirkende Schätzung, hinter der nichts steht.",
      ],
    },
    {
      title: "Die Rolle der Moderation auf dem Weg zum Konsens",
      content: "Jemand muss den Rhythmus der Runde verantworten, und diese Person sollte in der Regel nicht mitschätzen. Die Moderation – oft der Scrum Master – liest den Eintrag vor oder bittet darum, hält die Verständnisfragen beim Umfang statt bei der Lösung, gibt das Signal zum Aufdecken, bittet die Extreme um ihre Sicht, behält die Uhr im Blick und ruft die neue Abstimmung aus. In einem gemeinsamen Raum vor Ort ist das einfach; in einer Remote-Session entscheidet es darüber, ob die Schätzung zwanzig Minuten oder eine Stunde dauert.",
      paragraphs: [
        "Die Moderation schützt außerdem die leiseren Stimmen und hält den Product Owner in der Rolle dessen, der Fragen beantwortet: Der Product Owner legt die Priorität fest, nicht die Größe.",
      ],
    },
    {
      title: "Checkliste für den Schätzkonsens",
      content: "Geh diese Liste vor und während eurer nächsten Planning-Poker-Session durch.",
      items: [
        "Jeder Eintrag hat eine Beschreibung und Akzeptanzkriterien, bevor er geschätzt wird.",
        "Zwei oder drei Referenz-Stories mit vereinbarter Größe sind für das ganze Team sichtbar.",
        "Die Stimmen sind verdeckt und werden gleichzeitig aufgedeckt; niemand nennt vor dem Aufdecken eine Zahl.",
        "Die Personen mit der höchsten und der niedrigsten Stimme erklären zuerst, andere ergänzen Fakten statt Meinungen.",
        "Die Diskussion pro Eintrag ist zeitlich begrenzt; eine große Streuung nach zwei neuen Abstimmungen schickt den Eintrag zurück ins Refinement.",
        "Abweichungen um eine Karte werden durch den höheren Wert oder die Mehrheit entschieden, nie durch einen Durchschnitt.",
        "Der Product Owner beantwortet Fragen zum Umfang, stimmt aber nicht ab.",
        "Die endgültigen Werte und ein kurzer Grund für jede neue Abstimmung werden festgehalten.",
        "Einstimmige Abstimmungen ohne Diskussion werden von der Moderation gelegentlich hinterfragt.",
      ],
    },
  ],
  faq: [
    {
      q: "Was passiert, wenn sich das Team nicht auf eine Schätzung einigen kann?",
      a: "Nach zwei neuen Abstimmungen mit großer Streuung hör auf abzustimmen. Der Eintrag wird entweder unterschiedlich verstanden oder ist zu unsicher, um ihn zu bemessen. Teile ihn entlang der vorliegenden Interpretationen auf, kläre den Umfang mit dem Product Owner oder plane einen kurzen Spike, um herauszufinden, was fehlt. Eine Zahl zu diesem Zeitpunkt zu erzwingen ergibt eine Schätzung, an die niemand glaubt.",
    },
    {
      q: "Sollte man den Durchschnitt der Planning-Poker-Stimmen nehmen?",
      a: "Nein. Der Durchschnitt verdeckt genau die Uneinigkeit, die die Runde sichtbar machen sollte, und ergibt meist einen Wert, der nicht einmal auf der Skala liegt. Liegen die Stimmen auf benachbarten Karten, nimm den höheren Wert oder den Mehrheitswert. Liegen sie weit auseinander, lass das Team diskutieren und neu abstimmen.",
    },
    {
      q: "Sollten Product Owner oder Scrum Master mit abstimmen?",
      a: "Der Product Owner sollte nicht abstimmen: Seine Aufgabe ist es, Umfang und Priorität zu erklären, und seine Schätzung hätte ein Gewicht, das ihr nicht zusteht. Der Scrum Master moderiert in der Regel, statt abzustimmen – es sei denn, er arbeitet im Team auch selbst an der Entwicklung mit. Dann stimmt er als Entwickler ab, und jemand anderes behält die Uhr im Blick.",
    },
    {
      q: "Wie viele Abstimmungsrunden pro Eintrag sind normal?",
      a: "Eine oder zwei. Bei den meisten Einträgen herrscht entweder schon beim ersten Aufdecken Einigkeit, oder die Werte nähern sich nach einer einzigen Erklärung der höchsten und niedrigsten Stimme an. Eine dritte Runde ist ein Signal, dass der Eintrag geklärt oder aufgeteilt werden muss, statt weiter zu debattieren.",
    },
    {
      q: "Bedeutet Konsens, dass alle dieselbe Karte wählen müssen?",
      a: "Nein. Konsens bedeutet, dass alle Schätzenden den endgültigen Wert akzeptieren können und die Begründung dahinter verstehen. Stimmen auf benachbarten Karten, die durch den höheren Wert aufgelöst werden, sind ein ganz normales Konsensergebnis. Identische Karten von allen bei jedem Eintrag ohne jede Diskussion sind dagegen eher ein Zeichen für den Ankereffekt als für ein gut kalibriertes Team.",
    },
  ],
};

export default de;
