import { IStrategyOptions, Strategy as LocalStrategy, VerifyFunction } from 'passport-local';
import UserModel from '@/user/model/user-model';

const options: IStrategyOptions = {
  usernameField: 'email',
  passwordField: 'password',
};

const verifyCb: VerifyFunction = async (email, password, done): Promise<void> => {
  const maybeUser = await UserModel.find({ email }).limit(1).exec();

  if (maybeUser.length === 0) {
    return done(null, false, { message: 'User not found' });
  }

  const user = maybeUser[0];

  const isValidPassword = await user.isValidPassword(password);

  if (!isValidPassword) {
    return done(null, false, { message: 'Wrong Password' });
  }

  return done(null, user, { message: 'Logged in Successfully' });
};

const localLoginStrategy = new LocalStrategy(options, verifyCb);
export default localLoginStrategy;
