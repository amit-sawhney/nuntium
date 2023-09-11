import { NavLink } from 'react-router-dom';

export const Navbar = () => {
  return (
    <nav className="flex m-auto px-5 lg:px-52 h-16 items-center">
      <NavLink to="/">Nuntium</NavLink>
      <ul className="ml-auto flex gap-2 sm:gap-10">
        <li>
          <NavLink to="/pricing">Pricing</NavLink>
        </li>
        <li>
          <NavLink to="/contact">Contact</NavLink>
        </li>
        <li>
          <NavLink to="/login">Sign In</NavLink>
        </li>
      </ul>
    </nav>
  );
};
