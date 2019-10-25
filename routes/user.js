const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const middleware = require('../middlewares/checktoken');

router.post('/login', userController.login);

router.post('/register', userController.register);

router.put('/edit', middleware.checkToken, userController.edit);

module.exports = router;
