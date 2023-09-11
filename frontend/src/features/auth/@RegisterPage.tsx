import { Form, NavLink, useActionData } from 'react-router-dom';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/solid';
import { XCircleIcon, CheckCircleIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';

const RegisterPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isValidEmail, setIsValidEmail] = useState<boolean | null>(null);
  const [passwordStatuses, setPasswordStatuses] = useState({
    hasLength: false,
    hasUpperCase: false,
    hasLowerCase: false,
    hasNumber: false,
    hasNonAlphaNumeric: false,
  });

  const validatePassword = (password: string) => {
    const hasLength = password.length >= 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasNonAlphaNumeric = /[^A-Za-z0-9]/.test(password);

    setPasswordStatuses({
      hasLength,
      hasUpperCase,
      hasLowerCase,
      hasNumber,
      hasNonAlphaNumeric,
    });
  };

  const validateEmail = (email: string) => {
    const re = /\S+@\S+\.\S+/;
    setIsValidEmail(re.test(email));
  };

  const actionData = useActionData();

  return (
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
              <input
                autoComplete="given-name"
                id="first-name"
                name="first-name"
                required
                type="text"
                placeholder="John"
                className="w-full border border-gray-300 rounded-md py-2 px-3"
              />
            </div>
            <div className="w-full">
              <label htmlFor="last-name" className="font-medium">
                Last Name
              </label>
              <input
                autoComplete="family-name"
                id="last-name"
                name="last-name"
                required
                type="text"
                placeholder="Doe"
                className="w-full border border-gray-300 rounded-md py-2 px-3"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label htmlFor="email" className="font-medium">
              Email
            </label>
            <input
              autoComplete="email"
              id="email"
              name="email"
              required
              type="text"
              maxLength={100}
              placeholder="placeholder@gmail.com"
              className="w-full border border-gray-300 rounded-md py-2 px-3"
              onChange={(e) => validateEmail(e.currentTarget.value)}
            />
            {isValidEmail === false && (
              <p className="text-red-500">Invalid email</p>
            )}
            {isValidEmail === true && (
              <p className="text-green-500">Valid email</p>
            )}
          </div>
          <div className="space-y-1">
            <div className="flex">
              <label htmlFor="password" className="font-medium">
                Password
              </label>
            </div>
            <div className="flex gap-x-2">
              <div className="relative w-full">
                <input
                  onChange={(e) => validatePassword(e.currentTarget.value)}
                  id="password"
                  required
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  className="w-full border border-gray-300 rounded-md py-2 px-3"
                />
                {showPassword ? (
                  <EyeSlashIcon
                    onClick={() => setShowPassword(false)}
                    className="absolute right-3 top-3 h-5 w-5 text-gray-400 hover:cursor-pointer"
                  />
                ) : (
                  <EyeIcon
                    onClick={() => setShowPassword(true)}
                    className="absolute right-3 top-3 h-5 w-5 text-gray-400 hover:cursor-pointer"
                  />
                )}
              </div>
              <div className="flex items-center">
                {Object.values(passwordStatuses).every((status) => status) ? (
                  <CheckCircleIcon className="h-5 w-5 text-green-500" />
                ) : (
                  <div className="group relative">
                    <XCircleIcon className="h-5 w-5 text-red-500" />
                    <div className="absolute -right-100 group-hover:block hidden w-52">
                      <div className="bg-white border border-gray-300 rounded-md p-2">
                        <p className="text-sm text-gray-500">
                          Password must have:
                        </p>
                        <ul className="list-inside text-sm text-gray-500 list-none">
                          <li>
                            {passwordStatuses.hasLength ? (
                              <CheckCircleIcon className="h-4 w-4 text-green-500 inline-block" />
                            ) : (
                              <XCircleIcon className="h-4 w-4 text-red-500 inline-block" />
                            )}{' '}
                            At least 8 characters
                          </li>
                          <li>
                            {passwordStatuses.hasUpperCase ? (
                              <CheckCircleIcon className="h-4 w-4 text-green-500 inline-block" />
                            ) : (
                              <XCircleIcon className="h-4 w-4 text-red-500 inline-block" />
                            )}{' '}
                            At least 1 uppercase letter
                          </li>
                          <li>
                            {passwordStatuses.hasLowerCase ? (
                              <CheckCircleIcon className="h-4 w-4 text-green-500 inline-block" />
                            ) : (
                              <XCircleIcon className="h-4 w-4 text-red-500 inline-block" />
                            )}{' '}
                            At least 1 lowercase letter
                          </li>
                          <li>
                            {passwordStatuses.hasNumber ? (
                              <CheckCircleIcon className="h-4 w-4 text-green-500 inline-block" />
                            ) : (
                              <XCircleIcon className="h-4 w-4 text-red-500 inline-block" />
                            )}{' '}
                            At least 1 number
                          </li>
                          <li>
                            {passwordStatuses.hasNonAlphaNumeric ? (
                              <CheckCircleIcon className="h-4 w-4 text-green-500 inline-block" />
                            ) : (
                              <XCircleIcon className="h-4 w-4 text-red-500 inline-block" />
                            )}{' '}
                            At least 1 non-alphanumeric character
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
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
  );
};

export default RegisterPage;
