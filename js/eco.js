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

  const thoughts = [];
  snapshot.forEach(doc => {
    thoughts.push({ id: doc.id, data: doc.data() });
  });

  if (thoughts.length === 0) {
    container.style.height = "400px";
    return;
  }

  const isMobile = window.innerWidth < 600;
  if (isMobile) {
    // MODO MÓVIL: mostrar notas en grid de 2-3 columnas, tipo "pared de notas"
    container.style.height = "auto";
    container.style.position = "static";
    container.style.display = "grid";
    container.style.gridTemplateColumns = window.innerWidth < 400 ? "1fr 1fr" : "1fr 1fr 1fr";
    container.style.gap = "12px";
    container.style.overflowY = "auto";
    container.style.alignItems = "start";
    // Ordenar más reciente arriba
    thoughts.slice().reverse().forEach((thought, index) => {
      const note = document.createElement("div");
      note.classList.add("creative-note", "mobile-note");
      note.style.position = "static";
      note.style.transform = "none";
      note.style.width = "100%";
      note.style.minHeight = "70px";
      note.style.margin = "0";
      note.style.left = "unset";
      note.style.top = "unset";
      note.style.zIndex = 1;
      note.style.animationDelay = "0s";

      // Contenido de la nota
      const content = document.createElement("span");
      content.textContent = thought.data.text;
      note.appendChild(content);

      // Fecha
      const dateEl = document.createElement("time");
      dateEl.textContent = thought.data.date;
      dateEl.style.display = "block";
      dateEl.style.fontSize = "0.7rem";
      dateEl.style.textAlign = "right";
      dateEl.style.marginTop = "0.5rem";
      dateEl.style.opacity = "0.7";
      note.appendChild(dateEl);

      note.addEventListener("click", async () => {
        const pass = prompt("Para borrar esta nota, ingresa contraseña:");
        if (pass === "rock") {
          await db.collection("eco_thoughts").doc(thought.id).delete();
          renderSavedThoughts();
        }
      });
      container.appendChild(note);
    });
    return;
  }

  // DESKTOP: layout orgánico como antes
  container.style.display = "block";
  container.style.overflowY = "hidden";
  container.style.position = "relative";

  const noteWidth = 220;
  const noteHeight = 100;
  const padding = 15;
  const containerWidth = container.offsetWidth || 1000;
  const headerHeight = document.querySelector('header').offsetHeight || 80;
  const formHeight = document.querySelector('.eco-write').offsetHeight || 200;
  const availableWidth = containerWidth - (padding * 2);
  const availableHeight = Math.max(500, window.innerHeight - headerHeight - formHeight - 150);
  const cols = Math.floor(availableWidth / (noteWidth + padding));
  const rows = Math.ceil(thoughts.length / cols);
  let actualNoteWidth = noteWidth;
  let actualNoteHeight = noteHeight;
  if (thoughts.length > 20) {
    actualNoteWidth = Math.max(120, availableWidth / Math.min(cols + 2, 6) - padding);
    actualNoteHeight = Math.max(70, actualNoteWidth * 0.6);
  }
  const totalHeight = Math.max(availableHeight, rows * (actualNoteHeight + padding) + padding);
  container.style.height = `${totalHeight}px`;
  const placedNotes = [];
  thoughts.forEach((thought, index) => {
    const note = document.createElement("div");
    note.classList.add("creative-note");
    // ...contenido y fecha igual que antes...
    const content = document.createElement("span");
    content.textContent = thought.data.text;
    note.appendChild(content);
    const dateEl = document.createElement("time");
    dateEl.textContent = thought.data.date;
    dateEl.style.display = "block";
    dateEl.style.fontSize = "0.7rem";
    dateEl.style.textAlign = "right";
    dateEl.style.marginTop = "0.5rem";
    dateEl.style.opacity = "0.7";
    note.appendChild(dateEl);
    // Posicionamiento orgánico
    let x, y;
    if (thoughts.length <= 10) {
      x = Math.random() * (availableWidth - actualNoteWidth) + padding;
      y = Math.random() * (availableHeight - actualNoteHeight) + padding;
      let attempts = 0;
      while (attempts < 50 && placedNotes.some(placed => 
        Math.abs(placed.x - x) < actualNoteWidth + 20 && 
        Math.abs(placed.y - y) < actualNoteHeight + 20
      )) {
        x = Math.random() * (availableWidth - actualNoteWidth) + padding;
        y = Math.random() * (availableHeight - actualNoteHeight) + padding;
        attempts++;
      }
    } else {
      const col = index % cols;
      const row = Math.floor(index / cols);
      const baseX = col * (actualNoteWidth + padding) + padding;
      const baseY = row * (actualNoteHeight + padding) + padding;
      const jitterX = (Math.random() - 0.5) * Math.min(20, padding);
      const jitterY = (Math.random() - 0.5) * Math.min(15, padding);
      x = Math.max(padding, Math.min(baseX + jitterX, availableWidth - actualNoteWidth));
      y = Math.max(padding, Math.min(baseY + jitterY, totalHeight - actualNoteHeight));
    }
    const rotation = (Math.random() - 0.5) * 8;
    note.style.left = `${x}px`;
    note.style.top = `${y}px`;
    note.style.width = `${actualNoteWidth}px`;
    note.style.minHeight = `${actualNoteHeight}px`;
    note.style.setProperty('--note-rotation', `${rotation}deg`);
    note.style.transform = `rotate(${rotation}deg)`;
    note.style.zIndex = Math.floor(Math.random() * 10) + 1;
    note.style.animationDelay = `${index * 0.1}s`;
    placedNotes.push({ x, y });
    container.appendChild(note);
    note.addEventListener("click", async () => {
      const pass = prompt("Para borrar esta nota, ingresa contraseña:");
      if (pass === "rock") {
        await db.collection("eco_thoughts").doc(thought.id).delete();
        renderSavedThoughts();
      }
    });
  });
}

// Llamar al render inicial y también al redimensionar
window.addEventListener("resize", renderSavedThoughts);
renderSavedThoughts();

