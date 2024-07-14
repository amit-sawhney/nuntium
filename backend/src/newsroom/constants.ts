export enum NewsroomRole {
  OWNER = 'OWNER',
  ADMIN = 'ADMIN',
  STAFF = 'STAFF',
  CONTRIBUTOR = 'CONTRIBUTOR',
}

export const NewsroomRoleHierarchy = {
  [NewsroomRole.OWNER]: 1,
  [NewsroomRole.ADMIN]: 2,
  [NewsroomRole.STAFF]: 3,
  [NewsroomRole.CONTRIBUTOR]: 4,
};
