const Movie = require('../models/movie');

const ForbiddenError = require('../errors/ForbiddenError');
const NotFoundError = require('../errors/NotFoundError');
const BadRequestError = require('../errors/BadRequestError');
const { movieErrorsMessages } = require('../constants/constants');

// Получить фильмы
module.exports.getMovies = (req, res, next) => {
  const { _id } = req.user;

  Movie.find({ owner: _id })
    .populate('owner', '_id')
    .then((movies) => {
      if (!movies) {
        throw new NotFoundError('Данные не найдены');
      } else {
        res.send(movies);
      }
    })
    .catch(next);
};

// Создать фильмы
module.exports.createMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
  } = req.body;

  const owner = req.user._id;

  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
    owner,
  })
    .then((movie) => {
      res.send(movie);
    })
    .catch(next);
};

// Удалить фильмы
module.exports.deleteMovie = (req, res, next) => {
  const currentUserId = req.user._id;

  Movie.findById(req.params._id)
    .orFail()
    .then((movie) => {
      const ownerId = movie.owner.toString();
      if (ownerId !== currentUserId) {
        throw new ForbiddenError(movieErrorsMessages.forbidden);
      }
      return movie;
    })
    .then((movie) => movie.deleteOne())
    .then((movie) => res.status(200).send(movie))
    .catch((err) => {
      if (err.name === 'DocumentNotFoundError') {
        return next(new NotFoundError(movieErrorsMessages.notfound));
      }
      if (err.name === 'CastError') {
        return next(new BadRequestError(movieErrorsMessages.validation));
      }
      return next(err);
    });
};
