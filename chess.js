const chessBoard = document.getElementById("chessBoard");
const turnIndicator = document.getElementById("turnIndicator");
const restartBtn = document.getElementById("restartChessBtn");
const exitBtn = document.getElementById("exitChessBtn");

const initialBoardSetup = [
  "r","n","b","q","k","b","n","r",
  "p","p","p","p","p","p","p","p",
  "","","","","","","","",
  "","","","","","","","",
  "","","","","","","","",
  "","","","","","","","",
  "P","P","P","P","P","P","P","P",
  "R","N","B","Q","K","B","N","R"
];

let board = [];
let currentTurn = "white";
let selectedCell = null;

function createBoard() {
  chessBoard.innerHTML = "";
  for (let i = 0; i < 64; i++) {
    const cell = document.createElement("div");
    cell.classList.add("chessCell");
    const row = Math.floor(i / 8);
    const col = i % 8;
    if ((row + col) % 2 === 0) {
      cell.classList.add("light");
    } else {
      cell.classList.add("dark");
    }
    cell.dataset.index = i;
    cell.textContent = board[i];
    cell.addEventListener("click", () => onCellClick(i));
    chessBoard.appendChild(cell);
  }
}

function onCellClick(index) {
  if (selectedCell === null) {
    if (board[index] && isCurrentPlayerPiece(board[index])) {
      selectedCell = index;
      highlightCell(index);
    }
  } else {
    if (index === selectedCell) {
      clearHighlights();
      selectedCell = null;
    } else {
      if (isValidMove(selectedCell, index)) {
        movePiece(selectedCell, index);
        switchTurn();
      }
      clearHighlights();
      selectedCell = null;
    }
  }
}

function isCurrentPlayerPiece(piece) {
  if (currentTurn === "white") {
    return piece === piece.toUpperCase();
  } else {
    return piece === piece.toLowerCase();
  }
}

function isValidMove(from, to) {
  // Simplified: allow any move to empty or opponent piece
  if (from === to) return false;
  const piece = board[from];
  const target = board[to];
  if (target === "") return true;
  if (currentTurn === "white" && target === target.toLowerCase()) return true;
  if (currentTurn === "black" && target === target.toUpperCase()) return true;
  return false;
}

function movePiece(from, to) {
  board[to] = board[from];
  board[from] = "";
  createBoard();
}

function switchTurn() {
  currentTurn = currentTurn === "white" ? "black" : "white";
  turnIndicator.textContent = `Turn: ${capitalize(currentTurn)}`;
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function highlightCell(index) {
  const cell = chessBoard.querySelector(`[data-index='${index}']`);
  if (cell) {
    cell.style.outline = "3px solid yellow";
  }
}

function clearHighlights() {
  const cells = chessBoard.querySelectorAll(".chessCell");
  cells.forEach(cell => {
    cell.style.outline = "";
  });
}

function restartGame() {
  board = [...initialBoardSetup];
  currentTurn = "white";
  turnIndicator.textContent = `Turn: White`;
  selectedCell = null;
  createBoard();
}

function exitToHub() {
  window.location.href = "opening.html";
}

restartBtn.addEventListener("click", restartGame);
exitBtn.addEventListener("click", exitToHub);

window.onload = () => {
  restartGame();
};
