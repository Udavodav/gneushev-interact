document.addEventListener('DOMContentLoaded', () => {
    const quizData = [
        // БЛОК 1: Операционные системы (10 вопросов)
        { id: 1, type: 'single', topic: 'ОС', question: 'Какая программа управляет ресурсами компьютера и обеспечивает взаимодействие пользователя с аппаратным обеспечением?', options: ['Драйвер', 'Операционная система', 'Архиватор', 'Антивирус'], answer: [1] },
        { id: 2, type: 'single', topic: 'ОС', question: 'Какое ядро используется в ОС Linux?', options: ['Микроядро', 'Гибридное', 'Монолитное', 'Экзоядро'], answer: [2] },
        { id: 3, type: 'single', topic: 'ОС', question: 'Какая из перечисленных ОС является мобильной?', options: ['Windows Server', 'Ubuntu', 'Android', 'macOS'], answer: [2] },
        { id: 4, type: 'multi', topic: 'ОС', question: 'Выберите функции операционной системы:', options: ['Управление памятью', 'Редактирование видео', 'Управление процессами', 'Работа с файловой системой'], answer: [0, 2, 3] },
        { id: 5, type: 'single', topic: 'ОС', question: 'Что выполняет BIOS/UEFI при включении компьютера?', options: ['Загрузку ОС', 'Проверку оборудования (POST)', 'Антивирусную проверку', 'Очистку диска'], answer: [1] },
        { id: 6, type: 'single', topic: 'ОС', question: 'Какой продукт из списка является российской защищенной ОС?', options: ['Windows 11', 'Astra Linux', 'macOS', 'Debian'], answer: [1] },
        { id: 7, type: 'single', topic: 'ОС', question: 'Для чего предназначен серверный дистрибутив ОС?', options: ['Для игр', 'Для обработки высоких нагрузок и сетевых служб', 'Для рисования', 'Для просмотра фильмов'], answer: [1] },
        { id: 8, type: 'single', topic: 'ОС', question: 'Что такое виртуальная память?', options: ['Память в облаке', 'Раздел на диске, дополняющий ОЗУ', 'Оперативная память видеокарты', 'Кэш процессора'], answer: [1] },
        { id: 9, type: 'single', topic: 'ОС', question: 'Какой интерфейс взаимодействия с ОС является текстовым?', options: ['GUI', 'CLI', 'WIMP', 'Touch'], answer: [1] },
        { id: 10, type: 'single', topic: 'ОС', question: 'ОС реального времени (RTOS) чаще всего применяются в:', options: ['Домашних ПК', 'Встроенных системах (станки, автопилот)', 'Смартфонах', 'Серверах'], answer: [1] },

        // БЛОК 2: Антивирусное ПО (10 вопросов)
        { id: 11, type: 'single', topic: 'Антивирус', question: 'Какая основная задача антивирусного ПО?', options: ['Ускорение ПК', 'Обнаружение и удаление вредоносного кода', 'Очистка реестра', 'Установка драйверов'], answer: [1] },
        { id: 12, type: 'single', topic: 'Антивирус', question: 'Какой метод основан на сравнении кода файла с базой известных угроз?', options: ['Эвристический', 'Сигнатурный', 'Поведенческий', 'Облачный'], answer: [1] },
        { id: 13, type: 'single', topic: 'Антивирус', question: 'Что делает "Песочница" (Sandbox)?', options: ['Удаляет вирусы', 'Запускает файл в изолированной среде', 'Шифрует диск', 'Чистит корзину'], answer: [1] },
        { id: 14, type: 'multi', topic: 'Антивирус', question: 'Выберите типы вредоносного ПО:', options: ['Вирус', 'Драйвер', 'Червь', 'Троян'], answer: [0, 2, 3] },
        { id: 15, type: 'single', topic: 'Антивирус', question: 'Какой антивирус из списка является российским?', options: ['Norton', 'Kaspersky', 'Bitdefender', 'McAfee'], answer: [1] },
        { id: 16, type: 'single', topic: 'Антивирус', question: 'Программы-вымогатели (Ransomware) делают что?', options: ['Копируют файлы', 'Шифруют файлы и требуют выкуп', 'Удаляют Windows', 'Показывают рекламу'], answer: [1] },
        { id: 17, type: 'single', topic: 'Антивирус', question: 'Какой компонент антивируса работает постоянно в фоне?', options: ['Сканер по требованию', 'Монитор реального времени', 'Файрвол', 'Менеджер паролей'], answer: [1] },
        { id: 18, type: 'single', topic: 'Антивирус', question: 'Что такое "ложное срабатывание" (False Positive)?', options: ['Антивирус не заметил вирус', 'Антивирус удалил безопасный файл', 'Вирус удалил антивирус', 'Кончилась лицензия'], answer: [1] },
        { id: 19, type: 'single', topic: 'Антивирус', question: 'Какой сервис позволяет проверить файл сразу 70+ антивирусами?', options: ['VirusTotal', 'Google Drive', 'GitHub', 'Virustore'], answer: [0] },
        { id: 20, type: 'single', topic: 'Антивирус', question: 'Какой российский антивирус является мировым лидером по версиям многих лабораторий?', options: ['Dr.Web', 'ESET', 'Kaspersky', 'Avast'], answer: [2] },

        // БЛОК 3: Компьютерные сети (10 вопросов)
        { id: 21, type: 'single', topic: 'Сети', question: 'Как расшифровывается LAN?', options: ['Large Area Network', 'Local Area Network', 'Light Access Node', 'Logical Access Network'], answer: [1] },
        { id: 22, type: 'single', topic: 'Сети', question: 'Какое устройство соединяет разные сети (например, ваш дом и Интернет)?', options: ['Коммутатор', 'Маршрутизатор (Роутер)', 'Концентратор', 'Сетевая карта'], answer: [1] },
        { id: 23, type: 'single', topic: 'Сети', question: 'Какая топология сети является самой отказоустойчивой?', options: ['Шина', 'Звезда', 'Кольцо', 'Ячеистая (Mesh)'], answer: [3] },
        { id: 24, type: 'single', topic: 'Сети', question: 'Какой протокол отвечает за IP-адресацию?', options: ['HTTP', 'IP', 'FTP', 'SMTP'], answer: [1] },
        { id: 25, type: 'single', topic: 'Сети', question: 'Какая сеть объединяет компьютеры в пределах одного здания?', options: ['WAN', 'LAN', 'MAN', 'GAN'], answer: [1] },
        { id: 26, type: 'single', topic: 'Сети', question: 'Что такое MAC-адрес?', options: ['Адрес проживания', 'Физический адрес сетевой карты', 'Логин пользователя', 'IP-адрес'], answer: [1] },
        { id: 27, type: 'single', topic: 'Сети', question: 'Какая модель описывает взаимодействие сетевых протоколов через 7 уровней?', options: ['TCP/IP', 'OSI', 'ISO', 'IEEE'], answer: [1] },
        { id: 28, type: 'single', topic: 'Сети', question: 'Что делает коммутатор (Switch)?', options: ['Усилитель сигнала', 'Соединяет устройства внутри одной локальной сети', 'Выход в интернет', 'Хранит данные'], answer: [1] },
        { id: 29, type: 'single', topic: 'Сети', question: 'Интернет является примером какой сети?', options: ['LAN', 'WAN', 'PAN', 'SAN'], answer: [1] },
        { id: 30, type: 'match', topic: 'Сети', question: 'Соотнесите уровень модели OSI и его номер:', options: ['Физический', 'Сетевой', 'Транспортный', 'Прикладной'], matches: ['1', '3', '4', '7'], answer: ['0-0', '1-1', '2-2', '3-3'] }
    ];

    const quizContainer = document.getElementById('quiz');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const submitBtn = document.getElementById('submitBtn');
    const progressBar = document.getElementById('progressBar');
    const counter = document.getElementById('counter');

    const resultsModal = document.getElementById('resultsModal');
    const scoreText = document.getElementById('score');
    const reviewList = document.getElementById('reviewList');
    const restartBtn = document.getElementById('restartBtn');
    const closeModal = document.getElementById('closeModal');

    let shuffledQuestions = [];
    let currentQuestionIndex = 0;
    let score = 0;
    const numQuestionsToShow = 10;
    const userAnswers = [];

    function startQuiz() {
        // 1. Фильтруем по темам и берем по несколько из каждой, чтобы было разнообразие
        const osQuestions = quizData.filter(q => q.topic === 'ОС').slice(0, 4);
        const avQuestions = quizData.filter(q => q.topic === 'Антивирус').slice(0, 3);
        const netQuestions = quizData.filter(q => q.topic === 'Сети').slice(0, 3);
        
        // Собираем пул и перемешиваем
        const pool = [...osQuestions, ...avQuestions, ...netQuestions];
        shuffledQuestions = shuffleArray(pool);
        
        currentQuestionIndex = 0;
        score = 0;
        userAnswers.length = 0;
        showQuestion();
        updateNavButtons();
    }

    function showQuestion() {
        quizContainer.innerHTML = '';
        const question = shuffledQuestions[currentQuestionIndex];

        const questionDiv = document.createElement('div');
        questionDiv.classList.add('question-title');
        questionDiv.innerHTML = `<strong>Вопрос ${currentQuestionIndex + 1}:</strong> ${question.question}`;
        quizContainer.appendChild(questionDiv);

        if (question.type === 'single') {
            question.options.forEach((option, index) => {
                const optionDiv = document.createElement('div');
                optionDiv.className = 'option-item';
                optionDiv.innerHTML = `
                    <input type="radio" name="option" id="opt${index}" value="${index}">
                    <label for="opt${index}">${option}</label>
                `;
                quizContainer.appendChild(optionDiv);
            });
        }

        if (question.type === 'multi') {
            question.options.forEach((option, index) => {
                const optionDiv = document.createElement('div');
                optionDiv.className = 'option-item';
                optionDiv.innerHTML = `
                    <input type="checkbox" name="option" id="opt${index}" value="${index}">
                    <label for="opt${index}">${option}</label>
                `;
                quizContainer.appendChild(optionDiv);
            });
        }

        if (question.type === 'match') {
            const container = document.createElement('div');
            container.className = 'matching-container';
            
            const left = document.createElement('div');
            left.className = 'matching-group';
            question.options.forEach((opt, i) => {
                left.innerHTML += `<div class="matching-item"><strong>${i + 1}. ${opt}</strong></div>`;
            });

            const right = document.createElement('div');
            right.className = 'matching-group';
            question.options.forEach((opt, i) => {
                const select = document.createElement('select');
                select.dataset.index = i;
                const defaultOpt = document.createElement('option');
                defaultOpt.value = '';
                defaultOpt.text = '--';
                select.appendChild(defaultOpt);
                question.matches.forEach((match, j) => {
                    const optEl = document.createElement('option');
                    optEl.value = j;
                    optEl.text = match;
                    select.appendChild(optEl);
                });
                right.appendChild(select);
            });

            container.appendChild(left);
            container.appendChild(right);
            quizContainer.appendChild(container);
        }
    }

    function getSelectedAnswer() {
        const question = shuffledQuestions[currentQuestionIndex];
        let answer = [];

        if (question.type === 'single') {
            const selected = document.querySelector('input[name="option"]:checked');
            if (selected) answer.push(parseInt(selected.value));
        }

        if (question.type === 'multi') {
            const checkboxes = document.querySelectorAll('input[name="option"]:checked');
            checkboxes.forEach(cb => answer.push(parseInt(cb.value)));
            answer.sort((a, b) => a - b);
        }

        if (question.type === 'match') {
            const selects = document.querySelectorAll('.matching-group select');
            selects.forEach(select => {
                if (select.value !== '') {
                    answer.push(`${select.dataset.index}-${select.value}`);
                }
            });
            answer.sort();
        }

        return answer;
    }

    function checkAnswer() {
        const userAnswer = getSelectedAnswer();
        const correctAnswer = shuffledQuestions[currentQuestionIndex].answer;
        
        userAnswers[currentQuestionIndex] = {
            user: userAnswer,
            correct: correctAnswer,
            isCorrect: JSON.stringify(userAnswer) === JSON.stringify(correctAnswer)
        };

        if (userAnswers[currentQuestionIndex].isCorrect) {
            score++;
        }
    }

    function showResults() {
        quizContainer.innerHTML = '';
        prevBtn.style.display = 'none';
        nextBtn.style.display = 'none';
        submitBtn.style.display = 'none';

        scoreText.textContent = `Вы набрали ${score} из ${numQuestionsToShow} баллов.`;
        
        reviewList.innerHTML = '';
        userAnswers.forEach((res, index) => {
            const item = document.createElement('div');
            item.className = `review-item ${res.isCorrect ? 'correct' : ''}`;
            
            let userAnsText = res.user.join(', ') || 'Не отвечено';
            let corrAnsText = res.correct.join(', ');

            if (shuffledQuestions[index].type === 'match') {
                userAnsText = res.user.map(a => {
                    const [q, m] = a.split('-');
                    return `${parseInt(q)+1}. ${shuffledQuestions[index].options[parseInt(q)]} — ${shuffledQuestions[index].matches[parseInt(m)]}`;
                }).join('<br>');
                corrAnsText = res.correct.map(a => {
                    const [q, m] = a.split('-');
                    return `${parseInt(q)+1}. ${shuffledQuestions[index].options[parseInt(q)]} — ${shuffledQuestions[index].matches[parseInt(m)]}`;
                }).join('<br>');
            }

            item.innerHTML = `
                <h4>Вопрос ${index + 1}: ${shuffledQuestions[index].question}</h4>
                <p><strong>Ваш ответ:</strong> ${userAnsText}</p>
                <p><strong>Правильный ответ:</strong> ${corrAnsText}</p>
            `;
            reviewList.appendChild(item);
        });

        resultsModal.style.display = 'flex';
    }

    function updateNavButtons() {
        prevBtn.style.display = currentQuestionIndex === 0 ? 'none' : 'block';
        nextBtn.style.display = currentQuestionIndex === numQuestionsToShow - 1 ? 'none' : 'block';
        submitBtn.style.display = currentQuestionIndex === numQuestionsToShow - 1 ? 'block' : 'none';

        progressBar.style.width = `${((currentQuestionIndex + 1) / numQuestionsToShow) * 100}%`;
        counter.textContent = `Вопрос: ${currentQuestionIndex + 1} из ${numQuestionsToShow}`;
    }

    function shuffleArray(array) {
        const arr = [...array];
        for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
        return arr;
    }

    // --- EVENT LISTENERS ---
    prevBtn.addEventListener('click', () => {
        checkAnswer();
        currentQuestionIndex--;
        showQuestion();
        // Восстанавливаем выбранные ответы при возврате
        const saved = userAnswers[currentQuestionIndex];
        if (saved) {
            if (shuffledQuestions[currentQuestionIndex].type === 'single') {
                document.querySelector(`input[value="${saved.user[0]}"]`).checked = true;
            }
            if (shuffledQuestions[currentQuestionIndex].type === 'multi') {
                saved.user.forEach(idx => {
                    document.querySelector(`input[value="${idx}"]`).checked = true;
                });
            }
            if (shuffledQuestions[currentQuestionIndex].type === 'match') {
                saved.user.forEach(pair => {
                    const [q, m] = pair.split('-');
                    document.querySelectorAll('.matching-group select')[q].value = m;
                });
            }
        }
        updateNavButtons();
    });

    nextBtn.addEventListener('click', () => {
        checkAnswer();
        currentQuestionIndex++;
        showQuestion();
        updateNavButtons();
    });

    submitBtn.addEventListener('click', () => {
        checkAnswer();
        showResults();
    });

    restartBtn.addEventListener('click', () => {
        resultsModal.style.display = 'none';
        startQuiz();
    });

    closeModal.addEventListener('click', () => {
        resultsModal.style.display = 'none';
    });

    window.onclick = function(event) {
        if (event.target === resultsModal) {
            resultsModal.style.display = 'none';
        }
    };

    // Запуск теста
    startQuiz();
});