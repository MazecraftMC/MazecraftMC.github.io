/* ===================================
   MAZECRAFT DOCUMENTATION JAVASCRIPT
   GitBook-style Navigation & Interactions
   =================================== */

document.addEventListener('DOMContentLoaded', () => {
  initDocsNavigation();
  initDocsSidebar();
  initDocsAnimations();
});

// === DOCS NAVIGATION ===
function initDocsNavigation() {
  const navItems = document.querySelectorAll('.docs-nav-item[data-section]');
  const navSubitems = document.querySelectorAll('.docs-nav-subitem[data-section]');
  const sections = document.querySelectorAll('.docs-section');
  const toggleButtons = document.querySelectorAll('.docs-nav-toggle');

  // Handle main nav item clicks
  navItems.forEach(item => {
    item.addEventListener('click', (e) => {
      if (item.classList.contains('docs-nav-toggle')) {
        e.preventDefault();
        toggleSubmenu(item);
      } else {
        e.preventDefault();
        const sectionId = item.dataset.section;
        navigateToSection(sectionId);
        
        // Close mobile sidebar after navigation
        if (window.innerWidth <= 768) {
          closeSidebar();
        }
      }
    });
  });

  // Handle submenu item clicks
  navSubitems.forEach(item => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      const sectionId = item.dataset.section;
      navigateToSection(sectionId);
      
      // Update active states
      navSubitems.forEach(sub => sub.classList.remove('active'));
      item.classList.add('active');
      
      // Close mobile sidebar after navigation
      if (window.innerWidth <= 768) {
        closeSidebar();
      }
    });
  });

  // Handle hash changes (browser back/forward)
  window.addEventListener('hashchange', () => {
    const hash = window.location.hash.slice(1);
    if (hash) {
      navigateToSection(hash);
    }
  });

  // Load initial section from hash
  const initialHash = window.location.hash.slice(1);
  if (initialHash) {
    navigateToSection(initialHash);
  }
}

function navigateToSection(sectionId) {
  const sections = document.querySelectorAll('.docs-section');
  const navItems = document.querySelectorAll('.docs-nav-item[data-section]');
  const navSubitems = document.querySelectorAll('.docs-nav-subitem[data-section]');
  
  // Hide all sections
  sections.forEach(section => {
    section.classList.remove('active');
  });
  
  // Show target section
  const targetSection = document.getElementById(sectionId);
  if (targetSection) {
    targetSection.classList.add('active');
    
    // Scroll to top of content
    const docsContent = document.querySelector('.docs-content');
    if (docsContent) {
      docsContent.scrollTop = 0;
    }
    
    // Update URL hash
    history.pushState(null, null, `#${sectionId}`);
    
    // Update active nav item
    navItems.forEach(item => item.classList.remove('active'));
    navSubitems.forEach(item => item.classList.remove('active'));
    
    const activeNavItem = document.querySelector(`.docs-nav-item[data-section="${sectionId}"]`);
    const activeSubitem = document.querySelector(`.docs-nav-subitem[data-section="${sectionId}"]`);
    
    if (activeNavItem) {
      activeNavItem.classList.add('active');
    }
    
    if (activeSubitem) {
      activeSubitem.classList.add('active');
      // Expand parent menu
      const parentToggle = activeSubitem.closest('.docs-nav-section').querySelector('.docs-nav-toggle');
      if (parentToggle && !parentToggle.classList.contains('expanded')) {
        toggleSubmenu(parentToggle);
      }
    }
    
    // Animate section entrance
    anime({
      targets: targetSection,
      opacity: [0, 1],
      translateY: [20, 0],
      duration: 400,
      easing: 'easeOutQuad'
    });
  }
}

