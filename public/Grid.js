// MARGIN IN BEIDE RICHTUNGEN, X UND Y

// let Paletti = ["#E22030", "#1E3A4B", "#136371", "#00AEAC"];
// let Paletti = [
//     "#001219",
//     "#005F73",
//     "#0A9396",
//     "#94D2BD",
//     "#E9D8A6",
//     "#EE9B00",
//     "#CA6702",  // cool
//     "#BB3E03",
//     "#AE2012",
//     "#9B2226",
//     "#e7e7e7",
// ]
// let Paletti = ["#0d1b2a", "#1b263b", "#415a77", "#778da9", "#e0e1dd"]
let PalettiA = ["#193352", "#4a7592", "#97b2c9"];
let PalettiB = ["#203f63", "#3c5c72", "#7e9eb9"];

class Grid {
    constructor(data) {

        this.DEBUG = false;
        this.paperMargin = SHORTSIDE * 0.05;

        this.shortBoxCount = 80; // 80 boxes on the shorter side
        this.boxSize = SHORTSIDE / this.shortBoxCount;
        this.longBoxCount = Math.floor(LONGSIDE / this.boxSize);

        // there should be no margin
        this.shortMargin = SHORTSIDE % this.boxSize;
        // this.shortMargin = 1
        if (this.shortMargin != 0) {
            throw new Error('wtf, there is a margin!');
        }
        this.longMargin = (LONGSIDE % this.boxSize) / 2;
        // console.log("longMargin: " + this.longMargin);

        if (width < height) {
            this.widthBoxCount = this.shortBoxCount;
            this.heightBoxCount = this.longBoxCount;
            this.widthMargin = this.shortMargin;
            this.heightMargin = this.longMargin;
        } else {
            this.widthBoxCount = this.longBoxCount;
            this.heightBoxCount = this.shortBoxCount;
            this.widthMargin = this.longMargin;
            this.heightMargin = this.shortMargin;
        }

        this.columns = new Set();
        this.rows = new Set();
        this.boxes = [];
        this.stripes = [];
        this.stripeLines = [];

        this.sInc1 = 0.03;
        this.lInc1 = 0.03;
        this.zInc1 = 0.03;

        this.sInc2 = 0.06;
        this.lInc2 = 0.04;
        this.zInc2 = 0.06;

        this.sInc3 = 0.08;
        this.lInc3 = 0.07;
        this.zInc3 = 0.08;

        this.sInc4 = 0.08;
        this.lInc4 = 0.08;
        this.zInc4 = 0.07;

        this.sInc5 = 0.1;
        this.lInc5 = 0.1;
        this.zInc5 = 0.1;

        this.sInc6 = 0.2;
        this.lInc6 = 0.2;
        this.zInc6 = 0.2;

        this.sInc7 = 0.02;
        this.lInc7 = 0.02;
        this.zInc7 = 0.02;

        this.sInc8 = 0.02;
        this.lInc8 = 0.02;
        this.zInc8 = 0.02;

        this.buffer = createGraphics(width, height, SVG);
        this.bufferNoise = createGraphics(width, height, SVG);

        this.createBoxes();
        if (this.DEBUG) {
            this.showDebug();
        }

        // DEBUG NOISE
        // this.drawNoise(1);
        // this.drawNoise(2);
        // this.drawNoise(3);
        // this.drawNoise(4);
        // this.drawNoise(5);
        // this.drawNoise(6);

        // this.drawBase();

        this.drawFourthLoop();
        this.drawFirstLoop();

        // forms
        // this.buffer.push();
        // this.buffer.noFill();
        // this.buffer.stroke(color("white"));
        // this.buffer.strokeWeight(1);
        // this.buffer.beginShape();
        // this.buffer.vertex(110, 110);
        // this.buffer.vertex(190, 110);
        // this.buffer.vertex(160, 160);
        // this.buffer.vertex(110, 140);
        // this.buffer.endShape(CLOSE);
        // this.buffer.pop();

        // STripes
        // this.buffer.push();
        // this.buffer.strokeWeight(0.5);
        // this.buffer.stroke(color("#0e0e0e"));
        // let disty = 10
        // for (var s = 17; s < (500 / disty + 1); s++) {
        //     this.buffer.line(s * disty, getRandomFromInterval(250, 350), s * disty, getRandomFromInterval(450, 550));
        // }
        // this.buffer.pop();

        this.drawSecondLoop();
        this.drawThirdLoop();

    }

