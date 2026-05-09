<head>
  <link rel="stylesheet" href="../styles/custom.css">
  <script src="../scripts/app.js" defer></script>
</head>

<a href="../index.html" class="btn-link" style="display: inline-block; padding: 10px 20px; background: var(--primary); color: white; text-decoration: none; border-radius: 8px; margin-bottom: 20px; font-weight: bold; box-shadow: 0 4px 6px rgba(0,0,0,0.1); transition: transform 0.2s;">&larr; Повернутися на головну</a>

<div class="glass-panel" markdown="1" style="padding: 40px; border-radius: 16px;">

# 🔬 Лабораторний практикум: Аналітичні кейси

> **Мета заняття:** Розвиток критичного мислення, навичок глибокого фактчекінгу та розуміння етичних і правових меж використання генеративного ШІ в освіті та креативних індустріях.

<div class="term-card" style="border-left: 6px solid var(--danger);">
  <div style="display: flex; align-items: center; margin-bottom: 15px;">
    <span style="font-size: 24px; margin-right: 15px;">🛑</span>
    <h3 style="margin: 0; color: var(--danger);">Кейс 1: "Небезпечна довіра"</h3>
  </div>
  <p style="color: var(--text-main); font-size: 1.05em; line-height: 1.7;"><b>Ситуація:</b> Учень 10 класу готував дослідницький реферат з історії України за допомогою ШІ. Нейромережа згенерувала бездоганно структурований текст про масштабну "Битву під Києвом у 1912 році", навівши "цитати" вигаданих генералів та посилання на неіснуючі архіви. Учень здав роботу і отримав "1" (одиницю), адже такої битви ніколи не існувало.</p>
</div>

**📝 Завдання для обговорення (робота в групах):**
1. Як у Data Science та комп'ютерній лінгвістиці називається явище, з яким зіткнувся учень? 
2. Який критичний етап (фільтр) у роботі з генеративним ШІ він пропустив?
3. **Практичний артефакт:** Складіть чек-лист з 3-х обов'язкових кроків *"Алгоритм верифікації згенерованих наукових фактів"*.

<details class="term-card" style="margin-top: 15px; cursor: pointer;">
  <summary style="font-weight: bold; color: var(--primary);">💡 Відкрити підказку від викладача</summary>
  <p style="margin-top: 10px; font-size: 0.9em; color: var(--text-muted);">Згадайте, як працює механізм передбачення наступного токена. ШІ не шукає інформацію в базі даних фактів, він генерує лінгвістично правильний текст. Для фактчекінгу використовуйте техніку "Тріангуляції джерел".</p>
</details>

<hr style="border: 0; height: 1px; background: var(--card-border); margin: 40px 0;">

<div class="term-card" style="border-left: 6px solid var(--primary);">
  <div style="display: flex; align-items: center; margin-bottom: 15px;">
    <span style="font-size: 24px; margin-right: 15px;">🎨</span>
    <h3 style="margin: 0; color: var(--primary);">Кейс 2: "Чиє це мистецтво?"</h3>
  </div>
  <p style="color: var(--text-main); font-size: 1.05em; line-height: 1.7;"><b>Ситуація:</b> Учениця згенерувала неймовірно красиву ілюстрацію у Midjourney за власним детальним текстовим запитом (промптом), який вона тестувала та вдосконалювала понад 2 години. Вона виграла шкільний конкурс цифрових художників. Проте інші учасники подали апеляцію, заявивши: "Це нечесно, малювала програма, а не вона".</p>
</div>

**📝 Завдання для дебатів:**
1. Чи є учениця де-факто та де-юре автором цієї картини? Кому належать авторські права на згенерований ШІ контент згідно з сучасним законодавством?
2. Де проходить межа між інструментом (як графічний планшет чи Adobe Photoshop) і самостійним "штучним митцем"?

<hr style="border: 0; height: 1px; background: var(--card-border); margin: 40px 0;">

<div class="term-card" style="border-left: 6px solid var(--warning-text);">
  <div style="display: flex; align-items: center; margin-bottom: 15px;">
    <span style="font-size: 24px; margin-right: 15px;">💻</span>
    <h3 style="margin: 0; color: var(--warning-text);">Кейс 3: "Небезпечний код"</h3>
  </div>
  <p style="color: var(--text-main); font-size: 1.05em; line-height: 1.7;"><b>Ситуація:</b> Junior-розробник попросив ШІ написати функцію для авторизації користувачів на сайті. ШІ видав ідеально працюючий код, але використав застарілу бібліотеку шифрування та залишив вразливість для SQL-ін'єкцій. Через тиждень базу даних клієнтів було зламано.</p>
</div>

**📝 Завдання для аналізу:**
1. Хто несе відповідальність за злам: ШІ, розробник чи компанія?
2. Яке головне правило програмування з використанням ШІ-асистентів (Copilot, ChatGPT) було порушено?

<hr style="border: 0; height: 1px; background: var(--card-border); margin: 40px 0;">

<div class="term-card" style="border-left: 6px solid #8b5cf6;">
  <div style="display: flex; align-items: center; margin-bottom: 15px;">
    <span style="font-size: 24px; margin-right: 15px;">⚖️</span>
    <h3 style="margin: 0; color: #8b5cf6;">Кейс 4: "Упереджений рекрутер"</h3>
  </div>
  <p style="color: var(--text-main); font-size: 1.05em; line-height: 1.7;"><b>Ситуація:</b> Велика ІТ-компанія налаштувала ШІ для сортування резюме кандидатів. Через місяць виявилося, що алгоритм автоматично відхиляв резюме всіх жінок на посаду програміста, навіть якщо їхній досвід був ідеальним. Розробники запевнили, що не програмували ШІ на таку дискримінацію.</p>
</div>

**📝 Завдання для обговорення:**
1. Чому виникла така "гендерна упередженість" (Bias), якщо ШІ — це просто математика?
2. Що саме компанія "згодувала" алгоритму на етапі навчання (Fine-tuning)? Як це виправити?

</div>
