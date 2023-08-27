import { Schema, SchemaTypes } from 'mongoose';
import zod from 'zod';
import bcrypt from 'bcrypt';

import AbstractMethod from '@/api/abstract-method';
import UserModel, { User, UserSchema } from '@/user/model/user-model';
import { ApiMethod } from '@/api/constants';
import { Request } from 'express';

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

class RegisterUserMethod implements AbstractMethod<never, Body, never, Response> {
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

    const passwordHash = await RegisterUserMethod.hashPassword(password);

    const user = await UserModel.create({
      email,
      password: passwordHash,
      firstName,
      lastName,
    });

    return {
      user,
    };
  }

  static async hashPassword(password: string): Promise<string> {
    const rounds = 10;
    const salt = await bcrypt.genSalt(rounds);
    const passwordHash = await bcrypt.hash(password, rounds);

    return passwordHash;
  }
}

export default RegisterUserMethod;
