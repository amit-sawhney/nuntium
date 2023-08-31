import { StatusCodes } from 'http-status-codes';

import ApplicationError from './application-error';

class DuplicateEntityError extends ApplicationError {
  constructor(message: string, object: object = {}) {
    super(message, {
      statusCode: StatusCodes.CONFLICT,
      displayName: 'DuplicateEntityError',
      ...object,
    });
  }
}

export default DuplicateEntityError;
