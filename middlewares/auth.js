const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/UnauthorizedError');
const { authErrorMessage } = require('../constants/constants');
const { JWT_SECRET } = require('../config');

const auth = (req, res, next) => {
  const { authorization } = req.headers;
  const token = authorization.replace('Bearer ', '');
  let payload;
  if (!authorization || !authorization.startsWith('Bearer ')) return next(new UnauthorizedError(authErrorMessage));
  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    return next(new UnauthorizedError(authErrorMessage));
  }
  req.user = payload;
  return next();
};

module.exports = auth;
