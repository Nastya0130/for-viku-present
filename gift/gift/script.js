const canvas = document.getElementById('matrix');
const ctx = canvas.getContext('2d');
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

const phrase = "HAPPY BIRTHDAY ";
const charArray = phrase.split("");
const fontSize = 18;
const columns = canvas.width / fontSize;
const drops = [];
for (let x = 0; x < columns; x++) drops[x] = 1;

function drawMatrix() {
    ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#FF1493"; 
    ctx.font = fontSize + "px Courier New";
    for (let i = 0; i < drops.length; i++) {
        const text = charArray[Math.floor(drops[i]) % charArray.length];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
    }
}
setInterval(drawMatrix, 33);

// --- ЛОГІКА ПАДАЮЧИХ СЕРДЕЧОК НА ФОНІ ---
function createFallingHeart() {
    const heart = document.createElement('div');
    heart.classList.add('falling-heart');
    heart.innerHTML = '❤'; // Можна змінити на піксельне зображення, якщо є
    heart.style.left = Math.random() * 100 + "vw";
    
    // Випадкова швидкість падіння
    const duration = Math.random() * 3 + 3; 
    heart.style.animationDuration = duration + "s";
    
    // Випадковий розмір
    heart.style.fontSize = Math.random() * 15 + 15 + "px";

    document.getElementById('bg-hearts').appendChild(heart);

    // Видаляємо елемент після завершення анімації
    setTimeout(() => {
        heart.remove();
    }, duration * 1000);
}
// Створювати нове серце кожні 300мс
setInterval(createFallingHeart, 300);
// ---------------------------------------

const mainText = document.getElementById('main-text');
const heartContainer = document.getElementById('heart-container');
const videoContainer = document.getElementById('video-container');
const video = document.getElementById('birthday-video');

const sequence = ["3", "2", "1", "Happy", "Birthday", "Вікуся 🤍"];
let step = 0;

function runSequence() {
    if (step < sequence.length) {
        mainText.innerHTML = sequence[step];
        mainText.classList.add('show');
        setTimeout(() => {
            mainText.classList.remove('show');
            step++;
            setTimeout(runSequence, 700);
        }, 1500); 
    } else {
        createPixelHeart();
    }
}

function createPixelHeart() {
    const numPixels = 300;
    const scale = 15;
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    for (let i = 0; i < numPixels; i++) {
        const angle = i * Math.PI * 2 / numPixels;
        const x = scale * (16 * Math.pow(Math.sin(angle), 3));
        const y = -scale * (13 * Math.cos(angle) - 5 * Math.cos(2 * angle) - 2 * Math.cos(3 * angle) - Math.cos(4 * angle));
        const pixel = document.createElement("div");
        pixel.classList.add("pixel");
        pixel.style.left = (centerX + x) + "px";
        pixel.style.top = (centerY + y) + "px";
        heartContainer.appendChild(pixel);
        setTimeout(() => pixel.classList.add('show'), i * 5);
    }
    setTimeout(startBeating, 3000);
}

function startBeating() {
    let beats = 0;
    const interval = setInterval(() => {
        heartContainer.classList.add('pulse');
        setTimeout(() => heartContainer.classList.remove('pulse'), 400);
        beats++;
        if (beats === 3) {
            clearInterval(interval);
            setTimeout(explodeHeart, 1000);
        }
    }, 1000);
}

function explodeHeart() {
    const pixels = document.querySelectorAll('.pixel');
    pixels.forEach(p => {
        const vx = (Math.random() - 0.5) * window.innerWidth * 1.5;
        const vy = (Math.random() - 0.5) * window.innerHeight * 1.5;
        p.style.transform = `translate(${vx}px, ${vy}px) scale(0)`;
        p.style.opacity = '0';
    });
    setTimeout(() => {
        videoContainer.classList.add('show-flex');
        video.play().catch(() => {
            video.muted = true;
            video.play();
        });
    }, 1000);
}

document.addEventListener('click', () => { video.load(); }, { once: true });
setTimeout(runSequence, 1000);