Resources for ScanMeFindMe

# For translators

Folder 'texts' contains separate folder for each language. The main language is "en" (English).

**Important!** There is an automated check on pull requests that verifies that the file format in translations corresponds to the respective file in English. Do not insert newlines (use an editor with word wrap). Make sure that all HTML tags are present and have the same attributes, only attributes 'alt' and 'title' can be translated.

## How to upload changes on github

- Sign up for github.com if you don't have an account yet
- Fork ScanMeFindMe/resources if it is not yet forked
- Enable Github actions on your fork
- Make sure the master branch in your fork is up-to-date with the master branch in this repository
- Check out code locally
- Create a new branch in your fork
- Commit and push changes to your branch
- Make sure Github actions workflows passed on your branch
- Add more commits to your branch if necessary
- Create a pull request from your branch to the master branch in ScanMeFindMe/resources
- Before your pull request is merged you can add more commits to your branch and the pull request will be updated
- After your pull request is merged you can delete your branch
- After your pull request is merged the staging site https://staging.scanmefindme.com will be automatically updated
- If after that you found some errors on the staging site you will need to create another pull request:
  - Update master branch in your fork (when master branch in this repo is updated your fork will be behind)
  - If you already downloaded files locally make sure they are up-to-date with both your own changes and other contributors' changes
  - Create a new branch in your fork
  - Make and commit changes, check the workflows status, create pull request
- When you finish working on the project you can delete the fork you created. Make sure not to delete branches and the fork if the pull requests are not yet merged

If any of these steps are not familiar to you, watch this video:

<a href="https://youtu.be/Y-DE_w0cQpA" target="_blank"><img src="other/upload_video_thumb.png" width="120" height="90" alt="Video: Uploading changes to github" style="border: 1px solid darkgray"></a>

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
- Example header

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

# For content creators

## Images used in the articles

Files that are used in articles can be stored as **media/articles/{articlename}/{filearea}/{filename}**. Only one file can be in file areas 'logo' and 'ogimage' -
it will be used as logo or Open Graph image respectfully. Any number of files can be added
to the 'files' file area. They can be referenced from the articles, for example
file `media/articles/about_dynamic_contact/files/img2.png` can be included as:

```markdown
<p class="imageholder">
    <img src="https://media.scanmefindme.com/articles/about_dynamic_contact/files/img2.png"
        alt="Generating QR code for contact card - ScanMeFindMe">
</p>
```

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

## Steps to create a new article

* Create a new file `texts/en/articles/{articlename}.md` and add header, abstract and article text
  there (see other files in the same directory for examples)
* Modify file `texts/en/articles/metadata.json` and add the name of the new article there. This file
  defines sort order of the articles
* Create a folder `media/articles/{articlename}/logo/` and place an image there
  that will be used as an article main image
* Open file `other/generate_og/index.html` in the browser, select the article, add the text and press 'Draw'
  (sometimes you need to press is twice). Save the generated OG image in the
  folder `media/articles/{articlename}/ogimage/`

# Deployment

## Adding new language

Set a variable with the language code, for example Portugese:
```shell
newlang=pt
```

Create directory structure and copy from English:

```shell
mkdir "texts/${newlang}"
cd "texts/${newlang}"
mkdir articles dynamic static
cp ../en/articles/*.md articles/
cp ../en/dynamic/*.md dynamic/
cp ../en/static/*.md static/
cp ../en/translations.json translations.json
git add .
git commit -m "New language - ${newlang} - copy from English"
rm articles/*.md dynamic/*.md static/*.md
echo "{}" > translations.json
```

Now generate translations with Google, when ready - commit:

```shell
git add .
git commit -m "Language - ${newlang} - generated by google translate"
```

## Automatic deployment

Every time something is pushed to the `master` branch, the staging site is updated
https://staging.scanmefindme.com . When testing is successful, the changes from `master`
branch will be merged into the `production` branch that will trigger update of
https://scanmefindme.com
