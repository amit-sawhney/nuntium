import { NewsroomRole, NewsroomRoleHierarchy } from './constants';

/**
 * Compare two newsroom roles
 *
 * @param role1 - The first role to compare
 * @param role2 - The second role to compare
 * @returns A negative number if role1 is higher than role2, a positive number if role1 is lower than role2, and 0 if they are equal
 */
export const compareNewsroomRole = (role1: NewsroomRole, role2: NewsroomRole) => {
  return NewsroomRoleHierarchy[role1] - NewsroomRoleHierarchy[role2];
};
