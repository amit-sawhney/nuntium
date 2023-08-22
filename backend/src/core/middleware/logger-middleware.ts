import PinoHttp from 'pino-http';

import requestDevelopmentLogger from '../logger/request-development-logger';
import requestProductionLogger from '../logger/request-production-logger';

const requestDevelopmentMiddelware = PinoHttp({ logger: requestDevelopmentLogger });
const requestProductionMiddleware = PinoHttp({ logger: requestProductionLogger });

export { requestDevelopmentMiddelware, requestProductionMiddleware };
