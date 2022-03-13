<h1>So fügen Sie den QR-Codes Rahmen und Beschriftungen hinzu</h1>

--- Abstract / Meta description ---

Erfahren Sie, wie Sie Rahmen und Bildunterschriften hinzufügen, die Ihren QR-Code einzigartig machen. Gestalten Sie Ihren QR-Code mit einem einprägsamen Call-to-Action, um die Konversion zu steigern.

--- Short content 1 ---

Erfahren Sie, wie Sie einprägsame Phrasen mit QR-Code-Beschriftungen hinzufügen. Wählen Sie aus vordefinierten Vorlagen oder erstellen Sie Ihre eigenen mit einem PRO-Konto.

----------

<p>Für Werbetreibende dreht sich alles um die Conversion. Wenn Sie eine brillante Anzeige entworfen haben, ist sie umsonst, wenn das Publikum sie nicht auf die eine oder andere Weise erreicht.</p>

<p><a href="#static:url">QR-Codes</a> sind ein nützliches Marketinginstrument, aber das Hinzufügen eines einfachen QR-Codes wird der kreativen Arbeit an Marketingmaterialien nicht gerecht.</p>

<p>Ohne einen kleinen Schubs kann das Publikum den QR-Code überspringen, selbst wenn er gut sichtbar ist. Häufig sind ein Call-to-Action (CTA) und eine einzigartige Präsentation erforderlich, damit Benutzer den QR-Code scannen.</p>

<h2>Warum Rahmen und Bildunterschriften zu QR-Codes hinzufügen?</h2>

<p class="imageholder">
    <img src="https://media.scanmefindme.com/blog/about_templates/files/img 1 - templates.png"
        alt="QR-Code-Vorlagen - ScanMeFindMe">
</p>

<p>Statt beim Standardformat zu bleiben, sollten Sie zusammen mit dem QR-Code einen "Scan Me"-Text hinzufügen. Menschen haben möglicherweise eine „QR-Code-Blindheit“ entwickelt, wenn sie so viele von ihnen in ihrem täglichen Leben sehen. </p>

<p>Ein „Scan Me“-Text und eine eindeutige Umrandung lenken die Aufmerksamkeit jedoch auf den QR-Code. Der CTA lässt keinen Zweifel daran, was das Publikum als nächstes tun soll: den QR-Code scannen. </p>

<p>Sie können auch Text hinzufügen, der eine Vorschau dessen anzeigt, was sich auf der anderen Seite des QR-Codes befindet. Beispielsweise teilt ein „App Store“-Text den Benutzern mit, dass sie gleich zu Ihrer App im Apple App Store weitergeleitet werden. Oder eine einfache "Speisekarte", um Benutzer dazu zu bringen, das Angebot Ihres Restaurants zu prüfen.</p>

<p>Die Idee ist, dass Sie mit QR-Codes Vertrauen schaffen und alle Unsicherheiten beseitigen möchten. Kunden möchten eine Vorstellung davon haben, worauf sie sich einlassen, bevor sie den QR scannen. Mit den richtigen Rändern und Bildunterschriften können Sie genau das tun und die Conversions steigern.</p>

<p>Auch in der <a href="#static:url">kostenlosen Version des QR-Code-Generators</a> können Sie die Beschriftungen der Vorlagen ändern. Ändern Sie die Standardeinstellung <strong>"Scan me"</strong> in <strong>"More info"</strong>, <strong>"Our menu"</strong>, Ihren Instagram-Namen oder eine Telefonnummer. Wenn Ihr Text zu lang oder zu kurz ist, können Sie die Schriftgröße verkleinern oder vergrößern, damit er besser aussieht.</p>

<p class="imageholder">
    <img src="https://media.scanmefindme.com/blog/about_templates/files/img 2 - qr code instagram.png"
        alt="QR-Code für Instagram-Handle - ScanMeFindMe">
</p>

<p>Das Personalisieren Ihrer QR-Codes mit Vorlagen hilft nicht nur beim Marketing, sondern verhindert auch Verwirrung beim Aussortieren. Stellen Sie sich vor, Sie würden Dutzende von QR-Codes auf verschiedenen Materialien drucken und diese zur Überprüfung manuell scannen müssen. Wenn Sie Bildunterschriften und Rahmen haben, wissen Sie, wofür sie gedacht sind, nur durch ihr visuelles Erscheinungsbild.</p>

