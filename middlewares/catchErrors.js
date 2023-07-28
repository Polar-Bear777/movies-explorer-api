const { dafaultErrorMessage } = require('../constants/constants');
const { userErrorsMessages } = require('../constants/constants');

// Улавливающие ошибки
module.exports = (error, req, res, next) => {
  if (error.code === 11000) {
    return res.status(409).send({ message: userErrorsMessages.auth });
  }
  const { statusCode = 500, message } = error;
  res.status(statusCode)
    .send({
      message: statusCode === 500
        ? dafaultErrorMessage
        : message,
    });
  return next();
};