    createBoxes() {
        var index = 0;

        let loff1 = 0;
        let zoff1 = 0;
        let loff2 = 0;
        let zoff2 = 0;

        let loff3 = 0;
        let zoff3 = 0;
        let loff4 = 0;
        let zoff4 = 0;

        let loff5 = 0;
        let zoff5 = 0;
        let loff6 = 0;
        let zoff6 = 0;

        let loff7 = 0;
        let zoff7 = 0;
        let loff8 = 0;
        let zoff8 = 0;

        for (var l = 0; l < (this.heightBoxCount); l++) {
            let soff1 = 0;
            let soff2 = 0;
            let soff3 = 0;
            let soff4 = 0;
            let soff5 = 0;
            let soff6 = 0;
            let soff7 = 0;
            let soff8 = 0;
            for (var s = 0; s < (this.widthBoxCount); s++) {

                var center = createVector(this.widthMargin + s * this.boxSize + this.boxSize / 2, this.heightMargin + l * this.boxSize + this.boxSize / 2);

                // corners of the box
                var A = createVector(this.widthMargin + s * this.boxSize, this.heightMargin + l * this.boxSize);
                var B = p5.Vector.add(A, createVector(this.boxSize, 0));
                var C = p5.Vector.add(A, createVector(this.boxSize, this.boxSize));
                var D = p5.Vector.add(A, createVector(0, this.boxSize));

                var noiseValue1 = noise(soff1, loff1, zoff1);
                var noiseValue2 = noise(soff2, loff2, zoff2);
                var noiseValue3 = noise(soff3, loff3, zoff3);
                var noiseValue4 = noise(soff4, loff4, zoff4);
                var noiseValue5 = noise(soff5, loff5, zoff5);
                var noiseValue6 = noise(soff6, loff6, zoff6);
                var noiseValue7 = noise(soff7, loff7, zoff7);
                var noiseValue8 = noise(soff8, loff8, zoff8);

                var polygonA = insidePolygon([center.x, center.y], polyPoints);
                var polygonLeft = insidePolygon([center.x, center.y], polyPointsLeft);

                this.boxes.push({
                    "center": center,
                    "A": A,
                    "B": B,
                    "C": C,
                    "D": D,
                    "long": l,
                    "short": s,
                    "index": index,
                    "mask": false,
                    "noiseValue1": noiseValue1,
                    "noiseValue2": noiseValue2,
                    "noiseValue3": noiseValue3,
                    "noiseValue4": noiseValue4,
                    "noiseValue5": noiseValue5,
                    "noiseValue6": noiseValue6,
                    "noiseValue7": noiseValue7,
                    "noiseValue8": noiseValue8,
                    "polygonA": polygonA,
                    "polygonLeft": polygonLeft,
                })
                index += 1;
                soff1 += this.sInc1;
                soff2 += this.sInc2;
                soff3 += this.sInc3;
                soff4 += this.sInc4;
                soff5 += this.sInc5;
                soff6 += this.sInc6;
                soff7 += this.sInc7;
                soff8 += this.sInc8;
            }
            loff1 += this.lInc1;
            zoff1 += this.zInc1;
            loff2 += this.lInc2;
            zoff2 += this.zInc2;
            loff3 += this.lInc3;
            zoff3 += this.zInc3;
            loff4 += this.lInc4;
            zoff4 += this.zInc4;
            loff5 += this.lInc5;
            zoff5 += this.zInc5;
            loff6 += this.lInc6;
            zoff6 += this.zInc6;
            loff7 += this.lInc7;
            zoff7 += this.zInc7;
            loff8 += this.lInc8;
            zoff8 += this.zInc8;
        }

    }

    showDebug() {
        this.buffer.push();
        this.buffer.noFill();
        this.buffer.strokeWeight(0.1);
        this.buffer.stroke("black");
        this.buffer.rectMode(CORNERS);

        for (var i = 0; i < this.boxes.length; i++) {
            this.buffer.rect(this.boxes[i].A.x, this.boxes[i].A.y, this.boxes[i].C.x, this.boxes[i].C.y);
        }
        this.buffer.pop();
    }

    drawSkipMargin(box) {
        let marginBoxCount = 4

        return box.long < (marginBoxCount + 1) || box.short < (marginBoxCount + 1) || box.short >= (this.shortBoxCount - marginBoxCount) || box.long >= (this.longBoxCount - marginBoxCount);
    }

