class Noise {
    constructor(sInc, lInc, zInc) {
        this.sInc = sInc;
        this.lInc = lInc;
        this.zInc = zInc;

        // make sure lowest default for max and highest default for min
        this.noiseValueMax = 0;
        this.noiseValueMin = 1;

        this.loff = 0;
        this.zoff = 0;

        this.soff = 0;
    }

    resetSoff() {
        this.soff = 0;
    }

    createNoiseValue() {
        this.noiseValue = noise(this.soff, this.loff, this.zoff);

        if (this.noiseValue > this.noiseValueMax) {
            this.noiseValueMax = this.noiseValue;
        }
        if (this.noiseValue < this.noiseValueMin) {
            this.noiseValueMin = this.noiseValue;
        }

        return this.noiseValue;
    }

    updateSoff() {
        this.soff += this.sInc;
    }

    updateLoff() {
        this.loff += this.lInc;
    }

    updateZoff() {
        this.zoff += this.zInc;
    }


}