class AmbientOrb {
    constructor() {
        this.element = document.createElement('div');
        this.element.className = 'ambient-orb';
        this.reset();
    }

    reset() {
        const size = Math.random() * 100 + 50;
        const startX = Math.random() * window.innerWidth;
        const startY = Math.random() * window.innerHeight;
        const moveX = (Math.random() - 0.5) * 200;
        const moveY = -Math.random() * 200;
        
        this.element.style.width = `${size}px`;
        this.element.style.height = `${size}px`;
        this.element.style.setProperty('--start-x', `${startX}px`);
        this.element.style.setProperty('--start-y', `${startY}px`);
        this.element.style.setProperty('--end-x', `${startX + moveX}px`);
        this.element.style.setProperty('--end-y', `${startY + moveY}px`);
        this.element.style.setProperty('--float-duration', `${Math.random() * 5 + 5}s`);
        this.element.style.setProperty('--orb-opacity', `${Math.random() * 0.3 + 0.1}`);

        const hue = Math.random() * 360;
        this.element.style.background = `radial-gradient(circle at center,
            hsla(${hue}, 100%, 70%, 0.15),
            transparent 70%)`;
    }

    animate() {
        this.element.addEventListener('animationend', () => {
            this.reset();
            this.element.style.animation = 'none';
            this.element.offsetHeight; // Trigger reflow
            this.element.style.animation = null;
        });
    }
}

function initAmbientOrbs() {
    const container = document.createElement('div');
    container.style.cssText = 'position: fixed; top: 0; left: 0; width: 100%; height: 100%; pointer-events: none; z-index: -1;';
    document.body.appendChild(container);

    const orbs = Array.from({ length: 10 }, () => {
        const orb = new AmbientOrb();
        container.appendChild(orb.element);
        orb.animate();
        return orb;
    });
}

document.addEventListener('DOMContentLoaded', initAmbientOrbs);