function createParticle() {
    const particle = document.createElement('div');
    particle.className = 'particle';
    
    // Random starting position
    const startX = Math.random() * window.innerWidth;
    const startY = Math.random() * window.innerHeight;
    
    // Random horizontal movement
    const moveX = (Math.random() - 0.5) * 100;
    particle.style.setProperty('--move-x', `${moveX}px`);
    
    // Set position
    particle.style.left = `${startX}px`;
    particle.style.top = `${startY}px`;
    
    // Set animation
    particle.style.animation = `float ${2 + Math.random()}s ease-in forwards`;
    
    document.body.appendChild(particle);
    
    // Remove particle after animation
    setTimeout(() => {
        particle.remove();
    }, 3000);
}

function startParticles() {
    // Create particles every 200ms
    setInterval(createParticle, 200);
}

// Start particles when page loads
window.addEventListener('DOMContentLoaded', startParticles);

function createFirefly() {
    const firefly = document.createElement('div');
    firefly.className = 'firefly';
    
    // Random starting position
    const startX = Math.random() * window.innerWidth;
    const startY = Math.random() * window.innerHeight;
    
    // Random movement range (-50 to 50 pixels)
    const moveX = (Math.random() - 0.5) * 100;
    const moveY = (Math.random() - 0.5) * 100;
    
    // Random duration and opacity
    const duration = 3 + Math.random() * 4;
    const opacity = 0.3 + Math.random() * 0.5;
    
    firefly.style.left = `${startX}px`;
    firefly.style.top = `${startY}px`;
    firefly.style.setProperty('--move-x', moveX);
    firefly.style.setProperty('--move-y', moveY);
    firefly.style.setProperty('--duration', `${duration}s`);
    firefly.style.setProperty('--opacity', opacity);
    
    document.body.appendChild(firefly);
    
    // Remove firefly after animation
    setTimeout(() => {
        firefly.remove();
    }, duration * 1000);
}

function startFireflies() {
    // Create new firefly every 500ms
    setInterval(createFirefly, 500);
    
    // Initial batch of fireflies
    for(let i = 0; i < 15; i++) {
        createFirefly();
    }
}

// Start fireflies when page loads
window.addEventListener('DOMContentLoaded', startFireflies);