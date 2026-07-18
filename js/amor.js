const frasesFooter = [
  "Amar es elegir quedarte cuando lo fácil termina.",
  "Las risas y las lágrimas cuentan la misma historia de cuidado.",
  "La ternura también es una forma de valentía.",
  "Lo importante: que me ames sin condiciones, no sin preguntas."
];

document.getElementById("frase-footer").textContent =
  frasesFooter[Math.floor(Math.random() * frasesFooter.length)];

const mantras = [
  "Elijo amar sin intentar rehacerte.",
  "Amor es decisión cotidiana, no solo chispa inicial.",
  "Acepto tus sombras, no las maquillo.",
  "Nos cuidamos sin perdernos a nosotros." 
];

function setMantra() {
  const mantra = mantras[Math.floor(Math.random() * mantras.length)];
  document.getElementById("microMantra").textContent = mantra;
}

setMantra();
setInterval(setMantra, 14000);

const audio = document.getElementById("audioAmbiente");
const btn = document.getElementById("audioBtn");

btn?.addEventListener("click", () => {
  if (audio.paused) {
    audio.play();
    btn.textContent = "🔊";
  } else {
    audio.pause();
    btn.textContent = "🎧";
  }
});
