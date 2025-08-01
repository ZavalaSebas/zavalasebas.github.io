const artefactos = [
  {
    nombre: "Amber - 311",
    descripcion: "Riff sencillo, vibra veraniega, buen ejercicio de arpegios en G.",
    video: "https://www.youtube.com/embed/kwU9fBv1EJ8"
  },
  {
    nombre: "Redbone - Childish Gambino",
    descripcion: "Perfecto para practicar acordes en falsete y ritmo suave.",
    video: "https://www.youtube.com/embed/Kp7eSUU9oy8"
  },
  {
    nombre: "Ain't No Sunshine - Bill Withers",
    descripcion: "Ritmo blues clásico, gran ejercicio de dinámica en guitarra.",
    video: "https://www.youtube.com/embed/H3jQY3kQZ9U"
  }
];

const grid = document.getElementById("artefacto-grid");

artefactos.forEach(a => {
  const card = document.createElement("div");
  card.className = "artefacto-card";

  card.innerHTML = `
    <iframe src="${a.video}" allowfullscreen></iframe>
    <h3>${a.nombre}</h3>
    <p>${a.descripcion}</p>
  `;

  grid.appendChild(card);
});
