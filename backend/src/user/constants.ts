export enum UserOnboardingState {
  COMPLETE = 'complete',
  SCHEDULED = 'scheduled',
  CANCELED = 'canceled',
  UNSCHEDULED = 'unscheduled',
}

export enum UserApplicationState {
  APPROVED = 'approved',
  REJECTED = 'rejected',
  IN_REVIEW = 'in_review',
}

export enum UserRole {
  ADMIN = 'admin',
  STAFF = 'staff',
  CONTRIBUTOR = 'contributor',
  PENDING = 'pending',
}
