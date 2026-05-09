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
            if (window.UI) window.UI.showToast(`🏆 Отримано +${amount} XP!`, 'success');
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

    // 5. QUIZ MANAGER (Тепер з нарахуванням XP)
    class QuizManager {
        constructor() {
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
                        window.UI.showToast(`✅ Правильно! ${feedback}`, 'success');
                        window.Progress.addXP(20); // Даємо 20 XP за правильну відповідь
                    } else {
                        target.classList.add('wrong');
                        window.UI.showToast(`❌ Неправильно. ${feedback}`, 'error');
                        // Підсвічуємо правильну відповідь
                        const correctBtn = parent.querySelector('[data-correct="true"]');
                        if (correctBtn) correctBtn.classList.add('correct');
                    }
                });
            });
        }
    }

    // 6. AI PROMPT EVALUATOR (Тренажер промптів)
    class PromptEvaluator {
        constructor() {
            this.input = document.getElementById('prompt-input');
            this.btn = document.getElementById('evaluate-btn');
            this.resultBox = document.getElementById('eval-result');

            if (this.btn && this.input) {
                this.btn.addEventListener('click', () => this.evaluate());
            }
        }

        evaluate() {
            const text = this.input.value.toLowerCase();
            if (text.length < 10) {
                window.UI.showToast('❌ Промпт занадто короткий!', 'error');
                return;
            }

            let score = 0;
            let feedback = [];

            // Перевірка Ролі
            if (text.includes('дій як') || text.includes('ти ') || text.includes('уяви себе')) {
                score += 25;
                feedback.push('✅ <b>Роль:</b> Використано правильно');
            } else {
                feedback.push('❌ <b>Роль:</b> Відсутня (Спробуйте почати з "Дій як...")');
            }

            // Перевірка Контексту
            if (text.includes('для') || text.includes('тому що') || text.includes('контекст')) {
                score += 25;
                feedback.push('✅ <b>Контекст:</b> Присутній');
            } else {
                feedback.push('❌ <b>Контекст:</b> Відсутній (Поясніть, для кого або навіщо це потрібно)');
            }

            // Перевірка Завдання
            if (text.includes('напиши') || text.includes('створи') || text.includes('поясни') || text.includes('зроби')) {
                score += 25;
                feedback.push('✅ <b>Завдання:</b> Чітке дієслово знайдено');
            } else {
                feedback.push('❌ <b>Завдання:</b> Нечітке (Використовуйте дієслова-дії)');
            }

            // Перевірка Формату
            if (text.includes('формат') || text.includes('список') || text.includes('таблиц') || text.includes('речен')) {
                score += 25;
                feedback.push('✅ <b>Формат:</b> Обмеження встановлено');
            } else {
                feedback.push('❌ <b>Формат:</b> Не задано (Вкажіть формат, наприклад: "у вигляді списку")');
            }

            this.resultBox.style.display = 'block';
            this.resultBox.style.background = 'var(--terminal-bg)';
            this.resultBox.style.padding = '20px';
            this.resultBox.style.borderRadius = '8px';
            this.resultBox.style.marginTop = '20px';

            this.resultBox.innerHTML = `
                <h3 style="color: ${score === 100 ? 'var(--success)' : 'var(--xp-color)'}; margin-top: 0;">Оцінка промпту: ${score}/100</h3>
                <ul style="list-style: none; padding: 0;">
                    ${feedback.map(f => `<li style="margin: 8px 0; border-bottom: 1px solid var(--card-border); padding-bottom: 5px;">${f}</li>`).join('')}
                </ul>
            `;

            // Досягнення за ідеальний промпт
            if (score === 100 && !StorageModule.get('prompt_master')) {
                window.Progress.addXP(50);
                StorageModule.set('prompt_master', true);
                window.UI.showToast('🏆 Досягнення: Майстер Промптів (+50 XP)!', 'success');
            }
        }
    }

    // Запуск додатка
    document.addEventListener('DOMContentLoaded', () => {
        window.UI = new UIModule();
        window.Progress = new ProgressSystem();
        
        new ThemeModule();
        new QuizManager();
        new PromptEvaluator();

        // Копіювання коду
        document.querySelectorAll('code').forEach(block => {
            block.addEventListener('click', async (e) => {
                try {
                    await navigator.clipboard.writeText(e.target.innerText);
                    window.UI.showToast('📋 Скопійовано в буфер обміну!', 'success');
                } catch (err) {
                    console.error('Помилка копіювання', err);
                }
            });
        });
    });

})();
