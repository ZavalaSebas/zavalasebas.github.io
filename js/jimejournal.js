// Firebase Configuration
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

const fotosJime = [
  { archivo: "jime01.jpg", titulo: "Jime dormida con lentes", fecha: "3 de febrero 2023 18:48", id: "jime01", year: 2023 },
  { archivo: "jime02.jpg", titulo: "Jime morida sobre Andrea", fecha: "3 de febrero 2023 19:47", id: "jime02", year: 2023 },
  { archivo: "jime03.jpg", titulo: "Parada frente al BK", fecha: "16 de febrero 2023 12:46", id: "jime03", year: 2023 },
  { archivo: "jime04.jpg", titulo: "Faking Universidad", fecha: "17 de julio 2023 13:16", id: "jime04", year: 2023 },
  { archivo: "jime05.jpg", titulo: "AMPM", fecha: "26 de julio 2023 17:47", id: "jime05", year: 2023 },
  { archivo: "jime06.jpg", titulo: "Jime's House", fecha: "1 de febrero 2025 12:49", id: "jime06", year: 2025 },
  { archivo: "jime07.jpg", titulo: "Paseo Gym", fecha: "15 de marzo 2025 18:17", id: "jime07", year: 2025 },
  { archivo: "jime08.jpg", titulo: "Jime's House", fecha: "6 de abril 2025 20:06", id: "jime08", year: 2025 },
  { archivo: "jime09.jpg", titulo: "Jime Anuario", fecha: "11 de abril 2025 10:46", id: "jime09", year: 2025 },
  { archivo: "jime10.jpg", titulo: "Antoniana", fecha: "14 de abril 2025 22:04", id: "jime10", year: 2025 },
  { archivo: "jime11.jpg", titulo: "Cooking, Baking", fecha: "27 de abril 2025 17:23", id: "jime11", year: 2025 },
  { archivo: "jime12.jpg", titulo: "Amasando", fecha: "27 de abril 2025 17:24", id: "jime12", year: 2025 },
  { archivo: "jime13.jpg", titulo: "DS Party", fecha: "27 de abril 2025 20:56", id: "jime13", year: 2025 },
  { archivo: "jime14.jpg", titulo: "DS Photo", fecha: "27 de abril 2025 20:58", id: "jime14", year: 2025 },
  { archivo: "jime15.jpg", titulo: "Gym 2.0", fecha: "17 de mayo 2025 10:33", id: "jime15", year: 2025 },
  { archivo: "jime16.jpg", titulo: "Lankester", fecha: "20 de julio 2025 15:58", id: "jime16", year: 2025 },
  { archivo: "jime17.jpg", titulo: "My House", fecha: "20 de julio 2025 17:27", id: "jime17", year: 2025 },
  { archivo: "jime18.jpg", titulo: "Birthdaaay", fecha: "9 de agosto 2025 17:47", id: "jime18", year: 2025 },
  { archivo: "jime19.jpg", titulo: "Birthdaaay", fecha: "9 de agosto 2025 17:48", id: "jime19", year: 2025 },
  { archivo: "jime20.jpg", titulo: "Birthdaaay", fecha: "9 de agosto 2025 17:49", id: "jime20", year: 2025 },
  { archivo: "jime21.jpg", titulo: "Facetime", fecha: "10 de septiembre 2025 20:13", id: "jime21", year: 2025 }
];

let currentPhotoId = null;

// Initialize the journal
function initializeJournal() {
  createTimeline();
  createCollageGrid();
  setupLightboxEvents();
  setupNotesEvents();
}

