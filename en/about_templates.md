<h1>How to add borders and captions to the QR codes</h1>

ScanMeFindMe allows you to add borders and captions to QR codes so you don't need to design them separately and paste the QR code image on them. This is especially helpful when you generate multiple QR codes in bulk



Make the QR look more interesting and add a label (caption) with a catch phrase like "Scan me" or put the actual information from the QR code there.

Create your own templates




<p>Templates are a powerful feature of QR code generator ScanMeFindMe. Not only can they be used for decoration of the QR code, they also allow you to add captions that explain what is on the QR code.</p>

<p>Your customers will more likely scan QR code if they know what they should expect when scanning it. Add captions explaining that they can download a menu, find you on facebook, get more information about the product, etc. You may want to add the same text that is encoded in the QR, for example, if your QR code leads to a twitter page - write a twitter handle under the QR code.</p>

<p>Captions will also help yourself when you have printed a lot of different QR codes - having an explanation next to each of them will save you from the need to scan them yourself to double check. This is especially useful when you use the <strong>bulk download</strong> feature of ScanMeFindMe QR generator.</p>

<p>You can use any of the standard templates, you can create your own templates or you can download from the [shared library].</p>

<h2>How to create your own templates</h2>
<p>Templates are just image files in the SVG format. This is an XML file where tags represent different elements - rectangles, circles, paths, texts, etc. SVG files can also include other images, so if it is easier for you, you can take a PNG or JPG image and “convert” it to SVG by simply including it as <img> element.</p>

<p>The easiest way to create your own template is to duplicate an existing template and then modify it.</p>

<p>Templates for ScanMeFindMe must also contain a <strong>&lt;rect&gt;</strong> element with <strong>id=”qr”</strong> . This element will be substituted with the QR code when it is generated.</p>

<p>Any <strong>&lt;text&gt;</strong> element that has <strong>id</strong> attribute will become a caption. If this text element also has <strong>font-size</strong> attribute, you will also be able to adjust font size for each QR code that uses this template.</p>

<p>Beware of some limitations! ScanMeFindMe uses the [cairosvg] library to convert generated QR codes to PNG, PDF and PS formats. Some complicated SVG elements may not be converted correctly. Also for security reasons @include directive is ignored during conversion, so you can not include any external URLs. </p>

<p>The number of fonts is pre-installed on the server and you can use them in your texts. The full list can be found in the github repository: https://github.com/ScanMeFindMe/fonts . You can also submit pull requests for adding more fonts there but try to add the fonts that support multiple languages and are useful for other users of ScanMeFineMe.</p>

