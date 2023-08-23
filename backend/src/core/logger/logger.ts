import pino, { TransportSingleOptions } from 'pino';

import { isProduction } from '../config/env';

// Choose transport based on environment
const getTransport = (): TransportSingleOptions => {
  if (isProduction()) {
    return {
      target: '@logtail/pino',
      options: { sourceToken: process.env.LOGTAIL_TOKEN },
    };
  }

  return { target: 'pino-http-print' };
};

/**
 * The default logger used throughout the application.
 */
const logger = pino({
  level: 'info',
  prettyPrint: {
    colorize: true,
    translateTime: 'yyyy-mm-dd HH:MM:ss',
  },
  transport: getTransport(),
});

export default logger;
