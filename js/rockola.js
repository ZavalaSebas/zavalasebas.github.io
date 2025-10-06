const tracks = [
  {
    nombre: "Cover: Let It Be",
    portada: "https://placehold.co/200x200?text=Let+It+Be",
    duracion: "3:45",
    archivo: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    tipo: "todo,singles,studio",
    letra: `When I find myself in times of trouble\nMother Mary comes to me\nSpeaking words of wisdom, let it be...`,
    historia: `Grabado en casa, inspirado en la versión original de The Beatles. Una de mis primeras grabaciones de cover, con un toque personal en el piano.`
  },
  {
    nombre: "Mi canción original",
    portada: "https://placehold.co/200x200?text=Mi+Cancion",
    duracion: "2:58",
    archivo: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
    tipo: "todo,studio",
    letra: `Esta es mi canción\nHecha en mi habitación\nCon acordes sencillos y mucha emoción...`,
    historia: `Compuesta y grabada en 2025, representa el inicio de mi proyecto musical personal. La letra habla de los sueños y la pasión por la música.`
  },
  {
    nombre: "Cover: Wonderwall",
    portada: "https://placehold.co/200x200?text=Wonderwall",
    duracion: "4:12",
    archivo: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
    tipo: "todo,singles",
    letra: `Today is gonna be the day\nThat they're gonna throw it back to you\nBy now you should've somehow\nRealized what you gotta do...`,
    historia: `Versión acústica grabada en una sola toma. Elegí Wonderwall porque siempre ha sido una canción especial en mis reuniones con amigos.`
  },
  {
    nombre: "Álbum: Demo 2025",
    portada: "https://placehold.co/200x200?text=Album+Demo",
    duracion: "12:34",
    archivo: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
    tipo: "todo,albums",
    letra: `Instrumental - No lyrics available`,
    historia: `Mi primer demo de estudio, incluye varias ideas y experimentos musicales grabados durante el año.`
  }
];

const shelfMap = {
  todo: document.getElementById('rockola-shelf-todo'),
  singles: document.getElementById('rockola-shelf-singles'),
  studio: document.getElementById('rockola-shelf-studio'),
  albums: document.getElementById('rockola-shelf-albums')
};

const shelfView = document.getElementById('rockola-shelf-view');
const listView = document.getElementById('rockola-list-view');
const listTbody = document.getElementById('rockola-list-tbody');
const toggleViewBtn = document.getElementById('toggle-view-btn');

toggleViewBtn.addEventListener('click', () => {
  if (shelfView.style.display === 'none') {
    shelfView.style.display = '';
    listView.style.display = 'none';
    toggleViewBtn.textContent = 'List';
  } else {
    shelfView.style.display = 'none';
    listView.style.display = '';
    toggleViewBtn.textContent = 'Shelf';
    renderListView();
  }
});

function renderListView() {
  listTbody.innerHTML = '';
  tracks.forEach((track, i) => {
    const tr = document.createElement('tr');
    tr.className = 'rockola-list-row';
    tr.innerHTML = `
      <td><img src="${track.portada}" alt="portada" class="rockola-list-img" /></td>
      <td>${track.nombre}</td>
      <td>${track.duracion}</td>
    `;
    tr.addEventListener('click', () => showPlayer(i));
    listTbody.appendChild(tr);
  });
}

const player = document.getElementById('rockola-player');
const portada = document.getElementById('player-portada');
const nombre = document.getElementById('player-nombre');
const duracion = document.getElementById('player-duracion');
const audio = document.getElementById('player-audio');
const closeBtn = document.getElementById('close-player');
const prevBtn = document.getElementById('prev-track');
const nextBtn = document.getElementById('next-track');
const letraDiv = document.getElementById('player-letra');
const historiaDiv = document.getElementById('player-historia');

let currentTrack = 0;

function renderShelves() {
  Object.keys(shelfMap).forEach(key => {
    shelfMap[key].innerHTML = '';
    tracks.forEach((track, i) => {
      if (track.tipo.includes(key)) {
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
        shelfMap[key].appendChild(card);
      }
    });
  });
}

function showPlayer(idx) {
  currentTrack = idx;
  const track = tracks[idx];
  portada.src = track.portada;
  nombre.textContent = track.nombre;
  duracion.textContent = track.duracion;
  audio.src = track.archivo;
  // Lyrics y Backpage
  letraDiv.textContent = track.letra || '(Lyrics not available)';
  historiaDiv.textContent = track.historia || '(Backpage not available)';
  player.classList.add('show');
  setTimeout(() => player.classList.add('active'), 50);
  document.body.classList.add('noscroll');
}

closeBtn.addEventListener('click', () => {
  player.classList.remove('active');
  setTimeout(() => player.classList.remove('show'), 300);
  audio.pause();
  portada.classList.remove('playing');
  document.body.classList.remove('noscroll');
});

audio.addEventListener('play', () => {
  portada.classList.add('playing');
});
audio.addEventListener('pause', () => {
  portada.classList.remove('playing');
});

prevBtn.addEventListener('click', () => {
  let idx = currentTrack - 1;
  if (idx < 0) idx = tracks.length - 1;
  showPlayer(idx);
  setTimeout(() => audio.play(), 100);
});
nextBtn.addEventListener('click', () => {
  let idx = (currentTrack + 1) % tracks.length;
  showPlayer(idx);
  setTimeout(() => audio.play(), 100);
});

// Inicializar texto del botón correctamente
if (shelfView.style.display === 'none') {
  toggleViewBtn.textContent = 'Shelf';
} else {
  toggleViewBtn.textContent = 'List';
}
renderShelves();
