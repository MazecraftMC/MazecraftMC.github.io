/* ===================================
   PROJECTS PAGE - API Integration
   =================================== */

// Configuration
const CONFIG = window.PROJECT_CONFIG || {
  github: 'PixelMCN',
  modrinth: 'Pixelis0P',
  curseforge: 'PixelMCN'
};

// === GITHUB API ===
async function fetchGitHubRepos() {
  const container = document.getElementById('github-projects');
  
  try {
    const response = await fetch(`https://api.github.com/users/PixelMCN/repos?sort=updated&per_page=10`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch GitHub repos');
    }
    
    const repos = await response.json();
    
    if (repos.length === 0) {
      container.innerHTML = `
        <div class="empty-state">
          <p>No public repositories found.</p>
        </div>
      `;
      return;
    }
    
    // Clear loading state
    container.innerHTML = '';
    
    // Create project cards
    repos.forEach((repo, index) => {
      const card = createGitHubCard(repo);
      container.appendChild(card);
      
      // Animate card entrance
      setTimeout(() => {
        anime({
          targets: card,
          opacity: [0, 1],
          translateY: [30, 0],
          duration: 600,
          easing: 'easeOutQuad'
        });
      }, index * 100);
    });
    
  } catch (error) {
    console.error('GitHub API Error:', error);
    container.innerHTML = `
      <div class="empty-state error-state">
        <p>Failed to load GitHub projects. Please check your username in the configuration.</p>
      </div>
    `;
  }
}

function createGitHubCard(repo) {
  const card = document.createElement('div');
  card.className = 'project-card';
  card.style.opacity = '0';
  
  // Calculate time ago
  const updatedDate = new Date(repo.updated_at);
  const timeAgo = getTimeAgo(updatedDate);
  
  // Get primary language color
  const langColor = getLanguageColor(repo.language);
  
  card.innerHTML = `
    <div class="project-header">
      <h3 class="project-title">
        ${repo.language ? `<span class="language-badge" style="background-color: ${langColor};" title="${repo.language}"></span>` : ''}
        ${repo.name}
      </h3>
      ${repo.language ? `<span class="project-type">${repo.language}</span>` : ''}
    </div>
    <p class="project-description">${repo.description || 'No description available.'}</p>
    <div class="project-stats">
      <span class="project-stat" title="Stars">
        <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
        ${formatNumber(repo.stargazers_count)}
      </span>
      <span class="project-stat" title="Forks">
        <svg viewBox="0 0 24 24" fill="currentColor"><path d="M10 6H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2v-4h2v4c0 2.21-1.79 4-4 4H6c-2.21 0-4-1.79-4-4V8c0-2.21 1.79-4 4-4h4v2zm8-2h-2v2h2v2h2V6h2V4h-2V2h-2v2z"/></svg>
        ${formatNumber(repo.forks_count)}
      </span>
      <span class="project-stat" title="Issues">
        <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/></svg>
        ${formatNumber(repo.open_issues_count)}
      </span>
      <span class="project-stat">${timeAgo}</span>
    </div>
    ${repo.topics && repo.topics.length > 0 ? `
      <div class="project-topics">
        ${repo.topics.slice(0, 5).map(topic => `<span class="topic-tag">${topic}</span>`).join('')}
      </div>
    ` : ''}
    <div class="project-actions">
      <a href="${repo.html_url}/archive/refs/heads/${repo.default_branch}.zip" class="project-btn btn-download" download>
        <svg viewBox="0 0 24 24" fill="currentColor"><path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/></svg>
        Download
      </a>
      <a href="${repo.html_url}" class="project-btn btn-view" target="_blank" rel="noopener">
        <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
        View
      </a>
    </div>
  `;
  
  return card;
}

// === MODRINTH API ===
async function fetchModrinthProjects() {
  const container = document.getElementById('modrinth-projects');
  
  try {
    const response = await fetch(`https://api.modrinth.com/v2/user/Pixelis0P/projects`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch Modrinth projects');
    }
    
    const projects = await response.json();
    
    if (projects.length === 0) {
      container.innerHTML = `
        <div class="empty-state">
          <p>No Modrinth projects found.</p>
        </div>
      `;
      return;
    }
    
    // Clear loading state
    container.innerHTML = '';
    
    // Create project cards
    projects.forEach((project, index) => {
      const card = createModrinthCard(project);
      container.appendChild(card);
      
      // Animate card entrance
      setTimeout(() => {
        anime({
          targets: card,
          opacity: [0, 1],
          translateY: [30, 0],
          duration: 600,
          easing: 'easeOutQuad'
        });
      }, index * 100);
    });
    
  } catch (error) {
    console.error('Modrinth API Error:', error);
    container.innerHTML = `
      <div class="empty-state error-state">
        <p>Failed to load Modrinth projects. Please check your username in the configuration.</p>
      </div>
    `;
  }
}

