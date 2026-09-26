const audioControlBtn = document.getElementById('audioControlBtn');
const bgMusic = document.getElementById('bgMusic');
const celebrationAudio = document.getElementById('celebrationAudio');
const yesBtn = document.getElementById('yesBtn');
const noBtn = document.getElementById('noBtn');

let isMusicPlaying = false;

function fadeInAudio(audioElement, duration = 2000) {
    audioElement.volume = 0;
    audioElement.play().then(() => {
        isMusicPlaying = true;
        audioControlBtn.textContent = '🔊';
        
        const steps = 20;
        const stepTime = duration / steps;
        const volumeIncrement = 1 / steps;
        let currentVolume = 0;

        const fadeInterval = setInterval(() => {
            currentVolume += volumeIncrement;
            if (currentVolume >= 1) {
                currentVolume = 1;
                clearInterval(fadeInterval);
            }
            audioElement.volume = currentVolume;
        }, stepTime);
    }).catch(error => {
        console.log("Audio play error:", error);
    });
}

function fadeOutAudio(audioElement, callback, duration = 1000) {
    const steps = 10;
    const stepTime = duration / steps;
    const volumeDecrement = audioElement.volume / steps;
    
    const fadeInterval = setInterval(() => {
        audioElement.volume -= volumeDecrement;
        if (audioElement.volume <= 0.05) {
            audioElement.volume = 0;
            audioElement.pause();
            clearInterval(fadeInterval);
            if (callback) callback();
        }
    }, stepTime);
}

audioControlBtn.addEventListener('click', () => {
    if (!isMusicPlaying) {
        fadeInAudio(bgMusic, 1500);
    } else {
        fadeOutAudio(bgMusic, () => {
            isMusicPlaying = false;
            audioControlBtn.textContent = '🔇';
        }, 1000);
    }
});

let isMoved = false;

function moveNoButton() {
    if (!isMoved) {
        const rect = noBtn.getBoundingClientRect();
        noBtn.style.position = 'fixed';
        noBtn.style.left = `${rect.left}px`;
        noBtn.style.top = `${rect.top}px`;
        isMoved = true;
        
        setTimeout(calcNewPosition, 20);
    } else {
        calcNewPosition();
    }
}

function calcNewPosition() {
    const maxX = window.innerWidth - noBtn.offsetWidth - 50;
    const maxY = window.innerHeight - noBtn.offsetHeight - 50;
    
    const randomX = Math.max(20, Math.random() * maxX);
    const randomY = Math.max(20, Math.random() * maxY);
    
    noBtn.style.left = `${randomX}px`;
    noBtn.style.top = `${randomY}px`;
}

noBtn.addEventListener('mouseover', moveNoButton);
noBtn.addEventListener('click', moveNoButton);

yesBtn.addEventListener('click', () => {
    yesBtn.style.pointerEvents = 'none';
    noBtn.style.pointerEvents = 'none';

    if (isMusicPlaying) {
        fadeOutAudio(bgMusic, null, 800);
    }
    
    // Trigger the smooth visual fade overlay to dark
    const transitionOverlay = document.getElementById('transitionOverlay');
    if (transitionOverlay) {
        transitionOverlay.classList.add('active');
    }

    celebrationAudio.volume = 1;
    celebrationAudio.play().catch(error => {
        console.log("Celebration audio error:", error);
        window.location.href = "../page2/page2.html";
    });
});

// Once celebration audio finishes playing completely in the dark, move to Page 2
celebrationAudio.addEventListener('ended', () => {
    window.location.href = "../page2/page2.html";
});

celebrationAudio.addEventListener('ended', () => {
    window.location.href = "../page2/page2.html";
});

const confettiContainer = document.getElementById('confettiContainer');
const colors = ['#ffccd5', '#ff4d79', '#ffe5ec', '#ffd166', '#ef476f', '#06d6a0', '#ff85a1', '#b5179e'];
const symbols = ['✨', '⭐', '💫', '💖', '🎀'];

for (let i = 0; i < 30; i++) {
    const particle = document.createElement('div');
    particle.classList.add('particle');
    
    particle.style.left = `${Math.random() * 100}vw`;
    particle.style.top = `${Math.random() * -100}px`;
    particle.style.animationDuration = `${Math.random() * 4 + 5}s`;
    particle.style.animationDelay = `${Math.random() * 6}s`;
    
    const randType = Math.random();
    if (randType > 0.6) {
        particle.innerHTML = symbols[Math.floor(Math.random() * symbols.length)];
        particle.style.fontSize = `${Math.random() * 10 + 12}px`;
    } else {
        particle.style.width = `${Math.random() * 7 + 4}px`;
        particle.style.height = `${Math.random() * 12 + 5}px`;
        particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        
        if (Math.random() > 0.5) {
            particle.style.borderRadius = '50%';
        } else {
            particle.style.borderRadius = '2px';
        }
    }
    
    confettiContainer.appendChild(particle);
}