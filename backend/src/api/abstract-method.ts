import { NextFunction, Request, RequestHandler } from 'express';
import { Schema as ZodSchema } from 'zod';
import { Schema as MongooseSchema } from 'mongoose';

import { ApiMethod } from './constants';
import { Handler } from 'compose-middleware';

type Middleware = Handler<any, any, any>;

interface AbstractMethod<Params = any, Body = any, Query = any, Response = any> {
  method: ApiMethod;
  path: string;

  middleware?: Middleware[];
  permission?: string;

  params?: ZodSchema<Params>;
  body?: ZodSchema<Body>;
  query?: ZodSchema<Query>;

  response: MongooseSchema<Response>;

  execute(req: Request<Params, unknown, Body, Query>): Promise<Response>;

  validate?(req: Request<Params, unknown, Body, Query>): Promise<void>;
}

export default AbstractMethod;
