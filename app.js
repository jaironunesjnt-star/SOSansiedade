let currentLang = "pt";
let interval;
let phaseTimeout;

const circle = document.getElementById("circle");
const breathText = document.getElementById("breath-text");
const title = document.getElementById("title");
const langSelect = document.getElementById("language");

langSelect.addEventListener("change", e => {
  currentLang = e.target.value;
  updateTexts();
});

function updateTexts() {
  title.textContent = translations[currentLang].title;
  breathText.textContent = translations[currentLang].ready;
}

function startBreathing(mode) {
  stopBreathing();

  if (mode === "sos") {
    cycle(4, 4, 4);
  }

  if (mode === "sleep") {
    cycle(4, 7, 8);
  }

  if (mode === "relax") {
    relaxCycle();
  }
}

function cycle(inhale, hold, exhale) {
  function run() {
    breathText.textContent = translations[currentLang].inhale;
    circle.style.transform = "scale(1.1)";

    phaseTimeout = setTimeout(() => {
      breathText.textContent = translations[currentLang].hold;

      phaseTimeout = setTimeout(() => {
        breathText.textContent = translations[currentLang].exhale;
        circle.style.transform = "scale(0.8)";
      }, hold * 1000);

    }, inhale * 1000);
  }

  run();
  interval = setInterval(run, (inhale + hold + exhale) * 1000);
}

function relaxCycle() {
  function run() {
    breathText.textContent = translations[currentLang].inhale;
    circle.style.transform = "scale(1.1)";

    phaseTimeout = setTimeout(() => {
      breathText.textContent = translations[currentLang].exhale;
      circle.style.transform = "scale(0.8)";
    }, 5000);
  }

  run();
  interval = setInterval(run, 10000);
}

function stopBreathing() {
  clearInterval(interval);
  clearTimeout(phaseTimeout);
  circle.style.transform = "scale(0.8)";
  breathText.textContent = translations[currentLang].ready;
}

updateTexts();

