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
    throw new Error("Can't divide by zero");
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
      return divide(operand1, operand2);
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

const memory = document.querySelector(".memory");
const result = document.querySelector(".result");
const numbers = document.querySelectorAll(".number");
const operators = document.querySelectorAll(".operator");
const equals = document.querySelector(".equals");

let memoryValue = "";
let operatorValue = "";
let operand1Value = "";
let operand2Value = "";
let resultValue = "";

numbers.forEach((number) => {
  number.addEventListener("click", (event) => {
    if (resultValue !== "") return;

    memoryValue += event.currentTarget.textContent;
    updateMemory(memoryValue);
  });
});

operators.forEach((operator) => {
  operator.addEventListener("click", (event) => {
    if (memoryValue === "" || operatorValue !== "") return;

    operatorValue = event.currentTarget.textContent;

    memoryValue += event.currentTarget.textContent;
    updateMemory(memoryValue);
  });
});

equals.addEventListener("click", () => {
  if (memoryValue === "" || operatorValue === "") return;

  [operand1Value, operand2Value] = memoryValue.split(operatorValue);

  if (operand2Value === "") return;

  resultValue = operate(operatorValue, operand1Value, operand2Value).toString();
  updateResult(resultValue);

  memoryValue = resultValue;
  resultValue = "";
  operatorValue = "";
  operand1Value = "";
  operand2Value = "";
});
