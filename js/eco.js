// Config Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCEt6uttsBNcOTdmpLzz1eoOXc3Jk-IKfk",
  authDomain: "rockshow-61a77.firebaseapp.com",
  projectId: "rockshow-61a77",
  storageBucket: "rockshow-61a77.firebasestorage.app",
  messagingSenderId: "1052089619676",
  appId: "1:1052089619676:web:eb9cc50b73363ae95d9019",
  measurementId: "G-CTC0Y1KW8E"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

const container = document.getElementById("thoughts-container");
const input = document.getElementById("thoughtInput");
const saveBtn = document.getElementById("saveThought");
const clearBtn = document.getElementById("clearThoughts");

saveBtn.addEventListener("click", async () => {
  const text = input.value.trim();
  if (!text) return;

  await db.collection("eco_thoughts").add({
    text,
    date: new Date().toLocaleDateString("es-CR", { day: "2-digit", month: "short", year: "numeric" }),
    createdAt: Date.now()
  });

  input.value = "";
  renderSavedThoughts();
});

clearBtn.addEventListener("click", async () => {
  const pass = prompt("Para borrar todo, ingresá la contraseña:");
  if (pass !== "rock") { alert("Contraseña incorrecta."); return; }
  if (!confirm("¿Seguro que querés borrar todos los mensajes?")) return;

  const snapshot = await db.collection("eco_thoughts").get();
  const batch = db.batch();
  snapshot.forEach(doc => batch.delete(doc.ref));
  await batch.commit();
  renderSavedThoughts();
});

async function renderSavedThoughts() {
  const snapshot = await db.collection("eco_thoughts").orderBy("createdAt", "asc").get();
  container.innerHTML = "";

  const notes = [];
  const minDistance = 100;
  const isMobile = window.innerWidth < 600;

  const safeTop = isMobile ? 100 : 120; // margen para header
  const safeBottom = isMobile ? window.innerHeight - 180 : window.innerHeight - 150; // margen para textarea y botones
  const safeLeft = 20;
  const safeRight = window.innerWidth - 20;

  snapshot.forEach(doc => {
    const thought = doc.data();
    const note = document.createElement("div");
    note.classList.add("creative-note");

    // Contenido de la nota
    const content = document.createElement("span");
    content.textContent = thought.text;
    note.appendChild(content);

    // Fecha
    const dateEl = document.createElement("time");
    dateEl.textContent = thought.date;
    dateEl.style.display = "block";
    dateEl.style.fontSize = "0.7rem";
    dateEl.style.textAlign = "right";
    dateEl.style.marginTop = "0.5rem";
    dateEl.style.opacity = "0.7";
    note.appendChild(dateEl);

    // Intentos para encontrar posición segura
    let attempts = 0, x, y;
    do {
      x = Math.random() * (safeRight - safeLeft) + safeLeft;
      y = Math.random() * (safeBottom - safeTop) + safeTop;
      attempts++;
    } while (notes.some(n => Math.hypot(n.x - x, n.y - y) < minDistance) && attempts < 200);

    // Si no encuentra un lugar perfecto, se ajusta a la zona segura
    x = Math.min(Math.max(x, safeLeft), safeRight - note.offsetWidth);
    y = Math.min(Math.max(y, safeTop), safeBottom - note.offsetHeight);

    note.style.left = `${x}px`;
    note.style.top = `${y}px`;
    note.style.transform = `rotate(${Math.random() * 10 - 5}deg)`;

    notes.push({x, y});
    container.appendChild(note);

    // Borrar nota
    note.addEventListener("click", async () => {
      const pass = prompt("Para borrar esta nota, ingresa contraseña:");
      if (pass === "rock") {
        await db.collection("eco_thoughts").doc(doc.id).delete();
        renderSavedThoughts();
      }
    });
  });

  // Ajustar altura contenedor si muchas notas
  container.style.height = Math.max(window.innerHeight, notes.length * 120) + "px";
}

// Llamar al render inicial y también al redimensionar
window.addEventListener("resize", renderSavedThoughts);
renderSavedThoughts();

