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