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

const fotosLau = [
  { archivo: "lau01.jpg", titulo: "Triple Birthday", fecha: "11 de agosto 2024 18:02", id: "lau01", year: 2024 },
  { archivo: "lau02.jpg", titulo: "Staring", fecha: "11 de agosto 2024 18:04", id: "lau02", year: 2024 },
  { archivo: "lau03.jpg", titulo: "TRIPLE HBD CAFE", fecha: "9 de agosto 2025 17:46", id: "lau03", year: 2025 },
  { archivo: "lau04.jpg", titulo: "After After After", fecha: "9 de agosto 2025 23:29", id: "lau04", year: 2025 },
  { archivo: "lau05.jpg", titulo: "Materilist Movie Night", fecha: "14 de agosto 2025 18:33", id: "lau05", year: 2025 },
  { archivo: "lau06.jpg", titulo: "Civil Wedding", fecha: "23 de agosto 2025 17:27", id: "lau06", year: 2025 },
  { archivo: "lau07.jpg", titulo: "Smile", fecha: "23 de agosto 2025 17:47", id: "lau07", year: 2025 },
  { archivo: "lau08.jpg", titulo: "Mad", fecha: "29 de agosto 2025 19:41", id: "lau08", year: 2025 },
  { archivo: "lau09.jpg", titulo: "Barre Club", fecha: "3 de septiembre 2025 17:58", id: "lau09", year: 2025 },
  { archivo: "lau10.jpg", titulo: "Barre Club", fecha: "3 de septiembre 2025 18:28", id: "lau10", year: 2025 },
  { archivo: "lau11.jpg", titulo: "Waiting for someone", fecha: "5 de septiembre 2025 18:15", id: "lau11", year: 2025 },
  { archivo: "lau12.jpg", titulo: "Eating with someone", fecha: "5 de septiembre 2025 19:21", id: "lau12", year: 2025 },
  { archivo: "lau13.jpg", titulo: "Hi", fecha: "5 de septiembre 2025 19:38", id: "lau13", year: 2025 },
  { archivo: "lau14.jpg", titulo: "DS Photo", fecha: "6 de septiembre 2025 15:45", id: "lau14", year: 2025 },
  { archivo: "lau15.jpg", titulo: "Mario Gaming", fecha: "6 de septiembre 2025 15:48", id: "lau15", year: 2025 },
  { archivo: "lau16.jpg", titulo: "ZZZ", fecha: "6 de septiembre 2025 18:18 - 22:19", id: "lau16", year: 2025 },
  { archivo: "lau17.jpg", titulo: "San Pedro Raining", fecha: "15 de septiembre 2025 13:14", id: "lau17", year: 2025 },
  { archivo: "lau18.jpg", titulo: "Music", fecha: "15 de septiembre 2025 16:52", id: "lau18", year: 2025 },
  { archivo: "lau19.jpg", titulo: "Chingon", fecha: "15 de septiembre 2025 18:41", id: "lau19", year: 2025 },
  { archivo: "lau20.jpg", titulo: "Mirror Hall", fecha: "19 de septiembre 2025 18:55", id: "lau20", year: 2025 },
  { archivo: "lau21.jpg", titulo: "Cinema Night", fecha: "19 de septiembre 2025 20:41", id: "lau21", year: 2025 },
  { archivo: "lau22.jpg", titulo: ":/ :)", fecha: "19 de septiembre 2025 23:16", id: "lau22", year: 2025 },
  { archivo: "lau23.jpg", titulo: "Mini Lau :3", fecha: "28 de septiembre 2025 21:15", id: "lau23", year: 2025 },
  { archivo: "lau24.jpg", titulo: "Memories", fecha: "3 de septiembre 2025 19:02", id: "lau24", year: 2025 },
  { archivo: "lau25.jpg", titulo: "Hiii", fecha: "3 de septiembre 2025 19:03", id: "lau25", year: 2025 },
  { archivo: "lau26.jpg", titulo: "Mirrors", fecha: "4 de Octubre 2025 17:36", id: "lau26", year: 2025 },
  { archivo: "lau27.jpg", titulo: "Milano :)", fecha: "4 de Octubre 2025 17:36", id: "lau27", year: 2025 },
  { archivo: "lau28.jpg", titulo: "EYES", fecha: "10 de Octubre 2025 20:50", id: "lau28", year: 2025 },
  { archivo: "lau29.jpg", titulo: "Salmooon", fecha: "10 de Octubre 2025 19:48", id: "lau29", year: 2025 },
  { archivo: "lau30.jpg", titulo: "5 Minutes More pls", fecha: "11 de Octubre 2025 16:47", id: "lau30", year: 2025 },
  { archivo: "lau31.jpg", titulo: "Best Meal Ever", fecha: "11 de Octubre 2025 15:02", id: "lau31", year: 2025 },
  { archivo: "lau32.jpg", titulo: "MILAAAAN", fecha: "15 de Octubre 2025 11:14", id: "lau32", year: 2025 },
  { archivo: "lau33.jpg", titulo: "Best Night", fecha: "20 de Octubre 2025 21:33", id: "lau33", year: 2025 },
  { archivo: "lau34.jpg", titulo: "FEET", fecha: "25 de Octubre 2025 14:40", id: "lau34", year: 2025 },
  { archivo: "lau35.jpg", titulo: "Museo Date", fecha: "25 de Octubre 2025 14:40", id: "lau35", year: 2025 },
  { archivo: "lau36.jpg", titulo: "Lau House", fecha: "31 de octubre 2025 20:18", id: "lau36", year: 2025 },
  { archivo: "lau37.jpg", titulo: "Pinche Milano", fecha: "31 de octubre 2025 22:34", id: "lau37", year: 2025 },
  { archivo: "lau38.jpg", titulo: "I finally found you", fecha: "6 de noviembre 2025 22:51", id: "lau38", year: 2025 },
  { archivo: "lau39.jpg", titulo: "Late night visit", fecha: "8 de noviembre 2025 23:00", id: "lau39", year: 2025 },
  { archivo: "lau40.jpg", titulo: "I love U", fecha: "8 de noviembre 2025 23:00", id: "lau40", year: 2025 },
  { archivo: "lau41.jpg", titulo: "I see U", fecha: "16 de noviembre 2025 19:49", id: "lau41", year: 2025 },
  { archivo: "lau42.jpg", titulo: "Mocho", fecha: "17 de noviembre 2025 13:23", id: "lau42", year: 2025 },
  { archivo: "lau43.jpg", titulo: "she didnt like my jeans", fecha: "21 de noviembre 2025", id: "lau43", year: 2025 },
  { archivo: "lau44.jpg", titulo: "Go Go Lau!", fecha: "30 de noviembre 2025 6:44", id: "lau44", year: 2025 },
  { archivo: "lau45.jpg", titulo: "Go Go Lau!", fecha: "30 de noviembre 2025 7:28", id: "lau45", year: 2025 },
  { archivo: "lau46.jpg", titulo: "Running girl", fecha: "30 de noviembre 2025 7:28", id: "lau46", year: 2025 },
  { archivo: "lau47.jpg", titulo: "Sleeping Partners", fecha: "30 de noviembre 2025 14:44", id: "lau47", year: 2025 },
  { archivo: "lau48.jpg", titulo: "Time to sleep", fecha: "4 de diciembre 2025 23:26", id: "lau48", year: 2025 },
  { archivo: "lau49.jpg", titulo: "Time to wake", fecha: "5 de diciembre 2025 05:41", id: "lau49", year: 2025 },
  { archivo: "lau50.jpg", titulo: "Ternera Street", fecha: "6 de diciembre 2025 11:09", id: "lau50", year: 2025 },
  { archivo: "lau51.jpg", titulo: "Ho Ho Ho", fecha: "6 de diciembre 2025 11:30", id: "lau51", year: 2025 },
  { archivo: "lau52.jpg", titulo: "Chamacos", fecha: "6 de diciembre 2025 11:50", id: "lau52", year: 2025 },
  { archivo: "lau53.jpg", titulo: "Finca", fecha: "6 de diciembre 2025 12:42", id: "lau53", year: 2025 },
  { archivo: "lau54.jpg", titulo: "zzz", fecha: "6 de diciembre 2025 16:15", id: "lau54", year: 2025 },
  { archivo: "lau55.jpg", titulo: "Flowers for my love", fecha: "12 de diciembre 2025 17:52", id: "lau55", year: 2025 },
  { archivo: "lau56.jpg", titulo: "Yeah", fecha: "19 de diciembre 2025 17:49", id: "lau56", year: 2025 },
  { archivo: "lau57.jpg", titulo: "Ruuuun", fecha: "23 de diciembre 2025 19:50", id: "lau57", year: 2025 },
  { archivo: "lau58.jpg", titulo: "Stop", fecha: "23 de diciembre 2025 21:36", id: "lau58", year: 2025 },
  { archivo: "lau59.jpg", titulo: "Merry Merry", fecha: "24 de diciembre 2025 21:58", id: "lau59", year: 2025 },
  { archivo: "lau60.jpg", titulo: "Mhmmm", fecha: "27 de diciembre 2025 01:26", id: "lau60", year: 2025 },
  { archivo: "lau61.jpg", titulo: "New Years Love", fecha: "31 de diciembre 2025 21:58", id: "lau61", year: 2025 },
  { archivo: "lau62.jpg", titulo: "Sweet as Love", fecha: "1 de enero 2026 00:12", id: "lau62", year: 2026 },
  { archivo: "lau63.jpg", titulo: "Could You Be Loved?", fecha: "1 de enero 2026 15:01", id: "lau63", year: 2026 },
  { archivo: "lau64.jpg", titulo: "Mis suegros", fecha: "1 de enero 2026 16:59", id: "lau64", year: 2026 },
  { archivo: "lau65.jpg", titulo: "From she to me", fecha: "1 de enero 2026 17:09", id: "lau65", year: 2026 },
  { archivo: "lau66.jpg", titulo: "At the end", fecha: "1 de enero 2026 18:57", id: "lau66", year: 2026 }
];

