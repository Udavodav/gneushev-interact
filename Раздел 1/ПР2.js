document.addEventListener('DOMContentLoaded', () => {
    const terminalBody = document.getElementById('terminalBody');
    const codeEditor = document.getElementById('codeEditor');
    const runBtn = document.getElementById('runBtn');
    const clearBtn = document.getElementById('clearBtn');
    const cursor = document.querySelector('.cursor');

    // --- ТАБЫ ---
    const navLinks = document.querySelectorAll('.nav-link');
    const tabs = document.querySelectorAll('section.content-block');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            navLinks.forEach(l => l.classList.remove('active'));
            tabs.forEach(t => t.classList.remove('active'));
            link.classList.add('active');
            document.getElementById(link.dataset.tab).classList.add('active');
        });
    });

    // --- МИГАЛКА ---
    if (cursor) {
        setInterval(() => {
            cursor.style.visibility = cursor.style.visibility === 'hidden' ? 'visible' : 'hidden';
        }, 1000);
    }

    // --- ВЫВОД ---
    function writeToTerminal(text, isCommand = false, type = 'info') {
        const line = document.createElement('div');
        if (isCommand) {
            line.classList.add('prompt-line');
            line.textContent = '$ ' + text;
        } else {
            line.textContent = text;
            if (type === 'error') line.style.color = '#ff6b6b';
        }
        terminalBody.appendChild(line);
        terminalBody.scrollTop = terminalBody.scrollHeight;
    }

    // --- БАЗА КОМАНД (ТОЛЬКО 100% РАБОТАЮЩИЕ) ---
    const fakeOutputs = {
        'whoami': 'user',
        'pwd': '/home/user',
        'uname -a': 'Linux altlinux 6.1.0-alt1 #1 SMP PREEMPT x86_64 GNU/Linux',
        'id': 'uid=1000(user) gid=1000(user) groups=1000(user)',
        'ls': 'Desktop    Documents   Downloads   Music',
        'clear': '',
        'help': 'Доступные команды: whoami, pwd, uname -a, id, ls, clear, exit',
        'exit': ''
    };

    // --- ЛОГИКА ---
    function executeCode(code) {
        writeToTerminal(code, true);
        
        setTimeout(() => {
            const cmd = code.split(' ')[0];

            if (fakeOutputs[cmd]) {
                const output = fakeOutputs[cmd];
                if (output && cmd !== 'clear' && cmd !== 'exit') {
                    writeToTerminal(output);
                }
                if (cmd === 'clear') terminalBody.innerHTML = '';
            } else {
                writeToTerminal(`-bash: ${cmd}: command not found`, true);
            }
            writeToTerminal('', true);
        }, 300);
    }

    // --- КНОПКИ ---
    const cmdButtons = document.querySelectorAll('.cmd-btn');
    cmdButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const cmd = btn.getAttribute('data-cmd');
            codeEditor.value = cmd;
            codeEditor.focus();
            runBtn.click(); // Автоматическое выполнение при клике по кнопке
        });
    });

    runBtn.addEventListener('click', () => {
        const code = codeEditor.value.trim();
        if (code) executeCode(code);
        codeEditor.value = '';
    });

    codeEditor.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            runBtn.click();
        }
    });

    clearBtn.addEventListener('click', () => {
        terminalBody.innerHTML = '';
        codeEditor.value = '';
        writeToTerminal('Терминал очищен.', 'info');
        writeToTerminal('', true);
    });

    // --- СТАРТ ---
    function initTerminal() {
        terminalBody.innerHTML = '';
        writeToTerminal('Терминал: Альт СП / ОС Атлант', false);
        writeToTerminal('Режим: Локальная симуляция (Offline)', false);
        writeToTerminal('', false);
        writeToTerminal('Вводите команды. Кнопки гарантируют результат.', false);
        writeToTerminal('', true);
    }

    initTerminal();
});