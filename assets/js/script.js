//Assignment of misc. elements
var timerEL = document.getElementById("timeleft");
var highEL = document.getElementById("highscores");
var startEL = document.getElementById("startnext");
var backBtn = document.getElementById("back");
var scoreEL = document.getElementById("gameScore");
var saveBtn = document.getElementById("save");
var clearBtn = document.getElementById("clear");
var rankEL = document.getElementById("ranking");

//Areas in DOM simulate the different pages in the UX
var quizA = document.getElementById("quizarea");
var highA = document.getElementById("highscorearea");
var questionA = document.getElementById("questionarea");
var scoreA = document.getElementById("scorearea");

//Assign Elements to load questions to the right element
var questionEL = document.getElementById("question");
var answerEL = document.querySelectorAll(".answer");
var answerA_EL = document.getElementById("answerA");
var answerB_EL = document.getElementById("answerB");
var answerC_EL = document.getElementById("answerC");
var answerD_EL = document.getElementById("answerD");
var questionCont = document.getElementById("questioncontent");
var feedbackEL = document.getElementById("feedback");

//highscore ranking
var scEL1 = document.getElementById("score1");
var inEL1 = document.getElementById("initials1");
var scEL2 = document.getElementById("score2");
var inEL2 = document.getElementById("initials2");
var scEL3 = document.getElementById("score3");
var inEL3 = document.getElementById("initials3");

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
  //set all counts to zero and reset timer
  questionCount = 0;
  gameScore = 0;
  timeLeft = 75;
  //start countdown and laod questions
  countdown();
  getQuestion();
  //jump to game UI + hide option to jump to highscores mid game
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
    } else {
      timerEL.textContent = "Time's up!";
      clearInterval(timeInterval);
      setTimeout(showGameScore, 1000);
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
  } else {
    //get score
    gameScore = timeLeft;
    //show result page
    setTimeout(showGameScore, 1000);
  }
}
//============================================== Evaluate Answers
//evaluate answer
function evaluateAnswer(event) {
  var givenAnswer = event.target.id;
  //check if the answer is the correct one, we have to deduct -1 since we increase the question count after loading the question
  var getQuestionData = quizQuestions[questionCount - 1];
  var correctAnswer = getQuestionData.correct;

  console.log(
    "correct Answer " + correctAnswer + " , " + "given Answer :" + givenAnswer
  );

  if (correctAnswer === givenAnswer) {
    positiveFeedback();
    getQuestion();
  } else {
    negativeFeedback();
    minusten();
    getQuestion();
  }
}

function positiveFeedback() {
  console.log("correct");
  feedbackEL.textContent = "Correct! :-)";
  feedbackEL.style.color = "green";
  setTimeout(hideElement, 1000);
}

function negativeFeedback() {
  console.log("wrong");
  feedbackEL.textContent = "Wrong! -10s :-/";
  feedbackEL.style.color = "red";
  setTimeout(hideElement, 1000);
}

function hideElement() {
  feedbackEL.textContent = "";
}
//============================================== Local Storage Handling and Ranking
//give the user feedback about his/her ranking
function feedbackRanking() {
  saveBtn.textContent = "Save your score now";
  //get local storage
  var placeOne = localStorage.getItem("score1");
  var placeTwo = localStorage.getItem("score2");
  var placeThree = localStorage.getItem("score3");

  console.log(placeOne);
  console.log(placeTwo);
  console.log(placeThree);
  console.log(gameScore);

  //first loop: check how many local higscores are exisiting
  //second loop within: check the rank within the existing higscore

  if (placeOne == null) {
    //new highscore
    rankEL.textContent = "yeah 1st place!";
  } else if (placeTwo == null) {
    if (gameScore >= placeOne) {
      //new highscore
      rankEL.textContent = "yeah 1st place!";
    } else {
      //second place
      rankEL.textContent = "Strong! 2nd place!";
    }
  } else if (placeThree == null) {
    if (gameScore >= placeOne) {
      //new higscore
      rankEL.textContent = "yeah 1st place!";
    } else if (gameScore >= placeTwo) {
      // second place
      rankEL.textContent = "Strong! 2nd place!";
    } else {
      //third place
      rankEL.textContent = "Nice! You made it to the Olymp!";
    }
  } else {
    if (gameScore >= placeOne) {
      //new higscore
      rankEL.textContent = "yeah 1st place!";
    } else if (gameScore >= placeTwo) {
      // second place
      rankEL.textContent = "Strong! 2nd place!";
    } else if (gameScore >= placeThree) {
      //third place
      rankEL.textContent = "Nice! You made it to the Olymp!";
    } else {
      rankEL.textContent = "So close. No new highscore.";
      //make button to try again
      saveBtn.textContent = "Try again!";
    }
  }
}