<h2>So erstellen Sie Ihre eigenen Vorlagen</h2>

<p>Wenn Sie <a href="#pro">ScanMeFindMe PRO</a> verwenden, haben Sie Zugriff auf eine Reihe vorgefertigter Vorlagen. Sie können jedoch auch Ihre eigenen Vorlagen entwerfen, diese hochladen und den auf unserer Plattform generierten <a href="#static:url">QR-Code</a> personalisieren.</p>

<p>Nicht nur das, Sie können auch <a href="#article:about_presets">Voreinstellungen erstellen</a>, die Ihre Auswahl an Vorlagen enthalten, um in Zukunft Zeit zu sparen. </p>

<p>Wie erstellen Sie nun Ihre eigenen Vorlagen?</p>

<p>Die Vorlagen sind Bilddateien im SVG-Format. Ein SVG-Bild ist eine XML-Datei, die Tags enthält, die verschiedene Elemente darstellen. Webbrowser verwenden die Informationen aus der Datei, um das Bild mit einer beliebigen Auflösung wiederzugeben. Sie können eine SVG-Datei mit einer Grafikdesign-Software wie Adobe Illustrator erstellen oder einen JPEG/PNG-zu-SVG-Konverter verwenden.</p>

<p>Der schnellste Weg, eine Vorlage zu erstellen, besteht darin, eine Vorlage aus der Bibliothek zu duplizieren und die SVG-Quelle zu bearbeiten.</p>

<p class="imageholder">
    <img src="https://media.scanmefindme.com/blog/about_templates/files/img 3 - edit svg template.png"
        alt="QR-Code-Vorlage bearbeiten - ScanMeFindMe">
</p>

<p>Damit eine Vorlage auf ScanMeFindMe funktioniert, muss sie ein <strong class="notranslate">&lt;rect&gt;</strong>-Element mit <strong class="notranslate">id="qr"</strong> haben , der bei der Generierung durch den QR-Code ersetzt wird.</p>

<p>Sie können auch <strong class="notranslate">&lt;text&gt;</strong>-Elemente einfügen, wenn diese Elemente ein <strong class="notranslate">id</strong>-Attribut haben, werden sie zu Bildunterschriften Sie können für jeden QR-Code, der diese Vorlage verwendet, Änderungen vornehmen. Wenn solche <span class="notranslate">&lt;text&gt;</span>-Elemente das Attribut <strong class="notranslate">font-size</strong> enthalten, können Sie außerdem die Schriftgröße ändern für jeden QR-Code mit derselben Vorlage.</p>

<p>Achten Sie auf einige Einschränkungen! ScanMeFindMe verwendet die Bibliothek <a href="https://cairosvg.org/" class="smfm-externallink">CairoSVG</a>, um generierte QR-Codes in die Formate PNG, PDF und PS zu konvertieren. Einige komplizierte SVG-Elemente werden möglicherweise nicht korrekt konvertiert. Aus Sicherheitsgründen wird die @include-Direktive bei der Konvertierung ignoriert, daher können Sie keine externen URLs einbinden (mit Ausnahme der Schriftarten, die wir auf unserem Server installiert haben).</p>

<h2>Welche Schriftarten werden unterstützt? </h2>

<p>Anstatt in einen endlosen Streit zwischen Serifen und San Serifen zu verfallen, lassen wir Sie entscheiden, was mit mehreren häufig verwendeten Schriftarten am besten ist. Die auf dem Server vorinstallierten Schriftarten finden Sie in unserem Github-Repository: <a href="https://github.com/ScanMeFindMe/fonts" class="smfm-externallink" target="_blank">https: //github.com/ScanMeFindMe/fonts</a></p>

<p>Wenn Sie der Meinung sind, dass uns eine interessante Schriftart für andere Vermarkter fehlt, können Sie eine Pull-Anfrage einreichen. Im Allgemeinen bevorzugen wir Schriftarten, die mehrere Sprachen unterstützen.</p>

<p>Beginnen Sie jetzt mit dem Hochladen Ihrer eigenen Vorlagen mit einem <a href="#pro">ScanMeFindMe PRO-Konto</a>.</p>
