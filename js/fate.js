// Frases para footer
const frases = [
  "todo está escrito, o todo está por escribir",
  "el destino y la libertad conviven en el misterio",
  "la duda es también una forma de fe",
  "caminar entre lo que elegimos y lo que nos elige"
];

document.getElementById("frase-footer").textContent =
  frases[Math.floor(Math.random() * frases.length)];

// Citas dinámicas en el sidebar
const citas = [
  "«El hombre está condenado a ser libre» — Sartre",
  "«Todo tiene su tiempo bajo el cielo» — Eclesiastés 3:1",
  "«Dios sabe lo que hacemos, pero aun así elegimos» — San Agustín",
  "«El destino es carácter» — Heráclito",
  "«Entre necesidad y libertad se mueve la vida humana» — Hegel"
];

function mostrarCita() {
  const cita = citas[Math.floor(Math.random() * citas.length)];
  document.getElementById("cita-dinamica").textContent = cita;
}

// Mostrar al inicio y cada 20s
mostrarCita();
setInterval(mostrarCita, 20000);

// Control de audio
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
