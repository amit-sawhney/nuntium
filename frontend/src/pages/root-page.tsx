import { Outlet } from 'react-router-dom';
import { Footer, Navbar } from '../components';

const RootPage = () => {
  return (
    <div className="w-full h-full">
      <Navbar />
      <div className="px-5 lg:px-52 h-full -mt-[2rem] sm:mt-0">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default RootPage;
