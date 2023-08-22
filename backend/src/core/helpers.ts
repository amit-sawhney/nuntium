import { ObjectId } from 'mongodb';

/**
 * Generates a token with a prefix of the form `${prefix}_${ObjectId}`
 *
 * @param prefix the prefix to use
 * @returns the generated token
 */
export const createTypedToken = (prefix: string): string =>
  `${prefix}_${new ObjectId().toString()}`;
