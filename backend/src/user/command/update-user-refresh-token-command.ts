import AbstractCommand from '@/api/abstract-command';
import logger from '@/core/logger/logger';

import { User } from '../model/user-model';
import { fetchUserById } from '../loaders';
import createHttpError from 'http-errors';
import { StatusCodes } from 'http-status-codes';

interface Props {
  _id: string;
  refreshToken: string;
}

const UpdateUserRefreshToken: AbstractCommand<Props, Promise<User>> = {
  async call({ _id, refreshToken }) {
    logger.trace('Updating user refresh token', { _id });

    const user = await fetchUserById({ userId: _id });

    if (!user) {
      throw createHttpError(StatusCodes.NOT_FOUND, 'User not found');
    }

    user.refreshToken = refreshToken;
    await user.save();

    logger.trace('Updating user refresh token', { _id });
    return user;
  },
};

export default UpdateUserRefreshToken;
