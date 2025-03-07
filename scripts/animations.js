function handleIntersection(entries, observer) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            observer.unobserve(entry.target);
        }
    });
}

function initializeAnimations() {
    const observer = new IntersectionObserver(handleIntersection, {
        threshold: 0.1
    });

    // Add animation classes to elements
    document.querySelectorAll('.section-title').forEach(el => {
        el.classList.add('animate', 'delay-1');
        observer.observe(el);
    });

    document.querySelectorAll('.section-text').forEach(el => {
        el.classList.add('animate', 'delay-2');
        observer.observe(el);
    });

    document.querySelectorAll('.team-member').forEach(el => {
        el.classList.add('animate', 'delay-2');
        observer.observe(el);
    });

    document.querySelectorAll('.realms-content').forEach(el => {
        el.classList.add('animate', 'delay-1');
        observer.observe(el);
    });

    // Hero section immediate animation
    document.querySelector('.hero-text').classList.add('animate');
    document.querySelector('.hero-subtitle').classList.add('animate', 'delay-1');
    document.querySelector('.join-button').classList.add('animate', 'delay-2');
}

document.addEventListener('DOMContentLoaded', initializeAnimations);