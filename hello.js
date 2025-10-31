// hello.js
exports.handler = async (event) => {
  const name = event.name || "Guest";
  const message = `👋 Hello, ${name}! This is a CI/CD deployed Lambda.`;

  return {
    statusCode: 200,
    body: JSON.stringify({ message }),
  };
};
