// BASIC OPERATORS
let add = (a, b) => a + b;
let subtract = (a, b) => a - b;
let multiply = (a, b) => a * b;
let divide = (a, b) => a / b;

let operate = (operator, a, b) => {
  a = Number(a);
  b = Number(b);

  switch(operator) {
    case '+':
      return add(a, b)
    case '-':
      return subtract(a, b)
    case 'x':
      return multiply(a, b)
    case '÷':
      return divide(a, b)
    default:
      return null;
  }
}

//Select DOM Elements
const numberButtons = document.querySelectorAll("[data-number]");
const operatorButtons = document.querySelectorAll("[data-operator]");
const plusMinusButton = document.querySelector("[data-negative-positive]");
const clearButton = document.querySelector("[data-clear-last]");
const allClearButton = document.querySelector("[data-all-clear]");
const previousOperand = document.querySelector("[data-previous-operand]");
const currentOperand = document.querySelector("[data-current-operand]");

class Calculator {
  constructor(previousOperandElement, currentOperandElement) {
    this.previousOperandElement = previousOperandElement;
    this.currentOperandElement = currentOperandElement;
    this.MAX_DIGITS = 16;
  }
}