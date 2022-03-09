const guessBtn = document.querySelector(".guess-btn");
const userInput = document.querySelector(".number-input");
const remainingChances = document.querySelector(".remaining-chance span");
const downUp = document.querySelector(".down-up");
const resetBtn = document.querySelector(".reset-btn");
let chances = 5;
let randomNumber = 0;
let gameOver = false;
let userAnswers = [];

guessBtn.addEventListener("click", play);
resetBtn.addEventListener("click", reset);
userInput.addEventListener("focus", function () {
  userInput.value = "";
});

function randomNumberGenerator() {
  randomNumber = Math.floor(Math.random() * 100) + 1;
}

function play(e) {
  e.preventDefault();
  const userAnswer = parseInt(userInput.value, 10);
  if (userAnswer < 1 || userAnswer > 100) {
    downUp.innerText = "You should put number between 1 to 100";
    return;
  }
  if (userAnswers.includes(userAnswer)) {
    downUp.innerText = `You already put this number, ${userAnswer}`;
    return;
  }

  userAnswers.push(userAnswer);
  chances--;
  remainingChances.innerHTML = chances;

  if (userAnswer == randomNumber) {
    chances++;
    downUp.innerText = `${randomNumber} is Correct!`;
    gameOver = true;
  } else if (userAnswer > randomNumber) {
    downUp.innerText = "Down!";
  } else {
    downUp.innerText = "UP!";
  }
  if (chances == 0) {
    downUp.innerText = `Game over, The answer was ${randomNumber}.`;
    gameOver = true;
  }
  if (gameOver == true) {
    guessBtn.disabled = true;
  }
}

function reset(e) {
  e.preventDefault();
  randomNumberGenerator();
  userInput.value = "";
  downUp.innerText = "Let's guess";
  gameOver = false;
  guessBtn.disabled = false;
  chances = 5;
  remainingChances.innerHTML = chances;
  userAnswers = [];
}

randomNumberGenerator();
