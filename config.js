// Configuration Management - Handles theme and language persistence
(function () {
    const THEME_KEY = 'portfolio-theme';
    const LANG_KEY = 'portfolio-language';

    // Initialize configuration from localStorage
    function initConfig() {
        const savedTheme = localStorage.getItem(THEME_KEY) || 'light';
        const savedLang = localStorage.getItem(LANG_KEY) || 'en';

        // Apply theme
        document.documentElement.setAttribute('data-theme', savedTheme);

        // Apply language
        applyLanguage(savedLang);

        // Update button states
        updateButtonStates(savedTheme, savedLang);
    }

    // Apply language to all translatable elements
    function applyLanguage(lang) {
        const translatableElements = document.querySelectorAll('[data-en]');
        translatableElements.forEach(el => {
            el.innerHTML = el.getAttribute(`data-${lang}`);
            // el.textContent = el.getAttribute(`data-${lang}`);
        });
        localStorage.setItem(LANG_KEY, lang);
        if (window.MathJax && window.MathJax.typesetPromise) {
            window.MathJax.typesetPromise().catch((err) => console.log('MathJax error:', err));
        }
    }

    // Update button visual states
    function updateButtonStates(theme, lang) {
        const themeToggle = document.getElementById('theme-toggle');
        const langToggle = document.getElementById('lang-toggle');

        if (themeToggle) {
            themeToggle.textContent = theme === 'light' ? '🌙' : '☀️';
        }
    }

    // Setup event listeners
    function setupEventListeners() {
        const themeToggle = document.getElementById('theme-toggle');
        const langToggle = document.getElementById('lang-toggle');
        const tabButtons = document.querySelectorAll('.tab-btn');
        const tabContents = document.querySelectorAll('.tab-content');

        // 1. Tab Switching Logic
        if (tabButtons.length && tabContents.length) {
            tabButtons.forEach(btn => {
                btn.addEventListener('click', () => {
                    const target = btn.getAttribute('data-tab');

                    tabButtons.forEach(b => b.classList.remove('active'));
                    tabContents.forEach(c => c.classList.remove('active'));

                    btn.classList.add('active');
                    document.getElementById(target).classList.add('active');
                });
            });
        }

        // Theme toggle with null check
        if (themeToggle) {
            themeToggle.addEventListener('click', () => {
                const htmlElement = document.documentElement;
                const currentTheme = htmlElement.getAttribute('data-theme');
                const newTheme = currentTheme === 'light' ? 'dark' : 'light';

                htmlElement.setAttribute('data-theme', newTheme);
                themeToggle.textContent = newTheme === 'light' ? '🌙' : '☀️';
                localStorage.setItem(THEME_KEY, newTheme);
            });
        }

        // Language toggle with null check
        if (langToggle) {
            langToggle.addEventListener('click', () => {
                // Read current language from localStorage inside handler
                const currentLang = localStorage.getItem(LANG_KEY) || 'en';
                const newLang = currentLang === 'en' ? 'es' : 'en';
                applyLanguage(newLang);
            });
        }
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            initConfig();
            setupEventListeners();
        });
    } else {
        initConfig();
        setupEventListeners();
    }
})();
