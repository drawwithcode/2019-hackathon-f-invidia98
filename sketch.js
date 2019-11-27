var sigla;
var myFont;
var obj = [];
var sizeImg = 10;
var waveform;
var volume_level;
var energy;
var energy2;
var analyzer;
var myImage;
var myImage2;


function preload(){
  soundFormats('mp3');
  sigla = loadSound("./assets/TG1_new.mp3");
  myImage = loadImage("./assets/World-Free-PNG-Image.png");
  myImage2 = loadImage("./assets/TG1.png");
  myFont = loadFont('./assets/Avenir.otf');
  // for (var i = 0; i < 100; i++) {
  //   obj[i] = new Obj;
  // }


}


function setup() {
  createCanvas(windowWidth,windowHeight)
  // sigla.setVolume(0.1);
  analyzer = new p5.FFT();
  volume = new p5.Amplitude();
  myPart = new p5.Part();
  file = new p5.SoundFile();



}






function draw() {
  translate(width/2,height/2)

  background("black");

  angleMode(DEGREES)
  textSize(32);
  noStroke();
  textAlign(CENTER, CENTER)
  fill(200, 0, 0)
  text('ENTER to play', 0, -height/2+50);

  analyzer.analyze();
  volume_level = volume.getLevel();
  waveform = analyzer.waveform();
  energy = analyzer.getEnergy("mid");
  energy2 = analyzer.getEnergy("treble");
  for (var i = 0; i < obj.length; i++) {
    //obj[i].coordinate();
    obj[i].display();
  }



  if (sigla.isPlaying()){
      playing();
      if (energy>0 && energy<40) {
          obj[0] = new Obj()
      }
      if (energy2>70 && energy2<100) {
          obj.push(new Obj2(random(-400,200),random(-400,200)))
      }


  } else {
    sizeImg = 0;
    frameCount=0;
    obj.splice(0);
  }




}

function keyPressed(){
  if (keyCode===ENTER) {
      sigla.play();

  }


}

function playing(){

  sizeImg+=frameCount/100
  if (sizeImg>=200) {
    sizeImg=200;


  }

  rotate(map(sizeImg,0,200,0,1800));
  image(myImage,0-sizeImg/2,0-sizeImg/2, sizeImg, sizeImg)
  rotate(0);
  heightRemap = map(sizeImg, 0, 200,-height ,0-sizeImg/2)
  image(myImage2,0-300/2,heightRemap, 300 )

}







function Obj(px,py){
  var d;



  this.coordinate = function(){
    this.x = width/2;
    this.y = height/2;
    // d = dist(x, y, this.x, this.y);
  }
  this.display = function(){
    // fill("red")
    // ellipse(px, py, peso)


  strokeWeight(1);
  beginShape();
  noFill()

  for (var i = 0; i < 1800; i++) {
    var colorMap = map(frameCount, 0, 200, 0, 255)
    stroke(colorMap, 0, colorMap)
    let x = map(i, 0, waveform.length, -width, width);
    let y = map( waveform[i], -1, 1, -height, height);
    vertex(x, y)

  }
  endShape();
  }



}


function Obj2(px,py){
  var d;



  this.coordinate = function(){
    this.x = width/2;
    this.y = height/2;
    // d = dist(x, y, this.x, this.y);
  }
  this.display = function(){
    // fill("red")
    // ellipse(px, py, peso)


  strokeWeight(1);
  beginShape();
  noFill()

  for (var i = 0; i < 1800; i++) {
    var colorMap = map(frameCount, 0, 200, 0, 255)
    stroke(colorMap, 0, 0)
    var x = map(cos(i), 0, 1, 100 + waveform[i], 50 * waveform[i])
    var y = map(sin(i), 0, 1, 100 + waveform[i], 50 * waveform[i])
    vertex(x + px, y + py)

  }
  endShape();
  }



}

function windowResized() {
	resizeCanvas(windowWidth, windowHeight);
}
