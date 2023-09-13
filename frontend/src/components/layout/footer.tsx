import { NavLink } from 'react-router-dom';

export const Footer = () => (
  <footer className="flex mt-auto h-16 bg-gray-50 items-center p-3 justify-center">
    <p className="text-gray-800 text-sm">
      &copy; {new Date().getFullYear()} Nuntium
    </p>
    <p className="text-gray-800 text-sm mx-3">|</p>
    <p className="text-gray-800 text-sm">
      <NavLink to="/terms-of-service">Terms of Service</NavLink>
    </p>
    <p className="text-gray-800 text-sm mx-3">|</p>
    <p className="text-gray-800 text-sm">
      <NavLink to="/privacy-policy">Privacy Policy</NavLink>
    </p>
  </footer>
);
