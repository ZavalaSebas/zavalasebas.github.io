// ═══════════════════════════════════════════
// ROCKSHOW V4 — main.js
// ═══════════════════════════════════════════

(function () {
  'use strict';

  // ── Loader ──
  var loader = document.getElementById('loader');
  var loaderDismissed = false;

  function dismissLoader() {
    if (loaderDismissed) return;
    loaderDismissed = true;
    loader.classList.add('hide');
    localStorage.setItem('rockshow_v4_loaded', '1');
  }

  if (localStorage.getItem('rockshow_v4_loaded')) {
    loader.style.display = 'none';
  } else {
    document.addEventListener('keydown', dismissLoader, { once: true });
    document.addEventListener('click', dismissLoader, { once: true });
    setTimeout(dismissLoader, 5000);
  }

  // ── Footer phrases ──
  var phrases = [
    'wish you were here',
    'nevermind',
    'come as you are',
    'war never changes',
    'wake up, samurai',
    'may the force be with you',
    'nothing compares 2 u',
    'ad victoriam',
    'its dangerous to go alone',
    'do a barrel roll',
    'stay awhile and listen',
    'i shot the sheriff',
    'here we go again',
    'all your base are belong to us',
    'the cake is a lie',
    'press f to pay respects',
    'wasted',
    'fatality',
    'finish him',
    'game over',
    'just keep swimming',
    'to infinity and beyond',
    'youre a wizard, harry',
    'winter is coming',
    'bazinga',
    'excellent',
    'cowabunga',
    'wubba lubba dub dub',
    'show me the money',
    'say hello to my little friend',
    'i am inevitable',
    'this is the way',
    'i have spoken',
    'cheers, love',
    'potato potato',
    'theres no place like home',
    'life finds a way',
    'run',
    'hit me baby one more time',
    'smells like teen spirit',
    'another one bites the dust',
    'dont stop believin',
    'take on me',
    'everybody wants to rule the world',
    'sweet child o mine'
  ];
  var footerEl = document.getElementById('footerText');
  function rotateFooter() {
    if (footerEl) footerEl.textContent = phrases[Math.floor(Math.random() * phrases.length)];
  }
  rotateFooter();
  setInterval(rotateFooter, 5000);

  // ── Audio ──
  var audio = document.getElementById('bgAudio');
  var cassetteEl = document.getElementById('cassette');
  var btnPlay = document.getElementById('btnPlay');
  var btnPause = document.getElementById('btnPause');
  var btnStop = document.getElementById('btnStop');
  var audioOn = false;

  function setActiveBtn(btn) {
    btnPlay.classList.remove('active');
    btnPause.classList.remove('active');
    btnStop.classList.remove('active');
    if (btn) btn.classList.add('active');
  }

  function setAudioState(on) {
    audioOn = on;
    if (on) {
      cassetteEl.classList.add('playing');
      setActiveBtn(btnPlay);
    } else {
      cassetteEl.classList.remove('playing');
    }
  }

  if (btnPlay) {
    btnPlay.addEventListener('click', function () {
      if (!audioOn) {
        audio.muted = false;
        audio.play().then(function () { setAudioState(true); }).catch(function () {});
      }
    });
  }
  if (btnPause) {
    btnPause.addEventListener('click', function () {
      if (audioOn) {
        audio.pause();
        setAudioState(false);
        setActiveBtn(btnPause);
      }
    });
  }
  if (btnStop) {
    btnStop.addEventListener('click', function () {
      audio.pause();
      audio.currentTime = 0;
      setAudioState(false);
      setActiveBtn(btnStop);
    });
  }

  // ── Glitch canvas (static noise, no animation) ──
  var canvas = document.getElementById('glitchCanvas');
  if (canvas) {
    var ctx = canvas.getContext('2d');
    var scale = .25;
    canvas.width = Math.ceil(window.innerWidth * scale);
    canvas.height = Math.ceil(window.innerHeight * scale);
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    var imgData = ctx.createImageData(canvas.width, canvas.height);
    var buf = new Uint32Array(imgData.data.buffer);
    for (var i = 0; i < buf.length; i++) {
      if (Math.random() < 0.008) buf[i] = 0xffffffff;
    }
    ctx.putImageData(imgData, 0, 0);
  }

  // ── Tape counter (rAF-throttled scroll) ──
  var counterDigits = document.querySelectorAll('.cassette__counter-digit');
  if (counterDigits.length) {
    var ticking = false;
    function updateCounter() {
      var scrollH = document.documentElement.scrollHeight - window.innerHeight;
      var pct = scrollH > 0 ? Math.min(window.scrollY / scrollH, 1) : 0;
      var num = Math.floor(pct * 999);
      var str = ('00' + num).slice(-3);
      for (var d = 0; d < 3; d++) {
        if (counterDigits[d].textContent !== str[d]) {
          counterDigits[d].textContent = str[d];
        }
      }
      ticking = false;
    }
    window.addEventListener('scroll', function () {
      if (!ticking) { ticking = true; requestAnimationFrame(updateCounter); }
    }, { passive: true });
  }

  // ── Floating particles (pooled) ──
  var particleContainer = document.getElementById('particles');
  var symbols = ['\u266A', '\u266B', '\u2605', '\u2726', '\u2661', '\u25C6', '\u2736', '\u2606'];
  var particleColors = ['var(--pink)', 'var(--gold)', 'var(--mint)', 'var(--peach)'];
  var maxParticles = 6;
  var particles = [];

  for (var i = 0; i < maxParticles; i++) {
    var p = document.createElement('div');
    p.className = 'particle';
    p.textContent = symbols[i % symbols.length];
    p.style.opacity = '0';
    particleContainer.appendChild(p);
    particles.push(p);
  }

  function activateParticle(idx) {
    var p = particles[idx];
    p.textContent = symbols[Math.floor(Math.random() * symbols.length)];
    p.style.left = Math.random() * 100 + '%';
    p.style.bottom = '-20px';
    var dur = 10 + Math.random() * 12;
    p.style.animation = 'none';
    p.offsetHeight;
    p.style.animationDuration = dur + 's';
    p.style.fontSize = (.7 + Math.random() * .8) + 'rem';
    p.style.color = particleColors[Math.floor(Math.random() * 4)];
    p.style.animation = '';
  }

  var particleIdx = 0;
  setInterval(function () {
    if (Math.random() < .35) {
      activateParticle(particleIdx % maxParticles);
      particleIdx++;
    }
  }, 4500);

  // ── Underwater bubbles (pooled) ──
  var bubbleContainer = document.getElementById('bubbles');
  var maxBubbles = 8;
  var bubbles = [];

  if (bubbleContainer) {
    for (var j = 0; j < maxBubbles; j++) {
      var b = document.createElement('div');
      b.className = 'bubble';
      b.style.opacity = '0';
      bubbleContainer.appendChild(b);
      bubbles.push(b);
    }
  }

  var bubbleIdx = 0;
  function activateBubble(idx) {
    var b = bubbles[idx];
    var size = 4 + Math.random() * 16;
    b.style.width = size + 'px';
    b.style.height = size + 'px';
    b.style.left = Math.random() * 100 + '%';
    b.style.setProperty('--drift', (Math.random() * 60 - 30) + 'px');
    var dur = 6 + Math.random() * 10;
    b.style.animation = 'none';
    b.offsetHeight;
    b.style.animationDuration = dur + 's';
    b.style.animation = '';
  }

  setInterval(function () {
    if (Math.random() < .4 && bubbleContainer) {
      activateBubble(bubbleIdx % maxBubbles);
      bubbleIdx++;
    }
  }, 3000);

  // ── Logo glitch ──
  var logo = document.querySelector('.logo');
  var glitchMap = {
    R: ['R', '\u042F', '\u00AE'], O: ['O', '0', '\u0398'],
    C: ['C', '\u00A2', '\u222A'], K: ['K', '\u029E', '\u03BA'],
    S: ['S', '$', '\u00A7'], H: ['H', '#', '\u266F'], W: ['W', '\u0428', '\u03C9']
  };
  var logoBase = 'ROCKSHOW';

  function glitchLogo() {
    if (!logo) return;
    var result = '';
    for (var i = 0; i < logoBase.length; i++) {
      var c = logoBase[i];
      var opts = glitchMap[c.toUpperCase()];
      result += opts ? opts[Math.floor(Math.random() * opts.length)] : c;
    }
    if (result !== logo.textContent) logo.textContent = result;
  }
  setInterval(glitchLogo, 3000);

  // ── Konami Code ──
  var konami = [38,38,40,40,37,39,37,39,66,65];
  var konamiIdx = 0;
  var konamiActive = false;

  document.addEventListener('keydown', function (e) {
    if (e.keyCode === konami[konamiIdx]) {
      konamiIdx++;
      if (konamiIdx === konami.length) {
        konamiIdx = 0;
        if (!konamiActive) {
          konamiActive = true;
          document.body.classList.add('konami');
          setTimeout(function () {
            document.body.classList.remove('konami');
            konamiActive = false;
          }, 10000);
        }
      }
    } else {
      konamiIdx = 0;
    }
  });

  // ── Tabbar ──
  document.addEventListener('DOMContentLoaded', function () {
    var current = location.pathname.split('/').pop().toLowerCase();
    var tabs = document.querySelectorAll('.tabbar .tabbar__item');
    var indicator = document.querySelector('.tabbar__indicator');

    tabs.forEach(function (tab) {
      var href = tab.getAttribute('href');
      if (href && href.split('/').pop().toLowerCase() === current) {
        tab.classList.add('active');
      }
    });

    function moveIndicator(target) {
      var active = target || document.querySelector('.tabbar .tabbar__item.active') || tabs[0];
      if (!active || !indicator) return;
      var r = active.getBoundingClientRect();
      var pr = active.parentElement.getBoundingClientRect();
      var w = r.width * .55;
      var x = r.left - pr.left + (r.width - w) / 2;
      indicator.style.width = w + 'px';
      indicator.style.transform = 'translateX(' + x + 'px)';
    }

    requestAnimationFrame(function () { moveIndicator(); });
    tabs.forEach(function (t) { t.addEventListener('click', function (e) { moveIndicator(e.currentTarget); }); });
    window.addEventListener('resize', function () { moveIndicator(); });

    // touch feedback
    tabs.forEach(function (t) {
      t.addEventListener('touchstart', function () { t.style.background = 'rgba(255,60,120,.1)'; }, { passive: true });
      t.addEventListener('touchend', function () { t.style.background = ''; });
      t.addEventListener('touchcancel', function () { t.style.background = ''; });
    });
  });

  // ── Double-tap zoom prevent ──
  var lastTouch = 0;
  document.addEventListener('touchend', function (e) {
    var now = Date.now();
    if (now - lastTouch <= 350) e.preventDefault();
    lastTouch = now;
  }, { passive: false });

})();
