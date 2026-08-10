const app = require('./app');

const port = Number.parseInt(process.env.PORT, 10) || 3000;
const host = process.env.HOST || '0.0.0.0';

const server = app.listen(port, host, () => {
  const address = server.address();
  const listeningPort = typeof address === 'object' && address !== null ? address.port : port;
  console.log(`Express server listening on http://${host}:${listeningPort}`);
});

const shutdown = (signal) => {
  console.log(`${signal} received. Shutting down gracefully.`);

  server.close((error) => {
    if (error) {
      console.error('Error while shutting down:', error);
      process.exitCode = 1;
    }
  });
};

process.once('SIGINT', () => shutdown('SIGINT'));
process.once('SIGTERM', () => shutdown('SIGTERM'));

module.exports = server;
