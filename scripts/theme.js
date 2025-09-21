class ThemeManager {
    constructor() {
        this.currentTheme = 'dark';
        this.themeToggle = document.getElementById('theme-toggle');
        this.themeIcon = document.getElementById('theme-icon');
        this.body = document.body;
        
        this.init();
    }
    
    init() {
        // Load saved theme or default to dark
        this.currentTheme = localStorage.getItem('theme') || 'dark';
        this.applyTheme(this.currentTheme);
        
        // Add event listener
        if (this.themeToggle) {
            this.themeToggle.addEventListener('click', () => this.toggleTheme());
        }
        
        // Listen for system theme changes
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
            if (!localStorage.getItem('theme')) {
                this.applyTheme(e.matches ? 'dark' : 'light');
            }
        });
    }
    
    toggleTheme() {
        this.currentTheme = this.currentTheme === 'dark' ? 'light' : 'dark';
        this.applyTheme(this.currentTheme);
        localStorage.setItem('theme', this.currentTheme);
    }
    
    applyTheme(theme) {
        this.currentTheme = theme;
        
        // Remove existing theme classes
        this.body.classList.remove('theme-dark', 'theme-light');
        
        // Add new theme class
        this.body.classList.add(`theme-${theme}`);
        
        // Update icon
        if (this.themeIcon) {
            this.themeIcon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
        }
        
        // Dispatch theme change event
        window.dispatchEvent(new CustomEvent('themeChanged', { detail: { theme } }));
    }
    
    getCurrentTheme() {
        return this.currentTheme;
    }
}

// Initialize theme manager when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.themeManager = new ThemeManager();
});