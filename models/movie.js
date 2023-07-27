const mongoose = require('mongoose');
const validator = require('validator');
// const { URL_REGEX } = require('../middlewares/validation');

const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

const movieSchema = new Schema(
  {
    country: {
      required: true,
      type: String,
    },

    director: {
      required: true,
      type: String,
    },

    duration: {
      required: true,
      type: Number,
    },

    year: {
      required: true,
      type: String,
    },

    description: {
      required: true,
      type: String,
    },

    image: {
      type: String,
      required: [true, 'Поле "image" должно быть заполнено'],
      validate: {
        validator(image) {
          return validator.isURL(image);
        },
        message: '400 Введён некорректный image-link',
      },
    },

    trailer: {
      type: String,
      required: [true, 'Поле "image" должно быть заполнено'],
      validate: {
        validator(image) {
          return validator.isURL(image);
        },
        message: '400 Введён некорректный image-link',
      },
    },

    thumbnail: {
      type: String,
      required: [true, 'Поле "image" должно быть заполнено'],
      validate: {
        validator(image) {
          return validator.isURL(image);
        },
        message: '400 Введён некорректный image-link',
      },
    },

    nameRU: {
      required: true,
      type: String,
    },

    nameEN: {
      required: true,
      type: String,
    },

    owner: {
      required: true,
      type: ObjectId,
      ref: 'user',
    },

    movieId: {
      required: true,
      type: Number,
    },
  },
);

module.exports = mongoose.model('movie', movieSchema);
