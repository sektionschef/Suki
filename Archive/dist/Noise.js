class Noise{constructor(s,i,e){this.sInc=s,this.lInc=i,this.zInc=e,this.noiseValueMax=0,this.noiseValueMin=1,this.loff=getRandomFromInterval(0,1e3),this.zoff=getRandomFromInterval(0,1e3),this.soff=getRandomFromInterval(0,1e3)}resetSoff(){this.soff=0}createNoiseValue(){return this.noiseValue=noise(this.soff,this.loff,this.zoff),this.noiseValue>this.noiseValueMax&&(this.noiseValueMax=this.noiseValue),this.noiseValue<this.noiseValueMin&&(this.noiseValueMin=this.noiseValue),this.noiseValue}updateSoff(){this.soff+=this.sInc}updateLoff(){this.loff+=this.lInc}updateZoff(){this.zoff+=this.zInc}}