const frases = [
  "this is the way",
  "i have spoken",
  "life finds a way",
  "theres no place like home",
  "smells like teen spirit",
  "sweet child o mine",
  "take on me",
  "dont stop believin",
  "everybody wants to rule the world",
  "love will tear us apart"
];

var footerEl = document.getElementById("frase-footer");
if (footerEl) footerEl.textContent = frases[Math.floor(Math.random() * frases.length)];

var audio = document.getElementById("bgAudio");
var btn = document.getElementById("audioBtn");

if (btn && audio) {
  btn.addEventListener("click", function() {
    if (audio.paused) {
      audio.play();
      btn.classList.add("active");
      btn.innerHTML = "&#128266;";
    } else {
      audio.pause();
      btn.classList.remove("active");
      btn.innerHTML = "&#127925;";
    }
  });
}

document.addEventListener('DOMContentLoaded', function() {
  var tabs = document.querySelectorAll('.tabbar .tabbar__item');
  var indicator = document.querySelector('.tabbar__indicator');
  var currentFile = location.pathname.split('/').pop().toLowerCase();

  tabs.forEach(function(tab) {
    var href = tab.getAttribute('href');
    if (!href) return;
    var file = href.split('/').pop().toLowerCase();
    if (file === currentFile) tab.classList.add('active');
  });

  if (indicator) {
    var active = document.querySelector('.tabbar .tabbar__item.active') || tabs[0];
    if (active) {
      var rect = active.getBoundingClientRect();
      var parentRect = active.parentElement.getBoundingClientRect();
      var width = rect.width * 0.55;
      var x = rect.left - parentRect.left + (rect.width - width) / 2;
      indicator.style.width = width + 'px';
      indicator.style.transform = 'translateX(' + x + 'px)';
    }
  }
});

var lastTouchTime = 0;
document.addEventListener('touchend', function(e) {
  var now = Date.now();
  if (now - lastTouchTime <= 350) { e.preventDefault(); }
  lastTouchTime = now;
}, { passive: false });
