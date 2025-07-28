const display = document.querySelector('.display');
const buttons = document.querySelectorAll('button');
const numbersBtn = document.querySelectorAll('.numbers > button');
const deleteBtn = document.querySelector('.deleteBtn');
const clearBtn = document.querySelector('.clearBtn');
const equal = document.querySelector('#equalsBtn');
const operators = document.querySelectorAll('.operator');
let number1 = null;
let number2 = null;
let operator = '';
let pointApearance = 0;

function add (number1, number2) {
    return number1 + number2;
}

function substract (number1, number2) {
    return number1 - number2;
}

function multiply (number1, number2) {
    return number1 * number2;
}

function divide (number1, number2) {
    return number1 / number2;
}

function checkDisplay () {
    if (display.textContent.length < 19) {
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

function checkPointApearance (num) {
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
    }else {
        alert('Only one "." allowed!');
    }
}

function updateDisplay (num) {
    if (checkDisplay()) {
        checkPointApearance(num);

    } else {
        alert('Size is to big');
    }
}

function resetDisplay () {
    display.textContent = '';
    pointApearance = 0;
    operator = '';
    number = null;
}

function checkNumber () {
    if (display.textContent === '') {
        return false;
    }

    return true;
}

function operate () {
    const number1 = number;
    const number2 = Number(display.textContent);

    console.log(operator);

    switch (operator) {
        case '+':
            display.textContent = add(number1, number2).toFixed(1);
            break;

        case '-':
            display.textContent = substract(number1, number2).toFixed(1);
            break;

        case '*':
            display.textContent = multiply(number1, number2).toFixed(1);
            break;

        case '/':
            display.textContent = divide(number1, number2).toFixed(1);
            break;

        // case '=':
        //     if (display.textContent === '') {
        //         display.textContent = 0;
        //     }

        //     if (number1 === null) {
                
        //     }
        //     break;

        default:
            alert('You must two numbers');
    }
} 

numbersBtn.forEach(num => num.addEventListener('click', () => {
    updateDisplay(num.textContent);
}));

deleteBtn.addEventListener('click', () => resetDisplay());

clearBtn.addEventListener('click', () => {
    if (display.textContent.length === 1) {
        resetDisplay();
    } else {
        display.textContent = display.textContent.slice(0, -1);
    }
});

operators.forEach(ope => ope.addEventListener('click', () => {
    if (checkNumber()) {
        operator = ope.textContent;
        number = Number(display.textContent);
        display.textContent = '+';
    }
}));

equal.addEventListener('click', () => {
    if (number !== null) {
        operate();
    }
});