function createModrinthCard(project) {
  const card = document.createElement('div');
  card.className = 'project-card';
  card.style.opacity = '0';
  
  // Calculate time ago
  const updatedDate = new Date(project.updated);
  const timeAgo = getTimeAgo(updatedDate);
  
  card.innerHTML = `
    <div class="project-header">
      <h3 class="project-title">
        ${project.icon_url ? `<img src="${project.icon_url}" alt="${project.title}" class="project-title-icon" loading="lazy">` : ''}
        ${project.title}
      </h3>
      <span class="project-type">${project.project_type || 'Mod'}</span>
    </div>
    <p class="project-description">${project.description || 'No description available.'}</p>
    <div class="project-stats">
      <span class="project-stat" title="Downloads">
        <svg viewBox="0 0 24 24" fill="currentColor"><path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/></svg>
        ${formatNumber(project.downloads)}
      </span>
      <span class="project-stat" title="Followers">
        <svg viewBox="0 0 24 24" fill="currentColor"><path d="M16.5 3c-1.74 0-3.41.81-4.5 2.09C10.91 3.81 9.24 3 7.5 3 4.42 3 2 5.42 2 8.5c0 3.78 3.4 6.86 8.55 11.54L12 21.35l1.45-1.32C18.6 15.36 22 12.28 22 8.5 22 5.42 19.58 3 16.5 3z"/></svg>
        ${formatNumber(project.followers)}
      </span>
      <span class="project-stat">${timeAgo}</span>
    </div>
    ${project.categories && project.categories.length > 0 ? `
      <div class="project-topics">
        ${project.categories.slice(0, 5).map(cat => `<span class="topic-tag">${cat}</span>`).join('')}
      </div>
    ` : ''}
    <div class="project-actions">
      <a href="https://modrinth.com/mod/${project.slug}/versions" class="project-btn btn-download" target="_blank" rel="noopener">
        <svg viewBox="0 0 24 24" fill="currentColor"><path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/></svg>
        Download
      </a>
      <a href="https://modrinth.com/mod/${project.slug}" class="project-btn btn-view" target="_blank" rel="noopener">
        View on Modrinth
      </a>
    </div>
  `;
  
  return card;
}

// === CURSEFORGE API ===
async function fetchCurseForgeProjects() {
  const container = document.getElementById('curseforge-projects');
  
  // CurseForge API requires an API key, so we'll show a message
  container.innerHTML = `
    <div class="empty-state">
      <p>CurseForge API requires authentication.</p>
      <p>To display your projects, you'll need to implement server-side API calls with your CurseForge API key.</p>
      <a href="https://docs.curseforge.com/" class="btn btn-primary" target="_blank" rel="noopener">Learn More</a>
    </div>
  `;
}

// === UTILITY FUNCTIONS ===
function formatNumber(num) {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
  } else if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K';
  }
  return num.toString();
}

function getTimeAgo(date) {
  const now = new Date();
  const seconds = Math.floor((now - date) / 1000);
  
  const intervals = {
    year: 31536000,
    month: 2592000,
    week: 604800,
    day: 86400,
    hour: 3600,
    minute: 60
  };
  
  for (const [unit, secondsInUnit] of Object.entries(intervals)) {
    const interval = Math.floor(seconds / secondsInUnit);
    if (interval >= 1) {
      return `${interval} ${unit}${interval !== 1 ? 's' : ''} ago`;
    }
  }
  
  return 'Just now';
}

function getLanguageColor(language) {
  const colors = {
    'JavaScript': '#f1e05a',
    'TypeScript': '#3178c6',
    'Python': '#3572A5',
    'Java': '#b07219',
    'PHP': '#4F5D95',
    'C++': '#f34b7d',
    'C#': '#178600',
    'Ruby': '#701516',
    'Go': '#00ADD8',
    'Rust': '#dea584',
    'Kotlin': '#A97BFF',
    'Swift': '#ffac45',
    'HTML': '#e34c26',
    'CSS': '#563d7c'
  };
  
  return colors[language] || '#FF2200';
}

// === INITIALIZATION ===
document.addEventListener('DOMContentLoaded', () => {
  // Fetch all projects
  fetchGitHubRepos();
  fetchModrinthProjects();
  fetchCurseForgeProjects();
});
