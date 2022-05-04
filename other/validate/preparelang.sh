
if [ -z "$1" ]
  then
    echo "No argument supplied"
    return
fi

newlang=$1

mkdir "texts/${newlang}"
cd "texts/${newlang}"
mkdir articles dynamic static emails
cp ../en/articles/*.md articles/
cp ../en/dynamic/*.md dynamic/
cp ../en/static/*.md static/
cp ../en/emails/*.md emails/
cp ../en/translations.json translations.json
touch nonproduction
git add .
git commit -m "New language - ${newlang} - copy from English"
rm articles/*.md dynamic/*.md static/*.md emails/*.md
echo "{}" > translations.json
cd ../..
