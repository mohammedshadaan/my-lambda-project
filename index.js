exports.handler = async (event) => {
  console.log(" Lambda execution started:", new Date().toISOString());
  console.log(" Incoming event:", JSON.stringify(event, null, 2));

  try {
    // Example: Read environment variables (set in Lambda configuration)
    const environment = process.env.ENVIRONMENT || "dev";
    const version = process.env.VERSION || "1.0.0";

    // Example: Main logic — simple success message
    const result = {
      message: " Lambda deployed successfully via GitHub → CodeBuild → Lambda!",
      environment,
      version,
      timestamp: new Date().toISOString(),
    };

    console.log(" Function executed successfully:", result);

    return {
      statusCode: 200,
      body: JSON.stringify(result),
    };
  } catch (error) {
    console.error(" Error executing Lambda:", error);

    return {
      statusCode: 500,
      body: JSON.stringify({
        message: "Internal Server Error",
        error: error.message,
      }),
    };
  }
};
