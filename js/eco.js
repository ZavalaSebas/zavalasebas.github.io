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

// 💾 Render saved thoughts
const saved = JSON.parse(localStorage.getItem("eco_thoughts")) || [];
function renderSavedThoughts() {
  saved.forEach((text, i) => {
    const p = document.createElement("p");
    p.textContent = text;
    p.style.animationDelay = `${(pensamientos.length + i) * 0.4}s`;
    container.appendChild(p);
  });
}
renderSavedThoughts();

// 💭 Guardar nuevo pensamiento
document.getElementById("saveThought").addEventListener("click", () => {
  const input = document.getElementById("thoughtInput");
  const text = input.value.trim();
  if (text) {
    saved.push(text);
    localStorage.setItem("eco_thoughts", JSON.stringify(saved));

    const p = document.createElement("p");
    p.textContent = text;
    p.style.animationDelay = "0s";
    container.appendChild(p);

    input.value = "";
  }
});

// 📜 Mostrar cartas animadas
document.getElementById("showCards").addEventListener("click", () => {
  const section = document.getElementById("card-section");
  section.classList.toggle("hidden");

  const grid = document.getElementById("card-grid");

  if (grid.childElementCount === 0) {
    frasesCartas.forEach((frase, index) => {
      const box = document.createElement("div");
      box.className = "card-box";

      const inner = document.createElement("div");
      inner.className = "card-inner";

      const front = document.createElement("div");
      front.className = "card-front";
      front.textContent = "📜 abrir";

      const back = document.createElement("div");
      back.className = "card-back";
      back.textContent = frase;

      inner.appendChild(front);
      inner.appendChild(back);
      box.appendChild(inner);

      box.addEventListener("click", () => {
        box.classList.toggle("open");
      });

      grid.appendChild(box);
    });
  }
});

// 🌠 Frase flotante animada
document.getElementById("spawnFloating").addEventListener("click", () => {
  const span = document.createElement("span");
  span.className = "floating-phrase";
  span.textContent = pensamientos[Math.floor(Math.random() * pensamientos.length)];
  span.style.left = `${Math.random() * 80 + 10}%`;
  span.style.top = `${Math.random() * 70 + 20}%`;
  document.body.appendChild(span);
  setTimeout(() => span.remove(), 8000);
});
