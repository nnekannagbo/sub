var target = document.getElementById("target");
var titles = [
  "Sometimes laughter and pain sound the same",
  "thoughts are like loose leaves of paper",
  "I was thinking about freedom and form in my dream last night. Form was my body and freedom was my soul.",
  "just cause you perceive it as so does not make it so.",
  "Co-star told me to express my inner world more.",
  "I make many lists",
  "Is kaomoji accessible to screen readers? Does a screen reader know that this is a face with asterisks for ears: *^_^*?",

  //'the word wood at one point meant violently insane'
];

function newTitle() {
  var i = (Math.random() * titles.length) | 0;
  target.innerText = titles[i];
}

newTitle();
