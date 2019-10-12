const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
  const token = 'sssssssssss';
  res.setHeader(token);
  res.header(token);
  res.status(200).json({ error: false, data: null, errorCode: null });
});

module.exports = router;
