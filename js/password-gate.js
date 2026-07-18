(function () {
  var PASSWORD = 'nirvana';
  var STORAGE_KEY = 'rockshow_v4_unlocked';

  var gate = document.getElementById('passwordGate');
  var input = document.getElementById('passwordInput');
  var btn = document.getElementById('passwordBtn');
  var error = document.getElementById('passwordError');
  var hint = document.getElementById('passwordHint');

  if (!gate) return;

  if (sessionStorage.getItem(STORAGE_KEY) === 'true') {
    return;
  }

  gate.classList.add('active');

  function tryUnlock() {
    var val = input.value.trim().toLowerCase();
    if (val === PASSWORD) {
      sessionStorage.setItem(STORAGE_KEY, 'true');
      gate.classList.remove('active');
      gate.addEventListener('transitionend', function () {
        gate.style.display = 'none';
      }, { once: true });
    } else {
      error.textContent = 'codigo incorrecto // intenta de nuevo';
      error.classList.add('visible');
      input.value = '';
      input.focus();
      input.style.borderColor = '#ff6b9d';
      setTimeout(function () {
        error.classList.remove('visible');
        input.style.borderColor = '';
      }, 1800);
    }
  }

  btn.addEventListener('click', tryUnlock);
  input.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') tryUnlock();
  });

  input.focus();

  if (hint) {
    hint.addEventListener('click', function () {
      hint.textContent = 'pista: smells like... (lowercase, una palabra)';
      setTimeout(function () {
        hint.textContent = '?';
      }, 3000);
    });
  }
})();
