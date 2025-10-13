/* ===================================
   MAZECRAFT - MAIN JAVASCRIPT
   Vanilla JS with Anime.js Animations
   =================================== */

// === INITIALIZATION ===
document.addEventListener('DOMContentLoaded', () => {
  initPreloader();
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
    case 'store':
      initStorePage();
      break;
    case 'maps':
      initMapsPage();
      break;
    case 'projects':
      initProjectsPage();
      break;
    case 'docs':
      initDocsPage();
      break;
    case 'forums':
      initForumsPage();
      break;
  }
});

// === PRELOADER ===
function initPreloader() {
  const preloader = document.querySelector('.preloader');
  if (!preloader) return;
  
  // Anime.js animation for preloader logo
  anime({
    targets: '.preloader-logo',
    scale: [0.8, 1.1, 1],
    opacity: [0, 1],
    duration: 1500,
    easing: 'easeInOutQuad'
  });
  
  // Hide preloader after page load
  window.addEventListener('load', () => {
    setTimeout(() => {
      anime({
        targets: '.preloader',
        opacity: 0,
        duration: 500,
        easing: 'easeOutQuad',
        complete: () => {
          preloader.classList.add('hidden');
          preloader.style.display = 'none';
        }
      });
    }, 500);
  });
}

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
        // Visual feedback
        const originalText = btn.textContent;
        btn.textContent = 'Copied!';
        btn.classList.add('copied');
        
        // Animate button
        anime({
          targets: btn,
          scale: [1, 1.1, 1],
          duration: 300,
          easing: 'easeInOutQuad'
        });
        
        // Reset after 2 seconds
        setTimeout(() => {
          btn.textContent = originalText;
          btn.classList.remove('copied');
        }, 2000);
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

// === STORE PAGE ===
function initStorePage() {
  const sidebar = document.querySelector('.store-sidebar');
  const sidebarToggle = document.querySelector('.sidebar-toggle');
  const productCards = document.querySelectorAll('.product-card');
  const searchInput = document.querySelector('.search-box input');
  const filterSelect = document.querySelector('.filter-select');
  
  // Sidebar toggle for mobile
  if (sidebarToggle) {
    sidebarToggle.addEventListener('click', () => {
      sidebar?.classList.toggle('active');
    });
  }
  
  // Product cards animation
  anime({
    targets: productCards,
    opacity: [0, 1],
    translateY: [30, 0],
    delay: anime.stagger(100),
    duration: 600,
    easing: 'easeOutQuad'
  });
  
  // Search functionality
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      const searchTerm = e.target.value.toLowerCase();
      filterProducts(searchTerm);
    });
  }
  
  // Filter functionality
  if (filterSelect) {
    filterSelect.addEventListener('change', (e) => {
      const category = e.target.value;
      filterByCategory(category);
    });
  }
  
  // Category navigation
  document.querySelectorAll('.category-title').forEach(title => {
    title.addEventListener('click', () => {
      title.classList.toggle('active');
      const items = title.nextElementSibling;
      
      if (items) {
        const isExpanded = title.classList.contains('active');
        anime({
          targets: items,
          height: isExpanded ? [0, items.scrollHeight] : [items.scrollHeight, 0],
          opacity: isExpanded ? [0, 1] : [1, 0],
          duration: 300,
          easing: 'easeInOutQuad'
        });
      }
    });
  });
}

function filterProducts(searchTerm) {
  const products = document.querySelectorAll('.product-card');
  
  products.forEach(product => {
    const title = product.querySelector('.product-title')?.textContent.toLowerCase() || '';
    const description = product.querySelector('.product-description')?.textContent.toLowerCase() || '';
    
    if (title.includes(searchTerm) || description.includes(searchTerm)) {
      product.style.display = 'block';
      anime({
        targets: product,
        opacity: [0, 1],
        scale: [0.9, 1],
        duration: 300,
        easing: 'easeOutQuad'
      });
    } else {
      anime({
        targets: product,
        opacity: 0,
        scale: 0.9,
        duration: 300,
        easing: 'easeOutQuad',
        complete: () => {
          product.style.display = 'none';
        }
      });
    }
  });
}

