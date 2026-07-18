const subtitlePhrases = [
  'Cuando amar duele porque parece incomodar.',
  'La tristeza no me quita el amor, solo lo vuelve frágil.',
  'A veces solo quiero quedarme en silencio y respirar.'
];

const affirmations = [
  'No eres una carga: estás aprendiendo a amar sin romperte.',
  'Tu intensidad también es cariño, solo necesita espacio seguro.',
  'Sentir mucho no te hace menos valioso, te hace humano.'
];

const footerPhrases = [
  'Aun en el vacío, hay algo de luz.',
  'Incluso en la desilusión, tu corazón sigue intentando amar bien.',
  'Todo va a estar bien, paso a paso.'
];

const subtitleEl = document.getElementById('void-subtitle');
const affirmationEl = document.getElementById('affirmation');
const footerEl = document.getElementById('void-footer-text');
const comfortBtn = document.getElementById('comfortBtn');
const comfortMsg = document.getElementById('comfortMsg');

if (subtitleEl) {
  subtitleEl.textContent = subtitlePhrases[Math.floor(Math.random() * subtitlePhrases.length)];
}

if (affirmationEl) {
  affirmationEl.textContent = affirmations[Math.floor(Math.random() * affirmations.length)];
}

if (footerEl) {
  footerEl.textContent = footerPhrases[Math.floor(Math.random() * footerPhrases.length)];
}

const fadeEls = document.querySelectorAll('.fade-in');
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

fadeEls.forEach((element) => observer.observe(element));

if (comfortBtn && comfortMsg) {
  comfortBtn.addEventListener('click', () => {
    comfortBtn.disabled = true;
    comfortMsg.textContent = 'Inhala... exhala... estoy contigo.';

    setTimeout(() => {
      comfortMsg.textContent = 'Todo va a estar bien. Mereces amor sin miedo.';
      comfortBtn.disabled = false;
    }, 10000);
  });
}
