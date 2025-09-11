// Frases para footer
const frases = [
  "una idea no es absoluta hasta que la piensas dos veces",
  "la moral se escribe en tinta invisible",
  "lo absoluto existe solo en nuestras preguntas",
  "este texto respira entre dudas y certezas"
];

document.getElementById("frase-footer").textContent =
  frases[Math.floor(Math.random() * frases.length)];

// Notas dinámicas en el sidebar
const notas = [
  "📌 La ética no es un punto fijo.",
  "💡 Un argumento es más fuerte con sus contradicciones.",
  "🗞 Recuerda: toda idea nace en un contexto.",
  "🔎 Preguntarse es tan importante como responder."
];

function mostrarNota() {
  const nota = notas[Math.floor(Math.random() * notas.length)];
  document.getElementById("nota-dinamica").textContent = nota;
}

// Cambiar nota cada 15 segundos
mostrarNota();
setInterval(mostrarNota, 15000);

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
