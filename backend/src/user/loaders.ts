import logger from '@/core/logger/logger';
import UserModel from './model/user-model';

export const fetchUserByEmail = async ({
  email,
  includePassword = false,
}: {
  email: string;
  includePassword?: boolean;
}) => {
  const user = await UserModel.find({ email })
    .limit(1)
    .select(includePassword ? '+password' : '')
    .exec();

  if (user.length === 0) {
    return null;
  }

  if (user.length > 1) {
    logger.error(`Found ${user.length} users with email ${email}`);
  }

  return user[0];
};

export const fetchUserById = async ({ userId }: { userId: string }) => {
  const user = await UserModel.find({ _id: userId }).limit(1).exec();

  if (user.length === 0) {
    return null;
  }

  return user[0];
};
