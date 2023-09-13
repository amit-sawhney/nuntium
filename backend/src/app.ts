import createError from 'http-errors';
import HttpStatus from 'http-status-codes';
import cors from 'cors';
import express, { Request, Response } from 'express';
import helmet from 'helmet';
import passport from 'passport';
import session from 'express-session';
import 'express-async-errors';

import routes from './api/generated-routes';
import env, { isProduction } from './core/env';
import {
  requestDevelopmentMiddelware,
  requestProductionMiddleware,
} from './core/logger/middleware/logger-middleware';
import errorHandler from './api/middleware/error-handler-middleware';

const app = express();

// Connect to database
import './core/db';

// Session support
const sessionConfig = {
  secure: false,
  resave: true,
  saveUninitialized: true,
  secret: env.SESSION_SECRET,
};

if (isProduction()) {
  app.set('trust proxy', 1);
  sessionConfig.secure = true;
}
app.use(session(sessionConfig));

// Setup passport
import './auth/config/passport-config';
app.use(passport.initialize());
app.use(passport.session());

if (isProduction()) {
  app.use(requestProductionMiddleware);
} else {
  app.use(requestDevelopmentMiddelware);
}

app.use(helmet());
app.use(express.json({ limit: '2.1mb' }));
app.use(express.urlencoded({ limit: '2.1mb', extended: false }));

if (env.NODE_ENV !== 'production') {
  app.use(cors({ origin: /localhost:\d{4}/, credentials: true }));
}

// Routes
app.use('/api', routes);
app.get('/', (_req: Request, res: Response) => res.json('API working!'));

// Handle case when no route is matched
app.use(function (_req: Request, _res: Response, next) {
  next(createError(HttpStatus.NOT_FOUND));
});

app.use(errorHandler);

module.exports = app;
