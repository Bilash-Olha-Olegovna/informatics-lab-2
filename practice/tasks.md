<head>
  <link rel="stylesheet" href="../styles/custom.css">
  <script src="../scripts/interactive.js" defer></script>
</head>

<a href="../index.html" class="btn-link" style="display: inline-block; padding: 10px 20px; background: var(--primary); color: white; text-decoration: none; border-radius: 8px; margin-bottom: 20px; font-weight: bold; box-shadow: 0 4px 6px rgba(0,0,0,0.1); transition: transform 0.2s;">&larr; Повернутися на головну</a>

<div class="glass-panel" style="padding: 40px; border-radius: 16px; background: var(--bg-glass);">

# 🏋️ Тренажер промпт-інжинірингу: Рівні майстерності

> **Інструкція:** Завдання виконуються лінійно (від простого до складного). Ваше завдання — навчитися керувати контекстним вікном моделі. Усі артефакти зберігайте у цифровий звіт.

---

<div style="display: flex; flex-direction: column; gap: 30px;">

  <div style="border: 2px solid #22c55e; border-radius: 12px; padding: 25px; position: relative; background: white;">
    <div style="position: absolute; top: -15px; left: 20px; background: #22c55e; color: white; padding: 5px 15px; border-radius: 20px; font-weight: bold; box-shadow: 0 4px 6px rgba(34,197,94,0.3);">🟢 Рівень I: Базовий</div>
    
    <h3 style="margin-top: 15px; color: #166534;">Контроль обсягу та лексикону</h3>
    <p style="color: var(--text-muted); font-size: 0.9em;">⏱ Орієнтовний час: 10 хв</p>
    
    <p><b>Завдання:</b> Навчити ШІ писати строго в заданих рамках.</p>
    <ol>
      <li>Напишіть запит: <code>Поясни, що таке комп'ютерний вірус</code>. Оцініть обсяг тексту.</li>
      <li><b>Оптимізація:</b> Додайте жорсткі параметри: <code>...Твоя відповідь має складатися рівно з 3 речень і не містити жодних складних технічних термінів.</code></li>
    </ol>
    <div style="background: #f0fdf4; padding: 10px 15px; border-radius: 6px; border-left: 4px solid #22c55e;">
      <b>🎯 Критерій успіху:</b> Відповідь ідеально відповідає математичним обмеженням (3 речення).
    </div>
  </div>

  <div style="border: 2px solid #f59e0b; border-radius: 12px; padding: 25px; position: relative; background: white;">
    <div style="position: absolute; top: -15px; left: 20px; background: #f59e0b; color: white; padding: 5px 15px; border-radius: 20px; font-weight: bold; box-shadow: 0 4px 6px rgba(245,158,11,0.3);">🟡 Рівень II: Середній</div>
    
    <h3 style="margin-top: 15px; color: #92400e;">Робота з "Persona" (Ролями) та Аудиторією</h3>
    <p style="color: var(--text-muted); font-size: 0.9em;">⏱ Орієнтовний час: 15 хв</p>
    
    <p><b>Завдання:</b> Адаптувати науковий матеріал під різні когнітивні рівні.</p>
    <ol>
      <li><b>Запит 1:</b> <code>Дій як професор фізики. Згенеруй науковий опис закону Архімеда з використанням академічної термінології.</code></li>
      <li><b>Запит 2 (в тому ж чаті):</b> <code>А тепер перепиши цей текст так, ніби ти пояснюєш його 5-річній дитині. Використовуй прості аналогії, наприклад, з іграшками у ванній.</code></li>
    </ol>
    <div style="background: #fffbeb; padding: 10px 15px; border-radius: 6px; border-left: 4px solid #f59e0b;">
      <b>🎯 Критерій успіху:</b> Наявність двох кардинально різних за лексикою та стилем текстів, що пояснюють один і той самий фізичний закон.
    </div>
  </div>

  <div style="border: 2px solid #3b82f6; border-radius: 12px; padding: 25px; position: relative; background: white;">
    <div style="position: absolute; top: -15px; left: 20px; background: #3b82f6; color: white; padding: 5px 15px; border-radius: 20px; font-weight: bold; box-shadow: 0 4px 6px rgba(59,130,246,0.3);">🔵 Рівень III: Advanced</div>
    
    <h3 style="margin-top: 15px; color: #1e3a8a;">Ланцюжок міркувань (Chain of Thought)</h3>
    <p style="color: var(--text-muted); font-size: 0.9em;">⏱ Орієнтовний час: 20 хв</p>
    
    <p><b>Завдання:</b> Змусити ШІ "думати" покроково, щоб уникнути логічних галюцинацій у складних задачах.</p>
    <ol>
      <li>Знайдіть складну логічну або алгоритмічну задачу з олімпіади.</li>
      <li>Створіть фреймворк-запит: <br><code>Ось умова задачі: [вставити умову]. Увага: Не пиши одразу фінальну відповідь. Спочатку поясни своє рішення крок за кроком (step-by-step), розпиши логіку міркувань, і лише після цього зроби фінальний висновок.</code></li>
    </ol>
    <div style="background: #eff6ff; padding: 10px 15px; border-radius: 6px; border-left: 4px solid #3b82f6;">
      <b>🎯 Критерій успіху:</b> ШІ генерує розгорнутий алгоритм рішення (лог міркувань), який дозволяє людині-аудитору перевірити кожну математичну чи логічну дію моделі.
    </div>
  </div>

</div>
</div>
