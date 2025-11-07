// Footer frases
const frases = [
  "¡Ditto al ataque!",
  "video mejorado un 300%",
  "zoom divertido activado",
  "¡más cerca, más cute!",
  "transmitiendo ondas de fiesta 🎉"
];

document.getElementById("frase-footer").textContent =
  frases[Math.floor(Math.random() * frases.length)];

const audio = document.getElementById("audioAmbiente");
const btn = document.getElementById("audioBtn");

// Haptic + ripple helpers
function haptic(ms=12){ try{ const ua=navigator.userActivation; if('vibrate' in navigator && ua && (ua.isActive||ua.hasBeenActive)) navigator.vibrate(ms);}catch(_){} }
function ripple(e, el){ const r=el.getBoundingClientRect(); const s=document.createElement('span'); s.className='ripple'; const size=Math.max(r.width,r.height); s.style.width=s.style.height=size+'px'; s.style.left=(e.clientX-r.left-size/2)+'px'; s.style.top=(e.clientY-r.top-size/2)+'px'; el.appendChild(s); setTimeout(()=>s.remove(),650); }

btn.addEventListener("pointerdown", e=>ripple(e, btn));
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

// Confetti
const canvas = document.getElementById("confetti-canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const ctx = canvas.getContext("2d");
const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const PIECES = prefersReduced ? 30 : 100;
const pieces = Array.from({ length: PIECES }, () => ({
  x: Math.random() * canvas.width,
  y: Math.random() * canvas.height,
  size: Math.random() * 6 + 4,
  color: `hsl(${Math.random() * 360}, 80%, 60%)`,
  speedY: Math.random() * 3 + 1,
  rotation: Math.random() * 360
}));

function update() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let p of pieces) {
    p.y += p.speedY;
    p.rotation += 2;
    if (p.y > canvas.height) {
      p.y = -10;
      p.x = Math.random() * canvas.width;
    }
    ctx.save();
    ctx.translate(p.x, p.y);
    ctx.rotate((p.rotation * Math.PI) / 180);
    ctx.fillStyle = p.color;
    ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
    ctx.restore();
  }
  if (!prefersReduced) requestAnimationFrame(update);
}
update();

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
    const parent=indicator.parentElement; // nav
    const width=active.offsetWidth*0.6;
    const x=active.offsetLeft + (active.offsetWidth - width)/2 - (parent.scrollLeft||0);
    indicator.style.width=width+'px';
    indicator.style.transform=`translateX(${x}px)`;
  }
  tabs.forEach(t=>t.addEventListener('click', e=>moveIndicator(e.currentTarget)));
});

// Evitar zoom por doble tap en iOS
let lastTouchTime=0;
document.addEventListener('touchend', e=>{ const now=Date.now(); if(now-lastTouchTime<=350){ e.preventDefault(); } lastTouchTime=now; }, {passive:false});
