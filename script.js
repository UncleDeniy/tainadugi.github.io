const audioPlayer = document.getElementById('book-audio');
const playBtn = document.getElementById('play-btn');
const progressBar = document.getElementById('progress-bar');
const currentTimeEl = document.querySelector('.current-time');
const durationEl = document.querySelector('.duration');

 
function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
}

function updateProgress() {
    const { currentTime, duration } = audioPlayer;
    const progressPercent = (currentTime / duration) * 100;
    progressBar.value = progressPercent;
    currentTimeEl.textContent = formatTime(currentTime);
}

 
audioPlayer.addEventListener('loadedmetadata', () => {
    durationEl.textContent = formatTime(audioPlayer.duration);
});

 
progressBar.addEventListener('input', () => {
    const duration = audioPlayer.duration;
    audioPlayer.currentTime = (progressBar.value / 100) * duration;
});
 
audioPlayer.addEventListener('timeupdate', updateProgress);
 
playBtn.addEventListener('click', () => {
    if (audioPlayer.paused) {
        audioPlayer.play();
        playBtn.textContent = '❚❚ Пауза';
    } else {
        audioPlayer.pause();
        playBtn.textContent = '▶ Прослушать отрывок';
    }
});
 
audioPlayer.addEventListener('ended', () => {
    playBtn.textContent = '▶ Прослушать отрывок';
    progressBar.value = 0;
    currentTimeEl.textContent = '0:00';
});
 
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});
 
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.about, .features, .quote-section, .buy');
    
    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;
        
        if (elementPosition < screenPosition) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
};

 
document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('.about, .features, .quote-section, .buy');
    
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'all 0.6s ease-out';
    });
    
     
    setTimeout(animateOnScroll, 100);
});

 
window.addEventListener('scroll', animateOnScroll);
 
const stalkerLogo = document.querySelector('.stalker-logo');
let flickerInterval;

function startFlicker() {
    flickerInterval = setInterval(() => {
        if (Math.random() > 0.7) {
            stalkerLogo.style.opacity = '0.7';
            setTimeout(() => {
                stalkerLogo.style.opacity = '1';
            }, 100);
        }
    }, 3000);
}

startFlicker();