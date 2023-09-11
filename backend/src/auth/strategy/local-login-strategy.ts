import { IStrategyOptions, Strategy as LocalStrategy, VerifyFunction } from 'passport-local';

import { fetchUserByEmail } from '@/user/loaders';

const options: IStrategyOptions = {
  usernameField: 'email',
  passwordField: 'password',
};

const verifyCb: VerifyFunction = async (email, password, done): Promise<void> => {
  const user = await fetchUserByEmail({ email, includePassword: true });

  if (user === null) {
    return done(null, false, { message: 'User not found' });
  }

  const isValidPassword = await user.isValidPassword(password);

  // We don't want to serialize the password
  user.password = undefined;

  if (!isValidPassword) {
    return done(null, false, { message: 'Wrong Password' });
  }

  return done(null, user, { message: 'Logged in Successfully' });
};

const localLoginStrategy = new LocalStrategy(options, verifyCb);
export default localLoginStrategy;
