const fotosLau = [
  { archivo: "lau01.jpg", titulo: "Triple Birthday", fecha: "11 de agosto 2024 18:02" },
  { archivo: "lau02.jpg", titulo: "Staring", fecha: "11 de agosto 2024 18:04" },
  { archivo: "lau03.jpg", titulo: "TRIPLE HBD CAFE", fecha: "9 de agosto 2025 17:46" },
  { archivo: "lau04.jpg", titulo: "After After After", fecha: "9 de agosto 2025 23:29" },
  { archivo: "lau05.jpg", titulo: "Materilist Movie Night", fecha: "14 de agosto 2025 18:33" },
  { archivo: "lau06.jpg", titulo: "Civil Wedding", fecha: "23 de agosto 2025 17:27" },
  { archivo: "lau07.jpg", titulo: "Smile", fecha: "23 de agosto 2025 17:47" },
  { archivo: "lau08.jpg", titulo: "Mad", fecha: "29 de agosto 2025 19:41" },
  { archivo: "lau09.jpg", titulo: "Barre Club", fecha: "3 de septiembre 2025 17:58" },
  { archivo: "lau10.jpg", titulo: "Barre Club", fecha: "3 de septiembre 2025 18:28" },
  { archivo: "lau11.jpg", titulo: "Waiting for someone", fecha: "5 de septiembre 2025 18:15" },
  { archivo: "lau12.jpg", titulo: "Eating with someone", fecha: "5 de septiembre 2025 19:21" },
  { archivo: "lau13.jpg", titulo: "Hi", fecha: "5 de septiembre 2025 19:38" },
  { archivo: "lau14.jpg", titulo: "DS Photo", fecha: "6 de septiembre 2025 15:45" },
  { archivo: "lau15.jpg", titulo: "Mario Gaming", fecha: "6 de septiembre 2025 15:48" },
  { archivo: "lau16.jpg", titulo: "ZZZ", fecha: "6 de septiembre 2025 18:18 - 22:19" },
  { archivo: "lau17.jpg", titulo: "San Pedro Raining", fecha: "15 de septiembre 2025 13:14" },
  { archivo: "lau18.jpg", titulo: "Music", fecha: "15 de septiembre 2025 16:52" },
  { archivo: "lau19.jpg", titulo: "Chingon", fecha: "15 de septiembre 2025 18:41" }
];


const collageGrid = document.querySelector(".collage-grid");
collageGrid.innerHTML = "";

fotosLau.forEach(foto => {
  const tile = document.createElement("div");
  tile.className = "collage-tile";

  tile.innerHTML = `
    <img src="../assets/image/laujournal/${foto.archivo}" alt="${foto.titulo}" class="collage-img">
    <h3>${foto.titulo}</h3>
    <p class="collage-desc">${foto.fecha}</p>
  `;

  tile.addEventListener("click", () => {
    document.getElementById("lightbox").style.display = "flex";
    document.getElementById("lightbox-img").src = `../assets/image/laujournal/${foto.archivo}`;
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

// timeline
const timeline = document.querySelector('.timeline');
timeline.innerHTML = '';

fotosLau.forEach(foto => {
  const point = document.createElement('div');
  point.className = 'timeline-point';

  point.innerHTML = `
    <img src="../assets/image/laujournal/${foto.archivo}" alt="${foto.titulo}" class="timeline-img">
    <span>${foto.fecha}</span>
  `;

  point.addEventListener('click', () => {
    document.getElementById("lightbox").style.display = "flex";
    document.getElementById("lightbox-img").src = `../assets/image/laujournal/${foto.archivo}`;
    document.getElementById("lightbox-caption").textContent = `${foto.titulo} — ${foto.fecha}`;
  });

  timeline.appendChild(point);
});
