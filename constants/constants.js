const ERROR_CODE_INVALID_DATA = 400;
const ERROR_CODE_NOT_FOUND = 404;
const ERROR_CODE_DEFAULT = 500;

const dafaultErrorMessage = 'На сервера произошла ошибка.';
const singoutMessage = 'До свидания!';

const authErrorMessage = 'Необходима авторизация';

const userErrorsMessages = {
  notfound: 'Пользователь по указанному id не найден.',
  conflict: 'Пользователь с указанным e-mail уже зарегистрирован.',
  validation: 'Переданы некорректные данные при создании пользователя.',
  auth: 'Неправильные почта или пароль.',
};

const movieErrorsMessages = {
  notfound: 'Фильм с указанным id не найден.',
  forbidden: 'У Вас нет прав на удаление этого фильма.',
  validation: 'Передан некорректный id фильма.',
};

module.exports = {
  authErrorMessage,
  singoutMessage,
  userErrorsMessages,
  movieErrorsMessages,
  ERROR_CODE_INVALID_DATA,
  ERROR_CODE_NOT_FOUND,
  ERROR_CODE_DEFAULT,
  dafaultErrorMessage,
};
