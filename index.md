<head>
  <meta charset="UTF-8">
  <meta name="description" content="Найсучасніша освітня платформа про ШІ для учнів.">
  <title>GenAI PRO | Освітня платформа</title>
  <link rel="stylesheet" href="styles/custom.css">
  <link rel="manifest" href="manifest.json">
  <script src="scripts/app.js" defer></script>
</head>

<header class="hero-section glass-panel">
  <div class="badge">v4.0 ENTERPRISE</div>
  <h1 class="gradient-text">Генеративний ШІ: Платформа</h1>
  <p class="subtitle">Освітній простір з інтелектуальним HUD</p>
</header>

<main id="main-content">
  <section class="xp-dashboard glass-panel" style="margin: 20px 0; display: flex; align-items: center; padding: 20px;">
    <div id="level-counter" style="font-weight: 900; color: var(--primary);">Рівень 1</div>
    <div style="flex-grow: 1; height: 12px; background: var(--bg-main); margin: 0 20px; border-radius: 10px; overflow: hidden;">
      <div id="xp-bar" style="width: 0%; height: 100%; background: var(--primary); transition: 1s;"></div>
    </div>
    <div id="xp-counter" style="font-weight: 900; color: #f59e0b;">0 XP</div>
  </section>

  <nav aria-label="Головна навігація курсу">
    <div class="grid-container">
      <section class="course-card primary-card">
        <h2 class="card-icon" aria-hidden="true">📚</h2>
        <h3>Модуль 1: Теоретична база</h3>
        <p>Архітектура LLM та галюцинації.</p>
        <ul class="card-links" aria-label="Посилання модуля 1">
          <li><a href="theory/main-content.html">👉 Як працює ШІ?</a></li>
          <li><a href="theory/examples.html">👉 Приклади промптів</a></li>
          <li><a href="theory/glossary.html">👉 Глосарій</a></li>
        </ul>
      </section>

      <section class="course-card warning-card">
        <h2 class="card-icon" aria-hidden="true">🛠</h2>
        <h3>Модуль 2: Практичний тренажер</h3>
        <p>Аналітика та написання системних промптів.</p>
        <ul class="card-links" aria-label="Посилання модуля 2">
          <li><a href="practice/tasks.html">👉 Тренажер промптів</a></li>
          <li><a href="practice/labs.html">👉 Аналітичні кейси</a></li>
          <li><a href="practice/projects.html">👉 Творчі проєкти (PBL)</a></li>
        </ul>
      </section>

      <section class="course-card success-card">
        <h2 class="card-icon" aria-hidden="true">✅</h2>
        <h3>Модуль 3: Сертифікація</h3>
        <p>Тестування та отримання балів.</p>
        <ul class="card-links" aria-label="Посилання модуля 3">
          <li><a href="tests/self-check.html">👉 Інтерактивний тест</a></li>
          <li><a href="tests/assessment.html">👉 Критерії оцінки</a></li>
        </ul>
      </section>
    </div>
  </nav>

  <button class="theme-toggle" id="themeToggle" aria-label="Перемикач теми">
    <span class="icon">🌙</span>
  </button>
</main>

<footer style="margin-top: 50px; text-align: center; color: var(--text-muted); border-top: 1px solid var(--card-border); padding-top: 20px;" role="contentinfo">
  <p>© 2026 Enterprise EdTech Platform | Побудовано для Лабораторної №2</p>
</footer>
