const canvas = document.getElementById('matrix');
const ctx = canvas.getContext('2d');

const videoLink = "https://docs.google.com/uc?export=download&id=1F7gyWmcn2E9V3G7Q4pDshOkPtFjq8Tcc";

canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

// СИМВОЛИ ДЛЯ ФОНУ (По всьому периметру)
const symbols = "HAPPYBIRTHDAY♥♥♥♥♥♥".split("");
const fontSize = 18;
const columns = canvas.width / fontSize;
const drops = Array(Math.floor(columns)).fill(1);

function drawMatrix() {
    ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.font = fontSize + "px monospace";

    drops.forEach((y, i) => {
        const symbol = symbols[Math.floor(Math.random() * symbols.length)];
        ctx.fillStyle = (symbol === "♥") ? "#FF69B4" : "#FF1493";
        ctx.fillText(symbol, i * fontSize, y * fontSize);
        
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
video.load();

// Хитрість для звуку при першому торканні
document.addEventListener('touchstart', () => {
    video.play().then(() => { video.pause(); });
}, {once: true});

// ПОСЛІДОВНІСТЬ ТЕКСТУ ПО ЦЕНТРУ
const sequence = ["3", "2", "1", "Вікуся 🤍"];
let step = 0;

function runSequence() {
    if (step < sequence.length) {
        // Очищуємо і ставимо новий текст
        mainText.innerHTML = sequence[step];
        mainText.classList.add('show');
        
        // Робимо так, щоб текст був чітко по центру в один рядок
        mainText.style.display = "flex";
        mainText.style.alignItems = "center";
        mainText.style.justifyContent = "center";
        mainText.style.width = "100%";
        mainText.style.whiteSpace = "nowrap"; // Щоб не переносило на новий рядок
        mainText.style.position = "absolute";
        mainText.style.left = "0";
        mainText.style.top = "50%";
        mainText.style.transform = "translateY(-50%)";
        mainText.style.color = "white"; // Колір тексту білий, щоб було видно на рожевому фоні
        mainText.style.fontSize = "48px"; // Збільшений розмір тексту
        mainText.style.fontFamily = "sans-serif"; // Змінений шрифт для чіткості
        mainText.style.zIndex = "10"; // Текст зверху матриці

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
    const num = 100;
    const scale = 10;
    for (let i = 0; i < num; i++) {
        const a = i * Math.PI * 2 / num;
        const x = scale * (16 * Math.pow(Math.sin(a), 3));
        const y = -scale * (13 * Math.cos(a) - 5 * Math.cos(2*a) - 2 * Math.cos(3*a) - Math.cos(4*a));
        const p = document.createElement("div");
        p.className = "pixel";
        p.style.left = (window.innerWidth/2 + x) + "px";
        p.style.top = (window.innerHeight/2 + y) + "px";
        p.style.zIndex = "20"; // Серце зверху всього
        heartContainer.appendChild(p);
        setTimeout(() => p.classList.add('show'), i * 10);
    }
    setTimeout(explode, 3000);
}

function explode() {
    document.querySelectorAll('.pixel').forEach(p => {
        p.style.transform = `translate(${(Math.random()-0.5)*800}px, ${(Math.random()-0.5)*800}px) scale(0)`;
        p.style.opacity = '0';
    });
    
    setTimeout(() => {
        canvas.style.display = 'none';
        mainText.style.display = 'none';
        videoContainer.classList.add('show-flex');
        
        video.muted = false;
        video.play().catch(() => {
            video.muted = true;
            video.play();
        });
    }, 600);
}

setTimeout(runSequence, 1000);
