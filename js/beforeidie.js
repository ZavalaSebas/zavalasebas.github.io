// Firebase Configuration (shared)
const firebaseConfig = {
  apiKey: "AIzaSyCEt6uttsBNcOTdmpLzz1eoOXc3Jk-IKfk",
  authDomain: "rockshow-61a77.firebaseapp.com",
  projectId: "rockshow-61a77",
  storageBucket: "rockshow-61a77.firebasestorage.app",
  messagingSenderId: "1052089619676",
  appId: "1:1052089619676:web:eb9cc50b73363ae95d9019",
  measurementId: "G-CTC0Y1KW8E"
};

function initFirebase() {
  if (!window.firebase) return null;
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }
  return firebase.firestore();
}

const db = initFirebase();
const list = document.getElementById("bucketList");
const progress = document.getElementById("progressText");

function updateProgress() {
  if (!list || !progress) return;
  const items = list.querySelectorAll(".bucket-item");
  const done = list.querySelectorAll(".bucket-item.done");
  progress.textContent = `${done.length}/${items.length}`;
}

function applyDoneState(item, isDone) {
  item.classList.toggle("done", isDone);
  const button = item.querySelector(".item-btn");
  if (button) {
    button.setAttribute("aria-pressed", isDone ? "true" : "false");
    const check = button.querySelector(".check");
    if (check) check.textContent = isDone ? "☑" : "☐";
  }
}

async function persistState(itemId, isDone) {
  if (!db || !itemId) return;
  try {
    await db.collection("beforeidie_items").doc(itemId).set({
      done: isDone,
      updatedAt: firebase.firestore.FieldValue.serverTimestamp()
    }, { merge: true });
  } catch (_) {
    // Silent fail: UI stays responsive even if network fails.
  }
}

async function loadState() {
  if (!db || !list) return;
  try {
    const snapshot = await db.collection("beforeidie_items").get();
    const state = new Map();
    snapshot.forEach(doc => state.set(doc.id, doc.data()));
    list.querySelectorAll(".bucket-item").forEach((item) => {
      const itemId = item.dataset.itemId;
      const entry = state.get(itemId);
      if (entry && entry.done) applyDoneState(item, true);
    });
  } catch (_) {
    // Keep local state if loading fails.
  }
  updateProgress();
}

function toggleItem(button) {
  const item = button.closest(".bucket-item");
  if (!item) return;
  const isDone = !item.classList.contains("done");
  applyDoneState(item, isDone);
  updateProgress();
  persistState(item.dataset.itemId, isDone);
}

if (list) {
  list.addEventListener("click", (event) => {
    const button = event.target.closest(".item-btn");
    if (!button) return;
    toggleItem(button);
  });
}

updateProgress();
loadState();

// Audio (estilo blog)
const beforeAudio = document.getElementById("beforeAudio");
const audioToggle = document.getElementById("audioToggle");

if (beforeAudio && audioToggle) {
  beforeAudio.volume = 0.35;

  function setAudioState(isOn) {
    if (isOn) {
      audioToggle.classList.add("active");
      audioToggle.textContent = "audio on";
      audioToggle.setAttribute("aria-pressed", "true");
    } else {
      audioToggle.classList.remove("active");
      audioToggle.textContent = "audio";
      audioToggle.setAttribute("aria-pressed", "false");
    }
  }

  async function tryAutoplay() {
    beforeAudio.muted = false;
    try {
      await beforeAudio.play();
      setAudioState(true);
    } catch (_) {
      beforeAudio.muted = true;
      setAudioState(false);
    }
  }

  audioToggle.addEventListener("click", async () => {
    const isMuted = beforeAudio.muted || beforeAudio.paused;
    if (isMuted) {
      beforeAudio.muted = false;
      try {
        await beforeAudio.play();
      } catch (_) {}
      setAudioState(true);
    } else {
      beforeAudio.pause();
      beforeAudio.muted = true;
      setAudioState(false);
    }
  });

  if (document.readyState === "complete") {
    tryAutoplay();
  } else {
    window.addEventListener("load", tryAutoplay);
  }
}
