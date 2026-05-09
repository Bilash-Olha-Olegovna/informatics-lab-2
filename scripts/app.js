/**
 * GenAI EdTech Platform Core
 * Modular Architecture using ES6 Classes
 */

(() => {
    'use strict';

    // 1. STORAGE MODULE
    class StorageModule {
        static get(key, defaultValue = null) {
            try {
                const item = localStorage.getItem(`genai_${key}`);
                return item ? JSON.parse(item) : defaultValue;
            } catch (e) { return defaultValue; }
        }
        static set(key, value) {
            localStorage.setItem(`genai_${key}`, JSON.stringify(value));
        }
    }

    // 2. XP & PROGRESS MODULE
    class ProgressSystem {
        constructor() {
            this.xp = StorageModule.get('xp', 0);
            this.level = Math.floor(this.xp / 100) + 1;
            this.updateUI();
        }

        addXP(amount) {
            this.xp += amount;
            this.level = Math.floor(this.xp / 100) + 1;
            StorageModule.set('xp', this.xp);
            this.updateUI();
            UI.showToast(`🏆 Отримано +${amount} XP!`, 'success');
        }

        updateUI() {
            const xpText = document.getElementById('xp-counter');
            const levelText = document.getElementById('level-counter');
            const xpBar = document.getElementById('xp-bar');
            
            if (xpText) xpText.innerText = `${this.xp} XP`;
            if (levelText) levelText.innerText = `Рівень ${this.level}`;
            if (xpBar) {
                const progress = (this.xp % 100) + '%';
                xpBar.style.width = progress;
            }
        }
    }

    // 3. UI & ACCESSIBILITY MODULE
    class UIModule {
        constructor() {
            this.toastContainer = document.createElement('div');
            this.toastContainer.id = 'toast-container';
            this.toastContainer.setAttribute('aria-live', 'polite');
            document.body.appendChild(this.toastContainer);
            this.setupServiceWorker();
        }

        showToast(message, type = 'success') {
            const toast = document.createElement('div');
            toast.className = `toast toast-${type}`;
            toast.innerHTML = message;
            this.toastContainer.appendChild(toast);
            setTimeout(() => {
                toast.style.opacity = '0';
                setTimeout(() => toast.remove(), 300);
            }, 3000);
        }

        setupServiceWorker() {
            if ('serviceWorker' in navigator) {
                window.addEventListener('load', () => {
                    navigator.serviceWorker.register('../sw.js').catch(err => console.log('SW Setup Failed', err));
                });
            }
        }
    }

    // 4. THEME MODULE
    class ThemeModule {
        constructor() {
            this.theme = StorageModule.get('theme', 'dark');
            this.toggleBtn = document.getElementById('themeToggle');
            this.applyTheme(this.theme);
            if (this.toggleBtn) {
                this.toggleBtn.addEventListener('click', () => this.toggle());
                this.toggleBtn.setAttribute('aria-label', 'Перемикач темної та світлої теми');
            }
        }

        toggle() {
            this.theme = this.theme === 'light' ? 'dark' : 'light';
            StorageModule.set('theme', this.theme);
            this.applyTheme(this.theme);
        }

        applyTheme(theme) {
            document.documentElement.setAttribute('data-theme', theme);
            if (this.toggleBtn) this.toggleBtn.innerHTML = theme === 'dark' ? '☀️' : '🌙';
        }
    }

    // Initialize App
    const UI = new UIModule();
    window.Progress = new ProgressSystem(); // Exposed for Quizzes
    
    document.addEventListener('DOMContentLoaded', () => {
        new ThemeModule();
        
        // Track page view XP (Reward for reading)
        if(!StorageModule.get(`visited_${window.location.pathname}`)) {
            setTimeout(() => {
                window.Progress.addXP(10);
                StorageModule.set(`visited_${window.location.pathname}`, true);
            }, 5000); // 5 seconds of reading = 10 XP
        }
    });

})();
