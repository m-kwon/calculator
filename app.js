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
    this.clearAll();
  }

  clearAll() {
    this.currentOperand = "";
    this.previousOperand = "";
    this.currentResult = undefined;
    this.operation = undefined;
    this.displayingResult = false;
    this.isFirstCalculation = true;
  }

  clear() {
    if (
      this.currentOperand === undefined ||
      this.currentOperand === this.currentResult
    ) {
      return;
    }

    this.currentOperand = this.currentOperand.slice(0, -1);

    if (this.currentOperand === "") {
      this.currentOperand = "0";
    }
  }
}