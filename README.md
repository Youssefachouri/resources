# Resources for ScanMeFindMe

Every time something is pushed to the `master` branch, the staging site is updated
https://staging.scanmefindme.com . When testing is successful, the changes from `master`
branch will be merged into the `production` branch that will trigger update of
https://scanmefindme.com

Folder 'texts' contains separate folder for each language. The main language is "en" (English)

## media/articles/{articlename}/{filearea}/{filename}

Files that are used in articles. Only one file can be in file areas 'logo' and 'ogimage' -
it will be used as logo or Open Graph image respectfully. Any number of files can be added
to the 'files' file area. They can be referenced from the articles, for example
file `media/articles/about_dynamic_contact/files/img2.png` can be included as:

```markdown
<p class="imageholder">
    <img src="https://media.scanmefindme.com/articles/about_dynamic_contact/files/img2.png"
        alt="Generating QR code for contact card - ScanMeFindMe">
</p>
```

## texts/{lang}/translations.json

Language strings. You can use https://github.com/jcbvm/i18n-editor as a GUI editor.

## texts/{lang}/articles/{articlename}.md

Articles. Each article has meta information in the beginning of the file that will be excluded from article contents.

Articles meta information can have the following sections:
- Abstract
- Meta description
- Short content 1
- Short content 2
- Meta title
- Publish date
- Previous titles

Normally articles meta information have the same sections as respective article in English.

Every time the title is changed the previous title has to be added to the "Previous titles"
section. It will be used to create links (aliases) to the articles so that the previous
URLs continue to work.

## texts/{lang}/static/{shortname}.md

Types of static QR codes.

First line should have `<h1>` tag with the title and also the name for the tab in the square brackets.

Meta information can have the following sections:
- Text above the form - normally will be wrapped in `<p class="smfm-hint">`
- Text below the form - normally will be wrapped in `<p class="font-italic smfm-hint">`
- Meta description
- Meta title
- Previous titles

Normally meta information have the same sections as respective file in English.

Every time the title is changed the previous title has to be added to the "Previous titles"
section. It will be used to create links (aliases) so that the previous
URLs continue to work.

## texts/{lang}/dynamic/{shortname}.md

Types of dynamic QR codes.

First line should have `<h1>` tag with the full title and also a short title in the square brackets.

Meta information can have the following sections:
- Description

Normally meta information have the same sections as respective file in English. There is no need to
maintain the history of previous titles here.

## texts/{lang}/emails/{template}.md

Email templates

First line of each file is the subject of an email, the rest of the file is the body of the email.

Templates and available placeholders:
- trialended - {{name}}
- trialendssoon - {{name}}, {{expires}}
- trialstart - {{name}}, {{expires}}

Files for emails may be stored in `media/emails`, the prefix and postfix for email body are defined in
`common/emails/bodyprefix.md` and `common/emails/bodypostfix.md` respectively (they are the same for
all languages), the {{lang}} placeholder is available there.

## How to add links to texts

External links:

```markdown
<a href="https://..." class="smfm-externallink" target="_blank" rel="nofollow">text</a>
```

Local links:
- `<a href="#static:url">` - link to the demo QR generator
- `<a href="#about:product">` - link to one of the information pages (product/api/tos/privacy/pricing)
- `<a href="#artcle:about_statistics">` - link to another article
- `<a href="#pro">` - call-to-action link ("Try PRO now")

Such links will be automatically substituted with the proper links in the current language to the
correct page URL.
