import { Request } from 'express';
import createHttpError from 'http-errors';
import { StatusCodes } from 'http-status-codes';
import { Schema } from 'mongoose';
import { z } from 'zod';

import AbstractMethod from '@/api/abstract-method';
import { ApiMethod } from '@/api/constants';
import { User, UserSchema } from '@/user/model/user-model';
import requireLoginMiddleware from '../middleware/require-login-middleware';
import CreateJwtTokenCommand from '../command/create-jwt-token-command';
import UpdateUserRefreshToken from '@/user/command/update-user-refresh-token-command';
import { buildTokenCookie } from '../helpers';
import env from '@/core/env';

interface Body {
  email: string;
  password: string;
}

interface Response {
  message?: string;
  user: User;
}

type MethodRequest = Request<unknown, unknown, Body, unknown>;

class LoginWithCredentialsMethod implements AbstractMethod<never, Body, never, Response> {
  method = ApiMethod.POST;
  path = '/auth/login';

  middleware = [requireLoginMiddleware];

  response = new Schema({
    message: Schema.Types.String,
    user: UserSchema,
  });

  body = z.object({
    email: z.string().email(),
    password: z.string().min(8),
  });

  execute(req: MethodRequest): Response {
    if (!req.user) {
      throw createHttpError(StatusCodes.UNAUTHORIZED, 'Unauthorized');
    }

    const accessToken = CreateJwtTokenCommand.call({ email: req.user.email, type: 'access' });
    const refreshToken = CreateJwtTokenCommand.call({ email: req.user.email, type: 'refresh' });

    UpdateUserRefreshToken.call({ _id: req.user._id, refreshToken });

    // Grant new tokens because their credentials have been validated
    const accessTokenCookie = buildTokenCookie({
      type: 'access',
      token: accessToken,
      maxAge: env.JWT_ACCESS_TOKEN_EXPIRES_IN,
    });

    const refreshTokenCookie = buildTokenCookie({
      type: 'refresh',
      token: refreshToken,
      maxAge: env.JWT_REFRESH_TOKEN_EXPIRES_IN,
    });

    req.res?.setHeader('Set-Cookie', [accessTokenCookie, refreshTokenCookie]);

    return {
      user: req.user,
      message: 'Logged in successfully',
    };
  }
}

export default LoginWithCredentialsMethod;
