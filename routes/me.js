const express = require('express');
const router = express.Router();
const meController = require('.././controllers/meController');
const Middleware = require('../middlewares/checktoken');

router.get('/', Middleware.checkToken, meController.getProfile);

module.exports = router;
