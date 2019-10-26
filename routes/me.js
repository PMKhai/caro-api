const express = require('express');
const router = express.Router();
const meController = require('.././controllers/meController');
const Middleware = require('../middlewares/checktoken');
const passport = require('passport');

router.get('/', Middleware.checkToken, meController.getProfile);

router.get('/google', passport.authenticate('google', { session: false }));

module.exports = router;
