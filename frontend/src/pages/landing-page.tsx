import { Outlet } from 'react-router-dom';

const LandingPage = (): JSX.Element => {
  return (
    <main aria-label="Landing page">
      <div className="w-full lg:w-1/2">
        <h1 className="text-xl sm:text-3xl md:text-5xl lg:text-7xl font-bold pt-56">
          Real news starts here.
        </h1>
        <Outlet />
      </div>
    </main>
  );
};

export default LandingPage;
