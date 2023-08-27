import AbstractCommand from '@/api/abstract-command';
import logger from '@/core/logger/logger';
import DuplicateUserError from '../error/duplicate-user-error';

import UserModel, { User } from '../model/user-model';

interface Props {
  email: string;
  password: string;
  salt: string;
  firstName: string;
  lastName: string;
  newsroom: string;
  refreshToken: string;
  preferredName?: string;
  genders?: string[];
  pronouns?: string[];
  races?: string[];
  twitter?: string;
  instagram?: string;
  facebook?: string;
  portfolio?: string;
  linkedin?: string;
}

const CreateUserWithCredentials: AbstractCommand<Props, Promise<User>> = {
  async call({
    email,
    password,
    salt,
    refreshToken,
    firstName,
    lastName,
    newsroom,
    preferredName = null,
    genders = [],
    pronouns = [],
    races = [],
    twitter = null,
    instagram = null,
    facebook = null,
    portfolio = null,
    linkedin = null,
  }) {
    logger.trace('Creating user with local credentials');

    const exists = await UserModel.exists({ email });

    if (exists) {
      throw new DuplicateUserError('User with this email already exists', {
        email,
      });
    }

    const user = await UserModel.create({
      email,
      password,
      salt,
      refreshToken,
      firstName,
      lastName,
      newsroom,
      preferredName,
      genders,
      pronouns,
      races,
      twitter,
      instagram,
      facebook,
      portfolio,
      linkedin,
    });

    logger.trace('Successfully created user with local credentials');
    return user;
  },
};

export default CreateUserWithCredentials;
