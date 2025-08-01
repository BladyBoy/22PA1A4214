const fs = require('fs');
const path = require('path');

// Log file 
const logFilePath = path.join(__dirname, '../../logs/request.log');

// Creating logs directory 
if (!fs.existsSync(path.dirname(logFilePath))) {
  fs.mkdirSync(path.dirname(logFilePath), { recursive: true });
}

// Returning current ISO timestamp
function getTimestamp() {
  return new Date().toISOString();
}

// Logging middleware: logs each incoming HTTP request
function loggingMiddleware(req, res, next) {
  const { method, url } = req;
  const timestamp = getTimestamp();

  const logEntry = `[${timestamp}] ${method} ${url}\n`;

  // Appending log to file asynchronously 
  fs.appendFile(logFilePath, logEntry, err => {
    // Errors are silently ignored here by design
  });

  next();
}

module.exports = loggingMiddleware;