let currentPhotoId = null;
let isGridView = true;
let newestPhotoIds = new Set();
let savedScrollPosition = 0;

// Favorites system (localStorage)
let favorites = new Set(JSON.parse(localStorage.getItem('lau_favorites') || '[]'));

// Touch gestures state
let touchStartX = 0;
let touchStartY = 0;
let touchEndX = 0;
let touchEndY = 0;
let isPinching = false;
let initialPinchDistance = 0;
let currentScale = 1;
let isLongPress = false;
let longPressTimer = null;
let lightboxSequence = [];
let lightboxIndex = -1;

// Parse Spanish date strings like "6 de septiembre 2025 18:18 - 22:19" or "4 de Octubre 2025 17:36"
function parseSpanishFechaToTimestamp(fechaStr) {
  try {
    if (!fechaStr) return 0;
    const s = fechaStr.trim().toLowerCase();
    // Map of Spanish months
    const months = {
      'enero': 0, 'febrero': 1, 'marzo': 2, 'abril': 3, 'mayo': 4, 'junio': 5,
      'julio': 6, 'agosto': 7, 'septiembre': 8, 'setiembre': 8, 'octubre': 9, 'noviembre': 10, 'diciembre': 11
    };
    // Remove diacritics helper
    const strip = (t) => t.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    // Use first time if there's a range like "18:18 - 22:19"
    const match = s.match(/^(\d{1,2})\s+de\s+([a-záéíóú]+)\s+(\d{4})(?:\s+(\d{1,2}:\d{2}))/i);
    if (match) {
      const day = parseInt(match[1], 10);
      const monthName = strip(match[2]);
      const year = parseInt(match[3], 10);
      const time = match[4] || '00:00';
      const [hh, mm] = time.split(':').map(n => parseInt(n, 10));
      const mi = months[monthName] ?? months[monthName.toLowerCase()] ?? 0;
      return new Date(year, mi, day, hh || 0, mm || 0).getTime();
    }
    // Fallback: try to extract without time
    const m2 = s.match(/^(\d{1,2})\s+de\s+([a-záéíóú]+)\s+(\d{4})/i);
    if (m2) {
      const day = parseInt(m2[1], 10);
      const monthName = strip(m2[2]);
      const year = parseInt(m2[3], 10);
      const mi = months[monthName] ?? months[monthName.toLowerCase()] ?? 0;
      return new Date(year, mi, day).getTime();
    }
    return 0;
  } catch (e) {
    console.warn('Failed to parse fecha:', fechaStr, e);
    return 0;
  }
}

function computeNewestPhotos() {
  const now = Date.now();
  const windowMs = 48 * 60 * 60 * 1000; // 48 hours
  newestPhotoIds = new Set(
    fotosLau
      .filter(f => {
        const ts = parseSpanishFechaToTimestamp(f.fecha);
        return ts && (now - ts) >= 0 && (now - ts) <= windowMs;
      })
      .map(f => f.id)
  );
}

