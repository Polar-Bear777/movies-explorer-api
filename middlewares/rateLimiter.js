const rateLimiter = require('express-rate-limit');

// Настройка Ограничителя скорости
const apiRateLimiter = rateLimiter({
  windowMs: 10 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
});

module.exports = { apiRateLimiter };
