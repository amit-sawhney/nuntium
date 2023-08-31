import { StatusCodes } from 'http-status-codes';

import ApplicationError from './application-error';

class SchemaValidationError extends ApplicationError {
  constructor(message: string, object: object = {}) {
    super(message, {
      statusCode: StatusCodes.UNPROCESSABLE_ENTITY,
      displayName: 'SchemaValidationError',
      ...object,
    });
  }
}

export default SchemaValidationError;
