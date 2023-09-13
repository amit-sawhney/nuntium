import { Router } from 'express';

import { createRoute } from './helpers';

import FindAllUsersMethod from '@/user/method/find-all-users-method.js';
import LoginWithCredentialsMethod from '@/auth/method/login-with-credentials-method.js';
import LogoutUserMethod from '@/auth/method/logout-user-method.js';
import RegisterCredentialsMethod from '@/auth/method/register-credentials-method.js';
import RetrieveCurrentUserMethod from '@/auth/method/retrieve-current-user-method.js';

const autogenRouter = Router();

createRoute(autogenRouter, new FindAllUsersMethod());
createRoute(autogenRouter, new LoginWithCredentialsMethod());
createRoute(autogenRouter, new LogoutUserMethod());
createRoute(autogenRouter, new RegisterCredentialsMethod());
createRoute(autogenRouter, new RetrieveCurrentUserMethod());

export default autogenRouter;
