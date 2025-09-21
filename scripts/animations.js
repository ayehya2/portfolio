class AnimationManager {
    constructor() {
        this.init();
    }
    
    init() {
        this.initScrollAnimations();
        this.initBinaryFlicker();
        this.initNameMorphing();
        this.initBinaryHover();
        this.initCursorAvatar();
        this.initBackToTop();
    }
    
    // Scroll-based animations
    initScrollAnimations() {
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, observerOptions);
        
        // Observe elements for scroll animations
        document.querySelectorAll('.timeline-item, .project-card, .skill-category').forEach(el => {
            el.classList.add('fade-in-up');
            observer.observe(el);
        });
    }
    
    // Binary flickering effect for degree text
    initBinaryFlicker() {
        const degreeText = document.querySelector('.binary-flicker');
        if (!degreeText) return;
        
        const originalText = degreeText.textContent;
        const arabicBinary = ['٠', '١'];
        
        setInterval(() => {
            if (Math.random() < 0.3) { // 30% chance to flicker
                const textArray = originalText.split('');
                const randomIndex = Math.floor(Math.random() * textArray.length);
                const randomBinary = arabicBinary[Math.floor(Math.random() * arabicBinary.length)];
                
                textArray[randomIndex] = randomBinary;
                degreeText.textContent = textArray.join('');
                
                setTimeout(() => {
                    degreeText.textContent = originalText;
                }, 150);
            }
        }, 1000);
    }
    
    // Name morphing effect on hover
    initNameMorphing() {
        document.querySelectorAll('.name-element').forEach(nameEl => {
            const originalName = nameEl.dataset.original;
            const altName = nameEl.dataset.alt;
            let isHovering = false;
            let flickerTimeout;
            
            nameEl.addEventListener('mouseenter', () => {
                isHovering = true;
                this.startNameFlicker(nameEl, originalName, altName);
            });
            
            nameEl.addEventListener('mouseleave', () => {
                isHovering = false;
                clearTimeout(flickerTimeout);
                this.morphName(nameEl, altName, originalName);
            });
        });
    }
    
    startNameFlicker(element, originalName, altName) {
        const arabicBinary = ['٠', '١'];
        let flickerCount = 0;
        const maxFlickers = 10;
        
        const flicker = () => {
            if (flickerCount < maxFlickers) {
                const textArray = originalName.split('');
                const numChanges = Math.floor(Math.random() * 3) + 1;
                
                for (let i = 0; i < numChanges; i++) {
                    const randomIndex = Math.floor(Math.random() * textArray.length);
                    textArray[randomIndex] = arabicBinary[Math.floor(Math.random() * arabicBinary.length)];
                }
                
                element.textContent = textArray.join('');
                flickerCount++;
                
                setTimeout(flicker, 100);
            } else {
                this.morphName(element, originalName, altName);
            }
        };
        
        flicker();
    }
    
    morphName(element, fromName, toName) {
        element.style.filter = 'blur(2px)';
        element.style.opacity = '0.5';
        
        setTimeout(() => {
            element.textContent = toName;
            element.style.filter = 'blur(0)';
            element.style.opacity = '1';
        }, 200);
    }
    
    // Binary hover effects for navigation links
    initBinaryHover() {
        document.querySelectorAll('.nav-link, .footer-link').forEach(link => {
            link.addEventListener('mouseenter', () => {
                this.createBinaryOverlay(link);
            });
            
            link.addEventListener('mouseleave', () => {
                this.removeBinaryOverlay(link);
            });
        });
    }
    
    createBinaryOverlay(element) {
        const overlay = document.createElement('div');
        overlay.className = 'binary-overlay';
        
        const arabicBinary = ['٠', '١'];
        const numDigits = 8;
        
        for (let i = 0; i < numDigits; i++) {
            const digit = document.createElement('span');
            digit.className = 'binary-digit';
            digit.textContent = arabicBinary[Math.floor(Math.random() * arabicBinary.length)];
            digit.style.left = `${Math.random() * 100}%`;
            digit.style.animationDelay = `${Math.random() * 2}s`;
            digit.style.animationDuration = `${2 + Math.random() * 2}s`;
            
            overlay.appendChild(digit);
        }
        
        element.style.position = 'relative';
        element.appendChild(overlay);
    }
    
    removeBinaryOverlay(element) {
        const overlay = element.querySelector('.binary-overlay');
        if (overlay) {
            overlay.remove();
        }
    }
    
    // Cursor tracking avatar
    initCursorAvatar() {
        const avatar = document.getElementById('cursor-avatar');
        const eyes = avatar?.querySelectorAll('.avatar-eye');
        
        if (!avatar || !eyes.length) return;
        
        document.addEventListener('mousemove', (e) => {
            const avatarRect = avatar.getBoundingClientRect();
            const avatarCenterX = avatarRect.left + avatarRect.width / 2;
            const avatarCenterY = avatarRect.top + avatarRect.height / 2;
            
            const deltaX = e.clientX - avatarCenterX;
            const deltaY = e.clientY - avatarCenterY;
            
            const angle = Math.atan2(deltaY, deltaX);
            const distance = Math.min(3, Math.sqrt(deltaX * deltaX + deltaY * deltaY) / 100);
            
            const eyeX = Math.cos(angle) * distance;
            const eyeY = Math.sin(angle) * distance;
            
            eyes.forEach(eye => {
                eye.style.transform = `translate(${eyeX}px, ${eyeY}px)`;
            });
        });
    }
    
    // Back to top button
    initBackToTop() {
        const backToTopBtn = document.getElementById('back-to-top');
        if (!backToTopBtn) return;
        
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        });
        
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // Theme-specific scroll effects
    initThemeScrollEffects() {
        window.addEventListener('themeChanged', (e) => {
            const theme = e.detail.theme;
            
            if (theme === 'dark') {
                this.initDarkScrollEffects();
            } else {
                this.initLightScrollEffects();
            }
        });
    }
    
    initDarkScrollEffects() {
        // Add glitch effects, scanlines, etc.
        document.querySelectorAll('.section-title').forEach(title => {
            title.classList.add('glitch-effect');
            title.dataset.text = title.textContent;
        });
    }
    
    initLightScrollEffects() {
        // Add warm, analog effects
        document.querySelectorAll('.project-card, .skill-category').forEach(card => {
            card.classList.add('warm-glow');
        });
    }
}

// Initialize animations when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.animationManager = new AnimationManager();
});