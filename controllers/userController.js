const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const BadRequestError = require('../errors/BadRequestError');
const NotFoundError = require('../errors/NotFoundError');
const ConflictError = require('../errors/ConflictError');
const { userErrorsMessages } = require('../constants/constants');
const { NODE_ENV, JWT_SECRET } = require('../config');
// const { PASSWORD_REGEX } = require('../regex');
const User = require('../models/user');

function login(req, res, next) {
  const { email, password } = req.body;

  // if (!PASSWORD_REGEX.test(password)) throw new BadRequestError(userErrorsMessages.auth);

  User
    .findUserByCredentials(email, password)
    .then(({ _id }) => {
      const token = jwt.sign(
        { _id },
        NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
        { expiresIn: '3d' },
      );
      return res.send({ token });
    })
    .catch(next);
}

function createUser(req, res, next) {
  const { email, password, name } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name,
      email,
      password: hash,
    }))
    .then((user) => {
      const { _id } = user;
      res.send({
        _id,
        name,
        email,
      });
    })
    .catch((err) => {
      if (err.code === 11000) next(new ConflictError(userErrorsMessages.conflict));
      else if (err.name === 'ValidationError') next(new BadRequestError(userErrorsMessages.validation));
      else next(err);
    });
}

function getUserInfo(req, res, next) {
  const { _id } = req.user;

  User
    .findById(_id)
    .then((user) => {
      if (user) return res.send(user);
      throw new NotFoundError(userErrorsMessages.notfound);
    })
    .catch((err) => {
      if (err.name === 'CastError') next(new BadRequestError(userErrorsMessages.validation));
      else next(err);
    });
}

function updateUserInfo(req, res, next) {
  const { email, name } = req.body;
  const { _id } = req.user;

  User
    .findByIdAndUpdate(
      _id,
      {
        email,
        name,
      },
      {
        new: true,
        runValidators: true,
      },
    )
    .then((user) => res.status(200)
      .send({ data: user }))
    .catch((err) => {
      if (err.name === 'DocumentNotFoundError') {
        next(new NotFoundError(userErrorsMessages.resurs));
      } else {
        next(err);
      }
    });
}

module.exports = {
  updateUserInfo,
  getUserInfo,
  createUser,
  login,
};
