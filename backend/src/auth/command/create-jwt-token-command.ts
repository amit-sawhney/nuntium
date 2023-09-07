import jwt from 'jsonwebtoken';

import AbstractCommand from '@/api/abstract-command';
import env from '@/core/env';

interface Props {
  email: string;
}

const CreateJwtTokenCommand: AbstractCommand<Props, string> = {
  call({ email }) {
    const token = jwt.sign({ email }, env.JWT_SECRET, {
      expiresIn: env.JWT_EXPIRES_IN,
    });

    return token;
  },
};

export default CreateJwtTokenCommand;
