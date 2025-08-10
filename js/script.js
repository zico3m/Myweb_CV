// DOM Elements
const themeToggle = document.getElementById('themeToggle');
const langArBtn = document.getElementById('langAr');
const langEnBtn = document.getElementById('langEn');
const html = document.documentElement;

// Check for saved theme preference or use preferred color scheme
const savedTheme = localStorage.getItem('theme') || 'light';
const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

// Apply the saved theme or system preference
function applyTheme(theme) {
    document.body.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    themeToggle.checked = theme === 'dark';
}

// Set initial theme
if (savedTheme === 'dark' || (!savedTheme && prefersDarkScheme.matches)) {
    applyTheme('dark');
} else {
    applyTheme('light');
}

// Toggle theme
function toggleTheme() {
    const currentTheme = document.body.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    applyTheme(newTheme);
}

// Language switching
function switchLanguage(lang) {
    // Update HTML lang attribute and direction
    html.lang = lang;
    html.dir = lang === 'ar' ? 'rtl' : 'ltr';
    
    // Update active button
    if (lang === 'ar') {
        langArBtn.classList.add('active');
        langEnBtn.classList.remove('active');
    } else {
        langEnBtn.classList.add('active');
        langArBtn.classList.remove('active');
    }
    
    // Update all elements with data attributes for translation
    document.querySelectorAll('[data-en], [data-ar]').forEach(element => {
        const key = lang === 'ar' ? 'ar' : 'en';
        const text = element.getAttribute(`data-${key}`);
        if (text) {
            element.textContent = text;
        }
    });
    
    // Save language preference
    localStorage.setItem('language', lang);
}

// Set initial language
const savedLanguage = localStorage.getItem('language') || 'ar';
switchLanguage(savedLanguage);

// Event Listeners
themeToggle.addEventListener('change', toggleTheme);

langArBtn.addEventListener('click', () => switchLanguage('ar'));
langEnBtn.addEventListener('click', () => switchLanguage('en'));

// Update current year in footer
document.getElementById('currentYear').textContent = new Date().getFullYear();

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
            
            // Update active nav link
            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active');
            });
            this.classList.add('active');
        }
    });
});

// Add active class to current section in viewport
window.addEventListener('scroll', () => {
    const scrollPosition = window.scrollY;
    
    document.querySelectorAll('section').forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
});

// Add animation on scroll
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.section, .skill-category, .language-item, .hobbies-list li');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (elementTop < windowHeight - 100) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
};

// Set initial styles for animation
document.addEventListener('DOMContentLoaded', () => {
    const elements = document.querySelectorAll('.section, .skill-category, .language-item, .hobbies-list li');
    elements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    });
    
    // Trigger initial animation
    setTimeout(animateOnScroll, 100);
});

// Listen for scroll events
window.addEventListener('scroll', animateOnScroll);

// Handle contact form submission (if added later)
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        // Add form submission logic here
        alert('Thank you for your message! I will get back to you soon.');
        this.reset();
    });
}
