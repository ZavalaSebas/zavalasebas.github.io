const tracks = [
  {
    nombre: "Cover: Let It Be",
    portada: "https://placehold.co/200x200?text=Let+It+Be",
    duracion: "3:45",
    archivo: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
  },
  {
    nombre: "Mi canción original",
    portada: "https://placehold.co/200x200?text=Mi+Cancion",
    duracion: "2:58",
    archivo: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3"
  },
  {
    nombre: "Cover: Wonderwall",
    portada: "https://placehold.co/200x200?text=Wonderwall",
    duracion: "4:12",
    archivo: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3"
  }
];

const selector = document.getElementById('rockola-selector');
const player = document.getElementById('rockola-player');
const portada = document.getElementById('player-portada');
const nombre = document.getElementById('player-nombre');
const duracion = document.getElementById('player-duracion');
const audio = document.getElementById('player-audio');
const closeBtn = document.getElementById('close-player');

function renderSelector() {
  selector.innerHTML = '';
  tracks.forEach((track, i) => {
    const card = document.createElement('div');
    card.className = 'rockola-card';
    card.innerHTML = `
      <img src="${track.portada}" alt="portada" class="rockola-img" />
      <div class="rockola-info">
        <h3>${track.nombre}</h3>
        <span>${track.duracion}</span>
      </div>
    `;
    card.addEventListener('click', () => showPlayer(i));
    selector.appendChild(card);
  });
}

function showPlayer(idx) {
  const track = tracks[idx];
  portada.src = track.portada;
  nombre.textContent = track.nombre;
  duracion.textContent = track.duracion;
  audio.src = track.archivo;
  player.classList.add('show');
  setTimeout(() => player.classList.add('active'), 50);
}

closeBtn.addEventListener('click', () => {
  player.classList.remove('active');
  setTimeout(() => player.classList.remove('show'), 300);
  audio.pause();
});

renderSelector();
