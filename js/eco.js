// Configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCEt6uttsBNcOTdmpLzz1eoOXc3Jk-IKfk",
  authDomain: "rockshow-61a77.firebaseapp.com",
  projectId: "rockshow-61a77",
  storageBucket: "rockshow-61a77.firebasestorage.app",
  messagingSenderId: "1052089619676",
  appId: "1:1052089619676:web:eb9cc50b73363ae95d9019",
  measurementId: "G-CTC0Y1KW8E"
};

// Inicializar Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

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

// 📖 Pensamientos base animados
const container = document.getElementById("thoughts-container");
pensamientos.forEach((text, i) => {
  const p = document.createElement("p");
  p.textContent = text;
  p.style.animationDelay = `${i * 0.5}s`;
  container.appendChild(p);
});

// 💾 Guardar pensamiento en Firebase
document.getElementById("saveThought").addEventListener("click", async () => {
  const input = document.getElementById("thoughtInput");
  const text = input.value.trim();
  if (!text) return;

  const newThought = {
    text,
    date: new Date().toLocaleDateString("es-CR", { day: "2-digit", month: "short", year: "numeric" }),
    createdAt: Date.now()
  };

  await db.collection("eco_thoughts").add(newThought);
  input.value = "";
  renderSavedThoughts();

  const floating = document.createElement("span");
  floating.className = "floating-phrase soft-fade";
  floating.textContent = "pensamiento guardado";
  floating.style.left = "50%";
  floating.style.top = "60%";
  floating.style.transform = "translateX(-50%)";
  document.body.appendChild(floating);
  setTimeout(() => floating.remove(), 4000);
});

// 🔁 Mostrar pensamientos desde Firebase
async function renderSavedThoughts() {
  const snapshot = await db.collection("eco_thoughts").orderBy("createdAt", "asc").get();
  const now = Date.now();
  container.innerHTML = "";

  // Mostrar también los pensamientos base animados
  pensamientos.forEach((text, i) => {
    const p = document.createElement("p");
    p.textContent = text;
    p.style.animationDelay = `${i * 0.5}s`;
    container.appendChild(p);
  });

  snapshot.forEach(doc => {
    const thought = doc.data();
    const p = document.createElement("p");
    p.classList.add("personal-thought");
    p.innerHTML = `<span>${thought.text}</span><time>${thought.date}</time>`;

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "×";
    deleteBtn.classList.add("btn-borrar-individual");
    deleteBtn.title = "Borrar este pensamiento";
    deleteBtn.style.marginLeft = "10px";

    const tiempoTranscurrido = now - thought.createdAt;
    const puedeBorrarSinClave = tiempoTranscurrido <= 30000;

    deleteBtn.onclick = async () => {
      if (puedeBorrarSinClave) {
        await db.collection("eco_thoughts").doc(doc.id).delete();
        renderSavedThoughts();
      } else {
        const pass = prompt("Ingresá la contraseña para borrar:");
        if (pass === "rock") {
          await db.collection("eco_thoughts").doc(doc.id).delete();
          renderSavedThoughts();
        } else {
          alert("Contraseña incorrecta.");
        }
      }
    };

    p.appendChild(deleteBtn);
    container.appendChild(p);
  });
}

renderSavedThoughts();

// 🗑 Borrar todos los pensamientos (con contraseña)
document.getElementById("clearThoughts").addEventListener("click", async () => {
  const pass = prompt("Para borrar todo, ingresá la contraseña:");
  if (pass !== "tuContraseñaSegura") {
    alert("Contraseña incorrecta.");
    return;
  }

  if (!confirm("¿Seguro que querés borrar todos los pensamientos guardados?")) return;

  const snapshot = await db.collection("eco_thoughts").get();
  const batch = db.batch();
  snapshot.forEach(doc => batch.delete(doc.ref));
  await batch.commit();
  renderSavedThoughts();
});

// 📜 Cartas animadas
document.getElementById("showCards").addEventListener("click", () => {
  const section = document.getElementById("card-section");
  section.classList.toggle("hidden");

  const grid = document.getElementById("card-grid");
  if (grid.childElementCount === 0) {
    frasesCartas.forEach(frase => {
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

      box.addEventListener("click", () => box.classList.toggle("open"));
      grid.appendChild(box);
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

// 🔐 Notas secretas múltiples
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
