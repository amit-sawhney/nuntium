import { createRoutesFromElements, Route } from 'react-router-dom';

import RootPage from '@/features/@RootPage';
import LandingPage from '@/features/public/@LandingPage';
import { handleRegisterAction, LoginPage, RegisterPage } from '@/features/auth';

export const routes = createRoutesFromElements(
  <Route path="/" element={<RootPage />}>
    <Route path="/" element={<LandingPage />} />
    <Route path="pricing" element={<h1>test</h1>} />
    <Route path="contact" element={<h1>Contact</h1>} />
    <Route
      path="register"
      action={handleRegisterAction}
      element={<RegisterPage />}
    />
    <Route path="login" element={<LoginPage />} />
  </Route>,
);
