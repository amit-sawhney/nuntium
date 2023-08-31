import HttpStatus from 'http-status-codes';
import { object } from 'zod';

interface ApplicationErrorOptions {
  statusCode?: number;
  displayName?: string;
  object?: object;
}
class ApplicationError extends Error {
  statusCode: number = HttpStatus.BAD_REQUEST;
  displayName: string | null = null;

  object: object | null = null;

  constructor(message: string, options: ApplicationErrorOptions) {
    super(message);

    if (options.statusCode) {
      this.statusCode = options.statusCode;
    }

    if (options.displayName) {
      this.displayName = options.displayName;
    }

    if (options.object) {
      this.object = options.object;
    }
  }
}

export default ApplicationError;
