function draw() {
  var canvas = document.getElementById("maincanvas");
  var ctx = canvas.getContext("2d");
  ctx.fillStyle = "#FF0000";
  ctx.fillRect(0, 0, 1200, 625);

  var img = document.getElementById("articlebase");
  ctx.drawImage(img, 0, 0);

  ctx.fillStyle = "#000000";
  ctx.font = "500 "+document.getElementById('captionsize').value+"px Poppins";
  let lines = (document.getElementById('caption').value+"\n\n\n\n").split(/\r?\n/)
  let positions = [350.5, 424.5, 498.5, 572.5]
  for (let i in positions) {
    ctx.fillText(lines[i], 673, positions[i]);
  }

  ctx.fillStyle = "#03949A";
  ctx.font = "700 25px Poppins";
  ctx.fillText(document.getElementById('qrcodegenerator').value, 673, 165);


    addImage(ctx, document.getElementById('logoimage').src)

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
    
    document.getElementById('logoimage').src =
        "../../media/articles/" + document.getElementById('logoselect').value + "/logo/logo.svg"

    readFile('../../texts/'+lang+'/articles/' + document.getElementById('logoselect').value + '.md', (t) => {
        var firstLine = t.split('\n')[0].replace(/<h1>/i, '').replace(/<[\\/]h1>/i, '');
        settext(firstLine)
        draw()
    })
}

function addImage(ctx, src) {

    const image = new Image(); // Using optional size for image
    image.onload = function() {
        // console.log(this)
        // console.log(this.naturalWidth + " , "+this.naturalHeight)
        
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
    const fileName = document.getElementById('logoselect').value + (lang === '_en' ? '' : lang) + ".png"

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
    //console.log('teststuff')
    //var dirname = (loc) => loc.substring(0, loc.lastIndexOf('/'));
    var basedir = '../../'
    //var file = basedir + '/texts/en/articles/metadata.json'
    //console.log('Metadata file: ' + file);
    
    readFile(basedir + 'texts/en/articles/metadata.json', (t) => {
        var articles = JSON.parse(t)
        var logoselect = document.getElementById('logoselect');
        for (var i in articles) {
            var a = articles[i].substring(0, articles[i].lastIndexOf('.'))
            logoselect.add(new Option(a, a));
        }
        changeselect()
    })
}

function quicklang(el) {
    console.log(el.innerHTML)
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
        const opt1 = 8
        const opt2 = 13
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
        //wraps[len] = w
        //weights[len] = howGoodIsTheWrap(w)
        wraps[w] = howGoodIsTheWrap(w)
    }
    //console.log(wraps)
    //console.log(weights)

    var keys = Object.keys(wraps);
    var s = keys.sort(function(a,b){return wraps[a]-wraps[b]});
    //console.log(s)
    return s[0]
}

function settext(text) {
    // console.log(text)
    // console.log(formatTextWrap(text, 20))
    // console.log(formatTextWrap(text, 5))
    const w = findBestWrap(text)
    const lineslengths = getLineLengths(w), maxlength = Math.max(...lineslengths)
    document.getElementById('caption').value = w
    let sz = 70
    const sizes = {13: 65, 14: 63, 15: 59, 16: 53, 17: 51, 18: 48, 19: 46, 20: 45, 21: 43, 22: 42, 23: 39, 24: 37, 25: 36}
    if (maxlength >= 13 && maxlength <= 25) sz = sizes[maxlength]
    if (maxlength > 25) sz = 35
    // 23 - 39
    // 22 - 43
    // 21 - 45, 41
    // 20 char -> size 45
    // 19 - 47, 46
    // 18 char -> size 46, 50
    // 17 - 51
    // 16 char -> size 53
    // 14 - 59, 65, 64
    // 13 - 67, 60, 66
    // 12 - 70
    console.log("maxlength = "+maxlength)
    document.getElementById('captionsize').value = sz
}

function changesize(inc) {
    document.getElementById('captionsize').value = parseInt(document.getElementById('captionsize').value) + inc
    draw()
}