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
  <div class="course-card primary-card">
    <div class="card-icon">📚</div>
    <h3>Теоретична база</h3>
    <p>Архітектура LLM, галюцинації та основи машинного навчання.</p>
    <ul class="card-links">
      <li><a href="theory/main-content.html">👉 Як працює ШІ? (База)</a></li>
      <li><a href="theory/examples.html">👉 Приклади промптів</a></li>
      <li><a href="theory/glossary.html">👉 Глосарій термінів</a></li>
    </ul>
  </div>

  <div class="course-card warning-card">
    <div class="card-icon">🛠</div>
    <h3>Практичний тренажер</h3>
    <p>Лабораторні роботи, кейси та написання системних промптів.</p>
    <ul class="card-links">
      <li><a href="practice/tasks.html">👉 Тренажер промпт-інжинірингу</a></li>
      <li><a href="practice/labs.html">👉 Аналітичні кейси (Фактчекінг)</a></li>
      <li><a href="practice/projects.html">👉 Творчі проєкти (PBL)</a></li>
    </ul>
  </div>

  <div class="course-card success-card">
    <div class="card-icon">✅</div>
    <h3>Система оцінювання</h3>
    <p>Інтерактивні перевірки знань та критерії оцінювання.</p>
    <ul class="card-links">
      <li><a href="tests/self-check.html">👉 Інтерактивний тест</a></li>
      <li><a href="tests/assessment.html">👉 Рубрикатор (Критерії оцінки)</a></li>
    </ul>
  </div>

  <div class="course-card" style="border-left-color: #ec4899;">
    <div class="card-icon">🔗</div>
    <h3>Корисні ресурси</h3>
    <p>Добірка нейромереж та матеріалів для самостійного вивчення.</p>
    <ul class="card-links">
      <li><a href="resources/links.html" style="color: #ec4899;">👉 База ШІ-інструментів</a></li>
    </ul>
  </div>
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
