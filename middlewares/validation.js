const { Joi, celebrate } = require('celebrate');
const { URL_REGEX, EMAIL_REGEX } = require('../regex');

const createMovieValidation = celebrate({
  body: Joi.object().keys({
    thumbnail: Joi.string().required().pattern(URL_REGEX),
    trailer: Joi.string().required().pattern(URL_REGEX),
    image: Joi.string().required().pattern(URL_REGEX),
    description: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    movieId: Joi.number().required(),
    country: Joi.string().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
    year: Joi.string().required(),
  }),
});

const deleteMovieValidation = celebrate({
  params: Joi.object().keys({
    id: Joi.string().length(24).hex().required(),
  }),
});

const createValidation = celebrate({
  body: Joi.object().keys({
    // password: Joi.string().required().pattern(PASSWORD_REGEX),
    password: Joi.string().required().pattern(/^[a-zA-Z0-9]{3,30}$/).min(8),
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().email(),
  }),
});

const loginValidation = celebrate({
  body: Joi.object().keys({
    // password: Joi.string().required().pattern(PASSWORD_REGEX),
    password: Joi.string().required().pattern(/^[a-zA-Z0-9]{3,30}$/).min(8),
    email: Joi.string().required().email(),
  }),
});

const updateUserInfoValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().pattern(EMAIL_REGEX),
  }),
});

module.exports = {
  createMovieValidation,
  deleteMovieValidation,
  updateUserInfoValidation,
  createValidation,
  loginValidation,
};
