import type { LegalContent } from '@/app/ContentPage';

const de: LegalContent = {
  title: 'Datenschutzerklärung',
  updated: 'Zuletzt aktualisiert: 30. Oktober 2026',
  intro: 'Diese Erklärung legt dar, welche Daten Scrum Poker Online (scrumpokerplay.com, „der Dienst“) verarbeitet, zu welchem Zweck, wie lange und mit wem. Betreiber des Dienstes und für die hier beschriebene Verarbeitung Verantwortlicher ist Mert Gündoğan, eine Privatperson in der Türkei („wir“). Kontakt: contact@scrumpokerplay.com. Da sich der Dienst auch an Personen in der EU bzw. im EWR richtet, gilt für ihn die Datenschutz-Grundverordnung (DSGVO, Art. 3 Abs. 2), außerdem das türkische Datenschutzrecht (KVKK, Abschnitt 8). Der Dienst hat keine Benutzerkonten. Unsere Nutzungsbedingungen finden Sie unter https://www.scrumpokerplay.com/de/terms.',
  sections: [
    {
      title: '1. Welche Daten wir verarbeiten',
      items: [
        'Es gibt keine Konten: Wir fragen weder nach einer E-Mail-Adresse noch nach einem Passwort, und es gibt keinerlei Anmeldung.',
        'In einem Raum: der von Ihnen gewählte Anzeigename (es muss nicht Ihr echter Name sein), ein optionaler Emoji-Avatar, eine zufällige Kennung, die Ihr Browser erzeugt, sowie die Inhalte des Raums – Raumname, Stories, Stimmen und Rundenverlauf, endgültige Schätzungen, Chatnachrichten (die letzten 30 je Raum) und der gemeinsame Timer.',
        'Was andere im Raum sehen: Alle Personen im Raum sehen Ihren Namen, Ihren Avatar, ob Sie abgestimmt haben, ob Sie nur zuschauen oder abwesend sind, Ihre Chatnachrichten und Ihre Stimmen, sobald sie aufgedeckt sind. Der Rundenverlauf (die Story jeder Runde und, sofern der Raum nicht anonym ist, wer wie abgestimmt hat) und die letzten 30 Chatnachrichten werden auch Personen angezeigt, die später beitreten, solange der Raum besteht; zudem kann jede Person im Raum den Rundenverlauf einschließlich Namen und Stimmen als CSV oder Markdown herunterladen oder kopieren – auf solche Kopien haben wir keinen Einfluss. In einem anonymen Raum werden die aufgedeckten Karten ohne Namen angezeigt und gespeichert. Emoji-Reaktionen und Anstupser (ein Anstupser zeigt der angestupsten Person Ihren Namen) werden live angezeigt und niemals gespeichert. Der Raum speichert außerdem die zufälligen Kennungen des Hosts, der vom Host entfernten Personen und der Eigentümer eines behaltenen Raums.',
        'Behaltene Räume: Wenn der Host einen Raum behält, speichern wir dessen Code, Namen, Deck (einschließlich eigener Karten) und Einstellungen (automatisches Aufdecken, anonyme Abstimmung, Runde nur durch den Host, Reaktionen an oder aus sowie das vom Host eingegebene Adressmuster für Issue-Links), seine Story-Warteschlange, die Ergebnisse seiner letzten bis zu 50 Runden (jeweils nur Text der Story, vereinbarte Schätzung und Ende der Runde – keine Namen, keine einzelnen Stimmen), einen SHA-256-Hash seines Eigentümerschlüssels (niemals den Schlüssel selbst) und den Zeitpunkt, zu dem er behalten wurde. Darin sind normalerweise keine personenbezogenen Daten enthalten, es sei denn, jemand gibt sie in den Raumnamen oder die Stories ein; wir ordnen einen behaltenen Raum keiner Person zu.',
        'IP-Adresse: Wir verwenden Ihre IP-Adresse, um Missbrauch einzudämmen (Begrenzung der Anfragerate sowie der Zahl der Räume und Verbindungen, die eine Adresse gleichzeitig offen haben kann). Diese Einträge werden nur im Arbeitsspeicher des Servers gehalten und niemals in die Datenbank oder deren Sicherungen geschrieben. Ihre IP-Adresse erscheint außerdem im Zugriffsprotokoll des Reverse Proxy (siehe Protokolle).',
        'Protokolle: Die Protokolle der Anwendung erfassen Ereignisse (das Erstellen eines Raums, den Beitritt oder das Entfernen einer Person) zusammen mit dem Raumcode und der zufälligen Kennung, nicht aber IP-Adressen oder Rauminhalte. Der der Anwendung vorgeschaltete Reverse Proxy (Caddy, den unser Deployment-Werkzeug auf demselben Server betreibt) protokolliert jede Anfrage: Zeitpunkt, Host, Methode, Pfad ohne Query-String, Statuscode, Dauer, Größe und Ihre IP-Adresse.',
        'Besuchsstatistiken: Das Skript von Cloudflare Web Analytics (static.cloudflareinsights.com) übermittelt die Seitenadresse, die verweisende Seite, Ihren Browsertyp und die Ladezeiten der Seite an Cloudflare, das mit dieser Anfrage Ihre IP-Adresse erhält. Es setzt kein Cookie und speichert nichts auf Ihrem Gerät; wir sehen nur zusammengefasste Zahlen (Seiten, Länder, Browser), und es wird kein Profil von Ihnen erstellt.',
        'E-Mail: Wenn Sie an contact@scrumpokerplay.com schreiben, leitet Cloudflare Email Routing Ihre Nachricht an unser Postfach bei Microsoft Outlook (Microsoft Corporation, USA) weiter; dieses Postfach stellt Microsoft nach eigenen Bedingungen als eigener Verantwortlicher bereit, nicht in unserem Auftrag. Wir verarbeiten Ihre E-Mail-Adresse und Ihre Nachricht ausschließlich, um Ihnen zu antworten.',
      ],
    },
    {
      title: '2. Auf Ihrem Gerät',
      items: [
        'Cookies: Wir selbst setzen nur eine Art von Cookie – ein signiertes Raum-Cookie für jeden Raum, dem Sie beitreten. Es wird nur an die API dieses Raums gesendet und enthält Ihre zufällige Kennung, den Raumcode und einen Ablaufzeitpunkt; es ist 2 Stunden gültig und wird erneuert, solange Sie den Raum nutzen. Zusätzlich kann der Bot-Schutz von Cloudflare in Ihrem Browser eine kurze automatische Prüfung durchführen und für scrumpokerplay.com Sicherheits-Cookies setzen, etwa cf_clearance (bis zu einem Jahr gültig), die ausschließlich dazu dienen, Browser von automatisiertem Datenverkehr zu unterscheiden. Cloudflare kann Ihren Browser außerdem bitten, Netzwerkfehler an Cloudflare zu melden (Network Error Logging); Ihr Browser speichert diese Anweisung bis zu 7 Tage. Weitere Cookies setzen wir nicht.',
        'Diese Cookies und die unten beschriebene Speicherung im Browser sind unbedingt erforderlich, um den von Ihnen gewünschten Dienst bereitzustellen, ihn sicher zu halten oder von Ihnen gewählte Einstellungen zu speichern, und bedürfen daher keiner Einwilligung (Art. 5 Abs. 3 der ePrivacy-Richtlinie; in Deutschland § 25 Abs. 2 Nr. 2 TDDDG). Deshalb gibt es kein Cookie-Banner.',
        'Lokaler Speicher Ihres Browsers: Ihre Sprache, sofern Sie eine gewählt haben; Ihre Design- und Toneinstellungen; Ihr Anzeigename, Ihr Avatar und Ihre zufällige Kennung; bis zu 5 zuletzt geöffnete Räume (Code, Name und Zeitpunkt des Öffnens); die Eigentümerschlüssel, Codes und Namen von bis zu 50 Räumen, die in diesem Browser behalten werden; ob Sie den Raum-Hinweis ausgeblendet haben; sowie je Raum eine kurze Liste Ihrer offenen Tabs, damit Sie beim Schließen eines Tabs nicht den Raum verlassen.',
        'Sitzungsspeicher: die Sprache der zuletzt gelesenen Seite, damit ein von dort geöffneter Raum in dieser Sprache startet; ein Vermerk, dass dieser Tab bereits einmal zur Sprache Ihres Browsers weitergeleitet wurde; und, nur für einen Moment, während ein Eigentümer-Link geöffnet wird, dessen Eigentümerschlüssel.',
        'Offline-Nutzung: Der Service Worker speichert Seiten (niemals Raumseiten) und statische Dateien in Ihrem Browser, damit die Website auch offline funktioniert.',
        'Der lokale Speicher und die Dateien des Service Workers bleiben auf Ihrem Gerät, bis Sie die Daten der Website in Ihrem Browser löschen; der Sitzungsspeicher wird gelöscht, wenn Sie den Tab schließen, und die Tab-Liste eines Raums, wenn dessen letzter Tab geschlossen wird. Ihr Name, Ihr Avatar und Ihre Kennung werden nur dann an uns übermittelt, wenn Sie einen Raum erstellen oder ihm beitreten (die Kennung zudem im Raum-Cookie bei jeder Aktion in diesem Raum), und ein Eigentümerschlüssel nur, um nachzuweisen, dass Ihnen ein behaltener Raum gehört.',
      ],
    },
    {
      title: '3. Zwecke und Rechtsgrundlagen der Verarbeitung',
      items: [
        'Bereitstellung des von Ihnen gewünschten Dienstes – Räume und behaltene Räume: Vertragserfüllung (Art. 6 Abs. 1 lit. b DSGVO).',
        'Erforderliche Angaben: Um an einem Raum teilzunehmen, benötigen Sie einen Anzeigenamen (einen beliebigen Namen; es muss nicht Ihr echter Name sein), und Ihr Browser benötigt die zufällige Kennung und das Raum-Cookie. Ohne sie kann der Raum nicht funktionieren. Darüber hinaus ist nichts erforderlich.',
        'Sicherheit und Verfügbarkeit des Dienstes – Begrenzung der Anfragerate, Schutz vor Missbrauch und Bots, Protokolle und Sicherungen: unser berechtigtes Interesse an einem Dienst, der funktioniert und nicht missbraucht wird (Art. 6 Abs. 1 lit. f DSGVO).',
        'Besuchsstatistiken, um zu verstehen, welche Seiten genutzt werden: unser berechtigtes Interesse (Art. 6 Abs. 1 lit. f DSGVO); es wird kein Profil von Ihnen erstellt.',
        'Beantwortung Ihrer E-Mails: unser berechtigtes Interesse (Art. 6 Abs. 1 lit. f DSGVO).',
        'Wir treffen keine ausschließlich auf einer automatisierten Verarbeitung beruhenden Entscheidungen, die Ihnen gegenüber rechtliche Wirkung entfalten oder Sie in ähnlicher Weise erheblich beeinträchtigen (Art. 22 DSGVO); automatische Ratenbegrenzungen verzögern oder verweigern lediglich übermäßige Anfragen.',
      ],
    },
    {
      title: '4. Speicherdauer',
      items: [
        'Rauminhalte (Namen, Avatare, Kennungen, Stories, Stimmen und Rundenverlauf, endgültige Schätzungen, Chat, Timer sowie die Kennungen entfernter Personen und der Eigentümer): werden etwa eine Stunde, nachdem der Raum leer geworden ist, gelöscht, oder nach etwa zehn Minuten, wenn darin nie etwas getan wurde. Das Änderungsprotokoll der Datenbank auf dem Datenträger kann sie noch enthalten, bis es das nächste Mal verdichtet wird, spätestens vor der nächsten täglichen Sicherung. Von jedem Raum werden zu jedem Zeitpunkt nur die letzten 30 Chatnachrichten gespeichert.',
        'Behaltene Räume: bis ihr Eigentümer sie nicht mehr behält oder automatisch 180 Tage, nachdem ihr Eigentümer zuletzt mit dem Eigentümer-Link zurückgekehrt ist – bzw. 30 Tage, nachdem der Raum behalten wurde, wenn der Eigentümer danach nie mit dem Link zurückkehrt; öffnen andere Personen den Raum, verlängert sich diese Frist nicht. Ein behaltener Raum kann auch früher entfernt werden, zum Beispiel, wenn der Arbeitsspeicher des Servers erschöpft ist.',
        'IP-Adressen zur Begrenzung der Anfragerate: nur im Arbeitsspeicher des Servers; sie werden entfernt, sobald ihr Zeitfenster abgelaufen ist (normalerweise innerhalb von etwa einer Stunde nach der letzten Anfrage), und bei jedem Neustart der Anwendung. Welche Adresse einen noch bestehenden Raum geöffnet hat: im Arbeitsspeicher, bis dieser Raum gelöscht wird. Die Zahl offener Verbindungen je Adresse: nur so lange, wie die Verbindungen offen sind.',
        'Protokolle: Die Protokolle der Anwendung werden nach Größe rotiert – es werden höchstens fünf Dateien zu je 10 MB aufbewahrt, und die älteste wird überschrieben; wird die Anwendung neu bereitgestellt, wird eine Kopie der letzten Zeilen der ersetzten Instanz (bis zu 2.000 Zeilen) 14 Tage lang aufbewahrt. Das Zugriffsprotokoll des Reverse Proxy wird in Dateien von insgesamt höchstens 3 × 10 MB gespeichert, wobei die älteste überschrieben wird; zusammengefasste Zählungen je Minute ohne IP-Adressen werden 7 Tage lang aufbewahrt.',
        'E-Mails: so lange, wie wir sie brauchen, um Ihnen zu antworten und Ihr Anliegen abzuschließen, normalerweise nicht länger als 12 Monate nach dem Ende unserer Korrespondenz, es sei denn, wir benötigen sie zur Geltendmachung, Ausübung oder Verteidigung von Rechtsansprüchen.',
        'Sicherungen: Die Datenbank wird einmal täglich gesichert, und jede Sicherung wird 7 Tage lang auf demselben Server aufbewahrt. Vor jeder Sicherung wird das Änderungsprotokoll der Datenbank verdichtet, sodass eine Sicherung den Stand der Datenbank zu diesem Zeitpunkt enthält. Rauminhalte, Chat und behaltene Räume, die zum Zeitpunkt der Sicherung vorhanden sind, können daher noch bis zu 7 weitere Tage in einer Sicherung verbleiben. Sicherungen werden ausschließlich verwendet, um den Dienst nach einem Ausfall wiederherzustellen.',
      ],
    },
    {
      title: '5. Speicherort und beteiligte Anbieter',
      items: [
        'Alles, was der Dienst speichert – eine einzige Redis-Datenbank, deren Sicherungen und die Protokolle –, liegt auf unserem Server bei Hetzner in dessen Rechenzentrum in Helsinki (Finnland). E-Mails an uns liegen in unserem Postfach bei Microsoft Outlook.',
        'Hetzner Online GmbH (Deutschland): unser Server mit der Datenbank, deren Sicherungen und den Protokollen, in ihrem Rechenzentrum in Helsinki (Finnland).',
        'Cloudflare, Inc. (USA): Der gesamte Datenverkehr läuft über das Netzwerk von Cloudflare – normalerweise über das Ihnen nächstgelegene Rechenzentrum, das auch außerhalb der EU liegen kann – für DNS, Verschlüsselung (TLS), Schutz vor Bots und Angriffen, E-Mail-Weiterleitung und Web Analytics. Da Cloudflare die verschlüsselte Verbindung terminiert, verarbeitet Cloudflare in unserem Auftrag den gesamten Datenverkehr, einschließlich IP-Adressen und Rauminhalten während der Übertragung; Rauminhalte speichert Cloudflare nicht.',
        'Microsoft Corporation (USA): stellt nach eigenen Bedingungen unser Postfach bei Microsoft Outlook bereit, in dem die an contact@scrumpokerplay.com gesendeten Nachrichten eingehen; für dieses Postfach ist Microsoft eigener Verantwortlicher und kein Auftragsverarbeiter, der in unserem Auftrag handelt.',
        'Übermittlungen außerhalb der EU: Cloudflare und Microsoft sind nach dem EU-U.S. Data Privacy Framework (EU-US-Datenschutzrahmen) zertifiziert (https://www.dataprivacyframework.gov); der Auftragsverarbeitungsvertrag von Cloudflare (Data Processing Addendum) mit den EU-Standardvertragsklauseln ist unter https://www.cloudflare.com/cloudflare-customer-dpa/ abrufbar. Wir betreiben den Dienst von der Türkei aus, für die kein Angemessenheitsbeschluss der EU besteht; wenn wir den Server verwalten, greifen wir von dort auf die Daten zu. Hetzner und Cloudflare verarbeiten die Daten ausschließlich in unserem Auftrag, um ihre Leistungen für uns zu erbringen.',
      ],
    },
    {
      title: '6. Ihre Rechte',
      items: [
        'Sie können Auskunft über Ihre personenbezogenen Daten sowie deren Berichtigung, Export oder Löschung und die Einschränkung ihrer Verarbeitung verlangen und erfahren, an wen die Daten weitergegeben wurden (Art. 15–20 DSGVO). Schreiben Sie an contact@scrumpokerplay.com – wir antworten innerhalb eines Monats (Art. 12 Abs. 3 DSGVO; bei komplexen Anfragen um bis zu zwei weitere Monate verlängerbar, worüber wir Sie informieren). Da es keine Konten gibt und Raumdaten etwa eine Stunde, nachdem ein Raum leer geworden ist, gelöscht sind, haben wir in der Regel nichts, was wir Ihnen zuordnen können; nennen Sie uns bitte den Raumcode, ungefähr den Zeitpunkt der Nutzung und Ihren Anzeigenamen.',
        'Sie haben außerdem das Recht, sich bei einer Datenschutzaufsichtsbehörde zu beschweren, insbesondere in dem EU- bzw. EWR-Staat, in dem Sie leben oder arbeiten.',
      ],
    },
    {
      title: '7. Ihr Widerspruchsrecht',
      content: 'Sie können jederzeit aus Gründen, die sich aus Ihrer besonderen Situation ergeben, der Verarbeitung widersprechen, die auf unseren berechtigten Interessen beruht (Sicherheit, Begrenzung der Anfragerate und Bot-Schutz, Protokolle und Sicherungen, Besuchsstatistiken, Beantwortung von E-Mails) (Art. 21 DSGVO). Schreiben Sie dazu an contact@scrumpokerplay.com; wir stellen diese Verarbeitung dann ein, es sei denn, wir haben zwingende schutzwürdige Gründe dafür, die Ihre Interessen, Rechte und Freiheiten überwiegen, oder die Verarbeitung ist zur Geltendmachung, Ausübung oder Verteidigung von Rechtsansprüchen erforderlich.',
    },
    {
      title: '8. Türkisches Recht (KVKK)',
      items: [
        'Da wir in der Türkei ansässig sind, gilt auch das Gesetz Nr. 6698 zum Schutz personenbezogener Daten (KVKK). Als Verantwortlicher informieren wir Sie mit dieser Erklärung, wie es Art. 10 KVKK verlangt.',
        'Wir erheben die hier beschriebenen Daten elektronisch über die Website, zu den Zwecken in Abschnitt 3 (Art. 5 Abs. 2 lit. c KVKK: für einen Vertrag erforderlich, und lit. f: unsere berechtigten Interessen). Sie werden, wie in Abschnitt 5 beschrieben, ins Ausland an Hetzner (Deutschland; Server in Finnland), Cloudflare und Microsoft (USA) übermittelt.',
        'Ihnen stehen die Rechte aus Art. 11 KVKK zu: zu erfahren, ob Ihre Daten verarbeitet werden, Auskunft darüber zu verlangen, den Zweck der Verarbeitung zu erfahren und ob die Daten diesem Zweck entsprechend verwendet werden, die Empfänger im In- oder Ausland zu kennen, Berichtigung oder Löschung zu verlangen und dass die Empfänger darüber informiert werden, einem Ergebnis zu Ihrem Nachteil zu widersprechen, das ausschließlich durch automatisierte Analyse zustande kommt, und Ersatz des Schadens zu verlangen, der durch rechtswidrige Verarbeitung entstanden ist. Schreiben Sie an contact@scrumpokerplay.com; wir antworten spätestens innerhalb von 30 Tagen (Art. 13 KVKK).',
        'Lehnen wir Ihren Antrag ab, antworten wir nicht rechtzeitig oder halten Sie unsere Antwort für unzureichend, können Sie sich außerdem beim Ausschuss für den Schutz personenbezogener Daten (Kişisel Verileri Koruma Kurulu) beschweren (Art. 14 KVKK).',
      ],
    },
    {
      title: '9. Sicherheit',
      content: 'Wir treffen angemessene technische Maßnahmen zum Schutz der Daten. Zum Beispiel sind Verbindungen verschlüsselt (TLS), die Eigentümerschlüssel behaltener Räume werden nur als Hashes gespeichert, Raum-Cookies sind signiert und HttpOnly (für Skripte nicht lesbar), und die Datenbank ist aus dem Internet nicht erreichbar. Kein System ist vollkommen sicher, und wir können keine Sicherheit garantieren. Kommt es zu einer Datenschutzverletzung, handeln wir, wie es das Gesetz vorschreibt.',
    },
    {
      title: '10. Kinder',
      content: 'Der Dienst richtet sich nicht an Kinder unter 16 Jahren, und wir erheben nicht wissentlich Daten von ihnen. Wenn Sie annehmen, dass wir Daten eines Kindes gespeichert haben, kontaktieren Sie uns, damit wir sie löschen können.',
    },
    {
      title: '11. Änderungen',
      content: 'Wir können diese Erklärung ändern. Die aktuelle Fassung steht mit Datum stets auf dieser Seite. Da es keine Konten gibt, benachrichtigen wir niemanden einzeln. Fragen: contact@scrumpokerplay.com.',
    },
  ],
};

export default de;
