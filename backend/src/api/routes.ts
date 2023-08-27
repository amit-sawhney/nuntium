import { Router } from 'express';

import RegisterUserMethod from '../auth/method/register-user-method';
import AbstractMethod from './abstract-method';

const router = Router();

// Create route for a method
const createRoute = (method: AbstractMethod) => {
  router[method.method](method.path, async (req, res) => {
    // Validate request
    method.body?.parse(req.body);
    method.params?.parse(req.params);
    method.query?.parse(req.query);

    method.validate?.(req);

    // Execute method
    res.json(await method.execute(req as any));
  });
};

/**
 * -------------------------------
 * ONLY CHANGE BELOW THIS LINE
 * -------------------------------
 */

// Register routes
createRoute(new RegisterUserMethod());

export default router;
