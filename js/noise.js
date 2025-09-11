// --- Frases dinámicas ---
const frases = [
  "el ruido interno se hace visible",
  "pensamientos entrelazados en pixeles",
  "un espacio para el caos creativo",
  "donde las ideas chocan y respiran"
];

document.getElementById("frase-footer").textContent =
  frases[Math.floor(Math.random() * frases.length)];

// --- Audio ---
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

// --- PARTICULAS ---
const canvas = document.getElementById("particleCanvas");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

resizeCanvas();
window.addEventListener("resize", resizeCanvas);

// Crear partículas
const particles = [];
const particleCount = 120;

for (let i = 0; i < particleCount; i++) {
  particles.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    size: Math.random() * 4 + 1,
    speedX: (Math.random() - 0.5) * 0.6,
    speedY: (Math.random() - 0.5) * 0.6
  });
}

function drawParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach(p => {
    ctx.fillStyle = "rgba(255, 85, 85, 0.8)"; // rojo visible
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
    ctx.fill();
    p.x += p.speedX;
    p.y += p.speedY;

    // Reset si sale de pantalla
    if (p.x > canvas.width) p.x = 0;
    if (p.x < 0) p.x = canvas.width;
    if (p.y > canvas.height) p.y = 0;
    if (p.y < 0) p.y = canvas.height;
  });

  requestAnimationFrame(drawParticles);
}

drawParticles();

// --- Partículas al mover el cursor ---
document.addEventListener("mousemove", e => {
  particles.push({
    x: e.clientX,
    y: e.clientY,
    size: Math.random() * 3 + 1,
    speedX: (Math.random() - 0.5) * 0.5,
    speedY: (Math.random() - 0.5) * 0.5
  });

  if (particles.length > 200) particles.shift(); // limitar cantidad
});

const cards = document.querySelectorAll(".card");

cards.forEach(card => {
  card.addEventListener("mouseenter", e => {
    for (let i = 0; i < 10; i++) {
      particles.push({
        x: e.clientX + (Math.random()*30-15),
        y: e.clientY + (Math.random()*30-15),
        size: Math.random() * 3 + 1,
        speedX: (Math.random()-0.5)*1,
        speedY: (Math.random()-0.5)*1
      });
    }
  });
});
