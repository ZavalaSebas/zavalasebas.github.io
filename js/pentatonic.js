// Configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCEt6uttsBNcOTdmpLzz1eoOXc3Jk-IKfk",
  authDomain: "rockshow-61a77.firebaseapp.com",
  projectId: "rockshow-61a77",
  storageBucket: "rockshow-61a77.firebasestorage.app",
  messagingSenderId: "1052089619676",
  appId: "1:1052089619676:web:eb9cc50b73363ae95d9019",
  measurementId: "G-CTC0Y1KW8E"
};

// Inicializar Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();


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
},
{
  titulo: "Trátame Suavemente (El Último Concierto)",
  banda: "Soda Stereo",
  descripcion: "Versión en vivo del emblemático tema incluida en su concierto final, un momento icónico en la historia del rock en español.",
  video: "https://www.youtube.com/embed/xXD_IEcZbMI"
},
{
  titulo: "Band on the Run (Lyric Video)",
  banda: "Paul McCartney & Wings",
  descripcion: "Lyric video oficial del clásico tema *Band on the Run*, originalmente del álbum homónimo lanzado en 1973.",
  video: "https://www.youtube.com/embed/yDzhrO5K02c"
},
{
  titulo: "No Surprises",
  banda: "Radiohead",
  descripcion: "Video oficial de la canción *No Surprises*, del álbum *OK Computer* (1997), una de las baladas más introspectivas de la banda.",
  video: "https://www.youtube.com/embed/u5CVsCnxyXg"
},
{
  titulo: "Tears in Heaven [Unplugged… Over 30 Years Later]",
  banda: "Eric Clapton",
  descripcion: "Versión en vivo *Unplugged* de *Tears in Heaven*, parte del espectáculo MTV *Unplugged… Over 30 Years Later*.",
  video: "https://www.youtube.com/embed/tUU1GLMdnkM"
},
  {
    titulo: "Good Old‑Fashioned Lover Boy",
    banda: "Queen",
    descripcion: "Video oficial top‑of‑the‑pops extraído del álbum *A Day at the Races* (1976), incluido en la compilación *Greatest Video Hits I*. Balada encantadora y teatral.",
    video: "https://www.youtube.com/embed/PI3LAgGBxqU"
  },
  {
    titulo: "November Rain",
    banda: "Guns N' Roses",
    descripcion: "Vídeo musical emblemático del álbum *Use Your Illusion I* (1991), con escenas cinematográficas dramáticas; uno de los primeros videos de rock en superar los 2 mil millones de vistas en YouTube.",
    video: "https://www.youtube.com/embed/8SbUC‑UaAxE"
  },
  {
    titulo: "Change the World (Live)",
    banda: "Eric Clapton",
    descripcion: "Interpretación en vivo de *Change the World*, dentro del archivo Warner Vault; versión emotiva y popular entre fans.",
    video: "https://www.youtube.com/embed/kntzQiaFzOQ"
  },
  {
    titulo: "Wish You Were Here",
    banda: "Pink Floyd",
    descripcion: "Tema icónico del álbum *Wish You Were Here* (1975), una de las canciones más recordadas y melancólicas de la banda británica.",
    video: "https://www.youtube.com/embed/hjpF8ukSrvk"
  },
  {
    titulo: "Die With a Smile",
    banda: "Lady Gaga & Bruno Mars",
    descripcion: "Colaboración entre Lady Gaga y Bruno Mars; una pieza emocionalmente intensa destacada por su fusión vocal y producción.",
    video: "https://www.youtube.com/embed/kPa7bsKwL-c"
  },
  {
    titulo: "Freedom Music Festival Highlights",
    banda: "Artistas varios",
    descripcion: "Fragmento del video oficial del *Freedom Music Festival* difundido por redes sociales.",
    video: "https://www.youtube.com/embed/b3kBDtjRtB0"
  },
  {
    titulo: "Now And Then",
    banda: "The Beatles",
    descripcion: "Video oficial del emotivo tema considerado como “la última canción de los Beatles”, publicado como sencillo en 2023 y acompañado por videoclip oficial.",
    video: "https://www.youtube.com/embed/Opxhh9Oh3rg"
  },
  {
    titulo: "When I Was Your Man",
    banda: "Bruno Mars",
    descripcion: "Video musical oficial del exitoso tema del álbum *Unorthodox Jukebox* (2012), dirigido por Cameron Duddy y Bruno Mars; es una balada emocional y popular.",
    video: "https://www.youtube.com/embed/ekzHIouo8Q4"
  },
  {
    titulo: "City of Stars (Duet)",
    banda: "Ryan Gosling & Emma Stone",
    descripcion: "Dúo emblemático de la película *La La Land* (2016), ganador del Oscar a Mejor Canción Original; una pieza melancólica que refleja el anhelo de los protagonistas.",
    video: "https://www.youtube.com/embed/GTWqwSNQCcg"
  },
  {
    titulo: "Dust in the Wind",
    banda: "Kansas",
    descripcion: "Video oficial de *Dust in the Wind*, lanzado en 2009; una de las baladas más emblemáticas del rock progresivo de los 70 que continúa resonando en la cultura popular.",
    video: "https://www.youtube.com/embed/tH2w6Oxx0kQ"
  },
  {
    titulo: "I Love You So",
    banda: "The Walters",
    descripcion: "Video oficial de la canción *I Love You So*, del EP *Songs for Dads* (2014), que se viralizó en redes como una tierna y emotiva balada indie.",
    video: "https://www.youtube.com/embed/NwFVSclD_uc"
  },
{
  titulo: "Layla (Live at Royal Albert Hall, 1991)",
  banda: "Eric Clapton",
  descripcion: "Versión orquestal en vivo del clásico 'Layla', interpretada en el legendario Royal Albert Hall en 1991. Una reinvención emotiva de la canción originalmente grabada con Derek and the Dominos.",
  video: "https://www.youtube.com/embed/-KG2O5PSCSs"
},
  {
    titulo: "Who's Ready for Tomorrow",
    banda: "RAT BOY",
    descripcion: "Canción incluida en el videojuego *Cyberpunk 2077: Phantom Liberty*; estilo energético y vibrante del artista británico indie‑punk.",
    video: "https://www.youtube.com/embed/JVTS3fyoAEQ"
  },
  {
    titulo: "That's Life (2008 Remastered)",
    banda: "Frank Sinatra",
    descripcion: "Versión remasterizada del clásico blues‑jazz lanzado originalmente en 1966, parte de la compilación *Nothing But the Best* (2008).",
    video: "https://www.youtube.com/embed/TnlPtaPxXfc"
  },
  {
    titulo: "Iris (Live in Buffalo, NY, 7/4/2004)",
    banda: "Goo Goo Dolls",
    descripcion: "Interpretación en vivo del icónico tema *Iris*, grabada durante un concierto en Buffalo el 4 de julio de 2004.",
    video: "https://www.youtube.com/embed/_HZM0QiuUS8"
  },
  {
    titulo: "My Way (2008 Remastered)",
    banda: "Frank Sinatra",
    descripcion: "Versión remasterizada en 2008 del emblemático tema ‘My Way’, parte de la compilación *Nothing But the Best* publicada por Universal Music Group.",
    video: "https://www.youtube.com/embed/qQzdAsjWGPg"
  },
  {
    titulo: "Maybe You'll Be There (Remastered)",
    banda: "Gordon Jenkins and His Orchestra",
    descripcion: "Clásico tema jazz estándar, aquí en versión remasterizada, originalmente compuesto en 1947 y popularizado por múltiples intérpretes.",
    video: "https://www.youtube.com/embed/xEPPQxHR1S4"
  },
{
  titulo: "The Wanderer",
  banda: "Dion",
  descripcion: "Video oficial del clásico rock and roll *The Wanderer*, lanzado en 1961. Un himno rebelde que definió el estilo vocal de Dion y se convirtió en ícono de la era.",
  video: "https://www.youtube.com/embed/SbYa7NBYyRc"
},
{
titulo: "Time Adventure",
banda: "Rebecca Sugar",
descripcion: "Rebecca Sugar performs 'Time Adventure' from Adventure Time, presentado por Cartoon Network.",
video: "https://www.youtube.com/embed/Xr53S9vIbCE"
},
{
titulo: "Hasta la Raíz (Austin City Limits)",
banda: "Natalia Lafourcade",
descripcion: "Presentación en Austin City Limits donde Natalia interpreta 'Hasta la Raíz', tema titular de su álbum ganador de un Grammy.",
video: "https://www.youtube.com/embed/zayX1YXiP6Y"
}

];

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
document.getElementById("saveRecommendation").addEventListener("click", async () => {
  const input = document.getElementById("recommendationInput");
  const text = input.value.trim();
  if (!text) return;

  await db.collection("notas").add({
    text,
    date: new Date().toLocaleDateString("es-CR", {
      day: "2-digit",
      month: "short",
      year: "numeric"
    }),
    createdAt: Date.now() // timestamp para control de borrado
  });

  input.value = "";
  renderRecommendations();
});

