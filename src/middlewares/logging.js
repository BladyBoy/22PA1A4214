const fs = require('fs');
const path = require('path');

// Log file path: located at the project root under logs/request.log
const logFilePath = path.join(__dirname, '../../logs/request.log');

// Create logs directory if it doesn't exist
if (!fs.existsSync(path.dirname(logFilePath))) {
  fs.mkdirSync(path.dirname(logFilePath), { recursive: true });
}

// Return current ISO timestamp
function getTimestamp() {
  return new Date().toISOString();
}

// Logging middleware: logs each incoming HTTP request
function loggingMiddleware(req, res, next) {
  const { method, url } = req;
  const timestamp = getTimestamp();

  const logEntry = `[${timestamp}] ${method} ${url}\n`;

  // Append log to file asynchronously (non-blocking)
  fs.appendFile(logFilePath, logEntry, err => {
    // Errors are silently ignored here by design
  });

  next();
}

module.exports = loggingMiddleware;
