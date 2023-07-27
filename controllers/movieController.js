const BadRequestError = require('../errors/BadRequestError');
const ForbiddenError = require('../errors/ForbiddenError');
const NotFoundError = require('../errors/NotFoundError');
const { movieErrorsMessages } = require('../constants/constants');
const Movie = require('../models/movie');

function getMovies(req, res, next) {
  const { _id } = req.user;

  Movie
    .find({ owner: _id })
    .populate('owner', '_id')
    .then((movies) => {
      res.send(movies);
    })
    .catch((err) => {
      if (err.name === 'CastError') next(new BadRequestError(movieErrorsMessages.validation));
      else next(err);
    });
}

function createMovie(req, res, next) {
  const { _id } = req.user;
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
  } = req.body;

  Movie
    .create({
      country,
      director,
      duration,
      year,
      description,
      image,
      trailer,
      thumbnail,
      nameRU,
      nameEN,
      owner: _id,
      movieId,
    })
    .then((movie) => {
      res.send(movie);
    })
    .catch((err) => {
      console.log(err);
      if (err.name === 'ValidationError') next(new BadRequestError('хуйвфывся'));
      else next(err);
    });
}

function deleteMovie(req, res, next) {
  const { id: movieId } = req.params;
  const { _id: userId } = req.user;

  Movie
    .findById(movieId)
    .then((movie) => {
      if (!movie) throw new NotFoundError(movieErrorsMessages.notfound);

      const { owner: movieOwnerId } = movie;
      // eslint-disable-next-line max-len
      if (movieOwnerId.valueOf() !== userId) throw new ForbiddenError(movieErrorsMessages.forbidden);

      movie.deleteOne()
        .then(() => res.send(movieErrorsMessages.message))
        .catch(next);
    })
    .catch(next);
}

module.exports = {
  getMovies,
  createMovie,
  deleteMovie,
};
