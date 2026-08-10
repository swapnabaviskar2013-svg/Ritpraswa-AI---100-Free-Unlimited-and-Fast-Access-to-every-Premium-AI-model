const express = require('express');

const app = express();

app.disable('x-powered-by');
app.use(express.json());

app.get('/', (_req, res) => {
  res.json({
    name: 'Ritpraswa AI server',
    message: 'Express server is running',
  });
});

app.get('/health', (_req, res) => {
  res.status(200).json({
    status: 'ok',
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  });
});

app.use((req, res) => {
  res.status(404).json({
    error: 'Not Found',
    path: req.originalUrl,
  });
});

app.use((err, _req, res, _next) => {
  console.error(err);

  if (res.headersSent) {
    return;
  }

  res.status(err.statusCode || 500).json({
    error: err.statusCode ? err.message : 'Internal Server Error',
  });
});

module.exports = app;
