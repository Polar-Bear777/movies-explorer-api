const router = require('express').Router();
const { updateUserInfoValidation } = require('../middlewares/validation');
const { getUserInfo, updateUserInfo } = require('../controllers/userController');

router.get('/me', getUserInfo);
router.patch('/me', updateUserInfoValidation, updateUserInfo);

module.exports = router;
