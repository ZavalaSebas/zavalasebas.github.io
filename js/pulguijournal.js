const fotosPulgui = [
  { archivo: "pulgui01.jpg", titulo: "Petit", fecha: "23 de Octubre 2013 17:58" },
  { archivo: "pulgui02.jpg", titulo: "Disney Yipe", fecha: "8 de Diciembre 2017 08:07" },
  { archivo: "pulgui03.jpg", titulo: "Car Selfie", fecha: "5 de Septiembre 2021 14:48" },
  { archivo: "pulgui04.jpg", titulo: "Mario&Luigi", fecha: "4 de julio 2022 13:16" },
  { archivo: "pulgui05.jpg", titulo: "Cleo", fecha: "16 de Octubre 2022 09:19" },
  { archivo: "pulgui06.jpg", titulo: "Tio’s House", fecha: "5 de Noviembre 2022 13:40" },
  { archivo: "pulgui07.jpg", titulo: "House", fecha: "16 de Noviembre 2022 19:36" },
  { archivo: "pulgui08.jpg", titulo: "Hospital", fecha: "17 de Noviembre 2025 20:06" },
  { archivo: "pulgui09.jpg", titulo: "Playa Ballena", fecha: "27 de Diciembre 2022 14:33" },
  { archivo: "pulgui10.jpg", titulo: "Lol", fecha: "17 de Junio 2023 16:04" },
  { archivo: "pulgui11.jpg", titulo: "Bus, Baking", fecha: "15 de Julio 2023 10:41" },
  { archivo: "pulgui12.jpg", titulo: "CarSelfie 2.0", fecha: "23 de Julio 2023 12:49" },
  { archivo: "pulgui13.jpg", titulo: "Passenger Terminal", fecha: "2 de Octubre 2023 11:33" },
  { archivo: "pulgui14.jpg", titulo: "Times Square", fecha: "4 de Octubre 2023 16:17" },
  { archivo: "pulgui15.jpg", titulo: "HBD", fecha: "30 de septiembre 2023 16:29" },
  { archivo: "pulgui16.jpg", titulo: "Okay", fecha: "15 de Agosto 2024 14:49" },
  { archivo: "pulgui17.jpg", titulo: "Chicago", fecha: "20 de Diciembre 2024 17:38" },
  { archivo: "pulgui18.jpg", titulo: "Airport", fecha: "23 de Diciembre 2024 16:20" },
  { archivo: "pulgui19.jpg", titulo: "MX Food", fecha: "9 de Enero 2025 16:20" },
  { archivo: "pulgui20.jpg", titulo: "Mirror", fecha: "19 de Abril 2025 11:11" },
  { archivo: "pulgui21.jpg", titulo: "Mall", fecha: "20 de Abril 2025 13:17" },
  { archivo: "pulgui22.jpg", titulo: "Mirror 2.0", fecha: "13 de Julio 2025 16:57" },
  { archivo: "pulgui23.jpg", titulo: "Mini Miny", fecha: "22 de Julio 2025 12:14" },
  { archivo: "pulgui24.jpg", titulo: "Baby Shower", fecha: "30 de Agosto 2025 15:33" }
];

const collageGrid = document.querySelector(".collage-grid");
collageGrid.innerHTML = ""; // limpiar placeholders

fotosPulgui.forEach(foto => {
  const tile = document.createElement("div");
  tile.className = "collage-tile";

  tile.innerHTML = `
    <img src="../assets/image/pulguijournal/${foto.archivo}" alt="${foto.titulo}" class="collage-img">
    <h3>${foto.titulo}</h3>
    <p class="collage-desc">${foto.fecha}</p>
  `;

  // evento click para abrir lightbox
  tile.addEventListener("click", () => {
    document.getElementById("lightbox").style.display = "flex";
    document.getElementById("lightbox-img").src = `../assets/image/pulguijournal/${foto.archivo}`;
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

fotosPulgui.forEach(foto => {
  const point = document.createElement('div');
  point.className = 'timeline-point';

  point.innerHTML = `
    <img src="../assets/image/pulguijournal/${foto.archivo}" alt="${foto.titulo}" class="timeline-img">
    <span>${foto.fecha}</span>
  `;

  // hacer que al click abra el lightbox
  point.addEventListener('click', () => {
    document.getElementById("lightbox").style.display = "flex";
    document.getElementById("lightbox-img").src = `../assets/image/pulguijournal/${foto.archivo}`;
    document.getElementById("lightbox-caption").textContent = `${foto.titulo} — ${foto.fecha}`;
  });

  timeline.appendChild(point);
});
