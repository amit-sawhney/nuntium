import zod from 'zod';

/**
 * PLEASE DO NOT ACCESS ENVIRONMENT `process.env` OUTSIDE THIS FILE.
 */

const envSchema = zod.object({
  NODE_ENV: zod.enum(['development', 'production', 'test']),
  PORT: zod.string().default('5000'),
  MONGO_DB_URL: zod.string(),
  LOGTAIL_TOKEN: zod.string(),
  JWT_ACCESS_TOKEN_SECRET: zod.string(),
  JWT_ACCESS_TOKEN_EXPIRES_IN: zod.string(),
  JWT_REFRESH_TOKEN_SECRET: zod.string(),
  JWT_REFRESH_TOKEN_EXPIRES_IN: zod.string(),
  GOOGLE_CLIENT_ID: zod.string(),
  GOOGLE_CLIENT_SECRET: zod.string(),
  GOOGLE_CALLBACK_URL: zod.string(),
  SESSION_SECRET: zod.string(),
});

const env = envSchema.parse(process.env);

export const isProduction = () => env.NODE_ENV === 'production';

export const isTest = () => env.NODE_ENV === 'test';

export const isDevelopment = () => env.NODE_ENV === 'development';

export default env;
