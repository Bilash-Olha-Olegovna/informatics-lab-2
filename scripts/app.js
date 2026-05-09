/**
 * GenAI EdTech Platform Core | v4.5 ENTERPRISE
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
            setTimeout(() => { t.style.opacity = '0'; t.style.transform = 'translateY(20px)'; setTimeout(() => t.remove(), 400); }, 3000);
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
            
            // Оновлення головного дашборду (XP Bar Initial Animation)
            const bar = document.getElementById('xp-bar');
            if (bar) {
                const progress = (this.xp % 100) + '%';
                if (bar.style.width === '' || bar.style.width === '0%') {
                    bar.style.width = '0%';
                    requestAnimationFrame(() => {
                        setTimeout(() => { bar.style.width = progress; }, 100);
                    });
                } else {
                    bar.style.width = progress;
                }
            }
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
        static initLiveIndicator() {
            const input = document.getElementById('prompt-input');
            if (!input) return;

            // Створення візуальних "пігулок"
            const liveBar = document.createElement('div');
            liveBar.id = 'live-strength';
            liveBar.style.cssText = 'display:flex; gap:8px; margin-top:12px; flex-wrap:wrap;';
            const pills = [
                { id: 'pill-role', label: '🎭 Роль' },
                { id: 'pill-ctx',  label: '📍 Контекст' },
                { id: 'pill-task', label: '✏️ Завдання' },
                { id: 'pill-fmt',  label: '📋 Формат' }
            ];
            pills.forEach(p => {
                const pill = document.createElement('span');
                pill.id = p.id;
                pill.innerText = p.label;
                pill.style.cssText = 'font-size:0.85rem; font-weight:600; padding:6px 12px; border-radius:20px; border:1px solid var(--card-border); color:var(--text-muted); background:var(--card-bg); transition:all 0.3s ease;';
                liveBar.appendChild(pill);
            });
            input.parentNode.insertBefore(liveBar, input.nextSibling);

            // Перевірка в реальному часі
            input.addEventListener('input', () => {
                const t = input.value.toLowerCase();
                const rolePattern = /(дій як|уяви себе|ти є|ти —|ти - |виступи як|поводь себе як|ролі|експерт|вчитель)/;
                const ctxPattern  = /(для учн|для студент|для дітей|для початківц|для фахівц|тому що|оскільки|адже|контекст:|ситуація:)/;
                const taskPattern = /(напиши|створи|поясни|зроби|розробіть|склади|проаналізуй|порівняй|опиши|сформулюй|згенеруй)/;
                const fmtPattern  = /(формат|список|таблиц|речен|абзац|пунктів|кроків|секцій)/;

                const checks = [
                    { id: 'pill-role', ok: rolePattern.test(t) },
                    { id: 'pill-ctx',  ok: ctxPattern.test(t)  },
                    { id: 'pill-task', ok: taskPattern.test(t) },
                    { id: 'pill-fmt',  ok: fmtPattern.test(t)  }
                ];
                
                checks.forEach(c => {
                    const el = document.getElementById(c.id);
                    if (!el) return;
                    el.style.background = c.ok ? 'rgba(16,185,129,0.15)' : 'var(--card-bg)';
                    el.style.borderColor = c.ok ? 'var(--success)' : 'var(--card-border)';
                    el.style.color       = c.ok ? 'var(--success)'  : 'var(--text-muted)';
                });
            });
        }

        static eval() {
            const input = document.getElementById('prompt-input');
            const res = document.getElementById('eval-result');
            if (!input || !res) return;

            const val = input.value.toLowerCase().trim();
            if (val.length < 15) { UI.toast('Занадто короткий запит!', 'error'); return; }

            const criteria = [
                { reg: /(дій як|уяви себе|ти є|ти —|ти - |виступи як|поводь себе як|ролі|експерт|вчитель)/i, msg: '🎭 Роль' },
                { reg: /(для учн|для студент|для дітей|для початківц|для фахівц|тому що|оскільки|адже|контекст:|ситуація:)/i, msg: '🌍 Контекст' },
                { reg: /(напиши|створи|поясни|зроби|розробіть|склади|проаналізуй|порівняй|опиши|сформулюй|згенеруй)/i, msg: '🎯 Завдання' },
                { reg: /(формат|список|таблиц|речен|абзац|пунктів|кроків|секцій)/i, msg: '📋 Формат' }
            ];

            let score = 0;
            let html = '<ul style="padding-left:0; list-style:none;">';
            criteria.forEach(c => {
                const ok = c.reg.test(val);
                if (ok) score += 25;
                html += `<li style="margin-bottom:8px; font-weight:500; color: ${ok ? 'var(--success)' : 'var(--danger)'}">${ok ? '✅ Знайдено:' : '❌ Відсутньо:'} ${c.msg}</li>`;
            });
            html += '</ul>';

            res.style.display = 'block';
            res.className = 'prompt-result glass-panel';
            res.innerHTML = `<h3 style="margin-top:0; color: ${score === 100 ? 'var(--success)' : 'var(--xp-color)'}">Оцінка: ${score}/100</h3>${html}`;
            
            if (score === 100 && !Storage.get('ach_master', false)) {
                Storage.set('ach_master', true);
                window.engine.progress.addXP(50);
                UI.toast('🏆 Майстер Промптів! +50 XP', 'success');
                UI.fireConfetti();
            } else if (score === 100) {
                UI.toast('✅ Ідеальний промпт!', 'success');
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
                
                const allBtns = parent.querySelectorAll('.quiz-btn');
                allBtns.forEach(b => b.disabled = true); // Блокуємо інші кнопки

                const correct = btn.dataset.correct === 'true';
                btn.classList.add(correct ? 'correct' : 'wrong');
                if (correct) {
                    window.engine.progress.addXP(20);
                    UI.toast('✅ Правильно! +20 XP', 'success');
                } else {
                    parent.querySelector('[data-correct="true"]').classList.add('correct');
                    UI.toast('❌ Відповідь неправильна', 'error');
                }
            };
        });

        // Prompt Simulator
        document.getElementById('evaluate-btn')?.addEventListener('click', () => PromptEngine.eval());
        PromptEngine.initLiveIndicator();
    });
})();