    drawNoise(number) {

        let noiseValue = "";
        if (number == 1) {
            noiseValue = "noiseValue1";
        } else if (number == 2) {
            noiseValue = "noiseValue2";
        } else if (number == 3) {
            noiseValue = "noiseValue3";
        } else if (number == 4) {
            noiseValue = "noiseValue4";
        } else if (number == 5) {
            noiseValue = "noiseValue5";
        } else {
            noiseValue = "noiseValue6";
        }

        this.buffer.push();
        this.buffer.noStroke();
        this.buffer.rectMode(CORNERS);

        for (var i = 0; i < this.boxes.length; i++) {
            if (this.drawSkipMargin(this.boxes[i])) {
                continue;
            }
            this.buffer.fill(this.boxes[i][noiseValue] * 255);
            this.buffer.rect(this.boxes[i].A.x, this.boxes[i].A.y, this.boxes[i].C.x, this.boxes[i].C.y);
        }
        this.buffer.pop();
    }

    drawBase() {

        this.buffer.push();
        this.buffer.noStroke();
        this.buffer.rectMode(CORNERS);
        let rando = Math.round(getRandomFromInterval(0, (PalettiA.length - 1)));
        this.buffer.fill(PalettiA[rando]);

        for (var i = 0; i < this.boxes.length; i++) {
            if (this.drawSkipMargin(this.boxes[i])) {
                continue;
            }
            this.buffer.rect(this.boxes[i].A.x, this.boxes[i].A.y, this.boxes[i].C.x, this.boxes[i].C.y);
        }
        this.buffer.pop();
    }

    drawFirstLoop() {

        let randomIndex = getRandomIndex(this.boxes.length);

        for (var i = 0; i < randomIndex.length; i++) {

            let offset = getRandomFromInterval(-10, 10);

            if (this.drawSkipMargin(this.boxes[i])) {
                continue;
            }

            // if (this.boxes[i].polygonA) {

            //     this.loopCountParam = 30;
            //     this.vertexLength = 20;
            //     this.strokeSize = 3;
            //     this.angleMin = 0;
            //     this.angleMax = 2 * PI;
            //     this.colorListA = ["#c591a6ff", "#a86781ff", "#c7658cff"];
            //     this.colorListB = ["#c293a6ff", "#c47a98ff", "#be5e85ff"];
            //     this.noiseValueA = this.boxes[i].noiseValue3;
            //     this.noiseValueB = this.boxes[i].noiseValue4;

            // } else if (this.boxes[i].polygonLeft) {

            //     this.loopCountParam = 30;
            //     this.vertexLength = 20;
            //     this.strokeSize = 3;
            //     this.angleMin = 0;
            //     this.angleMax = 2 * PI;
            //     this.colorListA = ["#808f97", "#667b85", "#5f7885"];
            //     this.colorListB = ["#5a717c", "#4b6e81", "#436579"];
            //     this.noiseValueA = this.boxes[i].noiseValue3;
            //     this.noiseValueB = this.boxes[i].noiseValue4;

            // } else {

            this.loopCountParam = 30;
            this.vertexLength = 20;
            this.strokeSize = 3;
            this.angleMin = 0;
            this.angleMax = 2 * PI;
            // this.colorListA = ["#a5afb4", "#8598a1", "#7e939e"];
            // this.colorListB = ["#818a8f", "#728088", "#677a85"];
            this.colorListA = PalettiA; // ["#3D5A80", "#98C1D9", "#E0FBFC", "#EE6C4D", "#293241"];
            this.colorListB = PalettiB; //["#223349", "#7697aa", "#b0c8c9", "#b34f36", "#11151b"];
            this.noiseValueA = this.boxes[i].noiseValue1;
            this.noiseValueB = this.boxes[i].noiseValue2;
            // }

            if (fxrand() > 0.05) {
                this.zigzag(
                    this.boxes[i].A.x + offset,
                    this.boxes[i].A.y + offset,
                    this.noiseValueA,
                    this.noiseValueB,
                    this.loopCountParam,
                    this.vertexLength,
                    this.strokeSize,
                    this.angleMin,
                    this.angleMax,
                    this.colorListA,
                    this.colorListB,
                );
            }
        }
    }

