class Fibre {
    constructor(data) {
        this.type = data.type;  // "Stroke Noise", "Fill Noise"

        this.buffer = data.buffer;
        this.size = data.size;
        this.strokeSize = data.strokeSize;
        this.fillColor = data.fillColor;
        this.strokeColor = data.strokeColor;
        this.curveSexyness = data.curveSexyness;
        this.pixelDistort = data.pixelDistort;

        // this.buffer = createGraphics(this.size, this.size, SVG);

        this.center = createVector(this.size / 2, this.size / 2);
        this.maxDist = Math.sqrt(this.size ** 2 + this.size ** 2);

        let q1X = getRandomFromInterval(0, this.size / 2);
        let q1Y = getRandomFromInterval(0, this.size / 2);
        let q2X = getRandomFromInterval(this.size / 2, this.size);
        let q2Y = getRandomFromInterval(0, this.size / 2);
        let q3X = getRandomFromInterval(0, this.size / 2);
        let q3Y = getRandomFromInterval(this.size / 2, this.size);
        let q4X = getRandomFromInterval(this.size / 2, this.size);
        let q4Y = getRandomFromInterval(this.size / 2, this.size);

        // this.buffer.noStroke();
        // this.buffer.fill(color(PALETTE.pixelColors[2]));
        // this.buffer.stroke(color(PALETTE.pixelColors[1]));
        // this.buffer.strokeWeight(3);
        // this.buffer.beginShape();
        // this.buffer.vertex(10, 10);
        // this.buffer.vertex(90, 10);
        // this.buffer.vertex(60, 60);
        // this.buffer.vertex(10, 40);
        // this.buffer.endShape(CLOSE);

        // CURVES
        this.buffer.push();
        this.buffer.curveTightness(this.curveSexyness);


        this.buffer.fill(this.fillColor);
        this.buffer.noStroke();


        // CURVES
        // this.buffer.beginShape();
        // this.buffer.curveVertex(q1X, q1Y);
        // this.buffer.curveVertex(q1X, q1Y);
        // this.buffer.curveVertex(q2X, q2Y);
        // this.buffer.curveVertex(q4X, q4Y);
        // this.buffer.curveVertex(q3X, q3Y);
        // this.buffer.curveVertex(q3X, q3Y);
        // this.buffer.endShape(CLOSE);
        // this.buffer.pop();

        // LINES
        this.buffer.beginShape();
        this.buffer.vertex(q1X, q1Y);
        this.buffer.vertex(q1X, q1Y);
        this.buffer.vertex(q2X, q2Y);
        this.buffer.vertex(q4X, q4Y);
        this.buffer.vertex(q3X, q3Y);
        this.buffer.vertex(q3X, q3Y);
        this.buffer.endShape(CLOSE);
    }
}

class Brush {
    constructor(data) {

        this.size = data.size;
        this.strokeSize = data.strokeSize;
        this.fillColor = data.fillColor;
        this.strokeColor = data.strokeColor;
        this.curveSexyness = data.curveSexyness;
        this.pixelDistort = data.pixelDistort;

        this.fibreCount = 10;
        this.buffer = createGraphics(width, height, SVG);

        this.fibres = [];

        for (var i = 0; i < this.fibreCount; i++) {
            this.fibres.push(new Fibre({
                buffer: this.buffer,
                size: 50,
                strokeSize: 1,
                fillColor: distortColorSuperNew(color("#a85d5d"), 50),
                strokeColor: color("#5d84a8"),
                curveSexyness: 1,
                pixelDistort: 10,
            }));
            // console.log(i);
        }

        // console.log(this.fibres);
    }

    show() {
        // for (var i = 0; i < this.fibres.length; i++) {
        //     push();
        //     image(this.fibres[i].buffer, 0, 0);
        //     pop();
        // }

        push();
        image(this.buffer, 0, 0);
        pop();
    }
}