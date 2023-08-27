import { StatusCodes } from 'http-status-codes';

import ApplicationError from '@/core/application-error';

class DuplicateUserError extends ApplicationError {
  statusCode = StatusCodes.BAD_REQUEST;
  displayName = 'DuplicateUserError';

  object: object;

  constructor(message: string, object: object = {}) {
    super(message);
    this.object = object;
  }
}

export default DuplicateUserError;
