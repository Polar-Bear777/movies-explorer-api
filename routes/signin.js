const router = require('express').Router();
const { loginValidation } = require('../middlewares/validation');
const { login } = require('../controllers/userController');

router.post('/signin', loginValidation, login);

module.exports = router;
