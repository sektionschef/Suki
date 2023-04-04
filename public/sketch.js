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
    //   "name": "4:3",
    //   "canvasWidth": 4000,
    //   "canvasHeight": 3000,
    // },
    // {
    //   "name": "3:4",
    //   "canvasWidth": 3000,
    //   "canvasHeight": 4000,
    // },
    // {
    //   "name": "16:9",
    //   "canvasWidth": 3840,
    //   "canvasHeight": 2160,
    // },
    // {
    //   "name": "9:16",
    //   "canvasWidth": 2160,
    //   "canvasHeight": 3840,
    // },
    // {
    //   "name": "1:1",
    //   "canvasWidth": 4000,
    //   "canvasHeight": 4000,
    // },
    // {
    //   "name": "3:2",
    //   "canvasWidth": 3000,
    //   "canvasHeight": 2000,
    // },
    // {
    //   "name": "2:3",
    //   "canvasWidth": 2000,
    //   "canvasHeight": 3000,
    // }
    {
      "name": "1:1",
      "canvasWidth": 800,
      "canvasHeight": 800,
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
  TOTALPIXEL = rescaling_width * rescaling_height;

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

  gridProfile = {
    // stripeOrientation: getRandomFromList(["x", "y"]),
    // countColumnOrRow: getRandomFromList([1, 2, 3, 4]),
    // bezierFactor: getRandomFromList([0.001, 0.005, 0.007]),
    // thickness: 1,
    // spacing: getRandomFromList([1, 2, 3]),
    // // pattern: new BrushstrokeSystem(patternProfileX),
    // // pattern2: new BrushstrokeSystem(patternProfileY),
    // backgroundNoise: new Noise(),
    // whichLoopLevel: getRandomFromList(["last", "secondlast", "thirdlast"]),
  }

  // grid = new Grid(gridProfile);
  grid2 = new Grid2({
    marginBoxCount: 5,
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

}


function draw() {

  if (frameCount == 1) {
    pixelDensity(CURRENTPIXELDENS);
  }

  background(color("#dfe7eb"));
  // background(color("#4f8aa8"));

  // STRIPES
  // push();
  // strokeWeight(0.5);
  // stroke(color("#4e4e4e"));
  // let disty = 10
  // for (var s = 0; s < (width / disty + 1); s++) {
  //   line(s * disty, 0, s * disty, height);
  // }
  // pop();


  // grid.show();
  grid2.show()


  //   // DEBUG
  //   // showFxhashFeatures();

  fxpreview();
  noLoop();

  //   if (BULK) {
  //     exportCanvas(canvas);
  //   }
}

function mousePressed() {
}


if (BULK) {
  setTimeout(reloader, 30000)
}
