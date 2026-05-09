/**
 * GenAI EdTech Platform Core | v4.0 ENTERPRISE
 * Modular Architecture (Storage, Progress HUD, Regex Evaluator, Gamification)
 */

(() => {
    'use strict';

    // === 1. STORAGE MODULE ===
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

    // === 2. UI & TOAST MODULE ===
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
                toast.style.transform = 'translateX(100%)';
                setTimeout(() => toast.remove(), 300);
            }, 3000);
        }

        static shootConfetti() {
            // Динамічно завантажуємо скрипт конфетті, якщо його ще немає
            if (!window.confetti) {
                const script = document.createElement('script');
                script.src = 'https://cdn.jsdelivr.net/npm/canvas-confetti@1.6.0/dist/confetti.browser.min.js';
                script.onload = () => window.confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 } });
                document.body.appendChild(script);
            } else {
                window.confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 } });
            }
        }
    }

    // === 3. PROGRESS & GLOBAL HUD MODULE ===
    class ProgressSystem {
        constructor() {
            this.xp = StorageModule.get('xp', 0);
            this.level = Math.floor(this.xp / 100) + 1;
            this.createGlobalHUD();
            this.updateUI();
        }

        createGlobalHUD() {
            // Створюємо плаваючий віджет прогресу для всіх сторінок
            this.hud = document.createElement('div');
            this.hud.className = 'global-progress-hud glass-panel';
            this.hud.innerHTML = `
                <div class="hud-level">Рівень <span id="hud-lvl-val">${this.level}</span></div>
                <div class="hud-xp"><span id="hud-xp-val">${this.xp}</span> XP</div>
            `;
            document.body.appendChild(this.hud);
        }

        addXP(amount) {
            this.xp += amount;
            const newLevel = Math.floor(this.xp / 100) + 1;
            
            if (newLevel > this.level) {
                this.level = newLevel;
                if (window.UI) window.UI.showToast(`🎉 Рівень підвищено до ${this.level}!`, 'success');
                UIModule.shootConfetti();
            }
            
            StorageModule.set('xp', this.xp);
            this.updateUI();
            if (window.UI && amount > 0) window.UI.showToast(`🏆 Отримано +${amount} XP!`, 'success');
        }

        updateUI() {
            // Оновлення головного дашборду (якщо ми на index.html)
            const mainXpText = document.getElementById('xp-counter');
            const mainLevelText = document.getElementById('level-counter');
            const mainXpBar = document.getElementById('xp-bar');
            
            if (mainXpText) mainXpText.innerText = `${this.xp} XP`;
            if (mainLevelText) mainLevelText.innerText = `Рівень ${this.level}`;
            if (mainXpBar) mainXpBar.style.width = `${this.xp % 100}%`;

            // Оновлення плаваючого HUD
            document.getElementById('hud-lvl-val').innerText = this.level;
            document.getElementById('hud-xp-val').innerText = this.xp;
        }
    }

    // === 4. SMART PROMPT EVALUATOR (NLP/Regex) ===
    class PromptEvaluator {
        constructor() {
            this.input = document.getElementById('prompt-input');
            this.btn = document.getElementById('evaluate-btn');
            this.resultBox = document.getElementById('eval-result');

            if (this.btn && this.input) {
                // Debounce для кнопки
                this.btn.addEventListener('click', () => {
                    this.btn.disabled = true;
                    this.btn.innerText = "Аналізуємо...";
                    setTimeout(() => {
                        this.evaluate();
                        this.btn.disabled = false;
                        this.btn.innerText = "Оцінити промпт";
                    }, 600);
                });
            }
        }

        evaluate() {
            const text = this.input.value.toLowerCase().trim();
            if (text.length < 15) {
                window.UI.showToast('❌ Промпт занадто короткий. Опишіть детальніше!', 'error');
                return;
            }

            let score = 0;
            let feedback = [];

            // Розумна перевірка (Regex)
            const regexRole = /(уяви|дій|ти|ролі|виступай|вчитель|експерт|фахівець|розробник)/i;
            const regexContext = /(для|контекст|ситуація|оскільки|тому що|учня|компанії|проєкт)/i;
            const regexTask = /(напиши|створи|поясни|зроби|склади|розроби|згенеруй|надай)/i;
            const regexFormat = /(формат|список|таблиц|речен|абзац|код|маркован|структур)/i;

            if (regexRole.test(text)) { score += 25; feedback.push('✅ <b>Роль:</b> Визначено чітко'); } 
            else { feedback.push('❌ <b>Роль:</b> Додайте персону (напр. "Дій як експерт...")'); }

            if (regexContext.test(text)) { score += 25; feedback.push('✅ <b>Контекст:</b> Зрозумілий'); } 
            else { feedback.push('❌ <b>Контекст:</b> Поясніть ситуацію або для кого це.'); }

            if (regexTask.test(text)) { score += 25; feedback.push('✅ <b>Завдання:</b> Дієслово-дія присутнє'); } 
            else { feedback.push('❌ <b>Завдання:</b> Немає чіткої команди (напр. "Напиши...")'); }

            if (regexFormat.test(text)) { score += 25; feedback.push('✅ <b>Формат:</b> Обмеження встановлено'); } 
            else { feedback.push('❌ <b>Формат:</b> Вкажіть, як подати результат (напр. "у вигляді таблиці").'); }

            // Виведення результату
            this.resultBox.style.display = 'block';
            this.resultBox.className = 'prompt-result glass-panel';
            this.resultBox.innerHTML = `
                <h3 style="color: ${score === 100 ? 'var(--success)' : 'var(--xp-color)'}; margin-top: 0;">Оцінка: ${score}/100</h3>
                <ul style="list-style: none; padding: 0;">
                    ${feedback.map(f => `<li style="margin: 8px 0; border-bottom: 1px solid var(--card-border); padding-bottom: 5px;">${f}</li>`).join('')}
                </ul>
            `;

            if (score === 100 && !StorageModule.get('prompt_master')) {
                window.Progress.addXP(50);
                StorageModule.set('prompt_master', true);
                window.UI.showToast('🏆 Досягнення: Майстер Промптів!', 'success');
                UIModule.shootConfetti();
            }
        }
    }

    // === 5. ENHANCED CODE BLOCKS (Copy Buttons) ===
    class CodeBlockEnhancer {
        static init() {
            document.querySelectorAll('pre').forEach(pre => {
                // Пропускаємо, якщо кнопка вже є
                if (pre.querySelector('.copy-btn')) return;

                pre.style.position = 'relative';
                const btn = document.createElement('button');
                btn.className = 'copy-btn';
                btn.innerHTML = '📋 Copy';
                
                btn.addEventListener('click', async () => {
                    const code = pre.querySelector('code');
                    if (!code) return;
                    try {
                        await navigator.clipboard.writeText(code.innerText);
                        btn.innerHTML = '✅ Copied!';
                        btn.classList.add('copied');
                        window.UI.showToast('Код скопійовано!', 'success');
                        setTimeout(() => {
                            btn.innerHTML = '📋 Copy';
                            btn.classList.remove('copied');
                        }, 2000);
                    } catch (err) {
                        console.error('Copy failed', err);
                    }
                });
                
                pre.appendChild(btn);
            });
        }
    }

    // === INIT SYSTEM ===
    document.addEventListener('DOMContentLoaded', () => {
        window.UI = new UIModule();
        window.Progress = new ProgressSystem();
        new PromptEvaluator();
        CodeBlockEnhancer.init();

        // Тести
        document.querySelectorAll('.quiz-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const target = e.target;
                const parent = target.closest('.quiz-question');
                if (parent.dataset.answered) return;
                
                parent.dataset.answered = 'true';
                const isCorrect = target.dataset.correct === 'true';
                
                if (isCorrect) {
                    target.classList.add('correct');
                    window.UI.showToast('✅ Правильно!', 'success');
                    window.Progress.addXP(15);
                } else {
                    target.classList.add('wrong');
                    window.UI.showToast('❌ Помилка.', 'error');
                    parent.querySelector('[data-correct="true"]').classList.add('correct');
                }
            });
        });
    });

})();
