// "I am deeply rooted here" an interactive poem by enn wren (@nnekaisonline), where lines represent feelings and sensory experiences.

var pronouns = ["I", "we", "they"];
var verbs = ["feel", "see","taste","hear", "smell"];
var lines = ["the bed beneath my palms and feet", 
             "the mattress sheet", 
             "the buzzing hum of the fan, and mom mumbling in the background", 
             "a pale olive white wall and a setting sun fading across it", 
            "apartment buildings and a parking garage outside my window",
            "the citrus remains of a clementine on my tongue",
            "stuffy, dry air"]


// Variables to hold the descriptive text
var descriptiveText;
var descriptiveParagraph;

function setup() { 
  createCanvas(1000, 1000);
  noLoop();
  textSize(35);
} 

function draw() { 
  background(random(95,255),random(120,255),random(105,255));  
  
  var rnd_line = random(lines);
  var rnd_verb = random(verbs);
  var rnd_pronoun = random(pronouns);
  
  text(rnd_pronoun, random(200),100);
  
  text(rnd_verb,random(75),150);

  text(rnd_line,50,200,950);
    // Work-around for word-wrapping: The 900 at the end of the line above     // tells p5 to create an invisible text box 
    // with a width of 950 pixels.

  
    text("I am deepy rooted here",50,350);

}

function mousePressed(){
 draw();
}

