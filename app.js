require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
// Обработка ошибок в route
// const { errors } = require('celebrate');
// Защита заголовков
// const helmet = require('helmet');
// const cors = require('cors');
const router = require('./routes/index');

const { MONGO_URL, PORT } = require('./config');
const auth = require('./middlewares/auth');

// const { requestLogger, errorLogger } = require('./middlewares/logger');
// const { apiRateLimiter } = require('./middlewares/rateLimiter');

// const catchErrors = require('./middlewares/catchErrors');

// подключаемся к серверу mongo
const app = express();

// // добавляем cors как мидлвару
// app.use(cors());

app.use(express.json());

// авторизация
app.use(router);
app.use(auth);

// // Подключаем логгер запросов перед limiter, иначе не будет записан запрос в логи
// app.use(requestLogger);

// // Защита заголовков
// app.use(helmet());

// // Зашитится от автоматических входов
// app.use(apiRateLimiter);

// // Подключаем логгер ошибок
// app.use(errorLogger);

// // Централизованная обработка ошибок
// app.use(errors()); // JOI

// Подключение центрального обработчика ошибок
// app.use(catchErrors);

// Подключение к MongoDB
async function start() {
  try {
    await mongoose.connect(MONGO_URL);
    await app.listen(PORT);
  } catch (err) {
    console.log(err);
  }
}

start()
  .then(() => console.log(`App has been successfully started!\n${MONGO_URL}\nPort: ${PORT}`));
