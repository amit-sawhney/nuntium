import passport from 'passport';

import env from '@/core/config/env';
import UserModel, { User } from '@/user/model/user-model';

import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';

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

passport.use(
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: env.JWT_SECRET,
    },
    (jwtPayload, done) => {
      return done(null, jwtPayload);
    },
  ),
);
