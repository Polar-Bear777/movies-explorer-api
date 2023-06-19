const router = require('express').Router();
const { errors } = require('celebrate');
const moviesRouter = require('./movies');
const usersRouter = require('./users');

const NotFoundError = require('../errors/NotFoundError');

const { login, createUser, logout } = require('../controllers/users');
const { createUserJoi, loginJoi } = require('../middlewares/validation');
const { errorLogger } = require('../middlewares/logger');
// const authMiddleware = require('../middlewares/auth');

// проверяет переданные в теле почту и пароль
// и возвращает JWT
router.post('/signin', loginJoi, login);

// создаёт пользователя с переданными в теле
// email, password и name
router.post('/signup', createUserJoi, createUser);

// дополнительный роут при сохранении в куках
router.get('/signout', logout);

// router.use(authMiddleware);
router.use('/users', usersRouter);
router.use('/movies', moviesRouter);
router.use('/*', (req, res, next) => {
  next(new NotFoundError('Страница не найдена'));
});
router.use(errorLogger);
router.use(errors({ message: 'Ошибка валидации данных!' }));

module.exports = router;
