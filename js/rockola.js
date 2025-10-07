const tracks = [
  {
    nombre: "blackbird-take-5",
    portada: "../assets/image/covers/blackbird.jpg",
    duracion: "",
    archivo: "../assets/audio/rockola/blackbird-take-5.mp3",
    tipo: "todo,studio",
    letra: "Ver letra original de The Beatles",
    historia: "Take número 5 de Blackbird - Mi versión de Blackbird por The Beatles"
  },
  {
    nombre: "blackbird-take-7",
    portada: "../assets/image/covers/blackbird2.jpg",
    duracion: "",
    archivo: "../assets/audio/rockola/blackbird-take-7.mp3",
    tipo: "todo,studio",
    letra: "Ver letra original de The Beatles",
    historia: "Take número 7 de Blackbird - Mi versión de Blackbird por The Beatles"
  },
  {
    nombre: "island-in-the-sun-take-3",
    portada: "../assets/image/covers/islandinthesun.jpg",
    duracion: "",
    archivo: "../assets/audio/rockola/island-in-the-sun-take-3.mp3",
    tipo: "todo,studio",
    letra: "Ver letra original de Weezer",
    historia: "Take número 3 de Island in the Sun - Mi versión de Island in the Sun por Weezer"
  },
  {
    nombre: "shallow-take-8",
    portada: "../assets/image/covers/shallow.jpg",
    duracion: "",
    archivo: "../assets/audio/rockola/shallow-take-8.mp3",
    tipo: "todo,studio",
    letra: "Ver letra original de Lady Gaga & Bradley Cooper",
    historia: "Take número 8 de Shallow - Mi versión de Shallow por Lady Gaga & Bradley Cooper"
  },
  {
    nombre: "te-para-3-take-5",
    portada: "../assets/image/covers/tepara3.jpg",
    duracion: "",
    archivo: "../assets/audio/rockola/te-para-3-take-5.mp3",
    tipo: "todo,studio",
    letra: "Ver letra original de Soda Stereo",
    historia: "Take número 5 de Te Para 3"
  },
  {
    nombre: "tears-in-heaven-take-12",
    portada: "../assets/image/covers/tears.jpg",
    duracion: "",
    archivo: "../assets/audio/rockola/tears-in-heaven-take-12.mp3",
    tipo: "todo,studio",
    letra: "Ver letra original de Eric Clapton",
    historia: "Take número 12 de Tears in Heaven - Mi versión de Tears in Heaven por Eric Clapton"
  },
  // --- INICIO: Tracks generados automáticamente desde assets/audio/rockola ---
  {
    nombre: "Amor Completo Solo Take0",
    portada: "../assets/image/covers/amorcompletosolo.jpg",
    duracion: "",
    archivo: "../assets/audio/rockola/Amor Completo Solo Take0.mp3",
    tipo: "todo,studio",
    letra: "Ver letra original de Mon Laferte",
    historia: "Take número 0 de Amor Completo en solitario"
  },
  {
    nombre: "Amor Completo Take7",
    portada: "../assets/image/covers/amorcompleto.jpg",
    duracion: "",
    archivo: "../assets/audio/rockola/Amor Completo Take7.mp3",
    tipo: "todo,studio",
    letra: "Ver letra original de Mon Laferte",
    historia: "Take número 7 de Amor Completo"
  },
  {
    nombre: "Burning Quietly",
    portada: "../assets/image/covers/burning.jpg",
    duracion: "",
    archivo: "../assets/audio/rockola/Burning Quietly.mp3",
    tipo: "todo,singles",
    letra: "Fingers trace the edge of the sky",
    historia: "Cover reversionado de I need you - Canción original para el EP Comfort"
  },
  {
    nombre: "Eclipsed Heart",
    portada: "../assets/image/covers/eclipse.jpg",
    duracion: "",
    archivo: "../assets/audio/rockola/Eclipsed Heart.mp3",
    tipo: "todo,singles",
    letra: "Shadows stretch where the moonlight dies",
    historia: "Cover reversionado de I need you - Canción original para el EP Comfort"
  },
  {
    nombre: "EscapateConmigo",
    portada: "../assets/image/covers/escapism.jpg",
    duracion: "",
    archivo: "../assets/audio/rockola/EscapateConmigo.mp3",
    tipo: "todo,singles",
    letra: "Quiero ser libre de ti",
    historia: "Cover reversionado de escapismo - Canción original por Moni para el EP Comfort"
  },
  {
    nombre: "EscapateConmigoV2",
    portada: "../assets/image/covers/escapism.jpg",
    duracion: "",
    archivo: "../assets/audio/rockola/EscapateConmigoV2.mp3",
    tipo: "todo,singles",
    letra: "Quiero ser libre de ti",
    historia: "Cover reversionado de escapismo - Canción original por Moni para el EP Comfort en su segund version"
  },
  {
    nombre: "Flaco Take 2",
    portada: "../assets/image/covers/flaco.jpg",
    duracion: "",
    archivo: "../assets/audio/rockola/Flaco Take 2.mp3",
    tipo: "todo,studio",
    letra: "Ver letra original de Mon Laferte",
    historia: "Take número 2 de Flaco"
  },
  {
    nombre: "I need You Take0",
    portada: "../assets/image/covers/ineedyou.jpg",
    duracion: "",
    archivo: "../assets/audio/rockola/I need You Take0.mp3",
    tipo: "todo,studio",
    letra: "I need you — more than I can say",
    historia: "Take número 0 de I need You - Canción original para el EP Comfort"
  },
  {
    nombre: "I Want to Be Free",
    portada: "../assets/image/covers/free.jpg",
    duracion: "",
    archivo: "../assets/audio/rockola/I Want to Be Free.mp3",
    tipo: "todo,singles",
    letra: "I’m stuck in a cage with no lock no key",
    historia: "Cancion Original por Dani para EP Comfort"
  },
  {
    nombre: "I Want to Be FreeV2",
    portada: "../assets/image/covers/free.jpg",
    duracion: "",
    archivo: "../assets/audio/rockola/I Want to Be FreeV2.mp3",
    tipo: "todo,singles",
    letra: "I’m stuck in a cage with no lock no key",
    historia: "Cancion Original por Dani para EP Comfort en una segunda versión"
  },
  {
    nombre: "I-need-You-Take-0 (Cover) (v2)",
    portada: "../assets/image/covers/ineedyou2.jpg",
    duracion: "",
    archivo: "../assets/audio/rockola/I-need-You-Take-0 (Cover) (v2).mp3",
    tipo: "todo,studio",
    letra: "I need you — more than I can say",
    historia: "Version numero 2 de I need You cancion original para el EP Comfort"
  },
  {
    nombre: "I-need-You-Take-0 (Cover)",
    portada: "../assets/image/covers/ineedyou.jpg",
    duracion: "",
    archivo: "../assets/audio/rockola/I-need-You-Take-0 (Cover).mp3",
    tipo: "todo,studio",
    letra: "I need you — more than I can say",
    historia: "Take número 0 de I need You "
  },
  {
    nombre: "John Lennon - Imagine (Piano Cover)",
    portada: "../assets/image/covers/imagine.jpg",
    duracion: "",
    archivo: "../assets/audio/rockola/John Lennon - Imagine (Piano Cover).mp3",
    tipo: "todo,singles",
    letra: "Ver letra original de John Lennon",
    historia: "Mi versión de Imagine por John Lennon - Cover en piano"
  },
  {
    nombre: "Littleroot Town(FreeStyle)",
    portada: "../assets/image/covers/littleroottown.jpg",
    duracion: "",
    archivo: "../assets/audio/rockola/Littleroot Town(FreeStyle).mp3",
    tipo: "todo,singles",
    letra: "Instrumental",
    historia: "Reversionado de Littleroot Town en freestyle"
  },
  {
    nombre: "Littleroot Town(Tecno)",
    portada: "../assets/image/covers/littleroottown2.jpg",
    duracion: "",
    archivo: "../assets/audio/rockola/Littleroot Town(Tecno).mp3",
    tipo: "todo,singles",
    letra: "Instrumental",
    historia: "Reversionado de Littleroot Town en estilo Tecno"
  },
  {
    nombre: "Littleroot town",
    portada: "../assets/image/covers/littleroottown.jpg",
    duracion: "",
    archivo: "../assets/audio/rockola/Littleroot town.mp3",
    tipo: "todo,singles",
    letra: "Instrumental",
    historia: "Version de Littleroot Town"
  },
  {
    nombre: "Lonely Little Town",
    portada: "../assets/image/covers/lonely.jpg",
    duracion: "",
    archivo: "../assets/audio/rockola/Lonely Little Town.mp3",
    tipo: "todo,singles",
    letra: "In this lonely little town",
    historia: "Cancion Original por Moni para el EP Comfort"
  },
  {
    nombre: "Lonely Little TownV2",
    portada: "../assets/image/covers/lonely.jpg",
    duracion: "",
    archivo: "../assets/audio/rockola/Lonely Little TownV2.mp3",
    tipo: "todo,singles",
    letra: "In this lonely little town",
    historia: "Cancion Original por Moni para el EP Comfort en su segunda versión"
  },
  {
    nombre: "Mia and Sebs Instrumental Cover",
    portada: "../assets/image/covers/laland.jpg",
    duracion: "",
    archivo: "../assets/audio/rockola/Mia and Sebs Instrumental Cover.mp3",
    tipo: "todo,singles",
    letra: "Instrumental",
    historia: "Mi versión instrumental de La La Land - Cover instrumental"
  },
  {
    nombre: "More Surprises",
    portada: "../assets/image/covers/surprise.jpg",
    duracion: "",
    archivo: "../assets/audio/rockola/More Surprises.mp3",
    tipo: "todo,singles",
    letra: "In a world full of surprises",
    historia: "Canción Original reversionada de No Surprises por Saul para el EP Comfort"
  },
  {
    nombre: "NoSurprises (Cover)",
    portada: "../assets/image/covers/nosurprise.jpg",
    duracion: "",
    archivo: "../assets/audio/rockola/NoSurprises (Cover).mp3",
    tipo: "todo,singles",
    letra: "Ver letra original de Radiohead",
    historia: "Mi versión de No Surprises por Radiohead"
  },
  {
    nombre: "One More Kiss Take 1",
    portada: "../assets/image/covers/onemorekiss.jpg",
    duracion: "",
    archivo: "../assets/audio/rockola/One More Kiss Take 1.mp3",
    tipo: "todo,studio",
    letra: "OOnly one more kiss",
    historia: "Take número 1 de One More Kiss"
  },
  {
    nombre: "SelfLOve(Instrumental)",
    portada: "../assets/image/covers/selflove.jpg",
    duracion: "",
    archivo: "../assets/audio/rockola/SelfLOve(Instrumental).mp3",
    tipo: "todo,singles",
    letra: "Instrumental",
    historia: "Canción original instrumental - SelfLove"
  },
  {
    nombre: "Stereo Take 1",
    portada: "../assets/image/covers/stereo.jpg",
    duracion: "",
    archivo: "../assets/audio/rockola/Stereo Take 1.mp3",
    tipo: "todo,studio",
    letra: "",
    historia: "Take número 1 de Stereo"
  },
  {
    nombre: "The Voidz - Lazy Boy (Guitar Cover)",
    portada: "../assets/image/covers/lazy.jpg",
    duracion: "",
    archivo: "../assets/audio/rockola/The Voidz - Lazy Boy (Guitar Cover).mp3",
    tipo: "todo,singles",
    letra: "Ver letra original de The Voidz",
    historia: "Mi versión de Lazy Boy por The Voidz - Cover de guitarra"
  },
  {
    nombre: "Untitled",
    portada: "../assets/image/covers/untitled.jpg",
    duracion: "",
    archivo: "../assets/audio/rockola/Untitled.mp3",
    tipo: "todo,singles",
    letra: "Instrumental",
    historia: "Proyecto sin terminar - Backpage experimental"
  }
  // --- FIN: Tracks generados automáticamente ---
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

// Automatizar duración de cada track si está vacía
function setTrackDurations() {
  tracks.forEach((track, i) => {
    if (!track.duracion && track.archivo) {
      const audioTmp = document.createElement('audio');
      audioTmp.src = track.archivo;
      audioTmp.preload = 'metadata';
      audioTmp.addEventListener('loadedmetadata', function loaded() {
        if (audioTmp.duration && !isNaN(audioTmp.duration)) {
          const min = Math.floor(audioTmp.duration / 60);
          const sec = Math.round(audioTmp.duration % 60).toString().padStart(2, '0');
          track.duracion = `${min}:${sec}`;
          // Si está en el reproductor, actualizar
          if (nombre.textContent === track.nombre) {
            duracion.textContent = track.duracion;
          }
        }
        audioTmp.removeEventListener('loadedmetadata', loaded);
      });
    }
  });
}

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
setTrackDurations();
