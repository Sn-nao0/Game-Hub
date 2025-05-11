// Rock Paper Scissors game logic adapted for embedded screen and sessionStorage

const rpsStatus = document.getElementById("rpsStatus");
const rpsChoices = document.querySelectorAll("#rpsChoices .rpsChoice");
const rpsResult = document.getElementById("rpsResult");
const restartBtn = document.getElementById("restartRpsBtn");
const exitBtn = document.getElementById("exitRpsBtn");

let gameRunning = true;
let player1 = "";
let player2 = "";

function loadGameData() {
  const gameData = JSON.parse(sessionStorage.getItem("gameData"));
  if (!gameData) {
    alert("No game data found. Returning to hub.");
    window.location.href = "opening.html";
    return false;
  }
  player1 = gameData.player1;
  player2 = gameData.player2;
  rpsStatus.textContent = `${player1} vs ${player2}`;
  rpsResult.textContent = "";
  return true;
}

function startRPS() {
  gameRunning = true;
  rpsResult.textContent = "";
}

rpsChoices.forEach(button => {
  button.addEventListener("click", () => {
    if (!gameRunning) return;
    const playerChoice = button.getAttribute("data-choice");
    const choices = ["rock", "paper", "scissors"];
    const botChoice = choices[Math.floor(Math.random() * choices.length)];
    let result = "";
    if (playerChoice === botChoice) {
      result = "It's a tie!";
    } else if (
      (playerChoice === "rock" && botChoice === "scissors") ||
      (playerChoice === "paper" && botChoice === "rock") ||
      (playerChoice === "scissors" && botChoice === "paper")
    ) {
      result = `${player1} wins!`;
    } else {
      result = `${player2} wins!`;
    }
    rpsResult.textContent = `You chose ${playerChoice}, opponent chose ${botChoice}. ${result}`;
    gameRunning = false;
  });
});

restartBtn.addEventListener("click", () => {
  startRPS();
});

exitBtn.addEventListener("click", () => {
  sessionStorage.removeItem("gameData");
  window.location.href = "opening.html";
});

function showScreen(screen) {
  document.querySelectorAll(".screen").forEach(s => s.style.display = "none");
  if (screen) screen.style.display = "block";
}

window.startRPS = function(gameData) {
  if (loadGameData()) {
    showScreen(document.getElementById("rpsGame"));
    startRPS();
  }
};

window.onload = () => {
  // Do not auto-start game on load, wait for explicit start call
};
