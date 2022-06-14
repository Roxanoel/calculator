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

//#region UI interaction

// Caching refs + adding listeners
const display = document.querySelector('.results-display');

// Global variables
let displayContents = "";

const digitButtons = document.querySelectorAll('.digit');
digitButtons.forEach(button => {
    button.addEventListener('click', updateDisplay);
    // Store number in var?
});

function updateDisplay(e) {
    // Extract contents to display from event info
    displayContents += (e.target.innerText + " ");

    display.innerText = displayContents.toString();
}
//#endregion