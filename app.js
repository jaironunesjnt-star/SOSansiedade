let breathingInterval;
let currentMode = null;
let isBreathing = false;

function startBreathing(mode) {
    currentMode = mode;
    isBreathing = true;

    const title = document.getElementById("breathing-title");
    const text = document.getElementById("breathing-text");
    const circle = document.getElementById("breathing-circle");

    if (mode === "sos") {
        title.textContent = translations[currentLang].breathing_title_sos;
        text.textContent = translations[currentLang].breathing_text_sos;
        startSOSBreathing(circle);
    }

    if (mode === "sleep") {
        title.textContent = translations[currentLang].breathing_title_sleep;
        text.textContent = translations[currentLang].breathing_text_sleep;
        startSleepBreathing(circle);
    }

    if (mode === "relax") {
        title.textContent = translations[currentLang].breathing_title_relax;
        text.textContent = translations[currentLang].breathing_text_relax;
        startRelaxBreathing(circle);
    }
}

function stopBreathing() {
    isBreathing = false;
    clearInterval(breathingInterval);

    const circle = document.getElementById("breathing-circle");
    circle.style.transform = "scale(1)";
}

function startSOSBreathing(circle) {
    let phase = 0;

    breathingInterval = setInterval(() => {
        if (!isBreathing) return;

        if (phase === 0) {
            circle.style.transform = "scale(1.3)";
        } else if (phase === 1) {
            circle.style.transform = "scale(1.3)";
        } else if (phase === 2) {
            circle.style.transform = "scale(1)";
        }

        phase = (phase + 1) % 3;
    }, 4000);
}

function startSleepBreathing(circle) {
    let phase = 0;

    breathingInterval = setInterval(() => {
        if (!isBreathing) return;

        if (phase === 0) {
            circle.style.transform = "scale(1.3)";
        } else if (phase === 1) {
            circle.style.transform = "scale(1.3)";
        } else if (phase === 2) {
            circle.style.transform = "scale(1)";
        }

        phase = (phase + 1) % 3;
    }, 7000);
}

function startRelaxBreathing(circle) {
    let growing = true;

    breathingInterval = setInterval(() => {
        if (!isBreathing) return;

        if (growing) {
            circle.style.transform = "scale(1.3)";
        } else {
            circle.style.transform = "scale(1)";
        }

        growing = !growing;
    }, 5000);
}
