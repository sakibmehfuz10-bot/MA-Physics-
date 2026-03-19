/**
 * M.A Physics - Landing Page Scripts
 * Vanilla JavaScript
 */

document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initMobileNav();
    initHeroSlider();
    initContactForm();
    initSmoothScroll();
});

/**
 * Theme Management
 */
function initTheme() {
    const themeToggle = document.getElementById('theme-toggle');
    const html = document.documentElement;
    
    // Check for saved theme or system preference
    const savedTheme = localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'white');
    
    html.setAttribute('data-theme', savedTheme);
    
    themeToggle.addEventListener('click', () => {
        const currentTheme = html.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'white' : 'dark';
        
        html.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        
        // Update ARIA label if needed
        themeToggle.setAttribute('aria-label', `Switch to ${newTheme === 'dark' ? 'light' : 'dark'} mode`);
    });
}

/**
 * Mobile Navigation
 */
function initMobileNav() {
    const toggle = document.querySelector('.mobile-nav-toggle');
    const nav = document.getElementById('main-nav');
    const navLinks = document.querySelectorAll('.nav__link');
    
    toggle.addEventListener('click', () => {
        const isExpanded = toggle.getAttribute('aria-expanded') === 'true';
        toggle.setAttribute('aria-expanded', !isExpanded);
        nav.classList.toggle('active');
        document.body.classList.toggle('no-scroll');
    });
    
    // Close menu when a link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            toggle.setAttribute('aria-expanded', 'false');
            nav.classList.remove('active');
            document.body.classList.remove('no-scroll');
        });
    });
}

/**
 * Hero Slider
 */
function initHeroSlider() {
    const slider = document.getElementById('hero-slider');
    const track = document.getElementById('slider-track');
    const dotsContainer = document.getElementById('slider-dots');
    const prevBtn = document.querySelector('.slider__btn--prev');
    const nextBtn = document.querySelector('.slider__btn--next');
    
    const slideCount = 10;
    let currentSlide = 0;
    let autoplayInterval;
    
    // Create slides if they don't exist (or just manage the ones that do)
    // For this implementation, we'll assume the first 2 are in HTML and we add the rest
    const existingSlides = track.querySelectorAll('.slider__slide');
    if (existingSlides.length < slideCount) {
        for (let i = existingSlides.length + 1; i <= slideCount; i++) {
            const slide = document.createElement('div');
            slide.className = 'slider__slide';
            slide.setAttribute('role', 'group');
            slide.setAttribute('aria-roledescription', 'slide');
            slide.setAttribute('aria-label', `Physics hero image ${i} of ${slideCount}`);
            
            const img = document.createElement('img');
            img.src = `/assets/hero/hero${i}.jpg`;
            img.alt = `Physics hero image ${i}`;
            img.loading = 'lazy';
            
            slide.appendChild(img);
            track.appendChild(slide);
        }
    }
    
    const slides = track.querySelectorAll('.slider__slide');
    
    // Create dots
    slides.forEach((_, index) => {
        const dot = document.createElement('button');
        dot.className = `slider__dot ${index === 0 ? 'active' : ''}`;
        dot.setAttribute('aria-label', `Go to slide ${index + 1}`);
        dot.addEventListener('click', () => goToSlide(index));
        dotsContainer.appendChild(dot);
    });
    
    const dots = dotsContainer.querySelectorAll('.slider__dot');
    
    function goToSlide(index) {
        slides[currentSlide].classList.remove('active');
        dots[currentSlide].classList.remove('active');
        
        currentSlide = (index + slideCount) % slideCount;
        
        slides[currentSlide].classList.add('active');
        dots[currentSlide].classList.add('active');
        
        // Announce to screen readers if needed (ARIA live region could be used)
    }
    
    function nextSlide() {
        goToSlide(currentSlide + 1);
    }
    
    function prevSlide() {
        goToSlide(currentSlide - 1);
    }
    
    // Event Listeners
    nextBtn.addEventListener('click', () => {
        nextSlide();
        resetAutoplay();
    });
    
    prevBtn.addEventListener('click', () => {
        prevSlide();
        resetAutoplay();
    });
    
    // Keyboard Navigation
    slider.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            prevSlide();
            resetAutoplay();
        } else if (e.key === 'ArrowRight') {
            nextSlide();
            resetAutoplay();
        }
    });
    
    // Autoplay
    function startAutoplay() {
        autoplayInterval = setInterval(nextSlide, 4000);
    }
    
    function stopAutoplay() {
        clearInterval(autoplayInterval);
    }
    
    function resetAutoplay() {
        stopAutoplay();
        startAutoplay();
    }
    
    // Pause on hover
    slider.addEventListener('mouseenter', stopAutoplay);
    slider.addEventListener('mouseleave', startAutoplay);
    
    startAutoplay();
}

/**
 * Contact Form
 */
function initContactForm() {
    const form = document.getElementById('contact-form');
    const status = document.getElementById('form-status');
    
    if (!form) return;
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const formData = new FormData(form);
        const name = formData.get('name');
        
        // Simulate API call
        status.textContent = 'Sending...';
        status.className = 'form-status';
        
        setTimeout(() => {
            status.textContent = `Thank you, ${name}! Your message has been sent. We will contact you soon.`;
            status.className = 'form-status success';
            form.reset();
            
            // Clear status after 5 seconds
            setTimeout(() => {
                status.textContent = '';
                status.className = 'form-status';
            }, 5000);
        }, 1500);
    });
}

/**
 * Smooth Scroll Offset
 */
function initSmoothScroll() {
    // Offset for fixed header
    const headerHeight = 70;
    
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}
