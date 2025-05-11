const canvas = document.getElementById("boardCanvas");
const ctx = canvas.getContext("2d");
const turnIndicator = document.getElementById("turnIndicator");
const rollDiceBtn = document.getElementById("rollDiceBtn");
const restartBtn = document.getElementById("restartSnakesBtn");
const exitBtn = document.getElementById("exitSnakesBtn");

const boardSize = 10;
const cellSize = canvas.width / boardSize;

const snakes = {
  16: 6,
  48: 30,
  62: 19,
  64: 60,
  79: 19,
  93: 68,
  95: 24,
  97: 76,
  98: 78
};

const ladders = {
  1: 38,
  4: 14,
  9: 31,
  21: 42,
  28: 84,
  36: 44,
  51: 67,
  71: 91,
  80: 100
};

let playerPositions = [0, 0];
let currentPlayer = 0;

function drawBoard() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  let number = 100;
  for (let row = 0; row < boardSize; row++) {
    for (let col = 0; col < boardSize; col++) {
      let x = col * cellSize;
      let y = row * cellSize;
      ctx.fillStyle = (row + col) % 2 === 0 ? "#a2d5c6" : "#077b8a";
      ctx.fillRect(x, y, cellSize, cellSize);
      ctx.fillStyle = "black";
      ctx.font = "14px Arial";
      ctx.fillText(number, x + 5, y + 15);
      number--;
    }
  }
  drawSnakesAndLadders();
  drawPlayers();
}

function drawSnakesAndLadders() {
  ctx.strokeStyle = "red";
  ctx.lineWidth = 3;
  for (let start in snakes) {
    drawLineBetweenCells(parseInt(start), snakes[start], "red");
  }
  ctx.strokeStyle = "green";
  for (let start in ladders) {
    drawLineBetweenCells(parseInt(start), ladders[start], "green");
  }
}

function drawLineBetweenCells(start, end, color) {
  const startPos = getCellCenter(start);
  const endPos = getCellCenter(end);
  ctx.beginPath();
  ctx.moveTo(startPos.x, startPos.y);
  ctx.lineTo(endPos.x, endPos.y);
  ctx.strokeStyle = color;
  ctx.stroke();
}

function getCellCenter(number) {
  let row = Math.floor((100 - number) / boardSize);
  let col = (number - 1) % boardSize;
  if (row % 2 === 1) {
    col = boardSize - 1 - col;
  }
  return {
    x: col * cellSize + cellSize / 2,
    y: row * cellSize + cellSize / 2
  };
}

function drawPlayers() {
  for (let i = 0; i < playerPositions.length; i++) {
    const pos = getCellCenter(playerPositions[i] || 0);
    ctx.beginPath();
    ctx.arc(pos.x, pos.y, 10, 0, 2 * Math.PI);
    ctx.fillStyle = i === 0 ? "blue" : "orange";
    ctx.fill();
    ctx.strokeStyle = "black";
    ctx.stroke();
  }
}

function rollDice() {
  const roll = Math.floor(Math.random() * 6) + 1;
  alert(`Player ${currentPlayer + 1} rolled a ${roll}`);
  movePlayer(roll);
}

function movePlayer(steps) {
  let newPos = playerPositions[currentPlayer] + steps;
  if (newPos > 100) {
    newPos = playerPositions[currentPlayer];
  }
  if (snakes[newPos]) {
    alert(`Oops! Player ${currentPlayer + 1} got bitten by a snake!`);
    newPos = snakes[newPos];
  } else if (ladders[newPos]) {
    alert(`Yay! Player ${currentPlayer + 1} climbed a ladder!`);
    newPos = ladders[newPos];
  }
  playerPositions[currentPlayer] = newPos;
  drawBoard();
  if (newPos === 100) {
    alert(`Player ${currentPlayer + 1} wins!`);
    restartGame();
  } else {
    switchTurn();
  }
}

function switchTurn() {
  currentPlayer = currentPlayer === 0 ? 1 : 0;
  turnIndicator.textContent = `Turn: Player ${currentPlayer + 1}`;
}

function restartGame() {
  playerPositions = [0, 0];
  currentPlayer = 0;
  turnIndicator.textContent = "Turn: Player 1";
  drawBoard();
}

function exitToHub() {
  window.location.href = "opening.html";
}

rollDiceBtn.addEventListener("click", rollDice);
restartBtn.addEventListener("click", restartGame);
exitBtn.addEventListener("click", exitToHub);

window.onload = () => {
  drawBoard();
  turnIndicator.textContent = "Turn: Player 1";
};
