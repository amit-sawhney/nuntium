import { NavLink } from 'react-router-dom';

const LandingPage = (): JSX.Element => {
  return (
    <main aria-label="Landing page">
      <div className="w-full lg:w-1/2">
        <h1 className="text-xl sm:text-3xl md:text-5xl lg:text-7xl font-bold pt-56">
          Real news starts here.
        </h1>
        <p className="text-gray-500 text-sm sm:text-base md:text-lg lg:text-xl pt-4">
          Organizing and delivering entrusted, reliable news has never been
          easier.
        </p>
        <div className="flex pt-8">
          <NavLink
            to="register"
            className="bg-primary text-white rounded-md py-2 px-4"
          >
            Get started
          </NavLink>
          <button className="bg-white text-primary rounded-md py-2 px-4 ml-4">
            Learn more
          </button>
        </div>
      </div>
    </main>
  );
};

export default LandingPage;
