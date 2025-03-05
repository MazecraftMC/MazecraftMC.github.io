async function updateServerStatus() {
    try {
        // Replace with your actual Minecraft server API endpoint
        const response = await fetch('https://api.mcsrvstat.us/2/mc.hypixel.net');
        const data = await response.json();

        const playerCount = document.getElementById('playerCount');
        const serverStatus = document.getElementById('serverStatus');

        if (data.online) {
            playerCount.textContent = data.players ? data.players.online : '0';
            serverStatus.textContent = 'Online';
            serverStatus.style.color = '#00ff00';
        } else {
            playerCount.textContent = '0';
            serverStatus.textContent = 'Offline';
            serverStatus.style.color = '#ff0000';
        }
    } catch (error) {
        console.error('Error fetching server status:', error);
        document.getElementById('serverStatus').textContent = 'Error';
        document.getElementById('serverStatus').style.color = '#ff0000';
    }
}

// Update status every 30 seconds
updateServerStatus();
setInterval(updateServerStatus, 30000);

function toggleMenu() {
    const navMenu = document.querySelector('.nav-menu');
    navMenu.classList.toggle('active');
}

console.log('Page loaded successfully!');

let slideIndex = 1;
showSlides(slideIndex);

function currentSlide(n) {
    showSlides(slideIndex = n);
}

function showSlides(n) {
    const slides = document.getElementsByClassName("slides");
    const dots = document.getElementsByClassName("dot");
    
    if (n > slides.length) {slideIndex = 1}
    if (n < 1) {slideIndex = slides.length}
    
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    for (let i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    
    slides[slideIndex-1].style.display = "block";
    dots[slideIndex-1].className += " active";
}

// Auto advance slides every 5 seconds
setInterval(() => {
    showSlides(slideIndex += 1);
}, 5000);

function toggleSidebar() {
    const sidebar = document.querySelector('.sidebar');
    sidebar.classList.toggle('active');
}

// Close sidebar when clicking outside
document.addEventListener('click', (e) => {
    const sidebar = document.querySelector('.sidebar');
    const sidebarToggle = document.querySelector('.sidebar-toggle');
    
    if (!sidebar.contains(e.target) && !sidebarToggle.contains(e.target) && sidebar.classList.contains('active')) {
        sidebar.classList.remove('active');
    }
});