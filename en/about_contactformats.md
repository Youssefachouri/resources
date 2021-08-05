<h1>What are MeCard and vCard formats</h1>

There are two different types of contact card formats. Which one is better in what situation?



vCard is a common format for storing and exchanging contact information. MeCard was developed especially for the QR codes and is a much more compact format




<p>There are probably more people who have heard about vCard than people who heard about MeCard. But both of them work great in QR codes, and here is why.</p>

<p>One of the very common use cases for QR codes is storing contact information. When it’s just a phone number you can generate a QR code to call this number but if you want to encode the phone number and the name you need to create a proper contact card. There are two formats that are recognised by all smartphones. </p>

<p>You can put the generated code on the business card, on the information leaflet, on your resume, wherever you want. People will scan it and their phone will automatically offer to save the information to their contact.</p>

<p>Here is an example of the contact card.</p>

<p>vCard:</p>

<table>
    <tr><td><img src="https://media.scanmefindme.com/blog/about_contactformats/files/vcard_scanmefindme.svg" alt="vCard">
    </td>
        <td>
<pre>BEGIN:VCARD
VERSION:4.0
FN:ScanMeFindMe
N:;;;;
ORG:ScanMeFindMe
URL:https://scanmefindme.com
REV:2021-02-13T18:18:45.089Z
END:VCARD</pre>
        </td>
    </tr></table>

<p></p>
<p>MeCard:</p>

<table>
    <tr><td><img src="https://media.scanmefindme.com/blog/about_contactformats/files/mecard_scanmefindme.svg" alt="MeCard"></td>
        <td>
            <pre>MECARD:N:,ScanMeFindMe;URL:https://scanmefindme.com;;</pre>
        </td>
    </tr>
</table>

<p></p>
<p>This is pretty much the same information - the name and the URL. As you can see the MeCard is significantly more compact, this means that generated QR code is significantly smaller. It was developed specifically for QR codes and is supported by all smartphones.</p>

<p>However MeCard has some limitations. For example, it does not have a field for the “Organisation name”, so the companies have to use the “First name” or “Last name” field to store their name. You can not add a picture either. The vCard format also has a lot of options to specify which phone is a work phone, mobile phone, etc. </p>

<p>You can find more details about https://en.wikipedia.org/wiki/VCard and https://en.wikipedia.org/wiki/MeCard_(QR_code) on wikipedia.</p>

<p>ScanMeFindMe recommends to use MeCard for the static QR codes but for dynamic codes we use the vCard format. We don’t need to worry about the length of the generated code for the dynamic codes because you will have a short URL (and small QR code) anyway. </p>

<p>Advantages of using dynamic contact cards:</p>
<ul>
    <li>Small size of QR code regardless of the amount of information</li>
    <li>When a user scans a QR code they are redirected to a personalised page with all details displayed to them. They have an option to save the card to their phone or immediately call, email or open a website. Some smartphones will not let you preview the static contact card before saving it to the phone and it scares some people away. </li>
    <li>More information that you can store such as:
        <ul><li>Photo or logo</li>
            <li>Multiple URLs (links to various social media profiles, for example)</li>
            <li>Not only the name of a person but also organization name and position</li></ul></li>
    <li>You can update your information at any moment and don’t need to generate a new QR code.</li>
    <li>You can track when QR was scanned and from what location</li>
</ul>
<p></p>
<p>You can create dynamic QR codes in the PRO version. Two-weeks trial is free</p>


