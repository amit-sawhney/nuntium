import zod from 'zod';
import { Request } from 'express';
import { Schema } from 'mongoose';

import AbstractMethod from '@/api/abstract-method';
import { ApiMethod } from '@/api/constants';
import { User, UserSchema } from '../model/user-model';

interface Params {
  email: string;
}

interface Body {
  email: string;
}

interface Response {
  message?: string;
  user: User | null;
}

interface Query {
  email: string;
}

type MethodRequest = Request<Params, Response, Body, Query>;

class RegisterCredentialsMethod implements AbstractMethod<Params, Body, Query, Response> {
  path = '/users';
  method = ApiMethod.GET;

  query = zod.object({
    email: zod.string().email(),
  });

  params = zod.object({
    email: zod.string().email(),
  });

  body = zod.object({
    email: zod.string().email(),
  });

  response = new Schema({
    message: Schema.Types.String,
    user: UserSchema,
  });

  async execute(_req: MethodRequest): Promise<Response> {
    return {
      message: 'User created successfully',
      user: null,
    };
  }
}

export default RegisterCredentialsMethod;
