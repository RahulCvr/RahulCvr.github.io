// Theme toggle functionality
class ThemeManager {
    constructor() {
        this.themeToggle = null;
        this.html = document.documentElement;
        
        // Always default to light theme if no preference is set
        const savedTheme = localStorage.getItem('theme');
        this.currentTheme = savedTheme || 'light';
        
        // Apply the theme immediately
        this.applyTheme(this.currentTheme);
        
        this.init();
    }

    init() {
        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.setup());
        } else {
            this.setup();
        }
    }

    setup() {
        this.themeToggle = document.getElementById('theme-toggle');
        
        if (!this.themeToggle) {
            console.warn('Theme toggle button not found');
            return;
        }

        // Update the toggle UI to match current theme
        this.updateThemeIcon(this.currentTheme);

        // Add click handler
        this.themeToggle.addEventListener('click', () => this.toggleTheme());

        // Listen for system theme changes (but don't auto-apply them)
        this.setupSystemThemeListener();
    }

    applyTheme(theme) {
        if (theme === 'dark') {
            this.html.classList.add('dark');
        } else {
            this.html.classList.remove('dark');
        }
        
        this.updateThemeIcon(theme);
        this.currentTheme = theme;
    }

    updateThemeIcon(theme) {
        if (!this.themeToggle) return;

        const sunIcon = this.themeToggle.querySelector('.sun-icon');
        const moonIcon = this.themeToggle.querySelector('.moon-icon');
        
        if (!sunIcon || !moonIcon) return;

        if (theme === 'dark') {
            sunIcon.classList.remove('hidden');
            moonIcon.classList.add('hidden');
        } else {
            sunIcon.classList.add('hidden');
            moonIcon.classList.remove('hidden');
        }
    }

    toggleTheme() {
        const newTheme = this.currentTheme === 'dark' ? 'light' : 'dark';
        
        // Save preference
        localStorage.setItem('theme', newTheme);
        
        // Apply new theme
        this.applyTheme(newTheme);
    }

    setupSystemThemeListener() {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        
        mediaQuery.addEventListener('change', (e) => {
            // Only auto-switch if user hasn't set a preference
            if (!localStorage.getItem('theme')) {
                const systemTheme = e.matches ? 'dark' : 'light';
                this.applyTheme('light'); // Always default to light
            }
        });

        // Apply light theme by default if no preference is set
        if (!localStorage.getItem('theme')) {
            this.applyTheme('light');
        }
    }

    getCurrentTheme() {
        return this.currentTheme;
    }

    isDarkMode() {
        return this.currentTheme === 'dark';
    }
}

// Initialize theme manager
window.themeManager = new ThemeManager(); 