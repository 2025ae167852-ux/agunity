const test = require('node:test');
const assert = require('node:assert/strict');
const app = require('../src/app');

const getServer = async () => {
  const server = app.listen(0);
  await new Promise((resolve) => server.once('listening', resolve));
  const { port } = server.address();
  return { server, port };
};

test('GET /api/health returns service status', async () => {
  const { server, port } = await getServer();
  try {
    const response = await fetch(`http://127.0.0.1:${port}/api/health`);
    const body = await response.json();
    assert.equal(response.status, 200);
    assert.equal(body.status, 'ok');
    assert.equal(body.service, 'agunity-server');
  } finally {
    server.close();
  }
});

test('POST /api/auth/register creates a user and token', async () => {
  const { server, port } = await getServer();
  try {
    const response = await fetch(`http://127.0.0.1:${port}/api/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        fullName: 'Njeri Muriuki',
        email: 'njeri@example.com',
        password: 'Password123!',
        role: 'farmer'
      })
    });

    const body = await response.json();
    assert.equal(response.status, 201);
    assert.equal(body.user.email, 'njeri@example.com');
    assert.ok(body.token);
  } finally {
    server.close();
  }
});

test('GET /api/farms requires a valid JWT', async () => {
  const { server, port } = await getServer();
  try {
    const response = await fetch(`http://127.0.0.1:${port}/api/farms`, {
      headers: { Authorization: 'Bearer invalid-token' }
    });
    assert.equal(response.status, 401);
  } finally {
    server.close();
  }
});
