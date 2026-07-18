const canvas = document.getElementById("wheelCanvas");
const ctx = canvas.getContext("2d");
const spinBtn = document.getElementById("spinBtn");
const optionInput = document.getElementById("optionInput");
const addOptionBtn = document.getElementById("addOption");
const optionsList = document.getElementById("optionsList");
const resetBtn = document.getElementById("resetBtn");
const confettiCanvas = document.getElementById("confetti-canvas");
const cctx = confettiCanvas.getContext("2d");
const popup = document.getElementById("resultPopup");
const popupResult = document.getElementById("popupResult");
const closePopup = document.getElementById("closePopup");
const tickSound = document.getElementById("tickSound");

let options = ["Sí", "No", "Tal vez"];
let startAngle = 0;
let arc = Math.PI / (options.length / 2);
let spinning = false;

let spinTime = 0;
let spinTimeTotal = 0;
let spinAngleStart = 0;

let confettiParticles = [];
let confettiRunning = false;
let confettiAnim;

// 🎨 Colores
const colors = ["#00c8ff","#f9c74f","#f94144","#90be6d","#f3722c","#4cc9f0","#ffafcc","#b5179e"];

// 🎡 Dibujar la ruleta
function drawWheel() {
  const outsideRadius = 180;
  const textRadius = 140;
  const insideRadius = 50;

  ctx.clearRect(0,0,canvas.width,canvas.height);
  arc = Math.PI / (options.length / 2);

  for (let i = 0; i < options.length; i++) {
    const angle = startAngle + i * arc;
    ctx.fillStyle = colors[i % colors.length];

    ctx.beginPath();
    ctx.arc(200, 200, outsideRadius, angle, angle + arc, false);
    ctx.arc(200, 200, insideRadius, angle + arc, angle, true);
    ctx.fill();

    ctx.save();
    ctx.fillStyle = "#fff";
    ctx.translate(
      200 + Math.cos(angle + arc / 2) * textRadius,
      200 + Math.sin(angle + arc / 2) * textRadius
    );
    ctx.rotate(angle + arc / 2 + Math.PI/2);
    ctx.fillText(options[i], -ctx.measureText(options[i]).width / 2, 0);
    ctx.restore();
  }
}

// 🎡 Girar con easing (rápido → lento)
function rotateWheel() {
  spinTime += 30;
  if (spinTime >= spinTimeTotal) {
    spinning = false;
    pickWinner();
    return;
  }

  // 🔥 easing que arranca rápido y termina lento
  const easeOut = (t, b, c, d) => {
    t /= d;
    return c * (1 - Math.pow(1 - t, 3)) + b;
  };

  const angle = easeOut(spinTime, 0, spinAngleStart, spinTimeTotal);
  startAngle += (angle * Math.PI / 180);

  drawWheel();
  requestAnimationFrame(rotateWheel);
}

// 🏆 Determinar ganador
function pickWinner() {
  const degrees = startAngle * 180 / Math.PI + 90;
  const arcd = 360 / options.length;
  const index = Math.floor((360 - (degrees % 360)) / arcd);
  const winner = options[index];

  popupResult.textContent = winner;
  popup.style.display = "flex";
  startConfetti();

  // detener sonido
  tickSound.pause();
  tickSound.currentTime = 0;
}

// 🎉 Confetti
function startConfetti() {
  confettiCanvas.width = window.innerWidth;
  confettiCanvas.height = window.innerHeight;

  confettiParticles = Array.from({length: 200}).map(() => ({
    x: Math.random() * confettiCanvas.width,
    y: Math.random() * confettiCanvas.height - confettiCanvas.height,
    r: Math.random() * 6 + 4,
    d: Math.random() * 200,
    color: colors[Math.floor(Math.random() * colors.length)],
    tilt: Math.floor(Math.random() * 10) - 10
  }));

  confettiRunning = true;
  animateConfetti();
}

function animateConfetti() {
  if (!confettiRunning) {
    cctx.clearRect(0,0,confettiCanvas.width,confettiCanvas.height);
    return;
  }

  cctx.clearRect(0,0,confettiCanvas.width,confettiCanvas.height);
  confettiParticles.forEach(p => {
    cctx.fillStyle = p.color;
    cctx.fillRect(p.x, p.y, p.r, p.r);
    p.y += Math.cos(p.d) + 1 + p.r / 2;
    p.x += Math.sin(p.d);
    if (p.y > confettiCanvas.height) p.y = -10;
  });

  confettiAnim = requestAnimationFrame(animateConfetti);
}

function stopConfetti() {
  confettiRunning = false;
  cancelAnimationFrame(confettiAnim);
  cctx.clearRect(0,0,confettiCanvas.width,confettiCanvas.height);
}

// 🎡 Eventos
spinBtn.addEventListener("click", () => {
  if (spinning || options.length < 2) return;
  spinning = true;

  spinAngleStart = Math.random() * 20 + 30;
  spinTime = 0;
  spinTimeTotal = 5000; // ~5s

  // 🔊 reproducir el audio una sola vez
  tickSound.currentTime = 0;
  tickSound.play();

  rotateWheel();
});

addOptionBtn.addEventListener("click", () => {
  if (optionInput.value.trim() !== "") {
    options.push(optionInput.value.trim());
    optionInput.value = "";
    updateOptionsList();
    drawWheel();
  }
});

resetBtn.addEventListener("click", () => {
  options = [];
  updateOptionsList();
  drawWheel();
});

closePopup.addEventListener("click", () => {
  popup.style.display = "none";
  stopConfetti();
});

function updateOptionsList() {
  optionsList.innerHTML = "";
  options.forEach((opt, i) => {
    const li = document.createElement("li");
    li.textContent = opt;
    const delBtn = document.createElement("button");
    delBtn.textContent = "✖";
    delBtn.addEventListener("click", () => {
      options.splice(i, 1);
      updateOptionsList();
      drawWheel();
    });
    li.appendChild(delBtn);
    optionsList.appendChild(li);
  });
}

// Inicial
popup.style.display = "none";
drawWheel();
updateOptionsList();

// Footer
const frases = [
  "el azar también es una herramienta.",
  "elige dejando que el universo decida.",
  "cada giro es una nueva oportunidad.",
  "la decisión más justa es la que gira.",
  "la suerte también es parte del toolbox."
];
document.getElementById("frase-footer").textContent =
  frases[Math.floor(Math.random() * frases.length)];
