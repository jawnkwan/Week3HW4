var questions = [{
    title: "In which HTML element do we put the JavaScript?",
    choices: ["script", "javascript", "scripting", "js"],
    answer: "script"
},
{
    title: "Where is the correct place to insert a JavaScript?",
    choices: ["the head section", "the body section", "both", "none of the above"],
    answer: "both"
},
{
    title: "Which event occurs when the user clicks on an HTML element?",
    choices: ["onmouseclick", "onchange", "onclick", "onmouseover"],
    answer: "onclick"
},
{
    title: "How do you create a function in JavaScript?",
    choices: ["function = myFunction()", "function:myFunction()", "function myFunction()"],
    answer: "function myFunction()"
},
{
    title: "How does a FOR loop start?",
    choices: ["for (i = 0; i <= 5; i++)", "for i = 1 to 5", "for (i = 0; i <= 5)", "for (i <= 5; i++)"],
    answer: "for (i = 0; i <= 5; i++)"
}
]

var score = 0;
var currentQuestion = -1;
var timeLeft = 0;
var timer;

function start() {

timeLeft = 75;
document.getElementById("timeLeft").innerHTML = timeLeft;

timer = setInterval(function() {
    timeLeft--;
    document.getElementById("timeLeft").innerHTML = timeLeft;
    if (timeLeft <= 0) {
        clearInterval(timer);
        endGame(); 
    }
}, 1000);

next();
}

function endGame() {
clearInterval(timer);

var quizContent = `
<h2>Game over!</h2>
<h3>You got a ` + score +  ` /100!</h3>
<h3>That means you got ` + score / 20 +  ` questions correct!</h3>
<input type="text" id="name" placeholder="First name"> 
<button onclick="setScore()">Set score!</button>`;

document.getElementById("quizBody").innerHTML = quizContent;
}

function setScore() {
localStorage.setItem("highscore", score);
localStorage.setItem("highscoreName",  document.getElementById('name').value);
getScore();
}


function getScore() {
var quizContent = `
<h2>` + localStorage.getItem("highscoreName") + `'s highscore is:</h2>
<h1>` + localStorage.getItem("highscore") + `</h1><br> 

<button onclick="clearScore()">Clear score!</button><button onclick="resetGame()">Play Again!</button>

`;

document.getElementById("quizBody").innerHTML = quizContent;
}

function clearScore() {
localStorage.setItem("highscore", "");
localStorage.setItem("highscoreName",  "");

resetGame();
}

function resetGame() {
clearInterval(timer);
score = 0;
currentQuestion = -1;
timeLeft = 0;
timer = null;

document.getElementById("timeLeft").innerHTML = timeLeft;

var quizContent = `
<h1>
    JavaScript Quiz!
</h1>
<h3>
    Click to play!   
</h3>
<button onclick="start()">Start!</button>`;

document.getElementById("quizBody").innerHTML = quizContent;
}

function incorrect() {
timeLeft -= 15; 
next();
}

function correct() {
score += 20;
next();
}

function next() {
currentQuestion++;

if (currentQuestion > questions.length - 1) {
    endGame();
    return;
}

var quizContent = "<h2>" + questions[currentQuestion].title + "</h2>"

for (var buttonLoop = 0; buttonLoop < questions[currentQuestion].choices.length; buttonLoop++) {
    var buttonClickCode = "<button onclick=\"[ANS]\">[CHOICE]</button>"; 
    buttonClickCode = buttonClickCode.replace("[CHOICE]", questions[currentQuestion].choices[buttonLoop]);
    if (questions[currentQuestion].choices[buttonLoop] == questions[currentQuestion].answer) {
        buttonClickCode = buttonClickCode.replace("[ANS]", "correct()");
    } else {
        buttonClickCode = buttonClickCode.replace("[ANS]", "incorrect()");
    }
    quizContent += buttonClickCode
}


document.getElementById("quizBody").innerHTML = quizContent;
}