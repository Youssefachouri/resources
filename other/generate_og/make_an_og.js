function draw() {
  var canvas = document.getElementById("maincanvas");
  var ctx = canvas.getContext("2d");
  ctx.fillStyle = "#FF0000";
  ctx.fillRect(0, 0, 1200, 625);

  var isarticle = document.getElementById('logoselect').value.startsWith('article');
  var img = isarticle ? document.getElementById("articlebase") : document.getElementById("staticbase");
  ctx.drawImage(img, 0, 0);

  ctx.fillStyle = "#000000";
  ctx.font = "500 "+document.getElementById('captionsize').value+"px Poppins";
  let lines = (document.getElementById('caption').value).split(/\r?\n/)
  let positions = [350.5, 424.5, 498.5, 572.5], basepositions = positions
  if (lines.length === 1) {
      positions = [basepositions[1]]
  } else if (lines.length === 2) {
      positions = [basepositions[0], parseInt((basepositions[0] + basepositions[3])/2)]
  // } else if (lines.length === 3) {
  //     positions = [basepositions[0], parseInt((basepositions[0] + basepositions[3])/2), basepositions[3]]
  }
  //console.log(positions)
  let text_x = isarticle ? 673 : 380
  for (let i in lines) {
    ctx.fillText(lines[i], text_x, positions[i]);
  }
  ctx.fillStyle = "#03949A";

  if (isarticle) {
      ctx.font = "700 25px Poppins";
      ctx.fillText(document.getElementById('qrcodegenerator').value, text_x, 165);
      addImage(ctx, document.getElementById('logoimage').src)
  } else {
      ctx.font = "700 32px Poppins";
      ctx.fillText(document.getElementById('qrcodegenerator').value, text_x, 200);
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

    var isarticle = document.getElementById('logoselect').value.startsWith('article');
    if (isarticle) {
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
}

function quicklang(el) {
    document.getElementById('lang').value = el.innerHTML
    document.getElementById('qrcodegenerator').value = el.getAttribute('data-subtitle')
    changeselect()
}

const formatTextWrap = (text, maxLineLength) => {
    const words = text.replace(/[\r\n]+/g, ' ').split(' ');
    let lineLength = 0;

    // use functional reduce, instead of for loop
    return words.reduce((result, word) => {
        if (lineLength + word.length >= maxLineLength) {
            lineLength = word.length;
            return result + `\n${word}`; // don't add spaces upfront
        } else {
            lineLength += word.length + (result ? 1 : 0);
            return result ? result + ` ${word}` : `${word}`; // add space only when needed
        }
    }, '');
}

const getLineLengths = (wrap) => {
    const lines = wrap.split(/\n/)
    let linelengths = []
    for (let i in lines) {
        linelengths[i] = lines[i].length
    }
    return linelengths
}

const howGoodIsTheWrap = (wrap, textlen) => {
    let w = 100;
    const linelengths = getLineLengths(wrap)
    const maxlength = Math.max(...linelengths)
    const minlength = Math.min(...linelengths)
    const noflines = linelengths.length
    const avglength = linelengths.reduce((partialSum, a) => partialSum + a, 0) / noflines;

    w = w + Math.round((1-minlength/maxlength)*15)
    if (noflines > 4) {
        w = w + (noflines - 4) * 40
    } else {
        var isarticle = document.getElementById('logoselect').value.startsWith('article');
        const opt1 = 8
        const opt2 = isarticle ? 13 : 24
        // Optimum line length is 8-13 chars, lines bigger and smaller should be penalised
        w = w + Math.max(0, avglength - opt2) * 2
        w = w + Math.max(0, opt1 - avglength) * 2
    }
    return w
}

const findBestWrap = (text) => {
    let wraps = []
    //let weights = []
    for (var len=Math.floor(text.length / 4); len < text.length + 1; len++) {
        const w = formatTextWrap(text, len)
        wraps[w] = howGoodIsTheWrap(w)
    }

    var keys = Object.keys(wraps);
    var s = keys.sort(function(a,b){return wraps[a]-wraps[b]});
    return s[0]
}

const findFontSize = (text) => {
    var isarticle = document.getElementById('logoselect').value.startsWith('article');
    var maxwidth = isarticle ? 480 : 740

    var canvas = document.getElementById("maincanvas");
    var ctx = canvas.getContext("2d");

    var maxfontsize = 70, minfontsize = 35
    var fontSizes = [...Array(maxfontsize-minfontsize+1).keys()].map(i => i + minfontsize).reverse();
    ctx.fillStyle = "#000000";

    const findLineSize = (line) => {
        var textDimensions, i = -1;
        do {
            i++
            ctx.font = "500 "+fontSizes[i]+"px Poppins";
            textDimensions = ctx.measureText(line);
        } while (textDimensions.width >= maxwidth && i < fontSizes.length - 1);
        return fontSizes[i]
    }

    const lines = text.split(/\n/)
    const lineFontSizes = lines.map(findLineSize)
    return Math.min(...lineFontSizes)
}

function settext(text) {
    const w = findBestWrap(text)
    document.getElementById('caption').value = w
    document.getElementById('captionsize').value = findFontSize(w)
}

function changesize(inc) {
    document.getElementById('captionsize').value = parseInt(document.getElementById('captionsize').value) + inc
    draw()
}