    drawSecondLoop() {

        let randomIndex = getRandomIndex(this.boxes.length);

        for (var i = 0; i < randomIndex.length; i++) {

            let offset = getRandomFromInterval(-5, 5);

            if (this.drawSkipMargin(this.boxes[i])) {
                continue;
            }

            // if (this.boxes[i].polygonA) {

            //     this.loopCountParam = 10;
            //     this.vertexLength = 10;
            //     this.strokeSize = 1;
            //     this.angleMin = PI;
            //     this.angleMax = 2 * PI;
            //     this.colorListA = ["#997080ff", "#b96e8cff", "#914865ff"];
            //     this.colorListB = ["#83606eff", "#92586fff", "#8a415eff"];
            //     this.noiseValueA = this.boxes[i].noiseValue1;
            //     this.noiseValueB = this.boxes[i].noiseValue2;

            // } else if (this.boxes[i].polygonLeft) {

            //     this.loopCountParam = 10;
            //     this.vertexLength = 10;
            //     this.strokeSize = 1;
            //     this.angleMin = PI;
            //     this.angleMax = 2 * PI;
            //     this.colorListA = ["#718792", "#5b6e77", "#4b5b64"];
            //     this.colorListB = ["#39505c", "#4b768b", "#5c7583"];
            //     this.noiseValueA = this.boxes[i].noiseValue3;
            //     this.noiseValueB = this.boxes[i].noiseValue4;

            // } else {

            this.loopCountParam = 20;
            this.vertexLength = 10;
            this.strokeSize = 1;
            this.angleMin = 0;
            this.angleMax = PI;
            // this.colorListA = ["#9ea8ad", "#7e9099", "#6c8592"];
            // this.colorListB = ["#777d81", "#7a8a92", "#586a74"];
            this.colorListA = PalettiA; //["#3D5A80", "#98C1D9", "#E0FBFC", "#EE6C4D", "#293241"];
            this.colorListB = PalettiB; //["#3D5A80", "#98C1D9", "#E0FBFC", "#EE6C4D", "#293241"];
            this.noiseValueA = this.boxes[i].noiseValue3;
            this.noiseValueB = this.boxes[i].noiseValue4;
            // }

            if (fxrand() > 0.05) {
                this.zigzag(
                    this.boxes[i].A.x + offset,
                    this.boxes[i].A.y + offset,
                    this.noiseValueA,
                    this.noiseValueB,
                    this.loopCountParam,
                    this.vertexLength,
                    this.strokeSize,
                    this.angleMin,
                    this.angleMax,
                    this.colorListA,
                    this.colorListB,
                );
            }
        }
    }

    drawThirdLoop() {

        let randomIndex = getRandomIndex(this.boxes.length);

        for (var i = 0; i < randomIndex.length; i++) {

            let offset = getRandomFromInterval(-2, 2);

            if (this.drawSkipMargin(this.boxes[i])) {
                continue;
            }

            // if (this.boxes[i].polygonA) {

            //     this.loopCountParam = 40;
            //     this.vertexLength = 20;
            //     this.strokeSize = 0.2;
            //     this.angleMin = 0;
            //     this.angleMax = PI;
            //     this.colorListA = ["#656c70", "#647881", "#5d7581"];
            //     this.colorListB = ["#494c4e", "#566972", "#435c69"];
            //     this.noiseValueA = this.boxes[i].noiseValue1;
            //     this.noiseValueB = this.boxes[i].noiseValue2;

            // } else if (this.boxes[i].polygonLeft) {

            //     this.loopCountParam = 40;
            //     this.vertexLength = 20;
            //     this.strokeSize = 0.2;
            //     this.angleMin = 0;
            //     this.angleMax = PI;
            //     this.colorListA = ["#2f4149", "#34464e", "#243c4b"];
            //     this.colorListB = ["#535d63", "#41525a", "#41525c"];
            //     this.noiseValueA = this.boxes[i].noiseValue3;
            //     this.noiseValueB = this.boxes[i].noiseValue4;

            // } else {

            this.loopCountParam = 30;
            this.vertexLength = 25;
            this.strokeSize = 0.2;
            this.angleMin = 0;
            this.angleMax = PI;
            // this.colorListA = ["#43525a", "#4b5a61", "#43555f"];
            // this.colorListB = ["#2f393f", "#323c41", "#2d3a41"];
            this.colorListA = ["#293236", "#283033", "#29353b"];
            this.colorListB = ["#191e22", "#191f22", "#192125"];
            // this.colorListA = PalettiA;
            // this.colorListB = PalettiB;
            this.noiseValueA = this.boxes[i].noiseValue5;
            this.noiseValueB = this.boxes[i].noiseValue6;
            // }

            if (fxrand() > 0.05) {
                this.zigzag(
                    this.boxes[i].A.x + offset,
                    this.boxes[i].A.y + offset,
                    this.noiseValueA,
                    this.noiseValueB,
                    this.loopCountParam,
                    this.vertexLength,
                    this.strokeSize,
                    this.angleMin,
                    this.angleMax,
                    this.colorListA,
                    this.colorListB
                );
            }
        }
    }

