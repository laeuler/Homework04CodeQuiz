//assign elements
var timerEL = document.getElementById("timeleft");
var startEL = document.getElementById("startnext");
var highEL = document.getElementById("highscores");
var quizA = document.getElementById("quizarea");
var highA = document.getElementById("highscorearea");
var backBtn = document.getElementById("back");

//Array with Quiz Questions Objects

const quizQuestions = [
  {
    //Question 1
    question: "What does HTML stand for?",
    a: "Hard Text Markup Language",
    b: "Hyper Text Markup Location",
    c: "Hyper Text Markup Language",
    d: "Hyper Text Meme Language",
    right: "c",
  },
  {
    //Question 2
    question: "How do you select all HTML elements on the page",
    a: "#all",
    b: ".all",
    c: "all",
    d: "*",
    right: "d",
  },
  {
    //Question 3
    question: "Which option doesn't let you declare a variable in JavaScript?",
    a: "var",
    b: "let",
    c: "const",
    d: "new",
    right: "d",
  },
  {
    //Question 4
    question: "DOM stands for",
    a: "Document Object Master",
    b: "Document Object Model",
    c: "Data Object Model",
    d: "Document Order Model",
    right: "b",
  },
  {
    //Question 5
    question: "Which one is no semantic element in HTML",
    a: "<figure>",
    b: "<mark>",
    c: "<summary>",
    d: "navbar",
    right: "d",
  },
];
var timeLeft = 75;

//Timer on the page
function countdown() {
  console.log("funciton executed");
  timeLeft = 75;

  //function to be called every 1000ms
  var timeInterval = setInterval(function () {
    //check if time left > 0
    if (timeLeft > 1) {
      console.log(timeLeft);
      timerEL.textContent = "Time left: " + timeLeft + "s";
      timeLeft--;
      timerColor();
    } else {
      timerEL.textContent = "Time's up!";
      clearInterval(timeInterval);
    }
  }, 1000);
}

//function to deduct minus 10 secons
function minusten() {
  timeLeft = timeLeft - 10;
  console.log(timeLeft);
}

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

//Switch to HighScores Page
function seeHighScores() {
  quizA.setAttribute("class", "hidden");
  highA.setAttribute("class", "visible");
}

function backToGame() {
  quizA.setAttribute("class", "visible");
  highA.setAttribute("class", "hidden");
}

//add event handler
startEL.addEventListener("click", countdown);
highEL.addEventListener("click", seeHighScores);
backBtn.addEventListener("click", backToGame);
