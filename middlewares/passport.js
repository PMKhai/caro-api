const passport = require('passport');
const passportJWT = require('passport-jwt');
const ExtractJWT = passportJWT.ExtractJwt;
const localStrategy = require('passport-local').Strategy;
const JWTStrategy = passportJWT.Strategy;
const userModel = require('../models/user');

passport.use(
  new localStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
    },
    async (email, password, done) => {
      try {
        const user = await userModel.getUserByEmail(email);
        if (!user)
          return done(null, false, {
            message: 'Incorrect username or password.',
          });

        const isVerify = await userModel.verifyPassword(email, password);
        if (!isVerify)
          return done(null, false, {
            message: 'Incorrect username or password.',
          });
        return done(null, user);
      } catch (ex) {
        return done(ex);
      }
    }
  )
);

passport.use(
  new JWTStrategy(
    {
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'your_jwt_secret',
    },
    async (jwtPayload, done) => {
      //find the user in db if needed
      try {
        const user = await userModel.findOneById(jwtPayload);

        if (user) return done(user, null);
      } catch (ex) {
        return done(ex);
      }
    }
  )
);
