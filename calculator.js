//#region Basic operator functions
function add(num1, num2) {
    return +num1 + +num2;
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

// This function rounds a number to at most two decimal places
function round(num) {
    return Math.round(num *100)/100;
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
    
    return round(operation(num1, num2));
}
//#endregion

//#region UI display updates

// Global variables
let valuesToOperateOn = [];
let equationAsString = "";

const maxLength = 25;

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
    console.table(valuesToOperateOn);
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

    // To ensure pressing a number will start a new input
    valuesToOperateOn = [];
    equationAsString = "";
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
    // Ensures the size of the string that is displayed fits the screen
    const resized = resizeString(equationAsString, maxLength);

    display.innerText = resized;
} 

function resizeString(string, maxLength) {
    if (string.length <= maxLength) return string;

    // If the string is longer than the max length, remove chars from the start
    //const substring = string.substr(0, (string.length) - maxLength)
    //return string.replace(substring, "");

    // Replacing the string with an error message
    const message = "Error: input too long"
    clear();
    return message;
}

function clear() {
    valuesToOperateOn = [];
    equationAsString = "";
    updateDisplay();
}

//#endregion