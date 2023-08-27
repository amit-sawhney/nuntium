import passport from 'passport';

import UserModel, { User } from '@/user/model/user-model';

import googleStrategy from './google-config';
import jwtStrategy from './jwt-config';
import localStrategy from '../strategy/local-login-strategy';

passport.serializeUser((user: User, done) => {
  done(null, user._id);
});

passport.deserializeUser((userId, done) => {
  UserModel.find({ _id: userId }, (err: unknown, user: User) => {
    if (err) {
      return done(err);
    }

    return done(null, user);
  });
});

// Strategies
passport.use('google', googleStrategy);
passport.use('jwt', jwtStrategy);
passport.use('signup', localStrategy);
