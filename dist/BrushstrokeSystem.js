class BrushstrokeSystem{constructor(t){this.orientation=t.orientation,this.brushCount=t.brushCount,this.brushTemplateCount=t.brushTemplateCount,this.brushTemplateSize=t.brushTemplateSize,this.brushTemplateStrokeSize=t.brushTemplateStrokeSize,this.brushTemplateFillColor=t.brushTemplateFillColor,this.brushTemplateFillColorDistort=t.brushTemplateFillColorDistort,this.brushTemplateStrokeColor=t.brushTemplateStrokeColor,this.brushTemplateStrokeColorDistort=t.brushTemplateStrokeColorDistort,this.brushCurveSexyness=t.brushCurveSexyness,this.noiseIncrement=t.noiseIncrement,this.DEBUG=t.DEBUG,this.noiseColor=t.noiseColor,this.brushPixelDistort=t.brushPixelDistort,this.brushOpacityDistort=t.brushOpacityDistort,this.brushType=t.brushType,"x"==this.orientation?(this.originA=createVector(0,height),this.targetA=createVector(width,height),this.originB=createVector(0,0),this.targetB=createVector(width,0)):(this.originA=createVector(width/10*0,height/10*0),this.targetA=createVector(width/10*0,height/10*10),this.originB=createVector(width/10*10,height/10*0),this.targetB=createVector(width/10*10,height/10*10)),this.distanceAB=p5.Vector.dist(this.originA,this.originB),this.densityFactor=this.distanceAB/this.brushCount,this.loopGrow=p5.Vector.sub(this.originB,this.originA).normalize(),this.allFinished=!1,this.buffer=createGraphics(width,height),this.brushTemplates=[],this.brushstrokes=[],this.createBrushTemplates();let e=0;for(var s=0;s<this.brushCount;s++)t.origin=p5.Vector.add(this.originA,p5.Vector.mult(this.loopGrow,s*this.densityFactor)),t.target=p5.Vector.add(this.targetA,p5.Vector.mult(this.loopGrow,s*this.densityFactor)),t.sprite=getRandomFromList(this.brushTemplates),t.drawBuffer=this.buffer,e+=this.noiseIncrement,t.turningFactor=1*noise(e),t.brushIndex=s,this.brushstrokes.push(new Brushstroke(t));this.create()}createBrushTemplates(){for(var t=0;t<this.brushTemplateCount;t++){var e={noiseColor:this.noiseColor,size:this.brushTemplateSize,strokeSize:this.brushTemplateStrokeSize,fillColor:distortColorSuperNew(this.brushTemplateFillColor,this.brushTemplateFillColorDistort),strokeColor:distortColorSuperNew(this.brushTemplateStrokeColor,this.brushTemplateStrokeColorDistort),curveSexyness:this.brushCurveSexyness,pixelDistort:this.brushPixelDistort,type:this.brushType};this.brushTemplates.push(new Brush(e).buffer)}}showBrushTemplates(){for(var t=0;t<this.brushTemplates.length;t++)image(this.brushTemplates[t],t*this.brushTemplates[t].width,0)}check_all_complete(){if(0==this.allFinished||this.brushstrokes.length>0){for(var t of(this.brushstrokes_alive=[],this.brushstrokes))this.brushstrokes_alive.push(t.finished);this.brushstrokes_alive.every((t=>!0===t))&&(this.allFinished=!0)}}create(){for(;0==this.allFinished;){for(var t=0;t<this.brushstrokes.length;t++){var e=this.brushstrokes[t];0==e.finished&&(e.updateBrushstroke(),e.showBrushstroke(),e.applyForce(e.seek(!0)))}this.check_all_complete()}}show(){this.allFinished&&(push(),image(this.buffer,0,0),pop()),this.DEBUG&&(push(),translate(this.originA.x,this.originA.y),fill(color("orange")),noStroke(),circle(0,0,50),pop(),push(),translate(this.targetA.x,this.targetA.y),fill(color("green")),noStroke(),circle(0,0,50),pop(),push(),translate(this.originB.x,this.originB.y),fill(color("orange")),noStroke(),circle(0,0,50),pop(),push(),translate(this.targetB.x,this.targetB.y),fill(color("green")),noStroke(),circle(0,0,50),pop())}}