// Theme management
const themeToggle = document.querySelector('.theme-toggle');
const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

// Load saved theme or use system preference
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    document.documentElement.dataset.theme = savedTheme;
} else if (prefersDarkScheme.matches) {
    document.documentElement.dataset.theme = 'dark';
}

// Toggle theme
themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.dataset.theme;
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.dataset.theme = newTheme;
    localStorage.setItem('theme', newTheme);
    
    // Update theme toggle icon
    const iconUse = themeToggle.querySelector('use');
    iconUse.setAttribute('href', `../assets/icons.svg#${newTheme === 'dark' ? 'moon' : 'sun'}`);
});

// Mobile menu
const menuToggle = document.querySelector('.header__menu-toggle');
const nav = document.querySelector('.nav');

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

// Smooth scroll for anchor links
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
            nav.classList.remove('is-active');
            menuToggle.setAttribute('aria-expanded', 'false');
        }
    });
});

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && nav.classList.contains('is-active')) {
        nav.classList.remove('is-active');
        menuToggle.setAttribute('aria-expanded', 'false');
        menuToggle.focus();
    }
});

// Update active nav link based on current page
const updateActiveNavLink = () => {
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav__link');
    
    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPath.split('/').pop()) {
            link.classList.add('nav__link--active');
        } else {
            link.classList.remove('nav__link--active');
        }
    });
};

updateActiveNavLink();