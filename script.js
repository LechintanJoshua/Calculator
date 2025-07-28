const display = document.querySelector('.display');
const buttons = document.querySelectorAll('button');
const numbersBtn = document.querySelectorAll('.numbers > button');
const deleteBtn = document.querySelector('.deleteBtn');
const clearBtn = document.querySelector('.clearBtn');
const equal = document.querySelector('#equalsBtn');
const operators = document.querySelectorAll('.operator');
let number1 = null;
let number2 = null;
let pressedOperator = false;
let finalResult = false;
let operator = '';
let pointApearance = 0;

function add (number1, number2) {
    return Number.isInteger(number1 + number2) ? number1 + number2 : (number1 + number2).toFixed(1);
}

function substract (number1, number2) {
    return Number.isInteger(number1 - number2) ? number1 - number2 : (number1 - number2).toFixed(1);
}

function multiply (number1, number2) {
    return Number.isInteger(number1 * number2) ? number1 * number2 : (number1 * number2).toFixed(1);
}

function divide (number1, number2) {
    return Number.isInteger(number1 / number2) ? number1 / number2 : (number1 / number2).toFixed(1);
}

function modulus (number1, number2) {
    return Number.isInteger(number1 & number2) ? number1 % number2 : (number1 % number2).toFixed(1);
}

function checkDisplay () {
    if (display.textContent.length < 17) {
        return true;
    }

    return false;
}

function startsWithPoint (num) {
    if (display.textContent === '' && num === '.') {
        return true;
    }

    return false;
}

function checkOperator () {
    if (pressedOperator) {
        display.textContent = '';
        pressedOperator = false;
    }
}

function checkPointApearance (num) {
    if (finalResult === true) {
        display.textContent = '';
        finalResult = false;
    }

    if (startsWithPoint(num)) {
        display.textContent = '0.';
        ++pointApearance;
        return;    
    }  
    
    if (num === '.' && pointApearance < 1) {
        display.textContent = Number(display.textContent) + '.';
        ++pointApearance;
    } else if (num !== '.') {
        display.textContent += num;
    } else {
        alert('Only one "." allowed!');
    }
}

function updateDisplay (num) {
    if (checkDisplay()) {
        checkOperator();
        checkPointApearance(num);
    } else {
        alert('Size is to big');
    }
}

function resetDisplay () {
    display.textContent = '';
    pointApearance = 0;
    operator = '';
    number1 = null;
    number2 = null;
    pressedOperator = false;
    finalResult = false;
}

function continousOperators (evtString) {
    pressedOperator = true;
    pointApearance = 0;

    if (operator === '') {
        number1 = Number(display.textContent)
        display.textContent += ` ${evtString}`;
        operator = evtString;
    } else {
        number2 = Number(display.textContent);
        display.textContent += ` ${evtString}`;
        operate();
        operator = evtString;
    }
}

function rewriteScreen () {
    finalResult = true;
    number1 =  null;
    number2 = null;
    pointApearance = 0;
    pressedOperator = false;
    operator = '';
}

function equalPressed () {
    if (operator !== '') {
        number2 = Number(display.textContent);
        operate();
        rewriteScreen();
    }
}

function clearPressed () {
    if (display.textContent.length === 1) {
        resetDisplay();
    } else {
        display.textContent = display.textContent.slice(0, -1);
    }
}

function operate () {
    switch (operator) {
        case '+':
            display.textContent = add(number1, number2);
            break;

        case '-':
            display.textContent = substract(number1, number2);
            break;

        case '*':
            display.textContent = multiply(number1, number2);
            break;

        case '/':
            if (number2 ===  0) {
                alert("Can't divide by 0!");
                resetDisplay();
                return;
            }

            display.textContent = divide(number1, number2);
            break;

        case '%':
            display.textContent = modulus(number1, number2);
            break;
    }
    number1 = Number(display.textContent);
}

numbersBtn.forEach(num => num.addEventListener('click', () => {
    updateDisplay(num.textContent);
}));

deleteBtn.addEventListener('click', () => resetDisplay());

clearBtn.addEventListener('click', () => clearPressed());

operators.forEach(ope => ope.addEventListener('click', (e) => continousOperators(e.target.textContent)));

equal.addEventListener('click', () => equalPressed());

document.addEventListener('keydown', (e) => {
    const isNumberKey = '0123456789.'.includes(e.key);
    const isOperatorKey = '+-*/%'.includes(e.key);
    const isEqualKey = (e.key === '=' || e.key === 'Enter');
    const isBackspaceKey = (e.key === 'Backspace');
    const isDeleteKey = (e.key === 'd');

    switch (true) {
        case isNumberKey:
            updateDisplay(e.key);
            break;

        case isOperatorKey:
            continousOperators(e.key);
            break;

        case isEqualKey:
            equalPressed();
            break;

        case isBackspaceKey:
            clearPressed();
            break;

        case isDeleteKey:
            resetDisplay();
    }
});