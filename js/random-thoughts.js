var target = document.getElementById('target');
var titles = [
    'Sometimes laughter and agony sound the same',
    'thoughts are like loose leaves of paper',
    'I was thinking about freedom and form in my dream last night. Form was my body and freedom was my soul.',
    'Just because you perceive it as so does not make it so.',
 
];

function newTitle() {
    var i = (Math.random() * titles.length) | 0;
    target.innerText = titles[i];
}

newTitle();