    drawFourthLoop() {

        let randomIndex = getRandomIndex(this.boxes.length);

        for (var i = 0; i < randomIndex.length; i++) {

            let offset = getRandomFromInterval(-10, 10);

            if (this.drawSkipMargin(this.boxes[i])) {
                continue;
            }

            // if (this.boxes[i].polygonA) {

            //     this.loopCountParam = 30;
            //     this.vertexLength = 20;
            //     this.strokeSize = 3;
            //     this.angleMin = 0;
            //     this.angleMax = 2 * PI;
            //     this.colorListA = ["#c591a6ff", "#a86781ff", "#c7658cff"];
            //     this.colorListB = ["#c293a6ff", "#c47a98ff", "#be5e85ff"];
            //     this.noiseValueA = this.boxes[i].noiseValue3;
            //     this.noiseValueB = this.boxes[i].noiseValue4;

            // } else if (this.boxes[i].polygonLeft) {

            //     this.loopCountParam = 30;
            //     this.vertexLength = 20;
            //     this.strokeSize = 3;
            //     this.angleMin = 0;
            //     this.angleMax = 2 * PI;
            //     this.colorListA = ["#808f97", "#667b85", "#5f7885"];
            //     this.colorListB = ["#5a717c", "#4b6e81", "#436579"];
            //     this.noiseValueA = this.boxes[i].noiseValue3;
            //     this.noiseValueB = this.boxes[i].noiseValue4;

            // } else {

            this.loopCountParam = 30;
            this.vertexLength = 20;
            this.strokeSize = 5;
            this.angleMin = 0;
            this.angleMax = 2 * PI;
            // this.colorListA = ["#a5afb4", "#8598a1", "#7e939e"];
            // this.colorListB = ["#818a8f", "#728088", "#677a85"];
            this.colorListA = PalettiA; // ["#3D5A80", "#98C1D9", "#E0FBFC", "#EE6C4D", "#293241"];
            this.colorListB = PalettiB; //["#223349", "#7697aa", "#b0c8c9", "#b34f36", "#11151b"];
            this.noiseValueA = this.boxes[i].noiseValue7;
            this.noiseValueB = this.boxes[i].noiseValue8;
            // }

            if (fxrand() > 0.05) {
                this.zigzag(
                    this.boxes[i].A.x + offset,
                    this.boxes[i].A.y + offset,
                    this.noiseValueA,
                    this.noiseValueB,
                    this.loopCountParam,
                    this.vertexLength,
                    this.strokeSize,
                    this.angleMin,
                    this.angleMax,
                    this.colorListA,
                    this.colorListB,
                );
            }
        }
    }

    zigzag(centerX, centerY, noiseValueA, noiseValueB, loopCountParam, vertexLength, strokeSize, angleMin, angleMax, colorListA, colorListB) {

        let noiseValue = 0;
        let colorList = [];

        if (noiseValueA >= 0.5 && fxrand() > 0.2) {
            noiseValue = noiseValueA;
            colorList = colorListA;
        } else {
            noiseValue = noiseValueB;
            colorList = colorListB;
        }

        let center = createVector(centerX, centerY);

        this.buffer.push();
        this.buffer.noFill();
        this.buffer.strokeWeight(strokeSize);

        let colorSelect = Math.floor(noiseValue * (colorList.length));
        this.buffer.beginShape();

        for (var i = 0; i < noiseValue * loopCountParam; i++) {
            // for (var i = 0; i < loopCountParam; i++) {

            let strokeColor = distortColorSuperNew(colorList[colorSelect], 10);
            this.buffer.stroke(strokeColor);

            // let angle = 0;
            // if (fxrand() > 0.5) {
            let angle = getRandomFromInterval(angleMin, angleMax);
            // } else {
            // angle = getRandomFromInterval(0, PI * 2 * noiseValue);;
            // }

            let v = p5.Vector.fromAngle(angle);
            v.setMag(noiseValue * vertexLength);

            let adder = p5.Vector.add(center, v);
            this.buffer.vertex(adder.x, adder.y);
        }

        this.buffer.endShape();
        this.buffer.pop();
    }

    show() {
        push();
        // blendMode(OVERLAY);
        image(this.buffer, 0, 0);
        pop();
    }
}