const express = require('express');
const router = express.Router();
const middleware = require('../middlewares/checktoken');
const gameController = require('../controllers/gameController');

router.get('/findmatch', middleware.checkToken, gameController.findMatch);

module.exports = router;
