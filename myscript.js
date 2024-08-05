// Select DOM elements
const numberBtns = document.querySelectorAll('.num');
const operatorBtns = document.querySelectorAll('.operator');
const mainDisplay = document.getElementById('mainDis');
const operatorDisplay = document.getElementById('operatorDis');
const clearBtn = document.getElementById('clear');
const delBtn = document.getElementById('del');
const equalsBtn = document.getElementById('equal');
const decimalBtn = document.getElementById('deci');

// Constants
const MAX_DIGITS = 8;

// State variables
let firstOperand = "";
let secondOperand = "";
let operator = "";
let isSecondOperand = false;

// Update display function
function updateDisplay() {
    mainDisplay.textContent = (isSecondOperand ? secondOperand : firstOperand) || "0";
    operatorDisplay.textContent = operator;
}

// Number button click handler
function handleNumberClick() {
    if (isSecondOperand) {
        if (secondOperand.length < MAX_DIGITS) {
            secondOperand += this.textContent;
        }
    } else {
        if (firstOperand.length < MAX_DIGITS) {
            firstOperand += this.textContent;
        }
    }
    updateDisplay();
}

// Setup number button event listeners
numberBtns.forEach(btn => btn.addEventListener('click', handleNumberClick));

// Decimal button click handler
function handleDecimalClick() {
    const operand = isSecondOperand ? secondOperand : firstOperand;
    if (!operand.includes('.')) {
        if (isSecondOperand) {
            secondOperand += '.';
        } else {
            firstOperand += '.';
        }
        updateDisplay();
    }
}

// Setup decimal button event listener
decimalBtn.addEventListener('click', handleDecimalClick);

// Clear button click handler
function handleClearClick() {
    firstOperand = "";
    secondOperand = "";
    operator = "";
    isSecondOperand = false;
    updateDisplay();
}

// Setup clear button event listener
clearBtn.addEventListener('click', handleClearClick);

// Operator button click handler
function handleOperatorClick() {
    if (firstOperand && !isSecondOperand) {
        operator = this.textContent;
        operatorDisplay.textContent = operator;
        isSecondOperand = true;
    } else if (firstOperand && secondOperand && operator) {
        firstOperand = operate(parseFloat(firstOperand), parseFloat(secondOperand), operator).toString();
        secondOperand = "";
        operator = this.textContent;
        updateDisplay();
        isSecondOperand = true;
    }
}

// Setup operator button event listeners
operatorBtns.forEach(btn => btn.addEventListener('click', handleOperatorClick));

// Equals button click handler
function handleEqualsClick() {
    if (firstOperand && secondOperand && operator) {
        const result = operate(parseFloat(firstOperand), parseFloat(secondOperand), operator);
        mainDisplay.textContent = result.toString().substring(0, MAX_DIGITS);
        firstOperand = result.toString();
        secondOperand = "";
        operator = "";
        operatorDisplay.textContent = '';
        isSecondOperand = false;
    }
}

// Setup equals button event listener
equalsBtn.addEventListener('click', handleEqualsClick);

// Delete button click handler
function handleDeleteClick() {
    if (isSecondOperand && secondOperand) {
        secondOperand = secondOperand.slice(0, -1);
    } else if (firstOperand) {
        firstOperand = firstOperand.slice(0, -1);
    }
    updateDisplay();
}

// Setup delete button event listener
delBtn.addEventListener('click', handleDeleteClick);

// Keyboard input handler
function handleKeyboardInput(event) {
    const key = event.key;

    if (key >= '0' && key <= '9') {
        handleNumberClick.call({ textContent: key });
    } else if (key === '.' || key === ',') {
        handleDecimalClick();
    } else if (['+', '-', '*', '/'].includes(key)) {
        handleOperatorClick.call({ textContent: key });
    } else if (key === 'Enter' || key === '=') {
        handleEqualsClick();
    } else if (key === 'Backspace') {
        handleDeleteClick();
    } else if (key === 'Escape') {
        handleClearClick();
    }
}

// Add keyboard event listener
window.addEventListener('keydown', handleKeyboardInput);

// Arithmetic operations
function add(a, b) { return a + b; }
function subtract(a, b) { return a - b; }
function multiply(a, b) { return a * b; }
function divide(a, b) {
    return b !== 0 ? a / b : 'Error';
}

// Perform operation based on the operator
function operate(a, b, operator) {
    switch (operator) {
        case "+": return add(a, b);
        case "-": return subtract(a, b);
        case "*": return multiply(a, b);
        case "/": return divide(a, b);
        default: return b;
    }
}