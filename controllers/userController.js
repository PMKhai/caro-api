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
        return res.send(err);
      }

      const token = jwt.sign(user, 'your_jwt_secret', {
        expiresIn: 14400, // 4 hours
      });

      delete user.password;
      return res.json({ data: { user, token }, error: null });
    });
  })(req, res);
};

exports.register = async (req, res, next) => {
  try {
    const { email, password, repassword } = req.body;

    if (password !== repassword)
      return res
        .status(422)
        .json({ data: null, error: "Password and repassword don't match." });

    const user = await userModel.insertNewAccount(email, password);
    if (user)
      return res
        .status(200)
        .json({ data: { message: 'success register' }, error: null });
    else
      return res
        .status(434)
        .json({ data: null, error: ' registration failed' });
  } catch (error) {
    return res.status(500).json({ data: null, error: 'error' });
  }
};

exports.edit = async (req, res, next) => {
  try {
    const { id, gender } = req.body;

    if (!gender)
      return res.status(406).json({ data: null, error: 'gender is required' });

    if (!id)
      return res.status(406).json({ data: null, error: 'user_id is required' });

    const isUpdate = userModel.editAccount(id, gender);

    if (isUpdate) return res.status(200).json({ data: 'success', erorr: null });
    else
      return res.status(500).json({ data: null, error: 'can not update user' });
  } catch (error) {
    return res.status(500).json({ data: null, error: 'error' });
  }
};
