<h1>So fügen Sie den QR-Codes Rahmen und Beschriftungen hinzu</h1>

--- Abstract / Meta description ---

Erfahren Sie, wie Sie Rahmen und Beschriftungen hinzufügen, die Ihren QR-Code einzigartig machen. Gestalten Sie Ihren QR-Code mit einem einprägsamen Call-to-Action, um die Conversion zu steigern.

--- Short content 1 ---

Erfahren Sie, wie Sie mit QR-Code-Untertiteln eingängige Phrasen hinzufügen. Wählen Sie aus vordefinierten Vorlagen oder erstellen Sie Ihre eigenen mit einem PRO-Konto.

----------

<p>Für Marketer kommt es auf die Conversion an. Wenn Sie eine brillante Anzeige entworfen haben,
    nichts ist wichtig, wenn sich das Publikum nicht auf die eine oder andere Weise meldet.</p>

<p><a href="#static:url">QR-Codes</a> sind ein nützliches Marketinginstrument, aber das Hinzufügen eines einfachen QR-Codes reicht nicht
    den kreativen Arbeiten an Marketingmaterialien gerecht zu werden.</p>

<p>Ohne einen kleinen Schubser kann das Publikum den QR-Code überspringen, selbst wenn er in Sichtweite ist.
    Oftmals sind ein Call-to-Action (CTA) und eine einzigartige Präsentation erforderlich, um Benutzer zum Scannen des QR-Codes zu bewegen.</p>

<h2>Warum Rahmen und Beschriftungen zu QR-Codes hinzufügen?</h2>

<p class="imageholder"><img src="https://media.scanmefindme.com/blog/about_templates/files/img 1 - templates.png" alt="QR-Code-Vorlagen - ScanMeFindMe"></p>

<p>Anstatt das Standardformat beizubehalten, sollten Sie zusammen mit dem QR-Code einen "Scan Me"-Text hinzufügen.
    Menschen haben möglicherweise eine „QR-Code-Blindheit“ entwickelt, wenn sie so viele von ihnen in ihrem täglichen Leben sehen.</p>

<p>Ein "Scan Me"-Text und ein eindeutiger Rahmen lenken jedoch die Aufmerksamkeit auf den QR-Code.
    Der CTA lässt keinen Zweifel, was das Publikum als nächstes tun soll: QR-Code scannen.</p>

<p>Sie können auch Text hinzufügen, der eine Vorschau auf die andere Seite des QR-Codes anzeigt.
    Ein App Store-Text teilt den Benutzern beispielsweise mit, dass sie im Begriff sind, auf Ihre App umgeleitet zu werden
    Apple-App-Store. Oder ein einfaches "Menü", damit die Nutzer das Angebot Ihres Restaurants überprüfen können.</p>

<p>Die Idee ist, mit QR-Codes Vertrauen zu schaffen und Unsicherheiten zu beseitigen.
    Kunden möchten vor dem Scannen des QR eine Vorstellung davon haben, worauf sie sich einlassen.
    Mit den richtigen Rahmen und Untertiteln können Sie genau das tun und die Conversions steigern.</p>

<p>Auch in der <a href="#static:url">Kostenlosen Version des QR-Code-Generators</a> können Sie die Bildunterschriften ändern
    auf den Vorlagen. Ändern Sie die Standardeinstellung <strong>"Scan me"</strong> in <strong>"Weitere Informationen"</strong>,
    <strong>"Unsere Speisekarte"</strong>, Ihr Instagram-Handle oder eine Telefonnummer. Wenn Ihr Text zu lang oder zu kurz ist,
    Sie können die Schriftgröße verkleinern oder vergrößern, damit sie besser aussieht.</p>

<p class="imageholder"><img src="https://media.scanmefindme.com/blog/about_templates/files/img 2 - qr code instagram.png" alt="QR-Code für Instagram-Handle - ScanMeFindMe"></p>

<p>Die Personalisierung Ihrer QR-Codes mit Vorlagen hilft nicht nur beim Marketing, sondern verhindert auch Verwirrung
    wenn du sie aussortierst. Stellen Sie sich vor, Sie möchten Dutzende von QR-Codes in verschiedenen Materialien drucken,
    und Sie müssen sie manuell zur Überprüfung scannen. Durch Bildunterschriften und Rahmen
    Du wirst schon an ihrem Aussehen erkennen, wofür sie gedacht sind.</p>
