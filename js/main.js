const frases = [
  "esto no es una intro, es una invitación",
  "tocá algo, hacé ruido",
  "sin guión, sin reglas",
  "una canción distinta en cada esquina",
  "el silencio también suena"
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

// glitch canvas background effect
const canvas = document.getElementById("glitchCanvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

function drawNoise() {
  const imageData = ctx.createImageData(canvas.width, canvas.height);
  const buffer = new Uint32Array(imageData.data.buffer);

  for (let i = 0; i < buffer.length; i++) {
    if (Math.random() < 0.015) {
      buffer[i] = 0xffffffff;
    }
  }

  ctx.putImageData(imageData, 0, 0);
}

setInterval(drawNoise, 100);
