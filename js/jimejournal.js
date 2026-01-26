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
  { archivo: "jime21.jpg", titulo: "Facetime Doggo", fecha: "10 de septiembre 2025 20:13", id: "jime21", year: 2025 },
  { archivo: "jime22.jpg", titulo: "Bussiness Meeting", fecha: "5 de octubre 2025 21:35", id: "jime22", year: 2025 },
  { archivo: "jime23.jpg", titulo: "Camp Memmo", fecha: "13 de octubre 2025 17:27", id: "jime23", year: 2025 },
  { archivo: "jime24.jpg", titulo: "Guitars And McDonalds", fecha: "24 de octubre 2025 21:09", id: "jime24", year: 2025 },
  { archivo: "jime25.jpg", titulo: "Guitars And McDonalds", fecha: "24 de octubre 2025 21:09", id: "jime25", year: 2025 },
  { archivo: "jime26.jpg", titulo: "Visiting Jime", fecha: "8 de noviembre 2025 23:00", id: "jime26", year: 2025 },
  { archivo: "jime27.jpg", titulo: "Pata", fecha: "8 de noviembre 2025 23:00", id: "jime27", year: 2025 },
  { archivo: "jime28.jpg", titulo: "Rawr", fecha: "15 de noviembre 2025 18:47", id: "jime28", year: 2025 },
  { archivo: "jime29.jpg", titulo: "TOTTO", fecha: "15 de noviembre 2025 18:06", id: "jime29", year: 2025 },
  { archivo: "jime30.jpg", titulo: "Men arent what they use to be", fecha: "27 de noviembre 2025 23:30", id: "jime30", year: 2025 },
  { archivo: "jime31.jpg", titulo: "is the end of the world", fecha: "3 de diciembre 2025 19:48", id: "jime31", year: 2025 },
  { archivo: "jime32.jpg", titulo: "The original BFF", fecha: "20 de diciembre 2025 20:33", id: "jime32", year: 2025 },
  { archivo: "jime33.jpg", titulo: "Uñas", fecha: "21 de diciembre 2025 15:35", id: "jime33", year: 2025 }
  ,{ archivo: "jime34.jpg", titulo: "Hoy 14:45", fecha: "25 de enero 2026 14:45", id: "jime34", year: 2026 },
  { archivo: "jime35.jpg", titulo: "Hoy 15:00", fecha: "25 de enero 2026 15:00", id: "jime35", year: 2026 }
];

let currentPhotoId = null;
let isGridView = true;
let newestPhotoIds = new Set();
let savedScrollPosition = 0;

// Favorites system (localStorage)
let favorites = new Set(JSON.parse(localStorage.getItem('jime_favorites') || '[]'));

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

