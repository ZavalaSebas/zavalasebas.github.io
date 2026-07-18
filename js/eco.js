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

const container = document.getElementById('thoughts-container');
const input = document.getElementById('thoughtInput');
const saveBtn = document.getElementById('saveThought');
const clearBtn = document.getElementById('clearThoughts');
const charCount = document.getElementById('charCount');
let loading = false;

// Haptic helper seguro
function haptic(ms = 10) {
  try {
    const ua = navigator.userActivation;
    if ('vibrate' in navigator && ua && (ua.isActive || ua.hasBeenActive)) navigator.vibrate(ms);
  } catch (_) {}
}

// Ripple helper
function ripple(e, el) {
  const rect = el.getBoundingClientRect();
  const span = document.createElement('span');
  span.className = 'ripple';
  const size = Math.max(rect.width, rect.height);
  span.style.width = span.style.height = size + 'px';
  span.style.left = (e.clientX - rect.left - size / 2) + 'px';
  span.style.top = (e.clientY - rect.top - size / 2) + 'px';
  el.appendChild(span);
  setTimeout(() => span.remove(), 650);
}

// Scroll vertical -> horizontal cuando corresponda
function enableWheelHorizontalScroll(el) {
  el.addEventListener('wheel', (e) => {
    if (Math.abs(e.deltaX) < Math.abs(e.deltaY)) {
      el.scrollLeft += e.deltaY * 0.85;
      e.preventDefault();
    }
  }, { passive: false });
}

// Contador y auto-grow
function updateCharCount() {
  const len = input.value.length;
  charCount.textContent = `${len}/280`;
  charCount.style.color = len > 260 ? '#ee4444' : 'var(--text-secondary)';
}
function autoGrow() {
  input.style.height = 'auto';
  input.style.height = Math.min(input.scrollHeight, window.innerHeight * 0.38) + 'px';
}
input.addEventListener('input', () => { autoGrow(); updateCharCount(); });

// Submit
saveBtn.addEventListener('click', submitThought);
input.addEventListener('keydown', (e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); submitThought(); } });
async function submitThought() {
  haptic(12);
  const text = input.value.trim();
  if (!text) return;
  await db.collection('eco_thoughts').add({
    text,
    date: new Date().toLocaleDateString('es-CR', { day: '2-digit', month: 'short', year: 'numeric' }),
    createdAt: Date.now()
  });
  input.value = '';
  autoGrow();
  updateCharCount();
  await renderSavedThoughts();
}

// Borrar todo
clearBtn.addEventListener('click', async () => {
  haptic(12);
  const pass = prompt('Para borrar todo, ingresá la contraseña:');
  if (pass !== 'rock') { alert('Contraseña incorrecta.'); return; }
  if (!confirm('¿Seguro que querés borrar todos los mensajes?')) return;
  const snapshot = await db.collection('eco_thoughts').get();
  const batch = db.batch();
  snapshot.forEach(doc => batch.delete(doc.ref));
  await batch.commit();
  await renderSavedThoughts();
});

// Render horizontal por columnas de 3
async function renderSavedThoughts() {
  if (loading) return; loading = true;
  const snapshot = await db.collection('eco_thoughts').orderBy('createdAt', 'desc').get();
  const thoughts = [];
  snapshot.forEach(doc => thoughts.push({ id: doc.id, data: doc.data() }));

  container.innerHTML = '';
  if (thoughts.length === 0) { container.style.height = '320px'; loading = false; return; }

  const isMobile = window.innerWidth < 600;
  if (isMobile) {
    container.style.height = 'auto';
    container.style.position = 'static';
    container.style.display = 'grid';
    container.style.gridAutoFlow = 'column';
    container.style.gridAutoColumns = window.innerWidth < 400 ? '86vw' : '60vw';
    container.style.gap = '10px';
    container.style.overflowX = 'auto';
    container.style.alignItems = 'start';
    enableWheelHorizontalScroll(container);
    for (let i = 0; i < thoughts.length; i += 3) {
      const slice = thoughts.slice(i, i + 3);
      const column = document.createElement('div');
      column.style.display = 'flex';
      column.style.flexDirection = 'column';
      slice.forEach(thought => column.appendChild(createMobileNote(thought)));
      container.appendChild(column);
    }
    loading = false; return;
  }

  // Desktop
  container.style.display = 'flex';
  container.style.alignItems = 'flex-start';
  container.style.overflowX = 'auto';
  container.style.overflowY = 'hidden';
  container.style.gap = '16px';
  container.style.padding = '12px 2vw';
  enableWheelHorizontalScroll(container);
  for (let i = 0; i < thoughts.length; i += 3) {
    const slice = thoughts.slice(i, i + 3);
    const column = document.createElement('div');
    column.style.display = 'grid';
    column.style.gridAutoRows = 'minmax(100px, auto)';
    column.style.gap = '14px';
    column.style.width = 'clamp(220px, 24vw, 320px)';
    column.style.scrollSnapAlign = 'start';
    slice.forEach(thought => column.appendChild(createDesktopNote(thought)));
    container.appendChild(column);
  }
  loading = false;
}

