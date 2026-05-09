<head>
  <link rel="stylesheet" href="../styles/custom.css">
  <script src="../scripts/interactive.js" defer></script>
</head>

<a href="../index.html" class="btn-link" style="display: inline-block; padding: 10px 20px; background: var(--primary); color: white; text-decoration: none; border-radius: 8px; margin-bottom: 20px; font-weight: bold; box-shadow: 0 4px 6px rgba(0,0,0,0.1); transition: transform 0.2s;">&larr; Повернутися на головну</a>

<div class="glass-panel" markdown="1" style="padding: 40px; border-radius: 16px; background: var(--bg-glass);">

# 💡 Бібліотека промптів: Приклади та аналіз

У цьому розділі наведено порівняльний аналіз запитів до Великих мовних моделей (LLM). 

<div style="background: #1e293b; color: white; padding: 15px 20px; border-radius: 8px; margin-bottom: 30px;">
  <b>🏆 Головне правило:</b> ШІ відповідає настільки якісно, наскільки якісно ви його запитуєте.
</div>

## Порівняльна таблиця ефективності

<div markdown="1" style="overflow-x: auto; box-shadow: 0 4px 15px rgba(0,0,0,0.05); border-radius: 8px; padding: 10px;">

| ❌ Базовий (поганий) запит | ✅ Професійний запит (Промпт-інжиніринг) | 🔍 Аналіз змін |
| :--- | :--- | :--- |
| *"Що таке гравітація?"* | *"Дій як вчитель фізики. Поясни концепцію гравітації для учня 5 класу, використовуючи аналогію з батутом і кулями. Обсяг: до 4 речень."* | Додано **Роль** (вчитель), **Аудиторію** (5 клас), **Формат** (аналогія) та **Обмеження** (4 речення). |
| *"Напиши код калькулятора на Python."* | *"Ти — Senior Python Developer. Напиши консольний калькулятор на Python, який підтримує додавання, віднімання та ділення. Обов'язково додай обробку помилки ділення на нуль (ZeroDivisionError) та коментарі до коду."* | Чітко визначено **функціонал** та передбачено **обробку винятків**, що унеможливлює збої програми. |
| *"Як покращити пам'ять?"* | *"Я готуюсь до ЗНО з історії і маю запам'ятати багато дат. Запропонуй 3 науково доведені мнемонічні техніки у форматі маркованого списку."* | Задано **Контекст** (ЗНО з історії), чітку **кількість** (3 техніки) та **структуру виводу** (список). |
| *"Зроби відео про штучний інтелект."* | *"Cinematic smooth tracking shot, moving forward. A futuristic glowing holographic brain floating above a desk. Photorealistic, 4k resolution, dramatic neon lighting."* | Для відео-моделей найважливішим є опис **руху камери** (tracking shot), **освітлення** (cinematic, neon) та **деталей об'єкта**. |

</div>

<div style="margin-top: 30px; text-align: center;">
  <p><b>💡 Порада для учнів:</b> Завжди використовуйте формулу: <code>Роль + Контекст + Завдання + Формат</code>.</p>
</div>

</div>
