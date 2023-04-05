// MARGIN IN BEIDE RICHTUNGEN, X UND Y


class Grid2 {
    constructor(data) {

        this.horizonRatio = 1 / 7 * 4;

        this.DEBUG = data.DEBUG;
        this.marginBoxCount = data.marginBoxCount;
        this.shortBoxCount = data.shortBoxCount; // boxes on the shorter side

        this.horizonRow = Math.round(this.shortBoxCount * this.horizonRatio);


        this.paletteBackgrounda = color("#a2c1ca");
        this.paletteBackgroundb = color("#5b7466");

        this.shapeColor = color("#617580");

        // cool but strong colors
        // this.palette1a = tenPaletter("#6dc5dd", 10, 5, 5, 0);
        // this.palette2a = tenPaletter("#a0cae2", 10, 5, 10, 0);
        this.palette1a = tenPaletter("#b0bcc2", 20, 4, 2, 3);
        this.palette2a = tenPaletter("#9cb0bd", 20, 4, 2, 3);
        this.palette1b = tenPaletter("#91aa97", 20, 4, 2, 3);
        this.palette2b = tenPaletter("#7e978a", 20, 4, 2, 3);

        this.palette3a = tenPaletter("#7da4b1", 10, 5, 5, 5);
        this.palette4a = tenPaletter("#9ac3da", 10, 5, 5, 5);
        this.palette3b = tenPaletter("#a7d7df", 10, 5, 5, 5);
        this.palette4b = tenPaletter("#92a7b8", 10, 5, 5, 5);

        this.palette5a = tenPaletter("#95aeb9", 10, 5, 5, 5);
        this.palette6a = tenPaletter("#acc0d1", 10, 5, 5, 5);
        this.palette5b = tenPaletter("#8aac92", 10, 5, 5, 5);
        this.palette6b = tenPaletter("#a6cfb7", 10, 5, 5, 5);

        this.palette7a = tenPaletter("#677e91", 10, 1, 10, 1);
        this.palette8a = tenPaletter("#8ba382", 10, 1, 10, 1);
        this.palette7b = tenPaletter("#6a7a60", 10, 1, 10, 1);
        this.palette8b = tenPaletter("#707a7c", 10, 1, 10, 1);

        this.palette9a = tenPaletter("#789cb3", 5, 1, 10, 1);
        this.palette10a = tenPaletter("#88aaa4", 5, 1, 10, 1);
        this.palette9b = tenPaletter("#606b69", 5, 1, 10, 1);
        this.palette10b = tenPaletter("#5e707c", 5, 1, 10, 1);

        this.paletteHorizon1 = tenPaletter("#61666e", 5, 1, 10, 1); // triadicCreator("#e4eef7", 0, -13, -5, 0, 0, 0, 0, 13, 5);
        this.paletteHorizon2 = tenPaletter("#808394", 5, 1, 10, 1); // triadicCreator("#bcc7cc", 0, -13, -5, 0, 0, 5, 0, 13, 5);

        this.sInc1 = 0.3;
        this.lInc1 = 0.5;
        this.zInc1 = 0;

        this.sInc2 = 0.06;
        this.lInc2 = 0.06;
        this.zInc2 = 0;

        this.sInc3 = 0.6;
        this.lInc3 = 0.4;
        this.zInc3 = 0;

        this.sInc4 = 0.7;
        this.lInc4 = 0.8;
        this.zInc4 = 0;

        this.sInc5 = 0.01;
        this.lInc5 = 0.2;
        this.zInc5 = 0;

        this.sInc6 = 0.02;
        this.lInc6 = 0.3;
        this.zInc6 = 0;

        this.sInc7 = 0.02;
        this.lInc7 = 0.2;
        this.zInc7 = 0;

        this.sInc8 = 0.02;
        this.lInc8 = 0.2;
        this.zInc8 = 0;

        this.sInc9 = 0.1;
        this.lInc9 = 0.6;
        this.zInc9 = 0;

        this.sInc10 = 0.1;
        this.lInc10 = 0.9;
        this.zInc10 = 0;

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
        // this.drawNoise(9);
        // this.drawNoise(10);

        // LAYER
        // this.drawBackdrop();

        this.drawFirstLoop();

        // this.drawShape();

        this.drawSecondLoop();
        this.drawThirdLoop();


        this.drawFourthLoop();
    }

