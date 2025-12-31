from browser import document

clicks = 0
goal = None

# Изначально скрываем все элементы
document["btn5"].style.display = "none"
document["btn10"].style.display = "none"
document["btn100"].style.display = "none"
document["btn_final"].style.display = "none"
document["shop_menu"].style.display = "none"
document["final"].style.display = "none"
document["app"].style.display = "none"

app = document["app"]
levels = document["levels"]

def lvl1(event):
    global goal
    goal = 10000
    document["app"].style.display = "block"
    document["container"].style.display = "block"
    document["levels"].style.display = "none"
    update_display()
def lvl2(event):
    global goal
    goal = 50000
    document["app"].style.display = "block"
    document["container"].style.display = "block"
    document["levels"].style.display = "none"
    update_display()
def lvl3(event):
    global goal
    goal = 100000
    document["app"].style.display = "block"
    document["container"].style.display = "block"
    document["levels"].style.display = "none"
    update_display()

def update_display():
    """Обновить отображение"""
    document["output"].text = f"Кликов: {clicks} | Цель: {goal:,}"

    # Проверяем победу
    if clicks >= goal:
        document["final"].style.display = "block"
        document["container"].style.display = "none"
        document["leave_container"].style.display = "none"


def add_clicks(amount):
    """Добавить клики"""
    global clicks
    clicks += amount
    update_display()


# Обработчики кликов
def btn_click1(event):
    add_clicks(1)


def btn_click5(event):
    add_clicks(5)


def btn_click10(event):
    add_clicks(10)


def btn_click100(event):
    add_clicks(100)


def btn_click_final(event):
    add_clicks(1000)


def showShop(event):
    document["shop_menu"].style.display = "block"
    document["container"].style.display = "none"


def closeShop(event):
    document["shop_menu"].style.display = "none"
    document["container"].style.display = "block"


def buy5cl(event):
    global clicks
    if clicks >= 5:
        clicks -= 5
        document["btn5"].style.display = "inline-block"
        document["5cl"].style.display = "none"
        update_display()


def buy10cl(event):
    global clicks
    if clicks >= 15:
        clicks -= 15
        document["btn10"].style.display = "inline-block"
        document["10cl"].style.display = "none"
        update_display()


def buy100cl(event):
    global clicks
    if clicks >= 150:
        clicks -= 150
        document["btn100"].style.display = "inline-block"
        document["100cl"].style.display = "none"
        update_display()


def buyFINALcl(event):
    global clicks
    if clicks >= 1500:
        clicks -= 1500
        document["btn_final"].style.display = "inline-block"
        document["FINALcl"].style.display = "none"
        update_display()


def ret(event):
    global clicks
    clicks = 0

    # Скрываем финальный экран
    document["final"].style.display = "none"

    # Скрываем ВСЮ игру
    document["app"].style.display = "none"

    # Показываем выбор уровня
    document["levels"].style.display = "block"

    # Сбрасываем кнопки улучшений (на всякий случай)
    document["btn5"].style.display = "none"
    document["btn10"].style.display = "none"
    document["btn100"].style.display = "none"
    document["btn_final"].style.display = "none"

    # Восстанавливаем кнопки покупки (на всякий случай)
    document["5cl"].style.display = "block"
    document["10cl"].style.display = "block"
    document["100cl"].style.display = "block"
    document["FINALcl"].style.display = "block"

def leave_btn(event):
    global clicks
    clicks = 0

    # Скрываем ВСЮ игру
    document["app"].style.display = "none"

    # Показываем выбор уровня
    document["levels"].style.display = "block"

    # Сбрасываем кнопки улучшений (на всякий случай)
    document["btn5"].style.display = "none"
    document["btn10"].style.display = "none"
    document["btn100"].style.display = "none"
    document["btn_final"].style.display = "none"

    # Восстанавливаем кнопки покупки (на всякий случай)
    document["5cl"].style.display = "block"
    document["10cl"].style.display = "block"
    document["100cl"].style.display = "block"
    document["FINALcl"].style.display = "block"

# Назначаем обработчики
document["btn1"].bind("click", btn_click1)
document["btn5"].bind("click", btn_click5)
document["btn10"].bind("click", btn_click10)
document["btn100"].bind("click", btn_click100)
document["btn_final"].bind("click", btn_click_final)

document["leave_btn"].bind("click", leave_btn)

document["shop"].bind("click", showShop)
document["close_shop"].bind("click", closeShop)

document["5cl"].bind("click", buy5cl)
document["10cl"].bind("click", buy10cl)
document["100cl"].bind("click", buy100cl)
document["FINALcl"].bind("click", buyFINALcl)

document["return"].bind("click", ret)

document["lvl1"].bind("click", lvl1)
document["lvl2"].bind("click", lvl2)
document["lvl3"].bind("click", lvl3)

# Инициализация
update_display()