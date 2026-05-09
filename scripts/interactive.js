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
        responses: {
            "привіт": "Привіт! Я твій ШІ-асистент. Чим можу допомогти?",
            "що таке ші": "ШІ — це системи, що імітують людський інтелект для виконання завдань.",
            "хто автор": "Цей модуль розробила Білаш Ольга Олегівна.",
            "курс": "Цей курс навчить тебе майстерності промпт-інжинірингу!"
        },
        
        init() {
            if(!DOM.aiResponse) return;
            this.type("Вітаю в консолі керування ШІ. Спробуй написати 'Привіт' або 'Що таке ШІ'...");
            this.setupInput();
        },

        setupInput() {
            const inputSpan = document.querySelector('.typing-user');
            if(!inputSpan) return;
            
            inputSpan.setAttribute('contenteditable', 'true');
            inputSpan.style.borderBottom = '1px dashed #ec4899';
            
            inputSpan.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    const query = inputSpan.innerText.toLowerCase().trim();
                    const response = this.responses[query] || "Цікавий запит! Спробуй сформулювати його за формулою Роль+Завдання.";
                    DOM.aiResponse.innerHTML = "";
                    this.type(response);
                    inputSpan.innerText = "";
                }
            });
        },

        type(text) {
            let i = 0;
            DOM.aiResponse.classList.add('cursor-blink');
            const interval = setInterval(() => {
                DOM.aiResponse.innerHTML += text.charAt(i);
                i++;
                if (i >= text.length) {
                    clearInterval(interval);
                    DOM.aiResponse.classList.remove('cursor-blink');
                }
            }, 30;
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

    // --- Логіка інтерактивного тесту ---
window.checkAnswer = function(element, isCorrect, feedback) {
    const parent = element.parentElement;
    const options = parent.querySelectorAll('.quiz-option');
    
    // Блокуємо інші варіанти
    options.forEach(opt => opt.style.pointerEvents = 'none');
    
    if (isCorrect) {
        element.classList.add('correct');
        Toast.show("Правильно! " + feedback);
    } else {
        element.classList.add('wrong');
        Toast.show("Неправильно. Спробуй ще раз!");
    }
};

// Оновлений термінал з введенням тексту
const inputSpan = document.querySelector('.typing-user');
if(inputSpan) {
    inputSpan.setAttribute('contenteditable', 'true');
    inputSpan.addEventListener('keypress', (e) => {
        if(e.key === 'Enter') {
            e.preventDefault();
            const val = inputSpan.innerText.toLowerCase();
            let resp = "Цікавий запит! Спробуй запитати про 'ШІ' або 'автора'.";
            if(val.includes("привіт")) resp = "Привіт! Готовий до навчання?";
            if(val.includes("ші")) resp = "ШІ — це майбутнє, яке ми будуємо сьогодні.";
            DOM.aiResponse.innerHTML = "";
            TerminalSimulator.type(resp);
            inputSpan.innerText = "";
        }
    });
}
    
    // Boot the app
    App.start();

})();
