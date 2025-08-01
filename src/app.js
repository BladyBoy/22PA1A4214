const express = require('express');
const loggingMiddleware = require('./middlewares/logging.js');
const shorturlsRouter = require('./routes/shorturls');

const app = express();

app.use(express.json());

// Using logging middleware
app.use(loggingMiddleware);

// test route
app.get('/test', (req, res) => {
  res.json({ message: 'Test route is working!' });
});

// main route
app.use(shorturlsRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`URL Shortener service listening on port ${PORT}`);
});

module.exports = app;
