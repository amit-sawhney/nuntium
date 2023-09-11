import AbstractMethod from '@/api/abstract-method';
import { ApiMethod } from '@/api/constants';
import { Request } from 'express';
import { StatusCodes } from 'http-status-codes';
import { Schema } from 'mongoose';

interface Response {
  message: string;
  status?: number;
}

type MethodRequest = Request<never, unknown, never, never, Response>;

class LogoutUserMethod implements AbstractMethod<never, never, never, Response> {
  method = ApiMethod.POST;
  path = '/auth/logout';

  response = new Schema({
    message: Schema.Types.String,
    status: {
      type: Schema.Types.Number,
      required: false,
    },
  });

  execute(req: MethodRequest): Response {
    if (!req.user) {
      return {
        message: 'User is not logged in',
        status: StatusCodes.ACCEPTED,
      };
    }

    req.res?.clearCookie('refreshToken');
    req.res?.clearCookie('accessToken');

    return {
      message: 'User logged out successfully',
    };
  }
}

export default LogoutUserMethod;
