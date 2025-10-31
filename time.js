// time.js
exports.handler = async () => {
  const now = new Date().toISOString();
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: "🕒 Current time from Lambda",
      time: now,
    }),
  };
};
