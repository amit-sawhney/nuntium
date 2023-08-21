import { Schema, model } from 'mongoose';

import { createTypedToken } from '@/core/helpers';

export type AccountToken = `acct_${string}`;

export interface Account {
  token: AccountToken;
  email: string;
  newsroom: string[];
  role: AccountRole;
  firstName: string;
  lastName: string;
  preferredName: string | null;
  phone: string | null;
  genders: string[];
  pronouns: string[];
  races: string[];
  interests: string[];
  teams: string[];
  onboardingState: OnboardingState;
  applicationState: AccountApplicationState;
  twitter: string | null;
  instagram: string | null;
  facebook: string | null;
  portfolio: string | null;
  neighborhood: string | null;
  approvedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

const AccountSchema = new Schema(
  {
    // Custom token for an account
    token: {
      type: String,
      // Unique index
      unique: true,
      default: (): AccountToken => createTypedToken('acct') as AccountToken,
    },
    email: {
      type: String,
      required: true,
      // Unique index
      unique: true,
    },
    newsroom: {
      type: [String],
      required: true,
    },
    role: {
      type: String,
      required: true,
      enum: Object.values(AccountRole),
    },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    // Replaces first name if provided
    preferredName: { type: String, default: null },
    // Unformatted phone number
    phone: { type: String, default: null },
    genders: { type: [String], default: [] },
    pronouns: { type: [String], default: [] },
    races: { type: [String], default: [] },
    // Dynmaic list of interests
    interests: { type: [String], default: [] },
    // The teams the user is allowed to access
    teams: { type: [String], default: [] },
    // Account state metadata
    onboardingState: {
      type: String,
      enum: Object.values(OnboardingState),
      default: OnboardingState.UNSCHEDULED,
    },
    applicationState: {
      type: String,
      enum: Object.values(AccountApplicationState),
      default: AccountApplicationState.IN_REVIEW,
    },
    // Socials
    twitter: { type: String, default: null },
    instagram: { type: String, default: null },
    facebook: { type: String, default: null },
    portfolio: { type: String, default: null },
    // Location
    neighborhood: { type: String, default: null },
    // Date for when the account was approved
    approvedAt: { type: Date, default: null },
  },
  {
    timestamps: true,
    statics: {
      queryApplicationState(state: AccountApplicationState) {
        return this.find({ applicationState: state });
      },
      queryOnboardingState(state: OnboardingState) {
        return this.find({ onboardingState: state });
      },
    },
  },
);

// Index Definitions
AccountSchema.index({ newsroom: 1, token: 1, applicationState: 1 });
AccountSchema.index({ newsroom: 1, token: 1, onboardingState: 1 });

const AccountModel = model('Account', AccountSchema);

export default AccountModel;
export { AccountSchema };
