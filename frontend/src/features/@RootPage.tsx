import { Outlet, useLoaderData, useMatch } from 'react-router-dom';
import { Footer, Navbar } from '../components';
import { LoadCurrentUserLoaderData } from './auth/helpers/load-current-user-loader';

const RootPage = () => {
  const isDashboard = useMatch('/dashboard');
  const { user } = useLoaderData() as LoadCurrentUserLoaderData;

  return (
    <div className="w-full h-full">
      {!isDashboard && <Navbar isLoggedIn={user !== null} />}
      <div className="px-5 lg:px-52 h-[calc(100%-4rem)] -mt-[2rem] sm:mt-0">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default RootPage;
