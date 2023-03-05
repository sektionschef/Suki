// MARGIN IN BEIDE RICHTUNGEN, X UND Y

class Grid {
    constructor(data) {

        this.DEBUG = true;
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

        this.sInc = 0.1;
        this.lInc = 0.03;
        this.zInc = 0.05;

        this.sInc2 = 0.06;
        this.lInc2 = 0.06;
        this.zInc2 = 0.2;

        this.sInc3 = 0.2;
        this.lInc3 = 0.2;
        this.zInc3 = 0.2;

        this.buffer = createGraphics(width, height, SVG);
        this.bufferNoise = createGraphics(width, height, SVG);

        this.createBoxes();
        if (this.DEBUG) {
            this.showDebug();
        }
        // this.draw();
        this.drawFirstLoop();

    }

    createBoxes() {
        var index = 0;

        let loff = 0;
        let zoff = 0;
        let loff2 = 0;
        let zoff2 = 0;
        let loff3 = 0;
        let zoff3 = 0;

        for (var l = 0; l < (this.heightBoxCount); l++) {
            let soff = 0;
            let soff2 = 0;
            let soff3 = 0;
            for (var s = 0; s < (this.widthBoxCount); s++) {

                var center = createVector(this.widthMargin + s * this.boxSize + this.boxSize / 2, this.heightMargin + l * this.boxSize + this.boxSize / 2);

                // corners of the box
                var A = createVector(this.widthMargin + s * this.boxSize, this.heightMargin + l * this.boxSize);
                var B = p5.Vector.add(A, createVector(this.boxSize, 0));
                var C = p5.Vector.add(A, createVector(this.boxSize, this.boxSize));
                var D = p5.Vector.add(A, createVector(0, this.boxSize));

                // var noiseValue = noise(soff, loff);
                var noiseValue = noise(soff, loff, zoff);
                var noiseValue2 = noise(soff2, loff2, zoff2);
                var noiseValue3 = noise(soff3, loff3, zoff3);

                var polygonA = insidePolygon([A.x, A.y], polyPoints);

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
                    "noiseValue": noiseValue,
                    "noiseValue2": noiseValue2,
                    "noiseValue3": noiseValue3,
                    "polygonA": polygonA,
                })
                index += 1;
                soff += this.sInc;
                soff2 += this.sInc2;
                soff3 += this.sInc3;
            }
            loff += this.lInc;
            zoff += this.zInc;
            loff2 += this.lInc2;
            zoff2 += this.zInc2;
            loff3 += this.lInc3;
            zoff3 += this.zInc3;
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

    drawFirstLoop() {
        let offset = 0; getRandomFromInterval(-10, 10);
        let loopCountParam = 20;
        let vertexLength = 20;
        let strokeSize = 3;
        let angleMin = 0;
        let angleMax = 2 * PI;
        let colorList = ["#bec9cf", "#a3b6c0", "#9db5c2"];
        let colorList2 = ["#818a8f", "#728088", "#677a85"];

        for (var i = 0; i < this.boxes.length; i++) {

            if (this.drawSkipMargin(this.boxes[i])) {
                continue;
            }

            if (this.boxes[i].noiseValue2 >= 0.5 && fxrand() > 0.2) {
                this.zigzag(this.boxes[i].A.x + offset, this.boxes[i].A.y + offset, this.boxes[i].noiseValue2, loopCountParam, vertexLength, strokeSize, angleMin, angleMax, colorList2);
            } else {
                this.zigzag(this.boxes[i].A.x + offset, this.boxes[i].A.y + offset, this.boxes[i].noiseValue, loopCountParam, vertexLength, strokeSize, angleMin, angleMax, colorList);
            }
        }

    }

