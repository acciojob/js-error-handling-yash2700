//your code here
class OutOfRangeError extends Error {
  constructor(msg) {
    super(msg);
    this.name = "OutOfRangeError";
  }
}

class InvalidExprError extends Error {
  constructor(msg) {
    super(msg);
    this.name = "InvalidExprError";
  }
}

function isOperator(char) {
  return ["+", "-", "*", "/"].includes(char);
}

function isInteger(str) {
  return /^\d+$/.test(str);
}

function evalString(expr) {
  let prevChar = null;

  for (let i = 0; i < expr.length; i++) {
    const char = expr[i];

    if (char === " ") {
      // skip spaces
      continue;
    } else if (isOperator(char)) {
      // check for invalid operator combination
      if (prevChar !== null && isOperator(prevChar)) {
        throw new InvalidExprError(
          "Expression should not have an invalid combination of operators"
        );
      }
    } else if (!isInteger(char)) {
      // check for invalid character
      throw new OutOfRangeError(
        "Expression should only consist of integers and +-/* characters"
      );
    }

    prevChar = char;
  }

  // check for invalid starting operator
  if (isOperator(expr[0])) {
    throw new SyntaxError("Expression should not start with invalid operator");
  }

  // check for invalid ending operator
  if (isOperator(expr[expr.length - 1])) {
    throw new SyntaxError("Expression should not end with invalid operator");
  }

  // evaluate the expression
  return eval(expr);
}

try {
  const expr = "1 + 2 - 3 * 4 / -5";
  console.log(evalString(expr));
} catch (error) {
  console.log(error.name + ": " + error.message);
}