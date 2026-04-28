const cards = document.querySelectorAll(".secret-card");
const lockAll = document.getElementById("lockAll");
const fullMessageOverlay = document.getElementById("fullMessageOverlay");
const closeFullMessage = document.getElementById("closeFullMessage");
const fullMessageTitle = document.getElementById("fullMessageTitle");
const fullMessageText = document.getElementById("fullMessageText");
const fullMessageVideo = document.getElementById("fullMessageVideo");

cards.forEach((card) => {
  const face = card.querySelector(".secret-face");
  if (!face) return;
  face.addEventListener("click", () => {
    const name = card.dataset.name || "Mensaje completo";
    const fullText = card.dataset.full || "";
    const videoLabel = card.dataset.video || "Video (bloqueado)";
    if (fullMessageTitle) fullMessageTitle.textContent = `Mensaje para ${name}`;
    if (fullMessageText) fullMessageText.textContent = fullText;
    if (fullMessageVideo) fullMessageVideo.textContent = videoLabel;
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

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") toggleOverlay(false);
});
