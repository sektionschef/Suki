class Brush {
    constructor(data) {

        this.size = data.size;
        this.strokeSize = data.strokeSize;
        this.fillColor = data.fillColor;
        this.strokeColor = data.strokeColor;
        this.curveSexyness = data.curveSexyness;
        this.pixelDistort = data.pixelDistort;

        this.fibreCount = 15;
        this.buffer = createGraphics(this.size, this.size, SVG);

        this.fibres = [];

        this.fillColor = getRandomFromList([color("#92151533"), color("#03136b33")])

        for (var i = 0; i < this.fibreCount; i++) {
            this.fibres.push(new Fibre({
                buffer: this.buffer,
                size: this.size,
                strokeSize: this.strokeSize,
                fillColor: distortColorSuperNew(this.fillColor, this.pixelDistort),
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