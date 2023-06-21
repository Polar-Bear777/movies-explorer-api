const dafaultErrorMessage = 'На сервера произошла ошибка.';
const singoutMessage = 'До свидания!';
const authErrorMessage = 'Неавторизован, требуется аутентификация';
const notFoundPage = 'Необходима авторизация';

const userErrorsMessages = {
  notfound: 'Пользователь по указанному id не найден.',
  conflict: 'Пользователь с указанным e-mail уже зарегистрирован.',
  validation: 'Переданы некорректные данные при создании пользователя.',
  auth: 'Неправильные почта или пароль.',
  message: 'Пользователь зарегистрирован',
  resurs: 'Запрашиваемый ресурс не найден',
};

const movieErrorsMessages = {
  notfound: 'Фильм с указанным id не найден.',
  forbidden: 'У Вас нет прав на удаление этого фильма.',
  validation: 'Передан некорректный id фильма.',
  add: 'Фильм добавлен',
  message: 'Фильм удалён',
};

const rateLimiterErrorsMessages = {
  conflict: 'Превышено количество запросов в секунду',
};

module.exports = {
  authErrorMessage,
  singoutMessage,
  userErrorsMessages,
  movieErrorsMessages,
  dafaultErrorMessage,
  rateLimiterErrorsMessages,
  notFoundPage,
};
