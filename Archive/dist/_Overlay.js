class Overlay{constructor(t){this.overlayColor=color(t),this.curveSexyness=1.1,this.noiseWeight=5,this.noiseColor=color("black"),this.buffer=createGraphics(width,height),this.buffer.curveTightness(this.curveSexyness),this.createCoverOverlay(),this.coverOverlay()}noise(){this.pointCount=6e4;for(var t=getSteep(this.A,this.A1),e=getSteep(this.A1,this.A2),h=getSteep(this.A2,this.A3),s=getSteep(this.A3,this.B),i=0;i<this.pointCount;i++){let i=getRandomFromInterval(0,width),r=randomGaussian(0,(this.A.y-this.D.y)/4);i>this.A.x&i<this.A1.x?this.baseY=t[0]*i+t[1]:i>this.A1.x&i<this.A2.x?this.baseY=e[0]*i+e[1]:i>this.A2.x&i<this.A3.x?this.baseY=h[0]*i+h[1]:this.baseY=s[0]*i+s[1];let f=this.baseY+abs(r);this.buffer.push(),this.buffer.stroke(this.noiseColor),this.buffer.strokeWeight(this.noiseWeight),this.buffer.point(i,f),this.buffer.pop()}}createBackgroundFoldCoords(){this.offsetMin=.99,this.offsetMax=1.01,this.randomOffset1=getRandomFromInterval(this.offsetMin,this.offsetMax),this.randomOffset2=getRandomFromInterval(this.offsetMin,this.offsetMax),this.randomOffset3=getRandomFromInterval(this.offsetMin,this.offsetMax),this.randomOffset4=getRandomFromInterval(this.offsetMin,this.offsetMax),this.randomOffset5=getRandomFromInterval(this.offsetMin,this.offsetMax),this.randomOffset6=getRandomFromInterval(this.offsetMin,this.offsetMax),this.A=createVector(0-1.1*width,height/8*3),this.A1=createVector(width/9*2,height/8*3*this.randomOffset1),this.A2=createVector(width/9*5,height/8*3*this.randomOffset2),this.A3=createVector(width/9*7,height/8*3*this.randomOffset3),this.B=createVector(1.1*width,height/8*3),this.C=createVector(1.1*width,height/8*5),this.C1=createVector(width/9*7,height/8*5*this.randomOffset4),this.C2=createVector(width/9*5,height/8*5*this.randomOffset5),this.C3=createVector(width/9*2,height/8*5*this.randomOffset6),this.D=createVector(0-1.1*width,height/8*5)}createBackgroundFold(){this.buffer.push(),this.buffer.noStroke(),this.buffer.fill(this.overlayColor),this.buffer.beginShape(),this.buffer.curveVertex(this.A.x,this.A.y),this.buffer.curveVertex(this.A.x,this.A.y),this.buffer.curveVertex(this.A1.x,this.A1.y),this.buffer.curveVertex(this.A2.x,this.A2.y),this.buffer.curveVertex(this.A3.x,this.A3.y),this.buffer.curveVertex(this.B.x,this.B.y),this.buffer.curveVertex(this.C.x,this.C.y),this.buffer.curveVertex(this.C1.x,this.C1.y),this.buffer.curveVertex(this.C2.x,this.C2.y),this.buffer.curveVertex(this.C3.x,this.C3.y),this.buffer.curveVertex(this.D.x,this.D.y),this.buffer.curveVertex(this.D.x,this.D.y),this.buffer.endShape(),this.buffer.pop()}createUpperLine(){this.buffer.push(),this.buffer.stroke(color("#111111")),this.buffer.strokeWeight(6),this.buffer.noFill(),this.buffer.beginShape(),this.buffer.curveVertex(this.A.x,this.A.y),this.buffer.curveVertex(this.A.x,this.A.y),this.buffer.curveVertex(this.A1.x,this.A1.y),this.buffer.curveVertex(this.A2.x,this.A2.y),this.buffer.curveVertex(this.A3.x,this.A3.y),this.buffer.curveVertex(this.B.x,this.B.y),this.buffer.curveVertex(this.B.x,this.B.y),this.buffer.endShape(),this.buffer.pop()}createLowerLine(){this.buffer.push(),this.buffer.stroke(color("#9e9e9e")),this.buffer.strokeWeight(6),this.buffer.noFill(),this.buffer.beginShape(),this.buffer.curveVertex(this.C.x,this.C.y),this.buffer.curveVertex(this.C.x,this.C.y),this.buffer.curveVertex(this.C1.x,this.C1.y),this.buffer.curveVertex(this.C2.x,this.C2.y),this.buffer.curveVertex(this.C3.x,this.C3.y),this.buffer.curveVertex(this.D.x,this.D.y),this.buffer.curveVertex(this.D.x,this.D.y),this.buffer.endShape(),this.buffer.pop()}createBackgroundFoldCoords(){this.offsetMin=.99,this.offsetMax=1.01,this.randomOffset1=getRandomFromInterval(this.offsetMin,this.offsetMax),this.randomOffset2=getRandomFromInterval(this.offsetMin,this.offsetMax),this.randomOffset3=getRandomFromInterval(this.offsetMin,this.offsetMax),this.randomOffset4=getRandomFromInterval(this.offsetMin,this.offsetMax),this.randomOffset5=getRandomFromInterval(this.offsetMin,this.offsetMax),this.randomOffset6=getRandomFromInterval(this.offsetMin,this.offsetMax),this.A=createVector(0-1.1*width,height/8*3),this.A1=createVector(width/9*2,height/8*3*this.randomOffset1),this.A2=createVector(width/9*5,height/8*3*this.randomOffset2),this.A3=createVector(width/9*7,height/8*3*this.randomOffset3),this.B=createVector(1.1*width,height/8*3),this.C=createVector(1.1*width,height/8*5),this.C1=createVector(width/9*7,height/8*5*this.randomOffset4),this.C2=createVector(width/9*5,height/8*5*this.randomOffset5),this.C3=createVector(width/9*2,height/8*5*this.randomOffset6),this.D=createVector(0-1.1*width,height/8*5)}createCoverTop(){this.TopA=createVector(0-this.offsetCanvas,0-this.offsetCanvas),this.TopB=createVector(width+this.offsetCanvas,0-this.offsetCanvas),this.TopC=createVector(width+this.offsetCanvas,height/8*1),this.TopD=createVector(width/8*5,height/8*1+this.randomOffset1),this.TopE=createVector(width/8*4,height/8*1+this.randomOffset2),this.TopF=createVector(width/8*3,height/8*1+this.randomOffset3),this.TopG=createVector(0-this.offsetCanvas,height/8*1)}createCoverLeft(){this.LeftA=createVector(0-this.offsetCanvas,0-this.offsetCanvas),this.LeftB=createVector(width/8*3,0-this.offsetCanvas),this.LeftC=createVector(width/8*3+this.randomOffset1,height/8*1),this.LeftD=createVector(width/8*3+this.randomOffset2,height/8*4),this.LeftE=createVector(width/8*3+this.randomOffset3,height/8*7),this.LeftF=createVector(width/8*3,height+this.offsetCanvas),this.LeftG=createVector(0-this.offsetCanvas,height+this.offsetCanvas)}createCoverBottom(){this.BottomA=createVector(0-this.offsetCanvas,height/8*7),this.BottomB=createVector(width/8*3,height/8*7+this.randomOffset1),this.BottomC=createVector(width/8*4,height/8*7+this.randomOffset2),this.BottomD=createVector(width/8*5,height/8*7+this.randomOffset3),this.BottomE=createVector(width+this.offsetCanvas,height/8*7),this.BottomF=createVector(width+this.offsetCanvas,height+this.offsetCanvas),this.BottomG=createVector(0-this.offsetCanvas,height+this.offsetCanvas)}createCoverRight(){this.RightA=createVector(width/8*5,0-this.offsetCanvas),this.RightB=createVector(width/8*5+this.randomOffset1,height/8*1),this.RightC=createVector(width/8*5+this.randomOffset1,height/8*4),this.RightD=createVector(width/8*5+this.randomOffset1,height/8*7),this.RightE=createVector(width/8*5,height+this.offsetCanvas),this.RightF=createVector(width+this.offsetCanvas,height+this.offsetCanvas),this.RightG=createVector(width+this.offsetCanvas,0-this.offsetCanvas)}createCoverOverlay(){this.offset=.01,this.randomOffset1=SHORTSIDE*getRandomFromInterval(-this.offset,this.offset),this.randomOffset2=SHORTSIDE*getRandomFromInterval(-this.offset,this.offset),this.randomOffset3=SHORTSIDE*getRandomFromInterval(-this.offset,this.offset),this.offsetCanvas=.1*SHORTSIDE,this.createCoverTop(),this.createCoverLeft(),this.createCoverBottom(),this.createCoverRight()}coverOverlay(){this.buffer.noStroke(),this.buffer.fill(this.overlayColor),this.createCoverOverlay(),this.buffer.beginShape(),this.buffer.curveVertex(this.TopA.x,this.TopA.y),this.buffer.curveVertex(this.TopA.x,this.TopA.y),this.buffer.curveVertex(this.TopB.x,this.TopB.y),this.buffer.curveVertex(this.TopC.x,this.TopC.y),this.buffer.curveVertex(this.TopD.x,this.TopD.y),this.buffer.curveVertex(this.TopE.x,this.TopE.y),this.buffer.curveVertex(this.TopF.x,this.TopF.y),this.buffer.curveVertex(this.TopG.x,this.TopG.y),this.buffer.curveVertex(this.TopG.x,this.TopG.y),this.buffer.endShape(),this.buffer.beginShape(),this.buffer.curveVertex(this.LeftA.x,this.LeftA.y),this.buffer.curveVertex(this.LeftA.x,this.LeftA.y),this.buffer.curveVertex(this.LeftB.x,this.LeftB.y),this.buffer.curveVertex(this.LeftC.x,this.LeftC.y),this.buffer.curveVertex(this.LeftD.x,this.LeftD.y),this.buffer.curveVertex(this.LeftE.x,this.LeftE.y),this.buffer.curveVertex(this.LeftF.x,this.LeftF.y),this.buffer.curveVertex(this.LeftG.x,this.LeftG.y),this.buffer.curveVertex(this.LeftG.x,this.LeftG.y),this.buffer.endShape(),this.buffer.beginShape(),this.buffer.curveVertex(this.BottomA.x,this.BottomA.y),this.buffer.curveVertex(this.BottomA.x,this.BottomA.y),this.buffer.curveVertex(this.BottomB.x,this.BottomB.y),this.buffer.curveVertex(this.BottomC.x,this.BottomC.y),this.buffer.curveVertex(this.BottomD.x,this.BottomD.y),this.buffer.curveVertex(this.BottomE.x,this.BottomE.y),this.buffer.curveVertex(this.BottomF.x,this.BottomF.y),this.buffer.curveVertex(this.BottomG.x,this.BottomG.y),this.buffer.curveVertex(this.BottomG.x,this.BottomG.y),this.buffer.endShape(),this.buffer.beginShape(),this.buffer.curveVertex(this.RightA.x,this.RightA.y),this.buffer.curveVertex(this.RightA.x,this.RightA.y),this.buffer.curveVertex(this.RightB.x,this.RightB.y),this.buffer.curveVertex(this.RightC.x,this.RightC.y),this.buffer.curveVertex(this.RightD.x,this.RightD.y),this.buffer.curveVertex(this.RightE.x,this.RightE.y),this.buffer.curveVertex(this.RightF.x,this.RightF.y),this.buffer.curveVertex(this.RightG.x,this.RightG.y),this.buffer.curveVertex(this.RightG.x,this.RightG.y),this.buffer.endShape()}show(){push(),image(this.buffer,0,0),pop()}}