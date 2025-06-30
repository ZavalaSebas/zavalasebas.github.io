const frases = [
  "hecho con calma y un poco de magia ✨",
  "aquí flotan pensamientos que no pesan",
  "caminando entre pixeles y suspiros",
  "te doy la bienvenida a un rincón sin tiempo",
  "donde las ideas duermen y sueñan despiertas"
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
