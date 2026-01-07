const result = document.getElementById("result");

let expression = "";

function addnumber(n) {
    expression += n;
    update();
}
function addoperator(op) {
    let lastChar = expression.slice(-1);
    if ("+-*/".includes(lastChar)) {
        return;
    }

    expression += op;
    update();
}
function addpoint() {
    expression += ".";
    update();
}
function clearDisplay() {
    if (expression.length === 0) {
        return;
    }
    expression = "";
    update();
}
function deleteLast() {
    if (expression.length > 0) {
        expression = expression.slice(0, -1);
    update();
    }
}
function calculate() {
    try {
        let result = eval(expression);
        expression = result.toString();
    } catch (error) {
        expression = "Ошибка!";
        update();
        setTimeout(() => {
            expression = "";
            update();
        }, 1500);
    }
    update();
}
function update() {
    result.innerText = expression || "0";
}