const jwt = require('jsonwebtoken');

const UnauthorizedError = require('../errors/UnauthorizedError');
const { authErrorMessage } = require('../constants/constants');

const { JWT_SECRET, NODE_ENV } = process.env;
const { DEV_SECRET, NODE_PRODUCTION } = require('../config');

module.exports = (req, res, next) => {
  // достаём авторизационный заголовок
  const { authorization } = req.headers;
  let payload;

  // убеждаемся, что он есть или начинается с Bearer
  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new UnauthorizedError(authErrorMessage);
  }

  // извлечём токен
  const token = authorization.replace('Bearer ', '');

  // верифицируем токен
  try {
    payload = jwt.verify(token, NODE_ENV === NODE_PRODUCTION ? JWT_SECRET : DEV_SECRET);
  } catch (err) {
    // отправим ошибку, если не получилось
    return next(new UnauthorizedError(authErrorMessage));
  }

  req.user = payload; // записываем пейлоуд в объект запроса
  return next(); // пропускаем запрос дальше
};
