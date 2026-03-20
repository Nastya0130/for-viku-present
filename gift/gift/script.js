const canvas = document.getElementById('matrix');
const ctx = canvas.getContext('2d');

// Використовуємо найнадійніший формат посилання
const videoLink = "https://docs.google.com/uc?export=download&id=1F7gyWmcn2E9V3G7Q4pDshOkPtFjq8Tcc";

canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

// Букви + сердечка разом
const symbols = "HAPPYBIRTHDAY♥♥♥".split("");
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

video.src = videoLink;
video.load();

// Активуємо відео при першому торканні екрана
document.addEventListener('touchstart', () => {
    video.play().then(() => { video.pause(); });
}, {once: true});

const sequence = ["3", "2", "1", "Вікуся 🤍"];
let step = 0;

function runSequence() {
    if (step < sequence.length) {
        mainText.innerHTML = sequence[step];
        mainText.classList.add('show');
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
    const heartContainer = document.getElementById('heart-container');
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
        
        video.muted = true; // Автозапуск на телефонах тільки без звуку
        video.play();
    }, 600);
