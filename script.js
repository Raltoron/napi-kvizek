let questions = [];
let currentQuestionIndex = 0;
let score = 0;
let selectedCategory = "";

fetch("questions.json")
  .then(response => response.json())
  .then(data => {
    questions = data;
  });

document.querySelectorAll(".category").forEach(button => {
  button.addEventListener("click", () => {
    selectedCategory = button.dataset.category;
    startQuiz();
  });
});

function startQuiz() {
  document.getElementById("category-selection").classList.add("hidden");
  document.getElementById("quiz").classList.remove("hidden");
  currentQuestionIndex = 0;
  score = 0;
  showQuestion();
}

function showQuestion() {
  const questionData = questions[selectedCategory][currentQuestionIndex];
  document.getElementById("question").textContent = questionData.question;
  const answersList = document.getElementById("answers");
  answersList.innerHTML = "";
  questionData.answers.forEach((answer, index) => {
    const li = document.createElement("li");
    li.textContent = answer;
    li.addEventListener("click", () => selectAnswer(index));
    answersList.appendChild(li);
  });
}

function selectAnswer(selectedIndex) {
  const questionData = questions[selectedCategory][currentQuestionIndex];
  if (selectedIndex === questionData.correct) {
    score++;
  }
  document.getElementById("next-question").classList.remove("hidden");
}

document.getElementById("next-question").addEventListener("click", () => {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions[selectedCategory].length) {
    showQuestion();
    document.getElementById("next-question").classList.add("hidden");
  } else {
    endQuiz();
  }
});

function endQuiz() {
  document.getElementById("quiz").classList.add("hidden");
  document.getElementById("result").classList.remove("hidden");
  document.getElementById("score").textContent = `5-ből ${score} helyes válasz!`;
}

document.getElementById("restart").addEventListener("click", () => {
  document.getElementById("result").classList.add("hidden");
  document.getElementById("category-selection").classList.remove("hidden");
});
