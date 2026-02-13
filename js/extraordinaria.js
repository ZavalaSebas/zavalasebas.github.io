const polaroids = [
  { file: "lau02.jpg", caption: "Why are u looking at me" },
  { file: "lau05.jpg", caption: "Movie night" },
  { file: "lau07.jpg", caption: "Sonrisa tranquila" },
  { file: "lau12.jpg", caption: "Comer contigo siempre sabe mejor" },
  { file: "lau14.jpg", caption: "Museo bajo lluvia" },
  { file: "lau18.jpg", caption: "Patines" },
  { file: "lau23.jpg", caption: "Mini Lau, maxi ternura" },
  { file: "lau27.jpg", caption: "MILAAAN" },
  { file: "lau32.jpg", caption: "Milano" },
  { file: "lau38.jpg", caption: "Te encontré por fin" },
  { file: "lau44.jpg", caption: "Vamos que se puede" },
  { file: "lau48.jpg", caption: "Chinita" },
  { file: "lau55.jpg", caption: "Flores para ti" },
  { file: "lau62.jpg", caption: "Brillos de año nuevo" },
  { file: "lau63.jpg", caption: "Playita" },
  { file: "lau70.jpg", caption: "Picnic de tarde" },
  { file: "lau73.jpg", caption: "PAAAN" },
  { file: "lau80.jpg", caption: "De compras" }
];

const PAGE_SIZE_FIRST = 2;
const PAGE_SIZE_SECOND = 2;
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
  const latestTwo = polaroids.slice(-2);
  const nextTwo = polaroids.slice(-4, -2);
  const rest = shuffle(polaroids.slice(0, -4));
  pages = [];
  pages.push({ photos: latestTwo, layout: "first" });
  pages.push({ photos: nextTwo, layout: "second" });

  // Split remaining photos into regular pages
  const regularChunks = [];
  for (let i = 0; i < rest.length; i += PAGE_SIZE_OTHER) {
    regularChunks.push(rest.slice(i, i + PAGE_SIZE_OTHER));
  }

  // Rebalance so the last regular page has at least 4 photos without repeating
  if (regularChunks.length > 1) {
    const last = regularChunks[regularChunks.length - 1];
    for (let donorIdx = regularChunks.length - 2; donorIdx >= 0 && last.length < 4; donorIdx--) {
      const donor = regularChunks[donorIdx];
      const minSize = donorIdx === 0 ? 6 : 4; // keep page 3 robust, others at least 4
      while (donor.length > minSize && last.length < 4) {
        last.unshift(donor.pop());
      }
    }
  }

  // Page 3: first regular batch (if any)
  if (regularChunks[0]) {
    pages.push({ photos: regularChunks[0], layout: "regular" });
  }

  // Page 4: scrap notes / doodles page
  const scrapNotes = [
    { title: "4Ever", text: "No olvides: te amo todos los días." },
    { title: "Be With Me", text: "Walk with me." },
    { title: "Recordatorio", text: "Tu risa es mi sonido favorito." },
    { title: "Always with U", text: "★ ✿ ♡ → siempre contigo." },
    { title: "Love U", text: "I love u Moar." },
    { title: "Guardado", text: "Esta página es tuya para siempre." }
  ];
  pages.push({ layout: "scrap", scraps: scrapNotes });

  // Remaining regular pages after the scrap
  for (let idx = 1; idx < regularChunks.length; idx++) {
    pages.push({ photos: regularChunks[idx], layout: "regular" });
  }
}

