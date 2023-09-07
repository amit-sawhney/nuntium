import bcrypt from 'bcrypt';
import { Request } from 'express';
import { Schema, SchemaTypes } from 'mongoose';
import zod from 'zod';

import AbstractMethod from '@/api/abstract-method';
import { User, UserSchema } from '@/user/model/user-model';
import { ApiMethod } from '@/api/constants';
import CreateUserWithCredentials from '@/user/command/create-user-with-credentials';
import CreateJwtTokenCommand from '../command/create-jwt-token-command';
import * as Helpers from '../helpers';
import env from '@/core/env';

interface Body {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

interface Response {
  message?: string;
  user: User;
}

type MethodRequest = Request<unknown, unknown, Body, unknown>;

class RegisterCredentialsMethod implements AbstractMethod<never, Body, never, Response> {
  method = ApiMethod.POST;
  path = '/auth/register';

  body = zod.object({
    email: zod.string().email(),
    password: zod.string().min(8),
    firstName: zod.string(),
    lastName: zod.string(),
  });

  response = new Schema({
    message: SchemaTypes.String,
    user: UserSchema,
  });

  async execute(req: MethodRequest): Promise<Response> {
    const { email, password, firstName, lastName } = req.body;

    const [hash, salt] = await hashPassword(password);

    const accessToken = CreateJwtTokenCommand.call({
      email,
      type: 'access',
    });

    const refreshToken = CreateJwtTokenCommand.call({
      email,
      type: 'refresh',
    });

    const user = await CreateUserWithCredentials.call({
      email,
      password: hash,
      refreshToken: refreshToken,
      salt,
      firstName,
      lastName,
      newsroom: '',
    });

    const accessTokenCookie = Helpers.buildTokenCookie({
      type: 'access',
      token: accessToken,
      maxAge: env.JWT_ACCESS_TOKEN_EXPIRES_IN,
    });

    const refreshTokenCookie = Helpers.buildTokenCookie({
      type: 'refresh',
      token: refreshToken,
      maxAge: env.JWT_REFRESH_TOKEN_EXPIRES_IN,
    });

    // Set the authentication cookies
    req.res?.setHeader('Set-Cookie', [accessTokenCookie, refreshTokenCookie]);

    return { user };
  }
}

const hashPassword = async (password: string): Promise<[string, string]> => {
  const rounds = 10;
  const salt = await bcrypt.genSalt(rounds);
  const passwordHash = await bcrypt.hash(password, salt);

  return [passwordHash, salt];
};

export default RegisterCredentialsMethod;
