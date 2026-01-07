// Консоль разработчика (читы)
// Доступ к глобальным переменным из script.js
// count, goal, upd - уже загружены

/** @namespace window.dev */
window.dev = {
    /**
     * Добавить очки
     * @param {number} amount - Количество очков для добавления
     */
    addMoney: (amount) => {
        count += amount;
        upd();
        dev.showMessage(`Добавлено ${amount} очков. Всего: ${count}`, 'success');
    },
    /**
     * Установить цель
     * @param {number} newGoal - Новая цель
     */
    setGoal: (newGoal) => {
        goal = newGoal;
        upd();
        dev.showMessage(`Цель изменена на ${newGoal}`, 'success');
    },
    /**
     * Установить количество очков
     * @param {number} amount - Количество очков
     */
    setMoney: (amount) => {
        count = amount;
        upd();
        dev.showMessage(`Установлено ${amount} очков`, 'success');
    },
    showMessage: (msg, type) => {
        console.log(msg);
        const output = document.getElementById('dev-output');
        if (output) {
            output.innerHTML = `<span style="color: ${type === 'error' ? '#ff4444' : '#44ff44'};">${msg}</span>`;
        }
    }
};

// Оверлей разработчика
const devOverlay = document.createElement('div');
devOverlay.id = 'dev-overlay';
devOverlay.innerHTML = `
    <div id="dev-panel">
        <input type="text" id="dev-input" placeholder="команда параметр" autocomplete="off">
        <div id="dev-output"></div>
        <div id="dev-help">
            <small>addMoney 100 | setGoal 5000 | setMoney 1000 | F2 - закрыть</small>
        </div>
    </div>
`;
document.body.appendChild(devOverlay);

// Стили оверлея
devOverlay.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.7);
    display: none;
    justify-content: center;
    align-items: center;
    z-index: 10000;
`;

const devPanel = document.getElementById('dev-panel');
devPanel.style.cssText = `
    background: rgba(20,20,20,0.95);
    padding: 20px;
    border-radius: 5px;
    min-width: 400px;
    font-family: 'Consolas', 'Monaco', monospace;
`;

const devInput = document.getElementById('dev-input');
devInput.style.cssText = `
    width: 100%;
    padding: 10px;
    background: #1a1a1a;
    border: 1px solid #333;
    color: #00ff00;
    font-family: inherit;
    font-size: 14px;
    outline: none;
    margin-bottom: 10px;
`;

const devOutput = document.getElementById('dev-output');
devOutput.style.cssText = `
    min-height: 30px;
    padding: 5px;
    margin-bottom: 10px;
    font-size: 13px;
`;

const devHelp = document.getElementById('dev-help');
devHelp.style.cssText = `
    color: #666;
`;

// Обработка F2
let isDevOpen = false;
document.addEventListener('keydown', (e) => {
    if (e.key === 'F2') {
        isDevOpen = !isDevOpen;
        devOverlay.style.display = isDevOpen ? 'flex' : 'none';
        if (isDevOpen) {
            devInput.value = '';
            devInput.focus();
        }
    }
});

// Закрытие при клике вне панели
devOverlay.addEventListener('click', (e) => {
    if (e.target === devOverlay) {
        isDevOpen = false;
        devOverlay.style.display = 'none';
    }
});

// Обработка команд
devInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        const command = devInput.value.trim();
        if (command) {
            executeCommand(command);
        }
        devInput.value = '';
    }
    // Подсказки по Tab
    if (e.key === 'Tab') {
        e.preventDefault();
        const value = devInput.value.toLowerCase().trim();
        const commands = ['addmoney', 'setgoal', 'setmoney'];
        
        // Находим подходящую команду
        const match = commands.find(cmd => cmd.startsWith(value));
        if (match) {
            devInput.value = match + ' ';
            devInput.focus();
        }
    }
});

function executeCommand(cmd) {
    const parts = cmd.split(/\s+/);
    const command = parts[0].toLowerCase();
    const param = parseInt(parts[1]) || 0;
    
    if (command === 'addmoney' && param > 0) {
        window.dev.addMoney(param);
    } else if (command === 'setgoal' && param > 0) {
        window.dev.setGoal(param);
    } else if (command === 'setmoney' && param >= 0) {
        window.dev.setMoney(param);
    } else {
        dev.showMessage('Ошибка: неизвестная команда или параметр', 'error');
    }
}