// Parse Spanish date strings like "6 de septiembre 2025 18:18 - 22:19" or "4 de Octubre 2025 17:36"
function parseSpanishFechaToTimestamp(fechaStr) {
  try {
    if (!fechaStr) return 0;
    const s = fechaStr.trim().toLowerCase();
    const months = {
      'enero': 0, 'febrero': 1, 'marzo': 2, 'abril': 3, 'mayo': 4, 'junio': 5,
      'julio': 6, 'agosto': 7, 'septiembre': 8, 'setiembre': 8, 'octubre': 9, 'noviembre': 10, 'diciembre': 11
    };
    const strip = (t) => t.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
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
    fotosJime
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
  computeNewestPhotos();
  createTimeline();
  createCollageGrid();
  setupLightboxEvents();
  setupNotesEvents();
  initializeDashboard();
  initializeViewControls();
  initializeOnThisDay();
  console.log('Journal initialization complete');
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
        ${newestPhotoIds.has(foto.id) ? '<span class="new-badge small">New</span>' : ''}
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

  fotosJime.slice().reverse().forEach(foto => {
    const tile = document.createElement("div");
    tile.className = "collage-tile";
    tile.setAttribute("data-photo-id", foto.id);

    tile.innerHTML = `
      <div class="tile-media">
        <img src="../assets/image/jimejournal/${foto.archivo}" alt="${foto.titulo}" class="collage-img">
        ${typeof newestPhotoIds !== 'undefined' && newestPhotoIds.has && newestPhotoIds.has(foto.id) ? '<span class="new-badge" title="Nuevo">✨ New</span>' : ''}
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

  // Add entrance animation
  lightbox.style.display = "flex";
  lightbox.classList.add('lightbox-enter');
  setTimeout(() => lightbox.classList.remove('lightbox-enter'), 300);

  lightboxImg.src = `../assets/image/jimejournal/${foto.archivo}`;
  lightboxCaption.textContent = `${foto.titulo} — ${foto.fecha}`;
  
  // Update lightbox index for navigation
  if (lightboxSequence.length === 0) {
    lightboxSequence = fotosJime.slice().reverse();
  }
  lightboxIndex = lightboxSequence.findIndex(f => f.id === foto.id);
  
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

// Presentation Mode Variables
let presentationTimer = null;
let presentationIndex = 0;
let presentationSequence = [];
let isPresentationPlaying = true;

// Lightbox Navigation Variables
let lightboxSequence = [];
let lightboxIndex = 0;

// Fisher-Yates shuffle
function shuffleArray(array) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

// Start Presentation Mode
function startPresentationMode() {
  const overlay = document.getElementById('presentation-overlay');
  const audio = document.getElementById('presentation-audio');
  
  // Randomize presentation sequence
  presentationSequence = shuffleArray(fotosJime);
  presentationIndex = 0;
  isPresentationPlaying = true;
  
  overlay.style.display = 'flex';
  document.body.style.overflow = 'hidden';
  
  // Start audio
  audio.play().catch(err => console.log('Audio autoplay prevented:', err));
  
  // Show first photo
  showPresentationPhoto(presentationIndex);
  
  // Start auto-advance timer
  startPresentationTimer();
  
  // Setup keyboard controls
  document.addEventListener('keydown', handlePresentationKeyboard);
}

// Stop Presentation Mode
function stopPresentationMode() {
  const overlay = document.getElementById('presentation-overlay');
  const audio = document.getElementById('presentation-audio');
  
  if (presentationTimer) {
    clearInterval(presentationTimer);
    presentationTimer = null;
  }
  
  audio.pause();
  audio.currentTime = 0;
  overlay.style.display = 'none';
  document.body.style.overflow = 'auto';
  
  document.removeEventListener('keydown', handlePresentationKeyboard);
}

// Show photo in presentation
function showPresentationPhoto(index) {
  const foto = presentationSequence[index];
  const img = document.getElementById('presentation-img');
  const titleEl = document.querySelector('.presentation-title');
  const dateEl = document.querySelector('.presentation-date');
  
  img.src = `../assets/image/jimejournal/${foto.archivo}`;
  titleEl.textContent = foto.titulo;
  dateEl.textContent = foto.fecha;
}

// Start presentation timer
function startPresentationTimer() {
  if (presentationTimer) {
    clearInterval(presentationTimer);
  }
  presentationTimer = setInterval(() => {
    if (isPresentationPlaying) {
      advancePresentation(1, true); // true = auto advance
    }
  }, 6000); // 6 seconds per photo
}

// Advance presentation
function advancePresentation(direction, isAuto = false) {
  presentationIndex += direction;
  
  // Wrap around and reshuffle
  if (presentationIndex >= presentationSequence.length) {
    presentationSequence = shuffleArray(fotosJime);
    presentationIndex = 0;
  } else if (presentationIndex < 0) {
    presentationIndex = presentationSequence.length - 1;
  }
  
  showPresentationPhoto(presentationIndex);
  
  // Reset timer on manual navigation (not auto)
  if (!isAuto) {
    startPresentationTimer();
  }
}

// Toggle play/pause
function togglePresentationPlay() {
  isPresentationPlaying = !isPresentationPlaying;
  const btn = document.getElementById('presentation-play-pause');
  const audio = document.getElementById('presentation-audio');
  
  btn.textContent = isPresentationPlaying ? '⏸' : '▶';
  btn.title = isPresentationPlaying ? 'Pausar' : 'Reproducir';
  
  if (isPresentationPlaying) {
    audio.play();
    startPresentationTimer();
  } else {
    audio.pause();
  }
}

// Handle presentation keyboard
function handlePresentationKeyboard(e) {
  if (e.key === 'Escape') {
    stopPresentationMode();
  } else if (e.key === 'ArrowRight') {
    advancePresentation(1);
  } else if (e.key === 'ArrowLeft') {
    advancePresentation(-1);
  } else if (e.key === ' ') {
    e.preventDefault();
    togglePresentationPlay();
  }
}

// Setup Lightbox Navigation Controls
function setupLightboxNavControls() {
  const prevBtn = document.getElementById('lightbox-prev');
  const nextBtn = document.getElementById('lightbox-next');
  
  if (prevBtn && nextBtn) {
    prevBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      navigateLightbox(-1);
    });
    
    nextBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      navigateLightbox(1);
    });
  }
  
  // Add keyboard navigation
  document.addEventListener('keydown', (e) => {
    const lightbox = document.getElementById('lightbox');
    if (lightbox.style.display === 'flex') {
      if (e.key === 'ArrowLeft') {
        navigateLightbox(-1);
      } else if (e.key === 'ArrowRight') {
        navigateLightbox(1);
      }
    }
  });
}

// Navigate lightbox
function navigateLightbox(direction) {
  if (lightboxSequence.length === 0) {
    // Initialize sequence (newest first, matching grid order)
    lightboxSequence = fotosJime.slice().reverse();
    lightboxIndex = lightboxSequence.findIndex(f => f.id === currentPhotoId);
    if (lightboxIndex < 0) lightboxIndex = 0;
  }

  lightboxIndex += direction;

  // Wrap around
  if (lightboxIndex >= lightboxSequence.length) {
    lightboxIndex = 0;
  } else if (lightboxIndex < 0) {
    lightboxIndex = lightboxSequence.length - 1;
  }

  const foto = lightboxSequence[lightboxIndex];
  if (!foto) return;
  currentPhotoId = foto.id;

  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxCaption = document.getElementById('lightbox-caption');
  if (lightboxImg) {
    lightboxImg.style.opacity = 0;
    setTimeout(() => {
      lightboxImg.src = `../assets/image/jimejournal/${foto.archivo}`;
      lightboxImg.alt = foto.titulo;
      lightboxImg.style.opacity = 1;
    }, 150);
  }
  if (lightboxCaption) {
    lightboxCaption.textContent = `${foto.titulo} — ${foto.fecha}`;
  }
  // Update favorite state and notes for the new photo
  updateFavoriteUI(foto.id);
  loadNotes(foto.id);
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, starting initialization...');
    
    // Debug: Check if elements exist
    console.log('Dashboard button:', document.querySelector('.dashboard-btn'));
    console.log('Stats dashboard:', document.getElementById('stats-dashboard'));
    console.log('Close stats:', document.getElementById('close-stats'));
    console.log('Today button:', document.querySelector('.today-btn'));
    console.log('Today section:', document.getElementById('on-this-day'));
    
  // Core initialization
  initializeJournal();
  initializeFullscreenToggleJime();
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
  
  // Setup presentation mode button
  const presentationBtn = document.getElementById('presentation-view');
  if (presentationBtn) {
    presentationBtn.addEventListener('click', startPresentationMode);
  }
  
  // Setup presentation controls
  const presentationClose = document.getElementById('presentation-close');
  const presentationPrev = document.getElementById('presentation-prev');
  const presentationNext = document.getElementById('presentation-next');
  const presentationPlayPause = document.getElementById('presentation-play-pause');
  
  if (presentationClose) presentationClose.addEventListener('click', stopPresentationMode);
  if (presentationPrev) presentationPrev.addEventListener('click', () => advancePresentation(-1));
  if (presentationNext) presentationNext.addEventListener('click', () => advancePresentation(1));
  if (presentationPlayPause) presentationPlayPause.addEventListener('click', togglePresentationPlay);
  
  console.log('All features initialized! ✨');
});

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
    if (totalMemoriesEl) totalMemoriesEl.textContent = fotosJime.length;
    
    // Get notes count from Firebase
    if (db) {
        db.collection('jime_notes').get().then((querySnapshot) => {
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
        db.collection('jime_notes').get().then((querySnapshot) => {
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
    const years = fotosJime.map(foto => foto.year);
    const minYear = Math.min(...years);
    const maxYear = Math.max(...years);
    return maxYear - minYear + 1;
}

function updateYearChart() {
    const yearChart = document.querySelector('.year-chart');
    if (!yearChart) return;
    
    const yearCounts = {};
    fotosJime.forEach(foto => {
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
        { icon: '📝', text: 'Nota añadida a memoria de marzo', time: '2 horas' },
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
}

function generateMosaicView() {
    const mosaicContainer = document.querySelector('.mosaic-container');
    if (!mosaicContainer) return;
    
    // Group photos by year
    const groupedPhotos = {};
    fotosJime.forEach(foto => {
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
        <img src="../assets/image/jimejournal/${foto.archivo}" alt="${foto.titulo}" style="height: ${randomHeight}; object-fit: cover;">
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
    
    fotosJime.forEach(foto => {
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
            <div class="today-photo" onclick="openLightbox(fotosJime.find(f => f.id === '${foto.id}'))">
                <img src="../assets/image/jimejournal/${foto.archivo}" alt="${foto.titulo}">
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

// Make functions global for HTML onclick handlers
window.deleteNote = deleteNote;
window.toggleFavorite = toggleFavorite;
// window.downloadPhoto removed (no explicit download UI)

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
  localStorage.setItem('jime_favorites', JSON.stringify([...favorites]));
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
  fotosJime.forEach(foto => {
    const favoriteBtn = document.querySelector(`.tile-footer .favorite-tile-btn[data-photo-id="${foto.id}"]`);
    if (favoriteBtn) {
      favoriteBtn.innerHTML = isFavorite(foto.id) ? '⭐' : '☆';
      favoriteBtn.classList.toggle('active', isFavorite(foto.id));
    }
  });
}

// ============================================
// DOWNLOAD SYSTEM
// ============================================

// Removed explicit download function. Use native long-press on image for saving.

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
  const foto = fotosJime.find(f => f.id === currentPhotoId);
  if (!foto) return;
  
  // Haptic feedback if available
  if (navigator.vibrate) {
    navigator.vibrate(50);
  }
  // Removed download option & blocking confirm dialog. Long press now only gives haptic feedback.
  // Optionally could auto-toggle favorite here; uncomment if desired:
  // toggleFavorite(foto.id);
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
  const img = document.getElementById('presentation-img');
  if (!img) return;
  
  // Smooth fade transitions are already handled via CSS opacity transitions
}

function initializeFullscreenToggleJime() {
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