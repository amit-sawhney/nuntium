import PinoHttp from 'pino-http';

import requestDevelopmentLogger from '../request-development-logger';
import requestProductionLogger from '../request-production-logger';

const requestDevelopmentMiddelware = PinoHttp({ logger: requestDevelopmentLogger });
const requestProductionMiddleware = PinoHttp({ logger: requestProductionLogger });

export { requestDevelopmentMiddelware, requestProductionMiddleware };