function createMobileNote(thought) {
  const note = document.createElement('div');
  note.classList.add('creative-note', 'mobile-note');
  const content = document.createElement('span');
  content.textContent = thought.data.text; note.appendChild(content);
  const dateEl = document.createElement('time');
  dateEl.textContent = thought.data.date; dateEl.style.display = 'block'; dateEl.style.textAlign = 'right'; dateEl.style.opacity = '0.7'; note.appendChild(dateEl);
  note.addEventListener('click', async () => { haptic(8); const pass = prompt('Para borrar esta nota, ingresa contraseña:'); if (pass === 'rock') { await db.collection('eco_thoughts').doc(thought.id).delete(); await renderSavedThoughts(); } });
  note.addEventListener('pointerdown', e => ripple(e, note));
  return note;
}

function createDesktopNote(thought) {
  const note = document.createElement('div'); note.classList.add('creative-note');
  const content = document.createElement('span'); content.textContent = thought.data.text; note.appendChild(content);
  const dateEl = document.createElement('time'); dateEl.textContent = thought.data.date; dateEl.style.display = 'block'; dateEl.style.textAlign = 'right'; dateEl.style.opacity = '0.7'; note.appendChild(dateEl);
  const rotation = (Math.random() - 0.5) * 4; note.style.transform = `rotate(${rotation}deg)`; note.style.setProperty('--note-rotation', `${rotation}deg`);
  note.addEventListener('click', async () => { haptic(8); const pass = prompt('Para borrar esta nota, ingresa contraseña:'); if (pass === 'rock') { await db.collection('eco_thoughts').doc(thought.id).delete(); await renderSavedThoughts(); } });
  note.addEventListener('pointerdown', e => ripple(e, note));
  return note;
}

// Inicializar
window.addEventListener('resize', () => { renderSavedThoughts(); });
updateCharCount();
autoGrow();
renderSavedThoughts();

// Tabbar activo + indicador
document.addEventListener('DOMContentLoaded', () => {
  const tabs = document.querySelectorAll('.mobile-tabbar .tabbar-item');
  const indicator = document.querySelector('.tabbar-indicator');
  const currentFile = location.pathname.split('/').pop().toLowerCase();
  tabs.forEach(tab => {
    const href = tab.getAttribute('href');
    if (!href) return; const file = href.split('/').pop().toLowerCase();
    if (file === currentFile) tab.classList.add('active');
    tab.addEventListener('pointerdown', e => ripple(e, tab));
    tab.addEventListener('click', () => haptic(12));
    tab.addEventListener('touchend', () => haptic(12), { passive: true });
  });
  requestAnimationFrame(() => moveIndicator());
  function moveIndicator(target) {
    const active = target || document.querySelector('.mobile-tabbar .tabbar-item.active') || tabs[0];
    if (!active || !indicator) return;
    const rect = active.getBoundingClientRect();
    const parentRect = active.parentElement.getBoundingClientRect();
    const width = rect.width * 0.55;
    const x = rect.left - parentRect.left + (rect.width - width) / 2;
    indicator.style.width = width + 'px';
    indicator.style.transform = `translateX(${x}px)`;
  }
  tabs.forEach(t => t.addEventListener('click', e => moveIndicator(e.currentTarget)));
});

// Evitar zoom doble tap
let lastTouchTime = 0;
document.addEventListener('touchend', (e) => {
  const now = Date.now();
  if (now - lastTouchTime <= 350) { e.preventDefault(); }
  lastTouchTime = now;
}, { passive: false });

