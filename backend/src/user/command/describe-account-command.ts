import Command from '@/core/command';
import logger from '@/core/logger/logger';
import UserModel, { User } from '../model/user-model';

interface Props {
  userId: string;
}

export default class DescribeUserCommand implements Command {
  async call({ userId }: Props): Promise<User | null> {
    const user = await UserModel.queryById(userId).exec();

    if (user.length === 0) {
      return null;
    } else if (user.length > 1) {
      // Should emit soft error
      logger.warn(`Unexpected number of users found for id ${userId}`);
    }

    return user[0];
  }
}
