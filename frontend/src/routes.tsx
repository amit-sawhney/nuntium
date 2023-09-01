import { createRoutesFromElements, Route } from 'react-router-dom';

import { LandingPage, LoginPage, RootPage } from './pages';

export const routes = createRoutesFromElements(
  <Route path="/" element={<RootPage />}>
    <Route path="/" element={<LandingPage />} />
    <Route path="pricing" element={<h1>test</h1>} />
    <Route path="contact" element={<h1>Contact</h1>} />
    <Route path="sign-in" element={<LoginPage />} />
  </Route>,
);