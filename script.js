const screens = {
  openingScreen: document.getElementById("openingScreen"),
  gameSelection: document.getElementById("gameSelection"),
  playerSetup: document.getElementById("playerSetup"),
  tictactoeGame: document.getElementById("tictactoeGame"),
  flappyGame: document.getElementById("flappyGame"),
  rpsGame: document.getElementById("rpsGame"),
  hangmanGame: document.getElementById("hangmanGame"),
  // Add other game screens here as needed
};

const gameOptions = {
  tictactoe: "tictactoe",
  flappy: "flappy",
  rps: "rps",
  hangman: "hangman",
  // Add other game options here
};

let selectedGame = null;
let state = {};

const elements = {
  // Tic Tac Toe elements
  cells: document.querySelectorAll("#tictactoeGame .cell"),
  statusText: document.querySelector("#statusText"),
  restartRoundBtn: document.getElementById("restartRoundBtn"),
  exitToHubBtn: document.getElementById("exitToHubBtn"),
  player1Display: document.getElementById("player1Display"),
  player2Display: document.getElementById("player2Display"),
  xWinsDisplay: document.getElementById("xWins"),
  oWinsDisplay: document.getElementById("oWins"),
  scoreboard: document.getElementById("scoreboard"),

  // Player setup elements
  tictactoeSetup: document.getElementById("tictactoeSetup"),
  flappySetup: document.getElementById("flappySetup"),
  rpsSetup: document.getElementById("rpsSetup"),
  hangmanSetup: document.getElementById("hangmanSetup"),
  player1NameInput: document.getElementById("player1Name"),
  player2NameInput: document.getElementById("player2Name"),
  flappyPlayerNameInput: document.getElementById("flappyPlayerName"),
  roundsSelect: document.getElementById("rounds"),
  startGameBtn: document.getElementById("startGameBtn"),
  backToSelectionBtn: document.getElementById("backToSelectionBtn"),

  // Flappy Birds elements
  flappyCanvas: document.getElementById("flappyCanvas"),
  flappyStatus: document.getElementById("flappyStatus"),
  restartFlappyBtn: document.getElementById("restartFlappyBtn"),
  exitFlappyBtn: document.getElementById("exitFlappyBtn"),

  // Rock Paper Scissors elements
  rpsStatus: document.getElementById("rpsStatus"),
  rpsChoices: document.querySelectorAll("#rpsChoices .rpsChoice"),
  rpsResult: document.getElementById("rpsResult"),
  restartRpsBtn: document.getElementById("restartRpsBtn"),
  exitRpsBtn: document.getElementById("exitRpsBtn"),

  // Hangman elements
  hangmanWord: document.getElementById("hangmanWord"),
  hangmanGuesses: document.getElementById("hangmanGuesses"),
  hangmanInput: document.getElementById("hangmanInput"),
  hangmanGuessBtn: document.getElementById("hangmanGuessBtn"),
  hangmanStatus: document.getElementById("hangmanStatus"),
  restartHangmanBtn: document.getElementById("restartHangmanBtn"),
  exitHangmanBtn: document.getElementById("exitHangmanBtn"),
};

function showScreen(screen) {
  Object.values(screens).forEach((s) => s.classList.remove("active"));
  screen.classList.add("active");
}

function setupGameSelection() {
  document.getElementById("tictactoeOption").addEventListener("click", () => {
    selectedGame = gameOptions.tictactoe;
    showScreen(screens.playerSetup);
    elements.tictactoeSetup.style.display = "flex";
    elements.flappySetup.style.display = "none";
    elements.rpsSetup.style.display = "none";
    elements.hangmanSetup.style.display = "none";
    document.getElementById("setupTitle").textContent = "Tic Tac Toe Setup";
  });

  document.getElementById("flappyBirdsOption").addEventListener("click", () => {
    selectedGame = gameOptions.flappy;
    showScreen(screens.playerSetup);
    elements.tictactoeSetup.style.display = "none";
    elements.flappySetup.style.display = "flex";
    elements.rpsSetup.style.display = "none";
    elements.hangmanSetup.style.display = "none";
    document.getElementById("setupTitle").textContent = "Flappy Birds Setup";
  });

  document.getElementById("rpsOption").addEventListener("click", () => {
    selectedGame = gameOptions.rps;
    showScreen(screens.playerSetup);
    elements.tictactoeSetup.style.display = "none";
    elements.flappySetup.style.display = "none";
    elements.rpsSetup.style.display = "block";
    elements.hangmanSetup.style.display = "none";
    document.getElementById("setupTitle").textContent = "Rock Paper Scissors Setup";
  });

  document.getElementById("hangmanOption").addEventListener("click", () => {
    selectedGame = gameOptions.hangman;
    showScreen(screens.playerSetup);
    elements.tictactoeSetup.style.display = "none";
    elements.flappySetup.style.display = "none";
    elements.rpsSetup.style.display = "none";
    elements.hangmanSetup.style.display = "block";
    document.getElementById("setupTitle").textContent = "Hangman Setup";
  });

  // Add event listeners for other games similarly
}

