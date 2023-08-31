import { StatusCodes } from 'http-status-codes';

import ApplicationError from '@/core/error/application-error';

class DuplicateUserError extends ApplicationError {
  constructor(message: string, object: object = {}) {
    super(message, {
      statusCode: StatusCodes.BAD_REQUEST,
      displayName: 'DuplicateUserError',
      ...object,
    });
  }
}

export default DuplicateUserError;
