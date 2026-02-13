const polaroids = [
  { file: "lau05.jpg", caption: "Movie night y manta compartida" },
  { file: "lau07.jpg", caption: "Sonrisa tranquila" },
  { file: "lau12.jpg", caption: "Comer contigo todo sabe mejor" },
  { file: "lau18.jpg", caption: "La playlist perfecta" },
  { file: "lau23.jpg", caption: "Mini Lau, maxi ternura" },
  { file: "lau32.jpg", caption: "Cielos de Milano" },
  { file: "lau38.jpg", caption: "Te encontré por fin" },
  { file: "lau44.jpg", caption: "Vamos que se puede" },
  { file: "lau55.jpg", caption: "Flores para ti" },
  { file: "lau62.jpg", caption: "Brillos de año nuevo" },
  { file: "lau70.jpg", caption: "Picnic de tarde" },
  { file: "lau80.jpg", caption: "Hola en medio del día" }
];

const PAGE_SIZE_FIRST = 4;
const PAGE_SIZE_OTHER = 6;
let pages = [];
let currentPage = 0;

function shuffle(array) {
  const a = [...array];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function buildPages() {
  const latest = polaroids.slice(-PAGE_SIZE_FIRST); // últimos 4
  const rest = shuffle(polaroids.slice(0, -PAGE_SIZE_FIRST));
  pages = [];
  pages.push(latest);
  for (let i = 0; i < rest.length; i += PAGE_SIZE_OTHER) {
    pages.push(rest.slice(i, i + PAGE_SIZE_OTHER));
  }
}

function renderPolaroidsPage() {
  const board = document.getElementById("polaroidBoard");
  const pageLabel = document.getElementById("polaroidPage");
  if (!board || pages.length === 0) return;

  const totalPages = pages.length;
  currentPage = ((currentPage % totalPages) + totalPages) % totalPages;
  const subset = pages[currentPage] || [];

  board.innerHTML = "";
  board.classList.toggle("first-page", currentPage === 0);

  subset.forEach((p, idx) => {
    const tilt = (Math.random() * 10 - 5).toFixed(1);
    const offset = (Math.random() * 12 - 6).toFixed(1);
    const card = document.createElement("div");
    card.className = "polaroid";
    card.style.setProperty("--rot", `${tilt}deg`);
    card.style.setProperty("--offset-x", `${offset}px`);
    card.style.setProperty("--delay", `${idx * 70}ms`);

    card.innerHTML = `
      <div class="polaroid-pin" aria-hidden="true"></div>
      <img src="../assets/image/laujournal/${p.file}" alt="${p.caption}">
      <p>${p.caption}</p>
    `;

    board.appendChild(card);
  });

  if (pageLabel) pageLabel.textContent = `${currentPage + 1}/${totalPages}`;
}

function initPolaroidPagination() {
  buildPages();
  const prev = document.getElementById("polaroidPrev");
  const next = document.getElementById("polaroidNext");
  currentPage = 0;
  renderPolaroidsPage();

  const go = (delta) => {
    currentPage = currentPage + delta;
    renderPolaroidsPage();
  };

  if (prev) prev.addEventListener("click", () => go(-1));
  if (next) next.addEventListener("click", () => go(1));
}

function initAudioControl() {
  const audio = document.getElementById("audioLau");
  const control = document.getElementById("audioControl");
  if (!audio || !control) return;

  const vinyl = control.querySelector(".vinyl");
  const bars = control.querySelectorAll(".freq-bar");
  const hint = control.querySelector(".audio-hint span");
  let isPlaying = false;

  const updateState = (playing) => {
    isPlaying = playing;
    if (vinyl) vinyl.classList.toggle("paused", !playing);
    bars.forEach(b => b.classList.toggle("paused", !playing));
    if (hint) hint.textContent = playing ? "sonando" : "click música";
  };

  const tryPlay = () => {
    audio.muted = false;
    audio.volume = 0.85;
    return audio.play();
  };

  window.addEventListener("load", () => {
    tryPlay().then(() => updateState(true)).catch(() => updateState(false));
  });

  control.addEventListener("click", () => {
    if (isPlaying) {
      audio.pause();
      updateState(false);
    } else {
      tryPlay().then(() => updateState(true)).catch(() => updateState(false));
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  initPolaroidPagination();
  initAudioControl();
});
