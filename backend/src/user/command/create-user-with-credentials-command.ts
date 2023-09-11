import AbstractCommand from '@/api/abstract-command';
import DuplicateEntityError from '@/core/error/duplicate-entity-error';
import SchemaValidationError from '@/core/error/schema-validation-error';
import logger from '@/core/logger/logger';
import MongoErrorCode from '@/core/mongo-constants';
import { MongoError } from 'mongodb';

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
      throw new DuplicateEntityError('User already exists for email');
    }

    try {
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
    } catch (error) {
      if (error instanceof MongoError) {
        if (error.code === MongoErrorCode.DUPLICATE_KEY) {
          throw new DuplicateEntityError('User already exists for provided payload', {
            error,
          });
        } else if (error.code === MongoErrorCode.SCHEMA_VALIDATION) {
          throw new SchemaValidationError('Failed to create user due to invalid data', {
            error,
          });
        }
      }

      throw new Error(
        'Unexpected error while creating user with local credentials: ' + JSON.stringify(error),
      );
    }
  },
};

export default CreateUserWithCredentials;
