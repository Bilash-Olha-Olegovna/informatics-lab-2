(() => {
    'use strict';

    const State = { theme: localStorage.getItem('course-theme') || 'light' };
    const DOM = {
        html: document.documentElement,
        themeToggle: document.getElementById('themeToggle'),
        aiResponse: document.getElementById('aiResponse'),
        toastContainer: null
    };

    // Система красивых повідомлень (Toasts)
    const Toast = {
        init() {
            DOM.toastContainer = document.createElement('div');
            DOM.toastContainer.id = 'toast-container';
            document.body.appendChild(DOM.toastContainer);
        },
        show(message, type = 'success') {
            const toast = document.createElement('div');
            toast.className = `toast toast-${type}`;
            toast.innerHTML = message;
            DOM.toastContainer.appendChild(toast);
            setTimeout(() => {
                toast.style.animation = 'fadeOut 0.3s forwards';
                setTimeout(() => toast.remove(), 300);
            }, 3000);
        }
    };

    // Керування темами
    const ThemeManager = {
        init() {
            this.applyTheme(State.theme);
            if (DOM.themeToggle) {
                DOM.themeToggle.addEventListener('click', () => this.toggle());
            }
        },
        toggle() {
            State.theme = State.theme === 'light' ? 'dark' : 'light';
            localStorage.setItem('course-theme', State.theme);
            this.applyTheme(State.theme);
        },
        applyTheme(theme) {
            DOM.html.setAttribute('data-theme', theme);
            if (DOM.themeToggle) {
                DOM.themeToggle.innerHTML = theme === 'dark' ? '☀️' : '🌙';
            }
        }
    };

    // Інтерактивний термінал
    const TerminalSimulator = {
        responses: {
            "привіт": "Привіт! Я твій ШІ-асистент. Чим можу допомогти?",
            "що таке ші": "ШІ — це системи, що імітують когнітивні функції людини.",
            "хто автор": "Цей модуль розробила Білаш Ольга Олегівна.",
            "курс": "Цей курс навчить тебе майстерності промпт-інжинірингу!"
        },
        init() {
            if (!DOM.aiResponse) return;
            this.type("Вітаю в консолі керування ШІ. Спробуй написати 'Привіт' або 'Що таке ШІ'...");
            this.setupInput();
        },
        setupInput() {
            const inputSpan = document.querySelector('.typing-user');
            if (!inputSpan) return;
            
            inputSpan.setAttribute('contenteditable', 'true');
            inputSpan.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    const query = inputSpan.innerText.toLowerCase().trim();
                    let resp = "Цікавий запит! Спробуй сформулювати питання інакше.";
                    
                    if (query.includes("привіт")) resp = this.responses["привіт"];
                    else if (query.includes("ші")) resp = this.responses["що таке ші"];
                    else if (query.includes("автор")) resp = this.responses["хто автор"];
                    
                    DOM.aiResponse.innerHTML = "";
                    this.type(resp);
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
            }, 30); // Виправлена критична помилка!
        }
    };

    // Логіка інтерактивного тесту
    const QuizManager = {
        init() {
            const buttons = document.querySelectorAll('.quiz-btn');
            buttons.forEach(btn => {
                btn.addEventListener('click', (e) => {
                    const target = e.target;
                    const parent = target.closest('.quiz-question');
                    const allBtns = parent.querySelectorAll('.quiz-btn');
                    
                    // Блокуємо повторні натискання
                    allBtns.forEach(b => b.disabled = true);
                    
                    const isCorrect = target.getAttribute('data-correct') === 'true';
                    const feedback = target.getAttribute('data-feedback') || '';
                    
                    if (isCorrect) {
                        target.classList.add('correct');
                        Toast.show(`✅ Правильно! ${feedback}`, 'success');
                    } else {
                        target.classList.add('wrong');
                        Toast.show(`❌ Неправильно. ${feedback}`, 'error');
                        // Підсвічуємо правильну відповідь
                        const correctBtn = parent.querySelector('[data-correct="true"]');
                        if (correctBtn) correctBtn.classList.add('correct');
                    }
                });
            });
        }
    };

    // Запуск додатка
    document.addEventListener('DOMContentLoaded', () => {
        Toast.init();
        ThemeManager.init();
        TerminalSimulator.init();
        QuizManager.init();

        // Копіювання коду
        document.querySelectorAll('code').forEach(block => {
            block.addEventListener('click', async (e) => {
                try {
                    await navigator.clipboard.writeText(e.target.innerText);
                    Toast.show('📋 Скопійовано в буфер обміну!', 'success');
                } catch (err) {
                    console.error('Помилка копіювання', err);
                }
            });
        });
    });

})();
