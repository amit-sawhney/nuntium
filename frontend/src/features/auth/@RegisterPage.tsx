import { Form, NavLink } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';

import Input from '@/components/input';
import { PasswordInput } from './PasswordInput';

const RegisterPage = () => {
  const [isValidEmail, setIsValidEmail] = useState<boolean | null>(null);

  const validateEmail = (email: string) => {
    const re = /\S+@\S+\.\S+/;
    setIsValidEmail(re.test(email));
  };

  useEffect(() => {
    document.title = 'Register | Nuntium';
  }, []);

  return (
    <main aria-label="Register Page">
      <div className="flex h-full justify-center">
        <div className="space-y-8 w-full sm:w-4/5 md:w-3/5 pt-52">
          <h1 className="text-2xl text-black font-bold text-center w-full">
            Register for an account
          </h1>
          <Form className="space-y-6" method="post">
            <div className="flex w-full gap-x-5">
              <div className="w-full">
                <label htmlFor="first-name" className="font-medium">
                  First Name
                </label>
                <Input
                  autoComplete="given-name"
                  id="first-name"
                  name="first-name"
                  required
                  type="text"
                  placeholder="John"
                />
              </div>
              <div className="w-full">
                <label htmlFor="last-name" className="font-medium">
                  Last Name
                </label>
                <Input
                  autoComplete="family-name"
                  id="last-name"
                  name="last-name"
                  required
                  type="text"
                  placeholder="Doe"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label htmlFor="email" className="font-medium">
                Email
              </label>
              <Input
                autoComplete="email"
                id="email"
                name="email"
                required
                type="text"
                maxLength={100}
                placeholder="placeholder@gmail.com"
                onChange={(e) => validateEmail(e.currentTarget.value)}
              />
              {isValidEmail === false && (
                <p className="text-red-500 italic text-sm">Invalid email</p>
              )}
            </div>
            <div className="space-y-1">
              <div>
                <label htmlFor="password" className="font-medium">
                  Password
                </label>
              </div>
              <PasswordInput id="password" required name="password" />
            </div>
            <button
              type="submit"
              className="bg-primary text-white rounded-md py-2 w-full"
            >
              Register
            </button>
            <div className="flex justify-center">
              <p className="text-gray-500">Already have an account?</p>
              <NavLink to="/login" className="text-primary ml-1 font-medium">
                Sign in
              </NavLink>
            </div>
          </Form>
        </div>
      </div>
    </main>
  );
};

export default RegisterPage;
