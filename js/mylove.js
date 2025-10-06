const frases = [
  ":)",
  "Que carajos sigo haciendo aqui?",
  "A veces la extraño",
  "Cuanto tiempo nos queda?",
  "Sueño despierto a tu lado"
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
