require('dotenv').config();

const {
  MONGO_URL = 'mongodb://127.0.0.1:27017/bitfilmsdb',
  JWT_SECRET,
  PORT = 3000,
  NODE_ENV = 'dev',
  DEV_SECRET = 'dev-secret',
  NODE_PRODUCTION = 'production',
} = process.env;

module.exports = {
  MONGO_URL,
  JWT_SECRET,
  PORT,
  NODE_ENV,
  DEV_SECRET,
  NODE_PRODUCTION,
};
