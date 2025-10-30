// index.js

// This Lambda function demonstrates logging, environment variables, and a sample response.
exports.handler = async (event) => {
  console.log("🚀 Lambda function executed at:", new Date().toISOString());

  // Example: reading environment variables (optional)
  const env = process.env.ENVIRONMENT || "dev";

  // Example: log event data (if any)
  console.log("Incoming event:", JSON.stringify(event, null, 2));

  // Sample logic — you can replace with real business logic
  const response = {
    statusCode: 200,
    body: JSON.stringify({
      message: "✅ Lambda deployed successfully via CodeBuild CI/CD!",
      environment: env,
      timestamp: new Date().toISOString(),
    }),
  };

  return response;
};
