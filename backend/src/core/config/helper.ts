import env from './env';

export const isProduction = () => env.NODE_ENV === 'production';

export const isTest = () => env.NODE_ENV === 'test';

export const isDevelopment = () => env.NODE_ENV === 'development';
