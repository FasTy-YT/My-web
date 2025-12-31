from browser import document
import random

# Глобальные переменные
balance = 100
lose_streak = 0  # Счётчик проигрышей подряд
base_win_chance = 0.1  # Базовый шанс 10%


def spin(event):
    global balance, lose_streak

    try:
        bet_input = document["bet"]
        bet = int(bet_input.value)
    except:
        document["result"].text = "Введите число!"
        return

    if bet < 1:
        document["result"].text = "Ставка должна быть больше нуля!"
        return

    if bet > balance:
        document["result"].text = f"Ставка превышает баланс! Доступно: ${balance}"
        return

    # Снимаем деньги
    balance -= bet
    update_display()

    # Крутим с прогрессивными шансами
    result = spin_progressive()

    # Показываем в слотах
    for i in range(3):
        slot_id = f"slot{i + 1}"
        if slot_id in document:
            document[slot_id].text = result[i]

    check_win(result, bet)


def spin_progressive():
    """Вращение с прогрессивными шансами на выигрыш"""
    global lose_streak, base_win_chance

    symbols = ["❄️", "🎁", "🎄"]

    # Рассчитываем текущий шанс на выигрыш
    # Формула: базовый шанс + (проигрыши * 0.15), но не более 80%
    current_win_chance = min(base_win_chance + (lose_streak * 0.15), 0.8)

    # Проверяем выигрыш по прогрессивному шансу
    if random.random() < current_win_chance:
        # ВЫИГРЫШ - делаем три одинаковых символа
        lose_streak = 0  # Сбрасываем счётчик проигрышей
        symbol = random.choice(symbols)
        return [symbol, symbol, symbol]
    else:
        # ПРОИГРЫШ - увеличиваем счётчик
        lose_streak += 1

        # Но иногда (30% шанс) делаем два одинаковых для маленького выигрыша
        if random.random() < 0.3:
            symbol = random.choice(symbols)
            # Два одинаковых + один случайный
            if random.random() < 0.5:
                return [symbol, symbol, random.choice([s for s in symbols if s != symbol])]
            else:
                return [symbol, random.choice([s for s in symbols if s != symbol]), symbol]

        # Обычный проигрыш - все разные
        random.shuffle(symbols)
        return symbols


def check_win(result, bet):
    global balance, lose_streak

    combo = f"{result[0]}{result[1]}{result[2]}"
    win_amount = 0  # Изначально выигрыш 0

    # 1. ТРИ ОДИНАКОВЫХ - БОЛЬШОЙ ВЫИГРЫШ
    if result[0] == result[1] == result[2]:
        if result[0] == "❄️":
            win_amount = bet * 2
            multiplier = "x2"
        elif result[0] == "🎄":
            win_amount = bet * 5
            multiplier = "x5"
        elif result[0] == "🎁":
            win_amount = bet * 10
            multiplier = "x10"

        balance += win_amount  # Добавляем выигрыш к балансу
        document["result"].text = f"🎉 ВЫИГРЫШ! {combo} {multiplier} = +${win_amount}"
        document["result"].style.color = "#00FF00"

        # Спецэффект для большого выигрыша
        if win_amount >= bet * 5:
            document["result"].text = f"🔥 ДЖЕКПОТ! {combo} {multiplier} = +${win_amount}"
            document["result"].style.color = "#FFD700"

    # 2. ДВА ОДИНАКОВЫХ - МАЛЕНЬКИЙ ВЫИГРЫШ
    elif len(set(result)) == 2:  # Только два уникальных символа
        # Определяем какой символ повторяется
        counts = {}
        for symbol in result:
            counts[symbol] = counts.get(symbol, 0) + 1

        for symbol, count in counts.items():
            if count == 2:
                # Малый выигрыш - возвращаем ставку
                win_amount = bet
                balance += win_amount
                lose_streak = max(0, lose_streak - 1)  # Уменьшаем счётчик проигрышей
                document["result"].text = f"👍 Два {symbol}! Возврат ставки: +${win_amount}"
                document["result"].style.color = "orange"
                break

    # 3. ВСЕ РАЗНЫЕ - ПРОИГРЫШ
    else:
        win_amount = 0
        document["result"].text = f"{combo} - Проигрыш ${bet}"
        document["result"].style.color = "#FF6B6B"

    # Обновляем отображение баланса после выигрыша/проигрыша
    update_display()

    # Обновляем отображение прогрессивного шанса
    update_progressive_display()

    # Проверка на банкротство
    if balance <= 0:
        document["result"].text = "💸 Баланс закончился!"
        document["result"].style.color = "red"
        document["spin"].disabled = True


def update_display():
    """Обновить отображение баланса"""
    document["balance"].text = f"Баланс: ${balance}"

    # Подсветить если мало денег
    if balance < 10:
        document["balance"].style.color = "red"
    elif balance < 30:
        document["balance"].style.color = "orange"
    else:
        document["balance"].style.color = "#4CAF50"


def update_progressive_display():
    """Обновить отображение прогрессивных шансов"""
    # Рассчитываем текущий шанс
    current_chance = min(base_win_chance + (lose_streak * 0.15), 0.8)
    chance_percent = int(current_chance * 100)

    # Показываем шанс (если есть элемент для этого)
    if "chance_bar" in document:
        document["chance_bar"].style.width = f"{chance_percent}%"
        document["chance_bar"].text = f"{chance_percent}%"

    if "chance_text" in document:
        document["chance_text"].text = f"Шанс на выигрыш: {chance_percent}%"

        # Цвет шанса
        if chance_percent > 60:
            document["chance_text"].style.color = "#00FF00"
        elif chance_percent > 40:
            document["chance_text"].style.color = "#FFD700"
        else:
            document["chance_text"].style.color = "#FF6B6B"


# Назначаем обработчики
document["spin"].bind("click", spin)


def on_enter(event):
    if event.key == "Enter":
        spin(event)


document["bet"].bind("keypress", on_enter)

# Инициализация
update_display()
update_progressive_display()