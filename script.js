
const screens = [...document.querySelectorAll(".screen")];
const music = document.getElementById("music");
const stars = document.getElementById("stars");
const confetti = document.getElementById("confetti");

let currentScreen = 0;
let musicStarted = false;

// Переключение экранов
function nextScreen() {
    if (currentScreen >= screens.length - 1) return;

    // Запускаем музыку после первого нажатия
    if (music && !musicStarted) {
        music.volume = 0.35;

        music.play()
            .then(() => {
                musicStarted = true;
            })
            .catch((error) => {
                console.log("Музыка не запустилась:", error);
            });
    }

    screens[currentScreen].classList.remove("active");
    currentScreen++;
    screens[currentScreen].classList.add("active");
}

// Создание звёзд
function createStars() {
    if (!stars) return;

    for (let i = 0; i < 100; i++) {
        const star = document.createElement("span");
        star.className = "star";
        star.style.left = Math.random() * 100 + "%";
        star.style.top = Math.random() * 100 + "%";
        star.style.animationDelay = Math.random() * 3 + "s";
        star.style.animationDuration = 2 + Math.random() * 3 + "s";
        stars.appendChild(star);
    }
}

// Падающие лепестки
function createPetal() {
    const petal = document.createElement("span");
    petal.className = "petal";
    petal.textContent = Math.random() > 0.5 ? "🌸" : "🌹";
    petal.style.left = Math.random() * 100 + "vw";
    petal.style.animationDuration = 7 + Math.random() * 7 + "s";
    petal.style.setProperty(
        "--drift",
        (Math.random() * 160 - 80) + "px"
    );

    document.body.appendChild(petal);

    setTimeout(() => petal.remove(), 15000);
}

// Праздничная анимация
function celebrate() {
    if (!confetti) return;

    const symbols = ["❤️", "💖", "✨", "💕", "🌸"];

    for (let i = 0; i < 65; i++) {
        const piece = document.createElement("span");
        piece.className = "confetti-piece";
        piece.textContent =
            symbols[Math.floor(Math.random() * symbols.length)];

        piece.style.left = Math.random() * 100 + "%";
        piece.style.animationDuration = 2 + Math.random() * 3 + "s";
        piece.style.setProperty(
            "--drift",
            (Math.random() * 240 - 120) + "px"
        );
        piece.style.fontSize = 12 + Math.random() * 16 + "px";

        confetti.appendChild(piece);

        setTimeout(() => piece.remove(), 5500);
    }
}

// Кнопки финального экрана
const yesButton = document.getElementById("yes");
const noButton = document.getElementById("no");


if (yesButton) {
    yesButton.addEventListener("click", () => {
        const card = screens[currentScreen].querySelector(".glass");

        if (card) {
            card.innerHTML = `
                <h1>Спасибо, Настя ❤️</h1>
                <p>
                    Мне очень приятно! 🥰
                    <br><br>
                    Тогда договорились — дату и детали
                    нашего вечера выберем вместе.
                </p>
                <div style="font-size: 2rem">💖 ✨ 🌹</div>
            `;
        }

        celebrate();
    });
}


if (noButton) {
    const buttonsArea = noButton.parentElement;

    function moveNoButton() {
        const maxX = Math.max(
            0,
            buttonsArea.clientWidth - noButton.offsetWidth
        );

        const maxY = Math.max(
            0,
            buttonsArea.clientHeight - noButton.offsetHeight
        );

        const x = Math.random() * maxX;
        const y = Math.random() * maxY;

        noButton.style.left = `${x}px`;
        noButton.style.top = `${y}px`;
    }

    // Убегает от курсора на компьютере
    noButton.addEventListener("pointerenter", (event) => {
        if (event.pointerType === "mouse") {
            moveNoButton();
        }
    });

    // Перемещается при попытке нажать на телефоне
    noButton.addEventListener("pointerdown", (event) => {
        if (event.pointerType !== "mouse") {
            event.preventDefault();
            moveNoButton();
        }
    });

    // Если всё-таки удалось нажать — показываем мягкий ответ
    noButton.addEventListener("click", () => {
        noButton.textContent = "Конечно, не торопись ❤️";
    });
}


createStars();
createPetal();
setInterval(createPetal, 1800);



