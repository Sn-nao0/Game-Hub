// Hangman game logic adapted for embedded screen and sessionStorage

const hangmanWordElem = document.getElementById("hangmanWord");
const hangmanGuessesElem = document.getElementById("hangmanGuesses");
const hangmanInput = document.getElementById("hangmanInput");
const hangmanGuessBtn = document.getElementById("hangmanGuessBtn");
const hangmanStatus = document.getElementById("hangmanStatus");
const restartBtn = document.getElementById("restartHangmanBtn");
const exitBtn = document.getElementById("exitHangmanBtn");

let state = {
  word: "",
  guesses: [],
  maxGuesses: 6,
  running: true,
};

function getRandomWord() {
  const words = ["javascript", "hangman", "game", "programming", "developer"];
  return words[Math.floor(Math.random() * words.length)];
}

function loadGameData() {
  const gameData = JSON.parse(sessionStorage.getItem("gameData"));
  if (!gameData) {
    alert("No game data found. Returning to hub.");
    window.location.href = "opening.html";
    return false;
  }
  return true;
}

function updateHangmanDisplay() {
  const wordDisplay = state.word
    .split("")
    .map(letter => (state.guesses.includes(letter) ? letter : "_"))
    .join(" ");
  hangmanWordElem.textContent = wordDisplay;
  hangmanGuessesElem.textContent = `Guesses: ${state.guesses.join(", ")}`;
}

function checkHangmanStatus() {
  if (!state.word.split("").some(letter => !state.guesses.includes(letter))) {
    hangmanStatus.textContent = "You won!";
    state.running = false;
  } else if (state.maxGuesses <= 0) {
    hangmanStatus.textContent = `You lost! The word was "${state.word}".`;
    state.running = false;
  } else {
    hangmanStatus.textContent = `Guesses left: ${state.maxGuesses}`;
  }
}

function startHangman() {
  if (!loadGameData()) return;
  state.word = getRandomWord();
  state.guesses = [];
  state.maxGuesses = 6;
  state.running = true;
  updateHangmanDisplay();
  hangmanStatus.textContent = "";
  showScreen(document.getElementById("hangmanGame"));
}

hangmanGuessBtn.addEventListener("click", () => {
  if (!state.running) return;
  const guess = hangmanInput.value.toLowerCase();
  hangmanInput.value = "";
  if (!guess || state.guesses.includes(guess) || guess.length !== 1) {
    alert("Please enter a valid new letter.");
    return;
  }
  state.guesses.push(guess);
  if (!state.word.includes(guess)) {
    state.maxGuesses--;
  }
  updateHangmanDisplay();
  checkHangmanStatus();
});

restartBtn.addEventListener("click", startHangman);

exitBtn.addEventListener("click", () => {
  sessionStorage.removeItem("gameData");
  window.location.href = "opening.html";
});

function showScreen(screen) {
  document.querySelectorAll(".screen").forEach(s => s.style.display = "none");
  if (screen) screen.style.display = "block";
}

window.startHangman = function(gameData) {
  startHangman();
};

window.onload = () => {
  // Do not auto-start game on load, wait for explicit start call
};
