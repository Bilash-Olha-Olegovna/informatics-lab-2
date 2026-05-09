<head>
  <link rel="stylesheet" href="../styles/custom.css">
  <script src="../scripts/interactive.js" defer></script>
  <script src="https://polyfill.io/v3/polyfill.min.js?features=es6"></script>
  <script id="MathJax-script" async src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js"></script>
  <script type="module">
    import mermaid from 'https://cdn.jsdelivr.net/npm/mermaid@10/dist/mermaid.esm.min.mjs';
    mermaid.initialize({ startOnLoad: true, theme: 'default' });
  </script>
</head>

<a href="../index.html" class="btn-link" style="display: inline-block; padding: 10px 20px; background: var(--primary); color: white; text-decoration: none; border-radius: 8px; margin-bottom: 20px; font-weight: bold; box-shadow: 0 4px 6px rgba(0,0,0,0.1); transition: transform 0.2s;">&larr; Повернутися на головну</a>

<div class="glass-panel" markdown="1" style="padding: 40px; border-radius: 16px; background: var(--bg-glass);">

# 🧠 Теоретичний блок: Як працює генеративний ШІ?

<div style="background: white; border-left: 4px solid var(--primary); padding: 20px; border-radius: 0 8px 8px 0; margin: 25px 0; box-shadow: 0 4px 15px rgba(0,0,0,0.05);">
  <h3 style="margin-top: 0; color: var(--primary);">Що таке Штучний Інтелект (ШІ)?</h3>
  <p style="margin-bottom: 0;"><b>Штучний інтелект</b> — це здатність комп'ютерних систем виконувати завдання, які зазвичай потребують людського розуму (розпізнавання мови, прийняття рішень, візуальне сприйняття).</p>
</div>

### 📈 Еволюція ШІ:
1. ⚙️ **Правиловий ШІ (Символьний):** Працює за жорстко заданими правилами *"Якщо -> Тоді"*.
2. 📊 **Машинне навчання (ML):** Система сама знаходить закономірності у великих масивах даних.
3. 🎨 **Генеративний ШІ (GenAI):** Здатний створювати новий, унікальний контент (текст, зображення, код, музику) на основі вивчених шаблонів.

<div align="center" style="margin: 30px 0;">
  <img src="../resources/images/evolution.png" alt="Еволюція ШІ" width="100%" style="border-radius: 12px; box-shadow: 0 8px 16px rgba(0,0,0,0.1);">
</div>

---

## 📚 Великі мовні моделі (LLM)
Такі системи, як ChatGPT, Gemini або Claude, базуються на LLM (Large Language Models). Їхній головний принцип роботи — **передбачення наступного слова (токена)**. Вони не "думають" як люди, а використовують складну математику та статистику, щоб визначити, яке слово з найбільшою ймовірністю має йти далі у реченні.

<div style="background-color: #fff3cd; border: 1px solid #ffeeba; border-left: 6px solid #ffc107; padding: 15px; margin: 25px 0; border-radius: 6px;">
  <div style="display: flex; align-items: center; margin-bottom: 10px;">
    <span style="font-size: 24px; margin-right: 15px;">⚠️</span>
    <h4 style="margin: 0; color: #856404; font-size: 1.2em;">Важливо: Галюцинації ШІ</h4>
  </div>
  <p style="color: #856404; margin-bottom: 0;">Оскільки ШІ лише математично вгадує слова, він іноді може впевнено видавати абсолютно неправдиву інформацію. Це небезпечне явище називається <b>галюцинацією ШІ</b> і вимагає обов'язкового фактчекінгу.</p>
</div>

## ✍️ Основи промпт-інжинірингу
**Промпт** (запит) — це текст, який ви надсилаєте штучному інтелекту, щоб отримати відповідь. 

<div style="background: #f8fafc; padding: 15px; border-radius: 8px; border: 1px dashed #cbd5e1; text-align: center; margin: 20px 0;">
  <span style="font-family: monospace; font-size: 1.2em; color: var(--primary);">Формула ідеального промпту: <br><b>[РОЛЬ] + [КОНТЕКСТ] + [ЗАВДАННЯ] + [ФОРМАТ]</b></span>
</div>

<div align="center" style="margin: 30px 0;">
  <img src="../resources/images/prompt-puzzle.png" alt="Складові ідеального промпту" width="80%" style="border-radius: 12px; box-shadow: 0 8px 16px rgba(0,0,0,0.1);">
  <h3 style="margin-top: 40px; color: var(--primary);">🎥 Демонстрація можливостей відеогенерації</h3>
<p>Нижче наведено приклад відео, створеного за допомогою моделі Luma Dream Machine за текстовим запитом.</p>

<div align="center" style="margin: 20px 0;">
  <video width="100%" controls style="border-radius: 12px; box-shadow: 0 10px 30px rgba(0,0,0,0.2);">
    <source src="../resources/videos/ai_demo.mp4" type="video/mp4">
    Ваш браузер не підтримує відео-тег.
  </video>
</div>
</div>

* ❌ **Поганий промпт:** *"Напиши про космос."*
* ✅ **Хороший промпт:** *"Дій як вчитель астрономії (Роль). Учням 10 класу складно зрозуміти чорні діри (Контекст). Поясни, що таке горизонт подій (Завдання). Використовуй прості аналогії з побуту та маркований список (Формат)."*

---

## 📐 Математична модель та логіка

В основі роботи мовних моделей лежить функція **Softmax**, яка розраховує ймовірність наступного токена. Формула виглядає так:

$$\sigma(\mathbf{z})_j = \frac{e^{z_j}}{\sum_{k=1}^K e^{z_k}}$$

### 🤖 Алгоритм генерації (Блок-схема)

```mermaid
graph LR
    A[Промпт користувача] --> B{Токенізація}
    B --> C[Передбачення токена]
    C --> D[Декодування тексту]
    D --> E[Фінальна відповідь]
    style C fill:#f9f,stroke:#333,stroke-width:4px
