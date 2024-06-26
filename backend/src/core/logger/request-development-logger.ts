import pino, { LoggerOptions } from 'pino';

// Log to stdout and pretty-print
const transport = pino.transport({ target: 'pino-http-print' });
const options: LoggerOptions = { level: 'info', msgPrefix: '[HTTP]' };

export default pino(options, transport);
