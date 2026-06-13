// Terminal Loader
const terminalLoader = document.getElementById('terminalLoader');
let loaderActive = true;

// Mostrar loader solo la primera vez usando localStorage
const loaderShown = localStorage.getItem('rockshow_loader_shown');
if (!loaderShown) {
  document.addEventListener('keydown', hideLoader, { once: true });
  document.addEventListener('click', hideLoader, { once: true });
  setTimeout(() => {
    hideLoader();
  }, 6500);
} else {
  terminalLoader.style.display = 'none';
  loaderActive = false;
}

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
    localStorage.setItem('rockshow_loader_shown', '1');
  }, 1000);
}

const frases = [
  "colores infinitos // buena vibra",
  "todo suena mejor a color",
  "retro // futuro // ahora",
  "vintage revolution // V4",
  "smile // peace // rock",
  "cinta corriendo // señal abierta",
  "sesion a todo color",
  "frecuencia dorada // eco rosa",
  "play // record // repeat",
  "nueva era // nuevas voces",
  "sintetizando primavera",
  "rockshow vibra positiva"
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
      if (hint) hint.innerHTML = "🎶 retro vibra...";
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
    if (Math.random() < 0.008) {
      buffer[i] = 0xffffffff;
    }
  }

  ctx.putImageData(imageData, 0, 0);
}

setInterval(drawNoise, 100);

const logo = document.getElementById("logo");
const mainTitle = document.getElementById("mainTitle");

const glitchMap = {
  R: ['R', 'Я', '®', '℞', 'r', 'Ʀ'],
  O: ['O', '0', 'Θ', 'ø', 'o', '⭕'],
  C: ['C', '¢', '⊂', 'c', 'Č'],
  K: ['K', 'ʞ', 'κ', 'k', '₭'],
  S: ['S', '$', '§', 's', 'Ƨ', 'Š'],
  H: ['H', '#', 'Ħ', 'h', '♯'],
  W: ['W', 'Ш', 'w', 'ω'],
};

const originalText = "ROCKSHOW V4";

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

// Glitch óptico en título principal sin cambiar el layout
if (mainTitle) {
  mainTitle.textContent = originalText;
  mainTitle.setAttribute('data-text', originalText);
  mainTitle.classList.add('glitch-safe');
  setInterval(() => {
    mainTitle.classList.add('glitch-anim');
    setTimeout(() => mainTitle.classList.remove('glitch-anim'), 180);
  }, 4200);
}

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
const particleSymbols = ['♪', '♫', '★', '☆', '✦', '◆', '☮', '♥', '♦', '◉', '✧', '○'];

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
  if (Math.random() < 0.5) { // 50% de probabilidad
    createParticle();
  }
}, 3000 + Math.random() * 2000);

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
  customCursor.style.background = 'rgba(255, 215, 0, 0.4)';
});

