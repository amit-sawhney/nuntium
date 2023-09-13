import AbstractCommand from '@/api/abstract-command';
import DuplicateEntityError from '@/core/error/duplicate-entity-error';
import SchemaValidationError from '@/core/error/schema-validation-error';
import logger from '@/core/logger/logger';
import MongoErrorCode from '@/core/mongo-constants';
import createHttpError from 'http-errors';
import { StatusCodes } from 'http-status-codes';
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
    logger.info('Creating user with local credentials');

    const exists = await UserModel.exists({ email });
    if (exists) {
      throw createHttpError(StatusCodes.CONFLICT, 'User already exists for provided payload.');
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
          throw createHttpError(StatusCodes.CONFLICT, 'User already exists for provided payload.');
        } else if (error.code === MongoErrorCode.SCHEMA_VALIDATION) {
          throw createHttpError(StatusCodes.BAD_REQUEST, 'Invalid payload.');
        }
      }

      throw createHttpError(StatusCodes.INTERNAL_SERVER_ERROR, 'Failed to create user.');
    }
  },
};

export default CreateUserWithCredentials;
