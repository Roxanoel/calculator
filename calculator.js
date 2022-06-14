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
    let operation;

    switch (operator)
    {
        case "+": 
            operation = add;
            break;
        case "-":
            operation = subtract;
            break;
        case "x":
            operation = multiply;
            break;
        case "÷":
            operation = divide;
            break;
        default:
        console.log('Error: not a valid operator');    
        break;
    }
    
    return(operation(num1, num2));
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
    valuesToOperateOn = equationAsString.split(" ");
    // Clean up empty values from array
    valuesToOperateOn = valuesToOperateOn.filter(element => !(element === ""));
    // If the array is empty, call clear & return
    if (valuesToOperateOn.length === 0) {
        return;
    }
    // If there are 2 elements, return the one at index[0]
    if (valuesToOperateOn.length === 2) {   // This is ok because there won't be a need to splice if there is just 1 element
        valuesToOperateOn.pop();
    }
    // While there are 3 elements or more, operate on groups of 3 values & modify array
    while (valuesToOperateOn.length >= 3) {
        const operation = valuesToOperateOn[1];
        const num1 = valuesToOperateOn[0];
        const num2 = valuesToOperateOn[2];
        
        // Calculate 
        const newValue = operate(operation, num1, num2);
        // Adjust the array to use the new calculated value as index 0
        valuesToOperateOn.splice(0, 3, newValue);
        console.table(valuesToOperateOn);
    }
    // Update the display to show whatever is left to show
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
    equationAsString = valuesToOperateOn.join("");
    display.innerText = equationAsString;
}

function clear() {
    valuesToOperateOn = [];
    equationAsString = "";
    updateDisplay();
}
//#endregion