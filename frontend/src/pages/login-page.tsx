import { useApi } from '@/api';
import { useEffect } from 'react';
import { Form, NavLink } from 'react-router-dom';

const Login = () => {
  const api = useApi();

  useEffect(() => {
    const res = api.findAllUsersMethod(
      { email: 'test@gmail' },
      { email: 'test@gmail' },
      { email: 'test@gmail' },
    );

    res.then((res) => {
      console.log(res.user);
    })
  });

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
        </Form>
      </div>
    </div>
  );
};

export default Login;
