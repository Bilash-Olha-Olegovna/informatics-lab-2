// Скрипт для інтерактивної демонстрації на уроці
document.addEventListener('DOMContentLoaded', () => {
    console.log("Модуль GenAI готовий до роботи");
    
    // Функція для підсвічування ключових термінів при наведенні
    const terms = document.querySelectorAll('code');
    terms.forEach(term => {
        term.style.cursor = 'help';
        term.title = 'Натисніть, щоб дізнатися більше';
    });
});
