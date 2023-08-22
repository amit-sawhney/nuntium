import pino, { LoggerOptions, TransportTargetOptions } from 'pino';

import env from './config/env';
import { isProduction } from './config/helper';

// Log to stdout and pretty-print
const targets: TransportTargetOptions[] = [
  {
    level: 'info',
    target: 'pino-http-print',
    options: {},
  },
];

// Log to Logtail only in production
if (isProduction()) {
  targets.push({
    level: 'info',
    target: '@logtail/pino',
    options: {
      sourceToken: env.LOGTAIL_TOKEN,
    },
  });
}

const transport = pino.transport({ targets });
const options: LoggerOptions = { level: 'info' };

export default pino(options, transport);
