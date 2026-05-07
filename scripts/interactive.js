/**
 * GenAI Course Module - Advanced Interactions
 * Version: 2.0.0
 * Architecture: Modular DOM Manipulation with State Management
 */

(() => {
    'use strict';

    // State Management
    const State = {
        theme: localStorage.getItem('course-theme') || 'light'
    };

    // DOM Elements Cache
    const DOM = {
        html: document.documentElement,
        themeToggle: document.getElementById('themeToggle'),
        progressBar: document.querySelector('.reading-progress'),
        codeBlocks: document.querySelectorAll('code'),
        aiResponse: document.getElementById('aiResponse'),
        toastContainer: document.getElementById('toast-container')
    };

    // --- 1. Theme Manager (Dark/Light Mode) ---
    const ThemeManager = {
        init() {
            this.applyTheme(State.theme);
            if(DOM.themeToggle) {
                DOM.themeToggle.addEventListener('click', () => this.toggle());
            }
        },
        toggle() {
            State.theme = State.theme === 'light' ? 'dark' : 'light';
            localStorage.setItem('course-theme', State.theme);
            this.applyTheme(State.theme);
        },
        applyTheme(themeName) {
            DOM.html.setAttribute('data-theme', themeName);
            if(DOM.themeToggle) {
                DOM.themeToggle.querySelector('.icon').textContent = themeName === 'dark' ? '☀️' : '🌙';
            }
        }
    };

    // --- 2. Scroll Progress Tracker ---
    const ScrollTracker = {
        init() {
            if(!DOM.progressBar) return;
            window.addEventListener('scroll', () => {
                const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
                const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
                const scrolled = (winScroll / height) * 100;
                DOM.progressBar.style.width = scrolled + '%';
            });
        }
    };

    // --- 3. Custom Toast Notifications System ---
    const Toast = {
        show(message) {
            if(!DOM.toastContainer) return;
            const toast = document.createElement('div');
            toast.className = 'toast';
            toast.textContent = `✓ ${message}`;
            DOM.toastContainer.appendChild(toast);
            
            // Garbage collection after animation
            setTimeout(() => toast.remove(), 3000);
        }
    };

    // --- 4. Interactive Code Snippets (Copy to Clipboard) ---
    const SnippetManager = {
        init() {
            DOM.codeBlocks.forEach(block => {
                block.style.cursor = 'pointer';
                block.title = 'Клікніть, щоб скопіювати';
                
                block.addEventListener('click', async (e) => {
                    try {
                        await navigator.clipboard.writeText(e.target.innerText);
                        Toast.show('Скопійовано в буфер обміну!');
                        
                        // Visual feedback
                        const originalBg = e.target.style.backgroundColor;
                        e.target.style.backgroundColor = 'rgba(16, 185, 129, 0.2)';
                        setTimeout(() => e.target.style.backgroundColor = originalBg, 400);
                    } catch (err) {
                        console.error('Помилка копіювання: ', err);
                    }
                });
            });
        }
    };

    // --- 5. AI Terminal Typewriter Effect ---
    const TerminalSimulator = {
        text: "ШІ (Штучний Інтелект) — це комп'ютерна система, здатна імітувати когнітивні функції людини. Генеративний ШІ не просто шукає інформацію, він створює новий контент (тексти, код, зображення) на основі ймовірностей та патернів, знайдених у навчальних даних. [Генерацію завершено]",
        index: 0,
        speed: 30, // ms per char
        
        init() {
            if(!DOM.aiResponse) return;
            DOM.aiResponse.classList.add('cursor-blink');
            // Delay start for dramatic effect
            setTimeout(() => this.type(), 1500);
        },
        
        type() {
            if (this.index < this.text.length) {
                DOM.aiResponse.innerHTML += this.text.charAt(this.index);
                this.index++;
                setTimeout(() => this.type(), this.speed);
            } else {
                DOM.aiResponse.classList.remove('cursor-blink');
            }
        }
    };

    // --- App Initialization ---
    const App = {
        start() {
            console.log("🚀 GenAI Course Framework Initialized");
            ThemeManager.init();
            ScrollTracker.init();
            SnippetManager.init();
            TerminalSimulator.init();
        }
    };

    // Boot the app
    App.start();

})();