function setupPlayerSetup() {
  elements.backToSelectionBtn.addEventListener("click", () => {
    showScreen(screens.gameSelection);
  });

  elements.startGameBtn.addEventListener("click", (e) => {
    e.preventDefault();
    switch (selectedGame) {
      case gameOptions.tictactoe:
        const p1 = elements.player1NameInput.value.trim();
        const p2 = elements.player2NameInput.value.trim();
        const rounds = parseInt(elements.roundsSelect.value, 10);
        if (!p1 || !p2) {
          alert("Please enter names for both players.");
          return;
        }
        startTicTacToe(p1, p2, rounds);
        break;
      case gameOptions.flappy:
        const p = elements.flappyPlayerNameInput.value.trim();
        if (!p) {
          alert("Please enter your name.");
          return;
        }
        startFlappy(p);
        break;
      case gameOptions.rps:
        const rpsP1 = document.getElementById("rpsPlayer1Name").value.trim();
        const rpsP2 = document.getElementById("rpsPlayer2Name").value.trim();
        if (!rpsP1 || !rpsP2) {
          alert("Please enter names for both players.");
          return;
        }
        startRPS(rpsP1, rpsP2);
        break;
      case gameOptions.hangman:
        const hangmanP = document.getElementById("hangmanPlayerName").value.trim();
        if (!hangmanP) {
          alert("Please enter your name.");
          return;
        }
        startHangman(hangmanP);
        break;
      // Add cases for other games
    }
  });
}

// Tic Tac Toe implementation (existing code) ...
// Flappy Birds implementation (existing code) ...

// Rock Paper Scissors implementation
function startRPS(player1, player2) {
  state = {
    player1,
    player2,
    running: true,
  };
  elements.rpsStatus.textContent = `${player1} vs ${player2}`;
  elements.rpsResult.textContent = "";
  showScreen(screens.rpsGame);
}

elements.rpsChoices.forEach((button) => {
  button.addEventListener("click", () => {
    if (!state.running) return;
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
      result = `${state.player1} wins!`;
    } else {
      result = `${state.player2} wins!`;
    }
    elements.rpsResult.textContent = `You chose ${playerChoice}, opponent chose ${botChoice}. ${result}`;
    state.running = false;
  });
});

elements.restartRpsBtn.addEventListener("click", () => {
  startRPS(state.player1, state.player2);
});

elements.exitRpsBtn.addEventListener("click", () => {
  showScreen(screens.gameSelection);
});

// Hangman implementation
function startHangman(playerName) {
  state = {
    playerName,
    word: getRandomWord(),
    guesses: [],
    maxGuesses: 6,
    running: true,
  };
  updateHangmanDisplay();
  elements.hangmanStatus.textContent = "";
  showScreen(screens.hangmanGame);
}

function getRandomWord() {
  const words = ["javascript", "hangman", "game", "programming", "developer"];
  return words[Math.floor(Math.random() * words.length)];
}

function updateHangmanDisplay() {
  const wordDisplay = state.word
    .split("")
    .map((letter) => (state.guesses.includes(letter) ? letter : "_"))
    .join(" ");
  elements.hangmanWord.textContent = wordDisplay;
  elements.hangmanGuesses.textContent = `Guesses: ${state.guesses.join(", ")}`;
}