// Mostrar recomendaciones con botón borrar y control de 30s
async function renderRecommendations() {
  const list = document.getElementById("recommendationList");
  list.innerHTML = "";

  const snapshot = await db.collection("notas").orderBy("date", "desc").get();
  const now = Date.now();

  snapshot.forEach(doc => {
    const note = doc.data();

    const p = document.createElement("p");
    p.innerHTML = `<strong>${note.date}</strong><br>${note.text}`;

    // Crear botón borrar con estilo de "×"
    const btnBorrar = document.createElement("button");
    btnBorrar.className = "btn-borrar-individual";
    btnBorrar.textContent = "×";
    btnBorrar.title = "Borrar nota";
    btnBorrar.style.marginLeft = "10px";

    // Chequear si la nota fue creada hace menos de 30s (para no pedir contraseña)
    const puedeBorrarSinClave = note.createdAt && (now - note.createdAt) < 30000;

    btnBorrar.onclick = async () => {
      if (puedeBorrarSinClave) {
        // Borrar directamente sin pedir contraseña
        if (confirm("¿Querés borrar esta nota?")) {
          await db.collection("notas").doc(doc.id).delete();
          renderRecommendations();
        }
      } else {
        // Pide contraseña para borrar
        const pass = prompt("Ingresá la contraseña para borrar esta nota:");
        if (pass === "rock") {  // Cambia aquí la contraseña
          await db.collection("notas").doc(doc.id).delete();
          renderRecommendations();
        } else {
          alert("Contraseña incorrecta.");
        }
      }
    };

    p.appendChild(btnBorrar);
    list.appendChild(p);
  });
}


// Borrar todas las notas con contraseña
document.getElementById("clearRecommendations").addEventListener("click", async () => {
  const pass = prompt("Ingresá la contraseña para borrar todas las notas:");
  if (pass !== "tuContraseñaSegura") {  // Cambia aquí la contraseña
    alert("Contraseña incorrecta.");
    return;
  }

  if (confirm("¿Seguro que querés borrar todas tus notas guardadas?")) {
    const snapshot = await db.collection("notas").get();
    const batch = db.batch();
    snapshot.forEach(doc => batch.delete(doc.ref));
    await batch.commit();
    renderRecommendations();
  }
});

renderRecommendations();