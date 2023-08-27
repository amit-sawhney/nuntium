import AbstractCommand from '@/api/abstract-command';
import logger from '@/core/logger/logger';
import UserModel, { User } from '../model/user-model';

interface Props {
  userId: string;
}

const DescribeUserCommand: AbstractCommand<Props, Promise<User | null>> = {
  async call({ userId }: Props): Promise<User | null> {
    const user = await UserModel.queryById(userId).exec();

    if (user.length === 0) {
      return null;
    } else if (user.length > 1) {
      // Should emit soft error
      logger.warn(`Unexpected number of users found for id ${userId}`);
    }

    return user[0];
  },
};

export default DescribeUserCommand;
