import * as classNames from 'classnames';
import { InputHTMLAttributes } from 'react';

export interface DefaultInputProps
  extends InputHTMLAttributes<HTMLInputElement> {}

export const DefaultInput = ({ className, ...rest }: DefaultInputProps) => (
  <input
    {...rest}
    className={classNames(
      'w-full border border-gray-300 rounded-md py-2 px-3',
      className,
    )}
  />
);
