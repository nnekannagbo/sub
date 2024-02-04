cx = 200;
cy = 200;
cSize = 100;

let sound;

function preload() {
  sound = loadSound('circle.wav');
}

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
  describe(`white circle center. turns blue and doubles in size when mouse clicks center of circle, or when left arrow key or enter key are pressed, and returns to white and original size when released.`);
  if(sound.isPlaying()) {
    fill(0, 30, 252)
    cSize = 200;
    text('this is a circle', 80, 100)
  } else {
    fill(255);
    cSize = 100;
  }
  
  ellipse(cx, cy, cSize);
}

function mousePressed() {
  let d = dist(mouseX, mouseY, cx, cy)
  if(d < cSize/2) {
    sound.play();
  }
//   dist funciton gives you the distance between any two positions on the canvas
}

function keyPressed() {
  if (keyCode === LEFT_ARROW || ENTER) {
    sound.play();
    fill(0, 30, 252)
    cSize = 200;
    text('this is a circle', 80, 100)
  } 
}

// Note to self: check for custom keys by looking up the keyCode of any key on a site like this: keycode.info.