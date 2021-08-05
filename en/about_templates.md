<h1>How to add borders and captions to the QR codes</h1>

--------------------------------------------------META TAGS --------------------------------------------------
Meta Title: How To Add Borders And Captions To The QR Codes
Meta Description:  Learn how to add borders and captions that make your QR code unique. Style your QR code with a catchy CTA to boost conversion.

------------------------------------------- SHORT TEXTS------------------------------------------------
Short Text -1, Demo site and PRO site - in the “Templates” header when choosing styles for the QR code (abstracts can be different for demo and pro sites if needed)

Demo Site

Title: How to add borders and captions to the QR codes
Description: Learn how to add catchy CTAs with captions QR codes. Choose from pre-defined templates or create one with a PRO account.
PRO Site

Title: How to add borders and captions to the QR codes
Description: Learn how to add catchy CTAs with captions QR codes. Choose from pre-defined templates or create one.
Short Text 2. Demo site, page “API”, link “more about templates”

Description: Learn more about templates here.

Short Text 3  Library page in PRO

Description: Create, edit and manage existing QR code templates.


------------------------------------------- ARTICLE ----------------------------------------------------

How To Add Borders And Captions To The QR Codes

For marketers, everything comes out to conversion. If you have a brilliant ad designed, nothing matters if the audience doesn’t reach out in one way or another.

QR codes are a useful marketing tool, but adding a plain-format QR code doesn’t do justice to the creative works done on marketing materials.

Without a little nudge, the audience may skip over the QR code, even when it’s in plain sight. Often, a CTA and a unique presentation are what it takes to get users to scan the QR code.
Why Add Borders And Captions To QR Codes?

Instead of sticking with the default format, you’ll want to add a ‘Scan Me’ text along with the QR code. People may have developed ‘QR code blindness’ when seeing so many of them in their daily lives.

However, a ‘Scan Me’ text and a unique border draw their attention to the QR code. The CTA leaves no doubt on what the audience should do next: scan on the QR code.

You can also add text that previews what’s on the other side of the QR code. For example, an App Store text tells the users that they’re about to be redirected to your app on Apple App Store. Or a simple “Menu’ to get users to check out what’s offered by your restaurant.

The idea is, you’ll want to instill trust and remove any uncertainties with QR codes. Customers like to have an idea of what they’re getting into before they scan the QR. With the right borders and captions, you can do precisely that and increase conversions.

Personalizing your QR codes with templates not only helps with marketing but also prevents confusion when you’re sorting them out. Imagine when you’re about to print dozens of QR codes in different materials, and you’ll need to scan them for verification manually. By having captions and borders, you’ll know what they are meant for just by their visual appearance.
How To Create Your Own Templates
When you’re using ScanMeFindMe PRO, you have access to a set of pre-designed templates. However, you can also design your own templates, upload them and personalize the QR code generated on our platform.

Not only that, you can also create presets that include your choice of templates to save time in the future.

Now, how do you create your own templates?

The templates are image files in the SVG format. An SVG image is an XML file containing tags representing different elements. Web browsers use the information from the file to render the image at any resolution. You can create an SVG file via graphic design software like Adobe Illustrator or use a JPEG/PNG to SVG converter.

The quickest way to create a template is to duplicate one from the library and edit the XML code.


For a template to work on ScanMeFindMe, it needs to have the following elements.
<rect> element with id=”qr”, which will be substituted with the QR code when it is generated.
<text> element that is ad id attribute, which becomes a caption. If it contains the font-size attribute, you’ll be able to change the font size for each QR code using the same template.

There are some limitations when uploading your own templates.
ScanMeFindMe uses the [cairosvg] library to convert generated QR codes to PNG, PDF, and PS formats. As such, some complicated elements may not be converted correctly.
The @include directive is ignored for security reasons.
External URLs are not supported.
What Fonts Are Supported?
Rather than going into an endless serif vs. san serif argument, we let you decide what’s the best with several commonly-used fonts. They are pre-installed on the server, and here’s the link on Github.

https://github.com/ScanMeFindMe/fonts

If you feel we’re missing out on an interesting font for fellow marketers, you can submit a pull request. Generally, we prefer fonts that support multiple languages.

Start uploading your own templates with a ScanMeFindMe PRO account now.
