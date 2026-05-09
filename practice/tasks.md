<head>
  <link rel="stylesheet" href="../styles/custom.css">
  <script src="../scripts/app.js" defer></script>
</head>

<a href="../index.html" class="btn-back">← Повернутися на головну</a>

<div class="glass-panel" markdown="1">

# 🛠 Практичний тренажер: Промпт-інжиніринг

Тут ви можете закріпити теоретичні знання на практиці. Спочатку скористайтесь нашим інтерактивним AI-аналізатором, а потім переходьте до самостійних завдань.

## 🤖 AI Prompt Evaluator (Симулятор)
<div style="background: var(--card-bg); border: 1px solid var(--card-border); padding: 25px; border-radius: 12px; margin: 20px 0;">
  <p style="margin-top: 0;">Напишіть ідеальний промпт за формулою <b>[Роль] + [Контекст] + [Завдання] + [Формат]</b>. Наша система проаналізує його якість.</p>
  
  <textarea id="prompt-input" rows="4" style="width: 100%; padding: 15px; border-radius: 8px; border: 1px solid var(--primary); background: var(--bg-main); color: var(--text-main); font-family: inherit; font-size: 1rem; resize: vertical;" placeholder="Наприклад: Дій як вчитель фізики. Для учнів 5 класу поясни закон тяжіння. Використовуй прості слова у форматі списку з 3 пунктів..."></textarea>
  
  <button id="evaluate-btn" style="background: var(--primary); color: white; border: none; padding: 12px 24px; border-radius: 8px; cursor: pointer; font-weight: bold; width: 100%; margin-top: 15px; font-size: 1rem; transition: background 0.2s;">Оцінити промпт</button>
  
  <div id="eval-result" style="display: none;"></div>
</div>

---

## Завдання для самостійної роботи (в ChatGPT, Claude або Gemini)

### Рівень I: Базовий (Генерація ідей)
**Завдання:** Використайте ШІ для мозкового штурму.
1. Попросіть ШІ згенерувати 5 ідей для подарунка на день народження друга, який захоплюється комп'ютерними іграми та велоспортом.
2. Проаналізуйте отриманий результат. Чи врахував ШІ обидва захоплення?

### Рівень II: Середній (Робота з ролями)
**Завдання:** Порівняйте відповіді від різних "персонажів".
1. Запитайте: `Поясни, що таке блокчейн`.
2. Відкрийте новий чат і запитайте: `Дій як вчитель молодших класів. Поясни, що таке блокчейн на прикладі конструктора LEGO`.
3. Зробіть висновок, як зміна ролі впливає на складність тексту.

### Рівень III: Advanced (Форматування та обмеження)
**Завдання:** Отримайте структуровані дані.
Створіть запит, який відповідає таким жорстким умовам:
* **Роль:** Фітнес-тренер
* **Завдання:** Скласти план тренувань для початківця
* **Контекст:** Тренування вдома, без інвентарю, 3 рази на тиждень
* **Формат:** Таблиця (Дні тижня / Вправи / Кількість підходів)

</div>
