const usersRouter = require('express').Router();
const {
  updateUser,
  getCurrentUser,
} = require('../controllers/users');

const { updateUserJoi } = require('../middlewares/validation');

// возвращает информацию о пользователе (email и имя)
usersRouter.get('/me', getCurrentUser);

// обновляет информацию о пользователе (email и имя)
usersRouter.patch('/me', updateUserJoi, updateUser);

module.exports = usersRouter;
