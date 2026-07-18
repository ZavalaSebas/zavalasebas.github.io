const artefactos = [
  {
    nombre: "Partículas",
    icono: "🌌",
    descripcion: "Un campo de puntos que siguen el mouse.",
    accion: () => alert("Aquí se activaría el experimento de partículas.")
  },
  {
    nombre: "Círculos Reactivos",
    icono: "⚪",
    descripcion: "Círculos que se expanden al hacer clic.",
    accion: () => alert("Aquí iría el canvas interactivo con círculos.")
  },
  {
    nombre: "Texto Viviente",
    icono: "💬",
    descripcion: "Palabras que se mueven como si respiraran.",
    accion: () => alert("Aquí mostrarías un texto animado poético.")
  }
];

const grid = document.getElementById("artefacto-grid");

artefactos.forEach(a => {
  const card = document.createElement("div");
  card.className = "artefacto-card";

  card.innerHTML = `
    <div class="icon">${a.icono}</div>
    <h3>${a.nombre}</h3>
    <p>${a.descripcion}</p>
  `;

  card.addEventListener("click", a.accion);
  grid.appendChild(card);
});
