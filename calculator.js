//#region Basic operator functions
function add(num1, num2) {
    return num1 + num2;
}

function subtract(num1, num2) {
    return num1 - num2;
}

function multiply(num1, num2) {
    return num1*num2;
}

function divide(num1, num2) {
    if (num2 === 0) {
        // Desired behaviour tbd with rest of the functionality; atm, returns undefined.
        alert("Hey! You can't divide by zero!");
    }
    else {
        return num1/num2;
    }
}

function operate(operator, num1, num2) {
    return(operator(num1, num2));
}
//#endregion

//#region UI display updates

// Global variables
let informationEntered = [];

// Caching refs + adding listeners
const display = document.querySelector('.results-display');

const digitButtons = document.querySelectorAll('.digit');
digitButtons.forEach(button => {
    button.addEventListener('click', attemptToAdd);
    // Store number in var?
});

const operationButtons = document.querySelectorAll('.operator');
operationButtons.forEach(button => {
    button.addEventListener('click', attemptToAdd)
})

const clearButton = document.querySelector('.clear');
clearButton.addEventListener('click', clear);

function attemptToAdd(e) {
    // Checks if the element being evaluated is an operator
    const isOperator = checkIfOperator(e.target) ? true : false;
    const informationLength = informationEntered.length;

    // If trying to add an operator after an operator or nothing, nothing happens
    if (isOperator && 
            (informationLength === 0 || 
            informationEntered[informationLength-1].startsWith(" "))) {
        return;
    }
    // If the operator would be after something else, add it with spaces around
    else if (isOperator) {
        informationEntered.push(" " + e.target.innerText + " ")
    }
    // Otherwise, if not an operator, add to array.
    else {
        informationEntered.push(e.target.innerText);
    }

    // Once an element has been added, update the display.
    updateDisplay();
}

function checkIfOperator(element) { 
    return (element.classList.contains('plus') ||
        element.classList.contains('minus') ||
        element.classList.contains('times') ||
        element.classList.contains('divided'))
}

function updateDisplay() {
    // Updates display to current state of the array, turned to string
    display.innerText = informationEntered.join("");
}

function clear() {
    informationEntered = [];
    updateDisplay();
}
//#endregion