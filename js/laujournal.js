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
  { archivo: "lau27.jpg", titulo: "Milano :)", fecha: "4 de Octubre 2025 17:36", id: "lau27", year: 2025 }
];

let currentPhotoId = null;
let isGridView = true;
let newestPhotoIds = new Set();

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

  fotosLau.forEach(foto => {
    const tile = document.createElement("div");
    tile.className = "collage-tile";
    tile.setAttribute("data-photo-id", foto.id);

    tile.innerHTML = `
      <img src="../assets/image/laujournal/${foto.archivo}" alt="${foto.titulo}" class="collage-img">
      ${newestPhotoIds.has(foto.id) ? '<span class="new-badge" title="Nuevo">✨ New</span>' : ''}
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

  lightboxImg.src = `../assets/image/laujournal/${foto.archivo}`;
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
    initializeJournal();
});

// Make deleteNote function global
window.deleteNote = deleteNote;
