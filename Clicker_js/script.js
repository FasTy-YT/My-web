btn = document.getElementById('btn');
btn5 = document.getElementById('btn5');
btn10 = document.getElementById('btn10');
btn100 = document.getElementById('btn100');
btn1000 = document.getElementById('btn1000');

buy5cl = document.getElementById('buy5cl');
buy10cl = document.getElementById('buy10cl');
buy100cl = document.getElementById('buy100cl');
buy1000cl = document.getElementById('buy1000cl');

leaveBtn = document.getElementById('leave');

shopbtn = document.getElementById('shop-btn');
closeShop = document.getElementById('close-shop');

shop = document.getElementById('shop-menu');

btn5.style.display = 'none';
btn10.style.display = 'none';
btn100.style.display = 'none';
btn1000.style.display = 'none';

levelsScreen = document.getElementById('levels-screen');
levelsScreen.style.display = 'none';

startbtn = document.getElementById('start-btn');
startbtn.onclick = function() {
    document.getElementById('main-screen').style.display = 'none';
    levelsScreen.style.display = 'block';
}

cls = document.getElementById('clear');
output = document.getElementById('output');

let count = 0;
let goal = 100;

function upd() {
    output.innerText = `Очки: ${count} | Цель: ${goal}`;
    output.classList.add('highlight');
    setTimeout(() => output.classList.remove('highlight'), 300);
}
function init() {
    count = 0;
    upd();
}
function clear() {
    count = 0;
    goal = 100;

    btn5.style.display = 'none';
    buy5cl.style.display = 'inline-block';
    btn10.style.display = 'none';
    buy10cl.style.display = 'inline-block';
    btn100.style.display = 'none';
    buy100cl.style.display = 'inline-block';
    btn1000.style.display = 'none';
    buy1000cl.style.display = 'inline-block';
    upd();
}
function add(amount){
    count += amount;
    upd();
}

btn.onclick = function() {add(1)};
btn5.onclick = function() {add(5)}
btn10.onclick = function() {add(10)}
btn100.onclick = function() {add(100)}
btn1000.onclick = function() {add(1000)}

buy5cl.onclick = function() {
    if (count >= 10) {
        count -= 10;
        btn5.style.display = 'inline-block';
        buy5cl.style.display = 'none';
        upd();
    }
}
buy10cl.onclick = function() {
    if (count >= 15) {
        count -= 15;
        btn10.style.display = 'inline-block';
        buy10cl.style.display = 'none';
        upd();
    }
}
buy100cl.onclick = function() {
    if (count >= 150) {
        count -= 150;
        btn100.style.display = 'inline-block';
        buy100cl.style.display = 'none';
        upd();
    }
}
buy1000cl.onclick = function() {
    if (count >= 1500) {
        count -= 1500;
        btn1000.style.display = 'inline-block';
        buy1000cl.style.display = 'none';
        upd();
    }
}

shopbtn.onclick = function() {
    shop.classList.add('open');
}
closeShop.onclick = function() {
    shop.classList.remove('open');
}
cls.onclick = clear;
leaveBtn.onclick = function() {
    // Сброс состояния игры
    count = 0;
    goal = 0;
    document.getElementById('game-screen').style.display = 'none';
    document.getElementById('levels-screen').style.display = 'block';
}

// Генерация снежинок
function createSnowflakes() {
    const container = document.getElementById('snow-container');
    const snowflakeChars = ['❄', '❅', '❆', '*'];
    const snowflakeCount = 50;
    
    for (let i = 0; i < snowflakeCount; i++) {
            const snowflake = document.createElement('div');
            snowflake.className = 'snowflake';
            snowflake.textContent = snowflakeChars[Math.floor(Math.random() * snowflakeChars.length)];
            
            // Случайная позиция по горизонтали
            snowflake.style.left = Math.random() * 100 + '%';
            
            // Случайный размер
            const size = Math.random() * 0.8 + 0.5 + 'em';
            snowflake.style.fontSize = size;
            
            // Случайная прозрачность
            snowflake.style.opacity = Math.random() * 0.5 + 0.3;
            
            // Случайная продолжительность анимации
            const duration = Math.random() * 5 + 8 + 's';
            snowflake.style.animationDuration = duration;
            
            // Случайный наклон для эффекта ветра
            const windDirection = Math.random() > 0.5 ? '1' : '-1';
            snowflake.style.animationTimingFunction = `cubic-bezier(0.25, 0.46, 0.45, 0.94) ${windDirection}`;
            
            // Случайная задержка ОТРИЦАТЕЛЬНАЯ - чтобы снежинки были уже распределены по экрану при запуске
            const randomDelay = Math.random() * 10 - 10 + 's';
            snowflake.style.animationDelay = randomDelay;
            
            container.appendChild(snowflake);
        }
}

// Запустить генерацию снежинок
createSnowflakes();

init();