const canvas = document.getElementById("flappyCanvas");
const ctx = canvas.getContext("2d");
const statusText = document.getElementById("flappyStatus");
const restartBtn = document.getElementById("restartFlappyBtn");
const exitBtn = document.getElementById("exitFlappyBtn");

let frames = 0;
let gravity = 0.25;
let bird = {
  x: 50,
  y: 150,
  width: 34,
  height: 24,
  velocity: 0,
  jumpHeight: -4.6,
};

let pipes = [];
let pipeWidth = 50;
let pipeGap = 120;
let pipeSpeed = 2;
let score = 0;
let gameOver = false;

function drawBird() {
  ctx.fillStyle = "yellow";
  ctx.fillRect(bird.x, bird.y, bird.width, bird.height);
}

function drawPipes() {
  ctx.fillStyle = "green";
  pipes.forEach(pipe => {
    ctx.fillRect(pipe.x, 0, pipeWidth, pipe.top);
    ctx.fillRect(pipe.x, pipe.top + pipeGap, pipeWidth, canvas.height - pipe.top - pipeGap);
  });
}

function updateBird() {
  bird.velocity += gravity;
  bird.y += bird.velocity;

  if (bird.y + bird.height > canvas.height - 50 || bird.y < 0) {
    gameOver = true;
  }
}

function updatePipes() {
  if (frames % 90 === 0) {
    let topHeight = Math.floor(Math.random() * (canvas.height - pipeGap - 70)) + 20;
    pipes.push({ x: canvas.width, top: topHeight });
  }

  pipes.forEach(pipe => {
    pipe.x -= pipeSpeed;
  });

  if (pipes.length && pipes[0].x + pipeWidth < 0) {
    pipes.shift();
    score++;
  }
}

function checkCollision() {
  for (let pipe of pipes) {
    if (
      bird.x < pipe.x + pipeWidth &&
      bird.x + bird.width > pipe.x &&
      (bird.y < pipe.top || bird.y + bird.height > pipe.top + pipeGap)
    ) {
      gameOver = true;
      break;
    }
  }
}

function drawScore() {
  ctx.fillStyle = "black";
  ctx.font = "20px Arial";
  ctx.fillText(`Score: ${score}`, 10, 25);
}

function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  drawBird();
  drawPipes();
  drawScore();

  if (!gameOver) {
    updateBird();
    updatePipes();
    checkCollision();
    frames++;
    requestAnimationFrame(gameLoop);
  } else {
    statusText.textContent = `Game Over! Final Score: ${score}`;
  }
}

function jump() {
  if (!gameOver) {
    bird.velocity = bird.jumpHeight;
  }
}

function restartGame() {
  bird.y = 150;
  bird.velocity = 0;
  pipes = [];
  score = 0;
  frames = 0;
  gameOver = false;
  statusText.textContent = "";
  gameLoop();
}

function exitToHub() {
  window.location.href = "opening.html";
}

canvas.addEventListener("click", jump);
restartBtn.addEventListener("click", restartGame);
exitBtn.addEventListener("click", exitToHub);

window.onload = () => {
  restartGame();
};
