const artefactos = [
  {
    titulo: "Shine On You Crazy Diamond – Pink Floyd",
    descripcion: "Pink Floyd, 1975. Aparece en la película *The Departed* y simboliza el legado de Syd Barrett.",
    video: "https://www.youtube.com/embed/cWGE9Gi0bB0"
  },
  {
    titulo: "Reckoner – Radiohead",
    descripcion: "Parte de *In Rainbows* (2007). Una pieza hipnótica usada en múltiples montajes visuales.",
    video: "https://www.youtube.com/embed/PFKx3v4D2J8"
  },
  {
    titulo: "Something In The Way – Nirvana",
    descripcion: "De *Nevermind*, 1991. Revivió como tema principal en *The Batman* (2022).",
    video: "https://www.youtube.com/embed/xrOe7Lz2xnw"
  },
  {
    titulo: "The Less I Know The Better – Tame Impala",
    descripcion: "Del álbum *Currents* (2015). Asociado con la escena indie pop psicodélica contemporánea.",
    video: "https://www.youtube.com/embed/sBzrzS1Ag_g"
  }
];

const grid = document.getElementById("artefacto-grid");

artefactos.forEach(item => {
  const card = document.createElement("div");
  card.className = "artefacto-card";

  card.innerHTML = `
    <iframe src="${item.video}" frameborder="0" allowfullscreen></iframe>
    <h3>${item.titulo}</h3>
    <p>${item.descripcion}</p>
  `;

  grid.appendChild(card);
});
