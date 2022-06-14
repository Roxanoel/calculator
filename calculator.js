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
let valuesToOperateOn = [];
let equationAsString = "";

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

const equalsButton = document.querySelector('.equals');
equalsButton.addEventListener('click', equals);

const clearButton = document.querySelector('.clear');
clearButton.addEventListener('click', clear);

function attemptToAdd(e) {
    // Checks if the element being evaluated is an operator
    const isOperator = checkIfOperator(e.target) ? true : false;
    const informationLength = valuesToOperateOn.length;

    // If trying to add an operator after an operator or nothing, nothing happens
    if (isOperator && 
            (informationLength === 0 || 
            valuesToOperateOn[informationLength-1].startsWith(" "))) {
        return;
    }
    // If the operator would be after something else, add it with spaces around
    else if (isOperator) {
        valuesToOperateOn.push(" " + e.target.innerText + " ")
    }
    // Otherwise, if not an operator, add to array.
    else {
        valuesToOperateOn.push(e.target.innerText);
    }

    // Once an element has been added, update the display.
    updateDisplay();
}

function equals() {
    // Take the displayed string and make it into an array, using spaces to split

    // If the array is empty, call clear & return

    // If there are less than 3 elements, return the one at index[0]

    // While there are 3 elements or more, operate on groups of 3 values & modify array

    // Update the display to show whatever is left to show
}

function checkIfOperator(element) { 
    return (element.classList.contains('plus') ||
        element.classList.contains('minus') ||
        element.classList.contains('times') ||
        element.classList.contains('divided'))
}

function updateDisplay() {
    // Updates display to current state of the array, turned to string
    equationAsString = valuesToOperateOn.join("");
    display.innerText = equationAsString;
}

function clear() {
    valuesToOperateOn = [];
    equationAsString = "";
    updateDisplay();
}
//#endregion