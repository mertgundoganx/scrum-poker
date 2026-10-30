import type { LandingContent } from '@/app/landingTypes';

const de: LandingContent = {
  breadcrumb: 'Planning-Poker-Karten',
  title: 'Planning-Poker-Karten: Werte, Decks, gedruckt oder online',
  subtitle: 'Was auf den Karten steht, welche Standard-Decks Teams nutzen, was die Sonderkarten bedeuten und wie sich physische Karten von einem Online-Deck unterscheiden.',
  sections: [
    {
      blocks: [
        { p: '**Planning-Poker-Karten** sind das ganze Werkzeug: ein kleines Deck mit Werten, das alle Schätzenden in der Hand halten, aus dem sie verdeckt wählen und das sie im selben Moment wie alle anderen aufdecken. Die Werte sind so gewählt, dass ein Team relativen Aufwand ausdrücken kann, ohne eine Genauigkeit vorzutäuschen, die es nicht hat. Diese Seite erklärt, was auf den Karten steht, welche Standard-Decks es gibt, was die Sonderkarten bedeuten, wie sich physische und Online-Karten unterscheiden und wie du ein Deck für dein Team auswählst.' },
      ],
    },
    {
      title: 'Was auf einer Planning-Poker-Karte steht',
      blocks: [
        { p: 'Jede Karte trägt einen einzigen Wert. In einem numerischen Deck ist das eine Zahl in Story Points, in einem T-Shirt-Deck eine Größenbezeichnung. Bei einem physischen Deck bekommt jede Person einen vollständigen Kartensatz, damit alle unabhängig abstimmen können; ein Team aus acht Personen braucht also acht Sätze. In einem Online-Raum wird das Deck auf dem Bildschirm angezeigt, alle tippen eine Karte an, und der Raum übernimmt das Verdecken und Aufdecken.' },
        { p: 'Was eine Karte nicht trägt, ist eine Einheit. Eine 5 sind nicht fünf Stunden oder fünf Tage, sondern das Fünffache einer 1, wobei die 1 die kleinste Referenz-Story ist, auf die sich das Team geeinigt hat. Genau darum geht es bei der relativen Schätzung, und deshalb funktioniert dasselbe Deck für Teams mit ganz unterschiedlicher Velocity. Wenn dir diese Unterscheidung neu ist, findest du unter [Was ist Planning Poker?](/blog/what-is-planning-poker) und [Story Points vs. Stunden](/blog/story-points-vs-hours) alle Details.' },
      ],
    },
    {
      title: 'Standard-Decks für Planning Poker',
      blocks: [
        { p: 'Eine Handvoll Decks deckt fast jedes Team ab. Scrum Poker Online bringt die Decks Scrum, Fibonacci, T-Shirt und Zweierpotenzen mit und lässt dich dein eigenes Deck erstellen.' },
        {
          decks: [
            {
              title: 'Scrum (modifiziertes Fibonacci)',
              cards: '0, ½, 1, 2, 3, 5, 8, 13, 20, 40, 100, ?, ☕',
              desc: 'Fibonacci bis 13, danach gerundete Werte, die betonen, dass große Schätzungen Größenklassen sind und keine Messungen, dazu eine Karte für einen halben Punkt für triviale Arbeit. Diese Werte stehen auf den meisten gedruckten Kartensätzen.',
            },
            {
              title: 'Fibonacci',
              cards: '0, 1, 2, 3, 5, 8, 13, 21, 34, 55, ?, ☕',
              desc: 'Die klassische Folge. Die Abstände wachsen mit den Zahlen, sodass große Stories grob und kleine fein geschätzt werden. Lies den vollständigen [Leitfaden zu Fibonacci-Planning-Poker](/fibonacci-planning-poker).',
            },
            {
              title: 'T-Shirt-Größen',
              cards: 'Z, T, XXS, XS, S, M, L, XL, XXL, XXXL, ?, ☕',
              desc: 'Relative Bezeichnungen statt Zahlen. Der klassische Satz reicht von XS bis XXL; unser Deck ergänzt an den Rändern Z (Zero, null), T (Tiny, winzig), XXS und XXXL. Ideal für Roadmaps, Epics und Teams außerhalb der Entwicklung. Siehe den [Leitfaden zu T-Shirt-Größen](/t-shirt-sizing).',
            },
            {
              title: 'Zweierpotenzen',
              cards: '0, 1, 2, 4, 8, 16, 32, 64, 128, ?, ☕',
              desc: 'Jede Karte verdoppelt die vorherige. Die Abstände sind größer als bei Fibonacci, was Teams dazu bringt, Stories früher aufzuteilen, und gut zu Arbeit mit hoher Unsicherheit passt.',
            },
            {
              title: 'Eigenes',
              cards: '2 bis 20 Karten, je bis zu 4 Zeichen',
              desc: 'Nutze es für eine Skala von 1 bis 5, einen Satz aus drei Karten wie klein / mittel / groß, ein stundenbasiertes Deck, falls deine Organisation darauf besteht, oder alles andere, was dein Prozess braucht.',
            },
          ],
        },
      ],
    },
    {
      title: 'Was die Sonderkarten bedeuten',
      blocks: [
        { p: 'Jedes fertige Deck in Scrum Poker Online enthält zwei nicht numerische Karten (ein eigenes Deck enthält nur die Karten, die du hinzufügst), und viele physische Decks haben noch eine dritte.' },
        {
          ul: [
            '**?** bedeutet „Ich kann das nicht schätzen.“ Es fehlen Informationen, oder die Story ist unklar. Spielen mehrere Personen diese Karte, unterbrecht die Abstimmung und klärt den Umfang. Das ist die wertvollste Karte im Deck: Sie macht aus stiller Verwirrung ein sichtbares Signal.',
            '**☕** bedeutet „Ich brauche eine Pause.“ Die Qualität der Schätzungen sinkt deutlich, wenn die Leute müde sind. Eine Kaffeekarte ist eine höfliche Art zu sagen, dass die Session lange genug gedauert hat.',
            '**∞ oder „zu groß“** steht auf vielen gedruckten Decks und bedeutet, dass die Story über das obere Ende der Skala hinausgeht und aufgeteilt werden muss. Online sendest du dieselbe Botschaft, indem du die höchste Karte oder ? spielst und sagst, warum.',
          ],
        },
        { p: 'Manche Decks, etwa das Scrum-Deck, enthalten außerdem eine 0 und eine ½. Null bedeutet „keine Arbeit“ oder „bereits erledigt“; die halbe Karte ist für Aufgaben gedacht, die so klein sind, dass selbst eine 1 übertrieben wäre. Ob ihr sie nutzt, ist eine Konvention im Team.' },
      ],
    },
    {
      title: 'Physische Karten vs. Online-Karten',
      blocks: [
        { p: 'Gedruckte Decks waren das Original und funktionieren für Teams, die in einem Raum sitzen, nach wie vor gut. Beim Vergleich geht es vor allem um Logistik.' },
        {
          compare: [
            {
              title: 'Physische Karten',
              items: [
                'Alle brauchen ein Deck, und Decks gehen verloren. Ein Team aus zehn Personen braucht zehn vollständige Sätze auf dem Tisch.',
                'Die Disziplin beim Aufdecken ist Handarbeit. Jemand zählt herunter, und ab und zu linst jemand vorher.',
                'Nichts wird festgehalten. Die Ergebnisse werden auf ein Whiteboard geschrieben oder hinterher in einen Tracker getippt.',
                'Keine Teilnahme aus der Ferne. In einem hybriden Team stimmt am Ende eine Person per Chatnachricht ab.',
              ],
            },
            {
              title: 'Online-Karten',
              items: [
                'Verdeckt bis zum Aufdecken. Die Stimmen sind für alle unsichtbar, auch für die Moderation, bis die Runde aufgedeckt wird.',
                'Funktioniert für Remote- und Hybrid-Teams. Teile einen Link oder lass einen QR-Code scannen, und das ganze Team ist im selben Raum.',
                'Automatische Auswertung: Stimmenverteilung, Minimum, Median, Durchschnitt und Maximum, Konsenserkennung und eine vorgeschlagene Schätzung, sobald die Karten umgedreht werden.',
                'Verlauf. Jede abgeschlossene Runde wird mit ihrer endgültigen Schätzung gespeichert, und der Verlauf lässt sich als CSV herunterladen oder als Markdown kopieren, direkt für dein Backlog-Tool.',
                'Extras, die Papier nicht kann: eine Story-Warteschlange, die eine CSV-Datei oder einen Jira-Export importiert, ein gemeinsamer Timer, Zuschauermodus, Team-Chat und Anstupsen für alle, die noch nicht abgestimmt haben.',
              ],
            },
          ],
        },
        { p: 'Wenn du Karten zum Ausdrucken möchtest, brauchst du nur die Werte oben: Druck jeden Wert auf ein Stück Papier in Kartengröße, ein Satz pro Person. Für alles, was über eine gelegentliche Session vor Ort hinausgeht, nimmt dir ein Online-Deck die Fleißarbeit ab und hält den Fokus auf der Diskussion, und genau dort liegt der Wert der Technik. Unser [Scrum-Poker-Leitfaden](/guide) führt Schritt für Schritt durch eine komplette Online-Session.' },
      ],
    },
    {
      title: 'So wählst du ein Deck aus',
      blocks: [
        { p: 'Stell dir drei Fragen:' },
        {
          ol: [
            '**Was schätzt ihr?** Sprint-Stories: Scrum oder Fibonacci. Epics, Roadmap-Einträge oder alles, was mehr als einen Sprint entfernt ist: T-Shirt-Größen. Arbeit mit hoher Unsicherheit, bei der ihr früh aufteilen wollt: Zweierpotenzen.',
            '**Wer stimmt ab?** Entwickler, die Story Points gewohnt sind, kommen mit Zahlen gut zurecht. Gemischte oder nicht technische Gruppen bevorzugen meist Größen.',
            '**Was erwartet euer Tracker?** Wird die Velocity in Punkten erfasst, nehmt ein numerisches Deck oder vereinbart vor der Session eine Zuordnung von Größen zu Punkten.',
          ],
        },
        { p: 'Was auch immer du wählst, wechsle es selten. Der Wert einer Schätzskala entsteht aus dem Gefühl, das das Team mit der Zeit für sie entwickelt, und jeder Wechsel setzt das zurück. Wenn du in Scrum Poker Online einen Raum erstellst, wählst du sein Deck; der Host kann es zwischen den Runden ändern, auf dem Bildschirm aller Teilnehmer erscheint immer dasselbe Deck, und ein Host, der den Raum über seinen privaten Eigentümer-Link behält, findet beim nächsten Mal dasselbe Deck und dieselben Einstellungen vor. Wenn dein Team nach dem Aufdecken regelmäßig uneins ist, liegt das Problem selten am Deck; unter [Konsens beim Schätzen erreichen](/blog/estimation-consensus) erfährst du, was meistens hilft.' },
      ],
    },
  ],
  faqTitle: 'Häufig gestellte Fragen',
  faq: [
    {
      q: 'Wie viele Karten hat ein Planning-Poker-Deck?',
      a: 'Meist elf bis dreizehn. Ein Fibonacci-Deck hat zwölf: zehn Zahlenwerte plus ? und ☕. Das Scrum-Deck hat dreizehn, das T-Shirt-Deck zwölf und das Zweierpotenzen-Deck elf. Eigene Decks in Scrum Poker Online können bis zu 20 Karten enthalten.',
    },
    {
      q: 'Kann ich meine eigenen Planning-Poker-Karten drucken?',
      a: 'Ja. Jeder der Wertesätze auf dieser Seite funktioniert; druck einen vollständigen Satz pro Person auf Papier in Kartengröße. Für Remote- oder Hybrid-Teams ist ein Online-Raum schneller eingerichtet und speichert den Rundenverlauf für dich.',
    },
    {
      q: 'Was bedeutet die Kaffeekarte?',
      a: 'Sie bedeutet „Ich brauche eine Pause“. Damit lässt sich Müdigkeit unkompliziert signalisieren, ohne die Person zu unterbrechen, die gerade spricht, und mehrere davon hintereinander sind ein guter Anlass, die Session zu pausieren.',
    },
    {
      q: 'Mit welchem Deck sollte ein neues Scrum-Team anfangen?',
      a: 'Mit Scrum oder Fibonacci. Beide sind gut dokumentiert, lassen sich direkt auf Story Points abbilden, und die meisten Tutorials setzen eines von beiden voraus. Wechsle nur dann zu T-Shirt-Größen, wenn Zahlen mehr Diskussionen auslösen, als sie klären.',
    },
  ],
  ctaText: 'Spar dir das Drucken. Wähle ein Deck, teile einen Link, und dein Team schätzt in Sekunden. Kostenlos, ohne Registrierung.',
  ctaLabel: 'Kostenlosen Raum erstellen',
  relatedTitle: 'Weiterlesen',
  related: [
    { href: '/fibonacci-planning-poker', label: 'Fibonacci-Planning-Poker' },
    { href: '/t-shirt-sizing', label: 'T-Shirt-Größen in der agilen Schätzung' },
    { href: '/guide', label: 'Eine Scrum-Poker-Session Schritt für Schritt leiten' },
    { href: '/blog/fibonacci-vs-tshirt', label: 'Fibonacci vs. T-Shirt-Größen' },
    { href: '/blog/what-is-planning-poker', label: 'Was ist Planning Poker?' },
    { href: '/blog', label: 'Alle Artikel im Blog' },
  ],
};

export default de;
