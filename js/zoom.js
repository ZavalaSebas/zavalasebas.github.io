const frases = [
  "ajustando el lente...",
  "escaneando patrones olvidados...",
  "más allá del ruido hay estructura.",
  "zoom activado, detalles expuestos.",
  "visiones amplificadas."
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
