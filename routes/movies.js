const moviesRouter = require('express').Router();
const {
  getMovies,
  deleteMovie,
  createMovie,
} = require('../controllers/movies');

const { createMovieJoi, checkMovieIdJoi } = require('../middlewares/validation');

// возвращает все сохранённые текущим  пользователем фильмы
moviesRouter.get('/', getMovies);

// создаёт фильм с переданными в теле
moviesRouter.post('/', createMovieJoi, createMovie);

// удаляет сохранённый фильм по id
moviesRouter.delete('/:_id', checkMovieIdJoi, deleteMovie);

module.exports = moviesRouter;
