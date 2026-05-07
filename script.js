let currentOperand = '0';
let previousOperand = '';
let operation = undefined;

const currentOperandElement = document.getElementById('current-operand');
const previousOperandElement = document.getElementById('previous-operand');

function clearDisplay() {
    currentOperand = '0';
    previousOperand = '';
    operation = undefined;
    updateDisplay();
}

function appendNumber(number) {
    if (number === '.' && currentOperand.includes('.')) return;
    if (currentOperand === '0' && number !== '.') {
        currentOperand = number.toString();
    } else {
        currentOperand = currentOperand.toString() + number.toString();
    }
    updateDisplay();
}

function appendOperator(op) {
    if (op === '±') {
        currentOperand = (parseFloat(currentOperand) * -1).toString();
        updateDisplay();
        return;
    }
    if (op === '%') {
        currentOperand = (parseFloat(currentOperand) / 100).toString();
        updateDisplay();
        return;
    }
    if (currentOperand === '') return;
    if (previousOperand !== '') {
        compute();
    }
    operation = op;
    previousOperand = currentOperand;
    currentOperand = '';
    updateDisplay();
}

function compute() {
    let computation;
    const prev = parseFloat(previousOperand);
    const current = parseFloat(currentOperand);
    if (isNaN(prev) || isNaN(current)) return;
    
    switch (operation) {
        case '+':
            computation = prev + current;
            break;
        case '-':
            computation = prev - current;
            break;
        case '×':
            computation = prev * current;
            break;
        case '÷':
            computation = prev / current;
            break;
        default:
            return;
    }
    currentOperand = computation.toString();
    operation = undefined;
    previousOperand = '';
    updateDisplay();
}

function updateDisplay() {
    currentOperandElement.innerText = currentOperand;
    if (operation != null) {
        previousOperandElement.innerText = `${previousOperand} ${operation}`;
    } else {
        previousOperandElement.innerText = '';
    }
}

// Initial call to set the display
updateDisplay();