// Create enhanced timeline with year separators
function createTimeline() {
  const timeline = document.querySelector(".timeline");
  timeline.innerHTML = "";

  // Group photos by year
  const photosByYear = fotosJime.reduce((acc, foto) => {
    if (!acc[foto.year]) acc[foto.year] = [];
    acc[foto.year].push(foto);
    return acc;
  }, {});

  // Create timeline with year separators
  Object.keys(photosByYear).sort().forEach((year, yearIndex) => {
    // Add year separator
    if (yearIndex > 0) {
      const yearSeparator = document.createElement("div");
      yearSeparator.className = "timeline-year";
      yearSeparator.innerHTML = `
        <div class="timeline-year-label">${year}</div>
      `;
      timeline.appendChild(yearSeparator);
    }

    // Add photos for this year
    photosByYear[year].forEach(foto => {
      const point = document.createElement("div");
      point.className = "timeline-point";
      point.setAttribute("data-photo-id", foto.id);

      point.innerHTML = `
        <img src="../assets/image/jimejournal/${foto.archivo}" 
             alt="${foto.titulo}" 
             class="timeline-img"
             data-photo-id="${foto.id}">
        <span>${getShortDate(foto.fecha)}</span>
      `;

      // Add click event to scroll to photo in grid
      point.addEventListener("click", () => {
        const photoTile = document.querySelector(`[data-photo-id="${foto.id}"]`);
        if (photoTile) {
          photoTile.scrollIntoView({ behavior: 'smooth', block: 'center' });
          photoTile.style.animation = 'pulse 1s ease-in-out';
          setTimeout(() => {
            photoTile.style.animation = '';
          }, 1000);
        }
      });

      // Add click event to timeline image to open lightbox
      const timelineImg = point.querySelector('.timeline-img');
      timelineImg.addEventListener("click", (e) => {
        e.stopPropagation();
        openLightbox(foto);
      });

      timeline.appendChild(point);
    });
  });
}

// Create collage grid with enhanced tiles
function createCollageGrid() {
  const collageGrid = document.querySelector(".collage-grid");
  collageGrid.innerHTML = "";

  fotosJime.forEach(foto => {
    const tile = document.createElement("div");
    tile.className = "collage-tile";
    tile.setAttribute("data-photo-id", foto.id);

    tile.innerHTML = `
      <img src="../assets/image/jimejournal/${foto.archivo}" alt="${foto.titulo}" class="collage-img">
      <h3>${foto.titulo}</h3>
      <p class="collage-desc">${foto.fecha}</p>
      <div class="photo-actions">
        <button class="notes-preview-btn" data-photo-id="${foto.id}">
          💭 <span class="notes-count">0</span>
        </button>
      </div>
    `;

    // Main click event for lightbox
    tile.addEventListener("click", (e) => {
      if (!e.target.classList.contains('notes-preview-btn')) {
        openLightbox(foto);
      }
    });

    collageGrid.appendChild(tile);
  });

  // Update notes counts
  updateNotesCounters();
}

// Setup lightbox events
function setupLightboxEvents() {
  const lightbox = document.getElementById("lightbox");
  const lightboxClose = document.querySelector(".lightbox-close");

  lightboxClose.addEventListener("click", closeLightbox);
  
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) {
      closeLightbox();
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && lightbox.style.display === "flex") {
      closeLightbox();
    }
  });
}

// Setup notes events
function setupNotesEvents() {
  const addNoteBtn = document.getElementById("add-note-btn");
  const saveNoteBtn = document.getElementById("save-note-btn");
  const cancelNoteBtn = document.getElementById("cancel-note-btn");
  const noteForm = document.getElementById("add-note-form");

  addNoteBtn.addEventListener("click", () => {
    noteForm.style.display = "block";
    document.getElementById("note-input").focus();
  });

  cancelNoteBtn.addEventListener("click", () => {
    noteForm.style.display = "none";
    document.getElementById("note-input").value = "";
  });

  saveNoteBtn.addEventListener("click", saveNote);

  document.getElementById("note-input").addEventListener("keydown", (e) => {
    if (e.key === "Enter" && e.ctrlKey) {
      saveNote();
    }
  });
}

// Open lightbox with photo and notes
function openLightbox(foto) {
  currentPhotoId = foto.id;
  
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");
  const lightboxCaption = document.getElementById("lightbox-caption");

  lightboxImg.src = `../assets/image/jimejournal/${foto.archivo}`;
  lightboxCaption.textContent = `${foto.titulo} — ${foto.fecha}`;
  lightbox.style.display = "flex";
  
  // Prevent body scroll
  document.body.style.overflow = "hidden";

  // Load notes for this photo
  loadNotes(foto.id);
}

// Close lightbox
function closeLightbox() {
  const lightbox = document.getElementById("lightbox");
  const noteForm = document.getElementById("add-note-form");
  
  lightbox.style.display = "none";
  noteForm.style.display = "none";
  document.getElementById("note-input").value = "";
  currentPhotoId = null;
  
  // Restore body scroll
  document.body.style.overflow = "auto";
}

