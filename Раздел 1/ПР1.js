document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('networkCanvas');
    const log = document.getElementById('eventLog');
    
    const toolNodeBtn = document.getElementById('tool-node');
    const toolLinkBtn = document.getElementById('tool-link');
    const clearBtn = document.getElementById('clearBtn');

    let currentTool = 'node'; // 'node' или 'link'
    let nodes = [];
    let cables = [];
    let tempCable = null;
    let selectedNode = null;

    function logEvent(message) {
        const time = new Date().toLocaleTimeString();
        const p = document.createElement('p');
        p.textContent = `[${time}] ${message}`;
        log.appendChild(p);
        log.scrollTop = log.scrollHeight;
    }

    function clearCanvas() {
        canvas.innerHTML = '';
        nodes = [];
        cables = [];
        selectedNode = null;
        if (tempCable) tempCable.remove();
        tempCable = null;
        logEvent('Холст очищен.');
    }

    function createNode(x, y) {
        const nodeId = `node-${nodes.length + 1}`;
        const node = document.createElement('div');
        node.className = 'node';
        node.style.left = `${x - 25}px`; // 25 = половина ширины (50/2) для центрирования
        node.style.top = `${y - 25}px`;
        node.textContent = nodeId.replace('node-', 'ПК ');
        node.dataset.id = nodeId;

        // Удаление узла (двойной клик)
        node.addEventListener('dblclick', (e) => {
            e.stopPropagation();
            removeNode(nodeId);
        });

        // Логика выбора для создания связи
        node.addEventListener('click', (e) => {
            e.stopPropagation();
            if (currentTool !== 'link') return;

            if (selectedNode === nodeId) {
                // Снятие выделения
                selectedNode = null;
                node.classList.remove('selected');
                logEvent('Выбор узла отменен.');
                if (tempCable) tempCable.remove();
                tempCable = null;
                return;
            }

            if (!selectedNode) {
                // Первый клик — выбор начала
                selectedNode = nodeId;
                node.classList.add('selected');
                logEvent(`Выбран узел: ${node.textContent}. Кликните на второй узел для создания связи.`);
            } else {
                // Второй клик — создание связи
                const startNode = document.querySelector(`.node[data-id="${selectedNode}"]`);
                createCable(startNode, node);
                startNode.classList.remove('selected');
                node.classList.remove('selected');
                selectedNode = null;
                if (tempCable) tempCable.remove();
                tempCable = null;
            }
        });

        canvas.appendChild(node);
        nodes.push(node);
        logEvent(`Создан узел: ${node.textContent}`);
    }

    function createCable(nodeA, nodeB) {
        const rectA = nodeA.getBoundingClientRect();
        const rectB = nodeB.getBoundingClientRect();
        const canvasRect = canvas.getBoundingClientRect();

        const x1 = rectA.left - canvasRect.left + rectA.width / 2;
        const y1 = rectA.top - canvasRect.top + rectA.height / 2;
        const x2 = rectB.left - canvasRect.left + rectB.width / 2;
        const y2 = rectB.top - canvasRect.top + rectB.height / 2;

        const length = Math.hypot(x2 - x1, y2 - y1);
        const angle = Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI;

        const cable = document.createElement('div');
        cable.className = 'cable';
        cable.style.width = `${length}px`;
        cable.style.transform = `translate(${x1}px, ${y1}px) rotate(${angle}deg)`;
        canvas.appendChild(cable);
        cables.push(cable);

        logEvent(`Связь создана: ${nodeA.textContent} ⟷ ${nodeB.textContent}`);
    }

    function removeNode(nodeId) {
        const node = document.querySelector(`.node[data-id="${nodeId}"]`);
        
        // Удаляем кабели, связанные с этим узлом
        cables.forEach((cable, index) => {
            const style = window.getComputedStyle(cable);
            const matrix = new DOMMatrixReadOnly(style.transform);
            const angle = Math.atan2(matrix.b, matrix.a);
            const x2 = matrix.m41 + Math.cos(angle) * cable.offsetWidth;
            const y2 = matrix.m42 + Math.sin(angle) * cable.offsetWidth;

            const rect = node.getBoundingClientRect();
            const canvasRect = canvas.getBoundingClientRect();
            const nodeCenterX = rect.left - canvasRect.left + rect.width / 2;
            const nodeCenterY = rect.top - canvasRect.top + rect.height / 2;

            const distToStart = Math.hypot(nodeCenterX - matrix.m41, nodeCenterY - matrix.m42);
            const distToEnd = Math.hypot(nodeCenterX - x2, nodeCenterY - y2);

            if (distToStart < 30 || distToEnd < 30) {
                cable.remove();
                cables.splice(index, 1);
            }
        });

        node.remove();
        nodes = nodes.filter(n => n.dataset.id !== nodeId);
        logEvent(`Узел удален: ${node.textContent}`);
    }

    function updateTool(tool) {
        currentTool = tool;
        selectedNode = null;
        
        // Снимаем выделение с узлов
        nodes.forEach(n => n.classList.remove('selected'));
        
        // Убираем временные линии
        if (tempCable) tempCable.remove();
        tempCable = null;

        // Обновляем кнопки
        [toolNodeBtn, toolLinkBtn].forEach(btn => btn.classList.remove('active'));
        if (tool === 'node') {
            toolNodeBtn.classList.add('active');
            logEvent('Инструмент: Добавить ПК (клик на холст).');
        } else {
            toolLinkBtn.classList.add('active');
            logEvent('Инструмент: Создать связь (клик на ПК).');
        }
    }

    function handleCanvasClick(e) {
        if (currentTool === 'node') {
            createNode(e.offsetX, e.offsetY);
        }
    }

    function handleCanvasMouseMove(e) {
        if (currentTool !== 'link' || !selectedNode) return;

        const startNode = document.querySelector(`.node[data-id="${selectedNode}"]`);
        const rect = startNode.getBoundingClientRect();
        const canvasRect = canvas.getBoundingClientRect();

        const x1 = rect.left - canvasRect.left + rect.width / 2;
        const y1 = rect.top - canvasRect.top + rect.height / 2;
        const x2 = e.offsetX;
        const y2 = e.offsetY;

        const length = Math.hypot(x2 - x1, y2 - y1);
        const angle = Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI;

        if (tempCable) {
            tempCable.style.width = `${length}px`;
            tempCable.style.transform = `translate(${x1}px, ${y1}px) rotate(${angle}deg)`;
        } else {
            tempCable = document.createElement('div');
            tempCable.className = 'cable temp-cable';
            tempCable.style.width = `${length}px`;
            tempCable.style.transform = `translate(${x1}px, ${y1}px) rotate(${angle}deg)`;
            canvas.appendChild(tempCable);
        }
    }

    // --- EVENT LISTENERS ---
    canvas.addEventListener('click', handleCanvasClick);
    canvas.addEventListener('mousemove', handleCanvasMouseMove);
    
    toolNodeBtn.addEventListener('click', () => updateTool('node'));
    toolLinkBtn.addEventListener('click', () => updateTool('link'));
    clearBtn.addEventListener('click', clearCanvas);

    // --- TABS ---
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

    // Инициализация
    updateTool('node');
});