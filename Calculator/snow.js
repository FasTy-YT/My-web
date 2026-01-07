// Снежинки для калькулятора

// Снежинки сзади (медленные, тусклые)
function createSnowflakesBack() {
    const container = document.getElementById('snow-back');
    const snowflakes = ['❄', '❅', '❆'];
    
    for (let i = 0; i < 20; i++) {
        const snowflake = document.createElement('div');
        snowflake.className = 'snowflake snowflake-back';
        snowflake.textContent = snowflakes[Math.floor(Math.random() * snowflakes.length)];
        snowflake.style.left = Math.random() * 100 + '%';
        snowflake.style.animationDuration = (Math.random() * 4 + 4) + 's';
        snowflake.style.animationDelay = Math.random() * 5 + 's';
        snowflake.style.fontSize = (Math.random() * 12 + 8) + 'px';
        snowflake.style.opacity = Math.random() * 0.3 + 0.1;
        snowflake.style.animationTimingFunction = 'ease-in-out';
        container.appendChild(snowflake);
    }
}

// Снежинки спереди (быстрые, яркие)
function createSnowflakesFront() {
    const container = document.getElementById('snow-front');
    const snowflakes = ['❄', '❅', '❆', '✻', '✼'];
    
    for (let i = 0; i < 15; i++) {
        const snowflake = document.createElement('div');
        snowflake.className = 'snowflake snowflake-front';
        snowflake.textContent = snowflakes[Math.floor(Math.random() * snowflakes.length)];
        snowflake.style.left = Math.random() * 100 + '%';
        snowflake.style.animationDuration = (Math.random() * 3 + 3) + 's';
        snowflake.style.animationDelay = Math.random() * 3 + 's';
        snowflake.style.fontSize = (Math.random() * 8 + 8) + 'px';
        snowflake.style.opacity = Math.random() * 0.4 + 0.3;
        snowflake.style.animationTimingFunction = 'ease-in-out';
        container.appendChild(snowflake);
    }
}

// Запустить снежинки
createSnowflakesBack();
createSnowflakesFront();