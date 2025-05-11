// Main initialization script for index.html to start the selected game

import "./games/tictactoe.js";
import "./games/flappy.js";
import "./games/rps.js";
import "./games/hangman.js";

document.addEventListener("DOMContentLoaded", () => {
  const gameData = JSON.parse(sessionStorage.getItem("gameData"));
  if (!gameData) {
    alert("No game data found. Redirecting to game selection.");
    window.location.href = "gameSelection.html";
    return;
  }

  const game = gameData.game.toLowerCase();

  switch (game) {
    case "tictactoe":
      if (window.startTicTacToe) {
        window.startTicTacToe(gameData);
      }
      break;
    case "flappybirds":
      if (window.startFlappy) {
        window.startFlappy(gameData);
      }
      break;
    case "rps":
      if (window.startRPS) {
        window.startRPS(gameData);
      }
      break;
    case "hangman":
      if (window.startHangman) {
        window.startHangman(gameData);
      }
      break;
    case "uno":
    case "chess":
    case "gofish":
    case "crazyeight":
    case "snakesladders":
      alert("This game is not yet supported. Redirecting to game selection.");
      window.location.href = "gameSelection.html";
      break;
    default:
      alert("Game not supported yet.");
      window.location.href = "gameSelection.html";
  }
});
