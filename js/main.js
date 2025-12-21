/**
 * Linux One-Page Website - Main JavaScript
 * Handles animations, scroll effects, and interactions
 */

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// ===================================
// Particle Background
// ===================================
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    if (!particlesContainer) return;

    // Clear any existing particles first
    particlesContainer.innerHTML = '';

    const particleCount = 50;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';

        // Random horizontal position
        particle.style.left = Math.random() * 100 + '%';

        // Animation duration
        const duration = 12 + Math.random() * 8;
        particle.style.animationDuration = duration + 's';

        // NEGATIVE delay = start mid-animation (particles already on screen)
        // Some particles start immediately visible, some spawn later
        const delay = -Math.random() * duration;
        particle.style.animationDelay = delay + 's';

        // Random size
        const size = 2 + Math.random() * 4;
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';

        particlesContainer.appendChild(particle);
    }
}

// ===================================
// Typewriter Effect
// ===================================
function typewriterEffect() {
    const element = document.getElementById('typewriter');
    if (!element) return;

    const text = "Svobodný, open-source operační systém, který pohání internet, superpočítače i váš telefon.";
    let index = 0;

    function type() {
        if (index < text.length) {
            element.textContent += text.charAt(index);
            index++;
            setTimeout(type, 40);
        }
    }

    // Start after hero animation
    setTimeout(type, 1500);
}

// ===================================
// Navigation
// ===================================
function initNavigation() {
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Scroll effect
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        // Add scrolled class for background
        if (currentScroll > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        lastScroll = currentScroll;
    });

    // Mobile toggle
    if (navToggle) {
        navToggle.addEventListener('click', () => {
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }

    // Close mobile menu on link click
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
}

// ===================================
// Scroll Animations
// ===================================
function initScrollAnimations() {
    // About section text
    gsap.to('.about-text', {
        opacity: 1,
        y: 0,
        duration: 1,
        scrollTrigger: {
            trigger: '.about-text',
            start: 'top 80%',
            toggleActions: 'play none none reverse'
        }
    });

    // Stat cards stagger
    gsap.to('.stat-card', {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.15,
        scrollTrigger: {
            trigger: '.about-stats',
            start: 'top 80%',
            toggleActions: 'play none none reverse'
        }
    });

    // Timeline items
    gsap.utils.toArray('.timeline-item').forEach((item, index) => {
        gsap.to(item, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            scrollTrigger: {
                trigger: item,
                start: 'top 85%',
                toggleActions: 'play none none reverse'
            }
        });
    });

    // Creator info
    gsap.to('.creator-info', {
        opacity: 1,
        x: 0,
        duration: 1,
        scrollTrigger: {
            trigger: '.creator-info',
            start: 'top 75%',
            toggleActions: 'play none none reverse'
        }
    });

    // Distribution cards
    gsap.to('.distro-card', {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.1,
        scrollTrigger: {
            trigger: '.distros-grid',
            start: 'top 80%',
            toggleActions: 'play none none reverse'
        }
    });
}

// ===================================
// Counter Animation for Stats
// ===================================
function initCounters() {
    const counters = document.querySelectorAll('.stat-number');

    counters.forEach(counter => {
        const target = parseFloat(counter.dataset.count);
        const isDecimal = target % 1 !== 0;

        ScrollTrigger.create({
            trigger: counter,
            start: 'top 85%',
            onEnter: () => animateCounter(counter, target, isDecimal),
            once: true
        });
    });
}

function animateCounter(element, target, isDecimal) {
    const duration = 2000;
    const start = performance.now();

    function update(currentTime) {
        const elapsed = currentTime - start;
        const progress = Math.min(elapsed / duration, 1);

        // Easing function (ease-out)
        const easeProgress = 1 - Math.pow(1 - progress, 3);
        const current = target * easeProgress;

        if (isDecimal) {
            element.textContent = current.toFixed(1);
        } else {
            element.textContent = Math.floor(current);
        }

        if (progress < 1) {
            requestAnimationFrame(update);
        } else {
            element.textContent = isDecimal ? target.toFixed(1) : target;
        }
    }

    requestAnimationFrame(update);
}

// ===================================
// Smooth Scroll
// ===================================
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// ===================================
// Parallax Effects
// ===================================
function initParallax() {
    // Glow ring parallax
    gsap.to('.glow-ring', {
        y: 100,
        scrollTrigger: {
            trigger: '.hero',
            start: 'top top',
            end: 'bottom top',
            scrub: 1
        }
    });

    // Hero content parallax
    gsap.to('.hero-content', {
        y: 150,
        opacity: 0,
        scrollTrigger: {
            trigger: '.hero',
            start: 'top top',
            end: 'bottom top',
            scrub: 1
        }
    });
}

// ===================================
// Section Reveal Animation
// ===================================
function initSectionReveal() {
    gsap.utils.toArray('.section-header').forEach(header => {
        gsap.from(header, {
            opacity: 0,
            y: 50,
            duration: 1,
            scrollTrigger: {
                trigger: header,
                start: 'top 85%',
                toggleActions: 'play none none reverse'
            }
        });
    });
}

// ===================================
// Creator Image Glow Animation
// ===================================
function initCreatorGlow() {
    const imageFrame = document.querySelector('.image-frame');
    if (!imageFrame) return;

    imageFrame.addEventListener('mousemove', (e) => {
        const rect = imageFrame.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        gsap.to('.frame-glow', {
            x: x * 0.2,
            y: y * 0.2,
            duration: 0.5
        });
    });

    imageFrame.addEventListener('mouseleave', () => {
        gsap.to('.frame-glow', {
            x: 0,
            y: 0,
            duration: 0.5
        });
    });
}

// ===================================
// Distro Card Hover Effect
// ===================================
function initDistroCards() {
    const cards = document.querySelectorAll('.distro-card');

    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;

            // Move glow to cursor position
            const glow = card.querySelector('.card-glow');
            if (glow) {
                glow.style.transform = `translate(${x - rect.width}px, ${y - rect.height}px)`;
            }
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
        });
    });
}

// ===================================
// Timeline Line Animation
// ===================================
function initTimelineAnimation() {
    const timelineLine = document.querySelector('.timeline-line');
    if (!timelineLine) return;

    gsap.fromTo(timelineLine,
        { scaleY: 0, transformOrigin: 'top' },
        {
            scaleY: 1,
            duration: 1.5,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: '.timeline',
                start: 'top 70%',
                toggleActions: 'play none none reverse'
            }
        }
    );
}

// ===================================
// Initialize Everything
// ===================================
document.addEventListener('DOMContentLoaded', () => {
    createParticles();
    typewriterEffect();
    initNavigation();
    initScrollAnimations();
    initCounters();
    initSmoothScroll();
    initParallax();
    initSectionReveal();
    initCreatorGlow();
    initDistroCards();
    initTimelineAnimation();

    console.log('🐧 Linux One-Page loaded!');
});

// Handle page visibility
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        // Pause heavy animations when tab is hidden
        gsap.globalTimeline.pause();
    } else {
        gsap.globalTimeline.resume();
    }
});
