// Frases inspiradoras para tools
const frases = [
  "una herramienta es una extensión de tu mente.",
  "cada decisión se vuelve más ligera con ayuda.",
  "construir también es elegir bien.",
  "tu caja de herramientas digitales te espera.",
  "a veces lo simple, decide lo complejo."
];

document.addEventListener("DOMContentLoaded", () => {
  const footer = document.getElementById("frase-footer");
  footer.textContent = frases[Math.floor(Math.random() * frases.length)];
});
