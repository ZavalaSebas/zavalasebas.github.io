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

const fotos pulgui = [
  { archivo: " pulgui01.jpg", titulo: " pulgui dormida con lentes", fecha: "3 de febrero 2023 18:48" },
  { archivo: " pulgui02.jpg", titulo: " pulgui morida sobre Andrea", fecha: "3 de febrero 2023 19:47" },
  { archivo: " pulgui03.jpg", titulo: "Parada frente al BK", fecha: "16 de febrero 2023 12:46" },
  { archivo: " pulgui04.jpg", titulo: "Faking Universidad", fecha: "17 de julio 2023 13:16" },
  { archivo: " pulgui05.jpg", titulo: "AMPM", fecha: "26 de julio 2023 17:47" },
  { archivo: " pulgui06.jpg", titulo: " pulgui’s House", fecha: "1 de febrero 2025 12:49" },
  { archivo: " pulgui07.jpg", titulo: "Paseo Gym", fecha: "15 de marzo 2025 18:17" },
  { archivo: " pulgui08.jpg", titulo: " pulgui’s House", fecha: "6 de abril 2025 20:06" },
  { archivo: " pulgui09.jpg", titulo: " pulgui Anuario", fecha: "11 de abril 2025 10:46" },
  { archivo: " pulgui10.jpg", titulo: "Antoniana", fecha: "14 de abril 2025 22:04" },
  { archivo: " pulgui11.jpg", titulo: "Cooking, Baking", fecha: "27 de abril 2025 17:23" },
  { archivo: " pulgui12.jpg", titulo: "Amasando", fecha: "27 de abril 2025 17:24" },
  { archivo: " pulgui13.jpg", titulo: "DS Party", fecha: "27 de abril 2025 20:56" },
  { archivo: " pulgui14.jpg", titulo: "DS Photo", fecha: "27 de abril 2025 20:58" },
  { archivo: " pulgui15.jpg", titulo: "Gym 2.0", fecha: "17 de mayo 2025 10:33" },
  { archivo: " pulgui16.jpg", titulo: "Lankester", fecha: "20 de julio 2025 15:58" },
  { archivo: " pulgui17.jpg", titulo: "My House", fecha: "20 de julio 2025 17:27" },
  { archivo: " pulgui18.jpg", titulo: "Birthdaaay", fecha: "9 de agosto 2025 17:47" },
  { archivo: " pulgui19.jpg", titulo: "Birthdaaay", fecha: "9 de agosto 2025 17:48" },
  { archivo: " pulgui20.jpg", titulo: "Birthdaaay", fecha: "9 de agosto 2025 17:49" }
];

const collageGrid = document.querySelector(".collage-grid");
collageGrid.innerHTML = ""; // limpiar placeholders

fotos pulgui.forEach(foto => {
  const tile = document.createElement("div");
  tile.className = "collage-tile";

  tile.innerHTML = `
    <img src="../assets/image/ pulguijournal/${foto.archivo}" alt="${foto.titulo}" class="collage-img">
    <h3>${foto.titulo}</h3>
    <p class="collage-desc">${foto.fecha}</p>
  `;

  // evento click para abrir lightbox
  tile.addEventListener("click", () => {
    document.getElementById("lightbox").style.display = "flex";
    document.getElementById("lightbox-img").src = `../assets/image/ pulguijournal/${foto.archivo}`;
    document.getElementById("lightbox-caption").textContent = `${foto.titulo} — ${foto.fecha}`;
  });

  collageGrid.appendChild(tile);
});

// cerrar lightbox
const lightbox = document.getElementById("lightbox");
const lightboxClose = document.querySelector(".lightbox-close");

lightboxClose.addEventListener("click", () => {
  lightbox.style.display = "none";
});

lightbox.addEventListener("click", (e) => {
  if (e.target === lightbox) {
    lightbox.style.display = "none";
  }
});

const timeline = document.querySelector('.timeline');
timeline.innerHTML = ''; // limpiar

fotos pulgui.forEach(foto => {
  const point = document.createElement('div');
  point.className = 'timeline-point';

  point.innerHTML = `
    <img src="../assets/image/ pulguijournal/${foto.archivo}" alt="${foto.titulo}" class="timeline-img">
    <span>${foto.fecha}</span>
  `;

  // hacer que al click abra el lightbox
  point.addEventListener('click', () => {
    document.getElementById("lightbox").style.display = "flex";
    document.getElementById("lightbox-img").src = `../assets/image/ pulguijournal/${foto.archivo}`;
    document.getElementById("lightbox-caption").textContent = `${foto.titulo} — ${foto.fecha}`;
  });

  timeline.appendChild(point);
});