// Initialize the journal
function initializeJournal() {
  console.log('Initializing journal...');
  // Determine which photos are the most recent to show the "New" badge
  computeNewestPhotos();
  createTimeline();
  createCollageGrid();
  setupLightboxEvents();
  setupNotesEvents();
  initializeDashboard();
  initializeViewControls();
  initializeOnThisDay();
  initializeFullscreenToggle();
  console.log('Journal initialization complete');
}

// Create enhanced timeline with year separators
function createTimeline() {
  const timeline = document.querySelector(".timeline");
  timeline.innerHTML = "";

  // Group photos by year
  const photosByYear = fotosLau.reduce((acc, foto) => {
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
        ${newestPhotoIds.has(foto.id) ? '<span class="new-badge small">New</span>' : ''}
        <img src="../assets/image/laujournal/${foto.archivo}" 
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
  // Ordenar de más nuevo a más viejo por fecha parseada
  const sorted = [...fotosLau].sort((a, b) =>
    (parseSpanishFechaToTimestamp(b.fecha) || 0) - (parseSpanishFechaToTimestamp(a.fecha) || 0)
  );

  sorted.forEach(foto => {
    const tile = document.createElement("div");
    tile.className = "collage-tile";
    tile.setAttribute("data-photo-id", foto.id);

    tile.innerHTML = `
      <div class="tile-media">
        <img src="../assets/image/laujournal/${foto.archivo}" alt="${foto.titulo}" class="collage-img">
        ${newestPhotoIds.has(foto.id) ? '<span class="new-badge" title="Nuevo">✨ New</span>' : ''}
        <div class="tile-overlay">
          <div class="tile-title">${foto.titulo}</div>
          <div class="tile-date">${foto.fecha}</div>
        </div>
      </div>
      <div class="tile-footer">
        <button class="notes-preview-btn" data-photo-id="${foto.id}">
          💭 <span class="notes-count">0</span>
        </button>
        <button class="favorite-tile-btn" data-photo-id="${foto.id}" title="Favorito">
          ${isFavorite(foto.id) ? '⭐' : '☆'}
        </button>
      </div>
    `;

    // Main click event for lightbox
    tile.addEventListener("click", (e) => {
      if (!e.target.classList.contains('notes-preview-btn') && 
          !e.target.classList.contains('favorite-tile-btn') &&
          !e.target.closest('.favorite-tile-btn')) {
        openLightbox(foto);
      }
    });
    
    // Favorite button click
    const favoriteBtn = tile.querySelector('.favorite-tile-btn');
    if (favoriteBtn) {
      favoriteBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleFavorite(foto.id);
      });
    }

    collageGrid.appendChild(tile);
  });

  // Update notes counts
  updateNotesCounters();
  
  // Update favorite stars
  updateGridFavoriteStars();
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
  
  // Prevent scroll on background when lightbox is open
  lightbox.addEventListener("wheel", (e) => {
    // Allow scroll only inside notes container
    const notesContainer = document.querySelector(".notes-container");
    const notesSection = document.querySelector(".memory-notes-section");
    if (!notesContainer.contains(e.target) && !notesSection.contains(e.target)) {
      e.preventDefault();
    }
  }, { passive: false });
  
  lightbox.addEventListener("touchmove", (e) => {
    // Allow scroll only inside notes container
    const notesContainer = document.querySelector(".notes-container");
    const notesSection = document.querySelector(".memory-notes-section");
    if (!notesContainer.contains(e.target) && !notesSection.contains(e.target)) {
      e.preventDefault();
    }
  }, { passive: false });
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
  // Build ordered sequence (match grid ordering used in createCollageGrid: newest first)
  lightboxSequence = [...fotosLau].sort((a, b) => (parseSpanishFechaToTimestamp(b.fecha) || 0) - (parseSpanishFechaToTimestamp(a.fecha) || 0));
  lightboxIndex = lightboxSequence.findIndex(f => f.id === foto.id);
  
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");
  const lightboxCaption = document.getElementById("lightbox-caption");

  // Add entrance animation
  lightbox.style.display = "flex";
  lightbox.classList.add('lightbox-enter');
  setTimeout(() => lightbox.classList.remove('lightbox-enter'), 300);

  lightboxImg.src = `../assets/image/laujournal/${foto.archivo}`;
  lightboxCaption.textContent = `${foto.titulo} — ${foto.fecha}`;
  
  // Update favorite star
  updateFavoriteUI(foto.id);
  
  // Save scroll position and prevent body scroll completely
  savedScrollPosition = window.scrollY;
  document.body.style.overflow = "hidden";
  document.body.style.position = "fixed";
  document.body.style.width = "100%";
  document.body.style.top = `-${savedScrollPosition}px`;

  // Show skeleton while loading notes
  showSkeletonNotes();
  
  // Load notes for this photo
  loadNotes(foto.id);
  
  // Reset zoom
  currentScale = 1;
  lightboxImg.style.transform = 'scale(1)';
}

// Close lightbox
function closeLightbox() {
  const lightbox = document.getElementById("lightbox");
  const noteForm = document.getElementById("add-note-form");
  
  lightbox.style.display = "none";
  noteForm.style.display = "none";
  document.getElementById("note-input").value = "";
  currentPhotoId = null;
  
  // Restore body scroll and position
  document.body.style.overflow = "";
  document.body.style.position = "";
  document.body.style.width = "";
  document.body.style.top = "";
  window.scrollTo(0, savedScrollPosition);
}