//higscore is rank 1
function newOne() {
  var initials = localStorage.getItem("latest");
  //#3 = old #2
  if (localStorage.getItem("score2") != null) {
    localStorage.setItem("score3", localStorage.getItem("score2"));
    localStorage.setItem("initials3", localStorage.getItem("initials2"));
  }
  //#2 = old #1
  if (localStorage.getItem("score1") != null) {
    localStorage.setItem("score2", localStorage.getItem("score1"));
    localStorage.setItem("initials2", localStorage.getItem("initials1"));
  }
  // new #1
  localStorage.setItem("score1", gameScore);
  localStorage.setItem("initials1", initials);
}
//higscore is rank 2
function newTwo() {
  var initials = localStorage.getItem("latest");
  //#1 stays the same
  //#3 = old #2
  if (localStorage.getItem("score1") != null) {
    localStorage.setItem("score3", localStorage.getItem("score2"));
    localStorage.setItem("initials3", localStorage.getItem("initials2"));
  }
  //new #2
  localStorage.setItem("score2", gameScore);
  localStorage.setItem("initials2", initials);
}
//Highscore is rank 3
function newThree() {
  var initials = localStorage.getItem("latest");
  //#1 stays the same
  //#2 stays the same
  //new #2
  localStorage.setItem("score3", gameScore);
  localStorage.setItem("initials3", initials);
}

//save the ranking
function saveScore() {
  if (saveBtn.textContent == "Try again!") {
    startGame();
    return;
  }

  var initials = prompt("Please type in your initials");
  localStorage.setItem("latest", initials);
  //get local storage
  var placeOne = localStorage.getItem("score1");
  var placeTwo = localStorage.getItem("score2");
  var placeThree = localStorage.getItem("score3");

  //first loop: check how many local higscores are exisiting
  //second loop within: check the rank within the existing higscore

  if (placeOne == null) {
    //new highscore
    newOne();
  } else if (placeTwo == null) {
    if (gameScore >= placeOne) {
      //new highscore
      newOne();
    } else {
      //second place
      newTwo();
    }
  } else if (placeThree == null) {
    if (gameScore >= placeOne) {
      //new higscore
      newOne();
    } else if (gameScore >= placeTwo) {
      // second place
      newTwo();
    } else {
      //third place
      newThree();
    }
  } else {
    if (gameScore >= placeOne) {
      //new higscore
      newOne();
    } else if (gameScore >= placeTwo) {
      // second place
      newTwo();
    } else if (gameScore >= placeThree) {
      //third place
      newThree();
    }
  }
  //jump to higscore page afterwards
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

  //get highscore list from local storage
  scEL1.textContent = localStorage.getItem("score1");
  inEL1.textContent = localStorage.getItem("initials1");

  scEL2.textContent = localStorage.getItem("score2");
  inEL2.textContent = localStorage.getItem("initials2");

  scEL3.textContent = localStorage.getItem("score3");
  inEL3.textContent = localStorage.getItem("initials3");
}

function backToGame() {
  highA.setAttribute("class", "visible");
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
  highEL.setAttribute("class", "hidden");
}

function showGameScore() {
  quizA.setAttribute("class", "hidden");
  highA.setAttribute("class", "hidden");
  questionA.setAttribute("class", "hidden");
  scoreA.setAttribute("class", "visible");
  highEL.setAttribute("class", "visible");

  scoreEL.textContent = gameScore;
  timerEL.textContent = "";

  feedbackRanking();
}
//============================================== Event Handler
//Navigation Items
startEL.addEventListener("click", startGame);
highEL.addEventListener("click", seeHighScores);
backBtn.addEventListener("click", backToGame);
saveBtn.addEventListener("click", saveScore);
clearBtn.addEventListener("click", clearLocal);

//Click on Question
questionCont.addEventListener("click", evaluateAnswer);
