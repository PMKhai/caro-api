const passport = require('passport');
const passportJWT = require('passport-jwt');
const ExtractJWT = passportJWT.ExtractJwt;
const localStrategy = require('passport-local').Strategy;
const googleStrategy = require('passport-google-oauth20').Strategy;
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
  new googleStrategy(
    {
      clientID:
        '436031374649-3end7jmbr4s73q4nshujbfgdviah8a88.apps.googleusercontent.com',
      clientSecret: 'EirwtJZ8-tw-eLHEdsOpdk_M',
      callbackURL: '/user/auth/google/callback',
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        console.log(profile);
        const isExist = await userModel.getUserByIdGoogle(profile.id);
        if (!isExist) await userModel.insertNewAccountGoogle(profile._json);
        return done(null, profile);
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
