let mainLangs = {}
const isArticle = () => document.getElementById('logoselect').value.startsWith('article')
const isRTL = () => document.getElementById("maincanvas").getAttribute('dir') === 'rtl'
const getMaxTextWidth = () => isArticle() ? 480 : 740
const getTextX = () => (isArticle() ? 673 : 380) + (isRTL() ? getMaxTextWidth() : 0)
const baseImage = () => document.getElementById((isArticle() ? "articlebase" : "staticbase") + (isRTL() ? "rtl" : ""))
const getCtx = () =>  document.getElementById("maincanvas").getContext("2d")
const setTextFont = (fontsize) => { getCtx().font = "500 "+fontsize+"px Poppins"; getCtx().fillStyle = "#000000"; }
const setQRTextFont = () => { getCtx().font = "700 "+(isArticle() ? 25 : 32)+"px Poppins"; getCtx().fillStyle = "#03949A"; }
const getQRTextY = () => isArticle() ? 165 : 200
const getTextYs = () => {
    const lines = (document.getElementById('caption').value).split(/\r?\n/)
    const positions = [350.5, 424.5, 498.5, 572.5]
    if (lines.length === 1) return [positions[1]]
    else if (lines.length === 2) return [positions[0], parseInt((positions[0] + positions[3])/2)]
    // else if (lines.length === 3) return [positions[0], parseInt((positions[0] + positions[3])/2), positions[3]]
    return positions
}

function draw() {
  document.getElementById("maincanvas").setAttribute('dir',isRTL()?'rtl':'ltr');
  var ctx = getCtx()
  ctx.fillStyle = "#FF0000";
  ctx.fillRect(0, 0, 1200, 625);
  ctx.drawImage(baseImage(), 0, 0);
  setTextFont(document.getElementById('captionsize').value)
  let positions = getTextYs();
  (document.getElementById('caption').value).split(/\r?\n/).map((line, i) => ctx.fillText(line, getTextX(), positions[i]))
  setQRTextFont()
    ctx.fillText(document.getElementById('qrcodegenerator').value, getTextX(), getQRTextY());
  if (isArticle()) {
      addImage(ctx, document.getElementById('logoimage').src)
  }
}

function addFont(name, url, weight) {
  let myFont = new FontFace(
      name,
      "url("+url+")",
      { weight: weight }
  );
  myFont.load().then((font) => {
    document.fonts.add(font);
  })

}

function GFontToDataURI(url) {
  return fetch(url) // first fecth the embed stylesheet page
      .then(resp => resp.text()) // we only need the text of it
      .then(text => {
        // now we need to parse the CSSruleSets contained
        // but chrome doesn't support styleSheets in DOMParsed docs...
        let s = document.createElement('style');
        s.innerHTML = text;
        document.head.appendChild(s);
        let styleSheet = s.sheet

        // this will help us to keep track of the rules and the original urls
        let FontRule = rule => {
          let src = rule.style.getPropertyValue('src') || rule.style.cssText.match(/url\(.*?\)/g)[0];
          if (!src) return null;
          let url = src.split('url(')[1].split(')')[0];
          let weight = rule.style.cssText.match(/font-weight: (.*?);/g)[0].split(' ')[1].split(';')[0];
          return {
            rule: rule,
            src: src,
            url: url.replace(/"/g, ''),
            weight: weight
          };
        };
        let fontRules = [],
            fontProms = [];

        // iterate through all the cssRules of the embedded doc
        // Edge doesn't make CSSRuleList enumerable...
        for (let i = 0; i < styleSheet.cssRules.length; i++) {
          let r = styleSheet.cssRules[i];
          let fR = FontRule(r);
          if (!fR) {
            continue;
          }

          addFont(fR['font-family'], fR.url, fR.weight)

        }
        document.head.removeChild(s); // clean up
        return Promise.all(fontProms); // wait for all this has been done
      });
}

function changeselect() {
    const lang = document.getElementById('lang').value

    if (isArticle()) {
        document.getElementById('logoimage').src =
            "../../media/" + document.getElementById('logoselect').value + "/logo/logo.svg"
    }

    let langsuffix = '_' + document.getElementById('lang').value
    const filename = 'og' + (langsuffix === '_en' ? '' : langsuffix) + ".png"
    document.getElementById('existingimage').src =
        "../../media/" + document.getElementById('logoselect').value + "/ogimage/"+ filename

    readFile('../../texts/'+lang+'/' + document.getElementById('logoselect').value + '.md', (t) => {
        var firstLine = t.split('\n')[0].replace(/<h1>/i, '').replace(/<[\\/]h1>/i, '').replace(/^\[[^\]]*\] /, '');
        settext(firstLine)
        draw()
    })
}

function addImage(ctx, src) {

    const image = new Image(); // Using optional size for image
    image.onload = function() {
        // Use the intrinsic size of image in CSS pixels for the canvas element
        // canvas.width = this.naturalWidth;
        // canvas.height = this.naturalHeight;

        // Will draw the image as 300x227, ignoring the custom size of 60x45
        // given in the constructor
        //ctx.drawImage(this, 0, 0);

        // To use the custom size we'll have to specify the scale parameters
        // using the element's width and height properties - lets draw one
        // on top in the corner:
        let width = this.naturalWidth
        let height = this.naturalHeight
        if (width>height) {
            height = 600/width*height
            width = 600
        } else {
            width = 600/height*width
            height = 600
        }
        ctx.drawImage(this, (625 - width)/2, (625 - height)/2, width, height);
    }

    // Load an image of intrinsic size 300x227 in CSS pixels
    image.src = src;

}

