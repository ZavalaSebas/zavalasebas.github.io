const frases = [
  // Mensajes de sistema falsos
  "cargando loops...",
  "renderizando distorsión...",
  "sintetizando errores...",

  // Glitch / poesía digital
  "1nicio.0",
  "signál fuera de rango",
  "bit roto // eco eterno",

  // Coordenadas y tiempos
  "lat: 47.6519 / long: -122.3502",
  "último ruido: 03:17AM",

  // Rockshow status
  "rockshow // inicializando...",
  "frecuencia encontrada",
  "versión beta del silencio"
];

const footerText = document.getElementById("frase-footer");

function cambiarFraseFooter() {
  const frase = frases[Math.floor(Math.random() * frases.length)];
  footerText.textContent = frase;
}

cambiarFraseFooter();
setInterval(cambiarFraseFooter, 4000); // cada 4 segundos


const audioBtn = document.getElementById("audioControl");
const audio = document.getElementById("audioAmbiente");

audioBtn.addEventListener("click", () => {
  audio.muted = false;
  audio.play().then(() => {
    console.log("Audio activado");
  }).catch(() => {
    console.log("El navegador bloqueó el autoplay");
  });
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

const logo = document.getElementById("logo");
const mainTitle = document.getElementById("mainTitle");

const glitchMap = {
  R: ['R', 'Я', '®', '℞', 'r'],
  O: ['O', '0', 'Θ', 'ø', 'o'],
  C: ['C', '¢', '⊂', 'c'],
  K: ['K', 'ʞ', 'κ', 'k'],
  S: ['S', '$', '§', 's', 'Ƨ'],
  H: ['H', '#', 'Ħ', 'h'],
  W: ['W', 'Ш', 'w'],
};

const originalText = "ROCKSHOW";

function glitchText(text) {
  return text.split('').map(char => {
    const upper = char.toUpperCase();
    const options = glitchMap[upper];
    if (options) {
      return options[Math.floor(Math.random() * options.length)];
    }
    return char;
  }).join('');
}

// Glitch para HEADER (más lento)
setInterval(() => {
  logo.textContent = glitchText(originalText);
}, 1500); // cada 1.5s

// Glitch para TITULO PRINCIPAL (más rápido)
setInterval(() => {
  mainTitle.textContent = glitchText(originalText);
}, 120); // como el glitch anterior

// Intentar reproducir sonido al entrar
window.addEventListener("load", () => {
  const audio = document.getElementById("audioAmbiente");
  audio.muted = false;
  audio.play().catch(() => {
    // Algunos navegadores requieren interacción, por eso el botón también está disponible
    console.log("Autoplay falló, esperar interacción del usuario.");
  });
});
