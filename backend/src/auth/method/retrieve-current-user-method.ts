import AbstractMethod from '@/api/abstract-method';
import { ApiMethod } from '@/api/constants';
import { User, UserSchema } from '@/user/model/user-model';
import { Request } from 'express';
import { Schema } from 'mongoose';

interface Response {
  message?: string;
  user: User | null;
}

type MethodRequest = Request<never, unknown, never, never>;

class RetreiveCurrentUserMethod implements AbstractMethod<never, never, never, Response> {
  method = ApiMethod.GET;
  path = '/auth/current-user';

  response = new Schema({
    message: Schema.Types.String,
    user: {
      type: UserSchema,
      default: null,
    },
  });

  execute(req: MethodRequest): Response {
    if (!req.user) {
      return {
        message: 'User is not logged in',
        user: null,
      };
    }

    return {
      message: 'User is logged in',
      user: req.user,
    };
  }
}

export default RetreiveCurrentUserMethod;
