// DOM Elements
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const navbar = document.querySelector('.navbar');

// Copy Server IP Function
function copyServerIP() {
    const serverIPInput = document.querySelector('.server-ip');
    const serverIP = serverIPInput.value;
    
    // Select the text in the input field
    serverIPInput.select();
    serverIPInput.setSelectionRange(0, 99999); // For mobile devices
    
    navigator.clipboard.writeText(serverIP).then(() => {
        // Show success animation
        const copyBtn = document.querySelector('.copy-btn');
        const originalBg = copyBtn.style.background;
        copyBtn.style.background = 'rgba(74, 222, 128, 0.3)';
        
        anime({
            targets: copyBtn,
            scale: [1, 1.1, 1],
            duration: 400,
            easing: 'easeOutBack'
        });
        
        setTimeout(() => {
            copyBtn.style.background = originalBg;
        }, 800);
        
        // Show toast notification
        showToast('Server IP copied to clipboard!');
    }).catch(() => {
        // Fallback for older browsers
        try {
            document.execCommand('copy');
            showToast('Server IP copied to clipboard!');
        } catch (err) {
            showToast('Failed to copy IP address', 'error');
        }
    });
}

// Toast notification function
function showToast(message, type = 'success') {
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.textContent = message;
    toast.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 20px;
        background: ${type === 'success' ? 'rgba(74, 222, 128, 0.4)' : '#ef4444'};
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        z-index: 10000;
        font-family: 'Merriweather', serif;
        font-weight: 500;
        box-shadow: 0 10px 30px rgba(0,0,0,0.3);
        backdrop-filter: blur(10px);
        border: 1px solid ${type === 'success' ? 'rgba(74, 222, 128, 0.6)' : 'rgba(239, 68, 68, 0.6)'};
        transform: translateX(100%);
    `;
    
    document.body.appendChild(toast);
    
    anime({
        targets: toast,
        translateX: [100, 0],
        opacity: [0, 1],
        duration: 300,
        easing: 'easeOutExpo'
    });
    
    setTimeout(() => {
        anime({
            targets: toast,
            translateX: [0, 100],
            opacity: [1, 0],
            duration: 300,
            easing: 'easeInExpo',
            complete: () => {
                document.body.removeChild(toast);
            }
        });
    }, 3000);
}

// Mobile Menu Toggle
hamburger?.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Close mobile menu when clicking on links
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger?.classList.remove('active');
        navLinks?.classList.remove('active');
    });
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(26, 26, 26, 0.98)';
        navbar.style.backdropFilter = 'blur(20px)';
    } else {
        navbar.style.background = 'rgba(26, 26, 26, 0.95)';
        navbar.style.backdropFilter = 'blur(15px)';
    }
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Anime.js animations when page loads
document.addEventListener('DOMContentLoaded', () => {
    // Page transition animation
    anime({
        targets: 'body',
        opacity: [0, 1],
        duration: 800,
        easing: 'easeOutExpo'
    });

    // Hero logo animation
    anime({
        targets: '.hero-logo',
        translateY: [-50, 0],
        opacity: [0, 1],
        duration: 1200,
        easing: 'easeOutExpo',
        delay: 300
    });

    // Hero subtitle animation
    anime({
        targets: '.hero-subtitle',
        translateY: [30, 0],
        opacity: [0, 1],
        duration: 1000,
        easing: 'easeOutExpo',
        delay: 600
    });

    // Server IP container animation
    anime({
        targets: '.server-ip-container',
        translateY: [30, 0],
        opacity: [0, 1],
        duration: 1000,
        easing: 'easeOutExpo',
        delay: 900
    });

    // Section animations on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Section titles
                if (entry.target.classList.contains('section-title')) {
                    anime({
                        targets: entry.target,
                        translateY: [50, 0],
                        opacity: [0, 1],
                        duration: 800,
                        easing: 'easeOutExpo'
                    });
                }

                // Gamemode cards
                if (entry.target.classList.contains('gamemode')) {
                    anime({
                        targets: entry.target,
                        translateX: entry.target.classList.contains('reverse') ? [100, 0] : [-100, 0],
                        opacity: [0, 1],
                        duration: 1000,
                        easing: 'easeOutExpo'
                    });
                }

                // Team cards
                if (entry.target.classList.contains('team-card')) {
                    anime({
                        targets: entry.target,
                        translateY: [50, 0],
                        opacity: [0, 1],
                        duration: 800,
                        easing: 'easeOutExpo',
                        delay: anime.stagger(200)
                    });
                }

                // Discord section
                if (entry.target.classList.contains('discord-content')) {
                    anime({
                        targets: entry.target,
                        scale: [0.9, 1],
                        opacity: [0, 1],
                        duration: 1000,
                        easing: 'easeOutBack'
                    });
                }

                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe elements for animations
    document.querySelectorAll('.section-title, .gamemode, .team-card, .discord-content').forEach(el => {
        observer.observe(el);
    });
});

// Button hover effects with anime.js
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('mouseenter', () => {
        anime({
            targets: btn,
            scale: 1.05,
            duration: 200,
            easing: 'easeOutQuad'
        });
    });

    btn.addEventListener('mouseleave', () => {
        anime({
            targets: btn,
            scale: 1,
            duration: 200,
            easing: 'easeOutQuad'
        });
    });
});

// Team card hover animations
document.querySelectorAll('.team-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        anime({
            targets: card,
            translateY: -10,
            duration: 300,
            easing: 'easeOutQuad'
        });
    });

    card.addEventListener('mouseleave', () => {
        anime({
            targets: card,
            translateY: 0,
            duration: 300,
            easing: 'easeOutQuad'
        });
    });
});

// Social link hover animations
document.querySelectorAll('.social-link').forEach(link => {
    link.addEventListener('mouseenter', () => {
        anime({
            targets: link,
            scale: 1.1,
            rotate: 360,
            duration: 400,
            easing: 'easeOutBack'
        });
    });

    link.addEventListener('mouseleave', () => {
        anime({
            targets: link,
            scale: 1,
            rotate: 0,
            duration: 300,
            easing: 'easeOutQuad'
        });
    });
});

// Enhanced page transitions
function navigateToPage(url) {
    anime({
        targets: 'body',
        opacity: [1, 0],
        duration: 300,
        easing: 'easeInExpo',
        complete: () => {
            window.location.href = url;
        }
    });
}

// Add smooth page transitions to all internal links
document.querySelectorAll('a[href^="pages/"]').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        navigateToPage(link.href);
    });
});

// Add forums page to navigation transitions
document.querySelectorAll('a[href="pages/forums.html"]').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        navigateToPage(link.href);
    });
});

// Parallax effect for hero background
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Initialize page
window.addEventListener('load', () => {
    // Add any additional page initialization here
    console.log('MazecraftMC Website loaded successfully!');
});