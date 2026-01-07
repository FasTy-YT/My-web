// Объект с уровнями
const levels = {
    easy: {
        name: 'Легкий',
        goal: 1000,
        description: 'Для начинающих'
    },
    normal: {
        name: 'Нормальный',
        goal: 10000,
        description: 'Для опытных игроков'
    },
    hard: {
        name: 'Сложный',
        goal: 100000,
        description: 'Для мастеров клика'
    }
};

// Текущее состояние
let currentLevel = null;
let gameActive = false;

// Получение элементов экранов
const levelsScreen = document.getElementById('levels-screen');
const mainScreen = document.getElementById('main-screen');
const gameScreen = document.getElementById('game-screen');
const victoryScreen = document.getElementById('victory-screen');

// Получение элементов victory screen
const victoryLevelName = document.getElementById('victory-level-name');
const victoryResult = document.getElementById('victory-result');
const menuBtn = document.getElementById('menu-btn');

// Функция показа экрана выбора уровней
function showLevelsScreen() {
    mainScreen.style.display = 'none';
    levelsScreen.style.display = 'block';
    gameScreen.style.display = 'none';
    victoryScreen.style.display = 'none';
}

// Функция показа игрового экрана
function showGameScreen() {
    mainScreen.style.display = 'none';
    levelsScreen.style.display = 'none';
    gameScreen.style.display = 'block';
    victoryScreen.style.display = 'none';
}

// Функция показа экрана победы
function showVictoryScreen() {
    mainScreen.style.display = 'none';
    levelsScreen.style.display = 'none';
    gameScreen.style.display = 'none';
    victoryScreen.style.display = 'block';
    
    // Установка данных о победе
    if (victoryLevelName && currentLevel) {
        victoryLevelName.textContent = `Уровень: ${currentLevel.name}`;
    }
    if (victoryResult && output) {
        victoryResult.textContent = `Ваш результат: ${count} кликов`;
    }
}

// Функция выбора уровня
function selectLevel(levelName) {
    if (levels[levelName]) {
        currentLevel = levels[levelName];
        goal = currentLevel.goal;
        gameActive = true;
        
        // Сброс счета при выборе нового уровня
        count = 0;
        upd();
        
        showGameScreen();
        console.log(`Выбран уровень: ${currentLevel.name}, цель: ${goal}`);
    } else {
        console.error(`Уровень "${levelName}" не найден`);
    }
}

// Функция проверки победы
function checkVictory() {
    if (gameActive && count >= goal) {
        gameActive = false;
        showVictoryScreen();
        console.log('Победа! Уровень пройден.');
    }
}

// Модификация функции add для проверки победы
const originalAdd = add;
add = function(amount) {
    originalAdd(amount);
    checkVictory();
};

// Обработчик кнопки возврата в меню
if (menuBtn) {
    menuBtn.onclick = function() {
        // Сброс состояния игры
        count = 0;
        goal = 100;
        currentLevel = null;
        gameActive = false;
        
        // Сброс кнопок улучшений
        resetUpgrades();
        
        upd();
        showMainScreen();
    };
}

// Обработчик кнопки "Назад" на экране уровней
const backToMainBtn = document.getElementById('back-to-main');
if (backToMainBtn) {
    backToMainBtn.onclick = function() {
        showMainScreen();
    };
}

// Обработчик кнопки выхода (крестик справа)
const exitBtn = document.getElementById('leave');
if (exitBtn) {
    exitBtn.onclick = function() {
        // Сброс состояния игры
        count = 0;
        goal = 100;
        currentLevel = null;
        gameActive = false;
        
        // Сброс кнопок улучшений
        resetUpgrades();
        
        upd();
        showMainScreen();
    };
}

// Функция сброса улучшений
function resetUpgrades() {
    btn5.style.display = 'none';
    buy5cl.style.display = 'inline-block';
    btn10.style.display = 'none';
    buy10cl.style.display = 'inline-block';
    btn100.style.display = 'none';
    buy100cl.style.display = 'inline-block';
    btn1000.style.display = 'none';
    buy1000cl.style.display = 'inline-block';
}

// Инициализация при загрузке
document.addEventListener('DOMContentLoaded', function() {
    // Создаем обработчики для кнопок уровней
    const levelButtons = document.querySelectorAll('.level-btn');
    levelButtons.forEach(function(btn) {
        btn.onclick = function() {
            const levelName = this.dataset.level;
            selectLevel(levelName);
        };
    });
});

// Обработчик кнопки "Начать игру"
const startBtn = document.getElementById('start-btn');
if (startBtn) {
    startBtn.onclick = function() {
        showLevelsScreen();
    };
}

// Функция показа главного экрана
function showMainScreen() {
    mainScreen.style.display = 'block';
    levelsScreen.style.display = 'none';
    gameScreen.style.display = 'none';
    victoryScreen.style.display = 'none';
}

// Показываем главный экран при загрузке (если не начата игра)
showMainScreen();
