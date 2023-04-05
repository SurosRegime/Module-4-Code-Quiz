// HTML elements
const startButton = document.getElementById("start-button");
const quizContainer = document.getElementById("quiz-container");
const quizTitle = document.getElementById("quiz-title");
const quizTimer = document.getElementById("quiz-timer");
const quizScore = document.getElementById("quiz-score");
const quizQuestions = document.getElementById("quiz-questions");



const quizTime = 70; // seconds
const quizQuestionsArray = [
  {
    question: "What is the correct syntax for referring to an external script called 'script.js'?",
    options: ["<script src='script.js'>", "<script href='script.js'>", "<script name='script.js'>"],
    answer: "<script src='script.js'>"
  },
  {
    question: "Which event occurs when the user clicks on an HTML element?",
    options: ["onmouseover", "onchange", "onclick"],
    answer: "onclick"
  },
  {
    question: "What is the correct way to write a JavaScript array?",
    options: ["var colors = (1:'red', 2:'green', 3:'blue')", "var colors = ['red', 'green', 'blue']", "var colors = 'red, green, blue'"],
    answer: "var colors = ['red', 'green', 'blue']"
  },
  {
    question: "Which of the following is not a programming language?",
    choices: ["Java", "Python", "C++", "HTML"],
    answer: "HTML"
  },
  {
    question: "What does CSS stand for?",
    choices: ["Creative Style Sheets", "Computer Style Sheets", "Cascading Style Sheets", "Colorful Style Sheets"],
    answer: "Cascading Style Sheets"
  }
];

// Quiz state
let quizTimeLeft = quizTime;
let quizScoreValue = 0;
let quizQuestionIndex = 0;
let quizInterval;

// Functions
function startQuiz() {
  startButton.style.display = "none";
  quizTitle.textContent = "JavaScript Fundamentals Quiz";
  quizInterval = setInterval(updateQuizTimer, 1000);
  quizQuestionIndex = 0; 
  quizScoreValue = 0; 
  quizTimeLeft = quizTime; 
  displayQuizQuestion(); 
}

function displayQuizQuestion() {
  const currentQuestion = quizQuestionsArray[quizQuestionIndex];
  quizQuestions.innerHTML = `
    <h2>${currentQuestion.question}</h2>
    ${currentQuestion.options.map((option) => `
      <button onclick="checkQuizAnswer('${option}')">${option}</button>
    `).join("")}
  `;
}

function checkQuizAnswer(selectedOption) {
  const currentQuestion = quizQuestionsArray[quizQuestionIndex];
  if (selectedOption === currentQuestion.answer) {
    quizScoreValue += 10;
  } else {
    quizTimeLeft -= 10;
  }
  quizScore.textContent = `Score: ${quizScoreValue}`;
  quizQuestionIndex++;
  if (quizQuestionIndex < quizQuestionsArray.length) {
    displayQuizQuestion();
  } else {
    endQuiz();
  }
}

function updateQuizTimer() {
  quizTimeLeft--;
  quizTimer.textContent = `Time left: ${quizTimeLeft} seconds`;
  if (quizTimeLeft <= 0) {
    endQuiz();
  }
}

quizQuestions.innerHTML = `
    <h2>All done!</h2>
    <p>Your final score is ${quizScoreValue}.</p>
    <form>
      <label for="initials">Enter initials:</label>
      <input type="text" id="initials" name="initials">
      <button type="button" onclick="saveQuizScore()"> Submit </button>
    </form>
`;
 

function saveQuizScore() {
  const initials = document.getElementById("initials").value.trim().toUpperCase();
  if (initials !== "") {
    let quizScores = JSON.parse(localStorage.getItem("quizScores")) || [];
    quizScores.push({ initials: initials, score: quizScoreValue });
    localStorage.setItem("quizScores", JSON.stringify(quizScores));
    window.location;
  }
}


document.getElementById("start-button").addEventListener("click", startQuiz);