const display = document.querySelector('.display');
const buttons = document.querySelectorAll('button');
const numbers = document.querySelectorAll('.numbers > button');
const clearBtn = document.querySelector('.clearBtn');
let number1 = 0;
let number2 = 0;
let operator = '';
let pointApearance = 0;
let content = display.textContent;

display.textContent = '';

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

function updateDisplay (number) {
    if (checkDisplay()) {
        if (number === '.' && pointApearance < 1) {
            display.textContent += number;
            ++pointApearance;
        } else if (number !== '.') {
            display.textContent += number;
        }else {
            alert('Only one "." allowed!');
        }
    } else {
        alert('Size is to big');
    }
}

function operate (number1, number2, operator) {
    switch (operator) {
        case '+':
            add(numbe1, number2);
            break;

        case '-':
            substract(number1, number2);
            break;

        case '*':
            multiply(numbe1, number2);
            break;

        case '/':
            divide(number1, number2)
            break;

        default:

    }
} 

numbers.forEach(number => number.addEventListener('click', () => {
    updateDisplay(number.textContent);
    
}));

clearBtn.addEventListener('click', () => {
    display.textContent = '';
    pointApearance = 0;
});