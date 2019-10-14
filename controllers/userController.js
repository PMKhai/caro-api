const jwt = require('jsonwebtoken');
const passport = require('passport');
const userModel = require('../models/user');

exports.login = (req, res, next) => {
  passport.authenticate('local', { session: false }, (err, user, info) => {
    console.log(err);
    if (err || !user) {
      return res.status(400).json({
        data: null,
        error: info ? info.message : 'Login failed',
      });
    }

    req.login(user, { session: false }, (err) => {
      if (err) {
        res.send(err);
      }

      const token = jwt.sign(user, 'your_jwt_secret', {
        expiresIn: 604800, // 1 week
      });

      return res.json({ data: { user, token }, error: null });
    });
  })(req, res);
};

exports.register = async (req, res, next) => {
  const { email } = req.body;
  const user = await userModel.checkEmail(emai);
  res.status(200).json({ error: false, user, errorCode: null });
};
