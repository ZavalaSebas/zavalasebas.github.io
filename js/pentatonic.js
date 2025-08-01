let artefactosOriginal = [
  {
    titulo: "Shine On You Crazy Diamond",
    banda: "Pink Floyd",
    descripcion: "Aparece en varias películas como 'The Counselor'. Un viaje espacial y emocional.",
    video: "https://www.youtube.com/embed/cWGE9Gi0bB0"
  },
  {
    titulo: "Where Is My Mind",
    banda: "Pixies",
    descripcion: "Clásica escena final en 'Fight Club'.",
    video: "https://www.youtube.com/embed/INgXzChwipY"
  },
  {
    titulo: "Comfortably Numb",
    banda: "Pink Floyd",
    descripcion: "Emblemática en su show 'The Wall', y en varias referencias cinematográficas.",
    video: "https://www.youtube.com/embed/_FrOQC-zEog"
  },
  {
    titulo: "Mia & Sebastian's Theme (arr. for Piano)",
    banda: "Justin Hurwitz",
    descripcion: "Tema principal de la película 'La La Land' (2016), compuesto por Justin Hurwitz. Esta versión para piano captura la melancolía y el romance del film.",
    video: "https://www.youtube.com/embed/lulmfoic__0"
  }
];

let artefactos = [...artefactosOriginal];
let ordenActual = "shuffle"; // Puede ser "shuffle", "titulo", "banda"

function mezclarArray(arr) {
  return arr.sort(() => Math.random() - 0.5);
}

function renderizarArtefactos(lista) {
  const grid = document.getElementById("artefacto-grid");
  grid.innerHTML = "";
  lista.forEach(a => {
    const card = document.createElement("div");
    card.className = "artefacto-card";
    card.innerHTML = `
      <div class="video-wrapper">
        <iframe src="${a.video}" frameborder="0" allowfullscreen></iframe>
      </div>
      <h3>${a.titulo}</h3>
      <h4 class="banda">${a.banda}</h4>
      <p>${a.descripcion}</p>
    `;
    grid.appendChild(card);
  });
}

// Buscador
const input = document.getElementById("searchInput");
input.addEventListener("input", () => {
  const query = input.value.toLowerCase();
  const filtrados = artefactos.filter(a =>
    a.titulo.toLowerCase().includes(query) ||
    a.banda.toLowerCase().includes(query) ||
    a.descripcion.toLowerCase().includes(query)
  );
  renderizarArtefactos(filtrados);
  actualizarContador(filtrados);
});

// Ordenar por artista o título
const shuffleBtn = document.getElementById("shuffleBtn");
const bandaBtn = document.getElementById("bandaBtn");
const tituloBtn = document.getElementById("tituloBtn");
const allButtons = [shuffleBtn, bandaBtn, tituloBtn];

function actualizarBotonesActivos(id) {
  allButtons.forEach(btn => btn.classList.remove("active"));
  document.getElementById(id).classList.add("active");
}

shuffleBtn.addEventListener("click", () => {
  artefactos = mezclarArray([...artefactosOriginal]);
  ordenActual = "shuffle";
  renderizarArtefactos(artefactos);
  actualizarContador(artefactos);
  actualizarBotonesActivos("shuffleBtn");
});

bandaBtn.addEventListener("click", () => {
  artefactos = [...artefactosOriginal].sort((a, b) => a.banda.localeCompare(b.banda));
  ordenActual = "banda";
  renderizarArtefactos(artefactos);
  actualizarContador(artefactos);
  actualizarBotonesActivos("bandaBtn");
});

tituloBtn.addEventListener("click", () => {
  artefactos = [...artefactosOriginal].sort((a, b) => a.titulo.localeCompare(b.titulo));
  ordenActual = "titulo";
  renderizarArtefactos(artefactos);
  actualizarContador(artefactos);
  actualizarBotonesActivos("tituloBtn");
});

// Inicial
artefactos = mezclarArray([...artefactosOriginal]);
renderizarArtefactos(artefactos);
actualizarContador(artefactos);
actualizarBotonesActivos("shuffleBtn");


function actualizarContador(lista) {
  const contador = document.getElementById("contadorCanciones");
  contador.textContent = `🎧 ${lista.length} pista${lista.length !== 1 ? "s" : ""} encontrada${lista.length !== 1 ? "s" : ""}`;
}

// Guardar nota
document.getElementById("saveRecommendation").addEventListener("click", () => {
  const input = document.getElementById("recommendationInput");
  const text = input.value.trim();
  if (!text) return;

  const saved = JSON.parse(localStorage.getItem("song_recommendations")) || [];
  saved.push({
    text,
    date: new Date().toLocaleDateString("es-CR", {
      day: "2-digit",
      month: "short",
      year: "numeric"
    }),
  });
  localStorage.setItem("song_recommendations", JSON.stringify(saved));
  input.value = "";
  renderRecommendations();
});

// Mostrar recomendaciones
function renderRecommendations() {
  const list = document.getElementById("recommendationList");
  list.innerHTML = "";

  const saved = JSON.parse(localStorage.getItem("song_recommendations")) || [];
  saved.forEach((note) => {
    const p = document.createElement("p");
    p.innerHTML = `<strong>${note.date}</strong><br>${note.text}`;
    list.appendChild(p);
  });
}

// Borrar todo
document.getElementById("clearRecommendations").addEventListener("click", () => {
  if (confirm("¿Seguro que querés borrar todas tus notas guardadas?")) {
    localStorage.removeItem("song_recommendations");
    renderRecommendations();
  }
});

renderRecommendations();

