import passport from 'passport';

import UserModel, { User } from '@/user/model/user-model';

// import googleStrategy from './google-config';
// import jwtStrategy from './jwt-config';
import localLoginStrategy from '../strategy/local-login-strategy';

passport.serializeUser((user: User, done) => {
  done(null, user._id);
});

passport.deserializeUser((userId, done) => {
  UserModel.find({ _id: userId })
    .then((user) => {
      if (user.length === 0) {
        done({ error: 'No user found to deserialize' });
      }

      done(null, user[0]);
    })
    .catch((err) => {
      done(err);
    });
});

// Strategies
// passport.use('google', googleStrategy);
// passport.use('jwt', jwtStrategy);
passport.use('login', localLoginStrategy);
