const pensamientos = [
  "recuerdos a color // vibra eterna",
  "cada pagina tiene su propio tono",
  "palabras que brillan en la memoria",
  "el eco rosa de lo que fuimos",
  "historias vintage // momentos dorados",
  "la tinta nunca se borra del alma"
];

const frasesCartas = [
  "te guardo en un vinilo que nunca termina",
  "cada palabra es un color nuevo",
  "hay recuerdos que suenan a distortion",
  "esto tambien es una forma de rockear",
  "la distancia se pinta de neón",
  "sonrisa grunge // corazon retro"
];

// 📖 Diario base
const container = document.getElementById("thoughts-container");
pensamientos.forEach((text, i) => {
  const p = document.createElement("p");
  p.textContent = text;
  p.style.animationDelay = `${i * 0.5}s`;
  container.appendChild(p);
});

// 💾 Cargar pensamientos guardados
const saved = JSON.parse(localStorage.getItem("eco_thoughts")) || [];
function renderSavedThoughts() {
  saved.forEach((item, i) => {
    const p = document.createElement("p");
    p.classList.add("personal-thought");
    p.innerHTML = `<span>${item.text}</span><time>${item.date}</time>`;
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
    const newThought = {
      text,
      date: new Date().toLocaleDateString("es-CR", { day: "2-digit", month: "short", year: "numeric" })
    };

    saved.push(newThought);
    localStorage.setItem("eco_thoughts", JSON.stringify(saved));

    const p = document.createElement("p");
    p.classList.add("personal-thought");
    p.innerHTML = `<span>${newThought.text}</span><time>${newThought.date}</time>`;
    container.appendChild(p);
    input.value = "";

    // 🎉 Animación flotante de pensamiento enviado
    const floating = document.createElement("span");
    floating.className = "floating-phrase soft-fade";
    floating.textContent = "pensamiento guardado";
    floating.style.left = "50%";
    floating.style.top = "60%";
    floating.style.transform = "translateX(-50%)";
    document.body.appendChild(floating);
    setTimeout(() => floating.remove(), 4000);
  }
});

// 📜 Mostrar cartas animadas
document.getElementById("showCards").addEventListener("click", () => {
  const section = document.getElementById("card-section");
  section.classList.toggle("hidden");

  const grid = document.getElementById("card-grid");
  if (grid.childElementCount === 0) {
    frasesCartas.forEach((frase) => {
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

// 🌠 Frase flotante mejorada
document.getElementById("spawnFloating").addEventListener("click", () => {
  const span = document.createElement("span");
  span.className = "floating-phrase";
  span.textContent = pensamientos[Math.floor(Math.random() * pensamientos.length)];
  span.style.left = `${Math.random() * 80 + 10}%`;
  span.style.top = `${Math.random() * 70 + 20}%`;
  document.body.appendChild(span);
  setTimeout(() => span.remove(), 8000);
});

// 🗑 Botón para borrar todo
document.getElementById("clearThoughts").addEventListener("click", () => {
  if (confirm("¿Seguro que querés borrar todos tus pensamientos guardados?")) {
    localStorage.removeItem("eco_thoughts");
    location.reload();
  }
});

// 🐚🌙🩵🐾 Notas secretas múltiples
let currentKey = null;

const triggers = document.querySelectorAll(".secret-trigger");
const secretBox = document.getElementById("secret-note");
const secretContent = document.getElementById("secret-content");
const editSecret = document.getElementById("editSecret");

function loadSecretByKey(key) {
  currentKey = key;
  const stored = localStorage.getItem(key);
  secretContent.textContent = stored || "aquí no hay nada… ¿aún?";
  secretBox.classList.remove("hidden");
}

triggers.forEach(trigger => {
  trigger.addEventListener("click", () => {
    const key = trigger.getAttribute("data-key");
    loadSecretByKey(key);
  });
});

editSecret.addEventListener("click", () => {
  if (!currentKey) return;
  const nuevo = prompt("¿Qué querés susurrar y esconder aquí?");
  if (nuevo) {
    localStorage.setItem(currentKey, nuevo);
    loadSecretByKey(currentKey);
  }
});

