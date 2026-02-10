let breathingInterval = null;
let sosInterval = null;

function setBreathingMode(mode) {
  const title = document.getElementById('breathing-title');
  const text = document.getElementById('breathing-text');

  if (mode === 'sos') {
    title.textContent = translations[currentLang].breathing_title_sos || "Respiração SOS — estou aqui com você";
    text.textContent = translations[currentLang].breathing_text_sos || "Inspire 4s, segure 4s, expire 4s. Vamos juntos, sem pressa.";
  } else if (mode === 'sleep') {
    title.textContent = translations[currentLang].breathing_title_sleep || "Respiração para dormir — acalme o corpo, suavize a mente";
    text.textContent = translations[currentLang].breathing_text_sleep || "Inspire 4s, segure 7s, expire 8s. Deixe o corpo afrouxar.";
  } else if (mode === 'relax') {
    title.textContent = translations[currentLang].breathing_title_relax || "Respiração para relaxar — um momento só seu";
    text.textContent = translations[currentLang].breathing_text_relax || "Inspire profundo, segure um pouco, solte devagar.";
  }
}

function startBreathing(mode) {
  stopBreathing();
  setBreathingMode(mode);

  const circle = document.getElementById('breathing-circle');
  const text = document.getElementById('breathing-text');

  let step = 0;

  if (mode === 'sleep') {
    breathingInterval = setInterval(() => {
      step = (step + 1) % 3;
      if (step === 0) {
        circle.style.transform = 'scale(1.0)';
        text.textContent = translations[currentLang].sleep_inhale || 'Inspire (4s)...';
      } else if (step === 1) {
        circle.style.transform = 'scale(1.15)';
        text.textContent = translations[currentLang].sleep_hold || 'Segure (7s)...';
      } else {
        circle.style.transform = 'scale(0.85)';
        text.textContent = translations[currentLang].sleep_exhale || 'Expire (8s)...';
      }
    }, 4000);

  } else if (mode === 'relax') {
    breathingInterval = setInterval(() => {
      step = (step + 1) % 2;
      if (step === 0) {
        circle.style.transform = 'scale(1.1)';
        text.textContent = translations[currentLang].relax_inhale || 'Inspire devagar...';
      } else {
        circle.style.transform = 'scale(0.9)';
        text.textContent = translations[currentLang].relax_exhale || 'Solte a tensão...';
      }
    }, 5000);

  } else {
    breathingInterval = setInterval(() => {
      step = (step + 1) % 3;
      if (step === 0) {
        circle.style.transform = 'scale(1.1)';
        text.textContent = translations[currentLang].sos_inhale || 'Inspire (4s)...';
      } else if (step === 1) {
        circle.style.transform = 'scale(1.1)';
        text.textContent = translations[currentLang].sos_hold || 'Segure (4s)...';
      } else {
        circle.style.transform = 'scale(0.9)';
        text.textContent = translations[currentLang].sos_exhale || 'Expire (4s)...';
      }
    }, 4000);
  }
}

function stopBreathing() {
  const circle = document.getElementById('breathing-circle');
  const text = document.getElementById('breathing-text');
  clearInterval(breathingInterval);
  breathingInterval = null;
  circle.style.transform = 'scale(1)';
  text.textContent = translations[currentLang].breathing_paused || 'Exercício pausado. Quando quiser, podemos continuar juntos.';
}

/* SOS modal */

function openSOS() {
  const modal = document.getElementById('sos-modal');
  modal.classList.add('active');
  startSOSBreathing();
}

function closeSOS() {
  const modal = document.getElementById('sos-modal');
  modal.classList.remove('active');
  stopSOSBreathing();
}

function startSOSBreathing() {
  stopSOSBreathing();
  const circle = document.getElementById('sos-circle');
  const text = document.getElementById('sos-text');
  let step = 0;

  sosInterval = setInterval(() => {
    step = (step + 1) % 3;
    if (step === 0) {
      circle.style.transform = 'scale(1.1)';
      text.textContent = translations[currentLang].sos_inhale || 'Inspire (4s)...';
    } else if (step === 1) {
      circle.style.transform = 'scale(1.1)';
      text.textContent = translations[currentLang].sos_hold || 'Segure (4s)...';
    } else {
      circle.style.transform = 'scale(0.9)';
      text.textContent = translations[currentLang].sos_exhale || 'Expire (4s)...';
    }
  }, 4000);
}

function stopSOSBreathing() {
  const circle = document.getElementById('sos-circle');
  const text = document.getElementById('sos-text');
  clearInterval(sosInterval);
  sosInterval = null;
  if (circle && text) {
    circle.style.transform = 'scale(1)';
    text.textContent = translations[currentLang].sos_modal_cycle || 'Inspire...';
  }
}

/* Idiomas */
let currentLang = "pt";

function changeLanguage(lang) {
  currentLang = lang;
  document.documentElement.lang = lang;

  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.getAttribute("data-i18n");
    el.textContent = translations[lang][key];
  });
}

