import pino, { LoggerOptions } from 'pino';

import env, { isProduction } from '../env';

const transport = pino.transport({
  target: '@logtail/pino',
  options: { sourceToken: env.LOGTAIL_TOKEN },
});
const options: LoggerOptions = { level: 'info', enabled: isProduction(), msgPrefix: '[HTTP]' };

export default pino(options, transport);
