import { Form, NavLink } from 'react-router-dom';

const LoginPage = () => {
  return (
    <div className="flex h-full justify-center">
      <div className="space-y-8 w-full sm:w-4/5 md:w-3/5 pt-52">
        <h1 className="text-2xl text-black font-bold text-center w-full">
          Sign in to your account
        </h1>
        <Form className="space-y-6">
          <div className="space-y-1">
            <label htmlFor="email" className="font-medium">
              Email
            </label>
            <input
              name="email"
              type="text"
              placeholder="placeholder@gmail.com"
              className="w-full border border-gray-300 rounded-md py-2 px-3"
            />
          </div>
          <div className="space-y-1">
            <div className="flex">
              <label htmlFor="password" className="font-medium">
                Password
              </label>
              <NavLink
                to="/forgot-password"
                className="text-primary ml-auto font-medium"
              >
                Forgot password?
              </NavLink>
            </div>
            <input
              name="password"
              type="text"
              placeholder="********"
              className="w-full border border-gray-300 rounded-md py-2 px-3"
            />
          </div>
          <button
            type="submit"
            className="bg-primary text-white rounded-md py-2 w-full"
          >
            Sign in
          </button>
          <div className="flex justify-center">
            <span className="text-gray-500">Don't have an account?</span>
            <NavLink to="/register" className="text-primary ml-1 font-medium">
              Register
            </NavLink>
          </div>
           
          {/* 3rd part sign in options */}
          <div className="flex justify-center">
            <span className="text-gray-500">Or sign in with</span>
          </div>
          <div className="flex justify-center space-x-2">
            <button className="bg-white border border-gray-300 rounded-md py-2 px-3">
              <svg
                className="w-5 h-5 text-gray-500"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  // eslint-disable-next-line max-len
                  d="M10 0C4.477 0 0 4.477 0 10c0 4.142 2.69 7.648 6.432 8.9-.088-.79-.16-2.004-.16-2.86 0-1.3.72-2.38 1.8-2.94-.632-.09-1.3-.3-1.3-.64 0-1.58 2.3-2.72 4.2-2.72 1.16 0 2.2.5 2.8 1.3.84-.16 1.64-.47 2.36-.9-.28.86-.86 1.58-1.62 2.04.74-.08 1.44-.28 2.08-.56-.48.74-1.1 1.38-1.82 1.8.84-.1 1.64-.32 2.38-.64-.56.8-1.28 1.5-2.1 2.04v.06c0 .44-.04.86-.14 1.24C16.38 16.64 20 13.14 20 10c0-5.523-4.477-10-10-10"
                />
              </svg>
            </button>
            <button className="bg-white border border-gray-300 rounded-md py-2 px-3">
              <svg
                className="w-5 h-5 text-gray-500"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  // eslint-disable-next-line max-len
                  d="M10 0C4.477 0 0 4.477 0 10c0 4.142 2.69 7.648 6.432 8.9-.088-.79-.16-2.004-.16-2.86 0-1.3.72-2.38 1.8-2.94-.632-.09-1.3-.3-1.3-.64 0-1.58 2.3-2.72 4.2-2.72 1.16 0 2.2.5 2.8 1.3.84-.16 1.64-.47 2.36-.9-.28.86-.86 1.58-1.62 2.04.74-.08 1.44-.28 2.08-.56-.48.74-1.1 1.38-1.82 1.8.84-.1 1.64-.32 2.38-.64-.56.8-1.28 1.5-2.1 2.04v.06c0 .44-.04.86-.14 1.24C16.38 16.64 20 13.14 20 10c0-5.523-4.477-10-10-10"
                />
              </svg>
            </button>
            <button className="bg-white border border-gray-300 rounded-md py-2 px-3">
              <svg
                className="w-5 h-5 text-gray-500"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  // eslint-disable-next-line max-len
                  d="M10 0C4.477 0 0 4.477 0 10c0 4.142 2.69 7.648 6.432 8.9-.088-.79-.16-2.004-.16-2.86 0-1.3.72-2.38 1.8-2.94-.632-.09-1.3-.3-1.3-.64 0-1.58 2.3-2.72 4.2-2.72 1.16 0 2.2.5 2.8 1.3.84-.16 1.64-.47 2.36-.9-.28.86-.86 1.58-1.62 2.04.74-.08 1.44-.28 2.08-.56-.48.74-1.1 1.38-1.82 1.8.84-.1 1.64-.32 2.38-.64-.56.8-1.28 1.5-2.1 2.04v.06c0 .44-.04.86-.14 1.24C16.38 16.64 20 13.14 20 10c0-5.523-4.477-10-10-10"
                />
              </svg>
            </button>
          </div>
          
                  
        </Form>
      </div>
    </div>
  );
};

export default LoginPage;
