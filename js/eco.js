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

function haptic(ms) {
  try {
    var ua = navigator.userActivation;
    if ('vibrate' in navigator && ua && (ua.isActive || ua.hasBeenActive)) navigator.vibrate(ms || 10);
  } catch (_) {}
}

function updateCharCount() {
  var len = input.value.length;
  charCount.textContent = len + '/280';
  charCount.style.color = len > 260 ? '#ee4444' : 'rgba(240,192,64,.4)';
}

function autoGrow() {
  input.style.height = 'auto';
  input.style.height = Math.min(input.scrollHeight, window.innerHeight * 0.3) + 'px';
}

input.addEventListener('input', function() { autoGrow(); updateCharCount(); });

saveBtn.addEventListener('click', submitThought);
input.addEventListener('keydown', function(e) {
  if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); submitThought(); }
});

async function submitThought() {
  haptic(12);
  var text = input.value.trim();
  if (!text) return;
  await db.collection('eco_thoughts').add({
    text: text,
    date: new Date().toLocaleDateString('es-CR', { day: '2-digit', month: 'short', year: 'numeric' }),
    createdAt: Date.now()
  });
  input.value = '';
  autoGrow();
  updateCharCount();
  await renderNotes();
}

clearBtn.addEventListener('click', async function() {
  haptic(12);
  var pass = prompt('Para borrar todo, ingresá la contraseña:');
  if (pass !== 'rock') { alert('Contraseña incorrecta.'); return; }
  if (!confirm('¿Seguro que querés borrar todos los mensajes?')) return;
  var snapshot = await db.collection('eco_thoughts').get();
  var batch = db.batch();
  snapshot.forEach(function(doc) { batch.delete(doc.ref); });
  await batch.commit();
  await renderNotes();
});

async function renderNotes() {
  if (loading) return;
  loading = true;

  var snapshot = await db.collection('eco_thoughts').orderBy('createdAt', 'desc').get();
  var thoughts = [];
  snapshot.forEach(function(doc) { thoughts.push({ id: doc.id, data: doc.data() }); });

  container.innerHTML = '';
  container.classList.add('eco-masonry');

  if (thoughts.length === 0) {
    container.style.minHeight = '200px';
    loading = false;
    return;
  }

  container.style.minHeight = 'auto';

  thoughts.forEach(function(thought) {
    var note = createNote(thought);
    container.appendChild(note);
  });

  loading = false;
}

function createNote(thought) {
  var note = document.createElement('div');
  note.classList.add('creative-note');

  var content = document.createElement('span');
  content.textContent = thought.data.text;
  note.appendChild(content);

  var dateEl = document.createElement('time');
  dateEl.textContent = thought.data.date;
  note.appendChild(dateEl);

  var rotation = (Math.random() - 0.5) * 3;
  var tapeRotation = (Math.random() - 0.5) * 8;
  note.style.setProperty('--note-rotation', rotation + 'deg');
  note.style.setProperty('--tape-rotation', tapeRotation + 'deg');

  note.addEventListener('click', async function() {
    haptic(8);
    var pass = prompt('Para borrar esta nota, ingresa contraseña:');
    if (pass === 'rock') {
      await db.collection('eco_thoughts').doc(thought.id).delete();
      await renderNotes();
    }
  });

  return note;
}

// Init
updateCharCount();
autoGrow();
renderNotes();

var lastTouchTime = 0;
document.addEventListener('touchend', function(e) {
  var now = Date.now();
  if (now - lastTouchTime <= 350) { e.preventDefault(); }
  lastTouchTime = now;
}, { passive: false });
