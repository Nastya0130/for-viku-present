const canvas = document.getElementById('matrix');
const ctx = canvas.getContext('2d');

// Пряме посилання на відео з Google Диску
const videoLink = "https://docs.google.com/uc?id=1F7gyWmcn2E9V3G7Q4pDshOkPtFjq8Tcc&export=download";

canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

const symbols = "HAPPYBIRTHDAY♥♥♥".split("");
const fontSize = 18;
const columns = Math.floor(canvas.width / fontSize);
const drops = Array(columns).fill(1);

function drawMatrix() {
    ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.font = fontSize + "px monospace";

    drops.forEach((y, i) => {
        // Тепер малюємо всюди, без обмежень і прямокутників
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
video.setAttribute('playsinline', ''); // Важливо для iPhone

// Активуємо відео при першому торканні екрана
document.addEventListener('touchstart', () => {
    video.play().then(() => { video.pause(); });
}, {once: true});

const sequence = ["3", "2", "1", "Вікуся 🤍"];
let step = 0;

function runSequence() {
    if (step < sequence.length) {
        mainText.innerHTML = sequence[step];
        Object.assign(mainText.style, {
            display: "flex",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: "100",
            color: "white",
            fontSize: "55px",
            whiteSpace: "nowrap",
            fontFamily: "sans-serif",
            textShadow: "0 0 10px rgba(255, 20, 147, 0.8)"
        });

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
    const num = 100;
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
        p.style.transform = `translate(${(Math.random()-0.5)*1000}px, ${(Math.random()-0.5)*1000}px) scale(0)`;
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
