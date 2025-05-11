const selectedGame = sessionStorage.getItem("selectedGame");

const elements = {
  playerForm: document.getElementById("playerForm"),
  startGameBtn: document.getElementById("startGameBtn"),
  backToSelectionBtn: document.getElementById("backToSelectionBtn"),
  setupTitle: document.getElementById("setupTitle"),
  tictactoeSetup: document.getElementById("tictactoeSetup"),
  player1Name: document.getElementById("player1Name"),
  player2Name: document.getElementById("player2Name"),
  player1NameBot: document.getElementById("player1NameBot"),
  roundsSelect: document.getElementById("rounds"),
};

function startGame() {
  // Determine which option is filled
  const twoPlayersFilled = elements.player1Name.value.trim() !== "" && elements.player2Name.value.trim() !== "";
  const vsBotFilled = elements.player1NameBot.value.trim() !== "";

  if (twoPlayersFilled && vsBotFilled) {
    alert("Please fill only one option: either two players or play vs bot.");
    return;
  }

  if (!twoPlayersFilled && !vsBotFilled) {
    alert("Please fill one option to start the game.");
    return;
  }

  const rounds = parseInt(elements.roundsSelect.value, 10);

  let gameData = {
    game: selectedGame,
    rounds: rounds,
  };

  if (twoPlayersFilled) {
    const p1 = elements.player1Name.value.trim();
    const p2 = elements.player2Name.value.trim();
    if (!p1 || !p2) {
      alert("Please enter names for both players.");
      return;
    }
    gameData.player1 = p1;
    gameData.player2 = p2;
  } else if (vsBotFilled) {
    const p1 = elements.player1NameBot.value.trim();
    if (!p1) {
      alert("Please enter your name.");
      return;
    }
    gameData.player1 = p1;
    gameData.player2 = "bot";
  }

  sessionStorage.setItem("gameData", JSON.stringify(gameData));
  window.location.href = "howToPlay.html";
}

elements.backToSelectionBtn.addEventListener("click", () => {
  window.location.href = "gameSelection.html";
});

elements.startGameBtn.addEventListener("click", (e) => {
  e.preventDefault();
  startGame();
});

window.onload = () => {
  if (!selectedGame) {
    alert("No game selected. Redirecting to game selection.");
    window.location.href = "gameSelection.html";
    return;
  }
  elements.setupTitle.textContent = `${selectedGame.charAt(0).toUpperCase() + selectedGame.slice(1)} Setup`;
};
