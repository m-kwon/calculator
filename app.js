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

  appendNumber(inputNumber) {
    if (this.previousOperand.includes("=")) {
      return;
    }

    if (this.displayingResult) {
      this.currentOperand = "";
      this.displayingResult = false;
    }

    if (inputNumber === "." && this.currentOperand.includes(".")) {
      return;
    }

    if (this.currentOperand === "0") {
      this.currentOperand = "";
    }

    if (inputNumber === "." && this.currentOperand === "") {
      this.currentOperand = "0.";
    } else {
      if (this.currentOperand.length > 0) {
        let numberPattern = /\d+/g;
        let digits = this.currentOperand.match(numberPattern).join("");
        if (digits.length < this.MAX_DIGITS) {
          this.currentOperand += inputNumber;
        }
      } else {
        this.currentOperand += inputNumber;
      }
    }
  }

  selectOperation(operation) {
    if (this.currentOperand && !this.displayingResult) {
      if (operation === "=" && this.previousOperand === "") {
        return;
      } else if (this.previousOperand.includes("=")) {
        return;
      }

      if (this.currentOperand.slice(-1) === ".") {
        this.currentOperand = this.currentOperand.slice(0, -1);
        this.updateDisplay();
      }

      this.calculate();
      this.operation = operation;
      this.previousOperand += `${this.currentOperandElement.innerText} ${operation} `;

      if (this.isFirstCalculation) {
        this.currentOperand = "";
        this.isFirstCalculation = false;
      } else {
        this.currentOperand = this.currentResult.toString();
        this.displayingResult = true;
      }
    } else {
      if (this.displayingResult) {
        if (operation !== "=" && this.previousOperand.includes("=")) {
          this.previousOperand = "";
          this.calculate();
          this.operation = operation;
          this.previousOperand += `${this.currentOperandElement.innerText} ${operation} `;
          this.currentOperand = "";
          this.updateDisplay();
        }
      }
    }
  }

  reverseSign() {
    if (parseFloat(this.currentOperand) > 0) {
      this.currentOperand = parseFloat(this.currentOperand) * -1;
      this.currentOperand = this.currentOperand.toString();
    } else if (this.currentOperand.includes("-")) {
      this.currentOperand = this.currentOperand.substring(1);
    }
  }

  calculate() {
    if (this.currentResult === undefined) {
      this.currentResult = parseFloat(this.currentOperand);
    } else {
      let currentCalculation = parseFloat(this.currentOperand);
      switch (this.operation) {
        case "+":
          this.currentResult = this.currentResult + currentCalculation;
          break;
        case "-":
          this.currentResult = this.currentResult - currentCalculation;
          break;
        case "x":
          this.currentResult = this.currentResult * currentCalculation;
          break;
        case "÷":
          if (currentCalculation === 0) {
            this.currentResult = "NaN";
          } else {
            this.currentResult = this.currentResult / currentCalculation;
          }
          break;
        default:
          return;
      }
    }
  }

  formatDisplay(number) {
      const stringNumber = number.toString();
      const integerDigits = parseFloat(stringNumber.split(".")[0]);
      const decimalDigits = stringNumber.split(".")[1];
      let intergerDisplay;

      if (isNaN(integerDigits) && this.currentResult !== "NaN") {
        intergerDisplay = "";
      } else {
        intergerDisplay = integerDigits.toLocaleString("en", {
          maximumFractionDigits: 0,
        });
      }

      if (decimalDigits != null) {
        return `${intergerDisplay}.${decimalDigits}`;
      } else {
        return intergerDisplay;
      }
  }


  updateDisplay() {
    this.currentOperandElement.innerText = this.formatDisplay(
      this.currentOperand
    );
    this.previousOperandElement.innerText = this.previousOperand;
  }
}

const keyboardControls = (event) => {
  // prettier-ignore
  const KEYS = [
    "1", "2", "3", "4", "5", "6", "7", "8", "9", "0",
    ".", "+", "-", "*", "x", "X", "/", "=",
    "Enter", "Backspace", "Delete",
  ];
  const key = event.key;
  if (!KEYS.includes(event.key)) {
    return;
  } else {
    switch (key) {
      case "Backspace":
        calc.clear();
        calc.updateDisplay();
        break;
      case "Delete":
        calc.clearAll();
        calc.updateDisplay();
        break;
      case "Enter":
      case "=":
        event.preventDefault();
        calc.selectOperation("=");
        calc.updateDisplay();
        break;
      case "/":
        calc.selectOperation("÷");
        calc.updateDisplay();
        break;
      case "*":
      case "x":
      case "X":
        calc.selectOperation("x");
        calc.updateDisplay();
        break;
      case "+":
        calc.selectOperation("+");
        calc.updateDisplay();
        break;
      case "-":
        calc.selectOperation("-");
        calc.updateDisplay();
        break;
      default:
        calc.appendNumber(event.key);
        calc.updateDisplay();
    }
  }
};

const calc = new Calculator(previousOperand, currentOperand);

numberButtons.forEach((button) => {
  button.addEventListener("click", () => {
    calc.appendNumber(button.innerText);
    calc.updateDisplay();
  });
});

operatorButtons.forEach((button) => {
  button.addEventListener("click", () => {
    calc.selectOperation(button.innerText);
    calc.updateDisplay();
  });
});

allClearButton.addEventListener("click", () => {
  calc.clearAll();
  calc.updateDisplay();
});

clearButton.addEventListener("click", () => {
  calc.clear();
  calc.updateDisplay();
});

plusMinusButton.addEventListener("click", () => {
  calc.reverseSign();
  calc.updateDisplay();
});

document.addEventListener("keydown", keyboardControls);