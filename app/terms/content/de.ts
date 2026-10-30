import type { LegalContent } from '@/app/ContentPage';

const de: LegalContent = {
  title: 'Nutzungsbedingungen',
  updated: 'Zuletzt aktualisiert: 30. Oktober 2026',
  intro: 'Diese Bedingungen gelten für Ihre Nutzung von Scrum Poker Online unter scrumpokerplay.com („der Dienst“). Der Dienst wird von Mert Gündoğan betrieben, einer Privatperson in der Türkei („wir“). Kontakt: contact@scrumpokerplay.com. Indem Sie den Dienst nutzen, akzeptieren Sie diese Bedingungen. Wenn Sie sie nicht akzeptieren, nutzen Sie den Dienst nicht. Wie wir mit personenbezogenen Daten umgehen, steht in der Datenschutzerklärung: https://www.scrumpokerplay.com/de/privacy.',
  sections: [
    {
      title: '1. Der Dienst',
      content: 'Scrum Poker Online ist ein Online-Tool für Planning Poker, mit dem Sie gemeinsam mit Ihrem Team Aufwände schätzen. Es gibt keine Konten. Der Dienst ist derzeit kostenlos: Es gibt keine kostenpflichtigen Tarife, keine Abonnements und keine Zahlungen. Kostenpflichtige Funktionen, falls wir welche einführen, können eigenen Bedingungen unterliegen.',
    },
    {
      title: '2. Wer den Dienst nutzen darf',
      content: 'Sie müssen mindestens 16 Jahre alt sein, um den Dienst zu nutzen.',
    },
    {
      title: '3. Räume',
      items: [
        'Wer den Code oder Link eines Raums hat, kann diesem Raum beitreten, sofern der Host ihn nicht für neue Personen geschlossen hat. Er sieht dann die Teilnehmer, Stories, aufgedeckten Stimmen und den Chat und kann mitmachen. Ein Raumcode ist kein Passwort: Teilen Sie ihn nur mit den Personen, die Sie im Raum haben möchten.',
        'Standardmäßig kann jeder Teilnehmer die Stimmen aufdecken, eine neue Runde starten, die Story-Warteschlange verwalten und den Timer verwenden. Der Host kann zusätzlich das Deck und die Raumeinstellungen ändern (automatisches Aufdecken, anonyme Abstimmung, Runde nur durch den Host, Schließen des Raums für neue Personen, Emoji-Reaktionen, eine Adresse für Issue-Links), Teilnehmer entfernen und die Host-Rolle an eine andere Person übergeben. Wer entfernt wurde, kann diesem Raum, solange er besteht, vom selben Browser aus nicht erneut beitreten. Ausgenommen ist der Eigentümer eines behaltenen Raums, den sein Eigentümer-Link wieder hineinlässt.',
        'Erster Host ist die Person, die den Raum erstellt. Verlässt der Host den Raum, geht die Rolle auf einen anderen Teilnehmer über. Ein Eigentümer, der einen behaltenen Raum mit dessen Eigentümer-Link öffnet, übernimmt die Host-Rolle von einem Host, der den Eigentümerschlüssel nicht hat.',
        'Räume sind temporär. Ein Raum und seine Inhalte werden normalerweise etwa eine Stunde, nachdem er leer geworden ist, gelöscht (nach etwa zehn Minuten, wenn darin nie etwas getan wurde). Von einem behaltenen Raum (Abschnitt 4) bleiben nur seine Einrichtung, seine Story-Warteschlange und seine letzten Ergebnisse erhalten.',
      ],
    },
    {
      title: '4. Behaltene Räume und Eigentümer-Links',
      items: [
        'Der Host kann einen Raum behalten. Dann bleiben seine Einrichtung (Code, Name, Deck und Einstellungen), seine Story-Warteschlange und die Ergebnisse seiner letzten Runden (Story und vereinbarte Schätzung) erhalten, und wer den Link des Raums später öffnet, holt ihn zurück.',
        'Beim Behalten eines Raums entsteht ein geheimer Eigentümer-Link. Geben Sie ihn nicht weiter: Wer ihn hat, kontrolliert den Raum. Er übernimmt die Host-Rolle und kann das Behalten beenden.',
        'Der Browser, in dem der Raum behalten wurde, merkt sich den Eigentümer-Link. Kopieren Sie ihn, wenn Sie ihn auf einem anderen Gerät verwenden möchten. Da es keine Konten gibt, können wir einen verlorenen Eigentümer-Link nicht wiederherstellen.',
        'Ein behaltener Raum wird normalerweise entfernt, wenn sein Eigentümer ihn nicht mehr behält, oder automatisch 180 Tage, nachdem sein Eigentümer zuletzt mit dem Eigentümer-Link zurückgekehrt ist, bzw. 30 Tage, nachdem er behalten wurde, wenn der Eigentümer nie mit dem Link zurückkehrt. Er kann auch früher entfernt werden (Abschnitt 8). Wir können begrenzen, wie viele Räume behalten werden können.',
      ],
    },
    {
      title: '5. Ihre Inhalte und Ihre Verantwortung',
      items: [
        'Was Sie eingeben (Namen, Raumnamen, Stories, Links, Stimmen, Schätzungen, Chatnachrichten), gehört weiterhin Ihnen. Sie räumen uns nur die Berechtigung ein, die wir brauchen, um den Dienst damit zu betreiben: die Inhalte wie in der Datenschutzerklärung beschrieben zu speichern und zu übertragen und sie den anderen Personen im Raum anzuzeigen. Diese können den Rundenverlauf auch exportieren.',
        'Für das, was Sie eingeben, sind Sie selbst verantwortlich. Geben Sie keine vertraulichen Informationen, keine personenbezogenen Daten anderer und nichts Rechtswidriges ein, und nichts, was Sie nicht weitergeben dürfen.',
        'Wir prüfen keine Inhalte. Wenn wir annehmen, dass gegen die Regeln dieser Bedingungen verstoßen wird, können wir Inhalte oder Räume ohne Vorankündigung entfernen und den Zugang sperren oder einschränken.',
      ],
    },
    {
      title: '6. Zulässige Nutzung',
      content: 'Nutzen Sie den Dienst nicht, um gegen Gesetze zu verstoßen; um andere zu belästigen, zu bedrohen oder sich als andere auszugeben; um rechtswidrige, hasserfüllte oder sexuell explizite Inhalte oder schädliche Links zu verbreiten; um den Dienst anzugreifen oder unbefugten Zugriff zu versuchen; um ihn automatisiert auszulesen (Scraping) oder automatisierten Datenverkehr an ihn zu senden; um Last- oder Stresstests gegen ihn auszuführen; oder um seine Grenzen oder Schutzmaßnahmen zu umgehen. Wir können Zugriffe sperren, die gegen diese Regeln verstoßen.',
    },
    {
      title: '7. Links auf andere Websites',
      content: 'Räume können Links auf andere Websites enthalten, zum Beispiel Issue-Links, die Teilnehmer hinzufügen. Wir kontrollieren und prüfen diese Websites nicht. Verantwortlich für einen Link ist, wer ihn hinzufügt; Sie öffnen solche Links auf eigenes Risiko.',
    },
    {
      title: '8. Verfügbarkeit, Daten und Änderungen am Dienst',
      items: [
        'Wir sagen nicht zu, dass der Dienst zu einem bestimmten Zeitpunkt oder für eine bestimmte Dauer verfügbar ist. Wir sagen auch nicht zu, Daten aufzubewahren oder Sicherungen anzulegen, auf die Sie sich verlassen können. Räume und behaltene Räume können jederzeit gelöscht werden oder verloren gehen, zum Beispiel nach einer technischen Störung.',
        'Bewahren Sie von allem, was Ihnen wichtig ist, eine eigene Kopie auf. Den Rundenverlauf eines Raums können Sie als CSV herunterladen oder als CSV bzw. Markdown kopieren.',
        'Wir können den Dienst oder einzelne Teile oder Funktionen jederzeit ändern, aussetzen oder einstellen, ohne Vorankündigung und, soweit gesetzlich zulässig, ohne Haftung.',
      ],
    },
    {
      title: '9. Keine Gewährleistung',
      content: 'Soweit gesetzlich zulässig, wird der Dienst „wie besehen“ und „wie verfügbar“ bereitgestellt, ohne ausdrückliche oder stillschweigende Gewährleistung jeglicher Art. Insbesondere sagen wir nicht zu, dass er fehlerfrei, sicher oder unterbrechungsfrei ist oder sich für einen bestimmten Zweck eignet.',
    },
    {
      title: '10. Haftungsbeschränkung',
      items: [
        'Soweit gesetzlich zulässig, haften wir nicht für mittelbare, zufällige, besondere oder Folgeschäden und nicht für Datenverlust, entgangenen Gewinn, Zeitverlust oder Betriebsunterbrechungen.',
        'Der Dienst ist kostenlos. Soweit gesetzlich zulässig, ist unsere Haftung für alle Ansprüche im Zusammenhang mit dem Dienst daher insgesamt auf den Betrag beschränkt, den Sie uns dafür gezahlt haben, also auf null.',
        'Diese Beschränkungen gelten nicht, soweit das Gesetz eine Haftungsbeschränkung nicht erlaubt, insbesondere bei Vorsatz und grober Fahrlässigkeit sowie bei Verletzung des Lebens, des Körpers oder der Gesundheit. Nichts in diesen Bedingungen beschränkt die Rechte, die Ihnen als Verbraucher nach dem zwingenden Recht Ihres Landes zustehen.',
      ],
    },
    {
      title: '11. Support und Mitteilungen',
      content: 'Wir sind nicht verpflichtet, Support zu leisten, Fragen zu beantworten oder Fehler zu beheben. Mitteilungen und Fragen können Sie an contact@scrumpokerplay.com senden. Unsere Mitteilungen veröffentlichen wir auf dieser Website.',
    },
    {
      title: '12. Änderungen dieser Bedingungen',
      content: 'Wir können diese Bedingungen jederzeit ändern. Die aktuelle Fassung steht mit Datum stets auf dieser Seite. Da es keine Konten gibt, benachrichtigen wir niemanden einzeln. Wenn Sie den Dienst nach einer Änderung weiter nutzen, akzeptieren Sie die neuen Bedingungen.',
    },
    {
      title: '13. Quellcode',
      content: 'Der Quellcode des Dienstes ist unter der GNU Affero General Public License, Version 3, auf https://github.com/mertgundoganx/scrum-poker verfügbar. Diese Lizenz gilt für den Code; diese Bedingungen gelten für Ihre Nutzung des unter scrumpokerplay.com betriebenen Dienstes.',
    },
    {
      title: '14. Marken',
      content: 'Planning Poker® ist eine eingetragene Marke der Mountain Goat Software, LLC. Scrum Poker Online steht in keiner Verbindung zu diesem Unternehmen und wird von ihm weder unterstützt noch empfohlen.',
    },
    {
      title: '15. Schlussbestimmungen',
      content: 'Diese Bedingungen sind die gesamte Vereinbarung zwischen Ihnen und uns über den Dienst. Ist eine Bestimmung unwirksam oder nicht durchsetzbar, bleibt der Rest wirksam. Wenn wir eine Bestimmung nicht durchsetzen, verzichten wir damit nicht auf sie.',
    },
    {
      title: '16. Kontakt',
      content: 'Fragen zu diesen Bedingungen: contact@scrumpokerplay.com',
    },
  ],
};

export default de;
