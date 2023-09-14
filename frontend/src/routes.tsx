import { createRoutesFromElements, Outlet, Route } from 'react-router-dom';

import RootPage from '@/features/@RootPage';
import LandingPage from '@/features/public/@LandingPage';
import {
  handleLoginAction,
  handleRegisterAction,
  LoginPage,
  redirectIfUnauthorized,
  RegisterPage,
} from '@/features/auth';
import loadCurrentUser from './features/auth/helpers/load-current-user-loader';

export const routes = createRoutesFromElements(
  <Route path="/" loader={loadCurrentUser} element={<RootPage />}>
    <Route path="/" element={<LandingPage />} />
    <Route path="pricing" element={<h1>Pricing</h1>} />
    <Route path="contact" element={<h1>Contact</h1>} />
    <Route path="terms-of-service" element={<h1>Terms of Service</h1>} />
    <Route path="privacy-policy" element={<h1>Privacy Policy</h1>} />
    <Route
      path="register"
      action={handleRegisterAction}
      element={<RegisterPage />}
    />
    <Route path="login" action={handleLoginAction} element={<LoginPage />} />
    <Route
      path="dashboard"
      loader={redirectIfUnauthorized}
      element={<Outlet />}
    >
      <Route path="dashboard" element={<h1>Dashboard</h1>} />
    </Route>
  </Route>,
);