function renderPolaroidsPage() {
  const board = document.getElementById("polaroidBoard");
  const pageLabel = document.getElementById("polaroidPage");
  const noteTop = document.getElementById("polaroidNoteTop");
  const noteBottom = document.getElementById("polaroidNoteBottom");
  if (!board || pages.length === 0) return;

  const totalPages = pages.length;
  currentPage = ((currentPage % totalPages) + totalPages) % totalPages;
  const current = pages[currentPage] || { photos: [], layout: "regular" };
  const subset = current.photos || [];

  board.innerHTML = "";
  board.classList.toggle("first-page", current.layout === "first");
  board.classList.toggle("second-page", current.layout === "second");
  board.classList.toggle("scrap-page", current.layout === "scrap");

  if (current.layout === "scrap") {
    if (noteTop) noteTop.style.display = "none";
    if (noteBottom) noteBottom.style.display = "none";
    (current.scraps || []).forEach((item, idx) => {
      const card = document.createElement("div");
      card.className = "scrap-card";
      card.setAttribute("data-tilt", idx);
      card.innerHTML = `
        <div class="scrap-title">${item.title}</div>
        <p class="scrap-text">${item.text}</p>
      `;
      board.appendChild(card);
    });

    // Photo strip with mini polaroids
    const strip = document.createElement("div");
    strip.className = "photo-strip";
    const stripPhotos = shuffle(polaroids).slice(0, 3);
    strip.innerHTML = `
      <div class="strip-tape" aria-hidden="true"></div>
      <div class="strip-tape right" aria-hidden="true"></div>
      ${stripPhotos.map((p, i) => `
        <div class="mini-polaroid" style="--rot:${(Math.random()*8-4).toFixed(1)}deg; --delay:${i*70}ms">
          <img src="../assets/image/laujournal/${p.file}" alt="${p.caption}">
          <span>${p.caption}</span>
        </div>
      `).join('')}
    `;
    board.appendChild(strip);

    // Folded letter block
    const letter = document.createElement("div");
    letter.className = "letter-card";
    letter.innerHTML = `
      <div class="letter-stamp" aria-hidden="true">💌</div>
      <h4 class="letter-title">Abrir cuando sonrías</h4>
      <p class="letter-text">Recuerda que te miro y vuelvo a creer en todo. Guarda esta página como guardo cada mirada tuya.</p>
      <p class="letter-text">Firmado: quien no se cansa de decirte que te ama.</p>
      <div class="letter-sign">— S</div>
    `;
    board.appendChild(letter);
  } else {
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
  }

  if (pageLabel) pageLabel.textContent = `${currentPage + 1}/${totalPages}`;
  if (noteTop) noteTop.style.display = current.layout === "first" ? "block" : "none";
  if (noteBottom) noteBottom.style.display = current.layout === "second" ? "block" : "none";
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

function initValentineOverlay() {
  const overlay = document.getElementById("valentineOverlay");
  if (!overlay) return;

  const seen = localStorage.getItem("extraValentineAccepted");
  if (seen === "yes") {
    overlay.remove();
    return;
  }

  const questionEl = overlay.querySelector(".val-question");
  const yesBtn = overlay.querySelector(".val-btn.yes");
  const noBtn = overlay.querySelector(".val-btn.no");
  const foot = overlay.querySelector(".val-foot");
  if (!questionEl || !yesBtn || !noBtn) return;

  let growScale = 1;
  const sadPhrases = [
    "ouch, me dolió un poquito :(",
    "me pongo triste si dices que no :(",
    "hey, mi corazón se encoge :(",
    "snif... vuelve al botón bonito :(",
    "hasta el mariachi se fue llorando :(",
    "la flor se marchita si dices no :(",
    "suspiro triste... :(",
    "ok, pero me dejas abrazarte? :(",
    "nooo, mi botón necesita amor :(",
    "prometo más risas si vuelves :(",
  ];

  const steps = [
    { q: "¿Quieres ser mi San Valentín?", yes: "Sí", no: "No", foot: "☺️" },
    { q: "¿Segura? Prometo besitos.", yes: "Segurísima", no: "Mmm...", foot: "☺️" },
    { q: "Última oportunidad para huir (spoiler: no puedes).", yes: "Dale", no: "Intentar huir", foot: "☺️" }
  ];
  let idx = 0;

  const playMusic = () => {
    const audio = document.getElementById("audioLau");
    if (!audio) return;
    audio.muted = false;
    audio.volume = 0.85;
    audio.play().catch(() => {});
    const control = document.getElementById("audioControl");
    if (control) {
      const vinyl = control.querySelector(".vinyl");
      const bars = control.querySelectorAll(".freq-bar");
      const hint = control.querySelector(".audio-hint span");
      if (vinyl) vinyl.classList.remove("paused");
      bars.forEach(b => b.classList.remove("paused"));
      if (hint) hint.textContent = "sonando";
    }
  };

  const spawnConfetti = () => {
    const layer = document.createElement("div");
    layer.className = "valentine-confetti";
    const symbols = ["♥", "♡", "✿", "✶", "✦"];
    for (let i = 0; i < 26; i++) {
      const piece = document.createElement("span");
      piece.textContent = symbols[i % symbols.length];
      piece.style.setProperty("--x", `${Math.random() * 100}%`);
      piece.style.setProperty("--delay", `${Math.random() * 0.8}s`);
      piece.style.setProperty("--duration", `${3 + Math.random() * 1.6}s`);
      piece.style.setProperty("--spin", `${Math.random() > 0.5 ? 1 : -1}`);
      layer.appendChild(piece);
    }
    document.body.appendChild(layer);
    setTimeout(() => layer.remove(), 4200);
  };

  const resetButtons = () => {
    growScale = 1;
    yesBtn.style.transform = "scale(1)";
    yesBtn.classList.remove("grow");
    noBtn.style.position = "static";
    noBtn.style.left = "";
    noBtn.style.top = "";
  };

  const renderStep = () => {
    questionEl.textContent = steps[idx].q;
    yesBtn.textContent = steps[idx].yes;
    noBtn.textContent = steps[idx].no;
    if (foot) foot.textContent = steps[idx].foot || "";
    resetButtons();
  };

  const moveNoButton = () => {
    let x = 50;
    let y = 50;
    let tries = 0;
    while (tries < 10 && Math.abs(x - 50) < 18 && Math.abs(y - 50) < 14) {
      x = Math.floor(12 + Math.random() * 76);
      y = Math.floor(12 + Math.random() * 64);
      tries += 1;
    }
    noBtn.style.position = "absolute";
    noBtn.style.left = `${x}%`;
    noBtn.style.top = `${y}%`;
    noBtn.classList.add("wiggle");
    setTimeout(() => noBtn.classList.remove("wiggle"), 450);
    growScale = Math.min(growScale + 0.12, 2.2);
    yesBtn.classList.add("grow");
    yesBtn.style.transform = `scale(${growScale})`;
    setTimeout(() => yesBtn.classList.remove("grow"), 520);
    if (foot) {
      const msg = sadPhrases[Math.floor(Math.random() * sadPhrases.length)];
      foot.textContent = `${msg} :(`;
    }
  };

  const finish = () => {
    resetButtons();
    spawnConfetti();
    playMusic();
    overlay.classList.add("is-closing");
    overlay.classList.remove("is-active");
    setTimeout(() => {
      overlay.remove();
      document.body.classList.remove("no-scroll");
      localStorage.setItem("extraValentineAccepted", "yes");
    }, 600);
  };

  yesBtn.addEventListener("click", () => {
    if (idx < steps.length - 1) {
      idx += 1;
      renderStep();
      return;
    }
    finish();
  });

  noBtn.addEventListener("click", moveNoButton);

  renderStep();
  requestAnimationFrame(() => {
    overlay.classList.add("is-active");
    document.body.classList.add("no-scroll");
  });
}

document.addEventListener("DOMContentLoaded", () => {
  initValentineOverlay();
  initPolaroidPagination();
  initAudioControl();
});
