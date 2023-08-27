import { Strategy as GoogleStrategy, VerifyCallback, Profile } from 'passport-google-oauth20';

import env from '@/core/config/env';
import UserModel from '@/user/model/user-model';
import { UserApplicationState, UserOnboardingState, UserRole } from '@/user/constants';

const secrets = {
  clientID: env.GOOGLE_CLIENT_ID,
  clientSecret: env.GOOGLE_CLIENT_SECRET,
  callbackURL: env.GOOGLE_CALLBACK_URL,
};

const verifyCb = async (
  _accessToken: string,
  _refreshToken: string,
  profile: Profile,
  done: VerifyCallback,
) => {
  const user = await UserModel.findOne({ oauthID: profile.id });

  if (user) {
    // user already exists
    done(null, user);
  } else {
    const user = await UserModel.create({
      // oauthID: profile.id,
      firstName: profile.name?.givenName,
      lastName: profile.name?.familyName,
      email: profile.emails?.[0].value,
      role: UserRole.PENDING,
      applicationState: UserApplicationState.IN_REVIEW,
      onboardingState: UserOnboardingState.UNSCHEDULED,
      // profilePic: profile.photos[0].value,
    });

    done(null, user);
  }
};

const googleStrategy = new GoogleStrategy(secrets, verifyCb);
export default googleStrategy;
