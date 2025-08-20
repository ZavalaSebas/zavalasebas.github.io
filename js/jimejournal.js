const fotosJime = [
  { archivo: "jime01.jpg", titulo: "Jime dormida con lentes", fecha: "3 de febrero 2023 18:48" },
  { archivo: "jime02.jpg", titulo: "Jime morida sobre Andrea", fecha: "3 de febrero 2023 19:47" },
  { archivo: "jime03.jpg", titulo: "Parada frente al BK", fecha: "16 de febrero 2023 12:46" },
  { archivo: "jime04.jpg", titulo: "Faking Universidad", fecha: "17 de julio 2023 13:16" },
  { archivo: "jime05.jpg", titulo: "AMPM", fecha: "26 de julio 2023 17:47" },
  { archivo: "jime06.jpg", titulo: "Jime’s House", fecha: "1 de febrero 2025 12:49" },
  { archivo: "jime07.jpg", titulo: "Paseo Gym", fecha: "15 de marzo 2025 18:17" },
  { archivo: "jime08.jpg", titulo: "Jime’s House", fecha: "6 de abril 2025 20:06" },
  { archivo: "jime09.jpg", titulo: "Jime Anuario", fecha: "11 de abril 2025 10:46" },
  { archivo: "jime10.jpg", titulo: "Antoniana", fecha: "14 de abril 2025 22:04" },
  { archivo: "jime11.jpg", titulo: "Cooking, Baking", fecha: "27 de abril 2025 17:23" },
  { archivo: "jime12.jpg", titulo: "Amasando", fecha: "27 de abril 2025 17:24" },
  { archivo: "jime13.jpg", titulo: "DS Party", fecha: "27 de abril 2025 20:56" },
  { archivo: "jime14.jpg", titulo: "DS Photo", fecha: "27 de abril 2025 20:58" },
  { archivo: "jime15.jpg", titulo: "Gym 2.0", fecha: "17 de mayo 2025 10:33" },
  { archivo: "jime16.jpg", titulo: "Lankester", fecha: "20 de julio 2025 15:58" },
  { archivo: "jime17.jpg", titulo: "My House", fecha: "20 de julio 2025 17:27" },
  { archivo: "jime18.jpg", titulo: "Birthdaaay", fecha: "9 de agosto 2025 17:47" },
  { archivo: "jime19.jpg", titulo: "Birthdaaay", fecha: "9 de agosto 2025 17:48" },
  { archivo: "jime20.jpg", titulo: "Birthdaaay", fecha: "9 de agosto 2025 17:49" }
];

const collageGrid = document.querySelector(".collage-grid");
collageGrid.innerHTML = ""; // limpiar placeholders

fotosJime.forEach(foto => {
  const tile = document.createElement("div");
  tile.className = "collage-tile";

  tile.innerHTML = `
    <img src="../assets/image/jimejournal/${foto.archivo}" alt="${foto.titulo}" class="collage-img">
    <h3>${foto.titulo}</h3>
    <p class="collage-desc">${foto.fecha}</p>
  `;

  collageGrid.appendChild(tile);
});
