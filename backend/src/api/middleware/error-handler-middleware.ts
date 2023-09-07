import { NextFunction, Request, Response } from 'express';
import { ZodError } from 'zod';
import HttpStatus from 'http-status-codes';

import logger from '@/core/logger/logger';
import { MongoError } from 'mongodb';
import MongoErrorCode from '@/core/mongo-constants';
import ApplicationError from '@/core/error/application-error';
import createHttpError from 'http-errors';

const errorHandler = (err: Error, _req: Request, res: Response, _next: NextFunction): void => {
  const createResponse = (statusCode: number, message: string): void => {
    res.status(statusCode).json({ message });
  };

  logger.error(err.message);

  if (err instanceof ZodError) {
    const message = err.errors.map((e) => `[${e.path}] ${e.message}`).join('. ');

    return createResponse(HttpStatus.UNPROCESSABLE_ENTITY, message);
  } else if (err instanceof MongoError) {
    // Handle duplicate key error
    if (err.code == MongoErrorCode.DUPLICATE_KEY) {
      return createResponse(HttpStatus.CONFLICT, 'Unable to create entity due to duplicate data');
    }

    // Handle validation error when creating/updating entity
    if (err.name === 'ValidationError') {
      return createResponse(
        HttpStatus.UNPROCESSABLE_ENTITY,
        'Unable to process entity due to invalid data',
      );
    }

    // Catch mongo errors
    return createResponse(HttpStatus.INTERNAL_SERVER_ERROR, 'Unexpected error');
  } else if (err instanceof ApplicationError) {
    // Pass application errors through
    return createResponse(err.statusCode, err.message);
  } else if (err instanceof createHttpError.HttpError) {
    // Pass http errors through
    return createResponse(err.statusCode, err.message);
  }

  // Catch all other errors
  return createResponse(HttpStatus.INTERNAL_SERVER_ERROR, 'Unexpected error');
};

export default errorHandler;
