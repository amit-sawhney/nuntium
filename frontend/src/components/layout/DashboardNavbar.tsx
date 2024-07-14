import { NavLink } from 'react-router-dom';

export const DashboardNavbar = () => (
  <nav className="flex align-middle m-auto px-5 lg:px-52 h-16 items-center">
    <NavLink to="/">Nuntium</NavLink>
    <ul className="ml-auto flex justify-center gap-2 sm:gap-10">
      <li className="mt-auto mb-auto">
        <NavLink to="/pricing">Pricing</NavLink>
      </li>
      <li className="mt-auto mb-auto">
        <NavLink to="/contact">Contact</NavLink>
      </li>
      <li className="mt-auto mb-auto">
        <NavLink to="/login">Login</NavLink>
      </li>
    </ul>
  </nav>
);