// Save note to Firebase
async function saveNote() {
  const noteText = document.getElementById("note-input").value.trim();
  if (!noteText || !currentPhotoId) return;

  try {
    await db.collection("jime_notes").add({
      photoId: currentPhotoId,
      text: noteText,
      date: new Date().toLocaleDateString("es-CR", { 
        day: "2-digit", 
        month: "short", 
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit"
      }),
      timestamp: Date.now()
    });

    document.getElementById("note-input").value = "";
    document.getElementById("add-note-form").style.display = "none";
    
    // Reload notes
    loadNotes(currentPhotoId);
    updateNotesCounters();
    
  } catch (error) {
    console.error("Error saving note:", error);
    alert("Error al guardar la nota. Por favor intenta de nuevo.");
  }
}

// Load notes from Firebase
async function loadNotes(photoId) {
  try {
    const snapshot = await db.collection("jime_notes")
      .where("photoId", "==", photoId)
      .get();

    const notesContainer = document.getElementById("notes-container");
    notesContainer.innerHTML = "";

    if (snapshot.empty) {
      notesContainer.innerHTML = `
        <div class="no-notes">
          No hay notas para este recuerdo aún. ¡Sé el primero en agregar una! 💭
        </div>
      `;
      return;
    }

    // Convert to array and sort by timestamp
    const notes = [];
    snapshot.forEach(doc => {
      notes.push({ id: doc.id, ...doc.data() });
    });
    
    notes.sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0));

    notes.forEach(note => {
      const noteElement = document.createElement("div");
      noteElement.className = "memory-note";
      noteElement.innerHTML = `
        <button class="note-delete" onclick="deleteNote('${note.id}')">×</button>
        <div class="note-text">${note.text}</div>
        <div class="note-date">${note.date}</div>
      `;
      notesContainer.appendChild(noteElement);
    });

  } catch (error) {
    console.error("Error loading notes:", error);
    document.getElementById("notes-container").innerHTML = `
      <div class="no-notes">
        No hay notas para este recuerdo aún. ¡Sé el primero en agregar una! 💭
      </div>
    `;
  }
}

// Delete note
async function deleteNote(noteId) {
  if (!confirm("¿Estás seguro de que quieres eliminar esta nota?")) return;

  try {
    await db.collection("jime_notes").doc(noteId).delete();
    loadNotes(currentPhotoId);
    updateNotesCounters();
  } catch (error) {
    console.error("Error deleting note:", error);
    alert("Error al eliminar la nota.");
  }
}

// Update notes counters
async function updateNotesCounters() {
  try {
    const snapshot = await db.collection("jime_notes").get();
    const notesCounts = {};

    snapshot.forEach(doc => {
      const photoId = doc.data().photoId;
      notesCounts[photoId] = (notesCounts[photoId] || 0) + 1;
    });

    // Update counter displays
    fotosJime.forEach(foto => {
      const count = notesCounts[foto.id] || 0;
      const counterEl = document.querySelector(`[data-photo-id="${foto.id}"] .notes-count`);
      if (counterEl) {
        counterEl.textContent = count;
        const btn = counterEl.closest('.notes-preview-btn');
        if (btn) {
          btn.style.opacity = count > 0 ? '1' : '0.5';
        }
      }
    });

  } catch (error) {
    console.error("Error updating notes counters:", error);
  }
}

// Helper function to get short date
function getShortDate(fullDate) {
  const parts = fullDate.split(' ');
  return `${parts[0]} ${parts[2]} ${parts[4]}`;
}

// Add CSS for pulse animation
const style = document.createElement('style');
style.textContent = `
  @keyframes pulse {
    0% { transform: scale(1); box-shadow: 0 0 8px #f9c74f15; }
    50% { transform: scale(1.05); box-shadow: 0 0 20px #f9c74f50; }
    100% { transform: scale(1); box-shadow: 0 0 8px #f9c74f15; }
  }

  .photo-actions {
    display: flex;
    justify-content: center;
    margin-top: 0.5rem;
  }

  .notes-preview-btn {
    background: rgba(249, 199, 79, 0.1);
    border: 1px solid #f9c74f30;
    color: #f9c74f;
    padding: 0.25rem 0.5rem;
    border-radius: 12px;
    cursor: pointer;
    font-size: 0.8rem;
    font-family: 'Quicksand', sans-serif;
    transition: all 0.3s ease;
    opacity: 0.5;
  }

  .notes-preview-btn:hover {
    background: rgba(249, 199, 79, 0.2);
    transform: scale(1.05);
  }

  .no-notes, .error-notes {
    text-align: center;
    color: #f9c74f80;
    font-style: italic;
    padding: 1rem;
  }
`;
document.head.appendChild(style);

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initializeJournal);

// Make deleteNote function global
window.deleteNote = deleteNote;