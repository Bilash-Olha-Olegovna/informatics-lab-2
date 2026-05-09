<head>
  <link rel="stylesheet" href="../styles/custom.css">
  <script src="../scripts/interactive.js" defer></script>
</head>

<a href="../index.html" class="btn-link" style="display: inline-block; padding: 10px 20px; background: var(--primary); color: white; text-decoration: none; border-radius: 8px; margin-bottom: 20px; font-weight: bold; box-shadow: 0 4px 6px rgba(0,0,0,0.1); transition: transform 0.2s;">&larr; Повернутися на головну</a>

<div class="glass-panel" markdown="1" style="padding: 40px; border-radius: 16px;">

# ✅ Інтерактивний тест: Перевір себе

<p style="color: var(--text-muted); margin-bottom: 30px;">Цей тест став повністю інтерактивним! Натискайте на варіанти відповідей, щоб миттєво перевірити свої знання.</p>

<div class="quiz-question">
  <p><b>1. Що означає абревіатура LLM?</b></p>
  <div class="quiz-option" onclick="checkAnswer(this, false, '')">A) Low Level Machine</div>
  <div class="quiz-option" onclick="checkAnswer(this, true, 'Правильно! LLM розшифровується як Large Language Model.')">B) Large Language Model</div>
  <div class="quiz-option" onclick="checkAnswer(this, false, '')">C) Logical Learning Mechanism</div>
  <div class="quiz-option" onclick="checkAnswer(this, false, '')">D) Limited Language Matrix</div>
</div>

<div class="quiz-question">
  <p><b>2. Чи бере ШІ готові відповіді з прихованої бази даних (схожої на Вікіпедію)?</b></p>
  <div class="quiz-option" onclick="checkAnswer(this, false, '')">Так, він просто копіює знайдений текст.</div>
  <div class="quiz-option" onclick="checkAnswer(this, true, 'Саме так! ШІ генерує текст слово за словом на основі математичних ймовірностей.')">Ні, він генерує унікальний текст щоразу.</div>
</div>

<div class="quiz-question">
  <p><b>3. Яка формула вважається стандартом для ефективного промпту?</b></p>
  <div class="quiz-option" onclick="checkAnswer(this, false, '')">Питання + Відповідь + Приклад</div>
  <div class="quiz-option" onclick="checkAnswer(this, true, 'Ідеальна структура!')">Роль + Контекст + Завдання + Формат</div>
  <div class="quiz-option" onclick="checkAnswer(this, false, '')">Хто + Що + Коли + Де</div>
</div>

<div class="quiz-question">
  <p><b>4. Що таке "галюцинація" штучного інтелекту?</b></p>
  <div class="quiz-option" onclick="checkAnswer(this, false, '')">Здатність ШІ розпізнавати приховані зображення.</div>
  <div class="quiz-option" onclick="checkAnswer(this, true, 'Правильно! Тому завжди перевіряйте факти, згенеровані ШІ.')">Впевнена генерація правдоподібної, але хибної або неіснуючої інформації.</div>
  <div class="quiz-option" onclick="checkAnswer(this, false, '')">Системна помилка, що призводить до зависання комп'ютера.</div>
</div>

</div>
