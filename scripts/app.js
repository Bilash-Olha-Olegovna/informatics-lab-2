/**
 * GenAI EdTech Platform Core | v5.0 SECURE ENTERPRISE (PERFECTION PASS)
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
        set: (k, v) => {
            try {
                localStorage.setItem(`ai_edu_${k}`, JSON.stringify(v));
            } catch (e) {
                console.warn('Storage quota exceeded or disabled', e);
            }
        },
        getArray: (k) => {
            const arr = Storage.get(k, []);
            return Array.isArray(arr) ? arr : [];
        }
    };

    // 2. UI & TOAST MODULE
    class UI {
        static init() {
            if (!document.getElementById('toast-container')) {
                this.container = document.createElement('div');
                this.container.id = 'toast-container';
                document.body.appendChild(this.container);
            } else {
                this.container = document.getElementById('toast-container');
            }
            this.injectCopyButtons();
        }

        static toast(msg, type = 'success', duration = 5000) {
            if (!msg || msg === 'undefined') return;
            const t = document.createElement('div');
            t.className = `toast toast-${type}`;
            // Add icon
            const icon = type === 'success' ? '✅' : '❌';
            t.innerHTML = `<span>${icon}</span> <span>${msg}</span>`;
            
            this.container.appendChild(t);
            
            // Setup animation cleanup
            let timeoutId = setTimeout(() => { 
                t.style.opacity = '0'; 
                t.style.transform = 'translateY(20px)'; 
                setTimeout(() => t.remove(), 400); 
            }, duration);

            // Allow dismissal on click
            t.addEventListener('click', () => {
                clearTimeout(timeoutId);
                t.style.opacity = '0'; 
                t.style.transform = 'translateY(20px)'; 
                setTimeout(() => t.remove(), 400); 
            });
        }

        static injectCopyButtons() {
            document.querySelectorAll('pre').forEach(pre => {
                // Prevent duplicate buttons
                if (pre.querySelector('.copy-btn')) return;

                const codeNode = pre.querySelector('code');
                if (!codeNode) return;

                pre.style.position = 'relative';
                const btn = document.createElement('button');
                btn.className = 'copy-btn';
                btn.setAttribute('aria-label', 'Copy code');
                btn.innerHTML = '📋 Copy';
                
                btn.onclick = async () => {
                    try {
                        await navigator.clipboard.writeText(codeNode.innerText);
                        btn.innerHTML = '✅ Copied!';
                        btn.style.background = 'var(--success)';
                        btn.style.borderColor = 'var(--success)';
                        setTimeout(() => {
                            btn.innerHTML = '📋 Copy';
                            btn.style.background = '';
                            btn.style.borderColor = '';
                        }, 2000);
                    } catch (err) {
                        UI.toast('Failed to copy', 'error');
                    }
                };
                pre.appendChild(btn);
            });
        }

        static fireConfetti() {
            if (!window.confetti && !document.getElementById('confetti-script')) {
                const s = document.createElement('script');
                s.id = 'confetti-script';
                s.src = 'https://cdn.jsdelivr.net/npm/canvas-confetti@1.6.0/dist/confetti.browser.min.js';
                s.onload = () => {
                    if (window.confetti) window.confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 }, colors: ['#2563eb', '#10b981', '#f59e0b', '#ec4899'] });
                };
                document.body.appendChild(s);
            } else if (window.confetti) {
                window.confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 }, colors: ['#2563eb', '#10b981', '#f59e0b', '#ec4899'] });
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
            
            // Avoid layout thrashing by checking if update is needed
            const newHTML = `<span>🏆 Lvl <span id="hud-lvl">${this.level}</span></span><div class="hud-sep"></div><span>✨ <span id="hud-xp">${this.xp}</span> XP</span>`;
            if (hud.innerHTML !== newHTML) {
                hud.innerHTML = newHTML;
            }
            
            // Sync Dashboard safely
            const bar = document.getElementById('xp-bar');
            const cnt = document.getElementById('xp-counter');
            const lvl = document.getElementById('level-counter');

            if (lvl && lvl.innerText !== `Рівень ${this.level}`) lvl.innerText = `Рівень ${this.level}`;
            if (cnt && cnt.innerText !== `${this.xp} XP`) cnt.innerText = `${this.xp} XP`;
            
            if (bar) {
                const progressNum = (this.xp % 100);
                const progress = progressNum + '%';
                
                // Initialization
                if (!bar.dataset.initialized) {
                    bar.dataset.initialized = 'true';
                    bar.style.width = '0%';
                    requestAnimationFrame(() => {
                        requestAnimationFrame(() => {
                            bar.style.width = progress;
                        });
                    });
                } else {
                    // Level up animation handler
                    if (progressNum === 0 && this.xp > 0) {
                        bar.style.width = '100%';
                        setTimeout(() => { 
                            bar.style.transition = 'none'; 
                            bar.style.width = '0%'; 
                            requestAnimationFrame(() => {
                                requestAnimationFrame(() => {
                                    bar.style.transition = 'width 1s cubic-bezier(0.4, 0, 0.2, 1)'; 
                                    bar.style.width = progress;
                                });
                            });
                        }, 1000);
                    } else {
                        bar.style.width = progress;
                    }
                }
            }
        }

        addXP(amt) {
            if (!Number.isFinite(amt) || amt <= 0) return;
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
            if (!input || input.dataset.initialized) return;
            input.dataset.initialized = 'true';

            const liveBar = document.createElement('div');
            liveBar.style.cssText = 'display:flex; gap:10px; margin-top:16px; flex-wrap:wrap;';
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
                pill.style.cssText = 'font-size:0.85rem; font-weight:600; padding:8px 14px; border-radius:20px; border:1px solid var(--card-border); color:var(--text-muted); background:var(--card-bg); transition:all 0.3s cubic-bezier(0.16, 1, 0.3, 1); box-shadow: 0 2px 5px rgba(0,0,0,0.02);';
                liveBar.appendChild(pill);
            });
            input.parentNode.insertBefore(liveBar, input.nextSibling);

            // Performance: Cache DOM elements
            const pillElements = pills.map(p => ({
                el: document.getElementById(p.id),
                ...p
            }));

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
                    
                    checks.forEach((c, idx) => {
                        const el = pillElements[idx].el;
                        if (el) {
                            if (c.ok) {
                                el.style.background = 'rgba(16,185,129,0.1)';
                                el.style.borderColor = 'var(--success)';
                                el.style.color = 'var(--success)';
                                el.style.transform = 'scale(1.05)';
                            } else {
                                el.style.background = 'var(--card-bg)';
                                el.style.borderColor = 'var(--card-border)';
                                el.style.color = 'var(--text-muted)';
                                el.style.transform = 'scale(1)';
                            }
                        }
                    });
                }, 250);
            });
        }

        static eval() {
            const input = document.getElementById('prompt-input');
            const res = document.getElementById('eval-result');
            const btn = document.getElementById('evaluate-btn');
            if (!input || !res) return;

            if (btn) { 
                btn.disabled = true; 
                btn.style.transform = 'scale(0.98)';
                setTimeout(() => {
                    btn.disabled = false;
                    btn.style.transform = 'none';
                }, 1500); 
            }

            const val = input.value.toLowerCase().trim();
            if (val.length < 15) { 
                UI.toast('Запит занадто короткий. Опишіть детальніше!', 'error'); 
                return; 
            }

            const criteria = [
                { reg: /(дій як|уяви себе|ти —|в ролі|виступи як|експерт|помічник|вчитель)/i, msg: '🎭 Роль визначена' },
                { reg: /(для учн|для студент|для фахівц|ситуація:|оскільки|мета:|щоб)/i, msg: '🌍 Контекст/Аудиторія зрозуміла' },
                { reg: /(напиши|створи|поясни|зроби|розробіть|склади|проаналізуй|сформулюй)/i, msg: '🎯 Чітке завдання (дієслово)' },
                { reg: /(формат|список|таблиц|речен|абзац|пунктів|кроків)/i, msg: '📋 Встановлено формат виводу' }
            ];

            let score = 0;
            let html = '<ul style="padding-left:0; list-style:none; margin-top:20px;">';
            criteria.forEach(c => {
                const ok = c.reg.test(val);
                if (ok) score += 25;
                const icon = ok ? '✅' : '❌';
                const color = ok ? 'var(--success)' : 'var(--danger)';
                const bg = ok ? 'rgba(16,185,129,0.05)' : 'rgba(239,68,68,0.05)';
                html += `<li style="margin-bottom:12px; padding:12px 18px; border-radius:12px; background:${bg}; border:1px solid ${color}33; display:flex; align-items:center; gap:12px; font-weight:600; color: ${color}; transition:transform 0.2s;"><span style="font-size:1.2em">${icon}</span> ${c.msg}</li>`;
            });
            html += '</ul>';

            res.style.display = 'block';
            res.className = 'prompt-result glass-panel';
            res.style.animation = 'none';
            res.offsetHeight; // trigger reflow
            res.style.animation = 'fadeUp 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards';
            
            res.innerHTML = `
                <div style="display:flex; align-items:center; justify-content:space-between; border-bottom:1px solid var(--card-border); padding-bottom:15px;">
                    <h3 style="margin:0; font-size:1.4rem; color: var(--text-main)">Результат аналізу</h3>
                    <div style="font-size:1.5rem; font-weight:800; color: ${score === 100 ? 'var(--success)' : 'var(--xp-color)'}; background: ${score === 100 ? 'rgba(16,185,129,0.1)' : 'rgba(245,158,11,0.1)'}; padding:6px 18px; border-radius:99px;">
                        ${score}/100
                    </div>
                </div>
                ${html}
            `;
            
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
    const initApp = () => {
        if (window.engine) return; // Prevent double initialization

        UI.init();
        window.engine = { progress: new Progress(), theme: Storage.get('theme', 'dark') };

        // Theme Sync
        const applyTheme = (t) => {
            document.documentElement.setAttribute('data-theme', t);
            const btn = document.getElementById('themeToggle');
            if (btn) {
                btn.innerHTML = t === 'dark' ? '☀️' : '🌙';
                btn.setAttribute('aria-label', 'Toggle theme');
            }
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
            if (q.dataset.initialized) return;
            q.dataset.initialized = 'true';

            const qId = q.getAttribute('data-qid');
            if (qId && solvedQuizzes.includes(qId)) {
                q.dataset.done = 'true';
                const correctBtn = q.querySelector('[data-correct="true"]');
                if (correctBtn) correctBtn.classList.add('correct');
                q.querySelectorAll('.quiz-btn').forEach(b => b.disabled = true);
            }
        });

        // Event delegation for quizzes for better memory management
        document.body.addEventListener('click', (e) => {
            const btn = e.target.closest('.quiz-btn');
            if (!btn) return;

            const parent = btn.closest('.quiz-question');
            if (!parent || parent.dataset.done) return;
            
            const qId = parent.getAttribute('data-qid');
            parent.dataset.done = 'true';
            
            parent.querySelectorAll('.quiz-btn').forEach(b => b.disabled = true);
            
            const isCorrect = btn.dataset.correct === 'true';
            const feedback = btn.dataset.feedback || (isCorrect ? 'Чудова робота!' : 'Спробуйте ще раз наступного разу.');

            btn.classList.add(isCorrect ? 'correct' : 'wrong');
            
            if (isCorrect) {
                if (qId && !solvedQuizzes.includes(qId)) {
                    solvedQuizzes.push(qId);
                    Storage.set('solved_quizzes', solvedQuizzes);
                    window.engine.progress.addXP(20);
                    UI.toast(`Правильно! ${feedback} (+20 XP)`, 'success');
                } else {
                    UI.toast(`Правильно! ${feedback}`, 'success');
                }
            } else {
                parent.querySelector('[data-correct="true"]')?.classList.add('correct');
                UI.toast(`Помилка. ${feedback}`, 'error');
            }
        });

        document.getElementById('evaluate-btn')?.addEventListener('click', () => PromptEngine.eval());
        PromptEngine.initLiveIndicator();
    };

    // Safely init on DOM ready or immediately if already ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initApp);
    } else {
        initApp();
    }
})();
