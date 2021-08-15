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
