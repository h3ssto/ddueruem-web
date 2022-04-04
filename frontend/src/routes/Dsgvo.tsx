import React from 'react';
import { Container, Row } from 'react-bootstrap';

export default function Dsgvo() {
  return (
    <Container>
      <Row>
        <h1>Datenschutzerklärung</h1>
        <h2>Grundlegendes</h2>
        <p>
          Diese Datenschutzerklärung soll die Nutzer dieser Website über die Art, den Umfang und
          den Zweck der Erhebung und Verwendung personenbezogener Daten durch den
          Websitebetreiber Tobias Heß informieren.
        </p>
        <p>
          Der Websitebetreiber nimmt Ihren Datenschutz sehr ernst und behandelt Ihre
          personenbezogenen Daten vertraulich und entsprechend der gesetzlichen Vorschriften. Da
          durch neue Technologien und die ständige Weiterentwicklung dieser Webseite Änderungen
          an dieser Datenschutzerklärung vorgenommen werden können, empfehlen wir Ihnen sich die
          Datenschutzerklärung in regelmäßigen Abständen wieder durchzulesen.
        </p>
        <p>
          Definitionen der verwendeten Begriffe (z.B. “personenbezogene Daten” oder “Verarbeitung”)
          finden Sie in Art. 4 DSGVO.
        </p>
        <h2>Zugriffsdaten</h2>
        <p>
          Wir, der Websitebetreiber bzw. Seitenprovider, erheben aufgrund unseres berechtigten
          Interesses (s. Art. 6 Abs. 1 lit. f. DSGVO) Daten über Zugriffe auf die Website und
          speichern diese als „Server-Logfiles“ auf dem Server der Website ab.
          Folgende Daten werden so protokolliert:
        </p>
        <p>
          <ul>
            <li>Besuchte Website</li>
            <li>Uhrzeit zum Zeitpunkt des Zugriffes</li>
            <li>Menge der gesendeten Daten in Byte</li>
            <li>Quelle/Verweis, von welchem Sie auf die Seite gelangten</li>
            <li>Verwendeter Browser</li>
            <li>Verwendetes Betriebssystem</li>
            <li>Verwendete IP-Adresse</li>
          </ul>
        </p>
        <p>
          Die Server-Logfiles werden für maximal 7 Tage gespeichert und anschließend gelöscht. Die
          Speicherung der Daten erfolgt aus Sicherheitsgründen, um z. B. Missbrauchsfälle aufklären
          zu können. Müssen Daten aus Beweisgründen aufgehoben werden, sind sie solange von der
          Löschung ausgenommen bis der Vorfall endgültig geklärt ist.
        </p>
        <h2>Cookies</h2>
        <p>
          Bei Cookies handelt es sich um kleine Dateien, welche auf Ihrem
          Endgerät gespeichert werden. Ihr Browser greift auf diese Dateien zu. Durch den Einsatz
          von Cookies erhöht sich die Benutzerfreundlichkeit und Sicherheit dieser Website.
          Diese Website verwendet ausschließlich technische Cookies die das
          Webseitenerlebnis angenehmer machen. Personenbezogene Cookies werden nicht gesammelt!
        </p>
        <p>
          Gängige Browser bieten die Einstellungsoption, Cookies nicht zuzulassen. Hinweis: Es ist
          nicht gewährleistet, dass Sie auf alle Funktionen dieser Website ohne Einschränkungen
          zugreifen können, wenn Sie entsprechende Einstellungen vornehmen.
        </p>
        <p>Diese Webseite verwendet folgende cookies:</p>
        <p>
          <table>
            <tr>
              <th>Name</th>
              <th>Zweck</th>
              <th>Vorhaltedauer</th>
            </tr>
            <tr>
              <td>sessionid</td>
              <td>
                Verbessert die Nutzererfahrung, sodass der Nutzer sich bei erneutem Besuch
                der Website nicht neu anmelden muss.
              </td>
              <td>14 Tage</td>
            </tr>
            <tr>
              <td>csrftoken</td>
              <td>Schützt den Nutzer vor Cross-site request forgery (CSRF) Angriffen.</td>
              <td>1 Jahr</td>
            </tr>
          </table>
        </p>
        <h2>Erfassung und Verarbeitung personenbezogener Daten</h2>
        <p>
          Der Websitebetreiber erhebt, nutzt und gibt Ihre personenbezogenen Daten nur dann weiter,
          wenn dies im gesetzlichen Rahmen erlaubt ist oder Sie in die Datenerhebung einwilligen.
          Als personenbezogene Daten gelten sämtliche Informationen, welche dazu dienen, Ihre
          Person zu bestimmen und welche zu Ihnen zurückverfolgt werden können – also
          beispielsweise Ihr Name, Ihre E-Mail-Adresse und Telefonnummer.
        </p>
        <p>
          Diese Website können Sie auch besuchen, ohne Angaben zu Ihrer Person zu machen. Zum
          Schutz unserer technischen Infrastruktur speichern wir jedoch (ohne Personenbezug) Ihre
          Zugriffsdaten auf diese Website. Zu diesen Zugriffsdaten gehören z. B. die von Ihnen
          angeforderte Datei oder der Name Ihres Internet-Providers. Durch die Anonymisierung der
          Daten sind Rückschlüsse auf Ihre Person nicht möglich. Wir sammeln personenbezogene
          Daten nur im Falle einer Registrierung auf unserer Website.
        </p>
        <p>Im Falle einer Registrierung sammeln wir folgende personendbezogene Daten:</p>
        <p>
          <table>
            <tr>
              <th>Art der Daten</th>
              <th>Art der Sammlung</th>
              <th>Zweck</th>
            </tr>
            <tr>
              <td>E-Mail-Adresse</td>
              <td>
                Muss beim Registrieren auf der Website angegeben werden.
              </td>
              <td>
                Zusendung der Authentifizierungs-Mail, zusendung weiterer Bestätigungs-Mails
                beim Hochladen von Dateien.
              </td>
            </tr>
            <tr>
              <td>Datum der Registrierung</td>
              <td>
                Wird beim Registrieren auf der Website erfasst.
              </td>
              <td>
                Rückverfolgung bei Missbrauch.
              </td>
            </tr>
            <tr>
              <td>Institut</td>
              <td>
                Wenn der Nutzer Mitglied eines Universitäts-Instituts ist,
                kann er dies freiwillig angeben.
              </td>
              <td>Präsentation der eigenen Person</td>
            </tr>
            <tr>
              <td>Mitarbeiter-Flag</td>
              <td>Wenn der Nutzer Mitarbeiter der Website ist, wird dies angezeigt</td>
              <td>Kennzeichnung von Administratoren</td>
            </tr>
          </table>
        </p>
        <h2>Umgang mit Kontaktdaten</h2>
        <p>
          Nehmen Sie mit uns als Websitebetreiber durch die angebotenen Kontaktmöglichkeiten
          Verbindung auf, werden Ihre Angaben gespeichert, damit auf diese zur Bearbeitung und
          Beantwortung Ihrer Anfrage zurückgegriffen werden kann. Ohne Ihre Einwilligung werden
          diese Daten nicht an Dritte weitergegeben.
        </p>
        <h2>Rechte des Nutzers</h2>
        <p>
          Sie haben als Nutzer das Recht, auf Antrag eine kostenlose Auskunft darüber zu erhalten,
          welche personenbezogenen Daten über Sie gespeichert wurden. Sie haben außerdem das
          Recht auf Berichtigung falscher Daten und auf die Verarbeitungseinschränkung oder
          Löschung Ihrer personenbezogenen Daten. Falls zutreffend, können Sie auch Ihr Recht auf
          Datenportabilität geltend machen. Sollten Sie annehmen, dass Ihre Daten unrechtmäßig
          verarbeitet wurden, können Sie eine Beschwerde bei der zuständigen Aufsichtsbehörde
          einreichen
        </p>
        <h2>Löschung von Daten</h2>
        <p>
          Sofern Ihr Wunsch nicht mit einer gesetzlichen Pflicht zur Aufbewahrung von Daten (z. B.
          Vorratsdatenspeicherung) kollidiert, haben Sie ein Anrecht auf Löschung Ihrer Daten. Von
          uns gespeicherte Daten werden, sollten sie für ihre Zweckbestimmung nicht mehr vonnöten
          sein und es keine gesetzlichen Aufbewahrungsfristen geben, gelöscht. Falls eine Löschung
          nicht durchgeführt werden kann, da die Daten für zulässige gesetzliche Zwecke erforderlich
          sind, erfolgt eine Einschränkung der Datenverarbeitung. In diesem Fall werden die Daten
          gesperrt und nicht für andere Zwecke verarbeitet.
        </p>
        <h2>Widerspruchsrecht</h2>
        <p>
          Nutzer dieser Webseite können von ihrem Widerspruchsrecht Gebrauch machen und der
          Verarbeitung ihrer personenbezogenen Daten zu jeder Zeit widersprechen.
          Wenn Sie eine Berichtigung, Sperrung, Löschung oder Auskunft über die zu Ihrer Person
          gespeicherten personenbezogenen Daten wünschen oder Fragen bzgl. der Erhebung,
          Verarbeitung oder Verwendung Ihrer personenbezogenen Daten haben oder erteilte
          Einwilligungen widerrufen möchten, wenden Sie sich bitte an folgende E-Mail-Adresse:
          [EMail-Adresse einfügen]
        </p>
      </Row>
    </Container>
  );
}
