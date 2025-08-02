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
  },
{
  titulo: "Amor Completo",
  banda: "Mon Laferte",
  descripcion: "Interpretación en vivo desde el Teatro Fru Fru; una emotiva canción de amor muy representativa de su estilo.",
  video: "https://www.youtube.com/embed/8JCa7GIu9ic"
},
{
  titulo: "Why Are Sundays So Depressing",
  banda: "The Strokes",
  descripcion: "Del álbum ‘The New Abnormal’ (2020); explora la sensación de melancolía dominical, mencionada como “Sunday Scaries”.</>",
  video: "https://www.youtube.com/embed/2KSpDNlsVF4"
},
{
  titulo: "Baby I’m Yours (feat. Irfane)",
  banda: "Breakbot",
  descripcion: "Tema electro‐funk del EP homónimo, vídeo animado hecho con unas 2.000 acuarelas pintadas a mano. Muy usado en shows y anuncios. “Inspiración para ‘Treasure’ de Bruno Mars”.",
  video: "https://www.youtube.com/embed/6okxuiiHx2w"
},
{
  titulo: "Preso",
  banda: "José José",
  descripcion: "Lyric video revisitado de la emblemática balada 'Preso', uno de los clásicos más recordados del 'Príncipe de la Canción'.",
  video: "https://www.youtube.com/embed/fDufg3Xlsko"
},
{
  titulo: "My Love (from 'Rockshow')",
  banda: "Paul McCartney and Wings",
  descripcion: "Versión en vivo desde el concierto 'Rockshow'. Balada dedicada a Linda McCartney, incluida originalmente en el álbum 'Red Rose Speedway'. Un clásico romántico del ex Beatle.",
  video: "https://www.youtube.com/embed/qGStwcniqyI"
},
 {
    titulo: "Shallow",
    banda: "Lady Gaga & Bradley Cooper",
    descripcion: "Dueto interpretado en la película *A Star Is Born* (2018); ganó Óscar y Globos de Oro como Mejor Canción Original.",
    video: "https://www.youtube.com/embed/bo_efYhYU2A"
  },
  {
    titulo: "The Man Who Sold The World (MTV Unplugged)",
    banda: "Nirvana",
    descripcion: "Versión acústica del clásico de David Bowie interpretada en *MTV Unplugged in New York* (1994), remasterizada en HD.",
    video: "https://www.youtube.com/embed/fregObNcHC8"
  },
  {
    titulo: "Wonderful Tonight (Live)",
    banda: "Eric Clapton",
    descripcion: "Interpretación en vivo oficial de «Wonderful Tonight», extraída de *In Concert: A Benefit for the Crossroads Centre at Antigua*.",
    video: "https://www.youtube.com/embed/UprwkbzUX6g"
  },
  {
    titulo: "Golden Slumbers (Remastered 2009)",
    banda: "The Beatles",
    descripcion: "Parte del medley del álbum *Abbey Road* (1969), esta versión remasterizada se lanzó en 2009.",
    video: "https://www.youtube.com/embed/AcQjM7gV6mI"
  },
  {
    titulo: "Here, There and Everywhere",
    banda: "The Beatles",
    descripcion: "Tema romántico del álbum *Revolver* (1966), considerado uno de los clásicos de Paul McCartney.",
    video: "https://www.youtube.com/embed/FusIKjztap8"
  },
  {
    titulo: "Stand By Me (Ultimate Mix 2020)",
    banda: "John Lennon",
    descripcion: "Versión oficial UHD de *Stand By Me* publicada como “Ultimate Mix” en 2020, con millones de vistas.",
    video: "https://www.youtube.com/embed/YqB8Dm65X18"
  },
  {
    titulo: "Bell Bottom Blues (Live)",
    banda: "Eric Clapton",
    descripcion: "Versión en vivo de *Bell Bottom Blues*, parte del catálogo de Warner Vault; versión muy escuchada en conciertos.",
    video: "https://www.youtube.com/embed/l4hv_8TXFWg"
  },
  {
    titulo: "In My Life (Remastered 2009)",
    banda: "The Beatles",
    descripcion: "Balada clásica del álbum recopilatorio *1962–1966*, lanzada originalmente en 1965. Versión remasterizada en 2009 que conserva su carácter nostálgico y emotivo.",
    video: "https://www.youtube.com/embed/mBqqeqcJM_0"
  },
  {
    titulo: "Starman",
    banda: "David Bowie",
    descripcion: "Video oficial de *Starman*, filmado durante la gira Ziggy Stardust (1972–1973). Uno de los himnos del glam rock que catapultó su carrera.",
    video: "https://www.youtube.com/embed/t365MuktYQs"
  },
{
  titulo: "I Will",
  banda: "Paul McCartney",
  descripcion: "Versión en vivo incluida en el DVD/concierto *Paul McCartney: The Space Within Us*. Balada suave originalmente publicada en el álbum *The Beatles* (1968), también conocido como el ‘Álbum Blanco’.",
  video: "https://www.youtube.com/embed/JGnNQM_9q-w"
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

