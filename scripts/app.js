/**
 * GenAI EdTech Platform Core | v5.0 SECURE ENTERPRISE
 */
(() => {
    'use strict';

    // 1. SECURE STORAGE MODULE
    const Storage = {
        get: (k, d) => {
            try {
                const item = localStorage.getItem(`ai_edu_${k}`);
                if (item === null || item === 'undefined') return d;
                return JSON.parse(item);
            } catch { return d; }
        },
        set: (k, v) => localStorage.setItem(`ai_edu_${k}`, JSON.stringify(v)),
        getArray: (k) => {
            const arr = Storage.get(k, []);
            return Array.isArray(arr) ? arr : [];
        }
    };

    // 2. UI & TOAST MODULE
    class UI {
        static init() {
            this.container = document.createElement('div');
            this.container.id = 'toast-container';
            document.body.appendChild(this.container);
            this.injectCopyButtons();
        }

        static toast(msg, type = 'success', duration = 5000) {
            if (!msg || msg === 'undefined') return;
            const t = document.createElement('div');
            t.className = `toast toast-${type}`;
            t.innerHTML = msg;
            this.container.appendChild(t);
            setTimeout(() => { 
                t.style.opacity = '0'; 
                t.style.transform = 'translateY(20px)'; 
                setTimeout(() => t.remove(), 400); 
            }, duration);
        }

        static injectCopyButtons() {
            document.querySelectorAll('pre').forEach(pre => {
                const codeNode = pre.querySelector('code');
                if (!codeNode) return; // FIX: Null pointer prevention

                pre.style.position = 'relative';
                const btn = document.createElement('button');
                btn.className = 'copy-btn';
                btn.innerHTML = '📋 Copy';
                btn.onclick = () => {
                    navigator.clipboard.writeText(codeNode.innerText);
                    btn.innerHTML = '✅ Copied!';
                    setTimeout(() => btn.innerHTML = '📋 Copy', 2000);
                };
                pre.appendChild(btn);
            });
        }

        static fireConfetti() {
            if (!window.confetti && !document.getElementById('confetti-script')) {
                const s = document.createElement('script');
                s.id = 'confetti-script';
                s.src = 'https://cdn.jsdelivr.net/npm/canvas-confetti@1.6.0/dist/confetti.browser.min.js';
                s.onload = () => window.confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 } });
                document.body.appendChild(s);
            } else if (window.confetti) {
                window.confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 } });
            }
        }
    }

    // 3. PROGRESS SYSTEM
    class Progress {
        constructor() {
            this.xp = Number(Storage.get('xp', 0)) || 0;
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
            hud.innerHTML = `<span>🏆 Lvl <span id="hud-lvl">${this.level}</span></span><div class="hud-sep"></div><span>✨ <span id="hud-xp">${this.xp}</span> XP</span>`;
            
            // Sync Dashboard safely
            const bar = document.getElementById('xp-bar');
            const cnt = document.getElementById('xp-counter');
            const lvl = document.getElementById('level-counter');

            if (lvl) lvl.innerText = `Рівень ${this.level}`;
            if (cnt) cnt.innerText = `${this.xp} XP`;
            
            if (bar) {
                const progress = (this.xp % 100) + '%';
                if (bar.style.width === '' || bar.style.width === '0%') {
                    bar.style.width = '0%';
                    requestAnimationFrame(() => setTimeout(() => { bar.style.width = progress; }, 100));
                } else {
                    // Animate through 100% on level up
                    if (progress === '0%' && this.xp > 0) {
                        bar.style.width = '100%';
                        setTimeout(() => { bar.style.transition = 'none'; bar.style.width = '0%'; setTimeout(() => bar.style.transition = '1s ease', 50); }, 1000);
                    } else {
                        bar.style.width = progress;
                    }
                }
            }
        }

        addXP(amt) {
            if (!Number.isFinite(amt) || amt <= 0) return; // FIX: XP validation
            this.xp += amt;
            const newLvl = Math.floor(this.xp / 100) + 1;
            if (newLvl > this.level) {
                this.level = newLvl;
                UI.toast(`🚀 Рівень підвищено до ${this.level}!`, 'success', 6000);
                UI.fireConfetti();
            }
            Storage.set('xp', this.xp);
            this.renderHUD();
        }
    }

    // 4. SMART PROMPT ENGINE (Debounced & Strict Regex)
    class PromptEngine {
        static initLiveIndicator() {
            const input = document.getElementById('prompt-input');
            if (!input) return;

            const liveBar = document.createElement('div');
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
                pill.style.cssText = 'font-size:0.85rem; font-weight:600; padding:6px 12px; border-radius:20px; border:1px solid var(--card-border); color:var(--text-muted); background:var(--card-bg); transition:0.3s;';
                liveBar.appendChild(pill);
            });
            input.parentNode.insertBefore(liveBar, input.nextSibling);

            // FIX: Debounce live evaluation
            let timeout;
            input.addEventListener('input', () => {
                clearTimeout(timeout);
                timeout = setTimeout(() => {
                    const t = input.value.toLowerCase();
                    const checks = [
                        { id: 'pill-role', ok: /(дій як|уяви себе|ти —|в ролі|виступи як|експерт|помічник|вчитель)/.test(t) },
                        { id: 'pill-ctx',  ok: /(для учн|для студент|для фахівц|ситуація:|оскільки|мета:|щоб)/.test(t) },
                        { id: 'pill-task', ok: /(напиши|створи|поясни|зроби|розробіть|склади|проаналізуй|сформулюй)/.test(t) },
                        { id: 'pill-fmt',  ok: /(формат|список|таблиц|речен|абзац|пунктів|кроків)/.test(t) }
                    ];
                    checks.forEach(c => {
                        const el = document.getElementById(c.id);
                        if (el) {
                            el.style.background = c.ok ? 'rgba(16,185,129,0.15)' : 'var(--card-bg)';
                            el.style.borderColor = c.ok ? 'var(--success)' : 'var(--card-border)';
                            el.style.color = c.ok ? 'var(--success)' : 'var(--text-muted)';
                        }
                    });
                }, 300);
            });
        }

        static eval() {
            const input = document.getElementById('prompt-input');
            const res = document.getElementById('eval-result');
            const btn = document.getElementById('evaluate-btn');
            if (!input || !res) return;

            // FIX: Debounce button
            if (btn) { btn.disabled = true; setTimeout(() => btn.disabled = false, 1500); }

            const val = input.value.toLowerCase().trim();
            if (val.length < 15) { UI.toast('Запит занадто короткий. Опишіть детальніше!', 'error'); return; }

            const criteria = [
                { reg: /(дій як|уяви себе|ти —|в ролі|виступи як|експерт|помічник|вчитель)/i, msg: '🎭 Роль визначена' },
                { reg: /(для учн|для студент|для фахівц|ситуація:|оскільки|мета:|щоб)/i, msg: '🌍 Контекст/Аудиторія зрозуміла' },
                { reg: /(напиши|створи|поясни|зроби|розробіть|склади|проаналізуй|сформулюй)/i, msg: '🎯 Чітке завдання (дієслово)' },
                { reg: /(формат|список|таблиц|речен|абзац|пунктів|кроків)/i, msg: '📋 Встановлено формат виводу' }
            ];

            let score = 0;
            let html = '<ul style="padding-left:0; list-style:none;">';
            criteria.forEach(c => {
                const ok = c.reg.test(val);
                if (ok) score += 25;
                html += `<li style="margin-bottom:8px; font-weight:500; color: ${ok ? 'var(--success)' : 'var(--danger)'}">${ok ? '✅' : '❌'} ${c.msg}</li>`;
            });
            html += '</ul>';

            res.style.display = 'block';
            res.className = 'prompt-result glass-panel';
            res.innerHTML = `<h3 style="margin-top:0; color: ${score === 100 ? 'var(--success)' : 'var(--xp-color)'}">Оцінка: ${score}/100</h3>${html}`;
            
            if (score === 100 && !Storage.get('ach_master', false)) {
                Storage.set('ach_master', true);
                window.engine.progress.addXP(50);
                UI.toast('🏆 Досягнення: Майстер Промптів! +50 XP', 'success');
                UI.fireConfetti();
            } else if (score === 100) {
                UI.toast('✅ Ідеальний промпт!', 'success');
            }
        }
    }

    // === INIT SYSTEM ===
    document.addEventListener('DOMContentLoaded', () => {
        UI.init();
        window.engine = { progress: new Progress(), theme: Storage.get('theme', 'dark') };

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

        // FIX: Secure Quiz Logic (Anti-Farm)
        const solvedQuizzes = Storage.getArray('solved_quizzes');
        
        document.querySelectorAll('.quiz-question').forEach(q => {
            const qId = q.getAttribute('data-qid');
            if (qId && solvedQuizzes.includes(qId)) {
                // Відзначаємо вже пройдені тести
                q.dataset.done = 'true';
                const correctBtn = q.querySelector('[data-correct="true"]');
                if (correctBtn) correctBtn.classList.add('correct');
                q.querySelectorAll('.quiz-btn').forEach(b => b.disabled = true);
            }
        });

        document.querySelectorAll('.quiz-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const target = e.target;
                const parent = target.closest('.quiz-question');
                const qId = parent.getAttribute('data-qid');
                
                if (parent.dataset.done) return;
                parent.dataset.done = 'true';
                
                parent.querySelectorAll('.quiz-btn').forEach(b => b.disabled = true);
                const isCorrect = target.dataset.correct === 'true';
                const feedback = target.dataset.feedback || (isCorrect ? 'Чудова робота!' : 'Спробуйте ще раз наступного разу.');

                target.classList.add(isCorrect ? 'correct' : 'wrong');
                
                if (isCorrect) {
                    if (qId && !solvedQuizzes.includes(qId)) {
                        solvedQuizzes.push(qId);
                        Storage.set('solved_quizzes', solvedQuizzes);
                        window.engine.progress.addXP(20);
                        UI.toast(`✅ Правильно! ${feedback} (+20 XP)`, 'success');
                    } else {
                        UI.toast(`✅ Правильно! ${feedback}`, 'success');
                    }
                } else {
                    parent.querySelector('[data-correct="true"]')?.classList.add('correct');
                    UI.toast(`❌ Помилка. ${feedback}`, 'error');
                }
            });
        });

        document.getElementById('evaluate-btn')?.addEventListener('click', () => PromptEngine.eval());
        PromptEngine.initLiveIndicator();
    });
})();
