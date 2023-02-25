class Brush{constructor(e){this.type=e.type,this.noiseColor=getRandomFromList(e.noiseColor),this.size=e.size,this.strokeSize=e.strokeSize,this.fillColor=e.fillColor,this.strokeColor=e.strokeColor,this.curveSexyness=e.curveSexyness,this.pixelDistort=e.pixelDistort,this.buffer=createGraphics(this.size,this.size),this.center=createVector(this.buffer.width/2,this.buffer.height/2),this.maxDist=Math.sqrt(this.buffer.width**2+this.buffer.height**2);let i=getRandomFromInterval(0,this.buffer.width/2),t=getRandomFromInterval(0,this.buffer.height/2),s=getRandomFromInterval(this.buffer.width/2,this.buffer.width),r=getRandomFromInterval(0,this.buffer.height/2),f=getRandomFromInterval(0,this.buffer.width/2),h=getRandomFromInterval(this.buffer.height/2,this.buffer.height),l=getRandomFromInterval(this.buffer.width/2,this.buffer.width),o=getRandomFromInterval(this.buffer.height/2,this.buffer.height);this.buffer.push(),this.buffer.curveTightness(this.curveSexyness),"Stroke Noise"==this.type||"Noise"==this.type?(this.buffer.noFill(),this.buffer.stroke(this.strokeColor),this.buffer.strokeWeight(this.strokeSize)):(this.buffer.fill(this.fillColor),this.buffer.noStroke()),this.buffer.beginShape(),this.buffer.curveVertex(i,t),this.buffer.curveVertex(i,t),this.buffer.curveVertex(s,r),this.buffer.curveVertex(l,o),this.buffer.curveVertex(f,h),this.buffer.curveVertex(f,h),this.buffer.endShape(CLOSE),this.buffer.pop(),this.pixelManipulation()}pixelManipulation(){let e,i,t;this.buffer.loadPixels();let s=0;for(e=0;e<this.buffer.width;e++){let h=0;for(i=0;i<this.buffer.height;i++){if(t=4*(e+i*this.buffer.width),"Stroke Noise"==this.type){var r=getRandomFromInterval(-this.pixelDistort,this.pixelDistort);0!=this.buffer.pixels[t+3]&&(this.buffer.pixels[t+0]+=r,this.buffer.pixels[t+1]+=r,this.buffer.pixels[t+2]+=r,this.buffer.pixels[t+3]=this.buffer.pixels[t+3])}if("Gradient"==this.type){let i=map(e,0,this.buffer.width,0,1),s=lerpColor(this.strokeColor,this.fillColor,i);0!=this.buffer.pixels[t+3]&&(this.buffer.pixels[t+0]=red(s),this.buffer.pixels[t+1]=green(s),this.buffer.pixels[t+2]=blue(s),this.buffer.pixels[t+3]=this.buffer.pixels[t+3])}if("Noise"==this.type){r=getRandomFromInterval(-this.pixelDistort,this.pixelDistort);var f=map(e,0,this.buffer.width,0,1);fxrand()>f?(this.buffer.pixels[t+0]+=r,this.buffer.pixels[t+1]+=r,this.buffer.pixels[t+2]+=r,this.buffer.pixels[t+3]=this.buffer.pixels[t+3]):(this.buffer.pixels[t+0]=red(this.noiseColor),this.buffer.pixels[t+1]=green(this.noiseColor),this.buffer.pixels[t+2]=blue(this.noiseColor),this.buffer.pixels[t+3]=this.buffer.pixels[t+3])}if("Fill Noise"==this.type&&(f=map(p5.Vector.dist(this.center,createVector(e,i)),0,this.maxDist,0,1),r=getRandomFromInterval(-this.pixelDistort,this.pixelDistort),0!=this.buffer.pixels[t+3]&&(fxrand()>f?(this.buffer.pixels[t+0]=0,this.buffer.pixels[t+1]=0,this.buffer.pixels[t+2]=0,this.buffer.pixels[t+3]=0):(this.buffer.pixels[t+0]=red(this.noiseColor)+r,this.buffer.pixels[t+1]=green(this.noiseColor)+r,this.buffer.pixels[t+2]=blue(this.noiseColor)+r,this.buffer.pixels[t+3]=this.buffer.pixels[t+3]))),"Only Perlin"==this.type){let e=50*noise(s,h);0!=this.buffer.pixels[t+3]&&(this.buffer.pixels[t+0]-=e,this.buffer.pixels[t+1]-=e,this.buffer.pixels[t+2]-=e,this.buffer.pixels[t+3]=this.buffer.pixels[t+3])}if("Combined Perlin"==this.type){let l=155*noise(s,h)+100;f=map(p5.Vector.dist(this.center,createVector(e,i)),0,this.maxDist,0,1),r=getRandomFromInterval(-this.pixelDistort,this.pixelDistort),0!=this.buffer.pixels[t+3]&&(fxrand()>f?(this.buffer.pixels[t+0]=0,this.buffer.pixels[t+1]=0,this.buffer.pixels[t+2]=0,this.buffer.pixels[t+3]=0):(this.buffer.pixels[t+0]=red(this.noiseColor)+r,this.buffer.pixels[t+1]=green(this.noiseColor)+r,this.buffer.pixels[t+2]=blue(this.noiseColor)+r,this.buffer.pixels[t+3]=l))}h+=.1}s+=.1}this.buffer.updatePixels()}}