<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="Інтерактивний освітній курс з Генеративного ШІ та Промпт-інжинірингу для 10-11 класів.">
  <title>Генеративний ШІ: Платформа майбутнього</title>
  
  <link rel="stylesheet" href="styles/custom.css">
  <link rel="manifest" href="manifest.json">
  <meta name="theme-color" content="#2563eb">
  
  <script src="scripts/app.js" defer></script>
</head>

<a href="#main-content" class="skip-link">Перейти до основного контенту</a>

<header class="hero-section glass-panel" aria-labelledby="hero-title">
  <div class="hero-content">
    <div class="badge" role="status">v4.0 ENTERPRISE</div>
    <h1 id="hero-title" class="gradient-text">Генеративний ШІ: Платформа</h1>
    <p class="subtitle">Інтерактивний освітній простір з системою відстеження прогресу</p>
  </div>
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

      <section class="course-card" style="border-left-color: #ec4899;">
        <h2 class="card-icon" aria-hidden="true">🔗</h2>
        <h3>Модуль 4: Корисні ресурси</h3>
        <p>Добірка нейромереж та матеріалів для самостійного вивчення.</p>
        <ul class="card-links" aria-label="Посилання модуля 4">
          <li><a href="resources/links.html" style="color: #ec4899;">👉 База ШІ-інструментів</a></li>
        </ul>
      </section>
    </div>
  </nav>

  <button class="theme-toggle" id="themeToggle" aria-label="Перемикач теми">🌙</button>

  <section style="text-align:center; padding:2rem 1rem; border-top:1px solid var(--card-border); margin-top:3rem;" aria-label="Інформація про автора">
    <p style="font-size:0.8em; color:var(--text-muted); text-transform:uppercase; letter-spacing:.08em; margin:0 0 8px;">
      Лабораторна робота №2 · Методика навчання інформатики
    </p>
    <p style="font-size:1.05em; font-weight:600; color:var(--text-main); margin:0 0 4px;">
      Білаш Ольга Олегівна
    </p>
    <p style="font-size:0.9em; color:var(--text-muted); margin:0;">
      Студентка 4 курсу · 2026
    </p>
  </section>
</main>
