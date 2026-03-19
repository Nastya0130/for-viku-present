const canvas = document.getElementById('matrix');
const ctx = canvas.getContext('2d');

// ПРЯМЕ ПОСИЛАННЯ (через uc?export=download)
const videoLink = "https://docs.google.com/uc?export=download&id=1F7gyWmcn2E9V3G7Q4pDshOkPtFjq8Tcc";

canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

// Символи для матриці: букви + сердечка
const symbols = "HAPPYBIRTHDAY♥❤❣❤".split("");
const fontSize = 18;
const columns = canvas.width / fontSize;
const drops = Array(Math.floor(columns)).fill(1);

function drawMatrix() {
    ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    ctx.font = fontSize + "px monospace";

    drops.forEach((y, i) => {
        const symbol = symbols[Math.floor(Math.random() * symbols.length)];
        
        // Якщо це сердечко — робимо його яскравішим
        if (symbol === "♥" || symbol === "❤" || symbol === "❣") {
            ctx.fillStyle = "#FF69B4"; // Яскраво-рожевий для сердечок
        } else {
            ctx.fillStyle = "#FF1493"; // Стандартний колір для букв
        }

        ctx.fillText(symbol, i * fontSize, y * fontSize);
        
        if (y * fontSize > canvas.height && Math.random() > 0.975) {
            drops[i] = 0;
        }
        drops[i]++;
    });
}
setInterval(drawMatrix, 35);

const mainText = document.getElementById('main-text');
const heartContainer = document.getElementById('heart-container');
const videoContainer = document.getElementById('video-container');
const video = document.getElementById('birthday-video');

// Завантажуємо відео заздалегідь
video.src = videoLink;
video.load();

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
        // Ховаємо матрицю і текст
        canvas.style.display = 'none';
        mainText.style.display = 'none';
        
        // Показуємо відео
        videoContainer.classList.add('show-flex');
        
        // На телефонах відео ТРЕБА запускати без звуку (muted), 
        // інакше воно просто не почнеться автоматично. 
        // Вікуся сама натисне на іконку звуку в плеєрі.
        video.muted = true;
        video.play();
    }, 800);
}

setTimeout(runSequence, 1000);
