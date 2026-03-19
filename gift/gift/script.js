const canvas = document.getElementById('matrix');
const ctx = canvas.getContext('2d');

const videoLink = "https://docs.google.com/uc?export=download&id=1F7gyWmcn2E9V3G7Q4pDshOkPtFjq8Tcc";

canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

const symbols = "HAPPYBIRTHDAY♥♥♥♥♥♥".split("");
const fontSize = 18;
const columns = Math.floor(canvas.width / fontSize);
const drops = Array(columns).fill(1);

// Визначаємо "зону відчуження" для тексту (стовпчики по центру)
const centerCol = Math.floor(columns / 2);
const safeZoneWidth = 8; // Скільки стовпчиків зліва і справа від центру будуть порожніми

function drawMatrix() {
    ctx.fillStyle = "rgba(0, 0, 0, 0.1)"; // Трохи темніше для чіткості
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.font = fontSize + "px monospace";

    drops.forEach((y, i) => {
        // ПЕРЕВІРКА: якщо стовпчик в зоні тексту, пропускаємо малювання
        const isInSafeZone = i > (centerCol - safeZoneWidth) && i < (centerCol + safeZoneWidth);
        
        // Малюємо символ тільки якщо він НЕ в зоні тексту АБО якщо він вже впав нижче центру
        if (!isInSafeZone || (y * fontSize > canvas.height * 0.65 || y * fontSize < canvas.height * 0.35)) {
            const symbol = symbols[Math.floor(Math.random() * symbols.length)];
            ctx.fillStyle = (symbol === "♥") ? "#FF69B4" : "#FF1493";
            ctx.fillText(symbol, i * fontSize, y * fontSize);
        }
        
        if (y * fontSize > canvas.height && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
    });
}
setInterval(drawMatrix, 35);

const video = document.getElementById('birthday-video');
const videoContainer = document.getElementById('video-container');
const mainText = document.getElementById('main-text');
const heartContainer = document.getElementById('heart-container');

video.src = videoLink;

document.addEventListener('touchstart', () => {
    video.play().then(() => { video.pause(); });
}, {once: true});

const sequence = ["3", "2", "1", "Вікуся 🤍"];
let step = 0;

function runSequence() {
    if (step < sequence.length) {
        mainText.innerHTML = sequence[step];
        mainText.classList.add('show');
        
        // Фіксуємо стиль, щоб нічого не з'їжджало
        Object.assign(mainText.style, {
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            position: "absolute",
            left: "0",
            top: "50%",
            transform: "translateY(-50%)",
            color: "white",
            fontSize: "55px",
            fontWeight: "bold",
            zIndex: "100",
            textShadow: "0 0 15px rgba(255, 20, 147, 0.8)"
        });

        setTimeout(() => {
            mainText.classList.remove('show');
            step++;
            setTimeout(runSequence, 600);
        }, 1200);
    } else {
        createHeart();
    }
}

function createHeart() {
    const num = 120;
    const scale = 11;
    for (let i = 0; i < num; i++) {
        const a = i * Math.PI * 2 / num;
        const x = scale * (16 * Math.pow(Math.sin(a), 3));
        const y = -scale * (13 * Math.cos(a) - 5 * Math.cos(2*a) - 2 * Math.cos(3*a) - Math.cos(4*a));
        const p = document.createElement("div");
        p.className = "pixel";
        p.style.left = (window.innerWidth/2 + x) + "px";
        p.style.top = (window.innerHeight/2 + y) + "px";
        heartContainer.appendChild(p);
        setTimeout(() => p.classList.add('show'), i * 10);
    }
    setTimeout(explode, 3000);
}

function explode() {
    document.querySelectorAll('.pixel').forEach(p => {
        p.style.transform = `translate(${(Math.random()-0.5)*1
