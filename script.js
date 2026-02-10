/* AJUSTE REAL DA ALTURA DO DISPOSITIVO */
function setFullHeight() {
  const vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
}

window.addEventListener('load', setFullHeight);
window.addEventListener('resize', setFullHeight);

/* CONTROLE DE TELAS */
function goToScreen(id) {
  document.querySelectorAll('.screen').forEach(screen => {
    screen.classList.remove('active');
  });
  document.getElementById(id).classList.add('active');
}

/* EXERCÍCIO */
let timerInterval;
let breathingInterval;
let remainingTime = 180; // 3 minutos

function startExercise(title) {
  document.getElementById('exercise-title').innerText = title;
  remainingTime = 180;
  document.getElementById('timer').innerText = "03:00";
  goToScreen('screen-breath');
}

function startBreathing() {
  const circle = document.getElementById('circle');
  const text = document.getElementById('breath-text');

  startTimer();

  breathingInterval = setInterval(() => {
    text.innerText = "Inspire";
    circle.classList.remove('exhale');

    setTimeout(() => {
      text.innerText = "Expire";
      circle.classList.add('exhale');
    }, 4000);
  }, 10000);
}

function startTimer() {
  timerInterval = setInterval(() => {
    remainingTime--;

    const minutes = String(Math.floor(remainingTime / 60)).padStart(2, '0');
    const seconds = String(remainingTime % 60).padStart(2, '0');
    document.getElementById('timer').innerText = `${minutes}:${seconds}`;

    if (remainingTime <= 0) {
      clearInterval(timerInterval);
      clearInterval(breathingInterval);
      goToScreen('screen-end');
    }
  }, 1000);
}
