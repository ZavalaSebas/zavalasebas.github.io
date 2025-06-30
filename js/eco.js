const pensamientos = [
  "hay cosas que solo se entienden en silencio.",
  "no todo lo que se va, se pierde.",
  "hay fragmentos de mí en lo que no digo.",
  "el eco no es más que un intento de no desaparecer.",
  "los recuerdos flotan como papel en el viento.",
  "pensé en escribirte, pero me convertí en tinta."
];

const frasesCartas = [
  "te guardé en un rincón que no existe.",
  "nunca fue olvido, fue cuidado.",
  "hay palabras que solo el viento entiende.",
  "esto también es una forma de quedarme.",
  "la distancia no borra lo sentido.",
  "cada carta es una despedida que no se dio."
];

// 📖 Diario base
const container = document.getElementById("thoughts-container");
pensamientos.forEach((text, i) => {
  const p = document.createElement("p");
  p.textContent = text;
  p.style.animationDelay = `${i * 0.5}s`;
  container.appendChild(p);
});

// 📜 Mostrar cartas
document.getElementById("showCards").addEventListener("click", () => {
  document.getElementById("card-section").classList.toggle("hidden");
  const grid = document.getElementById("card-grid");
  if (grid.childElementCount === 0) {
    frasesCartas.forEach(frase => {
      const card = document.createElement("div");
      card.className = "card-box";
      card.textContent = frase;
      grid.appendChild(card);
    });
  }
});

// 🌠 Frase flotante
document.getElementById("spawnFloating").addEventListener("click", () => {
  const span = document.createElement("span");
  span.className = "floating-phrase";
  span.textContent = pensamientos[Math.floor(Math.random() * pensamientos.length)];
  span.style.left = `${Math.random() * 80 + 10}%`;
  span.style.top = `${Math.random() * 70 + 20}%`;
  document.body.appendChild(span);
  setTimeout(() => span.remove(), 8000);
});
