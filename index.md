<head>
  <link rel="stylesheet" href="styles/custom.css">
  <script src="scripts/interactive.js" defer></script>
</head>

<div class="reading-progress"></div>

<button class="theme-toggle" id="themeToggle" aria-label="Перемикач теми">
  <span class="icon">🌙</span>
</button>

<div class="hero-section glass-panel">
  <div class="hero-content">
    <div class="badge">v2.0 PRO</div>
    <h1 class="gradient-text">Генеративний ШІ: Курс майбутнього</h1>
    <p class="subtitle">Інноваційний освітній простір для 10-11 класів</p>
  </div>
</div>

<div class="grid-container">
  <a href="theory/main-content.html" class="course-card primary-card">
    <div class="card-icon">📚</div>
    <h3>Теоретична база</h3>
    <p>Архітектура LLM, токенізація, галюцинації та основи машинного навчання.</p>
    <span class="btn-link">Вивчити теорію &rarr;</span>
  </a>

  <a href="practice/tasks.html" class="course-card warning-card">
    <div class="card-icon">🛠</div>
    <h3>Практичний тренажер</h3>
    <p>Лабораторні роботи, кейси фактчекінгу та написання системних промптів.</p>
    <span class="btn-link">Почати практику &rarr;</span>
  </a>

  <a href="tests/self-check.html" class="course-card success-card">
    <div class="card-icon">✅</div>
    <h3>Система оцінювання</h3>
    <p>Інтерактивні перевірки знань та розгорнуті критерії оцінювання проєктів.</p>
    <span class="btn-link">Скласти тест &rarr;</span>
  </a>
</div>

<div class="ai-terminal">
  <div class="terminal-header">
    <span class="dot red"></span>
    <span class="dot yellow"></span>
    <span class="dot green"></span>
    <span class="terminal-title">AI Prompt Console — bash</span>
  </div>
  <div class="terminal-body">
    <p class="user-input"><span class="prompt-arrow">➜</span> <span class="typing-user">Дій як вчитель. Поясни, що таке ШІ.</span></p>
    <p class="ai-output" id="aiResponse"></p>
  </div>
</div>

<footer style="margin-top: 50px; text-align: center; color: var(--text-muted); font-size: 0.9em; border-top: 1px solid var(--card-border); padding-top: 20px;">
  <p>© 2026 Навчальний модуль з Інформатики. Розроблено для лабораторної роботи №2.</p>
  <p>Автор: Білаш Ольга Олегівна | Powered by GitHub Pages & AI</p>
</footer>

<div id="toast-container"></div>
