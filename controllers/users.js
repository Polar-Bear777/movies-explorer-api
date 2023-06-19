const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const ConflictError = require('../errors/ConflictError');
const NotFoundError = require('../errors/NotFoundError');
const BadRequestError = require('../errors/BadRequestError');

const { JWT_SECRET, NODE_ENV } = process.env;
const { DEV_SECRET, NODE_PRODUCTION } = require('../config');
const { singoutMessage, userErrorsMessages } = require('../constants/constants');

// Найти пользователя
const findUser = (id, res, next) => {
  User.findById(id)
    .orFail()
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'DocumentNotFoundError') {
        return next(new NotFoundError(userErrorsMessages.notfound));
      }
      return next(err);
    });
};

// Изменить пользовательские данные
const changeUserData = (id, newData, res, next) => {
  User.findByIdAndUpdate(id, newData, { new: true, runValidators: true })
    .orFail()
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'DocumentNotFoundError') {
        return next(new NotFoundError(userErrorsMessages.notfound));
      }
      if (err.code === 11000) {
        return next(new ConflictError(userErrorsMessages.conflict));
      }
      return next(err);
    });
};

// Получить текущего пользователя
module.exports.getCurrentUser = (req, res, next) => findUser(req.user._id, res, next);

// Создать пользователя
module.exports.createUser = (req, res, next) => {
  const {
    email, password, name, about, avatar,
  } = req.body;

  bcrypt.hash(password, 16)
    .then((hash) => {
      User.create({
        email, password: hash, name, about, avatar,
      })
        .then((user) => {
          const noPasswordUser = user.toObject({ useProjection: true });

          return res.status(201).send(noPasswordUser);
        })
        .catch((err) => {
          if (err.name === 'ValidationError') {
            return next(new BadRequestError(userErrorsMessages.validation));
          }
          if (err.code === 11000) {
            return next(new ConflictError(userErrorsMessages.conflict));
          }
          return next(err);
        });
    });
};

// Авторизация
module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      // создадим токен
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === NODE_PRODUCTION ? JWT_SECRET : DEV_SECRET,
        { expiresIn: '7d' },
      );
      // вернём токен
      res.send({ token });
    })
    .catch(next);
};

// Обновить пользователя
module.exports.updateUser = (req, res, next) => {
  const { name, email } = req.body;
  return changeUserData(req.user._id, { name, email }, res, next);
};

// Выход из системы
module.exports.logout = (req, res) => {
  res.clearCookie('jwt').send({ message: singoutMessage });
};
