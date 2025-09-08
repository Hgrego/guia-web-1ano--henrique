// Mobile menu
function initMobileMenu() {
    const menuToggle = document.querySelector('.header__menu-toggle');
    const nav = document.querySelector('.nav');
    if (!menuToggle || !nav) return;

    menuToggle.addEventListener('click', () => {
        const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
        menuToggle.setAttribute('aria-expanded', !isExpanded);
        nav.classList.toggle('is-active');
    });

    // Close menu when clicking outside
    document.addEventListener('click', (event) => {
        if (!event.target.closest('.header__menu-toggle') && 
            !event.target.closest('.nav') && 
            nav.classList.contains('is-active')) {
            nav.classList.remove('is-active');
            menuToggle.setAttribute('aria-expanded', 'false');
        }
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && nav.classList.contains('is-active')) {
            nav.classList.remove('is-active');
            menuToggle.setAttribute('aria-expanded', 'false');
            menuToggle.focus();
        }
    });
}

// Smooth scroll
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.querySelector(anchor.getAttribute('href'));
            
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Close mobile menu if open
                const nav = document.querySelector('.nav');
                const menuToggle = document.querySelector('.header__menu-toggle');
                if (nav && menuToggle) {
                    nav.classList.remove('is-active');
                    menuToggle.setAttribute('aria-expanded', 'false');
                }
            }
        });
    });
}

// Active nav link
function updateActiveNavLink() {
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav__link');
    
    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPath.split('/').pop()) {
            link.classList.add('nav__link--active');
        } else {
            link.classList.remove('nav__link--active');
        }
    });
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initMobileMenu();
    initSmoothScroll();
    updateActiveNavLink();
});