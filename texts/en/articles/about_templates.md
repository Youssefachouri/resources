<h1>How to add borders and captions to the QR codes</h1>

--- Abstract / Meta description ---

Learn how to add borders and captions that make your QR code unique. Style your QR code with a catchy call-to-actions to boost conversion.

--- Short content 1 ---

Learn how to add catchy phrases with QR codes captions. Choose from pre-defined templates or create your own with a PRO account.

----------

<p>For marketers, everything comes out to conversion. If you have a brilliant ad designed, it's for nothing if the audience doesn't reach out in one way or another.</p>

<p><a href="#static:url">QR codes</a> are a useful marketing tool, but adding a plain-format QR code doesn't do justice to the creative works done on marketing materials.</p>

<p>Without a little nudge, the audience may skip over the QR code, even when it's in plain sight. Often, a call-to-action (CTA) and a unique presentation are what it takes to get users to scan the QR code.</p>

<h2>Why Add Borders And Captions To QR Codes?</h2>

<p class="imageholder">
    <img src="https://media.scanmefindme.com/blog/about_templates/files/img 1 - templates.png"
        alt="QR code templates - ScanMeFindMe">
</p>

<p>Instead of sticking with the default format, you'll want to add a 'Scan Me' text along with the QR code. People may have developed 'QR code blindness' when seeing so many of them in their daily lives. </p>

<p>However, a 'Scan Me' text and a unique border draw their attention to the QR code. The CTA leaves no doubt on what the audience should do next: scan the QR code. </p>

<p>You can also add text that previews what's on the other side of the QR code. For example, an 'App Store' text tells the users that they're about to be redirected to your app on Apple App Store. Or a simple 'Menu' to get users to check out what's offered by your restaurant.</p>

<p>The idea is, you'll want to instill trust and remove any uncertainties with QR codes. Customers like to have an idea of what they're getting into before they scan the QR. With the right borders and captions, you can do precisely that and increase conversions.</p>

<p>Even in the <a href="#static:url">Free version of QR code generator</a> you can modify the captions on the templates. Change the default <strong>"Scan me"</strong> to <strong>"More info"</strong>, <strong>"Our menu"</strong>, your instagram handle or a phone number. If your text is too long or too short, you can descrease or increase the font size to make it look better.</p>

<p class="imageholder">
    <img src="https://media.scanmefindme.com/blog/about_templates/files/img 2 - qr code instagram.png"
        alt="QR code for instagram handle - ScanMeFindMe">
</p>

<p>Personalizing your QR codes with templates not only helps with marketing but also prevents confusion when you're sorting them out. Imagine you're about to print dozens of QR codes in different materials, and you'll need to scan them for verification manually. By having captions and borders, you'll know what they are meant for just by their visual appearance.</p>

<h2>How To Create Your Own Templates</h2>

<p>When you're using <a href="#pro">ScanMeFindMe PRO</a>, you have access to a set of pre-designed templates. However, you can also design your own templates, upload them and personalize the <a href="#static:url">QR code generated on our platform</a>.</p>

<p>Not only that, you can also <a href="#article:about_presets">create presets</a> that include your choice of templates to save time in the future. </p>

<p>Now, how do you create your own templates?</p>

<p>The templates are image files in the SVG format. An SVG image is an XML file containing tags representing different elements. Web browsers use the information from the file to render the image at any resolution. You can create an SVG file via graphic design software like Adobe Illustrator or use a JPEG/PNG to SVG converter.</p>

<p>The quickest way to create a template is to duplicate one from the library and edit the SVG source.</p>

<p class="imageholder">
    <img src="https://media.scanmefindme.com/blog/about_templates/files/img 3 - edit svg template.png"
        alt="Editing QR code template - ScanMeFindMe">
</p>

<p>For a template to work on ScanMeFindMe, it must have a <strong class="notranslate">&lt;rect&gt;</strong> element with <strong class="notranslate">id="qr"</strong>, which will be substituted with the QR code when it is generated.</p>

<p>You can also include <strong class="notranslate">&lt;text&gt;</strong> elements, if those elements have an <strong class="notranslate">id</strong> attribute, they will become captions that you can modify for each QR code that uses this template. Additionally, if such <span class="notranslate">&lt;text&gt;</span> elements contain the <strong class="notranslate">font-size</strong> attribute, you'll be able to change the font size for each QR code using the same template.</p>

<p>Beware of some limitations! ScanMeFindMe uses the <a href="https://cairosvg.org/" class="smfm-externallink">CairoSVG</a> library to convert generated QR codes to PNG, PDF and PS formats. Some complicated SVG elements may not be converted correctly. For security reasons @include directive is ignored during conversion, so you can not include any external URLs (with the exception of the fonts that we installed on our server).</p>

<h2>What Fonts Are Supported? </h2>

<p>Rather than going into an endless serif vs. san serif argument, we let you decide what's the best with several commonly-used fonts. You can find the fonts that are pre-installed on the server in our Github repository: <a href="https://github.com/ScanMeFindMe/fonts" class="smfm-externallink" target="_blank">https://github.com/ScanMeFindMe/fonts</a></p>

<p>If you feel we're missing out on an interesting font for fellow marketers, you can submit a pull request. Generally, we prefer fonts that support multiple languages.</p>

<p>Start uploading your own templates with a <a href="#pro">ScanMeFindMe PRO account</a> now.</p>
