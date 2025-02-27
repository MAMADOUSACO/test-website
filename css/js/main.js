document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileMenuClose = document.querySelector('.mobile-menu-close');
    
    if (hamburgerMenu && mobileMenu) {
        // Create overlay element
        const overlay = document.createElement('div');
        overlay.className = 'mobile-menu-overlay';
        document.body.appendChild(overlay);
        
        hamburgerMenu.addEventListener('click', function() {
            mobileMenu.classList.add('active');
            overlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
        
        mobileMenuClose.addEventListener('click', function() {
            mobileMenu.classList.remove('active');
            overlay.classList.remove('active');
            document.body.style.overflow = '';
        });
        
        overlay.addEventListener('click', function() {
            mobileMenu.classList.remove('active');
            overlay.classList.remove('active');
            document.body.style.overflow = '';
        });
    }
    
    // Mobile Dropdown Toggle
    const mobileDropdowns = document.querySelectorAll('.mobile-dropdown-header');
    
    mobileDropdowns.forEach(dropdown => {
        dropdown.addEventListener('click', function() {
            this.parentElement.classList.toggle('active');
        });
    });
    
    // Achievement Dropdown Toggle
    const viewMoreAchievements = document.querySelector('.view-more-achievements');
    const achievementsDropdown = document.querySelector('.next-achievements-dropdown');
    
    if (viewMoreAchievements && achievementsDropdown) {
        viewMoreAchievements.addEventListener('click', function() {
            if (achievementsDropdown.style.display === 'block') {
                achievementsDropdown.style.display = 'none';
                this.querySelector('i').className = 'fas fa-chevron-down';
            } else {
                achievementsDropdown.style.display = 'block';
                this.querySelector('i').className = 'fas fa-chevron-up';
            }
        });
    }
    
    // Carousel Pagination
    const paginationDots = document.querySelectorAll('.pagination-dot');
    
    paginationDots.forEach(dot => {
        dot.addEventListener('click', function() {
            const dotIndex = Array.from(this.parentElement.children).indexOf(this);
            const carousel = this.closest('.carousel').querySelector('.carousel-inner');
            const cardWidth = carousel.querySelector('.simulation-card').offsetWidth;
            const margin = parseInt(window.getComputedStyle(carousel.querySelector('.simulation-card')).marginRight);
            
            carousel.scrollTo({
                left: dotIndex * (cardWidth + margin),
                behavior: 'smooth'
            });
            
            // Update active dot
            Array.from(this.parentElement.children).forEach(d => d.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    // Performance Monitoring Setup
    setupPerformanceMonitor();
});

// Performance Monitoring Function
function setupPerformanceMonitor() {
    let fps = 0;
    let lastLoop = performance.now();
    let frameCount = 0;
    let lastFpsUpdate = 0;
    
    function countFPS() {
        const now = performance.now();
        const elapsed = now - lastLoop;
        
        // Only update FPS display every 500ms
        if (now - lastFpsUpdate > 500) {
            fps = Math.round(frameCount / ((now - lastFpsUpdate) / 1000));
            frameCount = 0;
            lastFpsUpdate = now;
            
            // Update any FPS counters on the page
            const fpsCounters = document.querySelectorAll('.fps-counter');
            fpsCounters.forEach(counter => {
                counter.textContent = fps;
            });
        }
        
        frameCount++;
        lastLoop = now;
        requestAnimationFrame(countFPS);
    }
    
    // Start counting frames
    requestAnimationFrame(countFPS);
}