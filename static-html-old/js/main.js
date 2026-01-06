/* ===================================
   MAZECRAFT - MAIN JAVASCRIPT
   Vanilla JS with Anime.js Animations
   =================================== */

// === INITIALIZATION ===
document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initScrollAnimations();
  initLazyLoading();
  initCopyToClipboard();
  initSmoothScroll();
  
  // Page-specific initializations
  const currentPage = document.body.dataset.page;
  
  switch(currentPage) {
    case 'home':
      initHomePage();
      break;
    case 'maps':
      initMapsPage();
      break;
    case 'docs':
      initDocsPage();
      break;
  }
});

// === NAVBAR ===
function initNavbar() {
  const navbar = document.querySelector('.navbar');
  const navbarToggle = document.querySelector('.navbar-toggle');
  const navbarMenu = document.querySelector('.navbar-menu');
  const navLinks = document.querySelectorAll('.navbar-menu a');
  
  // Mobile menu toggle
  if (navbarToggle) {
    navbarToggle.addEventListener('click', () => {
      navbarToggle.classList.toggle('active');
      navbarMenu.classList.toggle('active');
      
      // Animate menu items
      if (navbarMenu.classList.contains('active')) {
        anime({
          targets: '.navbar-menu li',
          translateY: [-20, 0],
          opacity: [0, 1],
          delay: anime.stagger(100),
          duration: 500,
          easing: 'easeOutQuad'
        });
      }
    });
  }
  
  // Close mobile menu when clicking on a link
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth <= 768) {
        navbarToggle?.classList.remove('active');
        navbarMenu?.classList.remove('active');
      }
    });
  });
  
  // Navbar scroll effect
  let lastScroll = 0;
  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
      navbar?.classList.add('scrolled');
    } else {
      navbar?.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
  });
  
  // Set active link based on current page
  const currentPath = window.location.pathname;
  navLinks.forEach(link => {
    if (link.getAttribute('href') === currentPath || 
        (currentPath.includes(link.getAttribute('href')) && link.getAttribute('href') !== '/')) {
      link.classList.add('active');
    }
  });
}

// === SCROLL ANIMATIONS ===
function initScrollAnimations() {
  // Intersection Observer for scroll-triggered animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = entry.target;
        
        // Determine animation based on class
        if (target.classList.contains('fade-in')) {
          anime({
            targets: target,
            opacity: [0, 1],
            translateY: [20, 0],
            duration: 800,
            easing: 'easeOutQuad'
          });
        } else if (target.classList.contains('slide-in-left')) {
          anime({
            targets: target,
            opacity: [0, 1],
            translateX: [-50, 0],
            duration: 800,
            easing: 'easeOutQuad'
          });
        } else if (target.classList.contains('slide-in-right')) {
          anime({
            targets: target,
            opacity: [0, 1],
            translateX: [50, 0],
            duration: 800,
            easing: 'easeOutQuad'
          });
        } else if (target.classList.contains('scale-in')) {
          anime({
            targets: target,
            opacity: [0, 1],
            scale: [0.9, 1],
            duration: 800,
            easing: 'easeOutQuad'
          });
        }
        
        observer.unobserve(target);
      }
    });
  }, observerOptions);
  
  // Observe all animated elements
  document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right, .scale-in').forEach(el => {
    observer.observe(el);
  });
}

// === LAZY LOADING ===
function initLazyLoading() {
  const lazyImages = document.querySelectorAll('img[loading="lazy"]');
  
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src || img.src;
          img.classList.add('loaded');
          imageObserver.unobserve(img);
        }
      });
    });
    
    lazyImages.forEach(img => imageObserver.observe(img));
  }
}

// === COPY TO CLIPBOARD ===
function initCopyToClipboard() {
  const copyBtns = document.querySelectorAll('.copy-btn');
  
  copyBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const textToCopy = btn.dataset.copy || btn.previousElementSibling?.textContent;
      
      navigator.clipboard.writeText(textToCopy).then(() => {

        
        // Animate button
        anime({
          targets: btn,
          scale: [1, 1.1, 1],
          duration: 300,
          easing: 'easeInOutQuad'
        });
      }).catch(err => {
        console.error('Failed to copy:', err);
        btn.textContent = 'Failed!';
        setTimeout(() => {
          btn.textContent = 'Copy';
        }, 2000);
      });
    });
  });
}

// === SMOOTH SCROLL ===
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href === '#') return;
      
      e.preventDefault();
      const target = document.querySelector(href);
      
      if (target) {
        const targetPosition = target.offsetTop - 80; // Account for navbar
        
        anime({
          targets: 'html, body',
          scrollTop: targetPosition,
          duration: 800,
          easing: 'easeInOutQuad'
        });
      }
    });
  });
}

// === HOME PAGE ===
function initHomePage() {
  // Hero animations
  anime.timeline({
    easing: 'easeOutQuad'
  })
  .add({
    targets: '.hero-logo',
    opacity: [0, 1],
    scale: [0.8, 1],
    duration: 1000
  })
  .add({
    targets: '.hero-subtitle',
    opacity: [0, 1],
    translateY: [20, 0],
    duration: 800
  }, '-=500')
  .add({
    targets: '.hero-ip-box',
    opacity: [0, 1],
    scale: [0.9, 1],
    duration: 800
  }, '-=400');
  
  // Team cards stagger animation
  anime({
    targets: '.team-card',
    opacity: [0, 1],
    translateY: [30, 0],
    delay: anime.stagger(100),
    duration: 800,
    easing: 'easeOutQuad'
  });
}

// === MAPS PAGE ===
function initMapsPage() {
  const mapItems = document.querySelectorAll('.map-item');
  
  mapItems.forEach((item, index) => {
    item.addEventListener('click', () => {
      // Remove active class from all items
      mapItems.forEach(i => i.classList.remove('active'));
      
      // Add active class to clicked item
      item.classList.add('active');
      
      // Animate content change
      const mapViewer = document.querySelector('.map-viewer');
      if (mapViewer) {
        anime({
          targets: mapViewer,
          opacity: [1, 0],
          duration: 300,
          easing: 'easeOutQuad',
          complete: () => {
            // Update content here
            anime({
              targets: mapViewer,
              opacity: [0, 1],
              duration: 300,
              easing: 'easeInQuad'
            });
          }
        });
      }
    });
  });
}

// === DOCS PAGE ===
function initDocsPage() {
  const docCards = document.querySelectorAll('.doc-card');
  
  // Animate doc cards
  anime({
    targets: docCards,
    opacity: [0, 1],
    translateY: [30, 0],
    delay: anime.stagger(80),
    duration: 600,
    easing: 'easeOutQuad'
  });
}

// === UTILITY FUNCTIONS ===

// Debounce function for performance
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Throttle function for scroll events
function throttle(func, limit) {
  let inThrottle;
  return function() {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}
