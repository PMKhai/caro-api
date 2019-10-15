const express = require('express');
const router = express.Router();
const meController = require('.././controllers/meController');
const meMiddleware = require('../middlewares/me');

router.get('/', meMiddleware.checkToken, meController.getProfile);

module.exports = router;
