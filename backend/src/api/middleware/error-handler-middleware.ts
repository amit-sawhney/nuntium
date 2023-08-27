import { NextFunction, Request, Response } from 'express';
import { ZodError } from 'zod';
import HttpStatus from 'http-status-codes';

import logger from '@/core/logger/logger';

const errorHandler = (err: Error, _req: Request, res: Response, _next: NextFunction): void => {
  logger.error(err.message);

  if (err instanceof ZodError) {
    const message = err.errors.map((e) => `[${e.path}] ${e.message}`).join('. ');

    res.status(HttpStatus.BAD_REQUEST).json({ message });
    return;
  }

  res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
    message: err.message,
  });
};

export default errorHandler;
