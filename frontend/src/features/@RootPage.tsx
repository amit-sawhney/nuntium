import { Outlet, useMatch } from 'react-router-dom';
import { Footer, Navbar } from '../components';

const RootPage = () => {
  const isDashboard = useMatch('/dashboard');

  return (
    <div className="w-full h-full">
      {!isDashboard && <Navbar />}
      <div className="px-5 lg:px-52 h-[calc(100%-4rem)] -mt-[2rem] sm:mt-0">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default RootPage;
