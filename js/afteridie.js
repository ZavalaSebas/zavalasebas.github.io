const cards = document.querySelectorAll(".secret-card");
const counter = document.getElementById("secretCount");
const lockAll = document.getElementById("lockAll");

function updateCounter() {
  const openCount = document.querySelectorAll(".secret-card.open").length;
  if (counter) counter.textContent = `${openCount} abiertos`;
}

function closeAll() {
  cards.forEach((card) => card.classList.remove("open"));
  updateCounter();
}

cards.forEach((card) => {
  const face = card.querySelector(".secret-face");
  if (!face) return;
  face.addEventListener("click", () => {
    card.classList.toggle("open");
    updateCounter();
  });
});

if (lockAll) {
  lockAll.addEventListener("click", () => {
    closeAll();
  });
}

updateCounter();
