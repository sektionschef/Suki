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
// let PalettiA = ["#193352", "#4a7592", "#97b2c9"];
// let PalettiB = ["#203f63", "#3c5c72", "#7e9eb9"];


class Grid2 {
    constructor(data) {

        this.DEBUG = data.DEBUG;
        this.marginBoxCount = data.marginBoxCount;
        this.shortBoxCount = data.shortBoxCount; // boxes on the shorter side

        this.palette1a = tenPaletter("#8eaebe", 10, 0, 5, 0);
        this.palette2a = tenPaletter("#668392", 10, 0, 10, 0);
        this.palette1b = tenPaletter("#b9be8e", 10, 0, 5, 0);
        this.palette2b = tenPaletter("#669268", 10, 0, 10, 0);

        this.palette3 = tenPaletter("#51a7c2", 10, 0, 10, 0);
        this.palette4 = tenPaletter("#6dccd8", 10, 0, 15, 0);

        this.palette5 = tenPaletter("#5e778f", 10, 0, 10, 0);
        this.palette6 = tenPaletter("#a3bde0", 10, 0, 15, 0);

        this.palette7 = tenPaletter("#393a3b", 10, 0, 10, 0);
        this.palette8 = tenPaletter("#565657", 10, 0, 15, 0);

        this.paletteHorizon1 = triadicCreator("#4c5d6b", 0, -13, -5, 0, 0, 0, 0, 13, 5);
        this.paletteHorizon2 = triadicCreator("#737c81", 0, -13, -5, 0, 0, 5, 0, 13, 5);

        // this.sInc1 = 0.03;
        // this.lInc1 = 0.03;
        // this.zInc1 = 0.03;
        this.sInc1 = 0.002;
        this.lInc1 = 0.04;
        this.zInc1 = 0;

        // this.sInc2 = 0.06;
        // this.lInc2 = 0.04;
        // this.zInc2 = 0.06;
        this.sInc2 = 0.006;
        this.lInc2 = 0.05;
        this.zInc2 = 0;

        this.sInc3 = 0.009;
        this.lInc3 = 0.08;
        this.zInc3 = 0;

        this.sInc4 = 0.008;
        this.lInc4 = 0.06;
        this.zInc4 = 0;

        this.sInc5 = 0.009;
        this.lInc5 = 0.1;
        this.zInc5 = 0;

        this.sInc6 = 0.009;
        this.lInc6 = 0.3;
        this.zInc6 = 0;

        this.sInc7 = 0.002;
        this.lInc7 = 0.2;
        this.zInc7 = 0;

        this.sInc8 = 0.002;
        this.lInc8 = 0.2;
        this.zInc8 = 0;

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
        // this.drawNoise(7);
        // this.drawNoise(8);

        this.drawFirstLoop();
        // this.drawSecondLoop();
        // this.drawThirdLoop();

        // this.drawFourthLoop();

    }

