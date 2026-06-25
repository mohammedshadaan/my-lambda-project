export const handler = async (event) => {
  console.log("Event received:", JSON.stringify(event));

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: "Hello from Lambda! Deploy is working ✓",
      environment: process.env.ENVIRONMENT || "unknown",
      functionName: process.env.AWS_LAMBDA_FUNCTION_NAME,
      timestamp: new Date().toISOString(),
      input: event,
    }),
  };
};
