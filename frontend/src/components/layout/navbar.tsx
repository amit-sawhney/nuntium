import { ArrowRightIcon } from '@heroicons/react/24/solid';
import { NavLink } from 'react-router-dom';

const NavListItem = ({ children }: { children: React.ReactNode }) => (
  <li className="mt-auto mb-auto">{children}</li>
);
interface NavbarProps {
  isLoggedIn?: boolean;
}

export const Navbar = ({ isLoggedIn = false }: NavbarProps) => {
  return (
    <nav className="flex align-middle m-auto px-5 lg:px-52 h-16 items-center">
      <NavLink to="/">Nuntium</NavLink>
      <ul className="ml-auto flex justify-center gap-2 sm:gap-10">
        <NavListItem>
          <NavLink to="/pricing">Pricing</NavLink>
        </NavListItem>
        <NavListItem>
          <NavLink to="/contact">Contact</NavLink>
        </NavListItem>
        <NavListItem>
          {isLoggedIn ? (
            <NavLink
              to="/dashboard"
              className="bg-primary flex align-middle px-5 py-2 rounded-full text-white group"
            >
              View Dashboard
              <ArrowRightIcon className="inline-block ml-2 w-5 group-hover:translate-x-2 transition-transform" />
            </NavLink>
          ) : (
            <NavLink to="/login">Login</NavLink>
          )}
        </NavListItem>
      </ul>
    </nav>
  );
};
