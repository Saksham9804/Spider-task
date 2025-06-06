// --- CONFIGURABLES ---
const CANVAS_WIDTH = 320;
const CANVAS_HEIGHT = 180;
const ARC_RADIUS = 75;
const ARC_CENTER = { x: CANVAS_WIDTH / 2, y: CANVAS_HEIGHT - 20 };
const NEEDLE_LENGTH = 70;
const MAX_SCORE = 100;
const PERFECT_ANGLE = 90;
const SWING_MIN = 0;
const SWING_MAX = 180;

// For variable speed (pendulum-like)
const SWING_PERIOD = 1800; // ms for full cycle

// --- STATE ---
let needleAngle = SWING_MIN;
let swinging = false;
let swingStartTime = null;
let swingDirection = 1; // 1 = forward, -1 = backward
let animationFrame = null;
let playerScores = [null, null];
let currentPlayer = 0; // 0 or 1
let twoPlayerMode = false;
let gameActive = false;

// --- DOM ---
const canvas = document.getElementById('needleCanvas');
const ctx = canvas.getContext('2d');
const scoreDisplay = document.getElementById('scoreDisplay');
const turnDisplay = document.getElementById('turnDisplay');
const winnerDisplay = document.getElementById('winnerDisplay');
const startBtn = document.getElementById('startBtn');
const stopBtn = document.getElementById('stopBtn');
const restartBtn = document.getElementById('restartBtn');
const modeBtn = document.getElementById('modeBtn');

// --- DRAWING ---
function drawNeedle(angle) {
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  // Draw arc for reference
  ctx.save();
  ctx.beginPath();
  ctx.arc(ARC_CENTER.x, ARC_CENTER.y, ARC_RADIUS, Math.PI, 0, false);
  ctx.strokeStyle = '#d3a13f';
  ctx.lineWidth = 5;
  ctx.stroke();
  ctx.restore();

  // Draw needle
  const rad = (Math.PI * angle) / 180;
  const x2 = ARC_CENTER.x + NEEDLE_LENGTH * Math.cos(rad - Math.PI);
  const y2 = ARC_CENTER.y + NEEDLE_LENGTH * Math.sin(rad - Math.PI);

  ctx.save();
  ctx.beginPath();
  ctx.moveTo(ARC_CENTER.x, ARC_CENTER.y);
  ctx.lineTo(x2, y2);
  ctx.strokeStyle = '#fc4a1a';
  ctx.lineWidth = 7;
  ctx.shadowColor = '#fc4a1a';
  ctx.shadowBlur = 8;
  ctx.stroke();

  // Draw needle tip
  ctx.beginPath();
  ctx.arc(x2, y2, 10, 0, 2 * Math.PI);
  ctx.fillStyle = '#f7b733';
  ctx.shadowBlur = 0;
  ctx.fill();
  ctx.restore();
}

// --- SWING LOGIC ---
function startSwing() {
  swinging = true;
  swingStartTime = performance.now();
  animationFrame = requestAnimationFrame(updateSwing);
  stopBtn.disabled = false;
  scoreDisplay.textContent = '';
  winnerDisplay.textContent = '';
  restartBtn.style.display = 'none';
}

function updateSwing(now) {
  if (!swinging) return;
  // Pendulum-like motion: angle = 90 + 90 * sin(t)
  const elapsed = (now - swingStartTime) % SWING_PERIOD;
  const t = (elapsed / SWING_PERIOD) * 2 * Math.PI;
  // Sine wave: -1 to 1, map to 0-180
  needleAngle = 90 + 90 * Math.sin(t);
  drawNeedle(needleAngle);
  animationFrame = requestAnimationFrame(updateSwing);
}

// --- SCORING ---
function calculateScore(angle) {
  // Linear: score = 100 - (abs(angle-90)/90)*100
  const diff = Math.abs(angle - PERFECT_ANGLE);
  let score = Math.max(0, Math.round(MAX_SCORE - (diff / 90) * MAX_SCORE));
  return score;
}

// --- GAME LOGIC ---
function stopNeedle() {
  if (!swinging) return;
  swinging = false;
  cancelAnimationFrame(animationFrame);
  stopBtn.disabled = true;
  drawNeedle(needleAngle);

  const score = calculateScore(needleAngle);
  playerScores[currentPlayer] = score;

  if (twoPlayerMode) {
    scoreDisplay.textContent = `Player ${currentPlayer + 1} Score: ${score}`;
    if (currentPlayer === 0) {
      // Next player's turn
      currentPlayer = 1;
      turnDisplay.textContent = "Player 2's Turn";
      setTimeout(() => {
        startSwing();
      }, 1000);
    } else {
      // Both played, show results
      showWinner();
      restartBtn.style.display = 'inline-block';
    }
  } else {
    scoreDisplay.textContent = `Your Score: ${score}`;
    winnerDisplay.textContent = score === 100 ? "🎉 Perfect! 🎉" : "";
    restartBtn.style.display = 'inline-block';
  }
}

function showWinner() {
  const [score1, score2] = playerScores;
  if (score1 > score2) {
    winnerDisplay.textContent = "🏆 Player 1 Wins!";
  } else if (score2 > score1) {
    winnerDisplay.textContent = "🏆 Player 2 Wins!";
  } else {
    winnerDisplay.textContent = "🤝 It's a Tie!";
  }
  turnDisplay.textContent = "";
}

function resetGame() {
  swinging = false;
  cancelAnimationFrame(animationFrame);
  playerScores = [null, null];
  currentPlayer = 0;
  scoreDisplay.textContent = '';
  winnerDisplay.textContent = '';
  restartBtn.style.display = 'none';
  stopBtn.disabled = true;
  drawNeedle(90);
  if (twoPlayerMode) {
    turnDisplay.textContent = "Player 1's Turn";
  } else {
    turnDisplay.textContent = "";
  }
}

function startGame() {
  resetGame();
  gameActive = true;
  startBtn.disabled = true;
  modeBtn.disabled = true;
  stopBtn.disabled = false;
  startSwing();
}

function restart() {
  startBtn.disabled = false;
  modeBtn.disabled = false;
  resetGame();
}

// --- EVENT HANDLING ---
stopBtn.addEventListener('click', stopNeedle);
startBtn.addEventListener('click', startGame);
restartBtn.addEventListener('click', restart);

modeBtn.addEventListener('click', () => {
  twoPlayerMode = !twoPlayerMode;
  modeBtn.textContent = twoPlayerMode ? "Switch to 1-Player" : "Switch to 2-Player";
  resetGame();
});

document.addEventListener('keydown', (e) => {
  if (!swinging) return;
  if (!twoPlayerMode && (e.code === 'Space')) {
    stopNeedle();
  }
  if (twoPlayerMode) {
    if (currentPlayer === 0 && e.code === 'Space') stopNeedle();
    if (currentPlayer === 1 && e.code === 'Enter') stopNeedle();
  }
});

// --- INITIALIZE ---
drawNeedle(90);
resetGame();
