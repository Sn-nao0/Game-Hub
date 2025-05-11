document.addEventListener("DOMContentLoaded", () => {
  const gameOptions = [
    "tictactoe",
    "flappyBirds",
    "rps",
    "hangman",
    "uno",
    "chess",
    "gofish",
    "crazyEight",
    "snakesLadders"
  ];

  gameOptions.forEach(gameId => {
    const element = document.getElementById(gameId + "Option");
    if (element) {
      element.addEventListener("click", () => {
        sessionStorage.setItem("selectedGame", gameId.toLowerCase());
        window.location.href = "playerSetup.html";
      });
    }
  });
});