document.addEventListener('mouseup', () => {
  customCursor.style.transform = 'scale(1)';
  customCursor.style.background = 'rgba(255, 215, 0, 0.15)';
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
  particle.style.color = ['#ff6b9d', '#ffd700', '#41e0b0', '#ff8a5c'][Math.floor(Math.random() * 4)];
  particle.style.animationDuration = '3s';
  
  particleContainer.appendChild(particle);
  
  setTimeout(() => {
    if (particle.parentNode) {
      particle.parentNode.removeChild(particle);
    }
  }, 3000);
}

// Activar estado activo de la barra inferior según página actual
document.addEventListener('DOMContentLoaded', () => {
  const currentFile = location.pathname.split('/').pop().toLowerCase();
  const tabs = document.querySelectorAll('.mobile-tabbar .tabbar-item');
  const indicator = document.querySelector('.tabbar-indicator');
  tabs.forEach(tab => {
    const href = tab.getAttribute('href');
    if (!href) return;
    const file = href.split('/').pop().toLowerCase();
    if (file === currentFile) {
      tab.classList.add('active');
    }

    // Feedback táctil
    tab.addEventListener('touchstart', () => tab.classList.add('touching'), { passive: true });
    tab.addEventListener('touchend', () => tab.classList.remove('touching'));
    tab.addEventListener('touchcancel', () => tab.classList.remove('touching'));
  });
  // Posicionar indicador inicial
  requestAnimationFrame(() => moveTabbarIndicator());

  function moveTabbarIndicator(target) {
    const active = target || document.querySelector('.mobile-tabbar .tabbar-item.active') || tabs[0];
    if (!active || !indicator) return;
    const rect = active.getBoundingClientRect();
    const parentRect = active.parentElement.getBoundingClientRect();
    const width = rect.width * 0.55;
    const x = rect.left - parentRect.left + (rect.width - width)/2;
    indicator.style.width = width + 'px';
    indicator.style.transform = `translateX(${x}px)`;
  }
  tabs.forEach(t => t.addEventListener('click', e => { moveTabbarIndicator(e.currentTarget); }));
  // Ripple + Haptics (vibración) en tarjetas y tabs
  const tappables = document.querySelectorAll('.card, .tabbar-item, #audioControl');
  tappables.forEach(el => {
    el.addEventListener('pointerdown', (e) => {
      // Ripple inmediato visual
      const rect = el.getBoundingClientRect();
      const ripple = document.createElement('span');
      ripple.className = 'ripple';
      const size = Math.max(rect.width, rect.height);
      ripple.style.width = ripple.style.height = size + 'px';
      ripple.style.left = (e.clientX - rect.left - size / 2) + 'px';
      ripple.style.top = (e.clientY - rect.top - size / 2) + 'px';
      el.appendChild(ripple);
      setTimeout(() => ripple.remove(), 650);
    });

    // Vibración solo en eventos con activación de usuario garantizada
    const vibrateHandler = () => haptic(12);
    el.addEventListener('click', vibrateHandler);
    el.addEventListener('touchend', vibrateHandler, { passive: true });
  });
  // Desactivar scroll global en home (índice) móvil
  try {
    const isHome = document.body.classList.contains('home');
    const isMobile = window.matchMedia('(max-width: 600px)').matches;
    if (isHome && isMobile) {
      document.documentElement.style.overflow = 'hidden';
    }
  } catch (_) {}
});

// Evitar zoom doble toque (gesto accidental)
let lastTouchTime = 0;
document.addEventListener('touchend', (e) => {
  const now = Date.now();
  if (now - lastTouchTime <= 350) {
    e.preventDefault();
  }
  lastTouchTime = now;
}, { passive: false });

// Scroll suave estilo app
document.documentElement.style.scrollBehavior = 'smooth';

// Desactivar cursor personalizado en dispositivos táctiles
try {
  const prefersCoarse = window.matchMedia('(pointer: coarse)');
  if (prefersCoarse && prefersCoarse.matches) {
    customCursor.style.display = 'none';
  }
} catch (_) {}

// Helper seguro para vibración bajo políticas de activación de usuario
function haptic(ms = 10) {
  try {
    const canVibrate = 'vibrate' in navigator;
    const ua = navigator.userActivation;
    const isActive = ua && (ua.isActive || ua.hasBeenActive);
    if (canVibrate && isActive) {
      navigator.vibrate(ms);
    }
  } catch (_) {
    /* silencioso */
  }
}

// Subtext: usar animación CSS existente de .hero p (sin rotación ni clases extra)

// Añadir glow respirante al título
const mainTitleEl = document.getElementById('mainTitle');
if (mainTitleEl) mainTitleEl.classList.add('breathing-glow');

// --- Tilt 3D en cards ---
const cards = document.querySelectorAll('.card');
cards.forEach(card => {
  const damp = 22;
  let rafId;
  function reset() { card.style.transform=''; card.style.setProperty('--rx','0'); card.style.setProperty('--ry','0'); }
  card.addEventListener('pointermove', e => {
    const r = card.getBoundingClientRect();
    const x = e.clientX - r.left;
    const y = e.clientY - r.top;
    const rx = ((y / r.height) - 0.5) * -damp;
    const ry = ((x / r.width) - 0.5) * damp;
    if (rafId) cancelAnimationFrame(rafId);
    rafId = requestAnimationFrame(() => {
      card.style.transform = `perspective(600px) rotateX(${rx}deg) rotateY(${ry}deg) scale(1.04)`;
    });
  });
  ['pointerleave','pointercancel','blur'].forEach(evt => card.addEventListener(evt, () => { reset(); }));
  card.addEventListener('pointerdown', () => card.style.transform += ' scale(0.98)');
  card.addEventListener('pointerup', () => card.style.transform = card.style.transform.replace(' scale(0.98)',''));
});