function savepng() {
    const mimetype = "image/png"
    const imgURI = document.getElementById('maincanvas')
        .toDataURL(mimetype)
        .replace(mimetype, "image/octet-stream");

    let lang = '_' + document.getElementById('lang').value
    const fileName = document.getElementById('logoselect').value.split(/(\\|\/)/g).pop() + (lang === '_en' ? '' : lang) + ".png"

    var evt = new MouseEvent("click", {
        view: window,
        bubbles: false,
        cancelable: true
    });
    var a = document.createElement("a");
    a.setAttribute("download", fileName);
    a.setAttribute("href", imgURI);
    a.setAttribute("target", '_blank');
    a.dispatchEvent(evt);
    return fileName

}

function saveserver() {
    const mimetype = "image/png"
    const imgURI = document.getElementById('maincanvas')
        .toDataURL(mimetype)
        .replace(/^data:image\/png;base64,/, "");

    let lang = '_' + document.getElementById('lang').value
    const filename = 'og' + (lang === '_en' ? '' : lang) + ".png"

    var query = (params) => Object.keys(params)
        .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(params[k]))
        .join('&');

    var http = new XMLHttpRequest();
    var url = 'store.php';
    var params = query({filename, article: document.getElementById('logoselect').value, file: imgURI})
    http.open('POST', url, true);

    http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

    http.onreadystatechange = function() {
        if (http.readyState === 4 && http.status === 200) {
            document.getElementById('existingimage').src =
                "../../media/" + document.getElementById('logoselect').value + "/ogimage/"+ filename+"?x="+Math.random()
            if (http.responseText !== "OK") {
                alert(http.responseText);
            }
       }
    }
    http.send(params);
}

function readFile(theURL, funcSuccess) {
    if (window.XMLHttpRequest) { // code for IE7+, Firefox, Chrome, Opera, Safari, SeaMonkey
        xmlhttp = new XMLHttpRequest();
    } else { // code for IE6, IE5
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.onreadystatechange=function() {
        if (xmlhttp.readyState==4 && xmlhttp.status==200) {
            funcSuccess(xmlhttp.responseText);
            // TODO catch 404?
        }
    }
    // TODO CORS denial is not caught here, probably we need to set timeout and if there was no success
    // then execute fallback.
    xmlhttp.open("GET", theURL, false);
    xmlhttp.send();
}

function loadAll() {
    readFile('../../texts/en/articles/metadata.json', (t) => {
        var articles = JSON.parse(t)
        var logoselect = document.getElementById('logoselect');
        for (var i in articles) {
            var a = 'articles/' + articles[i].substring(0, articles[i].lastIndexOf('.'))
            logoselect.add(new Option(a, a));
        }
        readFile('../../texts/en/static/metadata.json', (t) => {
            var st = JSON.parse(t)
            var logoselect = document.getElementById('logoselect');
            for (var i in st) {
                var s = 'static/' + st[i].substring(0, st[i].lastIndexOf('.'))
                logoselect.add(new Option(s, s));
            }
            changeselect()
        })
    })
    readFile('../../texts/metadata.json', (t) => {
        var langs = JSON.parse(t)
        mainLangs = langs
        for (var l in langs) {
            let li = document.createElement('li');
            li.innerHTML = `<a href="#" onclick="return quicklang(this)" data-subtitle="QR code generator">${l}</a>`;
            if (langs[l].rtl) li.firstChild.setAttribute('data-rtl', 1)
            document.getElementById('alllangs').appendChild(li)
            readFile('../../texts/'+l+'/translations.json', (t) => mainLangs[l].subtitle = JSON.parse(t).app.qrgenerator)
        }
    })
}

function quicklang(el) {
    document.getElementById('lang').value = el.innerHTML
    document.getElementById('qrcodegenerator').value = mainLangs[el.innerHTML].subtitle
    document.getElementById("maincanvas").setAttribute('dir',
        el.getAttribute('data-rtl') ? 'rtl' : 'ltr');
    changeselect()
}

const findBestWrap = (text) => {
    const words = text.replace(/[\r\n ]+/g, ' ').trim().split(' ')
    const getLineLength = (t) => parseFloat(getCtx().measureText(t).width);
    const subString = (startIdx, endIdx) => words.slice(startIdx, endIdx + 1).join(' ')

    const findNextLine = (startIdx = 0) => {
        for (var idx in words) {
            var i = parseInt(idx)
            if (i >= startIdx && getLineLength(subString(startIdx, i)) <= getMaxTextWidth()
                && (i === words.length - 1 || getLineLength(subString(startIdx, i + 1)) > getMaxTextWidth()))
                return i + 1
        }
        return null
    }

    const findLinesEnds = (lens = []) => {
        var l = findNextLine(lens.length ? lens[lens.length - 1] : 0)
        if (l === null) return null
        lens.push(l)
        if (l >= words.length ) return lens
        return findLinesEnds(lens)
    }

    var maxfontsize = 70, minfontsize = 35
    var fontSizes = [...Array(maxfontsize-minfontsize+1).keys()].map(i => i + minfontsize).reverse();
    for (var i in fontSizes) {
        setTextFont(fontSizes[i])
        var ends = findLinesEnds()
        if (ends !== null && ends.length <= 4) {
            var rv = []
            for (var j in ends) {
                rv.push(words.slice(j?ends[j-1]:0, ends[j]).join(' '))
            }
            return [rv.join("\n"), fontSizes[i]]
        }
    }

    return [text, minfontsize]

}

function settext(text) {
    const [w, fontsize] = findBestWrap(text)
    document.getElementById('caption').value = w
    document.getElementById('captionsize').value = fontsize
}

function changesize(inc) {
    document.getElementById('captionsize').value = parseInt(document.getElementById('captionsize').value) + inc
    draw()
}