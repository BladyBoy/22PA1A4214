const express = require('express');
const loggingMiddleware = require('./middlewares/logging.js');
const shorturlsRouter = require('./routes/shorturls');

const app = express();

app.use(express.json());

// Using loggign middleware
app.use(loggingMiddleware);

// declaring routes
app.use(shorturlsRouter);

// Test route 
app.get('/test', (req, res) => {
  res.json({ message: 'Test route is working!' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`URL Shortener service listening on port ${PORT}`);
});

module.exports = app;
