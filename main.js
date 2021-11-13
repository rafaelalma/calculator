function add(operand1, operand2) {
  return Number.parseFloat(operand1) + Number.parseFloat(operand2);
}

function subtract(operand1, operand2) {
  return operand1 - operand2;
}

function multiply(operand1, operand2) {
  return operand1 * operand2;
}

function divide(operand1, operand2) {
  if (operand2 == 0) {
    throw new Error(DIVIDE_BY_ZERO_ERROR);
  }

  return operand1 / operand2;
}

function formatNumber(num) {
  return Math.round(num * 100) / 100;
}

function operate(operator, operand1, operand2) {
  switch (operator) {
    case "+":
      return add(operand1, operand2);
    case "-":
      return subtract(operand1, operand2);
    case "*":
      return multiply(operand1, operand2);
    case "/":
      try {
        return divide(operand1, operand2);
      } catch (error) {
        console.log(error);
        return 0;
      }
    default:
      throw new Error("Invalid operator");
  }
}

function updateMemory(value) {
  memory.textContent = value;
}

function updateResult(value) {
  result.textContent = value;
}

function parseOperation() {
  [operand1Value, operand2Value] = memoryValue.split(operatorValue);

  if (operand2Value === "") return;

  resultValue = formatNumber(
    operate(operatorValue, operand1Value, operand2Value)
  ).toString();
  updateResult(resultValue);

  memoryValue = resultValue;
  resultValue = "";
  operatorValue = "";
  operand1Value = "";
  operand2Value = "";

  canWriteNumber = false;
}

// TODO: Refactor
// BUG: After second input operator, perform calculation, but don't save the operator
// TODO: Float
// TODO: Delete
// TODO: Keyboard support

const DIVIDE_BY_ZERO_ERROR = "Can't divide by zero";

const memory = document.querySelector(".memory");
const result = document.querySelector(".result");
const numbers = document.querySelectorAll(".number");
const operators = document.querySelectorAll(".operator");
const equals = document.querySelector(".equals");
const clear = document.querySelector(".clear");

let memoryValue = "";
let operatorValue = "";
let operand1Value = "";
let operand2Value = "";
let resultValue = "";

let canWriteNumber = true;

numbers.forEach((number) => {
  number.addEventListener("click", (event) => {
    if (!canWriteNumber) return;

    memoryValue += event.currentTarget.textContent;
    updateMemory(memoryValue);
  });
});

operators.forEach((operator) => {
  operator.addEventListener("click", (event) => {
    if (memoryValue === "") return;

    canWriteNumber = true;

    if (operatorValue !== "") {
      parseOperation();

      return;
    }

    operatorValue = event.currentTarget.textContent;

    memoryValue += event.currentTarget.textContent;
    updateMemory(memoryValue);
  });
});

equals.addEventListener("click", () => {
  if (memoryValue === "" || operatorValue === "") return;

  parseOperation();
});

clear.addEventListener("click", () => {
  memoryValue = "";
  operatorValue = "";
  operand1Value = "";
  operand2Value = "";
  resultValue = "";
  canWriteNumber = true;

  updateMemory("");
  updateResult("");
});
