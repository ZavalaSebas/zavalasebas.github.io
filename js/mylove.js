const frases = [
  ":)",
  "Que carajos sigo haciendo aqui?",
  "A veces la extraño",
  "Cuanto tiempo nos queda?",
  "Sueño despierto a tu lado"
];

document.getElementById("frase-footer").textContent =
  frases[Math.floor(Math.random() * frases.length)];

const audio = document.getElementById("audioAmbiente");
const btn = document.getElementById("audioBtn");

btn.addEventListener("click", () => {
  if (audio.paused) {
    audio.play();
    btn.textContent = "🔊";
  } else {
    audio.pause();
    btn.textContent = "🎧";
  }
});

// --- Navegación inferior: activo + indicador ---
document.addEventListener('DOMContentLoaded', () => {
  const tabs = document.querySelectorAll('.mobile-tabbar .tabbar-item');
  const indicator = document.querySelector('.tabbar-indicator');
  const currentFile = location.pathname.split('/').pop().toLowerCase();
  tabs.forEach(tab => {
    const href = tab.getAttribute('href');
    if (!href) return;
    const file = href.split('/').pop().toLowerCase();
    if (file === currentFile) tab.classList.add('active');

    // Ripple + háptico
    tab.addEventListener('pointerdown', (e) => ripple(e, tab));
    const vibrateHandler = () => haptic(12);
    tab.addEventListener('click', vibrateHandler);
    tab.addEventListener('touchend', vibrateHandler, { passive: true });
  });
  requestAnimationFrame(() => moveIndicator());

  function moveIndicator(target) {
    const active = target || document.querySelector('.mobile-tabbar .tabbar-item.active') || tabs[0];
    if (!active || !indicator) return;
    const rect = active.getBoundingClientRect();
    const parentRect = active.parentElement.getBoundingClientRect();
    const width = rect.width * 0.55;
    const x = rect.left - parentRect.left + (rect.width - width)/2;
    indicator.style.width = width + 'px';
    indicator.style.transform = `translateX(${x}px)`;
  }
  tabs.forEach(t => t.addEventListener('click', e => moveIndicator(e.currentTarget)));

  // Tilt 3D en cards + neon
  const cards = document.querySelectorAll('.card');
  cards.forEach(card => {
    card.classList.add('neon');
    const damp = 22; let rafId;
    function reset() { card.style.transform=''; }
    card.addEventListener('pointermove', e => {
      const r = card.getBoundingClientRect();
      const x = e.clientX - r.left; const y = e.clientY - r.top;
      const rx = ((y / r.height) - 0.5) * -damp;
      const ry = ((x / r.width) - 0.5) * damp;
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        card.style.transform = `perspective(600px) rotateX(${rx}deg) rotateY(${ry}deg) scale(1.04)`;
      });
    });
    ['pointerleave','pointercancel','blur'].forEach(evt => card.addEventListener(evt, () => reset()));
    card.addEventListener('pointerdown', () => card.style.transform += ' scale(0.98)');
    card.addEventListener('pointerup', () => card.style.transform = card.style.transform.replace(' scale(0.98)',''));

    // Ripple en cards
    card.addEventListener('pointerdown', (e) => ripple(e, card));
    card.addEventListener('click', () => haptic(10));
  });
});

// Ripple helper
function ripple(e, el) {
  const rect = el.getBoundingClientRect();
  const span = document.createElement('span');
  span.className = 'ripple';
  const size = Math.max(rect.width, rect.height);
  span.style.width = span.style.height = size + 'px';
  span.style.left = (e.clientX - rect.left - size / 2) + 'px';
  span.style.top = (e.clientY - rect.top - size / 2) + 'px';
  el.appendChild(span);
  setTimeout(() => span.remove(), 650);
}

// Vibración segura
function haptic(ms = 10) {
  try {
    const canVibrate = 'vibrate' in navigator;
    const ua = navigator.userActivation;
    const isActive = ua && (ua.isActive || ua.hasBeenActive);
    if (canVibrate && isActive) navigator.vibrate(ms);
  } catch (_) {}
}

// Evitar zoom de doble toque
let lastTouchTime = 0;
document.addEventListener('touchend', (e) => {
  const now = Date.now();
  if (now - lastTouchTime <= 350) { e.preventDefault(); }
  lastTouchTime = now;
}, { passive: false });
