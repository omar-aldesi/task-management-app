// I used an ai to generate this middleware, its not required in the PDF task file, but its important to have one normally
// its not professional at all, but it does the job
const logger = (req, res, next) => {
  const timestamp = new Date().toISOString();
  const method = req.method;
  const url = req.originalUrl;
  const ip = req.ip || req.connection.remoteAddress;
  const userAgent = req.get("User-Agent") || "Unknown";

  // Log request
  console.log(`\n🌐 [${timestamp}] ${method} ${url}`);
  console.log(`📍 IP: ${ip}`);
  console.log(`🖥️  User-Agent: ${userAgent}`);

  // Log request body for POST/PATCH/PUT (but hide passwords)
  if (["POST", "PATCH", "PATCH"].includes(method) && req.body) {
    const safeBody = { ...req.body };
    if (safeBody.password) safeBody.password = "[HIDDEN]";
    console.log(`📦 Body:`, JSON.stringify(safeBody, null, 2));
  }

  // Capture response data
  const startTime = Date.now();

  // Override res.json to log response
  const originalJson = res.json;
  res.json = function (data) {
    const duration = Date.now() - startTime;
    const statusCode = res.statusCode;

    // Log response
    console.log(`⚡ Response: ${statusCode} (${duration}ms)`);

    // Log response data (but limit size)
    if (data) {
      const responseString = JSON.stringify(data);
      if (responseString.length > 200) {
        console.log(
          `📤 Response: [Large response - ${responseString.length} chars]`
        );
      } else {
        console.log(`📤 Response:`, data);
      }
    }

    console.log(`${"=".repeat(50)}\n`);

    return originalJson.call(this, data);
  };

  next();
};

module.exports = logger;
