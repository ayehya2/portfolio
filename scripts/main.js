class MainApplication {
    constructor() {
        this.init();
    }
    
    init() {
        this.initSmoothScroll();
        this.initActiveNavigation();
        this.initTypingEffect();
        this.initParallaxEffects();
        this.initLazyLoading();
    }
    
    // Smooth scrolling for navigation links
    initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                
                const targetId = link.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    const headerHeight = document.querySelector('.site-header').offsetHeight;
                    const targetPosition = targetElement.offsetTop - headerHeight - 20;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
    
    // Update active navigation based on scroll position
    initActiveNavigation() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
        
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const id = entry.target.getAttribute('id');
                        
                        // Update active navigation
                        navLinks.forEach(link => {
                            link.classList.remove('active');
                            if (link.getAttribute('href') === `#${id}`) {
                                link.classList.add('active');
                            }
                        });
                    }
                });
            },
            {
                rootMargin: '-100px 0px',
                threshold: 0.1
            }
        );
        
        sections.forEach(section => observer.observe(section));
    }
    
    // Typing effect for hero section
    initTypingEffect() {
        const greetingElements = document.querySelectorAll('.greeting-code, .greeting-arabic');
        
        greetingElements.forEach((element, index) => {
            const text = element.textContent;
            element.textContent = '';
            element.classList.add('typing-animation');
            
            setTimeout(() => {
                this.typeText(element, text, 100);
            }, index * 1000);
        });
    }
    
    typeText(element, text, speed) {
        let i = 0;
        const timer = setInterval(() => {
            element.textContent += text.charAt(i);
            i++;
            
            if (i >= text.length) {
                clearInterval(timer);
                element.classList.remove('typing-animation');
            }
        }, speed);
    }
    
    // Parallax effects for hero section
    initParallaxEffects() {
        const heroSection = document.querySelector('.hero-section');
        const arabicCircle = document.querySelector('.name-arabic-circle');
        
        if (!heroSection || !arabicCircle) return;
        
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const parallax = scrolled * 0.3;
            
            if (scrolled < window.innerHeight) {
                arabicCircle.style.transform = `translateY(${parallax}px) rotate(${scrolled * 0.1}deg)`;
            }
        });
    }
    
    // Lazy loading for images and content
    initLazyLoading() {
        const lazyElements = document.querySelectorAll('[data-lazy]');
        
        if ('IntersectionObserver' in window) {
            const lazyObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const lazyElement = entry.target;
                        
                        if (lazyElement.dataset.lazySrc) {
                            lazyElement.src = lazyElement.dataset.lazySrc;
                            lazyElement.removeAttribute('data-lazy-src');
                        }
                        
                        if (lazyElement.dataset.lazyBg) {
                            lazyElement.style.backgroundImage = `url(${lazyElement.dataset.lazyBg})`;
                            lazyElement.removeAttribute('data-lazy-bg');
                        }
                        
                        lazyElement.removeAttribute('data-lazy');
                        lazyObserver.unobserve(lazyElement);
                    }
                });
            });
            
            lazyElements.forEach(element => lazyObserver.observe(element));
        }
    }
    
    // Add theme-specific particle effects
    initParticleEffects() {
        window.addEventListener('themeChanged', (e) => {
            const theme = e.detail.theme;
            
            if (theme === 'dark') {
                this.createMatrixEffect();
            } else {
                this.removeParticleEffects();
            }
        });
        
        // Initialize for current theme
        const currentTheme = document.body.classList.contains('theme-dark') ? 'dark' : 'light';
        if (currentTheme === 'dark') {
            this.createMatrixEffect();
        }
    }
    
    createMatrixEffect() {
        const heroSection = document.querySelector('.hero-section');
        if (!heroSection || heroSection.querySelector('.matrix-bg')) return;
        
        const matrixContainer = document.createElement('div');
        matrixContainer.className = 'matrix-bg';
        
        const characters = '10٠١ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
        
        for (let i = 0; i < 20; i++) {
            const char = document.createElement('div');
            char.className = 'matrix-char';
            char.textContent = characters.charAt(Math.floor(Math.random() * characters.length));
            char.style.left = `${Math.random() * 100}%`;
            char.style.animationDuration = `${5 + Math.random() * 10}s`;
            char.style.animationDelay = `${Math.random() * 5}s`;
            
            matrixContainer.appendChild(char);
        }
        
        heroSection.appendChild(matrixContainer);
    }
    
    removeParticleEffects() {
        document.querySelectorAll('.matrix-bg, .particles').forEach(element => {
            element.remove();
        });
    }
    
    // Performance monitoring
    initPerformanceMonitoring() {
        if ('performance' in window && 'PerformanceObserver' in window) {
            const observer = new PerformanceObserver((list) => {
                list.getEntries().forEach(entry => {
                    // Monitor Largest Contentful Paint
                    if (entry.entryType === 'largest-contentful-paint') {
                        console.log(`LCP: ${entry.startTime}ms`);
                    }
                    
                    // Monitor First Input Delay
                    if (entry.entryType === 'first-input') {
                        console.log(`FID: ${entry.processingStart - entry.startTime}ms`);
                    }
                });
            });
            
            observer.observe({ entryTypes: ['largest-contentful-paint', 'first-input'] });
        }
    }
    
    // Accessibility improvements
    initAccessibility() {
        // Skip to main content link
        this.addSkipLink();
        
        // Focus management
        this.initFocusManagement();
        
        // ARIA live regions
        this.initLiveRegions();
    }
    
    addSkipLink() {
        const skipLink = document.createElement('a');
        skipLink.href = '#main-content';
        skipLink.textContent = 'Skip to main content';
        skipLink.className = 'sr-only';
        skipLink.style.position = 'absolute';
        skipLink.style.top = '0';
        skipLink.style.left = '0';
        skipLink.style.zIndex = '9999';
        
        skipLink.addEventListener('focus', () => {
            skipLink.classList.remove('sr-only');
        });
        
        skipLink.addEventListener('blur', () => {
            skipLink.classList.add('sr-only');
        });
        
        document.body.insertBefore(skipLink, document.body.firstChild);
    }
    
    initFocusManagement() {
        // Trap focus in modals, dropdowns, etc.
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                // Close any open modals or dropdowns
                this.closeModals();
            }
            
            if (e.key === 'Tab') {
                // Focus management for interactive elements
                this.manageFocus(e);
            }
        });
    }
    
    initLiveRegions() {
        // Create aria-live region for dynamic announcements
        const liveRegion = document.createElement('div');
        liveRegion.setAttribute('aria-live', 'polite');
        liveRegion.setAttribute('aria-atomic', 'true');
        liveRegion.className = 'sr-only';
        liveRegion.id = 'live-region';
        
        document.body.appendChild(liveRegion);
    }
    
    announce(message) {
        const liveRegion = document.getElementById('live-region');
        if (liveRegion) {
            liveRegion.textContent = message;
            
            setTimeout(() => {
                liveRegion.textContent = '';
            }, 3000);
        }
    }
    
    closeModals() {
        // Close any open modal dialogs
        document.querySelectorAll('.modal, .dropdown').forEach(modal => {
            modal.classList.remove('active', 'open');
        });
    }
    
    manageFocus(e) {
        // Implement focus trap logic if needed
        const focusableElements = document.querySelectorAll(
            'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
        );
        
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];
        
        if (e.shiftKey && document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
        } else if (!e.shiftKey && document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
        }
    }
}

// Initialize main application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.mainApp = new MainApplication();
});

// Service Worker registration (for PWA capabilities)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}

// Error handling
window.addEventListener('error', (e) => {
    console.error('Global error:', e.error);
    
    // You can send errors to an error tracking service here
    // trackError(e.error);
});

window.addEventListener('unhandledrejection', (e) => {
    console.error('Unhandled promise rejection:', e.reason);
    
    // You can send errors to an error tracking service here
    // trackError(e.reason);
});