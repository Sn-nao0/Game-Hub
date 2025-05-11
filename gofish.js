const playerHand = document.getElementById("playerHand");
const opponentHand = document.getElementById("opponentHand");
const turnIndicator = document.getElementById("turnIndicator");
const drawCardBtn = document.getElementById("drawCardBtn");
const restartBtn = document.getElementById("restartGofishBtn");
const exitBtn = document.getElementById("exitGofishBtn");

let deck = [];
let playerCards = [];
let opponentCards = [];
let currentTurn = "player";

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
  opponentCards = deck.splice(0, 7);
}

function renderCards() {
  playerHand.innerHTML = "";
  for (let i = 0; i < playerCards.length; i++) {
    const card = playerCards[i];
    const cardDiv = document.createElement("div");
    cardDiv.classList.add("card");
    cardDiv.textContent = `${card.rank}${card.suit}`;
    cardDiv.addEventListener("click", () => askForCard(card.rank));
    playerHand.appendChild(cardDiv);
  }

  opponentHand.innerHTML = "";
  for (let i = 0; i < opponentCards.length; i++) {
    const cardDiv = document.createElement("div");
    cardDiv.classList.add("card");
    cardDiv.textContent = "🂠"; // back of card
    opponentHand.appendChild(cardDiv);
  }
}

function askForCard(rank) {
  if (currentTurn !== "player") {
    alert("It's not your turn!");
    return;
  }
  // Simplified: just remove one card of the rank from opponent if exists
  const index = opponentCards.findIndex(card => card.rank === rank);
  if (index !== -1) {
    playerCards.push(opponentCards.splice(index, 1)[0]);
    alert(`You got a ${rank} from opponent!`);
  } else {
    alert("Go Fish! Drawing a card...");
    drawCard();
  }
  renderCards();
  checkWin();
  nextTurn();
}

function drawCard() {
  if (deck.length === 0) {
    alert("Deck is empty!");
    return;
  }
  if (currentTurn === "player") {
    playerCards.push(deck.shift());
  } else {
    opponentCards.push(deck.shift());
  }
  renderCards();
}

function nextTurn() {
  currentTurn = currentTurn === "player" ? "opponent" : "player";
  turnIndicator.textContent = `Turn: ${currentTurn === "player" ? "Player" : "Opponent"}`;
  if (currentTurn === "opponent") {
    setTimeout(opponentTurn, 1500);
  }
}

function opponentTurn() {
  if (opponentCards.length === 0) {
    checkWin();
    return;
  }
  const randomCard = opponentCards[Math.floor(Math.random() * opponentCards.length)];
  alert(`Opponent asks for ${randomCard.rank}`);
  const index = playerCards.findIndex(card => card.rank === randomCard.rank);
  if (index !== -1) {
    opponentCards.push(playerCards.splice(index, 1)[0]);
    alert(`Opponent got a ${randomCard.rank} from you!`);
  } else {
    alert("Opponent goes fishing...");
    drawCard();
  }
  renderCards();
  checkWin();
  nextTurn();
}

function checkWin() {
  if (playerCards.length === 0) {
    alert("You win!");
    restartGame();
  } else if (opponentCards.length === 0) {
    alert("Opponent wins!");
    restartGame();
  }
}

function restartGame() {
  createDeck();
  dealCards();
  currentTurn = "player";
  turnIndicator.textContent = "Turn: Player";
  renderCards();
}

function exitToHub() {
  window.location.href = "opening.html";
}

drawCardBtn.addEventListener("click", () => {
  if (currentTurn === "player") {
    drawCard();
    nextTurn();
  } else {
    alert("It's not your turn!");
  }
});
restartBtn.addEventListener("click", restartGame);
exitBtn.addEventListener("click", exitToHub);

window.onload = () => {
  restartGame();
};
