const canciones = [
  "Let It Be - The Beatles",
  "Bohemian Rhapsody - Queen",
  "Stairway to Heaven - Led Zeppelin",
  "Imagine - John Lennon",
  "Hotel California - Eagles",
  "Sweet Child O' Mine - Guns N' Roses",
  "Smells Like Teen Spirit - Nirvana",
  "Wonderwall - Oasis",
  "Hey Jude - The Beatles",
  "Livin' on a Prayer - Bon Jovi",
  "Another Brick in the Wall - Pink Floyd",
  "Billie Jean - Michael Jackson",
  "Heroes - David Bowie",
  "Shallow - Lady Gaga & Bradley Cooper",
  "Preso - José José",
  "My Love - Paul McCartney and Wings"
];

document.getElementById('spinBtn').addEventListener('click', () => {
  const result = document.getElementById('result');
  result.textContent = '';
  result.classList.remove('show');
  setTimeout(() => {
    const random = Math.floor(Math.random() * canciones.length);
    result.textContent = `🎶 ${canciones[random]}`;
    result.classList.add('show');
  }, 600);
});
