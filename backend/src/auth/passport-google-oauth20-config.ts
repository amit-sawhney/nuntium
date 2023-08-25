import passport from 'passport';
import { Strategy as GoogleStrategy, VerifyCallback } from 'passport-google-oauth20';

import env from '@/core/config/env';
import UserModel from '@/user/model/user-model';

passport.use(
  new GoogleStrategy(
    {
      clientID: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
      callbackURL: env.GOOGLE_CALLBACK_URL,
    },
    async (accessToken: string, refreshToken: string, profile: any, done: VerifyCallback) => {
      const user = await UserModel.findOne({ oauthID: profile.id });
      if (user) {
        // user already exists
        done(null, user);
      } else {
        // create new user
        const user = new UserModel({
          oauthID: profile.id,
          firstName: profile.name.givenName,
          lastName: profile.name.familyName,
          email: profile.emails[0].value,
          role: UserRole.PENDING,
          profilePic: profile.photos[0].value,
        });

        user.save();

        done(null, user);
      }
    },
  ),
);
