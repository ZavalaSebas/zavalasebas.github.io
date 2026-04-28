const cards = document.querySelectorAll(".secret-card");
const lockAll = document.getElementById("lockAll");
const fullMessageOverlay = document.getElementById("fullMessageOverlay");
const closeFullMessage = document.getElementById("closeFullMessage");
const fullMessageTitle = document.getElementById("fullMessageTitle");
const fullMessageText = document.getElementById("fullMessageText");
const fullMessageVideo = document.getElementById("fullMessageVideo");
const fullMessageVideoThumb = document.getElementById("fullMessageVideoThumb");
const overlayVideoFrame = document.querySelector(".overlay-video__frame");

cards.forEach((card) => {
  const face = card.querySelector(".secret-face");
  if (!face) return;
  if (card.dataset.locked === "true") {
    card.classList.add("is-locked");
  }
  face.addEventListener("click", () => {
    if (card.dataset.locked === "true") return;
    const name = card.dataset.name || "Mensaje completo";
    const fullText = card.dataset.full || "";
    const videoLabel = card.dataset.video || "Video (bloqueado)";
    const videoSrc = card.dataset.videoSrc || "";
    if (fullMessageTitle) fullMessageTitle.textContent = `Mensaje para ${name}`;
    if (fullMessageText) fullMessageText.textContent = fullText;
    if (fullMessageVideo) fullMessageVideo.textContent = videoLabel;
    if (fullMessageVideoThumb) {
      fullMessageVideoThumb.src = videoSrc;
      fullMessageVideoThumb.alt = `Miniatura de video para ${name}`;
    }
    toggleOverlay(true);
  });
});

if (lockAll) {
  lockAll.addEventListener("click", () => {
    toggleOverlay(false);
  });
}

function toggleOverlay(shouldOpen) {
  if (!fullMessageOverlay) return;
  fullMessageOverlay.classList.toggle("is-open", shouldOpen);
  fullMessageOverlay.setAttribute("aria-hidden", shouldOpen ? "false" : "true");
}


if (closeFullMessage) {
  closeFullMessage.addEventListener("click", () => toggleOverlay(false));
}

if (fullMessageOverlay) {
  fullMessageOverlay.addEventListener("click", (event) => {
    if (event.target === fullMessageOverlay) toggleOverlay(false);
  });
}

if (overlayVideoFrame) {
  overlayVideoFrame.addEventListener("click", () => {
    const input = window.prompt("Ingresa la contraseña para reproducir el video:");
    if (input !== null) {
      window.alert("Contraseña incorrecta.");
    }
  });
}

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") toggleOverlay(false);
});
