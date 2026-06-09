export const handler = async (event) => {
  console.log("Event received:", JSON.stringify(event));

  // Test response
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: "Hello from Lambda! Deploy is working ✓",
      timestamp: new Date().toISOString(),
      input: event
    })
  };
};
