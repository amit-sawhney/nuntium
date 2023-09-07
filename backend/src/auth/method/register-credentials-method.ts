import bcrypt from 'bcrypt';
import { Request } from 'express';
import { Schema, SchemaTypes } from 'mongoose';
import zod from 'zod';

import AbstractMethod from '@/api/abstract-method';
import { User, UserSchema } from '@/user/model/user-model';
import { ApiMethod } from '@/api/constants';
import CreateUserWithCredentials from '@/user/command/create-user-with-credentials';

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
    piaa: zod.object({
      pooo: zod.array(
        zod.object({
          pisspoo: zod.number().optional(),
        }),
      ),
    }),
    summer: zod.array(
      zod.object({
        soccer: zod.string().optional(),
        pomona: zod.string().nullable(),
        random: zod.object({
          test: zod.number(),
        }),
      }),
    ),
  });

  response = new Schema({
    message: SchemaTypes.String,
    user: UserSchema,
  });

  async execute(req: MethodRequest): Promise<Response> {
    const { email, password, firstName, lastName } = req.body;

    const [hash, salt] = await hashPassword(password);

    const user = await CreateUserWithCredentials.call({
      email,
      password: hash,
      firstName,
      lastName,
      salt,
      refreshToken: '',
      newsroom: '',
    });

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
