import Input, { InputProps } from '@/components/input';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/solid';
import { useState } from 'react';

export const PasswordInput = (props: InputProps) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="relative w-full">
      <Input type={showPassword ? 'text' : 'password'} {...props} />
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
  );
};
