const rateLimiter = require('express-rate-limit');
const { rateLimiterErrorsMessages } = require('../constants/constants');

// Настройка Ограничителя скорости
const limiter = rateLimiter({
  windowMs: 1000,
  max: 10,
  message: rateLimiterErrorsMessages.conflict,
});

module.exports = limiter;
