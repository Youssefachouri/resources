<h1>Comment ajouter des bordures et des légendes aux codes QR</h1>

--- Abstract / Meta description ---

Découvrez comment ajouter des bordures et des légendes qui rendent votre code QR unique. Donnez du style à votre code QR avec un appel à l'action captivant pour stimuler la conversion.

--- Short content 1 ---

Apprenez à ajouter des phrases captivantes avec des légendes de codes QR. Choisissez parmi des modèles prédéfinis ou créez le vôtre avec un compte PRO.

----------

<p>Pour les spécialistes du marketing, tout dépend de la conversion. Si vous avez conçu une publicité brillante, cela ne sert à rien si l'audience ne s'étend pas d'une manière ou d'une autre.</p>

Les <p><a href="#static:url">codes QR</a> sont un outil marketing utile, mais l'ajout d'un code QR au format brut ne rend pas justice aux travaux créatifs effectués sur les supports marketing.</p>

<p>Sans un petit coup de pouce, le public peut ignorer le code QR, même s'il est bien en vue. Souvent, un appel à l'action (CTA) et une présentation unique suffisent pour inciter les utilisateurs à scanner le code QR.</p>

<h2>Pourquoi ajouter des bordures et des légendes aux codes QR?</h2>

<p class="imageholder">
    <img src="https://media.scanmefindme.com/blog/about_templates/files/img 1 - templates.png"
        alt="Modèles de code QR - ScanMeFindMe">
</p>

<p>Au lieu de vous en tenir au format par défaut, vous voudrez ajouter un texte "Scan Me" avec le code QR. Les gens peuvent avoir développé une « cécité au code QR » en voyant autant d'entre eux dans leur vie quotidienne. </p>

<p>Cependant, un texte "Scan Me" et une bordure unique attirent leur attention sur le code QR. Le CTA ne laisse aucun doute sur ce que le public doit faire ensuite : scanner le code QR. </p>

<p>Vous pouvez également ajouter du texte qui donne un aperçu de ce qui se trouve de l'autre côté du code QR. Par exemple, un texte "App Store" indique aux utilisateurs qu'ils sont sur le point d'être redirigés vers votre application sur l'App Store d'Apple. Ou un simple "Menu" pour amener les utilisateurs à découvrir ce qui est proposé par votre restaurant.</p>

<p>L'idée est que vous voudrez instaurer la confiance et lever toute incertitude avec les codes QR. Les clients aiment avoir une idée de ce dans quoi ils s'embarquent avant de scanner le QR. Avec les bonnes bordures et légendes, vous pouvez faire exactement cela et augmenter les conversions.</p>

<p>Même dans la <a href="#static:url">version gratuite du générateur de code QR</a>, vous pouvez modifier les légendes sur les modèles. Remplacez la valeur par défaut <strong>"Scan me"</strong> par <strong>"Plus d'infos"</strong>, <strong>"Notre menu"</strong>, votre identifiant Instagram ou un numéro de téléphone. Si votre texte est trop long ou trop court, vous pouvez diminuer ou augmenter la taille de la police pour l'améliorer.</p>

<p class="imageholder">
    <img src="https://media.scanmefindme.com/blog/about_templates/files/img 2 - qr code instagram.png"
        alt="Code QR pour le compte Instagram - ScanMeFindMe">
</p>

<p>La personnalisation de vos codes QR avec des modèles aide non seulement au marketing, mais évite également la confusion lorsque vous les triez. Imaginez que vous êtes sur le point d'imprimer des dizaines de codes QR dans différents matériaux et que vous devrez les scanner manuellement pour les vérifier. En ayant des légendes et des bordures, vous saurez à quoi elles servent simplement par leur apparence visuelle.</p>

<h2>Comment créer vos propres modèles</h2>

<p>Lorsque vous utilisez <a href="#pro">ScanMeFindMe PRO</a>, vous avez accès à un ensemble de modèles prédéfinis. Cependant, vous pouvez également concevoir vos propres modèles, les télécharger et personnaliser le <a href="#static:url">code QR généré sur notre plateforme</a>.</p>

<p>De plus, vous pouvez également <a href="#article:about_presets">créer des préréglages</a> qui incluent votre choix de modèles pour gagner du temps à l'avenir. </p>

<p>Maintenant, comment créez-vous vos propres modèles?</p>

<p>Les modèles sont des fichiers image au format SVG. Une image SVG est un fichier XML contenant des balises représentant différents éléments. Les navigateurs Web utilisent les informations du fichier pour rendre l'image à n'importe quelle résolution. Vous pouvez créer un fichier SVG via un logiciel de conception graphique comme Adobe Illustrator ou utiliser un convertisseur JPEG/PNG vers SVG.</p>

<p>Le moyen le plus rapide de créer un modèle consiste à en dupliquer un à partir de la bibliothèque et à modifier la source SVG.</p>

<p class="imageholder">
    <img src="https://media.scanmefindme.com/blog/about_templates/files/img 3 - edit svg template.png"
        alt="Modification du modèle de code QR - ScanMeFindMe">
</p>

<p>Pour qu'un modèle fonctionne sur ScanMeFindMe, il doit avoir un élément <strong class="notranslate">&lt;rect&gt;</strong> avec <strong class="notranslate">id="qr"</strong> , qui sera remplacé par le code QR lors de sa génération.</p>

<p>Vous pouvez également inclure des éléments <strong class="notranslate">&lt;text&gt;</strong>, si ces éléments ont un attribut <strong class="notranslate">id</strong>, ils deviendront des légendes qui vous pouvez modifier pour chaque code QR qui utilise ce modèle. De plus, si ces éléments <span class="notranslate">&lt;text&gt;</span> contiennent l'attribut <strong class="notranslate">font-size</strong>, vous pourrez modifier la taille de la police pour chaque code QR en utilisant le même modèle.</p>

<p>Méfiez-vous de certaines limitations! ScanMeFindMe utilise la bibliothèque <a href="https://cairosvg.org/" class="smfm-externallink">CairoSVG</a> pour convertir les codes QR générés aux formats PNG, PDF et PS. Certains éléments SVG compliqués peuvent ne pas être convertis correctement. Pour des raisons de sécurité, la directive @include est ignorée lors de la conversion, vous ne pouvez donc pas inclure d'URL externes (à l'exception des polices que nous avons installées sur notre serveur).</p>

<h2>Quelles sont les polices prises en charge? </h2>

<p>Plutôt que d'entrer dans un débat interminable serif contre san serif, nous vous laissons décider quelle est la meilleure avec plusieurs polices couramment utilisées. Vous pouvez trouver les polices préinstallées sur le serveur dans notre référentiel Github: <a href="https://github.com/ScanMeFindMe/fonts" class="smfm-externallink" target="_blank">https: //github.com/ScanMeFindMe/fonts</a></p>

<p>Si vous pensez que nous manquons d'une police intéressante pour les autres spécialistes du marketing, vous pouvez soumettre une demande d'extraction. Généralement, nous préférons les polices prenant en charge plusieurs langues.</p>

<p>Commencez à télécharger vos propres modèles avec un <a href="#pro">compte ScanMeFindMe PRO</a> dès maintenant.</p>
