const observerOptions = {
    root: null,
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
};

const observerCallback = (entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
        }
    });
};

const scrollObserver = new IntersectionObserver(observerCallback, observerOptions);

document.addEventListener('DOMContentLoaded', () => {
    // Add fade-in-section class to elements you want to animate
    const sections = [
        '.gamemodes-header',
        '.realms-section',
        '.team-section',
        '.discord-section',
        '.socials-section'
    ];

    sections.forEach(selector => {
        const elements = document.querySelectorAll(selector);
        elements.forEach(el => {
            el.classList.add('fade-in-section');
            scrollObserver.observe(el);
        });
    });

    // Add stagger animations to child elements
    const staggerParents = [
        '.team-grid',
        '.social-buttons',
        '.realm-features'
    ];

    staggerParents.forEach(selector => {
        const parent = document.querySelector(selector);
        if (parent) {
            const children = parent.children;
            Array.from(children).forEach((child, index) => {
                child.classList.add('stagger-item', `stagger-delay-${(index % 4) + 1}`);
                scrollObserver.observe(child);
            });
        }
    });
});