const NOISESEED = hashFnv32a(fxhash);

let BULK = false;  // bulk export images
// let ANIMATIONSTATE = true;
// let ALLDONE = false;

let canvas;
// let rescaling_width;
// let rescaling_height;

let TITLE = "afraid to fry";
let ARTIST = "Stefan Schwaha, @sektionschef";
let DESCRIPTION = "Javascript on html canvas";
let URL = "https://digitalitility.com";
let YEAR = "2023";
let PRICE = "ꜩ 4";
let EDITIONS = "100 editions";

let STATE = "cool";
let SWITCH = false;

let CURRENTPIXELDENS = 1;

function preload() {

  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);

  setSpartaHTML();
  setTagsHTML();

  if (urlParams.has('senza')) {
    if (urlParams.get("senza") === "true") {
      addStyleSheet("styles_senza.css");
    } else {
      addStyleSheet("styles.css");
    }
  } else {
    addStyleSheet("styles.css");
  }

  //   // if (urlParams.has('infinity')) {
  //   //   INFINITYSTRING = urlParams.get('infinity');
  //   //   INFINITY = (INFINITYSTRING === 'true');
  //   // }
  //   // console.log("INFINITY: " + INFINITY);

  //   // if (urlParams.has('animated')) {
  //   //     if (urlParams.get("animated") === "false") {
  //   //         ANIMATIONSTATE = false;
  //   //     }
  //   // }

  //   if (urlParams.has('res')) {
  //     CURRENTPIXELDENS = +urlParams.get("res");
  //   }
  //   console.log("resolution: " + CURRENTPIXELDENS + "x");
}

function setup() {

  noiseSeed(NOISESEED);
  randomSeed(NOISESEED);

  canvasFormats = [
    // {
    //   "name": "1:1",
    //   "canvasWidth": 800,
    //   "canvasHeight": 800,
    // },
    {
      "name": "16:9",
      "canvasWidth": 1600,
      "canvasHeight": 900,
    },
  ]

  canvasFormatChosen = getRandomFromList(canvasFormats);
  // console.log("Canvas Format: " + canvasFormatChosen.name);

  rescaling_width = canvasFormatChosen.canvasWidth;
  rescaling_height = canvasFormatChosen.canvasHeight;

  if (rescaling_width <= rescaling_height) {
    SHORTSIDE = rescaling_width;
    LONGSIDE = rescaling_height;
  } else {
    SHORTSIDE = rescaling_height;
    LONGSIDE = rescaling_width;
  }
  // TOTALPIXEL = rescaling_width * rescaling_height;

  // canvas = createCanvas(rescaling_width, rescaling_height);
  canvas = createCanvas(rescaling_width, rescaling_height, SVG);
  canvas.id('badAssCanvas');

  if (document.getElementById('centerDiv')) {
    canvas.parent("centerDiv");
  } else {
    canvas.parent("canvasHolderPlain");
  }


  polyPoints = [
    [0, height / 6],
    [width / 7 * 5, height / 4],
    [width / 7 * 5, height / 4 * 3],
    [0, height / 6 * 5]
  ];

  polyPointsLeft = [
    [0, 0],
    [width / 7 * 3, 0],
    [width / 7 * 3, height],
    [0, height]
  ];


  grid2 = new Grid2({
    marginBoxCount: 5,  // 5
    shortBoxCount: 80,
    DEBUG: false,
  });


  //   // FEATURES
  //   window.$fxhashFeatures = {
  //     "Format": canvasFormatChosen.name,
  //     "Palette": PALETTE_LABEL,
  //     "Stripe Orientation": gridProfile.stripeOrientation,
  //     "Column/Row count": gridProfile.countColumnOrRow,
  //     "Stripe spacing": gridProfile.spacing,
  //     "Edge fuzzyness": gridProfile.bezierFactor,
  //     "Brush Type": patternProfileX.brushType,
  //     // "Brush Count": patternProfileX.brushCount,
  //     // "Brush target movement": patternProfileX.targetBdistList,
  //     // "Brush target direction": patternProfileX.targetBDirectionList,
  //     // "Noise increment": patternProfileX.noiseIncrement,
  //     // "Pattern loop level": gridProfile.whichLoopLevel,
  //     // "Overlay": patternProfileX.OVERLAY,
  //     // "Brush Min speed": patternProfileX.maxSpeedMin,
  //     // "Brush Max speed": patternProfileX.maxSpeedMax,
  //   }

  //   console.log(window.$fxhashFeatures);

  // reloader();

  // DUMMY
  // oida = 1;
}


function draw() {

  if (frameCount == 1) {
    pixelDensity(CURRENTPIXELDENS);
  }

  // background(color("#e8ecee"));
  background(color("#ffffff"));

  grid2.show();

  if (grid2.finished) {
    console.log("finished");
    fxpreview();
    noLoop();
  }

  // DUMMY
  // ellipse(oida, 50, 30);
  // oida += 10;

  //   // DEBUG
  //   // showFxhashFeatures();

  // if (grid2.finished) {
  //   console.log("finished");
  //   fxpreview();
  //   noLoop();
  // }

  //   if (BULK) {
  //     exportCanvas(canvas);
  //   }

}


if (BULK) {
  setTimeout(reloader, 30000)
}

function timeChecker() {

  let switchHour = 21;
  let switchMinute = 18;

  var today = new Date();
  // var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  // console.log(time);

  if (today.getHours() >= switchHour && today.getMinutes() >= switchMinute) {
    // return true;
    if (STATE == "cool") {
      STATE = "hot";
      grid2.finished = false;
      loop();
    }
  } else {
    if (STATE == "hot") {
      STATE = "cool";
      grid2.finished = false;
      loop();
    }
  }
}

function reloader() {
  while (true) {
    timeChecker();
  }
}

function mousePressed() {
  console.log("trigger");

  grid2 = new Grid2({
    marginBoxCount: 5,  // 5
    shortBoxCount: 80,
    DEBUG: false,
  });

  // grid2.finished = false;
  loop();
}