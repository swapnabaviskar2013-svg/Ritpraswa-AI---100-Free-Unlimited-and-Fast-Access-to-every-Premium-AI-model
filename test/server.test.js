const assert = require('node:assert/strict');
const http = require('node:http');
const test = require('node:test');

const app = require('../app');

const startTestServer = () => new Promise((resolve) => {
  const server = http.createServer(app);
  server.listen(0, '127.0.0.1', () => resolve(server));
});

const request = (server, path) => new Promise((resolve, reject) => {
  const address = server.address();
  const req = http.get({
    hostname: '127.0.0.1',
    port: address.port,
    path,
  }, (res) => {
    let body = '';

    res.setEncoding('utf8');
    res.on('data', (chunk) => {
      body += chunk;
    });
    res.on('end', () => {
      resolve({
        statusCode: res.statusCode,
        body: JSON.parse(body),
      });
    });
  });

  req.on('error', reject);
});

test('GET / returns a server status message', async (t) => {
  const server = await startTestServer();
  t.after(() => server.close());

  const response = await request(server, '/');

  assert.equal(response.statusCode, 200);
  assert.equal(response.body.message, 'Express server is running');
});

test('GET /health returns an ok health check', async (t) => {
  const server = await startTestServer();
  t.after(() => server.close());

  const response = await request(server, '/health');

  assert.equal(response.statusCode, 200);
  assert.equal(response.body.status, 'ok');
  assert.equal(typeof response.body.uptime, 'number');
});

test('unknown routes return JSON 404 responses', async (t) => {
  const server = await startTestServer();
  t.after(() => server.close());

  const response = await request(server, '/does-not-exist');

  assert.equal(response.statusCode, 404);
  assert.equal(response.body.error, 'Not Found');
});
