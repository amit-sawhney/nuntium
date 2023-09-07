import { Router } from 'express';

import { createRoute } from './helpers';

import FindAllUsersMethod from '@/user/method/find-all-users-method.js';
import RegisterCredentialsMethod from '@/auth/method/register-credentials-method.js';

const autogenRouter = Router();

createRoute(autogenRouter, new FindAllUsersMethod());
createRoute(autogenRouter, new RegisterCredentialsMethod());

export default autogenRouter;