// Save note to Firebase
async function saveNote() {
  const noteText = document.getElementById("note-input").value.trim();
  if (!noteText || !currentPhotoId) return;

  try {
    await db.collection("lau_notes").add({
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
    const snapshot = await db.collection("lau_notes")
      .where("photoId", "==", photoId)
      .get();

    const notesContainer = document.getElementById("notes-container");
    notesContainer.innerHTML = "";

    if (snapshot.empty) {
      notesContainer.innerHTML = `
        <div class="no-notes">
          No hay notas para este recuerdo aún. ¡Sé la primera en agregar una! 💭
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
        No hay notas para este recuerdo aún. ¡Sé la primera en agregar una! 💭
      </div>
    `;
  }
}

// Delete note
async function deleteNote(noteId) {
  if (!confirm("¿Estás segura de que quieres eliminar esta nota?")) return;

  try {
    await db.collection("lau_notes").doc(noteId).delete();
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
    const snapshot = await db.collection("lau_notes").get();
    const notesCounts = {};

    snapshot.forEach(doc => {
      const photoId = doc.data().photoId;
      notesCounts[photoId] = (notesCounts[photoId] || 0) + 1;
    });

    // Update counter displays
    fotosLau.forEach(foto => {
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

// Dashboard functionality
function initializeDashboard() {
    const dashboardBtn = document.querySelector('.dashboard-btn');
    const dashboard = document.getElementById('stats-dashboard');
    const closeDashboard = document.getElementById('close-stats');
    
    if (!dashboardBtn || !dashboard || !closeDashboard) {
        console.log('Dashboard elements not found:', { dashboardBtn, dashboard, closeDashboard });
        return;
    }
    
    dashboardBtn.addEventListener('click', () => {
        dashboard.style.display = 'block';
        updateDashboardStats();
    });
    
    closeDashboard.addEventListener('click', () => {
        dashboard.style.display = 'none';
    });
    
    // Close dashboard when clicking outside
    dashboard.addEventListener('click', (e) => {
        if (e.target === dashboard) {
            dashboard.style.display = 'none';
        }
    });
}

function updateDashboardStats() {
    // Update stat cards
    const totalMemoriesEl = document.getElementById('total-photos');
    if (totalMemoriesEl) totalMemoriesEl.textContent = fotosLau.length;
    
    // Get notes count from Firebase
    if (db) {
        db.collection('lau_notes').get().then((querySnapshot) => {
            const totalNotesEl = document.getElementById('total-notes');
            if (totalNotesEl) totalNotesEl.textContent = querySnapshot.size;
        });
    }
    
    // Calculate years span
    const years = getYearsSpan();
    const yearsSpanEl = document.getElementById('years-span');
    if (yearsSpanEl) yearsSpanEl.textContent = years;
    
    // Special photos count (photos with notes)
    if (db) {
        db.collection('lau_notes').get().then((querySnapshot) => {
            const photoIds = new Set();
            querySnapshot.forEach(doc => {
                photoIds.add(doc.data().photoId);
            });
            const specialPhotosEl = document.getElementById('special-photos');
            if (specialPhotosEl) specialPhotosEl.textContent = photoIds.size;
        });
    }
    
    // Update charts
    updateYearChart();
    updateRecentActivity();
}

function getYearsSpan() {
    const years = fotosLau.map(foto => foto.year);
    const minYear = Math.min(...years);
    const maxYear = Math.max(...years);
    return maxYear - minYear + 1;
}

function updateYearChart() {
    const yearChart = document.querySelector('.year-chart');
    if (!yearChart) return;
    
    const yearCounts = {};
    fotosLau.forEach(foto => {
        yearCounts[foto.year] = (yearCounts[foto.year] || 0) + 1;
    });
    
    const maxCount = Math.max(...Object.values(yearCounts));
    yearChart.innerHTML = '';
    
    Object.entries(yearCounts).sort().forEach(([year, count]) => {
        const percentage = (count / maxCount) * 100;
        const barHtml = `
            <div class="chart-bar">
                <div class="chart-label">${year}</div>
                <div class="chart-fill" style="width: ${percentage}%"></div>
                <div class="chart-value">${count}</div>
            </div>
        `;
        yearChart.innerHTML += barHtml;
    });
}

function updateRecentActivity() {
    const activityList = document.querySelector('.activity-list');
    if (!activityList) return;
    
    const activities = [
        { icon: '📝', text: 'Nota añadida a memoria de septiembre', time: '2 horas' },
        { icon: '🖼️', text: 'Nueva memoria visualizada', time: '1 día' },
        { icon: '💭', text: 'Reflexión guardada', time: '3 días' },
        { icon: '🎯', text: 'Memoria especial marcada', time: '1 semana' }
    ];
    
    activityList.innerHTML = activities.map(activity => `
        <div class="activity-item">
            <div class="activity-icon">${activity.icon}</div>
            <div class="activity-text">${activity.text}</div>
            <div class="activity-time">hace ${activity.time}</div>
        </div>
    `).join('');
}

// View Controls functionality
function initializeViewControls() {
    // Header mosaic button
    const headerMosaicBtn = document.querySelector('.mosaic-btn');
    // View toggle buttons  
    const gridBtn = document.getElementById('grid-view');
    const mosaicBtn = document.getElementById('mosaic-view');
  const presentationBtn = document.getElementById('presentation-view');
    const collage = document.getElementById('collage-grid');
    const mosaicContainer = document.querySelector('.mosaic-container');
    
    if (!gridBtn || !mosaicBtn || !collage) {
        console.log('View control elements not found:', { gridBtn, mosaicBtn, collage });
        return;
    }
    
    // Create mosaic container if it doesn't exist
    if (!mosaicContainer) {
        const newMosaicContainer = document.createElement('div');
        newMosaicContainer.className = 'mosaic-container';
        newMosaicContainer.id = 'mosaic-container';
        collage.parentNode.insertBefore(newMosaicContainer, collage.nextSibling);
    }
    
    function activateGridView() {
        isGridView = true;
        if (gridBtn) {
            gridBtn.classList.add('active');
            mosaicBtn.classList.remove('active');
        }
        // Restore original grid styling
        collage.style.display = '';
        collage.className = 'collage-grid';
        const mosaic = document.querySelector('.mosaic-container');
        if (mosaic) mosaic.classList.remove('active');
    }
    
    function activateMosaicView() {
        isGridView = false;
        if (gridBtn && mosaicBtn) {
            mosaicBtn.classList.add('active');
            gridBtn.classList.remove('active');
        }
        collage.style.display = 'none';
        const mosaic = document.querySelector('.mosaic-container');
        if (mosaic) {
            mosaic.classList.add('active');
            generateMosaicView();
        }
    }
    
    // Header mosaic button
    if (headerMosaicBtn) {
        headerMosaicBtn.addEventListener('click', () => {
            if (isGridView) {
                activateMosaicView();
            } else {
                activateGridView();
            }
        });
    }
    
    // View toggle buttons
    gridBtn.addEventListener('click', activateGridView);
    mosaicBtn.addEventListener('click', activateMosaicView);
    if (presentationBtn) {
      presentationBtn.addEventListener('click', () => {
        startPresentationMode();
      });
    }
}

function generateMosaicView() {
    const mosaicContainer = document.querySelector('.mosaic-container');
    if (!mosaicContainer) return;
    
    // Group photos by year
    const groupedPhotos = {};
    fotosLau.forEach(foto => {
        if (!groupedPhotos[foto.year]) {
            groupedPhotos[foto.year] = [];
        }
        groupedPhotos[foto.year].push(foto);
    });
    
    mosaicContainer.innerHTML = '';
    
    Object.entries(groupedPhotos).sort(([a], [b]) => b - a).forEach(([year, photos]) => {
        const groupDiv = document.createElement('div');
        groupDiv.className = 'mosaic-date-group';
        
        const headerDiv = document.createElement('div');
        headerDiv.className = 'mosaic-date-header';
        headerDiv.textContent = `${year} (${photos.length} memorias)`;
        
        groupDiv.appendChild(headerDiv);
        
        photos.forEach(foto => {
            const mosaicItem = document.createElement('div');
            mosaicItem.className = 'mosaic-item';
            
            // Random height for Pinterest effect
            const heights = ['200px', '250px', '300px', '350px', '280px'];
            const randomHeight = heights[Math.floor(Math.random() * heights.length)];
            
      mosaicItem.innerHTML = `
        <img src="../assets/image/laujournal/${foto.archivo}" alt="${foto.titulo}" style="height: ${randomHeight}; object-fit: cover;">
        ${newestPhotoIds.has(foto.id) ? '<span class="new-badge">✨ New</span>' : ''}
        <div class="mosaic-overlay">
                    ${foto.titulo}<br>
                    ${foto.fecha}
                </div>
            `;
            
            mosaicItem.addEventListener('click', () => {
                openLightbox(foto);
            });
            
            groupDiv.appendChild(mosaicItem);
        });
        
        mosaicContainer.appendChild(groupDiv);
    });
}

// On This Day functionality
function initializeOnThisDay() {
    const todayBtn = document.querySelector('.today-btn');
    const onThisDay = document.getElementById('on-this-day');
    const closeToday = document.getElementById('close-today');
    
    if (!todayBtn || !onThisDay) {
        console.log('Today elements not found:', { todayBtn, onThisDay });
        return;
    }
    
    todayBtn.addEventListener('click', () => {
        if (onThisDay.style.display === 'none' || !onThisDay.style.display) {
            onThisDay.style.display = 'block';
            updateOnThisDay();
        } else {
            onThisDay.style.display = 'none';
        }
    });
    
    if (closeToday) {
        closeToday.addEventListener('click', () => {
            onThisDay.style.display = 'none';
        });
    }
}

function updateOnThisDay() {
    const today = new Date();
    const todayContent = document.getElementById('today-content');
    if (!todayContent) {
        console.log('today-content element not found');
        return;
    }
    
    // For demo purposes, find photos from different years in the same month
    const currentMonth = today.getMonth() + 1; // JavaScript months are 0-indexed
    
    // Group photos by year for similar time periods
    const memoriesByYear = {};
    
    fotosLau.forEach(foto => {
        // Parse month from fecha string (assuming format like "3 de febrero 2023")
        const fechaParts = foto.fecha.split(' ');
        const monthName = fechaParts[2];
        const monthMap = {
            'enero': 1, 'febrero': 2, 'marzo': 3, 'abril': 4, 'mayo': 5, 'junio': 6,
            'julio': 7, 'agosto': 8, 'septiembre': 9, 'octubre': 10, 'noviembre': 11, 'diciembre': 12
        };
        
        const photoMonth = monthMap[monthName.toLowerCase()];
        
        // Show memories from the same month or adjacent months
        if (Math.abs(photoMonth - currentMonth) <= 1) {
            if (!memoriesByYear[foto.year]) {
                memoriesByYear[foto.year] = [];
            }
            memoriesByYear[foto.year].push(foto);
        }
    });
    
    if (Object.keys(memoriesByYear).length === 0) {
        todayContent.innerHTML = '<div class="no-memories">No hay memorias cercanas a esta fecha</div>';
        return;
    }
    
    todayContent.innerHTML = '';
    
    Object.entries(memoriesByYear).sort(([a], [b]) => b - a).forEach(([year, yearPhotos]) => {
        const currentYear = today.getFullYear();
        const yearsAgo = currentYear - parseInt(year);
        
        const memoryYear = document.createElement('div');
        memoryYear.className = 'memory-year';
        
        const yearHeader = document.createElement('div');
        yearHeader.className = 'year-header';
        yearHeader.innerHTML = `
            <span>${year}</span>
            <span class="years-ago">${yearsAgo > 0 ? `hace ${yearsAgo} año${yearsAgo > 1 ? 's' : ''}` : 'Este año'}</span>
        `;
        
        const yearPhotosDiv = document.createElement('div');
        yearPhotosDiv.className = 'year-photos';
        
        yearPhotosDiv.innerHTML = yearPhotos.map(foto => `
            <div class="today-photo" onclick="openLightbox(fotosLau.find(f => f.id === '${foto.id}'))">
                <img src="../assets/image/laujournal/${foto.archivo}" alt="${foto.titulo}">
                <div class="today-photo-overlay">
                    ${foto.titulo}
                </div>
            </div>
        `).join('');
        
        memoryYear.appendChild(yearHeader);
        memoryYear.appendChild(yearPhotosDiv);
        todayContent.appendChild(memoryYear);
    });
}

// Add CSS for pulse animation and other styles
const style = document.createElement('style');
style.textContent = `
  @keyframes pulse {
    0% { transform: scale(1); box-shadow: 0 0 8px #ff99cc15; }
    50% { transform: scale(1.05); box-shadow: 0 0 20px #ff99cc50; }
    100% { transform: scale(1); box-shadow: 0 0 8px #ff99cc15; }
  }

  .photo-actions {
    display: flex;
    justify-content: center;
    margin-top: 0.5rem;
  }

  .notes-preview-btn {
    background: rgba(255, 153, 204, 0.1);
    border: 1px solid #ff99cc30;
    color: #ff99cc;
    padding: 0.25rem 0.5rem;
    border-radius: 12px;
    cursor: pointer;
    font-size: 0.8rem;
    font-family: 'Quicksand', sans-serif;
    transition: all 0.3s ease;
    opacity: 0.5;
  }

  .notes-preview-btn:hover {
    background: rgba(255, 153, 204, 0.2);
    transform: scale(1.05);
  }

  .no-notes, .error-notes {
    text-align: center;
    color: #ff99cc80;
    font-style: italic;
    padding: 1rem;
  }
`;
document.head.appendChild(style);

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, starting initialization...');
    
    // Core initialization
    initializeJournal();
    setupPresentationControls();
    setupLightboxNavControls();
    
    // New features initialization
    initTouchGestures();
    initPullToRefresh();
    addLightboxAnimations();
    addPresentationTransitions();
    updateGridFavoriteStars();
    
    // Disable pull-to-refresh completely
    let lastTouchY = 0;
    
    document.addEventListener('touchstart', (e) => {
      lastTouchY = e.touches[0].clientY;
    }, { passive: false });
    
    document.addEventListener('touchmove', (e) => {
      const touchY = e.touches[0].clientY;
      const touchDelta = touchY - lastTouchY;
      
      // Always prevent pull-to-refresh when at top of page
      if (window.scrollY <= 0 && touchDelta > 0) {
        e.preventDefault();
        return false;
      }
    }, { passive: false });
    
    document.addEventListener('touchend', (e) => {
      // Ensure no bounce effect after touch ends at top
      if (window.scrollY < 0) {
        window.scrollTo(0, 0);
      }
    }, { passive: false });
    
    console.log('All features initialized! ✨');
});

// Make functions global for HTML onclick handlers
window.deleteNote = deleteNote;
window.toggleFavorite = toggleFavorite;
window.sharePhoto = sharePhoto;
// window.downloadPhoto removed (no explicit download UI)

// Fullscreen toggle
function initializeFullscreenToggle() {
  const btn = document.getElementById('fullscreen-btn');
  if (!btn) return;
  const isFs = () => document.fullscreenElement || document.webkitFullscreenElement || document.msFullscreenElement;
  const enter = (el) => {
    if (el.requestFullscreen) return el.requestFullscreen();
    if (el.webkitRequestFullscreen) return el.webkitRequestFullscreen();
    if (el.msRequestFullscreen) return el.msRequestFullscreen();
  };
  const exit = () => {
    if (document.exitFullscreen) return document.exitFullscreen();
    if (document.webkitExitFullscreen) return document.webkitExitFullscreen();
    if (document.msExitFullscreen) return document.msExitFullscreen();
  };
  btn.addEventListener('click', () => {
    if (isFs()) {
      exit();
    } else {
      enter(document.documentElement);
    }
  });
}

// Lightbox navigation controls (prev/next buttons and arrow keys)
function setupLightboxNavControls() {
  const prevBtn = document.getElementById('lightbox-prev');
  const nextBtn = document.getElementById('lightbox-next');
  if (prevBtn) prevBtn.addEventListener('click', () => navigateLightbox(-1));
  if (nextBtn) nextBtn.addEventListener('click', () => navigateLightbox(1));

  document.addEventListener('keydown', (e) => {
    const lightbox = document.getElementById('lightbox');
    if (!lightbox || lightbox.style.display !== 'flex') return;
    if (e.key === 'ArrowLeft') navigateLightbox(-1);
    if (e.key === 'ArrowRight') navigateLightbox(1);
  });
}

function navigateLightbox(step) {
  if (!lightboxSequence.length || lightboxIndex < 0) return;
  lightboxIndex = (lightboxIndex + step + lightboxSequence.length) % lightboxSequence.length;
  const foto = lightboxSequence[lightboxIndex];
  if (!foto) return;
  currentPhotoId = foto.id;

  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxCaption = document.getElementById('lightbox-caption');
  if (lightboxImg) {
    lightboxImg.style.opacity = 0;
    setTimeout(() => {
      lightboxImg.src = `../assets/image/laujournal/${foto.archivo}`;
      lightboxImg.alt = foto.titulo;
      lightboxImg.style.opacity = 1;
    }, 150);
  }
  if (lightboxCaption) {
    lightboxCaption.textContent = `${foto.titulo} — ${foto.fecha}`;
  }
  // Reload notes for new photo
  loadNotes(foto.id);
}

// Presentation Mode Implementation
let presentationIndex = 0;
let presentationTimer = null;
let presentationPlaying = true;
let presentationSequence = [];
const PRESENTATION_INTERVAL_MS = 6000; // 6 seconds per photo

function startPresentationMode() {
  if (document.body.classList.contains('presentation-active')) return; // already active
  document.body.classList.add('presentation-active');
  const overlay = document.getElementById('presentation-overlay');
  if (!overlay) return;
  overlay.style.display = 'flex';

  // Enter fullscreen if possible
  try {
    if (!document.fullscreenElement && overlay.requestFullscreen) {
      overlay.requestFullscreen().catch(()=>{});
    }
  } catch(e) { console.warn('Fullscreen not available', e); }

  // Prepare sequence (chronological)
  // Build a fresh randomized sequence each time presentation starts
  presentationSequence = shuffleArray([...fotosLau]);
  overlay.dataset.count = presentationSequence.length;
  presentationIndex = 0;
  presentationPlaying = true;
  showPresentationPhoto(presentationSequence[presentationIndex]);
  const audioEl = document.getElementById('presentation-audio');
  if (audioEl) {
    audioEl.currentTime = 0;
    audioEl.play().catch(()=>{});
  }
  startPresentationTimer();
}

function startPresentationTimer() {
  clearInterval(presentationTimer);
  if (!presentationPlaying) return;
  presentationTimer = setInterval(() => {
    advancePresentation(1, true); // true = auto advance
  }, PRESENTATION_INTERVAL_MS);
}

function advancePresentation(step, isAuto = false) {
  const seq = presentationSequence.length ? presentationSequence : [...fotosLau].sort((a,b) => (parseSpanishFechaToTimestamp(a.fecha)||0)-(parseSpanishFechaToTimestamp(b.fecha)||0));
  presentationIndex = (presentationIndex + step + seq.length) % seq.length;
  // Optional: when we wrap to first photo after auto-forward, reshuffle for continuous randomness
  if (presentationIndex === 0 && step === 1 && isAuto) {
    presentationSequence = shuffleArray([...fotosLau]);
  }
  showPresentationPhoto(seq[presentationIndex]);
  
  // Reset timer on manual navigation (not auto)
  if (!isAuto) {
    startPresentationTimer();
  }
}

function showPresentationPhoto(foto) {
  if (!foto) return;
  const img = document.getElementById('presentation-image');
  const caption = document.getElementById('presentation-caption');
  if (img) {
    img.style.opacity = 0;
    setTimeout(()=>{
      img.src = `../assets/image/laujournal/${foto.archivo}`;
      img.alt = foto.titulo;
      img.style.opacity = 1;
    }, 150);
  }
  if (caption) {
    caption.innerHTML = `<span class="presentation-title">${foto.titulo}</span><br><span class="presentation-date">${foto.fecha}</span>`;
  }
}

function stopPresentationMode() {
  clearInterval(presentationTimer);
  presentationPlaying = false;
  const overlay = document.getElementById('presentation-overlay');
  if (overlay) overlay.style.display = 'none';
  document.body.classList.remove('presentation-active');
  const audioEl = document.getElementById('presentation-audio');
  if (audioEl) audioEl.pause();
  // Exit fullscreen if we entered
  try {
    if (document.fullscreenElement) {
      document.exitFullscreen();
    }
  } catch(e) { /* ignore */ }
}

function togglePresentationPlay() {
  presentationPlaying = !presentationPlaying;
  const btn = document.getElementById('presentation-playpause');
  if (btn) btn.textContent = presentationPlaying ? '⏸' : '▶';
  const audioEl = document.getElementById('presentation-audio');
  if (audioEl) {
    if (presentationPlaying) audioEl.play().catch(()=>{}); else audioEl.pause();
  }
  if (presentationPlaying) {
    // restart timer
    startPresentationTimer();
  } else {
    clearInterval(presentationTimer);
  }
}

function setupPresentationControls() {
  const prevBtn = document.getElementById('presentation-prev');
  const nextBtn = document.getElementById('presentation-next');
  const exitBtn = document.getElementById('presentation-exit');
  const playPauseBtn = document.getElementById('presentation-playpause');
  if (prevBtn) prevBtn.addEventListener('click', () => { 
    advancePresentation(-1);
    // reset timer after manual navigation
    if (presentationPlaying) startPresentationTimer();
  });
  if (nextBtn) nextBtn.addEventListener('click', () => { 
    advancePresentation(1);
    // reset timer after manual navigation
    if (presentationPlaying) startPresentationTimer();
  });
  if (exitBtn) exitBtn.addEventListener('click', stopPresentationMode);
  if (playPauseBtn) playPauseBtn.addEventListener('click', togglePresentationPlay);

  // Allow ESC to exit
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && document.body.classList.contains('presentation-active')) {
      stopPresentationMode();
    }
    if (e.key === 'ArrowRight' && document.body.classList.contains('presentation-active')) {
      advancePresentation(1);
      if (presentationPlaying) startPresentationTimer();
    }
    if (e.key === 'ArrowLeft' && document.body.classList.contains('presentation-active')) {
      advancePresentation(-1);
      if (presentationPlaying) startPresentationTimer();
    }
    if (e.key.toLowerCase() === 'p' && document.body.classList.contains('presentation-active')) {
      togglePresentationPlay();
    }
  });
}

// Expose for console debugging
window.startPresentationMode = startPresentationMode;
window.stopPresentationMode = stopPresentationMode;

// Utility: Fisher-Yates shuffle
function shuffleArray(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

// ============================================
// FAVORITES SYSTEM (LocalStorage)
// ============================================

function toggleFavorite(photoId) {
  if (favorites.has(photoId)) {
    favorites.delete(photoId);
  } else {
    favorites.add(photoId);
  }
  saveFavorites();
  updateFavoriteUI(photoId);
  updateGridFavoriteStars();
}

function saveFavorites() {
  localStorage.setItem('lau_favorites', JSON.stringify([...favorites]));
}

function isFavorite(photoId) {
  return favorites.has(photoId);
}

function updateFavoriteUI(photoId) {
  const starBtn = document.querySelector('.favorite-star-btn');
  if (starBtn && currentPhotoId === photoId) {
    starBtn.classList.toggle('active', isFavorite(photoId));
    starBtn.innerHTML = isFavorite(photoId) ? '⭐' : '☆';
  }
}

function updateGridFavoriteStars() {
  fotosLau.forEach(foto => {
    const favoriteBtn = document.querySelector(`.tile-footer .favorite-tile-btn[data-photo-id="${foto.id}"]`);
    if (favoriteBtn) {
      favoriteBtn.innerHTML = isFavorite(foto.id) ? '⭐' : '☆';
      favoriteBtn.classList.toggle('active', isFavorite(foto.id));
    }
  });
}

// ============================================
// SHARE & DOWNLOAD SYSTEM
// ============================================

function sharePhoto(foto) {
  const imageUrl = `${window.location.origin}/assets/image/laujournal/${foto.archivo}`;
  const text = `${foto.titulo} - ${foto.fecha}`;
  
  if (navigator.share) {
    // Use native share if available
    navigator.share({
      title: foto.titulo,
      text: text,
      url: imageUrl
    }).catch(err => console.log('Share cancelled', err));
  } else {
    // Fallback: copy link
    navigator.clipboard.writeText(imageUrl).then(() => {
      alert('¡Enlace copiado al portapapeles! 📋');
    }).catch(() => {
      alert('Enlace: ' + imageUrl);
    });
  }
}

// Removed explicit download function. Rationale: use native long-press on image to save.

// ============================================
// TOUCH GESTURES
// ============================================

function initTouchGestures() {
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  
  if (!lightbox || !lightboxImg) return;
  
  // Swipe to navigate
  lightbox.addEventListener('touchstart', handleTouchStart, { passive: true });
  lightbox.addEventListener('touchmove', handleTouchMove, { passive: false });
  lightbox.addEventListener('touchend', handleTouchEnd, { passive: true });
  
  // Pinch to zoom
  lightboxImg.addEventListener('touchstart', handlePinchStart, { passive: false });
  lightboxImg.addEventListener('touchmove', handlePinchMove, { passive: false });
  lightboxImg.addEventListener('touchend', handlePinchEnd, { passive: true });
  
  // Long press for options
  lightbox.addEventListener('touchstart', handleLongPressStart, { passive: true });
  lightbox.addEventListener('touchend', handleLongPressEnd, { passive: true });
  lightbox.addEventListener('touchmove', handleLongPressCancel, { passive: true });
}

function handleTouchStart(e) {
  touchStartX = e.changedTouches[0].screenX;
  touchStartY = e.changedTouches[0].screenY;
  touchEndX = touchStartX;
  touchEndY = touchStartY;
}

function handleTouchMove(e) {
  const lightbox = document.getElementById('lightbox');
  if (lightbox.style.display !== 'flex') return;
  
  touchEndX = e.changedTouches[0].screenX;
  touchEndY = e.changedTouches[0].screenY;
  
  const deltaY = touchEndY - touchStartY;
  const deltaX = touchEndX - touchStartX;
  
  // Only prevent if swiping down and mostly vertical (potential close gesture or pull-to-refresh)
  if (deltaY > 10 && Math.abs(deltaY) > Math.abs(deltaX)) {
    e.preventDefault();
  }
}

function handleTouchEnd(e) {
  const lightbox = document.getElementById('lightbox');
  if (lightbox.style.display !== 'flex') return;
  
  const deltaX = touchEndX - touchStartX;
  const deltaY = touchEndY - touchStartY;
  
  // Swipe down to close (>100px down)
  if (deltaY > 100 && Math.abs(deltaX) < 50) {
    closeLightbox();
    return;
  }
  
  // Swipe left/right to navigate (>50px)
  if (Math.abs(deltaX) > 50 && Math.abs(deltaY) < 50) {
    if (deltaX > 0) {
      navigateLightbox(-1); // Swipe right = previous
    } else {
      navigateLightbox(1); // Swipe left = next
    }
  }
}

// Pinch to Zoom
function handlePinchStart(e) {
  if (e.touches.length === 2) {
    e.preventDefault();
    isPinching = true;
    initialPinchDistance = getPinchDistance(e.touches);
  }
}

function handlePinchMove(e) {
  if (isPinching && e.touches.length === 2) {
    e.preventDefault();
    const currentDistance = getPinchDistance(e.touches);
    const scale = currentDistance / initialPinchDistance;
    currentScale = Math.max(1, Math.min(scale * currentScale, 4));
    
    const img = e.target;
    img.style.transform = `scale(${currentScale})`;
    img.style.transition = 'none';
  }
}

function handlePinchEnd(e) {
  if (isPinching) {
    isPinching = false;
    const img = e.target;
    
    // Reset if scale is close to 1
    if (currentScale < 1.2) {
      currentScale = 1;
      img.style.transform = 'scale(1)';
      img.style.transition = 'transform 0.3s ease';
    }
  }
}

function getPinchDistance(touches) {
  const dx = touches[0].clientX - touches[1].clientX;
  const dy = touches[0].clientY - touches[1].clientY;
  return Math.sqrt(dx * dx + dy * dy);
}

// Long Press for Options
function handleLongPressStart(e) {
  isLongPress = false;
  longPressTimer = setTimeout(() => {
    isLongPress = true;
    showQuickOptions();
  }, 500); // 500ms for long press
}

function handleLongPressEnd(e) {
  clearTimeout(longPressTimer);
}

function handleLongPressCancel(e) {
  clearTimeout(longPressTimer);
}

function showQuickOptions() {
  const foto = fotosLau.find(f => f.id === currentPhotoId);
  if (!foto) return;
  
  // Haptic feedback if available
  if (navigator.vibrate) {
    navigator.vibrate(50);
  }
  // Remove the download option and avoid showing any blocking UI.
  // For ahora, no mostramos ningún menú; se dejó la vibración como feedback sutil.
  // Si quieres, podemos activar una acción directa (p. ej. alternar favorito) aquí.
}

// ============================================
// PULL TO REFRESH
// ============================================

let pullStartY = 0;
let pullEndY = 0;
let isPulling = false;

function initPullToRefresh() {
  const diary = document.querySelector('.diary');
  if (!diary) return;
  // Helper to know if lightbox is currently open
  const isLightboxOpen = () => {
    const lb = document.getElementById('lightbox');
    return lb && lb.style.display === 'flex';
  };
  
  let refreshIndicator = document.createElement('div');
  refreshIndicator.className = 'pull-refresh-indicator';
  refreshIndicator.innerHTML = '↓ Suelta para actualizar';
  refreshIndicator.style.display = 'none';
  diary.prepend(refreshIndicator);
  
  document.addEventListener('touchstart', (e) => {
    // Do not start pull-to-refresh when the lightbox is open
    if (isLightboxOpen()) {
      isPulling = false;
      return;
    }
    if (window.scrollY === 0) {
      pullStartY = e.touches[0].clientY;
      isPulling = true;
    }
  }, { passive: true });
  
  document.addEventListener('touchmove', (e) => {
    // Ignore while lightbox is open
    if (isLightboxOpen()) {
      isPulling = false;
      refreshIndicator.style.display = 'none';
      return;
    }
    if (isPulling && window.scrollY === 0) {
      pullEndY = e.touches[0].clientY;
      const pullDistance = pullEndY - pullStartY;
      
      if (pullDistance > 80) {
        refreshIndicator.style.display = 'block';
        refreshIndicator.innerHTML = '✨ Actualizar';
      } else if (pullDistance > 0) {
        refreshIndicator.style.display = 'block';
        refreshIndicator.innerHTML = '↓ Suelta para actualizar';
      }
    }
  }, { passive: true });
  
  document.addEventListener('touchend', (e) => {
    // Do not trigger refresh if the lightbox is/was open
    if (isLightboxOpen()) {
      isPulling = false;
      refreshIndicator.style.display = 'none';
      return;
    }
    if (isPulling) {
      const pullDistance = pullEndY - pullStartY;
      
      if (pullDistance > 80) {
        refreshIndicator.innerHTML = '⏳ Actualizando...';
        setTimeout(() => {
          location.reload();
        }, 500);
      } else {
        refreshIndicator.style.display = 'none';
      }
      
      isPulling = false;
    }
  }, { passive: true });
}

// ============================================
// SKELETON SCREENS
// ============================================

function showSkeletonNotes() {
  const container = document.getElementById('notes-container');
  if (!container) return;
  
  container.innerHTML = `
    <div class="skeleton-note">
      <div class="skeleton-line" style="width: 80%;"></div>
      <div class="skeleton-line" style="width: 60%;"></div>
      <div class="skeleton-line" style="width: 40%;"></div>
    </div>
  `;
}

function showSkeletonGrid() {
  const grid = document.querySelector('.collage-grid');
  if (!grid) return;
  
  grid.innerHTML = '';
  for (let i = 0; i < 6; i++) {
    const skeleton = document.createElement('div');
    skeleton.className = 'skeleton-tile';
    skeleton.innerHTML = `
      <div class="skeleton-image"></div>
      <div class="skeleton-text"></div>
    `;
    grid.appendChild(skeleton);
  }
}

// ============================================
// ENHANCED ANIMATIONS
// ============================================

function addLightboxAnimations() {
  const lightbox = document.getElementById('lightbox');
  const lightboxContent = document.querySelector('.lightbox-content');
  
  if (!lightbox || !lightboxContent) return;
  
  // Add entrance animation class
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.attributeName === 'style') {
        if (lightbox.style.display === 'flex') {
          lightboxContent.classList.add('lightbox-enter');
          setTimeout(() => {
            lightboxContent.classList.remove('lightbox-enter');
          }, 300);
        }
      }
    });
  });
  
  observer.observe(lightbox, { attributes: true });
}

function addPresentationTransitions() {
  const img = document.getElementById('presentation-image');
  if (!img) return;
  
  // Smooth fade transitions are already handled via CSS opacity transitions
  // Additional effects can be added here
}

