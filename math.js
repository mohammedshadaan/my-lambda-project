// math.js
exports.handler = async (event) => {
  const { a = 0, b = 0, operation = "add" } = event;
  let result;

  switch (operation) {
    case "add": result = a + b; break;
    case "sub": result = a - b; break;
    case "mul": result = a * b; break;
    case "div": result = b !== 0 ? a / b : "Infinity"; break;
    default: result = "Unknown operation";
  }

  return {
    statusCode: 200,
    body: JSON.stringify({
      a, b, operation, result,
    }),
  };
};