elements.hangmanGuessBtn.addEventListener("click", () => {
  if (!state.running) return;
  const guess = elements.hangmanInput.value.toLowerCase();
  elements.hangmanInput.value = "";
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

function checkHangmanStatus() {
  if (!state.word.split("").some((letter) => !state.guesses.includes(letter))) {
    elements.hangmanStatus.textContent = "You won!";
    state.running = false;
  } else if (state.maxGuesses <= 0) {
    elements.hangmanStatus.textContent = `You lost! The word was "${state.word}".`;
    state.running = false;
  } else {
    elements.hangmanStatus.textContent = `Guesses left: ${state.maxGuesses}`;
  }
}

elements.restartHangmanBtn.addEventListener("click", () => {
  startHangman(state.playerName);
});

elements.exitHangmanBtn.addEventListener("click", () => {
  showScreen(screens.gameSelection);
});

const unoGame = {
  players: [],
  currentPlayerIndex: 0,
  direction: 1,
  deck: [],
  discardPile: [],
  running: false,
};

function setupUnoDeck() {
  const colors = ["red", "yellow", "green", "blue"];
  const values = [
    "0", "1", "2", "3", "4", "5", "6", "7", "8", "9",
    "skip", "reverse", "draw2"
  ];
  unoGame.deck = [];
  colors.forEach(color => {
    values.forEach(value => {
      unoGame.deck.push({ color, value });
      if (value !== "0") {
        unoGame.deck.push({ color, value });
      }
    });
  });
  // Add wild cards
  for (let i = 0; i < 4; i++) {
    unoGame.deck.push({ color: "wild", value: "wild" });
    unoGame.deck.push({ color: "wild", value: "wildDraw4" });
  }
  shuffleDeck(unoGame.deck);
}

function shuffleDeck(deck) {
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
}

function startUno(playerNames) {
  unoGame.players = playerNames.map(name => ({ name, hand: [] }));
  unoGame.currentPlayerIndex = 0;
  unoGame.direction = 1;
  setupUnoDeck();
  unoGame.discardPile = [];
  unoGame.running = true;

  // Deal 7 cards to each player
  for (let i = 0; i < 7; i++) {
    unoGame.players.forEach(player => {
      player.hand.push(unoGame.deck.pop());
    });
  }

  // Start discard pile
  unoGame.discardPile.push(unoGame.deck.pop());

  // TODO: Implement UI updates and game loop
  alert("UNO game started! (Implementation incomplete)");
  showScreen(screens.gameSelection);
}

// Chess, Go Fish, Crazy Eight, Snakes and Ladders placeholders
function startChess() {
  alert("Chess game is not yet implemented.");
  showScreen(screens.gameSelection);
}

function startGoFish() {
  alert("Go Fish game is not yet implemented.");
  showScreen(screens.gameSelection);
}

function startCrazyEight() {
  alert("Crazy Eight game is not yet implemented.");
  showScreen(screens.gameSelection);
}

function startSnakesLadders() {
  alert("Snakes and Ladders game is not yet implemented.");
  showScreen(screens.gameSelection);
}

// Add event listeners for these games in setupGameSelection and setupPlayerSetup
document.getElementById("unoOption")?.addEventListener("click", () => {
  selectedGame = "uno";
  showScreen(screens.playerSetup);
  // Show UNO setup UI if exists
  document.getElementById("setupTitle").textContent = "UNO Setup";
  // Hide other setups
  elements.tictactoeSetup.style.display = "none";
  elements.flappySetup.style.display = "none";
  elements.rpsSetup.style.display = "none";
  elements.hangmanSetup.style.display = "none";
});

document.getElementById("chessOption")?.addEventListener("click", () => {
  selectedGame = "chess";
  startChess();
});

document.getElementById("gofishOption")?.addEventListener("click", () => {
  selectedGame = "gofish";
  startGoFish();
});

document.getElementById("crazyEightOption")?.addEventListener("click", () => {
  selectedGame = "crazyeight";
  startCrazyEight();
});

document.getElementById("snakesLaddersOption")?.addEventListener("click", () => {
  selectedGame = "snakesladders";
  startSnakesLadders();
});

elements.startGameBtn.addEventListener("click", (e) => {
  e.preventDefault();
  switch (selectedGame) {
    case "uno":
      // For simplicity, ask for player names via prompt
      const playerCount = parseInt(prompt("Enter number of players (2-4):"), 10);
      if (isNaN(playerCount) || playerCount < 2 || playerCount > 4) {
        alert("Invalid number of players.");
        return;
      }
      const playerNames = [];
      for (let i = 0; i < playerCount; i++) {
        const name = prompt(`Enter name for player ${i + 1}:`);
        if (!name) {
          alert("Player name cannot be empty.");
          return;
        }
        playerNames.push(name);
      }
      startUno(playerNames);
      break;
    // Add cases for other games if needed
  }
});

window.onload = () => {
  setupGameSelection();
  setupPlayerSetup();
  showScreen(screens.openingScreen);

  document.getElementById("playButton").addEventListener("click", () => {
    showScreen(screens.gameSelection);
  });
};

