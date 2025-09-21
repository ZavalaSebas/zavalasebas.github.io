// Terminal Loader
const terminalLoader = document.getElementById('terminalLoader');
let loaderActive = true;

// Hacer el loader skipeable inmediatamente
document.addEventListener('keydown', hideLoader, { once: true });
document.addEventListener('click', hideLoader, { once: true });

// Ocultar el loader automáticamente después de 6.5 segundos si no se hace skip
setTimeout(() => {
  hideLoader();
}, 6500);

function hideLoader() {
  if (!loaderActive) return;
  loaderActive = false;
  
  // Remover los event listeners para evitar conflictos
  document.removeEventListener('keydown', hideLoader);
  document.removeEventListener('click', hideLoader);
  
  terminalLoader.style.opacity = '0';
  terminalLoader.style.transition = 'opacity 1s ease-out';
  
  setTimeout(() => {
    terminalLoader.style.display = 'none';
  }, 1000);
}

const frases = [
  // Mensajes de sistema falsos
  "cargando loops...",
  "renderizando distorsión...",
  "sintetizando errores...",

  // Glitch / poesía digital
  "1nicio.0",
  "signál fuera de rango",
  "bit roto // eco eterno",

  // Coordenadas y tiempos
  "lat: 47.6519 / long: -122.3502",
  "último ruido: 03:17AM",

  // Rockshow status
  "rockshow // inicializando...",
  "frecuencia encontrada",
  "versión beta del silencio"
];

const footerText = document.getElementById("frase-footer");

function cambiarFraseFooter() {
  const frase = frases[Math.floor(Math.random() * frases.length)];
  footerText.textContent = frase;
}

cambiarFraseFooter();
setInterval(cambiarFraseFooter, 4000); // cada 4 segundos

const audio = document.getElementById("audioAmbiente");
const audioControl = document.getElementById("audioControl");
const vinyl = document.querySelector(".vinyl");
const hint = document.querySelector(".audio-hint");
const freqBars = document.querySelectorAll(".freq-bar");

let audioActivo = false; // manejamos el estado manualmente

// Intentar iniciar el audio al cargar
window.addEventListener("load", () => {
  audio.muted = false;
  audio.play().then(() => {
    console.log("Autoplay exitoso");
    vinyl.classList.remove("paused");
    freqBars.forEach(bar => bar.classList.remove("paused"));
    audioActivo = true;
    if (hint) hint.innerHTML = "🎶 sonando...";
  }).catch(() => {
    console.log("Autoplay bloqueado. Esperando interacción.");
    freqBars.forEach(bar => bar.classList.add("paused"));
  });
});

// Clic para alternar audio
audioControl.addEventListener("click", () => {
  if (audioActivo) {
    audio.pause();
    vinyl.classList.add("paused");
    freqBars.forEach(bar => bar.classList.add("paused"));
    if (hint) hint.innerHTML = "🚫 silenciado";
    audioActivo = false;
    console.log("Audio pausado");
  } else {
    audio.muted = false;
    audio.play().then(() => {
      vinyl.classList.remove("paused");
      freqBars.forEach(bar => bar.classList.remove("paused"));
      if (hint) hint.innerHTML = "🎶 sonando...";
      audioActivo = true;
      console.log("Audio activado");
    }).catch((e) => {
      console.log("Error al reproducir audio:", e);
    });
  }
});


