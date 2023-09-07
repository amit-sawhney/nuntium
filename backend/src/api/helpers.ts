import { compose } from 'compose-middleware';
import { Router } from 'express';
import AbstractMethod from './abstract-method';

export const createRoute = (router: Router, method: AbstractMethod) => {
  const sortedParams = method.params ? Object.keys(method.params).sort() : [];
  const endpoint = `${method.path}/${sortedParams.map((key) => `:${key}`).join('/')}`;

  router[method.method](endpoint, compose(method.middleware ?? []), async (req, res) => {
    // Validate request
    method.body?.parse(req.body);
    method.params?.parse(req.params);
    method.query?.parse(req.query);

    method.validate?.(req);

    // Execute method
    res.json(await method.execute(req as any));
  });
};
