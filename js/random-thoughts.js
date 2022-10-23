var target = document.getElementById('target');
var titles = [
    'Sometimes laughter and agony sound the same',
    'thoughts are like loose leaves of paper',
    'I was thinking about freedom and form in my dream last night. Form was my body and freedom was my soul.',
    'just cause you perceive it as so does not make it so.',
    'Co-star told me to express my inner world more.',
    'I make many lists',
    'are footnotes accessible to screen readers? what about an *asterisk?'
    //'the word wood at one point meant violently insane'
];

function newTitle() {
    var i = (Math.random() * titles.length) | 0;
    target.innerText = titles[i];
}

newTitle();