    draw() {

        let offset = 0;
        let loopCountParam = 0;
        let vertexLength = 0;
        let strokeSize = 0;
        let angleMin = 0;
        let angleMax = 0;
        let colorList = [];
        let colorList2 = [];
        let colorList3 = [];
        let colorListA = [];

        for (var i = 0; i < this.boxes.length; i++) {

            offset = getRandomFromInterval(-10, 10);
            loopCountParam = 20;
            vertexLength = 20;
            strokeSize = 3;
            angleMin = 0;
            angleMax = 2 * PI;
            colorList = ["#bec9cf", "#a3b6c0", "#9db5c2"];
            colorList2 = ["#818a8f", "#728088", "#677a85"];

            // if (this.boxes[i].long >= 30 && this.boxes[i].long <= 60) {
            if (this.boxes[i].noiseValue2 >= 0.5 && fxrand() > 0.2) {
                this.zigzag(this.boxes[i].A.x + offset, this.boxes[i].A.y + offset, this.boxes[i].noiseValue2, loopCountParam, vertexLength, strokeSize, angleMin, angleMax, colorList2);
            } else {
                this.zigzag(this.boxes[i].A.x + offset, this.boxes[i].A.y + offset, this.boxes[i].noiseValue, loopCountParam, vertexLength, strokeSize, angleMin, angleMax, colorList);
            }
        }


        // this.buffer.push();
        // this.buffer.strokeWeight(2);
        // this.buffer.stroke(color("#323c41"));
        // let disty = 40
        // for (var s = 0; s < (width / disty + 1); s++) {
        //     this.buffer.line(s * disty, 0, s * disty, height);
        // }
        // this.buffer.pop();


        for (var i = 0; i < this.boxes.length; i++) {
            offset = getRandomFromInterval(-5, 5);
            loopCountParam = 10;
            vertexLength = 10;
            strokeSize = 2;
            angleMin = 0;
            angleMax = PI;
            colorList = ["#90a4af", "#7e9099", "#6c7b83"];
            colorList2 = ["#6f7f88", "#627179", "#4d585e"];

            // if (this.boxes[i].long >= 30 && this.boxes[i].long <= 60) {
            if (this.boxes[i].noiseValue2 >= 0.5 && fxrand() > 0.3) {
                this.zigzag(this.boxes[i].A.x + offset, this.boxes[i].A.y + offset, this.boxes[i].noiseValue2, loopCountParam, vertexLength, strokeSize, angleMin, angleMax, colorList2);
            } else {
                this.zigzag(this.boxes[i].A.x + offset, this.boxes[i].A.y + offset, this.boxes[i].noiseValue, loopCountParam, vertexLength, strokeSize, angleMin, angleMax, colorList);
            }
        }

        for (var i = 0; i < this.boxes.length; i++) {

            offset = getRandomFromInterval(-2, 2);  // 5
            loopCountParam = 50;
            vertexLength = 20;
            strokeSize = 0.2;
            angleMin = 0;
            angleMax = PI;
            colorList = ["#43525a", "#4b5a61", "#43555f"];
            colorList2 = ["#2f393f", "#323c41", "#2d3a41"];

            // if (this.boxes[i].long >= 30 && this.boxes[i].long <= 60) {
            if (this.boxes[i].noiseValue2 >= 0.5 && fxrand() > 0.5) {
                this.zigzag(this.boxes[i].A.x + offset, this.boxes[i].A.y + offset, this.boxes[i].noiseValue2, loopCountParam, vertexLength, strokeSize, angleMin, angleMax, colorList2);
            } else {
                this.zigzag(this.boxes[i].A.x + offset, this.boxes[i].A.y + offset, this.boxes[i].noiseValue, loopCountParam, vertexLength, strokeSize, angleMin, angleMax, colorList);
            }
        }

        for (var i = 0; i < this.boxes.length; i++) {

            offset = getRandomFromInterval(-2, 2);  // 5
            loopCountParam = 10;
            vertexLength = 20;
            strokeSize = 0.4;
            angleMin = PI;
            angleMax = 2 * PI;
            colorList = ["#43525a", "#4b5a61", "#43555f"];
            colorList2 = ["#2f393f", "#323c41", "#2d3a41"];
            colorList3 = ["#d9e9f3", "#c3dbe7", "#c5e3f3"];

            if (this.boxes[i].noiseValue3 <= 0.4 && fxrand() > 0.5) {
                this.zigzag(this.boxes[i].A.x + offset, this.boxes[i].A.y + offset, this.boxes[i].noiseValue3, loopCountParam, vertexLength, strokeSize, angleMin, angleMax, colorList3);
            }

            if (this.boxes[i].polygonA) {
                // this.buffer.push();
                // this.buffer.stroke("red");
                // this.buffer.strokeWeight(3);
                // this.buffer.point(this.boxes[i].A.x, this.boxes[i].A.y);
                // this.buffer.pop();

                offset = getRandomFromInterval(-10, 10);
                loopCountParam = 20;
                vertexLength = 10;
                strokeSize = 2;
                angleMin = 0;
                angleMax = 2 * PI;
                colorListA = ["#496370", "#608ba1", "#6f8591"];

                if (fxrand() > 0.25) {
                    this.zigzag(this.boxes[i].A.x + offset, this.boxes[i].A.y + offset, this.boxes[i].noiseValue3, loopCountParam, vertexLength, strokeSize, angleMin, angleMax, colorListA);
                }
            }
        }

    }

    zigzag(centerX, centerY, noiseValue, loopCountParam, vertexLength, strokeSize, angleMin, angleMax, colorList) {


        let center = createVector(centerX, centerY);

        this.buffer.push();
        this.buffer.noFill();
        this.buffer.strokeWeight(strokeSize);

        this.buffer.beginShape();
        for (var i = 0; i < noiseValue * loopCountParam; i++) {
            // for (var i = 0; i < 20; i++) {

            let colorSelect = Math.round(noiseValue * (colorList.length - 1));
            let strokeColor = distortColorSuperNew(colorList[colorSelect], 10);
            this.buffer.stroke(strokeColor);

            let angle = getRandomFromInterval(angleMin, angleMax);
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