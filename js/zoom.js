const frases = [
  "¡Ditto al ataque!",
  "video mejorado un 300%",
  "zoom divertido activado",
  "¡más cerca, más cute!",
  "transmitiendo ondas de fiesta 🎉"
];

document.getElementById("frase-footer").textContent =
  frases[Math.floor(Math.random() * frases.length)];

const audio = document.getElementById("audioAmbiente");
const btn = document.getElementById("audioBtn");

btn.addEventListener("click", () => {
  if (audio.paused) {
    audio.play();
    btn.textContent = "🔊";
  } else {
    audio.pause();
    btn.textContent = "🎧";
  }
});

// Confetti
const canvas = document.getElementById("confetti-canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const ctx = canvas.getContext("2d");
const pieces = Array.from({ length: 100 }, () => ({
  x: Math.random() * canvas.width,
  y: Math.random() * canvas.height,
  size: Math.random() * 6 + 4,
  color: `hsl(${Math.random() * 360}, 80%, 60%)`,
  speedY: Math.random() * 3 + 1,
  rotation: Math.random() * 360
}));

function update() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let p of pieces) {
    p.y += p.speedY;
    p.rotation += 2;
    if (p.y > canvas.height) {
      p.y = -10;
      p.x = Math.random() * canvas.width;
    }
    ctx.save();
    ctx.translate(p.x, p.y);
    ctx.rotate((p.rotation * Math.PI) / 180);
    ctx.fillStyle = p.color;
    ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
    ctx.restore();
  }
  requestAnimationFrame(update);
}
update();
