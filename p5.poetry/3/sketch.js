// "a dead talking head"
// Designed and developed by Nneka Nnagbo (nnekaisonline)


// let leftEyeHeight = 30;
let lineWidth;
let r, g, b;
let xLeftEar = 125;
let xRightEar = 285;
let speed = 0;
let speedLeft = 0;
let bounceBack = 0;
let happyEyes = 255;
let bounceBackWidth = 0;

let song;

function preload() {
  song = loadSound('mySound.wav');
}

function setup() {
  createCanvas(400, 400);
  song.loop();
}

function draw() {
  background(300, 200, 10, 1);
  lineWidth = random(1, 5);
  r = random(255);
  g = random(255);
  b = random(255);

  // shoulders
  stroke(mouseY);
  fill(0, 30, 90);
  strokeWeight(2);
  rect(0, 300, 400, 300);

  // neck
  fill(4, 3, 2);
  rect(180, 250, 50, 70);
  // head
  fill(40, 3, 2);
  ellipse(205, 160, 150, 195);

  // left eye
  fill(200, 30, 0);
  ellipse(155, 160, 30, 10);
  // right eye
  ellipse(255, 160, 30, 10);
  
  if (mouseX >= 190 && mouseX < 211 && mouseY >= 8 && mouseY < 61) {
      fill(happyEyes);
      }

  if (mouseX > 200) {
    ellipse(155, 160, 30, 30);
    ellipse(255, 160, 30, 30); 
  }
  
  // left ear
  fill(70, 5, 30, 10);
  stroke(255);
  ellipse(xLeftEar, 160, 50, 50);  
  
  xLeftEar = xLeftEar + speedLeft;

  if (xRightEar < 285) {
    speedLeft = 3 - 2;
  }
  
  
  // right ear
  fill(10, 100, 0, 10);
  ellipse(xRightEar, 160, 50, 50);
  
  xRightEar = xRightEar + speed + bounceBack + bounceBackWidth;

  if (mouseX > 300) {
    speed = -3 + 2 
  }
  
   if (xRightEar <= 0) {
    bounceBack = 3;
  }
  
  // xRightEar = xRightEar + bounceBack;
  
  if (xRightEar > width) {
    bounceBackWidth = -3;
  }
  
    // xRightEar = xRightEar + bounceBackWidth;

  
    
  //nose
  fill(100, 50, 20);
  rect(198, 115, 15, 60);

  //mouth
    fill(random(b));
  if (mouseIsPressed) 
  ellipse(206,202,random(30,40));
  else
  line(137, 202, 272, 205);
  
  
  // antenna
  strokeWeight(lineWidth);
  fill(r, g, b, 30);
  rect(200, 8, 10, 61);
  
  if (mouseIsPressed) {
       text("i try to catch hold of her but she keeps moving. every time i reach for her, she’s somewhere new.", 10, 350, 400); 
    song.play();
  }

  function mousePressed() {
  if (song.isPlaying()) {
    // .isPlaying() returns a boolean
    song.pause(); // .play() will resume from .pause() position
  } else {
    song.play();
  }
}
  
  
  // leftEyeHeight++
}

// function mousePressed () {
//   leftEyeHeight = 0;
// }
