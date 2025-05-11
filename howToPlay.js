document.addEventListener("DOMContentLoaded", () => {
  const howToPlayContentDiv = document.getElementById("howToPlayContent");
  const countdownDiv = document.getElementById("countdown");
  const startCountdownBtn = document.getElementById("startCountdownBtn");
  const backToSetupBtn = document.getElementById("backToSetupBtn");

  const howToPlayTexts = {
    tictactoe: `
      <h2>Tic-Tac-Toe</h2>
      <p>Players: 2</p>
      <p>Goal: Get 3 of your marks in a row (horizontally, vertically, or diagonally).</p>
      <p>How to Play:</p>
      <ul>
        <li>The grid is 3×3.</li>
        <li>Player 1 uses X, Player 2 uses O.</li>
        <li>They take turns marking one empty cell.</li>
        <li>The first to line up 3 of their symbols wins.</li>
        <li>If all 9 cells are filled with no winner, it’s a draw.</li>
      </ul>
    `,
    flappybirds: `
      <h2>Flappy Bird</h2>
      <p>Players: 1</p>
      <p>Goal: Stay alive and pass through as many pipes as possible.</p>
      <p>How to Play:</p>
      <ul>
        <li>Tap/click to make the bird flap upwards.</li>
        <li>It falls if you don’t tap due to gravity.</li>
        <li>Pipes come with gaps in them — navigate the bird through the gaps.</li>
        <li>If the bird hits a pipe or the ground, the game ends.</li>
      </ul>
    `,
    rps: `
      <h2>Rock Paper Scissors</h2>
      <p>Players: 2</p>
      <p>Goal: Beat the other player’s move.</p>
      <p>Moves:</p>
      <ul>
        <li>Rock beats Scissors</li>
        <li>Scissors beats Paper</li>
        <li>Paper beats Rock</li>
      </ul>
      <p>How to Play:</p>
      <ul>
        <li>Both players pick a move at the same time.</li>
        <li>If both pick the same, it’s a tie.</li>
        <li>Otherwise, the winning hand is based on the rules above.</li>
        <li>Often played as best of 3 or best of 5.</li>
      </ul>
    `,
    hangman: `
      <h2>Hangman</h2>
      <p>Players: 2 (or 1 vs computer)</p>
      <p>Goal: Guess the secret word by suggesting letters.</p>
      <p>How to Play:</p>
      <ul>
        <li>One player (or the computer) picks a word.</li>
        <li>The other guesses letters one by one.</li>
        <li>If correct, the letter is revealed in the word.</li>
        <li>If wrong, a part of the "hangman" is drawn.</li>
        <li>Usually, 6–7 wrong guesses are allowed.</li>
        <li>Win by guessing the word before the full hangman is drawn.</li>
      </ul>
    `,
    // Add other games similarly
  };

  let selectedGame = sessionStorage.getItem("selectedGame");
  if (!selectedGame) {
    alert("No game selected. Redirecting to game selection.");
    window.location.href = "gameSelection.html";
    return;
  }

  // Normalize selectedGame for keys
  let key = selectedGame.toLowerCase();
  if (key === "flappybirds") key = "flappybirds";
  else if (key === "flappy") key = "flappybirds";

  howToPlayContentDiv.innerHTML = howToPlayTexts[key] || "<p>No guide available for this game.</p>";

  startCountdownBtn.addEventListener("click", () => {
    startCountdownBtn.disabled = true;
    let count = 3;
    countdownDiv.textContent = count;
    const interval = setInterval(() => {
      count--;
      if (count > 0) {
        countdownDiv.textContent = count;
      } else if (count === 0) {
        countdownDiv.textContent = "GO!";
      } else {
        clearInterval(interval);
        // Navigate to game page
        switch (key) {
          case "tictactoe":
            window.location.href = "tictactoe.html";
            break;
          case "flappybirds":
            window.location.href = "flappyBird.html";
            break;
          case "rps":
            window.location.href = "rps.html";
            break;
          case "hangman":
            window.location.href = "hangman.html";
            break;
          // Add other games with their pages
          default:
            window.location.href = "gameSelection.html";
        }
      }
    }, 1000);
  });

  backToSetupBtn.addEventListener("click", () => {
    window.location.href = "playerSetup.html";
  });
});