function filterByCategory(category) {
  const products = document.querySelectorAll('.product-card');
  
  products.forEach(product => {
    const productCategory = product.dataset.category;
    
    if (category === 'all' || productCategory === category) {
      product.style.display = 'block';
      anime({
        targets: product,
        opacity: [0, 1],
        translateY: [20, 0],
        duration: 400,
        easing: 'easeOutQuad'
      });
    } else {
      anime({
        targets: product,
        opacity: 0,
        translateY: 20,
        duration: 300,
        easing: 'easeOutQuad',
        complete: () => {
          product.style.display = 'none';
        }
      });
    }
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

// === PROJECTS PAGE ===
function initProjectsPage() {
  // Animate project cards
  anime({
    targets: '.project-card',
    opacity: [0, 1],
    translateY: [30, 0],
    delay: anime.stagger(100, {start: 200}),
    duration: 600,
    easing: 'easeOutQuad'
  });
  
  // Fetch GitHub repos (example - replace with actual API call)
  // fetchGitHubRepos();
}

async function fetchGitHubRepos() {
  // Example function - implement based on your GitHub username/organization
  try {
    const response = await fetch('https://api.github.com/users/YOUR_USERNAME/repos');
    const repos = await response.json();
    // Process and display repos
    console.log(repos);
  } catch (error) {
    console.error('Error fetching GitHub repos:', error);
  }
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
  
  // Doc card click handler
  docCards.forEach(card => {
    card.addEventListener('click', () => {
      const docName = card.querySelector('h3')?.textContent || 'Documentation';
      
      // Animate click feedback
      anime({
        targets: card,
        scale: [1, 0.95, 1],
        duration: 300,
        easing: 'easeInOutQuad'
      });
      
      // Show coming soon message or navigate to docs
      showComingSoonModal(docName);
    });
  });
}

function showComingSoonModal(title) {
  // Create a simple modal for coming soon
  const modal = document.createElement('div');
  modal.className = 'modal-overlay';
  modal.innerHTML = `
    <div class="modal-content">
      <h2>${title}</h2>
      <p>Documentation coming soon...</p>
      <button class="btn btn-primary modal-close">Close</button>
    </div>
  `;
  
  modal.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.9);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 10000;
  `;
  
  const content = modal.querySelector('.modal-content');
  content.style.cssText = `
    background: #0a0a0a;
    padding: 2rem;
    border-radius: 12px;
    border: 2px solid #FF2200;
    text-align: center;
    max-width: 500px;
  `;
  
  document.body.appendChild(modal);
  
  // Animate modal
  anime({
    targets: modal,
    opacity: [0, 1],
    duration: 300,
    easing: 'easeOutQuad'
  });
  
  anime({
    targets: content,
    scale: [0.8, 1],
    duration: 400,
    easing: 'easeOutElastic'
  });
  
  // Close modal
  modal.querySelector('.modal-close').addEventListener('click', () => {
    anime({
      targets: modal,
      opacity: 0,
      duration: 300,
      easing: 'easeOutQuad',
      complete: () => modal.remove()
    });
  });
  
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.querySelector('.modal-close').click();
    }
  });
}

// === FORUMS PAGE ===
function initForumsPage() {
  // Animate coming soon content
  anime.timeline({
    easing: 'easeOutQuad'
  })
  .add({
    targets: '.forums-icon',
    opacity: [0, 1],
    scale: [0.5, 1],
    rotate: [180, 0],
    duration: 1000
  })
  .add({
    targets: '.forums-content h1',
    opacity: [0, 1],
    translateY: [30, 0],
    duration: 800
  }, '-=500')
  .add({
    targets: '.forums-content p',
    opacity: [0, 1],
    translateY: [20, 0],
    duration: 600
  }, '-=400')
  .add({
    targets: '.forums-content .btn',
    opacity: [0, 1],
    scale: [0.8, 1],
    duration: 500
  }, '-=200');
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

// Export functions for external use
window.MazecraftJS = {
  filterProducts,
  filterByCategory,
  showComingSoonModal
};
