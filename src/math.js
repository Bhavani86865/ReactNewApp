const toNumber = (value) => Number(value);

function add(a, b) {
  return toNumber(a) + toNumber(b);
}

function subtract(a, b) {
  return toNumber(a) - toNumber(b);
}

function multiply(a, b) {
  return toNumber(a) * toNumber(b);
}

function divide(a, b) {
  if (toNumber(b) === 0) {
    return 'Error';
  }

  return toNumber(a) / toNumber(b);
}

function calculate(firstValue, secondValue, operator) {
  switch (operator) {
    case '+':
      return add(firstValue, secondValue);
    case '-':
      return subtract(firstValue, secondValue);
    case '*':
      return multiply(firstValue, secondValue);
    case '/':
      return divide(firstValue, secondValue);
    default:
      return secondValue;
  }
}

export { add, subtract, multiply, divide, calculate };
export default { add, subtract, multiply, divide, calculate };