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
    document.getElementById('logoimage').src =
        "../media/articles/" + document.getElementById('logoselect').value + "/logo/logo.svg"
}

function addImage(ctx, src) {

    const image = new Image(); // Using optional size for image
    image.onload = function() {
        console.log(this)
        console.log(this.naturalWidth + " , "+this.naturalHeight)
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

    const fileName = document.getElementById('logoselect').value + ".png"

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