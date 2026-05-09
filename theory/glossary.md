<head>
  <link rel="stylesheet" href="../styles/custom.css">
  <script src="../scripts/app.js" defer></script>
</head>

<a href="../index.html" class="btn-back">← Повернутися на головну</a>

<div class="glass-panel" markdown="1">

# 📖 Глосарій термінів (Академічний Словник)

Цей словник допоможе вам орієнтуватися у професійній термінології сфери штучного інтелекту.

<div style="display: flex; flex-direction: column; gap: 15px; margin-top: 30px;">

  <div class="term-card">
    <h4 class="text-adaptive" style="margin: 0 0 5px 0;">🧠 Штучний інтелект (ШІ / AI)</h4>
    <p class="text-muted-adaptive" style="margin: 0; font-size: 0.95em;">Здатність комп'ютерних систем імітувати когнітивні функції людини (навчання, міркування, творчість).</p>
  </div>

  <div class="term-card">
    <h4 class="text-adaptive" style="margin: 0 0 5px 0;">📝 Генеративний ШІ (GenAI)</h4>
    <p class="text-muted-adaptive" style="margin: 0; font-size: 0.95em;">Клас нейромереж, здатних створювати новий унікальний контент (текст, зображення, програмний код, аудіо) на основі текстових описів.</p>
  </div>

  <div class="term-card">
    <h4 class="text-adaptive" style="margin: 0 0 5px 0;">📚 LLM (Large Language Model)</h4>
    <p class="text-muted-adaptive" style="margin: 0; font-size: 0.95em;">Велика мовна модель (наприклад, GPT-4, Claude 3). Алгоритм, натренований на терабайтах текстів, який генерує відповіді шляхом статистичного передбачення наступного слова.</p>
  </div>

  <div class="term-card">
    <h4 class="text-adaptive" style="margin: 0 0 5px 0;">🧩 Токен (Token)</h4>
    <p class="text-muted-adaptive" style="margin: 0; font-size: 0.95em;">Базова одиниця тексту, яку обробляє ШІ. Це не обов'язково ціле слово; токен може бути частиною слова або навіть одним символом (наприклад, слово "яблуко" може складатись з 2-3 токенів).</p>
  </div>

  <div class="term-card">
    <h4 class="text-adaptive" style="margin: 0 0 5px 0;">🪟 Контекстне вікно (Context Window)</h4>
    <p class="text-muted-adaptive" style="margin: 0; font-size: 0.95em;">Максимальна кількість токенів (слів), яку ШІ здатен "тримати в пам'яті" під час одного діалогу. Якщо текст перевищує контекстне вікно, модель почне забувати попередню інформацію.</p>
  </div>

  <div class="term-card">
    <h4 class="text-adaptive" style="margin: 0 0 5px 0;">⌨️ Промпт (Prompt)</h4>
    <p class="text-muted-adaptive" style="margin: 0; font-size: 0.95em;">Вхідний текстовий запит, інструкція або контекст, який користувач передає ШІ для отримання результату.</p>
  </div>

  <div class="term-card">
    <h4 class="text-adaptive" style="margin: 0 0 5px 0;">🎯 Zero-shot / Few-shot Prompting</h4>
    <p class="text-muted-adaptive" style="margin: 0; font-size: 0.95em;">Техніки створення запитів. <b>Zero-shot:</b> ви просите ШІ виконати задачу без жодного прикладу. <b>Few-shot:</b> ви надаєте 2-3 приклади очікуваного результату в самому промпті для підвищення точності.</p>
  </div>

  <div class="term-card" style="border-left: 4px solid var(--danger);">
    <h4 style="margin: 0 0 5px 0; color: var(--danger);">👻 Галюцинація ШІ</h4>
    <p class="text-muted-adaptive" style="margin: 0; font-size: 0.95em;">Специфічна помилка мовних моделей, коли нейромережа впевнено генерує правдоподібний, але фактично неіснуючий або хибний контент.</p>
  </div>

  <div class="term-card">
    <h4 class="text-adaptive" style="margin: 0 0 5px 0;">🔄 Трансформер (Transformer)</h4>
    <p class="text-muted-adaptive" style="margin: 0; font-size: 0.95em;">Архітектура нейронної мережі, представлена у 2017 році. Базується на механізмі уваги, що дозволяє моделі враховувати зв'язки між усіма словами речення одночасно. Є основою для GPT.</p>
  </div>

  <div class="term-card">
    <h4 class="text-adaptive" style="margin: 0 0 5px 0;">🌡 Температура (Temperature)</h4>
    <p class="text-muted-adaptive" style="margin: 0; font-size: 0.95em;">Параметр генерації LLM (від 0.0 до 2.0), що керує "креативністю" відповіді. Низька температура дає точні, детерміновані відповіді, а висока — різноманітні та творчі.</p>
  </div>

  <div class="term-card">
    <h4 class="text-adaptive" style="margin: 0 0 5px 0;">🛠 Fine-tuning (Доопрацювання)</h4>
    <p class="text-muted-adaptive" style="margin: 0; font-size: 0.95em;">Процес додаткового тренування базової мовної моделі на специфічному наборі даних (наприклад, медичній літературі), щоб зробити її експертом у вузькій галузі.</p>
  </div>

  <div class="term-card">
    <h4 class="text-adaptive" style="margin: 0 0 5px 0;">🔍 RAG (Retrieval-Augmented Generation)</h4>
    <p class="text-muted-adaptive" style="margin: 0; font-size: 0.95em;">Архітектура, де ШІ перед генерацією відповіді спочатку шукає інформацію в зовнішній базі даних або в інтернеті. Це суттєво зменшує ризик галюцинацій, оскільки відповідь базується на знайдених документах.</p>
  </div>

</div>

</div>
