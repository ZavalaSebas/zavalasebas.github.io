const frases = [
  "La autoridad pesa menos cuando se mezcla con confianza.",
  "Ser buen hijo no cancela mi derecho a decidir.",
  "La gratitud se cuida mejor con libertad cerca.",
  "Educar fue su deber; elegir ahora es el mío." 
];

document.getElementById("frase-footer").textContent =
  frases[Math.floor(Math.random() * frases.length)];

const mantras = [
  "Quiero decidir sin rompernos.",
  "Soltar control también es amor.",
  "Mis decisiones, mis consecuencias, con respeto.",
  "Confianza: la graduación de la crianza." 
];

function setNote() {
  const mantra = mantras[Math.floor(Math.random() * mantras.length)];
  const noteEl = document.getElementById("note-dynamic");
  if (noteEl) noteEl.textContent = mantra;
}

setNote();
setInterval(setNote, 14000);

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
