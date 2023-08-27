import HttpStatus from 'http-status-codes';

class ApplicationError extends Error {
  statusCode: number = HttpStatus.BAD_REQUEST;
  displayName: string | null = null;

  constructor(message: string) {
    super(message);
  }
}

export default ApplicationError;
