document.addEventListener('DOMContentLoaded', () => {
    console.log("✅ Модуль GenAI успішно завантажено!");

    // 1. Інтерактивні терміни (Tooltip effect)
    const terms = document.querySelectorAll('code');
    terms.forEach(term => {
        term.style.cursor = 'help';
        term.title = 'Це технічний термін. Натисніть, щоб скопіювати';
        
        term.addEventListener('click', () => {
            navigator.clipboard.writeText(term.innerText);
            
            // Візуальний фідбек при копіюванні
            const originalColor = term.style.backgroundColor;
            term.style.backgroundColor = '#dcfce7'; // світло-зелений
            setTimeout(() => {
                term.style.backgroundColor = originalColor;
            }, 300);
        });
    });

    // 2. Створення кнопки "Нагору" для довгих сторінок (наприклад, теорії)
    const topButton = document.createElement('button');
    topButton.innerHTML = '↑ Нагору';
    topButton.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        padding: 10px 15px;
        background-color: #2563eb;
        color: white;
        border: none;
        border-radius: 8px;
        cursor: pointer;
        opacity: 0.8;
        display: none;
        box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        transition: opacity 0.3s;
    `;
    
    document.body.appendChild(topButton);

    // Показувати кнопку при скролі
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            topButton.style.display = 'block';
        } else {
            topButton.style.display = 'none';
        }
    });

    // Плавний скрол нагору
    topButton.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
});
