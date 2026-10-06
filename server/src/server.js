require('dotenv').config();

const app = require('./app');
const env = require('./config/env');

const start = async () => {
  try {
    app.listen(env.port, env.host, () => {
      console.log(`AGUNITY server running on http://${env.host}:${env.port}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

start();
