import jwt from 'jsonwebtoken';

import AbstractCommand from '@/api/abstract-command';
import env from '@/core/env';

interface Props {
  email: string;
  type: 'access' | 'refresh';
}

const CreateJwtTokenCommand: AbstractCommand<Props, string> = {
  call({ email, type }) {
    const token = type === 'access' ? signAccessToken(email) : signRefreshToken(email);

    return token;
  },
};

const signAccessToken = (email: string) => {
  const token = jwt.sign({ email }, env.JWT_ACCESS_TOKEN_EXPIRES_IN, {
    expiresIn: env.JWT_ACCESS_TOKEN_EXPIRES_IN,
  });

  return token;
};

const signRefreshToken = (email: string) => {
  const token = jwt.sign({ email }, env.JWT_REFRESH_TOKEN_EXPIRES_IN, {
    expiresIn: env.JWT_REFRESH_TOKEN_EXPIRES_IN,
  });

  return token;
};

export default CreateJwtTokenCommand;
