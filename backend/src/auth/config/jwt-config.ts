import { Strategy as JwtStrategy, ExtractJwt, VerifyCallback } from 'passport-jwt';

import env from '@/core/env';
import UserModel from '@/user/model/user-model';

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: env.JWT_ACCESS_TOKEN_EXPIRES_IN,
};

const verifyCb: VerifyCallback = async (payload: any, done) => {
  const user = UserModel.queryByEmail(payload.email);

  if (!user) {
    return done(null, false);
  }

  return done(null, payload);
};

const jwtStrategy = new JwtStrategy(options, verifyCb);
export default jwtStrategy;