    createBoxes() {

        this.noiseValue1Max = 0;
        this.noiseValue1Min = 1;
        this.noiseValue2Max = 0;
        this.noiseValue2Min = 1;
        this.noiseValue3Max = 0;
        this.noiseValue3Min = 1;
        this.noiseValue4Max = 0;
        this.noiseValue4Min = 1;
        this.noiseValue5Max = 0;
        this.noiseValue5Min = 1;
        this.noiseValue6Max = 0;
        this.noiseValue6Min = 1;
        this.noiseValue7Max = 0;
        this.noiseValue7Min = 1;
        this.noiseValue8Max = 0;
        this.noiseValue8Min = 1;
        this.noiseValue9Max = 0;
        this.noiseValue9Min = 1;
        this.noiseValue10Max = 0;
        this.noiseValue10Min = 1;

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

        let loff9 = 0;
        let zoff9 = 0;
        let loff10 = 0;
        let zoff10 = 0;

        // console.log(this.heightBoxCount);
        // console.log(this.widthBoxCount);

        // h = long, w = short

        for (var h = 0; h < (this.heightBoxCount); h++) {
            let soff1 = 0;
            let soff2 = 0;
            let soff3 = 0;
            let soff4 = 0;
            let soff5 = 0;
            let soff6 = 0;
            let soff7 = 0;
            let soff8 = 0;
            let soff9 = 0;
            let soff10 = 0;
            for (var w = 0; w < (this.widthBoxCount); w++) {

                var center = createVector(this.widthMargin + w * this.boxSize + this.boxSize / 2, this.heightMargin + h * this.boxSize + this.boxSize / 2);

                // corners of the box
                var A = createVector(this.widthMargin + w * this.boxSize, this.heightMargin + h * this.boxSize);
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
                var noiseValue9 = noise(soff9, loff9, zoff9);
                var noiseValue10 = noise(soff10, loff10, zoff10);

                var polygonA = insidePolygon([center.x, center.y], polyPoints);
                var polygonLeft = insidePolygon([center.x, center.y], polyPointsLeft);

                var horizon = h == this.horizonRow;
                var aboveHorizon = h <= this.horizonRow;

                if (noiseValue1 > this.noiseValue1Max) {
                    this.noiseValue1Max = noiseValue1;
                }
                if (noiseValue1 < this.noiseValue1Min) {
                    this.noiseValue1Min = noiseValue1;
                }
                if (noiseValue2 > this.noiseValue2Max) {
                    this.noiseValue2Max = noiseValue2;
                }
                if (noiseValue2 < this.noiseValue2Min) {
                    this.noiseValue2Min = noiseValue2;
                }
                if (noiseValue3 > this.noiseValue3Max) {
                    this.noiseValue3Max = noiseValue3;
                }
                if (noiseValue3 < this.noiseValue3Min) {
                    this.noiseValue3Min = noiseValue3;
                }
                if (noiseValue4 > this.noiseValue4Max) {
                    this.noiseValue4Max = noiseValue4;
                }
                if (noiseValue4 < this.noiseValue4Min) {
                    this.noiseValue4Min = noiseValue4;
                }
                if (noiseValue5 > this.noiseValue5Max) {
                    this.noiseValue5Max = noiseValue5;
                }
                if (noiseValue5 < this.noiseValue5Min) {
                    this.noiseValue5Min = noiseValue5;
                }
                if (noiseValue6 > this.noiseValue6Max) {
                    this.noiseValue6Max = noiseValue6;
                }
                if (noiseValue6 < this.noiseValue6Min) {
                    this.noiseValue6Min = noiseValue6;
                }
                if (noiseValue7 > this.noiseValue7Max) {
                    this.noiseValue7Max = noiseValue7;
                }
                if (noiseValue7 < this.noiseValue7Min) {
                    this.noiseValue7Min = noiseValue7;
                }
                if (noiseValue8 > this.noiseValue8Max) {
                    this.noiseValue8Max = noiseValue8;
                }
                if (noiseValue8 < this.noiseValue8Min) {
                    this.noiseValue8Min = noiseValue8;
                }
                if (noiseValue9 > this.noiseValue9Max) {
                    this.noiseValue9Max = noiseValue9;
                }
                if (noiseValue9 < this.noiseValue9Min) {
                    this.noiseValue9Min = noiseValue9;
                }
                if (noiseValue10 > this.noiseValue10Max) {
                    this.noiseValue10Max = noiseValue10;
                }
                if (noiseValue10 < this.noiseValue10Min) {
                    this.noiseValue10Min = noiseValue10;
                }

                this.boxes.push({
                    "center": center,
                    "offset": createVector(getRandomFromInterval(-10, 10), getRandomFromInterval(-10, 10)),
                    "A": A,
                    "B": B,
                    "C": C,
                    "D": D,
                    "height": h,
                    "width": w,
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
                    "noiseValue9": noiseValue9,
                    "noiseValue10": noiseValue10,
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
                soff9 += this.sInc9;
                soff10 += this.sInc10;
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
            loff9 += this.lInc9;
            zoff9 += this.zInc9;
            loff10 += this.lInc10;
            zoff10 += this.zInc10;
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
            // this.buffer.point(this.boxes[i].center.x, this.boxes[i].center.y);
        }
        this.buffer.pop();
    }

    drawSkipMargin(box) {
        if (width < height) {
            return box.height < (this.marginBoxCount) ||
                box.width < (this.marginBoxCount) ||
                box.width >= (this.shortBoxCount - this.marginBoxCount) ||
                box.height >= (this.longBoxCount - this.marginBoxCount);
        } else {
            return box.height < (this.marginBoxCount) ||
                box.width < (this.marginBoxCount) ||
                box.width >= (this.longBoxCount - this.marginBoxCount) ||
                box.height >= (this.shortBoxCount - this.marginBoxCount);
        }
    }

    // for DEBUGGING Noise
    drawNoise(number) {

        let noiseVars = this.getNoiseVars(number);
        // console.log(noiseVars.noiseValueName);
        // console.log(noiseVars.noiseValueMin);
        // console.log(noiseVars.noiseValueMax);

        this.buffer.push();
        this.buffer.noStroke();
        this.buffer.rectMode(CORNERS);

        for (var i = 0; i < this.boxes.length; i++) {
            if (this.drawSkipMargin(this.boxes[i])) {
                continue;
            }

            let noiseValueLoop = this.boxes[i][noiseVars.noiseValueName];
            // let noiseValueNorm = map(noiseValueLoop, noiseVars.noiseValueMin, noiseVars.noiseValueMax, 0, 1);
            let noiseValueColor = Math.round(map(noiseValueLoop, noiseVars.noiseValueMin, noiseVars.noiseValueMax, 0, 255));

            // console.log(noiseValueColor);
            this.buffer.fill(noiseValueColor);

            // this.buffer.fill("red");
            this.buffer.rect(this.boxes[i].A.x, this.boxes[i].A.y, this.boxes[i].C.x, this.boxes[i].C.y);
        }
        this.buffer.pop();
    }

    drawBackdrop() {

        // this.horizonRow

        this.buffer.push();
        this.buffer.noStroke();
        this.buffer.fill(this.paletteBackgrounda)
        this.buffer.rect(0, 0, this.buffer.width, this.buffer.height * this.horizonRatio);
        this.buffer.pop();

        this.buffer.push();
        this.buffer.noStroke();
        this.buffer.fill(this.paletteBackgroundb)
        this.buffer.rect(0, this.buffer.height * this.horizonRatio, this.buffer.width, this.buffer.height * this.horizonRatio);
        this.buffer.pop();
    }

    drawFirstLoop() {

        let randomIndex = getRandomIndex(this.boxes.length);
        // let showTrigger = randomIndex.length / 4 * 3;

        let i = 0;

        for (var v = 0; v < randomIndex.length; v++) {

            i = randomIndex[v];

            // let offset = getRandomFromInterval(-10, 10);

            // if (i == showTrigger) {
            // this.drawShape();
            // }

            if (this.drawSkipMargin(this.boxes[i])) {
                continue;
            }

            if (this.boxes[i].horizon) {
                this.digndag2(
                    {
                        centerX: this.boxes[i].A.x + this.boxes[i].offset.x,
                        centerY: this.boxes[i].A.y + this.boxes[i].offset.y,
                        noiseNumberA: 3,
                        noiseNumberB: 4,
                        noiseValueA: this.boxes[i].noiseValue3,
                        noiseValueB: this.boxes[i].noiseValue4,
                        vertexLength: map(this.boxes[i].noiseValue1, this.noiseValue1Min, this.noiseValue1Max, 20, 50), // 15,
                        strokeWeighty: 2,
                        angleMin: 2 * PI / 12 * 8.5,
                        angleMax: 2 * PI / 12 * 9.5,
                        revert: true,
                        blendNoises: 0.5,
                        cutOutValue: 0,
                        loopCount: map(this.boxes[i].noiseValue2, this.noiseValue2Min, this.noiseValue2Max, 10, 30), // 20,
                        colorListA: this.paletteHorizon1,
                        colorListB: this.paletteHorizon2,
                        noiseAngle: false,
                        normIt: true,
                    }
                );
            } else if (this.boxes[i].aboveHorizon) {
                this.digndag2(
                    {
                        centerX: this.boxes[i].A.x + this.boxes[i].offset.x,
                        centerY: this.boxes[i].A.y + this.boxes[i].offset.y,
                        noiseNumberA: 1,
                        noiseNumberB: 2,
                        noiseValueA: this.boxes[i].noiseValue1,
                        noiseValueB: this.boxes[i].noiseValue2,
                        vertexLength: map(this.boxes[i].noiseValue1, this.noiseValue1Min, this.noiseValue1Max, 20, 50), // 15,
                        strokeWeighty: map(this.boxes[i].noiseValue1, this.noiseValue1Min, this.noiseValue1Max, 1, 2), // 1,
                        // angleMin: 0,
                        // angleMax: 2 * PI,
                        angleMin: 2 * PI / 12 * 11.5,
                        angleMax: 2 * PI / 12 * 12.5,
                        revert: true,
                        blendNoises: 0.5,
                        cutOutValue: 0,
                        loopCount: map(this.boxes[i].noiseValue2, this.noiseValue2Min, this.noiseValue2Max, 10, 30), // 20,
                        colorListA: this.palette1a,
                        colorListB: this.palette2a,
                        noiseAngle: false,
                        normIt: true,
                    }
                );
            } else {
                this.digndag2(
                    {
                        centerX: this.boxes[i].A.x + this.boxes[i].offset.x,
                        centerY: this.boxes[i].A.y + this.boxes[i].offset.y,
                        noiseNumberA: 1,
                        noiseNumberB: 2,
                        noiseValueA: this.boxes[i].noiseValue1,
                        noiseValueB: this.boxes[i].noiseValue2,
                        vertexLength: map(this.boxes[i].noiseValue1, this.noiseValue1Min, this.noiseValue1Max, 20, 50), // 15,
                        strokeWeighty: map(this.boxes[i].noiseValue1, this.noiseValue1Min, this.noiseValue1Max, 1, 2), // 1,
                        angleMin: 2 * PI / 12 * 11.5,
                        angleMax: 2 * PI / 12 * 12.5,
                        // angleMin: 0,
                        // angleMax: 2 * PI,
                        revert: true,
                        blendNoises: 0.5,
                        cutOutValue: 0,
                        loopCount: map(this.boxes[i].noiseValue2, this.noiseValue2Min, this.noiseValue2Max, 10, 30), // 20,
                        colorListA: this.palette1b,
                        colorListB: this.palette2b,
                        noiseAngle: false,
                        normIt: true,
                    }
                );
            }
        }
    }

    drawSecondLoop() {

        let randomIndex = getRandomIndex(this.boxes.length);

        let i = 0;

        for (var v = 0; v < randomIndex.length; v++) {

            i = randomIndex[v];
            // let offset = getRandomFromInterval(-10, 10);

            // if (i == showTrigger) {
            // this.drawShape();
            // }

            if (this.drawSkipMargin(this.boxes[i])) {
                continue;
            }

            if (this.boxes[i].horizon) {
                this.digndag2(
                    {
                        centerX: this.boxes[i].A.x + this.boxes[i].offset.x,
                        centerY: this.boxes[i].A.y + this.boxes[i].offset.y,
                        noiseNumberA: 3,
                        noiseNumberB: 4,
                        noiseValueA: this.boxes[i].noiseValue3,
                        noiseValueB: this.boxes[i].noiseValue4,
                        vertexLength: map(this.boxes[i].noiseValue3, this.noiseValue3Min, this.noiseValue3Max, 5, 20), // 15,
                        strokeWeighty: map(this.boxes[i].noiseValue3, this.noiseValue3Min, this.noiseValue3Max, 0.2, 1), // 1,
                        angleMin: 2 * PI / 12 * 8.5,
                        angleMax: 2 * PI / 12 * 9.5,
                        revert: true,
                        blendNoises: 0.5,
                        cutOutValue: 0,
                        loopCount: 20,
                        colorListA: this.paletteHorizon1,
                        colorListB: this.paletteHorizon2,
                        noiseAngle: false,
                        normIt: true,
                    }
                );

            } else if (this.boxes[i].aboveHorizon) {


                this.digndag2(
                    {
                        centerX: this.boxes[i].A.x + this.boxes[i].offset.x,
                        centerY: this.boxes[i].A.y + this.boxes[i].offset.y,
                        noiseNumberA: 3,
                        noiseNumberB: 4,
                        noiseValueA: this.boxes[i].noiseValue3,
                        noiseValueB: this.boxes[i].noiseValue4,
                        // vertexLength: 5,
                        vertexLength: map(this.boxes[i].noiseValue3, this.noiseValue3Min, this.noiseValue3Max, 3, 15),
                        strokeWeighty: map(this.boxes[i].noiseValue3, this.noiseValue3Min, this.noiseValue3Max, 0.2, 1.5), // 0.5,
                        angleMin: 2 * PI / 12 * 4,
                        angleMax: 2 * PI / 12 * 6,
                        // angleMin: map(this.boxes[i].noiseValue5, 0, 1, 0, -PI),
                        // angleMax: map(this.boxes[i].noiseValue5, 0, 1, 0, PI),
                        revert: true,
                        blendNoises: 0.5,
                        cutOutValue: 0.5,
                        loopCount: map(this.boxes[i].noiseValue3, this.noiseValue3Min, this.noiseValue3Max, 3, 20), // 10,
                        colorListA: this.palette1a, // 3
                        colorListB: this.palette2a,  // 4
                        noiseAngle: false,
                        normIt: true,
                    }
                );

            } else {

                this.digndag2(
                    {
                        centerX: this.boxes[i].A.x + this.boxes[i].offset.x,
                        centerY: this.boxes[i].A.y + this.boxes[i].offset.y,
                        noiseNumberA: 3,
                        noiseNumberB: 4,
                        noiseValueA: this.boxes[i].noiseValue3,
                        noiseValueB: this.boxes[i].noiseValue4,
                        vertexLength: map(this.boxes[i].noiseValue3, this.noiseValue3Min, this.noiseValue3Max, 3, 15),
                        strokeWeighty: map(this.boxes[i].noiseValue4, this.noiseValue4Min, this.noiseValue4Max, 0.2, 1.5), // 0.5,
                        angleMin: 2 * PI / 12 * 4,
                        angleMax: 2 * PI / 12 * 6,
                        // angleMin: map(this.boxes[i].noiseValue5, 0, 1, 0, -PI),
                        // angleMax: map(this.boxes[i].noiseValue5, 0, 1, 0, PI),
                        revert: true,
                        blendNoises: 0.5,
                        cutOutValue: 0.5,
                        loopCount: map(this.boxes[i].noiseValue4, this.noiseValue4Min, this.noiseValue4Max, 3, 20), //10,
                        colorListA: this.palette1b,
                        colorListB: this.palette2b,
                        noiseAngle: false,
                        normIt: true,
                    }
                );
            }

            // big but sparse
            if (this.boxes[i].aboveHorizon) {

                this.digndag2(
                    {
                        centerX: this.boxes[i].A.x + this.boxes[i].offset.x,
                        centerY: this.boxes[i].A.y + this.boxes[i].offset.y,
                        noiseNumberA: 9,
                        noiseNumberB: 10,
                        noiseValueA: this.boxes[i].noiseValue9,
                        noiseValueB: this.boxes[i].noiseValue10,
                        vertexLength: map(this.boxes[i].noiseValue9, this.noiseValue9Min, this.noiseValue9Max, 1, 15),
                        strokeWeighty: map(this.boxes[i].noiseValue9, this.noiseValue9Min, this.noiseValue9Max, 0.3, 0.8),//0.5,
                        angleMin: 2 * PI / 12 * 9,
                        angleMax: 2 * PI / 12 * 11,
                        revert: true,
                        blendNoises: 0,
                        cutOutValue: 0.7,
                        loopCount: map(this.boxes[i].noiseValue9, this.noiseValue9Min, this.noiseValue9Max, 1, 15), // 10,
                        colorListA: this.palette9a,  // 5
                        colorListB: this.palette10a, // 6
                        noiseAngle: false,
                        normIt: false,
                    }
                );
            } else {
                this.digndag2(
                    {
                        centerX: this.boxes[i].A.x + this.boxes[i].offset.x,
                        centerY: this.boxes[i].A.y + this.boxes[i].offset.y,
                        noiseNumberA: 9,
                        noiseNumberB: 10,
                        noiseValueA: this.boxes[i].noiseValue9,
                        noiseValueB: this.boxes[i].noiseValue10,
                        vertexLength: map(this.boxes[i].noiseValue9, this.noiseValue9Min, this.noiseValue9Max, 1, 15),
                        strokeWeighty: map(this.boxes[i].noiseValue9, this.noiseValue9Min, this.noiseValue9Max, 0.3, 0.8), //0.5,
                        angleMin: 2 * PI / 12 * 9,
                        angleMax: 2 * PI / 12 * 11,
                        revert: true,
                        blendNoises: 0,
                        cutOutValue: 0.7,
                        loopCount: map(this.boxes[i].noiseValue9, this.noiseValue9Min, this.noiseValue9Max, 1, 15), // 10,
                        colorListA: this.palette9b,
                        colorListB: this.palette10b,
                        noiseAngle: false,
                        normIt: false,
                    }
                );
            }

            // // big but sparse number 2
            if (this.boxes[i].aboveHorizon) {

                this.digndag2(
                    {
                        centerX: this.boxes[i].A.x + this.boxes[i].offset.x,
                        centerY: this.boxes[i].A.y + this.boxes[i].offset.y,
                        noiseNumberA: 10,
                        noiseNumberB: 9,
                        noiseValueA: this.boxes[i].noiseValue10,
                        noiseValueB: this.boxes[i].noiseValue9,
                        vertexLength: map(this.boxes[i].noiseValue10, this.noiseValue10Min, this.noiseValue10Max, 1, 15),
                        strokeWeighty: map(this.boxes[i].noiseValue10, this.noiseValue10Min, this.noiseValue10Max, 0.3, 1.8),// 0.5,
                        angleMin: 2 * PI / 12 * 1,
                        angleMax: 2 * PI / 12 * 4,
                        revert: true,
                        blendNoises: 0,
                        cutOutValue: 0.7,
                        loopCount: map(this.boxes[i].noiseValue10, this.noiseValue10Min, this.noiseValue10Max, 1, 15), // 10,
                        colorListA: this.palette10a,  // 5
                        colorListB: this.palette9a, // 6
                        noiseAngle: false,
                        normIt: false,
                    }
                );
            } else {
                this.digndag2(
                    {
                        centerX: this.boxes[i].A.x + this.boxes[i].offset.x,
                        centerY: this.boxes[i].A.y + this.boxes[i].offset.y,
                        noiseNumberA: 10,
                        noiseNumberB: 9,
                        noiseValueA: this.boxes[i].noiseValue10,
                        noiseValueB: this.boxes[i].noiseValue9,
                        vertexLength: map(this.boxes[i].noiseValue10, this.noiseValue10Min, this.noiseValue10Max, 1, 15),
                        strokeWeighty: map(this.boxes[i].noiseValue10, this.noiseValue10Min, this.noiseValue10Max, 0.3, 1.8), // 0.5,
                        angleMin: 2 * PI / 12 * 1,
                        angleMax: 2 * PI / 12 * 4,
                        revert: true,
                        blendNoises: 0,
                        cutOutValue: 0.7,
                        loopCount: map(this.boxes[i].noiseValue10, this.noiseValue10Min, this.noiseValue10Max, 1, 15), // 10,
                        colorListA: this.palette10b,  // 5
                        colorListB: this.palette9b, // 6
                        noiseAngle: false,
                        normIt: false,
                    }
                );
            }

        }
    }

    drawThirdLoop() {

        let randomIndex = getRandomIndex(this.boxes.length);
        // let showTrigger = randomIndex.length / 4 * 3;

        let i = 0;

        for (var v = 0; v < randomIndex.length; v++) {

            i = randomIndex[v];

            // let offset = getRandomFromInterval(-10, 10);

            // if (i == showTrigger) {
            // this.drawShape();
            // }

            if (this.drawSkipMargin(this.boxes[i])) {
                continue;
            }

            if (this.boxes[i].horizon) {
                this.digndag2(
                    {
                        centerX: this.boxes[i].A.x + this.boxes[i].offset.x,
                        centerY: this.boxes[i].A.y + this.boxes[i].offset.y,
                        noiseNumberA: 3,
                        noiseNumberB: 4,
                        noiseValueA: this.boxes[i].noiseValue3,
                        noiseValueB: this.boxes[i].noiseValue4,
                        vertexLength: map(this.boxes[i].noiseValue3, this.noiseValue3Min, this.noiseValue3Max, 5, 15),
                        strokeWeighty: 0.8,
                        angleMin: 2 * PI / 12 * 11.5,
                        angleMax: 2 * PI / 12 * 0.5,
                        revert: true,
                        blendNoises: 0.5,
                        cutOutValue: 0,
                        loopCount: 10,
                        colorListA: this.paletteHorizon1,
                        colorListB: this.paletteHorizon2,
                        noiseAngle: false,
                        normIt: true,
                    }
                );

            } else if (this.boxes[i].aboveHorizon) {

                this.digndag2(
                    {
                        centerX: this.boxes[i].A.x + this.boxes[i].offset.x,
                        centerY: this.boxes[i].A.y + this.boxes[i].offset.y,
                        noiseNumberA: 5,
                        noiseNumberB: 6,
                        noiseValueA: this.boxes[i].noiseValue5,
                        noiseValueB: this.boxes[i].noiseValue6,
                        vertexLength: map(this.boxes[i].noiseValue5, this.noiseValue5Min, this.noiseValue5Max, 5, 15),
                        strokeWeighty: map(this.boxes[i].noiseValue5, this.noiseValue5Min, this.noiseValue5Max, 0.4, 1), //0.2,
                        angleMin: 2 * PI / 12 * 7,
                        angleMax: 2 * PI / 12 * 11,
                        revert: true,
                        blendNoises: 0,
                        cutOutValue: 0.75,
                        loopCount: 10,
                        colorListA: this.palette5a,  // 5
                        colorListB: this.palette6a, // 6
                        noiseAngle: false,
                        normIt: true,
                    }
                );
            } else {
                this.digndag2(
                    {
                        centerX: this.boxes[i].A.x + this.boxes[i].offset.x,
                        centerY: this.boxes[i].A.y + this.boxes[i].offset.y,
                        noiseNumberA: 5,
                        noiseNumberB: 6,
                        noiseValueA: this.boxes[i].noiseValue5,
                        noiseValueB: this.boxes[i].noiseValue6,
                        vertexLength: map(this.boxes[i].noiseValue5, this.noiseValue5Min, this.noiseValue5Max, 5, 15),
                        strokeWeighty: map(this.boxes[i].noiseValue5, this.noiseValue5Min, this.noiseValue5Max, 0.4, 1), //0.2,
                        angleMin: 2 * PI / 12 * 0,
                        angleMax: 2 * PI / 12 * 5,
                        revert: true,
                        blendNoises: 0,
                        cutOutValue: 0.75,
                        loopCount: 10,
                        colorListA: this.palette5b,
                        colorListB: this.palette6b,
                        noiseAngle: false,
                        normIt: true,
                    }
                );
            }

        }
    }

    drawFourthLoop() {

        let randomIndex = getRandomIndex(this.boxes.length);

        let i = 0;

        for (var v = 0; v < randomIndex.length; v++) {

            i = randomIndex[v];
            // let offset = getRandomFromInterval(-10, 10);

            if (this.drawSkipMargin(this.boxes[i])) {
                continue;
            }

            if (this.boxes[i].aboveHorizon) {
                this.digndag2(
                    {
                        centerX: this.boxes[i].A.x + this.boxes[i].offset.x,
                        centerY: this.boxes[i].A.y + this.boxes[i].offset.y,
                        noiseNumberA: 7,
                        noiseNumberB: 8,
                        noiseValueA: this.boxes[i].noiseValue7,
                        noiseValueB: this.boxes[i].noiseValue8,
                        vertexLength: map(this.boxes[i].noiseValue7, this.noiseValue7Min, this.noiseValue7Max, 5, 15),
                        strokeWeighty: 0.3, // map(this.boxes[i].noiseValue7, 0, 1, 0.1, 0.2), //0.1,
                        angleMin: 2 * PI / 12 * 5,
                        angleMax: 2 * PI / 12 * 6,
                        // angleMin: map(this.boxes[i].noiseValue7, this.noiseValue7Min, this.noiseValue7Max, 0, 2 * PI),
                        // angleMax: map(this.boxes[i].noiseValue7, this.noiseValue7Min, this.noiseValue7Max, 0, 2 * PI),
                        revert: true,
                        blendNoises: 0.5,
                        cutOutValue: 0.5,
                        loopCount: 5,
                        colorListA: this.palette7a,
                        colorListB: this.palette8a,
                        noiseAngle: true,
                        normIt: true,
                    }
                );
            } else {
                this.digndag2(
                    {
                        centerX: this.boxes[i].A.x + this.boxes[i].offset.x,
                        centerY: this.boxes[i].A.y + this.boxes[i].offset.y,
                        noiseNumberA: 7,
                        noiseNumberB: 8,
                        noiseValueA: this.boxes[i].noiseValue7,
                        noiseValueB: this.boxes[i].noiseValue8,
                        vertexLength: map(this.boxes[i].noiseValue7, this.noiseValue7Min, this.noiseValue7Max, 5, 15),
                        strokeWeighty: 0.3, // map(this.boxes[i].noiseValue7, 0, 1, 0.1, 0.2), //0.1,
                        angleMin: 2 * PI / 12 * 5,
                        angleMax: 2 * PI / 12 * 6,
                        // angleMin: map(this.boxes[i].noiseValue7, 0, 1, -PI, -PI * 1),
                        // angleMax: map(this.boxes[i].noiseValue7, 0, 1, -PI, -PI * 1.8),
                        revert: true,
                        blendNoises: 0.5,
                        cutOutValue: 0.5,
                        loopCount: 5,
                        colorListA: this.palette7b,
                        colorListB: this.palette8b,
                        noiseAngle: true,
                        normIt: true,
                    }
                );
            }
        }
    }

    drawBigLoop() {

        let randomIndex = getRandomIndex(this.boxes.length);

        for (var i = 0; i < randomIndex.length; i++) {

            // let offset = getRandomFromInterval(-10, 10);

            // if (i == showTrigger) {
            // this.drawShape();
            // }

            if (this.drawSkipMargin(this.boxes[i])) {
                continue;
            }

            // FIRST LOOP
            if (this.boxes[i].aboveHorizon) {
                this.digndag2(
                    {
                        centerX: this.boxes[i].A.x + this.boxes[i].offset.x,
                        centerY: this.boxes[i].A.y + this.boxes[i].offset.y,
                        noiseNumberA: 1,
                        noiseNumberB: 2,
                        noiseValueA: this.boxes[i].noiseValue1,
                        noiseValueB: this.boxes[i].noiseValue2,
                        vertexLength: 20, // map(this.boxes[i].noiseValue1, this.noiseValue1Min, this.noiseValue1Max, 5, 15), // 15,
                        strokeWeighty: 1,
                        // angleMin: 0,
                        // angleMax: 2 * PI,
                        angleMin: -PI / 12,
                        angleMax: PI / 12,
                        revert: true,
                        blendNoises: 0.5,
                        cutOutValue: 0,
                        loopCount: 10,
                        colorListA: this.palette1a,
                        colorListB: this.palette2a,
                        noiseAngle: false,
                        normIt: true,
                    }
                );
            } else {
                this.digndag2(
                    {
                        centerX: this.boxes[i].A.x + this.boxes[i].offset.x,
                        centerY: this.boxes[i].A.y + this.boxes[i].offset.y,
                        noiseNumberA: 1,
                        noiseNumberB: 2,
                        noiseValueA: this.boxes[i].noiseValue1,
                        noiseValueB: this.boxes[i].noiseValue2,
                        vertexLength: 20, // map(this.boxes[i].noiseValue1, this.noiseValue1Min, this.noiseValue1Max, 5, 15),
                        strokeWeighty: 1,
                        angleMin: -PI / 12,
                        angleMax: PI / 12,
                        // angleMin: 0,
                        // angleMax: 2 * PI,
                        revert: true,
                        blendNoises: 0.5,
                        cutOutValue: 0,
                        loopCount: 10,
                        colorListA: this.palette1b,
                        colorListB: this.palette2b,
                        noiseAngle: false,
                        normIt: true,
                    }
                );
            }


            if (this.boxes[i].horizon) {
                this.digndag2(
                    {
                        centerX: this.boxes[i].A.x + this.boxes[i].offset.x,
                        centerY: this.boxes[i].A.y + this.boxes[i].offset.y,
                        noiseNumberA: 3,
                        noiseNumberB: 4,
                        noiseValueA: this.boxes[i].noiseValue3,
                        noiseValueB: this.boxes[i].noiseValue4,
                        vertexLength: 25, // 15,
                        strokeWeighty: 2,
                        angleMin: 2 * PI / 12 * 0,
                        angleMax: 2 * PI / 12 * 1,
                        revert: true,
                        blendNoises: 0.5,
                        cutOutValue: 0,
                        loopCount: 10,
                        colorListA: this.paletteHorizon1,
                        colorListB: this.paletteHorizon2,
                        noiseAngle: false,
                        normIt: true,
                    }
                );

            } else if (this.boxes[i].aboveHorizon) {


                this.digndag2(
                    {
                        centerX: this.boxes[i].A.x + this.boxes[i].offset.x,
                        centerY: this.boxes[i].A.y + this.boxes[i].offset.y,
                        noiseNumberA: 3,
                        noiseNumberB: 4,
                        noiseValueA: this.boxes[i].noiseValue3,
                        noiseValueB: this.boxes[i].noiseValue4,
                        // vertexLength: 5,
                        vertexLength: map(this.boxes[i].noiseValue3, this.noiseValue3Min, this.noiseValue3Max, 3, 15),
                        strokeWeighty: 1,
                        angleMin: 2 * PI / 16 * 4,
                        angleMax: 2 * PI / 16 * 8,
                        // angleMin: map(this.boxes[i].noiseValue5, 0, 1, 0, -PI),
                        // angleMax: map(this.boxes[i].noiseValue5, 0, 1, 0, PI),
                        revert: true,
                        blendNoises: 0.5,
                        cutOutValue: 0,
                        loopCount: 10,
                        colorListA: this.palette1a, // 3
                        colorListB: this.palette2a,  // 4
                        noiseAngle: false,
                        normIt: true,
                    }
                );

            } else {

                this.digndag2(
                    {
                        centerX: this.boxes[i].A.x + this.boxes[i].offset.x,
                        centerY: this.boxes[i].A.y + this.boxes[i].offset.y,
                        noiseNumberA: 3,
                        noiseNumberB: 4,
                        noiseValueA: this.boxes[i].noiseValue3,
                        noiseValueB: this.boxes[i].noiseValue4,
                        vertexLength: map(this.boxes[i].noiseValue3, this.noiseValue3Min, this.noiseValue3Max, 3, 15),
                        strokeWeighty: 1,
                        angleMin: PI / 6 * 4,
                        angleMin: 2 * PI / 16 * 4,
                        angleMax: 2 * PI / 16 * 8,
                        // angleMin: map(this.boxes[i].noiseValue5, 0, 1, 0, -PI),
                        // angleMax: map(this.boxes[i].noiseValue5, 0, 1, 0, PI),
                        revert: true,
                        blendNoises: 0.5,
                        cutOutValue: 0,
                        loopCount: 10,
                        colorListA: this.palette1b,
                        colorListB: this.palette2b,
                        noiseAngle: false,
                        normIt: true,
                    }
                );
            }

            // big but sparse
            if (this.boxes[i].aboveHorizon) {

                this.digndag2(
                    {
                        centerX: this.boxes[i].A.x + this.boxes[i].offset.x,
                        centerY: this.boxes[i].A.y + this.boxes[i].offset.y,
                        noiseNumberA: 9,
                        noiseNumberB: 10,
                        noiseValueA: this.boxes[i].noiseValue9,
                        noiseValueB: this.boxes[i].noiseValue10,
                        vertexLength: map(this.boxes[i].noiseValue9, this.noiseValue9Min, this.noiseValue9Max, 5, 15),
                        strokeWeighty: 0.5,
                        angleMin: 2 * PI / 12 * 3,
                        angleMax: 2 * PI / 12 * 4,
                        revert: true,
                        blendNoises: 0,
                        cutOutValue: 0.5,
                        loopCount: 40,
                        colorListA: this.palette9a,  // 5
                        colorListB: this.palette10a, // 6
                        noiseAngle: false,
                        normIt: false,
                    }
                );
            } else {
                this.digndag2(
                    {
                        centerX: this.boxes[i].A.x + this.boxes[i].offset.x,
                        centerY: this.boxes[i].A.y + this.boxes[i].offset.y,
                        noiseNumberA: 9,
                        noiseNumberB: 10,
                        noiseValueA: this.boxes[i].noiseValue9,
                        noiseValueB: this.boxes[i].noiseValue10,
                        vertexLength: map(this.boxes[i].noiseValue9, this.noiseValue9Min, this.noiseValue9Max, 5, 15),
                        strokeWeighty: 0.5,
                        angleMin: 2 * PI / 12 * 3,
                        angleMax: 2 * PI / 12 * 4,
                        revert: true,
                        blendNoises: 0,
                        cutOutValue: 0.5,
                        loopCount: 40,
                        colorListA: this.palette9b,
                        colorListB: this.palette10b,
                        noiseAngle: false,
                        normIt: false,
                    }
                );
            }

            // big but sparse number 2
            if (this.boxes[i].aboveHorizon) {

                this.digndag2(
                    {
                        centerX: this.boxes[i].A.x + this.boxes[i].offset.x,
                        centerY: this.boxes[i].A.y + this.boxes[i].offset.y,
                        noiseNumberA: 10,
                        noiseNumberB: 9,
                        noiseValueA: this.boxes[i].noiseValue10,
                        noiseValueB: this.boxes[i].noiseValue9,
                        vertexLength: map(this.boxes[i].noiseValue10, this.noiseValue10Min, this.noiseValue10Max, 5, 15),
                        strokeWeighty: 0.5,
                        angleMin: 2 * PI / 12 * 8,
                        angleMax: 2 * PI / 12 * 9,
                        revert: true,
                        blendNoises: 0,
                        cutOutValue: 0.5,
                        loopCount: 20,
                        colorListA: this.palette10a,  // 5
                        colorListB: this.palette9a, // 6
                        noiseAngle: true,
                        normIt: false,
                    }
                );
            } else {
                this.digndag2(
                    {
                        centerX: this.boxes[i].A.x + this.boxes[i].offset.x,
                        centerY: this.boxes[i].A.y + this.boxes[i].offset.y,
                        noiseNumberA: 10,
                        noiseNumberB: 9,
                        noiseValueA: this.boxes[i].noiseValue10,
                        noiseValueB: this.boxes[i].noiseValue9,
                        vertexLength: map(this.boxes[i].noiseValue10, this.noiseValue10Min, this.noiseValue10Max, 5, 15),
                        strokeWeighty: 0.5,
                        angleMin: 2 * PI / 12 * 8,
                        angleMax: 2 * PI / 12 * 9,
                        revert: true,
                        blendNoises: 0,
                        cutOutValue: 0.5,
                        loopCount: 20,
                        colorListA: this.palette10b,  // 5
                        colorListB: this.palette9b, // 6
                        noiseAngle: true,
                        normIt: false,
                    }
                );
            }

            // THIRD LOOP
            if (this.boxes[i].aboveHorizon) {

                this.digndag2(
                    {
                        centerX: this.boxes[i].A.x + this.boxes[i].offset.x,
                        centerY: this.boxes[i].A.y + this.boxes[i].offset.y,
                        noiseNumberA: 5,
                        noiseNumberB: 6,
                        noiseValueA: this.boxes[i].noiseValue5,
                        noiseValueB: this.boxes[i].noiseValue6,
                        vertexLength: map(this.boxes[i].noiseValue5, this.noiseValue5Min, this.noiseValue5Max, 5, 15),
                        strokeWeighty: 0.5,
                        angleMin: 2 * PI / 12 * 10,
                        angleMax: 2 * PI / 12 * 12,
                        revert: true,
                        blendNoises: 0.5,
                        cutOutValue: 0.5,
                        loopCount: 10,
                        colorListA: this.palette5a,  // 5
                        colorListB: this.palette6a, // 6
                        noiseAngle: false,
                        normIt: true,
                    }
                );
            } else {
                this.digndag2(
                    {
                        centerX: this.boxes[i].A.x + this.boxes[i].offset.x,
                        centerY: this.boxes[i].A.y + this.boxes[i].offset.y,
                        noiseNumberA: 5,
                        noiseNumberB: 6,
                        noiseValueA: this.boxes[i].noiseValue5,
                        noiseValueB: this.boxes[i].noiseValue6,
                        vertexLength: map(this.boxes[i].noiseValue5, this.noiseValue5Min, this.noiseValue5Max, 5, 15),
                        strokeWeighty: 0.5,
                        angleMin: 2 * PI / 12 * 1,
                        angleMax: 2 * PI / 12 * 4,
                        revert: true,
                        blendNoises: 0.5,
                        cutOutValue: 0.5,
                        loopCount: 10,
                        colorListA: this.palette5b,
                        colorListB: this.palette6b,
                        noiseAngle: false,
                        normIt: true,
                    }
                );
            }
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
        let vertexColorDistort = 0;  // may lead to errors
        let blendNoises = data.blendNoises; // 0.5
        let normIt = data.normIt;

        let noiseValue = 0;
        let noiseValueEff = 0;
        let angle = 0;
        let colorList = [];
        let noiseVars = {};

        if (fxrand() > blendNoises) {
            noiseVars = this.getNoiseVars(data.noiseNumberA);
            noiseValue = data.noiseValueA;
            colorList = data.colorListA;
            // console.log("case A");
        } else {
            noiseVars = this.getNoiseVars(data.noiseNumberB);
            noiseValue = data.noiseValueB;
            colorList = data.colorListB;
            // console.log("case B");
        }

        if (normIt) {
            noiseValueEff = map(noiseValue, noiseVars.noiseValueMin, noiseVars.noiseValueMax, 0, 1);
        } else {
            noiseValueEff = noiseValue;
        }

        if (noiseValueEff > data.cutOutValue) {

            // if (loopSensitive) {
            // loopCount = map(noiseValue, 0, 1, 5, 30);
            // }
            // loopCount = 10;

            // let colorSelect = Math.floor(noiseValue * (colorList.length));
            // let colorSelect = Math.floor(noiseValue * (this.noiseValue1Max - this.noiseValue1Min) + this.noiseValue1Min);
            // let colorSelect = constrain(Math.round(map(noiseValue, this.noiseValue1Min, this.noiseValue1Max, 0, (colorList.length - 1))), 0, (colorList.length - 1));
            // let colorSelect = constrain(Math.round(map(noiseValue, 0, 1, 0, (colorList.length - 1))), 0, (colorList.length - 1));
            let colorSelect = constrain(Math.round(map(noiseValue, noiseVars.noiseValueMin, noiseVars.noiseValueMax, 0, (colorList.length - 1))), 0, (colorList.length - 1));
            // console.log(noiseVars.noiseValueMin);
            // console.log(noiseVars.noiseValueMax);
            // console.log(colorList.length - 1);
            // console.log(colorSelect);

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

                if (data.noiseAngle) {
                    angle = map(noiseValueEff, 0, 1, 0, 2 * PI) + getRandomFromInterval(-0.5, 0.5);
                } else {
                    angle = getRandomFromInterval(angleMin, angleMax);
                }

                // make spots not lines
                if (data.revert) {
                    if (i % 2 != 0) {
                        angle = angle - PI;
                    }
                }

                let v = p5.Vector.fromAngle(angle, vertexLength);

                newAdder = p5.Vector.add(oldAdder, v);
                strokeColor = distortColorSuperNew(colorList[colorSelect], vertexColorDistort);
                this.buffer.stroke(strokeColor);
                this.buffer.vertex(newAdder.x, newAdder.y);
            }

            this.buffer.endShape();
            this.buffer.pop();
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

        if (fxrand() > 0) {

            let min = 10;
            let max = 15;
            // let loopCount = 800;
            // let loopCount = 1200;
            let loopCount = 130;

            for (var j = 0; j < loopCount; j++) {
                let center = createVector(getRandomFromInterval(0, this.buffer.width), getRandomFromInterval(0, this.buffer.height));
                let tempColor = this.shapeColor;
                // let tempColor = PalettiA[Math.round(getRandomFromInterval(0, (PalettiA.length - 1)))];
                // tempColor = color(red(tempColor), green(tempColor), blue(tempColor), 80);

                this.buffer.push();
                // this.buffer.noFill();
                this.buffer.fill(tempColor);
                // this.buffer.stroke(color("white"));
                // this.buffer.stroke(tempColor);
                // this.buffer.strokeWeight(1);
                this.buffer.noStroke();

                this.buffer.beginShape();
                this.buffer.vertex(center.x - getRandomFromInterval(min, max), center.y - getRandomFromInterval(min, max));
                this.buffer.vertex(center.x + getRandomFromInterval(min, max), center.y - getRandomFromInterval(min, max));
                this.buffer.vertex(center.x + getRandomFromInterval(min, max), center.y + getRandomFromInterval(min, max));
                this.buffer.vertex(center.x - getRandomFromInterval(min, max), center.y + getRandomFromInterval(min, max));
                this.buffer.endShape(CLOSE);
                this.buffer.pop();
            }

        }
    }

    show() {
        push();
        // blendMode(OVERLAY);
        image(this.buffer, 0, 0);
        pop();
    }

    getNoiseVars(number) {

        let noiseValueName = "";
        let noiseValueMin = 0;
        let noiseValueMax = 0;

        if (number == 1) {
            noiseValueName = "noiseValue1";
            noiseValueMin = this.noiseValue1Min;
            noiseValueMax = this.noiseValue1Max;
        } else if (number == 2) {
            noiseValueName = "noiseValue2";
            noiseValueMin = this.noiseValue2Min;
            noiseValueMax = this.noiseValue2Max;
        } else if (number == 3) {
            noiseValueName = "noiseValue3";
            noiseValueMin = this.noiseValue3Min;
            noiseValueMax = this.noiseValue3Max;
        } else if (number == 4) {
            noiseValueName = "noiseValue4";
            noiseValueMin = this.noiseValue4Min;
            noiseValueMax = this.noiseValue4Max;
        } else if (number == 5) {
            noiseValueName = "noiseValue5";
            noiseValueMin = this.noiseValue5Min;
            noiseValueMax = this.noiseValue5Max;
        } else if (number == 6) {
            noiseValueName = "noiseValue6";
            noiseValueMin = this.noiseValue6Min;
            noiseValueMax = this.noiseValue6Max;
        } else if (number == 7) {
            noiseValueName = "noiseValue7";
            noiseValueMin = this.noiseValue7Min;
            noiseValueMax = this.noiseValue7Max;
        } else {
            noiseValueName = "noiseValue8";
            noiseValueMin = this.noiseValue8Min;
            noiseValueMax = this.noiseValue8Max;
        }

        // console.log("Min: " + noiseValueMin);
        // console.log("Max: " + noiseValueMax);

        return {
            noiseValueName: noiseValueName,
            noiseValueMin: noiseValueMin,
            noiseValueMax: noiseValueMax,
        }
    }
}