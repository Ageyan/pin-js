//Визначаємо константу для кількості полів та правильного паролю 
const TOTAL_FIELDS = 4;
const CORRECT_PASWORD = "1234";

// Знаходимо всі поля вводу з класом "fields" і типом "text", створюємо з них масив
// ... це спреад оператор 
const verificationInputs = [...document.querySelectorAll('.fields > input[type=text]')];
// Отримуємо перше полу вводу по його атрибуту name 
const verification1 = document.querySelector('input[name="verification_1"]');

// Функція для перевірки правильності паролю
const verify = () => {
    //Зчитуємо значення з полів вводу і з'єднуємо їх в рядок
    // За допомогою map збираємо значення з полей, але отримуємо масив 
    // За допомогою join склеюємо значення між собою і отримуємо рядок, який можно порівняти з іншим рядком
    const password = verificationInputs.map(input => input.value).join("");
    if (password === CORRECT_PASWORD) {
        console.log("YES!");
        // тут можна додати додаткові дії, наприклад перенаправлення користувача
    } else {
        console.log("NO!");
        // тут можна додати дії на випадок неправильного пароля
    }
};

//Додаємо обробник подій "keyup" для кожного поля вводу
verificationInputs.forEach((input, i) => {
    input.addEventListener('keyup', e => {
        // Якщо поле пусте не робимо нічого
        if (!e.target.value) return;

        // Якщо досягнуто останнього поля перевіряємо пароль
        if (i === TOTAL_FIELDS - 1) {
            verify();
            return;
        };

        // Переміщуємо фокус на наступне поле вводу
        verificationInputs[i + 1].focus();
    });
});

// Додаємо обробник подій "paste" для першого поля вводу
verification1.addEventListener('paste', e => {
    //Читаємо текст з буфера обміну
    navigator.clipboard.readText().then(text => {
        //перевіряємо чи довжина вставленого тексту співпадає з кількістю полів 
        if (text.length !== TOTAL_FIELDS) {
            console.log("Invalid paste lenght");
            return;
        }

        //Заповнюємо поля вводу вставленним текстом 
        verificationInputs.forEach((input, i) => {
            input.value = text[i];
        });

        //Переміщуємо фокус на останне поле і перевіряємо пароль
        verificationInputs[TOTAL_FIELDS - 1].focus();
        verify();
    });
});