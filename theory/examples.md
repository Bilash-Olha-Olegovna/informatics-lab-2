<head>
  <link rel="stylesheet" href="../styles/custom.css">
  <script src="../scripts/app.js" defer></script>
</head>

<a href="../index.html" class="btn-back">← Повернутися на головну</a>

<div class="glass-panel" markdown="1">

# 💡 Бібліотека промптів: Приклади та аналіз

У цьому розділі наведено порівняльний аналіз запитів до Великих мовних моделей (LLM). 

<div class="info-box">
  <p class="text-adaptive" style="margin: 0;"><b>🏆 Головне правило:</b> ШІ відповідає настільки якісно, наскільки якісно ви його запитуєте.</p>
</div>

## Базові vs. Професійні промпти

<div class="table-container" markdown="1">

| ❌ Базовий (поганий) запит | ✅ Професійний запит (Промпт-інжиніринг) | 🔍 Аналіз змін |
| :--- | :--- | :--- |
| *"Що таке гравітація?"* | *"Дій як вчитель фізики. Поясни концепцію гравітації для учня 5 класу, використовуючи аналогію з батутом і кулями. Обсяг: до 4 речень."* | Додано **Роль** (вчитель), **Аудиторію** (5 клас), **Формат** (аналогія) та **Обмеження** (4 речення). |
| *"Напиши код калькулятора."* | *"Ти — Senior Developer. Напиши консольний калькулятор на Python. Обов'язково додай обробку помилки ділення на нуль (ZeroDivisionError) та коментарі до коду."* | Чітко визначено **функціонал** та передбачено **обробку винятків**, що унеможливлює збої програми. |
| *"Зроби відео про штучний інтелект."* | *"Cinematic smooth tracking shot, moving forward. A futuristic glowing holographic brain floating above a desk. Photorealistic, 4k resolution, dramatic neon lighting."* | Для відео-моделей найважливішим є опис **руху камери** (tracking shot), **освітлення** (cinematic, neon) та **деталей об'єкта**. |

</div>

## Професійні галузеві промпти (Advanced)

<div class="term-card">
  <h3 class="text-adaptive" style="margin-top: 0;">📊 1. Аналіз Даних (Data Science)</h3>
  <p class="text-muted-adaptive"><b>Сценарій:</b> Вам потрібно проаналізувати таблицю продажів, але ви не знаєте Python.</p>
  <pre style="background: var(--terminal-bg); padding: 15px; border-radius: 8px; color: #a7f3d0; white-space: pre-wrap;">"Ти — Senior Data Analyst. Я надам тобі дані про продажі у форматі CSV. Твоє завдання: 
1. Знайти топ-3 товари за прибутком.
2. Виявити аномалії (наприклад, раптові падіння продажів).
3. Зробити прогноз на наступний місяць.
Пояснюй свої кроки (Chain-of-Thought) і надай фінальний звіт у вигляді таблиці."</pre>
</div>

<div class="term-card">
  <h3 class="text-adaptive" style="margin-top: 0;">💻 2. Програмування (Code Refactoring)</h3>
  <p class="text-muted-adaptive"><b>Сценарій:</b> Ви написали код, який працює, але виглядає жахливо. Ви хочете його оптимізувати.</p>
  <pre style="background: var(--terminal-bg); padding: 15px; border-radius: 8px; color: #a7f3d0; white-space: pre-wrap;">"Ти — Principal Software Engineer. Проведи код-рев'ю наступного JavaScript коду: [КОД]. 
Вимоги до рефакторингу:
- Заміни старі цикли на сучасні методи масивів (map, filter).
- Позбудься 'магічних чисел', винісши їх у константи.
- Додай JSDoc коментарі до кожної функції.
Поверни лише оновлений код без зайвих пояснень."</pre>
</div>

<div class="term-card">
  <h3 class="text-adaptive" style="margin-top: 0;">📈 3. Маркетинг та Копірайтинг</h3>
  <p class="text-muted-adaptive"><b>Сценарій:</b> Запуск нового продукту.</p>
  <pre style="background: var(--terminal-bg); padding: 15px; border-radius: 8px; color: #a7f3d0; white-space: pre-wrap;">"Дій як Lead Content Strategist. Розроби контент-план на 1 тиждень для Instagram з нагоди запуску нашого нового освітнього курсу з ШІ. 
Tone of Voice: надихаючий, інноваційний, але доступний для новачків.
Формат виводу: таблиця з колонками [День], [Формат: Reels/Post/Story], [Теза/Сценарій] та [Заклик до дії (CTA)]."</pre>
</div>

<div class="term-card">
  <h3 class="text-adaptive" style="margin-top: 0;">🔄 4. Зворотний інжиніринг (Reverse Prompting)</h3>
  <p class="text-muted-adaptive"><b>Сценарій:</b> Ви знайшли ідеально написаний текст і хочете, щоб ШІ створював схожі.</p>
  <pre style="background: var(--terminal-bg); padding: 15px; border-radius: 8px; color: #a7f3d0; white-space: pre-wrap;">"Я надам тобі ідеальний зразок тексту. Твоє завдання: 
1. Проаналізувати його стиль, тон, словниковий запас та структуру.
2. Написати Промпт (запит), який я зможу використати в майбутньому, щоб ти згенерував текст точнісінько в такому ж стилі.
Ось текст для аналізу: [ВСТАВТЕ ТЕКСТ]"</pre>
</div>

<div class="term-card">
  <h3 class="text-adaptive" style="margin-top: 0;">⚙️ 5. Структурування даних (JSON Generation)</h3>
  <p class="text-muted-adaptive"><b>Сценарій:</b> Вам потрібні дані для інтеграції в базу даних або веб-додаток.</p>
  <pre style="background: var(--terminal-bg); padding: 15px; border-radius: 8px; color: #a7f3d0; white-space: pre-wrap;">"Згенеруй базу даних з 5 видатних науковців у галузі штучного інтелекту. 
Поверни результат ВИКЛЮЧНО у валідному форматі JSON без жодного додаткового тексту чи привітань.
Структура об'єкта: { id: number, name: string, contribution: string, year: number }."</pre>
</div>

<div class="term-card" style="text-align: center; margin-top: 30px;">
  <p class="text-adaptive" style="margin: 0;"><b>💡 Порада для учнів:</b> Завжди використовуйте формулу: <code style="color: var(--primary);">Роль + Контекст + Завдання + Формат</code>.</p>
</div>

</div>
