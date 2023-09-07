
import { Router } from 'express';
import { compose } from 'compose-middleware';

import AbstractMethod from './abstract-method';

import FindAllUsersMethod from "@/user/method/find-all-users-method.js";
import RegisterCredentialsMethod from "@/auth/method/register-credentials-method.js";

const autogenRouter = Router();


const createRoute = (method: AbstractMethod) => {
  autogenRouter[method.method](method.path, compose(method.middleware ?? []), async (req, res) => {
        // Validate request
        method.body?.parse(req.body);
        method.params?.parse(req.params);
        method.query?.parse(req.query);
        
        method.validate?.(req);

        // Execute method
        res.json(await method.execute(req as any));
    });
};

createRoute(new FindAllUsersMethod());
createRoute(new RegisterCredentialsMethod());

export default autogenRouter;
