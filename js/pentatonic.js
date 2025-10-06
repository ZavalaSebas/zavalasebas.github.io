// Animación de notas musicales flotantes
document.addEventListener('DOMContentLoaded', () => {
	const notes = ['♪', '♩', '♫', '♬', '♭', '♯'];
	const notesContainer = document.getElementById('notes-floating');
	function createNote() {
		const note = document.createElement('span');
		note.className = 'note';
		note.textContent = notes[Math.floor(Math.random() * notes.length)];
		note.style.left = Math.random() * 90 + 'vw';
		note.style.top = '100vh';
		note.style.animationDelay = (Math.random() * 5) + 's';
		notesContainer.appendChild(note);
		setTimeout(() => {
			note.remove();
		}, 7000);
	}
	setInterval(createNote, 1200);
	for (let i = 0; i < 6; i++) createNote();
});
titulo: "Time Adventure",
banda: "Rebecca Sugar",
descripcion: "Rebecca Sugar performs 'Time Adventure' from Adventure Time, presentado por Cartoon Network.",
video: "https://www.youtube.com/embed/Xr53S9vIbCE"
titulo: "Hasta la Raíz (Austin City Limits)",
banda: "Natalia Lafourcade",
descripcion: "Presentación en Austin City Limits donde Natalia interpreta 'Hasta la Raíz', tema titular de su álbum ganador de un Grammy.",
video: "https://www.youtube.com/embed/zayX1YXiP6Y"
