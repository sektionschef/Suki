// MARGIN IN BEIDE RICHTUNGEN, X UND Y

class Grid {
    constructor(data) {
        this.stripeOrientation = data.stripeOrientation;
        this.thickness = data.thickness;
        this.spacing = data.spacing;
        this.countColumnOrRow = data.countColumnOrRow;
        this.bezierFactor = data.bezierFactor;
        // this.pattern = data.pattern.buffer;
        // this.pattern2 = data.pattern2.buffer;
        this.backgroundNoise = data.backgroundNoise;

        if (data.whichLoopLevel == "last") {
            this.whichLoopLevel = 1;
        } else if (data.whichLoopLevel == "secondlast") {
            this.whichLoopLevel = 2;
        } else {
            this.whichLoopLevel = 3;
        }

        this.DEBUG = false;
        this.paperMargin = SHORTSIDE * 0.05;
        this.sizeStripeMin = 15;  // minimum length of stripe, in boxes
        // for x
        this.paddingHeightCountMin = 5;  // at least x boxes
        this.paddingHeightCountMax = 5;
        // for y
        this.paddingWidthCountMin = 5;
        this.paddingWidthCountMax = 5;

        this.shortBoxCount = 80; // 80 boxes on the shorter side
        this.boxSize = SHORTSIDE / this.shortBoxCount;
        this.longBoxCount = Math.floor(LONGSIDE / this.boxSize);
        this.bezierOffset = this.bezierFactor * SHORTSIDE;

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

        // length of stripe
        this.sizeStripe = Math.floor(getRandomFromInterval(this.sizeStripeMin, this.shortBoxCount / this.countColumnOrRow - this.sizeStripeMin));

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

        this.buffer = createGraphics(width, height, SVG);
        this.bufferNoise = createGraphics(width, height, SVG);

        // dummy values for upper left and lower right corners
        this.totalA = createVector(this.buffer.width / 2, this.buffer.height / 2)
        this.totalC = createVector(this.buffer.width / 2, this.buffer.height / 2)

        this.createBoxes();
        // this.showDebug();
        this.draw();

    }

    createBoxes() {
        var index = 0;

        let loff = 0;
        let zoff = 0;
        let loff2 = 0;
        let zoff2 = 0;
        for (var l = 0; l < (this.heightBoxCount); l++) {
            let soff = 0;
            let soff2 = 0;
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
                })
                index += 1;
                soff += this.sInc;
                soff2 += this.sInc2;
            }
            loff += this.lInc;
            zoff += this.zInc;
            loff2 += this.lInc2;
            zoff2 += this.zInc2;
        }

    }

    showDebug() {

        // view cols and rows
        // for (var i = 0; i < (this.widthBoxCount + 1); i++) {
        //     this.buffer.strokeWeight(5);
        //     this.buffer.line(i * this.boxSize, 0, i * this.boxSize, height);
        // }

        // for (var i = 0; i < (this.heightBoxCount + 1); i++) {
        //     this.buffer.strokeWeight(5);
        //     this.buffer.line(0, i * this.boxSize, width, i * this.boxSize);
        // }
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

        for (var i = 0; i < this.boxes.length; i++) {
            this.buffer.push();

            offset = getRandomFromInterval(-10, 10);
            loopCountParam = 20;
            vertexLength = 20;
            strokeSize = 3;
            angleMin = 0;
            angleMax = 2 * PI;
            colorList = ["#bec9cf", "#a3b6c0", "#9db5c2"];
            colorList2 = ["#818a8f", "#728088", "#677a85"];

            // if (this.boxes[i].long >= 30 && this.boxes[i].long <= 60) {
            if (this.boxes[i].noiseValue2 >= 0.5) {
                this.zigzag(this.boxes[i].A.x + offset, this.boxes[i].A.y + offset, this.boxes[i].noiseValue2, loopCountParam, vertexLength, strokeSize, angleMin, angleMax, colorList2);
            } else {
                this.zigzag(this.boxes[i].A.x + offset, this.boxes[i].A.y + offset, this.boxes[i].noiseValue, loopCountParam, vertexLength, strokeSize, angleMin, angleMax, colorList);
            }

            this.buffer.pop();
        }



        for (var i = 0; i < this.boxes.length; i++) {
            this.buffer.push();

            offset = getRandomFromInterval(-5, 5);
            loopCountParam = 10;
            vertexLength = 10;
            strokeSize = 2;
            angleMin = 0;
            angleMax = PI;
            colorList = ["#90a4af", "#7e9099", "#6c7b83"];
            colorList2 = ["#6f7f88", "#627179", "#4d585e"];

            // if (this.boxes[i].long >= 30 && this.boxes[i].long <= 60) {
            if (this.boxes[i].noiseValue2 >= 0.5) {
                this.zigzag(this.boxes[i].A.x + offset, this.boxes[i].A.y + offset, this.boxes[i].noiseValue2, loopCountParam, vertexLength, strokeSize, angleMin, angleMax, colorList2);
            } else {
                this.zigzag(this.boxes[i].A.x + offset, this.boxes[i].A.y + offset, this.boxes[i].noiseValue, loopCountParam, vertexLength, strokeSize, angleMin, angleMax, colorList);
            }
            this.buffer.pop();
        }

        for (var i = 0; i < this.boxes.length; i++) {
            this.buffer.push();

            offset = getRandomFromInterval(-2, 2);  // 5
            loopCountParam = 50;
            vertexLength = 20;
            strokeSize = 0.2;
            angleMin = 0;
            angleMax = PI;
            colorList = ["#43525a", "#4b5a61", "#43555f"];
            colorList2 = ["#2f393f", "#323c41", "#2d3a41"];

            // if (this.boxes[i].long >= 30 && this.boxes[i].long <= 60) {
            if (this.boxes[i].noiseValue2 >= 0.5) {
                this.zigzag(this.boxes[i].A.x + offset, this.boxes[i].A.y + offset, this.boxes[i].noiseValue2, loopCountParam, vertexLength, strokeSize, angleMin, angleMax, colorList2);
            } else {
                this.zigzag(this.boxes[i].A.x + offset, this.boxes[i].A.y + offset, this.boxes[i].noiseValue, loopCountParam, vertexLength, strokeSize, angleMin, angleMax, colorList);
            }
            this.buffer.pop();

        }
    }

    zigzag(centerX, centerY, noiseValue, loopCountParam, vertexLength, strokeSize, angleMin, angleMax, colorList) {

        let center = createVector(centerX, centerY);

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
    }

    show() {
        push();
        // blendMode(OVERLAY);
        image(this.buffer, 0, 0);
        pop();
    }
}