// glitch canvas background effect
const canvas = document.getElementById("glitchCanvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

function drawNoise() {
  const imageData = ctx.createImageData(canvas.width, canvas.height);
  const buffer = new Uint32Array(imageData.data.buffer);

  for (let i = 0; i < buffer.length; i++) {
    if (Math.random() < 0.015) {
      buffer[i] = 0xffffffff;
    }
  }

  ctx.putImageData(imageData, 0, 0);
}

setInterval(drawNoise, 100);

const logo = document.getElementById("logo");
const mainTitle = document.getElementById("mainTitle");

const glitchMap = {
  R: ['R', 'Я', '®', '℞', 'r'],
  O: ['O', '0', 'Θ', 'ø', 'o'],
  C: ['C', '¢', '⊂', 'c'],
  K: ['K', 'ʞ', 'κ', 'k'],
  S: ['S', '$', '§', 's', 'Ƨ'],
  H: ['H', '#', 'Ħ', 'h'],
  W: ['W', 'Ш', 'w'],
};

const originalText = "ROCKSHOW";

function glitchText(text) {
  return text.split('').map(char => {
    const upper = char.toUpperCase();
    const options = glitchMap[upper];
    if (options) {
      return options[Math.floor(Math.random() * options.length)];
    }
    return char;
  }).join('');
}

// Glitch para HEADER (más lento)
setInterval(() => {
  logo.textContent = glitchText(originalText);
}, 1500); // cada 1.5s

// Glitch para TITULO PRINCIPAL (más rápido)
setInterval(() => {
  mainTitle.textContent = glitchText(originalText);
}, 120); // como el glitch anterior

// Intentar reproducir sonido al entrar
window.addEventListener("load", () => {
  const audio = document.getElementById("audioAmbiente");
  audio.muted = false;
  audio.play().catch(() => {
    // Algunos navegadores requieren interacción, por eso el botón también está disponible
    console.log("Autoplay falló, esperar interacción del usuario.");
  });
});

// Sistema de partículas flotantes
const particleContainer = document.getElementById("particleContainer");
const particleSymbols = ['♪', '♫', '♬', '🎸', '🤘', '⚡', '★', '♦', '◆', '▲', '►', '◄'];

function createParticle() {
  const particle = document.createElement('div');
  particle.className = 'particle';
  particle.textContent = particleSymbols[Math.floor(Math.random() * particleSymbols.length)];
  
  // Posición aleatoria en horizontal
  particle.style.left = Math.random() * 100 + '%';
  
  // Velocidad aleatoria (6-12 segundos)
  const duration = 6 + Math.random() * 6;
  particle.style.animationDuration = duration + 's';
  
  // Tamaño aleatorio
  const size = 0.8 + Math.random() * 0.8;
  particle.style.fontSize = size + 'rem';
  
  particleContainer.appendChild(particle);
  
  // Remover partícula cuando termine la animación
  setTimeout(() => {
    if (particle.parentNode) {
      particle.parentNode.removeChild(particle);
    }
  }, duration * 1000);
}

// Crear una partícula cada 2-4 segundos
setInterval(() => {
  if (Math.random() < 0.7) { // 70% de probabilidad
    createParticle();
  }
}, 2000 + Math.random() * 2000);

// Cursor personalizado con trail
const customCursor = document.getElementById('customCursor');
let mouseX = 0, mouseY = 0;
let trailPoints = [];

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  
  customCursor.style.left = (mouseX - 10) + 'px';
  customCursor.style.top = (mouseY - 10) + 'px';
  
  // Agregar punto al trail
  trailPoints.push({x: mouseX, y: mouseY, time: Date.now()});
  
  // Crear trail dots
  if (trailPoints.length > 1) {
    const trail = document.createElement('div');
    trail.className = 'cursor-trail';
    trail.style.left = mouseX + 'px';
    trail.style.top = mouseY + 'px';
    document.body.appendChild(trail);
    
    setTimeout(() => {
      if (trail.parentNode) trail.parentNode.removeChild(trail);
    }, 500);
  }
  
  // Limpiar puntos antiguos del trail
  trailPoints = trailPoints.filter(point => Date.now() - point.time < 200);
});

// Efecto hover en cursor
document.addEventListener('mousedown', () => {
  customCursor.style.transform = 'scale(1.5)';
  customCursor.style.background = 'rgba(79, 195, 247, 0.5)';
});

document.addEventListener('mouseup', () => {
  customCursor.style.transform = 'scale(1)';
  customCursor.style.background = 'rgba(79, 195, 247, 0.2)';
});

// Konami Code Easter Egg
const konamiCode = [
  'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
  'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
  'KeyB', 'KeyA'
];
let konamiIndex = 0;
let konamiActive = false;

document.addEventListener('keydown', (e) => {
  if (e.code === konamiCode[konamiIndex]) {
    konamiIndex++;
    if (konamiIndex === konamiCode.length) {
      activateKonamiMode();
      konamiIndex = 0;
    }
  } else {
    konamiIndex = 0;
  }
});

function activateKonamiMode() {
  if (konamiActive) return;
  
  konamiActive = true;
  document.body.classList.add('konami-mode');
  
  // Crear explosión de partículas especiales
  for (let i = 0; i < 20; i++) {
    setTimeout(() => {
      createSpecialParticle();
    }, i * 100);
  }
  
  // Cambiar el texto del footer temporalmente
  const footer = document.getElementById('frase-footer');
  const originalText = footer.textContent;
  footer.textContent = '🚀 KONAMI MODE ACTIVATED! 🚀';
  
  // Desactivar después de 10 segundos
  setTimeout(() => {
    document.body.classList.remove('konami-mode');
    footer.textContent = originalText;
    konamiActive = false;
  }, 10000);
}

function createSpecialParticle() {
  const particle = document.createElement('div');
  particle.className = 'particle';
  particle.textContent = ['🚀', '💥', '⭐', '🌟', '✨', '🎯'][Math.floor(Math.random() * 6)];
  particle.style.left = Math.random() * 100 + '%';
  particle.style.fontSize = (1.5 + Math.random() * 1) + 'rem';
  particle.style.color = ['#ff0080', '#ff8000', '#8000ff', '#0080ff'][Math.floor(Math.random() * 4)];
  particle.style.animationDuration = '3s';
  
  particleContainer.appendChild(particle);
  
  setTimeout(() => {
    if (particle.parentNode) {
      particle.parentNode.removeChild(particle);
    }
  }, 3000);
}
