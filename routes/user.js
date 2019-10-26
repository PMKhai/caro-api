const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const middleware = require('../middlewares/checktoken');
const passport = require('passport');

router.post('/login', userController.login);

router.post('/register', userController.register);

router.put('/edit', middleware.checkToken, userController.edit);

router.get('/auth/google', userController.authGoogle);

router.get(
  '/auth/google/callback',
  passport.authenticate('google', { session: false }),
  userController.authGoogleCallback
);

module.exports = router;
