import mongoose from 'mongoose';

import env from './env';

mongoose.connect(env.MONGO_DB_URL, {});

mongoose.Promise = global.Promise;

mongoose.connection
  .once('open', () => console.log('Connected to MongoLab instance.'))
  .on('error', (error) => console.log('Error connecting to MongoLab:', error));
