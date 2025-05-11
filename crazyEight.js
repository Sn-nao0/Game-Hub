const playerHand = document.getElementById("playerHand");
const discardPile = document.getElementById("discardPile");
const turnIndicator = document.getElementById("turnIndicator");
const drawCardBtn = document.getElementById("drawCardBtn");
const restartBtn = document.getElementById("restartCrazyEightBtn");
const exitBtn = document.getElementById("exitCrazyEightBtn");

let deck = [];
let playerCards = [];
let discardCards = [];
let currentTurn = 1;

function createDeck() {
  deck = [];
  const suits = ["♠", "♥", "♦", "♣"];
  const ranks = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];
  for (let suit of suits) {
    for (let rank of ranks) {
      deck.push({ suit, rank });
    }
  }
  shuffle(deck);
}

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function dealCards() {
  playerCards = deck.splice(0, 7);
  discardCards = [deck.shift()];
}

function renderCards() {
  playerHand.innerHTML = "";
  for (let i = 0; i < playerCards.length; i++) {
    const card = playerCards[i];
    const cardDiv = document.createElement("div");
    cardDiv.classList.add("card");
    cardDiv.textContent = `${card.rank}${card.suit}`;
    cardDiv.addEventListener("click", () => playCard(i));
    playerHand.appendChild(cardDiv);
  }

  discardPile.innerHTML = "";
  if (discardCards.length > 0) {
    const topCard = discardCards[discardCards.length - 1];
    const cardDiv = document.createElement("div");
    cardDiv.classList.add("card");
    cardDiv.textContent = `${topCard.rank}${topCard.suit}`;
    discardPile.appendChild(cardDiv);
  }
}

function playCard(index) {
  const card = playerCards[index];
  const topCard = discardCards[discardCards.length - 1];
  if (canPlayCard(card, topCard)) {
    discardCards.push(card);
    playerCards.splice(index, 1);
    renderCards();
    checkWin();
    nextTurn();
  } else {
    alert("You cannot play that card.");
  }
}

function canPlayCard(card, topCard) {
  return card.suit === topCard.suit || card.rank === topCard.rank || card.rank === "8";
}

function drawCard() {
  if (deck.length === 0) {
    alert("Deck is empty!");
    return;
  }
  playerCards.push(deck.shift());
  renderCards();
  nextTurn();
}

function nextTurn() {
  currentTurn = currentTurn === 1 ? 2 : 1;
  turnIndicator.textContent = `Turn: Player ${currentTurn}`;
}

function checkWin() {
  if (playerCards.length === 0) {
    alert(`Player ${currentTurn} wins!`);
    restartGame();
  }
}

function restartGame() {
  createDeck();
  dealCards();
  currentTurn = 1;
  turnIndicator.textContent = "Turn: Player 1";
  renderCards();
}

function exitToHub() {
  window.location.href = "opening.html";
}

drawCardBtn.addEventListener("click", drawCard);
restartBtn.addEventListener("click", restartGame);
exitBtn.addEventListener("click", exitToHub);

window.onload = () => {
  restartGame();
};
