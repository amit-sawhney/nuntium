import { Request } from 'express';
import { Schema as ZodSchema } from 'zod';
import { Schema as MongooseSchema } from 'mongoose';
import { ApiMethod } from './constants';

interface AbstractMethod<Params = unknown, Body = unknown, Query = unknown, Response = unknown> {
  method: ApiMethod;
  path: string;

  params?: ZodSchema<Params>;
  body?: ZodSchema<Body>;
  query?: ZodSchema<Query>;
  response: MongooseSchema<Response>;

  execute(req: Request<Params, unknown, Body, Query>): Promise<any>;

  validate?(req: Request<Params, unknown, Body, Query>): Promise<void>;
}

export default AbstractMethod;
