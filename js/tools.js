const frases = [
  "herramientas retro // futuro a color",
  "tu caja de herramientas vintage",
  "construir con estilo // crear en colores",
  "cada herramienta tiene su eco rosa",
  "soluciones con vibra dorada",
  "play // build // create",
  "ingenieria grunge // resultados brillantes"
];

document.addEventListener("DOMContentLoaded", () => {
  const footer = document.getElementById("frase-footer");
  footer.textContent = frases[Math.floor(Math.random() * frases.length)];
  const tabs = document.querySelectorAll('.tools-tabbar .tabbar-item');
  const indicator = document.querySelector('.tools-tabbar .tabbar-indicator');
  const currentFile = location.pathname.split('/').pop().toLowerCase();
  tabs.forEach(tab => {
    const href = tab.getAttribute('href');
    if (!href) return;
    const file = href.split('/').pop().toLowerCase();
    if (file === currentFile) tab.classList.add('active');
  });
  requestAnimationFrame(() => moveIndicator());
  function moveIndicator(target) {
    const active = target || document.querySelector('.tools-tabbar .tabbar-item.active') || tabs[0];
    if (!active || !indicator) return;
    const rect = active.getBoundingClientRect();
    const parentRect = active.parentElement.getBoundingClientRect();
    const width = rect.width * 0.55;
    const x = rect.left - parentRect.left + (rect.width - width)/2;
    indicator.style.width = width + 'px';
    indicator.style.transform = `translateX(${x}px)`;
  }
  tabs.forEach(t => t.addEventListener('click', e => moveIndicator(e.currentTarget)));
});
