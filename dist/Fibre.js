class Fibre{constructor(e){this.type=e.type,this.buffer=e.buffer,this.size=e.size,this.strokeSize=e.strokeSize,this.fillColor=e.fillColor,this.center=createVector(this.size/2,this.size/2),this.maxDist=Math.sqrt(this.size**2+this.size**2);let t=getRandomFromInterval(0,this.size/2),i=getRandomFromInterval(0,this.size/2),s=getRandomFromInterval(this.size/2,this.size),r=getRandomFromInterval(0,this.size/2),h=getRandomFromInterval(0,this.size/2),f=getRandomFromInterval(this.size/2,this.size),o=getRandomFromInterval(this.size/2,this.size),a=getRandomFromInterval(this.size/2,this.size);this.buffer.push(),this.buffer.fill(this.fillColor),this.buffer.noStroke(),this.buffer.beginShape(),this.buffer.vertex(t,i),this.buffer.vertex(t,i),this.buffer.vertex(s,r),this.buffer.vertex(o,a),this.buffer.vertex(h,f),this.buffer.vertex(h,f),this.buffer.endShape(CLOSE)}}