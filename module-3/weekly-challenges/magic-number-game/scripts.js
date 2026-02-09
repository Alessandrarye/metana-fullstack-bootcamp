const form = document.getElementById("guessForm");
const input = document.getElementById("guessInput");
const message = document.getElementById("message");
const attemptsEl = document.getElementById("attempts");
const resetBtn = document.getElementById("resetBtn");

let secretNumber = getRandomNumber();
let attempts = 0;

function getRandomNumber() {
  return Math.floor(Math.random() * 10) + 1; // 1–10
}

function resetGame() {
  secretNumber = getRandomNumber();
  attempts = 0;
  message.textContent = "New number picked. Make a guess 🙂";
  attemptsEl.textContent = "Attempts: 0";
  input.value = "";
  input.focus();
}

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const guess = Number(input.value);

  // basic validation (in case user bypasses min/max)
  if (!Number.isInteger(guess) || guess < 1 || guess > 10) {
    message.textContent = "Please enter a whole number from 1 to 10.";
    return;
  }

  attempts += 1;
  attemptsEl.textContent = `Attempts: ${attempts}`;

  if (guess === secretNumber) {
    message.textContent = `🎉 Correct! The number was ${secretNumber}. Click "New number" to play again.`;
  } else if (guess < secretNumber) {
    message.textContent = "Too low. Try again.";
  } else {
    message.textContent = "Too high. Try again.";
  }

  input.select();
});

resetBtn.addEventListener("click", resetGame);
