const canvas = document.getElementById('matrix');
const ctx = canvas.getContext('2d');
const videoLink = "https://drive.google.com/file/d/1F7gyWmcn2E9V3G7Q4pDshOkPtFjq8Tcc/view?usp=sharing";

canvas.height = window.innerHeight;
canvas.width = window.innerWidth;
const phrase = "HAPPY BIRTHDAY ";
const charArray = phrase.split("");
const fontSize = 18;
const columns = canvas.width / fontSize;
const drops = Array(Math.floor(columns)).fill(1);

function drawMatrix() {
    ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#FF1493";
    ctx.font = fontSize + "px monospace";
    drops.forEach((y, i) => {
        const text = charArray[Math.floor(Math.random() * charArray.length)];
        ctx.fillText(text, i * fontSize, y * fontSize);
        if (y * fontSize > canvas.height && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
    });
}
setInterval(drawMatrix, 35);

const mainText = document.getElementById('main-text');
const heartContainer = document.getElementById('heart-container');

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
    const num = 150;
    const scale = 12;
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
    setTimeout(explode, 3500);
}

function explode() {
    document.querySelectorAll('.pixel').forEach(p => {
        p.style.transform = `translate(${(Math.random()-0.5)*1000}px, ${(Math.random()-0.5)*1000}px) scale(0)`;
        p.style.opacity = '0';
    });
    setTimeout(() => {
        document.body.innerHTML = `
            <div style="display:flex; flex-direction:column; align-items:center; justify-content:center; height:100vh; background:black; text-align:center; padding: 20px;">
                <p style="color:white; font-size:24px; margin-bottom:30px; font-family:sans-serif; text-shadow: 0 0 10px #FF1493;">Твій сюрприз чекає тут! ✨</p>
                <button onclick="window.location.href='${videoLink}'" style="padding:20px 40px; font-size:20px; background:#FF1493; color:white; border:none; border-radius:50px; cursor:pointer; font-weight:bold; box-shadow: 0 0 20px #FF1493; animation: pulse 1.5s infinite;">
                    ВІДКРИТИ ВІДЕО
                </button>
                <style>
                    @keyframes pulse { 0% { transform: scale(1); } 50% { transform: scale(1.05); } 100% { transform: scale(1); } }
                </style>
            </div>
        `;
    }, 1000);
}
setTimeout(runSequence, 1000);
