// --- Frases dinámicas ---
const frases = [
  "el ruido interno se hace visible",
  "pensamientos entrelazados en pixeles",
  "un espacio para el caos creativo",
  "donde las ideas chocan y respiran"
];

document.getElementById("frase-footer").textContent =
  frases[Math.floor(Math.random() * frases.length)];

// --- Audio + haptic/ripple ---
const audio = document.getElementById("audioAmbiente");
const btn = document.getElementById("audioBtn");

function haptic(ms=12){
  try { const ua=navigator.userActivation; if('vibrate' in navigator && ua && (ua.isActive||ua.hasBeenActive)) navigator.vibrate(ms);} catch(_){}
}
function ripple(e, el){
  const r=el.getBoundingClientRect();
  const s=document.createElement('span');
  s.className='ripple';
  const size=Math.max(r.width,r.height);
  s.style.width=s.style.height=size+'px';
  s.style.left=(e.clientX-r.left-size/2)+'px';
  s.style.top=(e.clientY-r.top-size/2)+'px';
  el.appendChild(s);
  setTimeout(()=>s.remove(),650);
}

btn.addEventListener('pointerdown', e=>ripple(e,btn));
btn.addEventListener("click", () => {
  if (audio.paused) {
    audio.play();
    btn.textContent = "🔊";
  } else {
    audio.pause();
    btn.textContent = "🎧";
  }
  haptic(10);
});

// --- PARTICULAS ---
const canvas = document.getElementById("particleCanvas");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

resizeCanvas();
window.addEventListener("resize", resizeCanvas);

// Crear partículas (respeta reduced motion)
const particles = [];
const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const particleCount = prefersReduced ? 50 : 120;

for (let i = 0; i < particleCount; i++) {
  particles.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    size: Math.random() * 4 + 1,
    speedX: (Math.random() - 0.5) * 0.6,
    speedY: (Math.random() - 0.5) * 0.6
  });
}

function drawParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach(p => {
    ctx.fillStyle = "rgba(255, 85, 85, 0.8)"; // rojo visible
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
    ctx.fill();
    p.x += p.speedX;
    p.y += p.speedY;

    // Reset si sale de pantalla
    if (p.x > canvas.width) p.x = 0;
    if (p.x < 0) p.x = canvas.width;
    if (p.y > canvas.height) p.y = 0;
    if (p.y < 0) p.y = canvas.height;
  });

  if(!prefersReduced) requestAnimationFrame(drawParticles);
}

drawParticles();

// --- Partículas al mover el cursor ---
document.addEventListener("mousemove", e => {
  particles.push({
    x: e.clientX,
    y: e.clientY,
    size: Math.random() * 3 + 1,
    speedX: (Math.random() - 0.5) * 0.5,
    speedY: (Math.random() - 0.5) * 0.5
  });

  if (particles.length > 200) particles.shift(); // limitar cantidad
});

const cards = document.querySelectorAll(".card");

cards.forEach(card => {
  card.addEventListener("mouseenter", e => {
    for (let i = 0; i < 10; i++) {
      particles.push({
        x: e.clientX + (Math.random()*30-15),
        y: e.clientY + (Math.random()*30-15),
        size: Math.random() * 3 + 1,
        speedX: (Math.random()-0.5)*1,
        speedY: (Math.random()-0.5)*1
      });
    }
  });
  card.addEventListener('pointerdown', e=>ripple(e,card));
  card.addEventListener('click', ()=>haptic(8));
});

// Tabbar indicador y toques
document.addEventListener('DOMContentLoaded', ()=>{
  const tabs=document.querySelectorAll('.mobile-tabbar .tabbar-item');
  const indicator=document.querySelector('.tabbar-indicator');
  const currentFile=location.pathname.split('/').pop().toLowerCase();
  tabs.forEach(tab=>{
    const href=tab.getAttribute('href');
    if(!href) return; const file=href.split('/').pop().toLowerCase();
    if(file===currentFile) tab.classList.add('active');
    tab.addEventListener('pointerdown', e=>ripple(e,tab));
    tab.addEventListener('click', ()=>haptic(12));
    tab.addEventListener('touchend', ()=>haptic(12), {passive:true});
  });
  requestAnimationFrame(()=>moveIndicator());
  function moveIndicator(target){
    const active=target||document.querySelector('.mobile-tabbar .tabbar-item.active')||tabs[0];
    if(!active||!indicator) return;
    const rect=active.getBoundingClientRect();
    const parentRect=active.parentElement.getBoundingClientRect();
    const width=rect.width*0.55;
    const x=rect.left-parentRect.left+(rect.width-width)/2;
    indicator.style.width=width+'px';
    indicator.style.transform=`translateX(${x}px)`;
  }
  tabs.forEach(t=>t.addEventListener('click', e=>moveIndicator(e.currentTarget)));
});

// Evitar zoom doble tap
let lastTouchTime=0;
document.addEventListener('touchend', e=>{ const now=Date.now(); if(now-lastTouchTime<=350){ e.preventDefault(); } lastTouchTime=now; }, {passive:false});
