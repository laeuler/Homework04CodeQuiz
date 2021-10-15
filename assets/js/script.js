//assign elements
var timerEL = document.getElementById("timeleft");
var startEL = document.getElementById("startnext");
var highEL = document.getElementById("highscores");
var backBtn = document.getElementById("back");
var scoreEL = document.getElementById("gameScore");
var saveBtn = document.getElementById("save");
var clearBtn = document.getElementById("clear");

//Pages
var quizA = document.getElementById("quizarea");
var highA = document.getElementById("highscorearea");
var questionA = document.getElementById("questionarea");
var scoreA = document.getElementById("scorearea");

//assign elements for questions
var questionEL = document.getElementById("question");
var answerEL = document.querySelectorAll(".answer");
var answerA_EL = document.getElementById("answerA");
var answerB_EL = document.getElementById("answerB");
var answerC_EL = document.getElementById("answerC");
var answerD_EL = document.getElementById("answerD");

//highscores
var scEL1 = document.getElementById("score1");
var inEL1 = document.getElementById("initials1");

//============================================== Array with Quiz Questions Objects
const quizQuestions = [
  {
    //Question 1
    question: "What does HTML stand for?",
    a: "Hard Text Markup Language",
    b: "Hyper Text Markup Location",
    c: "Hyper Text Markup Language",
    d: "Hyper Text Meme Language",
    correct: "answerC",
  },
  {
    //Question 2
    question: "How do you select all HTML elements on the page",
    a: "#all",
    b: ".all",
    c: "all",
    d: "*",
    correct: "answerD",
  },
  {
    //Question 3
    question: "Which option doesn't let you declare a variable in JavaScript?",
    a: "var",
    b: "let",
    c: "const",
    d: "new",
    correct: "answerD",
  },
  {
    //Question 4
    question: "DOM stands for",
    a: "Document Object Master",
    b: "Document Object Model",
    c: "Data Object Model",
    d: "Document Order Model",
    correct: "answerB",
  },
  {
    //Question 5
    question: "Which one is no semantic element in HTML",
    a: "<figure>",
    b: "<mark>",
    c: "<summary>",
    d: "navbar",
    correct: "answerD",
  },
];
//============================================== Start the game
function startGame() {
  questionCount = 0;
  gameScore = 0;
  timeLeft = 75;
  countdown();
  getQuestion();
  seeGame();
}

//============================================== Timer on the page
//general timer function to create a timer starting at 75 counting down each second
var timeLeft = 75;

function countdown() {
  var timeInterval = setInterval(myTimer, 1000);
  function myTimer() {
    //check if time left > 0
    if (gameScore > 1) {
      clearInterval(timeInterval);
    } else if (timeLeft > 1) {
      timerEL.textContent = "Time left: " + timeLeft + "s";
      timeLeft--;
      timerColor();
      console.log(gameScore);
    } else {
      timerEL.textContent = "Time's up!";
      clearInterval(timeInterval);
    }
  }
}

//function to deduct minus 10 seconds, if questions is answered incorrect
function minusten() {
  timeLeft = timeLeft - 10;
}

//timer color creates a sense of urgency through visual feedback
function timerColor() {
  //indicate time left with color coding
  if (timeLeft >= 40) {
    timerEL.style.color = "#83c165";
  } else if (timeLeft >= 20) {
    timerEL.style.color = "#ffa500";
  } else if (timeLeft < 20) {
    timerEL.style.color = "#f44336";
  }
}

//============================================== Get the questions from the array
var questionCount = 0;
var gameScore = 0;

function getQuestion() {
  if (questionCount < 5) {
    var getQuestionData = quizQuestions[questionCount];
    questionEL.textContent = getQuestionData.question;
    answerA_EL.textContent = getQuestionData.a;
    answerB_EL.textContent = getQuestionData.b;
    answerC_EL.textContent = getQuestionData.c;
    answerD_EL.textContent = getQuestionData.d;

    questionCount++;
    console.log(questionCount);
  } else {
    //get score
    gameScore = timeLeft;
    // and store it to local memory
    //stop timer
    //show result page
    showGameScore();
  }
}
//============================================== Evaluate Answers
//evaluate answer A
function evaluateAnswerA() {
  //check if the answer is the correct one
  var getQuestionData = quizQuestions[questionCount - 1];
  var correctAnswer = getQuestionData.correct;

  if (correctAnswer === "answerA") {
    getQuestion();
  } else {
    minusten();
    getQuestion();
  }
}

//evaluate answer B
function evaluateAnswerB() {
  //check if the answer is the correct one
  var getQuestionData = quizQuestions[questionCount - 1];
  var correctAnswer = getQuestionData.correct;

  if (correctAnswer === "answerB") {
    getQuestion();
  } else {
    minusten();
    getQuestion();
  }
}

//evaluate answer C
function evaluateAnswerC() {
  //check if the answer is the correct one
  var getQuestionData = quizQuestions[questionCount - 1];
  var correctAnswer = getQuestionData.correct;

  if (correctAnswer === "answerC") {
    getQuestion();
  } else {
    minusten();
    getQuestion();
  }
}

//evaluate answer D
function evaluateAnswerD() {
  //check if the answer is the correct one
  var getQuestionData = quizQuestions[questionCount - 1];
  var correctAnswer = getQuestionData.correct;

  if (correctAnswer === "answerD") {
    getQuestion();
  } else {
    minusten();
    getQuestion();
  }
}
//============================================== Local Storage Handling
//Store the Highscore
function saveScore() {
  var initials = prompt("Please type in your initials");

  localStorage.setItem("initials1", initials);
  localStorage.setItem("score1", gameScore);
  timerEL.textContent = ""

  seeHighScores();
}

//remove Local Storage
function clearLocal() {
  localStorage.clear();

  seeHighScores();
}
//============================================== Switch between pages HighScores Page
function seeHighScores() {
  quizA.setAttribute("class", "hidden");
  highA.setAttribute("class", "visible");
  questionA.setAttribute("class", "hidden");
  scoreA.setAttribute("class", "hidden");

  scEL1.textContent = localStorage.getItem("score1");
  inEL1.textContent = localStorage.getItem("initials1");
}

function backToGame() {
  quizA.setAttribute("class", "visible");
  highA.setAttribute("class", "hidden");
  questionA.setAttribute("class", "hidden");
  scoreA.setAttribute("class", "hidden");
}

function seeGame() {
  quizA.setAttribute("class", "hidden");
  highA.setAttribute("class", "hidden");
  questionA.setAttribute("class", "visible");
  scoreA.setAttribute("class", "hidden");
}

function showGameScore() {
  quizA.setAttribute("class", "hidden");
  highA.setAttribute("class", "hidden");
  questionA.setAttribute("class", "hidden");
  scoreA.setAttribute("class", "visible");

  scoreEL.textContent = gameScore;
}
//============================================== add event handler
startEL.addEventListener("click", startGame);
highEL.addEventListener("click", seeHighScores);
backBtn.addEventListener("click", backToGame);
saveBtn.addEventListener("click", saveScore);
clearBtn.addEventListener("click", clearLocal);

//click on answers
answerA_EL.addEventListener("click", evaluateAnswerA);
answerB_EL.addEventListener("click", evaluateAnswerB);
answerC_EL.addEventListener("click", evaluateAnswerC);
answerD_EL.addEventListener("click", evaluateAnswerD);