    createBoxes() {

        this.noiseValue1Max = 0;
        this.noiseValue1Min = 0;

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
                var horizon = l == Math.round(this.shortBoxCount / 2);
                var aboveHorizon = l < Math.round(this.shortBoxCount / 2);

                if (noiseValue1 > this.noiseValue1Max) {
                    this.noiseValue1Max = noiseValue1;
                }
                if (noiseValue1 < this.noiseValue1Min) {
                    this.noiseValue1Min = noiseValue1;
                }

                this.boxes.push({
                    "center": center,
                    "offset": createVector(getRandomFromInterval(-10, 10), getRandomFromInterval(-10, 10)),
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
                    "horizon": horizon,
                    "aboveHorizon": aboveHorizon,
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

        // console.log(this.noiseValue1Max);
        // console.log(this.noiseValue1Min);
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
        return box.long < (this.marginBoxCount) || box.short < (this.marginBoxCount) || box.short >= (this.shortBoxCount - this.marginBoxCount) || box.long >= (this.longBoxCount - this.marginBoxCount);
    }

    // for DEBUGGING Noise
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

    drawFirstLoop() {

        let randomIndex = getRandomIndex(this.boxes.length);
        let showTrigger = randomIndex.length / 4 * 3
            ;

        for (var i = 0; i < randomIndex.length; i++) {

            // let offset = getRandomFromInterval(-10, 10);

            if (i == showTrigger) {
                // this.drawShape();
            }

            if (this.drawSkipMargin(this.boxes[i])) {
                continue;
            }

            if (this.boxes[i].aboveHorizon) {
                this.digndag2(
                    {
                        centerX: this.boxes[i].A.x + this.boxes[i].offset.x,
                        centerY: this.boxes[i].A.y + this.boxes[i].offset.y,
                        noiseValueA: this.boxes[i].noiseValue1,
                        noiseValueB: this.boxes[i].noiseValue2,
                        vertexLength: 20,
                        strokeWeighty: 2,
                        // angleMin: -PI / 4,
                        // angleMax: PI / 4,
                        angleMin: -PI / 6,
                        angleMax: PI / 6,
                        revert: true,
                        cutOutValue: 0,
                        loopCount: 10,
                        // colorListA: ["#6192aa", "#4f8aa8", "#3e81a3"],
                        // colorListB: ["#6ca1bb", "#5495b6", "#4590b6"],
                        colorListA: this.palette1a,
                        colorListB: this.palette2a,
                    }
                );
            } else {
                this.digndag2(
                    {
                        centerX: this.boxes[i].A.x + this.boxes[i].offset.x,
                        centerY: this.boxes[i].A.y + this.boxes[i].offset.y,
                        noiseValueA: this.boxes[i].noiseValue1,
                        noiseValueB: this.boxes[i].noiseValue2,
                        vertexLength: 20,
                        strokeWeighty: 2,
                        // angleMin: -PI / 4,
                        // angleMax: PI / 4,
                        angleMin: -PI / 6,
                        angleMax: PI / 6,
                        revert: true,
                        cutOutValue: 0,
                        loopCount: 10,
                        // colorListA: ["#6192aa", "#4f8aa8", "#3e81a3"],
                        // colorListB: ["#6ca1bb", "#5495b6", "#4590b6"],
                        colorListA: this.palette1b,
                        colorListB: this.palette2b,
                    }
                );
            }
        }
    }

    drawSecondLoop() {

        let randomIndex = getRandomIndex(this.boxes.length);

        for (var i = 0; i < randomIndex.length; i++) {

            // let offset = getRandomFromInterval(-10, 10);

            if (this.drawSkipMargin(this.boxes[i])) {
                continue;
            }

            if (this.boxes[i].horizon) {
                this.digndag2(
                    {
                        centerX: this.boxes[i].A.x + this.boxes[i].offset.x,
                        centerY: this.boxes[i].A.y + this.boxes[i].offset.y,
                        noiseValueA: this.boxes[i].noiseValue3,
                        noiseValueB: this.boxes[i].noiseValue4,
                        vertexLength: 10,
                        strokeWeighty: 1,
                        angleMin: PI / 12 * 11,
                        angleMax: PI / 12 * 13,
                        revert: true,
                        cutOutValue: 0,
                        loopCount: 30,
                        colorListA: this.paletteHorizon1,
                        colorListB: this.paletteHorizon2,
                    }
                );
            } else {

                // colorMode(HSB, 100);

                // let brightness = 0;
                // if (this.boxes[i].long < this.shortBoxCount / 2) {
                //     brightness = map(this.boxes[i].long, 0, this.shortBoxCount / 2, 100, 50)
                // } else {
                //     brightness = map(this.boxes[i].long, this.shortBoxCount / 2, this.shortBoxCount, 50, 100)
                // }

                // let colorTest = color(20, 70, brightness);
                // colorMode(RGB);

                this.digndag2(
                    {
                        centerX: this.boxes[i].A.x + this.boxes[i].offset.x,
                        centerY: this.boxes[i].A.y + this.boxes[i].offset.y,
                        noiseValueA: this.boxes[i].noiseValue3,
                        noiseValueB: this.boxes[i].noiseValue4,
                        // vertexLength: 10,
                        vertexLength: map(this.boxes[i].noiseValue3, 0, 1, 5, 10),
                        strokeWeighty: 1,
                        angleMin: PI / 6 * 4,
                        angleMax: PI / 6 * 8,
                        // angleMin: map(this.boxes[i].noiseValue5, 0, 1, 0, -PI),
                        // angleMax: map(this.boxes[i].noiseValue5, 0, 1, 0, PI),
                        revert: true,
                        cutOutValue: 0.5,
                        loopCount: 15,
                        colorListA: this.palette3,
                        colorListB: this.palette4,
                    }
                );
            }
        }
    }

    drawThirdLoop() {

        let randomIndex = getRandomIndex(this.boxes.length);
        let showTrigger = randomIndex.length / 4 * 3;

        for (var i = 0; i < randomIndex.length; i++) {

            // let offset = getRandomFromInterval(-10, 10);

            if (i == showTrigger) {
                // this.drawShape();
            }

            if (this.drawSkipMargin(this.boxes[i])) {
                continue;
            }

            this.digndag2(
                {
                    centerX: this.boxes[i].A.x + this.boxes[i].offset.x,
                    centerY: this.boxes[i].A.y + this.boxes[i].offset.y,
                    noiseValueA: this.boxes[i].noiseValue5,
                    noiseValueB: this.boxes[i].noiseValue6,
                    vertexLength: map(this.boxes[i].noiseValue5, 0, 1, 5, 10), //10,
                    strokeWeighty: 0.5,
                    angleMin: PI / 6,
                    angleMax: PI / 6 * 4,
                    revert: true,
                    cutOutValue: 0.5,
                    loopCount: 10,
                    colorListA: this.palette5,
                    colorListB: this.palette6,
                }
            );
        }
    }

    drawFourthLoop() {

        let randomIndex = getRandomIndex(this.boxes.length);

        for (var i = 0; i < randomIndex.length; i++) {

            // let offset = getRandomFromInterval(-10, 10);

            if (this.drawSkipMargin(this.boxes[i])) {
                continue;
            }

            // if (fxrand() > 0.05) {
            this.digndag2(
                {
                    centerX: this.boxes[i].A.x + this.boxes[i].offset.x,
                    centerY: this.boxes[i].A.y + this.boxes[i].offset.y,
                    noiseValueA: this.boxes[i].noiseValue7,
                    noiseValueB: this.boxes[i].noiseValue8,
                    // vertexLength: 10,
                    vertexLength: map(this.boxes[i].noiseValue7, 0, 1, 5, 15), //10,,
                    strokeWeighty: 0.1,
                    angleMin: PI / 6 * 1,
                    angleMax: PI / 6 * 3,
                    // angleMin: map(this.boxes[i].noiseValue7, 0, 1, -PI, -PI * 1),
                    // angleMax: map(this.boxes[i].noiseValue7, 0, 1, -PI, -PI * 1.8),
                    revert: true,
                    cutOutValue: 0,
                    loopCount: 5,
                    colorListA: this.palette7,
                    colorListB: this.palette8,
                }
            );
            // }
        }
    }

    digndag(centerX, centerY) {
        // let center = createVector(300, 300);
        let center = createVector(centerX, centerY);
        let centerOffset = 0; //50;
        let vertexLength = 5;
        let strokeWeighty = 10;
        let angleMin = -PI / 8;
        let angleMax = PI / 8;
        // let angleMin = -PI / 3;
        // let angleMax = PI / 3;
        let loopCount = 1;
        let jLoopCount = 10;

        let strokeColor = color("#51bbb286");


        for (var j = 0; j < jLoopCount; j++) {

            // offset for center
            let center_ = createVector(center.x + getRandomFromInterval(-centerOffset, centerOffset), center.y + getRandomFromInterval(-centerOffset, centerOffset));
            let strokeColor_ = distortColorSuperNew(strokeColor, 5);

            this.buffer.push();
            this.buffer.noFill();
            this.buffer.strokeWeight(strokeWeighty);
            this.buffer.stroke(strokeColor_);

            this.buffer.beginShape();

            let oldAdder = center_;
            let newAdder = oldAdder;
            this.buffer.vertex(oldAdder.x, oldAdder.y)

            for (var i = 0; i < loopCount; i++) {
                oldAdder = newAdder;

                let angle = getRandomFromInterval(angleMin, angleMax);

                let v = p5.Vector.fromAngle(angle, vertexLength);

                newAdder = p5.Vector.add(oldAdder, v);
                this.buffer.vertex(newAdder.x, newAdder.y);
            }

            this.buffer.endShape();
            this.buffer.pop();
        }

    }

    // centerX, centerY, noiseValueA, noiseValueB, colorListA, colorListB
    digndag2(data) {
        let center = createVector(data.centerX, data.centerY);
        let vertexLength = data.vertexLength;
        let strokeWeighty = data.strokeWeighty;
        let angleMin = data.angleMin;
        let angleMax = data.angleMax;
        let loopCount = data.loopCount;

        let noiseValue = 0;
        let colorList = [];

        // if (data.noiseValueA > 0.5) {
        if (fxrand() > 0.5) {
            noiseValue = data.noiseValueA;
            colorList = data.colorListA;
        } else {
            noiseValue = data.noiseValueB;
            colorList = data.colorListB;
        }

        if (noiseValue > data.cutOutValue) {

            // if (loopSensitive) {
            loopCount = map(noiseValue, 0, 1, 5, 30);
            // }

            // let colorSelect = Math.floor(noiseValue * (colorList.length));
            // let colorSelect = Math.floor(noiseValue * (this.noiseValue1Max - this.noiseValue1Min) + this.noiseValue1Min);
            // let colorSelect = constrain(Math.round(map(noiseValue, this.noiseValue1Min, this.noiseValue1Max, 0, (colorList.length - 1))), 0, (colorList.length - 1));
            let colorSelect = constrain(Math.round(map(noiseValue, 0, 1, 0, (colorList.length - 1))), 0, (colorList.length - 1));
            // console.log(colorSelect);

            // for (var j = 0; j < jLoopCount; j++) {

            // offset for center
            // let center_ = createVector(center.x + getRandomFromInterval(-centerOffset, centerOffset), center.y + getRandomFromInterval(-centerOffset, centerOffset));
            // let strokeColor_ = distortColorSuperNew(strokeColor, 5);

            this.buffer.push();
            this.buffer.noFill();
            this.buffer.strokeWeight(strokeWeighty);
            this.buffer.strokeCap(SQUARE);

            this.buffer.beginShape();

            let oldAdder = center;
            let newAdder = oldAdder;
            let strokeColor = colorList[colorSelect]; // distortColorSuperNew(colorList[colorSelect], 10);
            this.buffer.vertex(oldAdder.x, oldAdder.y)

            for (var i = 0; i < loopCount; i++) {
                oldAdder = newAdder;

                let angle = getRandomFromInterval(angleMin, angleMax);

                // make spots not lines
                if (data.revert) {
                    if (i % 2 != 0) {
                        angle = angle - PI;
                    }
                }

                let v = p5.Vector.fromAngle(angle, vertexLength);

                newAdder = p5.Vector.add(oldAdder, v);
                strokeColor = distortColorSuperNew(colorList[colorSelect], 15);
                this.buffer.stroke(strokeColor);
                this.buffer.vertex(newAdder.x, newAdder.y);
            }

            this.buffer.endShape();
            this.buffer.pop();
            // }

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

    drawShape() {
        // this.buffer.push();
        // this.buffer.noFill();
        // // this.buffer.fill("#ffffff23");
        // this.buffer.stroke(color("white"));
        // this.buffer.strokeWeight(1);
        // this.buffer.beginShape();
        // this.buffer.vertex(110, 110);
        // this.buffer.vertex(190, 110);
        // this.buffer.vertex(160, 160);
        // this.buffer.vertex(110, 140);
        // this.buffer.endShape(CLOSE);
        // this.buffer.pop();

        let min = 10;
        let max = 20;
        let loopCount = 800;

        for (var j = 0; j < loopCount; j++) {
            let center = createVector(getRandomFromInterval(100, width - 100), getRandomFromInterval(100, height - 100));
            let tempColor = PalettiA[Math.round(getRandomFromInterval(0, (PalettiA.length - 1)))];

            // tempColor = color(red(tempColor), green(tempColor), blue(tempColor), 80);

            this.buffer.push();
            this.buffer.noFill();
            // this.buffer.fill(tempColor);
            // this.buffer.stroke(color("white"));
            this.buffer.stroke(tempColor);
            this.buffer.strokeWeight(1);
            // this.buffer.noStroke();

            this.buffer.beginShape();
            this.buffer.vertex(center.x - getRandomFromInterval(min, max), center.y - getRandomFromInterval(min, max));
            this.buffer.vertex(center.x + getRandomFromInterval(min, max), center.y - getRandomFromInterval(min, max));
            this.buffer.vertex(center.x + getRandomFromInterval(min, max), center.y + getRandomFromInterval(min, max));
            this.buffer.vertex(center.x - getRandomFromInterval(min, max), center.y + getRandomFromInterval(min, max));
            this.buffer.endShape(CLOSE);
            this.buffer.pop();
        }
    }

    show() {
        push();
        // blendMode(OVERLAY);
        image(this.buffer, 0, 0);
        pop();
    }
}