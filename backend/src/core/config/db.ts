import mongoose from 'mongoose';

import logger from '../logger/logger';

import env from './env';

mongoose.connect(env.MONGO_DB_URL, {});

mongoose.Promise = global.Promise;

mongoose.connection
  .once('open', () => logger.info('Successfully connected to MongoDB instance'))
  .on('error', (error) => logger.info('Error connecting to MongoDB instance:', error));
