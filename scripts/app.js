/**
 * GenAI EdTech Platform Core | v4.0 ENTERPRISE
 */
(() => {
    'use strict';

    const Storage = {
        get: (k, d) => { try { return JSON.parse(localStorage.getItem(`ai_edu_${k}`)) || d; } catch { return d; } },
        set: (k, v) => localStorage.setItem(`ai_edu_${k}`, JSON.stringify(v))
    };

    class UI {
        static init() {
            this.container = document.createElement('div');
            this.container.id = 'toast-container';
            document.body.appendChild(this.container);
            this.injectCopyButtons();
        }

        static toast(msg, type = 'success') {
            const t = document.createElement('div');
            t.className = `toast toast-${type}`;
            t.innerHTML = msg;
            this.container.appendChild(t);
            setTimeout(() => { t.style.opacity = '0'; setTimeout(() => t.remove(), 300); }, 3000);
        }

        static injectCopyButtons() {
            document.querySelectorAll('pre').forEach(pre => {
                pre.style.position = 'relative';
                const btn = document.createElement('button');
                btn.className = 'copy-btn';
                btn.innerHTML = '📋 Copy';
                btn.onclick = () => {
                    navigator.clipboard.writeText(pre.querySelector('code').innerText);
                    btn.innerHTML = '✅ Copied!';
                    setTimeout(() => btn.innerHTML = '📋 Copy', 2000);
                };
                pre.appendChild(btn);
            });
        }

        static fireConfetti() {
            if (!window.confetti) {
                const s = document.createElement('script');
                s.src = 'https://cdn.jsdelivr.net/npm/canvas-confetti@1.6.0/dist/confetti.browser.min.js';
                s.onload = () => window.confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 } });
                document.body.appendChild(s);
            } else { window.confetti(); }
        }
    }

    class Progress {
        constructor() {
            this.xp = Storage.get('xp', 0);
            this.level = Math.floor(this.xp / 100) + 1;
            this.renderHUD();
        }

        renderHUD() {
            let hud = document.getElementById('global-hud');
            if (!hud) {
                hud = document.createElement('div');
                hud.id = 'global-hud';
                hud.className = 'global-progress-hud glass-panel';
                document.body.appendChild(hud);
            }
            hud.innerHTML = `<span>🏆 Lvl ${this.level}</span><div class="hud-sep"></div><span>✨ ${this.xp} XP</span>`;
            
            // Sync dashboard if on index.html
            const bar = document.getElementById('xp-bar');
            if (bar) bar.style.width = `${this.xp % 100}%`;
            const cnt = document.getElementById('xp-counter');
            if (cnt) cnt.innerText = `${this.xp} XP`;
        }

        addXP(amt) {
            this.xp += amt;
            const newLvl = Math.floor(this.xp / 100) + 1;
            if (newLvl > this.level) {
                this.level = newLvl;
                UI.toast(`🚀 Рівень підвищено до ${this.level}!`);
                UI.fireConfetti();
            }
            Storage.set('xp', this.xp);
            this.renderHUD();
        }
    }

    class PromptEngine {
        static eval() {
            const input = document.getElementById('prompt-input');
            const res = document.getElementById('eval-result');
            if (!input || !res) return;

            const val = input.value.toLowerCase().trim();
            if (val.length < 15) { UI.toast('Занадто короткий запит!', 'error'); return; }

            const criteria = [
                { reg: /(дій як|уяви себе|ти є|ти —|ти - |виступи як|поводь себе як)/i, msg: '🎭 Роль' },
                { reg: /(для учн|для студент|для дітей|для початківц|для фахівц|тому що|оскільки|адже|контекст:|ситуація:)/i, msg: '🌍 Контекст' },
                { reg: /(напиши|створи|поясни|зроби|розробіть|склади|проаналізуй|порівняй|опиши|сформулюй|згенеруй)/i, msg: '🎯 Завдання' },
                { reg: /(формат|список|таблиц|речен|абзац)/i, msg: '📋 Формат' }
            ];

            let score = 0;
            let html = '<ul>';
            criteria.forEach(c => {
                const ok = c.reg.test(val);
                if (ok) score += 25;
                html += `<li style="color: ${ok ? 'var(--success)' : 'var(--danger)'}">${ok ? '✅' : '❌'} ${c.msg}</li>`;
            });
            html += '</ul>';

            res.style.display = 'block';
            res.innerHTML = `<h3>Оцінка: ${score}/100</h3>${html}`;
            
            // Запобігаємо нескінченному нарахуванню XP
            if (score === 100 && !Storage.get('ach_master', false)) {
                Storage.set('ach_master', true);
                window.engine.progress.addXP(50);
                UI.toast('🏆 Майстер Промптів! +50 XP', 'success');
                UI.fireConfetti();
            } else if (score === 100) {
                UI.toast('✅ Ідеальний промпт! Досягнення вже отримано.', 'success');
            }
        }
    }

    document.addEventListener('DOMContentLoaded', () => {
        UI.init();
        window.engine = {
            progress: new Progress(),
            theme: Storage.get('theme', 'dark')
        };

        // Theme Sync
        const applyTheme = (t) => {
            document.documentElement.setAttribute('data-theme', t);
            const btn = document.getElementById('themeToggle');
            if (btn) btn.innerHTML = t === 'dark' ? '☀️' : '🌙';
        };
        applyTheme(window.engine.theme);

        document.getElementById('themeToggle')?.addEventListener('click', () => {
            window.engine.theme = window.engine.theme === 'dark' ? 'light' : 'dark';
            Storage.set('theme', window.engine.theme);
            applyTheme(window.engine.theme);
        });

        // Quiz Logic
        document.querySelectorAll('.quiz-btn').forEach(btn => {
            btn.onclick = () => {
                const parent = btn.closest('.quiz-question');
                if (parent.dataset.done) return;
                parent.dataset.done = 'true';
                const correct = btn.dataset.correct === 'true';
                btn.classList.add(correct ? 'correct' : 'wrong');
                if (correct) window.engine.progress.addXP(20);
                else parent.querySelector('[data-correct="true"]').classList.add('correct');
            };
        });

        document.getElementById('evaluate-btn')?.addEventListener('click', () => PromptEngine.eval());
    });
})();