function toggleSubmenu(toggleButton) {
  const submenu = toggleButton.parentElement.querySelector('.docs-nav-submenu');
  const isExpanded = toggleButton.classList.contains('expanded');
  
  if (isExpanded) {
    // Collapse
    toggleButton.classList.remove('expanded');
    submenu.classList.remove('expanded');
    
    anime({
      targets: submenu,
      maxHeight: 0,
      duration: 300,
      easing: 'easeInOutQuad'
    });
  } else {
    // Expand
    toggleButton.classList.add('expanded');
    submenu.classList.add('expanded');
    
    anime({
      targets: submenu,
      maxHeight: submenu.scrollHeight,
      duration: 300,
      easing: 'easeInOutQuad'
    });
  }
}

// === SIDEBAR TOGGLE ===
function initDocsSidebar() {
  const sidebar = document.getElementById('docsSidebar');
  const sidebarToggle = document.getElementById('sidebarToggle');
  const sidebarClose = document.getElementById('sidebarClose');
  
  if (sidebarToggle) {
    sidebarToggle.addEventListener('click', () => {
      openSidebar();
    });
  }
  
  if (sidebarClose) {
    sidebarClose.addEventListener('click', () => {
      closeSidebar();
    });
  }
  
  // Close sidebar when clicking outside on mobile
  document.addEventListener('click', (e) => {
    if (window.innerWidth <= 768 && 
        sidebar.classList.contains('active') && 
        !sidebar.contains(e.target) && 
        !sidebarToggle.contains(e.target)) {
      closeSidebar();
    }
  });
}

function openSidebar() {
  const sidebar = document.getElementById('docsSidebar');
  sidebar.classList.add('active');
  
  anime({
    targets: sidebar,
    translateX: ['-100%', 0],
    duration: 300,
    easing: 'easeOutQuad'
  });
}

function closeSidebar() {
  const sidebar = document.getElementById('docsSidebar');
  
  anime({
    targets: sidebar,
    translateX: [0, '-100%'],
    duration: 300,
    easing: 'easeOutQuad',
    complete: () => {
      sidebar.classList.remove('active');
    }
  });
}

// === ANIMATIONS ===
function initDocsAnimations() {
  // Animate callouts on scroll
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        anime({
          targets: entry.target,
          opacity: [0, 1],
          translateY: [20, 0],
          duration: 600,
          easing: 'easeOutQuad'
        });
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);
  
  // Observe callouts, recipes, and perk cards
  document.querySelectorAll('.docs-callout, .docs-recipe, .docs-perk-card').forEach(el => {
    observer.observe(el);
  });
  
  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href === '#') return;
      
      e.preventDefault();
      const sectionId = href.slice(1);
      navigateToSection(sectionId);
    });
  });
}

// === COPY CODE BLOCKS ===
function initCodeCopy() {
  const codeBlocks = document.querySelectorAll('code');
  
  codeBlocks.forEach(code => {
    if (code.parentElement.tagName !== 'PRE') return;
    
    const button = document.createElement('button');
    button.className = 'code-copy-btn';
    button.innerHTML = '<svg viewBox="0 0 24 24"><path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/></svg>';
    button.title = 'Copy code';
    
    button.addEventListener('click', () => {
      navigator.clipboard.writeText(code.textContent).then(() => {
        button.innerHTML = '<svg viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>';
        setTimeout(() => {
          button.innerHTML = '<svg viewBox="0 0 24 24"><path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/></svg>';
        }, 2000);
      });
    });
    
    code.parentElement.style.position = 'relative';
    code.parentElement.appendChild(button);
  });
}

// === SEARCH FUNCTIONALITY (Optional Enhancement) ===
function initDocsSearch() {
  const searchInput = document.getElementById('docsSearch');
  if (!searchInput) return;
  
  searchInput.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase();
    const sections = document.querySelectorAll('.docs-section');
    
    if (query.length < 2) {
      // Reset search
      sections.forEach(section => {
        section.style.display = '';
      });
      return;
    }
    
    sections.forEach(section => {
      const content = section.textContent.toLowerCase();
      if (content.includes(query)) {
        section.style.display = 'block';
      } else {
        section.style.display = 'none';
      }
    });
  });
}

// Export for external use
window.DocsJS = {
  navigateToSection,
  openSidebar,
  closeSidebar
};
