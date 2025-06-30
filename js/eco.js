const title = document.getElementById('title');
const subtitle = document.getElementById('subtitle');
const variants = [
  "Sibilum", "sibilum", "𝓢𝓲𝓫𝓲𝓵𝓾𝓶", "Ｓｉｂｉｌｕｍ", "s!bilum", "S🜁bilum", "siB!LUM", "Śïbįlūm"
];

let firstTitleDone = false;
let i = 0;

function animateText(text, delay = 260) {
  return new Promise(resolve => {
    title.innerHTML = '';
    let j = 0;
    const interval = setInterval(() => {
      if (j >= text.length) {
        clearInterval(interval);
        resolve();
        return;
      }
      const span = document.createElement('span');
      span.textContent = text[j];
      span.style.fontSize = Math.random() > 0.5 ? '48px' : '42px';
      span.style.fontWeight = Math.random() > 0.5 ? 'bold' : 'normal';
      span.style.color = Math.random() > 0.5 ? '#fbd0ff' : '#dab3f7';
      title.appendChild(span);
      j++;
    }, delay);
  });
}

async function startAnimationLoop() {
  await new Promise(res => setTimeout(res, 1000));

  while (true) {
    await animateText(variants[i % variants.length]);

    if (!firstTitleDone) {
      firstTitleDone = true;
      setTimeout(() => {
        subtitle.textContent = "Presiona para continuar...";
        subtitle.style.opacity = 1;
      }, 10000);
    }

    i++;
    await new Promise(res => setTimeout(res, 4500));
  }
}

window.onload = startAnimationLoop;