<h2>So erstellen Sie Ihre eigenen Vorlagen</h2>
<p>Wenn Sie <a href="#pro">ScanMeFindMe PRO</a> verwenden, haben Sie Zugriff auf eine Reihe vorgefertigter Vorlagen.
    Sie können aber auch eigene Vorlagen gestalten, hochladen und personalisieren
    den <a href="#static:url">QR-Code, der auf unserer Plattform generiert wurde</a>.</p>

<p>Nicht nur das, Sie können auch <a href="#article:about_presets">Voreinstellungen erstellen</a>, die Vorlagen Ihrer Wahl enthalten, um in Zukunft Zeit zu sparen.</p>

<p>Wie erstellen Sie nun Ihre eigenen Vorlagen?</p>

<p>Die Vorlagen sind Bilddateien im SVG-Format. Ein SVG-Bild ist eine XML-Datei, die Tags enthält, die verschiedene Elemente darstellen.
    Webbrowser verwenden die Informationen aus der Datei, um das Bild in einer beliebigen Auflösung zu rendern.
    Sie können eine SVG-Datei mit einer Grafikdesign-Software wie Adobe Illustrator erstellen oder einen JPEG/PNG-zu-SVG-Konverter verwenden.</p>

<p>Der schnellste Weg, eine Vorlage zu erstellen, besteht darin, eine Vorlage aus der Bibliothek zu duplizieren und die SVG-Quelle zu bearbeiten.</p>
<p class="imageholder"><img src="https://media.scanmefindme.com/blog/about_templates/files/img 3 - edit svg template.png" alt="QR-Code-Vorlage bearbeiten - ScanMeFindMe"></p>

<p>Damit eine Vorlage in ScanMeFindMe funktioniert, muss sie ein <strong>&lt;rect&gt;</strong>-Element mit <strong>id="qr"</strong> haben, das durch den QR-Code ersetzt wird, wenn es wird generiert.</p>
<p>Sie können auch <strong>&lt;text&gt;</strong>-Elemente einfügen. Wenn diese Elemente ein <strong>id</strong>-Attribut haben, werden sie zu Beschriftungen, die Sie für jeden QR-Code ändern können, der dieses verwendet Schablone. Wenn ein solcher &lt;text&gt; Elemente
das Attribut <strong>font-size</strong> enthalten, können Sie die Schriftgröße für jeden QR-Code mit derselben Vorlage ändern.
</p>

<p>Achten Sie auf einige Einschränkungen! ScanMeFindMe verwendet die Bibliothek <a href="https://cairosvg.org/" class="smfm-externallink">CairoSVG</a> zum Konvertieren
    generierte QR-Codes zu PNG, PDF und PS-Formate.
Einige komplizierte SVG-Elemente werden möglicherweise nicht korrekt konvertiert. Aus Sicherheitsgründen wird die @include-Direktive ignoriert während
Konvertierung, sodass Sie keine externen URLs einbinden können (mit Ausnahme der Schriftarten, die wir auf unserem Server installiert haben).</p>

<h2>Welche Schriftarten werden unterstützt?</h2>

<p>Anstatt auf endlose Argumente zwischen Serifen und San-Serifen einzugehen, lassen wir Sie entscheiden, welche von mehreren häufig verwendeten Schriftarten die beste ist.
     Die auf dem Server vorinstallierten Schriftarten finden Sie in unserem Github-Repository:
     <a href="https://github.com/ScanMeFindMe/fonts" class="smfm-externallink" target="_blank">https://github.com/ScanMeFindMe/fonts</a></p>

<p>Wenn Sie der Meinung sind, dass wir eine interessante Schriftart für andere Vermarkter verpassen, können Sie eine Pull-Anfrage einreichen.
     Im Allgemeinen bevorzugen wir Schriftarten, die mehrere Sprachen unterstützen.</p>

<p>Beginnen Sie jetzt mit dem Hochladen Ihrer eigenen Vorlagen mit einem <a href="#pro">ScanMeFindMe PRO-Konto</a>.</p>