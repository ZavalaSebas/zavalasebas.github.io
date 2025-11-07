// Frases inspiradoras para tools
const frases = [
  "una herramienta es una extensión de tu mente.",
  "cada decisión se vuelve más ligera con ayuda.",
  "construir también es elegir bien.",
  "tu caja de herramientas digitales te espera.",
  "a veces lo simple, decide lo complejo."
];

document.addEventListener("DOMContentLoaded", () => {
  const footer = document.getElementById("frase-footer");
  footer.textContent = frases[Math.floor(Math.random() * frases.length)];
  // Tabbar indicador (scoped a .tools-tabbar)
  const tabs=document.querySelectorAll('.tools-tabbar .tabbar-item');
  const indicator=document.querySelector('.tools-tabbar .tabbar-indicator');
  const currentFile=location.pathname.split('/').pop().toLowerCase();
  tabs.forEach(tab=>{
    const href=tab.getAttribute('href');
    if(!href)return; const file=href.split('/').pop().toLowerCase();
    if(file===currentFile) tab.classList.add('active');
  });
  requestAnimationFrame(()=>moveIndicator());
  function moveIndicator(target){
    const active=target||document.querySelector('.tools-tabbar .tabbar-item.active')||tabs[0];
    if(!active||!indicator)return;
    const parent=indicator.parentElement;
    const width=active.offsetWidth*0.6;
    const x=active.offsetLeft + (active.offsetWidth - width)/2 - (parent.scrollLeft||0);
    indicator.style.width=width+'px';
    indicator.style.transform=`translateX(${x}px)`;
  }
  tabs.forEach(t=>t.addEventListener('click', e=>moveIndicator(e.currentTarget)));
});
