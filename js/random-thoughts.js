var target = document.getElementById("target");
var titles = [
  "thoughts are like loose leaves of paper",
  "I was thinking about freedom and form in my dream last night. Form was my body and freedom was my soul.",
  "Co-star told me to express my inner world more.",
  "The cold makes you crazy the heat makes you lazy",
  "The sound of kissing",
  "Right now, I feel how I feel and we are where we are so it is what it is.",
  "U･ᴥ･U",
  "Is kaomoji accessible to screen readers? Does a screen reader know that this is a face with asterisks for ears: *^_^*?",

  //'the word wood at one point meant violently insane'
];

function newTitle() {
  var i = (Math.random() * titles.length) | 0;
  target.innerText = titles[i];
}

newTitle();
