const reproductorImg = document.querySelector('.reproductor__img');

const cancionNombre = document.querySelector('.reproductor__cancion-nombre');
const cancionAutor = document.querySelector('.reproductor__cancion-autor');

const progreso = document.getElementById('progreso');
const cancion = document.getElementById('cancion');

const iconoControl = document.getElementById('iconoControl');

const tiempoActual = document.getElementById('tiempoActual');
const tiempoRestante = document.getElementById('tiempoRestante');

const btnAtras = document.querySelector('.reproductor__controles-atras');
const btnIniciar = document.querySelector('.reproductor__controles-iniciar');
const btnSiguiente = document.querySelector('.reproductor__controles-siguiente');

const canciones = [
  {
    nombre: 'Vivo',
    autor: 'Gustavo Cerati',
    src: 'songs/Gustavo Cerati - Vivo (Official Audio).mp3'
  },
  {
    nombre: 'Tratame Suavemente',
    autor: 'Soda Stereo',
    src: 'songs/Soda Stereo - Tratame Suavemente (El Último Concierto).mp3'
  },
  {
    nombre: 'En La Ciudad De La Furia',
    autor: 'Soda Stereo',
    src: 'songs/Soda Stereo - En La Ciudad De La Furia (Gira Me Verás Volver).mp3'
  },
  {
    nombre: 'Signos',
    autor: 'Soda Stereo',
    src: 'songs/Soda Stereo - Signos (Gira Me Verás Volver).mp3'
  },
  {
    nombre: 'Tu Cicatriz En Mi',
    autor: 'Gustavo Cerati',
    src: 'songs/Tu Cicatriz En Mi.mp3'
  }
];

let indiceActual = 0;

function actualizarCancion() {
  const { nombre, autor, src } = canciones[indiceActual];
  cancionNombre.textContent = nombre;
  cancionAutor.textContent = autor;
  cancion.src = src;
};

function alternarReproduccion() {
  cancion.paused ? reproducir() : pausar();
}

function reproducir() {
  cancion.play();
  iconoControl.classList.add('bi-pause-fill');
  iconoControl.classList.remove('bi-play-fill');
  reproductorImg.classList.remove('reproductor__img--pausa');
}

function pausar() {
  cancion.pause();
  iconoControl.classList.add('bi-play-fill');
  iconoControl.classList.remove('bi-pause-fill');
  reproductorImg.classList.add('reproductor__img--pausa');
}

function cambiarCancion(direccion) {
  indiceActual = (indiceActual + direccion + canciones.length) % canciones.length;
  actualizarCancion();
  reproducir();
}

function actualizarProgreso() {
  if (!isNaN(cancion.duration)) {
    progreso.value = cancion.currentTime;
    tiempoActual.textContent = formatearTiempo(cancion.currentTime);
    const restante = cancion.duration - cancion.currentTime;
    tiempoRestante.textContent = `-${formatearTiempo(restante)}`;
  }
}

function formatearTiempo(segundos) {
  const minutos = Math.floor(segundos / 60);
  const seg = Math.floor(segundos % 60);
  return `${minutos}:${seg.toString().padStart(2, '0')}`;
}

function saltarTiempo() {
  cancion.currentTime = progreso.value;
}

btnAtras.addEventListener('click', () => cambiarCancion(-1));
btnIniciar.addEventListener('click', alternarReproduccion);
btnSiguiente.addEventListener('click', () => cambiarCancion(1));

cancion.addEventListener('loadedmetadata', function () {
  progreso.max = cancion.duration;
  progreso.value = cancion.currentTime;
  tiempoRestante.textContent = `-${formatearTiempo(cancion.duration)}`;
});

cancion.addEventListener('timeupdate', actualizarProgreso);
progreso.addEventListener('input', saltarTiempo);

actualizarCancion();