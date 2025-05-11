// Tic Tac Toe game logic adapted for embedded screen and sessionStorage

const cells = document.querySelectorAll("#tictactoeGame .cell");
const statusText = document.getElementById("statusText");
const restartRoundBtn = document.getElementById("restartRoundBtn");
const exitToHubBtn = document.getElementById("exitToHubBtn");
const player1Display = document.getElementById("player1Display");
const player2Display = document.getElementById("player2Display");
const xWinsDisplay = document.getElementById("xWins");
const oWinsDisplay = document.getElementById("oWins");

let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let gameActive = true;
let xWins = 0;
let oWins = 0;
let roundCount = 0;
let player1 = "";
let player2 = "";
let rounds = 1;

function loadGameData() {
  const gameData = JSON.parse(sessionStorage.getItem("gameData"));
  if (!gameData) {
    alert("No game data found. Returning to hub.");
    window.location.href = "opening.html";
    return false;
  }
  player1 = gameData.player1;
  player2 = gameData.player2;
  rounds = gameData.rounds || 1;
  player1Display.textContent = player1;
  player2Display.textContent = player2;
  return true;
}

function handleCellClick(e) {
  const index = e.target.getAttribute("data-index");
  if (board[index] !== "" || !gameActive) return;

  board[index] = currentPlayer;
  e.target.textContent = currentPlayer;

  if (checkWin()) {
    gameActive = false;
    if (currentPlayer === "X") {
      xWins++;
      xWinsDisplay.textContent = xWins;
      statusText.textContent = `${player1} wins this round!`;
    } else {
      oWins++;
      oWinsDisplay.textContent = oWins;
      statusText.textContent = `${player2} wins this round!`;
    }
    roundCount++;
    if (roundCount >= rounds) {
      statusText.textContent += " Game over!";
    }
  } else if (board.every(cell => cell !== "")) {
    gameActive = false;
    statusText.textContent = "It's a tie!";
    roundCount++;
    if (roundCount >= rounds) {
      statusText.textContent += " Game over!";
    }
  } else {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusText.textContent = `It's ${currentPlayer === "X" ? player1 : player2}'s turn`;
  }
}

function checkWin() {
  const winConditions = [
    [0,1,2],[3,4,5],[6,7,8], // rows
    [0,3,6],[1,4,7],[2,5,8], // columns
    [0,4,8],[2,4,6]          // diagonals
  ];
  return winConditions.some(condition => {
    const [a,b,c] = condition;
    return board[a] && board[a] === board[b] && board[b] === board[c];
  });
}

function restartRound() {
  board = ["", "", "", "", "", "", "", "", ""];
  currentPlayer = "X";
  gameActive = true;
  statusText.textContent = `It's ${player1}'s turn`;
  cells.forEach(cell => cell.textContent = "");
}

function exitToHub() {
  sessionStorage.removeItem("gameData");
  window.location.href = "opening.html";
}

cells.forEach(cell => cell.addEventListener("click", handleCellClick));
restartRoundBtn.addEventListener("click", restartRound);
exitToHubBtn.addEventListener("click", exitToHub);

function showScreen(screen) {
  document.querySelectorAll(".screen").forEach(s => s.style.display = "none");
  if (screen) screen.style.display = "block";
}

window.startTicTacToe = function(gameData) {
  if (loadGameData()) {
    showScreen(document.getElementById("tictactoeGame"));
    statusText.textContent = `It's ${player1}'s turn`;
    xWinsDisplay.textContent = xWins;
    oWinsDisplay.textContent = oWins;
  }
};

window.onload = () => {
  // Do not auto-start game on load, wait for explicit start call
};
